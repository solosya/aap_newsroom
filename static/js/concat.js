!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],b):"object"==typeof exports?module.exports=b(require("jquery")):b(a.jQuery)}(this,function(a){"function"!=typeof Object.create&&(Object.create=function(a){function b(){}return b.prototype=a,new b});var b={init:function(b){return this.options=a.extend({},a.noty.defaults,b),this.options.layout=this.options.custom?a.noty.layouts.inline:a.noty.layouts[this.options.layout],a.noty.themes[this.options.theme]?this.options.theme=a.noty.themes[this.options.theme]:this.options.themeClassName=this.options.theme,this.options=a.extend({},this.options,this.options.layout.options),this.options.id="noty_"+(new Date).getTime()*Math.floor(1e6*Math.random()),this._build(),this},_build:function(){var b=a('<div class="noty_bar noty_type_'+this.options.type+'"></div>').attr("id",this.options.id);if(b.append(this.options.template).find(".noty_text").html(this.options.text),this.$bar=null!==this.options.layout.parent.object?a(this.options.layout.parent.object).css(this.options.layout.parent.css).append(b):b,this.options.themeClassName&&this.$bar.addClass(this.options.themeClassName).addClass("noty_container_type_"+this.options.type),this.options.buttons){this.options.closeWith=[],this.options.timeout=!1;var c=a("<div/>").addClass("noty_buttons");null!==this.options.layout.parent.object?this.$bar.find(".noty_bar").append(c):this.$bar.append(c);var d=this;a.each(this.options.buttons,function(b,c){var e=a("<button/>").addClass(c.addClass?c.addClass:"gray").html(c.text).attr("id",c.id?c.id:"button-"+b).attr("title",c.title).appendTo(d.$bar.find(".noty_buttons")).on("click",function(b){a.isFunction(c.onClick)&&c.onClick.call(e,d,b)})})}this.$message=this.$bar.find(".noty_message"),this.$closeButton=this.$bar.find(".noty_close"),this.$buttons=this.$bar.find(".noty_buttons"),a.noty.store[this.options.id]=this},show:function(){var b=this;return b.options.custom?b.options.custom.find(b.options.layout.container.selector).append(b.$bar):a(b.options.layout.container.selector).append(b.$bar),b.options.theme&&b.options.theme.style&&b.options.theme.style.apply(b),"function"===a.type(b.options.layout.css)?this.options.layout.css.apply(b.$bar):b.$bar.css(this.options.layout.css||{}),b.$bar.addClass(b.options.layout.addClass),b.options.layout.container.style.apply(a(b.options.layout.container.selector),[b.options.within]),b.showing=!0,b.options.theme&&b.options.theme.style&&b.options.theme.callback.onShow.apply(this),a.inArray("click",b.options.closeWith)>-1&&b.$bar.css("cursor","pointer").one("click",function(a){b.stopPropagation(a),b.options.callback.onCloseClick&&b.options.callback.onCloseClick.apply(b),b.close()}),a.inArray("hover",b.options.closeWith)>-1&&b.$bar.one("mouseenter",function(){b.close()}),a.inArray("button",b.options.closeWith)>-1&&b.$closeButton.one("click",function(a){b.stopPropagation(a),b.close()}),-1==a.inArray("button",b.options.closeWith)&&b.$closeButton.remove(),b.options.callback.onShow&&b.options.callback.onShow.apply(b),"string"==typeof b.options.animation.open?(b.$bar.css("height",b.$bar.innerHeight()),b.$bar.on("click",function(a){b.wasClicked=!0}),b.$bar.show().addClass(b.options.animation.open).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){b.options.callback.afterShow&&b.options.callback.afterShow.apply(b),b.showing=!1,b.shown=!0,b.hasOwnProperty("wasClicked")&&(b.$bar.off("click",function(a){b.wasClicked=!0}),b.close())})):b.$bar.animate(b.options.animation.open,b.options.animation.speed,b.options.animation.easing,function(){b.options.callback.afterShow&&b.options.callback.afterShow.apply(b),b.showing=!1,b.shown=!0}),b.options.timeout&&b.$bar.delay(b.options.timeout).promise().done(function(){b.close()}),this},close:function(){if(!(this.closed||this.$bar&&this.$bar.hasClass("i-am-closing-now"))){var b=this;if(this.showing)return void b.$bar.queue(function(){b.close.apply(b)});if(!this.shown&&!this.showing){var c=[];return a.each(a.noty.queue,function(a,d){d.options.id!=b.options.id&&c.push(d)}),void(a.noty.queue=c)}b.$bar.addClass("i-am-closing-now"),b.options.callback.onClose&&b.options.callback.onClose.apply(b),"string"==typeof b.options.animation.close?b.$bar.addClass(b.options.animation.close).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){b.options.callback.afterClose&&b.options.callback.afterClose.apply(b),b.closeCleanUp()}):b.$bar.clearQueue().stop().animate(b.options.animation.close,b.options.animation.speed,b.options.animation.easing,function(){b.options.callback.afterClose&&b.options.callback.afterClose.apply(b)}).promise().done(function(){b.closeCleanUp()})}},closeCleanUp:function(){var b=this;b.options.modal&&(a.notyRenderer.setModalCount(-1),0==a.notyRenderer.getModalCount()&&a(".noty_modal").fadeOut(b.options.animation.fadeSpeed,function(){a(this).remove()})),a.notyRenderer.setLayoutCountFor(b,-1),0==a.notyRenderer.getLayoutCountFor(b)&&a(b.options.layout.container.selector).remove(),"undefined"!=typeof b.$bar&&null!==b.$bar&&("string"==typeof b.options.animation.close?(b.$bar.css("transition","all 100ms ease").css("border",0).css("margin",0).height(0),b.$bar.one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){b.$bar.remove(),b.$bar=null,b.closed=!0,b.options.theme.callback&&b.options.theme.callback.onClose&&b.options.theme.callback.onClose.apply(b)})):(b.$bar.remove(),b.$bar=null,b.closed=!0)),delete a.noty.store[b.options.id],b.options.theme.callback&&b.options.theme.callback.onClose&&b.options.theme.callback.onClose.apply(b),b.options.dismissQueue||(a.noty.ontap=!0,a.notyRenderer.render()),b.options.maxVisible>0&&b.options.dismissQueue&&a.notyRenderer.render()},setText:function(a){return this.closed||(this.options.text=a,this.$bar.find(".noty_text").html(a)),this},setType:function(a){return this.closed||(this.options.type=a,this.options.theme.style.apply(this),this.options.theme.callback.onShow.apply(this)),this},setTimeout:function(a){if(!this.closed){var b=this;this.options.timeout=a,b.$bar.delay(b.options.timeout).promise().done(function(){b.close()})}return this},stopPropagation:function(a){a=a||window.event,"undefined"!=typeof a.stopPropagation?a.stopPropagation():a.cancelBubble=!0},closed:!1,showing:!1,shown:!1};a.notyRenderer={},a.notyRenderer.init=function(c){var d=Object.create(b).init(c);return d.options.killer&&a.noty.closeAll(),d.options.force?a.noty.queue.unshift(d):a.noty.queue.push(d),a.notyRenderer.render(),"object"==a.noty.returns?d:d.options.id},a.notyRenderer.render=function(){var b=a.noty.queue[0];"object"===a.type(b)?b.options.dismissQueue?b.options.maxVisible>0?a(b.options.layout.container.selector+" > li").length<b.options.maxVisible&&a.notyRenderer.show(a.noty.queue.shift()):a.notyRenderer.show(a.noty.queue.shift()):a.noty.ontap&&(a.notyRenderer.show(a.noty.queue.shift()),a.noty.ontap=!1):a.noty.ontap=!0},a.notyRenderer.show=function(b){b.options.modal&&(a.notyRenderer.createModalFor(b),a.notyRenderer.setModalCount(1)),b.options.custom?0==b.options.custom.find(b.options.layout.container.selector).length?b.options.custom.append(a(b.options.layout.container.object).addClass("i-am-new")):b.options.custom.find(b.options.layout.container.selector).removeClass("i-am-new"):0==a(b.options.layout.container.selector).length?a("body").append(a(b.options.layout.container.object).addClass("i-am-new")):a(b.options.layout.container.selector).removeClass("i-am-new"),a.notyRenderer.setLayoutCountFor(b,1),b.show()},a.notyRenderer.createModalFor=function(b){if(0==a(".noty_modal").length){var c=a("<div/>").addClass("noty_modal").addClass(b.options.theme).data("noty_modal_count",0);b.options.theme.modal&&b.options.theme.modal.css&&c.css(b.options.theme.modal.css),c.prependTo(a("body")).fadeIn(b.options.animation.fadeSpeed),a.inArray("backdrop",b.options.closeWith)>-1&&c.on("click",function(b){a.noty.closeAll()})}},a.notyRenderer.getLayoutCountFor=function(b){return a(b.options.layout.container.selector).data("noty_layout_count")||0},a.notyRenderer.setLayoutCountFor=function(b,c){return a(b.options.layout.container.selector).data("noty_layout_count",a.notyRenderer.getLayoutCountFor(b)+c)},a.notyRenderer.getModalCount=function(){return a(".noty_modal").data("noty_modal_count")||0},a.notyRenderer.setModalCount=function(b){return a(".noty_modal").data("noty_modal_count",a.notyRenderer.getModalCount()+b)},a.fn.noty=function(b){return b.custom=a(this),a.notyRenderer.init(b)},a.noty={},a.noty.queue=[],a.noty.ontap=!0,a.noty.layouts={},a.noty.themes={},a.noty.returns="object",a.noty.store={},a.noty.get=function(b){return a.noty.store.hasOwnProperty(b)?a.noty.store[b]:!1},a.noty.close=function(b){return a.noty.get(b)?a.noty.get(b).close():!1},a.noty.setText=function(b,c){return a.noty.get(b)?a.noty.get(b).setText(c):!1},a.noty.setType=function(b,c){return a.noty.get(b)?a.noty.get(b).setType(c):!1},a.noty.clearQueue=function(){a.noty.queue=[]},a.noty.closeAll=function(){a.noty.clearQueue(),a.each(a.noty.store,function(a,b){b.close()})};var c=window.alert;return a.noty.consumeAlert=function(b){window.alert=function(c){b?b.text=c:b={text:c},a.notyRenderer.init(b)}},a.noty.stopConsumeAlert=function(){window.alert=c},a.noty.defaults={layout:"top",theme:"defaultTheme",type:"alert",text:"",dismissQueue:!0,template:'<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',animation:{open:{height:"toggle"},close:{height:"toggle"},easing:"swing",speed:500,fadeSpeed:"fast"},timeout:!1,force:!1,modal:!1,maxVisible:5,killer:!1,closeWith:["click"],callback:{onShow:function(){},afterShow:function(){},onClose:function(){},afterClose:function(){},onCloseClick:function(){}},buttons:!1},a(window).on("resize",function(){a.each(a.noty.layouts,function(b,c){c.container.style.apply(a(c.container.selector))})}),window.noty=function(b){return a.notyRenderer.init(b)},a.noty.layouts.bottom={name:"bottom",options:{},container:{object:'<ul id="noty_bottom_layout_container" />',selector:"ul#noty_bottom_layout_container",style:function(){a(this).css({bottom:0,left:"5%",position:"fixed",width:"90%",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:9999999})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none"},addClass:""},a.noty.layouts.bottomCenter={name:"bottomCenter",options:{},container:{object:'<ul id="noty_bottomCenter_layout_container" />',selector:"ul#noty_bottomCenter_layout_container",style:function(){a(this).css({bottom:20,left:0,position:"fixed",width:"310px",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:1e7}),a(this).css({left:(a(window).width()-a(this).outerWidth(!1))/2+"px"})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none",width:"310px"},addClass:""},a.noty.layouts.bottomLeft={name:"bottomLeft",options:{},container:{object:'<ul id="noty_bottomLeft_layout_container" />',selector:"ul#noty_bottomLeft_layout_container",style:function(){a(this).css({bottom:20,left:20,position:"fixed",width:"310px",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:1e7}),window.innerWidth<600&&a(this).css({left:5})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none",width:"310px"},addClass:""},a.noty.layouts.bottomRight={name:"bottomRight",options:{},container:{object:'<ul id="noty_bottomRight_layout_container" />',selector:"ul#noty_bottomRight_layout_container",style:function(){a(this).css({bottom:20,right:20,position:"fixed",width:"310px",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:1e7}),window.innerWidth<600&&a(this).css({right:5})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none",width:"310px"},addClass:""},a.noty.layouts.center={name:"center",options:{},container:{object:'<ul id="noty_center_layout_container" />',selector:"ul#noty_center_layout_container",style:function(){a(this).css({position:"fixed",width:"310px",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:1e7});var b=a(this).clone().css({visibility:"hidden",display:"block",position:"absolute",top:0,left:0}).attr("id","dupe");a("body").append(b),b.find(".i-am-closing-now").remove(),b.find("li").css("display","block");var c=b.height();b.remove(),a(this).hasClass("i-am-new")?a(this).css({left:(a(window).width()-a(this).outerWidth(!1))/2+"px",top:(a(window).height()-c)/2+"px"}):a(this).animate({left:(a(window).width()-a(this).outerWidth(!1))/2+"px",top:(a(window).height()-c)/2+"px"},500)}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none",width:"310px"},addClass:""},a.noty.layouts.centerLeft={name:"centerLeft",options:{},container:{object:'<ul id="noty_centerLeft_layout_container" />',selector:"ul#noty_centerLeft_layout_container",style:function(){a(this).css({left:20,position:"fixed",width:"310px",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:1e7});var b=a(this).clone().css({visibility:"hidden",display:"block",position:"absolute",top:0,left:0}).attr("id","dupe");a("body").append(b),b.find(".i-am-closing-now").remove(),b.find("li").css("display","block");var c=b.height();b.remove(),a(this).hasClass("i-am-new")?a(this).css({top:(a(window).height()-c)/2+"px"}):a(this).animate({top:(a(window).height()-c)/2+"px"},500),window.innerWidth<600&&a(this).css({left:5})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none",width:"310px"},addClass:""},a.noty.layouts.centerRight={name:"centerRight",options:{},container:{object:'<ul id="noty_centerRight_layout_container" />',selector:"ul#noty_centerRight_layout_container",style:function(){a(this).css({right:20,position:"fixed",width:"310px",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:1e7});var b=a(this).clone().css({visibility:"hidden",display:"block",position:"absolute",top:0,left:0}).attr("id","dupe");a("body").append(b),b.find(".i-am-closing-now").remove(),b.find("li").css("display","block");var c=b.height();b.remove(),a(this).hasClass("i-am-new")?a(this).css({top:(a(window).height()-c)/2+"px"}):a(this).animate({top:(a(window).height()-c)/2+"px"},500),window.innerWidth<600&&a(this).css({right:5})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none",width:"310px"},addClass:""},a.noty.layouts.inline={name:"inline",options:{},container:{object:'<ul class="noty_inline_layout_container" />',selector:"ul.noty_inline_layout_container",style:function(){a(this).css({width:"100%",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:9999999})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none"},addClass:""},a.noty.layouts.top={name:"top",options:{},container:{object:'<ul id="noty_top_layout_container" />',selector:"ul#noty_top_layout_container",style:function(){a(this).css({top:0,left:"5%",position:"fixed",width:"90%",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:9999999})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none"},addClass:""},a.noty.layouts.topCenter={name:"topCenter",options:{},container:{object:'<ul id="noty_topCenter_layout_container" />',selector:"ul#noty_topCenter_layout_container",style:function(){a(this).css({top:20,left:0,position:"fixed",width:"310px",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:1e7}),a(this).css({left:(a(window).width()-a(this).outerWidth(!1))/2+"px"})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none",width:"310px"},addClass:""},a.noty.layouts.topLeft={name:"topLeft",options:{},container:{object:'<ul id="noty_topLeft_layout_container" />',selector:"ul#noty_topLeft_layout_container",style:function(){a(this).css({top:20,left:20,position:"fixed",width:"310px",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:1e7}),window.innerWidth<600&&a(this).css({left:5})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none",width:"310px"},addClass:""},a.noty.layouts.topRight={name:"topRight",options:{},container:{object:'<ul id="noty_topRight_layout_container" />',selector:"ul#noty_topRight_layout_container",style:function(){a(this).css({top:20,right:20,position:"fixed",width:"310px",height:"auto",margin:0,padding:0,listStyleType:"none",zIndex:1e7}),window.innerWidth<600&&a(this).css({right:5})}},parent:{object:"<li />",selector:"li",css:{}},css:{display:"none",width:"310px"},addClass:""},a.noty.themes.bootstrapTheme={name:"bootstrapTheme",modal:{css:{position:"fixed",width:"100%",height:"100%",backgroundColor:"#000",zIndex:1e4,opacity:.6,display:"none",left:0,top:0}},style:function(){var b=this.options.layout.container.selector;switch(a(b).addClass("list-group"),this.$closeButton.append('<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>'),this.$closeButton.addClass("close"),this.$bar.addClass("list-group-item").css("padding","0px"),this.options.type){case"alert":case"notification":this.$bar.addClass("list-group-item-info");break;case"warning":this.$bar.addClass("list-group-item-warning");break;case"error":this.$bar.addClass("list-group-item-danger");break;case"information":this.$bar.addClass("list-group-item-info");break;case"success":this.$bar.addClass("list-group-item-success")}this.$message.css({fontSize:"13px",lineHeight:"16px",textAlign:"center",padding:"8px 10px 9px",width:"auto",position:"relative"})},callback:{onShow:function(){},onClose:function(){}}},a.noty.themes.defaultTheme={name:"defaultTheme",helpers:{borderFix:function(){if(this.options.dismissQueue){var b=this.options.layout.container.selector+" "+this.options.layout.parent.selector;switch(this.options.layout.name){case"top":a(b).css({borderRadius:"0px 0px 0px 0px"}),a(b).last().css({borderRadius:"0px 0px 5px 5px"});break;case"topCenter":case"topLeft":case"topRight":case"bottomCenter":case"bottomLeft":case"bottomRight":case"center":case"centerLeft":case"centerRight":case"inline":a(b).css({borderRadius:"0px 0px 0px 0px"}),a(b).first().css({"border-top-left-radius":"5px","border-top-right-radius":"5px"}),a(b).last().css({"border-bottom-left-radius":"5px","border-bottom-right-radius":"5px"});break;case"bottom":a(b).css({borderRadius:"0px 0px 0px 0px"}),a(b).first().css({borderRadius:"5px 5px 0px 0px"})}}}},modal:{css:{position:"fixed",width:"100%",height:"100%",backgroundColor:"#000",zIndex:1e4,opacity:.6,display:"none",left:0,top:0}},style:function(){switch(this.$bar.css({overflow:"hidden",background:"url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAoCAQAAAClM0ndAAAAhklEQVR4AdXO0QrCMBBE0bttkk38/w8WRERpdyjzVOc+HxhIHqJGMQcFFkpYRQotLLSw0IJ5aBdovruMYDA/kT8plF9ZKLFQcgF18hDj1SbQOMlCA4kao0iiXmah7qBWPdxpohsgVZyj7e5I9KcID+EhiDI5gxBYKLBQYKHAQoGFAoEks/YEGHYKB7hFxf0AAAAASUVORK5CYII=') repeat-x scroll left top #fff"}),this.$message.css({fontSize:"13px",lineHeight:"16px",textAlign:"center",padding:"8px 10px 9px",width:"auto",position:"relative"}),this.$closeButton.css({position:"absolute",top:4,right:4,width:10,height:10,background:"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAxUlEQVR4AR3MPUoDURSA0e++uSkkOxC3IAOWNtaCIDaChfgXBMEZbQRByxCwk+BasgQRZLSYoLgDQbARxry8nyumPcVRKDfd0Aa8AsgDv1zp6pYd5jWOwhvebRTbzNNEw5BSsIpsj/kurQBnmk7sIFcCF5yyZPDRG6trQhujXYosaFoc+2f1MJ89uc76IND6F9BvlXUdpb6xwD2+4q3me3bysiHvtLYrUJto7PD/ve7LNHxSg/woN2kSz4txasBdhyiz3ugPGetTjm3XRokAAAAASUVORK5CYII=)",display:"none",cursor:"pointer"}),this.$buttons.css({padding:5,textAlign:"right",borderTop:"1px solid #ccc",backgroundColor:"#fff"}),this.$buttons.find("button").css({marginLeft:5}),this.$buttons.find("button:first").css({marginLeft:0}),this.$bar.on({mouseenter:function(){a(this).find(".noty_close").stop().fadeTo("normal",1)},mouseleave:function(){a(this).find(".noty_close").stop().fadeTo("normal",0)}}),this.options.layout.name){case"top":this.$bar.css({borderRadius:"0px 0px 5px 5px",borderBottom:"2px solid #eee",borderLeft:"2px solid #eee",borderRight:"2px solid #eee",boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)"});break;case"topCenter":case"center":case"bottomCenter":case"inline":this.$bar.css({borderRadius:"5px",border:"1px solid #eee",boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)"}),this.$message.css({fontSize:"13px",textAlign:"center"});break;case"topLeft":case"topRight":case"bottomLeft":case"bottomRight":case"centerLeft":case"centerRight":this.$bar.css({borderRadius:"5px",border:"1px solid #eee",boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)"}),this.$message.css({fontSize:"13px",textAlign:"left"});break;case"bottom":this.$bar.css({borderRadius:"5px 5px 0px 0px",borderTop:"2px solid #eee",borderLeft:"2px solid #eee",borderRight:"2px solid #eee",boxShadow:"0 -2px 4px rgba(0, 0, 0, 0.1)"});break;default:this.$bar.css({border:"2px solid #eee",boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)"})}switch(this.options.type){case"alert":case"notification":this.$bar.css({backgroundColor:"#FFF",borderColor:"#CCC",color:"#444"});break;case"warning":this.$bar.css({backgroundColor:"#FFEAA8",borderColor:"#FFC237",color:"#826200"}),this.$buttons.css({borderTop:"1px solid #FFC237"});break;case"error":this.$bar.css({backgroundColor:"red",borderColor:"darkred",color:"#FFF"}),this.$message.css({fontWeight:"bold"}),this.$buttons.css({borderTop:"1px solid darkred"});break;case"information":this.$bar.css({backgroundColor:"#57B7E2",borderColor:"#0B90C4",color:"#FFF"}),this.$buttons.css({borderTop:"1px solid #0B90C4"});break;case"success":this.$bar.css({backgroundColor:"lightgreen",borderColor:"#50C24E",color:"darkgreen"}),this.$buttons.css({borderTop:"1px solid #50C24E"});break;default:this.$bar.css({backgroundColor:"#FFF",borderColor:"#CCC",color:"#444"})}},callback:{onShow:function(){a.noty.themes.defaultTheme.helpers.borderFix.apply(this)},onClose:function(){a.noty.themes.defaultTheme.helpers.borderFix.apply(this)}}},a.noty.themes.relax={name:"relax",helpers:{},modal:{css:{position:"fixed",width:"100%",height:"100%",backgroundColor:"#000",zIndex:1e4,opacity:.6,display:"none",left:0,top:0}},style:function(){switch(this.$bar.css({overflow:"hidden",margin:"4px 0",borderRadius:"2px"}),this.$message.css({fontSize:"14px",lineHeight:"16px",textAlign:"center",padding:"10px",width:"auto",position:"relative"}),this.$closeButton.css({position:"absolute",top:4,right:4,width:10,height:10,background:"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAxUlEQVR4AR3MPUoDURSA0e++uSkkOxC3IAOWNtaCIDaChfgXBMEZbQRByxCwk+BasgQRZLSYoLgDQbARxry8nyumPcVRKDfd0Aa8AsgDv1zp6pYd5jWOwhvebRTbzNNEw5BSsIpsj/kurQBnmk7sIFcCF5yyZPDRG6trQhujXYosaFoc+2f1MJ89uc76IND6F9BvlXUdpb6xwD2+4q3me3bysiHvtLYrUJto7PD/ve7LNHxSg/woN2kSz4txasBdhyiz3ugPGetTjm3XRokAAAAASUVORK5CYII=)",display:"none",cursor:"pointer"}),this.$buttons.css({padding:5,textAlign:"right",borderTop:"1px solid #ccc",backgroundColor:"#fff"}),this.$buttons.find("button").css({marginLeft:5}),this.$buttons.find("button:first").css({marginLeft:0}),this.$bar.on({mouseenter:function(){a(this).find(".noty_close").stop().fadeTo("normal",1)},mouseleave:function(){a(this).find(".noty_close").stop().fadeTo("normal",0)}}),this.options.layout.name){case"top":this.$bar.css({borderBottom:"2px solid #eee",borderLeft:"2px solid #eee",borderRight:"2px solid #eee",borderTop:"2px solid #eee",boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)"});break;case"topCenter":case"center":case"bottomCenter":case"inline":this.$bar.css({border:"1px solid #eee",boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)"}),this.$message.css({fontSize:"13px",textAlign:"center"});break;case"topLeft":case"topRight":case"bottomLeft":case"bottomRight":case"centerLeft":case"centerRight":this.$bar.css({border:"1px solid #eee",boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)"}),this.$message.css({fontSize:"13px",textAlign:"left"});break;case"bottom":this.$bar.css({borderTop:"2px solid #eee",borderLeft:"2px solid #eee",borderRight:"2px solid #eee",borderBottom:"2px solid #eee",boxShadow:"0 -2px 4px rgba(0, 0, 0, 0.1)"});break;default:this.$bar.css({border:"2px solid #eee",boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)"})}switch(this.options.type){case"alert":case"notification":this.$bar.css({backgroundColor:"#FFF",borderColor:"#dedede",color:"#444"});break;case"warning":this.$bar.css({backgroundColor:"#FFEAA8",borderColor:"#FFC237",color:"#826200"}),this.$buttons.css({borderTop:"1px solid #FFC237"});break;case"error":this.$bar.css({backgroundColor:"#FF8181",borderColor:"#e25353",color:"#FFF"}),this.$message.css({fontWeight:"bold"}),this.$buttons.css({borderTop:"1px solid darkred"});break;case"information":this.$bar.css({backgroundColor:"#78C5E7",borderColor:"#3badd6",color:"#FFF"}),this.$buttons.css({borderTop:"1px solid #0B90C4"});break;case"success":this.$bar.css({backgroundColor:"#BCF5BC",borderColor:"#7cdd77",color:"darkgreen"}),this.$buttons.css({borderTop:"1px solid #50C24E"});break;default:this.$bar.css({backgroundColor:"#FFF",borderColor:"#CCC",color:"#444"})}},callback:{onShow:function(){},onClose:function(){}}},window.noty});
/*!
 * fancyBox - jQuery Plugin
 * version: 2.1.5 (Fri, 14 Jun 2013)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */

(function (window, document, $, undefined) {
	"use strict";

	var H = $("html"),
		W = $(window),
		D = $(document),
		F = $.fancybox = function () {
			F.open.apply( this, arguments );
		},
		IE =  navigator.userAgent.match(/msie/i),
		didUpdate	= null,
		isTouch		= document.createTouch !== undefined,

		isQuery	= function(obj) {
			return obj && obj.hasOwnProperty && obj instanceof $;
		},
		isString = function(str) {
			return str && $.type(str) === "string";
		},
		isPercentage = function(str) {
			return isString(str) && str.indexOf('%') > 0;
		},
		isScrollable = function(el) {
			return (el && !(el.style.overflow && el.style.overflow === 'hidden') && ((el.clientWidth && el.scrollWidth > el.clientWidth) || (el.clientHeight && el.scrollHeight > el.clientHeight)));
		},
		getScalar = function(orig, dim) {
			var value = parseInt(orig, 10) || 0;

			if (dim && isPercentage(orig)) {
				value = F.getViewport()[ dim ] / 100 * value;
			}

			return Math.ceil(value);
		},
		getValue = function(value, dim) {
			return getScalar(value, dim) + 'px';
		};

	$.extend(F, {
		// The current version of fancyBox
		version: '2.1.5',

		defaults: {
			padding : 15,
			margin  : 20,

			width     : 800,
			height    : 600,
			minWidth  : 100,
			minHeight : 100,
			maxWidth  : 9999,
			maxHeight : 9999,
			pixelRatio: 1, // Set to 2 for retina display support

			autoSize   : true,
			autoHeight : false,
			autoWidth  : false,

			autoResize  : true,
			autoCenter  : !isTouch,
			fitToView   : true,
			aspectRatio : false,
			topRatio    : 0.5,
			leftRatio   : 0.5,

			scrolling : 'auto', // 'auto', 'yes' or 'no'
			wrapCSS   : '',

			arrows     : true,
			closeBtn   : true,
			closeClick : false,
			nextClick  : false,
			mouseWheel : true,
			autoPlay   : false,
			playSpeed  : 3000,
			preload    : 3,
			modal      : false,
			loop       : true,

			ajax  : {
				dataType : 'html',
				headers  : { 'X-fancyBox': true }
			},
			iframe : {
				scrolling : 'auto',
				preload   : true
			},
			swf : {
				wmode: 'transparent',
				allowfullscreen   : 'true',
				allowscriptaccess : 'always'
			},

			keys  : {
				next : {
					13 : 'left', // enter
					34 : 'up',   // page down
					39 : 'left', // right arrow
					40 : 'up'    // down arrow
				},
				prev : {
					8  : 'right',  // backspace
					33 : 'down',   // page up
					37 : 'right',  // left arrow
					38 : 'down'    // up arrow
				},
				close  : [27], // escape key
				play   : [32], // space - start/stop slideshow
				toggle : [70]  // letter "f" - toggle fullscreen
			},

			direction : {
				next : 'left',
				prev : 'right'
			},

			scrollOutside  : true,

			// Override some properties
			index   : 0,
			type    : null,
			href    : null,
			content : null,
			title   : null,

			// HTML templates
			tpl: {
				wrap     : '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
				image    : '<img class="fancybox-image" src="{href}" alt="" />',
				iframe   : '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (IE ? ' allowtransparency="true"' : '') + '></iframe>',
				error    : '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
				closeBtn : '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
				next     : '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
				prev     : '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
			},

			// Properties for each animation type
			// Opening fancyBox
			openEffect  : 'fade', // 'elastic', 'fade' or 'none'
			openSpeed   : 250,
			openEasing  : 'swing',
			openOpacity : true,
			openMethod  : 'zoomIn',

			// Closing fancyBox
			closeEffect  : 'fade', // 'elastic', 'fade' or 'none'
			closeSpeed   : 250,
			closeEasing  : 'swing',
			closeOpacity : true,
			closeMethod  : 'zoomOut',

			// Changing next gallery item
			nextEffect : 'elastic', // 'elastic', 'fade' or 'none'
			nextSpeed  : 250,
			nextEasing : 'swing',
			nextMethod : 'changeIn',

			// Changing previous gallery item
			prevEffect : 'elastic', // 'elastic', 'fade' or 'none'
			prevSpeed  : 250,
			prevEasing : 'swing',
			prevMethod : 'changeOut',

			// Enable default helpers
			helpers : {
				overlay : true,
				title   : true
			},

			// Callbacks
			onCancel     : $.noop, // If canceling
			beforeLoad   : $.noop, // Before loading
			afterLoad    : $.noop, // After loading
			beforeShow   : $.noop, // Before changing in current item
			afterShow    : $.noop, // After opening
			beforeChange : $.noop, // Before changing gallery item
			beforeClose  : $.noop, // Before closing
			afterClose   : $.noop  // After closing
		},

		//Current state
		group    : {}, // Selected group
		opts     : {}, // Group options
		previous : null,  // Previous element
		coming   : null,  // Element being loaded
		current  : null,  // Currently loaded element
		isActive : false, // Is activated
		isOpen   : false, // Is currently open
		isOpened : false, // Have been fully opened at least once

		wrap  : null,
		skin  : null,
		outer : null,
		inner : null,

		player : {
			timer    : null,
			isActive : false
		},

		// Loaders
		ajaxLoad   : null,
		imgPreload : null,

		// Some collections
		transitions : {},
		helpers     : {},

		/*
		 *	Static methods
		 */

		open: function (group, opts) {
			if (!group) {
				return;
			}

			if (!$.isPlainObject(opts)) {
				opts = {};
			}

			// Close if already active
			if (false === F.close(true)) {
				return;
			}

			// Normalize group
			if (!$.isArray(group)) {
				group = isQuery(group) ? $(group).get() : [group];
			}

			// Recheck if the type of each element is `object` and set content type (image, ajax, etc)
			$.each(group, function(i, element) {
				var obj = {},
					href,
					title,
					content,
					type,
					rez,
					hrefParts,
					selector;

				if ($.type(element) === "object") {
					// Check if is DOM element
					if (element.nodeType) {
						element = $(element);
					}

					if (isQuery(element)) {
						obj = {
							href    : element.data('fancybox-href') || element.attr('href'),
							title   : element.data('fancybox-title') || element.attr('title'),
							isDom   : true,
							element : element
						};

						if ($.metadata) {
							$.extend(true, obj, element.metadata());
						}

					} else {
						obj = element;
					}
				}

				href  = opts.href  || obj.href || (isString(element) ? element : null);
				title = opts.title !== undefined ? opts.title : obj.title || '';

				content = opts.content || obj.content;
				type    = content ? 'html' : (opts.type  || obj.type);

				if (!type && obj.isDom) {
					type = element.data('fancybox-type');

					if (!type) {
						rez  = element.prop('class').match(/fancybox\.(\w+)/);
						type = rez ? rez[1] : null;
					}
				}

				if (isString(href)) {
					// Try to guess the content type
					if (!type) {
						if (F.isImage(href)) {
							type = 'image';

						} else if (F.isSWF(href)) {
							type = 'swf';

						} else if (href.charAt(0) === '#') {
							type = 'inline';

						} else if (isString(element)) {
							type    = 'html';
							content = element;
						}
					}

					// Split url into two pieces with source url and content selector, e.g,
					// "/mypage.html #my_id" will load "/mypage.html" and display element having id "my_id"
					if (type === 'ajax') {
						hrefParts = href.split(/\s+/, 2);
						href      = hrefParts.shift();
						selector  = hrefParts.shift();
					}
				}

				if (!content) {
					if (type === 'inline') {
						if (href) {
							content = $( isString(href) ? href.replace(/.*(?=#[^\s]+$)/, '') : href ); //strip for ie7

						} else if (obj.isDom) {
							content = element;
						}

					} else if (type === 'html') {
						content = href;

					} else if (!type && !href && obj.isDom) {
						type    = 'inline';
						content = element;
					}
				}

				$.extend(obj, {
					href     : href,
					type     : type,
					content  : content,
					title    : title,
					selector : selector
				});

				group[ i ] = obj;
			});

			// Extend the defaults
			F.opts = $.extend(true, {}, F.defaults, opts);

			// All options are merged recursive except keys
			if (opts.keys !== undefined) {
				F.opts.keys = opts.keys ? $.extend({}, F.defaults.keys, opts.keys) : false;
			}

			F.group = group;

			return F._start(F.opts.index);
		},

		// Cancel image loading or abort ajax request
		cancel: function () {
			var coming = F.coming;

			if (!coming || false === F.trigger('onCancel')) {
				return;
			}

			F.hideLoading();

			if (F.ajaxLoad) {
				F.ajaxLoad.abort();
			}

			F.ajaxLoad = null;

			if (F.imgPreload) {
				F.imgPreload.onload = F.imgPreload.onerror = null;
			}

			if (coming.wrap) {
				coming.wrap.stop(true, true).trigger('onReset').remove();
			}

			F.coming = null;

			// If the first item has been canceled, then clear everything
			if (!F.current) {
				F._afterZoomOut( coming );
			}
		},

		// Start closing animation if is open; remove immediately if opening/closing
		close: function (event) {
			F.cancel();

			if (false === F.trigger('beforeClose')) {
				return;
			}

			F.unbindEvents();

			if (!F.isActive) {
				return;
			}

			if (!F.isOpen || event === true) {
				$('.fancybox-wrap').stop(true).trigger('onReset').remove();

				F._afterZoomOut();

			} else {
				F.isOpen = F.isOpened = false;
				F.isClosing = true;

				$('.fancybox-item, .fancybox-nav').remove();

				F.wrap.stop(true, true).removeClass('fancybox-opened');

				F.transitions[ F.current.closeMethod ]();
			}
		},

		// Manage slideshow:
		//   $.fancybox.play(); - toggle slideshow
		//   $.fancybox.play( true ); - start
		//   $.fancybox.play( false ); - stop
		play: function ( action ) {
			var clear = function () {
					clearTimeout(F.player.timer);
				},
				set = function () {
					clear();

					if (F.current && F.player.isActive) {
						F.player.timer = setTimeout(F.next, F.current.playSpeed);
					}
				},
				stop = function () {
					clear();

					D.unbind('.player');

					F.player.isActive = false;

					F.trigger('onPlayEnd');
				},
				start = function () {
					if (F.current && (F.current.loop || F.current.index < F.group.length - 1)) {
						F.player.isActive = true;

						D.bind({
							'onCancel.player beforeClose.player' : stop,
							'onUpdate.player'   : set,
							'beforeLoad.player' : clear
						});

						set();

						F.trigger('onPlayStart');
					}
				};

			if (action === true || (!F.player.isActive && action !== false)) {
				start();
			} else {
				stop();
			}
		},

		// Navigate to next gallery item
		next: function ( direction ) {
			var current = F.current;

			if (current) {
				if (!isString(direction)) {
					direction = current.direction.next;
				}

				F.jumpto(current.index + 1, direction, 'next');
			}
		},

		// Navigate to previous gallery item
		prev: function ( direction ) {
			var current = F.current;

			if (current) {
				if (!isString(direction)) {
					direction = current.direction.prev;
				}

				F.jumpto(current.index - 1, direction, 'prev');
			}
		},

		// Navigate to gallery item by index
		jumpto: function ( index, direction, router ) {
			var current = F.current;

			if (!current) {
				return;
			}

			index = getScalar(index);

			F.direction = direction || current.direction[ (index >= current.index ? 'next' : 'prev') ];
			F.router    = router || 'jumpto';

			if (current.loop) {
				if (index < 0) {
					index = current.group.length + (index % current.group.length);
				}

				index = index % current.group.length;
			}

			if (current.group[ index ] !== undefined) {
				F.cancel();

				F._start(index);
			}
		},

		// Center inside viewport and toggle position type to fixed or absolute if needed
		reposition: function (e, onlyAbsolute) {
			var current = F.current,
				wrap    = current ? current.wrap : null,
				pos;

			if (wrap) {
				pos = F._getPosition(onlyAbsolute);

				if (e && e.type === 'scroll') {
					delete pos.position;

					wrap.stop(true, true).animate(pos, 200);

				} else {
					wrap.css(pos);

					current.pos = $.extend({}, current.dim, pos);
				}
			}
		},

		update: function (e) {
			var type = (e && e.type),
				anyway = !type || type === 'orientationchange';

			if (anyway) {
				clearTimeout(didUpdate);

				didUpdate = null;
			}

			if (!F.isOpen || didUpdate) {
				return;
			}

			didUpdate = setTimeout(function() {
				var current = F.current;

				if (!current || F.isClosing) {
					return;
				}

				F.wrap.removeClass('fancybox-tmp');

				if (anyway || type === 'load' || (type === 'resize' && current.autoResize)) {
					F._setDimension();
				}

				if (!(type === 'scroll' && current.canShrink)) {
					F.reposition(e);
				}

				F.trigger('onUpdate');

				didUpdate = null;

			}, (anyway && !isTouch ? 0 : 300));
		},

		// Shrink content to fit inside viewport or restore if resized
		toggle: function ( action ) {
			if (F.isOpen) {
				F.current.fitToView = $.type(action) === "boolean" ? action : !F.current.fitToView;

				// Help browser to restore document dimensions
				if (isTouch) {
					F.wrap.removeAttr('style').addClass('fancybox-tmp');

					F.trigger('onUpdate');
				}

				F.update();
			}
		},

		hideLoading: function () {
			D.unbind('.loading');

			$('#fancybox-loading').remove();
		},

		showLoading: function () {
			var el, viewport;

			F.hideLoading();

			el = $('<div id="fancybox-loading"><div></div></div>').click(F.cancel).appendTo('body');

			// If user will press the escape-button, the request will be canceled
			D.bind('keydown.loading', function(e) {
				if ((e.which || e.keyCode) === 27) {
					e.preventDefault();

					F.cancel();
				}
			});

			if (!F.defaults.fixed) {
				viewport = F.getViewport();

				el.css({
					position : 'absolute',
					top  : (viewport.h * 0.5) + viewport.y,
					left : (viewport.w * 0.5) + viewport.x
				});
			}
		},

		getViewport: function () {
			var locked = (F.current && F.current.locked) || false,
				rez    = {
					x: W.scrollLeft(),
					y: W.scrollTop()
				};

			if (locked) {
				rez.w = locked[0].clientWidth;
				rez.h = locked[0].clientHeight;

			} else {
				// See http://bugs.jquery.com/ticket/6724
				rez.w = isTouch && window.innerWidth  ? window.innerWidth  : W.width();
				rez.h = isTouch && window.innerHeight ? window.innerHeight : W.height();
			}

			return rez;
		},

		// Unbind the keyboard / clicking actions
		unbindEvents: function () {
			if (F.wrap && isQuery(F.wrap)) {
				F.wrap.unbind('.fb');
			}

			D.unbind('.fb');
			W.unbind('.fb');
		},

		bindEvents: function () {
			var current = F.current,
				keys;

			if (!current) {
				return;
			}

			// Changing document height on iOS devices triggers a 'resize' event,
			// that can change document height... repeating infinitely
			W.bind('orientationchange.fb' + (isTouch ? '' : ' resize.fb') + (current.autoCenter && !current.locked ? ' scroll.fb' : ''), F.update);

			keys = current.keys;

			if (keys) {
				D.bind('keydown.fb', function (e) {
					var code   = e.which || e.keyCode,
						target = e.target || e.srcElement;

					// Skip esc key if loading, because showLoading will cancel preloading
					if (code === 27 && F.coming) {
						return false;
					}

					// Ignore key combinations and key events within form elements
					if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey && !(target && (target.type || $(target).is('[contenteditable]')))) {
						$.each(keys, function(i, val) {
							if (current.group.length > 1 && val[ code ] !== undefined) {
								F[ i ]( val[ code ] );

								e.preventDefault();
								return false;
							}

							if ($.inArray(code, val) > -1) {
								F[ i ] ();

								e.preventDefault();
								return false;
							}
						});
					}
				});
			}

			if ($.fn.mousewheel && current.mouseWheel) {
				F.wrap.bind('mousewheel.fb', function (e, delta, deltaX, deltaY) {
					var target = e.target || null,
						parent = $(target),
						canScroll = false;

					while (parent.length) {
						if (canScroll || parent.is('.fancybox-skin') || parent.is('.fancybox-wrap')) {
							break;
						}

						canScroll = isScrollable( parent[0] );
						parent    = $(parent).parent();
					}

					if (delta !== 0 && !canScroll) {
						if (F.group.length > 1 && !current.canShrink) {
							if (deltaY > 0 || deltaX > 0) {
								F.prev( deltaY > 0 ? 'down' : 'left' );

							} else if (deltaY < 0 || deltaX < 0) {
								F.next( deltaY < 0 ? 'up' : 'right' );
							}

							e.preventDefault();
						}
					}
				});
			}
		},

		trigger: function (event, o) {
			var ret, obj = o || F.coming || F.current;

			if (!obj) {
				return;
			}

			if ($.isFunction( obj[event] )) {
				ret = obj[event].apply(obj, Array.prototype.slice.call(arguments, 1));
			}

			if (ret === false) {
				return false;
			}

			if (obj.helpers) {
				$.each(obj.helpers, function (helper, opts) {
					if (opts && F.helpers[helper] && $.isFunction(F.helpers[helper][event])) {
						F.helpers[helper][event]($.extend(true, {}, F.helpers[helper].defaults, opts), obj);
					}
				});
			}

			D.trigger(event);
		},

		isImage: function (str) {
			return isString(str) && str.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
		},

		isSWF: function (str) {
			return isString(str) && str.match(/\.(swf)((\?|#).*)?$/i);
		},

		_start: function (index) {
			var coming = {},
				obj,
				href,
				type,
				margin,
				padding;

			index = getScalar( index );
			obj   = F.group[ index ] || null;

			if (!obj) {
				return false;
			}

			coming = $.extend(true, {}, F.opts, obj);

			// Convert margin and padding properties to array - top, right, bottom, left
			margin  = coming.margin;
			padding = coming.padding;

			if ($.type(margin) === 'number') {
				coming.margin = [margin, margin, margin, margin];
			}

			if ($.type(padding) === 'number') {
				coming.padding = [padding, padding, padding, padding];
			}

			// 'modal' propery is just a shortcut
			if (coming.modal) {
				$.extend(true, coming, {
					closeBtn   : false,
					closeClick : false,
					nextClick  : false,
					arrows     : false,
					mouseWheel : false,
					keys       : null,
					helpers: {
						overlay : {
							closeClick : false
						}
					}
				});
			}

			// 'autoSize' property is a shortcut, too
			if (coming.autoSize) {
				coming.autoWidth = coming.autoHeight = true;
			}

			if (coming.width === 'auto') {
				coming.autoWidth = true;
			}

			if (coming.height === 'auto') {
				coming.autoHeight = true;
			}

			/*
			 * Add reference to the group, so it`s possible to access from callbacks, example:
			 * afterLoad : function() {
			 *     this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
			 * }
			 */

			coming.group  = F.group;
			coming.index  = index;

			// Give a chance for callback or helpers to update coming item (type, title, etc)
			F.coming = coming;

			if (false === F.trigger('beforeLoad')) {
				F.coming = null;

				return;
			}

			type = coming.type;
			href = coming.href;

			if (!type) {
				F.coming = null;

				//If we can not determine content type then drop silently or display next/prev item if looping through gallery
				if (F.current && F.router && F.router !== 'jumpto') {
					F.current.index = index;

					return F[ F.router ]( F.direction );
				}

				return false;
			}

			F.isActive = true;

			if (type === 'image' || type === 'swf') {
				coming.autoHeight = coming.autoWidth = false;
				coming.scrolling  = 'visible';
			}

			if (type === 'image') {
				coming.aspectRatio = true;
			}

			if (type === 'iframe' && isTouch) {
				coming.scrolling = 'scroll';
			}

			// Build the neccessary markup
			coming.wrap = $(coming.tpl.wrap).addClass('fancybox-' + (isTouch ? 'mobile' : 'desktop') + ' fancybox-type-' + type + ' fancybox-tmp ' + coming.wrapCSS).appendTo( coming.parent || 'body' );

			$.extend(coming, {
				skin  : $('.fancybox-skin',  coming.wrap),
				outer : $('.fancybox-outer', coming.wrap),
				inner : $('.fancybox-inner', coming.wrap)
			});

			$.each(["Top", "Right", "Bottom", "Left"], function(i, v) {
				coming.skin.css('padding' + v, getValue(coming.padding[ i ]));
			});

			F.trigger('onReady');

			// Check before try to load; 'inline' and 'html' types need content, others - href
			if (type === 'inline' || type === 'html') {
				if (!coming.content || !coming.content.length) {
					return F._error( 'content' );
				}

			} else if (!href) {
				return F._error( 'href' );
			}

			if (type === 'image') {
				F._loadImage();

			} else if (type === 'ajax') {
				F._loadAjax();

			} else if (type === 'iframe') {
				F._loadIframe();

			} else {
				F._afterLoad();
			}
		},

		_error: function ( type ) {
			$.extend(F.coming, {
				type       : 'html',
				autoWidth  : true,
				autoHeight : true,
				minWidth   : 0,
				minHeight  : 0,
				scrolling  : 'no',
				hasError   : type,
				content    : F.coming.tpl.error
			});

			F._afterLoad();
		},

		_loadImage: function () {
			// Reset preload image so it is later possible to check "complete" property
			var img = F.imgPreload = new Image();

			img.onload = function () {
				this.onload = this.onerror = null;

				F.coming.width  = this.width / F.opts.pixelRatio;
				F.coming.height = this.height / F.opts.pixelRatio;

				F._afterLoad();
			};

			img.onerror = function () {
				this.onload = this.onerror = null;

				F._error( 'image' );
			};

			img.src = F.coming.href;

			if (img.complete !== true) {
				F.showLoading();
			}
		},

		_loadAjax: function () {
			var coming = F.coming;

			F.showLoading();

			F.ajaxLoad = $.ajax($.extend({}, coming.ajax, {
				url: coming.href,
				error: function (jqXHR, textStatus) {
					if (F.coming && textStatus !== 'abort') {
						F._error( 'ajax', jqXHR );

					} else {
						F.hideLoading();
					}
				},
				success: function (data, textStatus) {
					if (textStatus === 'success') {
						coming.content = data;

						F._afterLoad();
					}
				}
			}));
		},

		_loadIframe: function() {
			var coming = F.coming,
				iframe = $(coming.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime()))
					.attr('scrolling', isTouch ? 'auto' : coming.iframe.scrolling)
					.attr('src', coming.href);

			// This helps IE
			$(coming.wrap).bind('onReset', function () {
				try {
					$(this).find('iframe').hide().attr('src', '//about:blank').end().empty();
				} catch (e) {}
			});

			if (coming.iframe.preload) {
				F.showLoading();

				iframe.one('load', function() {
					$(this).data('ready', 1);

					// iOS will lose scrolling if we resize
					if (!isTouch) {
						$(this).bind('load.fb', F.update);
					}

					// Without this trick:
					//   - iframe won't scroll on iOS devices
					//   - IE7 sometimes displays empty iframe
					$(this).parents('.fancybox-wrap').width('100%').removeClass('fancybox-tmp').show();

					F._afterLoad();
				});
			}

			coming.content = iframe.appendTo( coming.inner );

			if (!coming.iframe.preload) {
				F._afterLoad();
			}
		},

		_preloadImages: function() {
			var group   = F.group,
				current = F.current,
				len     = group.length,
				cnt     = current.preload ? Math.min(current.preload, len - 1) : 0,
				item,
				i;

			for (i = 1; i <= cnt; i += 1) {
				item = group[ (current.index + i ) % len ];

				if (item.type === 'image' && item.href) {
					new Image().src = item.href;
				}
			}
		},

		_afterLoad: function () {
			var coming   = F.coming,
				previous = F.current,
				placeholder = 'fancybox-placeholder',
				current,
				content,
				type,
				scrolling,
				href,
				embed;

			F.hideLoading();

			if (!coming || F.isActive === false) {
				return;
			}

			if (false === F.trigger('afterLoad', coming, previous)) {
				coming.wrap.stop(true).trigger('onReset').remove();

				F.coming = null;

				return;
			}

			if (previous) {
				F.trigger('beforeChange', previous);

				previous.wrap.stop(true).removeClass('fancybox-opened')
					.find('.fancybox-item, .fancybox-nav')
					.remove();
			}

			F.unbindEvents();

			current   = coming;
			content   = coming.content;
			type      = coming.type;
			scrolling = coming.scrolling;

			$.extend(F, {
				wrap  : current.wrap,
				skin  : current.skin,
				outer : current.outer,
				inner : current.inner,
				current  : current,
				previous : previous
			});

			href = current.href;

			switch (type) {
				case 'inline':
				case 'ajax':
				case 'html':
					if (current.selector) {
						content = $('<div>').html(content).find(current.selector);

					} else if (isQuery(content)) {
						if (!content.data(placeholder)) {
							content.data(placeholder, $('<div class="' + placeholder + '"></div>').insertAfter( content ).hide() );
						}

						content = content.show().detach();

						current.wrap.bind('onReset', function () {
							if ($(this).find(content).length) {
								content.hide().replaceAll( content.data(placeholder) ).data(placeholder, false);
							}
						});
					}
				break;

				case 'image':
					content = current.tpl.image.replace('{href}', href);
				break;

				case 'swf':
					content = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + href + '"></param>';
					embed   = '';

					$.each(current.swf, function(name, val) {
						content += '<param name="' + name + '" value="' + val + '"></param>';
						embed   += ' ' + name + '="' + val + '"';
					});

					content += '<embed src="' + href + '" type="application/x-shockwave-flash" width="100%" height="100%"' + embed + '></embed></object>';
				break;
			}

			if (!(isQuery(content) && content.parent().is(current.inner))) {
				current.inner.append( content );
			}

			// Give a chance for helpers or callbacks to update elements
			F.trigger('beforeShow');

			// Set scrolling before calculating dimensions
			current.inner.css('overflow', scrolling === 'yes' ? 'scroll' : (scrolling === 'no' ? 'hidden' : scrolling));

			// Set initial dimensions and start position
			F._setDimension();

			F.reposition();

			F.isOpen = false;
			F.coming = null;

			F.bindEvents();

			if (!F.isOpened) {
				$('.fancybox-wrap').not( current.wrap ).stop(true).trigger('onReset').remove();

			} else if (previous.prevMethod) {
				F.transitions[ previous.prevMethod ]();
			}

			F.transitions[ F.isOpened ? current.nextMethod : current.openMethod ]();

			F._preloadImages();
		},

		_setDimension: function () {
			var viewport   = F.getViewport(),
				steps      = 0,
				canShrink  = false,
				canExpand  = false,
				wrap       = F.wrap,
				skin       = F.skin,
				inner      = F.inner,
				current    = F.current,
				width      = current.width,
				height     = current.height,
				minWidth   = current.minWidth,
				minHeight  = current.minHeight,
				maxWidth   = current.maxWidth,
				maxHeight  = current.maxHeight,
				scrolling  = current.scrolling,
				scrollOut  = current.scrollOutside ? current.scrollbarWidth : 0,
				margin     = current.margin,
				wMargin    = getScalar(margin[1] + margin[3]),
				hMargin    = getScalar(margin[0] + margin[2]),
				wPadding,
				hPadding,
				wSpace,
				hSpace,
				origWidth,
				origHeight,
				origMaxWidth,
				origMaxHeight,
				ratio,
				width_,
				height_,
				maxWidth_,
				maxHeight_,
				iframe,
				body;

			// Reset dimensions so we could re-check actual size
			wrap.add(skin).add(inner).width('auto').height('auto').removeClass('fancybox-tmp');

			wPadding = getScalar(skin.outerWidth(true)  - skin.width());
			hPadding = getScalar(skin.outerHeight(true) - skin.height());

			// Any space between content and viewport (margin, padding, border, title)
			wSpace = wMargin + wPadding;
			hSpace = hMargin + hPadding;

			origWidth  = isPercentage(width)  ? (viewport.w - wSpace) * getScalar(width)  / 100 : width;
			origHeight = isPercentage(height) ? (viewport.h - hSpace) * getScalar(height) / 100 : height;

			if (current.type === 'iframe') {
				iframe = current.content;

				if (current.autoHeight && iframe.data('ready') === 1) {
					try {
						if (iframe[0].contentWindow.document.location) {
							inner.width( origWidth ).height(9999);

							body = iframe.contents().find('body');

							if (scrollOut) {
								body.css('overflow-x', 'hidden');
							}

							origHeight = body.outerHeight(true);
						}

					} catch (e) {}
				}

			} else if (current.autoWidth || current.autoHeight) {
				inner.addClass( 'fancybox-tmp' );

				// Set width or height in case we need to calculate only one dimension
				if (!current.autoWidth) {
					inner.width( origWidth );
				}

				if (!current.autoHeight) {
					inner.height( origHeight );
				}

				if (current.autoWidth) {
					origWidth = inner.width();
				}

				if (current.autoHeight) {
					origHeight = inner.height();
				}

				inner.removeClass( 'fancybox-tmp' );
			}

			width  = getScalar( origWidth );
			height = getScalar( origHeight );

			ratio  = origWidth / origHeight;

			// Calculations for the content
			minWidth  = getScalar(isPercentage(minWidth) ? getScalar(minWidth, 'w') - wSpace : minWidth);
			maxWidth  = getScalar(isPercentage(maxWidth) ? getScalar(maxWidth, 'w') - wSpace : maxWidth);

			minHeight = getScalar(isPercentage(minHeight) ? getScalar(minHeight, 'h') - hSpace : minHeight);
			maxHeight = getScalar(isPercentage(maxHeight) ? getScalar(maxHeight, 'h') - hSpace : maxHeight);

			// These will be used to determine if wrap can fit in the viewport
			origMaxWidth  = maxWidth;
			origMaxHeight = maxHeight;

			if (current.fitToView) {
				maxWidth  = Math.min(viewport.w - wSpace, maxWidth);
				maxHeight = Math.min(viewport.h - hSpace, maxHeight);
			}

			maxWidth_  = viewport.w - wMargin;
			maxHeight_ = viewport.h - hMargin;

			if (current.aspectRatio) {
				if (width > maxWidth) {
					width  = maxWidth;
					height = getScalar(width / ratio);
				}

				if (height > maxHeight) {
					height = maxHeight;
					width  = getScalar(height * ratio);
				}

				if (width < minWidth) {
					width  = minWidth;
					height = getScalar(width / ratio);
				}

				if (height < minHeight) {
					height = minHeight;
					width  = getScalar(height * ratio);
				}

			} else {
				width = Math.max(minWidth, Math.min(width, maxWidth));

				if (current.autoHeight && current.type !== 'iframe') {
					inner.width( width );

					height = inner.height();
				}

				height = Math.max(minHeight, Math.min(height, maxHeight));
			}

			// Try to fit inside viewport (including the title)
			if (current.fitToView) {
				inner.width( width ).height( height );

				wrap.width( width + wPadding );

				// Real wrap dimensions
				width_  = wrap.width();
				height_ = wrap.height();

				if (current.aspectRatio) {
					while ((width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight) {
						if (steps++ > 19) {
							break;
						}

						height = Math.max(minHeight, Math.min(maxHeight, height - 10));
						width  = getScalar(height * ratio);

						if (width < minWidth) {
							width  = minWidth;
							height = getScalar(width / ratio);
						}

						if (width > maxWidth) {
							width  = maxWidth;
							height = getScalar(width / ratio);
						}

						inner.width( width ).height( height );

						wrap.width( width + wPadding );

						width_  = wrap.width();
						height_ = wrap.height();
					}

				} else {
					width  = Math.max(minWidth,  Math.min(width,  width  - (width_  - maxWidth_)));
					height = Math.max(minHeight, Math.min(height, height - (height_ - maxHeight_)));
				}
			}

			if (scrollOut && scrolling === 'auto' && height < origHeight && (width + wPadding + scrollOut) < maxWidth_) {
				width += scrollOut;
			}

			inner.width( width ).height( height );

			wrap.width( width + wPadding );

			width_  = wrap.width();
			height_ = wrap.height();

			canShrink = (width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight;
			canExpand = current.aspectRatio ? (width < origMaxWidth && height < origMaxHeight && width < origWidth && height < origHeight) : ((width < origMaxWidth || height < origMaxHeight) && (width < origWidth || height < origHeight));

			$.extend(current, {
				dim : {
					width	: getValue( width_ ),
					height	: getValue( height_ )
				},
				origWidth  : origWidth,
				origHeight : origHeight,
				canShrink  : canShrink,
				canExpand  : canExpand,
				wPadding   : wPadding,
				hPadding   : hPadding,
				wrapSpace  : height_ - skin.outerHeight(true),
				skinSpace  : skin.height() - height
			});

			if (!iframe && current.autoHeight && height > minHeight && height < maxHeight && !canExpand) {
				inner.height('auto');
			}
		},

		_getPosition: function (onlyAbsolute) {
			var current  = F.current,
				viewport = F.getViewport(),
				margin   = current.margin,
				width    = F.wrap.width()  + margin[1] + margin[3],
				height   = F.wrap.height() + margin[0] + margin[2],
				rez      = {
					position: 'absolute',
					top  : margin[0],
					left : margin[3]
				};

			if (current.autoCenter && current.fixed && !onlyAbsolute && height <= viewport.h && width <= viewport.w) {
				rez.position = 'fixed';

			} else if (!current.locked) {
				rez.top  += viewport.y;
				rez.left += viewport.x;
			}

			rez.top  = getValue(Math.max(rez.top,  rez.top  + ((viewport.h - height) * current.topRatio)));
			rez.left = getValue(Math.max(rez.left, rez.left + ((viewport.w - width)  * current.leftRatio)));

			return rez;
		},

		_afterZoomIn: function () {
			var current = F.current;

			if (!current) {
				return;
			}

			F.isOpen = F.isOpened = true;

			F.wrap.css('overflow', 'visible').addClass('fancybox-opened');

			F.update();

			// Assign a click event
			if ( current.closeClick || (current.nextClick && F.group.length > 1) ) {
				F.inner.css('cursor', 'pointer').bind('click.fb', function(e) {
					if (!$(e.target).is('a') && !$(e.target).parent().is('a')) {
						e.preventDefault();

						F[ current.closeClick ? 'close' : 'next' ]();
					}
				});
			}

			// Create a close button
			if (current.closeBtn) {
				$(current.tpl.closeBtn).appendTo(F.skin).bind('click.fb', function(e) {
					e.preventDefault();

					F.close();
				});
			}

			// Create navigation arrows
			if (current.arrows && F.group.length > 1) {
				if (current.loop || current.index > 0) {
					$(current.tpl.prev).appendTo(F.outer).bind('click.fb', F.prev);
				}

				if (current.loop || current.index < F.group.length - 1) {
					$(current.tpl.next).appendTo(F.outer).bind('click.fb', F.next);
				}
			}

			F.trigger('afterShow');

			// Stop the slideshow if this is the last item
			if (!current.loop && current.index === current.group.length - 1) {
				F.play( false );

			} else if (F.opts.autoPlay && !F.player.isActive) {
				F.opts.autoPlay = false;

				F.play();
			}
		},

		_afterZoomOut: function ( obj ) {
			obj = obj || F.current;

			$('.fancybox-wrap').trigger('onReset').remove();

			$.extend(F, {
				group  : {},
				opts   : {},
				router : false,
				current   : null,
				isActive  : false,
				isOpened  : false,
				isOpen    : false,
				isClosing : false,
				wrap   : null,
				skin   : null,
				outer  : null,
				inner  : null
			});

			F.trigger('afterClose', obj);
		}
	});

	/*
	 *	Default transitions
	 */

	F.transitions = {
		getOrigPosition: function () {
			var current  = F.current,
				element  = current.element,
				orig     = current.orig,
				pos      = {},
				width    = 50,
				height   = 50,
				hPadding = current.hPadding,
				wPadding = current.wPadding,
				viewport = F.getViewport();

			if (!orig && current.isDom && element.is(':visible')) {
				orig = element.find('img:first');

				if (!orig.length) {
					orig = element;
				}
			}

			if (isQuery(orig)) {
				pos = orig.offset();

				if (orig.is('img')) {
					width  = orig.outerWidth();
					height = orig.outerHeight();
				}

			} else {
				pos.top  = viewport.y + (viewport.h - height) * current.topRatio;
				pos.left = viewport.x + (viewport.w - width)  * current.leftRatio;
			}

			if (F.wrap.css('position') === 'fixed' || current.locked) {
				pos.top  -= viewport.y;
				pos.left -= viewport.x;
			}

			pos = {
				top     : getValue(pos.top  - hPadding * current.topRatio),
				left    : getValue(pos.left - wPadding * current.leftRatio),
				width   : getValue(width  + wPadding),
				height  : getValue(height + hPadding)
			};

			return pos;
		},

		step: function (now, fx) {
			var ratio,
				padding,
				value,
				prop       = fx.prop,
				current    = F.current,
				wrapSpace  = current.wrapSpace,
				skinSpace  = current.skinSpace;

			if (prop === 'width' || prop === 'height') {
				ratio = fx.end === fx.start ? 1 : (now - fx.start) / (fx.end - fx.start);

				if (F.isClosing) {
					ratio = 1 - ratio;
				}

				padding = prop === 'width' ? current.wPadding : current.hPadding;
				value   = now - padding;

				F.skin[ prop ](  getScalar( prop === 'width' ?  value : value - (wrapSpace * ratio) ) );
				F.inner[ prop ]( getScalar( prop === 'width' ?  value : value - (wrapSpace * ratio) - (skinSpace * ratio) ) );
			}
		},

		zoomIn: function () {
			var current  = F.current,
				startPos = current.pos,
				effect   = current.openEffect,
				elastic  = effect === 'elastic',
				endPos   = $.extend({opacity : 1}, startPos);

			// Remove "position" property that breaks older IE
			delete endPos.position;

			if (elastic) {
				startPos = this.getOrigPosition();

				if (current.openOpacity) {
					startPos.opacity = 0.1;
				}

			} else if (effect === 'fade') {
				startPos.opacity = 0.1;
			}

			F.wrap.css(startPos).animate(endPos, {
				duration : effect === 'none' ? 0 : current.openSpeed,
				easing   : current.openEasing,
				step     : elastic ? this.step : null,
				complete : F._afterZoomIn
			});
		},

		zoomOut: function () {
			var current  = F.current,
				effect   = current.closeEffect,
				elastic  = effect === 'elastic',
				endPos   = {opacity : 0.1};

			if (elastic) {
				endPos = this.getOrigPosition();

				if (current.closeOpacity) {
					endPos.opacity = 0.1;
				}
			}

			F.wrap.animate(endPos, {
				duration : effect === 'none' ? 0 : current.closeSpeed,
				easing   : current.closeEasing,
				step     : elastic ? this.step : null,
				complete : F._afterZoomOut
			});
		},

		changeIn: function () {
			var current   = F.current,
				effect    = current.nextEffect,
				startPos  = current.pos,
				endPos    = { opacity : 1 },
				direction = F.direction,
				distance  = 200,
				field;

			startPos.opacity = 0.1;

			if (effect === 'elastic') {
				field = direction === 'down' || direction === 'up' ? 'top' : 'left';

				if (direction === 'down' || direction === 'right') {
					startPos[ field ] = getValue(getScalar(startPos[ field ]) - distance);
					endPos[ field ]   = '+=' + distance + 'px';

				} else {
					startPos[ field ] = getValue(getScalar(startPos[ field ]) + distance);
					endPos[ field ]   = '-=' + distance + 'px';
				}
			}

			// Workaround for http://bugs.jquery.com/ticket/12273
			if (effect === 'none') {
				F._afterZoomIn();

			} else {
				F.wrap.css(startPos).animate(endPos, {
					duration : current.nextSpeed,
					easing   : current.nextEasing,
					complete : F._afterZoomIn
				});
			}
		},

		changeOut: function () {
			var previous  = F.previous,
				effect    = previous.prevEffect,
				endPos    = { opacity : 0.1 },
				direction = F.direction,
				distance  = 200;

			if (effect === 'elastic') {
				endPos[ direction === 'down' || direction === 'up' ? 'top' : 'left' ] = ( direction === 'up' || direction === 'left' ? '-' : '+' ) + '=' + distance + 'px';
			}

			previous.wrap.animate(endPos, {
				duration : effect === 'none' ? 0 : previous.prevSpeed,
				easing   : previous.prevEasing,
				complete : function () {
					$(this).trigger('onReset').remove();
				}
			});
		}
	};

	/*
	 *	Overlay helper
	 */

	F.helpers.overlay = {
		defaults : {
			closeClick : true,      // if true, fancyBox will be closed when user clicks on the overlay
			speedOut   : 200,       // duration of fadeOut animation
			showEarly  : true,      // indicates if should be opened immediately or wait until the content is ready
			css        : {},        // custom CSS properties
			locked     : !isTouch,  // if true, the content will be locked into overlay
			fixed      : true       // if false, the overlay CSS position property will not be set to "fixed"
		},

		overlay : null,      // current handle
		fixed   : false,     // indicates if the overlay has position "fixed"
		el      : $('html'), // element that contains "the lock"

		// Public methods
		create : function(opts) {
			opts = $.extend({}, this.defaults, opts);

			if (this.overlay) {
				this.close();
			}

			this.overlay = $('<div class="fancybox-overlay"></div>').appendTo( F.coming ? F.coming.parent : opts.parent );
			this.fixed   = false;

			if (opts.fixed && F.defaults.fixed) {
				this.overlay.addClass('fancybox-overlay-fixed');

				this.fixed = true;
			}
		},

		open : function(opts) {
			var that = this;

			opts = $.extend({}, this.defaults, opts);

			if (this.overlay) {
				this.overlay.unbind('.overlay').width('auto').height('auto');

			} else {
				this.create(opts);
			}

			if (!this.fixed) {
				W.bind('resize.overlay', $.proxy( this.update, this) );

				this.update();
			}

			if (opts.closeClick) {
				this.overlay.bind('click.overlay', function(e) {
					if ($(e.target).hasClass('fancybox-overlay')) {
						if (F.isActive) {
							F.close();
						} else {
							that.close();
						}

						return false;
					}
				});
			}

			this.overlay.css( opts.css ).show();
		},

		close : function() {
			var scrollV, scrollH;

			W.unbind('resize.overlay');

			if (this.el.hasClass('fancybox-lock')) {
				$('.fancybox-margin').removeClass('fancybox-margin');

				scrollV = W.scrollTop();
				scrollH = W.scrollLeft();

				this.el.removeClass('fancybox-lock');

				W.scrollTop( scrollV ).scrollLeft( scrollH );
			}

			$('.fancybox-overlay').remove().hide();

			$.extend(this, {
				overlay : null,
				fixed   : false
			});
		},

		// Private, callbacks

		update : function () {
			var width = '100%', offsetWidth;

			// Reset width/height so it will not mess
			this.overlay.width(width).height('100%');

			// jQuery does not return reliable result for IE
			if (IE) {
				offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);

				if (D.width() > offsetWidth) {
					width = D.width();
				}

			} else if (D.width() > W.width()) {
				width = D.width();
			}

			this.overlay.width(width).height(D.height());
		},

		// This is where we can manipulate DOM, because later it would cause iframes to reload
		onReady : function (opts, obj) {
			var overlay = this.overlay;

			$('.fancybox-overlay').stop(true, true);

			if (!overlay) {
				this.create(opts);
			}

			if (opts.locked && this.fixed && obj.fixed) {
				if (!overlay) {
					this.margin = D.height() > W.height() ? $('html').css('margin-right').replace("px", "") : false;
				}

				obj.locked = this.overlay.append( obj.wrap );
				obj.fixed  = false;
			}

			if (opts.showEarly === true) {
				this.beforeShow.apply(this, arguments);
			}
		},

		beforeShow : function(opts, obj) {
			var scrollV, scrollH;

			if (obj.locked) {
				if (this.margin !== false) {
					$('*').filter(function(){
						return ($(this).css('position') === 'fixed' && !$(this).hasClass("fancybox-overlay") && !$(this).hasClass("fancybox-wrap") );
					}).addClass('fancybox-margin');

					this.el.addClass('fancybox-margin');
				}

				scrollV = W.scrollTop();
				scrollH = W.scrollLeft();

				this.el.addClass('fancybox-lock');

				W.scrollTop( scrollV ).scrollLeft( scrollH );
			}

			this.open(opts);
		},

		onUpdate : function() {
			if (!this.fixed) {
				this.update();
			}
		},

		afterClose: function (opts) {
			// Remove overlay if exists and fancyBox is not opening
			// (e.g., it is not being open using afterClose callback)
			//if (this.overlay && !F.isActive) {
			if (this.overlay && !F.coming) {
				this.overlay.fadeOut(opts.speedOut, $.proxy( this.close, this ));
			}
		}
	};

	/*
	 *	Title helper
	 */

	F.helpers.title = {
		defaults : {
			type     : 'float', // 'float', 'inside', 'outside' or 'over',
			position : 'bottom' // 'top' or 'bottom'
		},

		beforeShow: function (opts) {
			var current = F.current,
				text    = current.title,
				type    = opts.type,
				title,
				target;

			if ($.isFunction(text)) {
				text = text.call(current.element, current);
			}

			if (!isString(text) || $.trim(text) === '') {
				return;
			}

			title = $('<div class="fancybox-title fancybox-title-' + type + '-wrap">' + text + '</div>');

			switch (type) {
				case 'inside':
					target = F.skin;
				break;

				case 'outside':
					target = F.wrap;
				break;

				case 'over':
					target = F.inner;
				break;

				default: // 'float'
					target = F.skin;

					title.appendTo('body');

					if (IE) {
						title.width( title.width() );
					}

					title.wrapInner('<span class="child"></span>');

					//Increase bottom margin so this title will also fit into viewport
					F.current.margin[2] += Math.abs( getScalar(title.css('margin-bottom')) );
				break;
			}

			title[ (opts.position === 'top' ? 'prependTo'  : 'appendTo') ](target);
		}
	};

	// jQuery plugin initialization
	$.fn.fancybox = function (options) {
		var index,
			that     = $(this),
			selector = this.selector || '',
			run      = function(e) {
				var what = $(this).blur(), idx = index, relType, relVal;

				if (!(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && !what.is('.fancybox-wrap')) {
					relType = options.groupAttr || 'data-fancybox-group';
					relVal  = what.attr(relType);

					if (!relVal) {
						relType = 'rel';
						relVal  = what.get(0)[ relType ];
					}

					if (relVal && relVal !== '' && relVal !== 'nofollow') {
						what = selector.length ? $(selector) : that;
						what = what.filter('[' + relType + '="' + relVal + '"]');
						idx  = what.index(this);
					}

					options.index = idx;

					// Stop an event from bubbling if everything is fine
					if (F.open(what, options) !== false) {
						e.preventDefault();
					}
				}
			};

		options = options || {};
		index   = options.index || 0;

		if (!selector || options.live === false) {
			that.unbind('click.fb-start').bind('click.fb-start', run);

		} else {
			D.undelegate(selector, 'click.fb-start').delegate(selector + ":not('.fancybox-item, .fancybox-nav')", 'click.fb-start', run);
		}

		this.filter('[data-fancybox-start=1]').trigger('click');

		return this;
	};

	// Tests that need a body at doc ready
	D.ready(function() {
		var w1, w2;

		if ( $.scrollbarWidth === undefined ) {
			// http://benalman.com/projects/jquery-misc-plugins/#scrollbarwidth
			$.scrollbarWidth = function() {
				var parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),
					child  = parent.children(),
					width  = child.innerWidth() - child.height( 99 ).innerWidth();

				parent.remove();

				return width;
			};
		}

		if ( $.support.fixedPosition === undefined ) {
			$.support.fixedPosition = (function() {
				var elem  = $('<div style="position:fixed;top:20px;"></div>').appendTo('body'),
					fixed = ( elem[0].offsetTop === 20 || elem[0].offsetTop === 15 );

				elem.remove();

				return fixed;
			}());
		}

		$.extend(F.defaults, {
			scrollbarWidth : $.scrollbarWidth(),
			fixed  : $.support.fixedPosition,
			parent : $('body')
		});

		//Get real width of page scroll-bar
		w1 = $(window).width();

		H.addClass('fancybox-lock-test');

		w2 = $(window).width();

		H.removeClass('fancybox-lock-test');

		$("<style type='text/css'>.fancybox-margin{margin-right:" + (w2 - w1) + "px;}</style>").appendTo("head");
	});

}(window, document, jQuery));
/*!
Waypoints - 4.0.1
Copyright © 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
!function(){"use strict";function t(o){if(!o)throw new Error("No options passed to Waypoint constructor");if(!o.element)throw new Error("No element option passed to Waypoint constructor");if(!o.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,o),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=o.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var o in i)e.push(i[o]);for(var n=0,r=e.length;r>n;n++)e[n][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.Context.refreshAll();for(var e in i)i[e].enabled=!0;return this},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=n.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,o[t.waypointContextKey]=this,i+=1,n.windowContext||(n.windowContext=!0,n.windowContext=new e(window)),this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,o={},n=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical),i=this.element==this.element.window;t&&e&&!i&&(this.adapter.off(".waypoints"),delete o[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,n.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||n.isTouch)&&(e.didScroll=!0,n.requestAnimationFrame(t))})},e.prototype.handleResize=function(){n.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var o=e[i],n=o.newScroll>o.oldScroll,r=n?o.forward:o.backward;for(var s in this.waypoints[i]){var a=this.waypoints[i][s];if(null!==a.triggerPoint){var l=o.oldScroll<a.triggerPoint,h=o.newScroll>=a.triggerPoint,p=l&&h,u=!l&&!h;(p||u)&&(a.queueTrigger(r),t[a.group.id]=a.group)}}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?n.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?n.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var o=0,n=t.length;n>o;o++)t[o].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,i=e?void 0:this.adapter.offset(),o={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var r in t){var s=t[r];for(var a in this.waypoints[r]){var l,h,p,u,c,d=this.waypoints[r][a],f=d.options.offset,w=d.triggerPoint,y=0,g=null==w;d.element!==d.element.window&&(y=d.adapter.offset()[s.offsetProp]),"function"==typeof f?f=f.apply(d):"string"==typeof f&&(f=parseFloat(f),d.options.offset.indexOf("%")>-1&&(f=Math.ceil(s.contextDimension*f/100))),l=s.contextScroll-s.contextOffset,d.triggerPoint=Math.floor(y+l-f),h=w<s.oldScroll,p=d.triggerPoint>=s.oldScroll,u=h&&p,c=!h&&!p,!g&&u?(d.queueTrigger(s.backward),o[d.group.id]=d.group):!g&&c?(d.queueTrigger(s.forward),o[d.group.id]=d.group):g&&s.oldScroll>=d.triggerPoint&&(d.queueTrigger(s.forward),o[d.group.id]=d.group)}}return n.requestAnimationFrame(function(){for(var t in o)o[t].flushTriggers()}),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in o)o[t].refresh()},e.findByElement=function(t){return o[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},n.requestAnimationFrame=function(e){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;i.call(window,e)},n.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),o[this.axis][this.name]=this}var o={vertical:{},horizontal:{}},n=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var o=this.triggerQueues[i],n="up"===i||"left"===i;o.sort(n?e:t);for(var r=0,s=o.length;s>r;r+=1){var a=o[r];(a.options.continuous||r===o.length-1)&&a.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints),o=i===this.waypoints.length-1;return o?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=n.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return o[t.axis][t.name]||new i(t)},n.Group=i}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,i=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,i){t.prototype[i]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[i].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(i,o){t[o]=e[o]}),i.adapters.push({name:"jquery",Adapter:t}),i.Adapter=t}(),function(){"use strict";function t(t){return function(){var i=[],o=arguments[0];return t.isFunction(arguments[0])&&(o=t.extend({},arguments[1]),o.handler=arguments[0]),this.each(function(){var n=t.extend({},o,{element:this});"string"==typeof n.context&&(n.context=t(this).closest(n.context)[0]),i.push(new e(n))}),i}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}();
/*!

 handlebars v4.0.5

Copyright (C) 2011-2015 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Handlebars"] = factory();
	else
		root["Handlebars"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;

	var _handlebarsRuntime = __webpack_require__(2);

	var _handlebarsRuntime2 = _interopRequireDefault(_handlebarsRuntime);

	// Compiler imports

	var _handlebarsCompilerAst = __webpack_require__(21);

	var _handlebarsCompilerAst2 = _interopRequireDefault(_handlebarsCompilerAst);

	var _handlebarsCompilerBase = __webpack_require__(22);

	var _handlebarsCompilerCompiler = __webpack_require__(27);

	var _handlebarsCompilerJavascriptCompiler = __webpack_require__(28);

	var _handlebarsCompilerJavascriptCompiler2 = _interopRequireDefault(_handlebarsCompilerJavascriptCompiler);

	var _handlebarsCompilerVisitor = __webpack_require__(25);

	var _handlebarsCompilerVisitor2 = _interopRequireDefault(_handlebarsCompilerVisitor);

	var _handlebarsNoConflict = __webpack_require__(20);

	var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

	var _create = _handlebarsRuntime2['default'].create;
	function create() {
	  var hb = _create();

	  hb.compile = function (input, options) {
	    return _handlebarsCompilerCompiler.compile(input, options, hb);
	  };
	  hb.precompile = function (input, options) {
	    return _handlebarsCompilerCompiler.precompile(input, options, hb);
	  };

	  hb.AST = _handlebarsCompilerAst2['default'];
	  hb.Compiler = _handlebarsCompilerCompiler.Compiler;
	  hb.JavaScriptCompiler = _handlebarsCompilerJavascriptCompiler2['default'];
	  hb.Parser = _handlebarsCompilerBase.parser;
	  hb.parse = _handlebarsCompilerBase.parse;

	  return hb;
	}

	var inst = create();
	inst.create = create;

	_handlebarsNoConflict2['default'](inst);

	inst.Visitor = _handlebarsCompilerVisitor2['default'];

	inst['default'] = inst;

	exports['default'] = inst;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = __webpack_require__(3)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;

	var _handlebarsBase = __webpack_require__(4);

	var base = _interopRequireWildcard(_handlebarsBase);

	// Each of these augment the Handlebars object. No need to setup here.
	// (This is done to easily share code between commonjs and browse envs)

	var _handlebarsSafeString = __webpack_require__(18);

	var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

	var _handlebarsException = __webpack_require__(6);

	var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

	var _handlebarsUtils = __webpack_require__(5);

	var Utils = _interopRequireWildcard(_handlebarsUtils);

	var _handlebarsRuntime = __webpack_require__(19);

	var runtime = _interopRequireWildcard(_handlebarsRuntime);

	var _handlebarsNoConflict = __webpack_require__(20);

	var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

	// For compatibility and usage outside of module systems, make the Handlebars object a namespace
	function create() {
	  var hb = new base.HandlebarsEnvironment();

	  Utils.extend(hb, base);
	  hb.SafeString = _handlebarsSafeString2['default'];
	  hb.Exception = _handlebarsException2['default'];
	  hb.Utils = Utils;
	  hb.escapeExpression = Utils.escapeExpression;

	  hb.VM = runtime;
	  hb.template = function (spec) {
	    return runtime.template(spec, hb);
	  };

	  return hb;
	}

	var inst = create();
	inst.create = create;

	_handlebarsNoConflict2['default'](inst);

	inst['default'] = inst;

	exports['default'] = inst;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};

	    if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }

	    newObj["default"] = obj;
	    return newObj;
	  }
	};

	exports.__esModule = true;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;
	exports.HandlebarsEnvironment = HandlebarsEnvironment;

	var _utils = __webpack_require__(5);

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	var _helpers = __webpack_require__(7);

	var _decorators = __webpack_require__(15);

	var _logger = __webpack_require__(17);

	var _logger2 = _interopRequireDefault(_logger);

	var VERSION = '4.0.5';
	exports.VERSION = VERSION;
	var COMPILER_REVISION = 7;

	exports.COMPILER_REVISION = COMPILER_REVISION;
	var REVISION_CHANGES = {
	  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
	  2: '== 1.0.0-rc.3',
	  3: '== 1.0.0-rc.4',
	  4: '== 1.x.x',
	  5: '== 2.0.0-alpha.x',
	  6: '>= 2.0.0-beta.1',
	  7: '>= 4.0.0'
	};

	exports.REVISION_CHANGES = REVISION_CHANGES;
	var objectType = '[object Object]';

	function HandlebarsEnvironment(helpers, partials, decorators) {
	  this.helpers = helpers || {};
	  this.partials = partials || {};
	  this.decorators = decorators || {};

	  _helpers.registerDefaultHelpers(this);
	  _decorators.registerDefaultDecorators(this);
	}

	HandlebarsEnvironment.prototype = {
	  constructor: HandlebarsEnvironment,

	  logger: _logger2['default'],
	  log: _logger2['default'].log,

	  registerHelper: function registerHelper(name, fn) {
	    if (_utils.toString.call(name) === objectType) {
	      if (fn) {
	        throw new _exception2['default']('Arg not supported with multiple helpers');
	      }
	      _utils.extend(this.helpers, name);
	    } else {
	      this.helpers[name] = fn;
	    }
	  },
	  unregisterHelper: function unregisterHelper(name) {
	    delete this.helpers[name];
	  },

	  registerPartial: function registerPartial(name, partial) {
	    if (_utils.toString.call(name) === objectType) {
	      _utils.extend(this.partials, name);
	    } else {
	      if (typeof partial === 'undefined') {
	        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
	      }
	      this.partials[name] = partial;
	    }
	  },
	  unregisterPartial: function unregisterPartial(name) {
	    delete this.partials[name];
	  },

	  registerDecorator: function registerDecorator(name, fn) {
	    if (_utils.toString.call(name) === objectType) {
	      if (fn) {
	        throw new _exception2['default']('Arg not supported with multiple decorators');
	      }
	      _utils.extend(this.decorators, name);
	    } else {
	      this.decorators[name] = fn;
	    }
	  },
	  unregisterDecorator: function unregisterDecorator(name) {
	    delete this.decorators[name];
	  }
	};

	var log = _logger2['default'].log;

	exports.log = log;
	exports.createFrame = _utils.createFrame;
	exports.logger = _logger2['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.extend = extend;
	exports.indexOf = indexOf;
	exports.escapeExpression = escapeExpression;
	exports.isEmpty = isEmpty;
	exports.createFrame = createFrame;
	exports.blockParams = blockParams;
	exports.appendContextPath = appendContextPath;
	var escape = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#x27;',
	  '`': '&#x60;',
	  '=': '&#x3D;'
	};

	var badChars = /[&<>"'`=]/g,
	    possible = /[&<>"'`=]/;

	function escapeChar(chr) {
	  return escape[chr];
	}

	function extend(obj /* , ...source */) {
	  for (var i = 1; i < arguments.length; i++) {
	    for (var key in arguments[i]) {
	      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
	        obj[key] = arguments[i][key];
	      }
	    }
	  }

	  return obj;
	}

	var toString = Object.prototype.toString;

	exports.toString = toString;
	// Sourced from lodash
	// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
	/* eslint-disable func-style */
	var isFunction = function isFunction(value) {
	  return typeof value === 'function';
	};
	// fallback for older versions of Chrome and Safari
	/* istanbul ignore next */
	if (isFunction(/x/)) {
	  exports.isFunction = isFunction = function (value) {
	    return typeof value === 'function' && toString.call(value) === '[object Function]';
	  };
	}
	exports.isFunction = isFunction;

	/* eslint-enable func-style */

	/* istanbul ignore next */
	var isArray = Array.isArray || function (value) {
	  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
	};

	exports.isArray = isArray;
	// Older IE versions do not directly support indexOf so we must implement our own, sadly.

	function indexOf(array, value) {
	  for (var i = 0, len = array.length; i < len; i++) {
	    if (array[i] === value) {
	      return i;
	    }
	  }
	  return -1;
	}

	function escapeExpression(string) {
	  if (typeof string !== 'string') {
	    // don't escape SafeStrings, since they're already safe
	    if (string && string.toHTML) {
	      return string.toHTML();
	    } else if (string == null) {
	      return '';
	    } else if (!string) {
	      return string + '';
	    }

	    // Force a string conversion as this will be done by the append regardless and
	    // the regex test will do this transparently behind the scenes, causing issues if
	    // an object's to string has escaped characters in it.
	    string = '' + string;
	  }

	  if (!possible.test(string)) {
	    return string;
	  }
	  return string.replace(badChars, escapeChar);
	}

	function isEmpty(value) {
	  if (!value && value !== 0) {
	    return true;
	  } else if (isArray(value) && value.length === 0) {
	    return true;
	  } else {
	    return false;
	  }
	}

	function createFrame(object) {
	  var frame = extend({}, object);
	  frame._parent = object;
	  return frame;
	}

	function blockParams(params, ids) {
	  params.path = ids;
	  return params;
	}

	function appendContextPath(contextPath, id) {
	  return (contextPath ? contextPath + '.' : '') + id;
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

	function Exception(message, node) {
	  var loc = node && node.loc,
	      line = undefined,
	      column = undefined;
	  if (loc) {
	    line = loc.start.line;
	    column = loc.start.column;

	    message += ' - ' + line + ':' + column;
	  }

	  var tmp = Error.prototype.constructor.call(this, message);

	  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
	  for (var idx = 0; idx < errorProps.length; idx++) {
	    this[errorProps[idx]] = tmp[errorProps[idx]];
	  }

	  /* istanbul ignore else */
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, Exception);
	  }

	  if (loc) {
	    this.lineNumber = line;
	    this.column = column;
	  }
	}

	Exception.prototype = new Error();

	exports['default'] = Exception;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;
	exports.registerDefaultHelpers = registerDefaultHelpers;

	var _helpersBlockHelperMissing = __webpack_require__(8);

	var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

	var _helpersEach = __webpack_require__(9);

	var _helpersEach2 = _interopRequireDefault(_helpersEach);

	var _helpersHelperMissing = __webpack_require__(10);

	var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

	var _helpersIf = __webpack_require__(11);

	var _helpersIf2 = _interopRequireDefault(_helpersIf);

	var _helpersLog = __webpack_require__(12);

	var _helpersLog2 = _interopRequireDefault(_helpersLog);

	var _helpersLookup = __webpack_require__(13);

	var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

	var _helpersWith = __webpack_require__(14);

	var _helpersWith2 = _interopRequireDefault(_helpersWith);

	function registerDefaultHelpers(instance) {
	  _helpersBlockHelperMissing2['default'](instance);
	  _helpersEach2['default'](instance);
	  _helpersHelperMissing2['default'](instance);
	  _helpersIf2['default'](instance);
	  _helpersLog2['default'](instance);
	  _helpersLookup2['default'](instance);
	  _helpersWith2['default'](instance);
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(5);

	exports['default'] = function (instance) {
	  instance.registerHelper('blockHelperMissing', function (context, options) {
	    var inverse = options.inverse,
	        fn = options.fn;

	    if (context === true) {
	      return fn(this);
	    } else if (context === false || context == null) {
	      return inverse(this);
	    } else if (_utils.isArray(context)) {
	      if (context.length > 0) {
	        if (options.ids) {
	          options.ids = [options.name];
	        }

	        return instance.helpers.each(context, options);
	      } else {
	        return inverse(this);
	      }
	    } else {
	      if (options.data && options.ids) {
	        var data = _utils.createFrame(options.data);
	        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
	        options = { data: data };
	      }

	      return fn(context, options);
	    }
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;

	var _utils = __webpack_require__(5);

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	exports['default'] = function (instance) {
	  instance.registerHelper('each', function (context, options) {
	    if (!options) {
	      throw new _exception2['default']('Must pass iterator to #each');
	    }

	    var fn = options.fn,
	        inverse = options.inverse,
	        i = 0,
	        ret = '',
	        data = undefined,
	        contextPath = undefined;

	    if (options.data && options.ids) {
	      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
	    }

	    if (_utils.isFunction(context)) {
	      context = context.call(this);
	    }

	    if (options.data) {
	      data = _utils.createFrame(options.data);
	    }

	    function execIteration(field, index, last) {
	      if (data) {
	        data.key = field;
	        data.index = index;
	        data.first = index === 0;
	        data.last = !!last;

	        if (contextPath) {
	          data.contextPath = contextPath + field;
	        }
	      }

	      ret = ret + fn(context[field], {
	        data: data,
	        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
	      });
	    }

	    if (context && typeof context === 'object') {
	      if (_utils.isArray(context)) {
	        for (var j = context.length; i < j; i++) {
	          if (i in context) {
	            execIteration(i, i, i === context.length - 1);
	          }
	        }
	      } else {
	        var priorKey = undefined;

	        for (var key in context) {
	          if (context.hasOwnProperty(key)) {
	            // We're running the iterations one step out of sync so we can detect
	            // the last iteration without have to scan the object twice and create
	            // an itermediate keys array.
	            if (priorKey !== undefined) {
	              execIteration(priorKey, i - 1);
	            }
	            priorKey = key;
	            i++;
	          }
	        }
	        if (priorKey !== undefined) {
	          execIteration(priorKey, i - 1, true);
	        }
	      }
	    }

	    if (i === 0) {
	      ret = inverse(this);
	    }

	    return ret;
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	exports['default'] = function (instance) {
	  instance.registerHelper('helperMissing', function () /* [args, ]options */{
	    if (arguments.length === 1) {
	      // A missing field in a {{foo}} construct.
	      return undefined;
	    } else {
	      // Someone is actually trying to call something, blow up.
	      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
	    }
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(5);

	exports['default'] = function (instance) {
	  instance.registerHelper('if', function (conditional, options) {
	    if (_utils.isFunction(conditional)) {
	      conditional = conditional.call(this);
	    }

	    // Default behavior is to render the positive path if the value is truthy and not empty.
	    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
	    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
	    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
	      return options.inverse(this);
	    } else {
	      return options.fn(this);
	    }
	  });

	  instance.registerHelper('unless', function (conditional, options) {
	    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	exports['default'] = function (instance) {
	  instance.registerHelper('log', function () /* message, options */{
	    var args = [undefined],
	        options = arguments[arguments.length - 1];
	    for (var i = 0; i < arguments.length - 1; i++) {
	      args.push(arguments[i]);
	    }

	    var level = 1;
	    if (options.hash.level != null) {
	      level = options.hash.level;
	    } else if (options.data && options.data.level != null) {
	      level = options.data.level;
	    }
	    args[0] = level;

	    instance.log.apply(instance, args);
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	exports['default'] = function (instance) {
	  instance.registerHelper('lookup', function (obj, field) {
	    return obj && obj[field];
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(5);

	exports['default'] = function (instance) {
	  instance.registerHelper('with', function (context, options) {
	    if (_utils.isFunction(context)) {
	      context = context.call(this);
	    }

	    var fn = options.fn;

	    if (!_utils.isEmpty(context)) {
	      var data = options.data;
	      if (options.data && options.ids) {
	        data = _utils.createFrame(options.data);
	        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
	      }

	      return fn(context, {
	        data: data,
	        blockParams: _utils.blockParams([context], [data && data.contextPath])
	      });
	    } else {
	      return options.inverse(this);
	    }
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;
	exports.registerDefaultDecorators = registerDefaultDecorators;

	var _decoratorsInline = __webpack_require__(16);

	var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

	function registerDefaultDecorators(instance) {
	  _decoratorsInline2['default'](instance);
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(5);

	exports['default'] = function (instance) {
	  instance.registerDecorator('inline', function (fn, props, container, options) {
	    var ret = fn;
	    if (!props.partials) {
	      props.partials = {};
	      ret = function (context, options) {
	        // Create a new partials stack frame prior to exec.
	        var original = container.partials;
	        container.partials = _utils.extend({}, original, props.partials);
	        var ret = fn(context, options);
	        container.partials = original;
	        return ret;
	      };
	    }

	    props.partials[options.args[0]] = options.fn;

	    return ret;
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(5);

	var logger = {
	  methodMap: ['debug', 'info', 'warn', 'error'],
	  level: 'info',

	  // Maps a given level value to the `methodMap` indexes above.
	  lookupLevel: function lookupLevel(level) {
	    if (typeof level === 'string') {
	      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
	      if (levelMap >= 0) {
	        level = levelMap;
	      } else {
	        level = parseInt(level, 10);
	      }
	    }

	    return level;
	  },

	  // Can be overridden in the host environment
	  log: function log(level) {
	    level = logger.lookupLevel(level);

	    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
	      var method = logger.methodMap[level];
	      if (!console[method]) {
	        // eslint-disable-line no-console
	        method = 'log';
	      }

	      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        message[_key - 1] = arguments[_key];
	      }

	      console[method].apply(console, message); // eslint-disable-line no-console
	    }
	  }
	};

	exports['default'] = logger;
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports) {

	// Build out our basic SafeString type
	'use strict';

	exports.__esModule = true;
	function SafeString(string) {
	  this.string = string;
	}

	SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
	  return '' + this.string;
	};

	exports['default'] = SafeString;
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = __webpack_require__(3)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;
	exports.checkRevision = checkRevision;
	exports.template = template;
	exports.wrapProgram = wrapProgram;
	exports.resolvePartial = resolvePartial;
	exports.invokePartial = invokePartial;
	exports.noop = noop;

	var _utils = __webpack_require__(5);

	var Utils = _interopRequireWildcard(_utils);

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	var _base = __webpack_require__(4);

	function checkRevision(compilerInfo) {
	  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
	      currentRevision = _base.COMPILER_REVISION;

	  if (compilerRevision !== currentRevision) {
	    if (compilerRevision < currentRevision) {
	      var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
	          compilerVersions = _base.REVISION_CHANGES[compilerRevision];
	      throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
	    } else {
	      // Use the embedded version info since the runtime doesn't know about this revision yet
	      throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
	    }
	  }
	}

	function template(templateSpec, env) {
	  /* istanbul ignore next */
	  if (!env) {
	    throw new _exception2['default']('No environment passed to template');
	  }
	  if (!templateSpec || !templateSpec.main) {
	    throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
	  }

	  templateSpec.main.decorator = templateSpec.main_d;

	  // Note: Using env.VM references rather than local var references throughout this section to allow
	  // for external users to override these as psuedo-supported APIs.
	  env.VM.checkRevision(templateSpec.compiler);

	  function invokePartialWrapper(partial, context, options) {
	    if (options.hash) {
	      context = Utils.extend({}, context, options.hash);
	      if (options.ids) {
	        options.ids[0] = true;
	      }
	    }

	    partial = env.VM.resolvePartial.call(this, partial, context, options);
	    var result = env.VM.invokePartial.call(this, partial, context, options);

	    if (result == null && env.compile) {
	      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
	      result = options.partials[options.name](context, options);
	    }
	    if (result != null) {
	      if (options.indent) {
	        var lines = result.split('\n');
	        for (var i = 0, l = lines.length; i < l; i++) {
	          if (!lines[i] && i + 1 === l) {
	            break;
	          }

	          lines[i] = options.indent + lines[i];
	        }
	        result = lines.join('\n');
	      }
	      return result;
	    } else {
	      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
	    }
	  }

	  // Just add water
	  var container = {
	    strict: function strict(obj, name) {
	      if (!(name in obj)) {
	        throw new _exception2['default']('"' + name + '" not defined in ' + obj);
	      }
	      return obj[name];
	    },
	    lookup: function lookup(depths, name) {
	      var len = depths.length;
	      for (var i = 0; i < len; i++) {
	        if (depths[i] && depths[i][name] != null) {
	          return depths[i][name];
	        }
	      }
	    },
	    lambda: function lambda(current, context) {
	      return typeof current === 'function' ? current.call(context) : current;
	    },

	    escapeExpression: Utils.escapeExpression,
	    invokePartial: invokePartialWrapper,

	    fn: function fn(i) {
	      var ret = templateSpec[i];
	      ret.decorator = templateSpec[i + '_d'];
	      return ret;
	    },

	    programs: [],
	    program: function program(i, data, declaredBlockParams, blockParams, depths) {
	      var programWrapper = this.programs[i],
	          fn = this.fn(i);
	      if (data || depths || blockParams || declaredBlockParams) {
	        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
	      } else if (!programWrapper) {
	        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
	      }
	      return programWrapper;
	    },

	    data: function data(value, depth) {
	      while (value && depth--) {
	        value = value._parent;
	      }
	      return value;
	    },
	    merge: function merge(param, common) {
	      var obj = param || common;

	      if (param && common && param !== common) {
	        obj = Utils.extend({}, common, param);
	      }

	      return obj;
	    },

	    noop: env.VM.noop,
	    compilerInfo: templateSpec.compiler
	  };

	  function ret(context) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var data = options.data;

	    ret._setup(options);
	    if (!options.partial && templateSpec.useData) {
	      data = initData(context, data);
	    }
	    var depths = undefined,
	        blockParams = templateSpec.useBlockParams ? [] : undefined;
	    if (templateSpec.useDepths) {
	      if (options.depths) {
	        depths = context !== options.depths[0] ? [context].concat(options.depths) : options.depths;
	      } else {
	        depths = [context];
	      }
	    }

	    function main(context /*, options*/) {
	      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
	    }
	    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
	    return main(context, options);
	  }
	  ret.isTop = true;

	  ret._setup = function (options) {
	    if (!options.partial) {
	      container.helpers = container.merge(options.helpers, env.helpers);

	      if (templateSpec.usePartial) {
	        container.partials = container.merge(options.partials, env.partials);
	      }
	      if (templateSpec.usePartial || templateSpec.useDecorators) {
	        container.decorators = container.merge(options.decorators, env.decorators);
	      }
	    } else {
	      container.helpers = options.helpers;
	      container.partials = options.partials;
	      container.decorators = options.decorators;
	    }
	  };

	  ret._child = function (i, data, blockParams, depths) {
	    if (templateSpec.useBlockParams && !blockParams) {
	      throw new _exception2['default']('must pass block params');
	    }
	    if (templateSpec.useDepths && !depths) {
	      throw new _exception2['default']('must pass parent depths');
	    }

	    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
	  };
	  return ret;
	}

	function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
	  function prog(context) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var currentDepths = depths;
	    if (depths && context !== depths[0]) {
	      currentDepths = [context].concat(depths);
	    }

	    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
	  }

	  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

	  prog.program = i;
	  prog.depth = depths ? depths.length : 0;
	  prog.blockParams = declaredBlockParams || 0;
	  return prog;
	}

	function resolvePartial(partial, context, options) {
	  if (!partial) {
	    if (options.name === '@partial-block') {
	      partial = options.data['partial-block'];
	    } else {
	      partial = options.partials[options.name];
	    }
	  } else if (!partial.call && !options.name) {
	    // This is a dynamic partial that returned a string
	    options.name = partial;
	    partial = options.partials[partial];
	  }
	  return partial;
	}

	function invokePartial(partial, context, options) {
	  options.partial = true;
	  if (options.ids) {
	    options.data.contextPath = options.ids[0] || options.data.contextPath;
	  }

	  var partialBlock = undefined;
	  if (options.fn && options.fn !== noop) {
	    options.data = _base.createFrame(options.data);
	    partialBlock = options.data['partial-block'] = options.fn;

	    if (partialBlock.partials) {
	      options.partials = Utils.extend({}, options.partials, partialBlock.partials);
	    }
	  }

	  if (partial === undefined && partialBlock) {
	    partial = partialBlock;
	  }

	  if (partial === undefined) {
	    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
	  } else if (partial instanceof Function) {
	    return partial(context, options);
	  }
	}

	function noop() {
	  return '';
	}

	function initData(context, data) {
	  if (!data || !('root' in data)) {
	    data = data ? _base.createFrame(data) : {};
	    data.root = context;
	  }
	  return data;
	}

	function executeDecorators(fn, prog, container, depths, data, blockParams) {
	  if (fn.decorator) {
	    var props = {};
	    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
	    Utils.extend(prog, props);
	  }
	  return prog;
	}

/***/ },
/* 20 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/* global window */
	'use strict';

	exports.__esModule = true;

	exports['default'] = function (Handlebars) {
	  /* istanbul ignore next */
	  var root = typeof global !== 'undefined' ? global : window,
	      $Handlebars = root.Handlebars;
	  /* istanbul ignore next */
	  Handlebars.noConflict = function () {
	    if (root.Handlebars === Handlebars) {
	      root.Handlebars = $Handlebars;
	    }
	    return Handlebars;
	  };
	};

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var AST = {
	  // Public API used to evaluate derived attributes regarding AST nodes
	  helpers: {
	    // a mustache is definitely a helper if:
	    // * it is an eligible helper, and
	    // * it has at least one parameter or hash segment
	    helperExpression: function helperExpression(node) {
	      return node.type === 'SubExpression' || (node.type === 'MustacheStatement' || node.type === 'BlockStatement') && !!(node.params && node.params.length || node.hash);
	    },

	    scopedId: function scopedId(path) {
	      return (/^\.|this\b/.test(path.original)
	      );
	    },

	    // an ID is simple if it only has one part, and that part is not
	    // `..` or `this`.
	    simpleId: function simpleId(path) {
	      return path.parts.length === 1 && !AST.helpers.scopedId(path) && !path.depth;
	    }
	  }
	};

	// Must be exported as an object rather than the root of the module as the jison lexer
	// must modify the object to operate properly.
	exports['default'] = AST;
	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	var _interopRequireWildcard = __webpack_require__(3)['default'];

	exports.__esModule = true;
	exports.parse = parse;

	var _parser = __webpack_require__(23);

	var _parser2 = _interopRequireDefault(_parser);

	var _whitespaceControl = __webpack_require__(24);

	var _whitespaceControl2 = _interopRequireDefault(_whitespaceControl);

	var _helpers = __webpack_require__(26);

	var Helpers = _interopRequireWildcard(_helpers);

	var _utils = __webpack_require__(5);

	exports.parser = _parser2['default'];

	var yy = {};
	_utils.extend(yy, Helpers);

	function parse(input, options) {
	  // Just return if an already-compiled AST was passed in.
	  if (input.type === 'Program') {
	    return input;
	  }

	  _parser2['default'].yy = yy;

	  // Altering the shared object here, but this is ok as parser is a sync operation
	  yy.locInfo = function (locInfo) {
	    return new yy.SourceLocation(options && options.srcName, locInfo);
	  };

	  var strip = new _whitespaceControl2['default'](options);
	  return strip.accept(_parser2['default'].parse(input));
	}

/***/ },
/* 23 */
/***/ function(module, exports) {

	/* istanbul ignore next */
	/* Jison generated parser */
	"use strict";

	var handlebars = (function () {
	    var parser = { trace: function trace() {},
	        yy: {},
	        symbols_: { "error": 2, "root": 3, "program": 4, "EOF": 5, "program_repetition0": 6, "statement": 7, "mustache": 8, "block": 9, "rawBlock": 10, "partial": 11, "partialBlock": 12, "content": 13, "COMMENT": 14, "CONTENT": 15, "openRawBlock": 16, "rawBlock_repetition_plus0": 17, "END_RAW_BLOCK": 18, "OPEN_RAW_BLOCK": 19, "helperName": 20, "openRawBlock_repetition0": 21, "openRawBlock_option0": 22, "CLOSE_RAW_BLOCK": 23, "openBlock": 24, "block_option0": 25, "closeBlock": 26, "openInverse": 27, "block_option1": 28, "OPEN_BLOCK": 29, "openBlock_repetition0": 30, "openBlock_option0": 31, "openBlock_option1": 32, "CLOSE": 33, "OPEN_INVERSE": 34, "openInverse_repetition0": 35, "openInverse_option0": 36, "openInverse_option1": 37, "openInverseChain": 38, "OPEN_INVERSE_CHAIN": 39, "openInverseChain_repetition0": 40, "openInverseChain_option0": 41, "openInverseChain_option1": 42, "inverseAndProgram": 43, "INVERSE": 44, "inverseChain": 45, "inverseChain_option0": 46, "OPEN_ENDBLOCK": 47, "OPEN": 48, "mustache_repetition0": 49, "mustache_option0": 50, "OPEN_UNESCAPED": 51, "mustache_repetition1": 52, "mustache_option1": 53, "CLOSE_UNESCAPED": 54, "OPEN_PARTIAL": 55, "partialName": 56, "partial_repetition0": 57, "partial_option0": 58, "openPartialBlock": 59, "OPEN_PARTIAL_BLOCK": 60, "openPartialBlock_repetition0": 61, "openPartialBlock_option0": 62, "param": 63, "sexpr": 64, "OPEN_SEXPR": 65, "sexpr_repetition0": 66, "sexpr_option0": 67, "CLOSE_SEXPR": 68, "hash": 69, "hash_repetition_plus0": 70, "hashSegment": 71, "ID": 72, "EQUALS": 73, "blockParams": 74, "OPEN_BLOCK_PARAMS": 75, "blockParams_repetition_plus0": 76, "CLOSE_BLOCK_PARAMS": 77, "path": 78, "dataName": 79, "STRING": 80, "NUMBER": 81, "BOOLEAN": 82, "UNDEFINED": 83, "NULL": 84, "DATA": 85, "pathSegments": 86, "SEP": 87, "$accept": 0, "$end": 1 },
	        terminals_: { 2: "error", 5: "EOF", 14: "COMMENT", 15: "CONTENT", 18: "END_RAW_BLOCK", 19: "OPEN_RAW_BLOCK", 23: "CLOSE_RAW_BLOCK", 29: "OPEN_BLOCK", 33: "CLOSE", 34: "OPEN_INVERSE", 39: "OPEN_INVERSE_CHAIN", 44: "INVERSE", 47: "OPEN_ENDBLOCK", 48: "OPEN", 51: "OPEN_UNESCAPED", 54: "CLOSE_UNESCAPED", 55: "OPEN_PARTIAL", 60: "OPEN_PARTIAL_BLOCK", 65: "OPEN_SEXPR", 68: "CLOSE_SEXPR", 72: "ID", 73: "EQUALS", 75: "OPEN_BLOCK_PARAMS", 77: "CLOSE_BLOCK_PARAMS", 80: "STRING", 81: "NUMBER", 82: "BOOLEAN", 83: "UNDEFINED", 84: "NULL", 85: "DATA", 87: "SEP" },
	        productions_: [0, [3, 2], [4, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [13, 1], [10, 3], [16, 5], [9, 4], [9, 4], [24, 6], [27, 6], [38, 6], [43, 2], [45, 3], [45, 1], [26, 3], [8, 5], [8, 5], [11, 5], [12, 3], [59, 5], [63, 1], [63, 1], [64, 5], [69, 1], [71, 3], [74, 3], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [56, 1], [56, 1], [79, 2], [78, 1], [86, 3], [86, 1], [6, 0], [6, 2], [17, 1], [17, 2], [21, 0], [21, 2], [22, 0], [22, 1], [25, 0], [25, 1], [28, 0], [28, 1], [30, 0], [30, 2], [31, 0], [31, 1], [32, 0], [32, 1], [35, 0], [35, 2], [36, 0], [36, 1], [37, 0], [37, 1], [40, 0], [40, 2], [41, 0], [41, 1], [42, 0], [42, 1], [46, 0], [46, 1], [49, 0], [49, 2], [50, 0], [50, 1], [52, 0], [52, 2], [53, 0], [53, 1], [57, 0], [57, 2], [58, 0], [58, 1], [61, 0], [61, 2], [62, 0], [62, 1], [66, 0], [66, 2], [67, 0], [67, 1], [70, 1], [70, 2], [76, 1], [76, 2]],
	        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$
	        /**/) {

	            var $0 = $$.length - 1;
	            switch (yystate) {
	                case 1:
	                    return $$[$0 - 1];
	                    break;
	                case 2:
	                    this.$ = yy.prepareProgram($$[$0]);
	                    break;
	                case 3:
	                    this.$ = $$[$0];
	                    break;
	                case 4:
	                    this.$ = $$[$0];
	                    break;
	                case 5:
	                    this.$ = $$[$0];
	                    break;
	                case 6:
	                    this.$ = $$[$0];
	                    break;
	                case 7:
	                    this.$ = $$[$0];
	                    break;
	                case 8:
	                    this.$ = $$[$0];
	                    break;
	                case 9:
	                    this.$ = {
	                        type: 'CommentStatement',
	                        value: yy.stripComment($$[$0]),
	                        strip: yy.stripFlags($$[$0], $$[$0]),
	                        loc: yy.locInfo(this._$)
	                    };

	                    break;
	                case 10:
	                    this.$ = {
	                        type: 'ContentStatement',
	                        original: $$[$0],
	                        value: $$[$0],
	                        loc: yy.locInfo(this._$)
	                    };

	                    break;
	                case 11:
	                    this.$ = yy.prepareRawBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
	                    break;
	                case 12:
	                    this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1] };
	                    break;
	                case 13:
	                    this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], false, this._$);
	                    break;
	                case 14:
	                    this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], true, this._$);
	                    break;
	                case 15:
	                    this.$ = { open: $$[$0 - 5], path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
	                    break;
	                case 16:
	                    this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
	                    break;
	                case 17:
	                    this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
	                    break;
	                case 18:
	                    this.$ = { strip: yy.stripFlags($$[$0 - 1], $$[$0 - 1]), program: $$[$0] };
	                    break;
	                case 19:
	                    var inverse = yy.prepareBlock($$[$0 - 2], $$[$0 - 1], $$[$0], $$[$0], false, this._$),
	                        program = yy.prepareProgram([inverse], $$[$0 - 1].loc);
	                    program.chained = true;

	                    this.$ = { strip: $$[$0 - 2].strip, program: program, chain: true };

	                    break;
	                case 20:
	                    this.$ = $$[$0];
	                    break;
	                case 21:
	                    this.$ = { path: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 2], $$[$0]) };
	                    break;
	                case 22:
	                    this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
	                    break;
	                case 23:
	                    this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
	                    break;
	                case 24:
	                    this.$ = {
	                        type: 'PartialStatement',
	                        name: $$[$0 - 3],
	                        params: $$[$0 - 2],
	                        hash: $$[$0 - 1],
	                        indent: '',
	                        strip: yy.stripFlags($$[$0 - 4], $$[$0]),
	                        loc: yy.locInfo(this._$)
	                    };

	                    break;
	                case 25:
	                    this.$ = yy.preparePartialBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
	                    break;
	                case 26:
	                    this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 4], $$[$0]) };
	                    break;
	                case 27:
	                    this.$ = $$[$0];
	                    break;
	                case 28:
	                    this.$ = $$[$0];
	                    break;
	                case 29:
	                    this.$ = {
	                        type: 'SubExpression',
	                        path: $$[$0 - 3],
	                        params: $$[$0 - 2],
	                        hash: $$[$0 - 1],
	                        loc: yy.locInfo(this._$)
	                    };

	                    break;
	                case 30:
	                    this.$ = { type: 'Hash', pairs: $$[$0], loc: yy.locInfo(this._$) };
	                    break;
	                case 31:
	                    this.$ = { type: 'HashPair', key: yy.id($$[$0 - 2]), value: $$[$0], loc: yy.locInfo(this._$) };
	                    break;
	                case 32:
	                    this.$ = yy.id($$[$0 - 1]);
	                    break;
	                case 33:
	                    this.$ = $$[$0];
	                    break;
	                case 34:
	                    this.$ = $$[$0];
	                    break;
	                case 35:
	                    this.$ = { type: 'StringLiteral', value: $$[$0], original: $$[$0], loc: yy.locInfo(this._$) };
	                    break;
	                case 36:
	                    this.$ = { type: 'NumberLiteral', value: Number($$[$0]), original: Number($$[$0]), loc: yy.locInfo(this._$) };
	                    break;
	                case 37:
	                    this.$ = { type: 'BooleanLiteral', value: $$[$0] === 'true', original: $$[$0] === 'true', loc: yy.locInfo(this._$) };
	                    break;
	                case 38:
	                    this.$ = { type: 'UndefinedLiteral', original: undefined, value: undefined, loc: yy.locInfo(this._$) };
	                    break;
	                case 39:
	                    this.$ = { type: 'NullLiteral', original: null, value: null, loc: yy.locInfo(this._$) };
	                    break;
	                case 40:
	                    this.$ = $$[$0];
	                    break;
	                case 41:
	                    this.$ = $$[$0];
	                    break;
	                case 42:
	                    this.$ = yy.preparePath(true, $$[$0], this._$);
	                    break;
	                case 43:
	                    this.$ = yy.preparePath(false, $$[$0], this._$);
	                    break;
	                case 44:
	                    $$[$0 - 2].push({ part: yy.id($$[$0]), original: $$[$0], separator: $$[$0 - 1] });this.$ = $$[$0 - 2];
	                    break;
	                case 45:
	                    this.$ = [{ part: yy.id($$[$0]), original: $$[$0] }];
	                    break;
	                case 46:
	                    this.$ = [];
	                    break;
	                case 47:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 48:
	                    this.$ = [$$[$0]];
	                    break;
	                case 49:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 50:
	                    this.$ = [];
	                    break;
	                case 51:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 58:
	                    this.$ = [];
	                    break;
	                case 59:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 64:
	                    this.$ = [];
	                    break;
	                case 65:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 70:
	                    this.$ = [];
	                    break;
	                case 71:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 78:
	                    this.$ = [];
	                    break;
	                case 79:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 82:
	                    this.$ = [];
	                    break;
	                case 83:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 86:
	                    this.$ = [];
	                    break;
	                case 87:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 90:
	                    this.$ = [];
	                    break;
	                case 91:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 94:
	                    this.$ = [];
	                    break;
	                case 95:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 98:
	                    this.$ = [$$[$0]];
	                    break;
	                case 99:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 100:
	                    this.$ = [$$[$0]];
	                    break;
	                case 101:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	            }
	        },
	        table: [{ 3: 1, 4: 2, 5: [2, 46], 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 1: [3] }, { 5: [1, 4] }, { 5: [2, 2], 7: 5, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10, 13: 11, 14: [1, 12], 15: [1, 20], 16: 17, 19: [1, 23], 24: 15, 27: 16, 29: [1, 21], 34: [1, 22], 39: [2, 2], 44: [2, 2], 47: [2, 2], 48: [1, 13], 51: [1, 14], 55: [1, 18], 59: 19, 60: [1, 24] }, { 1: [2, 1] }, { 5: [2, 47], 14: [2, 47], 15: [2, 47], 19: [2, 47], 29: [2, 47], 34: [2, 47], 39: [2, 47], 44: [2, 47], 47: [2, 47], 48: [2, 47], 51: [2, 47], 55: [2, 47], 60: [2, 47] }, { 5: [2, 3], 14: [2, 3], 15: [2, 3], 19: [2, 3], 29: [2, 3], 34: [2, 3], 39: [2, 3], 44: [2, 3], 47: [2, 3], 48: [2, 3], 51: [2, 3], 55: [2, 3], 60: [2, 3] }, { 5: [2, 4], 14: [2, 4], 15: [2, 4], 19: [2, 4], 29: [2, 4], 34: [2, 4], 39: [2, 4], 44: [2, 4], 47: [2, 4], 48: [2, 4], 51: [2, 4], 55: [2, 4], 60: [2, 4] }, { 5: [2, 5], 14: [2, 5], 15: [2, 5], 19: [2, 5], 29: [2, 5], 34: [2, 5], 39: [2, 5], 44: [2, 5], 47: [2, 5], 48: [2, 5], 51: [2, 5], 55: [2, 5], 60: [2, 5] }, { 5: [2, 6], 14: [2, 6], 15: [2, 6], 19: [2, 6], 29: [2, 6], 34: [2, 6], 39: [2, 6], 44: [2, 6], 47: [2, 6], 48: [2, 6], 51: [2, 6], 55: [2, 6], 60: [2, 6] }, { 5: [2, 7], 14: [2, 7], 15: [2, 7], 19: [2, 7], 29: [2, 7], 34: [2, 7], 39: [2, 7], 44: [2, 7], 47: [2, 7], 48: [2, 7], 51: [2, 7], 55: [2, 7], 60: [2, 7] }, { 5: [2, 8], 14: [2, 8], 15: [2, 8], 19: [2, 8], 29: [2, 8], 34: [2, 8], 39: [2, 8], 44: [2, 8], 47: [2, 8], 48: [2, 8], 51: [2, 8], 55: [2, 8], 60: [2, 8] }, { 5: [2, 9], 14: [2, 9], 15: [2, 9], 19: [2, 9], 29: [2, 9], 34: [2, 9], 39: [2, 9], 44: [2, 9], 47: [2, 9], 48: [2, 9], 51: [2, 9], 55: [2, 9], 60: [2, 9] }, { 20: 25, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 36, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 37, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 4: 38, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 13: 40, 15: [1, 20], 17: 39 }, { 20: 42, 56: 41, 64: 43, 65: [1, 44], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 45, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 5: [2, 10], 14: [2, 10], 15: [2, 10], 18: [2, 10], 19: [2, 10], 29: [2, 10], 34: [2, 10], 39: [2, 10], 44: [2, 10], 47: [2, 10], 48: [2, 10], 51: [2, 10], 55: [2, 10], 60: [2, 10] }, { 20: 46, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 47, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 48, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 42, 56: 49, 64: 43, 65: [1, 44], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [2, 78], 49: 50, 65: [2, 78], 72: [2, 78], 80: [2, 78], 81: [2, 78], 82: [2, 78], 83: [2, 78], 84: [2, 78], 85: [2, 78] }, { 23: [2, 33], 33: [2, 33], 54: [2, 33], 65: [2, 33], 68: [2, 33], 72: [2, 33], 75: [2, 33], 80: [2, 33], 81: [2, 33], 82: [2, 33], 83: [2, 33], 84: [2, 33], 85: [2, 33] }, { 23: [2, 34], 33: [2, 34], 54: [2, 34], 65: [2, 34], 68: [2, 34], 72: [2, 34], 75: [2, 34], 80: [2, 34], 81: [2, 34], 82: [2, 34], 83: [2, 34], 84: [2, 34], 85: [2, 34] }, { 23: [2, 35], 33: [2, 35], 54: [2, 35], 65: [2, 35], 68: [2, 35], 72: [2, 35], 75: [2, 35], 80: [2, 35], 81: [2, 35], 82: [2, 35], 83: [2, 35], 84: [2, 35], 85: [2, 35] }, { 23: [2, 36], 33: [2, 36], 54: [2, 36], 65: [2, 36], 68: [2, 36], 72: [2, 36], 75: [2, 36], 80: [2, 36], 81: [2, 36], 82: [2, 36], 83: [2, 36], 84: [2, 36], 85: [2, 36] }, { 23: [2, 37], 33: [2, 37], 54: [2, 37], 65: [2, 37], 68: [2, 37], 72: [2, 37], 75: [2, 37], 80: [2, 37], 81: [2, 37], 82: [2, 37], 83: [2, 37], 84: [2, 37], 85: [2, 37] }, { 23: [2, 38], 33: [2, 38], 54: [2, 38], 65: [2, 38], 68: [2, 38], 72: [2, 38], 75: [2, 38], 80: [2, 38], 81: [2, 38], 82: [2, 38], 83: [2, 38], 84: [2, 38], 85: [2, 38] }, { 23: [2, 39], 33: [2, 39], 54: [2, 39], 65: [2, 39], 68: [2, 39], 72: [2, 39], 75: [2, 39], 80: [2, 39], 81: [2, 39], 82: [2, 39], 83: [2, 39], 84: [2, 39], 85: [2, 39] }, { 23: [2, 43], 33: [2, 43], 54: [2, 43], 65: [2, 43], 68: [2, 43], 72: [2, 43], 75: [2, 43], 80: [2, 43], 81: [2, 43], 82: [2, 43], 83: [2, 43], 84: [2, 43], 85: [2, 43], 87: [1, 51] }, { 72: [1, 35], 86: 52 }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 52: 53, 54: [2, 82], 65: [2, 82], 72: [2, 82], 80: [2, 82], 81: [2, 82], 82: [2, 82], 83: [2, 82], 84: [2, 82], 85: [2, 82] }, { 25: 54, 38: 56, 39: [1, 58], 43: 57, 44: [1, 59], 45: 55, 47: [2, 54] }, { 28: 60, 43: 61, 44: [1, 59], 47: [2, 56] }, { 13: 63, 15: [1, 20], 18: [1, 62] }, { 15: [2, 48], 18: [2, 48] }, { 33: [2, 86], 57: 64, 65: [2, 86], 72: [2, 86], 80: [2, 86], 81: [2, 86], 82: [2, 86], 83: [2, 86], 84: [2, 86], 85: [2, 86] }, { 33: [2, 40], 65: [2, 40], 72: [2, 40], 80: [2, 40], 81: [2, 40], 82: [2, 40], 83: [2, 40], 84: [2, 40], 85: [2, 40] }, { 33: [2, 41], 65: [2, 41], 72: [2, 41], 80: [2, 41], 81: [2, 41], 82: [2, 41], 83: [2, 41], 84: [2, 41], 85: [2, 41] }, { 20: 65, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 66, 47: [1, 67] }, { 30: 68, 33: [2, 58], 65: [2, 58], 72: [2, 58], 75: [2, 58], 80: [2, 58], 81: [2, 58], 82: [2, 58], 83: [2, 58], 84: [2, 58], 85: [2, 58] }, { 33: [2, 64], 35: 69, 65: [2, 64], 72: [2, 64], 75: [2, 64], 80: [2, 64], 81: [2, 64], 82: [2, 64], 83: [2, 64], 84: [2, 64], 85: [2, 64] }, { 21: 70, 23: [2, 50], 65: [2, 50], 72: [2, 50], 80: [2, 50], 81: [2, 50], 82: [2, 50], 83: [2, 50], 84: [2, 50], 85: [2, 50] }, { 33: [2, 90], 61: 71, 65: [2, 90], 72: [2, 90], 80: [2, 90], 81: [2, 90], 82: [2, 90], 83: [2, 90], 84: [2, 90], 85: [2, 90] }, { 20: 75, 33: [2, 80], 50: 72, 63: 73, 64: 76, 65: [1, 44], 69: 74, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 72: [1, 80] }, { 23: [2, 42], 33: [2, 42], 54: [2, 42], 65: [2, 42], 68: [2, 42], 72: [2, 42], 75: [2, 42], 80: [2, 42], 81: [2, 42], 82: [2, 42], 83: [2, 42], 84: [2, 42], 85: [2, 42], 87: [1, 51] }, { 20: 75, 53: 81, 54: [2, 84], 63: 82, 64: 76, 65: [1, 44], 69: 83, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 84, 47: [1, 67] }, { 47: [2, 55] }, { 4: 85, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 47: [2, 20] }, { 20: 86, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 87, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 26: 88, 47: [1, 67] }, { 47: [2, 57] }, { 5: [2, 11], 14: [2, 11], 15: [2, 11], 19: [2, 11], 29: [2, 11], 34: [2, 11], 39: [2, 11], 44: [2, 11], 47: [2, 11], 48: [2, 11], 51: [2, 11], 55: [2, 11], 60: [2, 11] }, { 15: [2, 49], 18: [2, 49] }, { 20: 75, 33: [2, 88], 58: 89, 63: 90, 64: 76, 65: [1, 44], 69: 91, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 65: [2, 94], 66: 92, 68: [2, 94], 72: [2, 94], 80: [2, 94], 81: [2, 94], 82: [2, 94], 83: [2, 94], 84: [2, 94], 85: [2, 94] }, { 5: [2, 25], 14: [2, 25], 15: [2, 25], 19: [2, 25], 29: [2, 25], 34: [2, 25], 39: [2, 25], 44: [2, 25], 47: [2, 25], 48: [2, 25], 51: [2, 25], 55: [2, 25], 60: [2, 25] }, { 20: 93, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 31: 94, 33: [2, 60], 63: 95, 64: 76, 65: [1, 44], 69: 96, 70: 77, 71: 78, 72: [1, 79], 75: [2, 60], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 33: [2, 66], 36: 97, 63: 98, 64: 76, 65: [1, 44], 69: 99, 70: 77, 71: 78, 72: [1, 79], 75: [2, 66], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 22: 100, 23: [2, 52], 63: 101, 64: 76, 65: [1, 44], 69: 102, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 33: [2, 92], 62: 103, 63: 104, 64: 76, 65: [1, 44], 69: 105, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 106] }, { 33: [2, 79], 65: [2, 79], 72: [2, 79], 80: [2, 79], 81: [2, 79], 82: [2, 79], 83: [2, 79], 84: [2, 79], 85: [2, 79] }, { 33: [2, 81] }, { 23: [2, 27], 33: [2, 27], 54: [2, 27], 65: [2, 27], 68: [2, 27], 72: [2, 27], 75: [2, 27], 80: [2, 27], 81: [2, 27], 82: [2, 27], 83: [2, 27], 84: [2, 27], 85: [2, 27] }, { 23: [2, 28], 33: [2, 28], 54: [2, 28], 65: [2, 28], 68: [2, 28], 72: [2, 28], 75: [2, 28], 80: [2, 28], 81: [2, 28], 82: [2, 28], 83: [2, 28], 84: [2, 28], 85: [2, 28] }, { 23: [2, 30], 33: [2, 30], 54: [2, 30], 68: [2, 30], 71: 107, 72: [1, 108], 75: [2, 30] }, { 23: [2, 98], 33: [2, 98], 54: [2, 98], 68: [2, 98], 72: [2, 98], 75: [2, 98] }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 73: [1, 109], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 23: [2, 44], 33: [2, 44], 54: [2, 44], 65: [2, 44], 68: [2, 44], 72: [2, 44], 75: [2, 44], 80: [2, 44], 81: [2, 44], 82: [2, 44], 83: [2, 44], 84: [2, 44], 85: [2, 44], 87: [2, 44] }, { 54: [1, 110] }, { 54: [2, 83], 65: [2, 83], 72: [2, 83], 80: [2, 83], 81: [2, 83], 82: [2, 83], 83: [2, 83], 84: [2, 83], 85: [2, 83] }, { 54: [2, 85] }, { 5: [2, 13], 14: [2, 13], 15: [2, 13], 19: [2, 13], 29: [2, 13], 34: [2, 13], 39: [2, 13], 44: [2, 13], 47: [2, 13], 48: [2, 13], 51: [2, 13], 55: [2, 13], 60: [2, 13] }, { 38: 56, 39: [1, 58], 43: 57, 44: [1, 59], 45: 112, 46: 111, 47: [2, 76] }, { 33: [2, 70], 40: 113, 65: [2, 70], 72: [2, 70], 75: [2, 70], 80: [2, 70], 81: [2, 70], 82: [2, 70], 83: [2, 70], 84: [2, 70], 85: [2, 70] }, { 47: [2, 18] }, { 5: [2, 14], 14: [2, 14], 15: [2, 14], 19: [2, 14], 29: [2, 14], 34: [2, 14], 39: [2, 14], 44: [2, 14], 47: [2, 14], 48: [2, 14], 51: [2, 14], 55: [2, 14], 60: [2, 14] }, { 33: [1, 114] }, { 33: [2, 87], 65: [2, 87], 72: [2, 87], 80: [2, 87], 81: [2, 87], 82: [2, 87], 83: [2, 87], 84: [2, 87], 85: [2, 87] }, { 33: [2, 89] }, { 20: 75, 63: 116, 64: 76, 65: [1, 44], 67: 115, 68: [2, 96], 69: 117, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 118] }, { 32: 119, 33: [2, 62], 74: 120, 75: [1, 121] }, { 33: [2, 59], 65: [2, 59], 72: [2, 59], 75: [2, 59], 80: [2, 59], 81: [2, 59], 82: [2, 59], 83: [2, 59], 84: [2, 59], 85: [2, 59] }, { 33: [2, 61], 75: [2, 61] }, { 33: [2, 68], 37: 122, 74: 123, 75: [1, 121] }, { 33: [2, 65], 65: [2, 65], 72: [2, 65], 75: [2, 65], 80: [2, 65], 81: [2, 65], 82: [2, 65], 83: [2, 65], 84: [2, 65], 85: [2, 65] }, { 33: [2, 67], 75: [2, 67] }, { 23: [1, 124] }, { 23: [2, 51], 65: [2, 51], 72: [2, 51], 80: [2, 51], 81: [2, 51], 82: [2, 51], 83: [2, 51], 84: [2, 51], 85: [2, 51] }, { 23: [2, 53] }, { 33: [1, 125] }, { 33: [2, 91], 65: [2, 91], 72: [2, 91], 80: [2, 91], 81: [2, 91], 82: [2, 91], 83: [2, 91], 84: [2, 91], 85: [2, 91] }, { 33: [2, 93] }, { 5: [2, 22], 14: [2, 22], 15: [2, 22], 19: [2, 22], 29: [2, 22], 34: [2, 22], 39: [2, 22], 44: [2, 22], 47: [2, 22], 48: [2, 22], 51: [2, 22], 55: [2, 22], 60: [2, 22] }, { 23: [2, 99], 33: [2, 99], 54: [2, 99], 68: [2, 99], 72: [2, 99], 75: [2, 99] }, { 73: [1, 109] }, { 20: 75, 63: 126, 64: 76, 65: [1, 44], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 23], 14: [2, 23], 15: [2, 23], 19: [2, 23], 29: [2, 23], 34: [2, 23], 39: [2, 23], 44: [2, 23], 47: [2, 23], 48: [2, 23], 51: [2, 23], 55: [2, 23], 60: [2, 23] }, { 47: [2, 19] }, { 47: [2, 77] }, { 20: 75, 33: [2, 72], 41: 127, 63: 128, 64: 76, 65: [1, 44], 69: 129, 70: 77, 71: 78, 72: [1, 79], 75: [2, 72], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 24], 14: [2, 24], 15: [2, 24], 19: [2, 24], 29: [2, 24], 34: [2, 24], 39: [2, 24], 44: [2, 24], 47: [2, 24], 48: [2, 24], 51: [2, 24], 55: [2, 24], 60: [2, 24] }, { 68: [1, 130] }, { 65: [2, 95], 68: [2, 95], 72: [2, 95], 80: [2, 95], 81: [2, 95], 82: [2, 95], 83: [2, 95], 84: [2, 95], 85: [2, 95] }, { 68: [2, 97] }, { 5: [2, 21], 14: [2, 21], 15: [2, 21], 19: [2, 21], 29: [2, 21], 34: [2, 21], 39: [2, 21], 44: [2, 21], 47: [2, 21], 48: [2, 21], 51: [2, 21], 55: [2, 21], 60: [2, 21] }, { 33: [1, 131] }, { 33: [2, 63] }, { 72: [1, 133], 76: 132 }, { 33: [1, 134] }, { 33: [2, 69] }, { 15: [2, 12] }, { 14: [2, 26], 15: [2, 26], 19: [2, 26], 29: [2, 26], 34: [2, 26], 47: [2, 26], 48: [2, 26], 51: [2, 26], 55: [2, 26], 60: [2, 26] }, { 23: [2, 31], 33: [2, 31], 54: [2, 31], 68: [2, 31], 72: [2, 31], 75: [2, 31] }, { 33: [2, 74], 42: 135, 74: 136, 75: [1, 121] }, { 33: [2, 71], 65: [2, 71], 72: [2, 71], 75: [2, 71], 80: [2, 71], 81: [2, 71], 82: [2, 71], 83: [2, 71], 84: [2, 71], 85: [2, 71] }, { 33: [2, 73], 75: [2, 73] }, { 23: [2, 29], 33: [2, 29], 54: [2, 29], 65: [2, 29], 68: [2, 29], 72: [2, 29], 75: [2, 29], 80: [2, 29], 81: [2, 29], 82: [2, 29], 83: [2, 29], 84: [2, 29], 85: [2, 29] }, { 14: [2, 15], 15: [2, 15], 19: [2, 15], 29: [2, 15], 34: [2, 15], 39: [2, 15], 44: [2, 15], 47: [2, 15], 48: [2, 15], 51: [2, 15], 55: [2, 15], 60: [2, 15] }, { 72: [1, 138], 77: [1, 137] }, { 72: [2, 100], 77: [2, 100] }, { 14: [2, 16], 15: [2, 16], 19: [2, 16], 29: [2, 16], 34: [2, 16], 44: [2, 16], 47: [2, 16], 48: [2, 16], 51: [2, 16], 55: [2, 16], 60: [2, 16] }, { 33: [1, 139] }, { 33: [2, 75] }, { 33: [2, 32] }, { 72: [2, 101], 77: [2, 101] }, { 14: [2, 17], 15: [2, 17], 19: [2, 17], 29: [2, 17], 34: [2, 17], 39: [2, 17], 44: [2, 17], 47: [2, 17], 48: [2, 17], 51: [2, 17], 55: [2, 17], 60: [2, 17] }],
	        defaultActions: { 4: [2, 1], 55: [2, 55], 57: [2, 20], 61: [2, 57], 74: [2, 81], 83: [2, 85], 87: [2, 18], 91: [2, 89], 102: [2, 53], 105: [2, 93], 111: [2, 19], 112: [2, 77], 117: [2, 97], 120: [2, 63], 123: [2, 69], 124: [2, 12], 136: [2, 75], 137: [2, 32] },
	        parseError: function parseError(str, hash) {
	            throw new Error(str);
	        },
	        parse: function parse(input) {
	            var self = this,
	                stack = [0],
	                vstack = [null],
	                lstack = [],
	                table = this.table,
	                yytext = "",
	                yylineno = 0,
	                yyleng = 0,
	                recovering = 0,
	                TERROR = 2,
	                EOF = 1;
	            this.lexer.setInput(input);
	            this.lexer.yy = this.yy;
	            this.yy.lexer = this.lexer;
	            this.yy.parser = this;
	            if (typeof this.lexer.yylloc == "undefined") this.lexer.yylloc = {};
	            var yyloc = this.lexer.yylloc;
	            lstack.push(yyloc);
	            var ranges = this.lexer.options && this.lexer.options.ranges;
	            if (typeof this.yy.parseError === "function") this.parseError = this.yy.parseError;
	            function popStack(n) {
	                stack.length = stack.length - 2 * n;
	                vstack.length = vstack.length - n;
	                lstack.length = lstack.length - n;
	            }
	            function lex() {
	                var token;
	                token = self.lexer.lex() || 1;
	                if (typeof token !== "number") {
	                    token = self.symbols_[token] || token;
	                }
	                return token;
	            }
	            var symbol,
	                preErrorSymbol,
	                state,
	                action,
	                a,
	                r,
	                yyval = {},
	                p,
	                len,
	                newState,
	                expected;
	            while (true) {
	                state = stack[stack.length - 1];
	                if (this.defaultActions[state]) {
	                    action = this.defaultActions[state];
	                } else {
	                    if (symbol === null || typeof symbol == "undefined") {
	                        symbol = lex();
	                    }
	                    action = table[state] && table[state][symbol];
	                }
	                if (typeof action === "undefined" || !action.length || !action[0]) {
	                    var errStr = "";
	                    if (!recovering) {
	                        expected = [];
	                        for (p in table[state]) if (this.terminals_[p] && p > 2) {
	                            expected.push("'" + this.terminals_[p] + "'");
	                        }
	                        if (this.lexer.showPosition) {
	                            errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
	                        } else {
	                            errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
	                        }
	                        this.parseError(errStr, { text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected });
	                    }
	                }
	                if (action[0] instanceof Array && action.length > 1) {
	                    throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
	                }
	                switch (action[0]) {
	                    case 1:
	                        stack.push(symbol);
	                        vstack.push(this.lexer.yytext);
	                        lstack.push(this.lexer.yylloc);
	                        stack.push(action[1]);
	                        symbol = null;
	                        if (!preErrorSymbol) {
	                            yyleng = this.lexer.yyleng;
	                            yytext = this.lexer.yytext;
	                            yylineno = this.lexer.yylineno;
	                            yyloc = this.lexer.yylloc;
	                            if (recovering > 0) recovering--;
	                        } else {
	                            symbol = preErrorSymbol;
	                            preErrorSymbol = null;
	                        }
	                        break;
	                    case 2:
	                        len = this.productions_[action[1]][1];
	                        yyval.$ = vstack[vstack.length - len];
	                        yyval._$ = { first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column };
	                        if (ranges) {
	                            yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
	                        }
	                        r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
	                        if (typeof r !== "undefined") {
	                            return r;
	                        }
	                        if (len) {
	                            stack = stack.slice(0, -1 * len * 2);
	                            vstack = vstack.slice(0, -1 * len);
	                            lstack = lstack.slice(0, -1 * len);
	                        }
	                        stack.push(this.productions_[action[1]][0]);
	                        vstack.push(yyval.$);
	                        lstack.push(yyval._$);
	                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
	                        stack.push(newState);
	                        break;
	                    case 3:
	                        return true;
	                }
	            }
	            return true;
	        }
	    };
	    /* Jison generated lexer */
	    var lexer = (function () {
	        var lexer = { EOF: 1,
	            parseError: function parseError(str, hash) {
	                if (this.yy.parser) {
	                    this.yy.parser.parseError(str, hash);
	                } else {
	                    throw new Error(str);
	                }
	            },
	            setInput: function setInput(input) {
	                this._input = input;
	                this._more = this._less = this.done = false;
	                this.yylineno = this.yyleng = 0;
	                this.yytext = this.matched = this.match = '';
	                this.conditionStack = ['INITIAL'];
	                this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 };
	                if (this.options.ranges) this.yylloc.range = [0, 0];
	                this.offset = 0;
	                return this;
	            },
	            input: function input() {
	                var ch = this._input[0];
	                this.yytext += ch;
	                this.yyleng++;
	                this.offset++;
	                this.match += ch;
	                this.matched += ch;
	                var lines = ch.match(/(?:\r\n?|\n).*/g);
	                if (lines) {
	                    this.yylineno++;
	                    this.yylloc.last_line++;
	                } else {
	                    this.yylloc.last_column++;
	                }
	                if (this.options.ranges) this.yylloc.range[1]++;

	                this._input = this._input.slice(1);
	                return ch;
	            },
	            unput: function unput(ch) {
	                var len = ch.length;
	                var lines = ch.split(/(?:\r\n?|\n)/g);

	                this._input = ch + this._input;
	                this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
	                //this.yyleng -= len;
	                this.offset -= len;
	                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
	                this.match = this.match.substr(0, this.match.length - 1);
	                this.matched = this.matched.substr(0, this.matched.length - 1);

	                if (lines.length - 1) this.yylineno -= lines.length - 1;
	                var r = this.yylloc.range;

	                this.yylloc = { first_line: this.yylloc.first_line,
	                    last_line: this.yylineno + 1,
	                    first_column: this.yylloc.first_column,
	                    last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
	                };

	                if (this.options.ranges) {
	                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
	                }
	                return this;
	            },
	            more: function more() {
	                this._more = true;
	                return this;
	            },
	            less: function less(n) {
	                this.unput(this.match.slice(n));
	            },
	            pastInput: function pastInput() {
	                var past = this.matched.substr(0, this.matched.length - this.match.length);
	                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
	            },
	            upcomingInput: function upcomingInput() {
	                var next = this.match;
	                if (next.length < 20) {
	                    next += this._input.substr(0, 20 - next.length);
	                }
	                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
	            },
	            showPosition: function showPosition() {
	                var pre = this.pastInput();
	                var c = new Array(pre.length + 1).join("-");
	                return pre + this.upcomingInput() + "\n" + c + "^";
	            },
	            next: function next() {
	                if (this.done) {
	                    return this.EOF;
	                }
	                if (!this._input) this.done = true;

	                var token, match, tempMatch, index, col, lines;
	                if (!this._more) {
	                    this.yytext = '';
	                    this.match = '';
	                }
	                var rules = this._currentRules();
	                for (var i = 0; i < rules.length; i++) {
	                    tempMatch = this._input.match(this.rules[rules[i]]);
	                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
	                        match = tempMatch;
	                        index = i;
	                        if (!this.options.flex) break;
	                    }
	                }
	                if (match) {
	                    lines = match[0].match(/(?:\r\n?|\n).*/g);
	                    if (lines) this.yylineno += lines.length;
	                    this.yylloc = { first_line: this.yylloc.last_line,
	                        last_line: this.yylineno + 1,
	                        first_column: this.yylloc.last_column,
	                        last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length };
	                    this.yytext += match[0];
	                    this.match += match[0];
	                    this.matches = match;
	                    this.yyleng = this.yytext.length;
	                    if (this.options.ranges) {
	                        this.yylloc.range = [this.offset, this.offset += this.yyleng];
	                    }
	                    this._more = false;
	                    this._input = this._input.slice(match[0].length);
	                    this.matched += match[0];
	                    token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
	                    if (this.done && this._input) this.done = false;
	                    if (token) return token;else return;
	                }
	                if (this._input === "") {
	                    return this.EOF;
	                } else {
	                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), { text: "", token: null, line: this.yylineno });
	                }
	            },
	            lex: function lex() {
	                var r = this.next();
	                if (typeof r !== 'undefined') {
	                    return r;
	                } else {
	                    return this.lex();
	                }
	            },
	            begin: function begin(condition) {
	                this.conditionStack.push(condition);
	            },
	            popState: function popState() {
	                return this.conditionStack.pop();
	            },
	            _currentRules: function _currentRules() {
	                return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
	            },
	            topState: function topState() {
	                return this.conditionStack[this.conditionStack.length - 2];
	            },
	            pushState: function begin(condition) {
	                this.begin(condition);
	            } };
	        lexer.options = {};
	        lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START
	        /**/) {

	            function strip(start, end) {
	                return yy_.yytext = yy_.yytext.substr(start, yy_.yyleng - end);
	            }

	            var YYSTATE = YY_START;
	            switch ($avoiding_name_collisions) {
	                case 0:
	                    if (yy_.yytext.slice(-2) === "\\\\") {
	                        strip(0, 1);
	                        this.begin("mu");
	                    } else if (yy_.yytext.slice(-1) === "\\") {
	                        strip(0, 1);
	                        this.begin("emu");
	                    } else {
	                        this.begin("mu");
	                    }
	                    if (yy_.yytext) return 15;

	                    break;
	                case 1:
	                    return 15;
	                    break;
	                case 2:
	                    this.popState();
	                    return 15;

	                    break;
	                case 3:
	                    this.begin('raw');return 15;
	                    break;
	                case 4:
	                    this.popState();
	                    // Should be using `this.topState()` below, but it currently
	                    // returns the second top instead of the first top. Opened an
	                    // issue about it at https://github.com/zaach/jison/issues/291
	                    if (this.conditionStack[this.conditionStack.length - 1] === 'raw') {
	                        return 15;
	                    } else {
	                        yy_.yytext = yy_.yytext.substr(5, yy_.yyleng - 9);
	                        return 'END_RAW_BLOCK';
	                    }

	                    break;
	                case 5:
	                    return 15;
	                    break;
	                case 6:
	                    this.popState();
	                    return 14;

	                    break;
	                case 7:
	                    return 65;
	                    break;
	                case 8:
	                    return 68;
	                    break;
	                case 9:
	                    return 19;
	                    break;
	                case 10:
	                    this.popState();
	                    this.begin('raw');
	                    return 23;

	                    break;
	                case 11:
	                    return 55;
	                    break;
	                case 12:
	                    return 60;
	                    break;
	                case 13:
	                    return 29;
	                    break;
	                case 14:
	                    return 47;
	                    break;
	                case 15:
	                    this.popState();return 44;
	                    break;
	                case 16:
	                    this.popState();return 44;
	                    break;
	                case 17:
	                    return 34;
	                    break;
	                case 18:
	                    return 39;
	                    break;
	                case 19:
	                    return 51;
	                    break;
	                case 20:
	                    return 48;
	                    break;
	                case 21:
	                    this.unput(yy_.yytext);
	                    this.popState();
	                    this.begin('com');

	                    break;
	                case 22:
	                    this.popState();
	                    return 14;

	                    break;
	                case 23:
	                    return 48;
	                    break;
	                case 24:
	                    return 73;
	                    break;
	                case 25:
	                    return 72;
	                    break;
	                case 26:
	                    return 72;
	                    break;
	                case 27:
	                    return 87;
	                    break;
	                case 28:
	                    // ignore whitespace
	                    break;
	                case 29:
	                    this.popState();return 54;
	                    break;
	                case 30:
	                    this.popState();return 33;
	                    break;
	                case 31:
	                    yy_.yytext = strip(1, 2).replace(/\\"/g, '"');return 80;
	                    break;
	                case 32:
	                    yy_.yytext = strip(1, 2).replace(/\\'/g, "'");return 80;
	                    break;
	                case 33:
	                    return 85;
	                    break;
	                case 34:
	                    return 82;
	                    break;
	                case 35:
	                    return 82;
	                    break;
	                case 36:
	                    return 83;
	                    break;
	                case 37:
	                    return 84;
	                    break;
	                case 38:
	                    return 81;
	                    break;
	                case 39:
	                    return 75;
	                    break;
	                case 40:
	                    return 77;
	                    break;
	                case 41:
	                    return 72;
	                    break;
	                case 42:
	                    yy_.yytext = yy_.yytext.replace(/\\([\\\]])/g, '$1');return 72;
	                    break;
	                case 43:
	                    return 'INVALID';
	                    break;
	                case 44:
	                    return 5;
	                    break;
	            }
	        };
	        lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]*?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/];
	        lexer.conditions = { "mu": { "rules": [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44], "inclusive": false }, "emu": { "rules": [2], "inclusive": false }, "com": { "rules": [6], "inclusive": false }, "raw": { "rules": [3, 4, 5], "inclusive": false }, "INITIAL": { "rules": [0, 1, 44], "inclusive": true } };
	        return lexer;
	    })();
	    parser.lexer = lexer;
	    function Parser() {
	        this.yy = {};
	    }Parser.prototype = parser;parser.Parser = Parser;
	    return new Parser();
	})();exports.__esModule = true;
	exports['default'] = handlebars;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;

	var _visitor = __webpack_require__(25);

	var _visitor2 = _interopRequireDefault(_visitor);

	function WhitespaceControl() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  this.options = options;
	}
	WhitespaceControl.prototype = new _visitor2['default']();

	WhitespaceControl.prototype.Program = function (program) {
	  var doStandalone = !this.options.ignoreStandalone;

	  var isRoot = !this.isRootSeen;
	  this.isRootSeen = true;

	  var body = program.body;
	  for (var i = 0, l = body.length; i < l; i++) {
	    var current = body[i],
	        strip = this.accept(current);

	    if (!strip) {
	      continue;
	    }

	    var _isPrevWhitespace = isPrevWhitespace(body, i, isRoot),
	        _isNextWhitespace = isNextWhitespace(body, i, isRoot),
	        openStandalone = strip.openStandalone && _isPrevWhitespace,
	        closeStandalone = strip.closeStandalone && _isNextWhitespace,
	        inlineStandalone = strip.inlineStandalone && _isPrevWhitespace && _isNextWhitespace;

	    if (strip.close) {
	      omitRight(body, i, true);
	    }
	    if (strip.open) {
	      omitLeft(body, i, true);
	    }

	    if (doStandalone && inlineStandalone) {
	      omitRight(body, i);

	      if (omitLeft(body, i)) {
	        // If we are on a standalone node, save the indent info for partials
	        if (current.type === 'PartialStatement') {
	          // Pull out the whitespace from the final line
	          current.indent = /([ \t]+$)/.exec(body[i - 1].original)[1];
	        }
	      }
	    }
	    if (doStandalone && openStandalone) {
	      omitRight((current.program || current.inverse).body);

	      // Strip out the previous content node if it's whitespace only
	      omitLeft(body, i);
	    }
	    if (doStandalone && closeStandalone) {
	      // Always strip the next node
	      omitRight(body, i);

	      omitLeft((current.inverse || current.program).body);
	    }
	  }

	  return program;
	};

	WhitespaceControl.prototype.BlockStatement = WhitespaceControl.prototype.DecoratorBlock = WhitespaceControl.prototype.PartialBlockStatement = function (block) {
	  this.accept(block.program);
	  this.accept(block.inverse);

	  // Find the inverse program that is involed with whitespace stripping.
	  var program = block.program || block.inverse,
	      inverse = block.program && block.inverse,
	      firstInverse = inverse,
	      lastInverse = inverse;

	  if (inverse && inverse.chained) {
	    firstInverse = inverse.body[0].program;

	    // Walk the inverse chain to find the last inverse that is actually in the chain.
	    while (lastInverse.chained) {
	      lastInverse = lastInverse.body[lastInverse.body.length - 1].program;
	    }
	  }

	  var strip = {
	    open: block.openStrip.open,
	    close: block.closeStrip.close,

	    // Determine the standalone candiacy. Basically flag our content as being possibly standalone
	    // so our parent can determine if we actually are standalone
	    openStandalone: isNextWhitespace(program.body),
	    closeStandalone: isPrevWhitespace((firstInverse || program).body)
	  };

	  if (block.openStrip.close) {
	    omitRight(program.body, null, true);
	  }

	  if (inverse) {
	    var inverseStrip = block.inverseStrip;

	    if (inverseStrip.open) {
	      omitLeft(program.body, null, true);
	    }

	    if (inverseStrip.close) {
	      omitRight(firstInverse.body, null, true);
	    }
	    if (block.closeStrip.open) {
	      omitLeft(lastInverse.body, null, true);
	    }

	    // Find standalone else statments
	    if (!this.options.ignoreStandalone && isPrevWhitespace(program.body) && isNextWhitespace(firstInverse.body)) {
	      omitLeft(program.body);
	      omitRight(firstInverse.body);
	    }
	  } else if (block.closeStrip.open) {
	    omitLeft(program.body, null, true);
	  }

	  return strip;
	};

	WhitespaceControl.prototype.Decorator = WhitespaceControl.prototype.MustacheStatement = function (mustache) {
	  return mustache.strip;
	};

	WhitespaceControl.prototype.PartialStatement = WhitespaceControl.prototype.CommentStatement = function (node) {
	  /* istanbul ignore next */
	  var strip = node.strip || {};
	  return {
	    inlineStandalone: true,
	    open: strip.open,
	    close: strip.close
	  };
	};

	function isPrevWhitespace(body, i, isRoot) {
	  if (i === undefined) {
	    i = body.length;
	  }

	  // Nodes that end with newlines are considered whitespace (but are special
	  // cased for strip operations)
	  var prev = body[i - 1],
	      sibling = body[i - 2];
	  if (!prev) {
	    return isRoot;
	  }

	  if (prev.type === 'ContentStatement') {
	    return (sibling || !isRoot ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(prev.original);
	  }
	}
	function isNextWhitespace(body, i, isRoot) {
	  if (i === undefined) {
	    i = -1;
	  }

	  var next = body[i + 1],
	      sibling = body[i + 2];
	  if (!next) {
	    return isRoot;
	  }

	  if (next.type === 'ContentStatement') {
	    return (sibling || !isRoot ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(next.original);
	  }
	}

	// Marks the node to the right of the position as omitted.
	// I.e. {{foo}}' ' will mark the ' ' node as omitted.
	//
	// If i is undefined, then the first child will be marked as such.
	//
	// If mulitple is truthy then all whitespace will be stripped out until non-whitespace
	// content is met.
	function omitRight(body, i, multiple) {
	  var current = body[i == null ? 0 : i + 1];
	  if (!current || current.type !== 'ContentStatement' || !multiple && current.rightStripped) {
	    return;
	  }

	  var original = current.value;
	  current.value = current.value.replace(multiple ? /^\s+/ : /^[ \t]*\r?\n?/, '');
	  current.rightStripped = current.value !== original;
	}

	// Marks the node to the left of the position as omitted.
	// I.e. ' '{{foo}} will mark the ' ' node as omitted.
	//
	// If i is undefined then the last child will be marked as such.
	//
	// If mulitple is truthy then all whitespace will be stripped out until non-whitespace
	// content is met.
	function omitLeft(body, i, multiple) {
	  var current = body[i == null ? body.length - 1 : i - 1];
	  if (!current || current.type !== 'ContentStatement' || !multiple && current.leftStripped) {
	    return;
	  }

	  // We omit the last node if it's whitespace only and not preceeded by a non-content node.
	  var original = current.value;
	  current.value = current.value.replace(multiple ? /\s+$/ : /[ \t]+$/, '');
	  current.leftStripped = current.value !== original;
	  return current.leftStripped;
	}

	exports['default'] = WhitespaceControl;
	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	function Visitor() {
	  this.parents = [];
	}

	Visitor.prototype = {
	  constructor: Visitor,
	  mutating: false,

	  // Visits a given value. If mutating, will replace the value if necessary.
	  acceptKey: function acceptKey(node, name) {
	    var value = this.accept(node[name]);
	    if (this.mutating) {
	      // Hacky sanity check: This may have a few false positives for type for the helper
	      // methods but will generally do the right thing without a lot of overhead.
	      if (value && !Visitor.prototype[value.type]) {
	        throw new _exception2['default']('Unexpected node type "' + value.type + '" found when accepting ' + name + ' on ' + node.type);
	      }
	      node[name] = value;
	    }
	  },

	  // Performs an accept operation with added sanity check to ensure
	  // required keys are not removed.
	  acceptRequired: function acceptRequired(node, name) {
	    this.acceptKey(node, name);

	    if (!node[name]) {
	      throw new _exception2['default'](node.type + ' requires ' + name);
	    }
	  },

	  // Traverses a given array. If mutating, empty respnses will be removed
	  // for child elements.
	  acceptArray: function acceptArray(array) {
	    for (var i = 0, l = array.length; i < l; i++) {
	      this.acceptKey(array, i);

	      if (!array[i]) {
	        array.splice(i, 1);
	        i--;
	        l--;
	      }
	    }
	  },

	  accept: function accept(object) {
	    if (!object) {
	      return;
	    }

	    /* istanbul ignore next: Sanity code */
	    if (!this[object.type]) {
	      throw new _exception2['default']('Unknown type: ' + object.type, object);
	    }

	    if (this.current) {
	      this.parents.unshift(this.current);
	    }
	    this.current = object;

	    var ret = this[object.type](object);

	    this.current = this.parents.shift();

	    if (!this.mutating || ret) {
	      return ret;
	    } else if (ret !== false) {
	      return object;
	    }
	  },

	  Program: function Program(program) {
	    this.acceptArray(program.body);
	  },

	  MustacheStatement: visitSubExpression,
	  Decorator: visitSubExpression,

	  BlockStatement: visitBlock,
	  DecoratorBlock: visitBlock,

	  PartialStatement: visitPartial,
	  PartialBlockStatement: function PartialBlockStatement(partial) {
	    visitPartial.call(this, partial);

	    this.acceptKey(partial, 'program');
	  },

	  ContentStatement: function ContentStatement() /* content */{},
	  CommentStatement: function CommentStatement() /* comment */{},

	  SubExpression: visitSubExpression,

	  PathExpression: function PathExpression() /* path */{},

	  StringLiteral: function StringLiteral() /* string */{},
	  NumberLiteral: function NumberLiteral() /* number */{},
	  BooleanLiteral: function BooleanLiteral() /* bool */{},
	  UndefinedLiteral: function UndefinedLiteral() /* literal */{},
	  NullLiteral: function NullLiteral() /* literal */{},

	  Hash: function Hash(hash) {
	    this.acceptArray(hash.pairs);
	  },
	  HashPair: function HashPair(pair) {
	    this.acceptRequired(pair, 'value');
	  }
	};

	function visitSubExpression(mustache) {
	  this.acceptRequired(mustache, 'path');
	  this.acceptArray(mustache.params);
	  this.acceptKey(mustache, 'hash');
	}
	function visitBlock(block) {
	  visitSubExpression.call(this, block);

	  this.acceptKey(block, 'program');
	  this.acceptKey(block, 'inverse');
	}
	function visitPartial(partial) {
	  this.acceptRequired(partial, 'name');
	  this.acceptArray(partial.params);
	  this.acceptKey(partial, 'hash');
	}

	exports['default'] = Visitor;
	module.exports = exports['default'];

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;
	exports.SourceLocation = SourceLocation;
	exports.id = id;
	exports.stripFlags = stripFlags;
	exports.stripComment = stripComment;
	exports.preparePath = preparePath;
	exports.prepareMustache = prepareMustache;
	exports.prepareRawBlock = prepareRawBlock;
	exports.prepareBlock = prepareBlock;
	exports.prepareProgram = prepareProgram;
	exports.preparePartialBlock = preparePartialBlock;

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	function validateClose(open, close) {
	  close = close.path ? close.path.original : close;

	  if (open.path.original !== close) {
	    var errorNode = { loc: open.path.loc };

	    throw new _exception2['default'](open.path.original + " doesn't match " + close, errorNode);
	  }
	}

	function SourceLocation(source, locInfo) {
	  this.source = source;
	  this.start = {
	    line: locInfo.first_line,
	    column: locInfo.first_column
	  };
	  this.end = {
	    line: locInfo.last_line,
	    column: locInfo.last_column
	  };
	}

	function id(token) {
	  if (/^\[.*\]$/.test(token)) {
	    return token.substr(1, token.length - 2);
	  } else {
	    return token;
	  }
	}

	function stripFlags(open, close) {
	  return {
	    open: open.charAt(2) === '~',
	    close: close.charAt(close.length - 3) === '~'
	  };
	}

	function stripComment(comment) {
	  return comment.replace(/^\{\{~?\!-?-?/, '').replace(/-?-?~?\}\}$/, '');
	}

	function preparePath(data, parts, loc) {
	  loc = this.locInfo(loc);

	  var original = data ? '@' : '',
	      dig = [],
	      depth = 0,
	      depthString = '';

	  for (var i = 0, l = parts.length; i < l; i++) {
	    var part = parts[i].part,

	    // If we have [] syntax then we do not treat path references as operators,
	    // i.e. foo.[this] resolves to approximately context.foo['this']
	    isLiteral = parts[i].original !== part;
	    original += (parts[i].separator || '') + part;

	    if (!isLiteral && (part === '..' || part === '.' || part === 'this')) {
	      if (dig.length > 0) {
	        throw new _exception2['default']('Invalid path: ' + original, { loc: loc });
	      } else if (part === '..') {
	        depth++;
	        depthString += '../';
	      }
	    } else {
	      dig.push(part);
	    }
	  }

	  return {
	    type: 'PathExpression',
	    data: data,
	    depth: depth,
	    parts: dig,
	    original: original,
	    loc: loc
	  };
	}

	function prepareMustache(path, params, hash, open, strip, locInfo) {
	  // Must use charAt to support IE pre-10
	  var escapeFlag = open.charAt(3) || open.charAt(2),
	      escaped = escapeFlag !== '{' && escapeFlag !== '&';

	  var decorator = /\*/.test(open);
	  return {
	    type: decorator ? 'Decorator' : 'MustacheStatement',
	    path: path,
	    params: params,
	    hash: hash,
	    escaped: escaped,
	    strip: strip,
	    loc: this.locInfo(locInfo)
	  };
	}

	function prepareRawBlock(openRawBlock, contents, close, locInfo) {
	  validateClose(openRawBlock, close);

	  locInfo = this.locInfo(locInfo);
	  var program = {
	    type: 'Program',
	    body: contents,
	    strip: {},
	    loc: locInfo
	  };

	  return {
	    type: 'BlockStatement',
	    path: openRawBlock.path,
	    params: openRawBlock.params,
	    hash: openRawBlock.hash,
	    program: program,
	    openStrip: {},
	    inverseStrip: {},
	    closeStrip: {},
	    loc: locInfo
	  };
	}

	function prepareBlock(openBlock, program, inverseAndProgram, close, inverted, locInfo) {
	  if (close && close.path) {
	    validateClose(openBlock, close);
	  }

	  var decorator = /\*/.test(openBlock.open);

	  program.blockParams = openBlock.blockParams;

	  var inverse = undefined,
	      inverseStrip = undefined;

	  if (inverseAndProgram) {
	    if (decorator) {
	      throw new _exception2['default']('Unexpected inverse block on decorator', inverseAndProgram);
	    }

	    if (inverseAndProgram.chain) {
	      inverseAndProgram.program.body[0].closeStrip = close.strip;
	    }

	    inverseStrip = inverseAndProgram.strip;
	    inverse = inverseAndProgram.program;
	  }

	  if (inverted) {
	    inverted = inverse;
	    inverse = program;
	    program = inverted;
	  }

	  return {
	    type: decorator ? 'DecoratorBlock' : 'BlockStatement',
	    path: openBlock.path,
	    params: openBlock.params,
	    hash: openBlock.hash,
	    program: program,
	    inverse: inverse,
	    openStrip: openBlock.strip,
	    inverseStrip: inverseStrip,
	    closeStrip: close && close.strip,
	    loc: this.locInfo(locInfo)
	  };
	}

	function prepareProgram(statements, loc) {
	  if (!loc && statements.length) {
	    var firstLoc = statements[0].loc,
	        lastLoc = statements[statements.length - 1].loc;

	    /* istanbul ignore else */
	    if (firstLoc && lastLoc) {
	      loc = {
	        source: firstLoc.source,
	        start: {
	          line: firstLoc.start.line,
	          column: firstLoc.start.column
	        },
	        end: {
	          line: lastLoc.end.line,
	          column: lastLoc.end.column
	        }
	      };
	    }
	  }

	  return {
	    type: 'Program',
	    body: statements,
	    strip: {},
	    loc: loc
	  };
	}

	function preparePartialBlock(open, program, close, locInfo) {
	  validateClose(open, close);

	  return {
	    type: 'PartialBlockStatement',
	    name: open.path,
	    params: open.params,
	    hash: open.hash,
	    program: program,
	    openStrip: open.strip,
	    closeStrip: close && close.strip,
	    loc: this.locInfo(locInfo)
	  };
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* eslint-disable new-cap */

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;
	exports.Compiler = Compiler;
	exports.precompile = precompile;
	exports.compile = compile;

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	var _utils = __webpack_require__(5);

	var _ast = __webpack_require__(21);

	var _ast2 = _interopRequireDefault(_ast);

	var slice = [].slice;

	function Compiler() {}

	// the foundHelper register will disambiguate helper lookup from finding a
	// function in a context. This is necessary for mustache compatibility, which
	// requires that context functions in blocks are evaluated by blockHelperMissing,
	// and then proceed as if the resulting value was provided to blockHelperMissing.

	Compiler.prototype = {
	  compiler: Compiler,

	  equals: function equals(other) {
	    var len = this.opcodes.length;
	    if (other.opcodes.length !== len) {
	      return false;
	    }

	    for (var i = 0; i < len; i++) {
	      var opcode = this.opcodes[i],
	          otherOpcode = other.opcodes[i];
	      if (opcode.opcode !== otherOpcode.opcode || !argEquals(opcode.args, otherOpcode.args)) {
	        return false;
	      }
	    }

	    // We know that length is the same between the two arrays because they are directly tied
	    // to the opcode behavior above.
	    len = this.children.length;
	    for (var i = 0; i < len; i++) {
	      if (!this.children[i].equals(other.children[i])) {
	        return false;
	      }
	    }

	    return true;
	  },

	  guid: 0,

	  compile: function compile(program, options) {
	    this.sourceNode = [];
	    this.opcodes = [];
	    this.children = [];
	    this.options = options;
	    this.stringParams = options.stringParams;
	    this.trackIds = options.trackIds;

	    options.blockParams = options.blockParams || [];

	    // These changes will propagate to the other compiler components
	    var knownHelpers = options.knownHelpers;
	    options.knownHelpers = {
	      'helperMissing': true,
	      'blockHelperMissing': true,
	      'each': true,
	      'if': true,
	      'unless': true,
	      'with': true,
	      'log': true,
	      'lookup': true
	    };
	    if (knownHelpers) {
	      for (var _name in knownHelpers) {
	        /* istanbul ignore else */
	        if (_name in knownHelpers) {
	          options.knownHelpers[_name] = knownHelpers[_name];
	        }
	      }
	    }

	    return this.accept(program);
	  },

	  compileProgram: function compileProgram(program) {
	    var childCompiler = new this.compiler(),
	        // eslint-disable-line new-cap
	    result = childCompiler.compile(program, this.options),
	        guid = this.guid++;

	    this.usePartial = this.usePartial || result.usePartial;

	    this.children[guid] = result;
	    this.useDepths = this.useDepths || result.useDepths;

	    return guid;
	  },

	  accept: function accept(node) {
	    /* istanbul ignore next: Sanity code */
	    if (!this[node.type]) {
	      throw new _exception2['default']('Unknown type: ' + node.type, node);
	    }

	    this.sourceNode.unshift(node);
	    var ret = this[node.type](node);
	    this.sourceNode.shift();
	    return ret;
	  },

	  Program: function Program(program) {
	    this.options.blockParams.unshift(program.blockParams);

	    var body = program.body,
	        bodyLength = body.length;
	    for (var i = 0; i < bodyLength; i++) {
	      this.accept(body[i]);
	    }

	    this.options.blockParams.shift();

	    this.isSimple = bodyLength === 1;
	    this.blockParams = program.blockParams ? program.blockParams.length : 0;

	    return this;
	  },

	  BlockStatement: function BlockStatement(block) {
	    transformLiteralToPath(block);

	    var program = block.program,
	        inverse = block.inverse;

	    program = program && this.compileProgram(program);
	    inverse = inverse && this.compileProgram(inverse);

	    var type = this.classifySexpr(block);

	    if (type === 'helper') {
	      this.helperSexpr(block, program, inverse);
	    } else if (type === 'simple') {
	      this.simpleSexpr(block);

	      // now that the simple mustache is resolved, we need to
	      // evaluate it by executing `blockHelperMissing`
	      this.opcode('pushProgram', program);
	      this.opcode('pushProgram', inverse);
	      this.opcode('emptyHash');
	      this.opcode('blockValue', block.path.original);
	    } else {
	      this.ambiguousSexpr(block, program, inverse);

	      // now that the simple mustache is resolved, we need to
	      // evaluate it by executing `blockHelperMissing`
	      this.opcode('pushProgram', program);
	      this.opcode('pushProgram', inverse);
	      this.opcode('emptyHash');
	      this.opcode('ambiguousBlockValue');
	    }

	    this.opcode('append');
	  },

	  DecoratorBlock: function DecoratorBlock(decorator) {
	    var program = decorator.program && this.compileProgram(decorator.program);
	    var params = this.setupFullMustacheParams(decorator, program, undefined),
	        path = decorator.path;

	    this.useDecorators = true;
	    this.opcode('registerDecorator', params.length, path.original);
	  },

	  PartialStatement: function PartialStatement(partial) {
	    this.usePartial = true;

	    var program = partial.program;
	    if (program) {
	      program = this.compileProgram(partial.program);
	    }

	    var params = partial.params;
	    if (params.length > 1) {
	      throw new _exception2['default']('Unsupported number of partial arguments: ' + params.length, partial);
	    } else if (!params.length) {
	      if (this.options.explicitPartialContext) {
	        this.opcode('pushLiteral', 'undefined');
	      } else {
	        params.push({ type: 'PathExpression', parts: [], depth: 0 });
	      }
	    }

	    var partialName = partial.name.original,
	        isDynamic = partial.name.type === 'SubExpression';
	    if (isDynamic) {
	      this.accept(partial.name);
	    }

	    this.setupFullMustacheParams(partial, program, undefined, true);

	    var indent = partial.indent || '';
	    if (this.options.preventIndent && indent) {
	      this.opcode('appendContent', indent);
	      indent = '';
	    }

	    this.opcode('invokePartial', isDynamic, partialName, indent);
	    this.opcode('append');
	  },
	  PartialBlockStatement: function PartialBlockStatement(partialBlock) {
	    this.PartialStatement(partialBlock);
	  },

	  MustacheStatement: function MustacheStatement(mustache) {
	    this.SubExpression(mustache);

	    if (mustache.escaped && !this.options.noEscape) {
	      this.opcode('appendEscaped');
	    } else {
	      this.opcode('append');
	    }
	  },
	  Decorator: function Decorator(decorator) {
	    this.DecoratorBlock(decorator);
	  },

	  ContentStatement: function ContentStatement(content) {
	    if (content.value) {
	      this.opcode('appendContent', content.value);
	    }
	  },

	  CommentStatement: function CommentStatement() {},

	  SubExpression: function SubExpression(sexpr) {
	    transformLiteralToPath(sexpr);
	    var type = this.classifySexpr(sexpr);

	    if (type === 'simple') {
	      this.simpleSexpr(sexpr);
	    } else if (type === 'helper') {
	      this.helperSexpr(sexpr);
	    } else {
	      this.ambiguousSexpr(sexpr);
	    }
	  },
	  ambiguousSexpr: function ambiguousSexpr(sexpr, program, inverse) {
	    var path = sexpr.path,
	        name = path.parts[0],
	        isBlock = program != null || inverse != null;

	    this.opcode('getContext', path.depth);

	    this.opcode('pushProgram', program);
	    this.opcode('pushProgram', inverse);

	    path.strict = true;
	    this.accept(path);

	    this.opcode('invokeAmbiguous', name, isBlock);
	  },

	  simpleSexpr: function simpleSexpr(sexpr) {
	    var path = sexpr.path;
	    path.strict = true;
	    this.accept(path);
	    this.opcode('resolvePossibleLambda');
	  },

	  helperSexpr: function helperSexpr(sexpr, program, inverse) {
	    var params = this.setupFullMustacheParams(sexpr, program, inverse),
	        path = sexpr.path,
	        name = path.parts[0];

	    if (this.options.knownHelpers[name]) {
	      this.opcode('invokeKnownHelper', params.length, name);
	    } else if (this.options.knownHelpersOnly) {
	      throw new _exception2['default']('You specified knownHelpersOnly, but used the unknown helper ' + name, sexpr);
	    } else {
	      path.strict = true;
	      path.falsy = true;

	      this.accept(path);
	      this.opcode('invokeHelper', params.length, path.original, _ast2['default'].helpers.simpleId(path));
	    }
	  },

	  PathExpression: function PathExpression(path) {
	    this.addDepth(path.depth);
	    this.opcode('getContext', path.depth);

	    var name = path.parts[0],
	        scoped = _ast2['default'].helpers.scopedId(path),
	        blockParamId = !path.depth && !scoped && this.blockParamIndex(name);

	    if (blockParamId) {
	      this.opcode('lookupBlockParam', blockParamId, path.parts);
	    } else if (!name) {
	      // Context reference, i.e. `{{foo .}}` or `{{foo ..}}`
	      this.opcode('pushContext');
	    } else if (path.data) {
	      this.options.data = true;
	      this.opcode('lookupData', path.depth, path.parts, path.strict);
	    } else {
	      this.opcode('lookupOnContext', path.parts, path.falsy, path.strict, scoped);
	    }
	  },

	  StringLiteral: function StringLiteral(string) {
	    this.opcode('pushString', string.value);
	  },

	  NumberLiteral: function NumberLiteral(number) {
	    this.opcode('pushLiteral', number.value);
	  },

	  BooleanLiteral: function BooleanLiteral(bool) {
	    this.opcode('pushLiteral', bool.value);
	  },

	  UndefinedLiteral: function UndefinedLiteral() {
	    this.opcode('pushLiteral', 'undefined');
	  },

	  NullLiteral: function NullLiteral() {
	    this.opcode('pushLiteral', 'null');
	  },

	  Hash: function Hash(hash) {
	    var pairs = hash.pairs,
	        i = 0,
	        l = pairs.length;

	    this.opcode('pushHash');

	    for (; i < l; i++) {
	      this.pushParam(pairs[i].value);
	    }
	    while (i--) {
	      this.opcode('assignToHash', pairs[i].key);
	    }
	    this.opcode('popHash');
	  },

	  // HELPERS
	  opcode: function opcode(name) {
	    this.opcodes.push({ opcode: name, args: slice.call(arguments, 1), loc: this.sourceNode[0].loc });
	  },

	  addDepth: function addDepth(depth) {
	    if (!depth) {
	      return;
	    }

	    this.useDepths = true;
	  },

	  classifySexpr: function classifySexpr(sexpr) {
	    var isSimple = _ast2['default'].helpers.simpleId(sexpr.path);

	    var isBlockParam = isSimple && !!this.blockParamIndex(sexpr.path.parts[0]);

	    // a mustache is an eligible helper if:
	    // * its id is simple (a single part, not `this` or `..`)
	    var isHelper = !isBlockParam && _ast2['default'].helpers.helperExpression(sexpr);

	    // if a mustache is an eligible helper but not a definite
	    // helper, it is ambiguous, and will be resolved in a later
	    // pass or at runtime.
	    var isEligible = !isBlockParam && (isHelper || isSimple);

	    // if ambiguous, we can possibly resolve the ambiguity now
	    // An eligible helper is one that does not have a complex path, i.e. `this.foo`, `../foo` etc.
	    if (isEligible && !isHelper) {
	      var _name2 = sexpr.path.parts[0],
	          options = this.options;

	      if (options.knownHelpers[_name2]) {
	        isHelper = true;
	      } else if (options.knownHelpersOnly) {
	        isEligible = false;
	      }
	    }

	    if (isHelper) {
	      return 'helper';
	    } else if (isEligible) {
	      return 'ambiguous';
	    } else {
	      return 'simple';
	    }
	  },

	  pushParams: function pushParams(params) {
	    for (var i = 0, l = params.length; i < l; i++) {
	      this.pushParam(params[i]);
	    }
	  },

	  pushParam: function pushParam(val) {
	    var value = val.value != null ? val.value : val.original || '';

	    if (this.stringParams) {
	      if (value.replace) {
	        value = value.replace(/^(\.?\.\/)*/g, '').replace(/\//g, '.');
	      }

	      if (val.depth) {
	        this.addDepth(val.depth);
	      }
	      this.opcode('getContext', val.depth || 0);
	      this.opcode('pushStringParam', value, val.type);

	      if (val.type === 'SubExpression') {
	        // SubExpressions get evaluated and passed in
	        // in string params mode.
	        this.accept(val);
	      }
	    } else {
	      if (this.trackIds) {
	        var blockParamIndex = undefined;
	        if (val.parts && !_ast2['default'].helpers.scopedId(val) && !val.depth) {
	          blockParamIndex = this.blockParamIndex(val.parts[0]);
	        }
	        if (blockParamIndex) {
	          var blockParamChild = val.parts.slice(1).join('.');
	          this.opcode('pushId', 'BlockParam', blockParamIndex, blockParamChild);
	        } else {
	          value = val.original || value;
	          if (value.replace) {
	            value = value.replace(/^this(?:\.|$)/, '').replace(/^\.\//, '').replace(/^\.$/, '');
	          }

	          this.opcode('pushId', val.type, value);
	        }
	      }
	      this.accept(val);
	    }
	  },

	  setupFullMustacheParams: function setupFullMustacheParams(sexpr, program, inverse, omitEmpty) {
	    var params = sexpr.params;
	    this.pushParams(params);

	    this.opcode('pushProgram', program);
	    this.opcode('pushProgram', inverse);

	    if (sexpr.hash) {
	      this.accept(sexpr.hash);
	    } else {
	      this.opcode('emptyHash', omitEmpty);
	    }

	    return params;
	  },

	  blockParamIndex: function blockParamIndex(name) {
	    for (var depth = 0, len = this.options.blockParams.length; depth < len; depth++) {
	      var blockParams = this.options.blockParams[depth],
	          param = blockParams && _utils.indexOf(blockParams, name);
	      if (blockParams && param >= 0) {
	        return [depth, param];
	      }
	    }
	  }
	};

	function precompile(input, options, env) {
	  if (input == null || typeof input !== 'string' && input.type !== 'Program') {
	    throw new _exception2['default']('You must pass a string or Handlebars AST to Handlebars.precompile. You passed ' + input);
	  }

	  options = options || {};
	  if (!('data' in options)) {
	    options.data = true;
	  }
	  if (options.compat) {
	    options.useDepths = true;
	  }

	  var ast = env.parse(input, options),
	      environment = new env.Compiler().compile(ast, options);
	  return new env.JavaScriptCompiler().compile(environment, options);
	}

	function compile(input, options, env) {
	  if (options === undefined) options = {};

	  if (input == null || typeof input !== 'string' && input.type !== 'Program') {
	    throw new _exception2['default']('You must pass a string or Handlebars AST to Handlebars.compile. You passed ' + input);
	  }

	  if (!('data' in options)) {
	    options.data = true;
	  }
	  if (options.compat) {
	    options.useDepths = true;
	  }

	  var compiled = undefined;

	  function compileInput() {
	    var ast = env.parse(input, options),
	        environment = new env.Compiler().compile(ast, options),
	        templateSpec = new env.JavaScriptCompiler().compile(environment, options, undefined, true);
	    return env.template(templateSpec);
	  }

	  // Template is only compiled on first use and cached after that point.
	  function ret(context, execOptions) {
	    if (!compiled) {
	      compiled = compileInput();
	    }
	    return compiled.call(this, context, execOptions);
	  }
	  ret._setup = function (setupOptions) {
	    if (!compiled) {
	      compiled = compileInput();
	    }
	    return compiled._setup(setupOptions);
	  };
	  ret._child = function (i, data, blockParams, depths) {
	    if (!compiled) {
	      compiled = compileInput();
	    }
	    return compiled._child(i, data, blockParams, depths);
	  };
	  return ret;
	}

	function argEquals(a, b) {
	  if (a === b) {
	    return true;
	  }

	  if (_utils.isArray(a) && _utils.isArray(b) && a.length === b.length) {
	    for (var i = 0; i < a.length; i++) {
	      if (!argEquals(a[i], b[i])) {
	        return false;
	      }
	    }
	    return true;
	  }
	}

	function transformLiteralToPath(sexpr) {
	  if (!sexpr.path.parts) {
	    var literal = sexpr.path;
	    // Casting to string here to make false and 0 literal values play nicely with the rest
	    // of the system.
	    sexpr.path = {
	      type: 'PathExpression',
	      data: false,
	      depth: 0,
	      parts: [literal.original + ''],
	      original: literal.original + '',
	      loc: literal.loc
	    };
	  }
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	exports.__esModule = true;

	var _base = __webpack_require__(4);

	var _exception = __webpack_require__(6);

	var _exception2 = _interopRequireDefault(_exception);

	var _utils = __webpack_require__(5);

	var _codeGen = __webpack_require__(29);

	var _codeGen2 = _interopRequireDefault(_codeGen);

	function Literal(value) {
	  this.value = value;
	}

	function JavaScriptCompiler() {}

	JavaScriptCompiler.prototype = {
	  // PUBLIC API: You can override these methods in a subclass to provide
	  // alternative compiled forms for name lookup and buffering semantics
	  nameLookup: function nameLookup(parent, name /* , type*/) {
	    if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
	      return [parent, '.', name];
	    } else {
	      return [parent, '[', JSON.stringify(name), ']'];
	    }
	  },
	  depthedLookup: function depthedLookup(name) {
	    return [this.aliasable('container.lookup'), '(depths, "', name, '")'];
	  },

	  compilerInfo: function compilerInfo() {
	    var revision = _base.COMPILER_REVISION,
	        versions = _base.REVISION_CHANGES[revision];
	    return [revision, versions];
	  },

	  appendToBuffer: function appendToBuffer(source, location, explicit) {
	    // Force a source as this simplifies the merge logic.
	    if (!_utils.isArray(source)) {
	      source = [source];
	    }
	    source = this.source.wrap(source, location);

	    if (this.environment.isSimple) {
	      return ['return ', source, ';'];
	    } else if (explicit) {
	      // This is a case where the buffer operation occurs as a child of another
	      // construct, generally braces. We have to explicitly output these buffer
	      // operations to ensure that the emitted code goes in the correct location.
	      return ['buffer += ', source, ';'];
	    } else {
	      source.appendToBuffer = true;
	      return source;
	    }
	  },

	  initializeBuffer: function initializeBuffer() {
	    return this.quotedString('');
	  },
	  // END PUBLIC API

	  compile: function compile(environment, options, context, asObject) {
	    this.environment = environment;
	    this.options = options;
	    this.stringParams = this.options.stringParams;
	    this.trackIds = this.options.trackIds;
	    this.precompile = !asObject;

	    this.name = this.environment.name;
	    this.isChild = !!context;
	    this.context = context || {
	      decorators: [],
	      programs: [],
	      environments: []
	    };

	    this.preamble();

	    this.stackSlot = 0;
	    this.stackVars = [];
	    this.aliases = {};
	    this.registers = { list: [] };
	    this.hashes = [];
	    this.compileStack = [];
	    this.inlineStack = [];
	    this.blockParams = [];

	    this.compileChildren(environment, options);

	    this.useDepths = this.useDepths || environment.useDepths || environment.useDecorators || this.options.compat;
	    this.useBlockParams = this.useBlockParams || environment.useBlockParams;

	    var opcodes = environment.opcodes,
	        opcode = undefined,
	        firstLoc = undefined,
	        i = undefined,
	        l = undefined;

	    for (i = 0, l = opcodes.length; i < l; i++) {
	      opcode = opcodes[i];

	      this.source.currentLocation = opcode.loc;
	      firstLoc = firstLoc || opcode.loc;
	      this[opcode.opcode].apply(this, opcode.args);
	    }

	    // Flush any trailing content that might be pending.
	    this.source.currentLocation = firstLoc;
	    this.pushSource('');

	    /* istanbul ignore next */
	    if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
	      throw new _exception2['default']('Compile completed with content left on stack');
	    }

	    if (!this.decorators.isEmpty()) {
	      this.useDecorators = true;

	      this.decorators.prepend('var decorators = container.decorators;\n');
	      this.decorators.push('return fn;');

	      if (asObject) {
	        this.decorators = Function.apply(this, ['fn', 'props', 'container', 'depth0', 'data', 'blockParams', 'depths', this.decorators.merge()]);
	      } else {
	        this.decorators.prepend('function(fn, props, container, depth0, data, blockParams, depths) {\n');
	        this.decorators.push('}\n');
	        this.decorators = this.decorators.merge();
	      }
	    } else {
	      this.decorators = undefined;
	    }

	    var fn = this.createFunctionContext(asObject);
	    if (!this.isChild) {
	      var ret = {
	        compiler: this.compilerInfo(),
	        main: fn
	      };

	      if (this.decorators) {
	        ret.main_d = this.decorators; // eslint-disable-line camelcase
	        ret.useDecorators = true;
	      }

	      var _context = this.context;
	      var programs = _context.programs;
	      var decorators = _context.decorators;

	      for (i = 0, l = programs.length; i < l; i++) {
	        if (programs[i]) {
	          ret[i] = programs[i];
	          if (decorators[i]) {
	            ret[i + '_d'] = decorators[i];
	            ret.useDecorators = true;
	          }
	        }
	      }

	      if (this.environment.usePartial) {
	        ret.usePartial = true;
	      }
	      if (this.options.data) {
	        ret.useData = true;
	      }
	      if (this.useDepths) {
	        ret.useDepths = true;
	      }
	      if (this.useBlockParams) {
	        ret.useBlockParams = true;
	      }
	      if (this.options.compat) {
	        ret.compat = true;
	      }

	      if (!asObject) {
	        ret.compiler = JSON.stringify(ret.compiler);

	        this.source.currentLocation = { start: { line: 1, column: 0 } };
	        ret = this.objectLiteral(ret);

	        if (options.srcName) {
	          ret = ret.toStringWithSourceMap({ file: options.destName });
	          ret.map = ret.map && ret.map.toString();
	        } else {
	          ret = ret.toString();
	        }
	      } else {
	        ret.compilerOptions = this.options;
	      }

	      return ret;
	    } else {
	      return fn;
	    }
	  },

	  preamble: function preamble() {
	    // track the last context pushed into place to allow skipping the
	    // getContext opcode when it would be a noop
	    this.lastContext = 0;
	    this.source = new _codeGen2['default'](this.options.srcName);
	    this.decorators = new _codeGen2['default'](this.options.srcName);
	  },

	  createFunctionContext: function createFunctionContext(asObject) {
	    var varDeclarations = '';

	    var locals = this.stackVars.concat(this.registers.list);
	    if (locals.length > 0) {
	      varDeclarations += ', ' + locals.join(', ');
	    }

	    // Generate minimizer alias mappings
	    //
	    // When using true SourceNodes, this will update all references to the given alias
	    // as the source nodes are reused in situ. For the non-source node compilation mode,
	    // aliases will not be used, but this case is already being run on the client and
	    // we aren't concern about minimizing the template size.
	    var aliasCount = 0;
	    for (var alias in this.aliases) {
	      // eslint-disable-line guard-for-in
	      var node = this.aliases[alias];

	      if (this.aliases.hasOwnProperty(alias) && node.children && node.referenceCount > 1) {
	        varDeclarations += ', alias' + ++aliasCount + '=' + alias;
	        node.children[0] = 'alias' + aliasCount;
	      }
	    }

	    var params = ['container', 'depth0', 'helpers', 'partials', 'data'];

	    if (this.useBlockParams || this.useDepths) {
	      params.push('blockParams');
	    }
	    if (this.useDepths) {
	      params.push('depths');
	    }

	    // Perform a second pass over the output to merge content when possible
	    var source = this.mergeSource(varDeclarations);

	    if (asObject) {
	      params.push(source);

	      return Function.apply(this, params);
	    } else {
	      return this.source.wrap(['function(', params.join(','), ') {\n  ', source, '}']);
	    }
	  },
	  mergeSource: function mergeSource(varDeclarations) {
	    var isSimple = this.environment.isSimple,
	        appendOnly = !this.forceBuffer,
	        appendFirst = undefined,
	        sourceSeen = undefined,
	        bufferStart = undefined,
	        bufferEnd = undefined;
	    this.source.each(function (line) {
	      if (line.appendToBuffer) {
	        if (bufferStart) {
	          line.prepend('  + ');
	        } else {
	          bufferStart = line;
	        }
	        bufferEnd = line;
	      } else {
	        if (bufferStart) {
	          if (!sourceSeen) {
	            appendFirst = true;
	          } else {
	            bufferStart.prepend('buffer += ');
	          }
	          bufferEnd.add(';');
	          bufferStart = bufferEnd = undefined;
	        }

	        sourceSeen = true;
	        if (!isSimple) {
	          appendOnly = false;
	        }
	      }
	    });

	    if (appendOnly) {
	      if (bufferStart) {
	        bufferStart.prepend('return ');
	        bufferEnd.add(';');
	      } else if (!sourceSeen) {
	        this.source.push('return "";');
	      }
	    } else {
	      varDeclarations += ', buffer = ' + (appendFirst ? '' : this.initializeBuffer());

	      if (bufferStart) {
	        bufferStart.prepend('return buffer + ');
	        bufferEnd.add(';');
	      } else {
	        this.source.push('return buffer;');
	      }
	    }

	    if (varDeclarations) {
	      this.source.prepend('var ' + varDeclarations.substring(2) + (appendFirst ? '' : ';\n'));
	    }

	    return this.source.merge();
	  },

	  // [blockValue]
	  //
	  // On stack, before: hash, inverse, program, value
	  // On stack, after: return value of blockHelperMissing
	  //
	  // The purpose of this opcode is to take a block of the form
	  // `{{#this.foo}}...{{/this.foo}}`, resolve the value of `foo`, and
	  // replace it on the stack with the result of properly
	  // invoking blockHelperMissing.
	  blockValue: function blockValue(name) {
	    var blockHelperMissing = this.aliasable('helpers.blockHelperMissing'),
	        params = [this.contextName(0)];
	    this.setupHelperArgs(name, 0, params);

	    var blockName = this.popStack();
	    params.splice(1, 0, blockName);

	    this.push(this.source.functionCall(blockHelperMissing, 'call', params));
	  },

	  // [ambiguousBlockValue]
	  //
	  // On stack, before: hash, inverse, program, value
	  // Compiler value, before: lastHelper=value of last found helper, if any
	  // On stack, after, if no lastHelper: same as [blockValue]
	  // On stack, after, if lastHelper: value
	  ambiguousBlockValue: function ambiguousBlockValue() {
	    // We're being a bit cheeky and reusing the options value from the prior exec
	    var blockHelperMissing = this.aliasable('helpers.blockHelperMissing'),
	        params = [this.contextName(0)];
	    this.setupHelperArgs('', 0, params, true);

	    this.flushInline();

	    var current = this.topStack();
	    params.splice(1, 0, current);

	    this.pushSource(['if (!', this.lastHelper, ') { ', current, ' = ', this.source.functionCall(blockHelperMissing, 'call', params), '}']);
	  },

	  // [appendContent]
	  //
	  // On stack, before: ...
	  // On stack, after: ...
	  //
	  // Appends the string value of `content` to the current buffer
	  appendContent: function appendContent(content) {
	    if (this.pendingContent) {
	      content = this.pendingContent + content;
	    } else {
	      this.pendingLocation = this.source.currentLocation;
	    }

	    this.pendingContent = content;
	  },

	  // [append]
	  //
	  // On stack, before: value, ...
	  // On stack, after: ...
	  //
	  // Coerces `value` to a String and appends it to the current buffer.
	  //
	  // If `value` is truthy, or 0, it is coerced into a string and appended
	  // Otherwise, the empty string is appended
	  append: function append() {
	    if (this.isInline()) {
	      this.replaceStack(function (current) {
	        return [' != null ? ', current, ' : ""'];
	      });

	      this.pushSource(this.appendToBuffer(this.popStack()));
	    } else {
	      var local = this.popStack();
	      this.pushSource(['if (', local, ' != null) { ', this.appendToBuffer(local, undefined, true), ' }']);
	      if (this.environment.isSimple) {
	        this.pushSource(['else { ', this.appendToBuffer("''", undefined, true), ' }']);
	      }
	    }
	  },

	  // [appendEscaped]
	  //
	  // On stack, before: value, ...
	  // On stack, after: ...
	  //
	  // Escape `value` and append it to the buffer
	  appendEscaped: function appendEscaped() {
	    this.pushSource(this.appendToBuffer([this.aliasable('container.escapeExpression'), '(', this.popStack(), ')']));
	  },

	  // [getContext]
	  //
	  // On stack, before: ...
	  // On stack, after: ...
	  // Compiler value, after: lastContext=depth
	  //
	  // Set the value of the `lastContext` compiler value to the depth
	  getContext: function getContext(depth) {
	    this.lastContext = depth;
	  },

	  // [pushContext]
	  //
	  // On stack, before: ...
	  // On stack, after: currentContext, ...
	  //
	  // Pushes the value of the current context onto the stack.
	  pushContext: function pushContext() {
	    this.pushStackLiteral(this.contextName(this.lastContext));
	  },

	  // [lookupOnContext]
	  //
	  // On stack, before: ...
	  // On stack, after: currentContext[name], ...
	  //
	  // Looks up the value of `name` on the current context and pushes
	  // it onto the stack.
	  lookupOnContext: function lookupOnContext(parts, falsy, strict, scoped) {
	    var i = 0;

	    if (!scoped && this.options.compat && !this.lastContext) {
	      // The depthed query is expected to handle the undefined logic for the root level that
	      // is implemented below, so we evaluate that directly in compat mode
	      this.push(this.depthedLookup(parts[i++]));
	    } else {
	      this.pushContext();
	    }

	    this.resolvePath('context', parts, i, falsy, strict);
	  },

	  // [lookupBlockParam]
	  //
	  // On stack, before: ...
	  // On stack, after: blockParam[name], ...
	  //
	  // Looks up the value of `parts` on the given block param and pushes
	  // it onto the stack.
	  lookupBlockParam: function lookupBlockParam(blockParamId, parts) {
	    this.useBlockParams = true;

	    this.push(['blockParams[', blockParamId[0], '][', blockParamId[1], ']']);
	    this.resolvePath('context', parts, 1);
	  },

	  // [lookupData]
	  //
	  // On stack, before: ...
	  // On stack, after: data, ...
	  //
	  // Push the data lookup operator
	  lookupData: function lookupData(depth, parts, strict) {
	    if (!depth) {
	      this.pushStackLiteral('data');
	    } else {
	      this.pushStackLiteral('container.data(data, ' + depth + ')');
	    }

	    this.resolvePath('data', parts, 0, true, strict);
	  },

	  resolvePath: function resolvePath(type, parts, i, falsy, strict) {
	    // istanbul ignore next

	    var _this = this;

	    if (this.options.strict || this.options.assumeObjects) {
	      this.push(strictLookup(this.options.strict && strict, this, parts, type));
	      return;
	    }

	    var len = parts.length;
	    for (; i < len; i++) {
	      /* eslint-disable no-loop-func */
	      this.replaceStack(function (current) {
	        var lookup = _this.nameLookup(current, parts[i], type);
	        // We want to ensure that zero and false are handled properly if the context (falsy flag)
	        // needs to have the special handling for these values.
	        if (!falsy) {
	          return [' != null ? ', lookup, ' : ', current];
	        } else {
	          // Otherwise we can use generic falsy handling
	          return [' && ', lookup];
	        }
	      });
	      /* eslint-enable no-loop-func */
	    }
	  },

	  // [resolvePossibleLambda]
	  //
	  // On stack, before: value, ...
	  // On stack, after: resolved value, ...
	  //
	  // If the `value` is a lambda, replace it on the stack by
	  // the return value of the lambda
	  resolvePossibleLambda: function resolvePossibleLambda() {
	    this.push([this.aliasable('container.lambda'), '(', this.popStack(), ', ', this.contextName(0), ')']);
	  },

	  // [pushStringParam]
	  //
	  // On stack, before: ...
	  // On stack, after: string, currentContext, ...
	  //
	  // This opcode is designed for use in string mode, which
	  // provides the string value of a parameter along with its
	  // depth rather than resolving it immediately.
	  pushStringParam: function pushStringParam(string, type) {
	    this.pushContext();
	    this.pushString(type);

	    // If it's a subexpression, the string result
	    // will be pushed after this opcode.
	    if (type !== 'SubExpression') {
	      if (typeof string === 'string') {
	        this.pushString(string);
	      } else {
	        this.pushStackLiteral(string);
	      }
	    }
	  },

	  emptyHash: function emptyHash(omitEmpty) {
	    if (this.trackIds) {
	      this.push('{}'); // hashIds
	    }
	    if (this.stringParams) {
	      this.push('{}'); // hashContexts
	      this.push('{}'); // hashTypes
	    }
	    this.pushStackLiteral(omitEmpty ? 'undefined' : '{}');
	  },
	  pushHash: function pushHash() {
	    if (this.hash) {
	      this.hashes.push(this.hash);
	    }
	    this.hash = { values: [], types: [], contexts: [], ids: [] };
	  },
	  popHash: function popHash() {
	    var hash = this.hash;
	    this.hash = this.hashes.pop();

	    if (this.trackIds) {
	      this.push(this.objectLiteral(hash.ids));
	    }
	    if (this.stringParams) {
	      this.push(this.objectLiteral(hash.contexts));
	      this.push(this.objectLiteral(hash.types));
	    }

	    this.push(this.objectLiteral(hash.values));
	  },

	  // [pushString]
	  //
	  // On stack, before: ...
	  // On stack, after: quotedString(string), ...
	  //
	  // Push a quoted version of `string` onto the stack
	  pushString: function pushString(string) {
	    this.pushStackLiteral(this.quotedString(string));
	  },

	  // [pushLiteral]
	  //
	  // On stack, before: ...
	  // On stack, after: value, ...
	  //
	  // Pushes a value onto the stack. This operation prevents
	  // the compiler from creating a temporary variable to hold
	  // it.
	  pushLiteral: function pushLiteral(value) {
	    this.pushStackLiteral(value);
	  },

	  // [pushProgram]
	  //
	  // On stack, before: ...
	  // On stack, after: program(guid), ...
	  //
	  // Push a program expression onto the stack. This takes
	  // a compile-time guid and converts it into a runtime-accessible
	  // expression.
	  pushProgram: function pushProgram(guid) {
	    if (guid != null) {
	      this.pushStackLiteral(this.programExpression(guid));
	    } else {
	      this.pushStackLiteral(null);
	    }
	  },

	  // [registerDecorator]
	  //
	  // On stack, before: hash, program, params..., ...
	  // On stack, after: ...
	  //
	  // Pops off the decorator's parameters, invokes the decorator,
	  // and inserts the decorator into the decorators list.
	  registerDecorator: function registerDecorator(paramSize, name) {
	    var foundDecorator = this.nameLookup('decorators', name, 'decorator'),
	        options = this.setupHelperArgs(name, paramSize);

	    this.decorators.push(['fn = ', this.decorators.functionCall(foundDecorator, '', ['fn', 'props', 'container', options]), ' || fn;']);
	  },

	  // [invokeHelper]
	  //
	  // On stack, before: hash, inverse, program, params..., ...
	  // On stack, after: result of helper invocation
	  //
	  // Pops off the helper's parameters, invokes the helper,
	  // and pushes the helper's return value onto the stack.
	  //
	  // If the helper is not found, `helperMissing` is called.
	  invokeHelper: function invokeHelper(paramSize, name, isSimple) {
	    var nonHelper = this.popStack(),
	        helper = this.setupHelper(paramSize, name),
	        simple = isSimple ? [helper.name, ' || '] : '';

	    var lookup = ['('].concat(simple, nonHelper);
	    if (!this.options.strict) {
	      lookup.push(' || ', this.aliasable('helpers.helperMissing'));
	    }
	    lookup.push(')');

	    this.push(this.source.functionCall(lookup, 'call', helper.callParams));
	  },

	  // [invokeKnownHelper]
	  //
	  // On stack, before: hash, inverse, program, params..., ...
	  // On stack, after: result of helper invocation
	  //
	  // This operation is used when the helper is known to exist,
	  // so a `helperMissing` fallback is not required.
	  invokeKnownHelper: function invokeKnownHelper(paramSize, name) {
	    var helper = this.setupHelper(paramSize, name);
	    this.push(this.source.functionCall(helper.name, 'call', helper.callParams));
	  },

	  // [invokeAmbiguous]
	  //
	  // On stack, before: hash, inverse, program, params..., ...
	  // On stack, after: result of disambiguation
	  //
	  // This operation is used when an expression like `{{foo}}`
	  // is provided, but we don't know at compile-time whether it
	  // is a helper or a path.
	  //
	  // This operation emits more code than the other options,
	  // and can be avoided by passing the `knownHelpers` and
	  // `knownHelpersOnly` flags at compile-time.
	  invokeAmbiguous: function invokeAmbiguous(name, helperCall) {
	    this.useRegister('helper');

	    var nonHelper = this.popStack();

	    this.emptyHash();
	    var helper = this.setupHelper(0, name, helperCall);

	    var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');

	    var lookup = ['(', '(helper = ', helperName, ' || ', nonHelper, ')'];
	    if (!this.options.strict) {
	      lookup[0] = '(helper = ';
	      lookup.push(' != null ? helper : ', this.aliasable('helpers.helperMissing'));
	    }

	    this.push(['(', lookup, helper.paramsInit ? ['),(', helper.paramsInit] : [], '),', '(typeof helper === ', this.aliasable('"function"'), ' ? ', this.source.functionCall('helper', 'call', helper.callParams), ' : helper))']);
	  },

	  // [invokePartial]
	  //
	  // On stack, before: context, ...
	  // On stack after: result of partial invocation
	  //
	  // This operation pops off a context, invokes a partial with that context,
	  // and pushes the result of the invocation back.
	  invokePartial: function invokePartial(isDynamic, name, indent) {
	    var params = [],
	        options = this.setupParams(name, 1, params);

	    if (isDynamic) {
	      name = this.popStack();
	      delete options.name;
	    }

	    if (indent) {
	      options.indent = JSON.stringify(indent);
	    }
	    options.helpers = 'helpers';
	    options.partials = 'partials';
	    options.decorators = 'container.decorators';

	    if (!isDynamic) {
	      params.unshift(this.nameLookup('partials', name, 'partial'));
	    } else {
	      params.unshift(name);
	    }

	    if (this.options.compat) {
	      options.depths = 'depths';
	    }
	    options = this.objectLiteral(options);
	    params.push(options);

	    this.push(this.source.functionCall('container.invokePartial', '', params));
	  },

	  // [assignToHash]
	  //
	  // On stack, before: value, ..., hash, ...
	  // On stack, after: ..., hash, ...
	  //
	  // Pops a value off the stack and assigns it to the current hash
	  assignToHash: function assignToHash(key) {
	    var value = this.popStack(),
	        context = undefined,
	        type = undefined,
	        id = undefined;

	    if (this.trackIds) {
	      id = this.popStack();
	    }
	    if (this.stringParams) {
	      type = this.popStack();
	      context = this.popStack();
	    }

	    var hash = this.hash;
	    if (context) {
	      hash.contexts[key] = context;
	    }
	    if (type) {
	      hash.types[key] = type;
	    }
	    if (id) {
	      hash.ids[key] = id;
	    }
	    hash.values[key] = value;
	  },

	  pushId: function pushId(type, name, child) {
	    if (type === 'BlockParam') {
	      this.pushStackLiteral('blockParams[' + name[0] + '].path[' + name[1] + ']' + (child ? ' + ' + JSON.stringify('.' + child) : ''));
	    } else if (type === 'PathExpression') {
	      this.pushString(name);
	    } else if (type === 'SubExpression') {
	      this.pushStackLiteral('true');
	    } else {
	      this.pushStackLiteral('null');
	    }
	  },

	  // HELPERS

	  compiler: JavaScriptCompiler,

	  compileChildren: function compileChildren(environment, options) {
	    var children = environment.children,
	        child = undefined,
	        compiler = undefined;

	    for (var i = 0, l = children.length; i < l; i++) {
	      child = children[i];
	      compiler = new this.compiler(); // eslint-disable-line new-cap

	      var index = this.matchExistingProgram(child);

	      if (index == null) {
	        this.context.programs.push(''); // Placeholder to prevent name conflicts for nested children
	        index = this.context.programs.length;
	        child.index = index;
	        child.name = 'program' + index;
	        this.context.programs[index] = compiler.compile(child, options, this.context, !this.precompile);
	        this.context.decorators[index] = compiler.decorators;
	        this.context.environments[index] = child;

	        this.useDepths = this.useDepths || compiler.useDepths;
	        this.useBlockParams = this.useBlockParams || compiler.useBlockParams;
	      } else {
	        child.index = index;
	        child.name = 'program' + index;

	        this.useDepths = this.useDepths || child.useDepths;
	        this.useBlockParams = this.useBlockParams || child.useBlockParams;
	      }
	    }
	  },
	  matchExistingProgram: function matchExistingProgram(child) {
	    for (var i = 0, len = this.context.environments.length; i < len; i++) {
	      var environment = this.context.environments[i];
	      if (environment && environment.equals(child)) {
	        return i;
	      }
	    }
	  },

	  programExpression: function programExpression(guid) {
	    var child = this.environment.children[guid],
	        programParams = [child.index, 'data', child.blockParams];

	    if (this.useBlockParams || this.useDepths) {
	      programParams.push('blockParams');
	    }
	    if (this.useDepths) {
	      programParams.push('depths');
	    }

	    return 'container.program(' + programParams.join(', ') + ')';
	  },

	  useRegister: function useRegister(name) {
	    if (!this.registers[name]) {
	      this.registers[name] = true;
	      this.registers.list.push(name);
	    }
	  },

	  push: function push(expr) {
	    if (!(expr instanceof Literal)) {
	      expr = this.source.wrap(expr);
	    }

	    this.inlineStack.push(expr);
	    return expr;
	  },

	  pushStackLiteral: function pushStackLiteral(item) {
	    this.push(new Literal(item));
	  },

	  pushSource: function pushSource(source) {
	    if (this.pendingContent) {
	      this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation));
	      this.pendingContent = undefined;
	    }

	    if (source) {
	      this.source.push(source);
	    }
	  },

	  replaceStack: function replaceStack(callback) {
	    var prefix = ['('],
	        stack = undefined,
	        createdStack = undefined,
	        usedLiteral = undefined;

	    /* istanbul ignore next */
	    if (!this.isInline()) {
	      throw new _exception2['default']('replaceStack on non-inline');
	    }

	    // We want to merge the inline statement into the replacement statement via ','
	    var top = this.popStack(true);

	    if (top instanceof Literal) {
	      // Literals do not need to be inlined
	      stack = [top.value];
	      prefix = ['(', stack];
	      usedLiteral = true;
	    } else {
	      // Get or create the current stack name for use by the inline
	      createdStack = true;
	      var _name = this.incrStack();

	      prefix = ['((', this.push(_name), ' = ', top, ')'];
	      stack = this.topStack();
	    }

	    var item = callback.call(this, stack);

	    if (!usedLiteral) {
	      this.popStack();
	    }
	    if (createdStack) {
	      this.stackSlot--;
	    }
	    this.push(prefix.concat(item, ')'));
	  },

	  incrStack: function incrStack() {
	    this.stackSlot++;
	    if (this.stackSlot > this.stackVars.length) {
	      this.stackVars.push('stack' + this.stackSlot);
	    }
	    return this.topStackName();
	  },
	  topStackName: function topStackName() {
	    return 'stack' + this.stackSlot;
	  },
	  flushInline: function flushInline() {
	    var inlineStack = this.inlineStack;
	    this.inlineStack = [];
	    for (var i = 0, len = inlineStack.length; i < len; i++) {
	      var entry = inlineStack[i];
	      /* istanbul ignore if */
	      if (entry instanceof Literal) {
	        this.compileStack.push(entry);
	      } else {
	        var stack = this.incrStack();
	        this.pushSource([stack, ' = ', entry, ';']);
	        this.compileStack.push(stack);
	      }
	    }
	  },
	  isInline: function isInline() {
	    return this.inlineStack.length;
	  },

	  popStack: function popStack(wrapped) {
	    var inline = this.isInline(),
	        item = (inline ? this.inlineStack : this.compileStack).pop();

	    if (!wrapped && item instanceof Literal) {
	      return item.value;
	    } else {
	      if (!inline) {
	        /* istanbul ignore next */
	        if (!this.stackSlot) {
	          throw new _exception2['default']('Invalid stack pop');
	        }
	        this.stackSlot--;
	      }
	      return item;
	    }
	  },

	  topStack: function topStack() {
	    var stack = this.isInline() ? this.inlineStack : this.compileStack,
	        item = stack[stack.length - 1];

	    /* istanbul ignore if */
	    if (item instanceof Literal) {
	      return item.value;
	    } else {
	      return item;
	    }
	  },

	  contextName: function contextName(context) {
	    if (this.useDepths && context) {
	      return 'depths[' + context + ']';
	    } else {
	      return 'depth' + context;
	    }
	  },

	  quotedString: function quotedString(str) {
	    return this.source.quotedString(str);
	  },

	  objectLiteral: function objectLiteral(obj) {
	    return this.source.objectLiteral(obj);
	  },

	  aliasable: function aliasable(name) {
	    var ret = this.aliases[name];
	    if (ret) {
	      ret.referenceCount++;
	      return ret;
	    }

	    ret = this.aliases[name] = this.source.wrap(name);
	    ret.aliasable = true;
	    ret.referenceCount = 1;

	    return ret;
	  },

	  setupHelper: function setupHelper(paramSize, name, blockHelper) {
	    var params = [],
	        paramsInit = this.setupHelperArgs(name, paramSize, params, blockHelper);
	    var foundHelper = this.nameLookup('helpers', name, 'helper'),
	        callContext = this.aliasable(this.contextName(0) + ' != null ? ' + this.contextName(0) + ' : {}');

	    return {
	      params: params,
	      paramsInit: paramsInit,
	      name: foundHelper,
	      callParams: [callContext].concat(params)
	    };
	  },

	  setupParams: function setupParams(helper, paramSize, params) {
	    var options = {},
	        contexts = [],
	        types = [],
	        ids = [],
	        objectArgs = !params,
	        param = undefined;

	    if (objectArgs) {
	      params = [];
	    }

	    options.name = this.quotedString(helper);
	    options.hash = this.popStack();

	    if (this.trackIds) {
	      options.hashIds = this.popStack();
	    }
	    if (this.stringParams) {
	      options.hashTypes = this.popStack();
	      options.hashContexts = this.popStack();
	    }

	    var inverse = this.popStack(),
	        program = this.popStack();

	    // Avoid setting fn and inverse if neither are set. This allows
	    // helpers to do a check for `if (options.fn)`
	    if (program || inverse) {
	      options.fn = program || 'container.noop';
	      options.inverse = inverse || 'container.noop';
	    }

	    // The parameters go on to the stack in order (making sure that they are evaluated in order)
	    // so we need to pop them off the stack in reverse order
	    var i = paramSize;
	    while (i--) {
	      param = this.popStack();
	      params[i] = param;

	      if (this.trackIds) {
	        ids[i] = this.popStack();
	      }
	      if (this.stringParams) {
	        types[i] = this.popStack();
	        contexts[i] = this.popStack();
	      }
	    }

	    if (objectArgs) {
	      options.args = this.source.generateArray(params);
	    }

	    if (this.trackIds) {
	      options.ids = this.source.generateArray(ids);
	    }
	    if (this.stringParams) {
	      options.types = this.source.generateArray(types);
	      options.contexts = this.source.generateArray(contexts);
	    }

	    if (this.options.data) {
	      options.data = 'data';
	    }
	    if (this.useBlockParams) {
	      options.blockParams = 'blockParams';
	    }
	    return options;
	  },

	  setupHelperArgs: function setupHelperArgs(helper, paramSize, params, useRegister) {
	    var options = this.setupParams(helper, paramSize, params);
	    options = this.objectLiteral(options);
	    if (useRegister) {
	      this.useRegister('options');
	      params.push('options');
	      return ['options=', options];
	    } else if (params) {
	      params.push(options);
	      return '';
	    } else {
	      return options;
	    }
	  }
	};

	(function () {
	  var reservedWords = ('break else new var' + ' case finally return void' + ' catch for switch while' + ' continue function this with' + ' default if throw' + ' delete in try' + ' do instanceof typeof' + ' abstract enum int short' + ' boolean export interface static' + ' byte extends long super' + ' char final native synchronized' + ' class float package throws' + ' const goto private transient' + ' debugger implements protected volatile' + ' double import public let yield await' + ' null true false').split(' ');

	  var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

	  for (var i = 0, l = reservedWords.length; i < l; i++) {
	    compilerWords[reservedWords[i]] = true;
	  }
	})();

	JavaScriptCompiler.isValidJavaScriptVariableName = function (name) {
	  return !JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name);
	};

	function strictLookup(requireTerminal, compiler, parts, type) {
	  var stack = compiler.popStack(),
	      i = 0,
	      len = parts.length;
	  if (requireTerminal) {
	    len--;
	  }

	  for (; i < len; i++) {
	    stack = compiler.nameLookup(stack, parts[i], type);
	  }

	  if (requireTerminal) {
	    return [compiler.aliasable('container.strict'), '(', stack, ', ', compiler.quotedString(parts[i]), ')'];
	  } else {
	    return stack;
	  }
	}

	exports['default'] = JavaScriptCompiler;
	module.exports = exports['default'];

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* global define */
	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(5);

	var SourceNode = undefined;

	try {
	  /* istanbul ignore next */
	  if (false) {
	    // We don't support this in AMD environments. For these environments, we asusme that
	    // they are running on the browser and thus have no need for the source-map library.
	    var SourceMap = require('source-map');
	    SourceNode = SourceMap.SourceNode;
	  }
	} catch (err) {}
	/* NOP */

	/* istanbul ignore if: tested but not covered in istanbul due to dist build  */
	if (!SourceNode) {
	  SourceNode = function (line, column, srcFile, chunks) {
	    this.src = '';
	    if (chunks) {
	      this.add(chunks);
	    }
	  };
	  /* istanbul ignore next */
	  SourceNode.prototype = {
	    add: function add(chunks) {
	      if (_utils.isArray(chunks)) {
	        chunks = chunks.join('');
	      }
	      this.src += chunks;
	    },
	    prepend: function prepend(chunks) {
	      if (_utils.isArray(chunks)) {
	        chunks = chunks.join('');
	      }
	      this.src = chunks + this.src;
	    },
	    toStringWithSourceMap: function toStringWithSourceMap() {
	      return { code: this.toString() };
	    },
	    toString: function toString() {
	      return this.src;
	    }
	  };
	}

	function castChunk(chunk, codeGen, loc) {
	  if (_utils.isArray(chunk)) {
	    var ret = [];

	    for (var i = 0, len = chunk.length; i < len; i++) {
	      ret.push(codeGen.wrap(chunk[i], loc));
	    }
	    return ret;
	  } else if (typeof chunk === 'boolean' || typeof chunk === 'number') {
	    // Handle primitives that the SourceNode will throw up on
	    return chunk + '';
	  }
	  return chunk;
	}

	function CodeGen(srcFile) {
	  this.srcFile = srcFile;
	  this.source = [];
	}

	CodeGen.prototype = {
	  isEmpty: function isEmpty() {
	    return !this.source.length;
	  },
	  prepend: function prepend(source, loc) {
	    this.source.unshift(this.wrap(source, loc));
	  },
	  push: function push(source, loc) {
	    this.source.push(this.wrap(source, loc));
	  },

	  merge: function merge() {
	    var source = this.empty();
	    this.each(function (line) {
	      source.add(['  ', line, '\n']);
	    });
	    return source;
	  },

	  each: function each(iter) {
	    for (var i = 0, len = this.source.length; i < len; i++) {
	      iter(this.source[i]);
	    }
	  },

	  empty: function empty() {
	    var loc = this.currentLocation || { start: {} };
	    return new SourceNode(loc.start.line, loc.start.column, this.srcFile);
	  },
	  wrap: function wrap(chunk) {
	    var loc = arguments.length <= 1 || arguments[1] === undefined ? this.currentLocation || { start: {} } : arguments[1];

	    if (chunk instanceof SourceNode) {
	      return chunk;
	    }

	    chunk = castChunk(chunk, this, loc);

	    return new SourceNode(loc.start.line, loc.start.column, this.srcFile, chunk);
	  },

	  functionCall: function functionCall(fn, type, params) {
	    params = this.generateList(params);
	    return this.wrap([fn, type ? '.' + type + '(' : '(', params, ')']);
	  },

	  quotedString: function quotedString(str) {
	    return '"' + (str + '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\u2028/g, '\\u2028') // Per Ecma-262 7.3 + 7.8.4
	    .replace(/\u2029/g, '\\u2029') + '"';
	  },

	  objectLiteral: function objectLiteral(obj) {
	    var pairs = [];

	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        var value = castChunk(obj[key], this);
	        if (value !== 'undefined') {
	          pairs.push([this.quotedString(key), ':', value]);
	        }
	      }
	    }

	    var ret = this.generateList(pairs);
	    ret.prepend('{');
	    ret.add('}');
	    return ret;
	  },

	  generateList: function generateList(entries) {
	    var ret = this.empty();

	    for (var i = 0, len = entries.length; i < len; i++) {
	      if (i) {
	        ret.add(',');
	      }

	      ret.add(castChunk(entries[i], this));
	    }

	    return ret;
	  },

	  generateArray: function generateArray(entries) {
	    var ret = this.generateList(entries);
	    ret.prepend('[');
	    ret.add(']');

	    return ret;
	  }
	};

	exports['default'] = CodeGen;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
/*! Lazy Load 1.9.7 - MIT license - Copyright 2010-2015 Mika Tuupola */
!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!1,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);
/*
 *	jQuery dotdotdot 1.8.3
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 *	Plugin website:
 *	dotdotdot.frebsite.nl
 *
 *	Licensed under the MIT license.
 *	http://en.wikipedia.org/wiki/MIT_License
 */
!function(t,e){function n(t,e,n){var r=t.children(),o=!1;t.empty();for(var i=0,d=r.length;d>i;i++){var l=r.eq(i);if(t.append(l),n&&t.append(n),a(t,e)){l.remove(),o=!0;break}n&&n.detach()}return o}function r(e,n,i,d,l){var s=!1,c="a, table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, blockquote, select, optgroup, option, textarea, script, style",u="script, .dotdotdot-keep";return e.contents().detach().each(function(){var h=this,f=t(h);if("undefined"==typeof h)return!0;if(f.is(u))e.append(f);else{if(s)return!0;e.append(f),!l||f.is(d.after)||f.find(d.after).length||e[e.is(c)?"after":"append"](l),a(i,d)&&(s=3==h.nodeType?o(f,n,i,d,l):r(f,n,i,d,l)),s||l&&l.detach()}}),n.addClass("is-truncated"),s}function o(e,n,r,o,d){var c=e[0];if(!c)return!1;var h=s(c),f=-1!==h.indexOf(" ")?" ":"　",p="letter"==o.wrap?"":f,g=h.split(p),v=-1,w=-1,b=0,m=g.length-1;for(o.fallbackToLetter&&0==b&&0==m&&(p="",g=h.split(p),m=g.length-1);m>=b&&(0!=b||0!=m);){var y=Math.floor((b+m)/2);if(y==w)break;w=y,l(c,g.slice(0,w+1).join(p)+o.ellipsis),r.children().each(function(){t(this).toggle().toggle()}),a(r,o)?(m=w,o.fallbackToLetter&&0==b&&0==m&&(p="",g=g[0].split(p),v=-1,w=-1,b=0,m=g.length-1)):(v=w,b=w)}if(-1==v||1==g.length&&0==g[0].length){var x=e.parent();e.detach();var C=d&&d.closest(x).length?d.length:0;if(x.contents().length>C?c=u(x.contents().eq(-1-C),n):(c=u(x,n,!0),C||x.detach()),c&&(h=i(s(c),o),l(c,h),C&&d)){var T=d.parent();t(c).parent().append(d),t.trim(T.html())||T.remove()}}else h=i(g.slice(0,v+1).join(p),o),l(c,h);return!0}function a(t,e){return t.innerHeight()>e.maxHeight}function i(e,n){for(;t.inArray(e.slice(-1),n.lastCharacter.remove)>-1;)e=e.slice(0,-1);return t.inArray(e.slice(-1),n.lastCharacter.noEllipsis)<0&&(e+=n.ellipsis),e}function d(t){return{width:t.innerWidth(),height:t.innerHeight()}}function l(t,e){t.innerText?t.innerText=e:t.nodeValue?t.nodeValue=e:t.textContent&&(t.textContent=e)}function s(t){return t.innerText?t.innerText:t.nodeValue?t.nodeValue:t.textContent?t.textContent:""}function c(t){do t=t.previousSibling;while(t&&1!==t.nodeType&&3!==t.nodeType);return t}function u(e,n,r){var o,a=e&&e[0];if(a){if(!r){if(3===a.nodeType)return a;if(t.trim(e.text()))return u(e.contents().last(),n)}for(o=c(a);!o;){if(e=e.parent(),e.is(n)||!e.length)return!1;o=c(e[0])}if(o)return u(t(o),n)}return!1}function h(e,n){return e?"string"==typeof e?(e=t(e,n),e.length?e:!1):e.jquery?e:!1:!1}function f(t){for(var e=t.innerHeight(),n=["paddingTop","paddingBottom"],r=0,o=n.length;o>r;r++){var a=parseInt(t.css(n[r]),10);isNaN(a)&&(a=0),e-=a}return e}if(!t.fn.dotdotdot){t.fn.dotdotdot=function(e){if(0==this.length)return t.fn.dotdotdot.debug('No element found for "'+this.selector+'".'),this;if(this.length>1)return this.each(function(){t(this).dotdotdot(e)});var o=this,i=o.contents();o.data("dotdotdot")&&o.trigger("destroy.dot"),o.data("dotdotdot-style",o.attr("style")||""),o.css("word-wrap","break-word"),"nowrap"===o.css("white-space")&&o.css("white-space","normal"),o.bind_events=function(){return o.bind("update.dot",function(e,d){switch(o.removeClass("is-truncated"),e.preventDefault(),e.stopPropagation(),typeof l.height){case"number":l.maxHeight=l.height;break;case"function":l.maxHeight=l.height.call(o[0]);break;default:l.maxHeight=f(o)}l.maxHeight+=l.tolerance,"undefined"!=typeof d&&(("string"==typeof d||"nodeType"in d&&1===d.nodeType)&&(d=t("<div />").append(d).contents()),d instanceof t&&(i=d)),g=o.wrapInner('<div class="dotdotdot" />').children(),g.contents().detach().end().append(i.clone(!0)).find("br").replaceWith("  <br />  ").end().css({height:"auto",width:"auto",border:"none",padding:0,margin:0});var c=!1,u=!1;return s.afterElement&&(c=s.afterElement.clone(!0),c.show(),s.afterElement.detach()),a(g,l)&&(u="children"==l.wrap?n(g,l,c):r(g,o,g,l,c)),g.replaceWith(g.contents()),g=null,t.isFunction(l.callback)&&l.callback.call(o[0],u,i),s.isTruncated=u,u}).bind("isTruncated.dot",function(t,e){return t.preventDefault(),t.stopPropagation(),"function"==typeof e&&e.call(o[0],s.isTruncated),s.isTruncated}).bind("originalContent.dot",function(t,e){return t.preventDefault(),t.stopPropagation(),"function"==typeof e&&e.call(o[0],i),i}).bind("destroy.dot",function(t){t.preventDefault(),t.stopPropagation(),o.unwatch().unbind_events().contents().detach().end().append(i).attr("style",o.data("dotdotdot-style")||"").removeClass("is-truncated").data("dotdotdot",!1)}),o},o.unbind_events=function(){return o.unbind(".dot"),o},o.watch=function(){if(o.unwatch(),"window"==l.watch){var e=t(window),n=e.width(),r=e.height();e.bind("resize.dot"+s.dotId,function(){n==e.width()&&r==e.height()&&l.windowResizeFix||(n=e.width(),r=e.height(),u&&clearInterval(u),u=setTimeout(function(){o.trigger("update.dot")},100))})}else c=d(o),u=setInterval(function(){if(o.is(":visible")){var t=d(o);c.width==t.width&&c.height==t.height||(o.trigger("update.dot"),c=t)}},500);return o},o.unwatch=function(){return t(window).unbind("resize.dot"+s.dotId),u&&clearInterval(u),o};var l=t.extend(!0,{},t.fn.dotdotdot.defaults,e),s={},c={},u=null,g=null;return l.lastCharacter.remove instanceof Array||(l.lastCharacter.remove=t.fn.dotdotdot.defaultArrays.lastCharacter.remove),l.lastCharacter.noEllipsis instanceof Array||(l.lastCharacter.noEllipsis=t.fn.dotdotdot.defaultArrays.lastCharacter.noEllipsis),s.afterElement=h(l.after,o),s.isTruncated=!1,s.dotId=p++,o.data("dotdotdot",!0).bind_events().trigger("update.dot"),l.watch&&o.watch(),o},t.fn.dotdotdot.defaults={ellipsis:"... ",wrap:"word",fallbackToLetter:!0,lastCharacter:{},tolerance:0,callback:null,after:null,height:null,watch:!1,windowResizeFix:!0},t.fn.dotdotdot.defaultArrays={lastCharacter:{remove:[" ","　",",",";",".","!","?"],noEllipsis:[]}},t.fn.dotdotdot.debug=function(t){};var p=1,g=t.fn.html;t.fn.html=function(n){return n!=e&&!t.isFunction(n)&&this.data("dotdotdot")?this.trigger("update",[n]):g.apply(this,arguments)};var v=t.fn.text;t.fn.text=function(n){return n!=e&&!t.isFunction(n)&&this.data("dotdotdot")?(n=t("<div />").text(n).html(),this.trigger("update",[n])):v.apply(this,arguments)}}}(jQuery),jQuery(document).ready(function(t){t(".dot-ellipsis").each(function(){var e=t(this).hasClass("dot-resize-update"),n=t(this).hasClass("dot-timer-update"),r=0,o=t(this).attr("class").split(/\s+/);t.each(o,function(t,e){var n=e.match(/^dot-height-(\d+)$/);null!==n&&(r=Number(n[1]))});var a=new Object;n&&(a.watch=!0),e&&(a.watch="window"),r>0&&(a.height=r),t(this).dotdotdot(a)})}),jQuery(window).on("load",function(){jQuery(".dot-ellipsis.dot-load-update").trigger("update.dot")});
/**
 * Owl Carousel v2.2.1
 * Copyright 2013-2017 David Deutsch
 * Licensed under  ()
 */
!function(a,b,c,d){function e(b,c){this.settings=null,this.options=a.extend({},e.Defaults,c),this.$element=a(b),this._handlers={},this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._widths=[],this._invalidated={},this._pipe=[],this._drag={time:null,target:null,pointer:null,stage:{start:null,current:null},direction:null},this._states={current:{},tags:{initializing:["busy"],animating:["busy"],dragging:["interacting"]}},a.each(["onResize","onThrottledResize"],a.proxy(function(b,c){this._handlers[c]=a.proxy(this[c],this)},this)),a.each(e.Plugins,a.proxy(function(a,b){this._plugins[a.charAt(0).toLowerCase()+a.slice(1)]=new b(this)},this)),a.each(e.Workers,a.proxy(function(b,c){this._pipe.push({filter:c.filter,run:a.proxy(c.run,this)})},this)),this.setup(),this.initialize()}e.Defaults={items:3,loop:!1,center:!1,rewind:!1,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:b,fallbackEasing:"swing",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",refreshClass:"owl-refresh",loadedClass:"owl-loaded",loadingClass:"owl-loading",rtlClass:"owl-rtl",responsiveClass:"owl-responsive",dragClass:"owl-drag",itemClass:"owl-item",stageClass:"owl-stage",stageOuterClass:"owl-stage-outer",grabClass:"owl-grab"},e.Width={Default:"default",Inner:"inner",Outer:"outer"},e.Type={Event:"event",State:"state"},e.Plugins={},e.Workers=[{filter:["width","settings"],run:function(){this._width=this.$element.width()}},{filter:["width","items","settings"],run:function(a){a.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){this.$stage.children(".cloned").remove()}},{filter:["width","items","settings"],run:function(a){var b=this.settings.margin||"",c=!this.settings.autoWidth,d=this.settings.rtl,e={width:"auto","margin-left":d?b:"","margin-right":d?"":b};!c&&this.$stage.children().css(e),a.css=e}},{filter:["width","items","settings"],run:function(a){var b=(this.width()/this.settings.items).toFixed(3)-this.settings.margin,c=null,d=this._items.length,e=!this.settings.autoWidth,f=[];for(a.items={merge:!1,width:b};d--;)c=this._mergers[d],c=this.settings.mergeFit&&Math.min(c,this.settings.items)||c,a.items.merge=c>1||a.items.merge,f[d]=e?b*c:this._items[d].width();this._widths=f}},{filter:["items","settings"],run:function(){var b=[],c=this._items,d=this.settings,e=Math.max(2*d.items,4),f=2*Math.ceil(c.length/2),g=d.loop&&c.length?d.rewind?e:Math.max(e,f):0,h="",i="";for(g/=2;g--;)b.push(this.normalize(b.length/2,!0)),h+=c[b[b.length-1]][0].outerHTML,b.push(this.normalize(c.length-1-(b.length-1)/2,!0)),i=c[b[b.length-1]][0].outerHTML+i;this._clones=b,a(h).addClass("cloned").appendTo(this.$stage),a(i).addClass("cloned").prependTo(this.$stage)}},{filter:["width","items","settings"],run:function(){for(var a=this.settings.rtl?1:-1,b=this._clones.length+this._items.length,c=-1,d=0,e=0,f=[];++c<b;)d=f[c-1]||0,e=this._widths[this.relative(c)]+this.settings.margin,f.push(d+e*a);this._coordinates=f}},{filter:["width","items","settings"],run:function(){var a=this.settings.stagePadding,b=this._coordinates,c={width:Math.ceil(Math.abs(b[b.length-1]))+2*a,"padding-left":a||"","padding-right":a||""};this.$stage.css(c)}},{filter:["width","items","settings"],run:function(a){var b=this._coordinates.length,c=!this.settings.autoWidth,d=this.$stage.children();if(c&&a.items.merge)for(;b--;)a.css.width=this._widths[this.relative(b)],d.eq(b).css(a.css);else c&&(a.css.width=a.items.width,d.css(a.css))}},{filter:["items"],run:function(){this._coordinates.length<1&&this.$stage.removeAttr("style")}},{filter:["width","items","settings"],run:function(a){a.current=a.current?this.$stage.children().index(a.current):0,a.current=Math.max(this.minimum(),Math.min(this.maximum(),a.current)),this.reset(a.current)}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var a,b,c,d,e=this.settings.rtl?1:-1,f=2*this.settings.stagePadding,g=this.coordinates(this.current())+f,h=g+this.width()*e,i=[];for(c=0,d=this._coordinates.length;c<d;c++)a=this._coordinates[c-1]||0,b=Math.abs(this._coordinates[c])+f*e,(this.op(a,"<=",g)&&this.op(a,">",h)||this.op(b,"<",g)&&this.op(b,">",h))&&i.push(c);this.$stage.children(".active").removeClass("active"),this.$stage.children(":eq("+i.join("), :eq(")+")").addClass("active"),this.settings.center&&(this.$stage.children(".center").removeClass("center"),this.$stage.children().eq(this.current()).addClass("center"))}}],e.prototype.initialize=function(){if(this.enter("initializing"),this.trigger("initialize"),this.$element.toggleClass(this.settings.rtlClass,this.settings.rtl),this.settings.autoWidth&&!this.is("pre-loading")){var b,c,e;b=this.$element.find("img"),c=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:d,e=this.$element.children(c).width(),b.length&&e<=0&&this.preloadAutoWidthImages(b)}this.$element.addClass(this.options.loadingClass),this.$stage=a("<"+this.settings.stageElement+' class="'+this.settings.stageClass+'"/>').wrap('<div class="'+this.settings.stageOuterClass+'"/>'),this.$element.append(this.$stage.parent()),this.replace(this.$element.children().not(this.$stage.parent())),this.$element.is(":visible")?this.refresh():this.invalidate("width"),this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass),this.registerEventHandlers(),this.leave("initializing"),this.trigger("initialized")},e.prototype.setup=function(){var b=this.viewport(),c=this.options.responsive,d=-1,e=null;c?(a.each(c,function(a){a<=b&&a>d&&(d=Number(a))}),e=a.extend({},this.options,c[d]),"function"==typeof e.stagePadding&&(e.stagePadding=e.stagePadding()),delete e.responsive,e.responsiveClass&&this.$element.attr("class",this.$element.attr("class").replace(new RegExp("("+this.options.responsiveClass+"-)\\S+\\s","g"),"$1"+d))):e=a.extend({},this.options),this.trigger("change",{property:{name:"settings",value:e}}),this._breakpoint=d,this.settings=e,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}})},e.prototype.optionsLogic=function(){this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},e.prototype.prepare=function(b){var c=this.trigger("prepare",{content:b});return c.data||(c.data=a("<"+this.settings.itemElement+"/>").addClass(this.options.itemClass).append(b)),this.trigger("prepared",{content:c.data}),c.data},e.prototype.update=function(){for(var b=0,c=this._pipe.length,d=a.proxy(function(a){return this[a]},this._invalidated),e={};b<c;)(this._invalidated.all||a.grep(this._pipe[b].filter,d).length>0)&&this._pipe[b].run(e),b++;this._invalidated={},!this.is("valid")&&this.enter("valid")},e.prototype.width=function(a){switch(a=a||e.Width.Default){case e.Width.Inner:case e.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},e.prototype.refresh=function(){this.enter("refreshing"),this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$element.addClass(this.options.refreshClass),this.update(),this.$element.removeClass(this.options.refreshClass),this.leave("refreshing"),this.trigger("refreshed")},e.prototype.onThrottledResize=function(){b.clearTimeout(this.resizeTimer),this.resizeTimer=b.setTimeout(this._handlers.onResize,this.settings.responsiveRefreshRate)},e.prototype.onResize=function(){return!!this._items.length&&(this._width!==this.$element.width()&&(!!this.$element.is(":visible")&&(this.enter("resizing"),this.trigger("resize").isDefaultPrevented()?(this.leave("resizing"),!1):(this.invalidate("width"),this.refresh(),this.leave("resizing"),void this.trigger("resized")))))},e.prototype.registerEventHandlers=function(){a.support.transition&&this.$stage.on(a.support.transition.end+".owl.core",a.proxy(this.onTransitionEnd,this)),this.settings.responsive!==!1&&this.on(b,"resize",this._handlers.onThrottledResize),this.settings.mouseDrag&&(this.$element.addClass(this.options.dragClass),this.$stage.on("mousedown.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("dragstart.owl.core selectstart.owl.core",function(){return!1})),this.settings.touchDrag&&(this.$stage.on("touchstart.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("touchcancel.owl.core",a.proxy(this.onDragEnd,this)))},e.prototype.onDragStart=function(b){var d=null;3!==b.which&&(a.support.transform?(d=this.$stage.css("transform").replace(/.*\(|\)| /g,"").split(","),d={x:d[16===d.length?12:4],y:d[16===d.length?13:5]}):(d=this.$stage.position(),d={x:this.settings.rtl?d.left+this.$stage.width()-this.width()+this.settings.margin:d.left,y:d.top}),this.is("animating")&&(a.support.transform?this.animate(d.x):this.$stage.stop(),this.invalidate("position")),this.$element.toggleClass(this.options.grabClass,"mousedown"===b.type),this.speed(0),this._drag.time=(new Date).getTime(),this._drag.target=a(b.target),this._drag.stage.start=d,this._drag.stage.current=d,this._drag.pointer=this.pointer(b),a(c).on("mouseup.owl.core touchend.owl.core",a.proxy(this.onDragEnd,this)),a(c).one("mousemove.owl.core touchmove.owl.core",a.proxy(function(b){var d=this.difference(this._drag.pointer,this.pointer(b));a(c).on("mousemove.owl.core touchmove.owl.core",a.proxy(this.onDragMove,this)),Math.abs(d.x)<Math.abs(d.y)&&this.is("valid")||(b.preventDefault(),this.enter("dragging"),this.trigger("drag"))},this)))},e.prototype.onDragMove=function(a){var b=null,c=null,d=null,e=this.difference(this._drag.pointer,this.pointer(a)),f=this.difference(this._drag.stage.start,e);this.is("dragging")&&(a.preventDefault(),this.settings.loop?(b=this.coordinates(this.minimum()),c=this.coordinates(this.maximum()+1)-b,f.x=((f.x-b)%c+c)%c+b):(b=this.settings.rtl?this.coordinates(this.maximum()):this.coordinates(this.minimum()),c=this.settings.rtl?this.coordinates(this.minimum()):this.coordinates(this.maximum()),d=this.settings.pullDrag?-1*e.x/5:0,f.x=Math.max(Math.min(f.x,b+d),c+d)),this._drag.stage.current=f,this.animate(f.x))},e.prototype.onDragEnd=function(b){var d=this.difference(this._drag.pointer,this.pointer(b)),e=this._drag.stage.current,f=d.x>0^this.settings.rtl?"left":"right";a(c).off(".owl.core"),this.$element.removeClass(this.options.grabClass),(0!==d.x&&this.is("dragging")||!this.is("valid"))&&(this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(this.closest(e.x,0!==d.x?f:this._drag.direction)),this.invalidate("position"),this.update(),this._drag.direction=f,(Math.abs(d.x)>3||(new Date).getTime()-this._drag.time>300)&&this._drag.target.one("click.owl.core",function(){return!1})),this.is("dragging")&&(this.leave("dragging"),this.trigger("dragged"))},e.prototype.closest=function(b,c){var d=-1,e=30,f=this.width(),g=this.coordinates();return this.settings.freeDrag||a.each(g,a.proxy(function(a,h){return"left"===c&&b>h-e&&b<h+e?d=a:"right"===c&&b>h-f-e&&b<h-f+e?d=a+1:this.op(b,"<",h)&&this.op(b,">",g[a+1]||h-f)&&(d="left"===c?a+1:a),d===-1},this)),this.settings.loop||(this.op(b,">",g[this.minimum()])?d=b=this.minimum():this.op(b,"<",g[this.maximum()])&&(d=b=this.maximum())),d},e.prototype.animate=function(b){var c=this.speed()>0;this.is("animating")&&this.onTransitionEnd(),c&&(this.enter("animating"),this.trigger("translate")),a.support.transform3d&&a.support.transition?this.$stage.css({transform:"translate3d("+b+"px,0px,0px)",transition:this.speed()/1e3+"s"}):c?this.$stage.animate({left:b+"px"},this.speed(),this.settings.fallbackEasing,a.proxy(this.onTransitionEnd,this)):this.$stage.css({left:b+"px"})},e.prototype.is=function(a){return this._states.current[a]&&this._states.current[a]>0},e.prototype.current=function(a){if(a===d)return this._current;if(0===this._items.length)return d;if(a=this.normalize(a),this._current!==a){var b=this.trigger("change",{property:{name:"position",value:a}});b.data!==d&&(a=this.normalize(b.data)),this._current=a,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},e.prototype.invalidate=function(b){return"string"===a.type(b)&&(this._invalidated[b]=!0,this.is("valid")&&this.leave("valid")),a.map(this._invalidated,function(a,b){return b})},e.prototype.reset=function(a){a=this.normalize(a),a!==d&&(this._speed=0,this._current=a,this.suppress(["translate","translated"]),this.animate(this.coordinates(a)),this.release(["translate","translated"]))},e.prototype.normalize=function(a,b){var c=this._items.length,e=b?0:this._clones.length;return!this.isNumeric(a)||c<1?a=d:(a<0||a>=c+e)&&(a=((a-e/2)%c+c)%c+e/2),a},e.prototype.relative=function(a){return a-=this._clones.length/2,this.normalize(a,!0)},e.prototype.maximum=function(a){var b,c,d,e=this.settings,f=this._coordinates.length;if(e.loop)f=this._clones.length/2+this._items.length-1;else if(e.autoWidth||e.merge){for(b=this._items.length,c=this._items[--b].width(),d=this.$element.width();b--&&(c+=this._items[b].width()+this.settings.margin,!(c>d)););f=b+1}else f=e.center?this._items.length-1:this._items.length-e.items;return a&&(f-=this._clones.length/2),Math.max(f,0)},e.prototype.minimum=function(a){return a?0:this._clones.length/2},e.prototype.items=function(a){return a===d?this._items.slice():(a=this.normalize(a,!0),this._items[a])},e.prototype.mergers=function(a){return a===d?this._mergers.slice():(a=this.normalize(a,!0),this._mergers[a])},e.prototype.clones=function(b){var c=this._clones.length/2,e=c+this._items.length,f=function(a){return a%2===0?e+a/2:c-(a+1)/2};return b===d?a.map(this._clones,function(a,b){return f(b)}):a.map(this._clones,function(a,c){return a===b?f(c):null})},e.prototype.speed=function(a){return a!==d&&(this._speed=a),this._speed},e.prototype.coordinates=function(b){var c,e=1,f=b-1;return b===d?a.map(this._coordinates,a.proxy(function(a,b){return this.coordinates(b)},this)):(this.settings.center?(this.settings.rtl&&(e=-1,f=b+1),c=this._coordinates[b],c+=(this.width()-c+(this._coordinates[f]||0))/2*e):c=this._coordinates[f]||0,c=Math.ceil(c))},e.prototype.duration=function(a,b,c){return 0===c?0:Math.min(Math.max(Math.abs(b-a),1),6)*Math.abs(c||this.settings.smartSpeed)},e.prototype.to=function(a,b){var c=this.current(),d=null,e=a-this.relative(c),f=(e>0)-(e<0),g=this._items.length,h=this.minimum(),i=this.maximum();this.settings.loop?(!this.settings.rewind&&Math.abs(e)>g/2&&(e+=f*-1*g),a=c+e,d=((a-h)%g+g)%g+h,d!==a&&d-e<=i&&d-e>0&&(c=d-e,a=d,this.reset(c))):this.settings.rewind?(i+=1,a=(a%i+i)%i):a=Math.max(h,Math.min(i,a)),this.speed(this.duration(c,a,b)),this.current(a),this.$element.is(":visible")&&this.update()},e.prototype.next=function(a){a=a||!1,this.to(this.relative(this.current())+1,a)},e.prototype.prev=function(a){a=a||!1,this.to(this.relative(this.current())-1,a)},e.prototype.onTransitionEnd=function(a){if(a!==d&&(a.stopPropagation(),(a.target||a.srcElement||a.originalTarget)!==this.$stage.get(0)))return!1;this.leave("animating"),this.trigger("translated")},e.prototype.viewport=function(){var d;return this.options.responsiveBaseElement!==b?d=a(this.options.responsiveBaseElement).width():b.innerWidth?d=b.innerWidth:c.documentElement&&c.documentElement.clientWidth?d=c.documentElement.clientWidth:console.warn("Can not detect viewport width."),d},e.prototype.replace=function(b){this.$stage.empty(),this._items=[],b&&(b=b instanceof jQuery?b:a(b)),this.settings.nestedItemSelector&&(b=b.find("."+this.settings.nestedItemSelector)),b.filter(function(){return 1===this.nodeType}).each(a.proxy(function(a,b){b=this.prepare(b),this.$stage.append(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)},this)),this.reset(this.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},e.prototype.add=function(b,c){var e=this.relative(this._current);c=c===d?this._items.length:this.normalize(c,!0),b=b instanceof jQuery?b:a(b),this.trigger("add",{content:b,position:c}),b=this.prepare(b),0===this._items.length||c===this._items.length?(0===this._items.length&&this.$stage.append(b),0!==this._items.length&&this._items[c-1].after(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)):(this._items[c].before(b),this._items.splice(c,0,b),this._mergers.splice(c,0,1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)),this._items[e]&&this.reset(this._items[e].index()),this.invalidate("items"),this.trigger("added",{content:b,position:c})},e.prototype.remove=function(a){a=this.normalize(a,!0),a!==d&&(this.trigger("remove",{content:this._items[a],position:a}),this._items[a].remove(),this._items.splice(a,1),this._mergers.splice(a,1),this.invalidate("items"),this.trigger("removed",{content:null,position:a}))},e.prototype.preloadAutoWidthImages=function(b){b.each(a.proxy(function(b,c){this.enter("pre-loading"),c=a(c),a(new Image).one("load",a.proxy(function(a){c.attr("src",a.target.src),c.css("opacity",1),this.leave("pre-loading"),!this.is("pre-loading")&&!this.is("initializing")&&this.refresh()},this)).attr("src",c.attr("src")||c.attr("data-src")||c.attr("data-src-retina"))},this))},e.prototype.destroy=function(){this.$element.off(".owl.core"),this.$stage.off(".owl.core"),a(c).off(".owl.core"),this.settings.responsive!==!1&&(b.clearTimeout(this.resizeTimer),this.off(b,"resize",this._handlers.onThrottledResize));for(var d in this._plugins)this._plugins[d].destroy();this.$stage.children(".cloned").remove(),this.$stage.unwrap(),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class",this.$element.attr("class").replace(new RegExp(this.options.responsiveClass+"-\\S+\\s","g"),"")).removeData("owl.carousel")},e.prototype.op=function(a,b,c){var d=this.settings.rtl;switch(b){case"<":return d?a>c:a<c;case">":return d?a<c:a>c;case">=":return d?a<=c:a>=c;case"<=":return d?a>=c:a<=c}},e.prototype.on=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},e.prototype.off=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)},e.prototype.trigger=function(b,c,d,f,g){var h={item:{count:this._items.length,index:this.current()}},i=a.camelCase(a.grep(["on",b,d],function(a){return a}).join("-").toLowerCase()),j=a.Event([b,"owl",d||"carousel"].join(".").toLowerCase(),a.extend({relatedTarget:this},h,c));return this._supress[b]||(a.each(this._plugins,function(a,b){b.onTrigger&&b.onTrigger(j)}),this.register({type:e.Type.Event,name:b}),this.$element.trigger(j),this.settings&&"function"==typeof this.settings[i]&&this.settings[i].call(this,j)),j},e.prototype.enter=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]===d&&(this._states.current[b]=0),this._states.current[b]++},this))},e.prototype.leave=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]--},this))},e.prototype.register=function(b){if(b.type===e.Type.Event){if(a.event.special[b.name]||(a.event.special[b.name]={}),!a.event.special[b.name].owl){var c=a.event.special[b.name]._default;a.event.special[b.name]._default=function(a){return!c||!c.apply||a.namespace&&a.namespace.indexOf("owl")!==-1?a.namespace&&a.namespace.indexOf("owl")>-1:c.apply(this,arguments)},a.event.special[b.name].owl=!0}}else b.type===e.Type.State&&(this._states.tags[b.name]?this._states.tags[b.name]=this._states.tags[b.name].concat(b.tags):this._states.tags[b.name]=b.tags,this._states.tags[b.name]=a.grep(this._states.tags[b.name],a.proxy(function(c,d){return a.inArray(c,this._states.tags[b.name])===d},this)))},e.prototype.suppress=function(b){a.each(b,a.proxy(function(a,b){this._supress[b]=!0},this))},e.prototype.release=function(b){a.each(b,a.proxy(function(a,b){delete this._supress[b]},this))},e.prototype.pointer=function(a){var c={x:null,y:null};return a=a.originalEvent||a||b.event,a=a.touches&&a.touches.length?a.touches[0]:a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:a,a.pageX?(c.x=a.pageX,c.y=a.pageY):(c.x=a.clientX,c.y=a.clientY),c},e.prototype.isNumeric=function(a){return!isNaN(parseFloat(a))},e.prototype.difference=function(a,b){return{x:a.x-b.x,y:a.y-b.y}},a.fn.owlCarousel=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),f=d.data("owl.carousel");f||(f=new e(this,"object"==typeof b&&b),d.data("owl.carousel",f),a.each(["next","prev","to","destroy","refresh","replace","add","remove"],function(b,c){f.register({type:e.Type.Event,name:c}),f.$element.on(c+".owl.carousel.core",a.proxy(function(a){a.namespace&&a.relatedTarget!==this&&(this.suppress([c]),f[c].apply(this,[].slice.call(arguments,1)),this.release([c]))},f))})),"string"==typeof b&&"_"!==b.charAt(0)&&f[b].apply(f,c)})},a.fn.owlCarousel.Constructor=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._interval=null,this._visible=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoRefresh&&this.watch()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoRefresh:!0,autoRefreshInterval:500},e.prototype.watch=function(){this._interval||(this._visible=this._core.$element.is(":visible"),this._interval=b.setInterval(a.proxy(this.refresh,this),this._core.settings.autoRefreshInterval))},e.prototype.refresh=function(){this._core.$element.is(":visible")!==this._visible&&(this._visible=!this._visible,this._core.$element.toggleClass("owl-hidden",!this._visible),this._visible&&this._core.invalidate("width")&&this._core.refresh())},e.prototype.destroy=function(){var a,c;b.clearInterval(this._interval);for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoRefresh=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel resized.owl.carousel":a.proxy(function(b){if(b.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(b.property&&"position"==b.property.name||"initialized"==b.type))for(var c=this._core.settings,e=c.center&&Math.ceil(c.items/2)||c.items,f=c.center&&e*-1||0,g=(b.property&&b.property.value!==d?b.property.value:this._core.current())+f,h=this._core.clones().length,i=a.proxy(function(a,b){this.load(b)},this);f++<e;)this.load(h/2+this._core.relative(g)),h&&a.each(this._core.clones(this._core.relative(g)),i),g++},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={lazyLoad:!1},e.prototype.load=function(c){var d=this._core.$stage.children().eq(c),e=d&&d.find(".owl-lazy");!e||a.inArray(d.get(0),this._loaded)>-1||(e.each(a.proxy(function(c,d){var e,f=a(d),g=b.devicePixelRatio>1&&f.attr("data-src-retina")||f.attr("data-src");this._core.trigger("load",{element:f,url:g},"lazy"),f.is("img")?f.one("load.owl.lazy",a.proxy(function(){f.css("opacity",1),this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("src",g):(e=new Image,e.onload=a.proxy(function(){f.css({"background-image":'url("'+g+'")',opacity:"1"}),this._core.trigger("loaded",{element:f,url:g},"lazy")},this),e.src=g)},this)),this._loaded.push(d.get(0)))},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this._core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Lazy=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._handlers={"initialized.owl.carousel refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&"position"==a.property.name&&this.update()},this),"loaded.owl.lazy":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&a.element.closest("."+this._core.settings.itemClass).index()===this._core.current()&&this.update()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoHeight:!1,autoHeightClass:"owl-height"},e.prototype.update=function(){var b=this._core._current,c=b+this._core.settings.items,d=this._core.$stage.children().toArray().slice(b,c),e=[],f=0;a.each(d,function(b,c){e.push(a(c).height())}),f=Math.max.apply(null,e),this._core.$stage.parent().height(f).addClass(this._core.settings.autoHeightClass)},e.prototype.destroy=function(){var a,b;for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoHeight=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._videos={},this._playing=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.register({type:"state",name:"playing",tags:["interacting"]})},this),"resize.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.video&&this.isInFullScreen()&&a.preventDefault()},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.is("resizing")&&this._core.$stage.find(".cloned .owl-video-frame").remove()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"===a.property.name&&this._playing&&this.stop()},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find(".owl-video");c.length&&(c.css("display","none"),this.fetch(c,a(b.content)))}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".owl-video-play-icon",a.proxy(function(a){this.play(a)},this))};e.Defaults={video:!1,videoHeight:!1,videoWidth:!1},e.prototype.fetch=function(a,b){var c=function(){return a.attr("data-vimeo-id")?"vimeo":a.attr("data-vzaar-id")?"vzaar":"youtube"}(),d=a.attr("data-vimeo-id")||a.attr("data-youtube-id")||a.attr("data-vzaar-id"),e=a.attr("data-width")||this._core.settings.videoWidth,f=a.attr("data-height")||this._core.settings.videoHeight,g=a.attr("href");if(!g)throw new Error("Missing video URL.");if(d=g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),d[3].indexOf("youtu")>-1)c="youtube";else if(d[3].indexOf("vimeo")>-1)c="vimeo";else{if(!(d[3].indexOf("vzaar")>-1))throw new Error("Video URL not supported.");c="vzaar"}d=d[6],this._videos[g]={type:c,id:d,width:e,height:f},b.attr("data-video",g),this.thumbnail(a,this._videos[g])},e.prototype.thumbnail=function(b,c){var d,e,f,g=c.width&&c.height?'style="width:'+c.width+"px;height:"+c.height+'px;"':"",h=b.find("img"),i="src",j="",k=this._core.settings,l=function(a){e='<div class="owl-video-play-icon"></div>',d=k.lazyLoad?'<div class="owl-video-tn '+j+'" '+i+'="'+a+'"></div>':'<div class="owl-video-tn" style="opacity:1;background-image:url('+a+')"></div>',b.after(d),b.after(e)};if(b.wrap('<div class="owl-video-wrapper"'+g+"></div>"),this._core.settings.lazyLoad&&(i="data-src",j="owl-lazy"),h.length)return l(h.attr(i)),h.remove(),!1;"youtube"===c.type?(f="//img.youtube.com/vi/"+c.id+"/hqdefault.jpg",l(f)):"vimeo"===c.type?a.ajax({type:"GET",url:"//vimeo.com/api/v2/video/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a[0].thumbnail_large,l(f)}}):"vzaar"===c.type&&a.ajax({type:"GET",url:"//vzaar.com/api/videos/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a.framegrab_url,l(f)}})},e.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".owl-video-frame").remove(),this._playing.removeClass("owl-video-playing"),this._playing=null,this._core.leave("playing"),this._core.trigger("stopped",null,"video")},e.prototype.play=function(b){var c,d=a(b.target),e=d.closest("."+this._core.settings.itemClass),f=this._videos[e.attr("data-video")],g=f.width||"100%",h=f.height||this._core.$stage.height();this._playing||(this._core.enter("playing"),this._core.trigger("play",null,"video"),e=this._core.items(this._core.relative(e.index())),this._core.reset(e.index()),"youtube"===f.type?c='<iframe width="'+g+'" height="'+h+'" src="//www.youtube.com/embed/'+f.id+"?autoplay=1&rel=0&v="+f.id+'" frameborder="0" allowfullscreen></iframe>':"vimeo"===f.type?c='<iframe src="//player.vimeo.com/video/'+f.id+'?autoplay=1" width="'+g+'" height="'+h+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>':"vzaar"===f.type&&(c='<iframe frameborder="0"height="'+h+'"width="'+g+'" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/'+f.id+'/player?autoplay=true"></iframe>'),a('<div class="owl-video-frame">'+c+"</div>").insertAfter(e.find(".owl-video")),this._playing=e.addClass("owl-video-playing"))},e.prototype.isInFullScreen=function(){var b=c.fullscreenElement||c.mozFullScreenElement||c.webkitFullscreenElement;return b&&a(b).parent().hasClass("owl-video-frame")},e.prototype.destroy=function(){var a,b;this._core.$element.off("click.owl.video");for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Video=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this.core=b,this.core.options=a.extend({},e.Defaults,this.core.options),this.swapping=!0,this.previous=d,this.next=d,this.handlers={"change.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&(this.previous=this.core.current(),this.next=a.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":a.proxy(function(a){a.namespace&&(this.swapping="translated"==a.type)},this),"translate.owl.carousel":a.proxy(function(a){a.namespace&&this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};e.Defaults={animateOut:!1,animateIn:!1},e.prototype.swap=function(){if(1===this.core.settings.items&&a.support.animation&&a.support.transition){this.core.speed(0);var b,c=a.proxy(this.clear,this),d=this.core.$stage.children().eq(this.previous),e=this.core.$stage.children().eq(this.next),f=this.core.settings.animateIn,g=this.core.settings.animateOut;this.core.current()!==this.previous&&(g&&(b=this.core.coordinates(this.previous)-this.core.coordinates(this.next),d.one(a.support.animation.end,c).css({left:b+"px"}).addClass("animated owl-animated-out").addClass(g)),f&&e.one(a.support.animation.end,c).addClass("animated owl-animated-in").addClass(f))}},e.prototype.clear=function(b){a(b.target).css({left:""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.onTransitionEnd()},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},
a.fn.owlCarousel.Constructor.Plugins.Animate=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._timeout=null,this._paused=!1,this._handlers={"changed.owl.carousel":a.proxy(function(a){a.namespace&&"settings"===a.property.name?this._core.settings.autoplay?this.play():this.stop():a.namespace&&"position"===a.property.name&&this._core.settings.autoplay&&this._setAutoPlayInterval()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoplay&&this.play()},this),"play.owl.autoplay":a.proxy(function(a,b,c){a.namespace&&this.play(b,c)},this),"stop.owl.autoplay":a.proxy(function(a){a.namespace&&this.stop()},this),"mouseover.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"mouseleave.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.play()},this),"touchstart.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"touchend.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this.play()},this)},this._core.$element.on(this._handlers),this._core.options=a.extend({},e.Defaults,this._core.options)};e.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},e.prototype.play=function(a,b){this._paused=!1,this._core.is("rotating")||(this._core.enter("rotating"),this._setAutoPlayInterval())},e.prototype._getNextTimeout=function(d,e){return this._timeout&&b.clearTimeout(this._timeout),b.setTimeout(a.proxy(function(){this._paused||this._core.is("busy")||this._core.is("interacting")||c.hidden||this._core.next(e||this._core.settings.autoplaySpeed)},this),d||this._core.settings.autoplayTimeout)},e.prototype._setAutoPlayInterval=function(){this._timeout=this._getNextTimeout()},e.prototype.stop=function(){this._core.is("rotating")&&(b.clearTimeout(this._timeout),this._core.leave("rotating"))},e.prototype.pause=function(){this._core.is("rotating")&&(this._paused=!0)},e.prototype.destroy=function(){var a,b;this.stop();for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.autoplay=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(b){this._core=b,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":a.proxy(function(b){b.namespace&&this._core.settings.dotsData&&this._templates.push('<div class="'+this._core.settings.dotClass+'">'+a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot")+"</div>")},this),"added.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,0,this._templates.pop())},this),"remove.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,1)},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&this.draw()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&!this._initialized&&(this._core.trigger("initialize",null,"navigation"),this.initialize(),this.update(),this.draw(),this._initialized=!0,this._core.trigger("initialized",null,"navigation"))},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._initialized&&(this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation"))},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers)};e.Defaults={nav:!1,navText:["prev","next"],navSpeed:!1,navElement:"div",navContainer:!1,navContainerClass:"owl-nav",navClass:["owl-prev","owl-next"],slideBy:1,dotClass:"owl-dot",dotsClass:"owl-dots",dots:!0,dotsEach:!1,dotsData:!1,dotsSpeed:!1,dotsContainer:!1},e.prototype.initialize=function(){var b,c=this._core.settings;this._controls.$relative=(c.navContainer?a(c.navContainer):a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"),this._controls.$previous=a("<"+c.navElement+">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click",a.proxy(function(a){this.prev(c.navSpeed)},this)),this._controls.$next=a("<"+c.navElement+">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click",a.proxy(function(a){this.next(c.navSpeed)},this)),c.dotsData||(this._templates=[a("<div>").addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),this._controls.$absolute=(c.dotsContainer?a(c.dotsContainer):a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"),this._controls.$absolute.on("click","div",a.proxy(function(b){var d=a(b.target).parent().is(this._controls.$absolute)?a(b.target).index():a(b.target).parent().index();b.preventDefault(),this.to(d,c.dotsSpeed)},this));for(b in this._overrides)this._core[b]=a.proxy(this[b],this)},e.prototype.destroy=function(){var a,b,c,d;for(a in this._handlers)this.$element.off(a,this._handlers[a]);for(b in this._controls)this._controls[b].remove();for(d in this.overides)this._core[d]=this._overrides[d];for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},e.prototype.update=function(){var a,b,c,d=this._core.clones().length/2,e=d+this._core.items().length,f=this._core.maximum(!0),g=this._core.settings,h=g.center||g.autoWidth||g.dotsData?1:g.dotsEach||g.items;if("page"!==g.slideBy&&(g.slideBy=Math.min(g.slideBy,g.items)),g.dots||"page"==g.slideBy)for(this._pages=[],a=d,b=0,c=0;a<e;a++){if(b>=h||0===b){if(this._pages.push({start:Math.min(f,a-d),end:a-d+h-1}),Math.min(f,a-d)===f)break;b=0,++c}b+=this._core.mergers(this._core.relative(a))}},e.prototype.draw=function(){var b,c=this._core.settings,d=this._core.items().length<=c.items,e=this._core.relative(this._core.current()),f=c.loop||c.rewind;this._controls.$relative.toggleClass("disabled",!c.nav||d),c.nav&&(this._controls.$previous.toggleClass("disabled",!f&&e<=this._core.minimum(!0)),this._controls.$next.toggleClass("disabled",!f&&e>=this._core.maximum(!0))),this._controls.$absolute.toggleClass("disabled",!c.dots||d),c.dots&&(b=this._pages.length-this._controls.$absolute.children().length,c.dotsData&&0!==b?this._controls.$absolute.html(this._templates.join("")):b>0?this._controls.$absolute.append(new Array(b+1).join(this._templates[0])):b<0&&this._controls.$absolute.children().slice(b).remove(),this._controls.$absolute.find(".active").removeClass("active"),this._controls.$absolute.children().eq(a.inArray(this.current(),this._pages)).addClass("active"))},e.prototype.onTrigger=function(b){var c=this._core.settings;b.page={index:a.inArray(this.current(),this._pages),count:this._pages.length,size:c&&(c.center||c.autoWidth||c.dotsData?1:c.dotsEach||c.items)}},e.prototype.current=function(){var b=this._core.relative(this._core.current());return a.grep(this._pages,a.proxy(function(a,c){return a.start<=b&&a.end>=b},this)).pop()},e.prototype.getPosition=function(b){var c,d,e=this._core.settings;return"page"==e.slideBy?(c=a.inArray(this.current(),this._pages),d=this._pages.length,b?++c:--c,c=this._pages[(c%d+d)%d].start):(c=this._core.relative(this._core.current()),d=this._core.items().length,b?c+=e.slideBy:c-=e.slideBy),c},e.prototype.next=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!0),b)},e.prototype.prev=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!1),b)},e.prototype.to=function(b,c,d){var e;!d&&this._pages.length?(e=this._pages.length,a.proxy(this._overrides.to,this._core)(this._pages[(b%e+e)%e].start,c)):a.proxy(this._overrides.to,this._core)(b,c)},a.fn.owlCarousel.Constructor.Plugins.Navigation=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(c){this._core=c,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":a.proxy(function(c){c.namespace&&"URLHash"===this._core.settings.startPosition&&a(b).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");if(!c)return;this._hashes[c]=b.content}},this),"changed.owl.carousel":a.proxy(function(c){if(c.namespace&&"position"===c.property.name){var d=this._core.items(this._core.relative(this._core.current())),e=a.map(this._hashes,function(a,b){return a===d?b:null}).join();if(!e||b.location.hash.slice(1)===e)return;b.location.hash=e}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers),a(b).on("hashchange.owl.navigation",a.proxy(function(a){var c=b.location.hash.substring(1),e=this._core.$stage.children(),f=this._hashes[c]&&e.index(this._hashes[c]);f!==d&&f!==this._core.current()&&this._core.to(this._core.relative(f),!1,!0)},this))};e.Defaults={URLhashListener:!1},e.prototype.destroy=function(){var c,d;a(b).off("hashchange.owl.navigation");for(c in this._handlers)this._core.$element.off(c,this._handlers[c]);for(d in Object.getOwnPropertyNames(this))"function"!=typeof this[d]&&(this[d]=null)},a.fn.owlCarousel.Constructor.Plugins.Hash=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){function e(b,c){var e=!1,f=b.charAt(0).toUpperCase()+b.slice(1);return a.each((b+" "+h.join(f+" ")+f).split(" "),function(a,b){if(g[b]!==d)return e=!c||b,!1}),e}function f(a){return e(a,!0)}var g=a("<support>").get(0).style,h="Webkit Moz O ms".split(" "),i={transition:{end:{WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"}},animation:{end:{WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",animation:"animationend"}}},j={csstransforms:function(){return!!e("transform")},csstransforms3d:function(){return!!e("perspective")},csstransitions:function(){return!!e("transition")},cssanimations:function(){return!!e("animation")}};j.csstransitions()&&(a.support.transition=new String(f("transition")),a.support.transition.end=i.transition.end[a.support.transition]),j.cssanimations()&&(a.support.animation=new String(f("animation")),a.support.animation.end=i.animation.end[a.support.animation]),j.csstransforms()&&(a.support.transform=new String(f("transform")),a.support.transform3d=j.csstransforms3d())}(window.Zepto||window.jQuery,window,document);
//! moment.js
//! version : 2.19.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

var hookCallback;

function hooks () {
    return hookCallback.apply(null, arguments);
}

// This is done to register the method called with moment()
// without creating circular dependencies.
function setHookCallback (callback) {
    hookCallback = callback;
}

function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
}

function isObject(input) {
    // IE8 will treat undefined and null as object if it wasn't for
    // input != null
    return input != null && Object.prototype.toString.call(input) === '[object Object]';
}

function isObjectEmpty(obj) {
    if (Object.getOwnPropertyNames) {
        return (Object.getOwnPropertyNames(obj).length === 0);
    } else {
        var k;
        for (k in obj) {
            if (obj.hasOwnProperty(k)) {
                return false;
            }
        }
        return true;
    }
}

function isUndefined(input) {
    return input === void 0;
}

function isNumber(input) {
    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
}

function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
}

function map(arr, fn) {
    var res = [], i;
    for (i = 0; i < arr.length; ++i) {
        res.push(fn(arr[i], i));
    }
    return res;
}

function hasOwnProp(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
}

function extend(a, b) {
    for (var i in b) {
        if (hasOwnProp(b, i)) {
            a[i] = b[i];
        }
    }

    if (hasOwnProp(b, 'toString')) {
        a.toString = b.toString;
    }

    if (hasOwnProp(b, 'valueOf')) {
        a.valueOf = b.valueOf;
    }

    return a;
}

function createUTC (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, true).utc();
}

function defaultParsingFlags() {
    // We need to deep clone this object.
    return {
        empty           : false,
        unusedTokens    : [],
        unusedInput     : [],
        overflow        : -2,
        charsLeftOver   : 0,
        nullInput       : false,
        invalidMonth    : null,
        invalidFormat   : false,
        userInvalidated : false,
        iso             : false,
        parsedDateParts : [],
        meridiem        : null,
        rfc2822         : false,
        weekdayMismatch : false
    };
}

function getParsingFlags(m) {
    if (m._pf == null) {
        m._pf = defaultParsingFlags();
    }
    return m._pf;
}

var some;
if (Array.prototype.some) {
    some = Array.prototype.some;
} else {
    some = function (fun) {
        var t = Object(this);
        var len = t.length >>> 0;

        for (var i = 0; i < len; i++) {
            if (i in t && fun.call(this, t[i], i, t)) {
                return true;
            }
        }

        return false;
    };
}

function isValid(m) {
    if (m._isValid == null) {
        var flags = getParsingFlags(m);
        var parsedParts = some.call(flags.parsedDateParts, function (i) {
            return i != null;
        });
        var isNowValid = !isNaN(m._d.getTime()) &&
            flags.overflow < 0 &&
            !flags.empty &&
            !flags.invalidMonth &&
            !flags.invalidWeekday &&
            !flags.weekdayMismatch &&
            !flags.nullInput &&
            !flags.invalidFormat &&
            !flags.userInvalidated &&
            (!flags.meridiem || (flags.meridiem && parsedParts));

        if (m._strict) {
            isNowValid = isNowValid &&
                flags.charsLeftOver === 0 &&
                flags.unusedTokens.length === 0 &&
                flags.bigHour === undefined;
        }

        if (Object.isFrozen == null || !Object.isFrozen(m)) {
            m._isValid = isNowValid;
        }
        else {
            return isNowValid;
        }
    }
    return m._isValid;
}

function createInvalid (flags) {
    var m = createUTC(NaN);
    if (flags != null) {
        extend(getParsingFlags(m), flags);
    }
    else {
        getParsingFlags(m).userInvalidated = true;
    }

    return m;
}

// Plugins that add properties should also add the key here (null value),
// so we can properly clone ourselves.
var momentProperties = hooks.momentProperties = [];

function copyConfig(to, from) {
    var i, prop, val;

    if (!isUndefined(from._isAMomentObject)) {
        to._isAMomentObject = from._isAMomentObject;
    }
    if (!isUndefined(from._i)) {
        to._i = from._i;
    }
    if (!isUndefined(from._f)) {
        to._f = from._f;
    }
    if (!isUndefined(from._l)) {
        to._l = from._l;
    }
    if (!isUndefined(from._strict)) {
        to._strict = from._strict;
    }
    if (!isUndefined(from._tzm)) {
        to._tzm = from._tzm;
    }
    if (!isUndefined(from._isUTC)) {
        to._isUTC = from._isUTC;
    }
    if (!isUndefined(from._offset)) {
        to._offset = from._offset;
    }
    if (!isUndefined(from._pf)) {
        to._pf = getParsingFlags(from);
    }
    if (!isUndefined(from._locale)) {
        to._locale = from._locale;
    }

    if (momentProperties.length > 0) {
        for (i = 0; i < momentProperties.length; i++) {
            prop = momentProperties[i];
            val = from[prop];
            if (!isUndefined(val)) {
                to[prop] = val;
            }
        }
    }

    return to;
}

var updateInProgress = false;

// Moment prototype object
function Moment(config) {
    copyConfig(this, config);
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);
    if (!this.isValid()) {
        this._d = new Date(NaN);
    }
    // Prevent infinite loop in case updateOffset creates new moment
    // objects.
    if (updateInProgress === false) {
        updateInProgress = true;
        hooks.updateOffset(this);
        updateInProgress = false;
    }
}

function isMoment (obj) {
    return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
}

function absFloor (number) {
    if (number < 0) {
        // -0 -> 0
        return Math.ceil(number) || 0;
    } else {
        return Math.floor(number);
    }
}

function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
        value = 0;

    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
        value = absFloor(coercedNumber);
    }

    return value;
}

// compare two arrays, return the number of differences
function compareArrays(array1, array2, dontConvert) {
    var len = Math.min(array1.length, array2.length),
        lengthDiff = Math.abs(array1.length - array2.length),
        diffs = 0,
        i;
    for (i = 0; i < len; i++) {
        if ((dontConvert && array1[i] !== array2[i]) ||
            (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
            diffs++;
        }
    }
    return diffs + lengthDiff;
}

function warn(msg) {
    if (hooks.suppressDeprecationWarnings === false &&
            (typeof console !==  'undefined') && console.warn) {
        console.warn('Deprecation warning: ' + msg);
    }
}

function deprecate(msg, fn) {
    var firstTime = true;

    return extend(function () {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(null, msg);
        }
        if (firstTime) {
            var args = [];
            var arg;
            for (var i = 0; i < arguments.length; i++) {
                arg = '';
                if (typeof arguments[i] === 'object') {
                    arg += '\n[' + i + '] ';
                    for (var key in arguments[0]) {
                        arg += key + ': ' + arguments[0][key] + ', ';
                    }
                    arg = arg.slice(0, -2); // Remove trailing comma and space
                } else {
                    arg = arguments[i];
                }
                args.push(arg);
            }
            warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
            firstTime = false;
        }
        return fn.apply(this, arguments);
    }, fn);
}

var deprecations = {};

function deprecateSimple(name, msg) {
    if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(name, msg);
    }
    if (!deprecations[name]) {
        warn(msg);
        deprecations[name] = true;
    }
}

hooks.suppressDeprecationWarnings = false;
hooks.deprecationHandler = null;

function isFunction(input) {
    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
}

function set (config) {
    var prop, i;
    for (i in config) {
        prop = config[i];
        if (isFunction(prop)) {
            this[i] = prop;
        } else {
            this['_' + i] = prop;
        }
    }
    this._config = config;
    // Lenient ordinal parsing accepts just a number in addition to
    // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
    // TODO: Remove "ordinalParse" fallback in next major release.
    this._dayOfMonthOrdinalParseLenient = new RegExp(
        (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
            '|' + (/\d{1,2}/).source);
}

function mergeConfigs(parentConfig, childConfig) {
    var res = extend({}, parentConfig), prop;
    for (prop in childConfig) {
        if (hasOwnProp(childConfig, prop)) {
            if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                res[prop] = {};
                extend(res[prop], parentConfig[prop]);
                extend(res[prop], childConfig[prop]);
            } else if (childConfig[prop] != null) {
                res[prop] = childConfig[prop];
            } else {
                delete res[prop];
            }
        }
    }
    for (prop in parentConfig) {
        if (hasOwnProp(parentConfig, prop) &&
                !hasOwnProp(childConfig, prop) &&
                isObject(parentConfig[prop])) {
            // make sure changes to properties don't modify parent config
            res[prop] = extend({}, res[prop]);
        }
    }
    return res;
}

function Locale(config) {
    if (config != null) {
        this.set(config);
    }
}

var keys;

if (Object.keys) {
    keys = Object.keys;
} else {
    keys = function (obj) {
        var i, res = [];
        for (i in obj) {
            if (hasOwnProp(obj, i)) {
                res.push(i);
            }
        }
        return res;
    };
}

var defaultCalendar = {
    sameDay : '[Today at] LT',
    nextDay : '[Tomorrow at] LT',
    nextWeek : 'dddd [at] LT',
    lastDay : '[Yesterday at] LT',
    lastWeek : '[Last] dddd [at] LT',
    sameElse : 'L'
};

function calendar (key, mom, now) {
    var output = this._calendar[key] || this._calendar['sameElse'];
    return isFunction(output) ? output.call(mom, now) : output;
}

var defaultLongDateFormat = {
    LTS  : 'h:mm:ss A',
    LT   : 'h:mm A',
    L    : 'MM/DD/YYYY',
    LL   : 'MMMM D, YYYY',
    LLL  : 'MMMM D, YYYY h:mm A',
    LLLL : 'dddd, MMMM D, YYYY h:mm A'
};

function longDateFormat (key) {
    var format = this._longDateFormat[key],
        formatUpper = this._longDateFormat[key.toUpperCase()];

    if (format || !formatUpper) {
        return format;
    }

    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
        return val.slice(1);
    });

    return this._longDateFormat[key];
}

var defaultInvalidDate = 'Invalid date';

function invalidDate () {
    return this._invalidDate;
}

var defaultOrdinal = '%d';
var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

function ordinal (number) {
    return this._ordinal.replace('%d', number);
}

var defaultRelativeTime = {
    future : 'in %s',
    past   : '%s ago',
    s  : 'a few seconds',
    ss : '%d seconds',
    m  : 'a minute',
    mm : '%d minutes',
    h  : 'an hour',
    hh : '%d hours',
    d  : 'a day',
    dd : '%d days',
    M  : 'a month',
    MM : '%d months',
    y  : 'a year',
    yy : '%d years'
};

function relativeTime (number, withoutSuffix, string, isFuture) {
    var output = this._relativeTime[string];
    return (isFunction(output)) ?
        output(number, withoutSuffix, string, isFuture) :
        output.replace(/%d/i, number);
}

function pastFuture (diff, output) {
    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
}

var aliases = {};

function addUnitAlias (unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
}

function normalizeUnits(units) {
    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
}

function normalizeObjectUnits(inputObject) {
    var normalizedInput = {},
        normalizedProp,
        prop;

    for (prop in inputObject) {
        if (hasOwnProp(inputObject, prop)) {
            normalizedProp = normalizeUnits(prop);
            if (normalizedProp) {
                normalizedInput[normalizedProp] = inputObject[prop];
            }
        }
    }

    return normalizedInput;
}

var priorities = {};

function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
}

function getPrioritizedUnits(unitsObj) {
    var units = [];
    for (var u in unitsObj) {
        units.push({unit: u, priority: priorities[u]});
    }
    units.sort(function (a, b) {
        return a.priority - b.priority;
    });
    return units;
}

function zeroFill(number, targetLength, forceSign) {
    var absNumber = '' + Math.abs(number),
        zerosToFill = targetLength - absNumber.length,
        sign = number >= 0;
    return (sign ? (forceSign ? '+' : '') : '-') +
        Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
}

var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

var formatFunctions = {};

var formatTokenFunctions = {};

// token:    'M'
// padded:   ['MM', 2]
// ordinal:  'Mo'
// callback: function () { this.month() + 1 }
function addFormatToken (token, padded, ordinal, callback) {
    var func = callback;
    if (typeof callback === 'string') {
        func = function () {
            return this[callback]();
        };
    }
    if (token) {
        formatTokenFunctions[token] = func;
    }
    if (padded) {
        formatTokenFunctions[padded[0]] = function () {
            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
        };
    }
    if (ordinal) {
        formatTokenFunctions[ordinal] = function () {
            return this.localeData().ordinal(func.apply(this, arguments), token);
        };
    }
}

function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
        return input.replace(/^\[|\]$/g, '');
    }
    return input.replace(/\\/g, '');
}

function makeFormatFunction(format) {
    var array = format.match(formattingTokens), i, length;

    for (i = 0, length = array.length; i < length; i++) {
        if (formatTokenFunctions[array[i]]) {
            array[i] = formatTokenFunctions[array[i]];
        } else {
            array[i] = removeFormattingTokens(array[i]);
        }
    }

    return function (mom) {
        var output = '', i;
        for (i = 0; i < length; i++) {
            output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
        }
        return output;
    };
}

// format date using native date object
function formatMoment(m, format) {
    if (!m.isValid()) {
        return m.localeData().invalidDate();
    }

    format = expandFormat(format, m.localeData());
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

    return formatFunctions[format](m);
}

function expandFormat(format, locale) {
    var i = 5;

    function replaceLongDateFormatTokens(input) {
        return locale.longDateFormat(input) || input;
    }

    localFormattingTokens.lastIndex = 0;
    while (i >= 0 && localFormattingTokens.test(format)) {
        format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
        localFormattingTokens.lastIndex = 0;
        i -= 1;
    }

    return format;
}

var match1         = /\d/;            //       0 - 9
var match2         = /\d\d/;          //      00 - 99
var match3         = /\d{3}/;         //     000 - 999
var match4         = /\d{4}/;         //    0000 - 9999
var match6         = /[+-]?\d{6}/;    // -999999 - 999999
var match1to2      = /\d\d?/;         //       0 - 99
var match3to4      = /\d\d\d\d?/;     //     999 - 9999
var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
var match1to3      = /\d{1,3}/;       //       0 - 999
var match1to4      = /\d{1,4}/;       //       0 - 9999
var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

var matchUnsigned  = /\d+/;           //       0 - inf
var matchSigned    = /[+-]?\d+/;      //    -inf - inf

var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

// any word (or two) characters or numbers including two/three word month in arabic.
// includes scottish gaelic two word and hyphenated months
var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


var regexes = {};

function addRegexToken (token, regex, strictRegex) {
    regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
        return (isStrict && strictRegex) ? strictRegex : regex;
    };
}

function getParseRegexForToken (token, config) {
    if (!hasOwnProp(regexes, token)) {
        return new RegExp(unescapeFormat(token));
    }

    return regexes[token](config._strict, config._locale);
}

// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
function unescapeFormat(s) {
    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
        return p1 || p2 || p3 || p4;
    }));
}

function regexEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

var tokens = {};

function addParseToken (token, callback) {
    var i, func = callback;
    if (typeof token === 'string') {
        token = [token];
    }
    if (isNumber(callback)) {
        func = function (input, array) {
            array[callback] = toInt(input);
        };
    }
    for (i = 0; i < token.length; i++) {
        tokens[token[i]] = func;
    }
}

function addWeekParseToken (token, callback) {
    addParseToken(token, function (input, array, config, token) {
        config._w = config._w || {};
        callback(input, config._w, config, token);
    });
}

function addTimeToArrayFromToken(token, input, config) {
    if (input != null && hasOwnProp(tokens, token)) {
        tokens[token](input, config._a, config, token);
    }
}

var YEAR = 0;
var MONTH = 1;
var DATE = 2;
var HOUR = 3;
var MINUTE = 4;
var SECOND = 5;
var MILLISECOND = 6;
var WEEK = 7;
var WEEKDAY = 8;

// FORMATTING

addFormatToken('Y', 0, 0, function () {
    var y = this.year();
    return y <= 9999 ? '' + y : '+' + y;
});

addFormatToken(0, ['YY', 2], 0, function () {
    return this.year() % 100;
});

addFormatToken(0, ['YYYY',   4],       0, 'year');
addFormatToken(0, ['YYYYY',  5],       0, 'year');
addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

// ALIASES

addUnitAlias('year', 'y');

// PRIORITIES

addUnitPriority('year', 1);

// PARSING

addRegexToken('Y',      matchSigned);
addRegexToken('YY',     match1to2, match2);
addRegexToken('YYYY',   match1to4, match4);
addRegexToken('YYYYY',  match1to6, match6);
addRegexToken('YYYYYY', match1to6, match6);

addParseToken(['YYYYY', 'YYYYYY'], YEAR);
addParseToken('YYYY', function (input, array) {
    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
});
addParseToken('YY', function (input, array) {
    array[YEAR] = hooks.parseTwoDigitYear(input);
});
addParseToken('Y', function (input, array) {
    array[YEAR] = parseInt(input, 10);
});

// HELPERS

function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// HOOKS

hooks.parseTwoDigitYear = function (input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
};

// MOMENTS

var getSetYear = makeGetSet('FullYear', true);

function getIsLeapYear () {
    return isLeapYear(this.year());
}

function makeGetSet (unit, keepTime) {
    return function (value) {
        if (value != null) {
            set$1(this, unit, value);
            hooks.updateOffset(this, keepTime);
            return this;
        } else {
            return get(this, unit);
        }
    };
}

function get (mom, unit) {
    return mom.isValid() ?
        mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
}

function set$1 (mom, unit, value) {
    if (mom.isValid() && !isNaN(value)) {
        if (unit === 'FullYear' && isLeapYear(mom.year())) {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
        }
        else {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }
}

// MOMENTS

function stringGet (units) {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
        return this[units]();
    }
    return this;
}


function stringSet (units, value) {
    if (typeof units === 'object') {
        units = normalizeObjectUnits(units);
        var prioritized = getPrioritizedUnits(units);
        for (var i = 0; i < prioritized.length; i++) {
            this[prioritized[i].unit](units[prioritized[i].unit]);
        }
    } else {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units](value);
        }
    }
    return this;
}

function mod(n, x) {
    return ((n % x) + x) % x;
}

var indexOf;

if (Array.prototype.indexOf) {
    indexOf = Array.prototype.indexOf;
} else {
    indexOf = function (o) {
        // I know
        var i;
        for (i = 0; i < this.length; ++i) {
            if (this[i] === o) {
                return i;
            }
        }
        return -1;
    };
}

function daysInMonth(year, month) {
    if (isNaN(year) || isNaN(month)) {
        return NaN;
    }
    var modMonth = mod(month, 12);
    year += (month - modMonth) / 12;
    return modMonth === 1 ? (isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
}

// FORMATTING

addFormatToken('M', ['MM', 2], 'Mo', function () {
    return this.month() + 1;
});

addFormatToken('MMM', 0, 0, function (format) {
    return this.localeData().monthsShort(this, format);
});

addFormatToken('MMMM', 0, 0, function (format) {
    return this.localeData().months(this, format);
});

// ALIASES

addUnitAlias('month', 'M');

// PRIORITY

addUnitPriority('month', 8);

// PARSING

addRegexToken('M',    match1to2);
addRegexToken('MM',   match1to2, match2);
addRegexToken('MMM',  function (isStrict, locale) {
    return locale.monthsShortRegex(isStrict);
});
addRegexToken('MMMM', function (isStrict, locale) {
    return locale.monthsRegex(isStrict);
});

addParseToken(['M', 'MM'], function (input, array) {
    array[MONTH] = toInt(input) - 1;
});

addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
    var month = config._locale.monthsParse(input, token, config._strict);
    // if we didn't find a month name, mark the date as invalid.
    if (month != null) {
        array[MONTH] = month;
    } else {
        getParsingFlags(config).invalidMonth = input;
    }
});

// LOCALES

var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
function localeMonths (m, format) {
    if (!m) {
        return isArray(this._months) ? this._months :
            this._months['standalone'];
    }
    return isArray(this._months) ? this._months[m.month()] :
        this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
}

var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
function localeMonthsShort (m, format) {
    if (!m) {
        return isArray(this._monthsShort) ? this._monthsShort :
            this._monthsShort['standalone'];
    }
    return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
        this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
}

function handleStrictParse(monthName, format, strict) {
    var i, ii, mom, llc = monthName.toLocaleLowerCase();
    if (!this._monthsParse) {
        // this is not used
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
        for (i = 0; i < 12; ++i) {
            mom = createUTC([2000, i]);
            this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
            this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'MMM') {
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'MMM') {
            ii = indexOf.call(this._shortMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeMonthsParse (monthName, format, strict) {
    var i, mom, regex;

    if (this._monthsParseExact) {
        return handleStrictParse.call(this, monthName, format, strict);
    }

    if (!this._monthsParse) {
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
    }

    // TODO: add sorting
    // Sorting makes sure if one month (or abbr) is a prefix of another
    // see sorting in computeMonthsParse
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        if (strict && !this._longMonthsParse[i]) {
            this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
            this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
        }
        if (!strict && !this._monthsParse[i]) {
            regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
            this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
            return i;
        } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
            return i;
        } else if (!strict && this._monthsParse[i].test(monthName)) {
            return i;
        }
    }
}

// MOMENTS

function setMonth (mom, value) {
    var dayOfMonth;

    if (!mom.isValid()) {
        // No op
        return mom;
    }

    if (typeof value === 'string') {
        if (/^\d+$/.test(value)) {
            value = toInt(value);
        } else {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (!isNumber(value)) {
                return mom;
            }
        }
    }

    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
    return mom;
}

function getSetMonth (value) {
    if (value != null) {
        setMonth(this, value);
        hooks.updateOffset(this, true);
        return this;
    } else {
        return get(this, 'Month');
    }
}

function getDaysInMonth () {
    return daysInMonth(this.year(), this.month());
}

var defaultMonthsShortRegex = matchWord;
function monthsShortRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsShortStrictRegex;
        } else {
            return this._monthsShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsShortRegex')) {
            this._monthsShortRegex = defaultMonthsShortRegex;
        }
        return this._monthsShortStrictRegex && isStrict ?
            this._monthsShortStrictRegex : this._monthsShortRegex;
    }
}

var defaultMonthsRegex = matchWord;
function monthsRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsStrictRegex;
        } else {
            return this._monthsRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsRegex')) {
            this._monthsRegex = defaultMonthsRegex;
        }
        return this._monthsStrictRegex && isStrict ?
            this._monthsStrictRegex : this._monthsRegex;
    }
}

function computeMonthsParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom;
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        shortPieces.push(this.monthsShort(mom, ''));
        longPieces.push(this.months(mom, ''));
        mixedPieces.push(this.months(mom, ''));
        mixedPieces.push(this.monthsShort(mom, ''));
    }
    // Sorting makes sure if one month (or abbr) is a prefix of another it
    // will match the longer piece.
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 12; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
    }
    for (i = 0; i < 24; i++) {
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
}

function createDate (y, m, d, h, M, s, ms) {
    // can't just apply() to create a date:
    // https://stackoverflow.com/q/181348
    var date = new Date(y, m, d, h, M, s, ms);

    // the date constructor remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
        date.setFullYear(y);
    }
    return date;
}

function createUTCDate (y) {
    var date = new Date(Date.UTC.apply(null, arguments));

    // the Date.UTC function remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y);
    }
    return date;
}

// start-of-first-week - start-of-year
function firstWeekOffset(year, dow, doy) {
    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
        fwd = 7 + dow - doy,
        // first-week day local weekday -- which local weekday is fwd
        fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

    return -fwdlw + fwd - 1;
}

// https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7,
        weekOffset = firstWeekOffset(year, dow, doy),
        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
        resYear, resDayOfYear;

    if (dayOfYear <= 0) {
        resYear = year - 1;
        resDayOfYear = daysInYear(resYear) + dayOfYear;
    } else if (dayOfYear > daysInYear(year)) {
        resYear = year + 1;
        resDayOfYear = dayOfYear - daysInYear(year);
    } else {
        resYear = year;
        resDayOfYear = dayOfYear;
    }

    return {
        year: resYear,
        dayOfYear: resDayOfYear
    };
}

function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
        resWeek, resYear;

    if (week < 1) {
        resYear = mom.year() - 1;
        resWeek = week + weeksInYear(resYear, dow, doy);
    } else if (week > weeksInYear(mom.year(), dow, doy)) {
        resWeek = week - weeksInYear(mom.year(), dow, doy);
        resYear = mom.year() + 1;
    } else {
        resYear = mom.year();
        resWeek = week;
    }

    return {
        week: resWeek,
        year: resYear
    };
}

function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy),
        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}

// FORMATTING

addFormatToken('w', ['ww', 2], 'wo', 'week');
addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

// ALIASES

addUnitAlias('week', 'w');
addUnitAlias('isoWeek', 'W');

// PRIORITIES

addUnitPriority('week', 5);
addUnitPriority('isoWeek', 5);

// PARSING

addRegexToken('w',  match1to2);
addRegexToken('ww', match1to2, match2);
addRegexToken('W',  match1to2);
addRegexToken('WW', match1to2, match2);

addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
    week[token.substr(0, 1)] = toInt(input);
});

// HELPERS

// LOCALES

function localeWeek (mom) {
    return weekOfYear(mom, this._week.dow, this._week.doy).week;
}

var defaultLocaleWeek = {
    dow : 0, // Sunday is the first day of the week.
    doy : 6  // The week that contains Jan 1st is the first week of the year.
};

function localeFirstDayOfWeek () {
    return this._week.dow;
}

function localeFirstDayOfYear () {
    return this._week.doy;
}

// MOMENTS

function getSetWeek (input) {
    var week = this.localeData().week(this);
    return input == null ? week : this.add((input - week) * 7, 'd');
}

function getSetISOWeek (input) {
    var week = weekOfYear(this, 1, 4).week;
    return input == null ? week : this.add((input - week) * 7, 'd');
}

// FORMATTING

addFormatToken('d', 0, 'do', 'day');

addFormatToken('dd', 0, 0, function (format) {
    return this.localeData().weekdaysMin(this, format);
});

addFormatToken('ddd', 0, 0, function (format) {
    return this.localeData().weekdaysShort(this, format);
});

addFormatToken('dddd', 0, 0, function (format) {
    return this.localeData().weekdays(this, format);
});

addFormatToken('e', 0, 0, 'weekday');
addFormatToken('E', 0, 0, 'isoWeekday');

// ALIASES

addUnitAlias('day', 'd');
addUnitAlias('weekday', 'e');
addUnitAlias('isoWeekday', 'E');

// PRIORITY
addUnitPriority('day', 11);
addUnitPriority('weekday', 11);
addUnitPriority('isoWeekday', 11);

// PARSING

addRegexToken('d',    match1to2);
addRegexToken('e',    match1to2);
addRegexToken('E',    match1to2);
addRegexToken('dd',   function (isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict);
});
addRegexToken('ddd',   function (isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict);
});
addRegexToken('dddd',   function (isStrict, locale) {
    return locale.weekdaysRegex(isStrict);
});

addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
    var weekday = config._locale.weekdaysParse(input, token, config._strict);
    // if we didn't get a weekday name, mark the date as invalid
    if (weekday != null) {
        week.d = weekday;
    } else {
        getParsingFlags(config).invalidWeekday = input;
    }
});

addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
    week[token] = toInt(input);
});

// HELPERS

function parseWeekday(input, locale) {
    if (typeof input !== 'string') {
        return input;
    }

    if (!isNaN(input)) {
        return parseInt(input, 10);
    }

    input = locale.weekdaysParse(input);
    if (typeof input === 'number') {
        return input;
    }

    return null;
}

function parseIsoWeekday(input, locale) {
    if (typeof input === 'string') {
        return locale.weekdaysParse(input) % 7 || 7;
    }
    return isNaN(input) ? null : input;
}

// LOCALES

var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
function localeWeekdays (m, format) {
    if (!m) {
        return isArray(this._weekdays) ? this._weekdays :
            this._weekdays['standalone'];
    }
    return isArray(this._weekdays) ? this._weekdays[m.day()] :
        this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
}

var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
function localeWeekdaysShort (m) {
    return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
}

var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
function localeWeekdaysMin (m) {
    return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
}

function handleStrictParse$1(weekdayName, format, strict) {
    var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._minWeekdaysParse = [];

        for (i = 0; i < 7; ++i) {
            mom = createUTC([2000, 1]).day(i);
            this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
            this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
            this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'dddd') {
            ii = indexOf.call(this._weekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'dddd') {
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._minWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeWeekdaysParse (weekdayName, format, strict) {
    var i, mom, regex;

    if (this._weekdaysParseExact) {
        return handleStrictParse$1.call(this, weekdayName, format, strict);
    }

    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._minWeekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._fullWeekdaysParse = [];
    }

    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already

        mom = createUTC([2000, 1]).day(i);
        if (strict && !this._fullWeekdaysParse[i]) {
            this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
            this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
            this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
        }
        if (!this._weekdaysParse[i]) {
            regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
            this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
            return i;
        }
    }
}

// MOMENTS

function getSetDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    if (input != null) {
        input = parseWeekday(input, this.localeData());
        return this.add(input - day, 'd');
    } else {
        return day;
    }
}

function getSetLocaleDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, 'd');
}

function getSetISODayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }

    // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.

    if (input != null) {
        var weekday = parseIsoWeekday(input, this.localeData());
        return this.day(this.day() % 7 ? weekday : weekday - 7);
    } else {
        return this.day() || 7;
    }
}

var defaultWeekdaysRegex = matchWord;
function weekdaysRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysStrictRegex;
        } else {
            return this._weekdaysRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            this._weekdaysRegex = defaultWeekdaysRegex;
        }
        return this._weekdaysStrictRegex && isStrict ?
            this._weekdaysStrictRegex : this._weekdaysRegex;
    }
}

var defaultWeekdaysShortRegex = matchWord;
function weekdaysShortRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysShortStrictRegex;
        } else {
            return this._weekdaysShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysShortRegex')) {
            this._weekdaysShortRegex = defaultWeekdaysShortRegex;
        }
        return this._weekdaysShortStrictRegex && isStrict ?
            this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
}

var defaultWeekdaysMinRegex = matchWord;
function weekdaysMinRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysMinStrictRegex;
        } else {
            return this._weekdaysMinRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysMinRegex')) {
            this._weekdaysMinRegex = defaultWeekdaysMinRegex;
        }
        return this._weekdaysMinStrictRegex && isStrict ?
            this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
}


function computeWeekdaysParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom, minp, shortp, longp;
    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, 1]).day(i);
        minp = this.weekdaysMin(mom, '');
        shortp = this.weekdaysShort(mom, '');
        longp = this.weekdays(mom, '');
        minPieces.push(minp);
        shortPieces.push(shortp);
        longPieces.push(longp);
        mixedPieces.push(minp);
        mixedPieces.push(shortp);
        mixedPieces.push(longp);
    }
    // Sorting makes sure if one weekday (or abbr) is a prefix of another it
    // will match the longer piece.
    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 7; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;

    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
}

// FORMATTING

function hFormat() {
    return this.hours() % 12 || 12;
}

function kFormat() {
    return this.hours() || 24;
}

addFormatToken('H', ['HH', 2], 0, 'hour');
addFormatToken('h', ['hh', 2], 0, hFormat);
addFormatToken('k', ['kk', 2], 0, kFormat);

addFormatToken('hmm', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
});

addFormatToken('hmmss', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

addFormatToken('Hmm', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2);
});

addFormatToken('Hmmss', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

function meridiem (token, lowercase) {
    addFormatToken(token, 0, 0, function () {
        return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
    });
}

meridiem('a', true);
meridiem('A', false);

// ALIASES

addUnitAlias('hour', 'h');

// PRIORITY
addUnitPriority('hour', 13);

// PARSING

function matchMeridiem (isStrict, locale) {
    return locale._meridiemParse;
}

addRegexToken('a',  matchMeridiem);
addRegexToken('A',  matchMeridiem);
addRegexToken('H',  match1to2);
addRegexToken('h',  match1to2);
addRegexToken('k',  match1to2);
addRegexToken('HH', match1to2, match2);
addRegexToken('hh', match1to2, match2);
addRegexToken('kk', match1to2, match2);

addRegexToken('hmm', match3to4);
addRegexToken('hmmss', match5to6);
addRegexToken('Hmm', match3to4);
addRegexToken('Hmmss', match5to6);

addParseToken(['H', 'HH'], HOUR);
addParseToken(['k', 'kk'], function (input, array, config) {
    var kInput = toInt(input);
    array[HOUR] = kInput === 24 ? 0 : kInput;
});
addParseToken(['a', 'A'], function (input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input;
});
addParseToken(['h', 'hh'], function (input, array, config) {
    array[HOUR] = toInt(input);
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
    getParsingFlags(config).bigHour = true;
});
addParseToken('Hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
});
addParseToken('Hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
});

// LOCALES

function localeIsPM (input) {
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return ((input + '').toLowerCase().charAt(0) === 'p');
}

var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
function localeMeridiem (hours, minutes, isLower) {
    if (hours > 11) {
        return isLower ? 'pm' : 'PM';
    } else {
        return isLower ? 'am' : 'AM';
    }
}


// MOMENTS

// Setting the hour should keep the time, because the user explicitly
// specified which hour he wants. So trying to maintain the same hour (in
// a new timezone) makes sense. Adding/subtracting hours does not follow
// this rule.
var getSetHour = makeGetSet('Hours', true);

// months
// week
// weekdays
// meridiem
var baseConfig = {
    calendar: defaultCalendar,
    longDateFormat: defaultLongDateFormat,
    invalidDate: defaultInvalidDate,
    ordinal: defaultOrdinal,
    dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
    relativeTime: defaultRelativeTime,

    months: defaultLocaleMonths,
    monthsShort: defaultLocaleMonthsShort,

    week: defaultLocaleWeek,

    weekdays: defaultLocaleWeekdays,
    weekdaysMin: defaultLocaleWeekdaysMin,
    weekdaysShort: defaultLocaleWeekdaysShort,

    meridiemParse: defaultLocaleMeridiemParse
};

// internal storage for locale config files
var locales = {};
var localeFamilies = {};
var globalLocale;

function normalizeLocale(key) {
    return key ? key.toLowerCase().replace('_', '-') : key;
}

// pick the locale from the array
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
function chooseLocale(names) {
    var i = 0, j, next, locale, split;

    while (i < names.length) {
        split = normalizeLocale(names[i]).split('-');
        j = split.length;
        next = normalizeLocale(names[i + 1]);
        next = next ? next.split('-') : null;
        while (j > 0) {
            locale = loadLocale(split.slice(0, j).join('-'));
            if (locale) {
                return locale;
            }
            if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                //the next array item is better than a shallower substring of this one
                break;
            }
            j--;
        }
        i++;
    }
    return null;
}

function loadLocale(name) {
    var oldLocale = null;
    // TODO: Find a better way to register and load all the locales in Node
    if (!locales[name] && (typeof module !== 'undefined') &&
            module && module.exports) {
        try {
            oldLocale = globalLocale._abbr;
            var aliasedRequire = require;
            aliasedRequire('./locale/' + name);
            getSetGlobalLocale(oldLocale);
        } catch (e) {}
    }
    return locales[name];
}

// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
function getSetGlobalLocale (key, values) {
    var data;
    if (key) {
        if (isUndefined(values)) {
            data = getLocale(key);
        }
        else {
            data = defineLocale(key, values);
        }

        if (data) {
            // moment.duration._locale = moment._locale = data;
            globalLocale = data;
        }
    }

    return globalLocale._abbr;
}

function defineLocale (name, config) {
    if (config !== null) {
        var parentConfig = baseConfig;
        config.abbr = name;
        if (locales[name] != null) {
            deprecateSimple('defineLocaleOverride',
                    'use moment.updateLocale(localeName, config) to change ' +
                    'an existing locale. moment.defineLocale(localeName, ' +
                    'config) should only be used for creating a new locale ' +
                    'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
            parentConfig = locales[name]._config;
        } else if (config.parentLocale != null) {
            if (locales[config.parentLocale] != null) {
                parentConfig = locales[config.parentLocale]._config;
            } else {
                if (!localeFamilies[config.parentLocale]) {
                    localeFamilies[config.parentLocale] = [];
                }
                localeFamilies[config.parentLocale].push({
                    name: name,
                    config: config
                });
                return null;
            }
        }
        locales[name] = new Locale(mergeConfigs(parentConfig, config));

        if (localeFamilies[name]) {
            localeFamilies[name].forEach(function (x) {
                defineLocale(x.name, x.config);
            });
        }

        // backwards compat for now: also set the locale
        // make sure we set the locale AFTER all child locales have been
        // created, so we won't end up with the child locale set.
        getSetGlobalLocale(name);


        return locales[name];
    } else {
        // useful for testing
        delete locales[name];
        return null;
    }
}

function updateLocale(name, config) {
    if (config != null) {
        var locale, parentConfig = baseConfig;
        // MERGE
        if (locales[name] != null) {
            parentConfig = locales[name]._config;
        }
        config = mergeConfigs(parentConfig, config);
        locale = new Locale(config);
        locale.parentLocale = locales[name];
        locales[name] = locale;

        // backwards compat for now: also set the locale
        getSetGlobalLocale(name);
    } else {
        // pass null for config to unupdate, useful for tests
        if (locales[name] != null) {
            if (locales[name].parentLocale != null) {
                locales[name] = locales[name].parentLocale;
            } else if (locales[name] != null) {
                delete locales[name];
            }
        }
    }
    return locales[name];
}

// returns locale data
function getLocale (key) {
    var locale;

    if (key && key._locale && key._locale._abbr) {
        key = key._locale._abbr;
    }

    if (!key) {
        return globalLocale;
    }

    if (!isArray(key)) {
        //short-circuit everything else
        locale = loadLocale(key);
        if (locale) {
            return locale;
        }
        key = [key];
    }

    return chooseLocale(key);
}

function listLocales() {
    return keys(locales);
}

function checkOverflow (m) {
    var overflow;
    var a = m._a;

    if (a && getParsingFlags(m).overflow === -2) {
        overflow =
            a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
            a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
            a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
            a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
            a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
            a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
            -1;

        if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
            overflow = DATE;
        }
        if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
            overflow = WEEK;
        }
        if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
            overflow = WEEKDAY;
        }

        getParsingFlags(m).overflow = overflow;
    }

    return m;
}

// Pick the first defined of two or three arguments.
function defaults(a, b, c) {
    if (a != null) {
        return a;
    }
    if (b != null) {
        return b;
    }
    return c;
}

function currentDateArray(config) {
    // hooks is actually the exported moment object
    var nowValue = new Date(hooks.now());
    if (config._useUTC) {
        return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
    }
    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}

// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]
function configFromArray (config) {
    var i, date, input = [], currentDate, yearToUse;

    if (config._d) {
        return;
    }

    currentDate = currentDateArray(config);

    //compute day of the year from weeks and weekdays
    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
        dayOfYearFromWeekInfo(config);
    }

    //if the day of the year is set, figure out what it is
    if (config._dayOfYear != null) {
        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

        if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
            getParsingFlags(config)._overflowDayOfYear = true;
        }

        date = createUTCDate(yearToUse, 0, config._dayOfYear);
        config._a[MONTH] = date.getUTCMonth();
        config._a[DATE] = date.getUTCDate();
    }

    // Default to current date.
    // * if no year, month, day of month are given, default to today
    // * if day of month is given, default month and year
    // * if month is given, default only year
    // * if year is given, don't default anything
    for (i = 0; i < 3 && config._a[i] == null; ++i) {
        config._a[i] = input[i] = currentDate[i];
    }

    // Zero out whatever was not defaulted, including time
    for (; i < 7; i++) {
        config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
    }

    // Check for 24:00:00.000
    if (config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0) {
        config._nextDay = true;
        config._a[HOUR] = 0;
    }

    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
    // Apply timezone offset from input. The actual utcOffset can be changed
    // with parseZone.
    if (config._tzm != null) {
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    }

    if (config._nextDay) {
        config._a[HOUR] = 24;
    }

    // check for mismatching day of week
    if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== config._d.getDay()) {
        getParsingFlags(config).weekdayMismatch = true;
    }
}

function dayOfYearFromWeekInfo(config) {
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

    w = config._w;
    if (w.GG != null || w.W != null || w.E != null) {
        dow = 1;
        doy = 4;

        // TODO: We need to take the current isoWeekYear, but that depends on
        // how we interpret now (local, utc, fixed offset). So create
        // a now version of current config (take local/utc/offset flags, and
        // create now).
        weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
        week = defaults(w.W, 1);
        weekday = defaults(w.E, 1);
        if (weekday < 1 || weekday > 7) {
            weekdayOverflow = true;
        }
    } else {
        dow = config._locale._week.dow;
        doy = config._locale._week.doy;

        var curWeek = weekOfYear(createLocal(), dow, doy);

        weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

        // Default to current week.
        week = defaults(w.w, curWeek.week);

        if (w.d != null) {
            // weekday -- low day numbers are considered next week
            weekday = w.d;
            if (weekday < 0 || weekday > 6) {
                weekdayOverflow = true;
            }
        } else if (w.e != null) {
            // local weekday -- counting starts from begining of week
            weekday = w.e + dow;
            if (w.e < 0 || w.e > 6) {
                weekdayOverflow = true;
            }
        } else {
            // default to begining of week
            weekday = dow;
        }
    }
    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
        getParsingFlags(config)._overflowWeeks = true;
    } else if (weekdayOverflow != null) {
        getParsingFlags(config)._overflowWeekday = true;
    } else {
        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }
}

// iso 8601 regex
// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

var isoDates = [
    ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
    ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
    ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
    ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
    ['YYYY-DDD', /\d{4}-\d{3}/],
    ['YYYY-MM', /\d{4}-\d\d/, false],
    ['YYYYYYMMDD', /[+-]\d{10}/],
    ['YYYYMMDD', /\d{8}/],
    // YYYYMM is NOT allowed by the standard
    ['GGGG[W]WWE', /\d{4}W\d{3}/],
    ['GGGG[W]WW', /\d{4}W\d{2}/, false],
    ['YYYYDDD', /\d{7}/]
];

// iso time formats and regexes
var isoTimes = [
    ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
    ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
    ['HH:mm:ss', /\d\d:\d\d:\d\d/],
    ['HH:mm', /\d\d:\d\d/],
    ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
    ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
    ['HHmmss', /\d\d\d\d\d\d/],
    ['HHmm', /\d\d\d\d/],
    ['HH', /\d\d/]
];

var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

// date from iso format
function configFromISO(config) {
    var i, l,
        string = config._i,
        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
        allowTime, dateFormat, timeFormat, tzFormat;

    if (match) {
        getParsingFlags(config).iso = true;

        for (i = 0, l = isoDates.length; i < l; i++) {
            if (isoDates[i][1].exec(match[1])) {
                dateFormat = isoDates[i][0];
                allowTime = isoDates[i][2] !== false;
                break;
            }
        }
        if (dateFormat == null) {
            config._isValid = false;
            return;
        }
        if (match[3]) {
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(match[3])) {
                    // match[2] should be 'T' or space
                    timeFormat = (match[2] || ' ') + isoTimes[i][0];
                    break;
                }
            }
            if (timeFormat == null) {
                config._isValid = false;
                return;
            }
        }
        if (!allowTime && timeFormat != null) {
            config._isValid = false;
            return;
        }
        if (match[4]) {
            if (tzRegex.exec(match[4])) {
                tzFormat = 'Z';
            } else {
                config._isValid = false;
                return;
            }
        }
        config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
        configFromStringAndFormat(config);
    } else {
        config._isValid = false;
    }
}

// RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
    var result = [
        untruncateYear(yearStr),
        defaultLocaleMonthsShort.indexOf(monthStr),
        parseInt(dayStr, 10),
        parseInt(hourStr, 10),
        parseInt(minuteStr, 10)
    ];

    if (secondStr) {
        result.push(parseInt(secondStr, 10));
    }

    return result;
}

function untruncateYear(yearStr) {
    var year = parseInt(yearStr, 10);
    if (year <= 49) {
        return 2000 + year;
    } else if (year <= 999) {
        return 1900 + year;
    }
    return year;
}

function preprocessRFC2822(s) {
    // Remove comments and folding whitespace and replace multiple-spaces with a single space
    return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').trim();
}

function checkWeekday(weekdayStr, parsedInput, config) {
    if (weekdayStr) {
        // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
        var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
            weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
        if (weekdayProvided !== weekdayActual) {
            getParsingFlags(config).weekdayMismatch = true;
            config._isValid = false;
            return false;
        }
    }
    return true;
}

var obsOffsets = {
    UT: 0,
    GMT: 0,
    EDT: -4 * 60,
    EST: -5 * 60,
    CDT: -5 * 60,
    CST: -6 * 60,
    MDT: -6 * 60,
    MST: -7 * 60,
    PDT: -7 * 60,
    PST: -8 * 60
};

function calculateOffset(obsOffset, militaryOffset, numOffset) {
    if (obsOffset) {
        return obsOffsets[obsOffset];
    } else if (militaryOffset) {
        // the only allowed military tz is Z
        return 0;
    } else {
        var hm = parseInt(numOffset, 10);
        var m = hm % 100, h = (hm - m) / 100;
        return h * 60 + m;
    }
}

// date and time from ref 2822 format
function configFromRFC2822(config) {
    var match = rfc2822.exec(preprocessRFC2822(config._i));
    if (match) {
        var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
        if (!checkWeekday(match[1], parsedArray, config)) {
            return;
        }

        config._a = parsedArray;
        config._tzm = calculateOffset(match[8], match[9], match[10]);

        config._d = createUTCDate.apply(null, config._a);
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

        getParsingFlags(config).rfc2822 = true;
    } else {
        config._isValid = false;
    }
}

// date from iso format or fallback
function configFromString(config) {
    var matched = aspNetJsonRegex.exec(config._i);

    if (matched !== null) {
        config._d = new Date(+matched[1]);
        return;
    }

    configFromISO(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    configFromRFC2822(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    // Final attempt, use Input Fallback
    hooks.createFromInputFallback(config);
}

hooks.createFromInputFallback = deprecate(
    'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
    'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
    'discouraged and will be removed in an upcoming major release. Please refer to ' +
    'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
    function (config) {
        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
    }
);

// constant that refers to the ISO standard
hooks.ISO_8601 = function () {};

// constant that refers to the RFC 2822 form
hooks.RFC_2822 = function () {};

// date from string and format string
function configFromStringAndFormat(config) {
    // TODO: Move this to another part of the creation flow to prevent circular deps
    if (config._f === hooks.ISO_8601) {
        configFromISO(config);
        return;
    }
    if (config._f === hooks.RFC_2822) {
        configFromRFC2822(config);
        return;
    }
    config._a = [];
    getParsingFlags(config).empty = true;

    // This array is used to make a Date, either with `new Date` or `Date.UTC`
    var string = '' + config._i,
        i, parsedInput, tokens, token, skipped,
        stringLength = string.length,
        totalParsedInputLength = 0;

    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

    for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
        // console.log('token', token, 'parsedInput', parsedInput,
        //         'regex', getParseRegexForToken(token, config));
        if (parsedInput) {
            skipped = string.substr(0, string.indexOf(parsedInput));
            if (skipped.length > 0) {
                getParsingFlags(config).unusedInput.push(skipped);
            }
            string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
            totalParsedInputLength += parsedInput.length;
        }
        // don't parse if it's not a known token
        if (formatTokenFunctions[token]) {
            if (parsedInput) {
                getParsingFlags(config).empty = false;
            }
            else {
                getParsingFlags(config).unusedTokens.push(token);
            }
            addTimeToArrayFromToken(token, parsedInput, config);
        }
        else if (config._strict && !parsedInput) {
            getParsingFlags(config).unusedTokens.push(token);
        }
    }

    // add remaining unparsed input length to the string
    getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
    if (string.length > 0) {
        getParsingFlags(config).unusedInput.push(string);
    }

    // clear _12h flag if hour is <= 12
    if (config._a[HOUR] <= 12 &&
        getParsingFlags(config).bigHour === true &&
        config._a[HOUR] > 0) {
        getParsingFlags(config).bigHour = undefined;
    }

    getParsingFlags(config).parsedDateParts = config._a.slice(0);
    getParsingFlags(config).meridiem = config._meridiem;
    // handle meridiem
    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

    configFromArray(config);
    checkOverflow(config);
}


function meridiemFixWrap (locale, hour, meridiem) {
    var isPm;

    if (meridiem == null) {
        // nothing to do
        return hour;
    }
    if (locale.meridiemHour != null) {
        return locale.meridiemHour(hour, meridiem);
    } else if (locale.isPM != null) {
        // Fallback
        isPm = locale.isPM(meridiem);
        if (isPm && hour < 12) {
            hour += 12;
        }
        if (!isPm && hour === 12) {
            hour = 0;
        }
        return hour;
    } else {
        // this is not supposed to happen
        return hour;
    }
}

// date from string and array of format strings
function configFromStringAndArray(config) {
    var tempConfig,
        bestMoment,

        scoreToBeat,
        i,
        currentScore;

    if (config._f.length === 0) {
        getParsingFlags(config).invalidFormat = true;
        config._d = new Date(NaN);
        return;
    }

    for (i = 0; i < config._f.length; i++) {
        currentScore = 0;
        tempConfig = copyConfig({}, config);
        if (config._useUTC != null) {
            tempConfig._useUTC = config._useUTC;
        }
        tempConfig._f = config._f[i];
        configFromStringAndFormat(tempConfig);

        if (!isValid(tempConfig)) {
            continue;
        }

        // if there is any input that was not parsed add a penalty for that format
        currentScore += getParsingFlags(tempConfig).charsLeftOver;

        //or tokens
        currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

        getParsingFlags(tempConfig).score = currentScore;

        if (scoreToBeat == null || currentScore < scoreToBeat) {
            scoreToBeat = currentScore;
            bestMoment = tempConfig;
        }
    }

    extend(config, bestMoment || tempConfig);
}

function configFromObject(config) {
    if (config._d) {
        return;
    }

    var i = normalizeObjectUnits(config._i);
    config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
        return obj && parseInt(obj, 10);
    });

    configFromArray(config);
}

function createFromConfig (config) {
    var res = new Moment(checkOverflow(prepareConfig(config)));
    if (res._nextDay) {
        // Adding is smart enough around DST
        res.add(1, 'd');
        res._nextDay = undefined;
    }

    return res;
}

function prepareConfig (config) {
    var input = config._i,
        format = config._f;

    config._locale = config._locale || getLocale(config._l);

    if (input === null || (format === undefined && input === '')) {
        return createInvalid({nullInput: true});
    }

    if (typeof input === 'string') {
        config._i = input = config._locale.preparse(input);
    }

    if (isMoment(input)) {
        return new Moment(checkOverflow(input));
    } else if (isDate(input)) {
        config._d = input;
    } else if (isArray(format)) {
        configFromStringAndArray(config);
    } else if (format) {
        configFromStringAndFormat(config);
    }  else {
        configFromInput(config);
    }

    if (!isValid(config)) {
        config._d = null;
    }

    return config;
}

function configFromInput(config) {
    var input = config._i;
    if (isUndefined(input)) {
        config._d = new Date(hooks.now());
    } else if (isDate(input)) {
        config._d = new Date(input.valueOf());
    } else if (typeof input === 'string') {
        configFromString(config);
    } else if (isArray(input)) {
        config._a = map(input.slice(0), function (obj) {
            return parseInt(obj, 10);
        });
        configFromArray(config);
    } else if (isObject(input)) {
        configFromObject(config);
    } else if (isNumber(input)) {
        // from milliseconds
        config._d = new Date(input);
    } else {
        hooks.createFromInputFallback(config);
    }
}

function createLocalOrUTC (input, format, locale, strict, isUTC) {
    var c = {};

    if (locale === true || locale === false) {
        strict = locale;
        locale = undefined;
    }

    if ((isObject(input) && isObjectEmpty(input)) ||
            (isArray(input) && input.length === 0)) {
        input = undefined;
    }
    // object construction must be done this way.
    // https://github.com/moment/moment/issues/1423
    c._isAMomentObject = true;
    c._useUTC = c._isUTC = isUTC;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;

    return createFromConfig(c);
}

function createLocal (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, false);
}

var prototypeMin = deprecate(
    'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other < this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

var prototypeMax = deprecate(
    'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other > this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

// Pick a moment m from moments so that m[fn](other) is true for all
// other. This relies on the function fn to be transitive.
//
// moments should either be an array of moment objects or an array, whose
// first element is an array of moment objects.
function pickBy(fn, moments) {
    var res, i;
    if (moments.length === 1 && isArray(moments[0])) {
        moments = moments[0];
    }
    if (!moments.length) {
        return createLocal();
    }
    res = moments[0];
    for (i = 1; i < moments.length; ++i) {
        if (!moments[i].isValid() || moments[i][fn](res)) {
            res = moments[i];
        }
    }
    return res;
}

// TODO: Use [].sort instead?
function min () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isBefore', args);
}

function max () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isAfter', args);
}

var now = function () {
    return Date.now ? Date.now() : +(new Date());
};

var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

function isDurationValid(m) {
    for (var key in m) {
        if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
            return false;
        }
    }

    var unitHasDecimal = false;
    for (var i = 0; i < ordering.length; ++i) {
        if (m[ordering[i]]) {
            if (unitHasDecimal) {
                return false; // only allow non-integers for smallest unit
            }
            if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                unitHasDecimal = true;
            }
        }
    }

    return true;
}

function isValid$1() {
    return this._isValid;
}

function createInvalid$1() {
    return createDuration(NaN);
}

function Duration (duration) {
    var normalizedInput = normalizeObjectUnits(duration),
        years = normalizedInput.year || 0,
        quarters = normalizedInput.quarter || 0,
        months = normalizedInput.month || 0,
        weeks = normalizedInput.week || 0,
        days = normalizedInput.day || 0,
        hours = normalizedInput.hour || 0,
        minutes = normalizedInput.minute || 0,
        seconds = normalizedInput.second || 0,
        milliseconds = normalizedInput.millisecond || 0;

    this._isValid = isDurationValid(normalizedInput);

    // representation for dateAddRemove
    this._milliseconds = +milliseconds +
        seconds * 1e3 + // 1000
        minutes * 6e4 + // 1000 * 60
        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately
    this._days = +days +
        weeks * 7;
    // It is impossible to translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.
    this._months = +months +
        quarters * 3 +
        years * 12;

    this._data = {};

    this._locale = getLocale();

    this._bubble();
}

function isDuration (obj) {
    return obj instanceof Duration;
}

function absRound (number) {
    if (number < 0) {
        return Math.round(-1 * number) * -1;
    } else {
        return Math.round(number);
    }
}

// FORMATTING

function offset (token, separator) {
    addFormatToken(token, 0, 0, function () {
        var offset = this.utcOffset();
        var sign = '+';
        if (offset < 0) {
            offset = -offset;
            sign = '-';
        }
        return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
    });
}

offset('Z', ':');
offset('ZZ', '');

// PARSING

addRegexToken('Z',  matchShortOffset);
addRegexToken('ZZ', matchShortOffset);
addParseToken(['Z', 'ZZ'], function (input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(matchShortOffset, input);
});

// HELPERS

// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
var chunkOffset = /([\+\-]|\d\d)/gi;

function offsetFromString(matcher, string) {
    var matches = (string || '').match(matcher);

    if (matches === null) {
        return null;
    }

    var chunk   = matches[matches.length - 1] || [];
    var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
    var minutes = +(parts[1] * 60) + toInt(parts[2]);

    return minutes === 0 ?
      0 :
      parts[0] === '+' ? minutes : -minutes;
}

// Return a moment from input, that is local/utc/zone equivalent to model.
function cloneWithOffset(input, model) {
    var res, diff;
    if (model._isUTC) {
        res = model.clone();
        diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
        // Use low-level api, because this fn is low-level api.
        res._d.setTime(res._d.valueOf() + diff);
        hooks.updateOffset(res, false);
        return res;
    } else {
        return createLocal(input).local();
    }
}

function getDateOffset (m) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
}

// HOOKS

// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
hooks.updateOffset = function () {};

// MOMENTS

// keepLocalTime = true means only change the timezone, without
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
// +0200, so we adjust the time as needed, to be valid.
//
// Keeping the time actually adds/subtracts (one hour)
// from the actual represented time. That is why we call updateOffset
// a second time. In case it wants us to change the offset again
// _changeInProgress == true case, then we have to adjust, because
// there is no such time in the given timezone.
function getSetOffset (input, keepLocalTime, keepMinutes) {
    var offset = this._offset || 0,
        localAdjust;
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    if (input != null) {
        if (typeof input === 'string') {
            input = offsetFromString(matchShortOffset, input);
            if (input === null) {
                return this;
            }
        } else if (Math.abs(input) < 16 && !keepMinutes) {
            input = input * 60;
        }
        if (!this._isUTC && keepLocalTime) {
            localAdjust = getDateOffset(this);
        }
        this._offset = input;
        this._isUTC = true;
        if (localAdjust != null) {
            this.add(localAdjust, 'm');
        }
        if (offset !== input) {
            if (!keepLocalTime || this._changeInProgress) {
                addSubtract(this, createDuration(input - offset, 'm'), 1, false);
            } else if (!this._changeInProgress) {
                this._changeInProgress = true;
                hooks.updateOffset(this, true);
                this._changeInProgress = null;
            }
        }
        return this;
    } else {
        return this._isUTC ? offset : getDateOffset(this);
    }
}

function getSetZone (input, keepLocalTime) {
    if (input != null) {
        if (typeof input !== 'string') {
            input = -input;
        }

        this.utcOffset(input, keepLocalTime);

        return this;
    } else {
        return -this.utcOffset();
    }
}

function setOffsetToUTC (keepLocalTime) {
    return this.utcOffset(0, keepLocalTime);
}

function setOffsetToLocal (keepLocalTime) {
    if (this._isUTC) {
        this.utcOffset(0, keepLocalTime);
        this._isUTC = false;

        if (keepLocalTime) {
            this.subtract(getDateOffset(this), 'm');
        }
    }
    return this;
}

function setOffsetToParsedOffset () {
    if (this._tzm != null) {
        this.utcOffset(this._tzm, false, true);
    } else if (typeof this._i === 'string') {
        var tZone = offsetFromString(matchOffset, this._i);
        if (tZone != null) {
            this.utcOffset(tZone);
        }
        else {
            this.utcOffset(0, true);
        }
    }
    return this;
}

function hasAlignedHourOffset (input) {
    if (!this.isValid()) {
        return false;
    }
    input = input ? createLocal(input).utcOffset() : 0;

    return (this.utcOffset() - input) % 60 === 0;
}

function isDaylightSavingTime () {
    return (
        this.utcOffset() > this.clone().month(0).utcOffset() ||
        this.utcOffset() > this.clone().month(5).utcOffset()
    );
}

function isDaylightSavingTimeShifted () {
    if (!isUndefined(this._isDSTShifted)) {
        return this._isDSTShifted;
    }

    var c = {};

    copyConfig(c, this);
    c = prepareConfig(c);

    if (c._a) {
        var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
        this._isDSTShifted = this.isValid() &&
            compareArrays(c._a, other.toArray()) > 0;
    } else {
        this._isDSTShifted = false;
    }

    return this._isDSTShifted;
}

function isLocal () {
    return this.isValid() ? !this._isUTC : false;
}

function isUtcOffset () {
    return this.isValid() ? this._isUTC : false;
}

function isUtc () {
    return this.isValid() ? this._isUTC && this._offset === 0 : false;
}

// ASP.NET json date format regex
var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

// from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
// somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
// and further modified to allow for strings containing both week and day
var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

function createDuration (input, key) {
    var duration = input,
        // matching against regexp is expensive, do it on demand
        match = null,
        sign,
        ret,
        diffRes;

    if (isDuration(input)) {
        duration = {
            ms : input._milliseconds,
            d  : input._days,
            M  : input._months
        };
    } else if (isNumber(input)) {
        duration = {};
        if (key) {
            duration[key] = input;
        } else {
            duration.milliseconds = input;
        }
    } else if (!!(match = aspNetRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : 1;
        duration = {
            y  : 0,
            d  : toInt(match[DATE])                         * sign,
            h  : toInt(match[HOUR])                         * sign,
            m  : toInt(match[MINUTE])                       * sign,
            s  : toInt(match[SECOND])                       * sign,
            ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
        };
    } else if (!!(match = isoRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : (match[1] === '+') ? 1 : 1;
        duration = {
            y : parseIso(match[2], sign),
            M : parseIso(match[3], sign),
            w : parseIso(match[4], sign),
            d : parseIso(match[5], sign),
            h : parseIso(match[6], sign),
            m : parseIso(match[7], sign),
            s : parseIso(match[8], sign)
        };
    } else if (duration == null) {// checks for null or undefined
        duration = {};
    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
        diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

        duration = {};
        duration.ms = diffRes.milliseconds;
        duration.M = diffRes.months;
    }

    ret = new Duration(duration);

    if (isDuration(input) && hasOwnProp(input, '_locale')) {
        ret._locale = input._locale;
    }

    return ret;
}

createDuration.fn = Duration.prototype;
createDuration.invalid = createInvalid$1;

function parseIso (inp, sign) {
    // We'd normally use ~~inp for this, but unfortunately it also
    // converts floats to ints.
    // inp may be undefined, so careful calling replace on it.
    var res = inp && parseFloat(inp.replace(',', '.'));
    // apply sign while we're at it
    return (isNaN(res) ? 0 : res) * sign;
}

function positiveMomentsDifference(base, other) {
    var res = {milliseconds: 0, months: 0};

    res.months = other.month() - base.month() +
        (other.year() - base.year()) * 12;
    if (base.clone().add(res.months, 'M').isAfter(other)) {
        --res.months;
    }

    res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

    return res;
}

function momentsDifference(base, other) {
    var res;
    if (!(base.isValid() && other.isValid())) {
        return {milliseconds: 0, months: 0};
    }

    other = cloneWithOffset(other, base);
    if (base.isBefore(other)) {
        res = positiveMomentsDifference(base, other);
    } else {
        res = positiveMomentsDifference(other, base);
        res.milliseconds = -res.milliseconds;
        res.months = -res.months;
    }

    return res;
}

// TODO: remove 'name' arg after deprecation is removed
function createAdder(direction, name) {
    return function (val, period) {
        var dur, tmp;
        //invert the arguments, but complain about it
        if (period !== null && !isNaN(+period)) {
            deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
            'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
            tmp = val; val = period; period = tmp;
        }

        val = typeof val === 'string' ? +val : val;
        dur = createDuration(val, period);
        addSubtract(this, dur, direction);
        return this;
    };
}

function addSubtract (mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds,
        days = absRound(duration._days),
        months = absRound(duration._months);

    if (!mom.isValid()) {
        // No op
        return;
    }

    updateOffset = updateOffset == null ? true : updateOffset;

    if (months) {
        setMonth(mom, get(mom, 'Month') + months * isAdding);
    }
    if (days) {
        set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
    }
    if (milliseconds) {
        mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
    }
    if (updateOffset) {
        hooks.updateOffset(mom, days || months);
    }
}

var add      = createAdder(1, 'add');
var subtract = createAdder(-1, 'subtract');

function getCalendarFormat(myMoment, now) {
    var diff = myMoment.diff(now, 'days', true);
    return diff < -6 ? 'sameElse' :
            diff < -1 ? 'lastWeek' :
            diff < 0 ? 'lastDay' :
            diff < 1 ? 'sameDay' :
            diff < 2 ? 'nextDay' :
            diff < 7 ? 'nextWeek' : 'sameElse';
}

function calendar$1 (time, formats) {
    // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var now = time || createLocal(),
        sod = cloneWithOffset(now, this).startOf('day'),
        format = hooks.calendarFormat(this, sod) || 'sameElse';

    var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
}

function clone () {
    return new Moment(this);
}

function isAfter (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() > localInput.valueOf();
    } else {
        return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
}

function isBefore (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() < localInput.valueOf();
    } else {
        return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
}

function isBetween (from, to, units, inclusivity) {
    inclusivity = inclusivity || '()';
    return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
        (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
}

function isSame (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input),
        inputMs;
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(units || 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() === localInput.valueOf();
    } else {
        inputMs = localInput.valueOf();
        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
    }
}

function isSameOrAfter (input, units) {
    return this.isSame(input, units) || this.isAfter(input,units);
}

function isSameOrBefore (input, units) {
    return this.isSame(input, units) || this.isBefore(input,units);
}

function diff (input, units, asFloat) {
    var that,
        zoneDelta,
        delta, output;

    if (!this.isValid()) {
        return NaN;
    }

    that = cloneWithOffset(input, this);

    if (!that.isValid()) {
        return NaN;
    }

    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

    units = normalizeUnits(units);

    switch (units) {
        case 'year': output = monthDiff(this, that) / 12; break;
        case 'month': output = monthDiff(this, that); break;
        case 'quarter': output = monthDiff(this, that) / 3; break;
        case 'second': output = (this - that) / 1e3; break; // 1000
        case 'minute': output = (this - that) / 6e4; break; // 1000 * 60
        case 'hour': output = (this - that) / 36e5; break; // 1000 * 60 * 60
        case 'day': output = (this - that - zoneDelta) / 864e5; break; // 1000 * 60 * 60 * 24, negate dst
        case 'week': output = (this - that - zoneDelta) / 6048e5; break; // 1000 * 60 * 60 * 24 * 7, negate dst
        default: output = this - that;
    }

    return asFloat ? output : absFloor(output);
}

function monthDiff (a, b) {
    // difference in months
    var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
        // b is in (anchor - 1 month, anchor + 1 month)
        anchor = a.clone().add(wholeMonthDiff, 'months'),
        anchor2, adjust;

    if (b - anchor < 0) {
        anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor - anchor2);
    } else {
        anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor2 - anchor);
    }

    //check for negative zero, return zero if negative zero
    return -(wholeMonthDiff + adjust) || 0;
}

hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

function toString () {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
}

function toISOString() {
    if (!this.isValid()) {
        return null;
    }
    var m = this.clone().utc();
    if (m.year() < 0 || m.year() > 9999) {
        return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
    }
    if (isFunction(Date.prototype.toISOString)) {
        // native implementation is ~50x faster, use it when we can
        return this.toDate().toISOString();
    }
    return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
}

/**
 * Return a human readable representation of a moment that can
 * also be evaluated to get a new moment which is the same
 *
 * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
 */
function inspect () {
    if (!this.isValid()) {
        return 'moment.invalid(/* ' + this._i + ' */)';
    }
    var func = 'moment';
    var zone = '';
    if (!this.isLocal()) {
        func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
        zone = 'Z';
    }
    var prefix = '[' + func + '("]';
    var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
    var datetime = '-MM-DD[T]HH:mm:ss.SSS';
    var suffix = zone + '[")]';

    return this.format(prefix + year + datetime + suffix);
}

function format (inputString) {
    if (!inputString) {
        inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
    }
    var output = formatMoment(this, inputString);
    return this.localeData().postformat(output);
}

function from (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function fromNow (withoutSuffix) {
    return this.from(createLocal(), withoutSuffix);
}

function to (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function toNow (withoutSuffix) {
    return this.to(createLocal(), withoutSuffix);
}

// If passed a locale key, it will set the locale for this
// instance.  Otherwise, it will return the locale configuration
// variables for this instance.
function locale (key) {
    var newLocaleData;

    if (key === undefined) {
        return this._locale._abbr;
    } else {
        newLocaleData = getLocale(key);
        if (newLocaleData != null) {
            this._locale = newLocaleData;
        }
        return this;
    }
}

var lang = deprecate(
    'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
    function (key) {
        if (key === undefined) {
            return this.localeData();
        } else {
            return this.locale(key);
        }
    }
);

function localeData () {
    return this._locale;
}

function startOf (units) {
    units = normalizeUnits(units);
    // the following switch intentionally omits break keywords
    // to utilize falling through the cases.
    switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
        case 'date':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
    }

    // weeks are a special case
    if (units === 'week') {
        this.weekday(0);
    }
    if (units === 'isoWeek') {
        this.isoWeekday(1);
    }

    // quarters are also special
    if (units === 'quarter') {
        this.month(Math.floor(this.month() / 3) * 3);
    }

    return this;
}

function endOf (units) {
    units = normalizeUnits(units);
    if (units === undefined || units === 'millisecond') {
        return this;
    }

    // 'date' is an alias for 'day', so it should be considered as such.
    if (units === 'date') {
        units = 'day';
    }

    return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
}

function valueOf () {
    return this._d.valueOf() - ((this._offset || 0) * 60000);
}

function unix () {
    return Math.floor(this.valueOf() / 1000);
}

function toDate () {
    return new Date(this.valueOf());
}

function toArray () {
    var m = this;
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
}

function toObject () {
    var m = this;
    return {
        years: m.year(),
        months: m.month(),
        date: m.date(),
        hours: m.hours(),
        minutes: m.minutes(),
        seconds: m.seconds(),
        milliseconds: m.milliseconds()
    };
}

function toJSON () {
    // new Date(NaN).toJSON() === null
    return this.isValid() ? this.toISOString() : null;
}

function isValid$2 () {
    return isValid(this);
}

function parsingFlags () {
    return extend({}, getParsingFlags(this));
}

function invalidAt () {
    return getParsingFlags(this).overflow;
}

function creationData() {
    return {
        input: this._i,
        format: this._f,
        locale: this._locale,
        isUTC: this._isUTC,
        strict: this._strict
    };
}

// FORMATTING

addFormatToken(0, ['gg', 2], 0, function () {
    return this.weekYear() % 100;
});

addFormatToken(0, ['GG', 2], 0, function () {
    return this.isoWeekYear() % 100;
});

function addWeekYearFormatToken (token, getter) {
    addFormatToken(0, [token, token.length], 0, getter);
}

addWeekYearFormatToken('gggg',     'weekYear');
addWeekYearFormatToken('ggggg',    'weekYear');
addWeekYearFormatToken('GGGG',  'isoWeekYear');
addWeekYearFormatToken('GGGGG', 'isoWeekYear');

// ALIASES

addUnitAlias('weekYear', 'gg');
addUnitAlias('isoWeekYear', 'GG');

// PRIORITY

addUnitPriority('weekYear', 1);
addUnitPriority('isoWeekYear', 1);


// PARSING

addRegexToken('G',      matchSigned);
addRegexToken('g',      matchSigned);
addRegexToken('GG',     match1to2, match2);
addRegexToken('gg',     match1to2, match2);
addRegexToken('GGGG',   match1to4, match4);
addRegexToken('gggg',   match1to4, match4);
addRegexToken('GGGGG',  match1to6, match6);
addRegexToken('ggggg',  match1to6, match6);

addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
    week[token.substr(0, 2)] = toInt(input);
});

addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
    week[token] = hooks.parseTwoDigitYear(input);
});

// MOMENTS

function getSetWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy);
}

function getSetISOWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input, this.isoWeek(), this.isoWeekday(), 1, 4);
}

function getISOWeeksInYear () {
    return weeksInYear(this.year(), 1, 4);
}

function getWeeksInYear () {
    var weekInfo = this.localeData()._week;
    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
}

function getSetWeekYearHelper(input, week, weekday, dow, doy) {
    var weeksTarget;
    if (input == null) {
        return weekOfYear(this, dow, doy).year;
    } else {
        weeksTarget = weeksInYear(input, dow, doy);
        if (week > weeksTarget) {
            week = weeksTarget;
        }
        return setWeekAll.call(this, input, week, weekday, dow, doy);
    }
}

function setWeekAll(weekYear, week, weekday, dow, doy) {
    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
        date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

    this.year(date.getUTCFullYear());
    this.month(date.getUTCMonth());
    this.date(date.getUTCDate());
    return this;
}

// FORMATTING

addFormatToken('Q', 0, 'Qo', 'quarter');

// ALIASES

addUnitAlias('quarter', 'Q');

// PRIORITY

addUnitPriority('quarter', 7);

// PARSING

addRegexToken('Q', match1);
addParseToken('Q', function (input, array) {
    array[MONTH] = (toInt(input) - 1) * 3;
});

// MOMENTS

function getSetQuarter (input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}

// FORMATTING

addFormatToken('D', ['DD', 2], 'Do', 'date');

// ALIASES

addUnitAlias('date', 'D');

// PRIOROITY
addUnitPriority('date', 9);

// PARSING

addRegexToken('D',  match1to2);
addRegexToken('DD', match1to2, match2);
addRegexToken('Do', function (isStrict, locale) {
    // TODO: Remove "ordinalParse" fallback in next major release.
    return isStrict ?
      (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
      locale._dayOfMonthOrdinalParseLenient;
});

addParseToken(['D', 'DD'], DATE);
addParseToken('Do', function (input, array) {
    array[DATE] = toInt(input.match(match1to2)[0], 10);
});

// MOMENTS

var getSetDayOfMonth = makeGetSet('Date', true);

// FORMATTING

addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

// ALIASES

addUnitAlias('dayOfYear', 'DDD');

// PRIORITY
addUnitPriority('dayOfYear', 4);

// PARSING

addRegexToken('DDD',  match1to3);
addRegexToken('DDDD', match3);
addParseToken(['DDD', 'DDDD'], function (input, array, config) {
    config._dayOfYear = toInt(input);
});

// HELPERS

// MOMENTS

function getSetDayOfYear (input) {
    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
    return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
}

// FORMATTING

addFormatToken('m', ['mm', 2], 0, 'minute');

// ALIASES

addUnitAlias('minute', 'm');

// PRIORITY

addUnitPriority('minute', 14);

// PARSING

addRegexToken('m',  match1to2);
addRegexToken('mm', match1to2, match2);
addParseToken(['m', 'mm'], MINUTE);

// MOMENTS

var getSetMinute = makeGetSet('Minutes', false);

// FORMATTING

addFormatToken('s', ['ss', 2], 0, 'second');

// ALIASES

addUnitAlias('second', 's');

// PRIORITY

addUnitPriority('second', 15);

// PARSING

addRegexToken('s',  match1to2);
addRegexToken('ss', match1to2, match2);
addParseToken(['s', 'ss'], SECOND);

// MOMENTS

var getSetSecond = makeGetSet('Seconds', false);

// FORMATTING

addFormatToken('S', 0, 0, function () {
    return ~~(this.millisecond() / 100);
});

addFormatToken(0, ['SS', 2], 0, function () {
    return ~~(this.millisecond() / 10);
});

addFormatToken(0, ['SSS', 3], 0, 'millisecond');
addFormatToken(0, ['SSSS', 4], 0, function () {
    return this.millisecond() * 10;
});
addFormatToken(0, ['SSSSS', 5], 0, function () {
    return this.millisecond() * 100;
});
addFormatToken(0, ['SSSSSS', 6], 0, function () {
    return this.millisecond() * 1000;
});
addFormatToken(0, ['SSSSSSS', 7], 0, function () {
    return this.millisecond() * 10000;
});
addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
    return this.millisecond() * 100000;
});
addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
    return this.millisecond() * 1000000;
});


// ALIASES

addUnitAlias('millisecond', 'ms');

// PRIORITY

addUnitPriority('millisecond', 16);

// PARSING

addRegexToken('S',    match1to3, match1);
addRegexToken('SS',   match1to3, match2);
addRegexToken('SSS',  match1to3, match3);

var token;
for (token = 'SSSS'; token.length <= 9; token += 'S') {
    addRegexToken(token, matchUnsigned);
}

function parseMs(input, array) {
    array[MILLISECOND] = toInt(('0.' + input) * 1000);
}

for (token = 'S'; token.length <= 9; token += 'S') {
    addParseToken(token, parseMs);
}
// MOMENTS

var getSetMillisecond = makeGetSet('Milliseconds', false);

// FORMATTING

addFormatToken('z',  0, 0, 'zoneAbbr');
addFormatToken('zz', 0, 0, 'zoneName');

// MOMENTS

function getZoneAbbr () {
    return this._isUTC ? 'UTC' : '';
}

function getZoneName () {
    return this._isUTC ? 'Coordinated Universal Time' : '';
}

var proto = Moment.prototype;

proto.add               = add;
proto.calendar          = calendar$1;
proto.clone             = clone;
proto.diff              = diff;
proto.endOf             = endOf;
proto.format            = format;
proto.from              = from;
proto.fromNow           = fromNow;
proto.to                = to;
proto.toNow             = toNow;
proto.get               = stringGet;
proto.invalidAt         = invalidAt;
proto.isAfter           = isAfter;
proto.isBefore          = isBefore;
proto.isBetween         = isBetween;
proto.isSame            = isSame;
proto.isSameOrAfter     = isSameOrAfter;
proto.isSameOrBefore    = isSameOrBefore;
proto.isValid           = isValid$2;
proto.lang              = lang;
proto.locale            = locale;
proto.localeData        = localeData;
proto.max               = prototypeMax;
proto.min               = prototypeMin;
proto.parsingFlags      = parsingFlags;
proto.set               = stringSet;
proto.startOf           = startOf;
proto.subtract          = subtract;
proto.toArray           = toArray;
proto.toObject          = toObject;
proto.toDate            = toDate;
proto.toISOString       = toISOString;
proto.inspect           = inspect;
proto.toJSON            = toJSON;
proto.toString          = toString;
proto.unix              = unix;
proto.valueOf           = valueOf;
proto.creationData      = creationData;

// Year
proto.year       = getSetYear;
proto.isLeapYear = getIsLeapYear;

// Week Year
proto.weekYear    = getSetWeekYear;
proto.isoWeekYear = getSetISOWeekYear;

// Quarter
proto.quarter = proto.quarters = getSetQuarter;

// Month
proto.month       = getSetMonth;
proto.daysInMonth = getDaysInMonth;

// Week
proto.week           = proto.weeks        = getSetWeek;
proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
proto.weeksInYear    = getWeeksInYear;
proto.isoWeeksInYear = getISOWeeksInYear;

// Day
proto.date       = getSetDayOfMonth;
proto.day        = proto.days             = getSetDayOfWeek;
proto.weekday    = getSetLocaleDayOfWeek;
proto.isoWeekday = getSetISODayOfWeek;
proto.dayOfYear  = getSetDayOfYear;

// Hour
proto.hour = proto.hours = getSetHour;

// Minute
proto.minute = proto.minutes = getSetMinute;

// Second
proto.second = proto.seconds = getSetSecond;

// Millisecond
proto.millisecond = proto.milliseconds = getSetMillisecond;

// Offset
proto.utcOffset            = getSetOffset;
proto.utc                  = setOffsetToUTC;
proto.local                = setOffsetToLocal;
proto.parseZone            = setOffsetToParsedOffset;
proto.hasAlignedHourOffset = hasAlignedHourOffset;
proto.isDST                = isDaylightSavingTime;
proto.isLocal              = isLocal;
proto.isUtcOffset          = isUtcOffset;
proto.isUtc                = isUtc;
proto.isUTC                = isUtc;

// Timezone
proto.zoneAbbr = getZoneAbbr;
proto.zoneName = getZoneName;

// Deprecations
proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

function createUnix (input) {
    return createLocal(input * 1000);
}

function createInZone () {
    return createLocal.apply(null, arguments).parseZone();
}

function preParsePostFormat (string) {
    return string;
}

var proto$1 = Locale.prototype;

proto$1.calendar        = calendar;
proto$1.longDateFormat  = longDateFormat;
proto$1.invalidDate     = invalidDate;
proto$1.ordinal         = ordinal;
proto$1.preparse        = preParsePostFormat;
proto$1.postformat      = preParsePostFormat;
proto$1.relativeTime    = relativeTime;
proto$1.pastFuture      = pastFuture;
proto$1.set             = set;

// Month
proto$1.months            =        localeMonths;
proto$1.monthsShort       =        localeMonthsShort;
proto$1.monthsParse       =        localeMonthsParse;
proto$1.monthsRegex       = monthsRegex;
proto$1.monthsShortRegex  = monthsShortRegex;

// Week
proto$1.week = localeWeek;
proto$1.firstDayOfYear = localeFirstDayOfYear;
proto$1.firstDayOfWeek = localeFirstDayOfWeek;

// Day of Week
proto$1.weekdays       =        localeWeekdays;
proto$1.weekdaysMin    =        localeWeekdaysMin;
proto$1.weekdaysShort  =        localeWeekdaysShort;
proto$1.weekdaysParse  =        localeWeekdaysParse;

proto$1.weekdaysRegex       =        weekdaysRegex;
proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

// Hours
proto$1.isPM = localeIsPM;
proto$1.meridiem = localeMeridiem;

function get$1 (format, index, field, setter) {
    var locale = getLocale();
    var utc = createUTC().set(setter, index);
    return locale[field](utc, format);
}

function listMonthsImpl (format, index, field) {
    if (isNumber(format)) {
        index = format;
        format = undefined;
    }

    format = format || '';

    if (index != null) {
        return get$1(format, index, field, 'month');
    }

    var i;
    var out = [];
    for (i = 0; i < 12; i++) {
        out[i] = get$1(format, i, field, 'month');
    }
    return out;
}

// ()
// (5)
// (fmt, 5)
// (fmt)
// (true)
// (true, 5)
// (true, fmt, 5)
// (true, fmt)
function listWeekdaysImpl (localeSorted, format, index, field) {
    if (typeof localeSorted === 'boolean') {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    } else {
        format = localeSorted;
        index = format;
        localeSorted = false;

        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    }

    var locale = getLocale(),
        shift = localeSorted ? locale._week.dow : 0;

    if (index != null) {
        return get$1(format, (index + shift) % 7, field, 'day');
    }

    var i;
    var out = [];
    for (i = 0; i < 7; i++) {
        out[i] = get$1(format, (i + shift) % 7, field, 'day');
    }
    return out;
}

function listMonths (format, index) {
    return listMonthsImpl(format, index, 'months');
}

function listMonthsShort (format, index) {
    return listMonthsImpl(format, index, 'monthsShort');
}

function listWeekdays (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
}

function listWeekdaysShort (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
}

function listWeekdaysMin (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
}

getSetGlobalLocale('en', {
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (toInt(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    }
});

// Side effect imports
hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

var mathAbs = Math.abs;

function abs () {
    var data           = this._data;

    this._milliseconds = mathAbs(this._milliseconds);
    this._days         = mathAbs(this._days);
    this._months       = mathAbs(this._months);

    data.milliseconds  = mathAbs(data.milliseconds);
    data.seconds       = mathAbs(data.seconds);
    data.minutes       = mathAbs(data.minutes);
    data.hours         = mathAbs(data.hours);
    data.months        = mathAbs(data.months);
    data.years         = mathAbs(data.years);

    return this;
}

function addSubtract$1 (duration, input, value, direction) {
    var other = createDuration(input, value);

    duration._milliseconds += direction * other._milliseconds;
    duration._days         += direction * other._days;
    duration._months       += direction * other._months;

    return duration._bubble();
}

// supports only 2.0-style add(1, 's') or add(duration)
function add$1 (input, value) {
    return addSubtract$1(this, input, value, 1);
}

// supports only 2.0-style subtract(1, 's') or subtract(duration)
function subtract$1 (input, value) {
    return addSubtract$1(this, input, value, -1);
}

function absCeil (number) {
    if (number < 0) {
        return Math.floor(number);
    } else {
        return Math.ceil(number);
    }
}

function bubble () {
    var milliseconds = this._milliseconds;
    var days         = this._days;
    var months       = this._months;
    var data         = this._data;
    var seconds, minutes, hours, years, monthsFromDays;

    // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166
    if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
            (milliseconds <= 0 && days <= 0 && months <= 0))) {
        milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
        days = 0;
        months = 0;
    }

    // The following code bubbles up values, see the tests for
    // examples of what that means.
    data.milliseconds = milliseconds % 1000;

    seconds           = absFloor(milliseconds / 1000);
    data.seconds      = seconds % 60;

    minutes           = absFloor(seconds / 60);
    data.minutes      = minutes % 60;

    hours             = absFloor(minutes / 60);
    data.hours        = hours % 24;

    days += absFloor(hours / 24);

    // convert days to months
    monthsFromDays = absFloor(daysToMonths(days));
    months += monthsFromDays;
    days -= absCeil(monthsToDays(monthsFromDays));

    // 12 months -> 1 year
    years = absFloor(months / 12);
    months %= 12;

    data.days   = days;
    data.months = months;
    data.years  = years;

    return this;
}

function daysToMonths (days) {
    // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return days * 4800 / 146097;
}

function monthsToDays (months) {
    // the reverse of daysToMonths
    return months * 146097 / 4800;
}

function as (units) {
    if (!this.isValid()) {
        return NaN;
    }
    var days;
    var months;
    var milliseconds = this._milliseconds;

    units = normalizeUnits(units);

    if (units === 'month' || units === 'year') {
        days   = this._days   + milliseconds / 864e5;
        months = this._months + daysToMonths(days);
        return units === 'month' ? months : months / 12;
    } else {
        // handle milliseconds separately because of floating point math errors (issue #1867)
        days = this._days + Math.round(monthsToDays(this._months));
        switch (units) {
            case 'week'   : return days / 7     + milliseconds / 6048e5;
            case 'day'    : return days         + milliseconds / 864e5;
            case 'hour'   : return days * 24    + milliseconds / 36e5;
            case 'minute' : return days * 1440  + milliseconds / 6e4;
            case 'second' : return days * 86400 + milliseconds / 1000;
            // Math.floor prevents floating point math errors here
            case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
            default: throw new Error('Unknown unit ' + units);
        }
    }
}

// TODO: Use this.as('ms')?
function valueOf$1 () {
    if (!this.isValid()) {
        return NaN;
    }
    return (
        this._milliseconds +
        this._days * 864e5 +
        (this._months % 12) * 2592e6 +
        toInt(this._months / 12) * 31536e6
    );
}

function makeAs (alias) {
    return function () {
        return this.as(alias);
    };
}

var asMilliseconds = makeAs('ms');
var asSeconds      = makeAs('s');
var asMinutes      = makeAs('m');
var asHours        = makeAs('h');
var asDays         = makeAs('d');
var asWeeks        = makeAs('w');
var asMonths       = makeAs('M');
var asYears        = makeAs('y');

function clone$1 () {
    return createDuration(this);
}

function get$2 (units) {
    units = normalizeUnits(units);
    return this.isValid() ? this[units + 's']() : NaN;
}

function makeGetter(name) {
    return function () {
        return this.isValid() ? this._data[name] : NaN;
    };
}

var milliseconds = makeGetter('milliseconds');
var seconds      = makeGetter('seconds');
var minutes      = makeGetter('minutes');
var hours        = makeGetter('hours');
var days         = makeGetter('days');
var months       = makeGetter('months');
var years        = makeGetter('years');

function weeks () {
    return absFloor(this.days() / 7);
}

var round = Math.round;
var thresholds = {
    ss: 44,         // a few seconds to seconds
    s : 45,         // seconds to minute
    m : 45,         // minutes to hour
    h : 22,         // hours to day
    d : 26,         // days to month
    M : 11          // months to year
};

// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}

function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
    var duration = createDuration(posNegDuration).abs();
    var seconds  = round(duration.as('s'));
    var minutes  = round(duration.as('m'));
    var hours    = round(duration.as('h'));
    var days     = round(duration.as('d'));
    var months   = round(duration.as('M'));
    var years    = round(duration.as('y'));

    var a = seconds <= thresholds.ss && ['s', seconds]  ||
            seconds < thresholds.s   && ['ss', seconds] ||
            minutes <= 1             && ['m']           ||
            minutes < thresholds.m   && ['mm', minutes] ||
            hours   <= 1             && ['h']           ||
            hours   < thresholds.h   && ['hh', hours]   ||
            days    <= 1             && ['d']           ||
            days    < thresholds.d   && ['dd', days]    ||
            months  <= 1             && ['M']           ||
            months  < thresholds.M   && ['MM', months]  ||
            years   <= 1             && ['y']           || ['yy', years];

    a[2] = withoutSuffix;
    a[3] = +posNegDuration > 0;
    a[4] = locale;
    return substituteTimeAgo.apply(null, a);
}

// This function allows you to set the rounding function for relative time strings
function getSetRelativeTimeRounding (roundingFunction) {
    if (roundingFunction === undefined) {
        return round;
    }
    if (typeof(roundingFunction) === 'function') {
        round = roundingFunction;
        return true;
    }
    return false;
}

// This function allows you to set a threshold for relative time strings
function getSetRelativeTimeThreshold (threshold, limit) {
    if (thresholds[threshold] === undefined) {
        return false;
    }
    if (limit === undefined) {
        return thresholds[threshold];
    }
    thresholds[threshold] = limit;
    if (threshold === 's') {
        thresholds.ss = limit - 1;
    }
    return true;
}

function humanize (withSuffix) {
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var locale = this.localeData();
    var output = relativeTime$1(this, !withSuffix, locale);

    if (withSuffix) {
        output = locale.pastFuture(+this, output);
    }

    return locale.postformat(output);
}

var abs$1 = Math.abs;

function sign(x) {
    return ((x > 0) - (x < 0)) || +x;
}

function toISOString$1() {
    // for ISO strings we do not use the normal bubbling rules:
    //  * milliseconds bubble up until they become hours
    //  * days do not bubble at all
    //  * months bubble up until they become years
    // This is because there is no context-free conversion between hours and days
    // (think of clock changes)
    // and also not between days and months (28-31 days per month)
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var seconds = abs$1(this._milliseconds) / 1000;
    var days         = abs$1(this._days);
    var months       = abs$1(this._months);
    var minutes, hours, years;

    // 3600 seconds -> 60 minutes -> 1 hour
    minutes           = absFloor(seconds / 60);
    hours             = absFloor(minutes / 60);
    seconds %= 60;
    minutes %= 60;

    // 12 months -> 1 year
    years  = absFloor(months / 12);
    months %= 12;


    // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
    var Y = years;
    var M = months;
    var D = days;
    var h = hours;
    var m = minutes;
    var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
    var total = this.asSeconds();

    if (!total) {
        // this is the same as C#'s (Noda) and python (isodate)...
        // but not other JS (goog.date)
        return 'P0D';
    }

    var totalSign = total < 0 ? '-' : '';
    var ymSign = sign(this._months) !== sign(total) ? '-' : '';
    var daysSign = sign(this._days) !== sign(total) ? '-' : '';
    var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

    return totalSign + 'P' +
        (Y ? ymSign + Y + 'Y' : '') +
        (M ? ymSign + M + 'M' : '') +
        (D ? daysSign + D + 'D' : '') +
        ((h || m || s) ? 'T' : '') +
        (h ? hmsSign + h + 'H' : '') +
        (m ? hmsSign + m + 'M' : '') +
        (s ? hmsSign + s + 'S' : '');
}

var proto$2 = Duration.prototype;

proto$2.isValid        = isValid$1;
proto$2.abs            = abs;
proto$2.add            = add$1;
proto$2.subtract       = subtract$1;
proto$2.as             = as;
proto$2.asMilliseconds = asMilliseconds;
proto$2.asSeconds      = asSeconds;
proto$2.asMinutes      = asMinutes;
proto$2.asHours        = asHours;
proto$2.asDays         = asDays;
proto$2.asWeeks        = asWeeks;
proto$2.asMonths       = asMonths;
proto$2.asYears        = asYears;
proto$2.valueOf        = valueOf$1;
proto$2._bubble        = bubble;
proto$2.clone          = clone$1;
proto$2.get            = get$2;
proto$2.milliseconds   = milliseconds;
proto$2.seconds        = seconds;
proto$2.minutes        = minutes;
proto$2.hours          = hours;
proto$2.days           = days;
proto$2.weeks          = weeks;
proto$2.months         = months;
proto$2.years          = years;
proto$2.humanize       = humanize;
proto$2.toISOString    = toISOString$1;
proto$2.toString       = toISOString$1;
proto$2.toJSON         = toISOString$1;
proto$2.locale         = locale;
proto$2.localeData     = localeData;

// Deprecations
proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
proto$2.lang = lang;

// Side effect imports

// FORMATTING

addFormatToken('X', 0, 0, 'unix');
addFormatToken('x', 0, 0, 'valueOf');

// PARSING

addRegexToken('x', matchSigned);
addRegexToken('X', matchTimestamp);
addParseToken('X', function (input, array, config) {
    config._d = new Date(parseFloat(input, 10) * 1000);
});
addParseToken('x', function (input, array, config) {
    config._d = new Date(toInt(input));
});

// Side effect imports


hooks.version = '2.19.1';

setHookCallback(createLocal);

hooks.fn                    = proto;
hooks.min                   = min;
hooks.max                   = max;
hooks.now                   = now;
hooks.utc                   = createUTC;
hooks.unix                  = createUnix;
hooks.months                = listMonths;
hooks.isDate                = isDate;
hooks.locale                = getSetGlobalLocale;
hooks.invalid               = createInvalid;
hooks.duration              = createDuration;
hooks.isMoment              = isMoment;
hooks.weekdays              = listWeekdays;
hooks.parseZone             = createInZone;
hooks.localeData            = getLocale;
hooks.isDuration            = isDuration;
hooks.monthsShort           = listMonthsShort;
hooks.weekdaysMin           = listWeekdaysMin;
hooks.defineLocale          = defineLocale;
hooks.updateLocale          = updateLocale;
hooks.locales               = listLocales;
hooks.weekdaysShort         = listWeekdaysShort;
hooks.normalizeUnits        = normalizeUnits;
hooks.relativeTimeRounding  = getSetRelativeTimeRounding;
hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
hooks.calendarFormat        = getCalendarFormat;
hooks.prototype             = proto;

return hooks;

})));

/**
 * Cloudinary's JavaScript library - Version 2.1.3
 * Copyright Cloudinary
 * see https://github.com/cloudinary/cloudinary_js
 *
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

(function(root, factory) {
  var name, ref, results, value;
  if ((typeof define === 'function') && define.amd) {
    return define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    return module.exports = factory(require('jquery'));
  } else {
    root.cloudinary || (root.cloudinary = {});
    ref = factory(jQuery);
    results = [];
    for (name in ref) {
      value = ref[name];
      results.push(root.cloudinary[name] = value);
    }
    return results;
  }
})(this, function(jQuery) {

  /**
    * Includes utility methods and lodash / jQuery shims
   */

  /**
    * Get data from the DOM element.
    *
    * This method will use jQuery's `data()` method if it is available, otherwise it will get the `data-` attribute
    * @param {Element} element - the element to get the data from
    * @param {string} name - the name of the data item
    * @returns the value associated with the `name`
    * @function Util.getData
   */
  var ArrayParam, Cloudinary, CloudinaryJQuery, Condition, Configuration, HtmlTag, ImageTag, Layer, LayerParam, Param, RangeParam, RawParam, SubtitlesLayer, TextLayer, Transformation, TransformationBase, TransformationParam, Util, VideoTag, addClass, allStrings, camelCase, cloneDeep, cloudinary, compact, contains, crc32, defaults, difference, functions, getAttribute, getData, hasClass, identity, isEmpty, isString, merge, parameters, reWords, removeAttribute, setAttribute, setAttributes, setData, snakeCase, utf8_encode, webp, width, without;
  getData = function(element, name) {
    return jQuery(element).data(name);
  };

  /**
    * Set data in the DOM element.
    *
    * This method will use jQuery's `data()` method if it is available, otherwise it will set the `data-` attribute
    * @param {Element} element - the element to set the data in
    * @param {string} name - the name of the data item
    * @param {*} value - the value to be set
    *
   */
  setData = function(element, name, value) {
    return jQuery(element).data(name, value);
  };

  /**
    * Get attribute from the DOM element.
    *
    * This method will use jQuery's `attr()` method if it is available, otherwise it will get the attribute directly
    * @param {Element} element - the element to set the attribute for
    * @param {string} name - the name of the attribute
    * @returns {*} the value of the attribute
    *
   */
  getAttribute = function(element, name) {
    return jQuery(element).attr(name);
  };

  /**
    * Set attribute in the DOM element.
    *
    * This method will use jQuery's `attr()` method if it is available, otherwise it will set the attribute directly
    * @param {Element} element - the element to set the attribute for
    * @param {string} name - the name of the attribute
    * @param {*} value - the value to be set
    *
   */
  setAttribute = function(element, name, value) {
    return jQuery(element).attr(name, value);
  };
  removeAttribute = function(element, name) {
    return jQuery(element).removeAttr(name);
  };
  setAttributes = function(element, attributes) {
    return jQuery(element).attr(attributes);
  };
  hasClass = function(element, name) {
    return jQuery(element).hasClass(name);
  };
  addClass = function(element, name) {
    return jQuery(element).addClass(name);
  };
  width = function(element) {
    return jQuery(element).width();
  };
  isEmpty = function(item) {
    return (item == null) || (jQuery.isArray(item) || Util.isString(item)) && item.length === 0 || (jQuery.isPlainObject(item) && jQuery.isEmptyObject(item));
  };
  allStrings = function(list) {
    var item, j, len;
    for (j = 0, len = list.length; j < len; j++) {
      item = list[j];
      if (!Util.isString(item)) {
        return false;
      }
    }
    return true;
  };
  isString = function(item) {
    return typeof item === 'string' || (item != null ? item.toString() : void 0) === '[object String]';
  };
  merge = function() {
    var args, i;
    args = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = arguments.length; j < len; j++) {
        i = arguments[j];
        results.push(i);
      }
      return results;
    }).apply(this, arguments);
    args.unshift(true);
    return jQuery.extend.apply(this, args);
  };

  /** Used to match words to create compound words. */
  reWords = (function() {
    var lower, upper;
    upper = '[A-Z\\xc0-\\xd6\\xd8-\\xde]';
    lower = '[a-z\\xdf-\\xf6\\xf8-\\xff]+';
    return RegExp(upper + '+(?=' + upper + lower + ')|' + upper + '?' + lower + '|' + upper + '+|[0-9]+', 'g');
  })();
  camelCase = function(source) {
    var i, word, words;
    words = source.match(reWords);
    words = (function() {
      var j, len, results;
      results = [];
      for (i = j = 0, len = words.length; j < len; i = ++j) {
        word = words[i];
        word = word.toLocaleLowerCase();
        if (i) {
          results.push(word.charAt(0).toLocaleUpperCase() + word.slice(1));
        } else {
          results.push(word);
        }
      }
      return results;
    })();
    return words.join('');
  };
  snakeCase = function(source) {
    var i, word, words;
    words = source.match(reWords);
    words = (function() {
      var j, len, results;
      results = [];
      for (i = j = 0, len = words.length; j < len; i = ++j) {
        word = words[i];
        results.push(word.toLocaleLowerCase());
      }
      return results;
    })();
    return words.join('_');
  };
  compact = function(arr) {
    var item, j, len, results;
    results = [];
    for (j = 0, len = arr.length; j < len; j++) {
      item = arr[j];
      if (item) {
        results.push(item);
      }
    }
    return results;
  };
  cloneDeep = function() {
    var args;
    args = jQuery.makeArray(arguments);
    args.unshift({});
    args.unshift(true);
    return jQuery.extend.apply(this, args);
  };
  contains = function(arr, item) {
    var i, j, len;
    for (j = 0, len = arr.length; j < len; j++) {
      i = arr[j];
      if (i === item) {
        return true;
      }
    }
    return false;
  };
  defaults = function() {
    var a, args, first, j, len;
    args = [];
    if (arguments.length === 1) {
      return arguments[0];
    }
    for (j = 0, len = arguments.length; j < len; j++) {
      a = arguments[j];
      args.unshift(a);
    }
    first = args.pop();
    args.unshift(first);
    return jQuery.extend.apply(this, args);
  };
  difference = function(arr, values) {
    var item, j, len, results;
    results = [];
    for (j = 0, len = arr.length; j < len; j++) {
      item = arr[j];
      if (!contains(values, item)) {
        results.push(item);
      }
    }
    return results;
  };
  functions = function(object) {
    var i, results;
    results = [];
    for (i in object) {
      if (jQuery.isFunction(object[i])) {
        results.push(i);
      }
    }
    return results;
  };
  identity = function(value) {
    return value;
  };
  without = function(array, item) {
    var i, length, newArray;
    newArray = [];
    i = -1;
    length = array.length;
    while (++i < length) {
      if (array[i] !== item) {
        newArray.push(array[i]);
      }
    }
    return newArray;
  };
  Util = {
    hasClass: hasClass,
    addClass: addClass,
    getAttribute: getAttribute,
    setAttribute: setAttribute,
    removeAttribute: removeAttribute,
    setAttributes: setAttributes,
    getData: getData,
    setData: setData,
    width: width,

    /**
     * Return true if all items in list are strings
     * @param {Array} list - an array of items
     */
    allStrings: allStrings,
    isString: isString,
    isArray: jQuery.isArray,
    isEmpty: isEmpty,

    /**
     * Assign source properties to destination.
     * If the property is an object it is assigned as a whole, overriding the destination object.
     * @param {Object} destination - the object to assign to
     */
    assign: jQuery.extend,

    /**
     * Recursively assign source properties to destination
    * @param {Object} destination - the object to assign to
     * @param {...Object} [sources] The source objects.
     */
    merge: merge,

    /**
     * Convert string to camelCase
     * @param {string} string - the string to convert
     * @return {string} in camelCase format
     */
    camelCase: camelCase,

    /**
     * Convert string to snake_case
     * @param {string} string - the string to convert
     * @return {string} in snake_case format
     */
    snakeCase: snakeCase,

    /**
     * Create a new copy of the given object, including all internal objects.
     * @param {Object} value - the object to clone
     * @return {Object} a new deep copy of the object
     */
    cloneDeep: cloneDeep,

    /**
     * Creates a new array from the parameter with "falsey" values removed
     * @param {Array} array - the array to remove values from
     * @return {Array} a new array without falsey values
     */
    compact: compact,

    /**
     * Check if a given item is included in the given array
     * @param {Array} array - the array to search in
     * @param {*} item - the item to search for
     * @return {boolean} true if the item is included in the array
     */
    contains: contains,

    /**
     * Assign values from sources if they are not defined in the destination.
     * Once a value is set it does not change
     * @param {Object} destination - the object to assign defaults to
     * @param {...Object} source - the source object(s) to assign defaults from
     * @return {Object} destination after it was modified
     */
    defaults: defaults,

    /**
     * Returns values in the given array that are not included in the other array
     * @param {Array} arr - the array to select from
     * @param {Array} values - values to filter from arr
     * @return {Array} the filtered values
     */
    difference: difference,

    /**
     * Returns true if argument is a function.
     * @param {*} value - the value to check
     * @return {boolean} true if the value is a function
     */
    isFunction: jQuery.isFunction,

    /**
     * Returns a list of all the function names in obj
     * @param {Object} object - the object to inspect
     * @return {Array} a list of functions of object
     */
    functions: functions,

    /**
     * Returns the provided value. This functions is used as a default predicate function.
     * @param {*} value
     * @return {*} the provided value
     */
    identity: identity,
    isPlainObject: jQuery.isPlainObject,

    /**
     * Remove leading or trailing spaces from text
     * @param {string} text
     * @return {string} the `text` without leading or trailing spaces
     */
    trim: jQuery.trim,

    /**
     * Creates a new array without the given item.
     * @param {Array} array - original array
     * @param {*} item - the item to exclude from the new array
     * @return {Array} a new array made of the original array's items except for `item`
     */
    without: without
  };

  /**
   * UTF8 encoder
   *
   */
  utf8_encode = function(argString) {
    var c1, enc, end, n, start, string, stringl, utftext;
    if (argString === null || typeof argString === 'undefined') {
      return '';
    }
    string = argString + '';
    utftext = '';
    start = void 0;
    end = void 0;
    stringl = 0;
    start = end = 0;
    stringl = string.length;
    n = 0;
    while (n < stringl) {
      c1 = string.charCodeAt(n);
      enc = null;
      if (c1 < 128) {
        end++;
      } else if (c1 > 127 && c1 < 2048) {
        enc = String.fromCharCode(c1 >> 6 | 192, c1 & 63 | 128);
      } else {
        enc = String.fromCharCode(c1 >> 12 | 224, c1 >> 6 & 63 | 128, c1 & 63 | 128);
      }
      if (enc !== null) {
        if (end > start) {
          utftext += string.slice(start, end);
        }
        utftext += enc;
        start = end = n + 1;
      }
      n++;
    }
    if (end > start) {
      utftext += string.slice(start, stringl);
    }
    return utftext;
  };

  /**
   * CRC32 calculator
   * Depends on 'utf8_encode'
   */
  crc32 = function(str) {
    var crc, i, iTop, table, x, y;
    str = utf8_encode(str);
    table = '00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D';
    crc = 0;
    x = 0;
    y = 0;
    crc = crc ^ -1;
    i = 0;
    iTop = str.length;
    while (i < iTop) {
      y = (crc ^ str.charCodeAt(i)) & 0xFF;
      x = '0x' + table.substr(y * 9, 8);
      crc = crc >>> 8 ^ x;
      i++;
    }
    crc = crc ^ -1;
    if (crc < 0) {
      crc += 4294967296;
    }
    return crc;
  };

  /**
   * Transformation parameters
   * Depends on 'util', 'transformation'
   */
  Param = (function() {

    /**
     * Represents a single parameter
     * @class Param
     * @param {string} name - The name of the parameter in snake_case
     * @param {string} shortName - The name of the serialized form of the parameter.
     *                         If a value is not provided, the parameter will not be serialized.
     * @param {function} [process=cloudinary.Util.identity ] - Manipulate origValue when value is called
     * @ignore
     */
    function Param(name, shortName, process) {
      if (process == null) {
        process = cloudinary.Util.identity;
      }

      /**
       * The name of the parameter in snake_case
       * @member {string} Param#name
       */
      this.name = name;

      /**
       * The name of the serialized form of the parameter
       * @member {string} Param#shortName
       */
      this.shortName = shortName;

      /**
       * Manipulate origValue when value is called
       * @member {function} Param#process
       */
      this.process = process;
    }


    /**
     * Set a (unprocessed) value for this parameter
     * @function Param#set
     * @param {*} origValue - the value of the parameter
     * @return {Param} self for chaining
     */

    Param.prototype.set = function(origValue) {
      this.origValue = origValue;
      return this;
    };


    /**
     * Generate the serialized form of the parameter
     * @function Param#serialize
     * @return {string} the serialized form of the parameter
     */

    Param.prototype.serialize = function() {
      var val, valid;
      val = this.value();
      valid = cloudinary.Util.isArray(val) || cloudinary.Util.isPlainObject(val) || cloudinary.Util.isString(val) ? !cloudinary.Util.isEmpty(val) : val != null;
      if ((this.shortName != null) && valid) {
        return this.shortName + "_" + val;
      } else {
        return '';
      }
    };


    /**
     * Return the processed value of the parameter
     * @function Param#value
     */

    Param.prototype.value = function() {
      return this.process(this.origValue);
    };

    Param.norm_color = function(value) {
      return value != null ? value.replace(/^#/, 'rgb:') : void 0;
    };

    Param.prototype.build_array = function(arg) {
      if (arg == null) {
        arg = [];
      }
      if (cloudinary.Util.isArray(arg)) {
        return arg;
      } else {
        return [arg];
      }
    };


    /**
    * Covert value to video codec string.
    *
    * If the parameter is an object,
    * @param {(string|Object)} param - the video codec as either a String or a Hash
    * @return {string} the video codec string in the format codec:profile:level
    * @example
    * vc_[ :profile : [level]]
    * or
      { codec: 'h264', profile: 'basic', level: '3.1' }
    * @ignore
     */

    Param.process_video_params = function(param) {
      var video;
      switch (param.constructor) {
        case Object:
          video = "";
          if ('codec' in param) {
            video = param['codec'];
            if ('profile' in param) {
              video += ":" + param['profile'];
              if ('level' in param) {
                video += ":" + param['level'];
              }
            }
          }
          return video;
        case String:
          return param;
        default:
          return null;
      }
    };

    return Param;

  })();
  ArrayParam = (function(superClass) {
    extend(ArrayParam, superClass);


    /**
     * A parameter that represents an array
     * @param {string} name - The name of the parameter in snake_case
     * @param {string} shortName - The name of the serialized form of the parameter
     *                         If a value is not provided, the parameter will not be serialized.
     * @param {string} [sep='.'] - The separator to use when joining the array elements together
     * @param {function} [process=cloudinary.Util.identity ] - Manipulate origValue when value is called
     * @class ArrayParam
     * @extends Param
     * @ignore
     */

    function ArrayParam(name, shortName, sep, process) {
      if (sep == null) {
        sep = '.';
      }
      this.sep = sep;
      ArrayParam.__super__.constructor.call(this, name, shortName, process);
    }

    ArrayParam.prototype.serialize = function() {
      var array, flat, t;
      if (this.shortName != null) {
        array = this.value();
        if (cloudinary.Util.isEmpty(array)) {
          return '';
        } else {
          flat = (function() {
            var j, len, ref, results;
            ref = this.value();
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              t = ref[j];
              if (cloudinary.Util.isFunction(t.serialize)) {
                results.push(t.serialize());
              } else {
                results.push(t);
              }
            }
            return results;
          }).call(this);
          return this.shortName + "_" + (flat.join(this.sep));
        }
      } else {
        return '';
      }
    };

    ArrayParam.prototype.set = function(origValue) {
      if ((origValue == null) || cloudinary.Util.isArray(origValue)) {
        return ArrayParam.__super__.set.call(this, origValue);
      } else {
        return ArrayParam.__super__.set.call(this, [origValue]);
      }
    };

    return ArrayParam;

  })(Param);
  TransformationParam = (function(superClass) {
    extend(TransformationParam, superClass);


    /**
     * A parameter that represents a transformation
     * @param {string} name - The name of the parameter in snake_case
     * @param {string} [shortName='t'] - The name of the serialized form of the parameter
     * @param {string} [sep='.'] - The separator to use when joining the array elements together
     * @param {function} [process=cloudinary.Util.identity ] - Manipulate origValue when value is called
     * @class TransformationParam
     * @extends Param
     * @ignore
     */

    function TransformationParam(name, shortName, sep, process) {
      if (shortName == null) {
        shortName = "t";
      }
      if (sep == null) {
        sep = '.';
      }
      this.sep = sep;
      TransformationParam.__super__.constructor.call(this, name, shortName, process);
    }

    TransformationParam.prototype.serialize = function() {
      var joined, result, t;
      if (cloudinary.Util.isEmpty(this.value())) {
        return '';
      } else if (cloudinary.Util.allStrings(this.value())) {
        joined = this.value().join(this.sep);
        if (!cloudinary.Util.isEmpty(joined)) {
          return this.shortName + "_" + joined;
        } else {
          return '';
        }
      } else {
        result = (function() {
          var j, len, ref, results;
          ref = this.value();
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            t = ref[j];
            if (t != null) {
              if (cloudinary.Util.isString(t) && !cloudinary.Util.isEmpty(t)) {
                results.push(this.shortName + "_" + t);
              } else if (cloudinary.Util.isFunction(t.serialize)) {
                results.push(t.serialize());
              } else if (cloudinary.Util.isPlainObject(t) && !cloudinary.Util.isEmpty(t)) {
                results.push(new Transformation(t).serialize());
              } else {
                results.push(void 0);
              }
            }
          }
          return results;
        }).call(this);
        return cloudinary.Util.compact(result);
      }
    };

    TransformationParam.prototype.set = function(origValue1) {
      this.origValue = origValue1;
      if (cloudinary.Util.isArray(this.origValue)) {
        return TransformationParam.__super__.set.call(this, this.origValue);
      } else {
        return TransformationParam.__super__.set.call(this, [this.origValue]);
      }
    };

    return TransformationParam;

  })(Param);
  RangeParam = (function(superClass) {
    extend(RangeParam, superClass);


    /**
     * A parameter that represents a range
     * @param {string} name - The name of the parameter in snake_case
     * @param {string} shortName - The name of the serialized form of the parameter
     *                         If a value is not provided, the parameter will not be serialized.
     * @param {function} [process=norm_range_value ] - Manipulate origValue when value is called
     * @class RangeParam
     * @extends Param
     * @ignore
     */

    function RangeParam(name, shortName, process) {
      if (process == null) {
        process = this.norm_range_value;
      }
      RangeParam.__super__.constructor.call(this, name, shortName, process);
    }

    RangeParam.norm_range_value = function(value) {
      var modifier, offset;
      offset = String(value).match(new RegExp('^' + offset_any_pattern + '$'));
      if (offset) {
        modifier = offset[5] != null ? 'p' : '';
        value = (offset[1] || offset[4]) + modifier;
      }
      return value;
    };

    return RangeParam;

  })(Param);
  RawParam = (function(superClass) {
    extend(RawParam, superClass);

    function RawParam(name, shortName, process) {
      if (process == null) {
        process = cloudinary.Util.identity;
      }
      RawParam.__super__.constructor.call(this, name, shortName, process);
    }

    RawParam.prototype.serialize = function() {
      return this.value();
    };

    return RawParam;

  })(Param);
  LayerParam = (function(superClass) {
    var LAYER_KEYWORD_PARAMS;

    extend(LayerParam, superClass);

    function LayerParam() {
      return LayerParam.__super__.constructor.apply(this, arguments);
    }

    LayerParam.prototype.value = function() {
      var components, format, layer, publicId, resourceType, text, textStyle, type;
      layer = this.origValue;
      if (cloudinary.Util.isPlainObject(layer)) {
        publicId = layer.public_id;
        format = layer.format;
        resourceType = layer.resource_type || "image";
        type = layer.type || "upload";
        text = layer.text;
        textStyle = null;
        components = [];
        if (publicId != null) {
          publicId = publicId.replace(/\//g, ":");
          if (format != null) {
            publicId = publicId + "." + format;
          }
        }
        if ((text == null) && resourceType !== "text") {
          if (cloudinary.Util.isEmpty(publicId)) {
            throw "Must supply public_id for resource_type layer_parameter";
          }
          if (resourceType === "subtitles") {
            textStyle = this.textStyle(layer);
          }
        } else {
          resourceType = "text";
          type = null;
          textStyle = this.textStyle(layer);
          if (text != null) {
            if (!((publicId != null) ^ (textStyle != null))) {
              throw "Must supply either style parameters or a public_id when providing text parameter in a text overlay/underlay";
            }
            text = cloudinary.Util.smart_escape(cloudinary.Util.smart_escape(text, /([,\/])/));
          }
        }
        if (resourceType !== "image") {
          components.push(resourceType);
        }
        if (type !== "upload") {
          components.push(type);
        }
        components.push(textStyle);
        components.push(publicId);
        components.push(text);
        layer = cloudinary.Util.compact(components).join(":");
      }
      return layer;
    };

    LAYER_KEYWORD_PARAMS = [["font_weight", "normal"], ["font_style", "normal"], ["text_decoration", "none"], ["text_align", null], ["stroke", "none"]];

    LayerParam.prototype.textStyle = function(layer) {
      var attr, defaultValue, fontFamily, fontSize, keywords, letterSpacing, lineSpacing;
      fontFamily = layer.font_family;
      fontSize = layer.font_size;
      keywords = (function() {
        var j, len, ref, results;
        results = [];
        for (j = 0, len = LAYER_KEYWORD_PARAMS.length; j < len; j++) {
          ref = LAYER_KEYWORD_PARAMS[j], attr = ref[0], defaultValue = ref[1];
          if (layer[attr] !== defaultValue) {
            results.push(layer[attr]);
          }
        }
        return results;
      })();
      letterSpacing = layer.letter_spacing;
      if (!cloudinary.Util.isEmpty(letterSpacing)) {
        keywords.push("letter_spacing_" + letterSpacing);
      }
      lineSpacing = layer.line_spacing;
      if (!cloudinary.Util.isEmpty(lineSpacing)) {
        keywords.push("line_spacing_" + lineSpacing);
      }
      if (!cloudinary.Util.isEmpty(fontSize) || !cloudinary.Util.isEmpty(fontFamily) || !cloudinary.Util.isEmpty(keywords)) {
        if (cloudinary.Util.isEmpty(fontFamily)) {
          throw "Must supply font_family for text in overlay/underlay";
        }
        if (cloudinary.Util.isEmpty(fontSize)) {
          throw "Must supply font_size for text in overlay/underlay";
        }
        keywords.unshift(fontSize);
        keywords.unshift(fontFamily);
        return cloudinary.Util.compact(keywords).join("_");
      }
    };

    return LayerParam;

  })(Param);
  parameters = {};
  parameters.Param = Param;
  parameters.ArrayParam = ArrayParam;
  parameters.RangeParam = RangeParam;
  parameters.RawParam = RawParam;
  parameters.TransformationParam = TransformationParam;
  parameters.LayerParam = LayerParam;
  Condition = (function() {

    /**
     * @internal
     */
    Condition.OPERATORS = {
      "=": 'eq',
      "!=": 'ne',
      "<": 'lt',
      ">": 'gt',
      "<=": 'lte',
      ">=": 'gte',
      "&&": 'and',
      "||": 'or'
    };

    Condition.PARAMETERS = {
      "width": "w",
      "height": "h",
      "aspect_ratio": "ar",
      "aspectRatio": "ar",
      "page_count": "pc",
      "pageCount": "pc",
      "face_count": "fc",
      "faceCount": "fc"
    };

    Condition.BOUNDRY = "[ _]+";


    /**
     * Represents a transformation condition
     * @param {string} conditionStr - a condition in string format
     * @class Condition
     * @example
     * // normally this class is not instantiated directly
     * var tr = cloudinary.Transformation.new()
     *    .if().width( ">", 1000).and().aspectRatio("<", "3:4").then()
     *      .width(1000)
     *      .crop("scale")
     *    .else()
     *      .width(500)
     *      .crop("scale")
     *
     * var tr = cloudinary.Transformation.new()
     *    .if("w > 1000 and aspectRatio < 3:4")
     *      .width(1000)
     *      .crop("scale")
     *    .else()
     *      .width(500)
     *      .crop("scale")
     *
     */

    function Condition(conditionStr) {
      this.predicate_list = [];
      if (conditionStr != null) {
        this.predicate_list.push(this.normalize(conditionStr));
      }
    }


    /**
     * Convenience constructor method
     * @function Condition.new
     */

    Condition["new"] = function(conditionStr) {
      return new this(conditionStr);
    };


    /**
     * Normalize a string condition
     * @function Cloudinary#normalize
     * @param {string} value a condition, e.g. "w gt 100", "width_gt_100", "width > 100"
     * @return {string} the normalized form of the value condition, e.g. "w_gt_100"
     */

    Condition.prototype.normalize = function(value) {
      var replaceRE;
      replaceRE = new RegExp("(" + Object.keys(Condition.PARAMETERS).join("|") + "|[=<>&|!]+)", "g");
      value = value.replace(replaceRE, function(match) {
        return Condition.OPERATORS[match] || Condition.PARAMETERS[match];
      });
      return value.replace(/[ _]+/g, '_');
    };


    /**
     * Get the parent transformation of this condition
     * @return Transformation
     */

    Condition.prototype.getParent = function() {
      return this.parent;
    };


    /**
     * Set the parent transformation of this condition
     * @param {Transformation} the parent transformation
     * @return {Condition} this condition
     */

    Condition.prototype.setParent = function(parent) {
      this.parent = parent;
      return this;
    };


    /**
     * Serialize the condition
     * @return {string} the condition as a string
     */

    Condition.prototype.toString = function() {
      return this.predicate_list.join("_");
    };


    /**
     * Add a condition
     * @function Condition#predicate
     * @internal
     */

    Condition.prototype.predicate = function(name, operator, value) {
      if (Condition.OPERATORS[operator] != null) {
        operator = Condition.OPERATORS[operator];
      }
      this.predicate_list.push(name + "_" + operator + "_" + value);
      return this;
    };


    /**
     * @function Condition#and
     */

    Condition.prototype.and = function() {
      this.predicate_list.push("and");
      return this;
    };


    /**
     * @function Condition#or
     */

    Condition.prototype.or = function() {
      this.predicate_list.push("or");
      return this;
    };


    /**
     * Conclude condition
     * @function Condition#then
     * @return {Transformation} the transformation this condition is defined for
     */

    Condition.prototype.then = function() {
      return this.getParent()["if"](this.toString());
    };


    /**
     * @function Condition#height
     * @param {string} operator the comparison operator (e.g. "<", "lt")
     * @param {string|number} value the right hand side value
     * @return {Condition} this condition
     */

    Condition.prototype.height = function(operator, value) {
      return this.predicate("h", operator, value);
    };


    /**
     * @function Condition#width
     * @param {string} operator the comparison operator (e.g. "<", "lt")
     * @param {string|number} value the right hand side value
     * @return {Condition} this condition
     */

    Condition.prototype.width = function(operator, value) {
      return this.predicate("w", operator, value);
    };


    /**
     * @function Condition#aspectRatio
     * @param {string} operator the comparison operator (e.g. "<", "lt")
     * @param {string|number} value the right hand side value
     * @return {Condition} this condition
     */

    Condition.prototype.aspectRatio = function(operator, value) {
      return this.predicate("ar", operator, value);
    };


    /**
     * @function Condition#pages
     * @param {string} operator the comparison operator (e.g. "<", "lt")
     * @param {string|number} value the right hand side value
     * @return {Condition} this condition
     */

    Condition.prototype.pageCount = function(operator, value) {
      return this.predicate("pc", operator, value);
    };


    /**
     * @function Condition#faces
     * @param {string} operator the comparison operator (e.g. "<", "lt")
     * @param {string|number} value the right hand side value
     * @return {Condition} this condition
     */

    Condition.prototype.faceCount = function(operator, value) {
      return this.predicate("fc", operator, value);
    };

    return Condition;

  })();

  /**
   * TransformationBase
   * Depends on 'configuration', 'parameters','util'
   * @internal
   */
  TransformationBase = (function() {
    var lastArgCallback;

    TransformationBase.prototype.trans_separator = '/';

    TransformationBase.prototype.param_separator = ',';

    lastArgCallback = function(args) {
      var callback;
      callback = args != null ? args[args.length - 1] : void 0;
      if (Util.isFunction(callback)) {
        return callback;
      } else {
        return void 0;
      }
    };


    /**
     * The base class for transformations.
     * Members of this class are documented as belonging to the {@link Transformation} class for convenience.
     * @class TransformationBase
     */

    function TransformationBase(options) {
      var m, parent, trans;
      if (options == null) {
        options = {};
      }

      /** @private */
      parent = void 0;

      /** @private */
      trans = {};

      /**
       * Return an options object that can be used to create an identical Transformation
       * @function Transformation#toOptions
       * @return {Object} Returns a plain object representing this transformation
       */
      this.toOptions || (this.toOptions = function(withChain) {
        var key, list, opt, ref, tr, value;
        if (withChain == null) {
          withChain = true;
        }
        opt = {};
        for (key in trans) {
          value = trans[key];
          opt[key] = value.origValue;
        }
        ref = this.otherOptions;
        for (key in ref) {
          value = ref[key];
          if (value !== void 0) {
            opt[key] = value;
          }
        }
        if (withChain && !Util.isEmpty(this.chained)) {
          list = (function() {
            var j, len, ref1, results;
            ref1 = this.chained;
            results = [];
            for (j = 0, len = ref1.length; j < len; j++) {
              tr = ref1[j];
              results.push(tr.toOptions());
            }
            return results;
          }).call(this);
          list.push(opt);
          opt = {
            transformation: list
          };
        }
        return opt;
      });

      /**
       * Set a parent for this object for chaining purposes.
       *
       * @function Transformation#setParent
       * @param {Object} object - the parent to be assigned to
       * @returns {Transformation} Returns this instance for chaining purposes.
       */
      this.setParent || (this.setParent = function(object) {
        parent = object;
        if (object != null) {
          this.fromOptions(typeof object.toOptions === "function" ? object.toOptions() : void 0);
        }
        return this;
      });

      /**
       * Returns the parent of this object in the chain
       * @function Transformation#getParent
       * @protected
       * @return {Object} Returns the parent of this object if there is any
       */
      this.getParent || (this.getParent = function() {
        return parent;
      });

      /** @protected */
      this.param || (this.param = function(value, name, abbr, defaultValue, process) {
        if (process == null) {
          if (Util.isFunction(defaultValue)) {
            process = defaultValue;
          } else {
            process = Util.identity;
          }
        }
        trans[name] = new Param(name, abbr, process).set(value);
        return this;
      });

      /** @protected */
      this.rawParam || (this.rawParam = function(value, name, abbr, defaultValue, process) {
        if (process == null) {
          process = Util.identity;
        }
        process = lastArgCallback(arguments);
        trans[name] = new RawParam(name, abbr, process).set(value);
        return this;
      });

      /** @protected */
      this.rangeParam || (this.rangeParam = function(value, name, abbr, defaultValue, process) {
        if (process == null) {
          process = Util.identity;
        }
        process = lastArgCallback(arguments);
        trans[name] = new RangeParam(name, abbr, process).set(value);
        return this;
      });

      /** @protected */
      this.arrayParam || (this.arrayParam = function(value, name, abbr, sep, defaultValue, process) {
        if (sep == null) {
          sep = ":";
        }
        if (defaultValue == null) {
          defaultValue = [];
        }
        if (process == null) {
          process = Util.identity;
        }
        process = lastArgCallback(arguments);
        trans[name] = new ArrayParam(name, abbr, sep, process).set(value);
        return this;
      });

      /** @protected */
      this.transformationParam || (this.transformationParam = function(value, name, abbr, sep, defaultValue, process) {
        if (sep == null) {
          sep = ".";
        }
        if (process == null) {
          process = Util.identity;
        }
        process = lastArgCallback(arguments);
        trans[name] = new TransformationParam(name, abbr, sep, process).set(value);
        return this;
      });
      this.layerParam || (this.layerParam = function(value, name, abbr) {
        trans[name] = new LayerParam(name, abbr).set(value);
        return this;
      });

      /**
       * Get the value associated with the given name.
       * @function Transformation#getValue
       * @param {string} name - the name of the parameter
       * @return {*} the processed value associated with the given name
       * @description Use {@link get}.origValue for the value originally provided for the parameter
       */
      this.getValue || (this.getValue = function(name) {
        var ref, ref1;
        return (ref = (ref1 = trans[name]) != null ? ref1.value() : void 0) != null ? ref : this.otherOptions[name];
      });

      /**
       * Get the parameter object for the given parameter name
       * @function Transformation#get
       * @param {string} name the name of the transformation parameter
       * @returns {Param} the param object for the given name, or undefined
       */
      this.get || (this.get = function(name) {
        return trans[name];
      });

      /**
       * Remove a transformation option from the transformation.
       * @function Transformation#remove
       * @param {string} name - the name of the option to remove
       * @return {*} Returns the option that was removed or null if no option by that name was found. The type of the
       *              returned value depends on the value.
       */
      this.remove || (this.remove = function(name) {
        var temp;
        switch (false) {
          case trans[name] == null:
            temp = trans[name];
            delete trans[name];
            return temp.origValue;
          case this.otherOptions[name] == null:
            temp = this.otherOptions[name];
            delete this.otherOptions[name];
            return temp;
          default:
            return null;
        }
      });

      /**
       * Return an array of all the keys (option names) in the transformation.
       * @return {Array<string>} the keys in snakeCase format
       */
      this.keys || (this.keys = function() {
        var key;
        return ((function() {
          var results;
          results = [];
          for (key in trans) {
            results.push(Util.snakeCase(key));
          }
          return results;
        })()).sort();
      });

      /**
       * Returns a plain object representation of the transformation. Values are processed.
       * @function Transformation#toPlainObject
       * @return {Object} the transformation options as plain object
       */
      this.toPlainObject || (this.toPlainObject = function() {
        var hash, key, list, tr;
        hash = {};
        for (key in trans) {
          hash[key] = trans[key].value();
          if (Util.isPlainObject(hash[key])) {
            hash[key] = Util.cloneDeep(hash[key]);
          }
        }
        if (!Util.isEmpty(this.chained)) {
          list = (function() {
            var j, len, ref, results;
            ref = this.chained;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              tr = ref[j];
              results.push(tr.toPlainObject());
            }
            return results;
          }).call(this);
          list.push(hash);
          hash = {
            transformation: list
          };
        }
        return hash;
      });

      /**
       * Complete the current transformation and chain to a new one.
       * In the URL, transformations are chained together by slashes.
       * @function Transformation#chain
       * @return {Transformation} Returns this transformation for chaining
       * @example
       * var tr = cloudinary.Transformation.new();
       * tr.width(10).crop('fit').chain().angle(15).serialize()
       * // produces "c_fit,w_10/a_15"
       */
      this.chain || (this.chain = function() {
        var names, tr;
        names = Object.getOwnPropertyNames(trans);
        if (names.length !== 0) {
          tr = new this.constructor(this.toOptions(false));
          this.resetTransformations();
          this.chained.push(tr);
        }
        return this;
      });
      this.resetTransformations || (this.resetTransformations = function() {
        trans = {};
        return this;
      });
      this.otherOptions || (this.otherOptions = {});

      /**
       * Transformation Class methods.
       * This is a list of the parameters defined in Transformation.
       * Values are camelCased.
       * @private
       * @ignore
       * @type {Array<string>}
       */
      this.methods || (this.methods = Util.difference(Util.functions(Transformation.prototype), Util.functions(TransformationBase.prototype)));

      /**
       * Parameters that are filtered out before passing the options to an HTML tag.
       *
       * The list of parameters is a combination of `Transformation::methods` and `Configuration::CONFIG_PARAMS`
       * @const {Array<string>} Transformation.PARAM_NAMES
       * @private
       * @ignore
       * @see toHtmlAttributes
       */
      this.PARAM_NAMES || (this.PARAM_NAMES = ((function() {
        var j, len, ref, results;
        ref = this.methods;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          m = ref[j];
          results.push(Util.snakeCase(m));
        }
        return results;
      }).call(this)).concat(Configuration.CONFIG_PARAMS));
      this.chained = [];
      if (!Util.isEmpty(options)) {
        this.fromOptions(options);
      }
    }


    /**
     * Merge the provided options with own's options
     * @param {Object} [options={}] key-value list of options
     * @returns {Transformation} Returns this instance for chaining
     */

    TransformationBase.prototype.fromOptions = function(options) {
      var key, opt;
      if (options instanceof TransformationBase) {
        this.fromTransformation(options);
      } else {
        options || (options = {});
        if (Util.isString(options) || Util.isArray(options)) {
          options = {
            transformation: options
          };
        }
        options = Util.cloneDeep(options, function(value) {
          if (value instanceof TransformationBase) {
            return new value.constructor(value.toOptions());
          }
        });
        for (key in options) {
          opt = options[key];
          this.set(key, opt);
        }
      }
      return this;
    };

    TransformationBase.prototype.fromTransformation = function(other) {
      var j, key, len, ref;
      if (other instanceof TransformationBase) {
        ref = other.keys();
        for (j = 0, len = ref.length; j < len; j++) {
          key = ref[j];
          this.set(key, other.get(key).origValue);
        }
      }
      return this;
    };


    /**
     * Set a parameter.
     * The parameter name `key` is converted to
     * @param {string} key - the name of the parameter
     * @param {*} value - the value of the parameter
     * @returns {Transformation} Returns this instance for chaining
     */

    TransformationBase.prototype.set = function(key, value) {
      var camelKey;
      camelKey = Util.camelCase(key);
      if (Util.contains(this.methods, camelKey)) {
        this[camelKey](value);
      } else {
        this.otherOptions[key] = value;
      }
      return this;
    };

    TransformationBase.prototype.hasLayer = function() {
      return this.getValue("overlay") || this.getValue("underlay");
    };


    /**
     * Generate a string representation of the transformation.
     * @function Transformation#serialize
     * @return {string} Returns the transformation as a string
     */

    TransformationBase.prototype.serialize = function() {
      var ifParam, paramList, ref, ref1, resultArray, t, tr, transformationList, transformationString, transformations, value;
      resultArray = (function() {
        var j, len, ref, results;
        ref = this.chained;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          tr = ref[j];
          results.push(tr.serialize());
        }
        return results;
      }).call(this);
      paramList = this.keys();
      transformations = (ref = this.get("transformation")) != null ? ref.serialize() : void 0;
      ifParam = (ref1 = this.get("if")) != null ? ref1.serialize() : void 0;
      paramList = Util.difference(paramList, ["transformation", "if"]);
      transformationList = (function() {
        var j, len, ref2, results;
        results = [];
        for (j = 0, len = paramList.length; j < len; j++) {
          t = paramList[j];
          results.push((ref2 = this.get(t)) != null ? ref2.serialize() : void 0);
        }
        return results;
      }).call(this);
      switch (false) {
        case !Util.isString(transformations):
          transformationList.push(transformations);
          break;
        case !Util.isArray(transformations):
          resultArray = resultArray.concat(transformations);
      }
      transformationList = ((function() {
        var j, len, results;
        results = [];
        for (j = 0, len = transformationList.length; j < len; j++) {
          value = transformationList[j];
          if (Util.isArray(value) && !Util.isEmpty(value) || !Util.isArray(value) && value) {
            results.push(value);
          }
        }
        return results;
      })()).sort();
      if (ifParam === "if_end") {
        transformationList.push(ifParam);
      } else if (!Util.isEmpty(ifParam)) {
        transformationList.unshift(ifParam);
      }
      transformationString = transformationList.join(this.param_separator);
      if (!Util.isEmpty(transformationString)) {
        resultArray.push(transformationString);
      }
      return Util.compact(resultArray).join(this.trans_separator);
    };


    /**
     * Provide a list of all the valid transformation option names
     * @function Transformation#listNames
     * @private
     * @return {Array<string>} a array of all the valid option names
     */

    TransformationBase.prototype.listNames = function() {
      return this.methods;
    };


    /**
     * Returns attributes for an HTML tag.
     * @function Cloudinary.toHtmlAttributes
     * @return PlainObject
     */

    TransformationBase.prototype.toHtmlAttributes = function() {
      var attrName, height, j, key, len, options, ref, ref1, ref2, ref3, value;
      options = {};
      ref = this.otherOptions;
      for (key in ref) {
        value = ref[key];
        if (!(!Util.contains(this.PARAM_NAMES, key))) {
          continue;
        }
        attrName = /^html_/.test(key) ? key.slice(5) : key;
        options[attrName] = value;
      }
      ref1 = this.keys();
      for (j = 0, len = ref1.length; j < len; j++) {
        key = ref1[j];
        if (/^html_/.test(key)) {
          options[key.slice(5)] = this.getValue(key);
        }
      }
      if (!(this.hasLayer() || this.getValue("angle") || Util.contains(["fit", "limit", "lfill"], this.getValue("crop")))) {
        width = (ref2 = this.get("width")) != null ? ref2.origValue : void 0;
        height = (ref3 = this.get("height")) != null ? ref3.origValue : void 0;
        if (parseFloat(width) >= 1.0) {
          if (options['width'] == null) {
            options['width'] = width;
          }
        }
        if (parseFloat(height) >= 1.0) {
          if (options['height'] == null) {
            options['height'] = height;
          }
        }
      }
      return options;
    };

    TransformationBase.prototype.isValidParamName = function(name) {
      return this.methods.indexOf(Util.camelCase(name)) >= 0;
    };


    /**
     * Delegate to the parent (up the call chain) to produce HTML
     * @function Transformation#toHtml
     * @return {string} HTML representation of the parent if possible.
     * @example
     * tag = cloudinary.ImageTag.new("sample", {cloud_name: "demo"})
     * // ImageTag {name: "img", publicId: "sample"}
     * tag.toHtml()
     * // <img src="http://res.cloudinary.com/demo/image/upload/sample">
     * tag.transformation().crop("fit").width(300).toHtml()
     * // <img src="http://res.cloudinary.com/demo/image/upload/c_fit,w_300/sample">
     */

    TransformationBase.prototype.toHtml = function() {
      var ref;
      return (ref = this.getParent()) != null ? typeof ref.toHtml === "function" ? ref.toHtml() : void 0 : void 0;
    };

    TransformationBase.prototype.toString = function() {
      return this.serialize();
    };

    return TransformationBase;

  })();
  Transformation = (function(superClass) {
    extend(Transformation, superClass);


    /**
     *  Represents a single transformation.
     *  @class Transformation
     *  @example
     *  t = new cloudinary.Transformation();
     * t.angle(20).crop("scale").width("auto");
     *
     * // or
     *
     * t = new cloudinary.Transformation( {angle: 20, crop: "scale", width: "auto"});
     */

    function Transformation(options) {
      if (options == null) {
        options = {};
      }
      Transformation.__super__.constructor.call(this, options);
    }


    /**
     * Convenience constructor
     * @param {Object} options
     * @return {Transformation}
     * @example cl = cloudinary.Transformation.new( {angle: 20, crop: "scale", width: "auto"})
     */

    Transformation["new"] = function(args) {
      return new Transformation(args);
    };


    /*
      Transformation Parameters
     */

    Transformation.prototype.angle = function(value) {
      return this.arrayParam(value, "angle", "a", ".");
    };

    Transformation.prototype.audioCodec = function(value) {
      return this.param(value, "audio_codec", "ac");
    };

    Transformation.prototype.audioFrequency = function(value) {
      return this.param(value, "audio_frequency", "af");
    };

    Transformation.prototype.aspectRatio = function(value) {
      return this.param(value, "aspect_ratio", "ar");
    };

    Transformation.prototype.background = function(value) {
      return this.param(value, "background", "b", Param.norm_color);
    };

    Transformation.prototype.bitRate = function(value) {
      return this.param(value, "bit_rate", "br");
    };

    Transformation.prototype.border = function(value) {
      return this.param(value, "border", "bo", function(border) {
        if (Util.isPlainObject(border)) {
          border = Util.assign({}, {
            color: "black",
            width: 2
          }, border);
          return border.width + "px_solid_" + (Param.norm_color(border.color));
        } else {
          return border;
        }
      });
    };

    Transformation.prototype.color = function(value) {
      return this.param(value, "color", "co", Param.norm_color);
    };

    Transformation.prototype.colorSpace = function(value) {
      return this.param(value, "color_space", "cs");
    };

    Transformation.prototype.crop = function(value) {
      return this.param(value, "crop", "c");
    };

    Transformation.prototype.defaultImage = function(value) {
      return this.param(value, "default_image", "d");
    };

    Transformation.prototype.delay = function(value) {
      return this.param(value, "delay", "l");
    };

    Transformation.prototype.density = function(value) {
      return this.param(value, "density", "dn");
    };

    Transformation.prototype.duration = function(value) {
      return this.rangeParam(value, "duration", "du");
    };

    Transformation.prototype.dpr = function(value) {
      return this.param(value, "dpr", "dpr", (function(_this) {
        return function(dpr) {
          dpr = dpr.toString();
          if ((dpr === "auto") && _this.getValue("client_hints") !== true) {
            return "1.0";
          } else if (dpr != null ? dpr.match(/^\d+$/) : void 0) {
            return dpr + ".0";
          } else {
            return dpr;
          }
        };
      })(this));
    };

    Transformation.prototype.effect = function(value) {
      return this.arrayParam(value, "effect", "e", ":");
    };

    Transformation.prototype["else"] = function() {
      return this["if"]('else');
    };

    Transformation.prototype.endIf = function() {
      return this["if"]('end');
    };

    Transformation.prototype.endOffset = function(value) {
      return this.rangeParam(value, "end_offset", "eo");
    };

    Transformation.prototype.fallbackContent = function(value) {
      return this.param(value, "fallback_content");
    };

    Transformation.prototype.fetchFormat = function(value) {
      return this.param(value, "fetch_format", "f");
    };

    Transformation.prototype.format = function(value) {
      return this.param(value, "format");
    };

    Transformation.prototype.flags = function(value) {
      return this.arrayParam(value, "flags", "fl", ".");
    };

    Transformation.prototype.gravity = function(value) {
      return this.param(value, "gravity", "g");
    };

    Transformation.prototype.height = function(value) {
      return this.param(value, "height", "h", (function(_this) {
        return function() {
          if (_this.getValue("crop") || _this.getValue("overlay") || _this.getValue("underlay")) {
            return value;
          } else {
            return null;
          }
        };
      })(this));
    };

    Transformation.prototype.htmlHeight = function(value) {
      return this.param(value, "html_height");
    };

    Transformation.prototype.htmlWidth = function(value) {
      return this.param(value, "html_width");
    };

    Transformation.prototype["if"] = function(value) {
      var i, ifVal, j, ref, trIf, trRest;
      if (value == null) {
        value = "";
      }
      switch (value) {
        case "else":
          this.chain();
          return this.param(value, "if", "if");
        case "end":
          this.chain();
          for (i = j = ref = this.chained.length - 1; j >= 0; i = j += -1) {
            ifVal = this.chained[i].getValue("if");
            if (ifVal === "end") {
              break;
            } else if (ifVal != null) {
              trIf = Transformation["new"]()["if"](ifVal);
              this.chained[i].remove("if");
              trRest = this.chained[i];
              this.chained[i] = Transformation["new"]().transformation([trIf, trRest]);
              if (ifVal !== "else") {
                break;
              }
            }
          }
          return this.param(value, "if", "if");
        case "":
          return Condition["new"]().setParent(this);
        default:
          return this.param(value, "if", "if", function(value) {
            return Condition["new"](value).toString();
          });
      }
    };

    Transformation.prototype.keyframeInterval = function(value) {
      return this.param(value, "keyframe_interval", "ki");
    };

    Transformation.prototype.offset = function(value) {
      var end_o, ref, start_o;
      ref = Util.isFunction(value != null ? value.split : void 0) ? value.split('..') : Util.isArray(value) ? value : [null, null], start_o = ref[0], end_o = ref[1];
      if (start_o != null) {
        this.startOffset(start_o);
      }
      if (end_o != null) {
        return this.endOffset(end_o);
      }
    };

    Transformation.prototype.opacity = function(value) {
      return this.param(value, "opacity", "o");
    };

    Transformation.prototype.overlay = function(value) {
      return this.layerParam(value, "overlay", "l");
    };

    Transformation.prototype.page = function(value) {
      return this.param(value, "page", "pg");
    };

    Transformation.prototype.poster = function(value) {
      return this.param(value, "poster");
    };

    Transformation.prototype.prefix = function(value) {
      return this.param(value, "prefix", "p");
    };

    Transformation.prototype.quality = function(value) {
      return this.param(value, "quality", "q");
    };

    Transformation.prototype.radius = function(value) {
      return this.param(value, "radius", "r");
    };

    Transformation.prototype.rawTransformation = function(value) {
      return this.rawParam(value, "raw_transformation");
    };

    Transformation.prototype.size = function(value) {
      var height, ref;
      if (Util.isFunction(value != null ? value.split : void 0)) {
        ref = value.split('x'), width = ref[0], height = ref[1];
        this.width(width);
        return this.height(height);
      }
    };

    Transformation.prototype.sourceTypes = function(value) {
      return this.param(value, "source_types");
    };

    Transformation.prototype.sourceTransformation = function(value) {
      return this.param(value, "source_transformation");
    };

    Transformation.prototype.startOffset = function(value) {
      return this.rangeParam(value, "start_offset", "so");
    };

    Transformation.prototype.streamingProfile = function(value) {
      return this.param(value, "streaming_profile", "sp");
    };

    Transformation.prototype.transformation = function(value) {
      return this.transformationParam(value, "transformation", "t");
    };

    Transformation.prototype.underlay = function(value) {
      return this.layerParam(value, "underlay", "u");
    };

    Transformation.prototype.videoCodec = function(value) {
      return this.param(value, "video_codec", "vc", Param.process_video_params);
    };

    Transformation.prototype.videoSampling = function(value) {
      return this.param(value, "video_sampling", "vs");
    };

    Transformation.prototype.width = function(value) {
      return this.param(value, "width", "w", (function(_this) {
        return function() {
          if (_this.getValue("crop") || _this.getValue("overlay") || _this.getValue("underlay")) {
            return value;
          } else {
            return null;
          }
        };
      })(this));
    };

    Transformation.prototype.x = function(value) {
      return this.param(value, "x", "x");
    };

    Transformation.prototype.y = function(value) {
      return this.param(value, "y", "y");
    };

    Transformation.prototype.zoom = function(value) {
      return this.param(value, "zoom", "z");
    };

    return Transformation;

  })(TransformationBase);

  /**
   * Cloudinary configuration class
   * Depends on 'utils'
   */
  Configuration = (function() {

    /**
     * Defaults configuration.
     * @const {Object} Configuration.DEFAULT_CONFIGURATION_PARAMS
     */
    var DEFAULT_CONFIGURATION_PARAMS, ref;

    DEFAULT_CONFIGURATION_PARAMS = {
      responsive_class: 'cld-responsive',
      responsive_use_breakpoints: true,
      round_dpr: true,
      secure: (typeof window !== "undefined" && window !== null ? (ref = window.location) != null ? ref.protocol : void 0 : void 0) === 'https:'
    };

    Configuration.CONFIG_PARAMS = ["api_key", "api_secret", "cdn_subdomain", "cloud_name", "cname", "private_cdn", "protocol", "resource_type", "responsive_class", "responsive_use_breakpoints", "responsive_width", "round_dpr", "secure", "secure_cdn_subdomain", "secure_distribution", "shorten", "type", "url_suffix", "use_root_path", "version"];


    /**
     * Cloudinary configuration class
     * @constructor Configuration
     * @param {Object} options - configuration parameters
     */

    function Configuration(options) {
      if (options == null) {
        options = {};
      }
      this.configuration = Util.cloneDeep(options);
      Util.defaults(this.configuration, DEFAULT_CONFIGURATION_PARAMS);
    }


    /**
     * Initialize the configuration.
     * The function first tries to retrieve the configuration form the environment and then from the document.
     * @function Configuration#init
     * @return {Configuration} returns this for chaining
     * @see fromDocument
     * @see fromEnvironment
     */

    Configuration.prototype.init = function() {
      this.fromEnvironment();
      this.fromDocument();
      return this;
    };


    /**
     * Set a new configuration item
     * @function Configuration#set
     * @param {string} name - the name of the item to set
     * @param {*} value - the value to be set
     * @return {Configuration}
     *
     */

    Configuration.prototype.set = function(name, value) {
      this.configuration[name] = value;
      return this;
    };


    /**
     * Get the value of a configuration item
     * @function Configuration#get
     * @param {string} name - the name of the item to set
     * @return {*} the configuration item
     */

    Configuration.prototype.get = function(name) {
      return this.configuration[name];
    };

    Configuration.prototype.merge = function(config) {
      if (config == null) {
        config = {};
      }
      Util.assign(this.configuration, Util.cloneDeep(config));
      return this;
    };


    /**
     * Initialize Cloudinary from HTML meta tags.
     * @function Configuration#fromDocument
     * @return {Configuration}
     * @example <meta name="cloudinary_cloud_name" content="mycloud">
     *
     */

    Configuration.prototype.fromDocument = function() {
      var el, j, len, meta_elements;
      meta_elements = typeof document !== "undefined" && document !== null ? document.querySelectorAll('meta[name^="cloudinary_"]') : void 0;
      if (meta_elements) {
        for (j = 0, len = meta_elements.length; j < len; j++) {
          el = meta_elements[j];
          this.configuration[el.getAttribute('name').replace('cloudinary_', '')] = el.getAttribute('content');
        }
      }
      return this;
    };


    /**
     * Initialize Cloudinary from the `CLOUDINARY_URL` environment variable.
     *
     * This function will only run under Node.js environment.
     * @function Configuration#fromEnvironment
     * @requires Node.js
     */

    Configuration.prototype.fromEnvironment = function() {
      var cloudinary_url, k, ref1, ref2, uri, v;
      cloudinary_url = typeof process !== "undefined" && process !== null ? (ref1 = process.env) != null ? ref1.CLOUDINARY_URL : void 0 : void 0;
      if (cloudinary_url != null) {
        uri = require('url').parse(cloudinary_url, true);
        this.configuration = {
          cloud_name: uri.host,
          api_key: uri.auth && uri.auth.split(":")[0],
          api_secret: uri.auth && uri.auth.split(":")[1],
          private_cdn: uri.pathname != null,
          secure_distribution: uri.pathname && uri.pathname.substring(1)
        };
        if (uri.query != null) {
          ref2 = uri.query;
          for (k in ref2) {
            v = ref2[k];
            this.configuration[k] = v;
          }
        }
      }
      return this;
    };


    /**
     * Create or modify the Cloudinary client configuration
     *
     * Warning: `config()` returns the actual internal configuration object. modifying it will change the configuration.
     *
     * This is a backward compatibility method. For new code, use get(), merge() etc.
     * @function Configuration#config
     * @param {hash|string|boolean} new_config
     * @param {string} new_value
     * @returns {*} configuration, or value
     *
     * @see {@link fromEnvironment} for initialization using environment variables
     * @see {@link fromDocument} for initialization using HTML meta tags
     */

    Configuration.prototype.config = function(new_config, new_value) {
      switch (false) {
        case new_value === void 0:
          this.set(new_config, new_value);
          return this.configuration;
        case !Util.isString(new_config):
          return this.get(new_config);
        case !Util.isPlainObject(new_config):
          this.merge(new_config);
          return this.configuration;
        default:
          return this.configuration;
      }
    };


    /**
     * Returns a copy of the configuration parameters
     * @function Configuration#toOptions
     * @returns {Object} a key:value collection of the configuration parameters
     */

    Configuration.prototype.toOptions = function() {
      return Util.cloneDeep(this.configuration);
    };

    return Configuration;

  })();

  /**
   * Generic HTML tag
   * Depends on 'transformation', 'util'
   */
  HtmlTag = (function() {

    /**
     * Represents an HTML (DOM) tag
     * @constructor HtmlTag
     * @param {string} name - the name of the tag
     * @param {string} [publicId]
     * @param {Object} options
     * @example tag = new HtmlTag( 'div', { 'width': 10})
     */
    var toAttribute;

    function HtmlTag(name, publicId, options) {
      var transformation;
      this.name = name;
      this.publicId = publicId;
      if (options == null) {
        if (Util.isPlainObject(publicId)) {
          options = publicId;
          this.publicId = void 0;
        } else {
          options = {};
        }
      }
      transformation = new Transformation(options);
      transformation.setParent(this);
      this.transformation = function() {
        return transformation;
      };
    }


    /**
     * Convenience constructor
     * Creates a new instance of an HTML (DOM) tag
     * @function HtmlTag.new
     * @param {string} name - the name of the tag
     * @param {string} [publicId]
     * @param {Object} options
     * @return {HtmlTag}
     * @example tag = HtmlTag.new( 'div', { 'width': 10})
     */

    HtmlTag["new"] = function(name, publicId, options) {
      return new this(name, publicId, options);
    };


    /**
     * Represent the given key and value as an HTML attribute.
     * @function HtmlTag#toAttribute
     * @protected
     * @param {string} key - attribute name
     * @param {*|boolean} value - the value of the attribute. If the value is boolean `true`, return the key only.
     * @returns {string} the attribute  
     *
     */

    toAttribute = function(key, value) {
      if (!value) {
        return void 0;
      } else if (value === true) {
        return key;
      } else {
        return key + "=\"" + value + "\"";
      }
    };


    /**
     * combine key and value from the `attr` to generate an HTML tag attributes string.
     * `Transformation::toHtmlTagOptions` is used to filter out transformation and configuration keys.
     * @protected
     * @param {Object} attrs
     * @return {string} the attributes in the format `'key1="value1" key2="value2"'`
     * @ignore
     */

    HtmlTag.prototype.htmlAttrs = function(attrs) {
      var key, pairs, value;
      return pairs = ((function() {
        var results;
        results = [];
        for (key in attrs) {
          value = attrs[key];
          if (value) {
            results.push(toAttribute(key, value));
          }
        }
        return results;
      })()).sort().join(' ');
    };


    /**
     * Get all options related to this tag.
     * @function HtmlTag#getOptions
     * @returns {Object} the options
     *
     */

    HtmlTag.prototype.getOptions = function() {
      return this.transformation().toOptions();
    };


    /**
     * Get the value of option `name`
     * @function HtmlTag#getOption
     * @param {string} name - the name of the option
     * @returns {*} Returns the value of the option
     *
     */

    HtmlTag.prototype.getOption = function(name) {
      return this.transformation().getValue(name);
    };


    /**
     * Get the attributes of the tag.
     * @function HtmlTag#attributes
     * @returns {Object} attributes
     */

    HtmlTag.prototype.attributes = function() {
      return this.transformation().toHtmlAttributes();
    };


    /**
     * Set a tag attribute named `name` to `value`
     * @function HtmlTag#setAttr
     * @param {string} name - the name of the attribute
     * @param {string} value - the value of the attribute
     */

    HtmlTag.prototype.setAttr = function(name, value) {
      this.transformation().set("html_" + name, value);
      return this;
    };


    /**
     * Get the value of the tag attribute `name`
     * @function HtmlTag#getAttr
     * @param {string} name - the name of the attribute
     * @returns {*}
     */

    HtmlTag.prototype.getAttr = function(name) {
      return this.attributes()["html_" + name] || this.attributes()[name];
    };


    /**
     * Remove the tag attributed named `name`
     * @function HtmlTag#removeAttr
     * @param {string} name - the name of the attribute
     * @returns {*}
     */

    HtmlTag.prototype.removeAttr = function(name) {
      var ref;
      return (ref = this.transformation().remove("html_" + name)) != null ? ref : this.transformation().remove(name);
    };


    /**
     * @function HtmlTag#content
     * @protected
     * @ignore
     */

    HtmlTag.prototype.content = function() {
      return "";
    };


    /**
     * @function HtmlTag#openTag
     * @protected
     * @ignore
     */

    HtmlTag.prototype.openTag = function() {
      return "<" + this.name + " " + (this.htmlAttrs(this.attributes())) + ">";
    };


    /**
     * @function HtmlTag#closeTag
     * @protected
     * @ignore
     */

    HtmlTag.prototype.closeTag = function() {
      return "</" + this.name + ">";
    };


    /**
     * Generates an HTML representation of the tag.
     * @function HtmlTag#toHtml
     * @returns {string} Returns HTML in string format
     */

    HtmlTag.prototype.toHtml = function() {
      return this.openTag() + this.content() + this.closeTag();
    };


    /**
     * Creates a DOM object representing the tag.
     * @function HtmlTag#toDOM
     * @returns {Element}
     */

    HtmlTag.prototype.toDOM = function() {
      var element, name, ref, value;
      if (!Util.isFunction(typeof document !== "undefined" && document !== null ? document.createElement : void 0)) {
        throw "Can't create DOM if document is not present!";
      }
      element = document.createElement(this.name);
      ref = this.attributes();
      for (name in ref) {
        value = ref[name];
        element[name] = value;
      }
      return element;
    };

    HtmlTag.isResponsive = function(tag, responsiveClass) {
      var dataSrc;
      dataSrc = Util.getData(tag, 'src-cache') || Util.getData(tag, 'src');
      return Util.hasClass(tag, responsiveClass) && /\bw_auto\b/.exec(dataSrc);
    };

    return HtmlTag;

  })();

  /**
   * Image Tag
   * Depends on 'tags/htmltag', 'cloudinary'
   */
  ImageTag = (function(superClass) {
    extend(ImageTag, superClass);


    /**
     * Creates an HTML (DOM) Image tag using Cloudinary as the source.
     * @constructor ImageTag
     * @extends HtmlTag
     * @param {string} [publicId]
     * @param {Object} [options]
     */

    function ImageTag(publicId, options) {
      if (options == null) {
        options = {};
      }
      ImageTag.__super__.constructor.call(this, "img", publicId, options);
    }


    /** @override */

    ImageTag.prototype.closeTag = function() {
      return "";
    };


    /** @override */

    ImageTag.prototype.attributes = function() {
      var attr;
      attr = ImageTag.__super__.attributes.call(this) || [];
      if (attr['src'] == null) {
        attr['src'] = new Cloudinary(this.getOptions()).url(this.publicId);
      }
      return attr;
    };

    return ImageTag;

  })(HtmlTag);

  /**
   * Video Tag
   * Depends on 'tags/htmltag', 'util', 'cloudinary'
   */
  VideoTag = (function(superClass) {
    var DEFAULT_POSTER_OPTIONS, DEFAULT_VIDEO_SOURCE_TYPES, VIDEO_TAG_PARAMS;

    extend(VideoTag, superClass);

    VIDEO_TAG_PARAMS = ['source_types', 'source_transformation', 'fallback_content', 'poster'];

    DEFAULT_VIDEO_SOURCE_TYPES = ['webm', 'mp4', 'ogv'];

    DEFAULT_POSTER_OPTIONS = {
      format: 'jpg',
      resource_type: 'video'
    };


    /**
     * Creates an HTML (DOM) Video tag using Cloudinary as the source.
     * @constructor VideoTag
     * @extends HtmlTag
     * @param {string} [publicId]
     * @param {Object} [options]
     */

    function VideoTag(publicId, options) {
      if (options == null) {
        options = {};
      }
      options = Util.defaults({}, options, Cloudinary.DEFAULT_VIDEO_PARAMS);
      VideoTag.__super__.constructor.call(this, "video", publicId.replace(/\.(mp4|ogv|webm)$/, ''), options);
    }


    /**
     * Set the transformation to apply on each source
     * @function VideoTag#setSourceTransformation
     * @param {Object} an object with pairs of source type and source transformation
     * @returns {VideoTag} Returns this instance for chaining purposes.
     */

    VideoTag.prototype.setSourceTransformation = function(value) {
      this.transformation().sourceTransformation(value);
      return this;
    };


    /**
     * Set the source types to include in the video tag
     * @function VideoTag#setSourceTypes
     * @param {Array<string>} an array of source types
     * @returns {VideoTag} Returns this instance for chaining purposes.
     */

    VideoTag.prototype.setSourceTypes = function(value) {
      this.transformation().sourceTypes(value);
      return this;
    };


    /**
     * Set the poster to be used in the video tag
     * @function VideoTag#setPoster
     * @param {string|Object} value
     * - string: a URL to use for the poster
     * - Object: transformation parameters to apply to the poster. May optionally include a public_id to use instead of the video public_id.
     * @returns {VideoTag} Returns this instance for chaining purposes.
     */

    VideoTag.prototype.setPoster = function(value) {
      this.transformation().poster(value);
      return this;
    };


    /**
     * Set the content to use as fallback in the video tag
     * @function VideoTag#setFallbackContent
     * @param {string} value - the content to use, in HTML format
     * @returns {VideoTag} Returns this instance for chaining purposes.
     */

    VideoTag.prototype.setFallbackContent = function(value) {
      this.transformation().fallbackContent(value);
      return this;
    };

    VideoTag.prototype.content = function() {
      var cld, fallback, innerTags, mimeType, sourceTransformation, sourceTypes, src, srcType, transformation, videoType;
      sourceTypes = this.transformation().getValue('source_types');
      sourceTransformation = this.transformation().getValue('source_transformation');
      fallback = this.transformation().getValue('fallback_content');
      if (Util.isArray(sourceTypes)) {
        cld = new Cloudinary(this.getOptions());
        innerTags = (function() {
          var j, len, results;
          results = [];
          for (j = 0, len = sourceTypes.length; j < len; j++) {
            srcType = sourceTypes[j];
            transformation = sourceTransformation[srcType] || {};
            src = cld.url("" + this.publicId, Util.defaults({}, transformation, {
              resource_type: 'video',
              format: srcType
            }));
            videoType = srcType === 'ogv' ? 'ogg' : srcType;
            mimeType = 'video/' + videoType;
            results.push("<source " + (this.htmlAttrs({
              src: src,
              type: mimeType
            })) + ">");
          }
          return results;
        }).call(this);
      } else {
        innerTags = [];
      }
      return innerTags.join('') + fallback;
    };

    VideoTag.prototype.attributes = function() {
      var a, attr, j, len, poster, ref, ref1, sourceTypes;
      sourceTypes = this.getOption('source_types');
      poster = (ref = this.getOption('poster')) != null ? ref : {};
      if (Util.isPlainObject(poster)) {
        defaults = poster.public_id != null ? Cloudinary.DEFAULT_IMAGE_PARAMS : DEFAULT_POSTER_OPTIONS;
        poster = new Cloudinary(this.getOptions()).url((ref1 = poster.public_id) != null ? ref1 : this.publicId, Util.defaults({}, poster, defaults));
      }
      attr = VideoTag.__super__.attributes.call(this) || [];
      for (j = 0, len = attr.length; j < len; j++) {
        a = attr[j];
        if (!Util.contains(VIDEO_TAG_PARAMS)) {
          attr = a;
        }
      }
      if (!Util.isArray(sourceTypes)) {
        attr["src"] = new Cloudinary(this.getOptions()).url(this.publicId, {
          resource_type: 'video',
          format: sourceTypes
        });
      }
      if (poster != null) {
        attr["poster"] = poster;
      }
      return attr;
    };

    return VideoTag;

  })(HtmlTag);
  Layer = (function() {

    /**
     * Layer
     * @constructor Layer
     * @param {Object} options - layer parameters
     */
    function Layer(options) {
      this.options = {};
      if (options != null) {
        this.options.resourceType = options["resource_type"];
        this.options.type = options["type"];
        this.options.publicId = options["public_id"];
        this.options.format = options["format"];
      }
    }

    Layer.prototype.resourceType = function(value) {
      this.options.resourceType = value;
      return this;
    };

    Layer.prototype.type = function(value) {
      this.options.type = value;
      return this;
    };

    Layer.prototype.publicId = function(value) {
      this.options.publicId = value;
      return this;
    };


    /**
     * Get the public ID, formatted for layer parameter
     * @function Layer#getPublicId
     * @return {String} public ID
     */

    Layer.prototype.getPublicId = function() {
      var ref;
      return (ref = this.options.publicId) != null ? ref.replace(/\//g, ":") : void 0;
    };


    /**
     * Get the public ID, with format if present
     * @function Layer#getFullPublicId
     * @return {String} public ID
     */

    Layer.prototype.getFullPublicId = function() {
      if (this.options.format != null) {
        return this.getPublicId() + "." + this.options.format;
      } else {
        return this.getPublicId();
      }
    };

    Layer.prototype.format = function(value) {
      this.options.format = value;
      return this;
    };


    /**
     * generate the string representation of the layer
     * @function Layer#toString
     */

    Layer.prototype.toString = function() {
      var components;
      components = [];
      if (this.options.publicId == null) {
        throw "Must supply publicId";
      }
      if (!(this.options.resourceType === "image")) {
        components.push(this.options.resourceType);
      }
      if (!(this.options.type === "upload")) {
        components.push(this.options.type);
      }
      components.push(this.getFullPublicId());
      return Util.compact(components).join(":");
    };

    return Layer;

  })();
  TextLayer = (function(superClass) {
    var textStyleIdentifier;

    extend(TextLayer, superClass);


    /**
     * @constructor TextLayer
     * @param {Object} options - layer parameters
     */

    function TextLayer(options) {
      TextLayer.__super__.constructor.call(this, options);
      this.options.resourceType = "text";
    }

    TextLayer.prototype.resourceType = function(resourceType) {
      throw "Cannot modify resourceType for text layers";
    };

    TextLayer.prototype.type = function(type) {
      throw "Cannot modify type for text layers";
    };

    TextLayer.prototype.format = function(format) {
      throw "Cannot modify format for text layers";
    };

    TextLayer.prototype.fontFamily = function(fontFamily) {
      this.options.fontFamily = fontFamily;
      return this;
    };

    TextLayer.prototype.fontSize = function(fontSize) {
      this.options.fontSize = fontSize;
      return this;
    };

    TextLayer.prototype.fontWeight = function(fontWeight) {
      this.options.fontWeight = fontWeight;
      return this;
    };

    TextLayer.prototype.fontStyle = function(fontStyle) {
      this.options.fontStyle = fontStyle;
      return this;
    };

    TextLayer.prototype.textDecoration = function(textDecoration) {
      this.options.textDecoration = textDecoration;
      return this;
    };

    TextLayer.prototype.textAlign = function(textAlign) {
      this.options.textAlign = textAlign;
      return this;
    };

    TextLayer.prototype.stroke = function(stroke) {
      this.options.stroke = stroke;
      return this;
    };

    TextLayer.prototype.letterSpacing = function(letterSpacing) {
      this.options.letterSpacing = letterSpacing;
      return this;
    };

    TextLayer.prototype.lineSpacing = function(lineSpacing) {
      this.options.lineSpacing = lineSpacing;
      return this;
    };

    TextLayer.prototype.text = function(text) {
      this.options.text = text;
      return this;
    };


    /**
     * generate the string representation of the layer
     * @function TextLayer#toString
     * @return {String}
     */

    TextLayer.prototype.toString = function() {
      var components, publicId, text;
      if (this.options.publicId != null) {
        publicId = this.getFullPublicId();
      } else if (this.options.text != null) {
        text = encodeURIComponent(this.options.text).replace(/%2C/g, "%E2%80%9A").replace(/\//g, "%E2%81%84");
      } else {
        throw "Must supply either text or public_id.";
      }
      components = [this.options.resourceType, textStyleIdentifier.call(this), publicId, text];
      return Util.compact(components).join(":");
    };

    textStyleIdentifier = function() {
      var components, fontSize;
      components = [];
      if (this.options.fontWeight !== "normal") {
        components.push(this.options.fontWeight);
      }
      if (this.options.fontStyle !== "normal") {
        components.push(this.options.fontStyle);
      }
      if (this.options.textDecoration !== "none") {
        components.push(this.options.textDecoration);
      }
      components.push(this.options.textAlign);
      if (this.options.stroke !== "none") {
        components.push(this.options.stroke);
      }
      if (!Util.isEmpty(this.options.letterSpacing)) {
        components.push("letter_spacing_" + this.options.letterSpacing);
      }
      if (this.options.lineSpacing != null) {
        components.push("line_spacing_" + this.options.lineSpacing);
      }
      if (this.options.fontSize != null) {
        fontSize = "" + this.options.fontSize;
      }
      components.unshift(this.options.fontFamily, fontSize);
      components = Util.compact(components).join("_");
      if (!Util.isEmpty(components)) {
        if (Util.isEmpty(this.options.fontFamily)) {
          throw "Must supply fontFamily.";
        }
        if (Util.isEmpty(fontSize)) {
          throw "Must supply fontSize.";
        }
      }
      return components;
    };

    return TextLayer;

  })(Layer);
  SubtitlesLayer = (function(superClass) {
    extend(SubtitlesLayer, superClass);


    /**
     * Represent a subtitles layer
     * @constructor SubtitlesLayer
     * @param {Object} options - layer parameters
     */

    function SubtitlesLayer(options) {
      SubtitlesLayer.__super__.constructor.call(this, options);
      this.options.resourceType = "subtitles";
    }

    return SubtitlesLayer;

  })(TextLayer);
  Cloudinary = (function() {
    var AKAMAI_SHARED_CDN, CF_SHARED_CDN, DEFAULT_POSTER_OPTIONS, DEFAULT_VIDEO_SOURCE_TYPES, OLD_AKAMAI_SHARED_CDN, SHARED_CDN, VERSION, absolutize, applyBreakpoints, cdnSubdomainNumber, closestAbove, cloudinaryUrlPrefix, defaultBreakpoints, finalizeResourceType, findContainerWidth, maxWidth, updateDpr;

    VERSION = "2.1.3";

    CF_SHARED_CDN = "d3jpl91pxevbkh.cloudfront.net";

    OLD_AKAMAI_SHARED_CDN = "cloudinary-a.akamaihd.net";

    AKAMAI_SHARED_CDN = "res.cloudinary.com";

    SHARED_CDN = AKAMAI_SHARED_CDN;

    DEFAULT_POSTER_OPTIONS = {
      format: 'jpg',
      resource_type: 'video'
    };

    DEFAULT_VIDEO_SOURCE_TYPES = ['webm', 'mp4', 'ogv'];


    /**
    * @const {Object} Cloudinary.DEFAULT_IMAGE_PARAMS
    * Defaults values for image parameters.
    *
    * (Previously defined using option_consume() )
     */

    Cloudinary.DEFAULT_IMAGE_PARAMS = {
      resource_type: "image",
      transformation: [],
      type: 'upload'
    };


    /**
    * Defaults values for video parameters.
    * @const {Object} Cloudinary.DEFAULT_VIDEO_PARAMS
    * (Previously defined using option_consume() )
     */

    Cloudinary.DEFAULT_VIDEO_PARAMS = {
      fallback_content: '',
      resource_type: "video",
      source_transformation: {},
      source_types: DEFAULT_VIDEO_SOURCE_TYPES,
      transformation: [],
      type: 'upload'
    };


    /**
     * Main Cloudinary class
     * @class Cloudinary
     * @param {Object} options - options to configure Cloudinary
     * @see Configuration for more details
     * @example
     *    var cl = new cloudinary.Cloudinary( { cloud_name: "mycloud"});
     *    var imgTag = cl.image("myPicID");
     */

    function Cloudinary(options) {
      var configuration;
      this.devicePixelRatioCache = {};
      this.responsiveConfig = {};
      this.responsiveResizeInitialized = false;
      configuration = new Configuration(options);
      this.config = function(newConfig, newValue) {
        return configuration.config(newConfig, newValue);
      };

      /**
       * Use \<meta\> tags in the document to configure this Cloudinary instance.
       * @return {Cloudinary} this for chaining
       */
      this.fromDocument = function() {
        configuration.fromDocument();
        return this;
      };

      /**
       * Use environment variables to configure this Cloudinary instance.
       * @return {Cloudinary} this for chaining
       */
      this.fromEnvironment = function() {
        configuration.fromEnvironment();
        return this;
      };

      /**
       * Initialize configuration.
       * @function Cloudinary#init
       * @see Configuration#init
       * @return {Cloudinary} this for chaining
       */
      this.init = function() {
        configuration.init();
        return this;
      };
    }


    /**
     * Convenience constructor
     * @param {Object} options
     * @return {Cloudinary}
     * @example cl = cloudinary.Cloudinary.new( { cloud_name: "mycloud"})
     */

    Cloudinary["new"] = function(options) {
      return new this(options);
    };


    /**
     * Return the resource type and action type based on the given configuration
     * @function Cloudinary#finalizeResourceType
     * @param {Object|string} resourceType
     * @param {string} [type='upload']
     * @param {string} [urlSuffix]
     * @param {boolean} [useRootPath]
     * @param {boolean} [shorten]
     * @returns {string} resource_type/type
     * @ignore
     */

    finalizeResourceType = function(resourceType, type, urlSuffix, useRootPath, shorten) {
      var options;
      if (Util.isPlainObject(resourceType)) {
        options = resourceType;
        resourceType = options.resource_type;
        type = options.type;
        urlSuffix = options.url_suffix;
        useRootPath = options.use_root_path;
        shorten = options.shorten;
      }
      if (type == null) {
        type = 'upload';
      }
      if (urlSuffix != null) {
        if (resourceType === 'image' && type === 'upload') {
          resourceType = "images";
          type = null;
        } else if (resourceType === 'raw' && type === 'upload') {
          resourceType = 'files';
          type = null;
        } else {
          throw new Error("URL Suffix only supported for image/upload and raw/upload");
        }
      }
      if (useRootPath) {
        if (resourceType === 'image' && type === 'upload' || resourceType === "images") {
          resourceType = null;
          type = null;
        } else {
          throw new Error("Root path only supported for image/upload");
        }
      }
      if (shorten && resourceType === 'image' && type === 'upload') {
        resourceType = 'iu';
        type = null;
      }
      return [resourceType, type].join("/");
    };

    absolutize = function(url) {
      var prefix;
      if (!url.match(/^https?:\//)) {
        prefix = document.location.protocol + '//' + document.location.host;
        if (url[0] === '?') {
          prefix += document.location.pathname;
        } else if (url[0] !== '/') {
          prefix += document.location.pathname.replace(/\/[^\/]*$/, '/');
        }
        url = prefix + url;
      }
      return url;
    };


    /**
     * Generate an resource URL.
     * @function Cloudinary#url
     * @param {string} publicId - the public ID of the resource
     * @param {Object} [options] - options for the tag and transformations, possible values include all {@link Transformation} parameters
     *                          and {@link Configuration} parameters
     * @param {string} [options.type='upload'] - the classification of the resource
     * @param {Object} [options.resource_type='image'] - the type of the resource
     * @return {string} The resource URL
     */

    Cloudinary.prototype.url = function(publicId, options) {
      var prefix, ref, resourceTypeAndType, transformation, transformationString, url, version;
      if (options == null) {
        options = {};
      }
      if (!publicId) {
        return publicId;
      }
      if (options instanceof Transformation) {
        options = options.toOptions();
      }
      options = Util.defaults({}, options, this.config(), Cloudinary.DEFAULT_IMAGE_PARAMS);
      if (options.type === 'fetch') {
        options.fetch_format = options.fetch_format || options.format;
        publicId = absolutize(publicId);
      }
      transformation = new Transformation(options);
      transformationString = transformation.serialize();
      if (!options.cloud_name) {
        throw 'Unknown cloud_name';
      }
      if (options.url_suffix && !options.private_cdn) {
        throw 'URL Suffix only supported in private CDN';
      }
      if (publicId.search('/') >= 0 && !publicId.match(/^v[0-9]+/) && !publicId.match(/^https?:\//) && !((ref = options.version) != null ? ref.toString() : void 0)) {
        options.version = 1;
      }
      if (publicId.match(/^https?:/)) {
        if (options.type === 'upload' || options.type === 'asset') {
          url = publicId;
        } else {
          publicId = encodeURIComponent(publicId).replace(/%3A/g, ':').replace(/%2F/g, '/');
        }
      } else {
        publicId = encodeURIComponent(decodeURIComponent(publicId)).replace(/%3A/g, ':').replace(/%2F/g, '/');
        if (options.url_suffix) {
          if (options.url_suffix.match(/[\.\/]/)) {
            throw 'url_suffix should not include . or /';
          }
          publicId = publicId + '/' + options.url_suffix;
        }
        if (options.format) {
          if (!options.trust_public_id) {
            publicId = publicId.replace(/\.(jpg|png|gif|webp)$/, '');
          }
          publicId = publicId + '.' + options.format;
        }
      }
      prefix = cloudinaryUrlPrefix(publicId, options);
      resourceTypeAndType = finalizeResourceType(options.resource_type, options.type, options.url_suffix, options.use_root_path, options.shorten);
      version = options.version ? 'v' + options.version : '';
      return url || Util.compact([prefix, resourceTypeAndType, transformationString, version, publicId]).join('/').replace(/([^:])\/+/g, '$1/');
    };


    /**
     * Generate an video resource URL.
     * @function Cloudinary#video_url
     * @param {string} publicId - the public ID of the resource
     * @param {Object} [options] - options for the tag and transformations, possible values include all {@link Transformation} parameters
     *                          and {@link Configuration} parameters
     * @param {string} [options.type='upload'] - the classification of the resource
     * @return {string} The video URL
     */

    Cloudinary.prototype.video_url = function(publicId, options) {
      options = Util.assign({
        resource_type: 'video'
      }, options);
      return this.url(publicId, options);
    };


    /**
     * Generate an video thumbnail URL.
     * @function Cloudinary#video_thumbnail_url
     * @param {string} publicId - the public ID of the resource
     * @param {Object} [options] - options for the tag and transformations, possible values include all {@link Transformation} parameters
     *                          and {@link Configuration} parameters
     * @param {string} [options.type='upload'] - the classification of the resource
     * @return {string} The video thumbnail URL
     */

    Cloudinary.prototype.video_thumbnail_url = function(publicId, options) {
      options = Util.assign({}, DEFAULT_POSTER_OPTIONS, options);
      return this.url(publicId, options);
    };


    /**
     * Generate a string representation of the provided transformation options.
     * @function Cloudinary#transformation_string
     * @param {Object} options - the transformation options
     * @returns {string} The transformation string
     */

    Cloudinary.prototype.transformation_string = function(options) {
      return new Transformation(options).serialize();
    };


    /**
     * Generate an image tag.
     * @function Cloudinary#image
     * @param {string} publicId - the public ID of the image
     * @param {Object} [options] - options for the tag and transformations
     * @return {HTMLImageElement} an image tag element
     */

    Cloudinary.prototype.image = function(publicId, options) {
      var client_hints, img, ref, ref1;
      if (options == null) {
        options = {};
      }
      img = this.imageTag(publicId, options);
      client_hints = (ref = (ref1 = options.client_hints) != null ? ref1 : this.config('client_hints')) != null ? ref : false;
      if (!((options.src != null) || client_hints)) {
        img.setAttr("src", '');
      }
      img = img.toDOM();
      if (!client_hints) {
        Util.setData(img, 'src-cache', this.url(publicId, options));
        this.cloudinary_update(img, options);
      }
      return img;
    };


    /**
     * Creates a new ImageTag instance, configured using this own's configuration.
     * @function Cloudinary#imageTag
     * @param {string} publicId - the public ID of the resource
     * @param {Object} options - additional options to pass to the new ImageTag instance
     * @return {ImageTag} An ImageTag that is attached (chained) to this Cloudinary instance
     */

    Cloudinary.prototype.imageTag = function(publicId, options) {
      var tag;
      tag = new ImageTag(publicId, this.config());
      tag.transformation().fromOptions(options);
      return tag;
    };


    /**
     * Generate an image tag for the video thumbnail.
     * @function Cloudinary#video_thumbnail
     * @param {string} publicId - the public ID of the video
     * @param {Object} [options] - options for the tag and transformations
     * @return {HTMLImageElement} An image tag element
     */

    Cloudinary.prototype.video_thumbnail = function(publicId, options) {
      return this.image(publicId, Util.merge({}, DEFAULT_POSTER_OPTIONS, options));
    };


    /**
     * @function Cloudinary#facebook_profile_image
     * @param {string} publicId - the public ID of the image
     * @param {Object} [options] - options for the tag and transformations
     * @return {HTMLImageElement} an image tag element
     */

    Cloudinary.prototype.facebook_profile_image = function(publicId, options) {
      return this.image(publicId, Util.assign({
        type: 'facebook'
      }, options));
    };


    /**
     * @function Cloudinary#twitter_profile_image
     * @param {string} publicId - the public ID of the image
     * @param {Object} [options] - options for the tag and transformations
     * @return {HTMLImageElement} an image tag element
     */

    Cloudinary.prototype.twitter_profile_image = function(publicId, options) {
      return this.image(publicId, Util.assign({
        type: 'twitter'
      }, options));
    };


    /**
     * @function Cloudinary#twitter_name_profile_image
     * @param {string} publicId - the public ID of the image
     * @param {Object} [options] - options for the tag and transformations
     * @return {HTMLImageElement} an image tag element
     */

    Cloudinary.prototype.twitter_name_profile_image = function(publicId, options) {
      return this.image(publicId, Util.assign({
        type: 'twitter_name'
      }, options));
    };


    /**
     * @function Cloudinary#gravatar_image
     * @param {string} publicId - the public ID of the image
     * @param {Object} [options] - options for the tag and transformations
     * @return {HTMLImageElement} an image tag element
     */

    Cloudinary.prototype.gravatar_image = function(publicId, options) {
      return this.image(publicId, Util.assign({
        type: 'gravatar'
      }, options));
    };


    /**
     * @function Cloudinary#fetch_image
     * @param {string} publicId - the public ID of the image
     * @param {Object} [options] - options for the tag and transformations
     * @return {HTMLImageElement} an image tag element
     */

    Cloudinary.prototype.fetch_image = function(publicId, options) {
      return this.image(publicId, Util.assign({
        type: 'fetch'
      }, options));
    };


    /**
     * @function Cloudinary#video
     * @param {string} publicId - the public ID of the image
     * @param {Object} [options] - options for the tag and transformations
     * @return {HTMLImageElement} an image tag element
     */

    Cloudinary.prototype.video = function(publicId, options) {
      if (options == null) {
        options = {};
      }
      return this.videoTag(publicId, options).toHtml();
    };


    /**
     * Creates a new VideoTag instance, configured using this own's configuration.
     * @function Cloudinary#videoTag
     * @param {string} publicId - the public ID of the resource
     * @param {Object} options - additional options to pass to the new VideoTag instance
     * @return {VideoTag} A VideoTag that is attached (chained) to this Cloudinary instance
     */

    Cloudinary.prototype.videoTag = function(publicId, options) {
      options = Util.defaults({}, options, this.config());
      return new VideoTag(publicId, options);
    };


    /**
     * Generate the URL of the sprite image
     * @function Cloudinary#sprite_css
     * @param {string} publicId - the public ID of the resource
     * @param {Object} [options] - options for the tag and transformations
     * @see {@link http://cloudinary.com/documentation/sprite_generation Sprite generation}
     */

    Cloudinary.prototype.sprite_css = function(publicId, options) {
      options = Util.assign({
        type: 'sprite'
      }, options);
      if (!publicId.match(/.css$/)) {
        options.format = 'css';
      }
      return this.url(publicId, options);
    };


    /**
     * @function Cloudinary#responsive
     */

    Cloudinary.prototype.responsive = function(options, bootstrap) {
      var ref, ref1, ref2, responsiveClass, responsiveResize, timeout;
      if (bootstrap == null) {
        bootstrap = true;
      }
      this.responsiveConfig = Util.merge(this.responsiveConfig || {}, options);
      responsiveClass = (ref = this.responsiveConfig['responsive_class']) != null ? ref : this.config('responsive_class');
      if (bootstrap) {
        this.cloudinary_update("img." + responsiveClass + ", img.cld-hidpi", this.responsiveConfig);
      }
      responsiveResize = (ref1 = (ref2 = this.responsiveConfig['responsive_resize']) != null ? ref2 : this.config('responsive_resize')) != null ? ref1 : true;
      if (responsiveResize && !this.responsiveResizeInitialized) {
        this.responsiveConfig.resizing = this.responsiveResizeInitialized = true;
        timeout = null;
        return window.addEventListener('resize', (function(_this) {
          return function() {
            var debounce, ref3, ref4, reset, run, wait, waitFunc;
            debounce = (ref3 = (ref4 = _this.responsiveConfig['responsive_debounce']) != null ? ref4 : _this.config('responsive_debounce')) != null ? ref3 : 100;
            reset = function() {
              if (timeout) {
                clearTimeout(timeout);
                return timeout = null;
              }
            };
            run = function() {
              return _this.cloudinary_update("img." + responsiveClass, _this.responsiveConfig);
            };
            waitFunc = function() {
              reset();
              return run();
            };
            wait = function() {
              reset();
              return timeout = setTimeout(waitFunc, debounce);
            };
            if (debounce) {
              return wait();
            } else {
              return run();
            }
          };
        })(this));
      }
    };


    /**
     * @function Cloudinary#calc_breakpoint
     * @private
     * @ignore
     */

    Cloudinary.prototype.calc_breakpoint = function(element, width, steps) {
      var breakpoints, point;
      breakpoints = Util.getData(element, 'breakpoints') || Util.getData(element, 'stoppoints') || this.config('breakpoints') || this.config('stoppoints') || defaultBreakpoints;
      if (Util.isFunction(breakpoints)) {
        return breakpoints(width, steps);
      } else {
        if (Util.isString(breakpoints)) {
          breakpoints = ((function() {
            var j, len, ref, results;
            ref = breakpoints.split(',');
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              point = ref[j];
              results.push(parseInt(point));
            }
            return results;
          })()).sort(function(a, b) {
            return a - b;
          });
        }
        return closestAbove(breakpoints, width);
      }
    };


    /**
     * @function Cloudinary#calc_stoppoint
     * @deprecated Use {@link calc_breakpoint} instead.
     * @private
     * @ignore
     */

    Cloudinary.prototype.calc_stoppoint = Cloudinary.prototype.calc_breakpoint;


    /**
     * @function Cloudinary#device_pixel_ratio
     * @private
     */

    Cloudinary.prototype.device_pixel_ratio = function(roundDpr) {
      var dpr, dprString;
      if (roundDpr == null) {
        roundDpr = true;
      }
      dpr = (typeof window !== "undefined" && window !== null ? window.devicePixelRatio : void 0) || 1;
      if (roundDpr) {
        dpr = Math.ceil(dpr);
      }
      if (dpr <= 0 || dpr === NaN) {
        dpr = 1;
      }
      dprString = dpr.toString();
      if (dprString.match(/^\d+$/)) {
        dprString += '.0';
      }
      return dprString;
    };

    defaultBreakpoints = function(width, steps) {
      if (steps == null) {
        steps = 100;
      }
      return steps * Math.ceil(width / steps);
    };

    closestAbove = function(list, value) {
      var i;
      i = list.length - 2;
      while (i >= 0 && list[i] >= value) {
        i--;
      }
      return list[i + 1];
    };

    cdnSubdomainNumber = function(publicId) {
      return crc32(publicId) % 5 + 1;
    };

    cloudinaryUrlPrefix = function(publicId, options) {
      var cdnPart, host, path, protocol, ref, subdomain;
      if (((ref = options.cloud_name) != null ? ref.indexOf("/") : void 0) === 0) {
        return '/res' + options.cloud_name;
      }
      protocol = "http://";
      cdnPart = "";
      subdomain = "res";
      host = ".cloudinary.com";
      path = "/" + options.cloud_name;
      if (options.protocol) {
        protocol = options.protocol + '//';
      }
      if (options.private_cdn) {
        cdnPart = options.cloud_name + "-";
        path = "";
      }
      if (options.cdn_subdomain) {
        subdomain = "res-" + cdnSubdomainNumber(publicId);
      }
      if (options.secure) {
        protocol = "https://";
        if (options.secure_cdn_subdomain === false) {
          subdomain = "res";
        }
        if ((options.secure_distribution != null) && options.secure_distribution !== OLD_AKAMAI_SHARED_CDN && options.secure_distribution !== SHARED_CDN) {
          cdnPart = "";
          subdomain = "";
          host = options.secure_distribution;
        }
      } else if (options.cname) {
        protocol = "http://";
        cdnPart = "";
        subdomain = options.cdn_subdomain ? 'a' + ((crc32(publicId) % 5) + 1) + '.' : '';
        host = options.cname;
      }
      return [protocol, cdnPart, subdomain, host, path].join("");
    };


    /**
    * Finds all `img` tags under each node and sets it up to provide the image through Cloudinary
    * @function Cloudinary#processImageTags
     */

    Cloudinary.prototype.processImageTags = function(nodes, options) {
      var images, imgOptions, node, publicId, url;
      if (options == null) {
        options = {};
      }
      options = Util.defaults({}, options, this.config());
      images = (function() {
        var j, len, ref, results;
        results = [];
        for (j = 0, len = nodes.length; j < len; j++) {
          node = nodes[j];
          if (!(((ref = node.tagName) != null ? ref.toUpperCase() : void 0) === 'IMG')) {
            continue;
          }
          imgOptions = Util.assign({
            width: node.getAttribute('width'),
            height: node.getAttribute('height'),
            src: node.getAttribute('src')
          }, options);
          publicId = imgOptions['source'] || imgOptions['src'];
          delete imgOptions['source'];
          delete imgOptions['src'];
          url = this.url(publicId, imgOptions);
          imgOptions = new Transformation(imgOptions).toHtmlAttributes();
          Util.setData(node, 'src-cache', url);
          node.setAttribute('width', imgOptions.width);
          results.push(node.setAttribute('height', imgOptions.height));
        }
        return results;
      }).call(this);
      this.cloudinary_update(images, options);
      return this;
    };

    applyBreakpoints = function(tag, width, steps, options) {
      var ref, ref1, ref2, responsive_use_breakpoints;
      responsive_use_breakpoints = (ref = (ref1 = (ref2 = options['responsive_use_breakpoints']) != null ? ref2 : options['responsive_use_stoppoints']) != null ? ref1 : this.config('responsive_use_breakpoints')) != null ? ref : this.config('responsive_use_stoppoints');
      if ((!responsive_use_breakpoints) || (responsive_use_breakpoints === 'resize' && !options.resizing)) {
        return width;
      } else {
        return this.calc_breakpoint(tag, width, steps);
      }
    };

    findContainerWidth = function(element) {
      var containerWidth, style;
      containerWidth = 0;
      while (((element = element != null ? element.parentNode : void 0) instanceof Element) && !containerWidth) {
        style = window.getComputedStyle(element);
        if (!/^inline/.test(style.display)) {
          containerWidth = Util.width(element);
        }
      }
      return containerWidth;
    };

    updateDpr = function(dataSrc, roundDpr) {
      return dataSrc.replace(/\bdpr_(1\.0|auto)\b/g, 'dpr_' + this.device_pixel_ratio(roundDpr));
    };

    maxWidth = function(requiredWidth, tag) {
      var imageWidth;
      imageWidth = Util.getData(tag, 'width') || 0;
      if (requiredWidth > imageWidth) {
        imageWidth = requiredWidth;
        Util.setData(tag, 'width', requiredWidth);
      }
      return requiredWidth;
    };


    /**
    * Update hidpi (dpr_auto) and responsive (w_auto) fields according to the current container size and the device pixel ratio.
    * Only images marked with the cld-responsive class have w_auto updated.
    * @function Cloudinary#cloudinary_update
    * @param {(Array|string|NodeList)} elements - the elements to modify
    * @param {Object} options
    * @param {boolean|string} [options.responsive_use_breakpoints=true]
    *  - when `true`, always use breakpoints for width
    * - when `"resize"` use exact width on first render and breakpoints on resize
    * - when `false` always use exact width
    * @param {boolean} [options.responsive] - if `true`, enable responsive on this element. Can be done by adding cld-responsive.
    * @param {boolean} [options.responsive_preserve_height] - if set to true, original css height is preserved.
    *   Should only be used if the transformation supports different aspect ratios.
     */

    Cloudinary.prototype.cloudinary_update = function(elements, options) {
      var client_hints, containerWidth, dataSrc, j, len, match, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, requiredWidth, responsive, responsiveClass, roundDpr, setUrl, tag;
      if (options == null) {
        options = {};
      }
      client_hints = (ref = (ref1 = options.client_hints) != null ? ref1 : this.config('client_hints')) != null ? ref : false;
      client_hints = client_hints || (typeof document !== "undefined" && document !== null ? document.querySelector('meta[http-equiv="Accept-CH"]') : void 0);
      if (client_hints) {
        return;
      }
      responsive = (ref2 = (ref3 = options.responsive) != null ? ref3 : this.config('responsive')) != null ? ref2 : false;
      elements = (function() {
        switch (false) {
          case !Util.isArray(elements):
            return elements;
          case elements.constructor.name !== "NodeList":
            return elements;
          case !Util.isString(elements):
            return document.querySelectorAll(elements);
          default:
            return [elements];
        }
      })();
      responsiveClass = (ref4 = (ref5 = this.responsiveConfig['responsive_class']) != null ? ref5 : options['responsive_class']) != null ? ref4 : this.config('responsive_class');
      roundDpr = (ref6 = options['round_dpr']) != null ? ref6 : this.config('round_dpr');
      for (j = 0, len = elements.length; j < len; j++) {
        tag = elements[j];
        if (!((ref7 = tag.tagName) != null ? ref7.match(/img/i) : void 0)) {
          continue;
        }
        setUrl = true;
        if (responsive && !client_hints) {
          Util.addClass(tag, responsiveClass);
        }
        dataSrc = Util.getData(tag, 'src-cache') || Util.getData(tag, 'src');
        if (!Util.isEmpty(dataSrc)) {
          dataSrc = updateDpr.call(this, dataSrc, roundDpr);
          if (HtmlTag.isResponsive(tag, responsiveClass)) {
            containerWidth = findContainerWidth(tag);
            if (containerWidth !== 0) {
              switch (false) {
                case !/w_auto:breakpoints/.test(dataSrc):
                  requiredWidth = maxWidth(containerWidth, tag);
                  dataSrc = dataSrc.replace(/w_auto:breakpoints([_0-9]*)(:[0-9]+)?/, "w_auto:breakpoints$1:" + requiredWidth);
                  break;
                case !(match = /w_auto(:(\d+))?/.exec(dataSrc)):
                  requiredWidth = applyBreakpoints.call(this, tag, containerWidth, match[2], options);
                  requiredWidth = maxWidth(requiredWidth, tag);
                  dataSrc = dataSrc.replace(/w_auto[^,\/]*/g, "w_" + requiredWidth);
              }
              Util.removeAttribute(tag, 'width');
              if (!options.responsive_preserve_height) {
                Util.removeAttribute(tag, 'height');
              }
            } else {
              setUrl = false;
            }
          }
          if (setUrl) {
            Util.setAttribute(tag, 'src', dataSrc);
          }
        }
      }
      return this;
    };


    /**
     * Provide a transformation object, initialized with own's options, for chaining purposes.
     * @function Cloudinary#transformation
     * @param {Object} options
     * @return {Transformation}
     */

    Cloudinary.prototype.transformation = function(options) {
      return Transformation["new"](this.config()).fromOptions(options).setParent(this);
    };

    return Cloudinary;

  })();

  /**
   * Cloudinary jQuery plugin
   * Depends on 'jquery', 'util', 'transformation', 'cloudinary'
   */
  CloudinaryJQuery = (function(superClass) {
    extend(CloudinaryJQuery, superClass);


    /**
     * Cloudinary class with jQuery support
     * @constructor CloudinaryJQuery
     * @extends Cloudinary
     */

    function CloudinaryJQuery(options) {
      CloudinaryJQuery.__super__.constructor.call(this, options);
    }


    /**
     * @override
     */

    CloudinaryJQuery.prototype.image = function(publicId, options) {
      var client_hints, img, ref, ref1;
      if (options == null) {
        options = {};
      }
      img = this.imageTag(publicId, options);
      client_hints = (ref = (ref1 = options.client_hints) != null ? ref1 : this.config('client_hints')) != null ? ref : false;
      if (!((options.src != null) || client_hints)) {
        img.setAttr("src", '');
      }
      img = jQuery(img.toHtml());
      if (!client_hints) {
        img.data('src-cache', this.url(publicId, options)).cloudinary_update(options);
      }
      return img;
    };


    /**
     * @override
     */

    CloudinaryJQuery.prototype.responsive = function(options) {
      var ref, ref1, ref2, responsiveClass, responsiveConfig, responsiveResizeInitialized, responsive_resize, timeout;
      responsiveConfig = jQuery.extend(responsiveConfig || {}, options);
      responsiveClass = (ref = this.responsiveConfig['responsive_class']) != null ? ref : this.config('responsive_class');
      jQuery("img." + responsiveClass + ", img.cld-hidpi").cloudinary_update(responsiveConfig);
      responsive_resize = (ref1 = (ref2 = responsiveConfig['responsive_resize']) != null ? ref2 : this.config('responsive_resize')) != null ? ref1 : true;
      if (responsive_resize && !responsiveResizeInitialized) {
        responsiveConfig.resizing = responsiveResizeInitialized = true;
        timeout = null;
        return jQuery(window).on('resize', (function(_this) {
          return function() {
            var debounce, ref3, ref4, reset, run, wait;
            debounce = (ref3 = (ref4 = responsiveConfig['responsive_debounce']) != null ? ref4 : _this.config('responsive_debounce')) != null ? ref3 : 100;
            reset = function() {
              if (timeout) {
                clearTimeout(timeout);
                return timeout = null;
              }
            };
            run = function() {
              return jQuery("img." + responsiveClass).cloudinary_update(responsiveConfig);
            };
            wait = function() {
              reset();
              return setTimeout((function() {
                reset();
                return run();
              }), debounce);
            };
            if (debounce) {
              return wait();
            } else {
              return run();
            }
          };
        })(this));
      }
    };

    return CloudinaryJQuery;

  })(Cloudinary);

  /**
   * The following methods are provided through the jQuery class
   * @class jQuery
   */

  /**
   * Convert all img tags in the collection to utilize Cloudinary.
   * @function jQuery#cloudinary
   * @param {Object} [options] - options for the tag and transformations
   * @returns {jQuery}
   */
  jQuery.fn.cloudinary = function(options) {
    this.filter('img').each(function() {
      var img_options, public_id, url;
      img_options = jQuery.extend({
        width: jQuery(this).attr('width'),
        height: jQuery(this).attr('height'),
        src: jQuery(this).attr('src')
      }, jQuery(this).data(), options);
      public_id = img_options.source || img_options.src;
      delete img_options.source;
      delete img_options.src;
      url = jQuery.cloudinary.url(public_id, img_options);
      img_options = new Transformation(img_options).toHtmlAttributes();
      return jQuery(this).data('src-cache', url).attr({
        width: img_options.width,
        height: img_options.height
      });
    }).cloudinary_update(options);
    return this;
  };

  /**
   * Update hidpi (dpr_auto) and responsive (w_auto) fields according to the current container size and the device pixel ratio.
   * Only images marked with the cld-responsive class have w_auto updated.
   * options:
   * - responsive_use_stoppoints:
   *   - true - always use stoppoints for width
   *   - "resize" - use exact width on first render and stoppoints on resize (default)
   *   - false - always use exact width
   * - responsive:
   *   - true - enable responsive on this element. Can be done by adding cld-responsive.
   *            Note that jQuery.cloudinary.responsive() should be called once on the page.
   * - responsive_preserve_height: if set to true, original css height is perserved. Should only be used if the transformation supports different aspect ratios.
   */
  jQuery.fn.cloudinary_update = function(options) {
    if (options == null) {
      options = {};
    }
    jQuery.cloudinary.cloudinary_update(this.filter('img').toArray(), options);
    return this;
  };
  webp = null;

  /**
   * @function jQuery#webpify
   */
  jQuery.fn.webpify = function(options, webp_options) {
    var that, webp_canary;
    if (options == null) {
      options = {};
    }
    that = this;
    webp_options = webp_options != null ? webp_options : options;
    if (!webp) {
      webp = jQuery.Deferred();
      webp_canary = new Image;
      webp_canary.onerror = webp.reject;
      webp_canary.onload = webp.resolve;
      webp_canary.src = 'data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA';
    }
    jQuery(function() {
      return webp.done(function() {
        return jQuery(that).cloudinary(jQuery.extend({}, webp_options, {
          format: 'webp'
        }));
      }).fail(function() {
        return jQuery(that).cloudinary(options);
      });
    });
    return this;
  };
  jQuery.fn.fetchify = function(options) {
    return this.cloudinary(jQuery.extend(options, {
      'type': 'fetch'
    }));
  };
  jQuery.cloudinary = new CloudinaryJQuery();
  jQuery.cloudinary.fromDocument();

  /**
   * This module extends CloudinaryJquery to support jQuery File Upload
   * Depends on 'jquery', 'util', 'cloudinaryjquery', 'jquery.ui.widget', 'jquery.iframe-transport','jquery.fileupload'
   */

  /**
   * Delete a resource using the upload token
   * @function CloudinaryJQuery#delete_by_token
   * @param {string} delete_token - the delete token
   * @param {Object} [options]
   * @param {string} [options.url] - an alternative URL to use for the API
   * @param {string} [options.cloud_name] - an alternative cloud_name to use. This parameter is ignored if `options.url` is provided.
   */
  CloudinaryJQuery.prototype.delete_by_token = function(delete_token, options) {
    var cloud_name, dataType, url;
    options = options || {};
    url = options.url;
    if (!url) {
      cloud_name = options.cloud_name || jQuery.cloudinary.config().cloud_name;
      url = 'https://api.cloudinary.com/v1_1/' + cloud_name + '/delete_by_token';
    }
    dataType = jQuery.support.xhrFileUpload ? 'json' : 'iframe json';
    return jQuery.ajax({
      url: url,
      method: 'POST',
      data: {
        token: delete_token
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      dataType: dataType
    });
  };

  /**
   * Creates an `input` tag and sets it up to upload files to cloudinary
   * @function CloudinaryJQuery#unsigned_upload_tag
   * @param {string}
   */
  CloudinaryJQuery.prototype.unsigned_upload_tag = function(upload_preset, upload_params, options) {
    return jQuery('<input/>').attr({
      type: 'file',
      name: 'file'
    }).unsigned_cloudinary_upload(upload_preset, upload_params, options);
  };

  /**
   * Initialize the jQuery File Upload plugin to upload to Cloudinary
   * @function jQuery#cloudinary_fileupload
   * @param {Object} options
   * @returns {jQuery}
   */
  jQuery.fn.cloudinary_fileupload = function(options) {
    var cloud_name, initializing, resource_type, type, upload_url;
    if (!Util.isFunction(jQuery.fn.fileupload)) {
      return this;
    }
    initializing = !this.data('blueimpFileupload');
    if (initializing) {
      options = jQuery.extend({
        maxFileSize: 20000000,
        dataType: 'json',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      }, options);
    }
    this.fileupload(options);
    if (initializing) {
      this.bind('fileuploaddone', function(e, data) {
        var add_field, field, multiple, upload_info;
        if (data.result.error) {
          return;
        }
        data.result.path = ['v', data.result.version, '/', data.result.public_id, data.result.format ? '.' + data.result.format : ''].join('');
        if (data.cloudinaryField && data.form.length > 0) {
          upload_info = [data.result.resource_type, data.result.type, data.result.path].join('/') + '#' + data.result.signature;
          multiple = jQuery(e.target).prop('multiple');
          add_field = function() {
            return jQuery('<input/>').attr({
              type: 'hidden',
              name: data.cloudinaryField
            }).val(upload_info).appendTo(data.form);
          };
          if (multiple) {
            add_field();
          } else {
            field = jQuery(data.form).find('input[name="' + data.cloudinaryField + '"]');
            if (field.length > 0) {
              field.val(upload_info);
            } else {
              add_field();
            }
          }
        }
        return jQuery(e.target).trigger('cloudinarydone', data);
      });
      this.bind('fileuploadsend', function(e, data) {
        data.headers = jQuery.extend({}, data.headers, {
          'X-Unique-Upload-Id': (Math.random() * 10000000000).toString(16)
        });
        return true;
      });
      this.bind('fileuploadstart', function(e) {
        return jQuery(e.target).trigger('cloudinarystart');
      });
      this.bind('fileuploadstop', function(e) {
        return jQuery(e.target).trigger('cloudinarystop');
      });
      this.bind('fileuploadprogress', function(e, data) {
        return jQuery(e.target).trigger('cloudinaryprogress', data);
      });
      this.bind('fileuploadprogressall', function(e, data) {
        return jQuery(e.target).trigger('cloudinaryprogressall', data);
      });
      this.bind('fileuploadfail', function(e, data) {
        return jQuery(e.target).trigger('cloudinaryfail', data);
      });
      this.bind('fileuploadalways', function(e, data) {
        return jQuery(e.target).trigger('cloudinaryalways', data);
      });
      if (!this.fileupload('option').url) {
        cloud_name = options.cloud_name || jQuery.cloudinary.config().cloud_name;
        resource_type = options.resource_type || 'auto';
        type = options.type || 'upload';
        upload_url = 'https://api.cloudinary.com/v1_1/' + cloud_name + '/' + resource_type + '/' + type;
        this.fileupload('option', 'url', upload_url);
      }
    }
    return this;
  };

  /**
   * Add a file to upload
   * @function jQuery#cloudinary_upload_url
   * @param {string} remote_url - the url to add
   * @returns {jQuery}
   */
  jQuery.fn.cloudinary_upload_url = function(remote_url) {
    if (!Util.isFunction(jQuery.fn.fileupload)) {
      return this;
    }
    this.fileupload('option', 'formData').file = remote_url;
    this.fileupload('add', {
      files: [remote_url]
    });
    delete this.fileupload('option', 'formData').file;
    return this;
  };

  /**
   * Initialize the jQuery File Upload plugin to upload to Cloudinary using unsigned upload
   * @function jQuery#unsigned_cloudinary_upload
   * @param {string} upload_preset - the upload preset to use
   * @param {Object} [upload_params] - parameters that should be past to the server
   * @param {Object} [options]
   * @returns {jQuery}
   */
  jQuery.fn.unsigned_cloudinary_upload = function(upload_preset, upload_params, options) {
    var attr, attrs_to_move, html_options, i, key, value;
    if (upload_params == null) {
      upload_params = {};
    }
    if (options == null) {
      options = {};
    }
    upload_params = Util.cloneDeep(upload_params);
    options = Util.cloneDeep(options);
    attrs_to_move = ['cloud_name', 'resource_type', 'type'];
    i = 0;
    while (i < attrs_to_move.length) {
      attr = attrs_to_move[i];
      if (upload_params[attr]) {
        options[attr] = upload_params[attr];
        delete upload_params[attr];
      }
      i++;
    }
    for (key in upload_params) {
      value = upload_params[key];
      if (Util.isPlainObject(value)) {
        upload_params[key] = jQuery.map(value, function(v, k) {
          return k + '=' + v;
        }).join('|');
      } else if (Util.isArray(value)) {
        if (value.length > 0 && jQuery.isArray(value[0])) {
          upload_params[key] = jQuery.map(value, function(array_value) {
            return array_value.join(',');
          }).join('|');
        } else {
          upload_params[key] = value.join(',');
        }
      }
    }
    if (!upload_params.callback) {
      upload_params.callback = '/cloudinary_cors.html';
    }
    upload_params.upload_preset = upload_preset;
    options.formData = upload_params;
    if (options.cloudinary_field) {
      options.cloudinaryField = options.cloudinary_field;
      delete options.cloudinary_field;
    }
    html_options = options.html || {};
    html_options["class"] = Util.trim("cloudinary_fileupload " + (html_options["class"] || ''));
    if (options.multiple) {
      html_options.multiple = true;
    }
    this.attr(html_options).cloudinary_fileupload(options);
    return this;
  };
  jQuery.cloudinary = new CloudinaryJQuery();
  cloudinary = {
    utf8_encode: utf8_encode,
    crc32: crc32,
    Util: Util,
    Condition: Condition,
    Transformation: Transformation,
    Configuration: Configuration,
    HtmlTag: HtmlTag,
    ImageTag: ImageTag,
    VideoTag: VideoTag,
    Layer: Layer,
    TextLayer: TextLayer,
    SubtitlesLayer: SubtitlesLayer,
    Cloudinary: Cloudinary,
    VERSION: "2.1.3",
    CloudinaryJQuery: CloudinaryJQuery
  };
  return cloudinary;
});



(function ($) {

    //Noty Message
    $.fn.General_ShowNotification = function (options) {
        var defaults = {
            message: '',
            type: 'success',
            timeout: 2000
        };

        var opts = $.extend({}, defaults, options);

        $.noty.closeAll();  //close all before displaying

        if ($('#noty_topRight_layout_container').length > 0) {
            $('#noty_topRight_layout_container').remove();
        }

        var n = noty({
            type: opts.type,
            text: opts.message,
            layout: opts.layout || 'bottomRight',
            closeWith: opts.closeWith,
            timeout: opts.timeout,
            dismissQueue: true,
            animation: {
                open: 'animated bounceInRight', // jQuery animate function property object
                close: 'animated bounceOutRight', // jQuery animate function property object
                easing: 'swing', // easing
                speed: 500 // opening & closing animation speed
            }
        });
    };

    //Show Error Message
    $.fn.General_ShowErrorMessage = function (options) {
        var defaults = {
            message: '',
            type: 'error',
            timeout: 10000
        };

        var opts = $.extend({}, defaults, options);
        $.noty.closeAll();  //close all before displaying

        if ($('#noty_topRight_layout_container').length > 0) {
            $('#noty_topRight_layout_container').remove();
        }

        var n = noty({
            type: 'error',
            text: opts.message,
            layout: opts.layout || 'bottomRight',
            progressBar: true,
            closeWith: ['click'],
            timeout: opts.timeout,
            dismissQueue: true,
            animation: {
                open: 'animated bounceInRight', // jQuery animate function property object
                close: 'animated bounceOutRight', // jQuery animate function property object
                easing: 'swing', // easing
                speed: 500 // opening & closing animation speed
            }
        });
    };

}(jQuery));
    $.fn.Ajax_LoadBlogArticles = function(options){


        var defaults = {
            'limit': 20,
            'containerClass': 'ajaxArticles',
            'onSuccess' : function(){},
            'onError' : function(){},
            'beforeSend' : function(){},
            'onComplete' : function(){}
        };
        
        var opts = $.extend( {}, defaults, options );
        
        var offset = parseInt($('.'+opts.containerClass).data('offset'));
        if(isNaN(offset) || offset < 0) {
            offset = opts.limit;
        }
        
        var count = parseInt($('.'+opts.containerClass).data('articlecount'));
        if(isNaN(count) || count < 0) {
            count = opts.limit;
        }



        var existingNonPinnedCount = parseInt($('.'+opts.containerClass).data('existing-nonpinned-count'));
        if(isNaN(existingNonPinnedCount)) {
            existingNonPinnedCount = -1;
        }
        
        $('.'+opts.containerClass).data('offset', (offset + opts.limit));
        
        var csrfToken = $('meta[name="csrf-token"]').attr("content");
        
        var dateFormat = 'SHORT';
        
        $.ajax({
            type: 'post',
            url: _appJsConfig.baseHttpPath + '/home/load-articles',
            dataType: 'json',
            data: {offset: offset, limit: opts.limit, existingNonPinnedCount: existingNonPinnedCount, _csrf: csrfToken, dateFormat: dateFormat},
            success: function (data, textStatus, jqXHR) {
                if (opts.onSuccess && typeof opts.onSuccess === 'function') {
                    opts.onSuccess(data, textStatus, jqXHR);
                }                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText);
                if (opts.onError && typeof opts.onError === 'function') {
                    opts.onError(jqXHR, textStatus, errorThrown);
                }
            },
            beforeSend: function (jqXHR, settings) {
                if (opts.beforeSend && typeof opts.beforeSend === 'function') {
                    opts.beforeSend(jqXHR, settings);
                }
            },
            complete: function (jqXHR, textStatus) {
                if (opts.onComplete && typeof opts.onComplete === 'function') {
                    opts.onComplete(jqXHR, textStatus);
                }
            }
        });        
    };
(function ($) {

    $.fn.Ajax_LoadBlogArticles_new = function(options){
        var requestType = 'post';
        var url = _appJsConfig.baseHttpPath + '/home/load-articles';

        var requestData = { 
            offset      : options.offset, 
            limit       : options.limit, 
            _csrf       : $('meta[name="csrf-token"]').attr("content"), 
            dateFormat  : 'SHORT',
            existingNonPinnedCount: options.nonPinnedOffset
        };

        if (options.blogid) {
            requestData['blogGuid'] = options.blogid;
        }

        if (options.loadtype == 'user') {
            url = _appJsConfig.appHostName + '/api/'+options.loadtype+'/load-more-managed';
            var requestType = 'get';
        }
        
        if (options.loadtype == 'user_articles') {
            // url = _appJsConfig.baseHttpPath + '/user/load-articles';
            var url = window.location.href;
            var urlArr = url.split('/');
            var username = decodeURIComponent(urlArr[urlArr.length - 2]);
            url = _appJsConfig.baseHttpPath + '/profile/'+ username + '/posts';
        }

        if (options.search) {
            requestData['s'] = options.search;
            var url = _appJsConfig.appHostName + '/'+options.loadtype;
            var requestType = 'get';
            if (options.blogid) {
                requestData['blogguid'] = options.blogid;
                requestData['blogid'] = options.blogid;
            }
        }
        // console.log('fetching from blog new');
        // console.log(requestData);
        // console.log(url);
        // console.log(requestType);
        
        return $.ajax({
            type: requestType,
            url: url,
            dataType: 'json',
            data: requestData
        }).done(function(r) {
            //  console.log(r);
        });        
    };

}(jQuery));
(function($) {

    $.fn.Ajax_pinUnpinArticle = function(options){

        var defaults = {
            'onSuccess' : function(){},
            'onError' : function(){},
            'beforeSend' : function(){},
            'onComplete' : function(){}
        };
        var opts = $.extend( {}, defaults, options );

        return this.each (function(){
            var elem  = $(this);
            $(elem).off('click');
            $(elem).on('click', function(e){
                e.preventDefault();

                var articleId = $(elem).data('id');
                var position = parseInt($(elem).attr('data-position'));
                var existingStatus = $(elem).attr('data-status');
                var isSocial = $(elem).data('social');
                
                if(isNaN(articleId) || articleId <= 0 || isNaN(position) || position <= 0) {
                    return;
                }

                var csrfToken = $('meta[name="csrf-token"]').attr("content");
                $.ajax({
                    type: 'POST',
                    url: _appJsConfig.baseHttpPath + '/home/pin-article',
                    dataType: 'json',
                    data: {id: articleId, status: existingStatus, social: isSocial, position: position, _csrf: csrfToken},
                    success: function(data, textStatus, jqXHR) {
                        $(elem).attr('data-status', ((existingStatus == 1) ? 0 : 1));
                        var msg = (existingStatus == 1) ? "Article un-pinned successfully" : "Article pinned successfully";
                        (existingStatus == 1) ? $(elem).removeClass('selected') : $(elem).addClass('selected');
                        $.fn.General_ShowNotification({message: msg});
                        if (opts.onSuccess && typeof opts.onSuccess === 'function') {
                            opts.onSuccess(data, elem);
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        if (opts.onError && typeof opts.onError === 'function') {
                            opts.onError(elem, jqXHR.responseText);
                        }
                    },
                    beforeSend: function(jqXHR, settings) { 
                        if (opts.beforeSend && typeof opts.beforeSend === 'function') {
                            opts.beforeSend(elem);
                        }
                    },
                    complete: function(jqXHR, textStatus) {
                        if (opts.onComplete && typeof opts.onComplete === 'function') {
                            opts.onComplete(elem);
                        }
                    }
                });

                

            });
        });
    };
    
    
 var deleteArticle = function (articleGuid, isSocial, elem, onSuccess) {

        if (typeof articleGuid === 'undefined' || articleGuid === "") {
            return;
        }

        var csrfToken = $('meta[name="csrf-token"]').attr("content");
        $.ajax({
            type: 'POST',
            url: _appJsConfig.baseHttpPath + '/home/delete-article',
            dataType: 'json',
            data: {guid: articleGuid, social: isSocial, _csrf: csrfToken},
            success: function (data, textStatus, jqXHR) {
                var msg = (isSocial == 1) ? "Article deleted successfully" : "Article hidden successfully";
                $.fn.General_ShowNotification({message: msg});
                if (onSuccess && typeof onSuccess === 'function') {
                    onSuccess(data, elem);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.fn.General_ShowErrorMessage({message: jqXHR.responseText});
            },
            beforeSend: function (jqXHR, settings) {
            },
            complete: function (jqXHR, textStatus) {
            }
        });
    };
    
    
    $.fn.Ajax_deleteArticle = function(options){

        var defaults = {
            'onSuccess' : function(){},
            'onError' : function(){},
            'beforeSend' : function(){},
            'onComplete' : function(){}
        };
        var opts = $.extend( {}, defaults, options );

        return this.each (function(){
            var elem  = $(this);
            $(elem).off('click');
            $(elem).on('click', function(e){
                e.preventDefault();
             
                var isSocial = $(elem).data('social');
                var msgStr = (isSocial == 1) ? "Do you really want to delete this article?" : "Do you really want to hide this article?";
                var articleGuid = $(elem).data('guid');
                
                if (typeof bootbox === 'undefined') {
                    var result = confirm(msgStr);
                    if (result === true) {
                        deleteArticle(articleGuid, isSocial, elem, opts.onSuccess);
                    }
                } else {
                    bootbox.confirm({
                        title: "Confirm",
                        message: msgStr,
                        callback: function (result) {
                            if (result === true) {
                                deleteArticle(articleGuid, isSocial, elem, opts.onSuccess);
                            }
                        }
                    });
                }


            });
        });
    };    



}(jQuery));
    $.fn.Ajax_LoadSearchArticles = function(options){
        var defaults = {
            search: '',
            limit: 20,
            containerClass: 'ajaxArticles',
            onSuccess : function(){},
            onError : function(){},
            beforeSend : function(){},
            onComplete : function(){}
        };
        
        var opts = $.extend( {}, defaults, options );
        
        var offset = parseInt($('.'+opts.containerClass).data('offset'));
        if(isNaN(offset) || offset < 0) {
            offset = opts.limit;
        }
        
        $('.'+opts.containerClass).data('offset', (offset + opts.limit));
        
         var csrfToken = $('meta[name="csrf-token"]').attr("content");
        console.log({offset: offset, limit: opts.limit, search: opts.search, _csrf: csrfToken});
        $.ajax({
            type: 'POST',
            url: _appJsConfig.baseHttpPath + '/search/load-articles',
            dataType: 'JSON',
            data: {offset: offset, limit: opts.limit, search: opts.search, _csrf: csrfToken},
            success: function (data, textStatus, jqXHR) {
                if (opts.onSuccess && typeof opts.onSuccess === 'function') {
                    opts.onSuccess(data, textStatus, jqXHR);
                }                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (opts.onError && typeof opts.onError === 'function') {
                    opts.onError(jqXHR, textStatus, errorThrown);
                }
            },
            beforeSend: function (jqXHR, settings) {
                if (opts.beforeSend && typeof opts.beforeSend === 'function') {
                    opts.beforeSend(jqXHR, settings);
                }
            },
            complete: function (jqXHR, textStatus) {
                if (opts.onComplete && typeof opts.onComplete === 'function') {
                    opts.onComplete(jqXHR, textStatus);
                }
            }
        });        
    };

(function ($) {

    $.fn.videoPlayer = function (options) {

        var defaults = {
            type: "html",
            scrolling: "no",
            fitToView: false,
            autoSize: false,
            width: 650,
            height: 460,
            maxWidth: "90%",
            aspectRatio: true,
            startVolume: 0.8,
            loop: false,
            enableAutosize: true,
            features: ['playpause', 'progress', 'current', 'duration', 'tracks', 'volume', 'fullscreen'],
            alwaysShowControls: false,
            iPadUseNativeControls: false,
            iPhoneUseNativeControls: false,
            AndroidUseNativeControls: false,
            alwaysShowHours: false,
            showTimecodeFrameCount: false,
            framesPerSecond: 25,
            enableKeyboard: true,
            pauseOtherPlayers: true
        };
        var opts = $.extend({}, defaults, options);
        return this.click(function (e) {

            e.preventDefault();
            e.stopPropagation();
            var elem = $(this);
            var source = elem.data('source');
            var poster = elem.data('poster');
            var caption = elem.data('caption');
            var url, content;

            if (source.trim() !== 'undefined' && source.trim() !== "") {
                var videoId = elem.data('video-id');

                if (source.trim() === 'youtube') {
                    if (videoId !== "" && typeof videoId !== "undefined") {
                        url = "https://www.youtube.com/watch?v=" + videoId;
                    } else {
                        url = $(elem).data('url');
                    }
                    content = "<video width='" + opts.width + "' height='" + opts.height + "' class='videoPlayer' controls='controls' preload='none'><source type='video/youtube' src='" + url + "' /></video>";
                }
                else if (source.trim() === 'vimeo') {
                    if (videoId !== "" && typeof videoId !== "undefined") {
                         url = "https://vimeo.com/" + videoId;
                    } else {
                        url = $(elem).data('url');
                    }
                    opts.features = [];
                    content = "<video width='" + opts.width + "' height='" + opts.height + "' class='videoPlayer' controls='controls' preload='none'><source type='video/vimeo' src='" + url + "' /></video>";
                }
                else if (source.trim() === 'cloudinary' || source.trim() === 'instagram' || source.trim() === 'twitter' || source === 'facebook') {
                    url = elem.data('url');
                    content = "<video class ='videoPlayer' src='" + url + "' poster='" + poster + "' width='" + opts.width + "' height='" + opts.height + "' controls='controls' preload='none' ></video>";
                }
                else if (source.trim() === 'brightcove') {
                    playerID = videoId.toString().split("::")[2];
                    accountID = videoId.toString().split("::")[1];
                    videoId = videoId.toString().split("::")[0];
                    
                    if (playerID == '' || typeof playerID == "undefined") {playerID = 'default';}
                    if (videoId !== "" && typeof videoId !== "undefined") {
                         url = "https://players.brightcove.net/"+accountID+"/"+playerID+"_default/index.html?videoId=" + videoId + "&playsinline";
                    } else {
                        url = $(elem).data('url');
                    }
                    opts.features = [];
                    opts.width = (window.innerWidth/3)*2;
                    opts.height = (opts.width * 9)/16;

                    content = 
                        '<div style="display: block; position: relative; max-width: 100%;"><div style="padding-top: 56.25%;">\
                            <iframe src="//players.brightcove.net/'+accountID+'/'+playerID+'_default/index.html?videoId='+videoId+'&playsinline" \
                            allowfullscreen\
                            webkitallowfullscreen\
                            mozallowfullscreen\
                            style="width: 100%; height: 100%; position: absolute; top: 0px; bottom: 0px; right: 0px; left: 0px;"></iframe>\
                        </div></div>';
                }
            }
            
            if (typeof url !== 'undefined' && url !== "") {
                var _player, _isPlaying = false;
                $.fancybox({
                    type: opts.type,
                    scrolling: opts.scrolling,
                    fitToView: opts.fitToView,
                    autoSize: opts.autoSize,
                    maxWidth: opts.maxWidth,
                    aspectRatio: opts.aspectRatio,
                    helpers: {
                        overlay: {
                            locked: false
                        }
                    },
                    beforeLoad: function () {
                        this.content = content; //"<video class ='videoPlayer' src='" + url + "' poster='" + poster + "' width='" + opts.width + "' height='" + opts.height + "' controls='controls' preload='none' ></video>";
                        this.title = caption;
                        this.width = opts.width;
                        this.height = opts.height;
                    },
                    afterShow: function () {


                        if (source.trim() !== 'brightcove'){

                            new MediaElementPlayer('.videoPlayer', {
                                defaultVideoWidth: this.width,
                                defaultVideoHeight: this.height,
                                startVolume: opts.startVolume,
                                loop: opts.loop,
                                enableAutosize: opts.enableAutosize,
                                features: opts.features,
                                alwaysShowControls: opts.alwaysShowControls,
                                iPadUseNativeControls: opts.iPadUseNativeControls,
                                iPhoneUseNativeControls: opts.iPhoneUseNativeControls,
                                AndroidUseNativeControls: opts.AndroidUseNativeControls,
                                alwaysShowHours: opts.alwaysShowHours,
                                showTimecodeFrameCount: opts.showTimecodeFrameCount,
                                framesPerSecond: opts.framesPerSecond,
                                enableKeyboard: opts.enableKeyboard,
                                pauseOtherPlayers: opts.pauseOtherPlayers,
                                success: function (mediaElement, domObject) {
                                    _player = mediaElement;
                                    _player.load();
                                    _player.play();
                                    _player.addEventListener('playing', function () {
                                        _isPlaying = true;
                                    }, false);
                                    if (source.trim() == 'vimeo') { alert();
                                        $('.mejs-controls').remove();
                                    }
                                }
                            });
                        }
                    },
                    beforeClose: function () {
                        if (_isPlaying && navigator.userAgent.match(/msie [6-8]/i)) {
                            _player.remove();
                            _isPlaying = false;
                        }
                    }
                });
            }
        });
    };
}(jQuery));
(function ($) {
    
    $.urlParam = function (name) {
        var url = window.location.href;
        var urlArr = url.split('/');
        return urlArr[urlArr.length - 2];
    };
    
    /*
     *  Load Users Article on view user profile and user post
     */
 
    $.fn.Ajax_LoadMoreUserArticles = function (options) {
        var defaults = {
            container: '#userArticleContainer',
            onSuccess: function () {},
            onError: function () {},
            beforeSend: function () {},
            onComplete: function () {}
        };

        var opts = $.extend({}, defaults, options);

        var username = decodeURIComponent($.urlParam());
        var totalPosts = parseInt($(opts.container).data('total-count'));
        var offset = parseInt($(opts.container).data('offset'));
        if(username === '' || typeof username === 'undefined'){
            return;
        }
        if(isNaN(totalPosts) || isNaN(offset)){
            return;
        }
        
        offset = offset + _appJsConfig.articleOffset; //Declared in _javascripts.php
        if(offset > totalPosts){
            return;
        }
        $(opts.container).data('offset', offset);
        var csrfToken = $('meta[name="csrf-token"]').attr("content");
        
        $.ajax({
                type: 'POST',
                url: _appJsConfig.baseHttpPath + '/profile/' + username + '/posts',
                dataType: 'json',
                data: {offset: offset, _csrf: csrfToken},
                success: function(data, textStatus, jqXHR) {
                    if (opts.onSuccess && typeof opts.onSuccess === 'function') {
                        opts.onSuccess(data);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown){
                    if (opts.onError && typeof opts.onError === 'function') {
                        opts.onError(jqXHR.responseText);
                    }
                },
                beforeSend: function(jqXHR, settings) { 
                    if (opts.beforeSend && typeof opts.beforeSend === 'function') {
                        opts.beforeSend();
                    }
                },
                complete: function(jqXHR, textStatus) {
                    if (opts.onComplete && typeof opts.onComplete === 'function') {
                        opts.onComplete();
                    }
                }
            }); 
    };
    
    /**
     * My News Page Load More Articles
     */
    $.fn.Ajax_LoadMoreMyArticles = function (options) {
        var defaults = {
            containerClass: 'LoadMyArticles',
            onSuccess: function () {},
            onError: function () {},
            beforeSend: function () {},
            onComplete: function () {}
        };

        var opts = $.extend({}, defaults, options);

        var page = parseInt($('.' + opts.containerClass).data('page'));
        if (isNaN(page) || page < 0) {
           page = 1;
        }

        $('.' + opts.containerClass).data('page', (page + 1));
        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        $.ajax({
            type: 'post',
            url: _appJsConfig.baseHttpPath + '/user/load-articles',
            dataType: 'json',
            data: {page: page, limit: _appJsConfig.articleOffset, _csrf: csrfToken},
            success: function (data, textStatus, jqXHR) {
                if (opts.onSuccess && typeof opts.onSuccess === 'function') {
                    opts.onSuccess(data, textStatus, jqXHR);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

                if (opts.onError && typeof opts.onError === 'function') {
                    opts.onError(jqXHR, textStatus, errorThrown);
                }
            },
            beforeSend: function (jqXHR, settings) {
                if (opts.beforeSend && typeof opts.beforeSend === 'function') {
                    opts.beforeSend(jqXHR, settings);
                }
            },
            complete: function (jqXHR, textStatus) {
                if (opts.onComplete && typeof opts.onComplete === 'function') {
                    opts.onComplete(jqXHR, textStatus);
                }
            }
        });
    };
}(jQuery));
(function ($) {
    
    $.image = function (options) {
        var defaults = {
            media : {},
            height: 500,
            width: 500,
            mediaOptions: {}
        };

        var opts = $.extend({}, defaults, options);

        var imageId = opts.media.id;
        var path = opts.media.path;
        var cloudName = opts.media.cloudName;
        if(typeof cloudName === 'undefined' || cloudName === '') {
            return;
        }
        
        $.cloudinary.config({cloud_name:cloudName});
        if(imageId === '' &&  path === '') {
            return;
        }
        
        var imageOptions = $.extend({},{height: opts.height, width: opts.width}, opts.mediaOptions);
        var url = $.cloudinary.url(imageId, imageOptions);
        
        return url;
    };
    
    $.video = function (options) {
        var defaults = {
            media : {},
            width: 700,
            height:400,
            mediaOptions: {}
        };

        var opts = $.extend({}, defaults, options);
        
        var videoId = opts.media.videoId;
        var path = opts.media.path;
        var cloudName = opts.media.cloudName;
        if(typeof cloudName === 'undefined' || cloudName === '') {
            return;
        }
        
        $.cloudinary.config({cloud_name:cloudName});
        if(videoId === '' &&  path === '') {
            return;
        }
        var videoOptions = $.extend({},{height: opts.height, width: opts.width}, opts.mediaOptions);
        var url = $.cloudinary.video(videoId, videoOptions);
        
        return url;
    };
}(jQuery));
(function ($) {

    $.fn.uploadFile = function (options) {

        var defaults = {
            tabs: [],
            onSuccess: function () {},
            onError: function () {}
        };

        var opts = $.extend({}, defaults, options);

        return this.each(function () {
            var elem = $(this);
            $(elem).click(function (e) {
                e.preventDefault();
                e.stopPropagation();

                var obj = $(this);

                //initialization code
                $.loadScript("//api.filepicker.io/v2/filepicker.js", function () {
                    
                    var tabs = $.extend([], ['COMPUTER'], opts.tabs);

                    //Set file picker api key
                    filepicker.setKey(_appJsConfig.filepickerKey);

                    filepicker.pick({
                        mimetype: 'image/*',
                        services: tabs
                    },
                    function (Blob) {
                        var resultJson = {url: Blob.url, filename: Blob.filename, type: Blob.mimetype, size: Blob.size, mediaType: "image"};
                        if (opts.onSuccess && typeof opts.onSuccess === 'function') {
                            opts.onSuccess(resultJson, obj);
                        }
                    },
                    function (FPError) {
                        //  $().General_ShowErrorMessage({message: FPError.toString()});
                    });
                });
            });
        });
    };

    $.loadScript = function (url, callback) {

        var script = document.createElement("script")
        script.type = "text/javascript";

        if (script.readyState) {  //IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" ||
                        script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  //Others
            script.onload = function () {
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    };

}(jQuery));
/*!
 *
 * MediaElement.js
 * HTML5 <video> and <audio> shim and player
 * http://mediaelementjs.com/
 *
 * Creates a JavaScript object that mimics HTML5 MediaElement API
 * for browsers that don't understand HTML5 or can't play the provided codec
 * Can play MP4 (H.264), Ogg, WebM, FLV, WMV, WMA, ACC, and MP3
 *
 * Copyright 2010-2014, John Dyer (http://j.hn)
 * License: MIT
 *
 */
var mejs=mejs||{};mejs.version="2.23.4",mejs.meIndex=0,mejs.plugins={silverlight:[{version:[3,0],types:["video/mp4","video/m4v","video/mov","video/wmv","audio/wma","audio/m4a","audio/mp3","audio/wav","audio/mpeg"]}],flash:[{version:[9,0,124],types:["video/mp4","video/m4v","video/mov","video/flv","video/rtmp","video/x-flv","audio/flv","audio/x-flv","audio/mp3","audio/m4a","audio/mp4","audio/mpeg","video/dailymotion","video/x-dailymotion","application/x-mpegURL","audio/ogg"]}],youtube:[{version:null,types:["video/youtube","video/x-youtube","audio/youtube","audio/x-youtube"]}],vimeo:[{version:null,types:["video/vimeo","video/x-vimeo"]}]},mejs.Utility={encodeUrl:function(a){return encodeURIComponent(a)},escapeHTML:function(a){return a.toString().split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;")},absolutizeUrl:function(a){var b=document.createElement("div");return b.innerHTML='<a href="'+this.escapeHTML(a)+'">x</a>',b.firstChild.href},getScriptPath:function(a){for(var b,c,d,e,f,g,h=0,i="",j="",k=document.getElementsByTagName("script"),l=k.length,m=a.length;l>h;h++){for(e=k[h].src,c=e.lastIndexOf("/"),c>-1?(g=e.substring(c+1),f=e.substring(0,c+1)):(g=e,f=""),b=0;m>b;b++)if(j=a[b],d=g.indexOf(j),d>-1){i=f;break}if(""!==i)break}return i},calculateTimeFormat:function(a,b,c){0>a&&(a=0),"undefined"==typeof c&&(c=25);var d=b.timeFormat,e=d[0],f=d[1]==d[0],g=f?2:1,h=":",i=Math.floor(a/3600)%24,j=Math.floor(a/60)%60,k=Math.floor(a%60),l=Math.floor((a%1*c).toFixed(3)),m=[[l,"f"],[k,"s"],[j,"m"],[i,"h"]];d.length<g&&(h=d[g]);for(var n=!1,o=0,p=m.length;p>o;o++)if(-1!==d.indexOf(m[o][1]))n=!0;else if(n){for(var q=!1,r=o;p>r;r++)if(m[r][0]>0){q=!0;break}if(!q)break;f||(d=e+d),d=m[o][1]+h+d,f&&(d=m[o][1]+d),e=m[o][1]}b.currentTimeFormat=d},twoDigitsString:function(a){return 10>a?"0"+a:String(a)},secondsToTimeCode:function(a,b){if(0>a&&(a=0),"object"!=typeof b){var c="m:ss";c=arguments[1]?"hh:mm:ss":c,c=arguments[2]?c+":ff":c,b={currentTimeFormat:c,framesPerSecond:arguments[3]||25}}var d=b.framesPerSecond;"undefined"==typeof d&&(d=25);var c=b.currentTimeFormat,e=Math.floor(a/3600)%24,f=Math.floor(a/60)%60,g=Math.floor(a%60),h=Math.floor((a%1*d).toFixed(3));lis=[[h,"f"],[g,"s"],[f,"m"],[e,"h"]];var j=c;for(i=0,len=lis.length;i<len;i++)j=j.replace(lis[i][1]+lis[i][1],this.twoDigitsString(lis[i][0])),j=j.replace(lis[i][1],lis[i][0]);return j},timeCodeToSeconds:function(a,b,c,d){"undefined"==typeof c?c=!1:"undefined"==typeof d&&(d=25);var e=a.split(":"),f=parseInt(e[0],10),g=parseInt(e[1],10),h=parseInt(e[2],10),i=0,j=0;return c&&(i=parseInt(e[3])/d),j=3600*f+60*g+h+i},convertSMPTEtoSeconds:function(a){if("string"!=typeof a)return!1;a=a.replace(",",".");var b=0,c=-1!=a.indexOf(".")?a.split(".")[1].length:0,d=1;a=a.split(":").reverse();for(var e=0;e<a.length;e++)d=1,e>0&&(d=Math.pow(60,e)),b+=Number(a[e])*d;return Number(b.toFixed(c))},removeSwf:function(a){var b=document.getElementById(a);b&&/object|embed/i.test(b.nodeName)&&(mejs.MediaFeatures.isIE?(b.style.display="none",function(){4==b.readyState?mejs.Utility.removeObjectInIE(a):setTimeout(arguments.callee,10)}()):b.parentNode.removeChild(b))},removeObjectInIE:function(a){var b=document.getElementById(a);if(b){for(var c in b)"function"==typeof b[c]&&(b[c]=null);b.parentNode.removeChild(b)}},determineScheme:function(a){return a&&-1!=a.indexOf("://")?a.substr(0,a.indexOf("://")+3):"//"},debounce:function(a,b,c){var d;return function(){var e=this,f=arguments,g=function(){d=null,c||a.apply(e,f)},h=c&&!d;clearTimeout(d),d=setTimeout(g,b),h&&a.apply(e,f)}},isNodeAfter:function(a,b){return!!(a&&b&&"function"==typeof a.compareDocumentPosition&&a.compareDocumentPosition(b)&Node.DOCUMENT_POSITION_PRECEDING)}},mejs.PluginDetector={hasPluginVersion:function(a,b){var c=this.plugins[a];return b[1]=b[1]||0,b[2]=b[2]||0,c[0]>b[0]||c[0]==b[0]&&c[1]>b[1]||c[0]==b[0]&&c[1]==b[1]&&c[2]>=b[2]?!0:!1},nav:window.navigator,ua:window.navigator.userAgent.toLowerCase(),plugins:[],addPlugin:function(a,b,c,d,e){this.plugins[a]=this.detectPlugin(b,c,d,e)},detectPlugin:function(a,b,c,d){var e,f,g,h=[0,0,0];if("undefined"!=typeof this.nav.plugins&&"object"==typeof this.nav.plugins[a]){if(e=this.nav.plugins[a].description,e&&("undefined"==typeof this.nav.mimeTypes||!this.nav.mimeTypes[b]||this.nav.mimeTypes[b].enabledPlugin))for(h=e.replace(a,"").replace(/^\s+/,"").replace(/\sr/gi,".").split("."),f=0;f<h.length;f++)h[f]=parseInt(h[f].match(/\d+/),10)}else if("undefined"!=typeof window.ActiveXObject)try{g=new ActiveXObject(c),g&&(h=d(g))}catch(i){}return h}},mejs.PluginDetector.addPlugin("flash","Shockwave Flash","application/x-shockwave-flash","ShockwaveFlash.ShockwaveFlash",function(a){var b=[],c=a.GetVariable("$version");return c&&(c=c.split(" ")[1].split(","),b=[parseInt(c[0],10),parseInt(c[1],10),parseInt(c[2],10)]),b}),mejs.PluginDetector.addPlugin("silverlight","Silverlight Plug-In","application/x-silverlight-2","AgControl.AgControl",function(a){var b=[0,0,0,0],c=function(a,b,c,d){for(;a.isVersionSupported(b[0]+"."+b[1]+"."+b[2]+"."+b[3]);)b[c]+=d;b[c]-=d};return c(a,b,0,1),c(a,b,1,1),c(a,b,2,1e4),c(a,b,2,1e3),c(a,b,2,100),c(a,b,2,10),c(a,b,2,1),c(a,b,3,1),b}),mejs.MediaFeatures={init:function(){var a,b,c=this,d=document,e=mejs.PluginDetector.nav,f=mejs.PluginDetector.ua.toLowerCase(),g=["source","track","audio","video"];c.isiPad=null!==f.match(/ipad/i),c.isiPhone=null!==f.match(/iphone/i),c.isiOS=c.isiPhone||c.isiPad,c.isAndroid=null!==f.match(/android/i),c.isBustedAndroid=null!==f.match(/android 2\.[12]/),c.isBustedNativeHTTPS="https:"===location.protocol&&(null!==f.match(/android [12]\./)||null!==f.match(/macintosh.* version.* safari/)),c.isIE=-1!=e.appName.toLowerCase().indexOf("microsoft")||null!==e.appName.toLowerCase().match(/trident/gi),c.isChrome=null!==f.match(/chrome/gi),c.isChromium=null!==f.match(/chromium/gi),c.isFirefox=null!==f.match(/firefox/gi),c.isWebkit=null!==f.match(/webkit/gi),c.isGecko=null!==f.match(/gecko/gi)&&!c.isWebkit&&!c.isIE,c.isOpera=null!==f.match(/opera/gi),c.hasTouch="ontouchstart"in window,c.svgAsImg=!!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1");for(a=0;a<g.length;a++)b=document.createElement(g[a]);c.supportsMediaTag="undefined"!=typeof b.canPlayType||c.isBustedAndroid;try{b.canPlayType("video/mp4")}catch(h){c.supportsMediaTag=!1}c.supportsPointerEvents=function(){var a,b=document.createElement("x"),c=document.documentElement,d=window.getComputedStyle;return"pointerEvents"in b.style?(b.style.pointerEvents="auto",b.style.pointerEvents="x",c.appendChild(b),a=d&&"auto"===d(b,"").pointerEvents,c.removeChild(b),!!a):!1}(),c.hasFirefoxPluginMovingProblem=!1,c.hasiOSFullScreen="undefined"!=typeof b.webkitEnterFullscreen,c.hasNativeFullscreen="undefined"!=typeof b.requestFullscreen,c.hasWebkitNativeFullScreen="undefined"!=typeof b.webkitRequestFullScreen,c.hasMozNativeFullScreen="undefined"!=typeof b.mozRequestFullScreen,c.hasMsNativeFullScreen="undefined"!=typeof b.msRequestFullscreen,c.hasTrueNativeFullScreen=c.hasWebkitNativeFullScreen||c.hasMozNativeFullScreen||c.hasMsNativeFullScreen,c.nativeFullScreenEnabled=c.hasTrueNativeFullScreen,c.hasMozNativeFullScreen?c.nativeFullScreenEnabled=document.mozFullScreenEnabled:c.hasMsNativeFullScreen&&(c.nativeFullScreenEnabled=document.msFullscreenEnabled),c.isChrome&&(c.hasiOSFullScreen=!1),c.hasTrueNativeFullScreen&&(c.fullScreenEventName="",c.hasWebkitNativeFullScreen?c.fullScreenEventName="webkitfullscreenchange":c.hasMozNativeFullScreen?c.fullScreenEventName="mozfullscreenchange":c.hasMsNativeFullScreen&&(c.fullScreenEventName="MSFullscreenChange"),c.isFullScreen=function(){return c.hasMozNativeFullScreen?d.mozFullScreen:c.hasWebkitNativeFullScreen?d.webkitIsFullScreen:c.hasMsNativeFullScreen?null!==d.msFullscreenElement:void 0},c.requestFullScreen=function(a){c.hasWebkitNativeFullScreen?a.webkitRequestFullScreen():c.hasMozNativeFullScreen?a.mozRequestFullScreen():c.hasMsNativeFullScreen&&a.msRequestFullscreen()},c.cancelFullScreen=function(){c.hasWebkitNativeFullScreen?document.webkitCancelFullScreen():c.hasMozNativeFullScreen?document.mozCancelFullScreen():c.hasMsNativeFullScreen&&document.msExitFullscreen()}),c.hasiOSFullScreen&&f.match(/mac os x 10_5/i)&&(c.hasNativeFullScreen=!1,c.hasiOSFullScreen=!1)}},mejs.MediaFeatures.init(),mejs.HtmlMediaElement={pluginType:"native",isFullScreen:!1,setCurrentTime:function(a){this.currentTime=a},setMuted:function(a){this.muted=a},setVolume:function(a){this.volume=a},stop:function(){this.pause()},setSrc:function(a){for(var b=this.getElementsByTagName("source");b.length>0;)this.removeChild(b[0]);if("string"==typeof a)this.src=a;else{var c,d;for(c=0;c<a.length;c++)if(d=a[c],this.canPlayType(d.type)){this.src=d.src;break}}},setVideoSize:function(a,b){this.width=a,this.height=b}},mejs.PluginMediaElement=function(a,b,c){this.id=a,this.pluginType=b,this.src=c,this.events={},this.attributes={}},mejs.PluginMediaElement.prototype={pluginElement:null,pluginType:"",isFullScreen:!1,playbackRate:-1,defaultPlaybackRate:-1,seekable:[],played:[],paused:!0,ended:!1,seeking:!1,duration:0,error:null,tagName:"",muted:!1,volume:1,currentTime:0,play:function(){null!=this.pluginApi&&("youtube"==this.pluginType||"vimeo"==this.pluginType?this.pluginApi.playVideo():this.pluginApi.playMedia(),this.paused=!1)},load:function(){null!=this.pluginApi&&("youtube"==this.pluginType||"vimeo"==this.pluginType||this.pluginApi.loadMedia(),this.paused=!1)},pause:function(){null!=this.pluginApi&&("youtube"==this.pluginType||"vimeo"==this.pluginType?1==this.pluginApi.getPlayerState()&&this.pluginApi.pauseVideo():this.pluginApi.pauseMedia(),this.paused=!0)},stop:function(){null!=this.pluginApi&&("youtube"==this.pluginType||"vimeo"==this.pluginType?this.pluginApi.stopVideo():this.pluginApi.stopMedia(),this.paused=!0)},canPlayType:function(a){var b,c,d,e=mejs.plugins[this.pluginType];for(b=0;b<e.length;b++)if(d=e[b],mejs.PluginDetector.hasPluginVersion(this.pluginType,d.version))for(c=0;c<d.types.length;c++)if(a==d.types[c])return"probably";return""},positionFullscreenButton:function(a,b,c){null!=this.pluginApi&&this.pluginApi.positionFullscreenButton&&this.pluginApi.positionFullscreenButton(Math.floor(a),Math.floor(b),c)},hideFullscreenButton:function(){null!=this.pluginApi&&this.pluginApi.hideFullscreenButton&&this.pluginApi.hideFullscreenButton()},setSrc:function(a){if("string"==typeof a)this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(a)),this.src=mejs.Utility.absolutizeUrl(a);else{var b,c;for(b=0;b<a.length;b++)if(c=a[b],this.canPlayType(c.type)){this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(c.src)),this.src=mejs.Utility.absolutizeUrl(c.src);break}}},setCurrentTime:function(a){null!=this.pluginApi&&("youtube"==this.pluginType||"vimeo"==this.pluginType?this.pluginApi.seekTo(a):this.pluginApi.setCurrentTime(a),this.currentTime=a)},setVolume:function(a){null!=this.pluginApi&&("youtube"==this.pluginType?this.pluginApi.setVolume(100*a):this.pluginApi.setVolume(a),this.volume=a)},setMuted:function(a){null!=this.pluginApi&&("youtube"==this.pluginType?(a?this.pluginApi.mute():this.pluginApi.unMute(),this.muted=a,this.dispatchEvent({type:"volumechange"})):this.pluginApi.setMuted(a),this.muted=a)},setVideoSize:function(a,b){this.pluginElement&&this.pluginElement.style&&(this.pluginElement.style.width=a+"px",this.pluginElement.style.height=b+"px"),null!=this.pluginApi&&this.pluginApi.setVideoSize&&this.pluginApi.setVideoSize(a,b)},setFullscreen:function(a){null!=this.pluginApi&&this.pluginApi.setFullscreen&&this.pluginApi.setFullscreen(a)},enterFullScreen:function(){null!=this.pluginApi&&this.pluginApi.setFullscreen&&this.setFullscreen(!0)},exitFullScreen:function(){null!=this.pluginApi&&this.pluginApi.setFullscreen&&this.setFullscreen(!1)},addEventListener:function(a,b,c){this.events[a]=this.events[a]||[],this.events[a].push(b)},removeEventListener:function(a,b){if(!a)return this.events={},!0;var c=this.events[a];if(!c)return!0;if(!b)return this.events[a]=[],!0;for(var d=0;d<c.length;d++)if(c[d]===b)return this.events[a].splice(d,1),!0;return!1},dispatchEvent:function(a){var b,c=this.events[a.type];if(c)for(b=0;b<c.length;b++)c[b].apply(this,[a])},hasAttribute:function(a){return a in this.attributes},removeAttribute:function(a){delete this.attributes[a]},getAttribute:function(a){return this.hasAttribute(a)?this.attributes[a]:null},setAttribute:function(a,b){this.attributes[a]=b},remove:function(){mejs.Utility.removeSwf(this.pluginElement.id)}},mejs.MediaElementDefaults={mode:"auto",plugins:["flash","silverlight","youtube","vimeo"],enablePluginDebug:!1,httpsBasicAuthSite:!1,type:"",pluginPath:mejs.Utility.getScriptPath(["mediaelement.js","mediaelement.min.js","mediaelement-and-player.js","mediaelement-and-player.min.js"]),flashName:"flashmediaelement.swf",flashStreamer:"",flashScriptAccess:"sameDomain",enablePluginSmoothing:!1,enablePseudoStreaming:!1,pseudoStreamingStartQueryParam:"start",silverlightName:"silverlightmediaelement.xap",defaultVideoWidth:480,defaultVideoHeight:270,pluginWidth:-1,pluginHeight:-1,pluginVars:[],timerRate:250,startVolume:.8,customError:"",success:function(){},error:function(){}},mejs.MediaElement=function(a,b){return mejs.HtmlMediaElementShim.create(a,b)},mejs.HtmlMediaElementShim={create:function(a,b){var c,d,e={},f="string"==typeof a?document.getElementById(a):a,g=f.tagName.toLowerCase(),h="audio"===g||"video"===g,i=h?f.getAttribute("src"):f.getAttribute("href"),j=f.getAttribute("poster"),k=f.getAttribute("autoplay"),l=f.getAttribute("preload"),m=f.getAttribute("controls");for(d in mejs.MediaElementDefaults)e[d]=mejs.MediaElementDefaults[d];for(d in b)e[d]=b[d];return i="undefined"==typeof i||null===i||""==i?null:i,j="undefined"==typeof j||null===j?"":j,l="undefined"==typeof l||null===l||"false"===l?"none":l,k=!("undefined"==typeof k||null===k||"false"===k),m=!("undefined"==typeof m||null===m||"false"===m),c=this.determinePlayback(f,e,mejs.MediaFeatures.supportsMediaTag,h,i),c.url=null!==c.url?mejs.Utility.absolutizeUrl(c.url):"",c.scheme=mejs.Utility.determineScheme(c.url),"native"==c.method?(mejs.MediaFeatures.isBustedAndroid&&(f.src=c.url,f.addEventListener("click",function(){f.play()},!1)),this.updateNative(c,e,k,l)):""!==c.method?this.createPlugin(c,e,j,k,l,m):(this.createErrorMessage(c,e,j),this)},determinePlayback:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=[],r={method:"",url:"",htmlMediaElement:a,isVideo:"audio"!==a.tagName.toLowerCase(),scheme:""};if("undefined"!=typeof b.type&&""!==b.type)if("string"==typeof b.type)q.push({type:b.type,url:e});else for(f=0;f<b.type.length;f++)q.push({type:b.type[f],url:e});else if(null!==e)k=this.formatType(e,a.getAttribute("type")),q.push({type:k,url:e});else for(f=0;f<a.childNodes.length;f++)j=a.childNodes[f],1==j.nodeType&&"source"==j.tagName.toLowerCase()&&(e=j.getAttribute("src"),k=this.formatType(e,j.getAttribute("type")),p=j.getAttribute("media"),(!p||!window.matchMedia||window.matchMedia&&window.matchMedia(p).matches)&&q.push({type:k,url:e}));if(!d&&q.length>0&&null!==q[0].url&&this.getTypeFromFile(q[0].url).indexOf("audio")>-1&&(r.isVideo=!1),r.isVideo&&mejs.MediaFeatures.isBustedAndroid&&(a.canPlayType=function(a){return null!==a.match(/video\/(mp4|m4v)/gi)?"maybe":""}),r.isVideo&&mejs.MediaFeatures.isChromium&&(a.canPlayType=function(a){return null!==a.match(/video\/(webm|ogv|ogg)/gi)?"maybe":""}),c&&("auto"===b.mode||"auto_plugin"===b.mode||"native"===b.mode)&&(!mejs.MediaFeatures.isBustedNativeHTTPS||b.httpsBasicAuthSite!==!0)){for(d||(o=document.createElement(r.isVideo?"video":"audio"),a.parentNode.insertBefore(o,a),a.style.display="none",r.htmlMediaElement=a=o),f=0;f<q.length;f++)if("video/m3u8"==q[f].type||""!==a.canPlayType(q[f].type).replace(/no/,"")||""!==a.canPlayType(q[f].type.replace(/mp3/,"mpeg")).replace(/no/,"")||""!==a.canPlayType(q[f].type.replace(/m4a/,"mp4")).replace(/no/,"")){r.method="native",r.url=q[f].url;break}if("native"===r.method&&(null!==r.url&&(a.src=r.url),"auto_plugin"!==b.mode))return r}if("auto"===b.mode||"auto_plugin"===b.mode||"shim"===b.mode)for(f=0;f<q.length;f++)for(k=q[f].type,g=0;g<b.plugins.length;g++)for(l=b.plugins[g],m=mejs.plugins[l],h=0;h<m.length;h++)if(n=m[h],null==n.version||mejs.PluginDetector.hasPluginVersion(l,n.version))for(i=0;i<n.types.length;i++)if(k.toLowerCase()==n.types[i].toLowerCase())return r.method=l,r.url=q[f].url,r;return"auto_plugin"===b.mode&&"native"===r.method?r:(""===r.method&&q.length>0&&(r.url=q[0].url),r)},formatType:function(a,b){return a&&!b?this.getTypeFromFile(a):b&&~b.indexOf(";")?b.substr(0,b.indexOf(";")):b},getTypeFromFile:function(a){a=a.split("?")[0];var b=a.substring(a.lastIndexOf(".")+1).toLowerCase(),c=/(mp4|m4v|ogg|ogv|m3u8|webm|webmv|flv|wmv|mpeg|mov)/gi.test(b)?"video/":"audio/";return this.getTypeFromExtension(b,c)},getTypeFromExtension:function(a,b){switch(b=b||"",a){case"mp4":case"m4v":case"m4a":case"f4v":case"f4a":return b+"mp4";case"flv":return b+"x-flv";case"webm":case"webma":case"webmv":return b+"webm";case"ogg":case"oga":case"ogv":return b+"ogg";case"m3u8":return"application/x-mpegurl";case"ts":return b+"mp2t";default:return b+a}},createErrorMessage:function(a,b,c){var d=a.htmlMediaElement,e=document.createElement("div"),f=b.customError;e.className="me-cannotplay";try{e.style.width=d.width+"px",e.style.height=d.height+"px"}catch(g){}f||(f='<a href="'+a.url+'">',""!==c&&(f+='<img src="'+c+'" width="100%" height="100%" alt="" />'),f+="<span>"+mejs.i18n.t("mejs.download-file")+"</span></a>"),e.innerHTML=f,d.parentNode.insertBefore(e,d),d.style.display="none",b.error(d)},createPlugin:function(a,b,c,d,e,f){var g,h,i,j=a.htmlMediaElement,k=1,l=1,m="me_"+a.method+"_"+mejs.meIndex++,n=new mejs.PluginMediaElement(m,a.method,a.url),o=document.createElement("div");n.tagName=j.tagName;for(var p=0;p<j.attributes.length;p++){var q=j.attributes[p];q.specified&&n.setAttribute(q.name,q.value)}for(h=j.parentNode;null!==h&&null!=h.tagName&&"body"!==h.tagName.toLowerCase()&&null!=h.parentNode&&null!=h.parentNode.tagName&&null!=h.parentNode.constructor&&"ShadowRoot"===h.parentNode.constructor.name;){if("p"===h.parentNode.tagName.toLowerCase()){h.parentNode.parentNode.insertBefore(h,h.parentNode);break}h=h.parentNode}if(a.isVideo?(k=b.pluginWidth>0?b.pluginWidth:b.videoWidth>0?b.videoWidth:null!==j.getAttribute("width")?j.getAttribute("width"):b.defaultVideoWidth,l=b.pluginHeight>0?b.pluginHeight:b.videoHeight>0?b.videoHeight:null!==j.getAttribute("height")?j.getAttribute("height"):b.defaultVideoHeight,k=mejs.Utility.encodeUrl(k),l=mejs.Utility.encodeUrl(l)):b.enablePluginDebug&&(k=320,l=240),n.success=b.success,o.className="me-plugin",o.id=m+"_container",a.isVideo?j.parentNode.insertBefore(o,j):document.body.insertBefore(o,document.body.childNodes[0]),"flash"===a.method||"silverlight"===a.method){var r="audio/mp4"===j.getAttribute("type"),s=j.getElementsByTagName("source");if(s&&!r)for(var p=0,t=s.length;t>p;p++)"audio/mp4"===s[p].getAttribute("type")&&(r=!0);i=["id="+m,"isvideo="+(a.isVideo||r?"true":"false"),"autoplay="+(d?"true":"false"),"preload="+e,"width="+k,"startvolume="+b.startVolume,"timerrate="+b.timerRate,"flashstreamer="+b.flashStreamer,"height="+l,"pseudostreamstart="+b.pseudoStreamingStartQueryParam],null!==a.url&&("flash"==a.method?i.push("file="+mejs.Utility.encodeUrl(a.url)):i.push("file="+a.url)),b.enablePluginDebug&&i.push("debug=true"),b.enablePluginSmoothing&&i.push("smoothing=true"),b.enablePseudoStreaming&&i.push("pseudostreaming=true"),f&&i.push("controls=true"),b.pluginVars&&(i=i.concat(b.pluginVars)),window[m+"_init"]=function(){switch(n.pluginType){case"flash":n.pluginElement=n.pluginApi=document.getElementById(m);break;case"silverlight":n.pluginElement=document.getElementById(n.id),n.pluginApi=n.pluginElement.Content.MediaElementJS}null!=n.pluginApi&&n.success&&n.success(n,j)},window[m+"_event"]=function(a,b){var c,d,e;c={type:a,target:n};for(d in b)n[d]=b[d],c[d]=b[d];e=b.bufferedTime||0,c.target.buffered=c.buffered={start:function(a){return 0},end:function(a){return e},length:1},n.dispatchEvent(c)}}switch(a.method){case"silverlight":o.innerHTML='<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="'+m+'" name="'+m+'" width="'+k+'" height="'+l+'" class="mejs-shim"><param name="initParams" value="'+i.join(",")+'" /><param name="windowless" value="true" /><param name="background" value="black" /><param name="minRuntimeVersion" value="3.0.0.0" /><param name="autoUpgrade" value="true" /><param name="source" value="'+b.pluginPath+b.silverlightName+'" /></object>';break;case"flash":mejs.MediaFeatures.isIE?(g=document.createElement("div"),o.appendChild(g),g.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="'+m+'" width="'+k+'" height="'+l+'" class="mejs-shim"><param name="movie" value="'+b.pluginPath+b.flashName+"?"+(new Date).getTime()+'" /><param name="flashvars" value="'+i.join("&amp;")+'" /><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="'+b.flashScriptAccess+'" /><param name="allowFullScreen" value="true" /><param name="scale" value="default" /></object>'):o.innerHTML='<embed id="'+m+'" name="'+m+'" play="true" loop="false" quality="high" bgcolor="#000000" wmode="transparent" allowScriptAccess="'+b.flashScriptAccess+'" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" src="'+b.pluginPath+b.flashName+'" flashvars="'+i.join("&")+'" width="'+k+'" height="'+l+'" scale="default"class="mejs-shim"></embed>';break;case"youtube":var u;if(-1!=a.url.lastIndexOf("youtu.be"))u=a.url.substr(a.url.lastIndexOf("/")+1),-1!=u.indexOf("?")&&(u=u.substr(0,u.indexOf("?")));else{var v=a.url.match(/[?&]v=([^&#]+)|&|#|$/);v&&(u=v[1])}youtubeSettings={container:o,containerId:o.id,pluginMediaElement:n,pluginId:m,videoId:u,height:l,width:k,scheme:a.scheme,variables:b.youtubeIframeVars},window.postMessage?mejs.YouTubeApi.enqueueIframe(youtubeSettings):mejs.PluginDetector.hasPluginVersion("flash",[10,0,0])&&mejs.YouTubeApi.createFlash(youtubeSettings,b);break;case"vimeo":var w=m+"_player";if(n.vimeoid=a.url.substr(a.url.lastIndexOf("/")+1),o.innerHTML='<iframe src="'+a.scheme+"player.vimeo.com/video/"+n.vimeoid+"?api=1&portrait=0&byline=0&title=0&player_id="+w+'" width="'+k+'" height="'+l+'" frameborder="0" class="mejs-shim" id="'+w+'" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',"function"==typeof $f){var x=$f(o.childNodes[0]),y=-1;x.addEvent("ready",function(){function a(a,b,c,d){var e={type:c,target:b};"timeupdate"==c&&(b.currentTime=e.currentTime=d.seconds,b.duration=e.duration=d.duration),b.dispatchEvent(e)}x.playVideo=function(){x.api("play")},x.stopVideo=function(){x.api("unload")},x.pauseVideo=function(){x.api("pause")},x.seekTo=function(a){x.api("seekTo",a)},x.setVolume=function(a){x.api("setVolume",a)},x.setMuted=function(a){a?(x.lastVolume=x.api("getVolume"),x.api("setVolume",0)):(x.api("setVolume",x.lastVolume),delete x.lastVolume)},x.getPlayerState=function(){return y},x.addEvent("play",function(){y=1,a(x,n,"play"),a(x,n,"playing")}),x.addEvent("pause",function(){y=2,a(x,n,"pause")}),x.addEvent("finish",function(){y=0,a(x,n,"ended")}),x.addEvent("playProgress",function(b){a(x,n,"timeupdate",b)}),x.addEvent("seek",function(b){y=3,a(x,n,"seeked",b)}),x.addEvent("loadProgress",function(b){y=3,a(x,n,"progress",b)}),n.pluginElement=o,n.pluginApi=x,n.success(n,n.pluginElement)})}else console.warn("You need to include froogaloop for vimeo to work")}return j.style.display="none",j.removeAttribute("autoplay"),n},updateNative:function(a,b,c,d){var e,f=a.htmlMediaElement;for(e in mejs.HtmlMediaElement)f[e]=mejs.HtmlMediaElement[e];return b.success(f,f),f}},mejs.YouTubeApi={isIframeStarted:!1,isIframeLoaded:!1,loadIframeApi:function(a){if(!this.isIframeStarted){var b=document.createElement("script");b.src=a.scheme+"www.youtube.com/player_api";var c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c),this.isIframeStarted=!0}},iframeQueue:[],enqueueIframe:function(a){this.isLoaded?this.createIframe(a):(this.loadIframeApi(a),this.iframeQueue.push(a))},createIframe:function(a){var b=a.pluginMediaElement,c={controls:0,wmode:"transparent"},d=new YT.Player(a.containerId,{height:a.height,width:a.width,videoId:a.videoId,playerVars:mejs.$.extend({},c,a.variables),events:{onReady:function(c){d.setVideoSize=function(a,b){d.setSize(a,b)},a.pluginMediaElement.pluginApi=d,a.pluginMediaElement.pluginElement=document.getElementById(a.containerId),b.success(b,b.pluginElement),mejs.YouTubeApi.createEvent(d,b,"canplay"),setInterval(function(){mejs.YouTubeApi.createEvent(d,b,"timeupdate")},250),"undefined"!=typeof b.attributes.autoplay&&d.playVideo()},onStateChange:function(a){mejs.YouTubeApi.handleStateChange(a.data,d,b)}}})},createEvent:function(a,b,c){var d={type:c,target:b};if(a&&a.getDuration){b.currentTime=d.currentTime=a.getCurrentTime(),b.duration=d.duration=a.getDuration(),d.paused=b.paused,d.ended=b.ended,d.muted=a.isMuted(),d.volume=a.getVolume()/100,d.bytesTotal=a.getVideoBytesTotal(),d.bufferedBytes=a.getVideoBytesLoaded();var e=d.bufferedBytes/d.bytesTotal*d.duration;d.target.buffered=d.buffered={start:function(a){return 0},end:function(a){return e},length:1}}b.dispatchEvent(d)},iFrameReady:function(){for(this.isLoaded=!0,this.isIframeLoaded=!0;this.iframeQueue.length>0;){var a=this.iframeQueue.pop();this.createIframe(a)}},flashPlayers:{},createFlash:function(a){this.flashPlayers[a.pluginId]=a;var b,c=a.scheme+"www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid="+a.pluginId+"&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0";mejs.MediaFeatures.isIE?(b=document.createElement("div"),a.container.appendChild(b),b.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="'+a.scheme+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="'+a.pluginId+'" width="'+a.width+'" height="'+a.height+'" class="mejs-shim"><param name="movie" value="'+c+'" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="'+options.flashScriptAccess+'" /><param name="allowFullScreen" value="true" /></object>'):a.container.innerHTML='<object type="application/x-shockwave-flash" id="'+a.pluginId+'" data="'+c+'" width="'+a.width+'" height="'+a.height+'" style="visibility: visible; " class="mejs-shim"><param name="allowScriptAccess" value="'+options.flashScriptAccess+'"><param name="wmode" value="transparent"></object>'},flashReady:function(a){var b=this.flashPlayers[a],c=document.getElementById(a),d=b.pluginMediaElement;d.pluginApi=d.pluginElement=c,b.success(d,d.pluginElement),c.cueVideoById(b.videoId);var e=b.containerId+"_callback";window[e]=function(a){mejs.YouTubeApi.handleStateChange(a,c,d)},c.addEventListener("onStateChange",e),setInterval(function(){mejs.YouTubeApi.createEvent(c,d,"timeupdate")},250),mejs.YouTubeApi.createEvent(c,d,"canplay")},handleStateChange:function(a,b,c){switch(a){case-1:c.paused=!0,c.ended=!0,mejs.YouTubeApi.createEvent(b,c,"loadedmetadata");break;case 0:c.paused=!1,c.ended=!0,mejs.YouTubeApi.createEvent(b,c,"ended");break;case 1:c.paused=!1,c.ended=!1,mejs.YouTubeApi.createEvent(b,c,"play"),mejs.YouTubeApi.createEvent(b,c,"playing");break;case 2:c.paused=!0,c.ended=!1,mejs.YouTubeApi.createEvent(b,c,"pause");break;case 3:mejs.YouTubeApi.createEvent(b,c,"progress");break;case 5:}}},window.onYouTubePlayerAPIReady=function(){mejs.YouTubeApi.iFrameReady()},window.onYouTubePlayerReady=function(a){mejs.YouTubeApi.flashReady(a)},window.mejs=mejs,window.MediaElement=mejs.MediaElement,function(a,b,c,d){var e={"default":"en",locale:{language:c.i18n&&c.i18n.locale.language||"",strings:c.i18n&&c.i18n.locale.strings||{}},pluralForms:[function(){return arguments[1]},function(){var a=arguments;return 1===a[0]?a[1]:a[2]},function(){var a=arguments;return[0,1].indexOf(a[0])>-1?a[1]:a[2]},function(){var a=arguments;return a[0]%10===1&&a[0]%100!==11?a[1]:0!==a[0]?a[2]:a[3]},function(){var a=arguments;return 1===a[0]||11===a[0]?a[1]:2===a[0]||12===a[0]?a[2]:a[0]>2&&a[0]<20?a[3]:a[4]},function(){return 1===args[0]?args[1]:0===args[0]||args[0]%100>0&&args[0]%100<20?args[2]:args[3]},function(){var a=arguments;return a[0]%10===1&&a[0]%100!==11?a[1]:a[0]%10>=2&&(a[0]%100<10||a[0]%100>=20)?a[2]:[3]},function(){var a=arguments;return a[0]%10===1&&a[0]%100!==11?a[1]:a[0]%10>=2&&a[0]%10<=4&&(a[0]%100<10||a[0]%100>=20)?a[2]:a[3]},function(){var a=arguments;return 1===a[0]?a[1]:a[0]>=2&&a[0]<=4?a[2]:a[3]},function(){var a=arguments;return 1===a[0]?a[1]:a[0]%10>=2&&a[0]%10<=4&&(a[0]%100<10||a[0]%100>=20)?a[2]:a[3]},function(){var a=arguments;return a[0]%100===1?a[2]:a[0]%100===2?a[3]:a[0]%100===3||a[0]%100===4?a[4]:a[1]},function(){var a=arguments;return 1===a[0]?a[1]:2===a[0]?a[2]:a[0]>2&&a[0]<7?a[3]:a[0]>6&&a[0]<11?a[4]:a[5]},function(){var a=arguments;return 0===a[0]?a[1]:1===a[0]?a[2]:2===a[0]?a[3]:a[0]%100>=3&&a[0]%100<=10?a[4]:a[0]%100>=11?a[5]:a[6]},function(){var a=arguments;return 1===a[0]?a[1]:0===a[0]||a[0]%100>1&&a[0]%100<11?a[2]:a[0]%100>10&&a[0]%100<20?a[3]:a[4]},function(){var a=arguments;return a[0]%10===1?a[1]:a[0]%10===2?a[2]:a[3]},function(){var a=arguments;return 11!==a[0]&&a[0]%10===1?a[1]:a[2]},function(){var a=arguments;return 1===a[0]?a[1]:a[0]%10>=2&&a[0]%10<=4&&(a[0]%100<10||a[0]%100>=20)?a[2]:a[3]},function(){var a=arguments;return 1===a[0]?a[1]:2===a[0]?a[2]:8!==a[0]&&11!==a[0]?a[3]:a[4]},function(){var a=arguments;return 0===a[0]?a[1]:a[2]},function(){var a=arguments;return 1===a[0]?a[1]:2===a[0]?a[2]:3===a[0]?a[3]:a[4]},function(){var a=arguments;return 0===a[0]?a[1]:1===a[0]?a[2]:a[3]}],getLanguage:function(){var a=e.locale.language||e["default"];return/^(x\-)?[a-z]{2,}(\-\w{2,})?(\-\w{2,})?$/.exec(a)?a:e["default"]},t:function(a,b){if("string"==typeof a&&a.length){var c,d,f=e.getLanguage(),g=function(a,b,c){return"object"!=typeof a||"number"!=typeof b||"number"!=typeof c?a:"string"==typeof a?a:e.pluralForms[c].apply(null,[b].concat(a))},h=function(a){var b={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};return a.replace(/[&<>"]/g,function(a){return b[a]})};return e.locale.strings&&e.locale.strings[f]&&(c=e.locale.strings[f][a],"number"==typeof b&&(d=e.locale.strings[f]["mejs.plural-form"],c=g.apply(null,[c,b,d]))),!c&&e.locale.strings&&e.locale.strings[e["default"]]&&(c=e.locale.strings[e["default"]][a],"number"==typeof b&&(d=e.locale.strings[e["default"]]["mejs.plural-form"],c=g.apply(null,[c,b,d]))),c=c||a,"number"==typeof b&&(c=c.replace("%1",b)),h(c)}return a}};"undefined"!=typeof mejsL10n&&(e.locale.language=mejsL10n.language),c.i18n=e}(document,window,mejs),function(a,b){"use strict";"undefined"!=typeof mejsL10n&&(a[mejsL10n.lang]=mejsL10n.strings)}(mejs.i18n.locale.strings),/*!
 * This is a i18n.locale language object.
 *
 * English; This can serve as a template for other languages to translate
 *
 * @author
 *   TBD
 *   Sascha Greuel (Twitter: @SoftCreatR)
 *
 * @see
 *   me-i18n.js
 *
 * @params
 *  - exports - CommonJS, window ..
 */
function(a){"use strict";void 0===a.en&&(a.en={"mejs.plural-form":1,"mejs.download-file":"Download File","mejs.fullscreen-off":"Turn off Fullscreen","mejs.fullscreen-on":"Go Fullscreen","mejs.download-video":"Download Video","mejs.fullscreen":"Fullscreen","mejs.time-jump-forward":["Jump forward 1 second","Jump forward %1 seconds"],"mejs.play":"Play","mejs.pause":"Pause","mejs.close":"Close","mejs.time-slider":"Time Slider","mejs.time-help-text":"Use Left/Right Arrow keys to advance one second, Up/Down arrows to advance ten seconds.","mejs.time-skip-back":["Skip back 1 second","Skip back %1 seconds"],"mejs.captions-subtitles":"Captions/Subtitles","mejs.none":"None","mejs.mute-toggle":"Mute Toggle","mejs.volume-help-text":"Use Up/Down Arrow keys to increase or decrease volume.","mejs.unmute":"Unmute","mejs.mute":"Mute","mejs.volume-slider":"Volume Slider","mejs.video-player":"Video Player","mejs.audio-player":"Audio Player","mejs.ad-skip":"Skip ad","mejs.ad-skip-info":["Skip in 1 second","Skip in %1 seconds"],"mejs.source-chooser":"Source Chooser"})}(mejs.i18n.locale.strings),/*!
 *
 * MediaElementPlayer
 * http://mediaelementjs.com/
 *
 * Creates a controller bar for HTML5 <video> add <audio> tags
 * using jQuery and MediaElement.js (HTML5 Flash/Silverlight wrapper)
 *
 * Copyright 2010-2013, John Dyer (http://j.hn/)
 * License: MIT
 *
 */
"undefined"!=typeof jQuery?mejs.$=jQuery:"undefined"!=typeof Zepto?(mejs.$=Zepto,Zepto.fn.outerWidth=function(a){var b=$(this).width();return a&&(b+=parseInt($(this).css("margin-right"),10),b+=parseInt($(this).css("margin-left"),10)),b}):"undefined"!=typeof ender&&(mejs.$=ender),function(a){mejs.MepDefaults={poster:"",showPosterWhenEnded:!1,defaultVideoWidth:480,defaultVideoHeight:270,videoWidth:-1,videoHeight:-1,defaultAudioWidth:400,defaultAudioHeight:30,defaultSeekBackwardInterval:function(a){return.05*a.duration},defaultSeekForwardInterval:function(a){return.05*a.duration},setDimensions:!0,audioWidth:-1,audioHeight:-1,startVolume:.8,loop:!1,autoRewind:!0,enableAutosize:!0,timeFormat:"",alwaysShowHours:!1,showTimecodeFrameCount:!1,framesPerSecond:25,autosizeProgress:!0,alwaysShowControls:!1,hideVideoControlsOnLoad:!1,clickToPlayPause:!0,controlsTimeoutDefault:1500,controlsTimeoutMouseEnter:2500,controlsTimeoutMouseLeave:1e3,iPadUseNativeControls:!1,iPhoneUseNativeControls:!1,AndroidUseNativeControls:!1,features:["playpause","current","progress","duration","tracks","volume","fullscreen"],isVideo:!0,stretching:"auto",enableKeyboard:!0,pauseOtherPlayers:!0,keyActions:[{keys:[32,179],action:function(a,b,c,d){mejs.MediaFeatures.isFirefox||(b.paused||b.ended?b.play():b.pause())}},{keys:[38],action:function(a,b,c,d){a.container.find(".mejs-volume-slider").css("display","block"),a.isVideo&&(a.showControls(),a.startControlsTimer());var e=Math.min(b.volume+.1,1);b.setVolume(e)}},{keys:[40],action:function(a,b,c,d){a.container.find(".mejs-volume-slider").css("display","block"),a.isVideo&&(a.showControls(),a.startControlsTimer());var e=Math.max(b.volume-.1,0);b.setVolume(e)}},{keys:[37,227],action:function(a,b,c,d){if(!isNaN(b.duration)&&b.duration>0){a.isVideo&&(a.showControls(),a.startControlsTimer());var e=Math.max(b.currentTime-a.options.defaultSeekBackwardInterval(b),0);b.setCurrentTime(e)}}},{keys:[39,228],action:function(a,b,c,d){if(!isNaN(b.duration)&&b.duration>0){a.isVideo&&(a.showControls(),a.startControlsTimer());var e=Math.min(b.currentTime+a.options.defaultSeekForwardInterval(b),b.duration);b.setCurrentTime(e)}}},{keys:[70],action:function(a,b,c,d){"undefined"!=typeof a.enterFullScreen&&(a.isFullScreen?a.exitFullScreen():a.enterFullScreen())}},{keys:[77],action:function(a,b,c,d){a.container.find(".mejs-volume-slider").css("display","block"),a.isVideo&&(a.showControls(),a.startControlsTimer()),a.media.muted?a.setMuted(!1):a.setMuted(!0)}}]},mejs.mepIndex=0,mejs.players={},mejs.MediaElementPlayer=function(b,c){if(!(this instanceof mejs.MediaElementPlayer))return new mejs.MediaElementPlayer(b,c);var d=this;return d.$media=d.$node=a(b),d.node=d.media=d.$media[0],d.node?"undefined"!=typeof d.node.player?d.node.player:("undefined"==typeof c&&(c=d.$node.data("mejsoptions")),d.options=a.extend({},mejs.MepDefaults,c),d.options.timeFormat||(d.options.timeFormat="mm:ss",d.options.alwaysShowHours&&(d.options.timeFormat="hh:mm:ss"),d.options.showTimecodeFrameCount&&(d.options.timeFormat+=":ff")),mejs.Utility.calculateTimeFormat(0,d.options,d.options.framesPerSecond||25),d.id="mep_"+mejs.mepIndex++,mejs.players[d.id]=d,d.init(),d):void 0},mejs.MediaElementPlayer.prototype={hasFocus:!1,controlsAreVisible:!0,init:function(){var b=this,c=mejs.MediaFeatures,d=a.extend(!0,{},b.options,{success:function(a,c){b.meReady(a,c)},error:function(a){b.handleError(a)}}),e=b.media.tagName.toLowerCase();if(b.isDynamic="audio"!==e&&"video"!==e,b.isDynamic?b.isVideo=b.options.isVideo:b.isVideo="audio"!==e&&b.options.isVideo,c.isiPad&&b.options.iPadUseNativeControls||c.isiPhone&&b.options.iPhoneUseNativeControls)b.$media.attr("controls","controls"),c.isiPad&&null!==b.media.getAttribute("autoplay")&&b.play();else if(c.isAndroid&&b.options.AndroidUseNativeControls);else if(b.isVideo||!b.isVideo&&b.options.features.length){b.$media.removeAttr("controls");var f=b.isVideo?mejs.i18n.t("mejs.video-player"):mejs.i18n.t("mejs.audio-player");a('<span class="mejs-offscreen">'+f+"</span>").insertBefore(b.$media),b.container=a('<div id="'+b.id+'" class="mejs-container '+(mejs.MediaFeatures.svgAsImg?"svg":"no-svg")+'" tabindex="0" role="application" aria-label="'+f+'"><div class="mejs-inner"><div class="mejs-mediaelement"></div><div class="mejs-layers"></div><div class="mejs-controls"></div><div class="mejs-clear"></div></div></div>').addClass(b.$media[0].className).insertBefore(b.$media).focus(function(a){if(!b.controlsAreVisible&&!b.hasFocus&&b.controlsEnabled&&(b.showControls(!0),!b.hasMsNativeFullScreen)){var c=".mejs-playpause-button > button";mejs.Utility.isNodeAfter(a.relatedTarget,b.container[0])&&(c=".mejs-controls .mejs-button:last-child > button");var d=b.container.find(c);d.focus()}}),b.options.features.length||b.container.css("background","transparent").find(".mejs-controls").hide(),b.isVideo&&"fill"===b.options.stretching&&!b.container.parent("mejs-fill-container").length&&(b.outerContainer=b.$media.parent(),b.container.wrap('<div class="mejs-fill-container"/>')),b.container.addClass((c.isAndroid?"mejs-android ":"")+(c.isiOS?"mejs-ios ":"")+(c.isiPad?"mejs-ipad ":"")+(c.isiPhone?"mejs-iphone ":"")+(b.isVideo?"mejs-video ":"mejs-audio ")),b.container.find(".mejs-mediaelement").append(b.$media),b.node.player=b,b.controls=b.container.find(".mejs-controls"),b.layers=b.container.find(".mejs-layers");var g=b.isVideo?"video":"audio",h=g.substring(0,1).toUpperCase()+g.substring(1);b.options[g+"Width"]>0||b.options[g+"Width"].toString().indexOf("%")>-1?b.width=b.options[g+"Width"]:""!==b.media.style.width&&null!==b.media.style.width?b.width=b.media.style.width:null!==b.media.getAttribute("width")?b.width=b.$media.attr("width"):b.width=b.options["default"+h+"Width"],b.options[g+"Height"]>0||b.options[g+"Height"].toString().indexOf("%")>-1?b.height=b.options[g+"Height"]:""!==b.media.style.height&&null!==b.media.style.height?b.height=b.media.style.height:null!==b.$media[0].getAttribute("height")?b.height=b.$media.attr("height"):b.height=b.options["default"+h+"Height"],b.setPlayerSize(b.width,b.height),d.pluginWidth=b.width,d.pluginHeight=b.height}else b.isVideo||b.options.features.length||b.$media.hide();mejs.MediaElement(b.$media[0],d),"undefined"!=typeof b.container&&b.options.features.length&&b.controlsAreVisible&&b.container.trigger("controlsshown")},showControls:function(a){var b=this;a="undefined"==typeof a||a,b.controlsAreVisible||(a?(b.controls.removeClass("mejs-offscreen").stop(!0,!0).fadeIn(200,function(){b.controlsAreVisible=!0,b.container.trigger("controlsshown")}),b.container.find(".mejs-control").removeClass("mejs-offscreen").stop(!0,!0).fadeIn(200,function(){b.controlsAreVisible=!0})):(b.controls.removeClass("mejs-offscreen").css("display","block"),b.container.find(".mejs-control").removeClass("mejs-offscreen").css("display","block"),b.controlsAreVisible=!0,b.container.trigger("controlsshown")),b.setControlsSize())},hideControls:function(b){var c=this;b="undefined"==typeof b||b,!c.controlsAreVisible||c.options.alwaysShowControls||c.keyboardAction||c.media.paused||c.media.ended||(b?(c.controls.stop(!0,!0).fadeOut(200,function(){a(this).addClass("mejs-offscreen").css("display","block"),c.controlsAreVisible=!1,c.container.trigger("controlshidden")}),c.container.find(".mejs-control").stop(!0,!0).fadeOut(200,function(){a(this).addClass("mejs-offscreen").css("display","block")})):(c.controls.addClass("mejs-offscreen").css("display","block"),c.container.find(".mejs-control").addClass("mejs-offscreen").css("display","block"),c.controlsAreVisible=!1,c.container.trigger("controlshidden")))},controlsTimer:null,startControlsTimer:function(a){var b=this;a="undefined"!=typeof a?a:b.options.controlsTimeoutDefault,b.killControlsTimer("start"),b.controlsTimer=setTimeout(function(){b.hideControls(),b.killControlsTimer("hide")},a)},killControlsTimer:function(a){var b=this;null!==b.controlsTimer&&(clearTimeout(b.controlsTimer),delete b.controlsTimer,b.controlsTimer=null)},controlsEnabled:!0,disableControls:function(){var a=this;a.killControlsTimer(),a.hideControls(!1),this.controlsEnabled=!1},enableControls:function(){var a=this;a.showControls(!1),a.controlsEnabled=!0},meReady:function(b,c){var d,e,f=this,g=mejs.MediaFeatures,h=c.getAttribute("autoplay"),i=!("undefined"==typeof h||null===h||"false"===h);if(!f.created){if(f.created=!0,f.media=b,f.domNode=c,!(g.isAndroid&&f.options.AndroidUseNativeControls||g.isiPad&&f.options.iPadUseNativeControls||g.isiPhone&&f.options.iPhoneUseNativeControls)){if(!f.isVideo&&!f.options.features.length)return i&&"native"==b.pluginType&&f.play(),void(f.options.success&&("string"==typeof f.options.success?window[f.options.success](f.media,f.domNode,f):f.options.success(f.media,f.domNode,f)));f.buildposter(f,f.controls,f.layers,f.media),f.buildkeyboard(f,f.controls,f.layers,f.media),f.buildoverlays(f,f.controls,f.layers,f.media),f.findTracks();for(d in f.options.features)if(e=f.options.features[d],f["build"+e])try{f["build"+e](f,f.controls,f.layers,f.media)}catch(j){}f.container.trigger("controlsready"),f.setPlayerSize(f.width,f.height),f.setControlsSize(),f.isVideo&&(mejs.MediaFeatures.hasTouch&&!f.options.alwaysShowControls?f.$media.bind("touchstart",function(){f.controlsAreVisible?f.hideControls(!1):f.controlsEnabled&&f.showControls(!1)}):(f.clickToPlayPauseCallback=function(){if(f.options.clickToPlayPause){f.media.paused?f.play():f.pause();var a=f.$media.closest(".mejs-container").find(".mejs-overlay-button"),b=a.attr("aria-pressed");a.attr("aria-pressed",!b)}},f.media.addEventListener("click",f.clickToPlayPauseCallback,!1),f.container.bind("mouseenter",function(){f.controlsEnabled&&(f.options.alwaysShowControls||(f.killControlsTimer("enter"),f.showControls(),f.startControlsTimer(f.options.controlsTimeoutMouseEnter)))}).bind("mousemove",function(){f.controlsEnabled&&(f.controlsAreVisible||f.showControls(),f.options.alwaysShowControls||f.startControlsTimer(f.options.controlsTimeoutMouseEnter))}).bind("mouseleave",function(){f.controlsEnabled&&(f.media.paused||f.options.alwaysShowControls||f.startControlsTimer(f.options.controlsTimeoutMouseLeave))})),f.options.hideVideoControlsOnLoad&&f.hideControls(!1),i&&!f.options.alwaysShowControls&&f.hideControls(),f.options.enableAutosize&&f.media.addEventListener("loadedmetadata",function(a){f.options.videoHeight<=0&&null===f.domNode.getAttribute("height")&&!isNaN(a.target.videoHeight)&&(f.setPlayerSize(a.target.videoWidth,a.target.videoHeight),f.setControlsSize(),f.media.setVideoSize(a.target.videoWidth,a.target.videoHeight))},!1)),f.media.addEventListener("play",function(){var a;for(a in mejs.players){var b=mejs.players[a];b.id==f.id||!f.options.pauseOtherPlayers||b.paused||b.ended||b.pause(),b.hasFocus=!1}f.hasFocus=!0},!1),f.media.addEventListener("ended",function(b){if(f.options.autoRewind)try{f.media.setCurrentTime(0),window.setTimeout(function(){a(f.container).find(".mejs-overlay-loading").parent().hide()},20)}catch(c){}"youtube"===f.media.pluginType?f.media.stop():f.media.pause(),f.setProgressRail&&f.setProgressRail(),f.setCurrentRail&&f.setCurrentRail(),f.options.loop?f.play():!f.options.alwaysShowControls&&f.controlsEnabled&&f.showControls()},!1),f.media.addEventListener("loadedmetadata",function(){mejs.Utility.calculateTimeFormat(f.duration,f.options,f.options.framesPerSecond||25),f.updateDuration&&f.updateDuration(),f.updateCurrent&&f.updateCurrent(),f.isFullScreen||(f.setPlayerSize(f.width,f.height),f.setControlsSize())},!1);var k=null;f.media.addEventListener("timeupdate",function(){k!==this.duration&&(k=this.duration,mejs.Utility.calculateTimeFormat(k,f.options,f.options.framesPerSecond||25),f.updateDuration&&f.updateDuration(),f.updateCurrent&&f.updateCurrent(),f.setControlsSize())},!1),f.container.focusout(function(b){if(b.relatedTarget){var c=a(b.relatedTarget);f.keyboardAction&&0===c.parents(".mejs-container").length&&(f.keyboardAction=!1,f.isVideo&&!f.options.alwaysShowControls&&f.hideControls(!0))}}),setTimeout(function(){f.setPlayerSize(f.width,f.height),f.setControlsSize()},50),f.globalBind("resize",function(){f.isFullScreen||mejs.MediaFeatures.hasTrueNativeFullScreen&&document.webkitIsFullScreen||f.setPlayerSize(f.width,f.height),f.setControlsSize()}),"youtube"==f.media.pluginType&&(g.isiOS||g.isAndroid)&&(f.container.find(".mejs-overlay-play").hide(),f.container.find(".mejs-poster").hide())}i&&"native"==b.pluginType&&f.play(),f.options.success&&("string"==typeof f.options.success?window[f.options.success](f.media,f.domNode,f):f.options.success(f.media,f.domNode,f))}},handleError:function(a){var b=this;b.controls&&b.controls.hide(),b.options.error&&b.options.error(a)},setPlayerSize:function(a,b){var c=this;if(!c.options.setDimensions)return!1;switch("undefined"!=typeof a&&(c.width=a),"undefined"!=typeof b&&(c.height=b),c.options.stretching){case"fill":c.isVideo?this.setFillMode():this.setDimensions(c.width,c.height);break;case"responsive":this.setResponsiveMode();break;case"none":this.setDimensions(c.width,c.height);break;default:this.hasFluidMode()===!0?this.setResponsiveMode():this.setDimensions(c.width,c.height)}},hasFluidMode:function(){var a=this;return a.height.toString().indexOf("%")>0||"none"!==a.$node.css("max-width")&&"t.width"!==a.$node.css("max-width")||a.$node[0].currentStyle&&"100%"===a.$node[0].currentStyle.maxWidth},setResponsiveMode:function(){var b=this,c=function(){return b.isVideo?b.media.videoWidth&&b.media.videoWidth>0?b.media.videoWidth:null!==b.media.getAttribute("width")?b.media.getAttribute("width"):b.options.defaultVideoWidth:b.options.defaultAudioWidth}(),d=function(){return b.isVideo?b.media.videoHeight&&b.media.videoHeight>0?b.media.videoHeight:null!==b.media.getAttribute("height")?b.media.getAttribute("height"):b.options.defaultVideoHeight:b.options.defaultAudioHeight}(),e=b.container.parent().closest(":visible").width(),f=b.container.parent().closest(":visible").height(),g=b.isVideo||!b.options.autosizeProgress?parseInt(e*d/c,10):d;(isNaN(g)||0!==f&&g>f&&f>d)&&(g=f),b.container.parent().length>0&&"body"===b.container.parent()[0].tagName.toLowerCase()&&(e=a(window).width(),g=a(window).height()),g&&e&&(b.container.width(e).height(g),b.$media.add(b.container.find(".mejs-shim")).width("100%").height("100%"),b.isVideo&&b.media.setVideoSize&&b.media.setVideoSize(e,g),b.layers.children(".mejs-layer").width("100%").height("100%"))},setFillMode:function(){var a=this,b=a.outerContainer;b.width()||b.height(a.$media.width()),b.height()||b.height(a.$media.height());var c=b.width(),d=b.height();a.setDimensions("100%","100%"),a.container.find(".mejs-poster img").css("display","block"),targetElement=a.container.find("object, embed, iframe, video");var e=a.height,f=a.width,g=c,h=e*c/f,i=f*d/e,j=d,k=!(i>c),l=k?Math.floor(g):Math.floor(i),m=k?Math.floor(h):Math.floor(j);k?(targetElement.height(m).width(c),a.media.setVideoSize&&a.media.setVideoSize(c,m)):(targetElement.height(d).width(l),a.media.setVideoSize&&a.media.setVideoSize(l,d)),targetElement.css({"margin-left":Math.floor((c-l)/2),"margin-top":0})},setDimensions:function(a,b){var c=this;c.container.width(a).height(b),c.layers.children(".mejs-layer").width(a).height(b)},setControlsSize:function(){var b=this,c=0,d=0,e=b.controls.find(".mejs-time-rail"),f=b.controls.find(".mejs-time-total"),g=e.siblings(),h=g.last(),i=null,j=b.options&&!b.options.autosizeProgress;if(b.container.is(":visible")&&e.length&&e.is(":visible")){j&&(d=parseInt(e.css("width"),10)),0!==d&&d||(g.each(function(){var b=a(this);"absolute"!=b.css("position")&&b.is(":visible")&&(c+=a(this).outerWidth(!0))}),d=b.controls.width()-c-(e.outerWidth(!0)-e.width()));do j||e.width(d),f.width(d-(f.outerWidth(!0)-f.width())),"absolute"!=h.css("position")&&(i=h.length?h.position():null,d--);while(null!==i&&i.top.toFixed(2)>0&&d>0);b.container.trigger("controlsresize")}},buildposter:function(b,c,d,e){var f=this,g=a('<div class="mejs-poster mejs-layer"></div>').appendTo(d),h=b.$media.attr("poster");""!==b.options.poster&&(h=b.options.poster),h?f.setPoster(h):g.hide(),e.addEventListener("play",function(){g.hide()},!1),b.options.showPosterWhenEnded&&b.options.autoRewind&&e.addEventListener("ended",function(){g.show()},!1)},setPoster:function(b){var c=this,d=c.container.find(".mejs-poster"),e=d.find("img");0===e.length&&(e=a('<img width="100%" height="100%" alt="" />').appendTo(d)),e.attr("src",b),d.css({"background-image":"url("+b+")"})},buildoverlays:function(b,c,d,e){var f=this;if(b.isVideo){var g=a('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-loading"><span></span></div></div>').hide().appendTo(d),h=a('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-error"></div></div>').hide().appendTo(d),i=a('<div class="mejs-overlay mejs-layer mejs-overlay-play"><div class="mejs-overlay-button" role="button" aria-label="'+mejs.i18n.t("mejs.play")+'" aria-pressed="false"></div></div>').appendTo(d).bind("click",function(){if(f.options.clickToPlayPause){e.paused&&e.play();var b=a(this).find(".mejs-overlay-button"),c=b.attr("aria-pressed");b.attr("aria-pressed",!!c)}});e.addEventListener("play",function(){i.hide(),g.hide(),c.find(".mejs-time-buffering").hide(),h.hide()},!1),e.addEventListener("playing",function(){i.hide(),g.hide(),c.find(".mejs-time-buffering").hide(),h.hide()},!1),e.addEventListener("seeking",function(){g.show(),c.find(".mejs-time-buffering").show()},!1),e.addEventListener("seeked",function(){g.hide(),c.find(".mejs-time-buffering").hide()},!1),e.addEventListener("pause",function(){mejs.MediaFeatures.isiPhone||i.show()},!1),e.addEventListener("waiting",function(){g.show(),c.find(".mejs-time-buffering").show()},!1),e.addEventListener("loadeddata",function(){g.show(),c.find(".mejs-time-buffering").show(),mejs.MediaFeatures.isAndroid&&(e.canplayTimeout=window.setTimeout(function(){if(document.createEvent){var a=document.createEvent("HTMLEvents");return a.initEvent("canplay",!0,!0),e.dispatchEvent(a)}},300))},!1),e.addEventListener("canplay",function(){g.hide(),c.find(".mejs-time-buffering").hide(),clearTimeout(e.canplayTimeout)},!1),e.addEventListener("error",function(a){f.handleError(a),g.hide(),i.hide(),h.show(),h.find(".mejs-overlay-error").html("Error loading this resource")},!1),e.addEventListener("keydown",function(a){f.onkeydown(b,e,a)},!1)}},buildkeyboard:function(b,c,d,e){var f=this;f.container.keydown(function(){f.keyboardAction=!0}),f.globalBind("keydown",function(c){return b.hasFocus=0!==a(c.target).closest(".mejs-container").length&&a(c.target).closest(".mejs-container").attr("id")===b.$media.closest(".mejs-container").attr("id"),f.onkeydown(b,e,c)}),f.globalBind("click",function(c){b.hasFocus=0!==a(c.target).closest(".mejs-container").length})},onkeydown:function(a,b,c){if(a.hasFocus&&a.options.enableKeyboard)for(var d=0,e=a.options.keyActions.length;e>d;d++)for(var f=a.options.keyActions[d],g=0,h=f.keys.length;h>g;g++)if(c.keyCode==f.keys[g])return"function"==typeof c.preventDefault&&c.preventDefault(),f.action(a,b,c.keyCode,c),!1;return!0},findTracks:function(){var b=this,c=b.$media.find("track");b.tracks=[],c.each(function(c,d){d=a(d),b.tracks.push({srclang:d.attr("srclang")?d.attr("srclang").toLowerCase():"",src:d.attr("src"),kind:d.attr("kind"),label:d.attr("label")||"",entries:[],isLoaded:!1})})},changeSkin:function(a){this.container[0].className="mejs-container "+a,this.setPlayerSize(this.width,this.height),this.setControlsSize()},play:function(){this.load(),this.media.play()},pause:function(){try{this.media.pause()}catch(a){}},load:function(){this.isLoaded||this.media.load(),this.isLoaded=!0},setMuted:function(a){this.media.setMuted(a)},setCurrentTime:function(a){this.media.setCurrentTime(a)},getCurrentTime:function(){return this.media.currentTime},setVolume:function(a){this.media.setVolume(a)},getVolume:function(){return this.media.volume},setSrc:function(a){var b=this;if("youtube"===b.media.pluginType){var c;if("string"!=typeof a){var d,e;for(d=0;d<a.length;d++)if(e=a[d],this.canPlayType(e.type)){a=e.src;break}}if(-1!==a.lastIndexOf("youtu.be"))c=a.substr(a.lastIndexOf("/")+1),-1!==c.indexOf("?")&&(c=c.substr(0,c.indexOf("?")));else{var f=a.match(/[?&]v=([^&#]+)|&|#|$/);f&&(c=f[1])}null!==b.media.getAttribute("autoplay")?b.media.pluginApi.loadVideoById(c):b.media.pluginApi.cueVideoById(c)}else b.media.setSrc(a)},remove:function(){var a,b,c=this;c.container.prev(".mejs-offscreen").remove();for(a in c.options.features)if(b=c.options.features[a],c["clean"+b])try{c["clean"+b](c)}catch(d){}c.isDynamic?c.$node.insertBefore(c.container):(c.$media.prop("controls",!0),c.$node.clone().insertBefore(c.container).show(),c.$node.remove()),"native"!==c.media.pluginType&&c.media.remove(),delete mejs.players[c.id],"object"==typeof c.container&&c.container.remove(),c.globalUnbind(),delete c.node.player},rebuildtracks:function(){var a=this;a.findTracks(),a.buildtracks(a,a.controls,a.layers,a.media)},resetSize:function(){var a=this;setTimeout(function(){a.setPlayerSize(a.width,a.height),a.setControlsSize()},50)}},function(){function b(b,d){var e={d:[],w:[]};return a.each((b||"").split(" "),function(a,b){var f=b+"."+d;0===f.indexOf(".")?(e.d.push(f),e.w.push(f)):e[c.test(b)?"w":"d"].push(f)}),e.d=e.d.join(" "),e.w=e.w.join(" "),e}var c=/^((after|before)print|(before)?unload|hashchange|message|o(ff|n)line|page(hide|show)|popstate|resize|storage)\b/;mejs.MediaElementPlayer.prototype.globalBind=function(c,d,e){var f=this,g=f.node?f.node.ownerDocument:document;c=b(c,f.id),c.d&&a(g).bind(c.d,d,e),c.w&&a(window).bind(c.w,d,e)},mejs.MediaElementPlayer.prototype.globalUnbind=function(c,d){var e=this,f=e.node?e.node.ownerDocument:document;c=b(c,e.id),c.d&&a(f).unbind(c.d,d),c.w&&a(window).unbind(c.w,d)}}(),"undefined"!=typeof a&&(a.fn.mediaelementplayer=function(b){return b===!1?this.each(function(){var b=a(this).data("mediaelementplayer");b&&b.remove(),a(this).removeData("mediaelementplayer")}):this.each(function(){a(this).data("mediaelementplayer",new mejs.MediaElementPlayer(this,b))}),this},a(document).ready(function(){a(".mejs-player").mediaelementplayer()})),window.MediaElementPlayer=mejs.MediaElementPlayer}(mejs.$),function(a){a.extend(mejs.MepDefaults,{playText:"",pauseText:""}),a.extend(MediaElementPlayer.prototype,{buildplaypause:function(b,c,d,e){function f(a){"play"===a?(k.removeClass("mejs-play").addClass("mejs-pause"),l.attr({title:j,"aria-label":j})):(k.removeClass("mejs-pause").addClass("mejs-play"),l.attr({title:i,"aria-label":i}))}var g=this,h=g.options,i=h.playText?h.playText:mejs.i18n.t("mejs.play"),j=h.pauseText?h.pauseText:mejs.i18n.t("mejs.pause"),k=a('<div class="mejs-button mejs-playpause-button mejs-play" ><button type="button" aria-controls="'+g.id+'" title="'+i+'" aria-label="'+j+'"></button></div>').appendTo(c).click(function(a){return a.preventDefault(),e.paused?e.play():e.pause(),!1}),l=k.find("button");f("pse"),e.addEventListener("play",function(){f("play")},!1),e.addEventListener("playing",function(){f("play")},!1),e.addEventListener("pause",function(){f("pse")},!1),e.addEventListener("paused",function(){f("pse")},!1)}})}(mejs.$),function(a){a.extend(mejs.MepDefaults,{stopText:"Stop"}),a.extend(MediaElementPlayer.prototype,{buildstop:function(b,c,d,e){var f=this;a('<div class="mejs-button mejs-stop-button mejs-stop"><button type="button" aria-controls="'+f.id+'" title="'+f.options.stopText+'" aria-label="'+f.options.stopText+'"></button></div>').appendTo(c).click(function(){e.paused||e.pause(),e.currentTime>0&&(e.setCurrentTime(0),e.pause(),c.find(".mejs-time-current").width("0px"),c.find(".mejs-time-handle").css("left","0px"),c.find(".mejs-time-float-current").html(mejs.Utility.secondsToTimeCode(0,b.options)),c.find(".mejs-currenttime").html(mejs.Utility.secondsToTimeCode(0,b.options)),d.find(".mejs-poster").show())})}})}(mejs.$),function(a){a.extend(mejs.MepDefaults,{enableProgressTooltip:!0,progressHelpText:""}),a.extend(MediaElementPlayer.prototype,{buildprogress:function(b,c,d,e){var f=this,g=!1,h=!1,i=0,j=!1,k=b.options.autoRewind,l=(f.options.progressHelpText?f.options.progressHelpText:mejs.i18n.t("mejs.time-help-text"),b.options.enableProgressTooltip?'<span class="mejs-time-float"><span class="mejs-time-float-current">00:00</span><span class="mejs-time-float-corner"></span></span>':"");a('<div class="mejs-time-rail"><span  class="mejs-time-total mejs-time-slider"><span class="mejs-time-buffering"></span><span class="mejs-time-loaded"></span><span class="mejs-time-current"></span><span class="mejs-time-handle"></span>'+l+"</span></div>").appendTo(c),c.find(".mejs-time-buffering").hide(),f.total=c.find(".mejs-time-total"),f.loaded=c.find(".mejs-time-loaded"),f.current=c.find(".mejs-time-current"),f.handle=c.find(".mejs-time-handle"),f.timefloat=c.find(".mejs-time-float"),f.timefloatcurrent=c.find(".mejs-time-float-current"),f.slider=c.find(".mejs-time-slider");var m=function(a){var c,d=f.total.offset(),h=f.total.width(),i=0,j=0,k=0;c=a.originalEvent&&a.originalEvent.changedTouches?a.originalEvent.changedTouches[0].pageX:a.changedTouches?a.changedTouches[0].pageX:a.pageX,e.duration&&(c<d.left?c=d.left:c>h+d.left&&(c=h+d.left),k=c-d.left,i=k/h,j=.02>=i?0:i*e.duration,g&&j!==e.currentTime&&e.setCurrentTime(j),mejs.MediaFeatures.hasTouch||(f.timefloat.css("left",k),f.timefloatcurrent.html(mejs.Utility.secondsToTimeCode(j,b.options)),f.timefloat.show()))},n=function(a){var c=e.currentTime,d=mejs.i18n.t("mejs.time-slider"),g=mejs.Utility.secondsToTimeCode(c,b.options),h=e.duration;f.slider.attr({"aria-label":d,"aria-valuemin":0,"aria-valuemax":h,"aria-valuenow":c,"aria-valuetext":g,role:"slider",tabindex:0})},o=function(){var a=new Date;a-i>=1e3&&e.play()};f.slider.bind("focus",function(a){b.options.autoRewind=!1}),f.slider.bind("blur",function(a){b.options.autoRewind=k}),f.slider.bind("keydown",function(a){new Date-i>=1e3&&(j=e.paused);var c=a.keyCode,d=e.duration,f=e.currentTime,g=b.options.defaultSeekForwardInterval(e),h=b.options.defaultSeekBackwardInterval(e);switch(c){case 37:case 40:f-=h;break;case 39:case 38:f+=g;break;case 36:f=0;break;case 35:f=d;break;case 32:case 13:return void(e.paused?e.play():e.pause());default:return}return f=0>f?0:f>=d?d:Math.floor(f),i=new Date,j||e.pause(),f<e.duration&&!j&&setTimeout(o,1100),e.setCurrentTime(f),a.preventDefault(),a.stopPropagation(),!1}),f.total.bind("mousedown touchstart",function(a){(1===a.which||0===a.which)&&(g=!0,m(a),f.globalBind("mousemove.dur touchmove.dur",function(a){m(a)}),f.globalBind("mouseup.dur touchend.dur",function(a){g=!1,"undefined"!=typeof f.timefloat&&f.timefloat.hide(),f.globalUnbind(".dur")}))}).bind("mouseenter",function(a){h=!0,f.globalBind("mousemove.dur",function(a){m(a)}),"undefined"==typeof f.timefloat||mejs.MediaFeatures.hasTouch||f.timefloat.show()}).bind("mouseleave",function(a){h=!1,g||(f.globalUnbind(".dur"),"undefined"!=typeof f.timefloat&&f.timefloat.hide())}),e.addEventListener("progress",function(a){b.setProgressRail(a),b.setCurrentRail(a)},!1),e.addEventListener("timeupdate",function(a){b.setProgressRail(a),b.setCurrentRail(a),n(a)},!1),f.container.on("controlsresize",function(a){b.setProgressRail(a),b.setCurrentRail(a)})},setProgressRail:function(a){var b=this,c=void 0!==a?a.target:b.media,d=null;c&&c.buffered&&c.buffered.length>0&&c.buffered.end&&c.duration?d=c.buffered.end(c.buffered.length-1)/c.duration:c&&void 0!==c.bytesTotal&&c.bytesTotal>0&&void 0!==c.bufferedBytes?d=c.bufferedBytes/c.bytesTotal:a&&a.lengthComputable&&0!==a.total&&(d=a.loaded/a.total),null!==d&&(d=Math.min(1,Math.max(0,d)),b.loaded&&b.total&&b.loaded.width(b.total.width()*d))},setCurrentRail:function(){var a=this;if(void 0!==a.media.currentTime&&a.media.duration&&a.total&&a.handle){var b=Math.round(a.total.width()*a.media.currentTime/a.media.duration),c=b-Math.round(a.handle.outerWidth(!0)/2);a.current.width(b),a.handle.css("left",c)}}})}(mejs.$),function(a){a.extend(mejs.MepDefaults,{duration:-1,timeAndDurationSeparator:"<span> | </span>"}),a.extend(MediaElementPlayer.prototype,{buildcurrent:function(b,c,d,e){var f=this;a('<div class="mejs-time" role="timer" aria-live="off"><span class="mejs-currenttime">'+mejs.Utility.secondsToTimeCode(0,b.options)+"</span></div>").appendTo(c),f.currenttime=f.controls.find(".mejs-currenttime"),e.addEventListener("timeupdate",function(){f.controlsAreVisible&&b.updateCurrent()},!1)},buildduration:function(b,c,d,e){var f=this;c.children().last().find(".mejs-currenttime").length>0?a(f.options.timeAndDurationSeparator+'<span class="mejs-duration">'+mejs.Utility.secondsToTimeCode(f.options.duration,f.options)+"</span>").appendTo(c.find(".mejs-time")):(c.find(".mejs-currenttime").parent().addClass("mejs-currenttime-container"),a('<div class="mejs-time mejs-duration-container"><span class="mejs-duration">'+mejs.Utility.secondsToTimeCode(f.options.duration,f.options)+"</span></div>").appendTo(c)),f.durationD=f.controls.find(".mejs-duration"),e.addEventListener("timeupdate",function(){f.controlsAreVisible&&b.updateDuration()},!1)},updateCurrent:function(){var a=this,b=a.media.currentTime;isNaN(b)&&(b=0),a.currenttime&&a.currenttime.html(mejs.Utility.secondsToTimeCode(b,a.options))},updateDuration:function(){var a=this,b=a.media.duration;a.options.duration>0&&(b=a.options.duration),isNaN(b)&&(b=0),a.container.toggleClass("mejs-long-video",b>3600),a.durationD&&b>0&&a.durationD.html(mejs.Utility.secondsToTimeCode(b,a.options))}})}(mejs.$),function(a){a.extend(mejs.MepDefaults,{muteText:mejs.i18n.t("mejs.mute-toggle"),allyVolumeControlText:mejs.i18n.t("mejs.volume-help-text"),hideVolumeOnTouchDevices:!0,audioVolume:"horizontal",videoVolume:"vertical"}),a.extend(MediaElementPlayer.prototype,{buildvolume:function(b,c,d,e){if(!mejs.MediaFeatures.isAndroid&&!mejs.MediaFeatures.isiOS||!this.options.hideVolumeOnTouchDevices){var f=this,g=f.isVideo?f.options.videoVolume:f.options.audioVolume,h="horizontal"==g?a('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="'+f.id+'" title="'+f.options.muteText+'" aria-label="'+f.options.muteText+'"></button></div><a href="javascript:void(0);" class="mejs-horizontal-volume-slider"><span class="mejs-offscreen">'+f.options.allyVolumeControlText+'</span><div class="mejs-horizontal-volume-total"></div><div class="mejs-horizontal-volume-current"></div><div class="mejs-horizontal-volume-handle"></div></a>').appendTo(c):a('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="'+f.id+'" title="'+f.options.muteText+'" aria-label="'+f.options.muteText+'"></button><a href="javascript:void(0);" class="mejs-volume-slider"><span class="mejs-offscreen">'+f.options.allyVolumeControlText+'</span><div class="mejs-volume-total"></div><div class="mejs-volume-current"></div><div class="mejs-volume-handle"></div></a></div>').appendTo(c),i=f.container.find(".mejs-volume-slider, .mejs-horizontal-volume-slider"),j=f.container.find(".mejs-volume-total, .mejs-horizontal-volume-total"),k=f.container.find(".mejs-volume-current, .mejs-horizontal-volume-current"),l=f.container.find(".mejs-volume-handle, .mejs-horizontal-volume-handle"),m=function(a,b){if(!i.is(":visible")&&"undefined"==typeof b)return i.show(),m(a,!0),void i.hide();a=Math.max(0,a),a=Math.min(a,1),0===a?(h.removeClass("mejs-mute").addClass("mejs-unmute"),h.children("button").attr("title",mejs.i18n.t("mejs.unmute")).attr("aria-label",mejs.i18n.t("mejs.unmute"))):(h.removeClass("mejs-unmute").addClass("mejs-mute"),h.children("button").attr("title",mejs.i18n.t("mejs.mute")).attr("aria-label",mejs.i18n.t("mejs.mute")));var c=j.position();if("vertical"==g){var d=j.height(),e=d-d*a;l.css("top",Math.round(c.top+e-l.height()/2)),k.height(d-e),k.css("top",c.top+e)}else{var f=j.width(),n=f*a;l.css("left",Math.round(c.left+n-l.width()/2)),k.width(Math.round(n))}},n=function(a){var b=null,c=j.offset();if("vertical"===g){var d=j.height(),f=a.pageY-c.top;if(b=(d-f)/d,0===c.top||0===c.left)return}else{var h=j.width(),i=a.pageX-c.left;b=i/h;
}b=Math.max(0,b),b=Math.min(b,1),m(b),0===b?e.setMuted(!0):e.setMuted(!1),e.setVolume(b)},o=!1,p=!1;h.hover(function(){i.show(),p=!0},function(){p=!1,o||"vertical"!=g||i.hide()});var q=function(a){var b=Math.floor(100*e.volume);i.attr({"aria-label":mejs.i18n.t("mejs.volume-slider"),"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":b,"aria-valuetext":b+"%",role:"slider",tabindex:0})};i.bind("mouseover",function(){p=!0}).bind("mousedown",function(a){return n(a),f.globalBind("mousemove.vol",function(a){n(a)}),f.globalBind("mouseup.vol",function(){o=!1,f.globalUnbind(".vol"),p||"vertical"!=g||i.hide()}),o=!0,!1}).bind("keydown",function(a){var b=a.keyCode,c=e.volume;switch(b){case 38:c=Math.min(c+.1,1);break;case 40:c=Math.max(0,c-.1);break;default:return!0}return o=!1,m(c),e.setVolume(c),!1}),h.find("button").click(function(){e.setMuted(!e.muted)}),h.find("button").bind("focus",function(){i.show()}),e.addEventListener("volumechange",function(a){o||(e.muted?(m(0),h.removeClass("mejs-mute").addClass("mejs-unmute")):(m(e.volume),h.removeClass("mejs-unmute").addClass("mejs-mute"))),q(a)},!1),0===b.options.startVolume&&e.setMuted(!0),"native"===e.pluginType&&e.setVolume(b.options.startVolume),f.container.on("controlsresize",function(){e.muted?(m(0),h.removeClass("mejs-mute").addClass("mejs-unmute")):(m(e.volume),h.removeClass("mejs-unmute").addClass("mejs-mute"))})}}})}(mejs.$),function(a){a.extend(mejs.MepDefaults,{usePluginFullScreen:!0,newWindowCallback:function(){return""},fullscreenText:""}),a.extend(MediaElementPlayer.prototype,{isFullScreen:!1,isNativeFullScreen:!1,isInIframe:!1,fullscreenMode:"",buildfullscreen:function(b,c,d,e){if(b.isVideo){b.isInIframe=window.location!=window.parent.location,e.addEventListener("loadstart",function(){b.detectFullscreenMode()});var f=this,g=null,h=f.options.fullscreenText?f.options.fullscreenText:mejs.i18n.t("mejs.fullscreen"),i=a('<div class="mejs-button mejs-fullscreen-button"><button type="button" aria-controls="'+f.id+'" title="'+h+'" aria-label="'+h+'"></button></div>').appendTo(c).on("click",function(){var a=mejs.MediaFeatures.hasTrueNativeFullScreen&&mejs.MediaFeatures.isFullScreen()||b.isFullScreen;a?b.exitFullScreen():b.enterFullScreen()}).on("mouseover",function(){if("plugin-hover"==f.fullscreenMode){null!==g&&(clearTimeout(g),delete g);var a=i.offset(),c=b.container.offset();e.positionFullscreenButton(a.left-c.left,a.top-c.top,!0)}}).on("mouseout",function(){"plugin-hover"==f.fullscreenMode&&(null!==g&&(clearTimeout(g),delete g),g=setTimeout(function(){e.hideFullscreenButton()},1500))});if(b.fullscreenBtn=i,f.globalBind("keydown",function(a){27==a.keyCode&&(mejs.MediaFeatures.hasTrueNativeFullScreen&&mejs.MediaFeatures.isFullScreen()||f.isFullScreen)&&b.exitFullScreen()}),f.normalHeight=0,f.normalWidth=0,mejs.MediaFeatures.hasTrueNativeFullScreen){var j=function(a){b.isFullScreen&&(mejs.MediaFeatures.isFullScreen()?(b.isNativeFullScreen=!0,b.setControlsSize()):(b.isNativeFullScreen=!1,b.exitFullScreen()))};b.globalBind(mejs.MediaFeatures.fullScreenEventName,j)}}},detectFullscreenMode:function(){var a=this,b="",c=mejs.MediaFeatures;return c.hasTrueNativeFullScreen&&"native"===a.media.pluginType?b="native-native":c.hasTrueNativeFullScreen&&"native"!==a.media.pluginType&&!c.hasFirefoxPluginMovingProblem?b="plugin-native":a.usePluginFullScreen?mejs.MediaFeatures.supportsPointerEvents?(b="plugin-click",a.createPluginClickThrough()):b="plugin-hover":b="fullwindow",a.fullscreenMode=b,b},isPluginClickThroughCreated:!1,createPluginClickThrough:function(){var b=this;if(!b.isPluginClickThroughCreated){var c,d,e=!1,f=function(){if(e){for(var a in g)g[a].hide();b.fullscreenBtn.css("pointer-events",""),b.controls.css("pointer-events",""),b.media.removeEventListener("click",b.clickToPlayPauseCallback),e=!1}},g={},h=["top","left","right","bottom"],i=function(){var a=fullscreenBtn.offset().left-b.container.offset().left,d=fullscreenBtn.offset().top-b.container.offset().top,e=fullscreenBtn.outerWidth(!0),f=fullscreenBtn.outerHeight(!0),h=b.container.width(),i=b.container.height();for(c in g)g[c].css({position:"absolute",top:0,left:0});g.top.width(h).height(d),g.left.width(a).height(f).css({top:d}),g.right.width(h-a-e).height(f).css({top:d,left:a+e}),g.bottom.width(h).height(i-f-d).css({top:d+f})};for(b.globalBind("resize",function(){i()}),c=0,d=h.length;d>c;c++)g[h[c]]=a('<div class="mejs-fullscreen-hover" />').appendTo(b.container).mouseover(f).hide();fullscreenBtn.on("mouseover",function(){if(!b.isFullScreen){var a=fullscreenBtn.offset(),d=player.container.offset();media.positionFullscreenButton(a.left-d.left,a.top-d.top,!1),b.fullscreenBtn.css("pointer-events","none"),b.controls.css("pointer-events","none"),b.media.addEventListener("click",b.clickToPlayPauseCallback);for(c in g)g[c].show();i(),e=!0}}),media.addEventListener("fullscreenchange",function(a){b.isFullScreen=!b.isFullScreen,b.isFullScreen?b.media.removeEventListener("click",b.clickToPlayPauseCallback):b.media.addEventListener("click",b.clickToPlayPauseCallback),f()}),b.globalBind("mousemove",function(a){if(e){var c=fullscreenBtn.offset();(a.pageY<c.top||a.pageY>c.top+fullscreenBtn.outerHeight(!0)||a.pageX<c.left||a.pageX>c.left+fullscreenBtn.outerWidth(!0))&&(fullscreenBtn.css("pointer-events",""),b.controls.css("pointer-events",""),e=!1)}}),b.isPluginClickThroughCreated=!0}},cleanfullscreen:function(a){a.exitFullScreen()},containerSizeTimeout:null,enterFullScreen:function(){var b=this;if(mejs.MediaFeatures.isiOS&&mejs.MediaFeatures.hasiOSFullScreen&&"function"==typeof b.media.webkitEnterFullscreen)return void b.media.webkitEnterFullscreen();a(document.documentElement).addClass("mejs-fullscreen"),b.normalHeight=b.container.height(),b.normalWidth=b.container.width(),"native-native"===b.fullscreenMode||"plugin-native"===b.fullscreenMode?(mejs.MediaFeatures.requestFullScreen(b.container[0]),b.isInIframe&&setTimeout(function d(){if(b.isNativeFullScreen){var c=.002,e=a(window).width(),f=screen.width,g=Math.abs(f-e),h=f*c;g>h?b.exitFullScreen():setTimeout(d,500)}},1e3)):"fullwindow"==b.fullscreeMode,b.container.addClass("mejs-container-fullscreen").width("100%").height("100%"),b.containerSizeTimeout=setTimeout(function(){b.container.css({width:"100%",height:"100%"}),b.setControlsSize()},500),"native"===b.media.pluginType?b.$media.width("100%").height("100%"):(b.container.find(".mejs-shim").width("100%").height("100%"),setTimeout(function(){var c=a(window),d=c.width(),e=c.height();b.media.setVideoSize(d,e)},500)),b.layers.children("div").width("100%").height("100%"),b.fullscreenBtn&&b.fullscreenBtn.removeClass("mejs-fullscreen").addClass("mejs-unfullscreen"),b.setControlsSize(),b.isFullScreen=!0;var c=Math.min(screen.width/b.width,screen.height/b.height);b.container.find(".mejs-captions-text").css("font-size",100*c+"%"),b.container.find(".mejs-captions-text").css("line-height","normal"),b.container.find(".mejs-captions-position").css("bottom","45px"),b.container.trigger("enteredfullscreen")},exitFullScreen:function(){var b=this;clearTimeout(b.containerSizeTimeout),mejs.MediaFeatures.hasTrueNativeFullScreen&&(mejs.MediaFeatures.isFullScreen()||b.isFullScreen)&&mejs.MediaFeatures.cancelFullScreen(),a(document.documentElement).removeClass("mejs-fullscreen"),b.container.removeClass("mejs-container-fullscreen").width(b.normalWidth).height(b.normalHeight),"native"===b.media.pluginType?b.$media.width(b.normalWidth).height(b.normalHeight):(b.container.find(".mejs-shim").width(b.normalWidth).height(b.normalHeight),b.media.setVideoSize(b.normalWidth,b.normalHeight)),b.layers.children("div").width(b.normalWidth).height(b.normalHeight),b.fullscreenBtn.removeClass("mejs-unfullscreen").addClass("mejs-fullscreen"),b.setControlsSize(),b.isFullScreen=!1,b.container.find(".mejs-captions-text").css("font-size",""),b.container.find(".mejs-captions-text").css("line-height",""),b.container.find(".mejs-captions-position").css("bottom",""),b.container.trigger("exitedfullscreen")}})}(mejs.$),function(a){a.extend(mejs.MepDefaults,{speeds:["2.00","1.50","1.25","1.00","0.75"],defaultSpeed:"1.00",speedChar:"x"}),a.extend(MediaElementPlayer.prototype,{buildspeed:function(b,c,d,e){var f=this;if("native"==f.media.pluginType){for(var g=null,h=null,i=null,j=null,k=[],l=!1,m=0,n=f.options.speeds.length;n>m;m++){var o=f.options.speeds[m];"string"==typeof o?(k.push({name:o+f.options.speedChar,value:o}),o===f.options.defaultSpeed&&(l=!0)):(k.push(o),o.value===f.options.defaultSpeed&&(l=!0))}l||k.push({name:f.options.defaultSpeed+f.options.speedChar,value:f.options.defaultSpeed}),k.sort(function(a,b){return parseFloat(b.value)-parseFloat(a.value)});var p=function(a){for(m=0,n=k.length;n>m;m++)if(k[m].value===a)return k[m].name},q='<div class="mejs-button mejs-speed-button"><button type="button">'+p(f.options.defaultSpeed)+'</button><div class="mejs-speed-selector"><ul>';for(m=0,il=k.length;m<il;m++)j=f.id+"-speed-"+k[m].value,q+='<li><input type="radio" name="speed" value="'+k[m].value+'" id="'+j+'" '+(k[m].value===f.options.defaultSpeed?" checked":"")+' /><label for="'+j+'" '+(k[m].value===f.options.defaultSpeed?' class="mejs-speed-selected"':"")+">"+k[m].name+"</label></li>";q+="</ul></div></div>",g=a(q).appendTo(c),h=g.find(".mejs-speed-selector"),i=f.options.defaultSpeed,e.addEventListener("loadedmetadata",function(a){i&&(e.playbackRate=parseFloat(i))},!0),h.on("click",'input[type="radio"]',function(){var b=a(this).attr("value");i=b,e.playbackRate=parseFloat(b),g.find("button").html(p(b)),g.find(".mejs-speed-selected").removeClass("mejs-speed-selected"),g.find('input[type="radio"]:checked').next().addClass("mejs-speed-selected")}),g.one("mouseenter focusin",function(){h.height(g.find(".mejs-speed-selector ul").outerHeight(!0)+g.find(".mejs-speed-translations").outerHeight(!0)).css("top",-1*h.height()+"px")})}}})}(mejs.$),function(a){a.extend(mejs.MepDefaults,{startLanguage:"",tracksText:"",tracksAriaLive:!1,hideCaptionsButtonWhenEmpty:!0,toggleCaptionsButtonWhenOnlyOne:!1,slidesSelector:""}),a.extend(MediaElementPlayer.prototype,{hasChapters:!1,cleartracks:function(a,b,c,d){a&&(a.captions&&a.captions.remove(),a.chapters&&a.chapters.remove(),a.captionsText&&a.captionsText.remove(),a.captionsButton&&a.captionsButton.remove())},buildtracks:function(b,c,d,e){if(0!==b.tracks.length){var f,g,h=this,i=h.options.tracksAriaLive?'role="log" aria-live="assertive" aria-atomic="false"':"",j=h.options.tracksText?h.options.tracksText:mejs.i18n.t("mejs.captions-subtitles");if(h.domNode.textTracks)for(f=h.domNode.textTracks.length-1;f>=0;f--)h.domNode.textTracks[f].mode="hidden";h.cleartracks(b,c,d,e),b.chapters=a('<div class="mejs-chapters mejs-layer"></div>').prependTo(d).hide(),b.captions=a('<div class="mejs-captions-layer mejs-layer"><div class="mejs-captions-position mejs-captions-position-hover" '+i+'><span class="mejs-captions-text"></span></div></div>').prependTo(d).hide(),b.captionsText=b.captions.find(".mejs-captions-text"),b.captionsButton=a('<div class="mejs-button mejs-captions-button"><button type="button" aria-controls="'+h.id+'" title="'+j+'" aria-label="'+j+'"></button><div class="mejs-captions-selector"><ul><li><input type="radio" name="'+b.id+'_captions" id="'+b.id+'_captions_none" value="none" checked="checked" /><label for="'+b.id+'_captions_none">'+mejs.i18n.t("mejs.none")+"</label></li></ul></div></div>").appendTo(c);var k=0;for(f=0;f<b.tracks.length;f++)g=b.tracks[f].kind,("subtitles"===g||"captions"===g)&&k++;for(h.options.toggleCaptionsButtonWhenOnlyOne&&1==k?b.captionsButton.on("click",function(){null===b.selectedTrack?lang=b.tracks[0].srclang:lang="none",b.setTrack(lang)}):(b.captionsButton.on("mouseenter focusin",function(){a(this).find(".mejs-captions-selector").removeClass("mejs-offscreen")}).on("click","input[type=radio]",function(){lang=this.value,b.setTrack(lang)}),b.captionsButton.on("mouseleave focusout",function(){a(this).find(".mejs-captions-selector").addClass("mejs-offscreen")})),b.options.alwaysShowControls?b.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover"):b.container.bind("controlsshown",function(){b.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover")}).bind("controlshidden",function(){e.paused||b.container.find(".mejs-captions-position").removeClass("mejs-captions-position-hover")}),b.trackToLoad=-1,b.selectedTrack=null,b.isLoadingTrack=!1,f=0;f<b.tracks.length;f++)g=b.tracks[f].kind,("subtitles"===g||"captions"===g)&&b.addTrackButton(b.tracks[f].srclang,b.tracks[f].label);b.loadNextTrack(),e.addEventListener("timeupdate",function(){b.displayCaptions()},!1),""!==b.options.slidesSelector&&(b.slidesContainer=a(b.options.slidesSelector),e.addEventListener("timeupdate",function(){b.displaySlides()},!1)),e.addEventListener("loadedmetadata",function(){b.displayChapters()},!1),b.container.hover(function(){b.hasChapters&&(b.chapters.removeClass("mejs-offscreen"),b.chapters.fadeIn(200).height(b.chapters.find(".mejs-chapter").outerHeight()))},function(){b.hasChapters&&!e.paused&&b.chapters.fadeOut(200,function(){a(this).addClass("mejs-offscreen"),a(this).css("display","block")})}),h.container.on("controlsresize",function(){h.adjustLanguageBox()}),null!==b.node.getAttribute("autoplay")&&b.chapters.addClass("mejs-offscreen")}},setTrack:function(a){var b,c=this;if("none"==a)c.selectedTrack=null,c.captionsButton.removeClass("mejs-captions-enabled");else for(b=0;b<c.tracks.length;b++)if(c.tracks[b].srclang==a){null===c.selectedTrack&&c.captionsButton.addClass("mejs-captions-enabled"),c.selectedTrack=c.tracks[b],c.captions.attr("lang",c.selectedTrack.srclang),c.displayCaptions();break}},loadNextTrack:function(){var a=this;a.trackToLoad++,a.trackToLoad<a.tracks.length?(a.isLoadingTrack=!0,a.loadTrack(a.trackToLoad)):(a.isLoadingTrack=!1,a.checkForTracks())},loadTrack:function(b){var c=this,d=c.tracks[b],e=function(){d.isLoaded=!0,c.enableTrackButton(d.srclang,d.label),c.loadNextTrack()};(void 0!==d.src||""!==d.src)&&a.ajax({url:d.src,dataType:"text",success:function(a){"string"==typeof a&&/<tt\s+xml/gi.exec(a)?d.entries=mejs.TrackFormatParser.dfxp.parse(a):d.entries=mejs.TrackFormatParser.webvtt.parse(a),e(),"chapters"==d.kind&&c.media.addEventListener("play",function(){c.media.duration>0&&c.displayChapters(d)},!1),"slides"==d.kind&&c.setupSlides(d)},error:function(){c.removeTrackButton(d.srclang),c.loadNextTrack()}})},enableTrackButton:function(b,c){var d=this;""===c&&(c=mejs.language.codes[b]||b),d.captionsButton.find("input[value="+b+"]").prop("disabled",!1).siblings("label").html(c),d.options.startLanguage==b&&a("#"+d.id+"_captions_"+b).prop("checked",!0).trigger("click"),d.adjustLanguageBox()},removeTrackButton:function(a){var b=this;b.captionsButton.find("input[value="+a+"]").closest("li").remove(),b.adjustLanguageBox()},addTrackButton:function(b,c){var d=this;""===c&&(c=mejs.language.codes[b]||b),d.captionsButton.find("ul").append(a('<li><input type="radio" name="'+d.id+'_captions" id="'+d.id+"_captions_"+b+'" value="'+b+'" disabled="disabled" /><label for="'+d.id+"_captions_"+b+'">'+c+" (loading)</label></li>")),d.adjustLanguageBox(),d.container.find(".mejs-captions-translations option[value="+b+"]").remove()},adjustLanguageBox:function(){var a=this;a.captionsButton.find(".mejs-captions-selector").height(a.captionsButton.find(".mejs-captions-selector ul").outerHeight(!0)+a.captionsButton.find(".mejs-captions-translations").outerHeight(!0))},checkForTracks:function(){var a=this,b=!1;if(a.options.hideCaptionsButtonWhenEmpty){for(var c=0;c<a.tracks.length;c++){var d=a.tracks[c].kind;if(("subtitles"===d||"captions"===d)&&a.tracks[c].isLoaded){b=!0;break}}b||(a.captionsButton.hide(),a.setControlsSize())}},displayCaptions:function(){if("undefined"!=typeof this.tracks){var a,b=this,c=b.selectedTrack;if(null!==c&&c.isLoaded){for(a=0;a<c.entries.times.length;a++)if(b.media.currentTime>=c.entries.times[a].start&&b.media.currentTime<=c.entries.times[a].stop)return b.captionsText.html(c.entries.text[a]).attr("class","mejs-captions-text "+(c.entries.times[a].identifier||"")),void b.captions.show().height(0);b.captions.hide()}else b.captions.hide()}},setupSlides:function(a){var b=this;b.slides=a,b.slides.entries.imgs=[b.slides.entries.text.length],b.showSlide(0)},showSlide:function(b){if("undefined"!=typeof this.tracks&&"undefined"!=typeof this.slidesContainer){var c=this,d=c.slides.entries.text[b],e=c.slides.entries.imgs[b];"undefined"==typeof e||"undefined"==typeof e.fadeIn?c.slides.entries.imgs[b]=e=a('<img src="'+d+'">').on("load",function(){e.appendTo(c.slidesContainer).hide().fadeIn().siblings(":visible").fadeOut()}):e.is(":visible")||e.is(":animated")||e.fadeIn().siblings(":visible").fadeOut()}},displaySlides:function(){if("undefined"!=typeof this.slides){var a,b=this,c=b.slides;for(a=0;a<c.entries.times.length;a++)if(b.media.currentTime>=c.entries.times[a].start&&b.media.currentTime<=c.entries.times[a].stop)return void b.showSlide(a)}},displayChapters:function(){var a,b=this;for(a=0;a<b.tracks.length;a++)if("chapters"==b.tracks[a].kind&&b.tracks[a].isLoaded){b.drawChapters(b.tracks[a]),b.hasChapters=!0;break}},drawChapters:function(b){var c,d,e=this,f=0,g=0;for(e.chapters.empty(),c=0;c<b.entries.times.length;c++)d=b.entries.times[c].stop-b.entries.times[c].start,f=Math.floor(d/e.media.duration*100),(f+g>100||c==b.entries.times.length-1&&100>f+g)&&(f=100-g),e.chapters.append(a('<div class="mejs-chapter" rel="'+b.entries.times[c].start+'" style="left: '+g.toString()+"%;width: "+f.toString()+'%;"><div class="mejs-chapter-block'+(c==b.entries.times.length-1?" mejs-chapter-block-last":"")+'"><span class="ch-title">'+b.entries.text[c]+'</span><span class="ch-time">'+mejs.Utility.secondsToTimeCode(b.entries.times[c].start,e.options)+"&ndash;"+mejs.Utility.secondsToTimeCode(b.entries.times[c].stop,e.options)+"</span></div></div>")),g+=f;e.chapters.find("div.mejs-chapter").click(function(){e.media.setCurrentTime(parseFloat(a(this).attr("rel"))),e.media.paused&&e.media.play()}),e.chapters.show()}}),mejs.language={codes:{af:"Afrikaans",sq:"Albanian",ar:"Arabic",be:"Belarusian",bg:"Bulgarian",ca:"Catalan",zh:"Chinese","zh-cn":"Chinese Simplified","zh-tw":"Chinese Traditional",hr:"Croatian",cs:"Czech",da:"Danish",nl:"Dutch",en:"English",et:"Estonian",fl:"Filipino",fi:"Finnish",fr:"French",gl:"Galician",de:"German",el:"Greek",ht:"Haitian Creole",iw:"Hebrew",hi:"Hindi",hu:"Hungarian",is:"Icelandic",id:"Indonesian",ga:"Irish",it:"Italian",ja:"Japanese",ko:"Korean",lv:"Latvian",lt:"Lithuanian",mk:"Macedonian",ms:"Malay",mt:"Maltese",no:"Norwegian",fa:"Persian",pl:"Polish",pt:"Portuguese",ro:"Romanian",ru:"Russian",sr:"Serbian",sk:"Slovak",sl:"Slovenian",es:"Spanish",sw:"Swahili",sv:"Swedish",tl:"Tagalog",th:"Thai",tr:"Turkish",uk:"Ukrainian",vi:"Vietnamese",cy:"Welsh",yi:"Yiddish"}},mejs.TrackFormatParser={webvtt:{pattern_timecode:/^((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --\> ((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*)$/,parse:function(b){for(var c,d,e,f=0,g=mejs.TrackFormatParser.split2(b,/\r?\n/),h={text:[],times:[]};f<g.length;f++){if(c=this.pattern_timecode.exec(g[f]),c&&f<g.length){for(f-1>=0&&""!==g[f-1]&&(e=g[f-1]),f++,d=g[f],f++;""!==g[f]&&f<g.length;)d=d+"\n"+g[f],f++;d=a.trim(d).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi,"<a href='$1' target='_blank'>$1</a>"),h.text.push(d),h.times.push({identifier:e,start:0===mejs.Utility.convertSMPTEtoSeconds(c[1])?.2:mejs.Utility.convertSMPTEtoSeconds(c[1]),stop:mejs.Utility.convertSMPTEtoSeconds(c[3]),settings:c[5]})}e=""}return h}},dfxp:{parse:function(b){b=a(b).filter("tt");var c,d,e=0,f=b.children("div").eq(0),g=f.find("p"),h=b.find("#"+f.attr("style")),i={text:[],times:[]};if(h.length){var j=h.removeAttr("id").get(0).attributes;if(j.length)for(c={},e=0;e<j.length;e++)c[j[e].name.split(":")[1]]=j[e].value}for(e=0;e<g.length;e++){var k,l={start:null,stop:null,style:null};if(g.eq(e).attr("begin")&&(l.start=mejs.Utility.convertSMPTEtoSeconds(g.eq(e).attr("begin"))),!l.start&&g.eq(e-1).attr("end")&&(l.start=mejs.Utility.convertSMPTEtoSeconds(g.eq(e-1).attr("end"))),g.eq(e).attr("end")&&(l.stop=mejs.Utility.convertSMPTEtoSeconds(g.eq(e).attr("end"))),!l.stop&&g.eq(e+1).attr("begin")&&(l.stop=mejs.Utility.convertSMPTEtoSeconds(g.eq(e+1).attr("begin"))),c){k="";for(var m in c)k+=m+":"+c[m]+";"}k&&(l.style=k),0===l.start&&(l.start=.2),i.times.push(l),d=a.trim(g.eq(e).html()).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi,"<a href='$1' target='_blank'>$1</a>"),i.text.push(d)}return i}},split2:function(a,b){return a.split(b)}},3!="x\n\ny".split(/\n/gi).length&&(mejs.TrackFormatParser.split2=function(a,b){var c,d=[],e="";for(c=0;c<a.length;c++)e+=a.substring(c,c+1),b.test(e)&&(d.push(e.replace(b,"")),e="");return d.push(e),d})}(mejs.$),function(a){a.extend(mejs.MepDefaults,{sourcechooserText:""}),a.extend(MediaElementPlayer.prototype,{buildsourcechooser:function(b,c,d,e){var f,g=this,h=g.options.sourcechooserText?g.options.sourcechooserText:mejs.i18n.t("mejs.source-chooser");b.sourcechooserButton=a('<div class="mejs-button mejs-sourcechooser-button"><button type="button" role="button" aria-haspopup="true" aria-owns="'+g.id+'" title="'+h+'" aria-label="'+h+'"></button><div class="mejs-sourcechooser-selector mejs-offscreen" role="menu" aria-expanded="false" aria-hidden="true"><ul></ul></div></div>').appendTo(c).hover(function(){clearTimeout(f),b.showSourcechooserSelector()},function(){a(this);f=setTimeout(function(){b.hideSourcechooserSelector()},500)}).on("keydown",function(c){var d=c.keyCode;switch(d){case 32:mejs.MediaFeatures.isFirefox||b.showSourcechooserSelector(),a(this).find(".mejs-sourcechooser-selector").find("input[type=radio]:checked").first().focus();break;case 13:b.showSourcechooserSelector(),a(this).find(".mejs-sourcechooser-selector").find("input[type=radio]:checked").first().focus();break;case 27:b.hideSourcechooserSelector(),a(this).find("button").focus();break;default:return!0}}).on("focusout",mejs.Utility.debounce(function(c){setTimeout(function(){var c=a(document.activeElement).closest(".mejs-sourcechooser-selector");c.length||b.hideSourcechooserSelector()},0)},100)).delegate("input[type=radio]","click",function(){a(this).attr("aria-selected",!0).attr("checked","checked"),a(this).closest(".mejs-sourcechooser-selector").find("input[type=radio]").not(this).attr("aria-selected","false").removeAttr("checked");var b=this.value;if(e.currentSrc!=b){var c=e.currentTime,d=e.paused;e.pause(),e.setSrc(b),e.addEventListener("loadedmetadata",function(a){e.currentTime=c},!0);var f=function(a){d||e.play(),e.removeEventListener("canplay",f,!0)};e.addEventListener("canplay",f,!0),e.load()}}).delegate("button","click",function(c){a(this).siblings(".mejs-sourcechooser-selector").hasClass("mejs-offscreen")?(b.showSourcechooserSelector(),a(this).siblings(".mejs-sourcechooser-selector").find("input[type=radio]:checked").first().focus()):b.hideSourcechooserSelector()});for(var i in this.node.children){var j=this.node.children[i];"SOURCE"!==j.nodeName||"probably"!=e.canPlayType(j.type)&&"maybe"!=e.canPlayType(j.type)||b.addSourceButton(j.src,j.title,j.type,e.src==j.src)}},addSourceButton:function(b,c,d,e){var f=this;(""===c||void 0==c)&&(c=b),d=d.split("/")[1],f.sourcechooserButton.find("ul").append(a('<li><input type="radio" name="'+f.id+'_sourcechooser" id="'+f.id+"_sourcechooser_"+c+d+'" role="menuitemradio" value="'+b+'" '+(e?'checked="checked"':"")+'aria-selected="'+e+'" /><label for="'+f.id+"_sourcechooser_"+c+d+'" aria-hidden="true">'+c+" ("+d+")</label></li>")),f.adjustSourcechooserBox()},adjustSourcechooserBox:function(){var a=this;a.sourcechooserButton.find(".mejs-sourcechooser-selector").height(a.sourcechooserButton.find(".mejs-sourcechooser-selector ul").outerHeight(!0))},hideSourcechooserSelector:function(){this.sourcechooserButton.find(".mejs-sourcechooser-selector").addClass("mejs-offscreen").attr("aria-expanded","false").attr("aria-hidden","true").find("input[type=radio]").attr("tabindex","-1")},showSourcechooserSelector:function(){this.sourcechooserButton.find(".mejs-sourcechooser-selector").removeClass("mejs-offscreen").attr("aria-expanded","true").attr("aria-hidden","false").find("input[type=radio]").attr("tabindex","0")}})}(mejs.$),function(a){a.extend(mejs.MepDefaults,{contextMenuItems:[{render:function(a){return"undefined"==typeof a.enterFullScreen?null:a.isFullScreen?mejs.i18n.t("mejs.fullscreen-off"):mejs.i18n.t("mejs.fullscreen-on")},click:function(a){a.isFullScreen?a.exitFullScreen():a.enterFullScreen()}},{render:function(a){return a.media.muted?mejs.i18n.t("mejs.unmute"):mejs.i18n.t("mejs.mute")},click:function(a){a.media.muted?a.setMuted(!1):a.setMuted(!0)}},{isSeparator:!0},{render:function(a){return mejs.i18n.t("mejs.download-video")},click:function(a){window.location.href=a.media.currentSrc}}]}),a.extend(MediaElementPlayer.prototype,{buildcontextmenu:function(b,c,d,e){b.contextMenu=a('<div class="mejs-contextmenu"></div>').appendTo(a("body")).hide(),b.container.bind("contextmenu",function(a){return b.isContextMenuEnabled?(a.preventDefault(),b.renderContextMenu(a.clientX-1,a.clientY-1),!1):void 0}),b.container.bind("click",function(){b.contextMenu.hide()}),b.contextMenu.bind("mouseleave",function(){b.startContextMenuTimer()})},cleancontextmenu:function(a){a.contextMenu.remove()},isContextMenuEnabled:!0,enableContextMenu:function(){this.isContextMenuEnabled=!0},disableContextMenu:function(){this.isContextMenuEnabled=!1},contextMenuTimeout:null,startContextMenuTimer:function(){var a=this;a.killContextMenuTimer(),a.contextMenuTimer=setTimeout(function(){a.hideContextMenu(),a.killContextMenuTimer()},750)},killContextMenuTimer:function(){var a=this.contextMenuTimer;null!=a&&(clearTimeout(a),delete a,a=null)},hideContextMenu:function(){this.contextMenu.hide()},renderContextMenu:function(b,c){for(var d=this,e="",f=d.options.contextMenuItems,g=0,h=f.length;h>g;g++)if(f[g].isSeparator)e+='<div class="mejs-contextmenu-separator"></div>';else{var i=f[g].render(d);null!=i&&(e+='<div class="mejs-contextmenu-item" data-itemindex="'+g+'" id="element-'+1e6*Math.random()+'">'+i+"</div>")}d.contextMenu.empty().append(a(e)).css({top:c,left:b}).show(),d.contextMenu.find(".mejs-contextmenu-item").each(function(){var b=a(this),c=parseInt(b.data("itemindex"),10),e=d.options.contextMenuItems[c];"undefined"!=typeof e.show&&e.show(b,d),b.click(function(){"undefined"!=typeof e.click&&e.click(d),d.contextMenu.hide()})}),setTimeout(function(){d.killControlsTimer("rev3")},100)}})}(mejs.$),function(a){a.extend(mejs.MepDefaults,{skipBackInterval:30,skipBackText:""}),a.extend(MediaElementPlayer.prototype,{buildskipback:function(b,c,d,e){var f=this,g=mejs.i18n.t("mejs.time-skip-back",f.options.skipBackInterval),h=f.options.skipBackText?f.options.skipBackText:g;a('<div class="mejs-button mejs-skip-back-button"><button type="button" aria-controls="'+f.id+'" title="'+h+'" aria-label="'+h+'">'+f.options.skipBackInterval+"</button></div>").appendTo(c).click(function(){e.setCurrentTime(Math.max(e.currentTime-f.options.skipBackInterval,0)),a(this).find("button").blur()})}})}(mejs.$),function(a){a.extend(mejs.MepDefaults,{postrollCloseText:""}),a.extend(MediaElementPlayer.prototype,{buildpostroll:function(b,c,d,e){var f=this,g=f.options.postrollCloseText?f.options.postrollCloseText:mejs.i18n.t("mejs.close"),h=f.container.find('link[rel="postroll"]').attr("href");"undefined"!=typeof h&&(b.postroll=a('<div class="mejs-postroll-layer mejs-layer"><a class="mejs-postroll-close" onclick="$(this).parent().hide();return false;">'+g+'</a><div class="mejs-postroll-layer-content"></div></div>').prependTo(d).hide(),f.media.addEventListener("ended",function(c){a.ajax({dataType:"html",url:h,success:function(a,b){d.find(".mejs-postroll-layer-content").html(a)}}),b.postroll.show()},!1))}})}(mejs.$),function(a){a.extend(mejs.MepDefaults,{markerColor:"#E9BC3D",markers:[],markerCallback:function(){}}),a.extend(MediaElementPlayer.prototype,{buildmarkers:function(a,b,c,d){var e=0,f=-1,g=-1,h=-1,i=-1;for(e=0;e<a.options.markers.length;++e)b.find(".mejs-time-total").append('<span class="mejs-time-marker"></span>');d.addEventListener("durationchange",function(c){a.setmarkers(b)}),d.addEventListener("timeupdate",function(b){for(f=Math.floor(d.currentTime),h>f?i>f&&(i=-1):h=f,e=0;e<a.options.markers.length;++e)g=Math.floor(a.options.markers[e]),f===g&&g!==i&&(a.options.markerCallback(d,d.currentTime),i=g)},!1)},setmarkers:function(b){var c,d=this,e=0;for(e=0;e<d.options.markers.length;++e)Math.floor(d.options.markers[e])<=d.media.duration&&Math.floor(d.options.markers[e])>=0&&(c=100*Math.floor(d.options.markers[e])/d.media.duration,a(b.find(".mejs-time-marker")[e]).css({width:"1px",left:c+"%",background:d.options.markerColor}))}})}(mejs.$);
(function ($) {
    window.Acme       = {};
    Acme.View         = {};
    Acme.Model        = {};
    Acme.Collection   = {};
    Acme.Controller   = {};
    Acme.State        = {};
    Acme.SigninView   = {};
    Acme.SigninView   = {};
    Acme.UserProfileController = function(){};
    
    
    $('html').on('click', function(e) {
        $('.Acme-pulldown ul').hide();
    });

    Acme.server = {

        create: function(uri, queryParams) {return this.call(uri, queryParams, 'post');},
        fetch: function(uri, queryParams, datatype){return this.call(uri, queryParams, 'get', datatype);},
        update: function(uri, queryParams) {return this.call(uri, queryParams, 'put');},
        delete: function(uri, queryParams) {return this.call(uri, queryParams, 'delete');},
        call: function(uri, queryParams, type, datatype) {

            if (!window.location.origin) {
                 window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
            }
            type = (typeof type !== 'undefined') ? type : 'get';

            queryParams = (typeof queryParams !== 'undefined') ? queryParams : {};
            
            var url = (uri.indexOf("http") === 0) ? uri : _appJsConfig.appHostName + uri;

            return $.ajax({
                url: url,
                data: queryParams,
                dataType: datatype || "json",
                type: type
            }).fail(function(r) {
                // console.log(r);
                if (r.status == 501 || r.status == 404) console.log(r.responseText);
                if (r.responseJSON) console.log(r.responseJSON);
                console.log(r.responseText);
            });
        },
        callClient: function(uri, queryParams, type) {
            type = (typeof type !== 'undefined') ? type : 'get';
            queryParams = (typeof queryParams !== 'undefined') ? queryParams : '';
            return $.ajax({
                url: window.location.origin + uri,
                data: queryParams,
                dataType: "json",
                type: type
            });
        }
    }

    Acme.listen = function() {};
    Acme.listen.prototype.listener = function(topic, data)
    {
        // console.log(listner);
        var keys = Object.keys(data);
        for (var i = 0; i<keys.length; i++) {
            for (var listener in this.listeners) {
                if ( listener === keys[i] ) {
                    this.listeners[listener].call(this, data, topic);
                    if (this.listeners.after) {
                        this.listeners.after.call(this, data, topic);
                    }
                    break;
                }
            }
        }
    };


    Acme.Model.create = function(config)
    {
        var obj = Object.create(
        Acme._Model.prototype, {
            'resource': {
                    'value' : config['url'],
                    'enumerable': true,
                },
                'alias' : {
                    'value' : config['alias'] || null,
                    'enumerable': true,
                },
                'resource_id': {
                    'value' : config['resource_id'],
                    'enumerable': true,
                },
                'query' : {
                    'value': [],
                    'writable': true,
                    'enumerable': true,
                }
            }
        );
        for (var param in config['this']) {
            obj[param] = config['this'][param];
        }
        obj.messages = {
            'set'   : 'updated',
            'delete': 'deleted',
        };

        if (config['messages']) {
            for (var msg in config['messages']) {
                obj.messages[msg] = config['messages'][msg];
            }
        }

        return obj;
    };


    // Used by Acme.form
    Acme._View = function() {};
        Acme._View.prototype = new Acme.listen();
        Acme._View.prototype.updateData = function(data) {
            var keys = Object.keys(data);
            for (var j=0; j<keys.length; j++) {
                var key = keys[j];
                var keySplit = key.split('.');
                var scope = this.data;
    
                for(var i=0; i<keySplit.length; i++) {
                    if (!scope[keySplit[i]]) {
                        scope[keySplit[i]] = {};
                    }
                    if(i == keySplit.length -1 ) {
                        scope[keySplit[i]] = data[key];
                    }
                    scope = scope[keySplit[i]];
                }
            }
        }

    Acme.View.create = function(config)
    {
        var obj = function(){};

        for (conf in config) {
            obj.prototype[conf] = config[conf];
        }

        return obj;
    }

    // Acme._Collection = function(model) {
    //     this.model = model || null;
    // };
    //     Acme._Collection.prototype = Object.create(Acme.listen.prototype);
    //     Acme._Collection.prototype.fetch = function(url)
    //     {
    //         var self = this;
    //         var publishToken = self.name;
    //         var url = (url === undefined) ? this.url() : url;
    //         var data = Acme.server.fetch( url );
    //         data.done( function(response) {

    //             self.data = [];
    //             for (var i=0; i<response.length; i++) {
    //                 self.data.push( Object.create(self.model,
    //                     {   'data' : {
    //                             'value': response[i],
    //                             'writable': true
    //                         }
    //                     }
    //                 ));
    //             }

    //             var data = {};
    //             data[publishToken] = self;
    //             Acme.PubSub.publish('state_changed', data);
    //         });
    //         return data;
    //     };

    // Acme._Model = function() {};
    //     Acme._Model.prototype = Object.create(Acme.listen.prototype);
    //     Acme._Model.prototype.url = function()
    //     {
    //         if (this.resource_id) {
    //             var scope = this;
    //             var scopeSplit = this.resource_id.split('.');
    //             for (var k = 0; k < scopeSplit.length; k++) {
    //                 scope = scope[scopeSplit[k]];
    //                 if (scope == undefined) return;
    //             }
    //             var resource_id = scope
    //         }
    //         var id = resource_id || this.data.id;
    //         return this.resource + '/' + id + this.buildParams();
    //     };
    //     Acme._Model.prototype.buildParams = function()
    //     {
    //         var query = '';
    //         for(var i=0;i<this.query.length; i+=2) {
    //             if (this.query[i+1] != false ) {
    //                 query += (i===0) ? '?' : '&';
    //                 query += this.query[i] + '=' + this.query[i+1];
    //             }
    //         }
    //         return query;
    //     };
    //     Acme._Model.prototype.fetch = function(set)
    //     {
    //         var self = this;
    //         var set = (set === void 0) ? true : set;
    //         return Acme.server.request(self.url())
    //         .done(function(r) {
    //             if (set) self.set(r.data);
    //         });
    //     };
    //     Acme._Model.prototype.update = function(data, msg)
    //     {
    //         var self = this;

    //         return Acme.server.update(self.url(), data)
    //         .done(function(d, status, xhr) {
    //             if (xhr.status === 200) {
    //                 self.set(data, msg);

    //                 var message = self.resource + '/update';

    //                 // console.log(Acme.socket.send(JSON.stringify({action: message, value: self.data.id})));

    //             }
    //         });
    //     };

    //     Acme._Model.prototype.updater = function()
    //     {
    //         var self = this;
    //         var _url = self.url();

    //         return function(data, msg) {
    //             return Acme.server.update(_url, data)
    //             .done(function(d, status, xhr) {
    //                 if (xhr.status === 200) {
    //                     self.set(data, msg);
    //                 }
    //             });
    //         }
    //     };

    //     Acme._Model.prototype.set = function(value, msg)
    //     {
    //         var suppress = msg || false;
    //         for (var v in value) {
    //             this.data[v] = value[v];
    //         }
    //         if (!suppress) {
    //             var resource = {};
    //             resource[this.resource] = this;
    //             // Acme.PubSub.publish('state_changed', resource);
    //             // Acme.PubSub.publish('update_state', resource);
    //             Acme.PubSub.publish(this.resource + '/' + this.messages.set, this);
    //         }
    //     };
    //     Acme._Model.prototype.delete = function()
    //     {
    //         var self = this;
    //         var name = self.alias || self.resource;
    //         var msg = name + '/delete';

    //         // console.log(Acme.socket.send(JSON.stringify({action: msg, value: self.data.id})));

    //         return Acme.server.delete(self.url())
    //         .done(function(response) {
    //             if (response.data == true) {
    //                 self.data = {};
    //                 var data =  {};
    //                 data[name] = null;
    //                 Acme.PubSub.publish('update_state', data);
    //             }
    //         });
    //     };




    Acme.PubSub = {
        topics : {},
        lastUid : -1,
    };

        Acme.PubSub.publisher = function(topic, data) {
            var self = this;
            var Deferred = function() {
                return {
                    done: function(func) {
                        this.func = func;
                    },
                    resolve: function() {
                        if (this.func) {
                            this.func();
                        }
                    }
                }
            };

            if ( !this.topics.hasOwnProperty( topic ) ){
                return false;
            }

            var dfd = Deferred();

            var notify = function(){
                var subscribers = self.topics[topic];

                for ( var i = 0, j = subscribers.length; i < j; i++ ){
                    var scope = window;
                    var scopeSplit = subscribers[i].context.split('.');

                    for (var k = 0; k < scopeSplit.length - 1; k++) {
                        scope = scope[scopeSplit[k]];
                        if (scope == undefined) return;
                    }

                    var caller = scope[scopeSplit[scopeSplit.length - 1]];
                    var func   = subscribers[i].func;
                    if (caller) {
                        caller[func]( topic, data );
                    }
                }
                dfd.resolve();
            };

            setTimeout( notify , 0 );

            return dfd;
        };

        Acme.PubSub.publish = function( topic, data ){
            return this.publisher( topic, data, false );
        };

        Acme.PubSub.reset = function( ){
            this.lastUid = -1;
        };

        Acme.PubSub.print = function(){
            var subscribers = this.topics;
            for (var sub in subscribers) {
                for ( var i = 0; i < subscribers[sub].length; i++ ) {
                }
            }
        };

        Acme.PubSub.subscribe = function( subscription ) {
            var callbacks = Object.keys(subscription);
            var ret_topics = {};

            for (var i=0;i<callbacks.length; i++) {
                for(var j=0;j<subscription[callbacks[i]].length;j++) {
                    var topic = subscription[callbacks[i]][j];

                    var context = callbacks[i].substring(0, callbacks[i].lastIndexOf('.'));

                    var func = callbacks[i].substring(callbacks[i].lastIndexOf('.') + 1);

                    if ( !this.topics.hasOwnProperty( topic ) ) {
                        this.topics[topic] = [];
                    }

                   for (var k=0;k<this.topics[topic].length; k++) {
                        if (this.topics[topic][k].context === context && this.topics[topic][k].func === func) {
                            return;
                        }
                    }

                    var token = (++this.lastUid).toString();

                    this.topics[topic].push( { token : token, func : func, context : context } );
                    ret_topics[topic] = this.topics[topic];
                }

            }
            return ret_topics;
        };

        Acme.PubSub.unsubscribe = function( token ){
            for ( var m in this.topics ){
                if ( this.topics.hasOwnProperty( m ) ){
                    for ( var i = 0, j = this.topics[m].length; i < j; i++ ){
                        if ( this.topics[m][i].token === token ){
                            this.topics[m].splice( i, 1 );
                            return token;
                        }
                    }
                }
            }
            return false;
        };










    // Acme.listMenu = function(config)
    // {
    //     this.defaultTemp      = Handlebars.compile(Acme.templates.pulldown);
    //     this.defaultItemTemp  = Handlebars.compile('<li data-clear="{{clear}}" data-value="{{value}}" style="text-align:left">{{label}}</li>');
    //     this.divider          = "<hr>";
    //     this.callback         = config.callback      || null,
    //     this.menuParent       = config.parent        || {};
    //     this.class            = config.class         || "";
    //     this.template         = config.template      || this.defaultTemp;
    //     this.itemTemp         = config.itemTemp      || this.defaultItemTemp;
    //     this.list             = config.list          || [];
    //     this.allowClear       = config.allowClear    || null;
    //     this.defaultSelection = config.defaultSelect || null;
    //     this.name             = config.name          || null;
    //     this.key              = config.key           || null;
    //     this.listContainer    = null;
    //     this.defaultItem      = null;
    //     return this;
    // };
    //     Acme.listMenu.prototype.init = function(prepend)
    //     {
    //         var prepend = prepend || 'append';
    //         this.menuParent[prepend]( this.template({"name": this.name, "key":this.key, "class":this.class}) );
    //         this.defaultItem   = $('#' + this.name+' p');
    //         this.listContainer = $('#' + this.name+' ul');
    //         this.events();
    //         if (this.extendedEvents) this.extendedEvents();
    //         return this;
    //     };
    //     Acme.listMenu.prototype.render = function()
    //     {
    //         this.listContainer.empty();
    //         if (this.defaultSelection != null) {
    //             this.defaultItem.text(this.defaultSelection.label);
    //         }
    //         var html = this.createList();
    //         this.listContainer.append( html );
    //         this.listElements  = this.listContainer.find('li');
    //         this.listItemEvents();
    //         return this;
    //     };
    //     Acme.listMenu.prototype.events = function()
    //     {
    //         var self = this;
    //         this.defaultItem.parent().on('click', function(e) {
    //             e.stopPropagation();
    //             self.listContainer.toggle();
    //         });
    //     };
    //     Acme.listMenu.prototype.createList = function()
    //     {
    //         var itemTemp = this.itemTemp;
    //         var html = '';
    //         if (this.allowClear) {
    //             html = itemTemp({
    //                 'label'   :  'Any',
    //                 'value'   :  '',
    //                 'clear'   : true
    //             });      
    //         }

    //         for (var i=0; i<this.list.length; i++) {
    //             if (typeof this.list[i] === 'string') {
    //                 var label = value = this.list[i];
    //             } else {
    //                 var label = this.list[i].label;
    //                 var value = this.list[i].value;
    //             }
    //             html += itemTemp({
    //                 'label'   :  label,
    //                 'value'   :  value || ''
    //             });
    //         }
    //         return html;
    //     };
    //     Acme.listMenu.prototype.listItemEvents = function()
    //     {
    //         var self = this;
    //         this.listContainer.on('click', function(e) {
    //             $.each(self.listElements, function(i,e) {
    //                 $(e).attr('checked', false);
    //             });
    //             var elem = $(e.target);
    //             var value = elem.data('value');
    //             var clear = elem.data('clear');
    //             elem.attr('checked', true);
    //             var data = {};
    //             data[self.key || self.name] = value;

    //             if (self.callback) {
    //                 self.callback(data);
    //             } else {
    //                 Acme.PubSub.publish('update_state', data);
    //             }
                
    //             if (clear) {
    //                 self.reset();
    //             } else {
    //                 self.defaultItem.text(elem.text())
    //                     .addClass('Acme-pulldown__selected-item--is-active');
    //             }

    //             $(self.listContainer).hide(100);
    //         });
    //     };
    //     Acme.listMenu.prototype.select = function(item)
    //     {
    //         var menuid = '#' + this.name + ' > p';
    //         $(menuid).text(item);
    //         return this;
    //     };
    //     Acme.listMenu.prototype.reset = function()
    //     {
    //         this.defaultItem.text(this.defaultSelection.label)
    //               .removeClass('Acme-pulldown__selected-item--is-active');
    //         return this;
    //     };
    //     Acme.listMenu.prototype.remove = function()
    //     {
    //         $('#' + this.name).remove();
    //         return this;
    //     };
    //     Acme.listMenu.prototype.clear = function()
    //     {
    //         $('#' + this.name).html('');
    //         return this;
    //     };
    //     Acme.listMenu.prototype.empty = function()
    //     {
    //         this.listContainer.empty();
    //         return this;
    //     };
    //     Acme.listMenu.prototype.update = function(list)
    //     {
    //         this.list = list;
    //         this.empty();
    //         this.render();
    //         return this;
    //     };



    Acme.modal = function(template, name, layouts, data) {
        this.template = template || null;
        this.parentCont = name   || null;
        this.layouts = layouts   || null;
        this.data = data         || {};
        this.dfd = $.Deferred();
    }
        Acme.modal.prototype = new Acme.listen();

        Acme.modal.prototype.render = function(layout, title, data) {
            this.data = data || this.data;
            
            if (title) {
                this.data['title'] = title;
            }
            this.data['name'] = this.parentCont;
            var tmp = Handlebars.compile(Acme.templates[this.template]);
            var tmp = tmp(this.data);

            $('html').addClass('u-noscroll')
            $('body').addClass('u-noscroll').append(tmp);
            if (layout) {
                this.renderLayout(layout, this.data);
            }
            this.events();
            this.rendered(); // lifecycle hook that can be overriden
            return this.dfd.promise();
        };
        Acme.modal.prototype.renderLayout = function(layout, data) {
            var data = data || {};
            var tmp = Handlebars.compile(Acme.templates[this.layouts[layout]]);
            var layout = tmp(data);
            $('#'+this.parentCont).find('#dialogContent').empty().append(layout); 
        };
        Acme.modal.prototype.events = function() 
        {
            var self = this;
            $('#'+this.parentCont).on("click", function(e) {
                console.log(self.handler);
                self.handle(e);
            });

        };
        Acme.modal.prototype.rendered = function() {
            return true;
        };
        Acme.modal.prototype.handle = function(e) {
            var $elem = $(e.target);

            if ( !$elem.is('input') && !$elem.is('a') && !$elem.parent().is('a') ) {
                e.preventDefault();
            }
            if ($elem.data('behaviour') == 'close') {
                e.preventDefault();
                this.closeWindow();
                return $elem;
            }
            if ( $elem.is('button') ) {
                if ($elem.text().toLowerCase() === "cancel" || $elem.data('role') == 'cancel') {
                    this.dfd.fail();
                    this.closeWindow();

                } else if ($elem.text().toLowerCase() === "okay" || $elem.data('role') == 'okay') {
                    this.dfd.resolve();
                    this.closeWindow();
                }
            }
            return $elem;
        };
        Acme.modal.prototype.closeWindow = function() {
            $('html').removeClass('u-noscroll');
            $('body').removeClass('u-noscroll');
            $('#'+this.parentCont).remove();
        };
    



    Acme.dialog = {
        type : '',
        state : {},

        show : function(message, type, callback, self, data) {
            var that = this;
            var template  = '<div id="wrapper" class="flex_col"> <div id="dialog"><div><p id="dialogTitle">{{title}}</p><div id="dialogMessage">{{message}}</div>';
                template += '<ul id="dialogButtons"><button>Okay</button><button>Cancel</button></div></div></div>';

            template = template.replace( /{{title}}/ig, type || "");
            template = template.replace( /{{message}}/ig, message);
            var dfd = $.Deferred();

            $('body').append(template);
            $('#dialog').on("click", function(e) {
                var $elem = $(e.target);
                if (!$elem.is('input')) {
                    e.preventDefault();
                }

                if ( $elem.is('button') ) {
                    if ($elem.text() === "Cancel") {
                        Acme.dialog.closeWindow();
                    } else if ($elem.text() === "Okay") {
                        Acme.dialog.closeWindow();

                        // State can be provided by client external to 'show' call
                        if (data === undefined && that.state) {
                            data = that.state;
                        // If data is also provided we merge the two
                        } else if (that.state) {
                            var keys = Object.keys(that.state)
                            for (var k=0; k<keys.length;k++) {
                                data[keys[k]] = that.state[keys[k]];
                            }
                        }

                        if (self != undefined) {
                            if (data != undefined) {
                                var result = callback.call(self, data);
                                dfd.resolve(result);
                            } else {
                                var result = callback.call(self);
                                dfd.resolve(result);
                            }
                        } else {
                            var result = callback();
                            dfd.resolve(result);
                        }
                    }
                }
            });
            return dfd.promise();
        },
        closeWindow : function() {
            $('#dialog').closest('#wrapper').remove();
        }
    };

}(jQuery));


    



/**
 * Handlebar Article templates for listing
 */

Handlebars.registerHelper('labelFix', function(text) {
    if (!text) return "";
    var label = text.split(/[ _]/).map(function(l) {
        return l[0].toUpperCase() + l.substring(1);
    }).join(" ");
    return label;
});




Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});




Acme.templates = {};

Acme.templates.modal = 
// style="scrolling == unusable position:fixed element might be fixing login for ios safari
// also margin-top:10px
'<div id="{{name}}" class="flex_col {{name}}"> \
    <div id="dialog" class="{{name}}__window"> \
        <div class="{{name}}__container centerContent" style="scrolling == unusable position:fixed element"> \
            <div class="{{name}}__header"> \
                <h2 class="{{name}}__title">{{title}}</h2> \
                <a class="{{name}}__close-icon" href="#" data-behaviour="close"></a> \
            </div> \
            <div class="{{name}}__content-window" id="dialogContent" style="scrolling == unusable position:fixed element"></div> \
        </div> \
    </div> \
</div>';


Acme.templates.donate_modal = 
// style="scrolling == unusable position:fixed element might be fixing login for ios safari
// also margin-top:10px
'<div id="{{name}}" class="flex_col {{name}}"> \
    <div id="dialog" class="{{name}}__window"> \
        <div class="{{name}}__container centerContent" style="scrolling == unusable position:fixed element"> \
            <div class="{{name}}__content-window" id="dialogContent" style="scrolling == unusable position:fixed element"></div> \
        </div> \
    </div> \
</div>';



Acme.templates.donations = 
'<div id="{{id}}" class="donate-form" data-selected="{{selected.price_id}}"> \
    \
    <div class="donate-form__header"> \
        <div class="donate-form__periods j-donation-periods" data-active="{{active}}"> \
            {{#each prices}} \
                {{#each this}} \
                    <button data-elem="period" data-period="{{@key}}" data-product="{{../../id}}" class="donate-form__period-button {{# ifCond @key "==" ../../active}} donate-form__period-button--active {{/ifCond}} u-margin-right-10">{{labelFix @key}}</button>\
                {{/each}} \
            {{/each}} \
        </div> \
        \
        <div class="donate-form__close"> \
            <a class="donate-form__close-icon o-close" href="#" data-behaviour="close"></a> \
        </div> \
    </div> \
    \
    \
    <img src="{{logo}}" class="donate-form__logo"/> \
    \
    <p class="donate-form__text">How much would you like to contribute{{intervalString}}?</p> \
    \
    {{#each prices}} \
        {{#each this}} \
            {{# ifCond @key "==" ../../active}} \
                <div data-key="{{@key}}" data-active="{{../../active}}" class="donate-form__prices j-donation-price"> \
                    {{#each this}} \
                        <button data-selected="{{../../../selected.price_id}}" class="donate-form__price-button  {{# ifCond ../../../selected.price_id "==" this.id}} donate-form__price-button--active {{/ifCond}}    u-margin-right-10" data-elem="price" data-product="{{this.product}}" data-price_id="{{this.id}}">${{this.price}}</button>\
                    {{/each}} \
                </div> \
            {{/ifCond}} \
        {{/each}} \
    {{/each}} \
    \
    <div class="donations__amount"> \
        <input class="donate-form__input donate-form__input--override j-donate-input" data-elem="input" data-product="{{id}}" type="text" placeholder="Specify an amount" /> \
    </div> \
    <button class="donate-form__button" data-elem="checkout">Donate</button> \
</div>';



{/* <div id="email_spinner" class="{{class-prefix}}login-form__spinner u-display-none"><div class="spinner"></div></div> \ */}

Acme.templates.donateSignupForm = 
    // <script> tag possible ios safari login fix
'<div id="{{id}}" class="donate-form" data-selected="{{selected.price_id}}"> \
    <div class="donate-form__header"> \
        <div class="donate-form__close"> \
            <a class="donate-form__close-icon o-close" href="#" data-behaviour="close"></a> \
        </div> \
    </div> \
    \
    <img src="{{logo}}" class="donate-form__logo"/> \
    \
    \
    {{# ifCond validEmail "==" null}} \
        <p class="{{class-prefix}}login-form__email-share j-email-text">Please enter your email address</p> \
    {{/ifCond}} \
    {{# ifCond validEmail "==" false}} \
        <p class="{{class-prefix}}login-form__email-share j-email-text">It looks like you don\'t have an account with us.<br />Would you like to contine with this email address?</p> \
    {{/ifCond}} \
    \
    {{# ifCond validEmail "==" true}} \
        <p class="{{class-prefix}}login-form__email-share j-email-text"><strong>It looks like you have an account with us!</strong> <br />Please enter your password to continue.</p> \
    {{/ifCond}} \
    \
    \
    {{# ifCond validEmail "==" false}} \
        <p class="{{class-prefix}}login-form__input-result {{class-prefix}}login-form__input-result--active j-email-result">{{user.username}}</p> \
    {{/ifCond}} \
    \
    <form name="loginForm" id="loginForm" class="{{class-prefix}}login-form active" action="javascript:void(0);" method="post" accept-charset="UTF-8" autocomplete="off"> \
        \
        <div class="{{class-prefix}}login-form__email-container j-email-container u-margin-top-20"> \
            {{#if user.username }} \
                {{#if validEmail }} \
                    <input id="loginPass" class="{{class-prefix}}login-form__input {{class-prefix}}login-form__input--password j-signin-password" type="password" name="password"  value="" /> \
                {{/if}} \
            {{/if}} \
            \
            {{# ifCond validEmail "==" null}} \
                <input id="loginName" class="{{class-prefix}}login-form__input j-register-username" type="text" name="username" value="" placeholder="" /> \
                <label for="loginName" class="{{class-prefix}}login-form__input-label input__label">Enter your email address</label> \
            {{/ifCond}} \
            \
            {{# ifCond validEmail "==" false}} \
                <button data-elem="" id="" type="" class="{{class-prefix}}login-form__button-back j-retry">Use a different email</button> \
            {{/ifCond}} \
        </div> \
        \
        <div class="{{class-prefix}}login-form__error_text u-display-none j-error-text"></div> \
        \
        <div class="{{class-prefix}}login-form__button-container"> \
            <button data-elem="" id="modal-signinBtn" type="submit" class="{{class-prefix}}login-form__button {{# ifCond validEmail "==" false}}{{class-prefix}}login-form__button--active{{/ifCond}} j-continue">Continue</button> \
            <div id="email_spinner" class="{{class-prefix}}login-form__spinner u-display-none"><div class="spinner"></div></div> \
        </div> \
        \
        {{# ifCond validEmail "==" true}} \
            <p class="{{class-prefix}}login-form__forgot  j-forgot" data-elem="forgot" data-behaviour="forgot" class="">Forgot password?</p> \
        {{/ifCond}} \
        <script>$("#loginName").on("input", function() {window.scrollBy(0,1);window.scrollBy(0,-1);})</script> \
    </form> \
</div>';

// Acme.templates.donateResetPassword = 

// '<div id="{{id}}" class="donate-form" data-selected="{{selected.price_id}}"> \
//     <div class="donate-form__header"> \
//         <div class="donate-form__close"> \
//             <a class="donate-form__close-icon o-close" href="#" data-behaviour="close"></a> \
//         </div> \
//     </div> \
//     \
//     <img src="{{logo}}" class="donate-form__logo"/> \
//     \
//     <p class="donate-form__text j-email-text">Success! A password reset link has been sent to your email, please check your inbox</p> \
//     \
//     <button id="forgotBtn" type="submit" data-behaviour="login" class="{{class-prefix}}login-form__button {{class-prefix}}login-form__button--active u-margin-top-20">Back to login</button> \
// </div>';



Acme.templates.mailchimpList = 
    '<div> \
        <input type="checkbox" class="email-subscription__checkbox" name="summary-email" id="mailchimp" value="{{listId}}:{{groupId}}" {{checked}}> \
        <label class="email-subscription__label">{{{name}}}</label> \
    </div>';

Acme.templates.pulldown = 
'<div id="{{ name }}" class="Acme-pulldown {{class}}"> \
    <p class="Acme-pulldown__selected-item"></p> \
    <span class="Acme-pulldown__span"></span> \
    <ul class="Acme-pulldown__list" data-key="{{ key }}"></ul> \
</div>';


Acme.templates.create_user = 
'<div class="" style="height:100%; overflow:auto; position:relative"> \
    <div class="user-editor__input-container u-float-left"> \
        <input type="text" id="newuserfirstname" class="j-firstname account-form__input" value="" placeholder="{{firstname}}"> \
    </div> \
    <div class="user-editor__input-container u-float-right"> \
        <input type="text" id="newuserlastname" class="j-lastname account-form__input" value="" placeholder="{{lastname}}"> \
    </div> \
    <div class="user-editor__input-container u-float-left"> \
        <input type="text" id="newuseruseremail" class="j-email account-form__input" value="" placeholder="{{useremail}}"> \
        <p id="userError" class="user-editor__error"></p> \
    </div> \
    <div id="user-editor-buttons" class="user-editor__input-container user-editor__buttons u-float-right"> \
        <a id="cancelUserCreate" class="userdetails__button userdetails__button--delete u-float-right"></a> \
        <a id="saveUser"       class="userdetails__button userdetails__button--save u-float-right">Save</a> \
    </div> \
    <div id="user-editor__spinner" class="user-editor__spinner"></div> \
</div>';


Acme.templates.edit_user = 
'<div class="" style="height:100%; overflow:auto"> \
    <div class="user-editor__input-container u-float-left"> \
        <input type="text" id="newuserfirstname" class="j-firstname user-editor__input" value="{{firstname}}" placeholder="First name"> \
        <input type="text" id="newuserusername" class="j-username user-editor__input" value="{{username}}" placeholder="Email address"> \
        </div> \
    <div class="user-editor__input-container u-float-right"> \
        <input type="text" id="newuserlastname" class="j-lastname user-editor__input" value="{{lastname}}" placeholder="Last name"> \
    </div> \
    <div id="user-editor-buttons" class="user-editor__input-container u-float-right"> \
        <a id="cancelUserCreate" class="userdetails__button userdetails__button--delete u-float-right"></a> \
        <a id="saveUser"       class="userdetails__button userdetails__button--save u-float-right">Save</a> \
    </div> \
</div>';

Acme.templates.managed_user = 
'<div class="u-float-left"> \
    <p class="userdetails__name"> \
        <span class="j-firstname">{{firstname}}</span> \
        <span class="j-lastname">{{lastname}}</span> \
    </p> \
    <p class="j-username userdetails__username">{{username}}</p> \
</div>\
<a class="j-delete userdetails__button userdetails__button--delete u-float-right"></a> \
<a class="j-edit userdetails__button userdetails__button--edit u-float-right"></a>';


Acme.managed_user = 
'<li id="{{id}}" class="userdetails {{cardClass}}"> \
    <div class="u-float-left"> \
        <p class="userdetails__name"> \
            <span class="j-firstname">{{firstname}}</span> \
            <span class="j-lastname">{{lastname}}</span> \
        </p> \
    </div>\
    <a class="j-delete userdetails__button userdetails__button--delete u-float-right"></a> \
    <a class="j-edit userdetails__button userdetails__button--edit u-float-right"></a> \
    <p class="j-email  userdetails__email u-float-right">{{email}}</p> \
</li>';


Acme.templates.signinFormTmpl = 
    // <script> tag possible ios safari login fix
    '<form name="loginForm" id="loginForm" class="{{class-prefix}}login-form active" action="javascript:void(0);" method="post" accept-charset="UTF-8" autocomplete="off"> \
        \
        <input id="loginName" class="{{class-prefix}}login-form__input j-register-username" type="text" name="username" placeholder="Email address" value="" /> \
        <input id="loginPass" class="{{class-prefix}}login-form__input j-signin-password" type="password" name="password" placeholder="Password" value="" /> \
        \
        <div class="remember"> \
            <p class="{{class-prefix}}login-form__forgot layout" data-layout="forgot" class="">Forgot password</p> \
        </div> \
        \
        <div class="{{class-prefix}}login-form__error message active u-hide"> \
            <div class="{{class-prefix}}login-form__error_text">Invalid Email or Password</div> \
        </div> \
        \
        <button data-elem="signin" id="modal-signinBtn" type="submit" class="{{class-prefix}}login-form__button _btn _btn--red signin">SIGN IN</button> \
        \
        <p class="{{class-prefix}}login-form__faq u-no-margin u-margin-top-15 login-form-faq">Trouble signing in? <a class="login-form-faq__link" href="'+_appJsConfig.appHostName +'/faq" target="_blank">Read our FAQ</a></p> \
        \
        {{# ifCond name "!=" "donate-"}} \
            <div class="reset"> \
                <p class="layout" data-layout="forgot" class="">Set my password</p> \
            </div> \
        {{/ifCond}} \
        <script>$("#loginName").on("input", function() {window.scrollBy(0,1);window.scrollBy(0,-1);})</script>\
    </form>';







Acme.templates.registerTmpl = 
    '<form name="registerForm" id="registerForm" class="active" action="javascript:void(0);" method="post" accept-charset="UTF-8" autocomplete="off"> \
        \
        <input id="name" class="" type="text" name="name" placeholder="Name"> \
        <input id="email" class="" type="email" name="email" placeholder="Email"> \
        \
        <div class="message active u-hide"> \
            <div class="account-modal__error_text">Done!</div> \
        </div> \
        \
        <button id="signinBtn" type="submit" class="_btn _btn--red register">Register</button> \
    </form>';


Acme.templates.forgotFormTmpl = 
    '<form name="forgotForm" id="forgotForm" class="password-reset-form active" action="javascript:void(0);" method="post" accept-charset="UTF-8" autocomplete="off"> \
        <input type="hidden" name="_csrf" value="" /> \
        <p class="password-reset-form__p">Enter your email below and we will send you a link to set your password.</p> \
        <input id="email" class="password-reset-form__input" type="text" name="email" placehold="Email" value=""> \
        \
        <div class="message active u-hide"> \
            <div class="password-reset-form__error_text">No user with that email found.</div> \
        </div> \
        \
        <button id="forgotBtn" type="submit" class="_btn _btn--red forgot">SEND EMAIL</button> \
    </form>';

    
Acme.templates.spinner = 
    '<div id="{{name}}" class="flex_col {{name}}"> \
        <div id="dialog" class="{{name}}__window"> \
            <div class="{{name}}__header"> \
                <h2 class="{{name}}__title">{{title}}</h2> \
            </div> \
            <div class="{{name}}__content-window" id="dialogContent"></div> \
        </div> \
    </div>';
    

Acme.templates.spinnerTmpl = '<div class="spinner"></div>';

Acme.templates.subscribeTerms =  '<p class="password-reset-form__p u-margin-bottom-20">Please agree to the terms of use.</p><div><form><button class="_btn _btn--red" data-role="okay">OK</button></form></div>';
Acme.templates.ipnotice =  
    '<p class="ipdialog__p u-margin-bottom-20">You can access Pro under this subscription – simply email <a href="mailto:pro@newsroom.co.nz"><strong>pro@newsroom.co.nz</strong></a> for a login.</p> \
    <div> \
        <form> \
            <a href="mailto:pro@newsroom.co.nz" class="ipdialog__btn _btn _btn--red _btn--outline-red">CONTACT US</a> \
            <button class="ipdialog__btn _btn _btn--outline" data-role="close">I\'LL DO IT LATER</button> \
        </form> \
    </div>';

Acme.templates.userPlanMessage = 
'<p class="{{name}}__message centerText">{{{message}}}</p> \
<form name="loginForm" id="loginForm" class="active u-margin-top-20" action="javascript:void(0);" method="post" accept-charset="UTF-8" autocomplete="off"> \
     <button id="cancelbutton" class="_btn _btn--red close">OK</button> \
</form>';

Acme.templates.userPlanOkCancel = 
'<form name="loginForm" id="loginForm" class="active" action="javascript:void(0);" method="post" accept-charset="UTF-8" autocomplete="off"> \
     <button id="okaybutton" class="_btn _btn--red okay" data-role="okay">OK</button> \
     <button id="cancelbutton" class="_btn _btn--gray close" data-role="cancel">Cancel</button> \
</form>';

{/* <a class="{{name}}__back" href="#" data-behaviour="back">Back</a> \ */}



    // <video class="popupVideo__video" controls poster="{{image.path}}"> \
    //     <source src="{{video}}" type="video/mp4"/> \
    // </video> \

    // <iframe class="popupVideo__video" width="100%" height="100%" src="https://www.youtube.com/embed/L4O352anH_g" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe> \
Acme.templates.modalVideo = 
'<div id="popupVideo" class="popup-video"> \
    <div class="popupVideo__logo-container"> \
        <img class="popupVideo__logo" src="{{path}}/static/images/nr-logo.svg" alt="logo"> \
    </div> \
    <video class="popupVideo__video" controls autoplay poster="{{path}}/static/videos/newsroom_awards_full.jpg"> \
         <source src="https://s3-ap-southeast-2.amazonaws.com/cog-aap/themes/g02Ei4J8TjnbLiR/static/videos/Newsroom_Awards_Full.mp4" type="video/mp4"/> \
    </video> \
</div>';

Acme.templates.registerPopup = 
'<div id="register-popup" class="register-popup"> \
    <div class="container"> \
        <div class="row"> \
            <div class="col-xs-6 "> \
                <img class="register-popup__logo" src="{{path}}/static/images/newsroom-reversed.png" alt="logo"> \
            </div> \
            <div class="col-xs-6 "> \
                <div class="register-popup__close-container"> \
                    <a href="#" id="register-popup-close" class="register-popup__close register-popup__close@sm">CLOSE <span class="register-popup__close-icon"></span></a> \
                    <a href="#" id="register-popup-subscriber" class="register-popup__subscriber register-popup__subscriber@sm">I\'ve already subscribed</a> \
                </div>\
            </div> \
        </div> \
        <div class="row">\
            <div class="col-sm-5"> \
                <p class="register-popup__text"> \
                    Start your day with our editors\' picks of the very best stories. \
                    Sign up here for your free daily briefing email. <br /> \
                </p> \
            </div> \
            \
            <div class="col-sm-offset-1 col-sm-6"> \
                <div id="mc_embed_signup" class="popup-embed-signup"> \
                    <form action="//newsroom.us14.list-manage.com/subscribe/post?u=e0ae259e8f9472b9c54037c25&amp;id=71de5c4b35" method="post" id="mc-embedded-subscribe-form-popup" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate> \
                        <div id="mc_embed_signup_scroll" style="display:flex"> \
                            <div class="mc-field-group popup-embed-signup__field"> \
                                <input type="email" value="" name="EMAIL" class="required email popup-embed-signup__input" id="mce-EMAIL" placeholder="Email address" style="color:black; border:none"> \
                            </div> \
                            <button type="submit" class="popup-embed-signup__button" name="subscribe" id="mc-embedded-subscribe"> \
                                Sign Up \
                            </button> \
                            \
                            <div id="mce-responses" class="clear"> \
                                <div class="response" id="mce-error-response" style="display:none"></div> \
                                <div class="response" id="mce-success-response" style="display:none"></div> \
                            </div> \
                            <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_e0ae259e8f9472b9c54037c25_71de5c4b35" tabindex="-1" value=""></div> \
                        </div> \
                    </form> \
                </div> \
            </div> \
        </div> \
    </div> \
</div>';


var systemCardTemplate = 
'<div class="{{containerClass}} "> \
    <a  itemprop="url" \
        href="{{url}}" \
        class="card swap {{hasMediaClass}}" \
        data-id="{{articleId}}" \
        data-position="{{position}}" \
        data-social="0" \
        data-article-image="{{{imageUrl}}}" \
        data-article-text="{{title}}"> \
        \
        <article class="{{cardType}}c-cards-view">\
            {{#if hasMedia}}\
                <figure class="{{cardType}}c-cards-view__media">\
                    <img class="img-fluid lazyload" data-original="{{imageUrl}}" src="{{imageUrl}}" style="background-image:url("{{placeholder}}"")> \
                </figure>\
            {{/if}} \
        \
            <div class="{{cardType}}c-cards-view__container content">\
                    <div class="{{cardType}}c-cards-view__category category">{{label}}</div>\
                    <h2 class="{{cardType}}c-cards-view__heading j-truncate">{{{ title }}}</h2class="">\
                    <p class="{{cardType}}c-cards-view__description j-truncate">{{{ excerpt }}}</p>\
                    <div class="{{cardType}}c-cards-view__author-name author">\
                        <img src="{{profileImg}}" class="img-circle">\
                        <p class="">{{ createdBy.displayName }}</p>\
                    </div>\
            </div>\
        </article>'+
        
        '{{#if userHasBlogAccess}}'+
            '<div class="btn_overlay articleMenu">'+
                '<button title="Hide" data-guid="{{guid}}" class="btnhide social-tooltip HideBlogArticle" type="button" data-social="0">'+
                    '<i class="fa fa-eye-slash"></i><span class="hide">Hide</span>'+
                '</button>'+
                '<button onclick="window.location=\'{{{editUrl}}}\'; return false;" title="Edit" class="btnhide social-tooltip" type="button">'+
                    '<i class="fa fa-edit"></i><span class="hide">Edit</span>'+
                '</button>'+
                '<button data-position="{{position}}" data-social="0" data-id="{{articleId}}" title="{{pinTitle}}" class="btnhide social-tooltip PinArticleBtn" type="button" data-status="{{isPinned}}">'+
                    '<i class="fa fa-thumb-tack"></i><span class="hide">{{pinText}}</span>'+
                '</button>'+
            '</div>'+
        "{{/if}}"+
    '</a>'+
'</div>';




var cardTemplateTop = 
'<div class="{{cardClass}} "> \
    <a  itemprop="url" \
        href="{{url}}" \
        class="card swap {{articleStatus}}  {{hasMediaClass}}" \
        data-id="{{articleId}}" \
        data-position="{{position}}" \
        data-status="{{articleStatus}}" \
        data-social="0" \
        data-article-image="{{{imageUrl}}}" \
        data-article-text="{{title}}" \
        title="{{titleString}}"> \
    \
        <article class="{{cardType}}c-cards-view">';

var cardTemplateBottom = 
        '</article>'+
        
        '{{#if userHasBlogAccess}}'+
            '<div class="btn_overlay articleMenu">'+
                '<button title="Hide" data-guid="{{guid}}" class="btnhide social-tooltip HideBlogArticle" type="button" data-social="0">'+
                    '<i class="fa fa-eye-slash"></i><span class="hide">Hide</span>'+
                '</button>'+
                '<button onclick="window.location=\'{{{editUrl}}}\'; return false;" title="Edit" class="btnhide social-tooltip" type="button">'+
                    '<i class="fa fa-edit"></i><span class="hide">Edit</span>'+
                '</button>'+
                '<button data-position="{{position}}" data-social="0" data-id="{{articleId}}" title="{{pinTitle}}" class="btnhide social-tooltip PinArticleBtn" type="button" data-status="{{isPinned}}">'+
                    '<i class="fa fa-thumb-tack"></i><span class="hide">{{pinText}}</span>'+
                '</button>'+
            '</div>'+
        "{{/if}}"+
    '</a>'+
'</div>';



Acme.systemCardTemplate = 
    cardTemplateTop + 
        '{{#if hasMedia}}\
            <figure class="{{cardType}}c-cards-view__media">\
                <img class="img-responsive {{imgClass}}" data-original="{{imageUrl}}" src="{{imageUrl}}" {{imgBackgroundStyle}}">\
            </figure>\
        {{/if}} \
        \
        <div class="{{cardType}}c-cards-view__container content">\
            <div class="{{cardType}}c-cards-view__category category">{{label}}</div>\
            <h2 class="{{cardType}}c-cards-view__heading j-truncate">{{{ title }}}</h2>\
            <p class="{{cardType}}c-cards-view__description j-truncate">{{{ excerpt }}}</p>\
            <div class="{{cardType}}c-cards-view__author-name author">\
                <img src="{{profileImg}}" class="img-circle">\
                <p>{{ createdBy.displayName }}</p>\
            </div>\
        </div>' + 
    cardTemplateBottom;







var socialCardTemplate =  '<div class="{{containerClass}}">' +
                                '<a href="{{social.url}}" target="_blank" class="card swap card__{{social.source}} {{#if social.hasMedia}} withImage__content {{else }} without__image {{/if}} {{videoClass}}" data-id="{{socialId}}" data-position="{{position}}" data-social="1" data-article-image="{{{social.media.path}}}" data-article-text="{{social.content}}">'+
                                    '{{#if social.hasMedia}}'+
                                    '<div class="card-image lazyload" data-original="{{social.media.path}}" style="background-image:url(https://placeholdit.imgix.net/~text?txtsize=33&txt=Loading&w=450&h=250)">'+
                                        '<div class="play_icon video-player" data-source="{{social.source}}" data-url="{{social.media.videoUrl}}" data-poster="{{social.media.path}}"></div>'+
                                    '</div>' +
                                    '{{/if}}'+
                                    '<div class="content-section">' +
                                        '<div class="title-section">' +
                                            '<span>{{social.source}}</span>' +
                                            '<div class="card-icon"></div>' +
                                        '</div>' +
                                        '<p class="description" id="updateSocial{{socialId}}" data-update="0">{{{social.content}}}</p>' +
                                        '<div class="caption_bottom">' +
                                            '<div class="author_name">{{social.user.name}}</div>' +
                                            '<div class="post_date">{{social.publishDate}}</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '{{#if userHasBlogAccess}}'+
                                        '<div class="btn_overlay articleMenu">'+
                                            '<button title="Hide" data-guid="{{social.guid}}" class="btnhide social-tooltip HideBlogArticle" type="button" data-social="1">'+
                                                '<i class="fa fa-eye-slash"></i><span class="hide">Hide</span>'+
                                            '</button>'+
                                            '<button title="Edit" class="btnhide social-tooltip editSocialPost" type="button" data-url="/admin/social-funnel/update-social?guid={{blog.guid}}&socialguid={{social.guid}}">'+
                                            '<i class="fa fa-edit"></i><span class="hide">Edit</span>'+
                                            '</button>'+
                                            '<button data-position="{{position}}" data-social="1" data-id="{{socialId}}" title="{{pinTitle}}" class="btnhide social-tooltip PinArticleBtn" type="button" data-status="{{isPinned}}">'+
                                                '<i class="fa fa-thumb-tack"></i><span class="hide">{{pinText}}</span>'+
                                            '</button>'+
                                        '</div>'+
                                    '{{/if}}'+   
                                '</a>' +
                            '</div>';
(function($) {


    Acme.LoadAds = function()
    {
        if ($(".j-adslot").length > 0) {
            var adslots = $(".j-adslot");
            var deviceSize = getDeviceForAd();
            for (var i=0;i<adslots.length;i++) {
                var elem = adslots[i];
                var self = '';
                if (elem.id){
                    self = $("#"+elem.id);
                } else {
                    console.log('ad slot has no id');
                    continue;
                }

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
                        keys = self.keywords.split(',');
                        if (self.media.path){
                            $("#"+keys[0]).html("<div id='advertisment__"+keys[0]+"' class='advertisment advertisment__"+keys[0]+" advertisment__"+keys[1]+"'><a href='"+self.button.url+"'><img src='"+self.media.path+"'></a></div>");
                        } else if (self.description){
                            $("#"+keys[0]).html("<div id='advertisment__"+keys[0]+"' class='advertisment advertisment__"+keys[0]+" advertisment__"+keys[1]+"'>"+self.description+"</div>");
                            try {
                                adPush(keys[0]);
                            } catch(err) {
                                console.log('no ad found to push at advertisment__'+keys[0],err)
                            }
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
        googletag.defineSlot(invSlot, sizes, slotId)
            .setTargeting('POS', [pos])
            .defineSizeMapping(mapping)
            .addService(googletag.pubads());
        
        googletag.cmd.push(function() { googletag.display(slotId); });
    });
}
// Acme.CommentForm = function(params) {
//     this.csrfToken = $('meta[name="csrf-token"]').attr("content");

//     this.articleId = params.articleId;
//     this.articleGuid = params.articleGuid;
//     this.container = params.container || null;
//     this.input = params.input || null;
//     this.form = params.form || null;
//     this.submitButton = params.button || null;
//     this.userName = params.username || null;
//     this.approved = 1;
//     this.events();

// };

// Acme.CommentForm.prototype.render = function() {
//     var html= "<p>This is a comment</p>";
//     this.container.append(html);
// };

// Acme.CommentForm.prototype.postComment = function(comment) {

//     var data = {
//         guid: this.articleGuid, 
//         name: this.userName, 
//         comment: comment, 
//         approved: this.approved, 
//         _csrf: this.csrfToken
//     };

//     return Acme.server.create(_appJsConfig.baseHttpPath + '/api/article/post-comment', data).done(function(r) {
//         console.log(r);
//     });

// }


// Acme.CommentForm.prototype.events = function() {
//     var self = this;

//     this.form.on('submit', function(e) {
//         e.preventDefault();
//         $elem = $(this);
//         self.submitButton.text('')
//             .addClass('spinner');
        
//         self.postComment(self.input.val()).done(function(r) {
//             $().General_ShowNotification({message: 'You comment has been sent. Thanks!', layout:'bottomRight'});
//             self.input.val("");
//             self.submitButton.text("Send")
//                 .removeClass('spinner');

//         });
//     });
// }


// Acme.Comments = function(params) {
//     this.csrfToken = $('meta[name="csrf-token"]').attr("content");
//     this.comments = [];
//     this.events();p
// };

// Acme.Comments.prototype.like = function(guid) {
//     var data = {
//         guid: guid,
//         _csrf: this.csrfToken
//     };

//     return Acme.server.create(_appJsConfig.baseHttpPath + '/api/article/like-comment', data).done(function(r) {
//         console.log(r);
//     });

// }


// Acme.Comments.prototype.events = function() {
//     var self = this;

//     $('.js-comment-like').on('click', function(e) {
//         e.preventDefault();
//         var btn = $(e.target);
//         var comment = btn.closest('.c-comment');
//         var commentGuid = comment.data('guid');
//         self.like(commentGuid);
//         console.log(commentGuid);
//     });

// };
Acme.Feed = function() {};
Acme.Feed.prototype.fetch = function()
{
    var self = this;
    self.elem.html("Please wait...");
    
    var container = $('#'+self.elem.data('container'));
     // blogfeed makes 2 sql calls.  
    //      Offset is to get pinned contect 
    //      nonPinnedOffset gets the rest
    //      They're combined to return full result
    self.options = {
        'nonPinnedOffset'   :   self.elem.data('non-pinned-offset') || -1,
        'container'         :   container,
        'loadtype'          :   self.elem.data('loadtype')      || "home",
        'offset'            :   self.elem.data('offset') || self.elem.data('limit'),
        'blogid'            :   self.elem.data('blogguid'),
        'search'            :   self.elem.data('searchterm')    || null,
        'limit'             :   self.elem.data('limit'),
        // 'page'              :   self.elem.data('page') || 1, // page is used for user articles
    };
    
    if (self.options.search != null) {
        self.options.blogid = self.elem.data("blogid"); // search takes an id instead of a guid
    }
     $.fn.Ajax_LoadBlogArticles_new(self.options).done(function(data) {
        if (data.success == 1) {
            self.render(data);
        }
    });
};

Acme.Feed.prototype.events = function() 
{
    var self = this;
    self.elem.unbind().on('click', function(e) {
        e.preventDefault();
        self.fetch();
    });


    if (this.infinite && this.offset >= this.limit) {
        self.waypoint = new Waypoint({
            element: self.elem,
            offset: '80%',
            handler: function (direction) {
                if (direction == 'down') {
                    self.fetch();
                }
            }
        });
    }
};






Acme.View.articleFeed = function(feedModel, limit, offset, infinite, failText, controller)
{
    this.feedModel = feedModel;
    this.offset    = offset || 0;
    this.limit     = limit || 10;
    this.controller= controller || null;
    this.infinite  = infinite || false;
    this.waypoint  = false;
    this.options   = {};
    this.elem      = $('.loadMore');
    this.failText  = failText || null;
    this.events();
};

Acme.View.articleFeed.prototype = new Acme.Feed();
Acme.View.articleFeed.constructor = Acme.View.articleFeed;

Acme.View.articleFeed.prototype.render = function(data) 
{

    var self = this;
    var articles = [];
    if (data.articles) {
        articles = data.articles;
    }
    if (data.userArticles) {
        articles = data.userArticles;
    }

    var cardClass  =   self.elem.data('card-class'),
        template   =   self.elem.data('card-template') || null,
        label      =   self.elem.data('button-label')  || "Load more",
        ads_on     =   self.elem.data('ads')           || null,

        imgWidth   =   self.elem.data('imgwidth')      || null,
        imgHeight  =   self.elem.data('imgheight')     || null,

        rendertype =   self.elem.data('rendertype')    || null;

    self.elem.html(label);

    (articles.length < self.options.limit) 
        ? self.elem.css('display', 'none')
        : self.elem.show();

    // add counts to the dom for next request
    self.elem.data('non-pinned-offset', data.existingNonPinnedCount);
    self.elem.data('offset', (self.options.offset + self.options.limit));
    // self.elem.data('page', (self.options.page + 1)); // page is used for user articles

    var html = [];
    if (ads_on == "yes") {
        html.push( window.templates.ads_infinite );
    }

    if (articles.length === 0 && self.failText) {
        html = ["<p>" + self.failText + "</p>"];
    } else {
        for (var i in articles) {
            articles[i].imageOptions = {'width': imgWidth, 'height': imgHeight};
            html.push( self.feedModel.renderCard(articles[i], cardClass, template) );
        }
    }

    (rendertype === "write")
        ? self.options.container.empty().append( html.join('') )
        : self.options.container.append( html.join('') );
        
    if (self.waypoint) {
        (articles.length < self.options.limit)
            ? self.waypoint.disable()
            : self.waypoint.enable();
    }

    $(".card .content > p, .card h2, .card .content .author > p").dotdotdot();     
    // $('.video-player').videoPlayer();
    $("img.lazyload").lazyload({
        effect: "fadeIn"
    });

    self.elem.data('rendertype', '');
    this.feedModel.events();
};





Acme.View.userFeed = function(feedModel, limit, offset, infinite, failText, controller)
{
    this.feedModel = feedModel;
    this.controller = controller || null;
    this.offset    = offset || 0;
    this.limit     = limit || 10;
    this.infinite  = infinite || false;
    this.waypoint  = false;
    this.options   = {};
    this.elem      = $('.loadMore');
    this.failText  = failText || null;
    this.events();
};

Acme.View.userFeed.prototype = new Acme.Feed();
Acme.View.userFeed.constructor = Acme.View.userFeed;

Acme.View.userFeed.prototype.render = function(data) 
{
    var self = this;
    var users = data.users.users || data.users;

    var cardClass  =   self.elem.data('card-class'),
        template   =   self.elem.data('card-template') || null,
        label      =   self.elem.data('button-label')  || "Load more",
        ads_on     =   self.elem.data('ads')           || null,
        rendertype =   self.elem.data('rendertype')    || null;

    self.elem.html(label);
    (users.length < self.options.limit) 
        ? self.elem.css('display', 'none')
        : self.elem.show();

    // add counts to the dom for next request
    self.elem.data('offset', (self.options.offset + self.options.limit));

    var html = [];

    if (users.length === 0 && self.failText) {
        html = ["<p>" + self.failText + "</p>"];
    } else {
        for (var i in users) {
            html.push( self.feedModel.render(users[i], cardClass, template) );
        }
    }

    (rendertype === "write")
        ? self.options.container.empty().append( html.join('') )
        : self.options.container.append( html.join('') );
        
    if (self.waypoint) {
        (users.length < self.options.limit)
            ? self.waypoint.disable()
            : self.waypoint.enable();
    }

    this.controller.userEvents();

    $(".card .content > p, .card h2").dotdotdot();     
    // $('.video-player').videoPlayer();
    $("div.lazyload").lazyload({
        effect: "fadeIn"
    });

    self.elem.data('rendertype', '');
};


Acme.Usercard = function(){};
Acme.Usercard.prototype.render = function(user, cardClass, template, type)
{
    user['cardClass'] = cardClass;
    var template = (template) ? Acme[template] : Acme.systemCardTemplate;
    userTemplate = Handlebars.compile(template);
    return userTemplate(user);
}



var AuthController = (function ($) {
    return {
        loginOrSignup: function () {
            AuthController.LoginOrSignup.init();
        },
        socialSingup: function () {
            AuthController.SocialSignup.init();
        },
        forgotPassword: function () {
            AuthController.ForgotPassword.init();
        },
        resetPassword: function () {
            AuthController.ResetPassword.init();
        }
    };
}(jQuery));

AuthController.LoginOrSignup = (function ($) {

    var attachEvents = function () {
        $("#loginForm").validateLoginForm();
        $("#signupForm").validateSignupForm();
        
        $('.signupBtn').on('click', function () {
            $('.loginTab, #Login').removeClass('active');
            $('.signupTab, #SignUp').addClass('active');
        });
        $('.loginBtn').on('click',function () {
            $('.loginTab, #Login').addClass('active');
            $('.signupTab, #SignUp').removeClass('active');
        });
    };

    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));
AuthController.SocialSignup = (function ($) {

    var attachEvents = function () {
        $("#signupForm").validateSoicalSignupForm();
    };

    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));

AuthController.ForgotPassword = (function ($) {

    var attachEvents = function () {
        $("#forgotPasswordForm").validate({
            rules: {
                email: {
                    required: true
                }
            },
            messages: {
                email: "Email or username cannot be blank."
            }
        });

    };

    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));

AuthController.ResetPassword = (function ($) {

    var attachEvents = function () {
        $("#resetPasswordForm").validate({
            rules: {
                password: {
                    required: true,
                    minlength: 6
                },
                verifypassword: {
                    required: true,
                    minlength: 5,
                    equalTo: "#password"
                }
            },
            messages: {
                password: {
                    required: "Password cannot be blank.",
                    minlength: "Password should contain at least 6 characters."
                },
                verifypassword: {
                    required: "Verify password cannot be blank.",
                    minlength: "Verify Password should contain at least 6 characters.",
                    equalTo: "Verify Password should exactly match Password"
                }
            }
        });
    };

    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));
var CardController = function() {
    return new Card();
}

var Card = function() {
    this.events();
};





Card.prototype.renderCard = function(card, cardClass, template, type)
{

    var self = this;
    var template = (template) ? Acme[template] : Acme.systemCardTemplate;

    card['cardClass'] = cardClass;
    if (card.status == "draft") {
        card['articleStatus'] = "draft";
        card['cardClass'] += " draft"; 
    }

    card['cardType'] = card.type || "";
    card['lightbox'] = card.lightbox || "";


    card['pinTitle'] = (card.isPinned == 1) ? 'Un-Pin Article' : 'Pin Article';
    card['pinText']  = (card.isPinned == 1) ? 'Un-Pin' : 'Pin';
    card['promotedClass'] = (card.isPromoted == 1)? 'ad_icon' : '';
    card['hasMediaClass'] = (card.hasMedia == 1)? 'withImage__content' : 'without__image';
    
    // mainly for screen to turn off lazyload and loading background img
    card['imgClass'] = (card.lazyloadImage == false) ? '' : 'lazyload';
    card['imgBackgroundStyle'] = (card.lazyloadImage == false) ? '' : 'style="background-image:url(https://placeholdit.imgix.net/~text?txtsize=33&txt=Loading&w=450&h=250)"';
    
    card['readingTime']= self.renderReadingTime(card.readingTime);
    card['blogClass']= '';
    if(card.blog['id'] !== null) {
       card['blogClass']= 'card--blog_'+card.blog['id'];
    } 
    
    var width = 500;
    var height = 350;

    if (card.imageOptions) {
        width = card.imageOptions.width || width;
        height = card.imageOptions.height || height;
    }

    card['profileImg'] = $.image({media:card['createdBy']['media'], mediaOptions:{width: 34 ,height:34, crop: 'thumb', gravity: 'face'} });
    card['imageUrl'] = $.image({media:card['featuredMedia'], mediaOptions:{width: width ,height:height, crop: 'limit'} });
    card['titleString'] = "";
    if (_appJsConfig.isUserLoggedIn === 1 && _appJsConfig.userHasBlogAccess === 1) {
        var totalstring = "";
        var totals = (card.total ) ? card.total : false;
        if ( totals ) {
            totalstring = "Viewed " + totals.view + " times";
            totalstring = totalstring + " Published " + card.publishedDateTime;
        }
        card['titleString'] = totalstring;
    }

    var articleId = parseInt(card.articleId);
    var articleTemplate;

    if (isNaN(articleId) || articleId <= 0) {
        card['videoClass'] = '';
        if(card.social.media.type && card.social.media.type == 'video') {
            card['videoClass'] = 'video_card';
        }
        articleTemplate = Handlebars.compile(socialCardTemplate); 
    } else {
        articleTemplate = Handlebars.compile(template);
    }
    return articleTemplate(card);
}

Card.prototype.renderReadingTime = function (time) 
{
    if (time <= '59') {
        return ((time <= 0) ? 1 : time) + ' min read';
    } else {
        var hr = Math.round(parseInt(time) / 100);
        return hr + ' hour read';
    }
};



// events
Card.prototype.bindPinUnpinArticle = function()
{
    $('button.PinArticleBtn').Ajax_pinUnpinArticle({
        onSuccess: function(data, obj){
            var status = $(obj).data('status');
            var obj = $(obj);
            (status == 1) 
                ? obj.attr('title', 'Un-Pin Article') 
                : obj.attr('title', 'Pin Article');
            (status == 1) 
                ? obj.find('span').first().html('Un-Pin')
                : obj.find('span').first().html('Pin');        
        }
    });
};

Card.prototype.bindDeleteHideArticle = function()
{
    $('button.HideBlogArticle').Ajax_deleteArticle({
        onSuccess: function(data, obj){
            $(obj).closest('.card').parent('div').remove();
            var postsCount = $('body').find('.card').length;
            if(postsCount <= 0) {
                $('.NoArticlesMsg').removeClass('hide');
            }
        }
    });
};

Card.prototype.bindSocialUpdatePost = function () 
{
    $('.editSocialPost').on('click', function (e) {
        e.preventDefault();
        var elem = $(this);
        var url = elem.data('url');
        var popup = window.open(url, '_blank', 'toolbar=no,scrollbars=yes,resizable=false,width=360,height=450');
        popup.focus();

        var intervalId = setInterval(function () {
            if (popup.closed) {
                clearInterval(intervalId);
                var socialId = elem.parents('a').data('id');
                if ($('#updateSocial' + socialId).data('update') == '1') {
                    $().General_ShowNotification({message: 'Social Post(s) updated successfully.'});
                }
            }
        }, 50);

        return;
    });
};

Card.prototype.lightbox = function(elem, isRequestSent)
{
    var csrfToken = $('meta[name="csrf-token"]').attr("content");
    var isSocial = elem.data('social');
    
    if (isSocial) {
        var url = '/api/social/get-social-post';
        var blogGuid = elem.data('blog-guid');
        var postGuid = elem.data('guid');
        var payload = {blog_guid: blogGuid, guid: postGuid, _csrf: csrfToken}
    } else {
        var url = '/api/article/get-article';
        var articleId = elem.data('id');
        var payload = {articleId: articleId, _csrf: csrfToken}
    }

    if (!isRequestSent) {

        $.ajax({
            type: 'GET',
            url: _appJsConfig.appHostName + url,
            dataType: 'json',
            data: payload,
            success: function (data, textStatus, jqXHR) {
                data.hasMediaVideo = false;
                if (data.media['type'] === 'video') {
                    data.hasMediaVideo = true;
                }1
                
                if (data.source == 'youtube') {
                    var watch = data.media.videoUrl.split("=");
                    data.media.videoUrl = "https://www.youtube.com/embed/" + watch[1];
                }
                
                data.templatePath = _appJsConfig.templatePath;

                var articleTemplate = Handlebars.compile(socialPostPopupTemplate);
                var article = articleTemplate(data);
                $('.modal').html(article);

                setTimeout(function () {
                    $('.modal').modal('show');
                }, 500);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                isRequestSent = false;
            },
            beforeSend: function (jqXHR, settings) {
                isRequestSent = true;
            },
            complete: function (jqXHR, textStatus) {
                isRequestSent = false;
            }
        });
    }
}

Card.prototype.BindLightboxArticleBtn = function() 
{
    var self = this;

    $('.LightboxArticleBtn').on('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        var parentElement = $(this).parent().parent();
        self.lightbox(parentElement);
        return;
    });

};


Card.prototype.bindSocialPostPopup = function()
{
    var isRequestSent = false;
    $(document).on('click', 'article.lightbox', function (e) {
        var parentElement = $(this).parent();
        self.lightbox(parentElement, isRequestSent);
        return;


        // var csrfToken = $('meta[name="csrf-token"]').attr("content");

        // var isSocial = $(this).parent().data('social');
        // if (isSocial) {
        //     var url = '/api/social/get-social-post';
        //     var blogGuid = $(this).parent().data('blog-guid');
        //     var postGuid = $(this).parent().data('guid');
        //     var payload = {blog_guid: blogGuid, guid: postGuid, _csrf: csrfToken}
        // } else {
        //     var url = '/api/article/get-article';
        //     var articleId = $(this).parent().data('id');
        //     var payload = {articleId: articleId, _csrf: csrfToken}
        // }

        // if (!isRequestSent) {

        //     $.ajax({
        //         type: 'POST',
        //         url: _appJsConfig.appHostName + url,
        //         dataType: 'json',
        //         data: payload,
        //         success: function (data, textStatus, jqXHR) {
        //             data.hasMediaVideo = false;
        //             if (data.media['type'] === 'video') {
        //                 data.hasMediaVideo = true;
        //             }1
                    
        //             if (data.source == 'youtube') {
        //                 var watch = data.media.videoUrl.split("=");
        //                 data.media.videoUrl = "https://www.youtube.com/embed/" + watch[1];
        //             }
                    
        //             data.templatePath = _appJsConfig.templatePath;

        //             var articleTemplate = Handlebars.compile(socialPostPopupTemplate);
        //             var article = articleTemplate(data);
        //             $('.modal').html(article);

        //             setTimeout(function () {
        //                 $('.modal').modal('show');
        //             }, 500);
        //         },
        //         error: function (jqXHR, textStatus, errorThrown) {
        //             isRequestSent = false;
        //         },
        //         beforeSend: function (jqXHR, settings) {
        //             isRequestSent = true;
        //         },
        //         complete: function (jqXHR, textStatus) {
        //             isRequestSent = false;
        //         }
        //     });
        // }
    });
};

Card.prototype.initDraggable = function()
{
    $('.swap').draggable({
        helper: 'clone',
        revert: true,
        zIndex: 100,
        scroll: true,
        scrollSensitivity: 100,
        cursorAt: { left: 150, top: 50 },
        appendTo:'body',
        start: function( event, ui ) {
            ui.helper.attr('class', '');
            var postImage = $(ui.helper).data('article-image');
            var postText = $(ui.helper).data('article-text');
            if(postImage !== "") {
                $('div.SwappingHelper img.article-image').attr('src', postImage);
            }
            else {
                $('div.SwappingHelper img.article-image').attr('src', 'http://www.placehold.it/100x100/EFEFEF/AAAAAA&amp;text=no+image');
            }
            $('div.SwappingHelper p.article-text').html(postText);
            $(ui.helper).html($('div.SwappingHelper').html());    
        }
    });
};

Card.prototype.initDroppable = function()
{
    var self = this;

    $('.swap').droppable({
        hoverClass: "ui-state-hover",
        drop: function(event, ui) {
            
            function getElementAtPosition(elem, pos) {
                return elem.find('a.card').eq(pos);
            }

            var sourceObj       = $(ui.draggable); //card being dragged
            var destObject      = $(this); //card it lands on
            var sourceProxy     = null;
            var destProxy       = null;

            

            if (typeof sourceObj.data('proxyfor') !== 'undefined') {
                sourceProxy = sourceObj;
                sourceObj   = getElementAtPosition($( '.' + sourceProxy.data('proxyfor')), sourceProxy.data('position') -1);
                sourceObj.attr('data-position', destObject.data('position'));

            }
            if (typeof destObject.data('proxyfor') !== 'undefined') {
                destProxy = destObject;
                destObject = getElementAtPosition($( '.' + destObject.data('proxyfor')), destObject.data('position') -1);
                destObject.attr('data-position', sourceObj.data('position'));
            }



            //get positions
            var sourcePosition       = sourceObj.data('position');
            var sourcePostId         = sourceObj.data('id');
            var sourceIsSocial       = parseInt(sourceObj.data('social'));
            var sourcePinStatus      = parseInt(sourceObj.find('.PinArticleBtn').attr('data-status'));

            var destinationPosition  = destObject.data('position');
            var destinationPostId    = destObject.data('id');
            var destinationIsSocial  = parseInt(destObject.data('social'));
            var destinationPinStatus = parseInt(destObject.find('.PinArticleBtn').attr('data-status'));


            var swappedDestinationElement = sourceObj.clone().removeAttr('style').insertAfter( destObject );
            var swappedSourceElement = destObject.clone().insertAfter( sourceObj );
            

            if (sourceProxy) {
                sourceProxy.find('h2').text(destObject.find('h2').text());
                swappedDestinationElement.addClass('swap');
                swappedSourceElement.removeClass('swap');
                sourceProxy.attr('data-article-text', destObject.data('article-text'));
                sourceProxy.attr('data-article-image', destObject.data('article-image'));
            }

            if (destProxy) {
                if (sourceIsSocial) {
                    destProxy.find('h2').text( sourceObj.find('p').text() );
                } else {
                    destProxy.find('h2').text( sourceObj.find('h2').text() );
                }
                swappedSourceElement.addClass('swap');
                swappedDestinationElement.removeClass('swap');
                destProxy.attr('data-article-text', sourceObj.data('article-text'));
                destProxy.attr('data-article-image', sourceObj.data('article-image'));
            }
            
            swappedSourceElement.attr('data-position', sourcePosition);
            swappedDestinationElement.attr('data-position', destinationPosition);

            swappedSourceElement.find('.PinArticleBtn').attr('data-position', sourcePosition);
            swappedDestinationElement.find('.PinArticleBtn').attr('data-position', destinationPosition);

            swappedSourceElement.find('.PinArticleBtn').attr('data-status', destinationPinStatus);
            swappedDestinationElement.find('.PinArticleBtn').attr('data-status', sourcePinStatus);


            $(ui.helper).remove(); //destroy clone
            sourceObj.remove();
            destObject.remove();
            
            var csrfToken = $('meta[name="csrf-token"]').attr("content");
            var postData = {
                sourcePosition: sourcePosition,
                sourceArticleId: sourcePostId,
                sourceIsSocial: sourceIsSocial,
                
                destinationPosition: destinationPosition,
                destinationArticleId: destinationPostId,
                destinationIsSocial: destinationIsSocial,
                
                _csrf: csrfToken
            };

            $.ajax({
                url: _appJsConfig.baseHttpPath + '/home/swap-article',
                type: 'post',
                data: postData,
                dataType: 'json',
                success: function(data){

                    if(data.success) {
                        $.fn.General_ShowNotification({message: "Articles swapped successfully"});
                    }
                    
                    // $(".card p, .card h2").dotdotdot();
                    $(".j-truncate").dotdotdot();
                    self.events();
                },
                error: function(jqXHR, textStatus, errorThrown){
                    $.fn.General_ShowErrorMessage({message: jqXHR.responseText});
                },

            });

        }
    }); 
};

Card.prototype.events = function() 
{
    var self = this;

    if (_appJsConfig.isUserLoggedIn === 1 && _appJsConfig.userHasBlogAccess === 1) {
        self.initDroppable();
        self.initDraggable();        
        self.bindPinUnpinArticle();
        self.bindDeleteHideArticle();
        self.bindSocialUpdatePost();  
        self.BindLightboxArticleBtn();

    }
    self.bindSocialPostPopup();
};
/***                      ****
  Dialog Confirmation Box
***                       ****/

Acme.Confirm = function(template, parent, layouts) {

    this.template = template;
    this.parentCont = parent;
    this.layouts = layouts;
    this.parent = Acme.modal.prototype;
    this.data = {};
};
    Acme.Confirm.prototype = new Acme.modal();
    Acme.Confirm.constructor = Acme.Confirm;
    Acme.Confirm.prototype.errorMsg = function(msg) {
        $('.message').toggleClass('hide');
    };
    Acme.Confirm.prototype.handle = function(e) {
        var self = this;
        this.parent.handle.call(this, e);
        var $elem = $(e.target);

        if ( $elem.is('a') ) {
            if ($elem.hasClass('close')) {
                $('body').removeClass("active");
                this.closeWindow();
            }
        }
        if ($elem.is('button')) {
            if ($elem.hasClass('signin')) {
                e.preventDefault();
                var formData = {};
                $.each($('#loginForm').serializeArray(), function () {
                    formData[this.name] = this.value;
                });
                Acme.server.create('/api/auth/login', formData).done(function(r) {
                    if (r.success === 1) {
                        window.location.href = location.origin;
                    } else {
                        self.errorMsg();
                    }
                }).fail(function(r) { console.log(r);});
            }


            if ($elem.hasClass('register')) {
                e.preventDefault();
                var formData = {};
                $.each($('#registerForm').serializeArray(), function () {
                    formData[this.name] = this.value;
                });

                if (formData['email'] !== '' && formData['name'] !== ''){
                    $.get( 'https://submit.pagemasters.com.au/ubt/submit.php?email='+encodeURI(formData['email'])+'&name='+encodeURI(formData['name']) );
                    $elem.addClass('spinner');
                    function close() {
                        self.closeWindow();
                    };
                    setTimeout(close, 2000);

                } else {
                    alert ("Please fill out all fields.");
                }
            }


            if ($elem.hasClass('forgot')) {
                e.preventDefault();
                var formData = {};
                $.each($('#forgotForm').serializeArray(), function () {
                    formData[this.name] = this.value;
                });

                Acme.server.create('/api/auth/forgot-password', formData).done(function(r) {
                    if (r.success === 1) {
                        location.reload();
                    } else {
                        self.errorMsg();
                    }

                }).fail(function(r) { console.log(r);});
            }

            if ($elem.hasClass('default-weather')) {
                var newDefault = Acme.State.Country + '/' + Acme.State.City;

                localStorage.setItem('city', newDefault);
                function close() {

                    Acme.PubSub.publish("update_state", {'localweather': newDefault });                

                    self.closeWindow();
                };
                setTimeout(close, 500);            
            }        

            if ($elem.data('role') === 'delete') {
                $elem.addClass("spinner");
                Acme.PubSub.publish("update_state", {'delete listing': "" });
            }

            if ($elem.data('role') === 'deleteImage') {
                // console.log('you want to delete an image???');
                // console.log(self.data);
                Acme.PubSub.publish("update_state", {'delete image': self.data });

                // $elem.addClass("spinner");
                // Acme.PubSub.publish("update_state", {'delete listing': "" });
            }


        }
        if ($elem.hasClass('layout')) {
            var layout = $elem.data('layout');
            this.renderLayout(layout);
        }
    };

/***                      ****
  Dialog Confirmation Box
***                       ****/

Acme.IPCheck = function() {

    function dot2num(dot) {
        var d = dot.split(".");
        return ((((((
               +d[0])   * 256 )
             +(+d[1]))  * 256 )
             +(+d[2]))  * 256 )
             +(+d[3]
        );
    }

    $(function() {

        Acme.IPToken = new Acme.Token("IP_ACCOUNT");
        var token = Acme.IPToken.getToken();
        var IPAdresses = [];

        if (!token) {

            // Acme.server.fetch(_appJsConfig.appHostName + '/api/theme/get-config').done(function(r) {

            //     if (r.success === 1) {

                if (typeof window.IPAdresses == 'undefined') {
                    return;
                }
                IPAdresses = window.IPAdresses;
                $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
                function(json) {
                    console.log(json);
                    var userAccount = false;
                    var userIPInt = dot2num(json.ip);

                    for (var i = 0 ; i < IPAdresses.length ; i++) {
                        if (IPAdresses[i].indexOf('//') === 0 ) {
                            continue;
                        }
    
                        var range = IPAdresses[i].split("-");
                        
                        // All IP addresses are converted to a range, however
                        // we can start by just listing one.  The second ip
                        // in the range will be added automtically
                        if (range.length < 2) {
    
                            // check for a wildcard character and replace with a zero
                            // for the first item in the range, and 255 for the second item in the range
                            if (range[0].indexOf("*") > -1) {
                                var ip1 = range[0];
                                range[0] = dot2num( ip1.replace(/\*/g, "0") );
                                range.push( dot2num( ip1.replace(/\*/g, "255") ) );
                            } else {
                                range[0] = dot2num ( range[0] );
                                range.push( range[0] );
                            }
    
                        // if both ip addresses are specified no need to check for wildcard
                        } else {
                            range[0] = dot2num ( range[0] );
                            range[1] = dot2num ( range[1] );
                        }
    
                        if (userIPInt >= range[0] && userIPInt <= range[1]) {
                            userAccount = true;
                            break;
                        }
                    }
    
                    if ( userAccount ) {
                        Acme.IPNoticePopup = new Acme.IPNotice("modal", "ipdialog", {"main": "ipnotice"});
                        Acme.IPNoticePopup.render("main", "Did you know your employer is a subscriber to Newsroom Pro?");
                    }
                });


            //     } 
            // }).fail(function(r) { console.log(r);return;});




        }
    });
}


Acme.IPNotice = function(template, parent, layouts) {

    this.template = template;
    this.parentCont = parent;
    this.layouts = layouts;
    this.parent = Acme.modal.prototype;
    this.data = {};
};
    Acme.IPNotice.prototype = new Acme.modal();
    Acme.IPNotice.constructor = Acme.IPNotice;
    Acme.IPNotice.prototype.errorMsg = function(msg) {
        $('.message').toggleClass('hide');
    };
    Acme.IPNotice.prototype.handle = function(e) {
        var self = this;
        this.parent.handle.call(this, e);
        var $elem = $(e.target);

        if ( $elem.is('a') || $elem.parent().is('a') ) {
            self.closeWindow();
            Acme.IPToken.setToken('true');
        }
        if ($elem.is('button')) {
            if ($elem.data('role') === 'close') {
                self.closeWindow();
            }
            Acme.IPToken.setToken('true');
        }
    };

Acme.DonateModal = function(template, parent, layouts, handler) {
    this.template = template;
    this.parentCont = parent;
    this.layouts = layouts;
    this.parent = Acme.modal.prototype;
    this.handler = handler;
};
Acme.DonateModal.prototype = new Acme.modal();
Acme.DonateModal.constructor = Acme.DonateModal;
Acme.DonateModal.prototype.errorMsg = function(msg) {
    $('.message').removeClass('u-hide');
};
Acme.modal.prototype.events = function() 
{
    var self = this;
    $('#'+this.parentCont).on("click", function(e) {
        // console.log(self.handler);
        self.handle(e);
    });
};

Acme.DonateModal.prototype.handle = function(e) {
    var $elem = this.parent.handle.call(this, e);
    this.handler.call(Acme.donations, e);
};











Acme.Donations = function(Stripe, params) {
    this.pricing = {};
    this.container = document.getElementById(params.container);
    this.active = {};
    this.selected = {};
    this.products = [];
    this.stripe_key = params.stripe_key;
    this.Stripe = Stripe;
    this.priceRequests = [];
    this.pages = [];
    this.guest = params.guest || true;
    this.validEmail = null;
    this.user = {};
    this.emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    self.next = "email-check";

    if (this.guest !== "1") {
        this.fetchUser().done(function(r) {
            if (r.success === 1)
                this.user = r.self;
        });
    }
    this.modal = new Acme.DonateModal('donate_modal', 'donate-modal', {
        "donate"        : 'donations',
        "spinner"       : 'spinnerTmpl',
        "register"      : 'registerTmpl',
        "signin"        : 'donateSignupForm',
        "register"      : 'registerTmpl',
        "reset-success" : 'donateResetPassword',
    }, this.handler );

    this.events();
};

Acme.Donations.prototype.load = function(force) {
    var self = this;

    if (Object.keys(self.pricing).length > 0) {
        self.renderPrices();
        return;
    }

    self.pricing = {};

    // self.renderLayout('donate', {});
    // return;
    this.fetchProducts().done( function(r) {

        for (let i = 0; i < r.data.length; i++) {
            if (r.data[i].active) {
                self.products.push(r.data[i]);
            }
        }

        self.fetchPrices().done(function(r) {
            console.log(r);
            var args = Array.prototype.slice.call(arguments);
            if (args[1] === 'success') {
                args = [args];
            }
            args.forEach(function(priceData) {
                var data = priceData[0].data;
                var productId  = priceData[2].productId;       
    
                var correctProduct = self.products.filter(function(p) {
                    return p.id == productId;
                })[0]; 
                
                correctProduct['prices'] = data;
            });
            self.parsePrices();
            self.renderPrices();
        });
    });
}

Acme.Donations.prototype.fetchProducts = function()
{   
    return Acme.server.fetch('/api/paywall/stripe-products', {});
};

Acme.Donations.prototype.fetchPrices = function() {
    var self = this;

    for (var i=0; i<this.products.length; i++) {
        if (typeof this.products[i].metadata.active !== 'undefined' && this.products[i].metadata.active !== "true") {
            continue;
        }
        this.products[i].prices = [];
        this.priceRequests.push( this.fetchPrice(this.products[i]) );
    }
    return $.when.apply(undefined, this.priceRequests);
}


Acme.Donations.prototype.fetchPrice = function(product)
{ 
    var req = Acme.server.fetch('/api/paywall/stripe-product-prices', {
        "product" : product.id
    });

    req.productId = product.id;

    return req;
};


Acme.Donations.prototype.parsePrices = function(r) {

    for (product in this.products) {
        product = this.products[product];
        
        if (typeof product.metadata.active === 'undefined' || product.metadata.active !== 'true') {
            continue;
        }

         
        var order = ["month", "year", "one_time"];
        if (typeof product.metadata.order !== 'undefined') {
            order = product.metadata.order.split(',');
        }

        this.active[product.id] = order[0];
        this.selected.interval = order[0];

        this.pricing[product.id] = {
            id: product.id,
            name: product.name,
            description: product.description,
            prices: [], 
            intervals: []
        }
        var pricesByInterval = {};
        for (price in product.prices) {
            var price = product.prices[price];
    
            var interval = null;
            if (price.type === "one_time") {
                interval = price.type;
            } else {
                interval = price.recurring.interval;
            }
            
            // this.selected.interval = interval;

            if (typeof pricesByInterval[interval] === 'undefined') {
                pricesByInterval[interval] = [];
            }
            // this.pricing[product.id].intervals.push(interval);
            pricesByInterval[interval].push({
                "unit_amount": price.unit_amount,
                "price" : price.unit_amount / 100,
                "id" : price.id,
                "product": price.product,
                "currency" : price.currency
            });
        }

        for (var i = 0; i < order.length; i++) {
            if (typeof pricesByInterval[order[i]] === 'undefined') {
                continue;
            }
            this.pricing[product.id].prices.push({
                [order[i]] : pricesByInterval[order[i]]
            });
        }

    }

}

Acme.Donations.prototype.renderPrices = function(r) {
    for (pricing in this.pricing) {
        data = this.pricing[pricing];
        data.active = this.active[data.id];
        data.selected = this.selected;
        this.renderLayout("donate", data);
    }
}


Acme.Donations.prototype.renderLayout = function(layout, data) {
    if (typeof data === "undefined" || !data || Object.keys(data).length < 1) {
        data= {};
    }

    this.pages.push(layout);
    // if (layout === "signin") {
    data["class-prefix"] = "donate-";
    data["logo"] = _appJsConfig.templatePath + "/static/images/newsroom-logo.svg";
    data['user'] = this.user;
    data['guest'] = this.guest;
    data['validEmail'] = this.validEmail;
    data['intervalString'] = "";
    if (this.selected.interval === "month" || this.selected.interval === "year") {
        data['intervalString'] = " each " + this.selected.interval;
    }

    // }
    this.modal.renderLayout(layout, data);
    this.layoutEvents();
}


Acme.Donations.prototype.renderBack = function() {
    this.pages.pop();
    var data = {};
    var layout = this.pages[this.pages.length - 1];

    if (layout === "donate") {
        this.renderPrices();
        return;
    }

    this.modal.renderLayout(layout, data);
}


Acme.Donations.prototype.layoutEvents = function() {
    var self = this;

    var componentPrefix = "donate-login-form";
    var amountInput = document.querySelector('.j-donate-input');
    var usernameInput = document.querySelector('.j-register-username');
    var passwordInput = document.querySelector('.j-signin-password');
    var hide = 'u-display-none';
    var spinner = document.getElementById("email_spinner");
    var retryButton = document.querySelector('.j-retry');
    var proceed = document.querySelector('.j-continue');


    if (amountInput) {
        amountInput.oninput = function(e) {
            var product = e.target.dataset.product;
            if (e.target.value.length > 0) {
                delete self.selected.price_id;
                self.selected.amount = e.target.value;
                self.selected.product_id = product;
                self.selected.currency = 'aud';
            } else {
                delete self.selected.amount;
            }
        };
    }



    if (passwordInput) {
        passwordInput.oninput = function(e) {
            self.user.password = e.target.value;
        };
    }




    if (usernameInput) {
        usernameInput.focus();
        usernameInput.oninput = function(e) {
            var email = e.target.value
            self.user['username'] = email;

            if ( email != "" ) {
                e.target.classList.add("shrink");
            } else {
                e.target.classList.remove("shrink");
            }
            if (self.emailRegex.test(email)) {
                proceed.classList.add(componentPrefix + '__button--active')
            } else {
                proceed.classList.remove(componentPrefix + '__button--active');
            }
        };
    }




    if (proceed) {
        proceed.addEventListener('click', function(e) {
            e.target.innerText = "";
            spinner.classList.remove(hide);

            
            if (typeof self.next === "undefined" || self.next === null) {
    
                self.checkEmail(self.user.username).done(function(r) {
                    self.validEmail = null;
    
                    // USER IS A GUEST
                    if (r.exists === false) {
                        self.validEmail = false;
                        self.next = "signin";
        
                    // USER EXISTS
                    } else if (r.exists === true) {
                        self.validEmail = true;
                        self.next = "signin";
                    }
                    self.renderLayout('signin');
                });
            }
    
    
            if (self.next === 'signin') {
                self.signin(e.target);
            }

        });


        if (retryButton) {
            retryButton.addEventListener('click', function(e) {
                e.target.classList.add(hide);
                self.user.username = "";
                self.next = null;
                self.validEmail = null;
                self.renderLayout('signin');
            });
        }



    }


}
Acme.Donations.prototype.handler = function(e) {
    var self = this;
    e.preventDefault();
    if (typeof e.target.dataset.elem === "undefined") {
        return;
    }

    var elem = e.target.dataset.elem;
    var layout = e.target.dataset.layout;
    var behaviour = e.target.dataset.behaviour;

    if (behaviour === "forgot") {
        var text = document.querySelector('.j-email-text');
        text.classList.remove('highlight');

        if (!self.user.username) {
            text.classList.add('highlight');
            return false;
        }
    
        self.forgot().done(function(r) {
            if (r.success === 1) {
                text.innerHTML = "<strong>A password reset link has been sent to your email.</strong> <br />After reset, enter your new password to continue.";
            } else {
                return {
                    "success": r.success,
                    "error": r.error.email
                };
            }
    
        }).fail(function(r) { console.log(r);});
        return;
    }

    if (layout) {
        self.renderLayout(layout);
        return;
    }


    if (elem === "signin") {
        self.signin(e.target);
        return;
    }

    if (elem === "period") {
        var period = e.target.dataset.period;
        var product = e.target.dataset.product;
        self.selected.interval = period;
        self.active[product] = period;
        self.renderPrices();
        return;
    }

    if (elem === "price") {
        self.selected['price_id'] = e.target.dataset.price_id;
        self.selected['product_id'] = e.target.dataset.product;
        delete self.selected.price;
        self.renderPrices();
        return;
    }


    if (elem === "checkout") {
        if ( self.guest === "1" ) {
            self.renderLayout("signin");
            return;
        }
    
        this.checkout();
        return;
    }

};

Acme.Donations.prototype.checkout = function() {
    var self = this;

    if (typeof self.selected.product_id === "undefined") {
        return;
    }


    var data = {
        product_id : self.selected.product_id
    };
    if (typeof self.selected.price_id !== 'undefined') {
        data['price_id'] = self.selected.price_id;
    }
    if (typeof self.selected.amount !== 'undefined') {
        data['amount'] = self.selected.amount * 100;
    }

    if (typeof self.selected.interval !== 'undefined') {
        data['interval'] = self.selected.interval;
    }

    if (typeof self.selected.currency !== 'undefined') {
        data['currency'] = self.selected.currency;
    }

    if (typeof self.user.username !== 'undefined') {
        data['email'] = self.user.username;
    }
    if (typeof self.user.email !== 'undefined') {
        data['email'] = self.user.email;
    }

    data['success'] = _appJsConfig.appHostName + "/donation-thanks";
    data['cancel'] = _appJsConfig.appHostName;



    Acme.server.create('/api/paywall/checkout-session', data).done( function(r) {
        self.Stripe.redirectToCheckout({
            sessionId: r.sessionId
        }).then(function(r) {
                console.log(r);
        });
    });
}

Acme.Donations.prototype.signin = function(elem) {
    var self = this;
    elem.innerText = "";

    var password = document.getElementById('loginPass');
    var errorText = document.querySelector('.j-error-text');
    var spinner = document.getElementById('email_spinner');
    var textElem = document.querySelector('.j-email-text');
    
    var text = "<strong>It looks like you have an account with us!</strong> <br />Please enter your password to continue.";
    textElem.innerText = "";
    
    spinner.classList.remove("u-display-none");
    errorText.classList.add("u-display-none");
    errorText.innerHTML = "";

    var loginData = {};
    var action = 'register';

    if (self.user.username && self.user.password) {
        action = 'signin';
    }

    if (action === 'signin') {
        loginData['username'] = self.user.username;
        loginData['password'] = self.user.password;
        loginData['rememberMe'] = 1;
        Acme.server.create('/api/auth/login', loginData).done(function(r) {
    
            if (r.success === 1) {
                self.fetchUser().done(function(r) {
                    if (r.success === 1) {
                        self.user = r.self;
                        self.guest = "0";
                    }
                    console.log(r);
                    self.checkout();
                });
        
            } else {

                elem.innerText = "Sign in";
                password.classList.remove("u-display-none");
                textElem.innerHTML = text;
                spinner.classList.add("u-display-none");
                errorText.innerHTML = r.error.password.join("<br />");
                errorText.classList.remove("u-display-none");
            }
        
        }).fail(function(r) { 
            elem.innerText = "Sign in";
            password.classList.remove("u-display-none");
            textElem.innerHTML = text;
            spinner.classList.add("u-display-none");
            errorText.innerHTML = r.error.password.join("<br />");
            errorText.classList.remove("u-display-none");
        });
    }

    if (action === 'register') {
        self.checkout();
        // self.register();
    }

}

Acme.Donations.prototype.forgot = function() {
    var self = this;
    return Acme.server.create('/api/auth/forgot-password', {"email": self.user.username});

}

Acme.Donations.prototype.register = function() {
    console.log('registering user');
    console.log(this);
    var self = this;
    var password = this.random(20);
    loginData = {
        'email' : this.user.username,
        'firstname' : "Anon",
        'lastname' : "Donor",
        'password' : password,
        'username' : this.random(10),
        'verifypassword': password,
        'captcha': "yes"
    };
    
    Acme.server.create('/api/auth/signup', loginData).done(function(r) {
        console.log(r);

        if (r.success === 1) {
            self.fetchUser().done(function(r) {
                if (r.success === 1) {
                    self.user = r.self;
                    self.guest = "0";
                }
                console.log(r);
                self.checkout();
            });
        }
});


}



Acme.Donations.prototype.random = function(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};



Acme.Donations.prototype.checkEmail = function(email) {
    return Acme.server.fetch('/api/user/check-email', {email:email});
}


Acme.Donations.prototype.fetchUser = function() {
    return Acme.server.fetch('/api/user/self');
}
Acme.Donations.prototype.events = function() {
    var self = this;

    $('#donations, .j-donation').on('click', function(e) {
        self.pages.push("spinner");
        self.modal.render("spinner");
        self.load();
    });
   
}
/***                             ****
    Base Class for all Forms
***                              ****/
Acme.Form = function(validators, rules) {
    this.data;
    this.errorField;
    this.validators = validators || null;
    this.validateRules = rules || {};
};
    Acme.Form.prototype = new Acme._View();
    Acme.Form.constructor = Acme.Form;
    Acme.Form.prototype.loadData = function()
    {
        for (var field in this.validateFields) {
            var fieldname = this.validateFields[field].split('.').reverse()[0];
            var field = $('#'+fieldname);
            if (!field.length) {
                field = $('#'+ this.id + ' input[name="'+fieldname + '"]');
            }
            if (!field.length) {
                continue;
            }
            var fieldType = field[0].type;
            if (fieldType === 'hidden') continue;
            
            if (fieldType === 'checkbox') {
                // console.log(field[0].checked);
                this.data[fieldname] = field[0].checked;
            } else {
                this.data[fieldname] = field.val();
            }
            // console.log(fieldname);
            // console.log(field[0].type);
        }
    };
    Acme.Form.prototype.clearInlineErrors = function()
    {
        if (this.errorField) {
            this.errorField.removeClass('active');
        }
        for (var field in this.validateFields) {
            var fieldname = this.validateFields[field].split('.').reverse()[0];
            var field = $('#'+fieldname);
            if (!field.length) {
                // console.log('#'+ this.id + ' input[name="'+this.errorFields[field] + '"]');
                field = $('#'+ this.id + ' input[name="'+this.errorFields[field] + '"]');
            }
            field.removeClass('formError');
        }
    };
    Acme.Form.prototype.addInlineErrors = function()
    {
        if (this.errorFields.length > 0 && this.errorField) {
            this.errorField.addClass('active');
        }
        for (var field in this.errorFields) {
            var field = $('#'+this.errorFields[field]);

            if (!field.length) {
                // console.log('#'+ this.id + ' input[name="'+this.errorFields[field] + '"');
                field = $('#'+ this.id + ' input[name="'+this.errorFields[field] + '"');
            }
            field.addClass('formError');
        }
    };
    Acme.Form.prototype.render = function() {
        this.clearInlineErrors();
        this.addInlineErrors();
    };
    Acme.Form.prototype.validate = function( /* Array */ checkFields)  {
        // console.log(checkFields);
        // checkFields is used to validate a single field, 
        // otherwise itereate through all compulsory fields

        // intersect used to clear the field we want to check 
        // from errorFields.  if still an error it will add again.

        function intersect(a, b) {
            var t;
            if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
            return a.filter(function (e) {
                return b.indexOf(e) > -1;
            });
        }

        var validated = true, fields = [];
        if (checkFields && this.validateFields) {
            console.log('checkfields exists');
            var fields = intersect(this.validateFields, checkFields);
            for (var j=0; j<fields.length;j++) {
                var fieldName = fields[j].split('.').reverse()[0];
                var index = this.errorFields.indexOf(fieldName);
                if (index === -1) break;
                this.errorFields.splice(index, 1);
            }
        } else {
            var fields = this.validateFields || [];
            console.log(fields);
            this.errorFields = []; // reset and re-calcuate all fields
        }
        for (var i=0;i<fields.length; i++) {
            var key = fields[i];
            // console.log(key);
            var keySplit = key.split('.');
            var scope = this.data;
            for(var j=0; j<keySplit.length; j++) {

                if (!scope[keySplit[j]]) {
                    scope = false;
                    break;
                }
                if(j == keySplit.length -1 ) {
                    scope = scope[keySplit[j]];
                    break;
                }
                scope = scope[keySplit[j]];
            }
            // console.log('doing the validate');
            // DO THE VALIDATE!!!
            var fieldValidators = this.validateRules[key];
            if (fieldValidators.length > 0) {

                var fieldname = fields[i].split('.').reverse()[0];
                // console.log(fieldname);
                for (var k=0; k<fieldValidators.length; k++) {
                    // console.log(scope);
                    if ( !this.validators[ fieldValidators[k] ](scope) ) {
                        this.errorFields.push(fieldname); 
                        // console.log(this.errorFields);
                        validated = false;
                        break;
                    }
                }
            }
        }
        return validated;
    };

    Acme.Form.prototype.events = function( /* Array */ checkFields)  {
        var self = this;
        // console.log('running events from parent');
        // console.log(this.id);
        // console.log($("#"+this.id));
        // console.log('#'+this.id +' input, #'+this.id +' textarea');
        $('#'+this.id +' input, #'+this.id +' textarea').on("change", function(e) {
        // $('input, textarea').on("change", '#'+this.id, function(e) {
                console.log('input changing');
            e.stopPropagation();
            e.preventDefault();
            var data = {};
            var elem = $(e.target);
            var elemid = elem.attr('name');
            var inputType = elem.attr('type');

            if (inputType == 'text' || inputType == 'email' || inputType == 'password') {
                data[elemid] = elem.val();

            } else if (inputType =='checkbox') {
                var value = elem.is(":checked");
                data[elemid] = value;
            }

            self.updateData(data);

            var validated = self.validate([elemid]);
            self.render();
        });

        var form = document.getElementById(this.id);
        if (form != null) {
            form.addEventListener('submit', function(event) {
                self.submit(event);
            });
        }


    }



Acme.Validators = {
    'notEmpty' : function(input) {
        return !input ? false : true;
    },
    'isNumeric' : function(n) {
        // var ret = !isNaN(parseFloat(n)) && isFinite(n);
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
    'username' : function(text) {
        return (text.length > 4);
    },  
    'isTrue' : function(data) {
        return (data === 'true' || data === true) ? true : false;
    }
};

// var HomeController = (function ($) {
//     return {
//         listing: function () {
//             HomeController.Listing.init();
//         },
//         blog: function() {
//             HomeController.Blog.init();
//         }
//     };
// }(jQuery));

// HomeController.Listing = (function ($) {

//     var bindPinUnpinArticle = function(){
//         $('button.PinArticleBtn').Ajax_pinUnpinArticle({
//             onSuccess: function(data, obj){
//                 var status = $(obj).data('status');
//                 (status == 1) 
//                     ? $(obj).attr('title', 'Un-Pin Article') 
//                     : $(obj).attr('title', 'Pin Article');
//                (status == 1) 
//                     ? $(obj).find('span').first().html('Un-Pin') 
//                     : $(obj).find('span').first().html('Pin');        
//             }
//         });
//     };
    
//     var bindDeleteHideArticle = function(){

//         $('button.HideBlogArticle').Ajax_deleteArticle({
//             onSuccess: function(data, obj){
//                 // var section = $(obj).closest('.section__content');
//                 // var sectionPostsCount = section.find('.card__news').length;
//                 // if(sectionPostsCount <= 1) {
//                 //     section.addClass('hide');
//                 // }
//                 $(obj).closest('.card').parent('div').remove();
//                 var postsCount = $('body').find('.card').length;
//                 if(postsCount <= 0) {
//                     $('.NoArticlesMsg').removeClass('hide');
//                 }
//             }
//         });
//     };
    
//     var bindSocialUpdatePost = function () {
//         $('.editSocialPost').on('click', function (e) {
//             e.preventDefault();
//             var elem = $(this);
//             var url = elem.data('url');
//             var popup = window.open(url, '_blank', 'toolbar=no,scrollbars=yes,resizable=false,width=360,height=450');
//             popup.focus();

//             var intervalId = setInterval(function () {
//                 if (popup.closed) {
//                     clearInterval(intervalId);
//                     var socialId = elem.parents('a').data('id');
//                     if ($('#updateSocial' + socialId).data('update') == '1') {
//                         $().General_ShowNotification({message: 'Social Post(s) updated successfully.'});
//                     }
//                 }
//             }, 50);

//             return;
//         });
//     };
    
//     var bindSocialShareArticle = function () {
//         $('.shareIcons').SocialShare({
//             onLoad: function (obj) {
//                 var title = obj.parents('div.article').find('.card__news-category').text();
//                 var url = obj.parents('div.article').find('a').attr('href');
//                 var content = obj.parents('div.article').find('.card__news-description').text();
//                 $('.rrssb-buttons').rrssb({
//                     title: title,
//                     url: url,
//                     description: content
//                 });
//                 setTimeout(function () {
//                     rrssbInit();
//                 }, 10);
//             }
//         });
//     };
    
//     var attachEvents = function () {
//         if(_appJsConfig.isUserLoggedIn === 1 && _appJsConfig.userHasBlogAccess === 1) {
//             initSwap();
//         }
        
//         function initSwap() {
//             initDroppable();
//             initDraggable();
            
//             //Bind pin/unpin article event
//             bindPinUnpinArticle();

//             //Bind delete social article & hide system article
//             bindDeleteHideArticle();
            
//             //Bind update social article
//             bindSocialUpdatePost();
            
//             //Following will called on page load and also on load more articles
//             $(".articleMenu, .socialMenu").delay(2000).fadeIn(500);
//         }
        
//         function initDraggable() {
//             $('.swap').draggable({
//                 helper: 'clone',
//                 revert: true,
//                 zIndex: 100,
//                 scroll: true,
//                 scrollSensitivity: 100,
//                 cursorAt: { left: 150, top: 50 },
//                 appendTo:'body',
//                 start: function( event, ui ) {
//                     ui.helper.attr('class', '');
//                     var postImage = $(ui.helper).data('article-image');
//                     var postText = $(ui.helper).data('article-text');
//                     if(postImage !== "") {
//                         $('div.SwappingHelper img.article-image').attr('src', postImage);
//                     }
//                     else {
//                         $('div.SwappingHelper img.article-image').attr('src', 'http://www.placehold.it/100x100/EFEFEF/AAAAAA&amp;text=no+image');
//                     }
//                     $('div.SwappingHelper p.article-text').html(postText);
//                     $(ui.helper).html($('div.SwappingHelper').html());    
//                 }
//             });
//         }

//         function initDroppable() {

//             $('.swap').droppable({
//                 hoverClass: "ui-state-hover",
//                 drop: function(event, ui) {
                    
//                     function getElementAtPosition(elem, pos) {
//                         return elem.find('a.card').eq(pos);
//                     }

//                     var sourceObj       = $(ui.draggable);
//                     var destObject      = $(this);
//                     var sourceProxy     = null;
//                     var destProxy       = null;


//                     if (typeof sourceObj.data('proxyfor') !== 'undefined') {
//                         sourceProxy = sourceObj;
//                         sourceObj   = getElementAtPosition($( '.' + sourceProxy.data('proxyfor')), sourceProxy.data('position') -1);
//                         sourceObj.attr('data-position', destObject.data('position'));

//                     }
//                     if (typeof destObject.data('proxyfor') !== 'undefined') {
//                         destProxy = destObject;
//                         destObject = getElementAtPosition($( '.' + destObject.data('proxyfor')), destObject.data('position') -1);
//                         destObject.attr('data-position', sourceObj.data('position'));
//                     }



//                     //get positions
//                     var sourcePosition      = sourceObj.data('position');
//                     var sourcePostId        = sourceObj.data('id');
//                     var sourceIsSocial      = parseInt(sourceObj.data('social'));
//                     var destinationPosition = destObject.data('position');
//                     var destinationPostId   = destObject.data('id');
//                     var destinationIsSocial = parseInt(destObject.data('social'));

//                     var swappedDestinationElement = sourceObj.clone().removeAttr('style').insertAfter( destObject );
//                     var swappedSourceElement = destObject.clone().insertAfter( sourceObj );
                    

//                     if (sourceProxy) {
//                         sourceProxy.find('h2').text(destObject.find('h2').text());
//                         swappedDestinationElement.addClass('swap');
//                         swappedSourceElement.removeClass('swap');
//                         sourceProxy.attr('data-article-text', destObject.data('article-text'));
//                         sourceProxy.attr('data-article-image', destObject.data('article-image'));
//                     }

//                     if (destProxy) {
//                         if (sourceIsSocial) {
//                             destProxy.find('h2').text( sourceObj.find('p').text() );
//                         } else {
//                             destProxy.find('h2').text( sourceObj.find('h2').text() );
//                         }
//                         swappedSourceElement.addClass('swap');
//                         swappedDestinationElement.removeClass('swap');
//                         destProxy.attr('data-article-text', sourceObj.data('article-text'));
//                         destProxy.attr('data-article-image', sourceObj.data('article-image'));
//                     }
                    
//                     swappedSourceElement.data('position', sourcePosition);
//                     swappedDestinationElement.data('position', destinationPosition);
//                     swappedSourceElement.find('.PinArticleBtn').data('position', sourcePosition);
//                     swappedDestinationElement.find('.PinArticleBtn').data('position', destinationPosition);


//                     $(ui.helper).remove(); //destroy clone
//                     sourceObj.remove();
//                     destObject.remove();
                    
//                     var csrfToken = $('meta[name="csrf-token"]').attr("content");
//                     var postData = {
//                         sourcePosition: sourcePosition,
//                         sourceArticleId: sourcePostId,
//                         sourceIsSocial: sourceIsSocial,
                        
//                         destinationPosition: destinationPosition,
//                         destinationArticleId: destinationPostId,
//                         destinationIsSocial: destinationIsSocial,
                        
//                         _csrf: csrfToken
//                     };

//                     $.ajax({
//                         url: _appJsConfig.baseHttpPath + '/home/swap-article',
//                         type: 'post',
//                         data: postData,
//                         dataType: 'json',
//                         success: function(data){

//                             if(data.success) {
//                                 $.fn.General_ShowNotification({message: "Articles swapped successfully"});
//                             }
                            
//                             $(".card .content > p, .card h2").dotdotdot();
//                             initSwap();
//                         },
//                         error: function(jqXHR, textStatus, errorThrown){
//                             //$().General_ShowErrorMessage({message: jqXHR.responseText});
//                         },
//                         beforeSend: function(jqXHR, settings) { 
//                         },
//                         complete: function(jqXHR, textStatus) {
//                         }
//                     });

//                 }
//             }); 
//         }

        
//         $('.loadMoreArticles, .loadMoreArticles-index').on('click', function(e){
//             e.preventDefault();
//             console.log('woop woop');
//             var btnObj = $(this);
            
//             $.fn.Ajax_LoadBlogArticles({
//                 onSuccess: function(data, textStatus, jqXHR){
//                     if (data.success == 1) {
//                         var container = $('.ajaxArticles');
//                         container.data('existing-nonpinned-count', data.existingNonPinnedCount);
//                         var templateClass = container.data('containerclass');

//                         if (data.articles.length < 20) {
//                             $(btnObj).css('display', 'none');
//                         }

//                         for (var i in data.articles) {
//                             data.articles[i]['containerClass'] = templateClass;
//                             data.articles[i]['pinTitle'] = (data.articles[i].isPinned == 1) ? 'Un-Pin Article' : 'Pin Article';
//                             data.articles[i]['pinText'] = (data.articles[i].isPinned == 1) ? 'Un-Pin' : 'Pin';
//                             data.articles[i]['promotedClass'] = (data.articles[i].isPromoted == 1)? 'ad_icon' : '';
//                             data.articles[i]['hasArticleMediaClass'] = (data.articles[i].hasMedia == 1)? 'withImage__content' : 'without__image';
//                             data.articles[i]['blogClass']= '';
//                             if(data.articles[i].blog['id'] !== null) {
//                                data.articles[i]['blogClass']= 'card--blog_'+data.articles[i].blog['id'];
//                             } 
                            
                                                        
//                             var ImageUrl = $.image({media:data.articles[i]['featuredMedia'], mediaOptions:{width: 500 ,height:350, crop: 'limit'} });
//                             var profileImage = $.image({media:data.articles[i]['createdBy']['media'], mediaOptions:{width: 34 ,height:34, crop: 'thumb', gravity: 'face'} });
//                             data.articles[i]['imageUrl'] = ImageUrl;
//                             data.articles[i]['profileImg'] = profileImage;
//                             var articleId = parseInt(data.articles[i].articleId);
//                             var articleTemplate;
//                             if (isNaN(articleId) || articleId <= 0) {
//                                 data.articles[i]['videoClass'] = '';
//                                 if(data.articles[i].social.media.type && data.articles[i].social.media.type == 'video') {
//                                     data.articles[i]['videoClass'] = 'video_card';
//                                 }
//                                 articleTemplate = Handlebars.compile(socialCardTemplate); 
//                             } else {
//                                 articleTemplate = Handlebars.compile(systemCardTemplate);
//                             }
//                             var article = articleTemplate(data.articles[i]);
//                             container.append(article);
//                         }

//                         $(".card p, .card h1").dotdotdot();
                        
//                         bindSocialShareArticle();
                        
//                         $('.video-player').videoPlayer();
                        
//                         //Lazyload implement
//                         $("div.lazyload").lazyload({
//                             effect: "fadeIn"
//                         });
//                         if (_appJsConfig.isUserLoggedIn === 1 && _appJsConfig.userHasBlogAccess === 1) {
//                             initSwap();
//                         }
//                     }
                 
//                 },
//                 beforeSend: function(jqXHR, settings){
//                     $(btnObj).html("Please wait...");
//                 },
//                 onComplete: function(jqXHR, textStatus) {
//                     $(btnObj).html("Load more");
//                 }
//             });
//         });
//     };
//     return {
//         init: function () {
//             attachEvents();
//         }
//     };

// }(jQuery));

// HomeController.Blog = (function ($) {
//     var attachEvents = function () {

//         //attach follow blog
//         $('a.followBlog').followBlog({
//             'onSuccess': function(data, obj){
//                 var message = ($(obj).data('status') === 'follow') ? 'Unfollow' : 'Follow';
//                 $.fn.General_ShowNotification({message: message + " blog(s) successfully."});   
//             },
//             'beforeSend': function(obj){
//                 $(obj).html("Please wait...");
//             },
//             'onComplete': function(obj){
//                 ($(obj).data('status') === 'follow') ? $(obj).html("Follow +") : $(obj).html("Following -");
//             }
//         });
        
//         //attach follow user
//         $('a.followUser').followUser({
//             'onSuccess': function(data, obj){
//                 var message = ($(obj).data('status') === 'follow') ? 'Unfollow' : 'Follow';
//                 $.fn.General_ShowNotification({message: message + " user(s) successfully."});   
//             },
//             'beforeSend': function(obj){
//                 $(obj).html("Please wait...");
//             },
//             'onComplete': function(obj){
//                 ($(obj).data('status') === 'follow') ? $(obj).html("Follow +") : $(obj).html("Following -");
//             }
//         });
        
//     };
    
//     return {
//         init: function () {
//             attachEvents();
//         }
//     };

// }(jQuery));
(function ($) {


Acme.videoPopup = function(template, parent, layouts, data) {
    this.template = template;
    this.parentCont = parent;
    this.layouts = layouts;
    this.data = data || {};
    this.parent = Acme.modal.prototype;

	this.hasLocal	= typeof localStorage != "undefined" ? true : false;
	this.keyName 	= "videoCampaign";
	this.date 		= new Date();
	this.token 		= {};


    this.run();
};
Acme.videoPopup.prototype = new Acme.modal();
Acme.videoPopup.constructor = Acme.videoPopup;
Acme.videoPopup.prototype.errorMsg = function(msg) {
    $('.message').removeClass('hide');
};
Acme.videoPopup.prototype.rendered = function(msg) {
    setTimeout(function() {
        $('.acme-modal__close').removeClass('u-invisible');
    }, 20000);

};
Acme.videoPopup.prototype.handle = function(e) {
    var self = this;
    var $elem = this.parent.handle.call(this, e);

    if ($elem.data('behaviour') == 'close') {
        e.preventDefault();
        self.updateToken('closed', true);
    }
};


Acme.videoPopup.prototype.run = function()
{
	this.token = this.getToken();

	if ( !this.token || this.isExpired() ) {
		this.refreshToken();
		this.setToken();
	}

	if ( this.token.registered || this.token.closed ) {
		return;
	}
    this.render("video", "", this.data);

};

Acme.videoPopup.prototype.getDateString = function() 
{
	return [
		this.date.getFullYear(),
		this.date.getMonth() + 1, 
		this.date.getDate()
	].join('-');
};

Acme.videoPopup.prototype.isExpired = function() 
{
	var sameDay = this.token.seen === this.getDateString();
	if (!sameDay) {
		return true;
	}

	return false;
};
Acme.videoPopup.prototype.refreshToken = function() 
{
	this.token = {
		"seen" 			: this.getDateString(),
		"closed" 		: false,
		"registered" 	: false
	};
};

Acme.videoPopup.prototype.updateToken = function(key, value) 
{
	this.token[key] = value;
	this.setToken();
};


Acme.videoPopup.prototype.getToken = function() 
{
	if ( this.hasLocal ) {
	    this.token = localStorage.getItem(this.keyName);
	    return this.token && JSON.parse(this.token);

	} else {
	    // var c_start = document.cookie.indexOf(this.keyName + "=");
	    // if ( document.cookie.length > 0 ) {
	    //     if (c_start !== -1) {
	    //         return getCookieSubstring(c_start, this.keyName);
	    //     }
	    // }
	    return null;
	}
};
Acme.videoPopup.prototype.setToken = function() 
{
	if ( this.hasLocal ) {
	    localStorage.setItem(this.keyName, JSON.stringify(this.token));
	} else {
	    // document.cookie = this.keyName + "=" + escape(value) +
	    // ((expiredays === null) ? "" : ";expires=" + exdate.toUTCString());
	}
};
Acme.videoPopup.prototype.removeToken = function() 
{	
	if ( this.hasLocal ) {
	    return localStorage.removeItem(this.keyName);
	}
};



}(jQuery));
Acme.registerPopUp = function(tokenName) 
{
	this.hasLocal	= typeof localStorage != "undefined" ? true : false;
	this.keyName 	= tokenName;
	this.date 		= new Date();
	this.token 		= {};
	var self 		= this;

	setTimeout(function() {
		self.run();
		self.events();
	}, 5000);
};

Acme.registerPopUp.prototype.run = function()
{
	this.token = this.getToken();

	if ( !this.token || this.isPopUpExpired() ) {
		this.refreshToken();
		this.setToken();
	}

	if ( this.token.registered || this.token.closed ) {
		return;
	}

	this.render();
};

Acme.registerPopUp.prototype.getDateString = function() 
{
	return [
		this.date.getFullYear(),
		this.date.getMonth() + 1, 
		this.date.getDate()
	].join('-');
};

Acme.registerPopUp.prototype.isPopUpExpired = function() 
{

	if (this.token.registered) {
		return false;
	}

	var sameDay = this.token.seen === this.getDateString();
	if (!sameDay) {
		return true;
	}

	return false;
};
Acme.registerPopUp.prototype.refreshToken = function() 
{
	this.token = {
		"seen" 			: this.getDateString(),
		"closed" 		: false,
		"registered" 	: false
	};
};

Acme.registerPopUp.prototype.updateToken = function(key, value) 
{
	this.token[key] = value;
	this.setToken();
};


Acme.registerPopUp.prototype.getToken = function() 
{
	if ( this.hasLocal ) {
	    this.token = localStorage.getItem(this.keyName);
	    return this.token && JSON.parse(this.token);

	} else {
	    // var c_start = document.cookie.indexOf(this.keyName + "=");
	    // if ( document.cookie.length > 0 ) {
	    //     if (c_start !== -1) {
	    //         return getCookieSubstring(c_start, this.keyName);
	    //     }
	    // }
	    return null;
	}
};
Acme.registerPopUp.prototype.setToken = function() 
{
	if ( this.hasLocal ) {
	    localStorage.setItem(this.keyName, JSON.stringify(this.token));
	} else {
	    // document.cookie = this.keyName + "=" + escape(value) +
	    // ((expiredays === null) ? "" : ";expires=" + exdate.toUTCString());
	}
};
Acme.registerPopUp.prototype.removeToken = function() 
{	
	if ( this.hasLocal ) {
	    return localStorage.removeItem(this.keyName);
	}
};


Acme.registerPopUp.prototype.render = function() 
{
	var html = Handlebars.compile(Acme.templates.registerPopup);

	$('body').append(html({path: _appJsConfig.templatePath}));
	$('#register-popup').animate({bottom: "0px"}, 500);
};

Acme.registerPopUp.prototype.close = function() 
{
	$('#register-popup').animate({bottom: "-150px"}, 500, function() {
		$('#register-popup').remove();
	});
};

Acme.registerPopUp.prototype.events = function() 
{
	var self = this;

	$('#register-popup').on('click', function(e) {
		var elem = $(e.target);
		if (elem.hasClass("register-popup__close") 		|| 
			elem.hasClass("register-popup__close-icon") ) {
			self.updateToken('closed', true);
			self.close();
		}
	});

	$('#mc-embedded-subscribe-form-popup').on('submit', function(e) {
		self.updateToken('registered', true);
		self.close();
	});

	$('#register-popup-subscriber').on('click', function(e) {
		self.updateToken('registered', true);
		self.close();
	});

};
$('document').ready(function() {

    var isMenuBroken, isMobile;
    var sbCustomMenuBreakPoint = 1120;
    var mobileView = 620;
    var desktopView = 1119;
    var scrollMetric = [$(window).scrollTop()];
    var menu_top_foldaway = $("#menu-top-foldaway");
    var menu_bottom_foldaway = $("#menu-bottom-foldaway");
    var foldaway_search = false;

    isMenuBroken = function() {
        if (window.innerWidth > sbCustomMenuBreakPoint) {
            return false;
        }
        return true;
    };

    isMobile = function(){
        if (window.innerWidth < mobileView) {
            return true;
        }
        return false;
    };

    var isDesktop = function(){
        if (window.innerWidth > desktopView) {
            return true;
        }
        return false;
    };


    var isScolledPast = function(position){
        if (scrollMetric[0] >= position) {
            return true;
        }
        return false;
    };

    var stickHeader = function(){
        if ( isScolledPast(210) ){
            $("#topAddBlock").removeClass("fixadd");
            $("#topAddBlock").css({
                "position": "absolute",
                "top":"212px"
            });
            $(".menu-mobile").data('foldaway', true);
            

        } else {
            $("#topAddBlock").addClass("fixadd");
            $("#topAddBlock").css({
                "position": "",
                "top":""
            });

        }
        return false;
    };   



    Acme.HeaderMenu = function() {
        this.topMenu = $('#menu-top-foldaway');
        this.bottomMenu = $('#menu-bottom-foldaway');
        
        this.menu = $("#foldaway-panel");
        this.subscriptions = Acme.PubSub.subscribe({
            'Acme.headerMenu.listener' : ["update_state"]
        });

        this.listeners = {
            "fixedMenu": function(data) {
                if (data.fixedMenu === 'hide') {
                    this.hideFixed();
                } else {
                    this.showFixed();
                }
            }
        }
    }

    Acme.HeaderMenu.prototype = new Acme._View();
    Acme.HeaderMenu.constructor = Acme.HeaderMenu;
    Acme.HeaderMenu.prototype.showFixed = function() {
        this.menu.addClass('showMenuPanel');
    }
    Acme.HeaderMenu.prototype.hideFixed = function() {
        menu_top_foldaway.addClass('u-hide');
        menu_bottom_foldaway.addClass('u-hide');
        this.menu.removeClass('showMenuPanel');
        $("#menu-foldaway").removeClass('o-close').addClass('o-hamburger');
    }

    Acme.headerMenu = new Acme.HeaderMenu();


    var scrollUpMenu = function() {
        // var isMob = isMobile();
        if ( isScolledPast(300) && isDesktop() ) {
            Acme.headerMenu.showFixed();
        } else if (!foldaway_search) {
            Acme.headerMenu.hideFixed();
        }
    }




    //Onload and resize events
    $(window).on("resize", function () {
        stickHeader();
        scrollUpMenu();
    }).resize();

    //On Scroll
    $(window).scroll(function() {
        var direction = 'down';
        var scroll = $(window).scrollTop();
        if (scroll < scrollMetric[0]) {
            direction = 'up';
        }
        scrollMetric = [scroll, direction];
        stickHeader();
        scrollUpMenu();
    });



    $('#batch-add').on('click', function(e) {
        var input = $('#batch-user-input').val();
        var send = JSON.parse( input );
        var url = _appJsConfig.baseHttpPath + '/api/user/batch-add';
        return $.ajax({
            type: 'post',
            url: url,
            dataType: 'json',
            data: send
        }).done(function(r) {
            console.log(r);
            alert("Users added");

        }).fail(function(r) {
            console.log(r);
            alert(r.responseText);
        });        

    });

    $('#batch-add-csv').on('click', function(e) {
        var payload = {
            "owner" : {
                "email": null
            },
            "users": []
        };

        var input = $('#batch-user-input').val();
        
        var lines = input.split(/\n/);    
        var owner = lines[0].split(',');
        payload.owner.email = owner[owner.length - 1];

        for (var i=1; i< lines.length; i++) {
            $user = lines[i].split(',');
            
            $userobj = {
                "firstname" : $user[0],
                "lastname" : $user[1],
                "username" : $user[2],
                "email" : $user[3],
            };

            payload.users.push($userobj);
        }


        var url = _appJsConfig.baseHttpPath + '/api/user/batch-add';
        return $.ajax({
            type: 'post',
            url: url,
            dataType: 'json',
            data: payload
        }).done(function(r) {
            console.log(r);
            alert("Users added");

        }).fail(function(r) {
            console.log(r);
            alert(r.responseText);
        });        

    });


    // $(".sb-custom-menu > ul").before("<a href=\"#\" class=\"menu-mobile\">MENU</a>");

    $("#menu-foldaway").on("click", function (e) {
            $(e.target).toggleClass('o-hamburger').toggleClass('o-close');
            menu_top_foldaway.toggleClass('u-hide');
            menu_bottom_foldaway.toggleClass('u-hide');
            if (foldaway_search) {
                foldaway_search = false;
                $("li.menu-item-search-foldaway>ul.search-foldaway").removeAttr('style');
                $(".menuContainer > ul > li.menu-item-search-foldaway").removeClass('now-active');
            }
    });

    $(".menu-mobile, #mobile-search-close").on("click", function (e) {
        var thisMenuElem = $(this).parent('.sb-custom-menu');
        var overlay = $(".mobile-menu__overlay");
        // $(this).toggleClass("active");
        $('#mobile-menu').toggleClass("mobile-menu--active");
        
        $("body").toggleClass('acme-modal-active');

        overlay.animate({
            "opacity": "toggle"
        }, {
            duration: 500
        }, function () {
            overlay.fadeIn();
        });



        e.preventDefault();
    });




    // this search handler is for normal desktop header, locked header search handler below
    $("#desktop-search").on("click", function (e) {

        if (window.innerWidth > sbCustomMenuBreakPoint) {

            var icon = $('#desktop-search > span:first-child');
            if (icon.hasClass('icon-search')) {
                icon.removeClass('icon-search').addClass('o-close');
            } else {
                icon.removeClass('o-close').addClass('icon-search');
            }
            $("#desktop-searchform").toggleClass('site-header-search--active');
            $("#menu-primary-menu").toggleClass('submenu--hidden');
            $("#desktop-header-search").focus();
        }
    });


    // locked header search handler
    $("#locked-header-search-button").on("click", function (e) {
        if (window.innerWidth > sbCustomMenuBreakPoint) {

            var icon = $('#locked-header-search-button > span:first-child');
            if (icon.hasClass('icon-search')) {
                icon.removeClass('icon-search').addClass('o-close');
            } else {
                icon.removeClass('o-close').addClass('icon-search');
            }
            $("#locked-searchform").toggleClass('site-header-search--active');
            $("#menu-locked").toggleClass('submenu--hidden');

            $("#locked-header-search").focus();
        }
    });





    $(".menuContainer > ul > li.menu-item-search-foldaway").on("click", function (e) {
        if (!foldaway_search) {foldaway_search = true} else {foldaway_search = false};
        if (window.innerWidth > sbCustomMenuBreakPoint) {
            $(this).children("ul").stop(true, false).slideToggle(225);
            $(this).toggleClass('now-active');
            if (window.innerWidth > sbCustomMenuBreakPoint) {
                $("input#header-search-foldaway").focus();
            }
        }
    });

    $("li.menu-item-search").bind("mouseenter focus mouseleave",function () {
        if (window.innerWidth > sbCustomMenuBreakPoint) {
            $("input#header-search").focus();
            return false;
        }
    });

    $("li.menu-item-search-foldaway").bind("mouseenter focus mouseleave",function () {
        if (window.innerWidth > sbCustomMenuBreakPoint) {
            $("input#header-search-foldaway").focus();
            return false;
        }
    });

    //For accessibility
    $(".sb-custom-menu > ul > li > a").focus(function(e) {
        if (window.innerWidth > sbCustomMenuBreakPoint) {
            $('ul.menu > li').children('ul.sub-menu').stop(true,true).slideUp('fast');
            $(this).parent().children('ul').stop(true,true).slideDown('fast');
            e.preventDefault();
        }
    });


    $('#profile').on('click', function(e) {
        $('#header__menu').toggleClass('Profile_Open');
        $('body').toggleClass('no_profile');
        e.preventDefault();
    });

    $('.bio-show-more').on('click', function(e) {
        e.preventDefault();
        var button = $(this);
        var arrow = button.find('span');
        arrow.toggleClass('down').toggleClass('up');
        var bio = button.siblings('p.bio');
        bio.toggle();
    });

    $('.j-recent-header').click(function(e){
        if ($(this).hasClass('faded')) {
            $('.j-recent-header').toggleClass('faded');
            $('.j-recent-toggle').toggleClass('u-hide');
        }
    });


    $('.video-player').videoPlayer();

    $("img.lazyload").lazyload({
        effect : "fadeIn"
    });


    var cardHolder = '';
    clearTimeout(cardHolder);
    cardHolder = setTimeout((function() {
        $('.j-truncate').dotdotdot({
            watch: true
        });
    }), 750);

    $("#owl-gallery-image").owlCarousel({
        items: 1,
        thumbs: true,
        thumbsPrerendered: true,
        URLhashListener:true,
        startPosition: 'URLHash',
        pagination: true,
        dots: false,
        nav: true,
        navText: [
            "",
            ""
        ]
    });   



});

var SearchController = (function ($) {
    return {
        listing: function () {
            SearchController.Listing.init();
        }
    };
}(jQuery));

SearchController.Listing = (function ($) {

    var attachEvents = function () {
        
        $('.loadMoreArticles').on('click', function(e){
            e.preventDefault();
            var btnObj = $(this);
            $.fn.Ajax_LoadSearchArticles({
                'search': $('input.header__search-text').val(),
                onSuccess: function(data, textStatus, jqXHR){
                      if (data.success == 1) {
                        for (var i in data.articles) {
                            data.articles[i]['containerClass'] = 'col-quarter';
                            
                            data.articles[i]['promotedClass'] = (data.articles[i].isPromoted == 1)? 'ad_icon' : '';
                            data.articles[i]['hasArticleMediaClass'] = (data.articles[i].hasMedia == 1)? 'withImage__content' : 'without__image';
                            
                            data.articles[i]['blogClass']= '';
                            if(data.articles[i].blog['id'] !== null) {
                               data.articles[i]['blogClass']= 'card--blog_'+data.articles[i].blog['id'];
                            } 
                            
                            var ImageUrl = $.image({media:data.articles[i]['featuredMedia'], mediaOptions:{width: 500 ,height:350, crop: 'limit'} });
                            data.articles[i]['imageUrl'] = ImageUrl;
                           
                            var articleTemplate = Handlebars.compile(systemCardTemplate);

                            var article = articleTemplate(data.articles[i]);
                            $('.ajaxArticles').append(article);
                        }
                        if(data.articles.length < 20) {
                            $(btnObj).css('display', 'none');
                        }

                        bindSocialShareArticle();
                        $(".card p, .card h1").dotdotdot();
                        
                         //Lazyload implement
                        $("div.lazyload").lazyload({
                            effect: "fadeIn"
                        });
                    }
                
                   
                },
                beforeSend: function(jqXHR, settings){
                    $(btnObj).html("Please wait...");
                },
                onComplete: function(jqXHR, textStatus){
                    $(btnObj).html("Load More");
                }
            });
        });
        
        var bindSocialShareArticle = function () {
            $('.shareIcons').SocialShare({
                onLoad: function (obj) {
                    var title = obj.parents('div.article').find('.card__news-category').text();
                    var url = obj.parents('div.article').find('a').attr('href');
                    var content = obj.parents('div.article').find('.card__news-description').text();
                    $('.rrssb-buttons').rrssb({
                        title: title,
                        url: url,
                        description: content
                    });
                    setTimeout(function () {
                        rrssbInit();
                    }, 10);
                }
            });
        };

    };
    return {
        init: function () {
            attachEvents();
        }
    };

}(jQuery));
(function ($) {


Acme.Signin = function(template, parent, layouts) {
    this.template = template;
    this.parentCont = parent;
    this.layouts = layouts;
    this.parent = Acme.modal.prototype;
};
Acme.Signin.prototype = new Acme.modal();
Acme.Signin.constructor = Acme.Signin;
Acme.Signin.prototype.errorMsg = function(msg) {
    $('.message').removeClass('u-hide');
};
Acme.Signin.prototype.handle = function(e) {
    var self = this;

    var $elem = this.parent.handle.call(this, e);

    if ( $elem.is('a') ) {

        if ($elem.hasClass('close')) {

            e.preventDefault();
            $('body').removeClass("active");
            this.closeWindow();
        }
    }
    if ($elem.is('button')) {

        $('.message').addClass('u-hide');
        if ($elem.hasClass('signin')) {
            $elem.text('')
                 .addClass('spinner');
            e.preventDefault();
            var formData = {};

            $.each($('#loginForm').serializeArray(), function () {
                formData[this.name] = this.value.trim();
            });
            // rememberMe sets flag to store login for 30 days in cookie
            formData['rememberMe'] = 1;
            Acme.server.create('/api/auth/login', formData).done(function(r) {

                if (r.success === 1) {
                    
                    // if password reset must return to home page, else 
                    // get an error when staying on auth endpoint.
                    if (window.location.pathname === "/auth/reset-thanks") {
                        window.location.replace(_appJsConfig.appHostName);
                        return;
                    }
                    if (window.location.pathname === "/prosubscribe") {
                        window.location.replace(_appJsConfig.appHostName + "/pro");
                        return;
                    }

                    window.location.reload();


                } else {
                    $elem.text("Sign in")
                         .removeClass('spinner');
                    self.errorMsg();
                }
            }).fail(function(r) { 
                $elem.text("Sign in")
                     .removeClass('spinner');
                self.errorMsg();
                console.log(r);
            });
        }


        if ($elem.hasClass('forgot')) {
            e.preventDefault();
            var formData = {};
            $.each($('#forgotForm').serializeArray(), function () {
                formData[this.name] = this.value;
            });

            Acme.server.create('/api/auth/forgot-password', formData).done(function(r) {
                if (r.success === 1) {
                    location.reload();
                } else {
                    self.errorMsg();
                }

            }).fail(function(r) { console.log(r);});
        }



        if ($elem.hasClass('close')) {
            $('body').removeClass("active");
            this.closeWindow();
        }
   

    }

    if ($elem.hasClass('layout')) {
        var layout = $elem.data('layout');
        this.renderLayout(layout);
    }


};

var layouts = {
    "signin"        : 'signinFormTmpl',
    "register"      : 'registerTmpl',
    "forgot"        : 'forgotFormTmpl',
    "spinner"       : 'spinnerTmpl',
    "expired"       : 'expiredNotice',
    "userPlan"      : 'userPlanMessage',
    "userPlanChange" : 'userPlanOkCancel'
}




Acme.SigninView = new Acme.Signin('modal', 'signin-modal', layouts);



$('#signinBtn, #articleSigninBtn, .j-signin').on('click', function() {
    Acme.SigninView.render("signin", "Sign in");
});

$('a.j-register').on('click', function(e) {
    e.preventDefault();
    Acme.SigninView.render("register", "Register your interest");
});




}(jQuery));
// Create a Stripe client
var botTimer = 0;

if ($('#stripekey').length && $('#paywallsubscribe').length) {

    // console.log('running from signup code');

    var stripekey = $('#stripekey').html();

    var stripe = Stripe(stripekey);

    setInterval(function(){
        botTimer = botTimer + 1;
    }, 1000);

    // Create an instance of Elements
    var elements = stripe.elements();

    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    var style = {
        base: {
            color: '#32325d',
            lineHeight: '24px',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4'
            }
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
        }
    };

    // Create an instance of the card Element
    var card = elements.create('card', {style: style});

    // Add an instance of the card Element into the `card-element` <div>
    var cardElement = document.getElementById('card-element');
    if (cardElement != null) {
        card.mount('#card-element');
    }

    // Handle real-time validation errors from the card Element.
    card.addEventListener('change', function(event) {
        var displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = event.error.message;
        } else {
            displayError.textContent = '';
        }
    }); 

    // Handle form submission

    var SubscribeForm = function(id, user) {
        this.id = id || null;
        this.parent = Acme.Form.prototype;
        this.code = false;

        this.data = {
            "firstname": "Subscriber",
            "password": this.random(25),
            "username": this.random(15),
            "user_id": user.user_id,
            "user_guid": user.user_guid
        };


        this.errorFields = [];

        this.validateRules = {
            "email"             : ["notEmpty"],
            "trial"             : [],
            "terms"             : ["isTrue"],
        };

        var trial = $('#trial').val();
        this.data['plantype'] = $('#plantype').val();

        if (trial == "1" && this.data.plantype === 'time') {
            this.data['trial'] = 'true';
            this.validateRules['changeterms'] = ["isTrue"];
        }
        if ($("#code-redeem").length > 0) {
            this.code = true;
            delete this.validateRules.terms;
            delete this.validateRules.changeterms;
        }

        this.validateFields = Object.keys(this.validateRules);
        this.loadData();
        this.events();
    };

    SubscribeForm.prototype = new Acme.Form(Acme.Validators);
    SubscribeForm.constructor = SubscribeForm;

    SubscribeForm.prototype.random = function(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    SubscribeForm.prototype.render = function(checkTerms) 
    {
        this.clearInlineErrors();
        this.addInlineErrors();
        if (checkTerms) {
            if (!this.data.terms || (this.data.trial === 'true' && !this.data.changeterms)) {
                this.confirmView = new Acme.modal('modal', 'signin-modal', {'terms': 'subscribeTerms'});
                this.confirmView.render("terms", "Almost there");
            }
        }
    };



    SubscribeForm.prototype.submit = function(event) 
    {
        var self = this;
        event.preventDefault();
        var validated = self.validate();
        var checkTerms = true;
        if (this.code) {
            checkTerms = false;
        }
        self.render(checkTerms);
        
        if (!validated) return;

        if (botTimer < 5 || $('#email-confirm').val() !== "") {
            window.location.href = location.origin + "/auth/thank-you";
        }

    // var modal = new Acme.Signin('spinner', 'spinner-modal', {"spinner": 'spinnerTmpl'});

        this.signup = new Acme.modal('modal', 'spinner-modal', {"spinner": 'spinnerTmpl'});

        if (this.code) {
            this.signup.render("spinner", "Authorising code");
            self.data['planid'] = $('#planid').val();
            self.data['giftcode'] = $('#code-redeem').val();
            self.data['stripetoken'] = null;
            Acme.server.create('/auth/paywall-signup', self.data);

        } else {

            // modal.render("spinner", "Your request is being processed.");
            this.signup.render("spinner", "Your request is being processed.");
            var stripeCall = stripe.createToken(card).then(function(result) {

                if (result.error) {
                    self.signup.closeWindow();
                    // Inform the user if there was an error
                    var errorElement = document.getElementById('card-errors');
                    errorElement.textContent = result.error;
                } else {
                    // Send the token to your server

                    self.data['stripetoken'] = result.token.id;
                    self.data['planid'] = $('#planid').val();
                    self.data['redirect'] = false;
                    Acme.server.create('/auth/paywall-signup', self.data).done(function(r) {
                        // console.log(r);
                        if (r.success == 1) {
                            self.data.user_id = r.userid;
                            self.data.user_guid = r.userguid;
                            // console.log(self.data);
                            var purchaseId = Math.floor(Math.random()*60000000000);
                            // console.log('gta-pay-now');
                            if  ($('.j-gtasubpay')[0]){
                                var payitem = $($('.j-gtasubpay')[0]);
                                if (typeof dataLayer !== 'undefined') {
                                    dataLayer.push({
                                        'event':'purchase',
                                        'ecommerce': {
                                            'purchase': {
                                                'actionField': {
                                                    'id': purchaseId,                         // Transaction ID. Required for purchases and refunds.
                                                    'revenue': payitem.data('price')
                                                },
                                                'products': [{                            // List of productFieldObjects.
                                                    'name': payitem.data('name'),
                                                    'id': payitem.data('id'),
                                                    'category': 'Pro Subscription',
                                                    'price': payitem.data('price'),
                                                    'quantity': 1
                                                }]
                                            }
                                        }
                                    });
                                }
                            }
                            Acme.progress.next();

                            // window.history.pushState( {} , '', '&step=2' );
                            // console.log(window.location.search);
                        } else {
                            var errorElement = document.getElementById('card-errors');
                            var text = '';
                            for (var key in r.error) {
                                text = text + r.error[key] + " ";
                            } 
                            // console.log(text);
                            errorElement.textContent = text;
                        }
                        self.signup.closeWindow();
                    }).fail(function(r) {
                        self.signup.closeWindow();
                    });
                }
            });   
        }

            
    };

    var main = $('main');
    var user = {
        user_id : main.data('userid'),
        user_guid : main.data('userguid')
    };
    Acme.subscribe = new SubscribeForm('payment-form', user);








    var ActivateForm = function(id, subscription) {
        this.subscription = subscription;
        this.id = id || null;
        this.parent = Acme.Form.prototype;
        this.data = {
            "group[1149][1]": true,
            "group[1149][2]": true,
        };
        this.errorFields = [];

        this.validateRules = {
         // this.data              Rule
            "password"          : ["notEmpty"],
            "verifypassword"    : ["notEmpty"],
            "firstname"         : ["notEmpty"], 
            "lastname"          : ["notEmpty"], 
        };

        this.validateFields = Object.keys(this.validateRules);
        this.loadData();
        this.events();
    };

    ActivateForm.prototype = new Acme.Form(Acme.Validators);
    ActivateForm.constructor = ActivateForm;
    ActivateForm.prototype.submit = function(event) 
    {
        var self = this;
        event.preventDefault();
        var validated = self.validate();

        this.data.user_id = this.subscription.data.user_id;
        this.data.user_guid = this.subscription.data.user_guid;
        self.render(true);
        if (!validated) return;

        // var modal = new Acme.Signin('spinner', 'spinner-modal', {"spinner": 'spinnerTmpl'});

        this.signup = new Acme.modal('modal', 'spinner-modal', {"spinner": 'spinnerTmpl'});
        // modal.render("spinner", "Your request is being processed.");
        this.signup.render("spinner", "Activating account");
        Acme.server.create('/api/user/edit-profile', this.data).done(function(r) {
            console.log(r);
            if (self.data["group[1149][1]"] != false || self.data["group[1149][2]"] != false) {
                // console.log('sending mailchimp signup');
                // console.log(self.data);
                var subscribeData = {
                    "EMAIL": self.subscription.data['email'], 
                    "FNAME": self.data['firstname'],
                    "LNAME": self.data['lastname'],
                };
                if (self.data["group[1149][1]"]) {
                    subscribeData["group[1149][1]"] = 1;
                }
                if (self.data["group[1149][2]"]) {
                    subscribeData["group[1149][2]"] = 2;
                }
                // console.log(subscribeData);

                Acme.server.create("https://hivenews.us7.list-manage.com/subscribe/post?u=9cf8330209dae95121b0d58a6&amp;id=2412c1d355", subscribeData)
                    .then(function(r) {
                        console.log(r);
                    });                        
            }
            Acme.progress.next();
            self.signup.closeWindow();
        }).fail(function(r) {
            console.log('failed', r);
        });

    };


    Acme.subscribe = new ActivateForm('activate-form', Acme.subscribe);





    var ManagedForm = function(id, user) {
        this.id = id || null;
        this.parent = Acme.Form.prototype;
        this.data = {};
        this.errorFields = [];

        this.validateRules = {
            "firstname"         : ["notEmpty"], 
            "lastname"          : ["notEmpty"], 
            "email"             : ["notEmpty"],
        };

        
        this.validateFields = Object.keys(this.validateRules);
        this.loadData();
        this.events();

    };

    ManagedForm.prototype = new Acme.Form(Acme.Validators);
    ManagedForm.constructor = ManagedForm;

    ManagedForm.prototype.submit = function(event) 
    {
        var self = this;
        event.preventDefault();

        var button = $(event.submitter).data('job');
        if (button === 'skip') {
            // setTimeout('window.location.href = location.origin + "/auth/thank-you";', 1000);
            window.location.href = location.origin + '/auth/thank-you';
            return;
        }



        var validated = self.validate();
        self.render(true);
        if (!validated) return;

        // var modal = new Acme.Signin('spinner', 'spinner-modal', {"spinner": 'spinnerTmpl'});

        this.signup = new Acme.modal('modal', 'spinner-modal', {"spinner": 'spinnerTmpl'});
        // modal.render("spinner", "Your request is being processed.");
        this.signup.render("spinner", "Sending invite");
        Acme.server.create('/api/user/create-paywall-managed-user', this.data).done(function(r) {
            console.log(r);
            if (r.success == 1) {
                    // set time out used for Firefox which seems to need a little bit more time to figure things out
                    // setTimeout('window.location.href = location.origin + "/auth/thank-you";', 2000);
                    window.location.href = location.origin + '/auth/thank-you';
            } else {
                self.signup.closeWindow();
            }

        }).fail(function(r) {
            console.log('failed', r);
            self.signup.closeWindow();
        });

            
    };


    Acme.managedForm = new ManagedForm('bonusform', Acme.subscribe);






    var Progress = function(step) 
    {
        this.progress = step > 0 && step < 4 ? step : 1;
        this.numbers = [$('#num1'), $('#num2'), $('#num3')];
        this.lines = [$('#line1'), $('#line2'), $('#line3')];
        this.forms = [$('#signupformview'), $('#activeformview'), $('#userformview')];
        this.labels = [$('#label1'), $('#label2'), $('#label3')];
        this.render();
    };
    Progress.prototype.tick = function(tick) 
    {
        this.progress = tick;
        this.render();
    };
    Progress.prototype.next = function() 
    {
        if (this.progress < 3 ) {
            this.progress++;
        }
        this.render();
    };
    Progress.prototype.previous = function() 
    {
        if (this.progress > 0 ) {
            this.progress--;
        }
        this.render();
    };

    Progress.prototype.render = function()
    {
        for (var i=0;i<this.numbers.length;i++) {
            this.numbers[i].removeClass('subscribe-progress__number--red');
        };
        for (var i=0;i<this.lines.length;i++) {
            this.lines[i].removeClass('subscribe-progress__line--red');
        };
        for (var i=0;i<this.forms.length;i++) {
            this.forms[i].addClass('u-hide');
            // form.removeClass('u-hide');
        };
        for (var i=0;i<this.labels.length;i++) {
            this.labels[i].removeClass('subscribe-progress__label--active');
        };


        for (var i = 0; i < this.progress; i++) {
            this.numbers[i].addClass('subscribe-progress__number--red');
            this.lines[i].addClass('subscribe-progress__line--red');
            this.labels[i].addClass('subscribe-progress__label--active');
        }

        this.forms[this.progress - 1].removeClass('u-hide');
        
        if (this.progress > 1 ) {
            $('#changeplan').addClass('u-hide');
        }
    };

    var urlParams = new URLSearchParams(window.location.search);
    var step = urlParams.get('step');    
    Acme.progress = new Progress(step);
    Acme.progress.render();

} 
// Create a Stripe client
var botTimer = 0;

if ($('#stripekey').length > 0 && $('#paywalloldsubscribe').length ) {

    console.log('running from stripe code');
    var stripekey = $('#stripekey').html();

    var modal = new Acme.Signin('spinner', 'spinner-modal', {"spinner": 'spinnerTmpl'});

    var stripe = Stripe(stripekey);

    setInterval(function(){
        botTimer = botTimer + 1;
    }, 1000);

    // Create an instance of Elements
    var elements = stripe.elements();

    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    var style = {
        base: {
            color: '#32325d',
            lineHeight: '24px',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4'
            }
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
        }
    };

    // Create an instance of the card Element
    var card = elements.create('card', {style: style});

    // Add an instance of the card Element into the `card-element` <div>
    var cardElement = document.getElementById('card-element');
    if (cardElement != null) {
        card.mount('#card-element');
    }

    // Handle real-time validation errors from the card Element.
    card.addEventListener('change', function(event) {
        var displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = event.error.message;
        } else {
            displayError.textContent = '';
        }
    }); 

    // Handle form submission

    var SubscribeForm = function() {
        this.data = {
            "group[1149][1]": true,
            "group[1149][2]": true,
        };
        this.errorFields = [];

        this.validateRules = {
            "verifypassword"    : ["notEmpty"],
            "firstname"         : ["notEmpty"], 
            "lastname"          : ["notEmpty"], 
            "username"          : [], 
            "password"          : ["notEmpty"],
            "email"             : ["notEmpty"],
            "trial"             : [],
            "terms"             : ["isTrue"],
        };


        this.events();
        var trial = $('#trial').val();
        this.data['plantype'] = $('#plantype').val();

        if (trial == 1 && this.data.plantype === 'time') {
            this.data['trial'] = 'true';
            this.validateRules['changeterms'] = ["isTrue"];
            // this.validateRules['cancelterms'] = ["isTrue"];
        }
        this.validateFields = Object.keys(this.validateRules);

    };

    SubscribeForm.prototype = new Acme.Form(Acme.Validators);
    SubscribeForm.constructor = SubscribeForm;

    SubscribeForm.prototype.render = function(checkTerms) 
    {

        this.clearInlineErrors();
        this.addInlineErrors();
        if (checkTerms) {
            if (!this.data.terms || (this.data.trial === 'true' && !this.data.changeterms)) {
                this.confirmView = new Acme.modal('modal', 'signin-modal', {'terms': 'subscribeTerms'});
                this.confirmView.render("terms", "Terms of use");
            }
        }
    };



    SubscribeForm.prototype.submit = function(event) 
    {
        var self = this;
        event.preventDefault();
        var validated = self.validate();
        self.render(true);
        if (!validated) return;

        $('#card-errors').text('');
        if ( $('#password').val() !== $('#verifypassword').val() ) {
            $('#card-errors').text('Password fields do not match.');
            return;
        }

        if (botTimer < 5 || $('#email-confirm').val() !== "") {
            window.location.href = location.origin + "/auth/thank-you";
        }



        function submitForm() {
            formhandler(self.data, '/auth/paywall-signup').then(function(response) {

                if (response.success == 1) {

                    if (self.data["group[1149][1]"] != false || self.data["group[1149][2]"] != false) {

                        var subscribeData = {
                            "EMAIL": self.data['email'], 
                            "FNAME": self.data['firstname'],
                            "LNAME": self.data['lastname'],
                        };
                        if (self.data["group[1149][1]"]) {
                            subscribeData["group[1149][1]"] = 1;
                        }
                        if (self.data["group[1149][2]"]) {
                            subscribeData["group[1149][2]"] = 2;
                        }

                        Acme.server.create("https://hivenews.us7.list-manage.com/subscribe/post?u=9cf8330209dae95121b0d58a6&amp;id=2412c1d355", subscribeData)
                            .then(function(r) {
                                console.log(r);
                            });                        
                    }
                    
                    // set time out used for Firefox which seems to need a little bit more time to figure things out
                    setTimeout('window.location.href = location.origin + "/auth/thank-you";', 2000);
                    // window.location.href = location.origin + '/auth/thank-you';
                }
                
            });
        }


        if ($("#code-redeem").length > 0) {
            modal.render("spinner", "Authorising code");
            self.data['planid'] = $('#planid').val();
            self.data['giftcode'] = $('#code-redeem').val();
            self.data['stripetoken'] = null;
            submitForm();

        } else {

            modal.render("spinner", "Your request is being processed.");

            var stripeCall = stripe.createToken(card).then(function(result) {

                if (result.error) {
                    modal.closeWindow();
                    // Inform the user if there was an error
                    var errorElement = document.getElementById('card-errors');
                    errorElement.textContent = result.error.message;
                } else {
                    // Send the token to your server

                    self.data['stripetoken'] = result.token.id;
                    self.data['planid'] = $('#planid').val();
                    self.data['redirect'] = false;
                    submitForm();
                }
            });   
        }

            
         
    };
    SubscribeForm.prototype.events = function()
    {
        var self = this;
        $('input, textarea').on("change", function(e) {

            e.stopPropagation();
            e.preventDefault();
            var data = {};
            var elem = $(e.target);
            var elemid = elem.attr('name');
            var inputType = elem.attr('type');

            if (inputType == 'text' || inputType == 'email' || inputType == 'password') {
                data[elemid] = elem.val();
                // username is created from the email plus a random number
                if (inputType == 'email') {
                    data['username'] = Math.floor(100000000 + Math.random() * 9000000000000000);
                }

            } else if (inputType =='checkbox') {
                var value = elem.is(":checked");
                data[elemid] = value;
            }

            self.updateData(data);

            var validated = self.validate([elemid]);
            self.render();
        });

        var form = document.getElementById('payment-form');

        if (form != null) {
            form.addEventListener('submit', function(event) {
                self.submit(event);

            });
        }

        console.log('removing email confirm');
        $('#email-confirm').addClass("email-confirm");

    };

    Acme.subscribe = new SubscribeForm();

   


    var formhandler = function(formdata, path) {
        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        return $.ajax({
            url: _appJsConfig.appHostName + path,
            type: 'post',
            data: formdata,
            dataType: 'json',
            success: function(data) {

                if(data.success) {
                    $('#card-errors').text('Completed successfully.');
                } else {
                    modal.closeWindow();

                    var text = ''
                    for (var key in data.error) {
                        text = text + data.error[key] + " ";
                    } 
                    $('#card-errors').text(text);
                }   
            },
            error: function(data) {
                modal.closeWindow();
            }
        });
    }



    var udform = document.getElementById('update-card-form');

    if (udform != null) {

        udform.addEventListener('submit', function(event) {
            event.preventDefault();
            modal.render("spinner", "Your request is being processed.");

            $('#card-errors').text('');
            
            stripe.createToken(card).then(function(result) {
                if (result.error) {
                    modal.closeWindow();

                    // Inform the user if there was an error
                    var errorElement = document.getElementById('card-errors');
                    errorElement.textContent = result.error.message;
                } else {
                    // Send the token to your server

                    formdata = {"stripetoken":result.token.id}
                    formhandler(formdata, '/user/update-payment-details').then(function() {
                        modal.closeWindow();
                        location.reload();
                    });
                }
            });
        });
    }
} 
$('.j-mcsubscribe').click(function(event){
    var email = $('#'+$(event.currentTarget).data('input')).val();
    document.getElementById("mce-group[3]-"+$(event.currentTarget).data('type')).checked = true;
    $('#j-box-'+$(event.currentTarget).data('type')).addClass('d-none');
    $('#j-mcpopup-thankyou').text('You are signing up to the '+$(event.currentTarget).data('title')+'.');
    $('#mce-EMAIL').val(email);
    $('#j-mcpopup').removeClass('d-none');
});

$('.j-mcmultisubscribe').click(function(event){
    // var doSubscribe = false;
    // var subscribeData = {
    //     "EMAIL":  $('#j-mcpopup').data('email'), 
    //     "u": "e0ae259e8f9472b9c54037c25",
    //     "id": "71de5c4b35"
    // };

    // if ($('#j-mccheckbox-daily').is(":checked")){
    //     doSubscribe = true;
    //     subscribeData["group[3][1]"] = 1;
    // };
    // if ($('#j-mccheckbox-weekly').is(":checked")){
    //     doSubscribe = true;
    //     subscribeData["group[3][2]"] = 2;
    // };
    // if ($('#j-mccheckbox-lockerroom').is(":checked")){
    //     doSubscribe = true;
    //     subscribeData["group[3][4]"] = 4;
    // };
    // if ($('#j-mccheckbox-readingroom').is(":checked")){
    //     doSubscribe = true;
    //     subscribeData["group[3][8]"] = 8;
    // };

    //console.log(subscribeData);

    // Acme.server.create("https://newsroom.us14.list-manage.com/subscribe/post", subscribeData)
    // .then(function(r) {
    //     console.log(r);
    // });


    // requestData = {
    //     email   : $('#j-mcpopup').data('email'),
    //     list    : "71de5c4b35",
    //     group   : "group[3][4]",
    //     action  : 'post'
    // };

    // Acme.server.create(_appJsConfig.baseHttpPath + '/api/integration/mailchimp-subscription', requestData )
    //     .done(function(r) {
    //         if (r.success == 1) {
               
    //             console.log(r);
    //             // var msg = 'Succesfully ' + action + 'd ' + actionVerb + ' ' + self.emailLists[requestData['list']];
    //             // $("#account-form__email").prepend('<p>' + msg + '</p>');
    //         }
    //     }).fail(function(e) {
    //         console.log(e);
    //         $('#createUserErrorMessage').text(e.errorText);
    //     });
    
    $( "#j-box-3-0" ).addClass("d-none");
    $( "#j-box-3-1" ).addClass("d-none");
    $( "#j-box-3-2" ).addClass("d-none");
    $( "#j-box-3-3" ).addClass("d-none");
    $('#j-mcpopup-thankyou').text('Thank you for signing up');
    $('#j-mcpopup-blurb').text("To unsubscribe, click the link in the email.");
    $('#j-mcpopup-cancel').text('CLOSE');
    $('#j-mcpopup-signup').addClass('d-none');
});

$('.j-mccancel').click(function(){
    $('#j-mcpopup').data('email','');
    $('#j-mcpopup').addClass('d-none');
    $( "#j-mccheckbox-3-0" ).prop( "checked", false );
    $( "#j-box-3-0" ).removeClass("d-none");
    $( "#j-mccheckbox-3-1" ).prop( "checked", false );
    $( "#j-box-3-1" ).removeClass("d-none");
    $( "#j-mccheckbox-3-2" ).prop( "checked", false );
    $( "#j-box-3-2" ).removeClass("d-none");
    $( "#j-mccheckbox-3-3" ).prop( "checked", false );
    $( "#j-box-3-3" ).removeClass("d-none");
    $('#j-mcpopup-signup').removeClass('d-none');
    $('#j-mcpopup-cancel').html('CANCEL');
    $('#j-mcpopup-blurb').html("While you’re here would you like to sign up to any of our other email newsletters?");
    
});   

$('.j-mcprosubscribe').click(function(event){
    $('#j-mcpopup').removeClass('d-none');
});
            

Acme.Token = function(tokenName) 
{
	this.hasLocal	= typeof localStorage != "undefined" ? true : false;
	this.keyName 	= tokenName;
	this.token 		= {};
	var self 		= this;

};

Acme.Token.prototype.getToken = function() 
{
	if ( this.hasLocal ) {
	    this.token = localStorage.getItem(this.keyName);
	    return this.token && JSON.parse(this.token);

	} else {
	    // var c_start = document.cookie.indexOf(this.keyName + "=");
	    // if ( document.cookie.length > 0 ) {
	    //     if (c_start !== -1) {
	    //         return getCookieSubstring(c_start, this.keyName);
	    //     }
	    // }
	    return null;
	}
};
Acme.Token.prototype.setToken = function(value) 
{
	if ( this.hasLocal ) {
	    localStorage.setItem(this.keyName, value);
	} else {
	    // document.cookie = this.keyName + "=" + escape(value) +
	    // ((expiredays === null) ? "" : ";expires=" + exdate.toUTCString());
	}
};
Acme.Token.prototype.removeToken = function() 
{	
	if ( this.hasLocal ) {
	    return localStorage.removeItem(this.keyName);
	}
};
// var UserArticlesController = (function ($) {
//     return {
//         load: function () {
//             UserArticlesController.Load.init();
//         }
//     };
// }(jQuery));

// UserArticlesController.Load = (function ($) {

//     var attachEvents = function () {
//         /*
//          * Load More Articles on My Post Page
//          */
//         $('.loadMoreMyArticles').on('click', function (e) {
//             e.preventDefault();
//             var btnObj = $(this);

//             $.fn.Ajax_LoadMoreMyArticles({
//                 onSuccess: function (data, textStatus, jqXHR) {
//                     if (data.success == 1) {
//                         if (data.articles.length < 20) {
//                             $(btnObj).css('display', 'none');
//                         }
//                         for (var i in data.articles) {
//                             data.articles[i]['containerClass'] = 'col-quarter';
//                             data.articles[i]['cardClass'] = 'card__news card--local';
                            
//                             data.articles[i]['blogClass']= '';
//                             if(data.articles[i].blog['id'] !== null) {
//                                data.articles[i]['blogClass']= 'card--blog_'+data.articles[i].blog['id'];
//                             } 
                            
//                             var ImageUrl = $.image({media:data.articles[i]['featuredMedia'], mediaOptions:{width: 500 ,height:350, crop: 'limit'} });
//                             data.articles[i]['imageUrl'] = ImageUrl;
//                             var articleTemplate = Handlebars.compile(systemCardTemplate);
//                             var article = articleTemplate(data.articles[i]);
//                             $('.LoadMyArticles').append(article);
//                         }
//                         $(".card p, .card h1").dotdotdot();
//                          //Lazyload implement
//                         $("div.lazyload").lazyload({
//                             effect: "fadeIn"
//                         });
//                     }
//                 },
//                 beforeSend: function (jqXHR, settings) {
//                     $(btnObj).html("Please wait...");
//                 },
//                 onComplete: function (jqXHR, textStatus) {
//                     $(btnObj).html("Load More");
//                 }
//             });
//         });
        
//         /**
//          *  See User Post Articles
//          */

//         var totalPosts = parseInt($('div#userArticleContainer').data('total-count'));

//         if (totalPosts > _appJsConfig.articleOffset) {
//             var waypoint = new Waypoint({
//                 element: $('#LoadMoreArticles'),
//                 offset: '80%',
//                 handler: function (direction) {

//                     if (direction == 'down') {

//                         $("#loader").show();
//                         $.fn.Ajax_LoadMoreUserArticles({
//                             onSuccess: function (data, textStatus, jqXHR) {
//                                 if (data.userArticles.length > 0) {

//                                     for (var i in data.userArticles) {
//                                         data.userArticles[i]['containerClass'] = 'col-sm-6 col-md-3 card-vr userpost';
//                                         // data.userArticles[i]['cardClass'] = 'card__news card--local';
                                        
//                                         data.userArticles[i]['blogClass']= '';
//                                         if(data.userArticles[i].blog['id'] !== null) {
//                                            data.userArticles[i]['blogClass']= 'card--blog_'+data.userArticles[i].blog['id'];
//                                         } 
                                        
//                                         var ImageUrl = $.image({media:data.userArticles[i]['featuredMedia'], mediaOptions:{width: 500 ,height:350, crop: 'limit'} });
//                                         data.userArticles[i]['imageUrl'] = ImageUrl;
//                                         data.userArticles[i]['placeholder'] = 'https://placeholdit.imgix.net/~text?txtsize=33&txt=Loading&w=450&h=250';
//                                         var articleTemplate = Handlebars.compile(systemCardTemplate);
//                                         var article = articleTemplate(data.userArticles[i]);
//                                         $('#userArticleContainer').append(article);
//                                     }

//                                     if (data.userArticles.length < _appJsConfig.articleOffset) {
//                                         waypoint.destroy();
//                                     } else {
//                                         Waypoint.refreshAll();
//                                     }
//                                     $(".card p, .card h1").dotdotdot();
//                                      //Lazyload implement
//                                     $("div.lazyload").lazyload({
//                                         effect: "fadeIn"
//                                     });
//                                 }
//                             },
//                             beforeSend: function (jqXHR, settings) {
//                                 $('div.loader').removeClass('hide');
//                             },
//                             onComplete: function (jqXHR, textStatus) {
//                                 $('div.loader').addClass('hide');
//                             }
//                         });
//                     }
//                 }
//             });
//         }
//     };
//     return {
//         init: function () {
//             attachEvents();
//         }
//     };

// }(jQuery));




    
Acme.UserProfileController = function()
{
    this.csrfToken      = $('meta[name="csrf-token"]').attr("content");
    this.mailChimpUser  = false;
    this.emailLists     = [];
    // test mailchimp accounts
    // this.newsroom       = '17ba69a02c';
    // this.group          = 'cb03aca14d'; // me
    
    
    this.newsroom       = '2412c1d355';
    this.group          = 'f6f5aaa06b';

    this.events();
    this.userEvents();
    this.listingEvents();
    this.fetchEmailLists();
};


Acme.UserProfileController.prototype.subscribeToEmail = function(user, group) {
    

    var data = {
        _csrf  : this.csrfToken,
        list   : this.newsroom,
        group  : group,
        user   : user,
        action : 'create',
    };

    return Acme.server.create( _appJsConfig.baseHttpPath + '/api/integration/mailchimp-subscription', data).done(function(r) {
        console.log(r);
    });

};


Acme.UserProfileController.prototype.fetchUserMailchimpStatus = function(list) {

    var requestData = {
        action: 'get',
        list: list
    };

    return Acme.server.create(_appJsConfig.baseHttpPath + '/api/integration/mailchimp-subscription', requestData );

};


Acme.UserProfileController.prototype.fetchEmailLists = function() {

    var self = this;

    Acme.server.fetch( _appJsConfig.baseHttpPath + '/api/integration/mailchimp-get-list-data?list='+this.newsroom+'&group='+this.group).done(function(data) {

        if (typeof data.data.interests != 'undefined') {
            self.emailLists = data.data.interests;
        }

        var emails    = Handlebars.compile(Acme.templates.mailchimpList);



        self.fetchUserMailchimpStatus(self.newsroom).done(function(status) {

            self.mailChimpUser = status.data === false ? false : true;

                for (var i=self.emailLists.length -1; i > -1; i--) {
                    var checked = '';
                    var name = self.emailLists[i].name;

                    if ( status.data !== false && status.data.interests[self.emailLists[i].id] === true && status.data.status !== 'unsubscribed' ) {
                        checked = 'checked';
                    }

                    if (self.emailLists[i].name.toLowerCase() == 'daily summaries') {
                        name = "Send me Jonathan Milne's <i>8 Things</i> email each day";
                    }

                    if (self.emailLists[i].name.toLowerCase() == 'breaking news alerts') {
                        name = "Send me an email alert when important news breaks";
                    }

                    var params = {
                        listId: self.newsroom,
                        groupId: self.emailLists[i].id,
                        name: name,
                        checked: checked
                    };
    
                    
                    $('#account-form__email').append( emails(params) );
                }

        });
    });

};




Acme.UserProfileController.prototype.deleteUser = function(e) {

    var user = $(e.target).closest('li');
    var userid = user.attr("id");

    var mailChimpData = {
        user    : userid,
        list    : this.newsroom,
        action  : 'unsubscribe'
    }

    // first remove from email lists
    Acme.server.create( _appJsConfig.baseHttpPath + '/api/integration/mailchimp-subscription', mailChimpData).done(function(r) {

        var requestData = { 
            id: userid, 
            _csrf: this.csrfToken
        };

        // then delete the user
        return $.ajax({
            type: 'post',
            url: _appJsConfig.baseHttpPath + '/user/delete-managed-user',
            dataType: 'json',
            data: requestData,
            success: function (data, textStatus, jqXHR) {
                if (data.success == 1) {
                    user.remove();
                    $('#addManagedUser').removeClass('hidden');
                    var usertxt = $('.profile-section__users-left').text();
                    var usercount = usertxt.split(" ");
                    var total = usercount[2];
                    usercount = parseInt(usercount[0]);
                    $('.profile-section__users-left').text((usercount - 1) + " of " + total + " used.");
                } else {
                    var text = '';
                    for (var key in data.error) {
                        text = text + data.error[key] + " ";
                    } 
                    $('#createUserErrorMessage').text(text);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#createUserErrorMessage').text(textStatus);
            },
        });
    });
};

Acme.UserProfileController.prototype.renderUser = function(parent, data, template) {

    var userTemp = template ? Handlebars.compile(template) : Handlebars.compile(Acme.templates.managed_user);
    if (data.constructor != Array) {
        data = [data];
    }
    var html = '';
    for (var i = 0; i < data.length; i++) {
        html += userTemp(data[i]);
    }

    parent.empty().append(html);
};

Acme.UserProfileController.prototype.render = function(data) 
{
    var self = this;
    var data = data.users.users || data.users;
    var users = [];
    for (var i=0; i< data.length; i++) {
        users.push({
            firstname: data[i].firstname, 
            lastname:  data[i].lastname, 
            username:  data[i].username, 
            useremail: data[i].email,
            id: data[i].id
        });
    }
    self.renderUser(($('#mangedUsers')), users, Acme.managed_user);
    self.userEvents();
};

Acme.UserProfileController.prototype.search = function(params) 
{   
    var self = this;
    this.fetch(params, 'search-managed-users').done(function(data) {
        self.render(data);
    });
};

Acme.UserProfileController.prototype.fetchUsers = function(params) 
{   
    var self = this;
    this.fetch(params, 'load-more-managed').done(function(data) {
        self.render(data);
    });
};

Acme.UserProfileController.prototype.fetch = function(params, url) 
{
    var url = _appJsConfig.appHostName + '/api/user/'+ url;
    return Acme.server.fetch(url, params);
};



Acme.UserProfileController.prototype.userEvents = function() 
{
    var self = this;


    $('.j-edit').unbind().on('click', function(e) {

        var listelem = $(e.target).closest('li');
        var userid = listelem.attr("id");

        function getUserData(func) {
            return {
                firstname: listelem.find('.j-firstname')[func](), 
                lastname:  listelem.find('.j-lastname')[func](), 
                username:  listelem.find('.j-username')[func](), 
                useremail: listelem.find('.j-email')[func](),
            };
        };

        var data = getUserData("text");
        var userTemp = Handlebars.compile(Acme.templates.edit_user);
        var html = userTemp(data);
        listelem.empty().append(html);

        $('#cancelUserCreate').on('click', function(e) {
            self.renderUser(listelem, data);
            self.userEvents();
        });

        $('#saveUser').on('click', function(e) {

            var requestData = getUserData("val");
            requestData.id = userid;
            requestData._csrf = this.csrfToken;
            $.ajax({
                type: 'post',
                url: _appJsConfig.baseHttpPath + '/user/edit-managed-profile',
                dataType: 'json',
                data: requestData,
                success: function (data, textStatus, jqXHR) {
                    if (data.success == 1) {
                        self.renderUser(listelem, requestData);
                        $('#addManagedUser').removeClass('hidden');
                        $('#createUserErrorMessage').text('');

                    } else {
                        var text = '';
                        for (var key in data.error) {
                            text = text + data.error[key] + " ";
                        } 
                        $('#createUserErrorMessage').text(text);
                    }
                    self.userEvents();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                        $('#createUserErrorMessage').text(textStatus);
                },
            });        
        });
    });  

    $('.j-delete').unbind().on('click', function(e) {
        Acme.SigninView.render("userPlanChange", "Are you sure you want to delete this user?")
            .done(function() {
                self.deleteUser(e);
            });
    });   
};




Acme.UserProfileController.prototype.events = function () 
{
    var self = this;

    $('#portal-session').on('click', function(e) {
        console.log('portal button click');
        e.preventDefault();
        Acme.server.create(_appJsConfig.baseHttpPath + '/api/paywall/user-portal-session').then(function(r){
            console.log(r.session.url);
            if (typeof r.session.url !== 'undefined') {
                window.location.replace(r.session.url)
            }
        });

    });


    $('#account-form__email').unbind().on('click', function(e) {
        var elem = $(e.target);
        
        var action = elem.is(':checked') 
            ? self.mailChimpUser 
                ? 'subscribe' : 'create'
            : 'unsubscribe';

        var ids = elem.val().split(':');

        requestData = {
            list    : ids[0],
            group   : ids[1],
            action  : action
        };

        Acme.server.create(_appJsConfig.baseHttpPath + '/api/integration/mailchimp-subscription', requestData )
            .done(function(r) {
                if (r.success == 1) {
                    self.mailChimpUser = true;
                    // var msg = 'Succesfully ' + action + 'd ' + actionVerb + ' ' + self.emailLists[requestData['list']];
                    // $("#account-form__email").prepend('<p>' + msg + '</p>');
                }
            }).fail(function(e) {
                $('#createUserErrorMessage').text(e.errorText);
            });
    });

    $('#profile-form').submit( function(e){
        // NOTE this form also uses validation from the stripe subscribe form
        // purely by accident as the event listeners in THAT form are generic.

        // Will need to separate if it becomes a problem but for now it works
        // The following stops submit and adds error text

        e.preventDefault();
        var errorText = '';

        if ( $('#firstname').val() == '' ) {
            errorText += "First name cannot be empty. <br />";
        }
        if ( $('#lastname').val() == '' ) {
            errorText += "Last name cannot be empty.  <br />";
        }

        if ($('#email').val() == '' ) {
            errorText += "Email cannot be empty. ";
        }

        $("#account-form__errorText").html(errorText);
        
        if (!errorText) {
            $(this).unbind('submit').submit()
        }
    });

    $('#message-close').on('click', function(e) {
        e.preventDefault();
        var parent = $(this).parent().remove();
    });

    $('#managed-user-search').on('submit', function(e) {
        e.preventDefault();
        var search = {};
        $.each($(this).serializeArray(), function(i, field) {
            search[field.name] = field.value;
        });
        self.search(search);
        $('#user-search-submit').hide();
        $('#user-search-clear').show();

    });

    $('#user-search-clear').on('click', function(e) {
        e.preventDefault();
        self.fetchUsers();
        $('#managed-user-search-field').val('');
        $('#user-search-submit').show();
        $('#user-search-clear').hide();
    });



    $('#addManagedUser').on('click', function(e) {
        e.preventDefault()
        var userTemp = Handlebars.compile(Acme.templates.create_user);
        var data = {
            firstname: "First name", 
            lastname:  "Last name", 
            username:  "Username", 
            useremail: "Email",
        };

        var html = '<li id="newUser" class="user-editor user-editor__add"><p class="text-button">Add User</p>' + userTemp(data) + '</li>';

        $('#createManagedUser').append(html);
        $('#newuserfirstname').focus();
        $('#addManagedUser').addClass('hidden');
        $('#nousers').addClass('hidden');

        $('#saveUser').on('click', function(e) {
            $('#userError').text("");

            var requestData = { 
                firstname: $('#newuserfirstname').val(), 
                lastname:  $('#newuserlastname').val(), 
                username:  Math.floor(100000000 + Math.random() * 9000000000000000), 
                useremail: $('#newuseruseremail').val(),
                _csrf: this.csrfToken
            };
            
            var errorText = "";
            if (requestData.firstname === ""){
                errorText += "First name cannot be blank. ";
            }
            if (requestData.lastname === ""){
                errorText += "Last name cannot be blank. ";
            }
            // if (requestData.username === ""){
            //     errorText += "Username cannot be blank. ";
            // }
            if (requestData.useremail === ""){
                errorText += "Email cannot be blank. ";
            }
            if (errorText != "") {
                $('#userError').text(errorText);
                return;
            }
            
            
            $('#user-editor__spinner').addClass('spinner');


            $.ajax({
                type: 'post',
                url: _appJsConfig.appHostName + '/user/create-paywall-managed-user',
                dataType: 'json',
                data: requestData,
                success: function (data, textStatus, jqXHR) {
                    $('#user-editor__spinner').removeClass('spinner');

                    if (data.success == 1) {

                        var groups = self.emailLists.map(function(g) {
                            return g['id'];
                        });

                        self.subscribeToEmail(data.user, groups);

                        location.reload(false);             
                    } else {
                        var text = '';
                        for (var key in data.error) {
                            text = text + data.error[key] + " ";
                        } 
                        $('#createUserErrorMessage').text(text);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $('#user-editor-buttons').removeClass('spinner');
                    $('#createUserErrorMessage').text(textStatus);
                },
            });        
        });

        $('#cancelUserCreate').on('click', function(e) {
            $('#newUser').remove();
            $('#addManagedUser').removeClass('hidden');
            $('#createUserErrorMessage').text('');
        });
    });



    $('#cancelAccount').on('click', function(e) {
        e.preventDefault();
        var listelem = $(e.target).closest('li');

        var status = 'cancelled';
        message = "Are you sure you want to cancel your plan?"
        if ($(e.target).text() == 'Restart Subscription') {
            message = "Do you want to reactivate your plan? You will be billed on the next payment date."
            status = 'paid'
        }
        var requestData = { 
            status: status, 
            _csrf: this.csrfToken, 
        };

        Acme.SigninView.render("userPlanChange", message)
            .done(function() {
                $('#dialog').parent().remove();
                
                $.ajax({
                    type: 'post',
                    url: _appJsConfig.baseHttpPath + '/user/paywall-account-status',
                    dataType: 'json',
                    data: requestData,
                    success: function (data, textStatus, jqXHR) {

                        if (data.success == 1) {
                            window.location.reload(false);             
                        } else {
                            var text = '';
                            for (var key in data.error) {
                                text = text + data.error[key] + " ";
                            } 
                            $('#createUserErrorMessage').text(text);
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                            $('#createUserErrorMessage').text(textStatus);
                    },
                });        
            }); 
    });       


    $('.j-setplan').on('click', function(e) {
        e.stopPropagation();

        var modal = new Acme.modal('modal', 'signin-modal', {
            "userPlan" : 'userPlanMessage',
            "userPlanChange" : 'userPlanOkCancel'
        });


        var newPlan = $(e.target);
        if (!newPlan.hasClass('j-setplan')) {
            newPlan = $(e.target.parentNode);
        }
        
        var currentPlan      = $('#currentPlanStats');
        var cardSupplied     = currentPlan.data("cardsupplied");

        var currentUserCount = +currentPlan.data('currentusers');
        var oldcost          = +currentPlan.data('currentcost');
        var oldPlanPeriod    = +currentPlan.data('currentplanperiodcount');
        var expDate          =  currentPlan.data('expiry');
        var olddays          =  currentPlan.data('currentperiod');
        var oldPlanType      =  currentPlan.data('currenttype');

        var planusers        = +newPlan.data('planusercount');
        var newcost          = +newPlan.data('plancost');
        var newPlanPeriod    = +newPlan.data('planperiodcount');
        var newdays          =  newPlan.data('planperiod');
        var newPlanType      =  newPlan.data('plantype');


        if (currentUserCount > 0 && currentUserCount >= planusers) {
            modal.render("userPlan", "You have too many users to change to that plan.");
            return;
        }


        if (newdays == 'week')  {newdays = 7;}
        if (newdays == 'month') {newdays = 365/12;}
        if (newdays == 'year')  {newdays = 365;}
        if (olddays == 'week')  {olddays = 7;}
        if (olddays == 'month') {olddays = 365/12;}
        if (olddays == 'year')  {olddays = 365;}
        newdays = newdays * newPlanPeriod;
        olddays = olddays * oldPlanPeriod;
        var newplandailycost = newcost / newdays;
        var plandailycost = oldcost/olddays;


        var msg = "";
        var newCharge = 0;
        if (( newPlanType == 'article' && oldPlanType !== 'time') || ( newPlanType == 'time' && oldPlanType === 'article') ) {
            newCharge = newcost / 100;
        }

        if (oldPlanType === 'signup' ) {
            newCharge = newcost / 100;
        }
        
        if (oldPlanType === 'time' && newPlanType === 'time' && newcost < oldcost ) {
            newCharge = 0;
        }

        var expiryObj = new Date(expDate);
        var today = new Date();
        var diffTime = Math.abs(today - expiryObj);
        var diffDays1 = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        var diffDays = moment(expDate).diff(moment(), 'days');

        // more expensive time base plan changes require a charge that is the difference in cost between the two
        if (oldPlanType === 'time' && newPlanType === 'time' && diffDays > 0) {
            if ((newplandailycost-plandailycost) * diffDays >= 0) {
                newCharge = Math.round((( newplandailycost-plandailycost) * diffDays) / 100 );
            }
        }

        if (newCharge > 0) {
            msg = "This will cost $" + newCharge.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
        }

        if (cardSupplied === 'f' ) {
            msg = msg + "However, we need you to supply your credit card details. <br />You can enter those a little lower on the page and then we can finalise the plan change.";
            modal.render("userPlan", "Almost there!", {message: msg});
            return;
        }

        var requestData = { 
            planid: newPlan.data('planid'), 
            _csrf: $('meta[name="csrf-token"]').attr("content"), 
        };


        modal.render("userPlanChange", "Are you sure you want to change plan?" + msg)
            .done(function() {
                $('#dialog').parent().remove();

                $.ajax({
                    type: 'post',
                    url: _appJsConfig.baseHttpPath + '/user/change-paywall-plan',
                    dataType: 'json',
                    data: requestData,
                    success: function (data, textStatus, jqXHR) {
                        if (data.success == 1) {
                            window.location.reload();
                        } else {
                            $('#dialog').parent().remove();
                            Acme.SigninView.render("userPlan", data.error);
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                            $('#createUserErrorMessage').text(textStatus);
                    },
                });        
            }); 

    });

};




Acme.UserProfileController.prototype.listingEvents = function() {
    $('.j-deleteListing').unbind().on('click', function(e) {
        e.preventDefault();
        var listing = $(e.target).closest('a.card');
        var id      = listing.data("guid");
        Acme.SigninView.render("userPlanChange", "Are you sure you want to delete this listing?")
            .done(function() {
                Acme.server.create('/api/article/delete-user-article', {"articleguid": id}).done(function(r) {
                    listing.remove();
                }).fail(function(r) {
                    // console.log(r);
                });
            });
    });  
};

    