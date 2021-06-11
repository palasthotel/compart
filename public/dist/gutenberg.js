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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/gutenberg.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/gutenberg.js":
/*!**************************!*\
  !*** ./src/gutenberg.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gutenberg_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gutenberg.scss */ "./src/gutenberg.scss");
/* harmony import */ var _store_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./store/api */ "./src/store/api.js");


 // import { registerBlockType } from '@wordpress/blocks'
//
// domReady(function () {
//
//     Compart.api = api;
//
//     registerBlockType("compart/create-proposal",{
//         title: "User proposal form",
//         category: "widgets",
//         edit(props){
//             return <div>
//                 <p><strong></strong></p>
//             </div>
//         }
//     });
//
//
//
// });

/***/ }),

/***/ "./src/gutenberg.scss":
/*!****************************!*\
  !*** ./src/gutenberg.scss ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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

/***/ })

/******/ });
//# sourceMappingURL=gutenberg.js.map