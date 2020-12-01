(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("procoreIframeHelpers", [], factory);
	else if(typeof exports === 'object')
		exports["procoreIframeHelpers"] = factory();
	else
		root["procoreIframeHelpers"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/authentication.ts

/**
 * Responsible for creating and managing auth popups. When used in
 * ParentContext, will launch a new window for auth. When used in an
 * AuthContext, can be used to send success / failure messages back to the
 * parent window.
 */
var authentication_Authentication = /** @class */ (function () {
    function Authentication(context) {
        var _this = this;
        /**
         * Used to launch an authentication window. After the user either finishes
         * the authentication flow successfully, or bails out early, one of the
         * handlers will be called.
         *
         * @param config Configuration for the authenticate call. Specifies URL and
         * success / failure handlers
         */
        this.authenticate = function (config) {
            if (_this.context instanceof auth) {
                console.error("Cannot authenticate in this context");
                return;
            }
            // Set defaults for optional properties
            var width = config.width || 560;
            var height = config.height || 600;
            // Convert any relative URLs into absolute ones
            var url = new URL(config.url, _this.context.window.location.href);
            // Open a new window to the authentication URL. Make sure to center the
            // window over the users screen
            _this.authWindow = _this.context.window.open(String(url), "_blank", "\n        toolbar=no,\n        location=yes,\n        status=no,\n        menubar=no,\n        scrollbars=yes,\n        width=" + width + ",\n        height=" + height + ",\n        top=" + (_this.context.window.outerHeight / 2 - height / 2) + ",\n        left=" + (_this.context.window.outerWidth / 2 - width / 2) + ",\n      ");
            _this.onAuthSuccess = config.onSuccess;
            _this.onAuthFailure = config.onFailure;
            // Create a interval to check if the child window has been closed
            _this.monitor = _this.context.window.setInterval(function () {
                if (!_this.authWindow || _this.authWindow.closed) {
                    _this.clearMonitor();
                    _this.onAuthFailure({
                        type: "canceled_by_user",
                        reason: "Cancelled by User"
                    });
                }
            }, 100);
        };
        /**
         * For use when in the [[AuthContext]]. Will notify the parent window that
         * authentication was completed successfully.
         *
         * @param payload Can be anything the user specifies. Will be passed onto
         * onSuccess in [[AuthContext]]
         */
        this.notifySuccess = function (payload) {
            _this.context.parentWindow.postMessage({ type: "authentication.success", payload: payload }, _this.context.window.location.origin);
        };
        /**
         * For use when in the [[AuthContext]]. Will notify the parent window that
         * authentication has failed.
         *
         * @param payload Can be anything the user specifies. Will be passed onto
         * onFailure in [[AuthContext]]
         */
        this.notifyFailure = function (payload) {
            _this.context.parentWindow.postMessage({ type: "authentication.failure", payload: payload }, _this.context.window.location.origin);
        };
        /**
         * Internal method which forwards a message onto the configured success
         * handler, and does cleanup on the auth window
         *
         * @ignore
         */
        this.handleSuccessMessage = function (payload) {
            _this.clearMonitor();
            _this.authWindow && _this.authWindow.close();
            _this.onAuthSuccess && _this.onAuthSuccess(payload);
        };
        /**
         * Internal method which forwards a message onto the configured failure
         * handler, and does cleanup on the auth window
         *
         * @ignore
         */
        this.handleFailureMessage = function (error) {
            _this.clearMonitor();
            _this.authWindow && _this.authWindow.close();
            _this.onAuthFailure && _this.onAuthFailure(error);
        };
        /**
         * Clears the monitor interval, which polls every 100ms to check if the auth
         * window was closed by the user
         */
        this.clearMonitor = function () {
            clearInterval(_this.monitor);
            _this.monitor = undefined;
        };
        this.context = context;
    }
    return Authentication;
}());
/* harmony default export */ var authentication = (authentication_Authentication);

// CONCATENATED MODULE: ./src/contexts/auth.ts

/**
 * Authentication Context. Created when this utility is loaded within an
 * authentication popup.
 */
var auth_AuthContext = /** @class */ (function () {
    function AuthContext() {
        this.window = window;
        this.parentWindow = window.opener;
        this.authentication = new authentication(this);
    }
    return AuthContext;
}());
/* harmony default export */ var auth = (auth_AuthContext);

// CONCATENATED MODULE: ./src/contexts/parent.ts

/**
 * Parent Context. Instantiated when initialize is called from the iframed
 * application.
 */
var parent_ParentContext = /** @class */ (function () {
    function ParentContext() {
        var _this = this;
        /**
         * Handler for the postMessage browser API. Will reject any messages not sent
         * from the same origin as the iframe, or those that do not come in as an
         * object.
         *
         * @param event The browser MessageEvent
         */
        this.processMessage = function (event) {
            var origin = event.origin;
            var source = event.source;
            // Reject any messages that come from the same window, or a different domain
            if (source === _this.window || origin !== _this.window.location.origin) {
                return;
            }
            // Reject, not the correct shape, potentially coming from something malicious
            if (typeof event.data !== "object") {
                return;
            }
            switch (event.data.type) {
                case "authentication.success":
                    _this.authentication.handleSuccessMessage(event.data.payload);
                    break;
                case "authentication.failure":
                    _this.authentication.handleFailureMessage(event.data.payload);
                    break;
            }
        };
        this.window = window;
        this.parentWindow = window.parent;
        this.authentication = new authentication(this);
        this.window.addEventListener("message", this.processMessage, false);
    }
    return ParentContext;
}());
/* harmony default export */ var contexts_parent = (parent_ParentContext);

// CONCATENATED MODULE: ./src/index.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialize", function() { return initialize; });


/**
 * Entry point to the module. Will return the appropriate context for the
 * environment.
 */
function initialize() {
    if (window.opener !== null) {
        return new auth;
    }
    else {
        return new contexts_parent;
    }
}


/***/ })
/******/ ]);
});
//# sourceMappingURL=ProcoreIframeHelpers.js.map