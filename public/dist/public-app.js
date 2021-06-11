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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/public-app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/features/user-proposal-form.js":
/*!********************************************!*\
  !*** ./src/features/user-proposal-form.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

jQuery($ => {
  const api = Compart.api;
  const selectComponent = "[data-compart-user-proposal-form]";
  const selectSuccess = "[data-compart-proposal-success]";
  const selectError = "[data-compart-proposal-error]";
  $("body").on("submit", `${selectComponent} form`, function (e) {
    e.preventDefault();
    const $form = $(this);
    const $component = $form.parent(selectComponent);
    if ($component.attr("data-is-submitting") === "true") return;
    const $proposal = $form.find("[name=compart_proposal]");
    const proposal = $proposal.val();

    if (typeof proposal !== "string" || proposal.length <= 0) {
      return;
    }

    $proposal.prop("disabled", true);
    $component.attr("data-is-submitting", "true");
    api.createProposal(proposal).then(response => {
      $proposal.prop("disabled", false);
      $component.attr("data-is-submitting", "false");
      $proposal.val("");
      return response;
    }).then(onResult($component, proposal));
  });

  const onResult = ($component, proposal) => response => {
    $component.find("form").hide();

    if (!response.success) {
      $component.find(selectError).show();
      return;
    }

    const $success = $component.find(selectSuccess);
    $success.show();
    $success.find("[data-compart-proposal-preview]").val(proposal);
  };
});

/***/ }),

/***/ "./src/features/voting.js":
/*!********************************!*\
  !*** ./src/features/voting.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

jQuery($ => {
  const api = Compart.api;

  const $findProposals = $voting => $voting.find("[data-proposal-id]");

  const $findProposal = ($voting, proposalId) => $voting.find("[data-proposal-id=" + proposalId + "]");

  const setIsVoted = $proposal => $proposal.attr("data-is-voted", true);

  const unsetIsVoted = $proposal => $proposal.removeAttr("data-is-voted");

  const isVoted = $proposal => $proposal.attr("data-is-voted") === "true";

  const getProposalId = $proposal => $proposal.attr("data-proposal-id");

  const getReactionsCount = $proposal => parseInt($proposal.attr("data-reactions-count"));

  const setReactionsCount = ($proposal, count) => $proposal.attr("data-reactions-count", count);

  const incrementReactionsCount = ($proposal, by = 1) => {
    const count = getReactionsCount($proposal);
    setReactionsCount($proposal, count + by);
  };

  const updateVotingState = ($voting, proposalIds) => {
    $findProposals($voting).each((index, el) => {
      const $proposal = $(el);

      if (isVoted($proposal)) {
        unsetIsVoted($proposal);
        incrementReactionsCount($proposal, -1);
      }
    });
    proposalIds.forEach(proposalId => {
      const $proposal = $findProposal($voting, proposalId);
      setIsVoted($proposal);
      incrementReactionsCount($proposal);
    });
  };

  async function initVoting($voting) {
    const votingId = $voting.data("voting-id");
    const myReactions = await api.queryVoting(votingId);
    updateVotingState($voting, myReactions.map(r => r.proposalId));
    $voting.on("click", "[data-proposal-id]", async function (e) {
      const $el = $(this);
      const proposalId = getProposalId($el);

      const _isVoted = isVoted($el);

      if (_isVoted) {
        await api.unvoteForProposal(votingId, proposalId);
      } else {
        await api.voteForProposal(votingId, proposalId, "up");
      }

      updateVotingState($voting, _isVoted ? [] : [proposalId]);
    });
  } // ----------------------------------------------------
  // init applications
  // ----------------------------------------------------


  $("[data-voting-id]").each(async (index, el) => {
    try {
      await initVoting($(el));
    } catch (e) {
      console.error(e);
    }
  });
});

/***/ }),

/***/ "./src/public-app.js":
/*!***************************!*\
  !*** ./src/public-app.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _public_app_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./public-app.scss */ "./src/public-app.scss");
/* harmony import */ var _features_user_proposal_form_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./features/user-proposal-form.js */ "./src/features/user-proposal-form.js");
/* harmony import */ var _features_user_proposal_form_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_features_user_proposal_form_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _features_voting_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./features/voting.js */ "./src/features/voting.js");
/* harmony import */ var _features_voting_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_features_voting_js__WEBPACK_IMPORTED_MODULE_2__);




/***/ }),

/***/ "./src/public-app.scss":
/*!*****************************!*\
  !*** ./src/public-app.scss ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ });
//# sourceMappingURL=public-app.js.map