!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=14)}([function(e,t){e.exports=window.wp.element},function(e,t){e.exports=window.wp.apiFetch},function(e,t,n){"use strict";n.r(t),n.d(t,"createProposal",(function(){return c})),n.d(t,"updateProposalStatus",(function(){return s})),n.d(t,"queryProposals",(function(){return l})),n.d(t,"queryVoting",(function(){return i})),n.d(t,"voteForProposal",(function(){return p})),n.d(t,"unvoteForProposal",(function(){return u})),n.d(t,"createPost",(function(){return m}));var o=n(1),r=n.n(o);const a=e=>`${Compart.rest_namespace}${e}`,c=e=>r()({path:a("/proposals"),method:"POST",data:{text:e}}),s=(e,t)=>r()({path:a("/proposals/"+e),method:"PATCH",data:{status:t}}),l=({page:e=1,items_per_page:t=50,search:n="",user_id:o=0}={})=>{const c=[];return e&&c.push("page="+e),t&&c.push("items_per_page="+t),n.length&&c.push("search="+encodeURIComponent(n)),o&&c.push("user_id="+o),r()({path:a("/proposals?"+c.join("&"))})},i=e=>r()({path:a("/votings/"+e),method:"GET"}),p=(e,t,n)=>r()({path:a(`/votings/${e}?proposal_id=${t}&reaction=${n}`),method:"POST"}),u=(e,t)=>r()({path:a(`/votings/${e}?proposal_id=${t}`),method:"DELETE"}),m=(e,t)=>r()({path:a(`/votings/${e}/proposal/${t}/create-post`),method:"POST"})},function(e,t){e.exports=window.React},function(e,t){e.exports=window.wp.components},function(e,t){function n(){return e.exports=n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},e.exports.default=e.exports,e.exports.__esModule=!0,n.apply(this,arguments)}e.exports=n,e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t){e.exports=window.wp.domReady},function(e,t){e.exports=window.ReactDOM},,,,,,,function(e,t,n){"use strict";n.r(t);var o=n(0),r=n(6),a=n.n(r),c=n(7),s=n(2),l=n(5),i=n.n(l);n(3);var p=({children:e})=>Object(o.createElement)("ul",{style:{margin:0}},e),u=n(4);const m=e=>{const{summary:t,percentage:n}=e,r=Math.round(100*n)+"%";return Object(o.createElement)("li",{className:"proposal-list-item  proposal-list-item__stats"},Object(o.createElement)("div",null,t),Object(o.createElement)("div",{className:"proposal__percentage-wrapper"},Object(o.createElement)("div",{className:"proposal__percentage-counter"},r),Object(o.createElement)("div",{className:"proposal__percentage-bar",style:{width:r}})))},d=e=>{const{summary:t,canMoveUp:n,canMoveDown:r,canDelete:a,onMoveDown:c,onMoveUp:s,onTrash:l}=e;return Object(o.createElement)("li",{className:"proposal-list-item proposal-list-item__draft"},n&&Object(o.createElement)("button",{className:"proposal-list-item__button proposal-list-item__button-up",onClick:e=>{e.preventDefault(),s()}},Object(o.createElement)(u.Dashicon,{icon:"arrow-up"})),Object(o.createElement)("div",null,t),r&&Object(o.createElement)("button",{className:"proposal-list-item__button proposal-list-item__button-down",onClick:e=>{e.preventDefault(),c()}},Object(o.createElement)(u.Dashicon,{icon:"arrow-down"})),a&&Object(o.createElement)("button",{className:"proposal-list-item__button proposal-list-item__button-trash",onClick:e=>{e.preventDefault(),l()}},Object(o.createElement)(u.Dashicon,{icon:"trash"})))};var b=({status:e,selectedProposalIds:t,generatePost:n})=>Object(o.createElement)(o.Fragment,null,Object(o.createElement)("input",{type:"hidden",name:"voting_proposal_form",value:"true"}),Object(o.createElement)("input",{type:"hidden",name:"voting_status",value:e}),t.map(e=>Object(o.createElement)("input",{key:e,type:"hidden",name:"voting_proposals[]",value:e})),n&&Object(o.createElement)("input",{type:"hidden",name:"voting_generate_post",value:n})),O=({proposals:e,onAddProposal:t})=>{const{i18n:n}=Compart,[r,a]=Object(o.useState)("");return Object(o.createElement)(o.Fragment,null,Object(o.createElement)("label",null,n.add_proposal,Object(o.createElement)("br",null),Object(o.createElement)("select",{style:{width:"100%"},onChange:e=>a(e.target.value)},""===r&&Object(o.createElement)("option",null,"- ",n.select_proposal," -"),e.map(e=>Object(o.createElement)("option",{key:e.id,value:e.id},e.summary)))),Object(o.createElement)("button",{className:"button button-secondary",onClick:e=>{e.preventDefault(),""!==r&&(t(r),a(""))}},n.add_proposal_btn))};const E={DRAFT:"draft",OPEN:"open",FINISHED:"finished"},j=e=>{const t=["voting-step__item"];return t.push(e),t.join(" ")},v=({status:e,canOpen:t,onOpen:n})=>{const{i18n:r}=Compart;return E.DRAFT!==e?null:Object(o.createElement)("button",{className:"button button-secondary",disabled:!t,onClick:e=>{e.preventDefault(),t&&n()}},r.start_voting_btn)},f=({status:e,canFinish:t,onFinish:n})=>{const{i18n:r}=Compart;return E.OPEN!==e?null:Object(o.createElement)("button",{className:"button button-secondary",disabled:!t,onClick:e=>{e.preventDefault(),t&&n()}},r.end_voting_btn)};var h=({status:e,canOpen:t=!1,canFinish:n=!1,isFinished:r=!1})=>{const{i18n:a}=Compart;let c="is-active",s=t?"is-available":"is-disabled",l=n?"is-available":"is-disabled";switch(e){case E.OPEN:c="is-done",s="is-active";break;case E.FINISHED:c="is-done",s="is-done",l="is-active"}return Object(o.createElement)("div",{className:"voting-steps"},Object(o.createElement)("div",{className:j(c)},"1. ",a.step_draft," ",e!==E.DRAFT?"✅":""),Object(o.createElement)("div",{className:j(s)},"2. ",a.step_open," ",[E.DRAFT,E.OPEN].includes(e)?"":"✅"),Object(o.createElement)("div",{className:j(l)},"3. ",a.step_finished," ",r?"✅":""))};const g=({winner:e})=>{const{i18n:t}=Compart;return Object(o.createElement)("p",{style:{textAlign:"center",fontSize:"1.2rem"}},Object(o.createElement)("strong",null,t.winner_is),Object(o.createElement)("br",null),e.summary," 🎉",Object(o.createElement)("br",null),Object(o.createElement)("br",null))},_=({winner:e,generate:t,onChange:n})=>{const{i18n:r}=Compart;return Object(o.createElement)("p",{style:{textAlign:"center",fontSize:"1.2rem"}},Object(o.createElement)("label",null,Object(o.createElement)("input",{type:"checkbox",value:t,onChange:()=>{n(""===t?e.id:"")}})," ",r.create_post))},y=({post_title:e,edit_post_url:t})=>{const{i18n:n}=Compart;return Object(o.createElement)("p",{style:{textAlign:"center",fontSize:"1.2rem"}},Object(o.createElement)("strong",null,n.post),Object(o.createElement)("br",null),Object(o.createElement)("a",{href:t},e))};var w=({proposals:e,reactions:t,connection:n,generatePost:r,onChangeGeneratePost:a})=>{const c=((e,t)=>{const n=t.reduce((e,t)=>{const{proposalId:n}=t;return"number"!=typeof e[n]&&(e[n]=0),e[n]=e[n]+1,e},{});let o=null;for(const e in n)(null===o||n[o]<n[e])&&(o=e);return e.find(e=>parseInt(e.id)===parseInt(o))})(e,t);return Object(o.createElement)("div",null,c&&Object(o.createElement)(g,{winner:c}),!n&&Object(o.createElement)(_,{winner:c,generate:r,onChange:a}),n&&Object(o.createElement)(y,n))},P=({proposals:e,reactions:t,status:n,selection:r,connection:a})=>{const{i18n:c}=Compart,[s,l]=Object(o.useState)(n||E.OPEN),[u,j]=Object(o.useState)(r.map(e=>e.id)||[]),[g,_]=Object(o.useState)(""),y=s!==n,P=r.length!==u.length||u.filter((e,t)=>e!==r[t].id).length>0,D=y||P,C=(e,t)=>{const n=u[e],o=u[t],r=[...u];r[e]=o,r[t]=n,j(r)},N=[...r,...e],F=u.length>1,x=t.length>1;return Object(o.createElement)("div",{className:"app-voting "+(D?"is-changed":"")},Object(o.createElement)(h,{status:s,canOpen:F,canFinish:x,isFinished:null!==a}),Object(o.createElement)("div",{className:"app-voting__changed-status"},c.save_changes),Object(o.createElement)(b,{status:s,generatePost:g,selectedProposalIds:u}),Object(o.createElement)("div",{className:"app-voting__content"},s===E.DRAFT&&Object(o.createElement)(O,{proposals:e.filter(e=>!u.includes(e.id)),onAddProposal:e=>{j([...u,e])}}),Object(o.createElement)(p,null,u.map((e,r)=>{let a=N.find(t=>t.id===e);if(null===a)return null;switch(s){case E.DRAFT:return Object(o.createElement)(d,i()({key:e},a,{canMoveUp:n===E.DRAFT&&0!==r,canMoveDown:n===E.DRAFT&&r<u.length-1,canDelete:n===E.DRAFT,onMoveUp:()=>{C(r,r-1)},onMoveDown:()=>{C(r,r+1)},onTrash:()=>{(e=>{j(u.filter(t=>t!==e))})(e)}}));case E.OPEN:case E.FINISHED:const c=t.filter(e=>e.proposalId===a.id),s=t.length>0?c.length/t.length:0;return Object(o.createElement)(m,i()({key:e},a,{reactions:c,percentage:s}))}return null})),Object(o.createElement)(v,{status:s,canOpen:F,onOpen:()=>{l(E.OPEN)}}),Object(o.createElement)(f,{status:s,canFinish:x,onFinish:()=>{l(E.FINISHED)}}),s===E.FINISHED&&Object(o.createElement)(w,{proposals:N,reactions:t,connection:a,generatePost:g,onChangeGeneratePost:e=>{_(e)}})))};a()((function(){var e;Compart.api=s,e=Compart,console.debug("Compart",e,void 0);const t=document.getElementById("compart-voting-meta-box");t&&Object(c.render)(Object(o.createElement)(P,{status:Compart.status||E.DRAFT,proposals:Compart.proposals,selection:Compart.selection,reactions:Compart.reactions,connection:Compart.connection}),t)}))}]);