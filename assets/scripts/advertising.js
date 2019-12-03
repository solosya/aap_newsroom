(function($) {


    Acme.LoadAds = function()
    {
        if ($(".j-adslot").length > 0) {
            var adslots = $(".j-adslot");
            var deviceSize = getDeviceForAd();
            for (var i=0;i<adslots.length;i++) {
                var elem = adslots[i];
                console.log(elem);
                var self = $("#"+elem.id);
                self.removeClass("j-adslot");
                self.addClass("j-adslot-filled");
                var keysArray = [elem.id];

                if ((!elem.dataset.responsive || elem.dataset.responsive == "0") && deviceSize != ""){
                    keysArray.push(deviceSize);
                }
                
                if ($(".j-keyword-cont").length > 0) {
                    var keywordCont = $(".j-keyword-cont")[0];
                    var keysExtra = keywordCont.dataset.keywords.split(',');
                    if (keysExtra[0] != ""){
                        for (var j=0;j<keysExtra.length;j++){
                            if (keysExtra[j] != "") {
                                keysArray.push(keysExtra[j]);
                            }
                        }
                    } else {
                        keysArray.push('default');
                    }
                } else {
                    keysArray.push('default');
                }
                var keysString = keysArray.join(',')
                console.log(keysString, _appJsConfig.appHostName);
                var devkey = '';
                if (_appJsConfig.appHostName == 'http://www.publish.io'){devkey = ':8080'};
                $.ajax({
                    type: 'GET',
                    url: _appJsConfig.appHostName + devkey + '/api/ad/get-all',
                    dataType: 'json',
                    data: {
                        'keywords': keysString,
                    },
                    success: function (data, textStatus, jqXHR) {
                        if (data.length < 1 ){
                            console.log('no ads found with those keywords',keysString)
                            return;
                        } else if (data.length > 1 ){
                            var k = Math.round(Math.random()*(data.length-1));
                        } else {
                            var k = 0;
                        }
                        var self = data[k];
                        console.log(self);
                        keys = self.keywords.split(',');
                        if (self.media.path){
                            $("#"+keys[0]).html("<div id='advertisment__"+keys[0]+"' class='advertisment advertisment__"+keys[0]+" advertisment__"+keys[1]+"'><a href='"+self.button.url+"'><img src='"+self.media.path+"'></a></div>");
                        } else if (self.description){
                            $("#"+keys[0]).html("<div id='advertisment__"+keys[0]+"' class='advertisment advertisment__"+keys[0]+" advertisment__"+keys[1]+"'>"+self.description+"</div>");
                        }
                        
                        try {
                            adPush(keys[0]);
                        } catch(err) {
                            console.log('no ad found to push at advertisment__'+keys[0],err)
                        }
                        
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log('error retreiving ad', textStatus, errorThrown);
                        $('#createUserErrorMessage').text(textStatus);
                    },
                });

                
                
            }
        }

        function getDeviceForAd() {
            var width = $(window).width();
            if (width > 991) {
                return 'desktop';
            } else if (width < 992 && width > 767) {
                return 'tablet';
            } else if (width < 768) {
                return 'mobile';
            } else {
                return '';
            }
        }
    }

    Acme.LoadAds();
}(jQuery));


adPush = function(slot){
    var idNo = document.getElementById('g-ad-id').dataset.accno;
    var keywordCont = document.getElementsByClassName('j-keyword-cont');
    var keyword = '';
    var pageName = '';
    var pageType = '';
    var pageTag  = '';
    var adsection = '';
    var slotsToPush = [];

    //set values of the page if the data items exist
    if (keywordCont[0]){      
        keyword = keywordCont[0].dataset.keyword;
        pageName = keywordCont[0].dataset.pagename.replace(/ /g,"_");
        pageType = keywordCont[0].dataset.pagetype;
        pageTag  = keywordCont[0].dataset.pagetag;
        if (keywordCont[0].dataset.adsection){
            adsection = keywordCont[0].dataset.adsection;
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
                        .addSize([320, 400], [[300, 250],[300, 75]])
                        .build();
        var mappingHpage = googletag.sizeMapping()
                        .addSize([1000, 200], [[300, 600],[300, 250]])
                        .addSize([320, 400], [[300, 250],[300, 75]])
                        .build();
        var mappingTag = googletag.sizeMapping()
                        .addSize([0, 0], [[1, 1]])
                        .build();         
        //cycle through the ad slots on the page and define the associated google slot
        
        var theId = slot;
        var slotId = 'div-gpt-ad-'+theId;
        //find the ad shape
        var theSlot = document.getElementById(theId);
        var slotType = theSlot.dataset.adshape;
        var inventory =  document.getElementById(slotId);
        if (adsection == ''){
            invSlot = idNo + inventory.dataset.inventory;
        } else {
            invSlot = idNo + adsection;
        }
        //set the POS
        var pos = theId.slice(-1);
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
        console.log(invSlot, sizes, slotId);
        console.log( document.getElementById(slotId));
        googletag.defineSlot(invSlot, sizes, slotId)
            .setTargeting('POS', [pos])
            .defineSizeMapping(mapping)
            .addService(googletag.pubads());
        
        googletag.cmd.push(function() { googletag.display(slotId); });
    });
}