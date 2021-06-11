/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/admin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/extends.js":
/*!********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/extends.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  module.exports["default"] = module.exports, module.exports.__esModule = true;
  return _extends.apply(this, arguments);
}

module.exports = _extends;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./src/admin.js":
/*!**********************!*\
  !*** ./src/admin.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _store_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./store/api */ "./src/store/api.js");
/* harmony import */ var _components_AppVoting_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/AppVoting.jsx */ "./src/components/AppVoting.jsx");






const debug = (msg, data = undefined) => console.debug("Compart", msg, data);

_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default()(function () {
  Compart.api = _store_api__WEBPACK_IMPORTED_MODULE_3__;
  debug(Compart);
  const votingMetaBox = document.getElementById("compart-voting-meta-box");

  if (votingMetaBox) {
    Object(react_dom__WEBPACK_IMPORTED_MODULE_2__["render"])(Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_components_AppVoting_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
      proposals: Compart.proposals,
      selection: Compart.selection,
      reactions: Compart.reactions
    }), votingMetaBox);
  }
});

/***/ }),

/***/ "./src/components/AppVoting.jsx":
/*!**************************************!*\
  !*** ./src/components/AppVoting.jsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_ProposalsList_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/ProposalsList.jsx */ "./src/components/ProposalsList.jsx");
/* harmony import */ var _components_ProposalsListItem_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/ProposalsListItem.jsx */ "./src/components/ProposalsListItem.jsx");







const AppVoting = props => {
  const {
    proposals,
    selection = [],
    reactions = []
  } = props;
  const [selectedIds, setSelectedIds] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["useState"])(selection);
  const [selectedId, setSelectedId] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["useState"])(0);

  const handleSelection = e => {
    setSelectedId(e.target.value);
  };

  const handleAddProposal = e => {
    e.preventDefault();
    if (selectedId <= 0) return;
    setSelectedIds([...selectedIds, selectedId]);
    setSelectedId(0);
  };

  const switchIds = (from, to) => {
    const idFrom = selectedIds[from];
    const idTo = selectedIds[to];
    const newIds = [...selectedIds];
    newIds[from] = idTo;
    newIds[to] = idFrom;
    setSelectedIds(newIds);
  };

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("div", {
    className: "wrap"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("select", {
    onChange: handleSelection
  }, selectedId === 0 && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("option", null, "- Select proposal -"), proposals.filter(p => !selectedIds.includes(p.id)).map(p => Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("option", {
    key: p.id,
    value: p.id
  }, p.summary))), " ", Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("button", {
    onClick: handleAddProposal
  }, "+"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_ProposalsList_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], null, selectedIds.map((id, idx) => {
    const proposal = proposals.find(p => p.id === id);
    if (!proposal) return null;
    const proposalReactions = reactions.filter(r => r.proposalId === proposal.id);
    const percentage = reactions.length > 0 ? proposalReactions.length / reactions.length : 0;
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_ProposalsListItem_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
      key: id
    }, proposal, {
      reactions: proposalReactions,
      percentage: percentage,
      canMoveUp: idx !== 0,
      canMoveDown: idx < selectedIds.length - 1,
      onMoveUp: () => {
        switchIds(idx, idx - 1);
      },
      onMoveDown: () => {
        switchIds(idx, idx + 1);
      }
    }));
  })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("input", {
    type: "hidden",
    name: "voting_proposal_form",
    value: "true"
  }), selectedIds.map(s => Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])("input", {
    type: "hidden",
    name: "voting_proposals[]",
    value: s
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (AppVoting);

/***/ }),

/***/ "./src/components/ProposalListItem.scss":
/*!**********************************************!*\
  !*** ./src/components/ProposalListItem.scss ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/ProposalsList.jsx":
/*!******************************************!*\
  !*** ./src/components/ProposalsList.jsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);



const ProposalsList = ({
  children
}) => {
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("ul", null, children);
};

/* harmony default export */ __webpack_exports__["default"] = (ProposalsList);

/***/ }),

/***/ "./src/components/ProposalsListItem.jsx":
/*!**********************************************!*\
  !*** ./src/components/ProposalsListItem.jsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ProposalListItem_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ProposalListItem.scss */ "./src/components/ProposalListItem.scss");




const ProposalsListItem = props => {
  const {
    user,
    summary,
    reactions,
    percentage,
    canMoveUp,
    canMoveDown,
    onMoveDown,
    onMoveUp
  } = props;
  const email = user && user.email ? user.email : "";
  console.debug("compart", percentage, reactions);
  const readablePercentage = `${Math.round(percentage * 100)}%`;
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("li", {
    className: "proposal-list-item"
  }, canMoveUp && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("button", {
    onClick: onMoveUp
  }, "Up"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", null, summary), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "proposal__percentage-wrapper"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "proposal__percentage-counter"
  }, readablePercentage), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "proposal__percentage-bar",
    style: {
      width: readablePercentage
    }
  })), canMoveDown && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("button", {
    onClick: onMoveDown
  }, "Down"));
};

/* harmony default export */ __webpack_exports__["default"] = (ProposalsListItem);

/***/ }),

/***/ "./src/store/api.js":
/*!**************************!*\
  !*** ./src/store/api.js ***!
  \**************************/
/*! exports provided: createProposal, updateProposalStatus, queryProposals, queryVoting, voteForProposal, unvoteForProposal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createProposal", function() { return createProposal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateProposalStatus", function() { return updateProposalStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryProposals", function() { return queryProposals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryVoting", function() { return queryVoting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "voteForProposal", function() { return voteForProposal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unvoteForProposal", function() { return unvoteForProposal; });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);


const getApiPath = path => `${Compart.rest_namespace}${path}`;

const createProposal = text => {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: getApiPath("/proposals"),
    method: "POST",
    data: {
      text
    }
  });
};
const updateProposalStatus = (id, status) => {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: getApiPath(`/proposals/${id}`),
    method: "PATCH",
    data: {
      status
    }
  });
};
const queryProposals = ({
  page = 1,
  items_per_page = 50,
  search = "",
  user_id = 0
} = {}) => {
  const query = [];

  if (page) {
    query.push(`page=${page}`);
  }

  if (items_per_page) {
    query.push(`items_per_page=${items_per_page}`);
  }

  if (search.length) {
    query.push(`search=${encodeURIComponent(search)}`);
  }

  if (user_id) {
    query.push(`user_id=${user_id}`);
  }

  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: getApiPath(`/proposals?${query.join("&")}`)
  });
};
const queryVoting = votingId => {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: getApiPath(`/votings/${votingId}`),
    method: "GET"
  });
};
const voteForProposal = (votingId, proposalId, reaction) => {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: getApiPath(`/votings/${votingId}?proposal_id=${proposalId}&reaction=${reaction}`),
    method: "POST"
  });
};
const unvoteForProposal = (votingId, proposalId) => {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: getApiPath(`/votings/${votingId}?proposal_id=${proposalId}`),
    method: "DELETE"
  });
};

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["apiFetch"]; }());

/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["domReady"]; }());

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["element"]; }());

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["React"]; }());

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["ReactDOM"]; }());

/***/ })

/******/ });
//# sourceMappingURL=admin.js.map