const RightMenus={defaultEvent:["copyText","copyLink","copyPaste","copyAll","copyCut","copyImg","printMode","readMode"],defaultGroup:["navigation","inputBox","seletctText","elementCheck","elementImage","articlePage"],messageRightMenu:volantis.GLOBAL_CONFIG.plugins.message.enable&&volantis.GLOBAL_CONFIG.plugins.message.rightmenu.enable,corsAnywhere:volantis.GLOBAL_CONFIG.plugins.rightmenus.options.corsAnywhere,urlRegx:/^((https|http)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,imgRegx:/\.(jpe?g|png|webp|svg|gif|jifi)(-|_|!|\?|\/)?.*$/,initialMenu:()=>{RightMenus.fun.init()},readClipboard:async()=>{let e;switch((await navigator.permissions.query({name:"clipboard-read"})).state){case"granted":case"prompt":e=await navigator.clipboard.readText();break;default:window.clipboardRead=!1}return e},writeClipText:e=>navigator.clipboard.writeText(e).then((()=>Promise.resolve())).catch((e=>Promise.reject(e))),writeClipImg:async(e,t,n)=>{const i=new Image;i.crossOrigin="Anonymous",i.addEventListener("load",(()=>{let e=document.createElement("canvas"),o=e.getContext("2d");e.width=i.width,e.height=i.height,o.drawImage(i,0,0),e.toBlob((e=>{navigator.clipboard.write([new ClipboardItem({"image/png":e})]).then((e=>{t(e)})).catch((e=>{n(e)}))}),"image/png")}),!1),i.src=`${e}?(lll￢ω￢)`},insertAtCaret:(e,t)=>{const n=e.selectionStart,i=e.selectionEnd;if(document.selection)e.focus(),document.selection.createRange().text=t,e.focus();else if(n||"0"==n){var o=e.scrollTop;e.value=e.value.substring(0,n)+t+e.value.substring(i,e.value.length),e.focus(),e.selectionStart=n+t.length,e.selectionEnd=n+t.length,e.scrollTop=o}else e.value+=t,e.focus()}};RightMenus.fun=(()=>{const e=volantis.GLOBAL_CONFIG.plugins.rightmenus,t={},n=document.getElementById("rightmenu-wrapper"),i=document.getElementById("rightmenu-content"),o=document.querySelectorAll("#rightmenu-content li.menuLoad-Content"),a=document.querySelectorAll("#rightmenu-content li, #rightmenu-content hr, #menuMusic"),l=document.getElementById("read_bkg"),s=document.getElementById("menuMusic"),r=document.querySelector("#menuMusic .backward"),c=document.querySelector("#menuMusic .toggle"),d=document.querySelector("#menuMusic .forward");let u={mouseEvent:null,isInputBox:!1,selectText:"",inputValue:"",isLink:!1,linkUrl:"",isMediaLink:!1,mediaLinkUrl:"",isImage:!1,isArticle:!1,pathName:"",isReadClipboard:!0,isShowMusic:!1,statusCheck:!1};const m=Object.assign({},u);return t.initEvent=()=>{t.elementAppend(),t.contextmenu(),t.menuEvent()},t.elementAppend=()=>{l&&l.parentNode.removeChild(l);const e=document.createElement("div");e.className="common_read_bkg common_read_hide",e.id="read_bkg",window.document.body.appendChild(e)},t.menuPosition=e=>{try{let o=e.clientX,a=e.clientY,l=document.documentElement.clientWidth||document.body.clientWidth,s=document.documentElement.clientHeight||document.body.clientHeight;n.style.display="block",t.menuControl(e);let r=i.offsetWidth,c=i.offsetHeight,d=o+r>l?o-r+10:o,u=a+c>s?a-c+10:a;u=a+c>s&&u<c&&a<c?u+(s-c-u-10):u,n.style.left=`${d}px`,n.style.top=`${u}px`,volantis.GLOBAL_CONFIG.plugins.message.rightmenu.notice&&t.menuNotic()}catch(e){return console.error(e),t.hideMenu(),!0}return!1},t.menuControl=n=>{t.globalDataSet(n),s&&(s.style.display=u.isShowMusic?"block":"none"),o.forEach((t=>{t.style.display="none";const n=t.firstElementChild.nodeName,i=t.firstElementChild.getAttribute("data-group"),o=t.firstElementChild.getAttribute("data-event");if(u.statusCheck||u.isArticle)switch(i){case"inputBox":u.isInputBox&&(t.style.display="block","copyCut"!==o||u.selectText||(t.style.display="none"),"copyAll"!==o||u.inputValue||(t.style.display="none"),"copyPaste"!==o||u.isReadClipboard||(t.style.display="none"));break;case"seletctText":u.selectText&&(t.style.display="block");break;case"elementCheck":(u.isLink||u.isMediaLink)&&(t.style.display="block");break;case"elementImage":u.isImage&&(t.style.display="block");break;case"articlePage":u.isArticle&&(t.style.display="block");break;default:t.style.display="A"===n?u.isArticle&&!u.statusCheck&&e.options.articleShowLink?"block":"none":"block"}else("A"===n||RightMenus.defaultGroup.every((e=>i!==e)))&&(t.style.display="block")})),volantis.mouseEvent=n,volantis.rightmenu.method.handle.start();let i={item:null,hide:!0};a.forEach((e=>{if("HR"===e.nodeName){if(e.style.display="block",!i.item)return void(i.item=e);(i.hide||"hr"===i.item.nextElementSibling.nodeName)&&(i.item.style.display="none"),i.item=e,i.hide=!0}else"block"===e.style.display&&i.hide&&(i.hide=!1)})),i.item&&i.hide&&(i.item.style.display="none")},t.globalDataSet=t=>{u=Object.assign({},m),u.mouseEvent=t,u.selectText=window.getSelection().toString(),"input"!==t.target.tagName.toLowerCase()&&"textarea"!==t.target.tagName.toLowerCase()||(u.isInputBox=!0,u.inputValue=t.target.value),u.isInputBox&&!1===window.clipboardRead&&(u.isReadClipboard=!1),t.target.href&&RightMenus.urlRegx.test(t.target.href)&&(u.isLink=!0,u.linkUrl=t.target.href),t.target.currentSrc&&RightMenus.urlRegx.test(t.target.currentSrc)&&(u.isMediaLink=!0,u.mediaLinkUrl=t.target.currentSrc),u.isMediaLink&&RightMenus.imgRegx.test(u.mediaLinkUrl)&&(u.isImage=!0),document.querySelector("#post.article")&&(u.isArticle=!0,u.pathName=window.location.pathname),volantis.GLOBAL_CONFIG.plugins.aplayer?.enable&&"undefined"!=typeof RightMenuAplayer&&void 0!==RightMenuAplayer.APlayer.player&&(e.options.musicAlwaysShow||"play"===RightMenuAplayer.APlayer.status||"undefined"===RightMenuAplayer.APlayer.status)&&(u.isShowMusic=!0),(u.selectText||u.isInputBox||u.isLink||u.isMediaLink)&&(u.statusCheck=!0)},t.contextmenu=()=>{window.document.oncontextmenu=e=>e.ctrlKey||document.body.offsetWidth<=500?(t.hideMenu(),!0):t.menuPosition(e),n.oncontextmenu=e=>(e.stopPropagation(),e.preventDefault(),!1),window.removeEventListener("blur",t.hideMenu),window.addEventListener("blur",t.hideMenu),document.body.removeEventListener("click",t.hideMenu),document.body.addEventListener("click",t.hideMenu)},t.menuEvent=()=>{o.forEach((n=>{let i=n.firstElementChild.getAttribute("data-event");const o=n.firstElementChild.getAttribute("id"),a=n.firstElementChild.getAttribute("data-group");"A"!==n.firstElementChild.nodeName&&n.addEventListener("click",(()=>{try{RightMenus.defaultEvent.every((e=>i!==e))?"seletctText"===a?RightMenusFunction[o](u.selectText):"elementCheck"===a?RightMenusFunction[o](u.isLink?u.linkUrl:u.mediaLinkUrl):"elementImage"===a?RightMenusFunction[o](u.mediaLinkUrl):RightMenusFunction[o]():t[i]()}catch(t){"rightMenus"===volantis.GLOBAL_CONFIG.debug&&console.error({id:o,error:t,globalData:u,groupName:a,eventName:i}),RightMenus.messageRightMenu&&VolantisApp.message("错误提示",t,{icon:e.options.iconPrefix+" fa-exclamation-square red",time:"15000"})}}))})),d&&c&&d&&(r.onclick=e=>{e.preventDefault(),e.stopPropagation(),RightMenuAplayer.aplayerBackward()},c.onclick=e=>{e.preventDefault(),e.stopPropagation(),RightMenuAplayer.aplayerToggle()},d.onclick=e=>{e.preventDefault(),e.stopPropagation(),RightMenuAplayer.aplayerForward()})},t.hideMenu=()=>{n.style.display=null,n.style.left=null,n.style.top=null},t.menuNotic=()=>{const t="true"===localStorage.getItem("NoticeRightMenu");RightMenus.messageRightMenu&&!t&&VolantisApp.message("右键菜单","唤醒原系统菜单请使用：<kbd>Ctrl</kbd> + <kbd>右键</kbd>",{icon:e.options.iconPrefix+" fa-exclamation-square red",displayMode:1,time:9e3},(()=>{localStorage.setItem("NoticeRightMenu","true")}))},t.copyText=()=>{VolantisApp.utilWriteClipText(u.selectText).then((()=>{RightMenus.messageRightMenu&&VolantisApp.messageCopyright()})).catch((t=>{RightMenus.messageRightMenu&&VolantisApp.message("系统提示",t,{icon:e.options.iconPrefix+" fa-exclamation-square red",displayMode:1,time:9e3})}))},t.copyLink=()=>{VolantisApp.utilWriteClipText(u.linkUrl||u.mediaLinkUrl).then((()=>{RightMenus.messageRightMenu&&VolantisApp.messageCopyright()})).catch((t=>{RightMenus.messageRightMenu&&VolantisApp.message("系统提示",t,{icon:e.options.iconPrefix+" fa-exclamation-square red",displayMode:1,time:9e3})}))},t.copyAll=()=>{u.mouseEvent.target.select()},t.copyPaste=async()=>{const e=await RightMenus.readClipboard()||"";RightMenus.messageRightMenu&&!1===window.clipboardRead?VolantisApp.message("系统提示","未授予剪切板读取权限！"):RightMenus.messageRightMenu&&""===e?VolantisApp.message("系统提示","仅支持复制文本内容！"):RightMenus.insertAtCaret(u.mouseEvent.target,e)},t.copyCut=()=>{const e=u.mouseEvent.target.selectionStart,n=u.mouseEvent.target.selectionEnd,i=u.inputValue;t.copyText(u.selectText),u.mouseEvent.target.value=i.substring(0,e)+i.substring(n,i.length),u.mouseEvent.target.selectionStart=e,u.mouseEvent.target.selectionEnd=e,u.mouseEvent.target.focus()},t.copyImg=()=>{volantis.GLOBAL_CONFIG.plugins.message.rightmenu.notice&&VolantisApp.message("系统提示","复制中，请等待。",{icon:e.options.iconPrefix+" fa-images"}),RightMenus.writeClipImg(u.mediaLinkUrl,(t=>{RightMenus.messageRightMenu&&(VolantisApp.hideMessage(),VolantisApp.message("系统提示","图片复制成功！",{icon:e.options.iconPrefix+" fa-images"}))}),(t=>{console.error(t),RightMenus.messageRightMenu&&(VolantisApp.hideMessage(),VolantisApp.message("系统提示","复制失败："+t,{icon:e.options.iconPrefix+" fa-exclamation-square red",time:9e3}))}))},t.printMode=()=>{if(window.location.pathname===u.pathName)if(RightMenus.messageRightMenu){const e='是否打印当前页面？<br><em style="font-size: 80%">建议打印时勾选背景图形</em><br>';VolantisApp.question("",e,{time:9e3},(()=>{t.printHtml()}))}else t.printHtml()},t.printHtml=()=>{volantis.isReadModel&&t.readMode(),DOMController.setAttribute("details","open","true"),DOMController.removeList([".cus-article-bkg",".iziToast-overlay",".iziToast-wrapper",".prev-next","footer","#l_header","#l_cover","#l_side","#comments","#s-top","#BKG","#rightmenu-wrapper",".nav-tabs",".parallax-mirror",".new-meta-item.share",".new-meta-box","button.btn-copy","iframe"]),DOMController.setStyleList([["body","backgroundColor","unset"],["#l_main, .copyright.license","width","100%"],["#post","boxShadow","none"],["#post","background","none"],["#post","padding","0"],["h1","textAlign","center"],["h1","fontWeight","600"],["h1","fontSize","2rem"],["h1","marginBottom","20px"],[".tab-pane","display","block"],[".tab-content","borderTop","none"],[".highlight>table pre","whiteSpace","pre-wrap"],[".highlight>table pre","wordBreak","break-all"],[".fancybox img","height","auto"],[".fancybox img","weight","auto"],[".copyright.license","margin","0"],[".copyright.license","padding","1.25em 20px"],["figure.highlight, .copyright.license","display","inline-block"]]),setTimeout((()=>{window.print(),document.body.innerHTML="",window.location.reload()}),50)},t.readMode=()=>{"function"==typeof ScrollReveal&&ScrollReveal().clean("#comments"),DOMController.setStyle("#l_header","opacity",0),DOMController.fadeToggleList([document.querySelector("#l_cover"),document.querySelector("footer"),document.querySelector("#s-top"),document.querySelector(".article-meta#bottom"),document.querySelector(".prev-next"),document.querySelector("#l_side"),document.querySelector("#comments")]),DOMController.toggleClassList([[document.querySelector("#l_main"),"common_read"],[document.querySelector("#l_main"),"common_read_main"],[document.querySelector("#l_body"),"common_read"],[document.querySelector("#safearea"),"common_read"],[document.querySelector("#read_bkg"),"common_read_hide"],[document.querySelector("h1"),"common_read_h1"],[document.querySelector("#post"),"post_read"],[document.querySelector("#l_cover"),"read_cover"],[document.querySelector(".widget.toc-wrapper"),"post_read"]]),DOMController.setStyle(".copyright.license","margin","15px 0"),volantis.isReadModel=void 0===volantis.isReadModel||!volantis.isReadModel,volantis.isReadModel?(RightMenus.messageRightMenu&&VolantisApp.message("系统提示","阅读模式已开启，您可以点击屏幕空白处退出。",{backgroundColor:"var(--color-read-post)",icon:e.options.iconPrefix+" fa-book-reader",displayMode:1,time:5e3}),document.querySelector("#l_body").removeEventListener("click",t.readMode),document.querySelector("#l_body").addEventListener("click",(e=>{DOMController.hasClass(e.target,"common_read")&&t.readMode()}))):(document.querySelector("#l_body").removeEventListener("click",t.readMode),document.querySelector("#post").removeEventListener("click",t.readMode),DOMController.setStyle(".prev-next","display","flex"),DOMController.setStyle(".copyright.license","margin","15px -40px"),DOMController.setStyle("#l_header","opacity",1))},{init:t.initEvent,hideMenu:t.hideMenu,readMode:t.readMode}})(),Object.freeze(RightMenus),volantis.requestAnimationFrame((()=>{"loading"!==document.readyState?RightMenus.initialMenu():document.addEventListener("DOMContentLoaded",(function(){RightMenus.initialMenu()}))}));
//# sourceMappingURL=../../maps/js/plugins/rightMenus.js.map
