!function(t){var o={};function a(r){if(o[r])return o[r].exports;var e=o[r]={i:r,l:!1,exports:{}};return t[r].call(e.exports,e,e.exports,a),e.l=!0,e.exports}a.m=t,a.c=o,a.d=function(t,o,r){a.o(t,o)||Object.defineProperty(t,o,{enumerable:!0,get:r})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,o){if(1&o&&(t=a(t)),8&o)return t;if(4&o&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&o&&"string"!=typeof t)for(var e in t)a.d(r,e,function(o){return t[o]}.bind(null,e));return r},a.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(o,"a",o),o},a.o=function(t,o){return Object.prototype.hasOwnProperty.call(t,o)},a.p="",a(a.s=14)}({11:function(t,o){jQuery(t=>{const o=Compart.api,a=t("body"),r=(t,o)=>("boolean"==typeof o&&(o?(t.attr("data-is-submitting","true"),a.addClass("compart-user-proposal__is-submitting")):(t.removeAttr("data-is-submitting"),a.removeClass("compart-user-proposal__is-submitting"))),"true"===t.attr("data-is-submitting"));a.on("submit","[data-compart-user-proposal-component] form",(function(a){a.preventDefault();const n=t(this),s=n.closest("[data-compart-user-proposal-component]");if(r(s))return;const i=n.find("[name=compart_proposal]"),c=i.val();"string"!=typeof c||c.length<=0||(i.prop("disabled",!0),r(s,!0),o.createProposal(c).then(t=>(i.prop("disabled",!1),i.val(""),r(s,!1),t)).then(e(s,c)))}));const e=(t,o)=>a=>{if(console.debug("Compart",t,t.find("form"),a),t.find("form").hide(),!a.success)return console.debug("Compart","no success",a),void t.find("[data-compart-proposal-error]").show();console.debug("Compart","success",t.find("[data-compart-proposal-preview]"),t.find("[data-compart-proposal-success]")),t.find("[data-compart-proposal-preview]").val(o),t.find("[data-compart-proposal-success]").show()}})},12:function(t,o){jQuery(t=>{const o=Compart.api,a=t("body"),r=t=>"true"===t.attr("data-is-voted"),e=(t,o)=>("boolean"==typeof o&&(o?(a.addClass("compart-voting__is-loading"),t.attr("data-is-loading","true")):(a.removeClass("compart-voting__is-loading"),t.removeAttr("data-is-loading"))),"true"===t.attr("data-is-loading")),n=(t,o=1)=>{const a=(t=>parseInt(t.attr("data-reactions-count")))(t);((t,o)=>{t.attr("data-reactions-count",o)})(t,a+o)},s=(o,a)=>{(t=>t.find("[data-proposal-id]"))(o).each((o,a)=>{const e=t(a);r(e)&&((t=>{t.removeAttr("data-is-voted")})(e),n(e,-1))}),a.forEach(t=>{const a=((t,o)=>t.find("[data-proposal-id="+o+"]"))(o,t);(t=>{t.attr("data-is-voted",!0)})(a),n(a)})};t("[data-voting-id]").each(async(a,n)=>{try{await async function(a){const n=a.data("voting-id");e(a,!0);const i=(await o.queryVoting(n)).filter(t=>void 0!==t.userId).map(t=>t.proposalId);s(a,i),e(a,!1),a.on("click","[data-proposal-id]",(async function(c){e(a,!0);const p=t(this),d=p.attr("data-proposal-id"),u=r(p);s(a,u?[]:[d]);try{u?await o.unvoteForProposal(n,d):await o.voteForProposal(n,d,"up")}catch(c){s(a,i)}finally{e(a,!1)}}))}(t(n))}catch(t){console.error(t)}})})},14:function(t,o,a){"use strict";a.r(o),a(11),a(12)}});