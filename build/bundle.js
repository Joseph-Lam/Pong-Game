/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}

/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "1807ccb13369b7fe201d"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\n__webpack_require__(1);\n\nvar _Game = __webpack_require__(10);\n\nvar _Game2 = _interopRequireDefault(_Game);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar game = new _Game2.default();\n\nvar fps = 30;\n\nfunction gameLoop() {\n  game.render();\n  setTimeout(gameLoop, fps);\n}\n\ngameLoop();//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/OTU1MiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOzs7Ozs7QUFFQSxJQUFJLE9BQU8sb0JBQVg7O0FBRUEsSUFBTSxNQUFNLEVBQVo7O0FBRUEsU0FBUyxRQUFULEdBQW9CO0FBQ25CLE9BQUssTUFBTDtBQUNHLGFBQVcsUUFBWCxFQUFxQixHQUFyQjtBQUNIOztBQUVEIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vZ2FtZS5jc3MnO1xuaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lJztcblxudmFyIGdhbWUgPSBuZXcgR2FtZSgpO1xuXG5jb25zdCBmcHMgPSAzMDtcblxuZnVuY3Rpb24gZ2FtZUxvb3AoKSB7XG5cdGdhbWUucmVuZGVyKCk7XG4gICBcdHNldFRpbWVvdXQoZ2FtZUxvb3AsIGZwcyk7XG59XG5cbmdhbWVMb29wKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(2);\nif(typeof content === 'string') content = [[module.id, content, '']];\n// add the styles to the DOM\nvar update = __webpack_require__(9)(content, {});\nif(content.locals) module.exports = content.locals;\n// Hot Module Replacement\nif(true) {\n\t// When the styles change, update the <style> tags\n\tif(!content.locals) {\n\t\tmodule.hot.accept(2, function() {\n\t\t\tvar newContent = __webpack_require__(2);\n\t\t\tif(typeof newContent === 'string') newContent = [[module.id, newContent, '']];\n\t\t\tupdate(newContent);\n\t\t});\n\t}\n\t// When the module is disposed, remove the <style> tags\n\tmodule.hot.dispose(function() { update(); });\n}//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS5jc3M/YmM3YiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUFnRjtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMiLCJmaWxlIjoiMS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vZ2FtZS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vZ2FtZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9nYW1lLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9nYW1lLmNzc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	eval("exports = module.exports = __webpack_require__(3)();\n// imports\n\n\n// module\nexports.push([module.id, \"/* http://meyerweb.com/eric/tools/css/reset/\\r\\n   v2.0 | 20110126\\r\\n   License: none (public domain)\\r\\n*/\\r\\n\\r\\nhtml, body, div, span, applet, object, iframe,\\r\\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\\r\\na, abbr, acronym, address, big, cite, code,\\r\\ndel, dfn, em, img, ins, kbd, q, s, samp,\\r\\nsmall, strike, strong, sub, sup, tt, var,\\r\\nb, u, i, center,\\r\\ndl, dt, dd, ol, ul, li,\\r\\nfieldset, form, label, legend,\\r\\ntable, caption, tbody, tfoot, thead, tr, th, td,\\r\\narticle, aside, canvas, details, embed,\\r\\nfigure, figcaption, footer, header, hgroup,\\r\\nmenu, nav, output, ruby, section, summary,\\r\\ntime, mark, audio, video {\\r\\n   margin: 0;\\r\\n   padding: 0;\\r\\n   border: 0;\\r\\n   font-size: 100%;\\r\\n   font: inherit;\\r\\n   vertical-align: baseline;\\r\\n}\\r\\n/* HTML5 display-role reset for older browsers */\\r\\narticle, aside, details, figcaption, figure,\\r\\nfooter, header, hgroup, menu, nav, section {\\r\\n   display: block;\\r\\n}\\r\\nbody {\\r\\n   line-height: 1;\\r\\n}\\r\\nol, ul {\\r\\n   list-style: none;\\r\\n}\\r\\nblockquote, q {\\r\\n   quotes: none;\\r\\n}\\r\\nblockquote:before, blockquote:after,\\r\\nq:before, q:after {\\r\\n   content: '';\\r\\n   content: none;\\r\\n}\\r\\ntable {\\r\\n   border-collapse: collapse;\\r\\n   border-spacing: 0;\\r\\n}\\r\\n\\r\\n/* Game Styles */\\r\\n\\r\\n@font-face {\\r\\n    font-family: 'PressStart2P Web';\\r\\n    src: url(\" + __webpack_require__(4) + \");\\r\\n    src: url(\" + __webpack_require__(4) + \"?#iefix) format('embedded-opentype'),\\r\\n         url(\" + __webpack_require__(5) + \") format('woff2'),\\r\\n         url(\" + __webpack_require__(6) + \") format('woff'),\\r\\n         url(\" + __webpack_require__(7) + \") format('truetype'),\\r\\n         url(\" + __webpack_require__(8) + \"#press_start_2pregular) format('svg');\\r\\n    font-weight: normal;\\r\\n    font-style: normal;\\r\\n}\\r\\nbody {\\r\\n   font-family: 'PressStart2P Web', monospace;\\r\\n   margin: 0 auto;\\r\\n   text-align: center;\\r\\n}\\r\\nh1 {\\r\\n   margin-top: 20px;\\r\\n}\\r\\n#game {\\r\\n   display: block;\\r\\n   height: 256px;\\r\\n   margin: 20px auto;\\r\\n   width: 512px;\\r\\n   background-color: #353535; \\r\\n}\\r\\n.players {\\r\\n   display: inline-flex;\\r\\n   justify-content: space-between;\\r\\n   text-align: center;\\r\\n   width: 512px;\\r\\n}\\r\\n\", \"\"]);\n\n// exports\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS5jc3M/NDMxMCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBOzs7QUFHQTtBQUNBLDhwQkFBOHBCLGlCQUFpQixrQkFBa0IsaUJBQWlCLHVCQUF1QixxQkFBcUIsZ0NBQWdDLEtBQUsscUpBQXFKLHNCQUFzQixLQUFLLFVBQVUsc0JBQXNCLEtBQUssWUFBWSx3QkFBd0IsS0FBSyxtQkFBbUIsb0JBQW9CLEtBQUssK0RBQStELG1CQUFtQixxQkFBcUIsS0FBSyxXQUFXLGlDQUFpQyx5QkFBeUIsS0FBSyw2Q0FBNkMsd0NBQXdDLGlEQUE4RSw4V0FBa2dCLDRCQUE0QiwyQkFBMkIsS0FBSyxVQUFVLGtEQUFrRCxzQkFBc0IsMEJBQTBCLEtBQUssUUFBUSx3QkFBd0IsS0FBSyxXQUFXLHNCQUFzQixxQkFBcUIseUJBQXlCLG9CQUFvQixpQ0FBaUMsTUFBTSxjQUFjLDRCQUE0QixzQ0FBc0MsMEJBQTBCLG9CQUFvQixLQUFLOztBQUV2NEUiLCJmaWxlIjoiMi5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC9cXHJcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXHJcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcclxcbiovXFxyXFxuXFxyXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcclxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXHJcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxyXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcclxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxyXFxuYiwgdSwgaSwgY2VudGVyLFxcclxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxyXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxyXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxyXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsXFxyXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLFxcclxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcclxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxyXFxuICAgbWFyZ2luOiAwO1xcclxcbiAgIHBhZGRpbmc6IDA7XFxyXFxuICAgYm9yZGVyOiAwO1xcclxcbiAgIGZvbnQtc2l6ZTogMTAwJTtcXHJcXG4gICBmb250OiBpbmhlcml0O1xcclxcbiAgIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXHJcXG59XFxyXFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcclxcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsXFxyXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXHJcXG4gICBkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuYm9keSB7XFxyXFxuICAgbGluZS1oZWlnaHQ6IDE7XFxyXFxufVxcclxcbm9sLCB1bCB7XFxyXFxuICAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuYmxvY2txdW90ZSwgcSB7XFxyXFxuICAgcXVvdGVzOiBub25lO1xcclxcbn1cXHJcXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXHJcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxyXFxuICAgY29udGVudDogJyc7XFxyXFxuICAgY29udGVudDogbm9uZTtcXHJcXG59XFxyXFxudGFibGUge1xcclxcbiAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxyXFxuICAgYm9yZGVyLXNwYWNpbmc6IDA7XFxyXFxufVxcclxcblxcclxcbi8qIEdhbWUgU3R5bGVzICovXFxyXFxuXFxyXFxuQGZvbnQtZmFjZSB7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAnUHJlc3NTdGFydDJQIFdlYic7XFxyXFxuICAgIHNyYzogdXJsKFwiICsgcmVxdWlyZShcIi4uL2Fzc2V0cy9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC5lb3RcIikgKyBcIik7XFxyXFxuICAgIHNyYzogdXJsKFwiICsgcmVxdWlyZShcIi4uL2Fzc2V0cy9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC5lb3RcIikgKyBcIj8jaWVmaXgpIGZvcm1hdCgnZW1iZWRkZWQtb3BlbnR5cGUnKSxcXHJcXG4gICAgICAgICB1cmwoXCIgKyByZXF1aXJlKFwiLi4vYXNzZXRzL2ZvbnRzL3ByZXNzc3RhcnQycC13ZWJmb250LndvZmYyXCIpICsgXCIpIGZvcm1hdCgnd29mZjInKSxcXHJcXG4gICAgICAgICB1cmwoXCIgKyByZXF1aXJlKFwiLi4vYXNzZXRzL2ZvbnRzL3ByZXNzc3RhcnQycC13ZWJmb250LndvZmZcIikgKyBcIikgZm9ybWF0KCd3b2ZmJyksXFxyXFxuICAgICAgICAgdXJsKFwiICsgcmVxdWlyZShcIi4uL2Fzc2V0cy9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC50dGZcIikgKyBcIikgZm9ybWF0KCd0cnVldHlwZScpLFxcclxcbiAgICAgICAgIHVybChcIiArIHJlcXVpcmUoXCIuLi9hc3NldHMvZm9udHMvcHJlc3NzdGFydDJwLXdlYmZvbnQuc3ZnXCIpICsgXCIjcHJlc3Nfc3RhcnRfMnByZWd1bGFyKSBmb3JtYXQoJ3N2ZycpO1xcclxcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcclxcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxyXFxufVxcclxcbmJvZHkge1xcclxcbiAgIGZvbnQtZmFtaWx5OiAnUHJlc3NTdGFydDJQIFdlYicsIG1vbm9zcGFjZTtcXHJcXG4gICBtYXJnaW46IDAgYXV0bztcXHJcXG4gICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcbmgxIHtcXHJcXG4gICBtYXJnaW4tdG9wOiAyMHB4O1xcclxcbn1cXHJcXG4jZ2FtZSB7XFxyXFxuICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgaGVpZ2h0OiAyNTZweDtcXHJcXG4gICBtYXJnaW46IDIwcHggYXV0bztcXHJcXG4gICB3aWR0aDogNTEycHg7XFxyXFxuICAgYmFja2dyb3VuZC1jb2xvcjogIzM1MzUzNTsgXFxyXFxufVxcclxcbi5wbGF5ZXJzIHtcXHJcXG4gICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXHJcXG4gICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgIHdpZHRoOiA1MTJweDtcXHJcXG59XFxyXFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL3NyYy9nYW1lLmNzc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("/*\r\n\tMIT License http://www.opensource.org/licenses/mit-license.php\r\n\tAuthor Tobias Koppers @sokra\r\n*/\r\n// css base code, injected by the css-loader\r\nmodule.exports = function() {\r\n\tvar list = [];\r\n\r\n\t// return the list of modules as css string\r\n\tlist.toString = function toString() {\r\n\t\tvar result = [];\r\n\t\tfor(var i = 0; i < this.length; i++) {\r\n\t\t\tvar item = this[i];\r\n\t\t\tif(item[2]) {\r\n\t\t\t\tresult.push(\"@media \" + item[2] + \"{\" + item[1] + \"}\");\r\n\t\t\t} else {\r\n\t\t\t\tresult.push(item[1]);\r\n\t\t\t}\r\n\t\t}\r\n\t\treturn result.join(\"\");\r\n\t};\r\n\r\n\t// import a list of modules into the list\r\n\tlist.i = function(modules, mediaQuery) {\r\n\t\tif(typeof modules === \"string\")\r\n\t\t\tmodules = [[null, modules, \"\"]];\r\n\t\tvar alreadyImportedModules = {};\r\n\t\tfor(var i = 0; i < this.length; i++) {\r\n\t\t\tvar id = this[i][0];\r\n\t\t\tif(typeof id === \"number\")\r\n\t\t\t\talreadyImportedModules[id] = true;\r\n\t\t}\r\n\t\tfor(i = 0; i < modules.length; i++) {\r\n\t\t\tvar item = modules[i];\r\n\t\t\t// skip already imported module\r\n\t\t\t// this implementation is not 100% perfect for weird media query combinations\r\n\t\t\t//  when a module is imported multiple times with different media queries.\r\n\t\t\t//  I hope this will never occur (Hey this way we have smaller bundles)\r\n\t\t\tif(typeof item[0] !== \"number\" || !alreadyImportedModules[item[0]]) {\r\n\t\t\t\tif(mediaQuery && !item[2]) {\r\n\t\t\t\t\titem[2] = mediaQuery;\r\n\t\t\t\t} else if(mediaQuery) {\r\n\t\t\t\t\titem[2] = \"(\" + item[2] + \") and (\" + mediaQuery + \")\";\r\n\t\t\t\t}\r\n\t\t\t\tlist.push(item);\r\n\t\t\t}\r\n\t\t}\r\n\t};\r\n\treturn list;\r\n};\r\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzP2RhMDQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0Esd0NBQXdDLGdCQUFnQjtBQUN4RCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksb0JBQW9CO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiIzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cclxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHJcblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XHJcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcclxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xyXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"/fonts/pressstart2p-webfont.eot\";//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvZm9udHMvcHJlc3NzdGFydDJwLXdlYmZvbnQuZW90PzJiYTQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiNC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC5lb3RcIjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vYXNzZXRzL2ZvbnRzL3ByZXNzc3RhcnQycC13ZWJmb250LmVvdFxuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"/fonts/pressstart2p-webfont.woff2\";//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvZm9udHMvcHJlc3NzdGFydDJwLXdlYmZvbnQud29mZjI/YzJiNCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiI1LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiL2ZvbnRzL3ByZXNzc3RhcnQycC13ZWJmb250LndvZmYyXCI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2Fzc2V0cy9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC53b2ZmMlxuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"/fonts/pressstart2p-webfont.woff\";//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvZm9udHMvcHJlc3NzdGFydDJwLXdlYmZvbnQud29mZj8wNzQ3Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6IjYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCIvZm9udHMvcHJlc3NzdGFydDJwLXdlYmZvbnQud29mZlwiO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hc3NldHMvZm9udHMvcHJlc3NzdGFydDJwLXdlYmZvbnQud29mZlxuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"/fonts/pressstart2p-webfont.ttf\";//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvZm9udHMvcHJlc3NzdGFydDJwLXdlYmZvbnQudHRmP2U5YjEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiNy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC50dGZcIjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vYXNzZXRzL2ZvbnRzL3ByZXNzc3RhcnQycC13ZWJmb250LnR0ZlxuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"/fonts/pressstart2p-webfont.svg\";//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvZm9udHMvcHJlc3NzdGFydDJwLXdlYmZvbnQuc3ZnP2RkNGQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiOC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC5zdmdcIjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vYXNzZXRzL2ZvbnRzL3ByZXNzc3RhcnQycC13ZWJmb250LnN2Z1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	eval("/*\r\n\tMIT License http://www.opensource.org/licenses/mit-license.php\r\n\tAuthor Tobias Koppers @sokra\r\n*/\r\nvar stylesInDom = {},\r\n\tmemoize = function(fn) {\r\n\t\tvar memo;\r\n\t\treturn function () {\r\n\t\t\tif (typeof memo === \"undefined\") memo = fn.apply(this, arguments);\r\n\t\t\treturn memo;\r\n\t\t};\r\n\t},\r\n\tisOldIE = memoize(function() {\r\n\t\treturn /msie [6-9]\\b/.test(window.navigator.userAgent.toLowerCase());\r\n\t}),\r\n\tgetHeadElement = memoize(function () {\r\n\t\treturn document.head || document.getElementsByTagName(\"head\")[0];\r\n\t}),\r\n\tsingletonElement = null,\r\n\tsingletonCounter = 0,\r\n\tstyleElementsInsertedAtTop = [];\r\n\r\nmodule.exports = function(list, options) {\r\n\tif(false) {\r\n\t\tif(typeof document !== \"object\") throw new Error(\"The style-loader cannot be used in a non-browser environment\");\r\n\t}\r\n\r\n\toptions = options || {};\r\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\r\n\t// tags it will allow on a page\r\n\tif (typeof options.singleton === \"undefined\") options.singleton = isOldIE();\r\n\r\n\t// By default, add <style> tags to the bottom of <head>.\r\n\tif (typeof options.insertAt === \"undefined\") options.insertAt = \"bottom\";\r\n\r\n\tvar styles = listToStyles(list);\r\n\taddStylesToDom(styles, options);\r\n\r\n\treturn function update(newList) {\r\n\t\tvar mayRemove = [];\r\n\t\tfor(var i = 0; i < styles.length; i++) {\r\n\t\t\tvar item = styles[i];\r\n\t\t\tvar domStyle = stylesInDom[item.id];\r\n\t\t\tdomStyle.refs--;\r\n\t\t\tmayRemove.push(domStyle);\r\n\t\t}\r\n\t\tif(newList) {\r\n\t\t\tvar newStyles = listToStyles(newList);\r\n\t\t\taddStylesToDom(newStyles, options);\r\n\t\t}\r\n\t\tfor(var i = 0; i < mayRemove.length; i++) {\r\n\t\t\tvar domStyle = mayRemove[i];\r\n\t\t\tif(domStyle.refs === 0) {\r\n\t\t\t\tfor(var j = 0; j < domStyle.parts.length; j++)\r\n\t\t\t\t\tdomStyle.parts[j]();\r\n\t\t\t\tdelete stylesInDom[domStyle.id];\r\n\t\t\t}\r\n\t\t}\r\n\t};\r\n}\r\n\r\nfunction addStylesToDom(styles, options) {\r\n\tfor(var i = 0; i < styles.length; i++) {\r\n\t\tvar item = styles[i];\r\n\t\tvar domStyle = stylesInDom[item.id];\r\n\t\tif(domStyle) {\r\n\t\t\tdomStyle.refs++;\r\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\r\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\r\n\t\t\t}\r\n\t\t\tfor(; j < item.parts.length; j++) {\r\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\r\n\t\t\t}\r\n\t\t} else {\r\n\t\t\tvar parts = [];\r\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\r\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\r\n\t\t\t}\r\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction listToStyles(list) {\r\n\tvar styles = [];\r\n\tvar newStyles = {};\r\n\tfor(var i = 0; i < list.length; i++) {\r\n\t\tvar item = list[i];\r\n\t\tvar id = item[0];\r\n\t\tvar css = item[1];\r\n\t\tvar media = item[2];\r\n\t\tvar sourceMap = item[3];\r\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\r\n\t\tif(!newStyles[id])\r\n\t\t\tstyles.push(newStyles[id] = {id: id, parts: [part]});\r\n\t\telse\r\n\t\t\tnewStyles[id].parts.push(part);\r\n\t}\r\n\treturn styles;\r\n}\r\n\r\nfunction insertStyleElement(options, styleElement) {\r\n\tvar head = getHeadElement();\r\n\tvar lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];\r\n\tif (options.insertAt === \"top\") {\r\n\t\tif(!lastStyleElementInsertedAtTop) {\r\n\t\t\thead.insertBefore(styleElement, head.firstChild);\r\n\t\t} else if(lastStyleElementInsertedAtTop.nextSibling) {\r\n\t\t\thead.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);\r\n\t\t} else {\r\n\t\t\thead.appendChild(styleElement);\r\n\t\t}\r\n\t\tstyleElementsInsertedAtTop.push(styleElement);\r\n\t} else if (options.insertAt === \"bottom\") {\r\n\t\thead.appendChild(styleElement);\r\n\t} else {\r\n\t\tthrow new Error(\"Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.\");\r\n\t}\r\n}\r\n\r\nfunction removeStyleElement(styleElement) {\r\n\tstyleElement.parentNode.removeChild(styleElement);\r\n\tvar idx = styleElementsInsertedAtTop.indexOf(styleElement);\r\n\tif(idx >= 0) {\r\n\t\tstyleElementsInsertedAtTop.splice(idx, 1);\r\n\t}\r\n}\r\n\r\nfunction createStyleElement(options) {\r\n\tvar styleElement = document.createElement(\"style\");\r\n\tstyleElement.type = \"text/css\";\r\n\tinsertStyleElement(options, styleElement);\r\n\treturn styleElement;\r\n}\r\n\r\nfunction createLinkElement(options) {\r\n\tvar linkElement = document.createElement(\"link\");\r\n\tlinkElement.rel = \"stylesheet\";\r\n\tinsertStyleElement(options, linkElement);\r\n\treturn linkElement;\r\n}\r\n\r\nfunction addStyle(obj, options) {\r\n\tvar styleElement, update, remove;\r\n\r\n\tif (options.singleton) {\r\n\t\tvar styleIndex = singletonCounter++;\r\n\t\tstyleElement = singletonElement || (singletonElement = createStyleElement(options));\r\n\t\tupdate = applyToSingletonTag.bind(null, styleElement, styleIndex, false);\r\n\t\tremove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);\r\n\t} else if(obj.sourceMap &&\r\n\t\ttypeof URL === \"function\" &&\r\n\t\ttypeof URL.createObjectURL === \"function\" &&\r\n\t\ttypeof URL.revokeObjectURL === \"function\" &&\r\n\t\ttypeof Blob === \"function\" &&\r\n\t\ttypeof btoa === \"function\") {\r\n\t\tstyleElement = createLinkElement(options);\r\n\t\tupdate = updateLink.bind(null, styleElement);\r\n\t\tremove = function() {\r\n\t\t\tremoveStyleElement(styleElement);\r\n\t\t\tif(styleElement.href)\r\n\t\t\t\tURL.revokeObjectURL(styleElement.href);\r\n\t\t};\r\n\t} else {\r\n\t\tstyleElement = createStyleElement(options);\r\n\t\tupdate = applyToTag.bind(null, styleElement);\r\n\t\tremove = function() {\r\n\t\t\tremoveStyleElement(styleElement);\r\n\t\t};\r\n\t}\r\n\r\n\tupdate(obj);\r\n\r\n\treturn function updateStyle(newObj) {\r\n\t\tif(newObj) {\r\n\t\t\tif(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)\r\n\t\t\t\treturn;\r\n\t\t\tupdate(obj = newObj);\r\n\t\t} else {\r\n\t\t\tremove();\r\n\t\t}\r\n\t};\r\n}\r\n\r\nvar replaceText = (function () {\r\n\tvar textStore = [];\r\n\r\n\treturn function (index, replacement) {\r\n\t\ttextStore[index] = replacement;\r\n\t\treturn textStore.filter(Boolean).join('\\n');\r\n\t};\r\n})();\r\n\r\nfunction applyToSingletonTag(styleElement, index, remove, obj) {\r\n\tvar css = remove ? \"\" : obj.css;\r\n\r\n\tif (styleElement.styleSheet) {\r\n\t\tstyleElement.styleSheet.cssText = replaceText(index, css);\r\n\t} else {\r\n\t\tvar cssNode = document.createTextNode(css);\r\n\t\tvar childNodes = styleElement.childNodes;\r\n\t\tif (childNodes[index]) styleElement.removeChild(childNodes[index]);\r\n\t\tif (childNodes.length) {\r\n\t\t\tstyleElement.insertBefore(cssNode, childNodes[index]);\r\n\t\t} else {\r\n\t\t\tstyleElement.appendChild(cssNode);\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction applyToTag(styleElement, obj) {\r\n\tvar css = obj.css;\r\n\tvar media = obj.media;\r\n\r\n\tif(media) {\r\n\t\tstyleElement.setAttribute(\"media\", media)\r\n\t}\r\n\r\n\tif(styleElement.styleSheet) {\r\n\t\tstyleElement.styleSheet.cssText = css;\r\n\t} else {\r\n\t\twhile(styleElement.firstChild) {\r\n\t\t\tstyleElement.removeChild(styleElement.firstChild);\r\n\t\t}\r\n\t\tstyleElement.appendChild(document.createTextNode(css));\r\n\t}\r\n}\r\n\r\nfunction updateLink(linkElement, obj) {\r\n\tvar css = obj.css;\r\n\tvar sourceMap = obj.sourceMap;\r\n\r\n\tif(sourceMap) {\r\n\t\t// http://stackoverflow.com/a/26603875\r\n\t\tcss += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + \" */\";\r\n\t}\r\n\r\n\tvar blob = new Blob([css], { type: \"text/css\" });\r\n\r\n\tvar oldSrc = linkElement.href;\r\n\r\n\tlinkElement.href = URL.createObjectURL(blob);\r\n\r\n\tif(oldSrc)\r\n\t\tURL.revokeObjectURL(oldSrc);\r\n}\r\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanM/Yjk4MCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQixtQkFBbUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHNCQUFzQjtBQUN0QztBQUNBO0FBQ0Esa0JBQWtCLDJCQUEyQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLG1CQUFtQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiwyQkFBMkI7QUFDNUM7QUFDQTtBQUNBLFFBQVEsdUJBQXVCO0FBQy9CO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxpQkFBaUIsdUJBQXVCO0FBQ3hDO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxnQ0FBZ0Msc0JBQXNCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7O0FBRUEsNkJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBIiwiZmlsZSI6IjkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fSxcclxuXHRtZW1vaXplID0gZnVuY3Rpb24oZm4pIHtcclxuXHRcdHZhciBtZW1vO1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0cmV0dXJuIG1lbW87XHJcblx0XHR9O1xyXG5cdH0sXHJcblx0aXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gL21zaWUgWzYtOV1cXGIvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7XHJcblx0fSksXHJcblx0Z2V0SGVhZEVsZW1lbnQgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuXHR9KSxcclxuXHRzaW5nbGV0b25FbGVtZW50ID0gbnVsbCxcclxuXHRzaW5nbGV0b25Db3VudGVyID0gMCxcclxuXHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XHJcblx0aWYodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XHJcblx0XHRpZih0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcclxuXHR9XHJcblxyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxyXG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcclxuXHJcblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIDxoZWFkPi5cclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xyXG5cclxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xyXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xyXG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcclxuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xyXG5cdFx0fVxyXG5cdFx0aWYobmV3TGlzdCkge1xyXG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QpO1xyXG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XHJcblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcclxuXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspXHJcblx0XHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXSgpO1xyXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpIHtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0aWYoZG9tU3R5bGUpIHtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0KSB7XHJcblx0dmFyIHN0eWxlcyA9IFtdO1xyXG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG5cdFx0dmFyIGlkID0gaXRlbVswXTtcclxuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xyXG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcclxuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xyXG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xyXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXHJcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCkge1xyXG5cdHZhciBoZWFkID0gZ2V0SGVhZEVsZW1lbnQoKTtcclxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcFtzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcclxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xyXG5cdFx0aWYoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgaGVhZC5maXJzdENoaWxkKTtcclxuXHRcdH0gZWxzZSBpZihsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xyXG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcuIE11c3QgYmUgJ3RvcCcgb3IgJ2JvdHRvbScuXCIpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xyXG5cdHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0dmFyIGlkeCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGVFbGVtZW50KTtcclxuXHRpZihpZHggPj0gMCkge1xyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCk7XHJcblx0cmV0dXJuIHN0eWxlRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBsaW5rRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xyXG5cdGxpbmtFbGVtZW50LnJlbCA9IFwic3R5bGVzaGVldFwiO1xyXG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rRWxlbWVudCk7XHJcblx0cmV0dXJuIGxpbmtFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50LCB1cGRhdGUsIHJlbW92ZTtcclxuXHJcblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XHJcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcclxuXHRcdHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpO1xyXG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSk7XHJcblx0fSBlbHNlIGlmKG9iai5zb3VyY2VNYXAgJiZcclxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdFx0aWYoc3R5bGVFbGVtZW50LmhyZWYpXHJcblx0XHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTChzdHlsZUVsZW1lbnQuaHJlZik7XHJcblx0XHR9O1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHR1cGRhdGUob2JqKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xyXG5cdFx0aWYobmV3T2JqKSB7XHJcblx0XHRcdGlmKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcClcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVtb3ZlKCk7XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgdGV4dFN0b3JlID0gW107XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XHJcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XHJcblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcclxuXHR9O1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xyXG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcclxuXHJcblx0aWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcclxuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGVFbGVtZW50LmNoaWxkTm9kZXM7XHJcblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cclxuXHRpZihtZWRpYSkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxyXG5cdH1cclxuXHJcblx0aWYoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0fSBlbHNlIHtcclxuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVMaW5rKGxpbmtFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0aWYoc291cmNlTWFwKSB7XHJcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxyXG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xyXG5cdH1cclxuXHJcblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XHJcblxyXG5cdHZhciBvbGRTcmMgPSBsaW5rRWxlbWVudC5ocmVmO1xyXG5cclxuXHRsaW5rRWxlbWVudC5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuXHJcblx0aWYob2xkU3JjKVxyXG5cdFx0VVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Game.js\n\n\nvar _Board = __webpack_require__(11);\n\nvar _Board2 = _interopRequireDefault(_Board);\n\nvar _Paddle = __webpack_require__(12);\n\nvar _Paddle2 = _interopRequireDefault(_Paddle);\n\nvar _Ball = __webpack_require__(13);\n\nvar _Ball2 = _interopRequireDefault(_Ball);\n\nvar _ScoreBoard = __webpack_require__(14);\n\nvar _ScoreBoard2 = _interopRequireDefault(_ScoreBoard);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar gap = 10;\n\nvar p1Keys = { up: 65, down: 90 };\nvar p2Keys = { up: 38, down: 40 };\n\nvar Game = function () {\n   function Game() {\n      _classCallCheck(this, Game);\n\n      //canvas\n      var canvas = document.getElementById('game');\n      this.width = canvas.width;\n      this.height = canvas.height;\n      this.context = canvas.getContext('2d');\n      this.context.fillStyle = 'white';\n\n      //board\n      this.board = new _Board2.default(this.width, this.height);\n      //players\n      this.player1 = new _Paddle2.default(this.height, gap, p1Keys);\n      this.player2 = new _Paddle2.default(this.height, this.width - 4 - gap, p2Keys);\n      //ball\n      this.ball1 = new _Ball2.default(this.height, this.width);\n\n      this.leftScore = new _ScoreBoard2.default(this.width / 2 - 50, 30);\n      this.rightScore = new _ScoreBoard2.default(this.width / 2 + 15, 30);\n   }\n\n   _createClass(Game, [{\n      key: 'render',\n      value: function render() {\n         this.board.render(this.context);\n         this.player1.render(this.context);\n         this.player2.render(this.context);\n         this.ball1.render(this.context, this.player1, this.player2);\n         this.leftScore.render(this.context, this.player2);\n         this.rightScore.render(this.context, this.player1);\n      }\n   }]);\n\n   return Game;\n}();\n\nexports.default = Game;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvR2FtZS5qcz82ZjI0Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztxakJBQUE7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU0sTUFBTSxFQUFaOztBQUVBLElBQU0sU0FBUyxFQUFFLElBQUksRUFBTixFQUFVLE1BQU0sRUFBaEIsRUFBZjtBQUNBLElBQU0sU0FBUyxFQUFFLElBQUksRUFBTixFQUFVLE1BQU0sRUFBaEIsRUFBZjs7SUFFcUIsSTtBQUNsQixtQkFBYztBQUFBOztBQUNYO0FBQ0EsVUFBTSxTQUFTLFNBQVMsY0FBVCxDQUF3QixNQUF4QixDQUFmO0FBQ0EsV0FBSyxLQUFMLEdBQWEsT0FBTyxLQUFwQjtBQUNBLFdBQUssTUFBTCxHQUFjLE9BQU8sTUFBckI7QUFDQSxXQUFLLE9BQUwsR0FBZSxPQUFPLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBZjtBQUNBLFdBQUssT0FBTCxDQUFhLFNBQWIsR0FBeUIsT0FBekI7O0FBRUE7QUFDQSxXQUFLLEtBQUwsR0FBYSxvQkFBVSxLQUFLLEtBQWYsRUFBc0IsS0FBSyxNQUEzQixDQUFiO0FBQ0E7QUFDQSxXQUFLLE9BQUwsR0FBZSxxQkFBVyxLQUFLLE1BQWhCLEVBQXdCLEdBQXhCLEVBQTZCLE1BQTdCLENBQWY7QUFDQSxXQUFLLE9BQUwsR0FBZSxxQkFBVyxLQUFLLE1BQWhCLEVBQXdCLEtBQUssS0FBTCxHQUFhLENBQWIsR0FBaUIsR0FBekMsRUFBOEMsTUFBOUMsQ0FBZjtBQUNBO0FBQ0EsV0FBSyxLQUFMLEdBQWEsbUJBQVMsS0FBSyxNQUFkLEVBQXNCLEtBQUssS0FBM0IsQ0FBYjs7QUFFQSxXQUFLLFNBQUwsR0FBaUIseUJBQWdCLEtBQUssS0FBTCxHQUFXLENBQVgsR0FBYSxFQUE3QixFQUFpQyxFQUFqQyxDQUFqQjtBQUNBLFdBQUssVUFBTCxHQUFrQix5QkFBZ0IsS0FBSyxLQUFMLEdBQVcsQ0FBWCxHQUFhLEVBQTdCLEVBQWlDLEVBQWpDLENBQWxCO0FBR0Y7Ozs7K0JBQ1U7QUFDUixjQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLEtBQUssT0FBdkI7QUFDQSxjQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLEtBQUssT0FBekI7QUFDQSxjQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLEtBQUssT0FBekI7QUFDQSxjQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLEtBQUssT0FBdkIsRUFBZ0MsS0FBSyxPQUFyQyxFQUE4QyxLQUFLLE9BQW5EO0FBQ0EsY0FBSyxTQUFMLENBQWUsTUFBZixDQUFzQixLQUFLLE9BQTNCLEVBQW9DLEtBQUssT0FBekM7QUFDQSxjQUFLLFVBQUwsQ0FBZ0IsTUFBaEIsQ0FBdUIsS0FBSyxPQUE1QixFQUFxQyxLQUFLLE9BQTFDO0FBQ0Y7Ozs7OztrQkE3QmlCLEkiLCJmaWxlIjoiMTAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBHYW1lLmpzXHJcbmltcG9ydCBCb2FyZCBmcm9tICcuL0JvYXJkJztcclxuaW1wb3J0IFBhZGRsZSBmcm9tICcuL1BhZGRsZSc7XHJcbmltcG9ydCBCYWxsIGZyb20gJy4vQmFsbCc7XHJcbmltcG9ydCBTY29yZUJvYXJkIGZyb20gJy4vU2NvcmVCb2FyZCc7XHJcblxyXG5jb25zdCBnYXAgPSAxMDtcclxuXHJcbmNvbnN0IHAxS2V5cyA9IHsgdXA6IDY1LCBkb3duOiA5MCB9O1xyXG5jb25zdCBwMktleXMgPSB7IHVwOiAzOCwgZG93bjogNDAsfTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xyXG4gICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgLy9jYW52YXNcclxuICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUnKTtcclxuICAgICAgdGhpcy53aWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgICAgdGhpcy5oZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG4gICAgICB0aGlzLmNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XHJcbiAgICAgIFxyXG4gICAgICAvL2JvYXJkXHJcbiAgICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgICAvL3BsYXllcnNcclxuICAgICAgdGhpcy5wbGF5ZXIxID0gbmV3IFBhZGRsZSh0aGlzLmhlaWdodCwgZ2FwLCBwMUtleXMpO1xyXG4gICAgICB0aGlzLnBsYXllcjIgPSBuZXcgUGFkZGxlKHRoaXMuaGVpZ2h0LCB0aGlzLndpZHRoIC0gNCAtIGdhcCwgcDJLZXlzKTtcclxuICAgICAgLy9iYWxsXHJcbiAgICAgIHRoaXMuYmFsbDEgPSBuZXcgQmFsbCh0aGlzLmhlaWdodCwgdGhpcy53aWR0aCk7XHJcblxyXG4gICAgICB0aGlzLmxlZnRTY29yZSA9IG5ldyBTY29yZUJvYXJkKCh0aGlzLndpZHRoLzItNTApLDMwKTtcclxuICAgICAgdGhpcy5yaWdodFNjb3JlID0gbmV3IFNjb3JlQm9hcmQoKHRoaXMud2lkdGgvMisxNSksMzApO1xyXG5cclxuXHJcbiAgIH1cclxuICAgICByZW5kZXIoKSB7XHJcbiAgICAgIHRoaXMuYm9hcmQucmVuZGVyKHRoaXMuY29udGV4dCk7XHJcbiAgICAgIHRoaXMucGxheWVyMS5yZW5kZXIodGhpcy5jb250ZXh0KTtcclxuICAgICAgdGhpcy5wbGF5ZXIyLnJlbmRlcih0aGlzLmNvbnRleHQpO1xyXG4gICAgICB0aGlzLmJhbGwxLnJlbmRlcih0aGlzLmNvbnRleHQsIHRoaXMucGxheWVyMSwgdGhpcy5wbGF5ZXIyKTtcclxuICAgICAgdGhpcy5sZWZ0U2NvcmUucmVuZGVyKHRoaXMuY29udGV4dCwgdGhpcy5wbGF5ZXIyKTtcclxuICAgICAgdGhpcy5yaWdodFNjb3JlLnJlbmRlcih0aGlzLmNvbnRleHQsIHRoaXMucGxheWVyMSk7XHJcbiAgIH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0dhbWUuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 11 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n// Board.js\nvar Board = function () {\n    function Board(width, height) {\n        _classCallCheck(this, Board);\n\n        this.width = width;\n        this.height = height;\n    }\n\n    _createClass(Board, [{\n        key: \"drawLine\",\n        value: function drawLine(ctx) {\n            ctx.setLineDash([10, 10]);\n            ctx.beginPath();\n            ctx.moveTo(this.width / 2, 0);\n            ctx.lineTo(this.width / 2, this.height);\n            ctx.strokeStyle = \"white\";\n            ctx.stroke();\n        }\n    }, {\n        key: \"render\",\n        value: function render(ctx) {\n            ctx.clearRect(0, 0, this.width, this.height);\n            this.drawLine(ctx);\n        }\n    }]);\n\n    return Board;\n}();\n\nexports.default = Board;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQm9hcmQuanM/OWQ5NSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7SUFDcUIsSztBQUNqQixtQkFBWSxLQUFaLEVBQW1CLE1BQW5CLEVBQTJCO0FBQUE7O0FBQ3ZCLGFBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxhQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0g7Ozs7aUNBQ1EsRyxFQUFLO0FBQ1YsZ0JBQUksV0FBSixDQUFnQixDQUFDLEVBQUQsRUFBSyxFQUFMLENBQWhCO0FBQ0EsZ0JBQUksU0FBSjtBQUNBLGdCQUFJLE1BQUosQ0FBVyxLQUFLLEtBQUwsR0FBYSxDQUF4QixFQUEyQixDQUEzQjtBQUNBLGdCQUFJLE1BQUosQ0FBVyxLQUFLLEtBQUwsR0FBYSxDQUF4QixFQUEyQixLQUFLLE1BQWhDO0FBQ0EsZ0JBQUksV0FBSixHQUFrQixPQUFsQjtBQUNBLGdCQUFJLE1BQUo7QUFDSDs7OytCQUNNLEcsRUFBSztBQUNaLGdCQUFJLFNBQUosQ0FBYyxDQUFkLEVBQWlCLENBQWpCLEVBQW9CLEtBQUssS0FBekIsRUFBZ0MsS0FBSyxNQUFyQztBQUNJLGlCQUFLLFFBQUwsQ0FBYyxHQUFkO0FBQ0g7Ozs7OztrQkFoQmdCLEsiLCJmaWxlIjoiMTEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBCb2FyZC5qc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2FyZCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgfVxyXG4gICAgZHJhd0xpbmUoY3R4KSB7XHJcbiAgICAgICAgY3R4LnNldExpbmVEYXNoKFsxMCwgMTBdKTtcclxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY3R4Lm1vdmVUbyh0aGlzLndpZHRoIC8gMiwgMCk7XHJcbiAgICAgICAgY3R4LmxpbmVUbyh0aGlzLndpZHRoIC8gMiwgdGhpcy5oZWlnaHQpO1xyXG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwid2hpdGVcIjtcclxuICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoY3R4KSB7XHJcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLmRyYXdMaW5lKGN0eCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvQm9hcmQuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 12 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar color = '#' + Math.random().toString(16).substr(2, 6);\n\nvar Paddle = function () {\n   function Paddle(height, x, control) {\n      var _this = this;\n\n      _classCallCheck(this, Paddle);\n\n      this.width = 5;\n      this.height = 60;\n      this.x = x;\n      this.y = height / 2 - this.height / 2;\n      this.speed = 20;\n      this.maxHeight = height;\n      this.score = 0;\n\n      function getRandomColor() {\n         var letters = '0123456789ABCDEF';\n         var color = '#';\n         for (var i = 0; i < 6; i++) {\n            color += letters[Math.floor(Math.random() * 16)];\n         }\n         return color;\n      }\n\n      document.addEventListener('keydown', function (event) {\n         switch (event.keyCode) {\n            case control.up:\n               _this.y = Math.max(0, _this.y - _this.speed);\n               break;\n\n            case control.down:\n               _this.y = Math.min(_this.maxHeight - _this.height, _this.y + _this.speed);\n               break;\n\n         }\n      });\n   }\n\n   _createClass(Paddle, [{\n      key: 'scoreMethod',\n      value: function scoreMethod() {\n         this.score += 1;\n      }\n   }, {\n      key: 'render',\n      value: function render(ctx) {\n         ctx.fillStyle = color;\n         ctx.fillRect(this.x, this.y, this.width, this.height);\n      }\n   }]);\n\n   return Paddle;\n}();\n\nexports.default = Paddle;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUGFkZGxlLmpzP2ZkYmQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQU0sUUFBTyxNQUFJLEtBQUssTUFBTCxHQUFjLFFBQWQsQ0FBdUIsRUFBdkIsRUFBMkIsTUFBM0IsQ0FBa0MsQ0FBbEMsRUFBb0MsQ0FBcEMsQ0FBakI7O0lBRXFCLE07QUFDbEIsbUJBQVksTUFBWixFQUFvQixDQUFwQixFQUF1QixPQUF2QixFQUFnQztBQUFBOztBQUFBOztBQUM3QixXQUFLLEtBQUwsR0FBYSxDQUFiO0FBQ0EsV0FBSyxNQUFMLEdBQWMsRUFBZDtBQUNBLFdBQUssQ0FBTCxHQUFTLENBQVQ7QUFDQSxXQUFLLENBQUwsR0FBVSxTQUFTLENBQVYsR0FBZ0IsS0FBSyxNQUFMLEdBQWMsQ0FBdkM7QUFDQSxXQUFLLEtBQUwsR0FBYSxFQUFiO0FBQ0EsV0FBSyxTQUFMLEdBQWlCLE1BQWpCO0FBQ0EsV0FBSyxLQUFMLEdBQWEsQ0FBYjs7QUFFQSxlQUFTLGNBQVQsR0FBMEI7QUFDMUIsYUFBSSxVQUFVLGtCQUFkO0FBQ0EsYUFBSSxRQUFRLEdBQVo7QUFDQSxjQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksQ0FBcEIsRUFBdUIsR0FBdkIsRUFBNkI7QUFDM0IscUJBQVMsUUFBUSxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBZ0IsRUFBM0IsQ0FBUixDQUFUO0FBQ0Q7QUFDRCxnQkFBTyxLQUFQO0FBQ0M7O0FBRUQsZUFBUyxnQkFBVCxDQUEwQixTQUExQixFQUFxQyxpQkFBUztBQUM5QyxpQkFBUSxNQUFNLE9BQWQ7QUFDRyxpQkFBSyxRQUFRLEVBQWI7QUFDRyxxQkFBSyxDQUFMLEdBQVMsS0FBSyxHQUFMLENBQ04sQ0FETSxFQUVOLE1BQUssQ0FBTCxHQUFTLE1BQUssS0FGUixDQUFUO0FBSUE7O0FBRUgsaUJBQUssUUFBUSxJQUFiO0FBQ0cscUJBQUssQ0FBTCxHQUFTLEtBQUssR0FBTCxDQUNOLE1BQUssU0FBTCxHQUFpQixNQUFLLE1BRGhCLEVBRU4sTUFBSyxDQUFMLEdBQVMsTUFBSyxLQUZSLENBQVQ7QUFJQTs7QUFiTjtBQWlCRixPQWxCRTtBQW1CRjs7OztvQ0FFYTtBQUNYLGNBQUssS0FBTCxJQUFjLENBQWQ7QUFDRjs7OzZCQUVNLEcsRUFBSztBQUNULGFBQUksU0FBSixHQUFnQixLQUFoQjtBQUNBLGFBQUksUUFBSixDQUNHLEtBQUssQ0FEUixFQUNXLEtBQUssQ0FEaEIsRUFFRyxLQUFLLEtBRlIsRUFFZSxLQUFLLE1BRnBCO0FBSUY7Ozs7OztrQkFsRGlCLE0iLCJmaWxlIjoiMTIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjb2xvciA9JyMnK01hdGgucmFuZG9tKCkudG9TdHJpbmcoMTYpLnN1YnN0cigyLDYpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFkZGxlIHtcclxuICAgY29uc3RydWN0b3IoaGVpZ2h0LCB4LCBjb250cm9sKSB7XHJcbiAgICAgIHRoaXMud2lkdGggPSA1O1xyXG4gICAgICB0aGlzLmhlaWdodCA9IDYwO1xyXG4gICAgICB0aGlzLnggPSB4O1xyXG4gICAgICB0aGlzLnkgPSAoaGVpZ2h0IC8gMikgLSAodGhpcy5oZWlnaHQgLyAyKTtcclxuICAgICAgdGhpcy5zcGVlZCA9IDIwO1xyXG4gICAgICB0aGlzLm1heEhlaWdodCA9IGhlaWdodDtcclxuICAgICAgdGhpcy5zY29yZSA9IDA7XHJcblxyXG4gICAgICBmdW5jdGlvbiBnZXRSYW5kb21Db2xvcigpIHtcclxuICAgICAgdmFyIGxldHRlcnMgPSAnMDEyMzQ1Njc4OUFCQ0RFRic7XHJcbiAgICAgIHZhciBjb2xvciA9ICcjJztcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA2OyBpKysgKSB7XHJcbiAgICAgICAgY29sb3IgKz0gbGV0dGVyc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNildO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBjb2xvcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGV2ZW50ID0+IHtcclxuICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XHJcbiAgICAgICAgIGNhc2UgY29udHJvbC51cDpcclxuICAgICAgICAgICAgdGhpcy55ID0gTWF0aC5tYXgoXHJcbiAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgIHRoaXMueSAtIHRoaXMuc3BlZWRcclxuICAgICAgICAgICAgICAgKTsgXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgY2FzZSBjb250cm9sLmRvd246XHJcbiAgICAgICAgICAgIHRoaXMueSA9IE1hdGgubWluIChcclxuICAgICAgICAgICAgICAgdGhpcy5tYXhIZWlnaHQgLSB0aGlzLmhlaWdodCxcclxuICAgICAgICAgICAgICAgdGhpcy55ICsgdGhpcy5zcGVlZFxyXG4gICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgIH0pXHJcbiAgIH07XHJcblxyXG4gICBzY29yZU1ldGhvZCgpIHtcclxuICAgICAgdGhpcy5zY29yZSArPSAxO1xyXG4gICB9O1xyXG5cclxuICAgcmVuZGVyKGN0eCkgeyBcclxuICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICBjdHguZmlsbFJlY3QoXHJcbiAgICAgICAgIHRoaXMueCwgdGhpcy55LFxyXG4gICAgICAgICB0aGlzLndpZHRoLCB0aGlzLmhlaWdodFxyXG4gICAgICApO1xyXG4gICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvUGFkZGxlLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 13 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar size = 5;\nvar color = '#' + Math.random().toString(16).substr(2, 6);\n\nvar Ball = function () {\n  function Ball(height, width) {\n    _classCallCheck(this, Ball);\n\n    this.x = width / 2; // random x\n    this.y = height / 2; // random y\n    this.vy = Math.floor(Math.random() * 12 - 6);\n    this.vx = 7 - Math.abs(this.vy);\n    this.size = size;\n    this.height = height;\n    this.width = width;\n  }\n\n  _createClass(Ball, [{\n    key: 'draw',\n    value: function draw(ctx) {\n      //draw the ball\n      ctx.fillStyle = 'red';\n      ctx.beginPath();\n      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);\n      ctx.fill();\n      ctx.closePath();\n    }\n  }, {\n    key: 'randomSound',\n    value: function randomSound() {\n      var sound1 = new Audio(\"../assets/sounds/pong-01.wav\");\n      var sound2 = new Audio(\"../assets/sounds/pong-02.wav\");\n      var sound3 = new Audio(\"../assets/sounds/pong-03.wav\");\n\n      var soundArray = [sound1, sound2, sound3];\n      var rand = Math.random();\n      var rand = rand * soundArray.length;\n      var rand = Math.floor(rand);\n      soundArray[rand].play();\n    }\n  }, {\n    key: 'wallBounce',\n    value: function wallBounce(ctx) {\n\n      var hitLeft = this.x >= this.width;\n      var hitRight = this.x + this.size <= 0;\n      var hitTop = this.y + this.size <= 0;\n      var hitBottom = this.y >= this.height;\n\n      if (hitLeft || hitRight) {\n        this.vx = -this.vx;\n      } else if (hitTop || hitBottom) {\n        this.vy = -this.vy;\n        this.randomSound();\n      }\n    }\n  }, {\n    key: 'paddleCollision',\n    value: function paddleCollision(player1, player2) {\n      if (this.vx > 0) {\n        var inRightEnd = player2.x <= this.x + this.size && player2.x > this.x - this.vx + this.size;\n        if (inRightEnd) {\n          var collisionDiff = this.x + this.size - player2.x;\n          var k = collisionDiff / this.vx;\n          var y = this.vy * k + (this.y - this.vy);\n          var hitRightPaddle = y >= player2.y && y + this.size <= player2.y + player2.height;\n          if (hitRightPaddle) {\n            this.x = player2.x - this.size;\n            this.y = Math.floor(this.y - this.vy + this.vy * k);\n            this.vx = -this.vx * 1.10;\n            this.randomSound();\n            if (this.vx > 10) {\n              this.vx = 10;\n            }\n          }\n        }\n      } else {\n        var inLeftEnd = player1.x + player1.width >= this.x;\n        if (inLeftEnd) {\n          console.log(player1.x + player1.width);\n          var _collisionDiff = player1.x + player1.width;\n          var _k = _collisionDiff / -this.vx;\n          var _y = this.vy * _k + (this.y - this.vy);\n          var hitLeftPaddle = _y >= player1.y && _y + this.size <= player1.y + player1.height;\n          if (hitLeftPaddle) {\n            this.x = player1.x + player1.width;\n            this.y = Math.floor(this.y - this.vy + this.vy * _k);\n            this.vx = -this.vx * 1.10;\n            this.randomSound();\n            if (this.vx > 10) {\n              this.vx = 10;\n            }\n          }\n        }\n      }\n    }\n  }, {\n    key: 'ballReset',\n    value: function ballReset() {\n      this.x = this.width / 2;\n      this.y = this.height / 2;\n      this.vy = -Math.floor(Math.random() * 12 - 6);\n      this.vx = -(7 - Math.abs(this.vy));\n    }\n  }, {\n    key: 'goal',\n    value: function goal(player1, player2) {\n      if (this.x >= this.width) {\n        player2.scoreMethod();\n        this.ballReset();\n      } else if (this.x <= 0) {\n        player1.scoreMethod();\n        this.ballReset();\n        this.vx = -this.vx;\n      }\n    }\n  }, {\n    key: 'render',\n    value: function render(ctx, player1, player2) {\n      this.draw(ctx);\n      //add movement to ball\t\n      this.x += this.vx;\n      this.y += this.vy;\n      //wallBounce\n      this.wallBounce(ctx);\n      //paddle collisions\n      this.paddleCollision(player1, player2);\n      this.goal(player1, player2);\n    }\n  }]);\n\n  return Ball;\n}();\n\nexports.default = Ball;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQmFsbC5qcz9iODFhIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFNLE9BQU8sQ0FBYjtBQUNBLElBQU0sUUFBTyxNQUFJLEtBQUssTUFBTCxHQUFjLFFBQWQsQ0FBdUIsRUFBdkIsRUFBMkIsTUFBM0IsQ0FBa0MsQ0FBbEMsRUFBb0MsQ0FBcEMsQ0FBakI7O0lBRXFCLEk7QUFDcEIsZ0JBQVksTUFBWixFQUFvQixLQUFwQixFQUEyQjtBQUFBOztBQUNyQixTQUFLLENBQUwsR0FBUyxRQUFNLENBQWYsQ0FEcUIsQ0FDSDtBQUNsQixTQUFLLENBQUwsR0FBUyxTQUFPLENBQWhCLENBRnFCLENBRUY7QUFDbkIsU0FBSyxFQUFMLEdBQVUsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLEVBQWhCLEdBQXFCLENBQWhDLENBQVY7QUFDQSxTQUFLLEVBQUwsR0FBVyxJQUFJLEtBQUssR0FBTCxDQUFTLEtBQUssRUFBZCxDQUFmO0FBQ0EsU0FBSyxJQUFMLEdBQVksSUFBWjtBQUNBLFNBQUssTUFBTCxHQUFjLE1BQWQ7QUFDQSxTQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0Y7Ozs7eUJBSUcsRyxFQUFLO0FBQ1Q7QUFDQSxVQUFJLFNBQUosR0FBZ0IsS0FBaEI7QUFDQSxVQUFJLFNBQUo7QUFDQSxVQUFJLEdBQUosQ0FBUSxLQUFLLENBQWIsRUFBZ0IsS0FBSyxDQUFyQixFQUF3QixLQUFLLElBQTdCLEVBQW1DLENBQW5DLEVBQXNDLElBQUksS0FBSyxFQUEvQztBQUNBLFVBQUksSUFBSjtBQUNBLFVBQUksU0FBSjtBQUNBOzs7a0NBRWE7QUFDZCxVQUFNLFNBQVMsSUFBSSxLQUFKLENBQVUsOEJBQVYsQ0FBZjtBQUNELFVBQU0sU0FBUyxJQUFJLEtBQUosQ0FBVSw4QkFBVixDQUFmO0FBQ0EsVUFBTSxTQUFTLElBQUksS0FBSixDQUFVLDhCQUFWLENBQWY7O0FBRUEsVUFBSSxhQUFhLENBQUMsTUFBRCxFQUFTLE1BQVQsRUFBaUIsTUFBakIsQ0FBakI7QUFDQSxVQUFJLE9BQU8sS0FBSyxNQUFMLEVBQVg7QUFDQSxVQUFJLE9BQU8sT0FBTyxXQUFXLE1BQTdCO0FBQ0EsVUFBSSxPQUFPLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBWDtBQUNBLGlCQUFXLElBQVgsRUFBaUIsSUFBakI7QUFDRTs7OytCQUVVLEcsRUFBSzs7QUFFZixVQUFNLFVBQVUsS0FBSyxDQUFMLElBQVUsS0FBSyxLQUEvQjtBQUNBLFVBQU0sV0FBVyxLQUFLLENBQUwsR0FBUyxLQUFLLElBQWQsSUFBc0IsQ0FBdkM7QUFDQSxVQUFNLFNBQVMsS0FBSyxDQUFMLEdBQVMsS0FBSyxJQUFkLElBQXNCLENBQXJDO0FBQ0EsVUFBTSxZQUFZLEtBQUssQ0FBTCxJQUFVLEtBQUssTUFBakM7O0FBRUEsVUFBRyxXQUFXLFFBQWQsRUFBd0I7QUFDdkIsYUFBSyxFQUFMLEdBQVUsQ0FBQyxLQUFLLEVBQWhCO0FBQ0EsT0FGRCxNQUVPLElBQUksVUFBVSxTQUFkLEVBQXlCO0FBQy9CLGFBQUssRUFBTCxHQUFVLENBQUMsS0FBSyxFQUFoQjtBQUNGLGFBQUssV0FBTDtBQUVFO0FBQ0Q7OztvQ0FFZSxPLEVBQVMsTyxFQUFTO0FBQ2pDLFVBQUksS0FBSyxFQUFMLEdBQVUsQ0FBZCxFQUFpQjtBQUNoQixZQUFNLGFBQ04sUUFBUSxDQUFSLElBQWEsS0FBSyxDQUFMLEdBQVMsS0FBSyxJQUEzQixJQUNBLFFBQVEsQ0FBUixHQUFZLEtBQUssQ0FBTCxHQUFTLEtBQUssRUFBZCxHQUFtQixLQUFLLElBRnBDO0FBR0EsWUFBSSxVQUFKLEVBQWdCO0FBQ2YsY0FBTSxnQkFBZ0IsS0FBSyxDQUFMLEdBQVMsS0FBSyxJQUFkLEdBQXFCLFFBQVEsQ0FBbkQ7QUFDQSxjQUFNLElBQUksZ0JBQWdCLEtBQUssRUFBL0I7QUFDQSxjQUFNLElBQUksS0FBSyxFQUFMLEdBQVUsQ0FBVixJQUFlLEtBQUssQ0FBTCxHQUFTLEtBQUssRUFBN0IsQ0FBVjtBQUNBLGNBQU0saUJBQWlCLEtBQUssUUFBUSxDQUFiLElBQWtCLElBQUksS0FBSyxJQUFULElBQWlCLFFBQVEsQ0FBUixHQUFZLFFBQVEsTUFBOUU7QUFDQSxjQUFJLGNBQUosRUFBb0I7QUFDbkIsaUJBQUssQ0FBTCxHQUFTLFFBQVEsQ0FBUixHQUFZLEtBQUssSUFBMUI7QUFDQSxpQkFBSyxDQUFMLEdBQVMsS0FBSyxLQUFMLENBQVcsS0FBSyxDQUFMLEdBQVMsS0FBSyxFQUFkLEdBQW1CLEtBQUssRUFBTCxHQUFVLENBQXhDLENBQVQ7QUFDSyxpQkFBSyxFQUFMLEdBQVUsQ0FBQyxLQUFLLEVBQU4sR0FBVyxJQUFyQjtBQUNBLGlCQUFLLFdBQUw7QUFDQSxnQkFBSSxLQUFLLEVBQUwsR0FBVSxFQUFkLEVBQWtCO0FBQ2hCLG1CQUFLLEVBQUwsR0FBVSxFQUFWO0FBQ0Q7QUFDTjtBQUNEO0FBQ0QsT0FuQkQsTUFtQk87QUFDTixZQUFNLFlBQVksUUFBUSxDQUFSLEdBQWEsUUFBUSxLQUFyQixJQUErQixLQUFLLENBQXREO0FBQ0EsWUFBSSxTQUFKLEVBQWU7QUFDZCxrQkFBUSxHQUFSLENBQVksUUFBUSxDQUFSLEdBQVksUUFBUSxLQUFoQztBQUNBLGNBQU0saUJBQWdCLFFBQVEsQ0FBUixHQUFZLFFBQVEsS0FBMUM7QUFDQSxjQUFNLEtBQUksaUJBQWdCLENBQUMsS0FBSyxFQUFoQztBQUNBLGNBQU0sS0FBSSxLQUFLLEVBQUwsR0FBVSxFQUFWLElBQWUsS0FBSyxDQUFMLEdBQVMsS0FBSyxFQUE3QixDQUFWO0FBQ0EsY0FBTSxnQkFBZ0IsTUFBSyxRQUFRLENBQWIsSUFBa0IsS0FBSSxLQUFLLElBQVQsSUFDeEMsUUFBUSxDQUFSLEdBQVksUUFBUSxNQURwQjtBQUVBLGNBQUksYUFBSixFQUFtQjtBQUNsQixpQkFBSyxDQUFMLEdBQVMsUUFBUSxDQUFSLEdBQVksUUFBUSxLQUE3QjtBQUNBLGlCQUFLLENBQUwsR0FBUyxLQUFLLEtBQUwsQ0FBVyxLQUFLLENBQUwsR0FBUyxLQUFLLEVBQWQsR0FBbUIsS0FBSyxFQUFMLEdBQVUsRUFBeEMsQ0FBVDtBQUNBLGlCQUFLLEVBQUwsR0FBVSxDQUFDLEtBQUssRUFBTixHQUFXLElBQXJCO0FBQ0ssaUJBQUssV0FBTDtBQUNBLGdCQUFJLEtBQUssRUFBTCxHQUFVLEVBQWQsRUFBa0I7QUFDaEIsbUJBQUssRUFBTCxHQUFVLEVBQVY7QUFDRDtBQUNOO0FBQ0Q7QUFDRDtBQUNEOzs7Z0NBRVk7QUFDWixXQUFLLENBQUwsR0FBUyxLQUFLLEtBQUwsR0FBVyxDQUFwQjtBQUNHLFdBQUssQ0FBTCxHQUFTLEtBQUssTUFBTCxHQUFZLENBQXJCO0FBQ0EsV0FBSyxFQUFMLEdBQVUsQ0FBQyxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBZ0IsRUFBaEIsR0FBcUIsQ0FBaEMsQ0FBWDtBQUNBLFdBQUssRUFBTCxHQUFVLEVBQUUsSUFBSSxLQUFLLEdBQUwsQ0FBUyxLQUFLLEVBQWQsQ0FBTixDQUFWO0FBQ0M7Ozt5QkFFQSxPLEVBQVMsTyxFQUFTO0FBQ3RCLFVBQUksS0FBSyxDQUFMLElBQVUsS0FBSyxLQUFuQixFQUEwQjtBQUN6QixnQkFBUSxXQUFSO0FBQ0EsYUFBSyxTQUFMO0FBR0EsT0FMRCxNQUtPLElBQUksS0FBSyxDQUFMLElBQVUsQ0FBZCxFQUFpQjtBQUN2QixnQkFBUSxXQUFSO0FBQ0EsYUFBSyxTQUFMO0FBQ0EsYUFBSyxFQUFMLEdBQVUsQ0FBQyxLQUFLLEVBQWhCO0FBRUE7QUFDRDs7OzJCQUdNLEcsRUFBSyxPLEVBQVMsTyxFQUFTO0FBQzdCLFdBQUssSUFBTCxDQUFVLEdBQVY7QUFDQTtBQUNBLFdBQUssQ0FBTCxJQUFVLEtBQUssRUFBZjtBQUNBLFdBQUssQ0FBTCxJQUFVLEtBQUssRUFBZjtBQUNBO0FBQ0EsV0FBSyxVQUFMLENBQWdCLEdBQWhCO0FBQ0E7QUFDQSxXQUFLLGVBQUwsQ0FBcUIsT0FBckIsRUFBOEIsT0FBOUI7QUFDQSxXQUFLLElBQUwsQ0FBVSxPQUFWLEVBQW1CLE9BQW5CO0FBQ0E7Ozs7OztrQkE1SGlCLEkiLCJmaWxlIjoiMTMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzaXplID0gNTtcclxuY29uc3QgY29sb3IgPScjJytNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDE2KS5zdWJzdHIoMiw2KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhbGwge1xyXG5cdGNvbnN0cnVjdG9yKGhlaWdodCwgd2lkdGgpIHtcclxuICAgICAgXHR0aGlzLnggPSB3aWR0aC8yOyAvLyByYW5kb20geFxyXG4gICAgICBcdHRoaXMueSA9IGhlaWdodC8yOyAvLyByYW5kb20geVxyXG4gICAgICBcdHRoaXMudnkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMiAtIDYpO1xyXG4gICAgICBcdHRoaXMudnggPSAoNyAtIE1hdGguYWJzKHRoaXMudnkpKTtcclxuICAgICAgXHR0aGlzLnNpemUgPSBzaXplO1xyXG4gICAgICBcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICBcdHRoaXMud2lkdGggPSB3aWR0aDtcclxuICBcdFx0fVxyXG5cclxuXHJcblxyXG4gIFx0ZHJhdyhjdHgpIHtcclxuICBcdFx0Ly9kcmF3IHRoZSBiYWxsXHJcbiAgXHRcdGN0eC5maWxsU3R5bGUgPSAncmVkJztcclxuICBcdFx0Y3R4LmJlZ2luUGF0aCgpO1xyXG4gIFx0XHRjdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLnNpemUsIDAsIDIgKiBNYXRoLlBJKTtcclxuICBcdFx0Y3R4LmZpbGwoKTtcclxuICBcdFx0Y3R4LmNsb3NlUGF0aCgpO1xyXG4gIFx0fVxyXG5cclxuICBcdHJhbmRvbVNvdW5kKCkge1xyXG4gIFx0Y29uc3Qgc291bmQxID0gbmV3IEF1ZGlvKFwiLi4vYXNzZXRzL3NvdW5kcy9wb25nLTAxLndhdlwiKVxyXG5cdFx0Y29uc3Qgc291bmQyID0gbmV3IEF1ZGlvKFwiLi4vYXNzZXRzL3NvdW5kcy9wb25nLTAyLndhdlwiKVxyXG5cdFx0Y29uc3Qgc291bmQzID0gbmV3IEF1ZGlvKFwiLi4vYXNzZXRzL3NvdW5kcy9wb25nLTAzLndhdlwiKVxyXG5cclxuXHRcdHZhciBzb3VuZEFycmF5ID0gW3NvdW5kMSwgc291bmQyLCBzb3VuZDNdO1xyXG5cdFx0dmFyIHJhbmQgPSBNYXRoLnJhbmRvbSgpO1xyXG5cdFx0dmFyIHJhbmQgPSByYW5kICogc291bmRBcnJheS5sZW5ndGg7XHJcblx0XHR2YXIgcmFuZCA9IE1hdGguZmxvb3IocmFuZCk7XHJcblx0XHRzb3VuZEFycmF5W3JhbmRdLnBsYXkoKTtcclxuICBcdH1cclxuXHJcbiAgXHR3YWxsQm91bmNlKGN0eCkge1xyXG4gIFx0XHRcclxuICBcdFx0Y29uc3QgaGl0TGVmdCA9IHRoaXMueCA+PSB0aGlzLndpZHRoO1xyXG4gIFx0XHRjb25zdCBoaXRSaWdodCA9IHRoaXMueCArIHRoaXMuc2l6ZSA8PSAwO1xyXG4gIFx0XHRjb25zdCBoaXRUb3AgPSB0aGlzLnkgKyB0aGlzLnNpemUgPD0gMDtcclxuICBcdFx0Y29uc3QgaGl0Qm90dG9tID0gdGhpcy55ID49IHRoaXMuaGVpZ2h0O1xyXG5cclxuICBcdFx0aWYoaGl0TGVmdCB8fCBoaXRSaWdodCkge1xyXG4gIFx0XHRcdHRoaXMudnggPSAtdGhpcy52eDtcclxuICBcdFx0fSBlbHNlIGlmIChoaXRUb3AgfHwgaGl0Qm90dG9tKSB7XHJcbiAgXHRcdFx0dGhpcy52eSA9IC10aGlzLnZ5O1xyXG5cdFx0XHR0aGlzLnJhbmRvbVNvdW5kKCk7XHJcblxyXG4gIFx0XHR9XHJcbiAgXHR9XHJcblxyXG4gIFx0cGFkZGxlQ29sbGlzaW9uKHBsYXllcjEsIHBsYXllcjIpIHtcclxuICBcdFx0aWYgKHRoaXMudnggPiAwKSB7XHJcbiAgXHRcdFx0Y29uc3QgaW5SaWdodEVuZCA9IFxyXG4gIFx0XHRcdHBsYXllcjIueCA8PSB0aGlzLnggKyB0aGlzLnNpemUgJiZcclxuICBcdFx0XHRwbGF5ZXIyLnggPiB0aGlzLnggLSB0aGlzLnZ4ICsgdGhpcy5zaXplO1xyXG4gIFx0XHRcdGlmIChpblJpZ2h0RW5kKSB7XHJcbiAgXHRcdFx0XHRjb25zdCBjb2xsaXNpb25EaWZmID0gdGhpcy54ICsgdGhpcy5zaXplIC0gcGxheWVyMi54O1xyXG4gIFx0XHRcdFx0Y29uc3QgayA9IGNvbGxpc2lvbkRpZmYgLyB0aGlzLnZ4O1xyXG4gIFx0XHRcdFx0Y29uc3QgeSA9IHRoaXMudnkgKiBrICsgKHRoaXMueSAtIHRoaXMudnkpO1xyXG4gIFx0XHRcdFx0Y29uc3QgaGl0UmlnaHRQYWRkbGUgPSB5ID49IHBsYXllcjIueSAmJiB5ICsgdGhpcy5zaXplIDw9IHBsYXllcjIueSArIHBsYXllcjIuaGVpZ2h0O1xyXG4gIFx0XHRcdFx0aWYgKGhpdFJpZ2h0UGFkZGxlKSB7XHJcbiAgXHRcdFx0XHRcdHRoaXMueCA9IHBsYXllcjIueCAtIHRoaXMuc2l6ZTtcclxuICBcdFx0XHRcdFx0dGhpcy55ID0gTWF0aC5mbG9vcih0aGlzLnkgLSB0aGlzLnZ5ICsgdGhpcy52eSAqIGspO1xyXG4gICAgICAgICAgICB0aGlzLnZ4ID0gLXRoaXMudnggKiAxLjEwO1xyXG4gICAgICAgICAgICB0aGlzLnJhbmRvbVNvdW5kKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZ4ID4gMTApIHtcclxuICAgICAgICAgICAgICB0aGlzLnZ4ID0gMTA7XHJcbiAgICAgICAgICAgIH1cclxuICBcdFx0XHRcdH1cclxuICBcdFx0XHR9XHJcbiAgXHRcdH0gZWxzZSB7XHJcbiAgXHRcdFx0Y29uc3QgaW5MZWZ0RW5kID0gcGxheWVyMS54ICsgKHBsYXllcjEud2lkdGgpID49IHRoaXMueDtcclxuICBcdFx0XHRpZiAoaW5MZWZ0RW5kKSB7XHJcbiAgXHRcdFx0XHRjb25zb2xlLmxvZyhwbGF5ZXIxLnggKyBwbGF5ZXIxLndpZHRoKTtcclxuICBcdFx0XHRcdGNvbnN0IGNvbGxpc2lvbkRpZmYgPSBwbGF5ZXIxLnggKyBwbGF5ZXIxLndpZHRoO1xyXG4gIFx0XHRcdFx0Y29uc3QgayA9IGNvbGxpc2lvbkRpZmYgLyAtdGhpcy52eDtcclxuICBcdFx0XHRcdGNvbnN0IHkgPSB0aGlzLnZ5ICogayArICh0aGlzLnkgLSB0aGlzLnZ5KTtcclxuICBcdFx0XHRcdGNvbnN0IGhpdExlZnRQYWRkbGUgPSB5ID49IHBsYXllcjEueSAmJiB5ICsgdGhpcy5zaXplIDw9XHJcbiAgXHRcdFx0XHRwbGF5ZXIxLnkgKyBwbGF5ZXIxLmhlaWdodDtcclxuICBcdFx0XHRcdGlmIChoaXRMZWZ0UGFkZGxlKSB7XHJcbiAgXHRcdFx0XHRcdHRoaXMueCA9IHBsYXllcjEueCArIHBsYXllcjEud2lkdGg7XHJcbiAgXHRcdFx0XHRcdHRoaXMueSA9IE1hdGguZmxvb3IodGhpcy55IC0gdGhpcy52eSArIHRoaXMudnkgKiBrKTsgICAgICAgICAgICBcclxuICBcdFx0XHRcdFx0dGhpcy52eCA9IC10aGlzLnZ4ICogMS4xMDtcclxuICAgICAgICAgICAgdGhpcy5yYW5kb21Tb3VuZCgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy52eCA+IDEwKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy52eCA9IDEwO1xyXG4gICAgICAgICAgICB9ICAgXHJcbiAgXHRcdFx0XHR9XHJcbiAgXHRcdFx0fVxyXG4gIFx0XHR9XHJcbiAgXHR9XHJcblxyXG4gIFx0YmFsbFJlc2V0ICgpIHtcclxuICBcdFx0dGhpcy54ID0gdGhpcy53aWR0aC8yOyBcclxuICAgICAgXHR0aGlzLnkgPSB0aGlzLmhlaWdodC8yOyBcclxuICAgICAgXHR0aGlzLnZ5ID0gLU1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEyIC0gNik7XHJcbiAgICAgIFx0dGhpcy52eCA9IC0oNyAtIE1hdGguYWJzKHRoaXMudnkpKTtcclxuICAgICAgXHR9XHJcblxyXG4gIFx0Z29hbChwbGF5ZXIxLCBwbGF5ZXIyKSB7XHJcbiAgXHRcdGlmICh0aGlzLnggPj0gdGhpcy53aWR0aCkge1xyXG4gIFx0XHRcdHBsYXllcjIuc2NvcmVNZXRob2QoKTtcclxuICBcdFx0XHR0aGlzLmJhbGxSZXNldCgpO1xyXG4gIFx0XHRcdFxyXG4gIFx0XHRcclxuICBcdFx0fSBlbHNlIGlmICh0aGlzLnggPD0gMCkge1xyXG4gIFx0XHRcdHBsYXllcjEuc2NvcmVNZXRob2QoKTtcclxuICBcdFx0XHR0aGlzLmJhbGxSZXNldCgpO1xyXG4gIFx0XHRcdHRoaXMudnggPSAtdGhpcy52eDtcclxuICBcdFx0XHRcclxuICBcdFx0fVxyXG4gIFx0fVxyXG5cclxuXHJcbiAgXHRyZW5kZXIoY3R4LCBwbGF5ZXIxLCBwbGF5ZXIyKSB7XHJcbiAgXHRcdHRoaXMuZHJhdyhjdHgpO1xyXG4gIFx0XHQvL2FkZCBtb3ZlbWVudCB0byBiYWxsXHRcclxuICBcdFx0dGhpcy54ICs9IHRoaXMudng7XHJcbiAgXHRcdHRoaXMueSArPSB0aGlzLnZ5O1xyXG4gIFx0XHQvL3dhbGxCb3VuY2VcclxuXHRcdCAgdGhpcy53YWxsQm91bmNlKGN0eCk7XHJcblx0XHQgIC8vcGFkZGxlIGNvbGxpc2lvbnNcclxuICBcdFx0dGhpcy5wYWRkbGVDb2xsaXNpb24ocGxheWVyMSwgcGxheWVyMik7XHJcbiAgXHRcdHRoaXMuZ29hbChwbGF5ZXIxLCBwbGF5ZXIyKTtcclxuICBcdH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9CYWxsLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 14 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar ScoreBoard = function () {\n   function ScoreBoard(x, y, score) {\n      _classCallCheck(this, ScoreBoard);\n\n      this.x = x;\n      this.y = y;\n   }\n\n   _createClass(ScoreBoard, [{\n      key: \"render\",\n      value: function render(ctx, player) {\n         ctx.font = \"30px Helvetica\";\n         ctx.fillText(player.score, this.x, this.y);\n      }\n   }]);\n\n   return ScoreBoard;\n}();\n\nexports.default = ScoreBoard;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvU2NvcmVCb2FyZC5qcz8zZjUxIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFDcUIsVTtBQUNsQix1QkFBWSxDQUFaLEVBQWUsQ0FBZixFQUFrQixLQUFsQixFQUF5QjtBQUFBOztBQUN0QixXQUFLLENBQUwsR0FBUyxDQUFUO0FBQ0EsV0FBSyxDQUFMLEdBQVMsQ0FBVDtBQUNGOzs7OzZCQUNNLEcsRUFBSyxNLEVBQVE7QUFDbkIsYUFBSSxJQUFKLEdBQVcsZ0JBQVg7QUFDQSxhQUFJLFFBQUosQ0FBYSxPQUFPLEtBQXBCLEVBQTJCLEtBQUssQ0FBaEMsRUFBbUMsS0FBSyxDQUF4QztBQUNBOzs7Ozs7a0JBUmlCLFUiLCJmaWxlIjoiMTQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmVCb2FyZCB7XHJcbiAgIGNvbnN0cnVjdG9yKHgsIHksIHNjb3JlKSB7XHJcbiAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgIHRoaXMueSA9IHk7XHJcbiAgIH1cclxuICAgcmVuZGVyKGN0eCwgcGxheWVyKSB7XHJcbiAgICBjdHguZm9udCA9IFwiMzBweCBIZWx2ZXRpY2FcIjtcclxuICAgIGN0eC5maWxsVGV4dChwbGF5ZXIuc2NvcmUsIHRoaXMueCwgdGhpcy55KTtcclxuICAgfVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvU2NvcmVCb2FyZC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ]);