(function(t){function e(e){for(var i,a,o=e[0],c=e[1],d=e[2],u=0,p=[];u<o.length;u++)a=o[u],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&p.push(r[a][0]),r[a]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);l&&l(e);while(p.length)p.shift()();return n.push.apply(n,d||[]),s()}function s(){for(var t,e=0;e<n.length;e++){for(var s=n[e],i=!0,a=1;a<s.length;a++){var c=s[a];0!==r[c]&&(i=!1)}i&&(n.splice(e--,1),t=o(o.s=s[0]))}return t}var i={},r={app:0},n=[];function a(t){return o.p+"js/"+({about:"about"}[t]||t)+"."+{about:"e19a3029"}[t]+".js"}function o(e){if(i[e])return i[e].exports;var s=i[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.e=function(t){var e=[],s=r[t];if(0!==s)if(s)e.push(s[2]);else{var i=new Promise((function(e,i){s=r[t]=[e,i]}));e.push(s[2]=i);var n,c=document.createElement("script");c.charset="utf-8",c.timeout=120,o.nc&&c.setAttribute("nonce",o.nc),c.src=a(t);var d=new Error;n=function(e){c.onerror=c.onload=null,clearTimeout(u);var s=r[t];if(0!==s){if(s){var i=e&&("load"===e.type?"missing":e.type),n=e&&e.target&&e.target.src;d.message="Loading chunk "+t+" failed.\n("+i+": "+n+")",d.name="ChunkLoadError",d.type=i,d.request=n,s[1](d)}r[t]=void 0}};var u=setTimeout((function(){n({type:"timeout",target:c})}),12e4);c.onerror=c.onload=n,document.head.appendChild(c)}return Promise.all(e)},o.m=t,o.c=i,o.d=function(t,e,s){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(s,i,function(e){return t[e]}.bind(null,i));return s},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/ibid_mobile/",o.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],d=c.push.bind(c);c.push=e,c=c.slice();for(var u=0;u<c.length;u++)e(c[u]);var l=d;n.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},"02db":function(t,e,s){t.exports=s.p+"img/sample.e98d474e.jpg"},1002:function(t,e,s){},"18b5":function(t,e,s){"use strict";var i=s("b073"),r=s.n(i);r.a},"199c":function(t,e){},"1d59":function(t,e,s){"use strict";var i=s("1002"),r=s.n(i);r.a},"1e09":function(t,e,s){"use strict";s.d(e,"a",(function(){return i})),s.d(e,"b",(function(){return r}));var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("div",{staticClass:"navbar-light bg-secondary",attrs:{id:"nav"}},[s("ul",{staticClass:"nav nav-justified-start"},[s("li",{staticClass:"nav-item"},[s("router-link",{attrs:{to:"/"}},[t._v("Home")])],1),s("li",{staticClass:"nav-item"},[s("router-link",{attrs:{to:"/about"}},[t._v("About")])],1),s("li",{staticClass:"nav-item"},[s("router-link",{attrs:{to:"/favorites"}},[t._v("Favorites")])],1)])]),s("router-view")],1)},r=[]},"23be":function(t,e,s){"use strict";var i=s("199c"),r=s.n(i);e["default"]=r.a},"3dfd":function(t,e,s){"use strict";var i=s("1e09"),r=s("23be"),n=(s("5c0b"),s("2877")),a=Object(n["a"])(r["default"],i["a"],i["b"],!1,null,null,null);e["default"]=a.exports},"56d7":function(t,e,s){"use strict";s.r(e);s("e260"),s("e6cf"),s("cca6"),s("a79d");var i=s("2b0e"),r=s("3dfd"),n=(s("d3b7"),s("8c4f")),a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"container",attrs:{id:"list"}},t._l(t.posts,(function(e){return i("div",{key:e.id,staticClass:"row"},[i("div",{staticClass:"col d-flex justify-content-center"},[i("router-link",{attrs:{to:{name:"stack",params:{id:e.id}}}},[i("div",{staticClass:"card",staticStyle:{width:"18rem"},attrs:{id:e.id},on:{click:function(e){return t.select(e)}}},[i("br"),i("h3",{staticClass:"card-title"},[t._v(t._s(e.name))]),i("img",{staticClass:"card-image-top",attrs:{src:s("02db")}}),i("div",{staticClass:"card-body"},[i("p",{staticClass:"card-text"},[t._v("Current Bid : "+t._s(e.price))]),i("button",{staticClass:"btn btn-primary"},[t._v(" Bid Now! ")])])])])],1)])})),0)},o=[],c=s("2f62"),d={name:"Home",mounted:function(){this.$store.dispatch("loadPosts")},computed:Object(c["b"])(["posts"])},u=d,l=(s("f00e"),s("2877")),p=Object(l["a"])(u,a,o,!1,null,"225f4b31",null),h=p.exports,f=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"container"},[i("div",{staticClass:"row"},[i("div",{staticClass:"col d-flex justify-content-center"},[i("div",{staticClass:"card",staticStyle:{width:"18rem"}},[i("br"),i("h3",{staticClass:"card-title"},[t._v(t._s(t.post.name))]),i("img",{staticClass:"card-image-top",attrs:{src:s("02db")}}),i("div",{staticClass:"card-body"},[i("h4",{staticClass:"card-title"},[t._v("Current Bid: "+t._s(t.post.price))]),i("h5",[t._v("Minmum raise: "+t._s(t.post.raise))]),i("div",{staticClass:"row justify-content-center"},[i("form",[i("a",{on:{click:function(e){return e.preventDefault(),t.decrement(e)}}},[i("svg",{staticClass:"bi bi-dash-circle",attrs:{width:"1.5em",height:"1.5em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"}},[i("path",{attrs:{"fill-rule":"evenodd",d:"M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z","clip-rule":"evenodd"}}),i("path",{attrs:{"fill-rule":"evenodd",d:"M3.5 8a.5.5 0 01.5-.5h8a.5.5 0 010 1H4a.5.5 0 01-.5-.5z","clip-rule":"evenodd"}})])]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.bid,expression:"bid"}],attrs:{id:"bid",type:"number"},domProps:{value:t.bid},on:{input:function(e){e.target.composing||(t.bid=e.target.value)}}}),i("a",{on:{click:function(e){return e.preventDefault(),t.increment(e)}}},[i("svg",{staticClass:"bi bi-plus-circle",attrs:{width:"1.5em",height:"1.5em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"}},[i("path",{attrs:{"fill-rule":"evenodd",d:"M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z","clip-rule":"evenodd"}}),i("path",{attrs:{"fill-rule":"evenodd",d:"M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z","clip-rule":"evenodd"}}),i("path",{attrs:{"fill-rule":"evenodd",d:"M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z","clip-rule":"evenodd"}})])])])]),i("br"),i("button",{staticClass:"btn btn-outline-dark",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.submit(e)}}},[t._v("Submit Bid")])])])])]),i("br"),i("div",{staticClass:"row"},[i("div",{staticClass:"col d-flex justify-content-center"},[t.nextIndex?i("button",{on:{click:t.moveNextIndex}},[i("p",[t._v("Next item")])]):t._e(),t.prevIndex?i("button",{on:{click:t.movePrevIndex}},[i("p",[t._v("Previous item")])]):t._e()])]),i("div",{staticClass:"row"},[i("div",{staticClass:"col d-flex justify-content-center"},[i("button",[i("router-link",{attrs:{to:"/"}},[t._v("Back to All")])],1)])])])},v=[],m=(s("c740"),s("b0c0"),s("e25e"),s("96cf"),s("1da1")),b=s("bc3a"),g=s.n(b),x={mounted:function(){this.getNextIndex(),this.getPrevIndex()},name:"post",data:function(){return{post:this.$store.getters.post(this.$route.params.id),bid:this.$store.getters.post(this.$route.params.id).price+this.$store.getters.post(this.$route.params.id).raise,nextIndex:!0,prevIndex:!0}},methods:{increment:function(){this.bid=parseInt(this.bid)+this.$store.getters.post(this.$route.params.id).raise},decrement:function(){this.bid>parseInt(this.$store.getters.post(this.$route.params.id).price)+this.$store.getters.post(this.$route.params.id).raise&&(this.bid=this.bid-this.$store.getters.post(this.$route.params.id).raise)},submit:function(){var t=this;return Object(m["a"])(regeneratorRuntime.mark((function e(){var s,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.bid>=parseInt(t.$store.getters.post(t.$route.params.id).price)+t.$store.getters.post(t.$route.params.id).raise)){e.next=7;break}return alert("all good"),s={Id:t.$store.getters.post(t.$route.params.id).id,Name:t.$store.getters.post(t.$route.params.id).name,Image:t.$store.getters.post(t.$route.params.id).image,Price:parseInt(t.bid),Raise:parseInt(t.$store.getters.post(t.$route.params.id).raise)},i="https://localhost:5001/api/BidItems/"+t.$route.params.id,e.abrupt("return",g.a.put(i,s,{headers:{"Content-Type":"application/json"}}).then((function(e){console.log(e),t.post.price=t.bid}))["catch"]((function(t){console.log(t.response)})));case 7:alert("your bid is not high enough");case 8:case"end":return e.stop()}}),e)})))()},getNextIndex:function(){var t=this;this.$store.state.posts.findIndex((function(e){return e.id===t.$route.params.id}))<this.$store.state.posts.length?this.nextIndex=!0:this.nextIndex=!1},moveNextIndex:function(){var t=this;this.$router.push(this.$store.state.posts[this.$store.state.posts.findIndex((function(e){return e.id===t.$route.params.id}))+1].id),this.post=this.$store.getters.post(this.$route.params.id),this.bid=this.$store.getters.post(this.$route.params.id).price+this.$store.getters.post(this.$route.params.id).raise,this.getNextIndex(),this.getPrevIndex()},getPrevIndex:function(){var t=this;this.$store.state.posts.findIndex((function(e){return e.id===t.$route.params.id}))>=1?this.prevIndex=!0:this.prevIndex=!1},movePrevIndex:function(){var t=this;this.$router.push(this.$store.state.posts[this.$store.state.posts.findIndex((function(e){return e.id===t.$route.params.id}))-1].id),this.post=this.$store.getters.post(this.$route.params.id),this.bid=this.$store.getters.post(this.$route.params.id).price+this.$store.getters.post(this.$route.params.id).raise,this.getNextIndex(),this.getPrevIndex()}}},C=x,w=(s("fadc"),Object(l["a"])(C,f,v,!1,null,"15596a20",null)),$=w.exports,_=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"stack"}},[i("div",{staticClass:"container"},[t.current?i("div",{staticClass:"fixed fixed--center",class:{transition:t.isVisible},staticStyle:{"z-index":"3"}},[t.isVisible?i("Vue2InteractDraggable",{staticClass:"rounded-borders card card--one",attrs:{"interact-out-of-sight-x-coordinate":100,"interact-max-rotation":150,"interact-x-threshold":500,"interact-y-threshold":500,"interact-event-bus-events":t.interactEventBus,"interact-block-drag-down":""},on:{draggedRight:function(e){return t.emitAndNext("match")},draggedLeft:function(e){return t.emitAndNext("reject")},draggedUp:function(e){return t.emitAndNext("skip")}}},[i("div",{staticClass:"card",staticStyle:{height:"70%"}},[i("h2",{staticClass:"card-title text"},[t._v(t._s(t.current.name))]),i("img",{staticClass:"card-image",attrs:{src:s("02db")}}),i("div",{staticClass:"card-body"},[i("h5",[t._v("Current Bid: "+t._s(t.current.price))]),i("h5",[t._v("Minmum raise: "+t._s(t.current.raise))]),i("div",{staticClass:"row justify-content-center"},[i("button",{on:{touchstart:t.decrement}},[i("svg",{staticClass:"bi bi-dash-circle",attrs:{width:"1.5em",height:"1.5em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"}},[i("path",{attrs:{"fill-rule":"evenodd",d:"M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z","clip-rule":"evenodd"}}),i("path",{attrs:{"fill-rule":"evenodd",d:"M3.5 8a.5.5 0 01.5-.5h8a.5.5 0 010 1H4a.5.5 0 01-.5-.5z","clip-rule":"evenodd"}})])]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.bid,expression:"bid"}],attrs:{id:"bid",type:"number"},domProps:{value:t.bid},on:{input:function(e){e.target.composing||(t.bid=e.target.value)}}}),i("button",{on:{touchstart:t.increment}},[i("svg",{staticClass:"bi bi-plus-circle",attrs:{width:"1.5em",height:"1.5em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"}},[i("path",{attrs:{"fill-rule":"evenodd",d:"M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z","clip-rule":"evenodd"}}),i("path",{attrs:{"fill-rule":"evenodd",d:"M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z","clip-rule":"evenodd"}}),i("path",{attrs:{"fill-rule":"evenodd",d:"M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z","clip-rule":"evenodd"}})])])]),i("br"),i("button",{staticClass:"btn btn-outline-dark",attrs:{type:"button"},on:{touchstart:t.submit}},[t._v("Submit Bid")])])])]):t._e()],1):t._e(),t.next?i("div",{staticClass:"rounded-borders card card--two fixed fixed--center",staticStyle:{"z-index":"2"}},[i("div",{staticClass:"card",staticStyle:{height:"100%"}},[i("h2",{staticClass:"card-title text"},[t._v(t._s(t.next.name))]),i("img",{staticClass:"card-image",attrs:{src:s("02db")}}),i("div",{staticClass:"card-body"},[i("h5",[t._v("Current Bid: "+t._s(t.next.price))]),i("h5",[t._v("Minmum raise: "+t._s(t.next.raise))]),i("div",{staticClass:"row justify-content-center"},[i("button",{on:{touchstart:t.decrement}},[i("svg",{staticClass:"bi bi-dash-circle",attrs:{width:"1.5em",height:"1.5em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"}},[i("path",{attrs:{"fill-rule":"evenodd",d:"M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z","clip-rule":"evenodd"}}),i("path",{attrs:{"fill-rule":"evenodd",d:"M3.5 8a.5.5 0 01.5-.5h8a.5.5 0 010 1H4a.5.5 0 01-.5-.5z","clip-rule":"evenodd"}})])]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.bid,expression:"bid"}],attrs:{id:"bid",type:"number"},domProps:{value:t.bid},on:{input:function(e){e.target.composing||(t.bid=e.target.value)}}}),i("button",{on:{touchstart:t.increment}},[i("svg",{staticClass:"bi bi-plus-circle",attrs:{width:"1.5em",height:"1.5em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"}},[i("path",{attrs:{"fill-rule":"evenodd",d:"M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z","clip-rule":"evenodd"}}),i("path",{attrs:{"fill-rule":"evenodd",d:"M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z","clip-rule":"evenodd"}}),i("path",{attrs:{"fill-rule":"evenodd",d:"M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z","clip-rule":"evenodd"}})])])]),i("br"),i("button",{staticClass:"btn btn-outline-dark",attrs:{type:"button"},on:{touchstart:t.submit}},[t._v("Submit Bid")])])])]):t._e(),t.index+2<t.cards.length?i("div",{staticClass:"rounded-borders card card--three fixed fixed--center",staticStyle:{"z-index":"1"}},[i("div",{staticStyle:{height:"100%"}})]):t._e()]),i("footer",{staticClass:"ct-footer"},[i("div",{staticClass:"row"},[i("div",{staticClass:"col d-flex justify-content-center"},[this.index<this.cards.length-1?i("button",{staticClass:"footer-btn btn btn-outline-dark",attrs:{type:"button"},on:{touchstart:t.skip}},[t._v("Next item")]):t._e(),this.index>0?i("button",{staticClass:"footer-btn btn btn-outline-dark",on:{touchstart:t.back}},[t._v("Previous item")]):t._e()])]),i("div",{staticClass:"row"},[i("div",{staticClass:"col d-flex justify-content-center"},[i("button",{staticClass:"footer-btn btn btn-outline-dark"},[i("router-link",{attrs:{to:"/"}},[t._v("Back to All")])],1)])])])])},y=[],I=(s("4795"),s("5530")),k=s("66b6"),j=s("1157"),P=s.n(j),B={MATCH:"match",SKIP:"skip",REJECT:"reject"},S={name:"SwipeableCards",components:{Vue2InteractDraggable:k["Vue2InteractDraggable"]},data:function(){var t=this;return{index:this.$store.state.posts.findIndex((function(e){return e.id===t.$route.params.id})),isVisible:!0,interactEventBus:{draggedRight:B.MATCH,draggedLeft:B.REJECT,draggedUp:B.SKIP},cards:[],bid:0}},mounted:function(){this.$store.dispatch("loadPosts"),this.getCards(),this.initBid()},computed:Object(I["a"])({current:function(){return this.cards[this.index]},favorites:function(){return this.$store.state.favorites},next:function(){return this.cards[this.index+1]}},Object(c["b"])(["posts"])),methods:{initBid:function(){this.bid=this.current.price+this.current.raise},back:function(){this.index--},match:function(){k["InteractEventBus"].$emit(B.MATCH)},reject:function(){k["InteractEventBus"].$emit(B.REJECT)},skip:function(){k["InteractEventBus"].$emit(B.SKIP)},emitAndNext:function(t){var e=this;if("match"==t){for(var s=!1,i=0;i<this.$store.state.favorites.length;i++)this.$store.state.favorites[i].n===this.index&&(s=!0);s||this.$store.dispatch("setFavorite",{n:this.index})}this.$emit(t,this.index),setTimeout((function(){return e.isVisible=!1}),200),setTimeout((function(){e.index++,e.isVisible=!0}),200)},getCards:function(){var t=this;this.cards=this.$store.state.posts,this.index=this.$store.state.posts.findIndex((function(e){return e.id===t.$route.params.id}))},increment:function(){this.bid=parseInt(P()("#bidinput").val())+this.current.raise},decrement:function(){parseInt(P()("#bidinput").val())-this.current.raise>=this.current.price+this.current.raise?this.bid=parseInt(P()("#bidinput").val())-this.current.raise:alert("cant do that")},submit:function(){var t=this;return Object(m["a"])(regeneratorRuntime.mark((function e(){var s,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.bid=parseInt(P()("bidinput").val()),!(parseInt(P()("#bidinput").val())>=t.current.price+t.current.raise)){e.next=8;break}return alert("all good"),s={Id:t.current.id,Name:t.current.name,Image:t.current.image,Price:t.bid,Raise:parseInt(t.current.raise)},i="https://localhost:5001/api/BidItems/"+t.$route.params.id,e.abrupt("return",g.a.put(i,s,{headers:{"Content-Type":"application/json"}}).then((function(e){console.log(e),t.current.price=t.bid,t.initBid()}))["catch"]((function(t){console.log(t.response)})));case 8:alert("your bid is not high enough"),t.initBid();case 10:case"end":return e.stop()}}),e)})))()}}},M=S,O=(s("18b5"),Object(l["a"])(M,_,y,!1,null,"667728e5",null)),z=O.exports,A=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"container",attrs:{id:"favorites"}},t._l(t.favs,(function(e){return i("div",{key:e.id,staticClass:"row"},[i("div",{staticClass:"col d-flex justify-content-center"},[i("router-link",{attrs:{to:{name:"stack",params:{id:e.id}}}},[i("div",{staticClass:"card",staticStyle:{width:"18rem"},attrs:{id:e.id},on:{click:function(e){return t.select(e)}}},[i("br"),i("h3",{staticClass:"card-title"},[t._v(t._s(e.name))]),i("img",{staticClass:"card-image-top",attrs:{src:s("02db")}}),i("div",{staticClass:"card-body"},[i("p",{staticClass:"card-text"},[t._v("Current Bid : "+t._s(e.price))]),i("button",{staticClass:"btn btn-primary"},[t._v("Bid Now!")])])])])],1)])})),0)},E=[],N={name:"Home",data:function(){return{favs:[]}},mounted:function(){this.$store.dispatch("loadPosts"),this.getFavs()},methods:{getFavs:function(){for(var t=0;t<this.$store.state.favorites.length;t++)this.favs.push(this.$store.state.posts[this.$store.state.favorites[t].n])}},computed:Object(I["a"])({},Object(c["b"])(["posts"]))},T=N,V=(s("1d59"),Object(l["a"])(T,A,E,!1,null,"0fce998f",null)),H=V.exports;i["default"].use(n["a"]);var R=new n["a"]({mode:"history",history:!0,routes:[{path:"/",name:"Home",component:h},{path:"/about",name:"About",component:function(){return s.e("about").then(s.bind(null,"f820"))}},{path:"/posts/:id",name:"post",component:$},{path:"/stack/:id",name:"stack",component:z},{path:"/favorites",name:"favorite",component:H}]}),D=R;s("7db0");i["default"].use(c["a"]);var F=new c["a"].Store({state:{posts:[],favorites:[]},actions:{loadPosts:function(t){var e=t.commit;g.a.get("/api/BidItems").then((function(t){return t.data})).then((function(t){e("GET_POSTS",t)}))["catch"]((function(t){console.log(t)}))},setFavorite:function(t,e){var s=t.commit;s("favorite",e),console.log("action hit")}},mutations:{GET_POSTS:function(t,e){t.posts=e},favorite:function(t,e){t.favorites.push(e),console.log("favorites:   ",t.favorites)}},getters:{post:function(t){return function(e){return t.posts.find((function(t){return t.id===e}))}}}}),J=s("5f5b"),L=s("b1e0");s("f9e3"),s("2dd8");i["default"].use(J["a"]),i["default"].use(L["a"]),i["default"].config.productionTip=!1,new i["default"]({router:D,store:F,render:function(t){return t(r["default"])}}).$mount("#app")},"5c0b":function(t,e,s){"use strict";var i=s("9c0c"),r=s.n(i);r.a},"869b":function(t,e,s){},"9c0c":function(t,e,s){},b073:function(t,e,s){},f00e:function(t,e,s){"use strict";var i=s("f868"),r=s.n(i);r.a},f868:function(t,e,s){},fadc:function(t,e,s){"use strict";var i=s("869b"),r=s.n(i);r.a}});
//# sourceMappingURL=app.b7a0cdef.js.map