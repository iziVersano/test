(function(e){function t(t,n,r){var i=this;i.id=r,i.options=n,i.status={animated:!1,rendered:!1,disabled:!1,focused:!1},i.elements={target:t.addClass(i.options.style.classes.target),tooltip:null,wrapper:null,content:null,contentWrapper:null,title:null,button:null,tip:null,bgiframe:null},i.cache={mouse:{},position:{},toggle:0},i.timers={},e.extend(i,i.options.api,{show:function(t){function s(){i.options.position.type!=="static"&&i.focus(),i.onShow.call(i,t),e.browser.msie&&i.elements.tooltip.get(0).style.removeAttribute("filter")}var n,r;if(!i.status.rendered)return e.fn.qtip.log.error.call(i,2,e.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"show");if(i.elements.tooltip.css("display")!=="none")return i;i.elements.tooltip.stop(!0,!1),n=i.beforeShow.call(i,t);if(n===!1)return i;i.cache.toggle=1,i.options.position.type!=="static"&&i.updatePosition(t,i.options.show.effect.length>0),typeof i.options.show.solo=="object"?r=e(i.options.show.solo):i.options.show.solo===!0&&(r=e("div.qtip").not(i.elements.tooltip)),r&&r.each(function(){e(this).qtip("api").status.rendered===!0&&e(this).qtip("api").hide()});if(typeof i.options.show.effect.type=="function")i.options.show.effect.type.call(i.elements.tooltip,i.options.show.effect.length),i.elements.tooltip.queue(function(){s(),e(this).dequeue()});else{switch(i.options.show.effect.type.toLowerCase()){case"fade":i.elements.tooltip.fadeIn(i.options.show.effect.length,s);break;case"slide":i.elements.tooltip.slideDown(i.options.show.effect.length,function(){s(),i.options.position.type!=="static"&&i.updatePosition(t,!0)});break;case"grow":i.elements.tooltip.show(i.options.show.effect.length,s);break;default:i.elements.tooltip.show(null,s)}i.elements.tooltip.addClass(i.options.style.classes.active)}return e.fn.qtip.log.error.call(i,1,e.fn.qtip.constants.EVENT_SHOWN,"show")},hide:function(t){function r(){i.onHide.call(i,t)}var n;if(!i.status.rendered)return e.fn.qtip.log.error.call(i,2,e.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"hide");if(i.elements.tooltip.css("display")==="none")return i;clearTimeout(i.timers.show),i.elements.tooltip.stop(!0,!1),n=i.beforeHide.call(i,t);if(n===!1)return i;i.cache.toggle=0;if(typeof i.options.hide.effect.type=="function")i.options.hide.effect.type.call(i.elements.tooltip,i.options.hide.effect.length),i.elements.tooltip.queue(function(){r(),e(this).dequeue()});else{switch(i.options.hide.effect.type.toLowerCase()){case"fade":i.elements.tooltip.fadeOut(i.options.hide.effect.length,r);break;case"slide":i.elements.tooltip.slideUp(i.options.hide.effect.length,r);break;case"grow":i.elements.tooltip.hide(i.options.hide.effect.length,r);break;default:i.elements.tooltip.hide(null,r)}i.elements.tooltip.removeClass(i.options.style.classes.active)}return e.fn.qtip.log.error.call(i,1,e.fn.qtip.constants.EVENT_HIDDEN,"hide")},updatePosition:function(t,n){var r,s,o,u,a,f,l,h,p,d,v,m,y,b;if(!i.status.rendered)return e.fn.qtip.log.error.call(i,2,e.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"updatePosition");if(i.options.position.type=="static")return e.fn.qtip.log.error.call(i,1,e.fn.qtip.constants.CANNOT_POSITION_STATIC,"updatePosition");s={position:{left:0,top:0},dimensions:{height:0,width:0},corner:i.options.position.corner.target},o={position:i.getPosition(),dimensions:i.getDimensions(),corner:i.options.position.corner.tooltip};if(i.options.position.target!=="mouse"){if(i.options.position.target.get(0).nodeName.toLowerCase()=="area"){u=i.options.position.target.attr("coords").split(",");for(r=0;r<u.length;r++)u[r]=parseInt(u[r]);a=i.options.position.target.parent("map").attr("name"),f=e('img[usemap="#'+a+'"]:first').offset(),s.position={left:Math.floor(f.left+u[0]),top:Math.floor(f.top+u[1])};switch(i.options.position.target.attr("shape").toLowerCase()){case"rect":s.dimensions={width:Math.ceil(Math.abs(u[2]-u[0])),height:Math.ceil(Math.abs(u[3]-u[1]))};break;case"circle":s.dimensions={width:u[2]+1,height:u[2]+1};break;case"poly":s.dimensions={width:u[0],height:u[1]};for(r=0;r<u.length;r++)r%2==0?(u[r]>s.dimensions.width&&(s.dimensions.width=u[r]),u[r]<u[0]&&(s.position.left=Math.floor(f.left+u[r]))):(u[r]>s.dimensions.height&&(s.dimensions.height=u[r]),u[r]<u[1]&&(s.position.top=Math.floor(f.top+u[r])));s.dimensions.width=s.dimensions.width-(s.position.left-f.left),s.dimensions.height=s.dimensions.height-(s.position.top-f.top);break;default:return e.fn.qtip.log.error.call(i,4,e.fn.qtip.constants.INVALID_AREA_SHAPE,"updatePosition")}s.dimensions.width-=2,s.dimensions.height-=2}else i.options.position.target.add(document.body).length===1?(s.position={left:e(document).scrollLeft(),top:e(document).scrollTop()},s.dimensions={height:e(window).height(),width:e(window).width()}):(typeof i.options.position.target.attr("qtip")!="undefined"?s.position=i.options.position.target.qtip("api").cache.position:s.position=i.options.position.target.offset(),s.dimensions={height:i.options.position.target.outerHeight(),width:i.options.position.target.outerWidth()});l=e.extend({},s.position),s.corner.search(/right/i)!==-1&&(l.left+=s.dimensions.width),s.corner.search(/bottom/i)!==-1&&(l.top+=s.dimensions.height),s.corner.search(/((top|bottom)Middle)|center/)!==-1&&(l.left+=s.dimensions.width/2),s.corner.search(/((left|right)Middle)|center/)!==-1&&(l.top+=s.dimensions.height/2)}else s.position=l={left:i.cache.mouse.x,top:i.cache.mouse.y},s.dimensions={height:1,width:1};o.corner.search(/right/i)!==-1&&(l.left-=o.dimensions.width),o.corner.search(/bottom/i)!==-1&&(l.top-=o.dimensions.height),o.corner.search(/((top|bottom)Middle)|center/)!==-1&&(l.left-=o.dimensions.width/2),o.corner.search(/((left|right)Middle)|center/)!==-1&&(l.top-=o.dimensions.height/2),h=e.browser.msie?1:0,p=e.browser.msie&&parseInt(e.browser.version.charAt(0))===6?1:0,i.options.style.border.radius>0&&(o.corner.search(/Left/)!==-1?l.left-=i.options.style.border.radius:o.corner.search(/Right/)!==-1&&(l.left+=i.options.style.border.radius),o.corner.search(/Top/)!==-1?l.top-=i.options.style.border.radius:o.corner.search(/Bottom/)!==-1&&(l.top+=i.options.style.border.radius)),h&&(o.corner.search(/top/)!==-1?l.top-=h:o.corner.search(/bottom/)!==-1&&(l.top+=h),o.corner.search(/left/)!==-1?l.left-=h:o.corner.search(/right/)!==-1&&(l.left+=h),o.corner.search(/leftMiddle|rightMiddle/)!==-1&&(l.top-=1)),i.options.position.adjust.screen===!0&&(l=c.call(i,l,s,o)),i.options.position.target==="mouse"&&i.options.position.adjust.mouse===!0&&(i.options.position.adjust.screen===!0&&i.elements.tip?v=i.elements.tip.attr("rel"):v=i.options.position.corner.tooltip,l.left+=v.search(/right/i)!==-1?-6:6,l.top+=v.search(/bottom/i)!==-1?-6:6),!i.elements.bgiframe&&e.browser.msie&&parseInt(e.browser.version.charAt(0))==6&&e("select, object").each(function(){m=e(this).offset(),m.bottom=m.top+e(this).height(),m.right=m.left+e(this).width(),l.top+o.dimensions.height>=m.top&&l.left+o.dimensions.width>=m.left&&g.call(i)}),l.left+=i.options.position.adjust.x,l.top+=i.options.position.adjust.y,y=i.getPosition();if(l.left!=y.left||l.top!=y.top){b=i.beforePositionUpdate.call(i,t);if(b===!1)return i;i.cache.position=l,n===!0?(i.status.animated=!0,i.elements.tooltip.animate(l,200,"swing",function(){i.status.animated=!1})):i.elements.tooltip.css(l),i.onPositionUpdate.call(i,t),typeof t!="undefined"&&t.type&&t.type!=="mousemove"&&e.fn.qtip.log.error.call(i,1,e.fn.qtip.constants.EVENT_POSITION_UPDATED,"updatePosition")}return i},updateWidth:function(t){var n;return i.status.rendered?t&&typeof t!="number"?e.fn.qtip.log.error.call(i,2,"newWidth must be of type number","updateWidth"):(n=i.elements.contentWrapper.siblings().add(i.elements.tip).add(i.elements.button),t||(typeof i.options.style.width.value=="number"?t=i.options.style.width.value:(i.elements.tooltip.css({width:"auto"}),n.hide(),e.browser.msie&&i.elements.wrapper.add(i.elements.contentWrapper.children()).css({zoom:"normal"}),t=i.getDimensions().width+1,i.options.style.width.value||(t>i.options.style.width.max&&(t=i.options.style.width.max),t<i.options.style.width.min&&(t=i.options.style.width.min)))),t%2!==0&&(t-=1),i.elements.tooltip.width(t),n.show(),i.options.style.border.radius&&i.elements.tooltip.find(".qtip-betweenCorners").each(function(n){e(this).width(t-i.options.style.border.radius*2)}),e.browser.msie&&(i.elements.wrapper.add(i.elements.contentWrapper.children()).css({zoom:"1"}),i.elements.wrapper.width(t),i.elements.bgiframe&&i.elements.bgiframe.width(t).height(i.getDimensions.height)),e.fn.qtip.log.error.call(i,1,e.fn.qtip.constants.EVENT_WIDTH_UPDATED,"updateWidth")):e.fn.qtip.log.error.call(i,2,e.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"updateWidth")},updateStyle:function(t){var n,r,o,a,f;return i.status.rendered?typeof t!="string"||!e.fn.qtip.styles[t]?e.fn.qtip.log.error.call(i,2,e.fn.qtip.constants.STYLE_NOT_DEFINED,"updateStyle"):(i.options.style=d.call(i,e.fn.qtip.styles[t],i.options.user.style),i.elements.content.css(h(i.options.style)),i.options.content.title.text!==!1&&i.elements.title.css(h(i.options.style.title,!0)),i.elements.contentWrapper.css({borderColor:i.options.style.border.color}),i.options.style.tip.corner!==!1&&(e("<canvas>").get(0).getContext?(n=i.elements.tooltip.find(".qtip-tip canvas:first"),o=n.get(0).getContext("2d"),o.clearRect(0,0,300,300),a=n.parent("div[rel]:first").attr("rel"),f=v(a,i.options.style.tip.size.width,i.options.style.tip.size.height),u.call(i,n,f,i.options.style.tip.color||i.options.style.border.color)):e.browser.msie&&(n=i.elements.tooltip.find('.qtip-tip [nodeName="shape"]'),n.attr("fillcolor",i.options.style.tip.color||i.options.style.border.color))),i.options.style.border.radius>0&&(i.elements.tooltip.find(".qtip-betweenCorners").css({backgroundColor:i.options.style.border.color}),e("<canvas>").get(0).getContext?(r=m(i.options.style.border.radius),i.elements.tooltip.find(".qtip-wrapper canvas").each(function(){o=e(this).get(0).getContext("2d"),o.clearRect(0,0,300,300),a=e(this).parent("div[rel]:first").attr("rel"),s.call(i,e(this),r[a],i.options.style.border.radius,i.options.style.border.color)})):e.browser.msie&&i.elements.tooltip.find('.qtip-wrapper [nodeName="arc"]').each(function(){e(this).attr("fillcolor",i.options.style.border.color)})),e.fn.qtip.log.error.call(i,1,e.fn.qtip.constants.EVENT_STYLE_UPDATED,"updateStyle")):e.fn.qtip.log.error.call(i,2,e.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"updateStyle")},updateContent:function(t,n){function u(){i.updateWidth(),n!==!1&&(i.options.position.type!=="static"&&i.updatePosition(i.elements.tooltip.is(":visible"),!0),i.options.style.tip.corner!==!1&&a.call(i))}var r,s,o;if(!i.status.rendered)return e.fn.qtip.log.error.call(i,2,e.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"updateContent");if(!t)return e.fn.qtip.log.error.call(i,2,e.fn.qtip.constants.NO_CONTENT_PROVIDED,"updateContent");r=i.beforeContentUpdate.call(i,t);if(typeof r=="string")t=r;else if(r===!1)return;return e.browser.msie&&i.elements.contentWrapper.children().css({zoom:"normal"}),t.jquery&&t.length>0?t.clone(!0).appendTo(i.elements.content).show():i.elements.content.html(t),s=i.elements.content.find("img[complete=false]"),s.length>0?(o=0,s.each(function(t){e('<img src="'+e(this).attr("src")+'" />').load(function(){++o==s.length&&u()})})):u(),i.onContentUpdate.call(i),e.fn.qtip.log.error.call(i,1,e.fn.qtip.constants.EVENT_CONTENT_UPDATED,"loadContent")},loadContent:function(t,n,r){function o(t){i.onContentLoad.call(i),e.fn.qtip.log.error.call(i,1,e.fn.qtip.constants.EVENT_CONTENT_LOADED,"loadContent"),i.updateContent(t)}var s;return i.status.rendered?(s=i.beforeContentLoad.call(i),s===!1?i:(r=="post"?e.post(t,n,o):e.get(t,n,o),i)):e.fn.qtip.log.error.call(i,2,e.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"loadContent")},updateTitle:function(t){return i.status.rendered?t?(returned=i.beforeTitleUpdate.call(i),returned===!1?i:(i.elements.button&&(i.elements.button=i.elements.button.clone(!0)),i.elements.title.html(t),i.elements.button&&i.elements.title.prepend(i.elements.button),i.onTitleUpdate.call(i),e.fn.qtip.log.error.call(i,1,e.fn.qtip.constants.EVENT_TITLE_UPDATED,"updateTitle"))):e.fn.qtip.log.error.call(i,2,e.fn.qtip.constants.NO_CONTENT_PROVIDED,"updateTitle"):e.fn.qtip.log.error.call(i,2,e.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"updateTitle")},focus:function(t){var n,r,s,o;if(!i.status.rendered)return e.fn.qtip.log.error.call(i,2,e.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"focus");if(i.options.position.type=="static")return e.fn.qtip.log.error.call(i,1,e.fn.qtip.constants.CANNOT_FOCUS_STATIC,"focus");n=parseInt(i.elements.tooltip.css("z-index")),r=6e3+e("div.qtip[qtip]").length-1;if(!i.status.focused&&n!==r){o=i.beforeFocus.call(i,t);if(o===!1)return i;e("div.qtip[qtip]").not(i.elements.tooltip).each(function(){e(this).qtip("api").status.rendered===!0&&(s=parseInt(e(this).css("z-index")),typeof s=="number"&&s>-1&&e(this).css({zIndex:parseInt(e(this).css("z-index"))-1}),e(this).qtip("api").status.focused=!1)}),i.elements.tooltip.css({zIndex:r}),i.status.focused=!0,i.onFocus.call(i,t),e.fn.qtip.log.error.call(i,1,e.fn.qtip.constants.EVENT_FOCUSED,"focus")}return i},disable:function(t){return i.status.rendered?(t?i.status.disabled?e.fn.qtip.log.error.call(i,1,e.fn.qtip.constants.TOOLTIP_ALREADY_DISABLED,"disable"):(i.status.disabled=!0,e.fn.qtip.log.error.call(i,1,e.fn.qtip.constants.EVENT_DISABLED,"disable")):i.status.disabled?(i.status.disabled=!1,e.fn.qtip.log.error.call(i,1,e.fn.qtip.constants.EVENT_ENABLED,"disable")):e.fn.qtip.log.error.call(i,1,e.fn.qtip.constants.TOOLTIP_ALREADY_ENABLED,"disable"),i):e.fn.qtip.log.error.call(i,2,e.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"disable")},destroy:function(){var t,n,r;n=i.beforeDestroy.call(i);if(n===!1)return i;i.status.rendered?(i.options.show.when.target.unbind("mousemove.qtip",i.updatePosition),i.options.show.when.target.unbind("mouseout.qtip",i.hide),i.options.show.when.target.unbind(i.options.show.when.event+".qtip"),i.options.hide.when.target.unbind(i.options.hide.when.event+".qtip"),i.elements.tooltip.unbind(i.options.hide.when.event+".qtip"),i.elements.tooltip.unbind("mouseover.qtip",i.focus),i.elements.tooltip.remove()):i.options.show.when.target.unbind(i.options.show.when.event+".qtip-create");if(typeof i.elements.target.data("qtip")=="object"){r=i.elements.target.data("qtip").interfaces;if(typeof r=="object"&&r.length>0)for(t=0;t<r.length-1;t++)r[t].id==i.id&&r.splice(t,1)}return delete e.fn.qtip.interfaces[i.id],typeof r=="object"&&r.length>0?i.elements.target.data("qtip").current=r.length-1:i.elements.target.removeData("qtip"),i.onDestroy.call(i),e.fn.qtip.log.error.call(i,1,e.fn.qtip.constants.EVENT_DESTROYED,"destroy"),i.elements.target},getPosition:function(){var t,n;return i.status.rendered?(t=i.elements.tooltip.css("display")!=="none"?!1:!0,t&&i.elements.tooltip.css({visiblity:"hidden"}).show(),n=i.elements.tooltip.offset(),t&&i.elements.tooltip.css({visiblity:"visible"}).hide(),n):e.fn.qtip.log.error.call(i,2,e.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"getPosition")},getDimensions:function(){var t,n;return i.status.rendered?(t=i.elements.tooltip.is(":visible")?!1:!0,t&&i.elements.tooltip.css({visiblity:"hidden"}).show(),n={height:i.elements.tooltip.outerHeight(),width:i.elements.tooltip.outerWidth()},t&&i.elements.tooltip.css({visiblity:"visible"}).hide(),n):e.fn.qtip.log.error.call(i,2,e.fn.qtip.constants.TOOLTIP_NOT_RENDERED,"getDimensions")}})}function n(){var t,n,i,s,u,a,c;t=this,t.beforeRender.call(t),t.status.rendered=!0,t.elements.tooltip='<div qtip="'+t.id+'" '+'class="qtip '+(t.options.style.classes.tooltip||t.options.style)+'"'+'style="display:none; -moz-border-radius:0; -webkit-border-radius:0; border-radius:0;'+"position:"+t.options.position.type+';">'+'  <div class="qtip-wrapper" style="position:relative; overflow:hidden; text-align:left;">'+'    <div class="qtip-contentWrapper" style="overflow:hidden;">'+'       <div class="qtip-content '+t.options.style.classes.content+'"></div>'+"</div></div></div>",t.elements.tooltip=e(t.elements.tooltip),t.elements.tooltip.appendTo(t.options.position.container),t.elements.tooltip.data("qtip",{current:0,interfaces:[t]}),t.elements.wrapper=t.elements.tooltip.children("div:first"),t.elements.contentWrapper=t.elements.wrapper.children("div:first").css({background:t.options.style.background}),t.elements.content=t.elements.contentWrapper.children("div:first").css(h(t.options.style)),e.browser.msie&&t.elements.wrapper.add(t.elements.content).css({zoom:1}),t.options.hide.when.event=="unfocus"&&t.elements.tooltip.attr("unfocus",!0),typeof t.options.style.width.value=="number"&&t.updateWidth(),e("<canvas>").get(0).getContext||e.browser.msie?(t.options.style.border.radius>0?r.call(t):t.elements.contentWrapper.css({border:t.options.style.border.width+"px solid "+t.options.style.border.color}),t.options.style.tip.corner!==!1&&o.call(t)):(t.elements.contentWrapper.css({border:t.options.style.border.width+"px solid "+t.options.style.border.color}),t.options.style.border.radius=0,t.options.style.tip.corner=!1,e.fn.qtip.log.error.call(t,2,e.fn.qtip.constants.CANVAS_VML_NOT_SUPPORTED,"render")),typeof t.options.content.text=="string"&&t.options.content.text.length>0||t.options.content.text.jquery&&t.options.content.text.length>0?i=t.options.content.text:typeof t.elements.target.attr("title")=="string"&&t.elements.target.attr("title").length>0?(i=t.elements.target.attr("title").replace("\\n","<br />"),t.elements.target.attr("title","")):typeof t.elements.target.attr("alt")=="string"&&t.elements.target.attr("alt").length>0?(i=t.elements.target.attr("alt").replace("\\n","<br />"),t.elements.target.attr("alt","")):(i=" ",e.fn.qtip.log.error.call(t,1,e.fn.qtip.constants.NO_VALID_CONTENT,"render")),t.options.content.title.text!==!1&&f.call(t),t.updateContent(i),l.call(t),t.options.show.ready===!0&&t.show(),t.options.content.url!==!1&&(s=t.options.content.url,u=t.options.content.data,a=t.options.content.method||"get",t.loadContent(s,u,a)),t.onRender.call(t),e.fn.qtip.log.error.call(t,1,e.fn.qtip.constants.EVENT_RENDERED,"render")}function r(){var t,n,r,i,o,u,a,f,l,c,h,p,d,v,g;t=this,t.elements.wrapper.find(".qtip-borderBottom, .qtip-borderTop").remove(),r=t.options.style.border.width,i=t.options.style.border.radius,o=t.options.style.border.color||t.options.style.tip.color,u=m(i),a={};for(n in u)a[n]='<div rel="'+n+'" style="'+(n.search(/Left/)!==-1?"left":"right")+":0; "+"position:absolute; height:"+i+"px; width:"+i+'px; overflow:hidden; line-height:0.1px; font-size:1px">',e("<canvas>").get(0).getContext?a[n]+='<canvas height="'+i+'" width="'+i+'" style="vertical-align: top"></canvas>':e.browser.msie&&(f=i*2+3,a[n]+='<v:arc stroked="false" fillcolor="'+o+'" startangle="'+u[n][0]+'" endangle="'+u[n][1]+'" '+'style="width:'+f+"px; height:"+f+"px; margin-top:"+(n.search(/bottom/)!==-1?-2:-1)+"px; "+"margin-left:"+(n.search(/Right/)!==-1?u[n][2]-3.5:-1)+"px; "+'vertical-align:top; display:inline-block; behavior:url(#default#VML)"></v:arc>'),a[n]+="</div>";l=t.getDimensions().width-Math.max(r,i)*2,c='<div class="qtip-betweenCorners" style="height:'+i+"px; width:"+l+"px; "+"overflow:hidden; background-color:"+o+'; line-height:0.1px; font-size:1px;">',h='<div class="qtip-borderTop" dir="ltr" style="height:'+i+"px; "+"margin-left:"+i+'px; line-height:0.1px; font-size:1px; padding:0;">'+a.topLeft+a.topRight+c,t.elements.wrapper.prepend(h),p='<div class="qtip-borderBottom" dir="ltr" style="height:'+i+"px; "+"margin-left:"+i+'px; line-height:0.1px; font-size:1px; padding:0;">'+a.bottomLeft+a.bottomRight+c,t.elements.wrapper.append(p),e("<canvas>").get(0).getContext?t.elements.wrapper.find("canvas").each(function(){d=u[e(this).parent("[rel]:first").attr("rel")],s.call(t,e(this),d,i,o)}):e.browser.msie&&t.elements.tooltip.append('<v:image style="behavior:url(#default#VML);"></v:image>'),v=Math.max(i,i+(r-i)),g=Math.max(r-i,0),t.elements.contentWrapper.css({border:"0px solid "+o,borderWidth:g+"px "+v+"px"})}function s(e,t,n,r){var i=e.get(0).getContext("2d");i.fillStyle=r,i.beginPath(),i.arc(t[0],t[1],n,0,Math.PI*2,!1),i.fill()}function o(t){var n,r,i,s,o;n=this,n.elements.tip!==null&&n.elements.tip.remove(),r=n.options.style.tip.color||n.options.style.border.color;if(n.options.style.tip.corner===!1)return;t||(t=n.options.style.tip.corner),i=v(t,n.options.style.tip.size.width,n.options.style.tip.size.height),n.elements.tip='<div class="'+n.options.style.classes.tip+'" dir="ltr" rel="'+t+'" style="position:absolute; '+"height:"+n.options.style.tip.size.height+"px; width:"+n.options.style.tip.size.width+"px; "+'margin:0 auto; line-height:0.1px; font-size:1px;">',e("<canvas>").get(0).getContext?n.elements.tip+='<canvas height="'+n.options.style.tip.size.height+'" width="'+n.options.style.tip.size.width+'"></canvas>':e.browser.msie&&(s=n.options.style.tip.size.width+","+n.options.style.tip.size.height,o="m"+i[0][0]+","+i[0][1],o+=" l"+i[1][0]+","+i[1][1],o+=" "+i[2][0]+","+i[2][1],o+=" xe",n.elements.tip+='<v:shape fillcolor="'+r+'" stroked="false" filled="true" path="'+o+'" coordsize="'+s+'" '+'style="width:'+n.options.style.tip.size.width+"px; height:"+n.options.style.tip.size.height+"px; "+"line-height:0.1px; display:inline-block; behavior:url(#default#VML); "+"vertical-align:"+(t.search(/top/)!==-1?"bottom":"top")+'"></v:shape>',n.elements.tip+='<v:image style="behavior:url(#default#VML);"></v:image>',n.elements.contentWrapper.css("position","relative")),n.elements.tooltip.prepend(n.elements.tip+"</div>"),n.elements.tip=n.elements.tooltip.find("."+n.options.style.classes.tip).eq(0),e("<canvas>").get(0).getContext&&u.call(n,n.elements.tip.find("canvas:first"),i,r),t.search(/top/)!==-1&&e.browser.msie&&parseInt(e.browser.version.charAt(0))===6&&n.elements.tip.css({marginTop:-4}),a.call(n,t)}function u(e,t,n){var r=e.get(0).getContext("2d");r.fillStyle=n,r.beginPath(),r.moveTo(t[0][0],t[0][1]),r.lineTo(t[1][0],t[1][1]),r.lineTo(t[2][0],t[2][1]),r.fill()}function a(t){var n,r,i,s,o;n=this;if(n.options.style.tip.corner===!1||!n.elements.tip)return;t||(t=n.elements.tip.attr("rel")),r=positionAdjust=e.browser.msie?1:0,n.elements.tip.css(t.match(/left|right|top|bottom/)[0],0),t.search(/top|bottom/)!==-1?(e.browser.msie&&(parseInt(e.browser.version.charAt(0))===6?positionAdjust=t.search(/top/)!==-1?-3:1:positionAdjust=t.search(/top/)!==-1?1:2),t.search(/Middle/)!==-1?n.elements.tip.css({left:"50%",marginLeft:-(n.options.style.tip.size.width/2)}):t.search(/Left/)!==-1?n.elements.tip.css({left:n.options.style.border.radius-r}):t.search(/Right/)!==-1&&n.elements.tip.css({right:n.options.style.border.radius+r}),t.search(/top/)!==-1?n.elements.tip.css({top:-positionAdjust}):n.elements.tip.css({bottom:positionAdjust})):t.search(/left|right/)!==-1&&(e.browser.msie&&(positionAdjust=parseInt(e.browser.version.charAt(0))===6?1:t.search(/left/)!==-1?1:2),t.search(/Middle/)!==-1?n.elements.tip.css({top:"50%",marginTop:-(n.options.style.tip.size.height/2)}):t.search(/Top/)!==-1?n.elements.tip.css({top:n.options.style.border.radius-r}):t.search(/Bottom/)!==-1&&n.elements.tip.css({bottom:n.options.style.border.radius+r}),t.search(/left/)!==-1?n.elements.tip.css({left:-positionAdjust}):n.elements.tip.css({right:positionAdjust})),i="padding-"+t.match(/left|right|top|bottom/)[0],s=n.options.style.tip.size[i.search(/left|right/)!==-1?"width":"height"],n.elements.tooltip.css("padding",0),n.elements.tooltip.css(i,s),e.browser.msie&&parseInt(e.browser.version.charAt(0))==6&&(o=parseInt(n.elements.tip.css("margin-top"))||0,o+=parseInt(n.elements.content.css("margin-top"))||0,n.elements.tip.css({marginTop:o}))}function f(){var t=this;t.elements.title!==null&&t.elements.title.remove(),t.elements.title=e('<div class="'+t.options.style.classes.title+'">').css(h(t.options.style.title,!0)).css({zoom:e.browser.msie?1:0}).prependTo(t.elements.contentWrapper),t.options.content.title.text&&t.updateTitle.call(t,t.options.content.title.text),t.options.content.title.button!==!1&&typeof t.options.content.title.button=="string"&&(t.elements.button=e('<a class="'+t.options.style.classes.button+'" style="float:right; position: relative"></a>').css(h(t.options.style.button,!0)).html(t.options.content.title.button).prependTo(t.elements.title).click(function(e){t.status.disabled||t.hide(e)}))}function l(){function o(n){if(t.status.disabled===!0)return;t.options.hide.when.event=="inactive"&&(e(i).each(function(){r.bind(this+".qtip-inactive",s),t.elements.content.bind(this+".qtip-inactive",s)}),s()),clearTimeout(t.timers.show),clearTimeout(t.timers.hide),t.timers.show=setTimeout(function(){t.show(n)},t.options.show.delay)}function u(n){if(t.status.disabled===!0)return;if(t.options.hide.fixed===!0&&t.options.hide.when.event.search(/mouse(out|leave)/i)!==-1&&e(n.relatedTarget).parents("div.qtip[qtip]").length>0)return n.stopPropagation(),n.preventDefault(),clearTimeout(t.timers.hide),!1;clearTimeout(t.timers.show),clearTimeout(t.timers.hide),t.elements.tooltip.stop(!0,!0),t.timers.hide=setTimeout(function(){t.hide(n)},t.options.hide.delay)}var t,n,r,i;t=this,n=t.options.show.when.target,r=t.options.hide.when.target,t.options.hide.fixed&&(r=r.add(t.elements.tooltip));if(t.options.hide.when.event=="inactive"){i=["click","dblclick","mousedown","mouseup","mousemove","mouseout","mouseenter","mouseleave","mouseover"];function s(n){if(t.status.disabled===!0)return;clearTimeout(t.timers.inactive),t.timers.inactive=setTimeout(function(){e(i).each(function(){r.unbind(this+".qtip-inactive"),t.elements.content.unbind(this+".qtip-inactive")}),t.hide(n)},t.options.hide.delay)}}else t.options.hide.fixed===!0&&t.elements.tooltip.bind("mouseover.qtip",function(){if(t.status.disabled===!0)return;clearTimeout(t.timers.hide)});t.options.show.when.target.add(t.options.hide.when.target).length===1&&t.options.show.when.event==t.options.hide.when.event&&t.options.hide.when.event!=="inactive"||t.options.hide.when.event=="unfocus"?(t.cache.toggle=0,n.bind(t.options.show.when.event+".qtip",function(e){t.cache.toggle==0?o(e):u(e)})):(n.bind(t.options.show.when.event+".qtip",o),t.options.hide.when.event!=="inactive"&&r.bind(t.options.hide.when.event+".qtip",u)),t.options.position.type.search(/(fixed|absolute)/)!==-1&&t.elements.tooltip.bind("mouseover.qtip",t.focus),t.options.position.target==="mouse"&&t.options.position.type!=="static"&&n.bind("mousemove.qtip",function(e){t.cache.mouse={x:e.pageX,y:e.pageY},t.status.disabled===!1&&t.options.position.adjust.mouse===!0&&t.options.position.type!=="static"&&t.elements.tooltip.css("display")!=="none"&&t.updatePosition(e)})}function c(t,n,r){var i,s,u,a,f,l;return i=this,r.corner=="center"?n.position:(s=e.extend({},t),a={x:!1,y:!1},f={left:s.left<e.fn.qtip.cache.screen.scroll.left,right:s.left+r.dimensions.width+2>=e.fn.qtip.cache.screen.width+e.fn.qtip.cache.screen.scroll.left,top:s.top<e.fn.qtip.cache.screen.scroll.top,bottom:s.top+r.dimensions.height+2>=e.fn.qtip.cache.screen.height+e.fn.qtip.cache.screen.scroll.top},u={left:f.left&&(r.corner.search(/right/i)!=-1||r.corner.search(/right/i)==-1&&!f.right),right:f.right&&(r.corner.search(/left/i)!=-1||r.corner.search(/left/i)==-1&&!f.left),top:f.top&&r.corner.search(/top/i)==-1,bottom:f.bottom&&r.corner.search(/bottom/i)==-1},u.left?(i.options.position.target!=="mouse"?s.left=n.position.left+n.dimensions.width:s.left=i.cache.mouse.x,a.x="Left"):u.right&&(i.options.position.target!=="mouse"?s.left=n.position.left-r.dimensions.width:s.left=i.cache.mouse.x-r.dimensions.width,a.x="Right"),u.top?(i.options.position.target!=="mouse"?s.top=n.position.top+n.dimensions.height:s.top=i.cache.mouse.y,a.y="top"):u.bottom&&(i.options.position.target!=="mouse"?s.top=n.position.top-r.dimensions.height:s.top=i.cache.mouse.y-r.dimensions.height,a.y="bottom"),s.left<0&&(s.left=t.left,a.x=!1),s.top<0&&(s.top=t.top,a.y=!1),i.options.style.tip.corner!==!1&&(s.corner=new String(r.corner),a.x!==!1&&(s.corner=s.corner.replace(/Left|Right|Middle/,a.x)),a.y!==!1&&(s.corner=s.corner.replace(/top|bottom/,a.y)),s.corner!==i.elements.tip.attr("rel")&&o.call(i,s.corner)),s)}function h(t,n){var r,i;r=e.extend(!0,{},t);for(i in r)n===!0&&i.search(/(tip|classes)/i)!==-1?delete r[i]:!n&&i.search(/(width|border|tip|title|classes|user)/i)!==-1&&delete r[i];return r}function p(e){return typeof e.tip!="object"&&(e.tip={corner:e.tip}),typeof e.tip.size!="object"&&(e.tip.size={width:e.tip.size,height:e.tip.size}),typeof e.border!="object"&&(e.border={width:e.border}),typeof e.width!="object"&&(e.width={value:e.width}),typeof e.width.max=="string"&&(e.width.max=parseInt(e.width.max.replace(/([0-9]+)/i,"$1"))),typeof e.width.min=="string"&&(e.width.min=parseInt(e.width.min.replace(/([0-9]+)/i,"$1"))),typeof e.tip.size.x=="number"&&(e.tip.size.width=e.tip.size.x,delete e.tip.size.x),typeof e.tip.size.y=="number"&&(e.tip.size.height=e.tip.size.y,delete e.tip.size.y),e}function d(){var t,n,r,i,s,o;t=this,r=[!0,{}];for(n=0;n<arguments.length;n++)r.push(arguments[n]);i=[e.extend.apply(e,r)];while(typeof i[0].name=="string")i.unshift(p(e.fn.qtip.styles[i[0].name]));return i.unshift(!0,{classes:{tooltip:"qtip-"+(arguments[0].name||"defaults")}},e.fn.qtip.styles.defaults),s=e.extend.apply(e,i),o=e.browser.msie?1:0,s.tip.size.width+=o,s.tip.size.height+=o,s.tip.size.width%2>0&&(s.tip.size.width+=1),s.tip.size.height%2>0&&(s.tip.size.height+=1),s.tip.corner===!0&&(s.tip.corner=t.options.position.corner.tooltip==="center"?!1:t.options.position.corner.tooltip),s}function v(e,t,n){var r={bottomRight:[[0,0],[t,n],[t,0]],bottomLeft:[[0,0],[t,0],[0,n]],topRight:[[0,n],[t,0],[t,n]],topLeft:[[0,0],[0,n],[t,n]],topMiddle:[[0,n],[t/2,0],[t,n]],bottomMiddle:[[0,0],[t,0],[t/2,n]],rightMiddle:[[0,0],[t,n/2],[0,n]],leftMiddle:[[t,0],[t,n],[0,n/2]]};return r.leftTop=r.bottomRight,r.rightTop=r.bottomLeft,r.leftBottom=r.topRight,r.rightBottom=r.topLeft,r[e]}function m(t){var n;return e("<canvas>").get(0).getContext?n={topLeft:[t,t],topRight:[0,t],bottomLeft:[t,0],bottomRight:[0,0]}:e.browser.msie&&(n={topLeft:[-90,90,0],topRight:[-90,90,-t],bottomLeft:[90,270,0],bottomRight:[90,270,-t]}),n}function g(){var e,t,n;e=this,n=e.getDimensions(),t='<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:false" style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=\'0\'); border: 1px solid red; height:'+n.height+"px; width:"+n.width+'px" />',e.elements.bgiframe=e.elements.wrapper.prepend(t).children(".qtip-bgiframe:first")}e.fn.qtip=function(r,i){var s,o,u,a,f,l,c,h;if(typeof r=="string"){typeof e(this).data("qtip")!="object"&&e.fn.qtip.log.error.call(self,1,e.fn.qtip.constants.NO_TOOLTIP_PRESENT,!1);if(r=="api")return e(this).data("qtip").interfaces[e(this).data("qtip").current];if(r=="interfaces")return e(this).data("qtip").interfaces}else{r||(r={});if(typeof r.content!="object"||r.content.jquery&&r.content.length>0)r.content={text:r.content};typeof r.content.title!="object"&&(r.content.title={text:r.content.title}),typeof r.position!="object"&&(r.position={corner:r.position}),typeof r.position.corner!="object"&&(r.position.corner={target:r.position.corner,tooltip:r.position.corner}),typeof r.show!="object"&&(r.show={when:r.show}),typeof r.show.when!="object"&&(r.show.when={event:r.show.when}),typeof r.show.effect!="object"&&(r.show.effect={type:r.show.effect}),typeof r.hide!="object"&&(r.hide={when:r.hide}),typeof r.hide.when!="object"&&(r.hide.when={event:r.hide.when}),typeof r.hide.effect!="object"&&(r.hide.effect={type:r.hide.effect}),typeof r.style!="object"&&(r.style={name:r.style}),r.style=p(r.style),a=e.extend(!0,{},e.fn.qtip.defaults,r),a.style=d.call({options:a},a.style),a.user=e.extend(!0,{},r)}return e(this).each(function(){if(typeof r=="string"){l=r.toLowerCase(),u=e(this).qtip("interfaces");if(typeof u=="object")if(i===!0&&l=="destroy")while(u.length>0)u[u.length-1].destroy();else{i!==!0&&(u=[e(this).qtip("api")]);for(s=0;s<u.length;s++)l=="destroy"?u[s].destroy():u[s].status.rendered===!0&&(l=="show"?u[s].show():l=="hide"?u[s].hide():l=="focus"?u[s].focus():l=="disable"?u[s].disable(!0):l=="enable"&&u[s].disable(!1))}}else{c=e.extend(!0,{},a),c.hide.effect.length=a.hide.effect.length,c.show.effect.length=a.show.effect.length,c.position.container===!1&&(c.position.container=e(document.body)),c.position.target===!1&&(c.position.target=e(this)),c.show.when.target===!1&&(c.show.when.target=e(this)),c.hide.when.target===!1&&(c.hide.when.target=e(this)),o=e.fn.qtip.interfaces.length;for(s=0;s<o;s++)if(typeof e.fn.qtip.interfaces[s]=="undefined"){o=s;break}f=new t(e(this),c,o),e.fn.qtip.interfaces[o]=f,typeof e(this).data("qtip")=="object"?(typeof e(this).attr("qtip")=="undefined"&&(e(this).data("qtip").current=e(this).data("qtip").interfaces.length),e(this).data("qtip").interfaces.push(f)):e(this).data("qtip",{current:0,interfaces:[f]}),c.content.prerender===!1&&c.show.when.event!==!1&&c.show.ready!==!0?c.show.when.target.bind(c.show.when.event+".qtip-"+o+"-create",{qtip:o},function(t){h=e.fn.qtip.interfaces[t.data.qtip],h.options.show.when.target.unbind(h.options.show.when.event+".qtip-"+t.data.qtip+"-create"),h.cache.mouse={x:t.pageX,y:t.pageY},n.call(h),h.options.show.when.target.trigger(h.options.show.when.event)}):(f.cache.mouse={x:c.show.when.target.offset().left,y:c.show.when.target.offset().top},n.call(f))}})},e(document).ready(function(){e.fn.qtip.cache={screen:{scroll:{left:e(window).scrollLeft(),top:e(window).scrollTop()},width:e(window).width(),height:e(window).height()}};var t;e(window).bind("resize scroll",function(n){clearTimeout(t),t=setTimeout(function(){n.type==="scroll"?e.fn.qtip.cache.screen.scroll={left:e(window).scrollLeft(),top:e(window).scrollTop()}:(e.fn.qtip.cache.screen.width=e(window).width(),e.fn.qtip.cache.screen.height=e(window).height());for(i=0;i<e.fn.qtip.interfaces.length;i++){var t=e.fn.qtip.interfaces[i];t.status.rendered===!0&&(t.options.position.type!=="static"||t.options.position.adjust.scroll&&n.type==="scroll"||t.options.position.adjust.resize&&n.type==="resize")&&t.updatePosition(n,!0)}},100)}),e(document).bind("mousedown.qtip",function(t){e(t.target).parents("div.qtip").length===0&&e(".qtip[unfocus]").each(function(){var n=e(this).qtip("api");e(this).is(":visible")&&!n.status.disabled&&e(t.target).add(n.elements.target).length>1&&n.hide(t)})})}),e.fn.qtip.interfaces=[],e.fn.qtip.log={error:function(){return this}},e.fn.qtip.constants={},e.fn.qtip.defaults={content:{prerender:!1,text:!1,url:!1,data:null,title:{text:!1,button:!1}},position:{target:!1,corner:{target:"bottomRight",tooltip:"topLeft"},adjust:{x:0,y:0,mouse:!0,screen:!1,scroll:!0,resize:!0},type:"absolute",container:!1},show:{when:{target:!1,event:"mouseover"},effect:{type:"fade",length:100},delay:140,solo:!1,ready:!1},hide:{when:{target:!1,event:"mouseout"},effect:{type:"fade",length:100},delay:0,fixed:!1},api:{beforeRender:function(){},onRender:function(){},beforePositionUpdate:function(){},onPositionUpdate:function(){},beforeShow:function(){},onShow:function(){},beforeHide:function(){},onHide:function(){},beforeContentUpdate:function(){},onContentUpdate:function(){},beforeContentLoad:function(){},onContentLoad:function(){},beforeTitleUpdate:function(){},onTitleUpdate:function(){},beforeDestroy:function(){},onDestroy:function(){},beforeFocus:function(){},onFocus:function(){}}},e.fn.qtip.styles={defaults:{background:"white",color:"#111",overflow:"hidden",textAlign:"left",width:{min:0,max:250},padding:"5px 9px",border:{width:1,radius:0,color:"#d3d3d3"},tip:{corner:!1,color:!1,size:{width:13,height:13},opacity:1},title:{background:"#e1e1e1",fontWeight:"bold",padding:"7px 12px"},button:{cursor:"pointer"},classes:{target:"",tip:"qtip-tip",title:"qtip-title",button:"qtip-button",content:"qtip-content",active:"qtip-active"}},cream:{border:{width:3,radius:0,color:"#F9E98E"},title:{background:"#F0DE7D",color:"#A27D35"},background:"#FBF7AA",color:"#A27D35",classes:{tooltip:"qtip-cream"}},light:{border:{width:3,radius:0,color:"#E2E2E2"},title:{background:"#f1f1f1",color:"#454545"},background:"white",color:"#454545",classes:{tooltip:"qtip-light"}},dark:{border:{width:3,radius:0,color:"#303030"},title:{background:"#404040",color:"#f3f3f3"},background:"#505050",color:"#f3f3f3",classes:{tooltip:"qtip-dark"}},red:{border:{width:3,radius:0,color:"#CE6F6F"},title:{background:"#f28279",color:"#9C2F2F"},background:"#F79992",color:"#9C2F2F",classes:{tooltip:"qtip-red"}},green:{border:{width:3,radius:0,color:"#A9DB66"},title:{background:"#b9db8c",color:"#58792E"},background:"#CDE6AC",color:"#58792E",classes:{tooltip:"qtip-green"}},blue:{border:{width:3,radius:0,color:"#ADD9ED"},title:{background:"#D0E9F5",color:"#5E99BD"},background:"#E5F6FE",color:"#4D9FBF",classes:{tooltip:"qtip-blue"}}}})(jQuery);