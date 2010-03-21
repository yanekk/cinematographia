(function(C){C.fn.colorInput=function(D){D=jQuery.extend(C.colorInput.defaults,D);this.each(function(){C(this).data("colorControl",new C.colorInput(this,D))});return this};C.fn.colorSelected=function(D){if(D){this.bind("colorSelected",D);return this}else{this.trigger("colorSelected")}};C.fn.colorAccept=function(D){if(D){this.bind("colorAccept",D);return this}else{this.trigger("colorAccept")}};C.fn.colorCancel=function(D){if(D){this.bind("colorCancel",D);return this}else{this.trigger("colorCancel")}};C.colorInput=function(U,N){var G=C(U);if(G.data("colorControl")!=null){return this}var Q=this,T=N.cells*N.cellSize,L=N.cells*N.cellSize+N.hueWidth;var c="<button ".concat("class='colorButton' style='width:",N.hueWidth,"px;height:",N.hueWidth,"px;margin:0;padding:0;border:none 0;line-height:",N.hueWidth-2,"px'>&nbsp;</button>");var O=C(c),V,f,e;G.after(O);O.click(function(k){if(C.colorInput.current==Q){M()}else{if(C.colorInput.current){C.colorInput.current.cancel()}else{h()}}k.stopPropagation();return false});var H=C("#".concat(N.dropdownId));if(H.length==1){if(N.acceptCancelButtons){V=H.find(".colorButtons");f=V.find(":eq(0)");e=V.find(":eq(1)")}}else{H=C("<div ".concat("id='",N.dropdownId,"' class='colorDropdown' style='display:none;position:absolute;overflow:visible;height:0;margin:0;padding:0;cursor:pointer'></div>")).append(C("<div ".concat("style='float:left;width:",T,"px;height:",T,"px;margin:0;padding:0'></div>")).append(A(N)).append(B(N)));if(N.acceptCancelButtons){f=C(c).text(N.textAccept).css({width:Math.round(T/2)});e=C(c).text(N.textCancel).css({width:Math.round(T/2)});V=C("<div ".concat("class='colorButtons' style='position:absolute;z-index:0;left:0;width:",T,"px;height:",N.hueWidth,"px'></div>")).append(f).append(e);H.prepend(V)}C(document.body).append(H)}var j=H.find(".saturationBrightnessMap"),F=H.find(".hueMap"),X=new C.colorInput.color(),d,Z,D=false;if(N.hideInput){G.hide()}var W;var R=function(m){if(W){clearTimeout(W);W=null}if(m){W=setTimeout(R,m);return }var o=X.hue*T-Math.round(X.hue*T);var l=new C.colorInput.color(0,1,1);b(null);F.find("div").each(function(){l.hue=o/T;this.hue=l.hue;this.color=l.toHex();this.style.backgroundColor=this.color;if(this.hue==X.hue){b(this)}o++});var n=0,k=0;l=new C.colorInput.color(X.hue,0,0);J(null);j.find("div").each(function(){l.saturation=1-n/(N.cells-1);l.brightness=1-k/(N.cells-1);this.saturation=l.saturation;this.brightness=l.brightness;this.color=l.toHex();this.style.backgroundColor=this.color;if(this.color==d){J(this)}n++;if(n==N.cells){n=0;k++}})};var E=function(){var k=G.val();k=k[0]!="#"?"#".concat(k):k;if(k!=d){X.fromHex(k);i(k,D)}};var i=function(l,k){d=l;G.val(l[0]=="#"&&N.noHash?l.slice(1):l);Q.isChanged=Z&&d!=Z;O.css({backgroundColor:l,color:X.brightnessContrast().toHex()});if(N.acceptCancelButtons){f.css({backgroundColor:l,color:X.brightnessContrast().toHex()})}if(k){R(N.hoverSelect?50:0)}};var M=function(){if(Z!=d){G.change()}Z=null;S()};var K=function(){if(Q.isChanged){G.val(Z);E();G.colorSelected()}Z=null;S()};var S=function(){C.each(N.cancelOnClick,function(){C(this).unbind("click.color")});F.find("div").unbind("mousedown").unbind("mousemove").unbind("mouseup").unbind("click");j.find("div").unbind("mousedown").unbind("mousemove").unbind("mouseup").unbind("click");j.unbind("dblclick");H.unbind("click");if(N.acceptCancelButtons){V.animate({marginTop:0},{duration:125});f.unbind("click");e.unbind("click")}F.animate({marginLeft:T-N.hueWidth},{duration:125,complete:function(){F.css({display:"none"});H.animate({height:0,width:0},{duration:250,complete:function(){H.css({display:"none"})}})}});C.colorInput.current=null;Q.isChanged=false;D=false};var h=function(){Z=d;if(N.acceptCancelButtons){f.add(e).css({backgroundColor:d,color:X.brightnessContrast().toHex()})}R();C.each(N.cancelOnClick,function(){C(this).bind("click.color",K)});if(N.hoverSelect){F.find("div").mousemove(function(l){P(this);G.colorSelected()});j.find("div").mousemove(function(l){I(this);G.colorSelected()});j.dblclick(function(l){M();l.stopPropagation();return false});j.click(function(l){M();l.stopPropagation();return false})}else{F.find("div").mousedown(function(l){return Y(l,F)}).mousemove(function(l){if(g(l,F)){P(this);G.colorSelected()}}).mouseup(function(l){a(l,F)}).click(function(l){P(this);G.colorSelected()});j.find("div").mousedown(function(l){return Y(l,j)}).mousemove(function(l){if(g(l,j)){I(this);G.colorSelected()}}).mouseup(function(l){a(l,j)}).click(function(l){I(this);G.colorSelected()});j.dblclick(function(l){M();l.stopPropagation();return false})}H.click(function(l){l.stopPropagation();return false});var k=O.offset();H.css({display:"",top:k.top+O.height()+"px",left:k.left+(N.showLeft?-T:0)+"px"}).animate({height:T,width:T},{duration:500,complete:function(){F.css({display:""}).animate({marginLeft:T},{duration:250});if(N.acceptCancelButtons){V.animate({marginTop:-N.hueWidth},{duration:250});f.click(function(l){M();l.stopPropagation();return false});e.click(function(l){K();l.stopPropagation();return false})}}});C.colorInput.current=Q;D=true};if(C.browser.msie){H.attr("unselectable","on");H.find("div").attr("unselectable","on")}var Y=function(l,k){if(k.data("drag")){a(l,k)}k.data("drag",true);return false};var a=function(l,k){k.data("drag",false)};var g=function(l,k){if(!k.data("drag")){return false}if(C.browser.msie&&!l.button){a(l,k);return false}return true};var b=function(k){var l=F.data("selected");if(l){l.style.zIndex=0;l.style.width=N.hueWidth+"px";l.style.margin="0";l.style.border="none 0"}F.data("selected",k);if(k){k.style.zIndex=1;k.style.width=(N.hueWidth-2)+"px";k.style.margin="-1px 0";k.style.border="solid 1px #000"}};var P=function(k){X.hue=k.hue;i(X.toHex(),D)};var J=function(k){var l=j.data("selected");if(l){l.style.width=N.cellSize+"px";l.style.height=N.cellSize+"px";l.style.border="none 0"}j.data("selected",k);if(k){k.style.width=(N.cellSize-2)+"px";k.style.height=(N.cellSize-2)+"px";k.style.border="solid 1px ".concat(X.brightnessContrast().toHex())}};var I=function(k){X.saturation=k.saturation;X.brightness=k.brightness;i(X.toHex(),false);J(k)};G.bind("change",E);G.bind("colorAccept",M);G.bind("colorCancel",K);if(N.change){G.change(N.change)}if(N.colorSelected){G.colorSelected(N.colorSelected)}this.accept=M;this.cancel=K;this.isChanged=false;E();return this};function B(E){var F=["<div class='saturationBrightnessMap' style='position:absolute;z-index:1;overflow:hidden;width:",E.cells*E.cellSize,"px;height:",E.cells*E.cellSize,"px'>"];for(var D=0;D<E.cells;D++){for(var G=0;G<E.cells;G++){F.push("<div ".concat("style='float:left;overflow:hidden;width:",E.cellSize,"px;height:",E.cellSize,"px;border:none 0'></div>"))}}F.push("</div>");return F.join("")}function A(E){var D=["<div class='hueMap' style='position:absolute;z-index:0;width:",E.hueWidth,"px;height:",E.cells*E.cellSize,"px'>"];for(var F=0;F<E.cells*E.cellSize;F++){D.push("<div style='float:left;position:relative;overflow:hidden;width:",E.hueWidth,"px;height:1px;border:none 0'>&nbsp;</div>")}D.push("</div>");return D.join("")}C.colorInput.defaults={acceptCancelButtons:true,cancelOnClick:[document],cells:15,cellSize:10,change:null,colorSelected:null,dropdownId:"ColorDropdown",hideInput:true,hoverSelect:false,hueWidth:20,noHash:false,showLeft:false,textAccept:"ok",textCancel:"cancel"};C.colorInput.current=null;C.colorInput.color=function(D,E,F){if(arguments.length==1&&D.constructor==String){this.fromHex(D)}else{this.hue=parseFloat(D)||0;this.saturation=parseFloat(E)||0;this.brightness=parseFloat(F)||0}this.isValid=function(){if(isNaN(this.hue)){return false}while(this.hue>1){this.hue-=1}while(this.hue<0){this.hue+=1}if(isNaN(this.saturation)){return false}if(this.saturation>1){this.saturation=1}else{if(this.saturation<0){this.saturation=0}}if(isNaN(this.brightness)){return false}if(this.brightness>1){this.brightness=1}else{if(this.brightness<0){this.brightness=0}}return true};this.isValid();this.brightnessContrast=function(){return new C.colorInput.color(0,0,this.brightness>=0.75?0:1)};this.valueToHex=function(H){var G=Math.round(H*255).toString(16);return G.length==1?"0"+G:G};this.hexToValue=function(G){return parseInt(G,16)/255};this.fromHex=function(I){if(I.slice(0,1)=="#"){I=I.slice(1)}if(I.length==3){I=I.split("");I=I[0]+I[0]+I[1]+I[1]+I[2]+I[2]}if(I.length!=6){this.brightness=NaN;return }var K=this.hexToValue(I.substr(0,2));var J=this.hexToValue(I.substr(2,2));var G=this.hexToValue(I.substr(4,2));this.brightness=Math.max(Math.max(K,J),G);var H=Math.min(Math.min(K,J),G);if(H==this.brightness){this.hue=0;this.saturation=0}else{var L=this.brightness-H;this.saturation=L/this.brightness;if(K==this.brightness){this.hue=(J-G)/L}else{if(J==this.brightness){this.hue=2+((G-K)/L)}else{this.hue=4+((K-J)/L)}}this.hue/=6;if(this.hue<0){this.hue+=1}if(this.hue>1){this.hue-=1}}return this};this.toHex=function(N){if(!this.isValid()){return"Transparent"}var I,J,M;var K=Math.floor(this.hue*6);var L=(this.hue*6)-K;var H=this.brightness*(1-this.saturation);var G=this.brightness*(1-(this.saturation*L));var O=this.brightness*(1-(this.saturation*(1-L)));switch(K){case 1:I=G;J=this.brightness;M=H;break;case 2:I=H;J=this.brightness;M=O;break;case 3:I=H;J=G;M=this.brightness;break;case 4:I=O;J=H;M=this.brightness;break;case 5:I=this.brightness;J=H;M=G;break;case 6:case 0:I=this.brightness;J=O;M=H;break}return N?"":"#"+this.valueToHex(I)+this.valueToHex(J)+this.valueToHex(M)}}})(jQuery);