import { Server } from './framework'

export default class AdLoader {
    
    constructor() {
        this.AccountNumber = null;
        this.page_keywords = document.getElementById('ad-keywords')
        const gaAccount = document.getElementById('g-ad-id');
        if (gaAccount && typeof gaAccount.dataset.accno !== 'undefined') {
            this.AccountNumber = gaAccount.dataset.accno;
        }
        this.adSlots = [];
        this.deviceSize = this.getDeviceForAd();
    }
    


    LoadAds() {
        var self = this;

        if (!this.AccountNumber) {
            console.log('Missing account number for Ads');
            return;
        }

        this.adslots = document.querySelectorAll(".j-adslot");
        if (this.adslots.length < 1) {
            console.log('returning');
            return;
        }
    
        for (var i=0;i<this.adslots.length;i++) {
            var elem = this.adslots[i];
            if (!elem.id) continue;

            
            elem.classList.remove("j-adslot");
            elem.classList.add("j-adslot-filled");
            
            var keysArray = [elem.id];

            if ((!elem.dataset.responsive || elem.dataset.responsive == "0") && this.deviceSize != "") {
                keysArray.push(this.deviceSize);
            }

            if (this.page_keywords.length < 1 || typeof this.page_keywords.dataset.keywords === 'undefined' || this.page_keywords.dataset.keywords === "") {
                keysArray.push('default');
            } else {
                var keysExtra = this.page_keywords.dataset.keywords.split(',');
                keysArray.push( keysArray.concat(keysExtra).filter((item) => item !== '') );
            }
    

            
            var keysString = keysArray.join(',')
            
            Server.fetch(_appJsConfig.appHostName + '/api/ad/get-all?keywords='+keysString).done((data) => {
                
                var k = 0;

                if (data.length < 1 ){
                    console.log('no ads found with those keywords', keysString)
                    return;
                }
                if (data.length > 1 ) {
                    // If more than one matching, randomly show 
                    // different ad on each page refresh
                    k = Math.round(Math.random()*(data.length-1));
                } 

                var item = data[k];
                var keys = item.keywords.split(',');
                var adElem = document.getElementById(keys[0]);

                if (item.media.path){
                    const html ='<div id="advertisment__' + keys[0] + '" class="advertisment advertisment__' + keys[0] + ' advertisment__' + keys[1] + '"> \
                                    <a href="' + item.button.url + '"> \
                                        <img src="' + item.media.path + '"> \
                                    </a> \
                                </div>';

                    adElem.innerHTML = html;
                    return;
                }
                
                if (item.description) {
                    const html ='<div id="advertisment__' + keys[0] + '" class="advertisment advertisment__' + keys[0] + ' advertisment__' + keys[1] + '">' + item.description + '</div>';
                    adElem.innerHTML = html;
                }

                try {
                    self.adPush(keys[0]);
                } catch(err) {
                    console.log('no ad found to push at advertisment__' + keys[0], err)
                }
            });
        }    
    }

    adPush(slot) {

        var self = this;
        var keyword = '';
        var pageName = '';
        var pageType = '';
        var pageTag  = '';
        var adsection = '';
        var invSlot = null;

        //set values of the page if the data items exist
        if (this.page_keywords){
            const dataset = this.page_keywords.dataset;
            keyword = dataset.keyword;
            pageName = dataset.pagename.replace(/ /g,"_");
            pageType = dataset.pagetype;
            pageTag  = dataset.pagetag;
            if (dataset.adsection) {
                adsection = page_keywords.dataset.adsection;
            }
        }

        googletag.cmd.push(function() {
            //declare mapping variables
            var mappingBanner = googletag.sizeMapping()
                            .addSize([1000, 200], [[970, 250], [970, 90], [728, 250],[728, 90]])
                            .addSize([768, 200], [[728, 250],[728, 90]])
                            .addSize([480, 200], [[300, 75]])
                            .addSize([360, 400], [[300, 75]])
                            .addSize([320, 400], [[300, 75]])
                            .build(); 
            var mappingMrec = googletag.sizeMapping()
                            .addSize([1000, 200], [[300, 250]])                
                            .addSize([768, 200], [[300, 250],[300, 75]])
                            .addSize([320, 400], [[300, 250],[300, 75]])
                            .build();
            var mappingHpage = googletag.sizeMapping()
                            .addSize([1000, 200], [[300, 600],[300, 250]])
                            .addSize([768, 200], [[300,600],[300, 250],[300, 75]])
                            .addSize([320, 400], [[300, 250],[300, 75]])
                            .build();
            var mappingTag = googletag.sizeMapping()
                            .addSize([0, 0], [[1, 1]])
                            .build();         
            //cycle through the ad slots on the page and define the associated google slot
            
            var slotId = 'div-gpt-ad-'+slot;
            //find the ad shape
            var theSlot = document.getElementById(slot);
            var slotType = theSlot.dataset.adshape;
            var inventory =  document.getElementById(slotId);
            
            invSlot = self.AccountNumber + adsection;
            if (adsection == ''){
                invSlot = self.AccountNumber + inventory.dataset.inventory;
            } 

            //set the POS
            var pos = slot.slice(-1);

            // if size and mapping needs to be set for the shape set it here
            var sizes = [0,0];
            var mapping = mappingTag;
            if (slotType == 'banner'){
                sizes = [[970,250],[970,90],[728,90],[728,250],[300,75]];
                mapping = mappingBanner;
            } else if (slotType == 'mrec'){
                sizes = [[300,250],[300,75]];
                mapping = mappingMrec;
            } else if (slotType == 'hpage' || slotType == 'side-fix'){
                sizes = [[300,600], [300,250],[300,75]];
                mapping = mappingHpage;
            }
            googletag.pubads().enableSingleRequest();
            googletag.pubads().setTargeting('section', [pageName])
                    .setTargeting('keyword', [keyword])
                    .setTargeting('page-type', [pageType])
                    .setTargeting('tag', [pageTag]);
            googletag.pubads().collapseEmptyDivs();
            googletag.enableServices();
            //define the slot with all required data
            googletag.defineSlot(invSlot, sizes, slotId)
                .setTargeting('POS', [pos])
                .defineSizeMapping(mapping)
                .addService(googletag.pubads());
            
            googletag.cmd.push(function() { googletag.display(slotId); });
        });
    }



    getDeviceForAd() {
        var width = window.innerWidth;
        if (width > 991)                return 'desktop';
        if (width < 992 && width > 767) return 'tablet';
        if (width < 768)                return 'mobile';
        return '';
    }

}




