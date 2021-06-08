!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=9)}([function(e,t){e.exports=window.wp.element},function(e,t){e.exports=window.wp.apiFetch},function(e,t,n){"use strict";n.r(t),n.d(t,"createProposal",(function(){return c})),n.d(t,"updateProposalStatus",(function(){return p})),n.d(t,"queryProposals",(function(){return u})),n.d(t,"queryVoting",(function(){return l})),n.d(t,"voteForProposal",(function(){return s})),n.d(t,"unvoteForProposal",(function(){return i}));var o=n(1),r=n.n(o);const a=e=>`${Compart.rest_namespace}${e}`,c=e=>r()({path:a("/proposals"),method:"POST",data:{text:e}}),p=(e,t)=>r()({path:a("/proposals/"+e),method:"PATCH",data:{status:t}}),u=({page:e=1,items_per_page:t=50,search:n="",user_id:o=0}={})=>{const c=[];return e&&c.push("page="+e),t&&c.push("items_per_page="+t),n.length&&c.push("search="+encodeURIComponent(n)),o&&c.push("user_id="+o),r()({path:a("/proposals?"+c.join("&"))})},l=e=>r()({path:a("/votings/"+e),method:"GET"}),s=(e,t,n)=>r()({path:a(`/votings/${e}?proposal_id=${t}&reaction=${n}`),method:"POST"}),i=(e,t)=>r()({path:a(`/votings/${e}?proposal_id=${t}`),method:"DELETE"})},function(e,t){e.exports=window.React},function(e,t){e.exports=window.wp.domReady},function(e,t){e.exports=window.ReactDOM},function(e,t){function n(){return e.exports=n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},e.exports.default=e.exports,e.exports.__esModule=!0,n.apply(this,arguments)}e.exports=n,e.exports.default=e.exports,e.exports.__esModule=!0},,,function(e,t,n){"use strict";n.r(t);var o=n(0),r=n(4),a=n.n(r),c=n(5),p=n(2),u=n(6),l=n.n(u);n(3);var s=({children:e})=>Object(o.createElement)("ul",null,e),i=e=>{const{user:t,summary:n,canMoveUp:r,canMoveDown:a,onMoveDown:c,onMoveUp:p}=e;return t&&t.email&&t.email,Object(o.createElement)("li",{className:"proposal-list-item"},r&&Object(o.createElement)("button",{onClick:p},"Up"),Object(o.createElement)("div",null,n),a&&Object(o.createElement)("button",{onClick:c},"Down"))},d=({proposals:e,selection:t=[]})=>{const[n,r]=Object(o.useState)(t),[a,c]=Object(o.useState)(0),p=(e,t)=>{const o=n[e],a=n[t],c=[...n];c[e]=a,c[t]=o,r(c)};return Object(o.createElement)("div",{className:"wrap"},Object(o.createElement)("select",{onChange:e=>{c(e.target.value)}},0===a&&Object(o.createElement)("option",null,"- Select proposal -"),e.filter(e=>!n.includes(e.id)).map(e=>Object(o.createElement)("option",{key:e.id,value:e.id},e.summary)))," ",Object(o.createElement)("button",{onClick:e=>{e.preventDefault(),a<=0||(r([...n,a]),c(0))}},"+"),Object(o.createElement)(s,null,n.map((t,r)=>{const a=e.find(e=>e.id===t);return a?Object(o.createElement)(i,l()({key:t},a,{canMoveUp:0!==r,canMoveDown:r<n.length-1,onMoveUp:()=>{p(r,r-1)},onMoveDown:()=>{p(r,r+1)}})):null})),Object(o.createElement)("input",{type:"hidden",name:"voting_proposal_form",value:"true"}),n.map(e=>Object(o.createElement)("input",{type:"hidden",name:"voting_proposals[]",value:e})))};a()((function(){var e;Compart.api=p,e=Compart,console.debug("Compart",e,void 0);const t=document.getElementById("compart-voting-meta-box");t&&Object(c.render)(Object(o.createElement)(d,{proposals:Compart.proposals,selection:Compart.selection}),t)}))}]);