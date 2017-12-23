(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["peerweb"] = factory();
	else
		root["peerweb"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _webtorrent = __webpack_require__(1);
	
	var _webtorrent2 = _interopRequireDefault(_webtorrent);
	
	var _async = __webpack_require__(5);
	
	var _async2 = _interopRequireDefault(_async);
	
	var _localforage = __webpack_require__(7);
	
	var _localforage2 = _interopRequireDefault(_localforage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// or ./webtorrent
	var client = new _webtorrent2.default(); /*import WebTorrent from 'webtorrent/webtorrent.min' // or ./webtorrent
	                                         var client = new WebTorrent()
	                                         
	                                         var torrentId = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'
	                                         
	                                         client.add(torrentId, function (torrent) {
	                                           // Torrents can contain many files. Let's use the .mp4 file
	                                           var file = torrent.files.find(function (file) {
	                                             return file.name.endsWith('.mp4')
	                                           })
	                                         
	                                           // Display the file by adding it to the DOM. Supports video, audio, image, etc. files
	                                           file.appendTo('body')
	                                         })*/
	
	var peerweb = {};
	peerweb.debug = true;
	peerweb.render = function peerWebRender(magnet) {
	  if (peerweb.debug) console.log('Downloading torrent from', magnet);
	  client.add(magnet, renderFromTorrent);
	};
	
	function renderFromTorrent(torrent) {
	  if (peerweb.debug) console.log('Torrent Downloaded:');
	  if (peerweb.debug) console.log(torrent);
	  // Get index.html
	  var index = torrent.files.find(function (file) {
	    return file.name.endsWith('index.html');
	  });
	  console.log('termino');
	  console.log(index);
	
	  // Store each file in browser storage
	  _async2.default.each(torrent.files, function (file, cb) {
	    file.getBlobURL(function (e, bloburl) {
	      if (e && peerweb.debug) console.log('Failed to get blob for', file.path, ':', e);
	      if (e) return null;
	      console.log(bloburl);
	      var path = file.path.slice(torrent.dn.lenght);
	      if (peerweb.debug) console.log('Adding', path, 'to browser storage');
	      _localforage2.default.setItem(path, bloburl).then(function () {
	        cb();
	      }).catch(function (e) {
	        cb(e);
	      });
	    });
	  }, function (e) {
	    if (e && peerweb.debug) console.log('Failed to add files to local storage', e);
	    if (e) return null;
	    console.log('hecho');
	    index.getBuffer(function (e, buffer) {
	      if (e && peerweb.debug) console.log('Failed to get index.html buffer', e);
	      if (e) return null;
	      //document.body.innerHTML = buffer.toString()
	    });
	    _localforage2.default.getItem("/pulpitrock.jpg").then(function (readValue) {
	      console.log('Read: ', readValue);
	    });
	  });
	}
	
	peerweb.init = function peerwebInit(cb) {
	  cb();
	};
	
	peerweb.init(function (e) {
	  if (e) throw e;
	  peerweb.debug = true;
	  peerweb.render('magnet:?xt=urn:btih:ceeaced1aca41e46b23c595c46d8688fcb62070a&dn=page&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com');
	});
	
	console.log('iniciando');

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;/* WEBPACK VAR INJECTION */(function(global, setImmediate) {"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	(function (e) {
	  if ("object" == ( false ? "undefined" : _typeof(exports)) && "undefined" != typeof module) module.exports = e();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (e), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {
	    var t;t = "undefined" == typeof window ? "undefined" == typeof global ? "undefined" == typeof self ? this : self : global : window, t.WebTorrent = e();
	  }
	})(function () {
	  var t = Math.pow,
	      r = Math.floor,
	      o = Math.abs,
	      e = String.fromCharCode,
	      s = Math.ceil,
	      n = Math.max,
	      d = Math.min,
	      i;return function d(c, e, t) {
	    function r(s, o) {
	      if (!e[s]) {
	        if (!c[s]) {
	          var i = "function" == typeof require && require;if (!o && i) return require(s, !0);if (n) return n(s, !0);var a = new Error("Cannot find module '" + s + "'");throw a.code = "MODULE_NOT_FOUND", a;
	        }var p = e[s] = { exports: {} };c[s][0].call(p.exports, function (t) {
	          var e = c[s][1][t];return r(e ? e : t);
	        }, p, p.exports, d, c, e, t);
	      }return e[s].exports;
	    }for (var n = "function" == typeof require && require, s = 0; s < t.length; s++) {
	      r(t[s]);
	    }return r;
	  }({ 1: [function (e, t) {
	      function n(e, t) {
	        s.Readable.call(this, t), this.destroyed = !1, this._torrent = e._torrent;var n = t && t.start || 0,
	            r = t && t.end && t.end < e.length ? t.end : e.length - 1,
	            o = e._torrent.pieceLength;this._startPiece = 0 | (n + e.offset) / o, this._endPiece = 0 | (r + e.offset) / o, this._piece = this._startPiece, this._offset = n + e.offset - this._startPiece * o, this._missing = r - n + 1, this._reading = !1, this._notifying = !1, this._criticalLength = d(0 | 1048576 / o, 2);
	      }t.exports = n;var r = e("debug")("webtorrent:file-stream"),
	          o = e("inherits"),
	          s = e("readable-stream");o(n, s.Readable), n.prototype._read = function () {
	        this._reading || (this._reading = !0, this._notify());
	      }, n.prototype._notify = function () {
	        var e = this;if (e._reading && 0 !== e._missing) {
	          if (!e._torrent.bitfield.get(e._piece)) return e._torrent.critical(e._piece, e._piece + e._criticalLength);if (!e._notifying) {
	            if (e._notifying = !0, e._torrent.destroyed) return e._destroy(new Error("Torrent removed"));var t = e._piece;e._torrent.store.get(t, function (n, o) {
	              return e._notifying = !1, e.destroyed ? void 0 : n ? e._destroy(n) : void (r("read %s (length %s) (err %s)", t, o.length, n && n.message), e._offset && (o = o.slice(e._offset), e._offset = 0), e._missing < o.length && (o = o.slice(0, e._missing)), e._missing -= o.length, r("pushing buffer of length %s", o.length), e._reading = !1, e.push(o), 0 === e._missing && e.push(null));
	            }), e._piece += 1;
	          }
	        }
	      }, n.prototype.destroy = function (e) {
	        this._destroy(null, e);
	      }, n.prototype._destroy = function (e, t) {
	        this.destroyed || (this.destroyed = !0, !this._torrent.destroyed && this._torrent.deselect(this._startPiece, this._endPiece, !0), e && this.emit("error", e), this.emit("close"), t && t());
	      };
	    }, { debug: 33, inherits: 44, "readable-stream": 86 }], 2: [function (e, t) {
	      (function (n) {
	        function r(e, t) {
	          s.call(this), this._torrent = e, this._destroyed = !1, this.name = t.name, this.path = t.path, this.length = t.length, this.offset = t.offset, this.done = !1;var n = t.offset,
	              r = n + t.length - 1;this._startPiece = 0 | n / this._torrent.pieceLength, this._endPiece = 0 | r / this._torrent.pieceLength, 0 === this.length && (this.done = !0, this.emit("done"));
	        }t.exports = r;var o = e("end-of-stream"),
	            s = e("events").EventEmitter,
	            i = e("./file-stream"),
	            d = e("inherits"),
	            a = e("path"),
	            c = e("render-media"),
	            p = e("readable-stream"),
	            l = e("stream-to-blob"),
	            u = e("stream-to-blob-url"),
	            f = e("stream-with-known-length-to-buffer");d(r, s), Object.defineProperty(r.prototype, "downloaded", { get: function get() {
	            if (!this._torrent.bitfield) return 0;for (var e = 0, t = this._startPiece; t <= this._endPiece; ++t) {
	              if (this._torrent.bitfield.get(t)) e += t === this._endPiece ? this._torrent.lastPieceLength : this._torrent.pieceLength;else {
	                var n = this._torrent.pieces[t];e += n.length - n.missing;
	              }
	            }return e;
	          } }), Object.defineProperty(r.prototype, "progress", { get: function get() {
	            return this.length ? this.downloaded / this.length : 0;
	          } }), r.prototype.select = function (e) {
	          0 === this.length || this._torrent.select(this._startPiece, this._endPiece, e);
	        }, r.prototype.deselect = function () {
	          0 === this.length || this._torrent.deselect(this._startPiece, this._endPiece, !1);
	        }, r.prototype.createReadStream = function (e) {
	          var t = this;if (0 === this.length) {
	            var r = new p.PassThrough();return n.nextTick(function () {
	              r.end();
	            }), r;
	          }var s = new i(t, e);return t._torrent.select(s._startPiece, s._endPiece, !0, function () {
	            s._notify();
	          }), o(s, function () {
	            t._destroyed || !t._torrent.destroyed && t._torrent.deselect(s._startPiece, s._endPiece, !0);
	          }), s;
	        }, r.prototype.getBuffer = function (e) {
	          f(this.createReadStream(), this.length, e);
	        }, r.prototype.getBlob = function (e) {
	          if ("undefined" == typeof window) throw new Error("browser-only method");l(this.createReadStream(), this._getMimeType(), e);
	        }, r.prototype.getBlobURL = function (e) {
	          if ("undefined" == typeof window) throw new Error("browser-only method");u(this.createReadStream(), this._getMimeType(), e);
	        }, r.prototype.appendTo = function (e, t, n) {
	          if ("undefined" == typeof window) throw new Error("browser-only method");c.append(this, e, t, n);
	        }, r.prototype.renderTo = function (e, t, n) {
	          if ("undefined" == typeof window) throw new Error("browser-only method");c.render(this, e, t, n);
	        }, r.prototype._getMimeType = function () {
	          return c.mime[a.extname(this.name).toLowerCase()];
	        }, r.prototype._destroy = function () {
	          this._destroyed = !0, this._torrent = null;
	        };
	      }).call(this, e("_process"));
	    }, { "./file-stream": 1, _process: 69, "end-of-stream": 36, events: 37, inherits: 44, path: 66, "readable-stream": 86, "render-media": 87, "stream-to-blob": 110, "stream-to-blob-url": 109, "stream-with-known-length-to-buffer": 111 }], 3: [function (e, t, n) {
	      function r(e, t) {
	        var n = this;n.id = e, n.type = t, i("new Peer %s", e), n.addr = null, n.conn = null, n.swarm = null, n.wire = null, n.connected = !1, n.destroyed = !1, n.timeout = null, n.retries = 0, n.sentHandshake = !1;
	      }function o() {}var s = e("unordered-array-remove"),
	          i = e("debug")("webtorrent:peer"),
	          d = e("bittorrent-protocol"),
	          a = e("./webconn");n.createWebRTCPeer = function (e, t) {
	        var n = new r(e.id, "webrtc");return n.conn = e, n.swarm = t, n.conn.connected ? n.onConnect() : (n.conn.once("connect", function () {
	          n.onConnect();
	        }), n.conn.once("error", function (e) {
	          n.destroy(e);
	        }), n.startConnectTimeout()), n;
	      }, n.createTCPIncomingPeer = function (e) {
	        var t = e.remoteAddress + ":" + e.remotePort,
	            n = new r(t, "tcpIncoming");return n.conn = e, n.addr = t, n.onConnect(), n;
	      }, n.createTCPOutgoingPeer = function (e, t) {
	        var n = new r(e, "tcpOutgoing");return n.addr = e, n.swarm = t, n;
	      }, n.createWebSeedPeer = function (e, t) {
	        var n = new r(e, "webSeed");return n.swarm = t, n.conn = new a(e, t), n.onConnect(), n;
	      }, r.prototype.onConnect = function () {
	        var e = this;if (!e.destroyed) {
	          e.connected = !0, i("Peer %s connected", e.id), clearTimeout(e.connectTimeout);var t = e.conn;t.once("end", function () {
	            e.destroy();
	          }), t.once("close", function () {
	            e.destroy();
	          }), t.once("finish", function () {
	            e.destroy();
	          }), t.once("error", function (t) {
	            e.destroy(t);
	          });var n = e.wire = new d();n.type = e.type, n.once("end", function () {
	            e.destroy();
	          }), n.once("close", function () {
	            e.destroy();
	          }), n.once("finish", function () {
	            e.destroy();
	          }), n.once("error", function (t) {
	            e.destroy(t);
	          }), n.once("handshake", function (t, n) {
	            e.onHandshake(t, n);
	          }), e.startHandshakeTimeout(), t.pipe(n).pipe(t), e.swarm && !e.sentHandshake && e.handshake();
	        }
	      }, r.prototype.onHandshake = function (e, t) {
	        var n = this;if (n.swarm && !n.destroyed) {
	          if (n.swarm.destroyed) return n.destroy(new Error("swarm already destroyed"));if (e !== n.swarm.infoHash) return n.destroy(new Error("unexpected handshake info hash for this swarm"));if (t === n.swarm.peerId) return n.destroy(new Error("refusing to connect to ourselves"));i("Peer %s got handshake %s", n.id, e), clearTimeout(n.handshakeTimeout), n.retries = 0;var r = n.addr;!r && n.conn.remoteAddress && (r = n.conn.remoteAddress + ":" + n.conn.remotePort), n.swarm._onWire(n.wire, r), n.swarm && !n.swarm.destroyed && (n.sentHandshake || n.handshake());
	        }
	      }, r.prototype.handshake = function () {
	        var e = this,
	            t = { dht: !e.swarm.private && !!e.swarm.client.dht };e.wire.handshake(e.swarm.infoHash, e.swarm.client.peerId, t), e.sentHandshake = !0;
	      }, r.prototype.startConnectTimeout = function () {
	        var e = this;clearTimeout(e.connectTimeout), e.connectTimeout = setTimeout(function () {
	          e.destroy(new Error("connect timeout"));
	        }, "webrtc" === e.type ? 25000 : 5e3), e.connectTimeout.unref && e.connectTimeout.unref();
	      }, r.prototype.startHandshakeTimeout = function () {
	        var e = this;clearTimeout(e.handshakeTimeout), e.handshakeTimeout = setTimeout(function () {
	          e.destroy(new Error("handshake timeout"));
	        }, 25000), e.handshakeTimeout.unref && e.handshakeTimeout.unref();
	      }, r.prototype.destroy = function (e) {
	        var t = this;if (!t.destroyed) {
	          t.destroyed = !0, t.connected = !1, i("destroy %s (error: %s)", t.id, e && (e.message || e)), clearTimeout(t.connectTimeout), clearTimeout(t.handshakeTimeout);var n = t.swarm,
	              r = t.conn,
	              d = t.wire;t.swarm = null, t.conn = null, t.wire = null, n && d && s(n.wires, n.wires.indexOf(d)), r && (r.on("error", o), r.destroy()), d && d.destroy(), n && n.removePeer(t.id);
	        }
	      };
	    }, { "./webconn": 6, "bittorrent-protocol": 14, debug: 33, "unordered-array-remove": 123 }], 4: [function (e, t) {
	      function n(e) {
	        var t = this;t._torrent = e, t._numPieces = e.pieces.length, t._pieces = [], t._onWire = function (e) {
	          t.recalculate(), t._initWire(e);
	        }, t._onWireHave = function (e) {
	          t._pieces[e] += 1;
	        }, t._onWireBitfield = function () {
	          t.recalculate();
	        }, t._torrent.wires.forEach(function (e) {
	          t._initWire(e);
	        }), t._torrent.on("wire", t._onWire), t.recalculate();
	      }function r() {
	        return !0;
	      }t.exports = n, n.prototype.getRarestPiece = function (e) {
	        e || (e = r);for (var t = [], n = Infinity, o = 0; o < this._numPieces; ++o) {
	          if (e(o)) {
	            var s = this._pieces[o];s === n ? t.push(o) : s < n && (t = [o], n = s);
	          }
	        }return 0 < t.length ? t[0 | Math.random() * t.length] : -1;
	      }, n.prototype.destroy = function () {
	        var e = this;e._torrent.removeListener("wire", e._onWire), e._torrent.wires.forEach(function (t) {
	          e._cleanupWireEvents(t);
	        }), e._torrent = null, e._pieces = null, e._onWire = null, e._onWireHave = null, e._onWireBitfield = null;
	      }, n.prototype._initWire = function (e) {
	        var t = this;e._onClose = function () {
	          t._cleanupWireEvents(e);for (var n = 0; n < this._numPieces; ++n) {
	            t._pieces[n] -= e.peerPieces.get(n);
	          }
	        }, e.on("have", t._onWireHave), e.on("bitfield", t._onWireBitfield), e.once("close", e._onClose);
	      }, n.prototype.recalculate = function () {
	        var e;for (e = 0; e < this._numPieces; ++e) {
	          this._pieces[e] = 0;
	        }var t = this._torrent.wires.length;for (e = 0; e < t; ++e) {
	          for (var n = this._torrent.wires[e], r = 0; r < this._numPieces; ++r) {
	            this._pieces[r] += n.peerPieces.get(r);
	          }
	        }
	      }, n.prototype._cleanupWireEvents = function (e) {
	        e.removeListener("have", this._onWireHave), e.removeListener("bitfield", this._onWireBitfield), e._onClose && e.removeListener("close", e._onClose), e._onClose = null;
	      };
	    }, {}], 5: [function (e, t) {
	      (function (r, o) {
	        function i(e, t, n) {
	          _.call(this), this._debugId = "unknown infohash", this.client = t, this.announce = n.announce, this.urlList = n.urlList, this.path = n.path, this._store = n.store || k, this._getAnnounceOpts = n.getAnnounceOpts, this.strategy = n.strategy || "sequential", this.maxWebConns = n.maxWebConns || 4, this._rechokeNumSlots = !1 === n.uploads || 0 === n.uploads ? 0 : +n.uploads || 10, this._rechokeOptimisticWire = null, this._rechokeOptimisticTime = 0, this._rechokeIntervalId = null, this.ready = !1, this.destroyed = !1, this.paused = !1, this.done = !1, this.metadata = null, this.store = null, this.files = [], this.pieces = [], this._amInterested = !1, this._selections = [], this._critical = [], this.wires = [], this._queue = [], this._peers = {}, this._peersLength = 0, this.received = 0, this.uploaded = 0, this._downloadSpeed = H(), this._uploadSpeed = H(), this._servers = [], this._xsRequests = [], this._fileModtimes = n.fileModtimes, null !== e && this._onTorrentId(e), this._debug("new torrent");
	        }function a(e, t) {
	          return 2 + s(t * e.downloadSpeed() / U.BLOCK_LENGTH);
	        }function c(e, t, n) {
	          return 1 + s(t * e.downloadSpeed() / n);
	        }function p(e) {
	          return 0 | Math.random() * e;
	        }function l() {}t.exports = i;var u = e("addr-to-ip-port"),
	            f = e("bitfield"),
	            h = e("chunk-store-stream/write"),
	            m = e("debug")("webtorrent:torrent"),
	            g = e("torrent-discovery"),
	            _ = e("events").EventEmitter,
	            y = e("xtend"),
	            b = e("xtend/mutable"),
	            w = e("fs"),
	            k = e("fs-chunk-store"),
	            x = e("simple-get"),
	            v = e("immediate-chunk-store"),
	            S = e("inherits"),
	            C = e("multistream"),
	            E = e("net"),
	            B = e("os"),
	            I = e("run-parallel"),
	            L = e("run-parallel-limit"),
	            T = e("parse-torrent"),
	            A = e("path"),
	            U = e("torrent-piece"),
	            R = e("pump"),
	            P = e("random-iterate"),
	            O = e("simple-sha1"),
	            H = e("speedometer"),
	            M = e("uniq"),
	            q = e("ut_metadata"),
	            j = e("ut_pex"),
	            N = e("./file"),
	            F = e("./peer"),
	            D = e("./rarity-map"),
	            W = e("./server"),
	            z = 5e3,
	            V = 3 * U.BLOCK_LENGTH,
	            G = 1,
	            K = 2,
	            X = [1000, 5000, 15000],
	            Y = e("../package.json").version,
	            $ = "WebTorrent/" + Y + " (https://webtorrent.io)",
	            Q;try {
	          Q = A.join(w.statSync("/tmp") && "/tmp", "webtorrent");
	        } catch (e) {
	          Q = A.join("function" == typeof B.tmpdir ? B.tmpdir() : "/", "webtorrent");
	        }S(i, _), Object.defineProperty(i.prototype, "timeRemaining", { get: function get() {
	            return this.done ? 0 : 0 === this.downloadSpeed ? Infinity : 1e3 * ((this.length - this.downloaded) / this.downloadSpeed);
	          } }), Object.defineProperty(i.prototype, "downloaded", { get: function get() {
	            if (!this.bitfield) return 0;for (var e = 0, t = 0, n = this.pieces.length; t < n; ++t) {
	              if (this.bitfield.get(t)) e += t === n - 1 ? this.lastPieceLength : this.pieceLength;else {
	                var r = this.pieces[t];e += r.length - r.missing;
	              }
	            }return e;
	          } }), Object.defineProperty(i.prototype, "downloadSpeed", { get: function get() {
	            return this._downloadSpeed();
	          } }), Object.defineProperty(i.prototype, "uploadSpeed", { get: function get() {
	            return this._uploadSpeed();
	          } }), Object.defineProperty(i.prototype, "progress", { get: function get() {
	            return this.length ? this.downloaded / this.length : 0;
	          } }), Object.defineProperty(i.prototype, "ratio", { get: function get() {
	            return this.uploaded / (this.received || 1);
	          } }), Object.defineProperty(i.prototype, "numPeers", { get: function get() {
	            return this.wires.length;
	          } }), Object.defineProperty(i.prototype, "torrentFileBlobURL", { get: function get() {
	            if ("undefined" == typeof window) throw new Error("browser-only property");return this.torrentFile ? URL.createObjectURL(new Blob([this.torrentFile], { type: "application/x-bittorrent" })) : null;
	          } }), Object.defineProperty(i.prototype, "_numQueued", { get: function get() {
	            return this._queue.length + (this._peersLength - this._numConns);
	          } }), Object.defineProperty(i.prototype, "_numConns", { get: function get() {
	            var e = this,
	                t = 0;for (var n in e._peers) {
	              e._peers[n].connected && (t += 1);
	            }return t;
	          } }), Object.defineProperty(i.prototype, "swarm", { get: function get() {
	            return console.warn("WebTorrent: `torrent.swarm` is deprecated. Use `torrent` directly instead."), this;
	          } }), i.prototype._onTorrentId = function (e) {
	          var t = this;if (!t.destroyed) {
	            var n;try {
	              n = T(e);
	            } catch (e) {}n ? (t.infoHash = n.infoHash, t._debugId = n.infoHash.toString("hex").substring(0, 7), r.nextTick(function () {
	              t.destroyed || t._onParsedTorrent(n);
	            })) : T.remote(e, function (e, n) {
	              return t.destroyed ? void 0 : e ? t._destroy(e) : void t._onParsedTorrent(n);
	            });
	          }
	        }, i.prototype._onParsedTorrent = function (e) {
	          var t = this;if (!t.destroyed) {
	            if (t._processParsedTorrent(e), !t.infoHash) return t._destroy(new Error("Malformed torrent data: No info hash"));(t.path || (t.path = A.join(Q, t.infoHash)), t._rechokeIntervalId = setInterval(function () {
	              t._rechoke();
	            }, 1e4), t._rechokeIntervalId.unref && t._rechokeIntervalId.unref(), t.emit("_infoHash", t.infoHash), !t.destroyed) && (t.emit("infoHash", t.infoHash), t.destroyed || (t.client.listening ? t._onListening() : t.client.once("listening", function () {
	              t._onListening();
	            })));
	          }
	        }, i.prototype._processParsedTorrent = function (e) {
	          this._debugId = e.infoHash.toString("hex").substring(0, 7), this.announce && (e.announce = e.announce.concat(this.announce)), this.client.tracker && o.WEBTORRENT_ANNOUNCE && !this.private && (e.announce = e.announce.concat(o.WEBTORRENT_ANNOUNCE)), this.urlList && (e.urlList = e.urlList.concat(this.urlList)), M(e.announce), M(e.urlList), b(this, e), this.magnetURI = T.toMagnetURI(e), this.torrentFile = T.toTorrentFile(e);
	        }, i.prototype._onListening = function () {
	          function e(e) {
	            i._destroy(e);
	          }function t(e) {
	            "string" == typeof e && i.done || i.addPeer(e);
	          }function r() {
	            i.emit("trackerAnnounce"), 0 === i.numPeers && i.emit("noPeers", "tracker");
	          }function o() {
	            i.emit("dhtAnnounce"), 0 === i.numPeers && i.emit("noPeers", "dht");
	          }function s(e) {
	            i.emit("warning", e);
	          }var i = this;if (!(i.discovery || i.destroyed)) {
	            var d = i.client.tracker;d && (d = y(i.client.tracker, { getAnnounceOpts: function getAnnounceOpts() {
	                var e = { uploaded: i.uploaded, downloaded: i.downloaded, left: n(i.length - i.downloaded, 0) };return i.client.tracker.getAnnounceOpts && b(e, i.client.tracker.getAnnounceOpts()), i._getAnnounceOpts && b(e, i._getAnnounceOpts()), e;
	              } })), i.discovery = new g({ infoHash: i.infoHash, announce: i.announce, peerId: i.client.peerId, dht: !i.private && i.client.dht, tracker: d, port: i.client.torrentPort, userAgent: $ }), i.discovery.on("error", e), i.discovery.on("peer", t), i.discovery.on("trackerAnnounce", r), i.discovery.on("dhtAnnounce", o), i.discovery.on("warning", s), i.info ? i._onMetadata(i) : i.xs && i._getMetadataFromServer();
	          }
	        }, i.prototype._getMetadataFromServer = function () {
	          function e(e, n) {
	            function r(r, o, s) {
	              if (t.destroyed) return n(null);if (t.metadata) return n(null);if (r) return t.emit("warning", new Error("http error from xs param: " + e)), n(null);if (200 !== o.statusCode) return t.emit("warning", new Error("non-200 status code " + o.statusCode + " from xs param: " + e)), n(null);var i;try {
	                i = T(s);
	              } catch (e) {}return i ? i.infoHash === t.infoHash ? void (t._onMetadata(i), n(null)) : (t.emit("warning", new Error("got torrent file with incorrect info hash from xs param: " + e)), n(null)) : (t.emit("warning", new Error("got invalid torrent file from xs param: " + e)), n(null));
	            }if (0 !== e.indexOf("http://") && 0 !== e.indexOf("https://")) return t.emit("warning", new Error("skipping non-http xs param: " + e)), n(null);var o;try {
	              o = x.concat({ url: e, method: "GET", headers: { "user-agent": $ } }, r);
	            } catch (r) {
	              return t.emit("warning", new Error("skipping invalid url xs param: " + e)), n(null);
	            }t._xsRequests.push(o);
	          }var t = this,
	              n = Array.isArray(t.xs) ? t.xs : [t.xs],
	              r = n.map(function (t) {
	            return function (n) {
	              e(t, n);
	            };
	          });I(r);
	        }, i.prototype._onMetadata = function (e) {
	          var t = this;if (!(t.metadata || t.destroyed)) {
	            t._debug("got metadata"), t._xsRequests.forEach(function (e) {
	              e.abort();
	            }), t._xsRequests = [];var n;if (e && e.infoHash) n = e;else try {
	              n = T(e);
	            } catch (e) {
	              return t._destroy(e);
	            }t._processParsedTorrent(n), t.metadata = t.torrentFile, t.client.enableWebSeeds && t.urlList.forEach(function (e) {
	              t.addWebSeed(e);
	            }), 0 !== t.pieces.length && t.select(0, t.pieces.length - 1, !1), t._rarityMap = new D(t), t.store = new v(new t._store(t.pieceLength, { torrent: { infoHash: t.infoHash }, files: t.files.map(function (e) {
	                return { path: A.join(t.path, e.path), length: e.length, offset: e.offset };
	              }), length: t.length })), t.files = t.files.map(function (e) {
	              return new N(t, e);
	            }), t._hashes = t.pieces, t.pieces = t.pieces.map(function (e, n) {
	              var r = n === t.pieces.length - 1 ? t.lastPieceLength : t.pieceLength;return new U(r);
	            }), t._reservations = t.pieces.map(function () {
	              return [];
	            }), t.bitfield = new f(t.pieces.length), t.wires.forEach(function (e) {
	              e.ut_metadata && e.ut_metadata.setMetadata(t.metadata), t._onWireWithMetadata(e);
	            }), t._debug("verifying existing torrent data"), t._fileModtimes && t._store === k ? t.getFileModtimes(function (e, n) {
	              if (e) return t._destroy(e);var r = t.files.map(function (e, r) {
	                return n[r] === t._fileModtimes[r];
	              }).every(function (e) {
	                return e;
	              });if (r) {
	                for (var o = 0; o < t.pieces.length; o++) {
	                  t._markVerified(o);
	                }t._onStore();
	              } else t._verifyPieces();
	            }) : t._verifyPieces(), t.emit("metadata");
	          }
	        }, i.prototype.getFileModtimes = function (e) {
	          var t = this,
	              n = [];L(t.files.map(function (e, r) {
	            return function (o) {
	              w.stat(A.join(t.path, e.path), function (e, t) {
	                return e && "ENOENT" !== e.code ? o(e) : void (n[r] = t && t.mtime.getTime(), o(null));
	              });
	            };
	          }), K, function (r) {
	            t._debug("done getting file modtimes"), e(r, n);
	          });
	        }, i.prototype._verifyPieces = function () {
	          var e = this;L(e.pieces.map(function (t, n) {
	            return function (t) {
	              return e.destroyed ? t(new Error("torrent is destroyed")) : void e.store.get(n, function (o, s) {
	                return e.destroyed ? t(new Error("torrent is destroyed")) : o ? r.nextTick(t, null) : void O(s, function (r) {
	                  if (e.destroyed) return t(new Error("torrent is destroyed"));if (r === e._hashes[n]) {
	                    if (!e.pieces[n]) return;e._debug("piece verified %s", n), e._markVerified(n);
	                  } else e._debug("piece invalid %s", n);t(null);
	                });
	              });
	            };
	          }), K, function (t) {
	            return t ? e._destroy(t) : void (e._debug("done verifying"), e._onStore());
	          });
	        }, i.prototype._markVerified = function (e) {
	          this.pieces[e] = null, this._reservations[e] = null, this.bitfield.set(e, !0);
	        }, i.prototype._onStore = function () {
	          var e = this;e.destroyed || (e._debug("on store"), e.ready = !0, e.emit("ready"), e._checkDone(), e._updateSelections());
	        }, i.prototype.destroy = function (e) {
	          var t = this;t._destroy(null, e);
	        }, i.prototype._destroy = function (e, t) {
	          var n = this;if (!n.destroyed) {
	            for (var r in n.destroyed = !0, n._debug("destroy"), n.client._remove(n), clearInterval(n._rechokeIntervalId), n._xsRequests.forEach(function (e) {
	              e.abort();
	            }), n._rarityMap && n._rarityMap.destroy(), n._peers) {
	              n.removePeer(r);
	            }n.files.forEach(function (e) {
	              e instanceof N && e._destroy();
	            });var o = n._servers.map(function (e) {
	              return function (t) {
	                e.destroy(t);
	              };
	            });n.discovery && o.push(function (e) {
	              n.discovery.destroy(e);
	            }), n.store && o.push(function (e) {
	              n.store.close(e);
	            }), I(o, t), e && (0 === n.listenerCount("error") ? n.client.emit("error", e) : n.emit("error", e)), n.emit("close"), n.client = null, n.files = [], n.discovery = null, n.store = null, n._rarityMap = null, n._peers = null, n._servers = null, n._xsRequests = null;
	          }
	        }, i.prototype.addPeer = function (e) {
	          var t = this;if (t.destroyed) throw new Error("torrent is destroyed");if (!t.infoHash) throw new Error("addPeer() must not be called before the `infoHash` event");if (t.client.blocked) {
	            var n;if ("string" == typeof e) {
	              var r;try {
	                r = u(e);
	              } catch (n) {
	                return t._debug("ignoring peer: invalid %s", e), t.emit("invalidPeer", e), !1;
	              }n = r[0];
	            } else "string" == typeof e.remoteAddress && (n = e.remoteAddress);if (n && t.client.blocked.contains(n)) return t._debug("ignoring peer: blocked %s", e), "string" != typeof e && e.destroy(), t.emit("blockedPeer", e), !1;
	          }var o = !!t._addPeer(e);return o ? t.emit("peer", e) : t.emit("invalidPeer", e), o;
	        }, i.prototype._addPeer = function (e) {
	          var t = this;if (t.destroyed) return "string" != typeof e && e.destroy(), null;if ("string" == typeof e && !t._validAddr(e)) return t._debug("ignoring peer: invalid %s", e), null;var n = e && e.id || e;if (t._peers[n]) return t._debug("ignoring peer: duplicate (%s)", n), "string" != typeof e && e.destroy(), null;if (t.paused) return t._debug("ignoring peer: torrent is paused"), "string" != typeof e && e.destroy(), null;t._debug("add peer %s", n);var r;return r = "string" == typeof e ? F.createTCPOutgoingPeer(e, t) : F.createWebRTCPeer(e, t), t._peers[r.id] = r, t._peersLength += 1, "string" == typeof e && (t._queue.push(r), t._drain()), r;
	        }, i.prototype.addWebSeed = function (e) {
	          if (this.destroyed) throw new Error("torrent is destroyed");if (!/^https?:\/\/.+/.test(e)) return this.emit("warning", new Error("ignoring invalid web seed: " + e)), void this.emit("invalidPeer", e);if (this._peers[e]) return this.emit("warning", new Error("ignoring duplicate web seed: " + e)), void this.emit("invalidPeer", e);this._debug("add web seed %s", e);var t = F.createWebSeedPeer(e, this);this._peers[t.id] = t, this._peersLength += 1, this.emit("peer", e);
	        }, i.prototype._addIncomingPeer = function (e) {
	          var t = this;return t.destroyed ? e.destroy(new Error("torrent is destroyed")) : t.paused ? e.destroy(new Error("torrent is paused")) : void (this._debug("add incoming peer %s", e.id), t._peers[e.id] = e, t._peersLength += 1);
	        }, i.prototype.removePeer = function (e) {
	          var t = this,
	              n = e && e.id || e;e = t._peers[n];e && (this._debug("removePeer %s", n), delete t._peers[n], t._peersLength -= 1, e.destroy(), t._drain());
	        }, i.prototype.select = function (e, t, n, r) {
	          var o = this;if (o.destroyed) throw new Error("torrent is destroyed");if (0 > e || t < e || o.pieces.length <= t) throw new Error("invalid selection ", e, ":", t);n = +n || 0, o._debug("select %s-%s (priority %s)", e, t, n), o._selections.push({ from: e, to: t, offset: 0, priority: n, notify: r || l }), o._selections.sort(function (e, t) {
	            return t.priority - e.priority;
	          }), o._updateSelections();
	        }, i.prototype.deselect = function (e, t, n) {
	          var r = this;if (r.destroyed) throw new Error("torrent is destroyed");n = +n || 0, r._debug("deselect %s-%s (priority %s)", e, t, n);for (var o = 0, i; o < r._selections.length; ++o) {
	            if (i = r._selections[o], i.from === e && i.to === t && i.priority === n) {
	              r._selections.splice(o, 1);break;
	            }
	          }r._updateSelections();
	        }, i.prototype.critical = function (e, t) {
	          var n = this;if (n.destroyed) throw new Error("torrent is destroyed");n._debug("critical %s-%s", e, t);for (var r = e; r <= t; ++r) {
	            n._critical[r] = !0;
	          }n._updateSelections();
	        }, i.prototype._onWire = function (e, t) {
	          var n = this;if (n._debug("got wire %s (%s)", e._debugId, t || "Unknown"), e.on("download", function (e) {
	            n.destroyed || (n.received += e, n._downloadSpeed(e), n.client._downloadSpeed(e), n.emit("download", e), n.client.emit("download", e));
	          }), e.on("upload", function (e) {
	            n.destroyed || (n.uploaded += e, n._uploadSpeed(e), n.client._uploadSpeed(e), n.emit("upload", e), n.client.emit("upload", e));
	          }), n.wires.push(e), t) {
	            var o = u(t);e.remoteAddress = o[0], e.remotePort = o[1];
	          }n.client.dht && n.client.dht.listening && e.on("port", function (r) {
	            return n.destroyed || n.client.dht.destroyed ? void 0 : e.remoteAddress ? 0 === r || 65536 < r ? n._debug("ignoring invalid PORT from peer") : void (n._debug("port: %s (from %s)", r, t), n.client.dht.addNode({ host: e.remoteAddress, port: r })) : n._debug("ignoring PORT from peer with no address");
	          }), e.on("timeout", function () {
	            n._debug("wire timeout (%s)", t), e.destroy();
	          }), e.setTimeout(3e4, !0), e.setKeepAlive(!0), e.use(q(n.metadata)), e.ut_metadata.on("warning", function (e) {
	            n._debug("ut_metadata warning: %s", e.message);
	          }), n.metadata || (e.ut_metadata.on("metadata", function (e) {
	            n._debug("got metadata via ut_metadata"), n._onMetadata(e);
	          }), e.ut_metadata.fetch()), "function" != typeof j || n.private || (e.use(j()), e.ut_pex.on("peer", function (e) {
	            n.done || (n._debug("ut_pex: got peer: %s (from %s)", e, t), n.addPeer(e));
	          }), e.ut_pex.on("dropped", function (e) {
	            var r = n._peers[e];r && !r.connected && (n._debug("ut_pex: dropped peer: %s (from %s)", e, t), n.removePeer(e));
	          }), e.once("close", function () {
	            e.ut_pex.reset();
	          })), n.emit("wire", e, t), n.metadata && r.nextTick(function () {
	            n._onWireWithMetadata(e);
	          });
	        }, i.prototype._onWireWithMetadata = function (e) {
	          function t() {
	            r.destroyed || e.destroyed || (r._numQueued > 2 * (r._numConns - r.numPeers) && e.amInterested ? e.destroy() : (o = setTimeout(t, z), o.unref && o.unref()));
	          }function n() {
	            if (e.peerPieces.buffer.length === r.bitfield.buffer.length) {
	              for (s = 0; s < r.pieces.length; ++s) {
	                if (!e.peerPieces.get(s)) return;
	              }e.isSeeder = !0, e.choke();
	            }
	          }var r = this,
	              o = null,
	              s;e.on("bitfield", function () {
	            n(), r._update();
	          }), e.on("have", function () {
	            n(), r._update();
	          }), e.once("interested", function () {
	            e.unchoke();
	          }), e.once("close", function () {
	            clearTimeout(o);
	          }), e.on("choke", function () {
	            clearTimeout(o), o = setTimeout(t, z), o.unref && o.unref();
	          }), e.on("unchoke", function () {
	            clearTimeout(o), r._update();
	          }), e.on("request", function (t, n, o, s) {
	            return o > 131072 ? e.destroy() : void (r.pieces[t] || r.store.get(t, { offset: n, length: o }, s));
	          }), e.bitfield(r.bitfield), e.interested(), e.peerExtensions.dht && r.client.dht && r.client.dht.listening && e.port(r.client.dht.address().port), "webSeed" !== e.type && (o = setTimeout(t, z), o.unref && o.unref()), e.isSeeder = !1, n();
	        }, i.prototype._updateSelections = function () {
	          var e = this;!e.ready || e.destroyed || (r.nextTick(function () {
	            e._gcSelections();
	          }), e._updateInterest(), e._update());
	        }, i.prototype._gcSelections = function () {
	          for (var e = this, t = 0; t < e._selections.length; ++t) {
	            for (var n = e._selections[t], r = n.offset; e.bitfield.get(n.from + n.offset) && n.from + n.offset < n.to;) {
	              n.offset += 1;
	            }r !== n.offset && n.notify(), n.to === n.from + n.offset && e.bitfield.get(n.from + n.offset) && (e._selections.splice(t, 1), t -= 1, n.notify(), e._updateInterest());
	          }e._selections.length || e.emit("idle");
	        }, i.prototype._updateInterest = function () {
	          var e = this,
	              t = e._amInterested;e._amInterested = !!e._selections.length, e.wires.forEach(function (t) {
	            e._amInterested ? t.interested() : t.uninterested();
	          });t === e._amInterested || (e._amInterested ? e.emit("interested") : e.emit("uninterested"));
	        }, i.prototype._update = function () {
	          var e = this;if (!e.destroyed) for (var t = P(e.wires), n; n = t();) {
	            e._updateWire(n);
	          }
	        }, i.prototype._updateWire = function (e) {
	          function t(t, n, r, o) {
	            return function (s) {
	              return s >= t && s <= n && !(s in r) && e.peerPieces.get(s) && (!o || o(s));
	            };
	          }function r() {
	            if (!e.requests.length) for (var n = d._selections.length; n--;) {
	              var r = d._selections[n],
	                  o;if ("rarest" === d.strategy) for (var s = r.from + r.offset, i = r.to, a = {}, c = 0, p = t(s, i, a); c < i - s + 1 && (o = d._rarityMap.getRarestPiece(p), !(0 > o));) {
	                if (d._request(e, o, !1)) return;a[o] = !0, c += 1;
	              } else for (o = r.to; o >= r.from + r.offset; --o) {
	                if (e.peerPieces.get(o) && d._request(e, o, !1)) return;
	              }
	            }
	          }function o() {
	            var t = e.downloadSpeed() || 1;if (t > V) return function () {
	              return !0;
	            };var r = n(1, e.requests.length) * U.BLOCK_LENGTH / t,
	                o = 10,
	                s = 0;return function (e) {
	              if (!o || d.bitfield.get(e)) return !0;for (var n = d.pieces[e].missing; s < d.wires.length; s++) {
	                var i = d.wires[s],
	                    a = i.downloadSpeed();if (!(a < V) && !(a <= t) && i.peerPieces.get(e) && !(0 < (n -= a * r))) return o--, !1;
	              }return !0;
	            };
	          }function s(e) {
	            for (var t = e, n = e; n < d._selections.length && d._selections[n].priority; n++) {
	              t = n;
	            }var r = d._selections[e];d._selections[e] = d._selections[t], d._selections[t] = r;
	          }function i(n) {
	            if (e.requests.length >= p) return !0;for (var r = o(), a = 0; a < d._selections.length; a++) {
	              var i = d._selections[a],
	                  c;if ("rarest" === d.strategy) for (var l = i.from + i.offset, u = i.to, f = {}, h = 0, m = t(l, u, f, r); h < u - l + 1 && (c = d._rarityMap.getRarestPiece(m), !(0 > c));) {
	                for (; d._request(e, c, d._critical[c] || n);) {}if (e.requests.length < p) {
	                  f[c] = !0, h++;continue;
	                }return i.priority && s(a), !0;
	              } else for (c = i.from + i.offset; c <= i.to; c++) {
	                if (e.peerPieces.get(c) && r(c)) {
	                  for (; d._request(e, c, d._critical[c] || n);) {}if (!(e.requests.length < p)) return i.priority && s(a), !0;
	                }
	              }
	            }return !1;
	          }var d = this;if (!e.peerChoking) {
	            if (!e.downloaded) return r();var c = a(e, 0.5);if (!(e.requests.length >= c)) {
	              var p = a(e, G);i(!1) || i(!0);
	            }
	          }
	        }, i.prototype._rechoke = function () {
	          function e(e, t) {
	            return e.downloadSpeed === t.downloadSpeed ? e.uploadSpeed === t.uploadSpeed ? e.wire.amChoking === t.wire.amChoking ? e.salt - t.salt : e.wire.amChoking ? 1 : -1 : t.uploadSpeed - e.uploadSpeed : t.downloadSpeed - e.downloadSpeed;
	          }var t = this;if (t.ready) {
	            0 < t._rechokeOptimisticTime ? t._rechokeOptimisticTime -= 1 : t._rechokeOptimisticWire = null;var n = [];t.wires.forEach(function (e) {
	              e.isSeeder || e === t._rechokeOptimisticWire || n.push({ wire: e, downloadSpeed: e.downloadSpeed(), uploadSpeed: e.uploadSpeed(), salt: Math.random(), isChoked: !0 });
	            }), n.sort(e);for (var r = 0, o = 0; o < n.length && r < t._rechokeNumSlots; ++o) {
	              n[o].isChoked = !1, n[o].wire.peerInterested && (r += 1);
	            }if (!t._rechokeOptimisticWire && o < n.length && t._rechokeNumSlots) {
	              var s = n.slice(o).filter(function (e) {
	                return e.wire.peerInterested;
	              }),
	                  i = s[p(s.length)];i && (i.isChoked = !1, t._rechokeOptimisticWire = i.wire, t._rechokeOptimisticTime = 2);
	            }n.forEach(function (e) {
	              e.wire.amChoking !== e.isChoked && (e.isChoked ? e.wire.choke() : e.wire.unchoke());
	            });
	          }
	        }, i.prototype._hotswap = function (e, t) {
	          var n = this,
	              o = e.downloadSpeed();if (o < U.BLOCK_LENGTH) return !1;if (!n._reservations[t]) return !1;var s = n._reservations[t];if (!s) return !1;var d = Infinity,
	              a,
	              c;for (c = 0; c < s.length; c++) {
	            var i = s[c];if (i && i !== e) {
	              var p = i.downloadSpeed();p >= V || 2 * p > o || p > d || (a = i, d = p);
	            }
	          }if (!a) return !1;for (c = 0; c < s.length; c++) {
	            s[c] === a && (s[c] = null);
	          }for (c = 0; c < a.requests.length; c++) {
	            var l = a.requests[c];l.piece === t && n.pieces[t].cancel(0 | l.offset / U.BLOCK_LENGTH);
	          }return n.emit("hotswap", a, e, t), !0;
	        }, i.prototype._request = function (e, t, n) {
	          function o() {
	            r.nextTick(function () {
	              s._update();
	            });
	          }var s = this,
	              p = e.requests.length,
	              l = "webSeed" === e.type;if (s.bitfield.get(t)) return !1;var u = l ? d(c(e, G, s.pieceLength), s.maxWebConns) : a(e, G);if (p >= u) return !1;var f = s.pieces[t],
	              h = l ? f.reserveRemaining() : f.reserve();if (-1 === h && n && s._hotswap(e, t) && (h = l ? f.reserveRemaining() : f.reserve()), -1 === h) return !1;var m = s._reservations[t];m || (m = s._reservations[t] = []);var g = m.indexOf(null);-1 === g && (g = m.length), m[g] = e;var i = f.chunkOffset(h),
	              _ = l ? f.chunkLengthRemaining(h) : f.chunkLength(h);return e.request(t, i, _, function n(r, d) {
	            if (!s.destroyed) {
	              if (!s.ready) return s.once("ready", function () {
	                n(r, d);
	              });if (m[g] === e && (m[g] = null), f !== s.pieces[t]) return o();if (r) return s._debug("error getting piece %s (offset: %s length: %s) from %s: %s", t, i, _, e.remoteAddress + ":" + e.remotePort, r.message), l ? f.cancelRemaining(h) : f.cancel(h), void o();if (s._debug("got piece %s (offset: %s length: %s) from %s", t, i, _, e.remoteAddress + ":" + e.remotePort), !f.set(h, d, e)) return o();var a = f.flush();O(a, function (e) {
	                if (!s.destroyed) {
	                  if (e === s._hashes[t]) {
	                    if (!s.pieces[t]) return;s._debug("piece verified %s", t), s.pieces[t] = null, s._reservations[t] = null, s.bitfield.set(t, !0), s.store.put(t, a), s.wires.forEach(function (e) {
	                      e.have(t);
	                    }), s._checkDone() && !s.destroyed && s.discovery.complete();
	                  } else s.pieces[t] = new U(f.length), s.emit("warning", new Error("Piece " + t + " failed verification"));o();
	                }
	              });
	            }
	          }), !0;
	        }, i.prototype._checkDone = function () {
	          var e = this;if (!e.destroyed) {
	            e.files.forEach(function (t) {
	              if (!t.done) {
	                for (var n = t._startPiece; n <= t._endPiece; ++n) {
	                  if (!e.bitfield.get(n)) return;
	                }t.done = !0, t.emit("done"), e._debug("file done: " + t.name);
	              }
	            });for (var t = !0, n = 0, r; n < e._selections.length; n++) {
	              r = e._selections[n];for (var o = r.from; o <= r.to; o++) {
	                if (!e.bitfield.get(o)) {
	                  t = !1;break;
	                }
	              }if (!t) break;
	            }return !e.done && t && (e.done = !0, e._debug("torrent done: " + e.infoHash), e.emit("done")), e._gcSelections(), t;
	          }
	        }, i.prototype.load = function (e, t) {
	          var n = this;if (n.destroyed) throw new Error("torrent is destroyed");if (!n.ready) return n.once("ready", function () {
	            n.load(e, t);
	          });Array.isArray(e) || (e = [e]), t || (t = l);var r = new C(e),
	              o = new h(n.store, n.pieceLength);R(r, o, function (e) {
	            return e ? t(e) : void (n.pieces.forEach(function (e, t) {
	              n.pieces[t] = null, n._reservations[t] = null, n.bitfield.set(t, !0);
	            }), n._checkDone(), t(null));
	          });
	        }, i.prototype.createServer = function (e) {
	          if ("function" != typeof W) throw new Error("node.js-only method");if (this.destroyed) throw new Error("torrent is destroyed");var t = new W(this, e);return this._servers.push(t), t;
	        }, i.prototype.pause = function () {
	          this.destroyed || (this._debug("pause"), this.paused = !0);
	        }, i.prototype.resume = function () {
	          this.destroyed || (this._debug("resume"), this.paused = !1, this._drain());
	        }, i.prototype._debug = function () {
	          if (!this.destroyed) {
	            var e = [].slice.call(arguments);e[0] = "[" + this.client._debugId + "] [" + this._debugId + "] " + e[0], m.apply(null, e);
	          }
	        }, i.prototype._drain = function () {
	          var e = this;if (this._debug("_drain numConns %s maxConns %s", e._numConns, e.client.maxConns), !("function" != typeof E.connect || e.destroyed || e.paused || e._numConns >= e.client.maxConns)) {
	            this._debug("drain (%s queued, %s/%s peers)", e._numQueued, e.numPeers, e.client.maxConns);var t = e._queue.shift();if (t) {
	              this._debug("tcp connect attempt to %s", t.addr);var n = u(t.addr),
	                  r = { host: n[0], port: n[1] },
	                  o = t.conn = E.connect(r);o.once("connect", function () {
	                t.onConnect();
	              }), o.once("error", function (e) {
	                t.destroy(e);
	              }), t.startConnectTimeout(), o.on("close", function () {
	                if (!e.destroyed) {
	                  if (t.retries >= X.length) return void e._debug("conn %s closed: will not re-add (max %s attempts)", t.addr, X.length);var n = X[t.retries];e._debug("conn %s closed: will re-add to queue in %sms (attempt %s)", t.addr, n, t.retries + 1);var r = setTimeout(function () {
	                    var n = e._addPeer(t.addr);n && (n.retries = t.retries + 1);
	                  }, n);r.unref && r.unref();
	                }
	              });
	            }
	          }
	        }, i.prototype._validAddr = function (e) {
	          var t;try {
	            t = u(e);
	          } catch (t) {
	            return !1;
	          }var n = t[0],
	              r = t[1];return 0 < r && 65535 > r && ("127.0.0.1" !== n || r !== this.client.torrentPort);
	        };
	      }).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global);
	    }, { "../package.json": 136, "./file": 2, "./peer": 3, "./rarity-map": 4, "./server": 25, _process: 69, "addr-to-ip-port": 7, bitfield: 13, "chunk-store-stream/write": 29, debug: 33, events: 37, fs: 26, "fs-chunk-store": 53, "immediate-chunk-store": 43, inherits: 44, multistream: 61, net: 25, os: 25, "parse-torrent": 65, path: 66, pump: 70, "random-iterate": 75, "run-parallel": 92, "run-parallel-limit": 91, "simple-get": 96, "simple-sha1": 100, speedometer: 104, "torrent-discovery": 116, "torrent-piece": 119, uniq: 122, ut_metadata: 126, ut_pex: 25, xtend: 133, "xtend/mutable": 134 }], 6: [function (e, t) {
	      function r(e, t) {
	        l.call(this), this.url = e, this.webPeerId = p.sync(e), this._torrent = t, this._init();
	      }t.exports = r;var o = e("bitfield"),
	          s = e("safe-buffer").Buffer,
	          i = e("debug")("webtorrent:webconn"),
	          a = e("simple-get"),
	          c = e("inherits"),
	          p = e("simple-sha1"),
	          l = e("bittorrent-protocol"),
	          u = e("../package.json").version;c(r, l), r.prototype._init = function () {
	        var e = this;e.setKeepAlive(!0), e.once("handshake", function (t) {
	          if (!e.destroyed) {
	            e.handshake(t, e.webPeerId);for (var n = e._torrent.pieces.length, r = new o(n), s = 0; s <= n; s++) {
	              r.set(s, !0);
	            }e.bitfield(r);
	          }
	        }), e.once("interested", function () {
	          i("interested"), e.unchoke();
	        }), e.on("uninterested", function () {
	          i("uninterested");
	        }), e.on("choke", function () {
	          i("choke");
	        }), e.on("unchoke", function () {
	          i("unchoke");
	        }), e.on("bitfield", function () {
	          i("bitfield");
	        }), e.on("request", function (t, n, r, o) {
	          i("request pieceIndex=%d offset=%d length=%d", t, n, r), e.httpRequest(t, n, r, o);
	        });
	      }, r.prototype.httpRequest = function (e, t, r, o) {
	        var c = this,
	            p = e * c._torrent.pieceLength,
	            l = p + t,
	            f = l + r - 1,
	            h = c._torrent.files,
	            m;if (1 >= h.length) m = [{ url: c.url, start: l, end: f }];else {
	          var g = h.filter(function (e) {
	            return e.offset <= f && e.offset + e.length > l;
	          });if (1 > g.length) return o(new Error("Could not find file corresponnding to web seed range request"));m = g.map(function (e) {
	            var t = e.offset + e.length - 1,
	                r = c.url + ("/" === c.url[c.url.length - 1] ? "" : "/") + e.path;return { url: r, fileOffsetInRange: n(e.offset - l, 0), start: n(l - e.offset, 0), end: d(t, f - e.offset) };
	          });
	        }var _ = 0,
	            y = !1,
	            b;1 < m.length && (b = s.alloc(r)), m.forEach(function (n) {
	          function s(e, t) {
	            return 200 > e.statusCode || 300 <= e.statusCode ? (y = !0, o(new Error("Unexpected HTTP status code " + e.statusCode))) : void (i("Got data of length %d", t.length), 1 === m.length ? o(null, t) : (t.copy(b, n.fileOffsetInRange), ++_ === m.length && o(null, b)));
	          }var d = n.url,
	              c = n.start,
	              p = n.end;i("Requesting url=%s pieceIndex=%d offset=%d length=%d start=%d end=%d", d, e, t, r, c, p);var l = { url: d, method: "GET", headers: { "user-agent": "WebTorrent/" + u + " (https://webtorrent.io)", range: "bytes=" + c + "-" + p } };a.concat(l, function (e, t, n) {
	            return y ? void 0 : e ? "undefined" == typeof window || d.startsWith(window.location.origin + "/") ? (y = !0, o(e)) : a.head(d, function (t, n) {
	              return y ? void 0 : t ? (y = !0, o(t)) : 200 > n.statusCode || 300 <= n.statusCode ? (y = !0, o(new Error("Unexpected HTTP status code " + n.statusCode))) : n.url === d ? (y = !0, o(e)) : void (l.url = n.url, a.concat(l, function (e, t, n) {
	                return y ? void 0 : e ? (y = !0, o(e)) : void s(t, n);
	              }));
	            }) : void s(t, n);
	          });
	        });
	      }, r.prototype.destroy = function () {
	        l.prototype.destroy.call(this), this._torrent = null;
	      };
	    }, { "../package.json": 136, bitfield: 13, "bittorrent-protocol": 14, debug: 33, inherits: 44, "safe-buffer": 94, "simple-get": 96, "simple-sha1": 100 }], 7: [function (e, t) {
	      var n = /^\[?([^\]]+)\]?:(\d+)$/,
	          r = {},
	          o = 0;t.exports = function (e) {
	        if (1e5 == o && t.exports.reset(), !r[e]) {
	          var s = n.exec(e);if (!s) throw new Error("invalid addr: " + e);r[e] = [s[1], +s[2]], o += 1;
	        }return r[e];
	      }, t.exports.reset = function () {
	        r = {}, o = 0;
	      };
	    }, {}], 8: [function (e, t, n) {
	      "use strict";
	      function r(e) {
	        var t = e.length;if (0 < t % 4) throw new Error("Invalid string. Length must be a multiple of 4");return "=" === e[t - 2] ? 2 : "=" === e[t - 1] ? 1 : 0;
	      }function o(e) {
	        return d[63 & e >> 18] + d[63 & e >> 12] + d[63 & e >> 6] + d[63 & e];
	      }function s(e, t, n) {
	        for (var r = [], s = t, i; s < n; s += 3) {
	          i = (e[s] << 16) + (e[s + 1] << 8) + e[s + 2], r.push(o(i));
	        }return r.join("");
	      }n.byteLength = function (e) {
	        return 3 * e.length / 4 - r(e);
	      }, n.toByteArray = function (e) {
	        var t = e.length,
	            n,
	            o,
	            s,
	            i,
	            d;i = r(e), d = new c(3 * t / 4 - i), o = 0 < i ? t - 4 : t;var p = 0;for (n = 0; n < o; n += 4) {
	          s = a[e.charCodeAt(n)] << 18 | a[e.charCodeAt(n + 1)] << 12 | a[e.charCodeAt(n + 2)] << 6 | a[e.charCodeAt(n + 3)], d[p++] = 255 & s >> 16, d[p++] = 255 & s >> 8, d[p++] = 255 & s;
	        }return 2 === i ? (s = a[e.charCodeAt(n)] << 2 | a[e.charCodeAt(n + 1)] >> 4, d[p++] = 255 & s) : 1 === i && (s = a[e.charCodeAt(n)] << 10 | a[e.charCodeAt(n + 1)] << 4 | a[e.charCodeAt(n + 2)] >> 2, d[p++] = 255 & s >> 8, d[p++] = 255 & s), d;
	      }, n.fromByteArray = function (e) {
	        for (var t = e.length, n = t % 3, r = "", o = [], a = 16383, c = 0, i = t - n, p; c < i; c += a) {
	          o.push(s(e, c, c + a > i ? i : c + a));
	        }return 1 == n ? (p = e[t - 1], r += d[p >> 2], r += d[63 & p << 4], r += "==") : 2 == n && (p = (e[t - 2] << 8) + e[t - 1], r += d[p >> 10], r += d[63 & p >> 4], r += d[63 & p << 2], r += "="), o.push(r), o.join("");
	      };for (var d = [], a = [], c = "undefined" == typeof Uint8Array ? Array : Uint8Array, p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", l = 0, i = p.length; l < i; ++l) {
	        d[l] = p[l], a[p.charCodeAt(l)] = l;
	      }a[45] = 62, a[95] = 63;
	    }, {}], 9: [function (t, n) {
	      (function (t) {
	        function r(e, t, n) {
	          for (var r = 0, o = 1, s = t, i; s < n; s++) {
	            if (i = e[s], 58 > i && 48 <= i) {
	              r = 10 * r + (i - 48);continue;
	            }if (s !== t || 43 !== i) {
	              if (s === t && 45 === i) {
	                o = -1;continue;
	              }if (46 === i) break;throw new Error("not a number: buffer[" + s + "] = " + i);
	            }
	          }return r * o;
	        }function o(e, n, r, s) {
	          return null == e || 0 === e.length ? null : ("number" != typeof n && null == s && (s = n, n = void 0), "number" != typeof r && null == s && (s = r, r = void 0), o.position = 0, o.encoding = s || null, o.data = t.isBuffer(e) ? e.slice(n, r) : new t(e), o.bytes = o.data.length, o.next());
	        }var s = 101;o.bytes = 0, o.position = 0, o.data = null, o.encoding = null, o.next = function () {
	          switch (o.data[o.position]) {case 100:
	              return o.dictionary();case 108:
	              return o.list();case 105:
	              return o.integer();default:
	              return o.buffer();}
	        }, o.find = function (t) {
	          for (var n = o.position, r = o.data.length, s = o.data; n < r;) {
	            if (s[n] === t) return n;n++;
	          }throw new Error("Invalid data: Missing delimiter \"" + e(t) + "\" [0x" + t.toString(16) + "]");
	        }, o.dictionary = function () {
	          o.position++;for (var e = {}; o.data[o.position] !== s;) {
	            e[o.buffer()] = o.next();
	          }return o.position++, e;
	        }, o.list = function () {
	          o.position++;for (var e = []; o.data[o.position] !== s;) {
	            e.push(o.next());
	          }return o.position++, e;
	        }, o.integer = function () {
	          var e = o.find(s),
	              t = r(o.data, o.position + 1, e);return o.position += e + 1 - o.position, t;
	        }, o.buffer = function () {
	          var e = o.find(58),
	              t = r(o.data, o.position, e),
	              n = ++e + t;return o.position = n, o.encoding ? o.data.toString(o.encoding, e, n) : o.data.slice(e, n);
	        }, n.exports = o;
	      }).call(this, t("buffer").Buffer);
	    }, { buffer: 27 }], 10: [function (e, t) {
	      function n(e, t, o) {
	        var s = [],
	            i = null;return n._encode(s, e), i = r.concat(s), n.bytes = i.length, r.isBuffer(t) ? (i.copy(t, o), t) : i;
	      }var r = e("safe-buffer").Buffer;n.bytes = -1, n._floatConversionDetected = !1, n._encode = function (e, t) {
	        if (r.isBuffer(t)) return e.push(r.from(t.length + ":")), void e.push(t);if (null != t) switch (typeof t === "undefined" ? "undefined" : _typeof(t)) {case "string":
	            n.buffer(e, t);break;case "number":
	            n.number(e, t);break;case "object":
	            t.constructor === Array ? n.list(e, t) : n.dict(e, t);break;case "boolean":
	            n.number(e, t ? 1 : 0);}
	      };var o = r.from("e"),
	          s = r.from("d"),
	          d = r.from("l");n.buffer = function (e, t) {
	        e.push(r.from(r.byteLength(t) + ":" + t));
	      }, n.number = function (e, t) {
	        var o = 2147483648,
	            s = (t / o << 0) * o + (t % o << 0);e.push(r.from("i" + s + "e")), s === t || n._floatConversionDetected || (n._floatConversionDetected = !0, console.warn("WARNING: Possible data corruption detected with value \"" + t + "\":", "Bencoding only defines support for integers, value was converted to \"" + s + "\""), console.trace());
	      }, n.dict = function (e, t) {
	        e.push(s);for (var r = 0, i = Object.keys(t).sort(), d = i.length, a; r < d; r++) {
	          a = i[r], null == t[a] || (n.buffer(e, a), n._encode(e, t[a]));
	        }e.push(o);
	      }, n.list = function (e, t) {
	        var r = 0,
	            s = t.length;for (e.push(d); r < s; r++) {
	          null != t[r] && n._encode(e, t[r]);
	        }e.push(o);
	      }, t.exports = n;
	    }, { "safe-buffer": 94 }], 11: [function (e, t) {
	      var n = t.exports;n.encode = e("./encode"), n.decode = e("./decode"), n.byteLength = n.encodingLength = function (e) {
	        return n.encode(e).length;
	      };
	    }, { "./decode": 9, "./encode": 10 }], 12: [function (e, t) {
	      t.exports = function (e, t, n, r, o) {
	        var s, i;if (void 0 === r) r = 0;else if (r |= 0, 0 > r || r >= e.length) throw new RangeError("invalid lower bound");if (void 0 === o) o = e.length - 1;else if (o |= 0, o < r || o >= e.length) throw new RangeError("invalid upper bound");for (; r <= o;) {
	          if (s = r + (o - r >> 1), i = +n(e[s], t, s, e), 0 > i) r = s + 1;else if (0 < i) o = s - 1;else return s;
	        }return ~r;
	      };
	    }, {}], 13: [function (e, t) {
	      (function (e) {
	        function r(e, t) {
	          return this instanceof r ? void (0 === arguments.length && (e = 0), this.grow = t && (isFinite(t.grow) && o(t.grow) || t.grow) || 0, ("number" == typeof e || e === void 0) && (e = new s(o(e)), e.fill && !e._isBuffer && e.fill(0)), this.buffer = e) : new r(e, t);
	        }function o(e) {
	          var t = e >> 3;return 0 != e % 8 && t++, t;
	        }var s = "undefined" == typeof e ? "undefined" == typeof Int8Array ? function (e) {
	          for (var t = Array(e), n = 0; n < e; n++) {
	            t[n] = 0;
	          }
	        } : Int8Array : e;r.prototype.get = function (e) {
	          var t = e >> 3;return t < this.buffer.length && !!(this.buffer[t] & 128 >> e % 8);
	        }, r.prototype.set = function (e, t) {
	          var r = e >> 3;t || 1 === arguments.length ? (this.buffer.length < r + 1 && this._grow(n(r + 1, d(2 * this.buffer.length, this.grow))), this.buffer[r] |= 128 >> e % 8) : r < this.buffer.length && (this.buffer[r] &= ~(128 >> e % 8));
	        }, r.prototype._grow = function (e) {
	          if (this.buffer.length < e && e <= this.grow) {
	            var t = new s(e);if (t.fill && t.fill(0), this.buffer.copy) this.buffer.copy(t, 0);else for (var n = 0; n < this.buffer.length; n++) {
	              t[n] = this.buffer[n];
	            }this.buffer = t;
	          }
	        }, "undefined" != typeof t && (t.exports = r);
	      }).call(this, e("buffer").Buffer);
	    }, { buffer: 27 }], 14: [function (e, t) {
	      function n(e, t, n, r) {
	        this.piece = e, this.offset = t, this.length = n, this.callback = r;
	      }function r() {
	        return this instanceof r ? void (h.Duplex.call(this), this._debugId = u(4).toString("hex"), this._debug("new wire"), this.peerId = null, this.peerIdBuffer = null, this.type = null, this.amChoking = !0, this.amInterested = !1, this.peerChoking = !0, this.peerInterested = !1, this.peerPieces = new d(0, { grow: m }), this.peerExtensions = {}, this.requests = [], this.peerRequests = [], this.extendedMapping = {}, this.peerExtendedMapping = {}, this.extendedHandshake = {}, this.peerExtendedHandshake = {}, this._ext = {}, this._nextExt = 1, this.uploaded = 0, this.downloaded = 0, this.uploadSpeed = f(), this.downloadSpeed = f(), this._keepAliveInterval = null, this._timeout = null, this._timeoutMs = 0, this.destroyed = !1, this._finished = !1, this._parserSize = 0, this._parser = null, this._buffer = [], this._bufferSize = 0, this.on("finish", this._onFinish), this._parseHandshake()) : new r();
	      }function o(e, t, n, r) {
	        for (var o = 0, i; o < e.length; o++) {
	          if (i = e[o], i.piece === t && i.offset === n && i.length === r) return s(e, o), i;
	        }return null;
	      }t.exports = r;var s = e("unordered-array-remove"),
	          i = e("bencode"),
	          d = e("bitfield"),
	          a = e("safe-buffer").Buffer,
	          c = e("debug")("bittorrent-protocol"),
	          p = e("xtend"),
	          l = e("inherits"),
	          u = e("randombytes"),
	          f = e("speedometer"),
	          h = e("readable-stream"),
	          m = 4e5,
	          g = a.from("\x13BitTorrent protocol"),
	          _ = a.from([0, 0, 0, 0]),
	          y = a.from([0, 0, 0, 1, 0]),
	          b = a.from([0, 0, 0, 1, 1]),
	          w = a.from([0, 0, 0, 1, 2]),
	          k = a.from([0, 0, 0, 1, 3]),
	          x = [0, 0, 0, 0, 0, 0, 0, 0],
	          v = [0, 0, 0, 3, 9, 0, 0];l(r, h.Duplex), r.prototype.setKeepAlive = function (e) {
	        var t = this;t._debug("setKeepAlive %s", e), clearInterval(t._keepAliveInterval);!1 === e || (t._keepAliveInterval = setInterval(function () {
	          t.keepAlive();
	        }, 55000));
	      }, r.prototype.setTimeout = function (e, t) {
	        this._debug("setTimeout ms=%d unref=%s", e, t), this._clearTimeout(), this._timeoutMs = e, this._timeoutUnref = !!t, this._updateTimeout();
	      }, r.prototype.destroy = function () {
	        this.destroyed || (this.destroyed = !0, this._debug("destroy"), this.emit("close"), this.end());
	      }, r.prototype.end = function () {
	        this._debug("end"), this._onUninterested(), this._onChoke(), h.Duplex.prototype.end.apply(this, arguments);
	      }, r.prototype.use = function (e) {
	        function t() {}var n = e.prototype.name;if (!n) throw new Error("Extension class requires a \"name\" property on the prototype");this._debug("use extension.name=%s", n);var r = this._nextExt,
	            o = new e(this);"function" != typeof o.onHandshake && (o.onHandshake = t), "function" != typeof o.onExtendedHandshake && (o.onExtendedHandshake = t), "function" != typeof o.onMessage && (o.onMessage = t), this.extendedMapping[r] = n, this._ext[n] = o, this[n] = o, this._nextExt += 1;
	      }, r.prototype.keepAlive = function () {
	        this._debug("keep-alive"), this._push(_);
	      }, r.prototype.handshake = function (e, t, n) {
	        var r, o;if ("string" == typeof e ? r = a.from(e, "hex") : (r = e, e = r.toString("hex")), "string" == typeof t ? o = a.from(t, "hex") : (o = t, t = o.toString("hex")), 20 !== r.length || 20 !== o.length) throw new Error("infoHash and peerId MUST have length 20");this._debug("handshake i=%s p=%s exts=%o", e, t, n);var s = a.from(x);s[5] |= 16, n && n.dht && (s[7] |= 1), this._push(a.concat([g, s, r, o])), this._handshakeSent = !0, this.peerExtensions.extended && !this._extendedHandshakeSent && this._sendExtendedHandshake();
	      }, r.prototype._sendExtendedHandshake = function () {
	        var e = p(this.extendedHandshake);for (var t in e.m = {}, this.extendedMapping) {
	          var n = this.extendedMapping[t];e.m[n] = +t;
	        }this.extended(0, i.encode(e)), this._extendedHandshakeSent = !0;
	      }, r.prototype.choke = function () {
	        if (!this.amChoking) {
	          for (this.amChoking = !0, this._debug("choke"); this.peerRequests.length;) {
	            this.peerRequests.pop();
	          }this._push(y);
	        }
	      }, r.prototype.unchoke = function () {
	        this.amChoking && (this.amChoking = !1, this._debug("unchoke"), this._push(b));
	      }, r.prototype.interested = function () {
	        this.amInterested || (this.amInterested = !0, this._debug("interested"), this._push(w));
	      }, r.prototype.uninterested = function () {
	        this.amInterested && (this.amInterested = !1, this._debug("uninterested"), this._push(k));
	      }, r.prototype.have = function (e) {
	        this._debug("have %d", e), this._message(4, [e], null);
	      }, r.prototype.bitfield = function (e) {
	        this._debug("bitfield"), a.isBuffer(e) || (e = e.buffer), this._message(5, [], e);
	      }, r.prototype.request = function (e, t, r, o) {
	        return o || (o = function o() {}), this._finished ? o(new Error("wire is closed")) : this.peerChoking ? o(new Error("peer is choking")) : void (this._debug("request index=%d offset=%d length=%d", e, t, r), this.requests.push(new n(e, t, r, o)), this._updateTimeout(), this._message(6, [e, t, r], null));
	      }, r.prototype.piece = function (e, t, n) {
	        this._debug("piece index=%d offset=%d", e, t), this.uploaded += n.length, this.uploadSpeed(n.length), this.emit("upload", n.length), this._message(7, [e, t], n);
	      }, r.prototype.cancel = function (e, t, n) {
	        this._debug("cancel index=%d offset=%d length=%d", e, t, n), this._callback(o(this.requests, e, t, n), new Error("request was cancelled"), null), this._message(8, [e, t, n], null);
	      }, r.prototype.port = function (e) {
	        this._debug("port %d", e);var t = a.from(v);t.writeUInt16BE(e, 5), this._push(t);
	      }, r.prototype.extended = function (e, t) {
	        if (this._debug("extended ext=%s", e), "string" == typeof e && this.peerExtendedMapping[e] && (e = this.peerExtendedMapping[e]), "number" == typeof e) {
	          var n = a.from([e]),
	              r = a.isBuffer(t) ? t : i.encode(t);this._message(20, [], a.concat([n, r]));
	        } else throw new Error("Unrecognized extension: " + e);
	      }, r.prototype._read = function () {}, r.prototype._message = function (e, t, n) {
	        var r = n ? n.length : 0,
	            o = a.allocUnsafe(5 + 4 * t.length);o.writeUInt32BE(o.length + r - 4, 0), o[4] = e;for (var s = 0; s < t.length; s++) {
	          o.writeUInt32BE(t[s], 5 + 4 * s);
	        }this._push(o), n && this._push(n);
	      }, r.prototype._push = function (e) {
	        return this._finished ? void 0 : this.push(e);
	      }, r.prototype._onKeepAlive = function () {
	        this._debug("got keep-alive"), this.emit("keep-alive");
	      }, r.prototype._onHandshake = function (e, t, n) {
	        var r = e.toString("hex"),
	            o = t.toString("hex");this._debug("got handshake i=%s p=%s exts=%o", r, o, n), this.peerId = o, this.peerIdBuffer = t, this.peerExtensions = n, this.emit("handshake", r, o, n);for (var s in this._ext) {
	          this._ext[s].onHandshake(r, o, n);
	        }n.extended && this._handshakeSent && !this._extendedHandshakeSent && this._sendExtendedHandshake();
	      }, r.prototype._onChoke = function () {
	        for (this.peerChoking = !0, this._debug("got choke"), this.emit("choke"); this.requests.length;) {
	          this._callback(this.requests.pop(), new Error("peer is choking"), null);
	        }
	      }, r.prototype._onUnchoke = function () {
	        this.peerChoking = !1, this._debug("got unchoke"), this.emit("unchoke");
	      }, r.prototype._onInterested = function () {
	        this.peerInterested = !0, this._debug("got interested"), this.emit("interested");
	      }, r.prototype._onUninterested = function () {
	        this.peerInterested = !1, this._debug("got uninterested"), this.emit("uninterested");
	      }, r.prototype._onHave = function (e) {
	        this.peerPieces.get(e) || (this._debug("got have %d", e), this.peerPieces.set(e, !0), this.emit("have", e));
	      }, r.prototype._onBitField = function (e) {
	        this.peerPieces = new d(e), this._debug("got bitfield"), this.emit("bitfield", this.peerPieces);
	      }, r.prototype._onRequest = function (e, t, r) {
	        var s = this;if (!s.amChoking) {
	          s._debug("got request index=%d offset=%d length=%d", e, t, r);var i = function i(n, _i) {
	            return d === o(s.peerRequests, e, t, r) ? n ? s._debug("error satisfying request index=%d offset=%d length=%d (%s)", e, t, r, n.message) : void s.piece(e, t, _i) : void 0;
	          },
	              d = new n(e, t, r, i);s.peerRequests.push(d), s.emit("request", e, t, r, i);
	        }
	      }, r.prototype._onPiece = function (e, t, n) {
	        this._debug("got piece index=%d offset=%d", e, t), this._callback(o(this.requests, e, t, n.length), null, n), this.downloaded += n.length, this.downloadSpeed(n.length), this.emit("download", n.length), this.emit("piece", e, t, n);
	      }, r.prototype._onCancel = function (e, t, n) {
	        this._debug("got cancel index=%d offset=%d length=%d", e, t, n), o(this.peerRequests, e, t, n), this.emit("cancel", e, t, n);
	      }, r.prototype._onPort = function (e) {
	        this._debug("got port %d", e), this.emit("port", e);
	      }, r.prototype._onExtended = function (e, t) {
	        if (0 === e) {
	          var n;try {
	            n = i.decode(t);
	          } catch (e) {
	            this._debug("ignoring invalid extended handshake: %s", e.message || e);
	          }if (!n) return;this.peerExtendedHandshake = n;if ("object" == _typeof(n.m)) for (var r in n.m) {
	            this.peerExtendedMapping[r] = +n.m[r].toString();
	          }for (r in this._ext) {
	            this.peerExtendedMapping[r] && this._ext[r].onExtendedHandshake(this.peerExtendedHandshake);
	          }this._debug("got extended handshake"), this.emit("extended", "handshake", this.peerExtendedHandshake);
	        } else this.extendedMapping[e] && (e = this.extendedMapping[e], this._ext[e] && this._ext[e].onMessage(t)), this._debug("got extended message ext=%s", e), this.emit("extended", e, t);
	      }, r.prototype._onTimeout = function () {
	        this._debug("request timed out"), this._callback(this.requests.shift(), new Error("request has timed out"), null), this.emit("timeout");
	      }, r.prototype._write = function (e, t, n) {
	        for (this._bufferSize += e.length, this._buffer.push(e); this._bufferSize >= this._parserSize;) {
	          var r = 1 === this._buffer.length ? this._buffer[0] : a.concat(this._buffer);this._bufferSize -= this._parserSize, this._buffer = this._bufferSize ? [r.slice(this._parserSize)] : [], this._parser(r.slice(0, this._parserSize));
	        }n(null);
	      }, r.prototype._callback = function (e, t, n) {
	        e && (this._clearTimeout(), !this.peerChoking && !this._finished && this._updateTimeout(), e.callback(t, n));
	      }, r.prototype._clearTimeout = function () {
	        this._timeout && (clearTimeout(this._timeout), this._timeout = null);
	      }, r.prototype._updateTimeout = function () {
	        var e = this;e._timeoutMs && e.requests.length && !e._timeout && (e._timeout = setTimeout(function () {
	          e._onTimeout();
	        }, e._timeoutMs), e._timeoutUnref && e._timeout.unref && e._timeout.unref());
	      }, r.prototype._parse = function (e, t) {
	        this._parserSize = e, this._parser = t;
	      }, r.prototype._onMessageLength = function (e) {
	        var t = e.readUInt32BE(0);0 < t ? this._parse(t, this._onMessage) : (this._onKeepAlive(), this._parse(4, this._onMessageLength));
	      }, r.prototype._onMessage = function (e) {
	        switch (this._parse(4, this._onMessageLength), e[0]) {case 0:
	            return this._onChoke();case 1:
	            return this._onUnchoke();case 2:
	            return this._onInterested();case 3:
	            return this._onUninterested();case 4:
	            return this._onHave(e.readUInt32BE(1));case 5:
	            return this._onBitField(e.slice(1));case 6:
	            return this._onRequest(e.readUInt32BE(1), e.readUInt32BE(5), e.readUInt32BE(9));case 7:
	            return this._onPiece(e.readUInt32BE(1), e.readUInt32BE(5), e.slice(9));case 8:
	            return this._onCancel(e.readUInt32BE(1), e.readUInt32BE(5), e.readUInt32BE(9));case 9:
	            return this._onPort(e.readUInt16BE(1));case 20:
	            return this._onExtended(e.readUInt8(1), e.slice(2));default:
	            return this._debug("got unknown message"), this.emit("unknownmessage", e);}
	      }, r.prototype._parseHandshake = function () {
	        var e = this;e._parse(1, function (t) {
	          var n = t.readUInt8(0);e._parse(n + 48, function (t) {
	            var r = t.slice(0, n);return "BitTorrent protocol" === r.toString() ? void (t = t.slice(n), e._onHandshake(t.slice(8, 28), t.slice(28, 48), { dht: !!(1 & t[7]), extended: !!(16 & t[5]) }), e._parse(4, e._onMessageLength)) : (e._debug("Error: wire not speaking BitTorrent protocol (%s)", r.toString()), void e.end());
	          });
	        });
	      }, r.prototype._onFinish = function () {
	        for (this._finished = !0, this.push(null); this.read();) {}for (clearInterval(this._keepAliveInterval), this._parse(Number.MAX_VALUE, function () {}); this.peerRequests.length;) {
	          this.peerRequests.pop();
	        }for (; this.requests.length;) {
	          this._callback(this.requests.pop(), new Error("wire was closed"), null);
	        }
	      }, r.prototype._debug = function () {
	        var e = [].slice.call(arguments);e[0] = "[" + this._debugId + "] " + e[0], c.apply(null, e);
	      };
	    }, { bencode: 11, bitfield: 13, debug: 15, inherits: 44, randombytes: 76, "readable-stream": 86, "safe-buffer": 94, speedometer: 104, "unordered-array-remove": 123, xtend: 133 }], 15: [function (e, t, n) {
	      (function (o) {
	        function r() {
	          var e;try {
	            e = n.storage.debug;
	          } catch (t) {}return !e && "undefined" != typeof o && "env" in o && (e = o.env.DEBUG), e;
	        }n = t.exports = e("./debug"), n.log = function () {
	          return "object" == (typeof console === "undefined" ? "undefined" : _typeof(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
	        }, n.formatArgs = function (e) {
	          var t = this.useColors;if (e[0] = (t ? "%c" : "") + this.namespace + (t ? " %c" : " ") + e[0] + (t ? "%c " : " ") + "+" + n.humanize(this.diff), !!t) {
	            var r = "color: " + this.color;e.splice(1, 0, r, "color: inherit");var o = 0,
	                s = 0;e[0].replace(/%[a-zA-Z%]/g, function (e) {
	              "%%" === e || (o++, "%c" === e && (s = o));
	            }), e.splice(s, 0, r);
	          }
	        }, n.save = function (e) {
	          try {
	            null == e ? n.storage.removeItem("debug") : n.storage.debug = e;
	          } catch (t) {}
	        }, n.load = r, n.useColors = function () {
	          return "undefined" != typeof window && window.process && "renderer" === window.process.type || "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && 31 <= parseInt(RegExp.$1, 10) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
	        }, n.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : function () {
	          try {
	            return window.localStorage;
	          } catch (t) {}
	        }(), n.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"], n.formatters.j = function (e) {
	          try {
	            return JSON.stringify(e);
	          } catch (e) {
	            return "[UnexpectedJSONParseError]: " + e.message;
	          }
	        }, n.enable(r());
	      }).call(this, e("_process"));
	    }, { "./debug": 16, _process: 69 }], 16: [function (e, t, n) {
	      function r(e) {
	        var t = 0,
	            r;for (r in e) {
	          t = (t << 5) - t + e.charCodeAt(r), t |= 0;
	        }return n.colors[o(t) % n.colors.length];
	      }function s(e) {
	        function t() {
	          if (t.enabled) {
	            var e = t,
	                r = +new Date(),
	                o = r - (d || r);e.diff = o, e.prev = d, e.curr = r, d = r;for (var s = Array(arguments.length), a = 0; a < s.length; a++) {
	              s[a] = arguments[a];
	            }s[0] = n.coerce(s[0]), "string" != typeof s[0] && s.unshift("%O");var i = 0;s[0] = s[0].replace(/%([a-zA-Z%])/g, function (t, r) {
	              if ("%%" === t) return t;i++;var o = n.formatters[r];if ("function" == typeof o) {
	                var d = s[i];t = o.call(e, d), s.splice(i, 1), i--;
	              }return t;
	            }), n.formatArgs.call(e, s);var c = t.log || n.log || console.log.bind(console);c.apply(e, s);
	          }
	        }return t.namespace = e, t.enabled = n.enabled(e), t.useColors = n.useColors(), t.color = r(e), "function" == typeof n.init && n.init(t), t;
	      }n = t.exports = s.debug = s["default"] = s, n.coerce = function (e) {
	        return e instanceof Error ? e.stack || e.message : e;
	      }, n.disable = function () {
	        n.enable("");
	      }, n.enable = function (e) {
	        n.save(e), n.names = [], n.skips = [];for (var t = ("string" == typeof e ? e : "").split(/[\s,]+/), r = t.length, o = 0; o < r; o++) {
	          t[o] && (e = t[o].replace(/\*/g, ".*?"), "-" === e[0] ? n.skips.push(new RegExp("^" + e.substr(1) + "$")) : n.names.push(new RegExp("^" + e + "$")));
	        }
	      }, n.enabled = function (e) {
	        var t, r;for (t = 0, r = n.skips.length; t < r; t++) {
	          if (n.skips[t].test(e)) return !1;
	        }for (t = 0, r = n.names.length; t < r; t++) {
	          if (n.names[t].test(e)) return !0;
	        }return !1;
	      }, n.humanize = e("ms"), n.names = [], n.skips = [], n.formatters = {};var d;
	    }, { ms: 60 }], 17: [function (e, t) {
	      (function (n) {
	        function r(e) {
	          function t(e) {
	            n.nextTick(function () {
	              d.emit("warning", e);
	            });
	          }var d = this;if (!(d instanceof r)) return new r(e);if (i.call(d), e || (e = {}), !e.peerId) throw new Error("Option `peerId` is required");if (!e.infoHash) throw new Error("Option `infoHash` is required");if (!e.announce) throw new Error("Option `announce` is required");if (!n.browser && !e.port) throw new Error("Option `port` is required");d.peerId = "string" == typeof e.peerId ? e.peerId : e.peerId.toString("hex"), d._peerIdBuffer = o.from(d.peerId, "hex"), d._peerIdBinary = d._peerIdBuffer.toString("binary"), d.infoHash = "string" == typeof e.infoHash ? e.infoHash : e.infoHash.toString("hex"), d._infoHashBuffer = o.from(d.infoHash, "hex"), d._infoHashBinary = d._infoHashBuffer.toString("binary"), s("new client %s", d.infoHash), d.destroyed = !1, d._port = e.port, d._getAnnounceOpts = e.getAnnounceOpts, d._rtcConfig = e.rtcConfig, d._userAgent = e.userAgent, d._wrtc = "function" == typeof e.wrtc ? e.wrtc() : e.wrtc;var a = "string" == typeof e.announce ? [e.announce] : null == e.announce ? [] : e.announce;a = a.map(function (e) {
	            return e = e.toString(), "/" === e[e.length - 1] && (e = e.substring(0, e.length - 1)), e;
	          }), a = u(a);var c = !1 !== d._wrtc && (!!d._wrtc || l.WEBRTC_SUPPORT);d._trackers = a.map(function (e) {
	            var n = f.parse(e).protocol;return ("http:" === n || "https:" === n) && "function" == typeof m ? new m(d, e) : "udp:" === n && "function" == typeof g ? new g(d, e) : ("ws:" === n || "wss:" === n) && c ? "ws:" === n && "undefined" != typeof window && "https:" === window.location.protocol ? (t(new Error("Unsupported tracker protocol: " + e)), null) : new _(d, e) : (t(new Error("Unsupported tracker protocol: " + e)), null);
	          }).filter(Boolean);
	        }t.exports = r;var o = e("safe-buffer").Buffer,
	            s = e("debug")("bittorrent-tracker:client"),
	            i = e("events").EventEmitter,
	            d = e("xtend"),
	            a = e("inherits"),
	            c = e("once"),
	            p = e("run-parallel"),
	            l = e("simple-peer"),
	            u = e("uniq"),
	            f = e("url"),
	            h = e("./lib/common"),
	            m = e("./lib/client/http-tracker"),
	            g = e("./lib/client/udp-tracker"),
	            _ = e("./lib/client/websocket-tracker");a(r, i), r.scrape = function (e, t) {
	          if (t = c(t), !e.infoHash) throw new Error("Option `infoHash` is required");if (!e.announce) throw new Error("Option `announce` is required");var n = d(e, { infoHash: Array.isArray(e.infoHash) ? e.infoHash[0] : e.infoHash, peerId: o.from("01234567890123456789"), port: 6881 }),
	              s = new r(n);s.once("error", t), s.once("warning", t);var i = Array.isArray(e.infoHash) ? e.infoHash.length : 1,
	              a = {};return s.on("scrape", function (e) {
	            if (i -= 1, a[e.infoHash] = e, 0 === i) {
	              s.destroy();var n = Object.keys(a);1 === n.length ? t(null, a[n[0]]) : t(null, a);
	            }
	          }), e.infoHash = Array.isArray(e.infoHash) ? e.infoHash.map(function (e) {
	            return o.from(e, "hex");
	          }) : o.from(e.infoHash, "hex"), s.scrape({ infoHash: e.infoHash }), s;
	        }, r.prototype.start = function (e) {
	          var t = this;s("send `start`"), e = t._defaultAnnounceOpts(e), e.event = "started", t._announce(e), t._trackers.forEach(function (e) {
	            e.setInterval();
	          });
	        }, r.prototype.stop = function (e) {
	          var t = this;s("send `stop`"), e = t._defaultAnnounceOpts(e), e.event = "stopped", t._announce(e);
	        }, r.prototype.complete = function (e) {
	          var t = this;s("send `complete`"), e || (e = {}), e = t._defaultAnnounceOpts(e), e.event = "completed", t._announce(e);
	        }, r.prototype.update = function (e) {
	          var t = this;s("send `update`"), e = t._defaultAnnounceOpts(e), e.event && delete e.event, t._announce(e);
	        }, r.prototype._announce = function (e) {
	          var t = this;t._trackers.forEach(function (t) {
	            t.announce(e);
	          });
	        }, r.prototype.scrape = function (e) {
	          var t = this;s("send `scrape`"), e || (e = {}), t._trackers.forEach(function (t) {
	            t.scrape(e);
	          });
	        }, r.prototype.setInterval = function (e) {
	          var t = this;s("setInterval %d", e), t._trackers.forEach(function (t) {
	            t.setInterval(e);
	          });
	        }, r.prototype.destroy = function (e) {
	          var t = this;if (!t.destroyed) {
	            t.destroyed = !0, s("destroy");var n = t._trackers.map(function (e) {
	              return function (t) {
	                e.destroy(t);
	              };
	            });p(n, e), t._trackers = [], t._getAnnounceOpts = null;
	          }
	        }, r.prototype._defaultAnnounceOpts = function (e) {
	          var t = this;return e || (e = {}), null == e.numwant && (e.numwant = h.DEFAULT_ANNOUNCE_PEERS), null == e.uploaded && (e.uploaded = 0), null == e.downloaded && (e.downloaded = 0), t._getAnnounceOpts && (e = d(e, t._getAnnounceOpts())), e;
	        };
	      }).call(this, e("_process"));
	    }, { "./lib/client/http-tracker": 25, "./lib/client/udp-tracker": 25, "./lib/client/websocket-tracker": 19, "./lib/common": 20, _process: 69, debug: 21, events: 37, inherits: 44, once: 63, "run-parallel": 92, "safe-buffer": 94, "simple-peer": 97, uniq: 122, url: 124, xtend: 133 }], 18: [function (e, t) {
	      function n(e, t) {
	        var n = this;r.call(n), n.client = e, n.announceUrl = t, n.interval = null, n.destroyed = !1;
	      }t.exports = n;var r = e("events").EventEmitter,
	          o = e("inherits");o(n, r), n.prototype.setInterval = function (e) {
	        var t = this;null == e && (e = t.DEFAULT_ANNOUNCE_INTERVAL), clearInterval(t.interval), e && (t.interval = setInterval(function () {
	          t.announce(t.client._defaultAnnounceOpts());
	        }, e), t.interval.unref && t.interval.unref());
	      };
	    }, { events: 37, inherits: 44 }], 19: [function (e, n) {
	      function o(e, t) {
	        var n = this;h.call(n, e, t), a("new websocket tracker %s", t), n.peers = {}, n.socket = null, n.reconnecting = !1, n.retries = 0, n.reconnectTimer = null, n.expectingResponse = !1, n._openSocket();
	      }function s() {}n.exports = o;var a = e("debug")("bittorrent-tracker:websocket-tracker"),
	          i = e("xtend"),
	          c = e("inherits"),
	          p = e("simple-peer"),
	          l = e("randombytes"),
	          u = e("simple-websocket"),
	          f = e("../common"),
	          h = e("./tracker"),
	          m = {};c(o, h), o.prototype.DEFAULT_ANNOUNCE_INTERVAL = 30000, o.prototype.announce = function (e) {
	        var t = this;if (!(t.destroyed || t.reconnecting)) {
	          if (!t.socket.connected) return void t.socket.once("connect", function () {
	            t.announce(e);
	          });var n = i(e, { action: "announce", info_hash: t.client._infoHashBinary, peer_id: t.client._peerIdBinary });if (t._trackerId && (n.trackerid = t._trackerId), "stopped" === e.event || "completed" === e.event) t._send(n);else {
	            var r = d(e.numwant, 10);t._generateOffers(r, function (e) {
	              n.numwant = r, n.offers = e, t._send(n);
	            });
	          }
	        }
	      }, o.prototype.scrape = function (e) {
	        var t = this;if (!(t.destroyed || t.reconnecting)) {
	          if (!t.socket.connected) return void t.socket.once("connect", function () {
	            t.scrape(e);
	          });var n = Array.isArray(e.infoHash) && 0 < e.infoHash.length ? e.infoHash.map(function (e) {
	            return e.toString("binary");
	          }) : e.infoHash && e.infoHash.toString("binary") || t.client._infoHashBinary;t._send({ action: "scrape", info_hash: n });
	        }
	      }, o.prototype.destroy = function (e) {
	        function t() {
	          d && (clearTimeout(d), d = null), i.removeListener("data", t), i.destroy(), i = null;
	        }var n = this;if (e || (e = s), n.destroyed) return e(null);for (var r in n.destroyed = !0, clearInterval(n.interval), clearTimeout(n.reconnectTimer), n.peers) {
	          var o = n.peers[r];clearTimeout(o.trackerTimeout), o.destroy();
	        }if (n.peers = null, n.socket && (n.socket.removeListener("connect", n._onSocketConnectBound), n.socket.removeListener("data", n._onSocketDataBound), n.socket.removeListener("close", n._onSocketCloseBound), n.socket.removeListener("error", n._onSocketErrorBound), n.socket = null), n._onSocketConnectBound = null, n._onSocketErrorBound = null, n._onSocketDataBound = null, n._onSocketCloseBound = null, m[n.announceUrl] && (m[n.announceUrl].consumers -= 1), 0 < m[n.announceUrl].consumers) return e();var i = m[n.announceUrl];if (delete m[n.announceUrl], i.on("error", s), i.once("close", e), !n.expectingResponse) return t();var d = setTimeout(t, f.DESTROY_TIMEOUT);i.once("data", t);
	      }, o.prototype._openSocket = function () {
	        var e = this;e.destroyed = !1, e.peers || (e.peers = {}), e._onSocketConnectBound = function () {
	          e._onSocketConnect();
	        }, e._onSocketErrorBound = function (t) {
	          e._onSocketError(t);
	        }, e._onSocketDataBound = function (t) {
	          e._onSocketData(t);
	        }, e._onSocketCloseBound = function () {
	          e._onSocketClose();
	        }, e.socket = m[e.announceUrl], e.socket ? m[e.announceUrl].consumers += 1 : (e.socket = m[e.announceUrl] = new u(e.announceUrl), e.socket.consumers = 1, e.socket.once("connect", e._onSocketConnectBound)), e.socket.on("data", e._onSocketDataBound), e.socket.once("close", e._onSocketCloseBound), e.socket.once("error", e._onSocketErrorBound);
	      }, o.prototype._onSocketConnect = function () {
	        var e = this;e.destroyed || e.reconnecting && (e.reconnecting = !1, e.retries = 0, e.announce(e.client._defaultAnnounceOpts()));
	      }, o.prototype._onSocketData = function (e) {
	        var t = this;if (!t.destroyed) {
	          t.expectingResponse = !1;try {
	            e = JSON.parse(e);
	          } catch (e) {
	            return void t.client.emit("warning", new Error("Invalid tracker response"));
	          }"announce" === e.action ? t._onAnnounceResponse(e) : "scrape" === e.action ? t._onScrapeResponse(e) : t._onSocketError(new Error("invalid action in WS response: " + e.action));
	        }
	      }, o.prototype._onAnnounceResponse = function (e) {
	        var t = this;if (e.info_hash !== t.client._infoHashBinary) return void a("ignoring websocket data from %s for %s (looking for %s: reused socket)", t.announceUrl, f.binaryToHex(e.info_hash), t.client.infoHash);if (!(e.peer_id && e.peer_id === t.client._peerIdBinary)) {
	          a("received %s from %s for %s", JSON.stringify(e), t.announceUrl, t.client.infoHash);var n = e["failure reason"];if (n) return t.client.emit("warning", new Error(n));var r = e["warning message"];r && t.client.emit("warning", new Error(r));var o = e.interval || e["min interval"];o && t.setInterval(1e3 * o);var s = e["tracker id"];if (s && (t._trackerId = s), null != e.complete) {
	            var i = Object.assign({}, e, { announce: t.announceUrl, infoHash: f.binaryToHex(e.info_hash) });t.client.emit("update", i);
	          }var d;if (e.offer && e.peer_id && (a("creating peer (from remote offer)"), d = t._createPeer(), d.id = f.binaryToHex(e.peer_id), d.once("signal", function (n) {
	            var r = { action: "announce", info_hash: t.client._infoHashBinary, peer_id: t.client._peerIdBinary, to_peer_id: e.peer_id, answer: n, offer_id: e.offer_id };t._trackerId && (r.trackerid = t._trackerId), t._send(r);
	          }), d.signal(e.offer), t.client.emit("peer", d)), e.answer && e.peer_id) {
	            var c = f.binaryToHex(e.offer_id);d = t.peers[c], d ? (d.id = f.binaryToHex(e.peer_id), d.signal(e.answer), t.client.emit("peer", d), clearTimeout(d.trackerTimeout), d.trackerTimeout = null, delete t.peers[c]) : a("got unexpected answer: " + JSON.stringify(e.answer));
	          }
	        }
	      }, o.prototype._onScrapeResponse = function (e) {
	        var t = this;e = e.files || {};var n = Object.keys(e);return 0 === n.length ? void t.client.emit("warning", new Error("invalid scrape response")) : void n.forEach(function (n) {
	          var r = Object.assign(e[n], { announce: t.announceUrl, infoHash: f.binaryToHex(n) });t.client.emit("scrape", r);
	        });
	      }, o.prototype._onSocketClose = function () {
	        var e = this;e.destroyed || (e.destroy(), e._startReconnectTimer());
	      }, o.prototype._onSocketError = function (e) {
	        var t = this;t.destroyed || (t.destroy(), t.client.emit("warning", e), t._startReconnectTimer());
	      }, o.prototype._startReconnectTimer = function () {
	        var e = this,
	            n = r(Math.random() * 30000) + d(t(2, e.retries) * 15000, 1800000);e.reconnecting = !0, clearTimeout(e.reconnectTimer), e.reconnectTimer = setTimeout(function () {
	          e.retries++, e._openSocket();
	        }, n), e.reconnectTimer.unref && e.reconnectTimer.unref(), a("reconnecting socket in %s ms", n);
	      }, o.prototype._send = function (e) {
	        var t = this;if (!t.destroyed) {
	          t.expectingResponse = !0;var n = JSON.stringify(e);a("send %s", n), t.socket.send(n);
	        }
	      }, o.prototype._generateOffers = function (e, t) {
	        function n() {
	          var e = l(20).toString("hex");a("creating peer (from _generateOffers)");var t = o.peers[e] = o._createPeer({ initiator: !0 });t.once("signal", function (t) {
	            s.push({ offer: t, offer_id: f.hexToBinary(e) }), r();
	          }), t.trackerTimeout = setTimeout(function () {
	            a("tracker timeout: destroying peer"), t.trackerTimeout = null, delete o.peers[e], t.destroy();
	          }, 50000), t.trackerTimeout.unref && t.trackerTimeout.unref();
	        }function r() {
	          s.length === e && (a("generated %s offers", e), t(s));
	        }var o = this,
	            s = [];a("generating %s offers", e);for (var d = 0; d < e; ++d) {
	          n();
	        }r();
	      }, o.prototype._createPeer = function (e) {
	        function t(e) {
	          r.client.emit("warning", new Error("Connection error: " + e.message)), o.destroy();
	        }function n() {
	          o.removeListener("error", t), o.removeListener("connect", n);
	        }var r = this;e = Object.assign({ trickle: !1, config: r.client._rtcConfig, wrtc: r.client._wrtc }, e);var o = new p(e);return o.once("error", t), o.once("connect", n), o;
	      };
	    }, { "../common": 20, "./tracker": 18, debug: 21, inherits: 44, randombytes: 76, "simple-peer": 97, "simple-websocket": 101, xtend: 133 }], 20: [function (e, t, n) {
	      var r = e("safe-buffer").Buffer,
	          o = e("xtend/mutable");n.DEFAULT_ANNOUNCE_PEERS = 50, n.MAX_ANNOUNCE_PEERS = 82, n.binaryToHex = function (e) {
	        return "string" != typeof e && (e += ""), r.from(e, "binary").toString("hex");
	      }, n.hexToBinary = function (e) {
	        return "string" != typeof e && (e += ""), r.from(e, "hex").toString("binary");
	      };var s = e("./common-node");o(n, s);
	    }, { "./common-node": 25, "safe-buffer": 94, "xtend/mutable": 134 }], 21: [function (e, t, n) {
	      arguments[4][15][0].apply(n, arguments);
	    }, { "./debug": 22, _process: 69, dup: 15 }], 22: [function (e, t, n) {
	      arguments[4][16][0].apply(n, arguments);
	    }, { dup: 16, ms: 60 }], 23: [function (e, t) {
	      (function (n) {
	        t.exports = function (e, t) {
	          function r(s) {
	            o.removeEventListener("loadend", r, !1), s.error ? t(s.error) : t(null, new n(o.result));
	          }if ("undefined" == typeof Blob || !(e instanceof Blob)) throw new Error("first argument must be a Blob");if ("function" != typeof t) throw new Error("second argument must be a function");var o = new FileReader();o.addEventListener("loadend", r, !1), o.readAsArrayBuffer(e);
	        };
	      }).call(this, e("buffer").Buffer);
	    }, { buffer: 27 }], 24: [function (e, t) {
	      (function (n) {
	        function r(e, t) {
	          return this instanceof r ? void (s.call(this), !t && (t = {}), "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && (t = e, e = t.size), this.size = e || 512, this._zeroPadding = !t.nopad && i(t.zeroPadding, !0), this._buffered = [], this._bufferedBytes = 0) : new r(e, t);
	        }var o = e("inherits"),
	            s = e("readable-stream").Transform,
	            i = e("defined");t.exports = r, o(r, s), r.prototype._transform = function (e, t, r) {
	          for (this._bufferedBytes += e.length, this._buffered.push(e); this._bufferedBytes >= this.size;) {
	            var o = n.concat(this._buffered);this._bufferedBytes -= this.size, this.push(o.slice(0, this.size)), this._buffered = [o.slice(this.size, o.length)];
	          }r();
	        }, r.prototype._flush = function () {
	          if (this._bufferedBytes && this._zeroPadding) {
	            var e = new n(this.size - this._bufferedBytes);e.fill(0), this._buffered.push(e), this.push(n.concat(this._buffered)), this._buffered = null;
	          } else this._bufferedBytes && (this.push(n.concat(this._buffered)), this._buffered = null);this.push(null);
	        };
	      }).call(this, e("buffer").Buffer);
	    }, { buffer: 27, defined: 35, inherits: 44, "readable-stream": 86 }], 25: [function () {}, {}], 26: [function (e, t, n) {
	      arguments[4][25][0].apply(n, arguments);
	    }, { dup: 25 }], 27: [function (n, r, o) {
	      "use strict";
	      function s(e) {
	        if (e > Q) throw new RangeError("Invalid typed array length");var t = new Uint8Array(e);return t.__proto__ = c.prototype, t;
	      }function c(e, t, n) {
	        if ("number" == typeof e) {
	          if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");return l(e);
	        }return i(e, t, n);
	      }function i(e, t, n) {
	        if ("number" == typeof e) throw new TypeError("\"value\" argument must not be a number");return e instanceof ArrayBuffer ? h(e, t, n) : "string" == typeof e ? u(e, t) : m(e);
	      }function a(e) {
	        if ("number" != typeof e) throw new TypeError("\"size\" argument must be a number");else if (0 > e) throw new RangeError("\"size\" argument must not be negative");
	      }function p(e, t, n) {
	        return a(e), 0 >= e ? s(e) : void 0 === t ? s(e) : "string" == typeof n ? s(e).fill(t, n) : s(e).fill(t);
	      }function l(e) {
	        return a(e), s(0 > e ? 0 : 0 | g(e));
	      }function u(e, t) {
	        if (("string" != typeof t || "" === t) && (t = "utf8"), !c.isEncoding(t)) throw new TypeError("\"encoding\" must be a valid string encoding");var n = 0 | _(e, t),
	            r = s(n),
	            o = r.write(e, t);return o !== n && (r = r.slice(0, o)), r;
	      }function f(e) {
	        for (var t = 0 > e.length ? 0 : 0 | g(e.length), n = s(t), r = 0; r < t; r += 1) {
	          n[r] = 255 & e[r];
	        }return n;
	      }function h(e, t, n) {
	        if (0 > t || e.byteLength < t) throw new RangeError("'offset' is out of bounds");if (e.byteLength < t + (n || 0)) throw new RangeError("'length' is out of bounds");var r;return r = void 0 === t && void 0 === n ? new Uint8Array(e) : void 0 === n ? new Uint8Array(e, t) : new Uint8Array(e, t, n), r.__proto__ = c.prototype, r;
	      }function m(e) {
	        if (c.isBuffer(e)) {
	          var t = 0 | g(e.length),
	              n = s(t);return 0 === n.length ? n : (e.copy(n, 0, 0, t), n);
	        }if (e) {
	          if (K(e) || "length" in e) return "number" != typeof e.length || X(e.length) ? s(0) : f(e);if ("Buffer" === e.type && Array.isArray(e.data)) return f(e.data);
	        }throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
	      }function g(e) {
	        if (e >= Q) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + Q.toString(16) + " bytes");return 0 | e;
	      }function _(e, t) {
	        if (c.isBuffer(e)) return e.length;if (K(e) || e instanceof ArrayBuffer) return e.byteLength;"string" != typeof e && (e = "" + e);var n = e.length;if (0 === n) return 0;for (var r = !1;;) {
	          switch (t) {case "ascii":case "latin1":case "binary":
	              return n;case "utf8":case "utf-8":case void 0:
	              return D(e).length;case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":
	              return 2 * n;case "hex":
	              return n >>> 1;case "base64":
	              return V(e).length;default:
	              if (r) return D(e).length;t = ("" + t).toLowerCase(), r = !0;}
	        }
	      }function y(e, t, n) {
	        var r = !1;if ((void 0 === t || 0 > t) && (t = 0), t > this.length) return "";if ((void 0 === n || n > this.length) && (n = this.length), 0 >= n) return "";if (n >>>= 0, t >>>= 0, n <= t) return "";for (e || (e = "utf8");;) {
	          switch (e) {case "hex":
	              return R(this, t, n);case "utf8":case "utf-8":
	              return L(this, t, n);case "ascii":
	              return A(this, t, n);case "latin1":case "binary":
	              return U(this, t, n);case "base64":
	              return I(this, t, n);case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":
	              return P(this, t, n);default:
	              if (r) throw new TypeError("Unknown encoding: " + e);e = (e + "").toLowerCase(), r = !0;}
	        }
	      }function b(e, t, n) {
	        var r = e[t];e[t] = e[n], e[n] = r;
	      }function w(e, t, n, r, o) {
	        if (0 === e.length) return -1;if ("string" == typeof n ? (r = n, n = 0) : 2147483647 < n ? n = 2147483647 : -2147483648 > n && (n = -2147483648), n = +n, X(n) && (n = o ? 0 : e.length - 1), 0 > n && (n = e.length + n), n >= e.length) {
	          if (o) return -1;n = e.length - 1;
	        } else if (0 > n) if (o) n = 0;else return -1;if ("string" == typeof t && (t = c.from(t, r)), c.isBuffer(t)) return 0 === t.length ? -1 : k(e, t, n, r, o);if ("number" == typeof t) return t &= 255, "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(e, t, n) : Uint8Array.prototype.lastIndexOf.call(e, t, n) : k(e, [t], n, r, o);throw new TypeError("val must be string, number or Buffer");
	      }function k(e, t, n, r, o) {
	        function s(e, t) {
	          return 1 == d ? e[t] : e.readUInt16BE(t * d);
	        }var d = 1,
	            a = e.length,
	            c = t.length;if (void 0 !== r && (r = (r + "").toLowerCase(), "ucs2" === r || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
	          if (2 > e.length || 2 > t.length) return -1;d = 2, a /= 2, c /= 2, n /= 2;
	        }var p;if (o) {
	          var i = -1;for (p = n; p < a; p++) {
	            if (s(e, p) !== s(t, -1 == i ? 0 : p - i)) -1 != i && (p -= p - i), i = -1;else if (-1 == i && (i = p), p - i + 1 === c) return i * d;
	          }
	        } else for (n + c > a && (n = a - c), p = n; 0 <= p; p--) {
	          for (var l = !0, u = 0; u < c; u++) {
	            if (s(e, p + u) !== s(t, u)) {
	              l = !1;break;
	            }
	          }if (l) return p;
	        }return -1;
	      }function x(e, t, n, r) {
	        n = +n || 0;var o = e.length - n;r ? (r = +r, r > o && (r = o)) : r = o;var s = t.length;if (0 != s % 2) throw new TypeError("Invalid hex string");r > s / 2 && (r = s / 2);for (var d = 0, i; d < r; ++d) {
	          if (i = parseInt(t.substr(2 * d, 2), 16), X(i)) return d;e[n + d] = i;
	        }return d;
	      }function v(e, t, n, r) {
	        return G(D(t, e.length - n), e, n, r);
	      }function S(e, t, n, r) {
	        return G(W(t), e, n, r);
	      }function C(e, t, n, r) {
	        return S(e, t, n, r);
	      }function E(e, t, n, r) {
	        return G(V(t), e, n, r);
	      }function B(e, t, n, r) {
	        return G(z(t, e.length - n), e, n, r);
	      }function I(e, t, n) {
	        return 0 === t && n === e.length ? Y.fromByteArray(e) : Y.fromByteArray(e.slice(t, n));
	      }function L(e, t, n) {
	        n = d(e.length, n);for (var r = [], o = t; o < n;) {
	          var s = e[o],
	              i = null,
	              a = 239 < s ? 4 : 223 < s ? 3 : 191 < s ? 2 : 1;if (o + a <= n) {
	            var c, p, l, u;1 == a ? 128 > s && (i = s) : 2 == a ? (c = e[o + 1], 128 == (192 & c) && (u = (31 & s) << 6 | 63 & c, 127 < u && (i = u))) : 3 == a ? (c = e[o + 1], p = e[o + 2], 128 == (192 & c) && 128 == (192 & p) && (u = (15 & s) << 12 | (63 & c) << 6 | 63 & p, 2047 < u && (55296 > u || 57343 < u) && (i = u))) : 4 == a ? (c = e[o + 1], p = e[o + 2], l = e[o + 3], 128 == (192 & c) && 128 == (192 & p) && 128 == (192 & l) && (u = (15 & s) << 18 | (63 & c) << 12 | (63 & p) << 6 | 63 & l, 65535 < u && 1114112 > u && (i = u))) : void 0;
	          }null === i ? (i = 65533, a = 1) : 65535 < i && (i -= 65536, r.push(55296 | 1023 & i >>> 10), i = 56320 | 1023 & i), r.push(i), o += a;
	        }return T(r);
	      }function T(t) {
	        var n = t.length;if (n <= J) return e.apply(String, t);for (var r = "", o = 0; o < n;) {
	          r += e.apply(String, t.slice(o, o += J));
	        }return r;
	      }function A(t, n, r) {
	        var o = "";r = d(t.length, r);for (var s = n; s < r; ++s) {
	          o += e(127 & t[s]);
	        }return o;
	      }function U(t, n, r) {
	        var o = "";r = d(t.length, r);for (var s = n; s < r; ++s) {
	          o += e(t[s]);
	        }return o;
	      }function R(e, t, n) {
	        var r = e.length;(!t || 0 > t) && (t = 0), (!n || 0 > n || n > r) && (n = r);for (var o = "", s = t; s < n; ++s) {
	          o += F(e[s]);
	        }return o;
	      }function P(t, n, r) {
	        for (var o = t.slice(n, r), s = "", d = 0; d < o.length; d += 2) {
	          s += e(o[d] + 256 * o[d + 1]);
	        }return s;
	      }function O(e, t, n) {
	        if (0 != e % 1 || 0 > e) throw new RangeError("offset is not uint");if (e + t > n) throw new RangeError("Trying to access beyond buffer length");
	      }function H(e, t, n, r, o, s) {
	        if (!c.isBuffer(e)) throw new TypeError("\"buffer\" argument must be a Buffer instance");if (t > o || t < s) throw new RangeError("\"value\" argument is out of bounds");if (n + r > e.length) throw new RangeError("Index out of range");
	      }function M(e, t, n, r) {
	        if (n + r > e.length) throw new RangeError("Index out of range");if (0 > n) throw new RangeError("Index out of range");
	      }function q(e, t, n, r, o) {
	        return t = +t, n >>>= 0, o || M(e, t, n, 4, 3.4028234663852886e38, -3.4028234663852886e38), $.write(e, t, n, r, 23, 4), n + 4;
	      }function j(e, t, n, r, o) {
	        return t = +t, n >>>= 0, o || M(e, t, n, 8, 1.7976931348623157e308, -1.7976931348623157e308), $.write(e, t, n, r, 52, 8), n + 8;
	      }function N(e) {
	        if (e = e.trim().replace(Z, ""), 2 > e.length) return "";for (; 0 != e.length % 4;) {
	          e += "=";
	        }return e;
	      }function F(e) {
	        return 16 > e ? "0" + e.toString(16) : e.toString(16);
	      }function D(e, t) {
	        t = t || Infinity;for (var n = e.length, r = null, o = [], s = 0, i; s < n; ++s) {
	          if (i = e.charCodeAt(s), 55295 < i && 57344 > i) {
	            if (!r) {
	              if (56319 < i) {
	                -1 < (t -= 3) && o.push(239, 191, 189);continue;
	              } else if (s + 1 === n) {
	                -1 < (t -= 3) && o.push(239, 191, 189);continue;
	              }r = i;continue;
	            }if (56320 > i) {
	              -1 < (t -= 3) && o.push(239, 191, 189), r = i;continue;
	            }i = (r - 55296 << 10 | i - 56320) + 65536;
	          } else r && -1 < (t -= 3) && o.push(239, 191, 189);if (r = null, 128 > i) {
	            if (0 > (t -= 1)) break;o.push(i);
	          } else if (2048 > i) {
	            if (0 > (t -= 2)) break;o.push(192 | i >> 6, 128 | 63 & i);
	          } else if (65536 > i) {
	            if (0 > (t -= 3)) break;o.push(224 | i >> 12, 128 | 63 & i >> 6, 128 | 63 & i);
	          } else if (1114112 > i) {
	            if (0 > (t -= 4)) break;o.push(240 | i >> 18, 128 | 63 & i >> 12, 128 | 63 & i >> 6, 128 | 63 & i);
	          } else throw new Error("Invalid code point");
	        }return o;
	      }function W(e) {
	        for (var t = [], n = 0; n < e.length; ++n) {
	          t.push(255 & e.charCodeAt(n));
	        }return t;
	      }function z(e, t) {
	        for (var n = [], r = 0, o, s, i; r < e.length && !(0 > (t -= 2)); ++r) {
	          o = e.charCodeAt(r), s = o >> 8, i = o % 256, n.push(i), n.push(s);
	        }return n;
	      }function V(e) {
	        return Y.toByteArray(N(e));
	      }function G(e, t, n, r) {
	        for (var o = 0; o < r && !(o + n >= t.length || o >= e.length); ++o) {
	          t[o + n] = e[o];
	        }return o;
	      }function K(e) {
	        return "function" == typeof ArrayBuffer.isView && ArrayBuffer.isView(e);
	      }function X(e) {
	        return e !== e;
	      }var Y = n("base64-js"),
	          $ = n("ieee754");o.Buffer = c, o.SlowBuffer = function (e) {
	        return +e != e && (e = 0), c.alloc(+e);
	      }, o.INSPECT_MAX_BYTES = 50;var Q = 2147483647;o.kMaxLength = Q, c.TYPED_ARRAY_SUPPORT = function () {
	        try {
	          var e = new Uint8Array(1);return e.__proto__ = { __proto__: Uint8Array.prototype, foo: function foo() {
	              return 42;
	            } }, 42 === e.foo();
	        } catch (t) {
	          return !1;
	        }
	      }(), c.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), "undefined" != typeof Symbol && Symbol.species && c[Symbol.species] === c && Object.defineProperty(c, Symbol.species, { value: null, configurable: !0, enumerable: !1, writable: !1 }), c.poolSize = 8192, c.from = function (e, t, n) {
	        return i(e, t, n);
	      }, c.prototype.__proto__ = Uint8Array.prototype, c.__proto__ = Uint8Array, c.alloc = function (e, t, n) {
	        return p(e, t, n);
	      }, c.allocUnsafe = function (e) {
	        return l(e);
	      }, c.allocUnsafeSlow = function (e) {
	        return l(e);
	      }, c.isBuffer = function (e) {
	        return null != e && !0 === e._isBuffer;
	      }, c.compare = function (e, t) {
	        if (!c.isBuffer(e) || !c.isBuffer(t)) throw new TypeError("Arguments must be Buffers");if (e === t) return 0;for (var n = e.length, r = t.length, o = 0, s = d(n, r); o < s; ++o) {
	          if (e[o] !== t[o]) {
	            n = e[o], r = t[o];break;
	          }
	        }return n < r ? -1 : r < n ? 1 : 0;
	      }, c.isEncoding = function (e) {
	        switch ((e + "").toLowerCase()) {case "hex":case "utf8":case "utf-8":case "ascii":case "latin1":case "binary":case "base64":case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":
	            return !0;default:
	            return !1;}
	      }, c.concat = function (e, t) {
	        if (!Array.isArray(e)) throw new TypeError("\"list\" argument must be an Array of Buffers");if (0 === e.length) return c.alloc(0);var n;if (t === void 0) for (t = 0, n = 0; n < e.length; ++n) {
	          t += e[n].length;
	        }var r = c.allocUnsafe(t),
	            o = 0;for (n = 0; n < e.length; ++n) {
	          var s = e[n];if (!c.isBuffer(s)) throw new TypeError("\"list\" argument must be an Array of Buffers");s.copy(r, o), o += s.length;
	        }return r;
	      }, c.byteLength = _, c.prototype._isBuffer = !0, c.prototype.swap16 = function () {
	        var e = this.length;if (0 != e % 2) throw new RangeError("Buffer size must be a multiple of 16-bits");for (var t = 0; t < e; t += 2) {
	          b(this, t, t + 1);
	        }return this;
	      }, c.prototype.swap32 = function () {
	        var e = this.length;if (0 != e % 4) throw new RangeError("Buffer size must be a multiple of 32-bits");for (var t = 0; t < e; t += 4) {
	          b(this, t, t + 3), b(this, t + 1, t + 2);
	        }return this;
	      }, c.prototype.swap64 = function () {
	        var e = this.length;if (0 != e % 8) throw new RangeError("Buffer size must be a multiple of 64-bits");for (var t = 0; t < e; t += 8) {
	          b(this, t, t + 7), b(this, t + 1, t + 6), b(this, t + 2, t + 5), b(this, t + 3, t + 4);
	        }return this;
	      }, c.prototype.toString = function () {
	        var e = this.length;return 0 === e ? "" : 0 === arguments.length ? L(this, 0, e) : y.apply(this, arguments);
	      }, c.prototype.equals = function (e) {
	        if (!c.isBuffer(e)) throw new TypeError("Argument must be a Buffer");return this === e || 0 === c.compare(this, e);
	      }, c.prototype.inspect = function () {
	        var e = "",
	            t = o.INSPECT_MAX_BYTES;return 0 < this.length && (e = this.toString("hex", 0, t).match(/.{2}/g).join(" "), this.length > t && (e += " ... ")), "<Buffer " + e + ">";
	      }, c.prototype.compare = function (e, t, n, r, o) {
	        if (!c.isBuffer(e)) throw new TypeError("Argument must be a Buffer");if (void 0 === t && (t = 0), void 0 === n && (n = e ? e.length : 0), void 0 === r && (r = 0), void 0 === o && (o = this.length), 0 > t || n > e.length || 0 > r || o > this.length) throw new RangeError("out of range index");if (r >= o && t >= n) return 0;if (r >= o) return -1;if (t >= n) return 1;if (t >>>= 0, n >>>= 0, r >>>= 0, o >>>= 0, this === e) return 0;for (var s = o - r, a = n - t, p = d(s, a), l = this.slice(r, o), u = e.slice(t, n), f = 0; f < p; ++f) {
	          if (l[f] !== u[f]) {
	            s = l[f], a = u[f];break;
	          }
	        }return s < a ? -1 : a < s ? 1 : 0;
	      }, c.prototype.includes = function (e, t, n) {
	        return -1 !== this.indexOf(e, t, n);
	      }, c.prototype.indexOf = function (e, t, n) {
	        return w(this, e, t, n, !0);
	      }, c.prototype.lastIndexOf = function (e, t, n) {
	        return w(this, e, t, n, !1);
	      }, c.prototype.write = function (e, t, n, r) {
	        if (void 0 === t) r = "utf8", n = this.length, t = 0;else if (void 0 === n && "string" == typeof t) r = t, n = this.length, t = 0;else if (isFinite(t)) t >>>= 0, isFinite(n) ? (n >>>= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0);else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");var o = this.length - t;if ((void 0 === n || n > o) && (n = o), 0 < e.length && (0 > n || 0 > t) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");r || (r = "utf8");for (var s = !1;;) {
	          switch (r) {case "hex":
	              return x(this, e, t, n);case "utf8":case "utf-8":
	              return v(this, e, t, n);case "ascii":
	              return S(this, e, t, n);case "latin1":case "binary":
	              return C(this, e, t, n);case "base64":
	              return E(this, e, t, n);case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":
	              return B(this, e, t, n);default:
	              if (s) throw new TypeError("Unknown encoding: " + r);r = ("" + r).toLowerCase(), s = !0;}
	        }
	      }, c.prototype.toJSON = function () {
	        return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
	      };var J = 4096;c.prototype.slice = function (e, t) {
	        var n = this.length;e = ~~e, t = void 0 === t ? n : ~~t, 0 > e ? (e += n, 0 > e && (e = 0)) : e > n && (e = n), 0 > t ? (t += n, 0 > t && (t = 0)) : t > n && (t = n), t < e && (t = e);var r = this.subarray(e, t);return r.__proto__ = c.prototype, r;
	      }, c.prototype.readUIntLE = function (e, t, n) {
	        e >>>= 0, t >>>= 0, n || O(e, t, this.length);for (var r = this[e], o = 1, s = 0; ++s < t && (o *= 256);) {
	          r += this[e + s] * o;
	        }return r;
	      }, c.prototype.readUIntBE = function (e, t, n) {
	        e >>>= 0, t >>>= 0, n || O(e, t, this.length);for (var r = this[e + --t], o = 1; 0 < t && (o *= 256);) {
	          r += this[e + --t] * o;
	        }return r;
	      }, c.prototype.readUInt8 = function (e, t) {
	        return e >>>= 0, t || O(e, 1, this.length), this[e];
	      }, c.prototype.readUInt16LE = function (e, t) {
	        return e >>>= 0, t || O(e, 2, this.length), this[e] | this[e + 1] << 8;
	      }, c.prototype.readUInt16BE = function (e, t) {
	        return e >>>= 0, t || O(e, 2, this.length), this[e] << 8 | this[e + 1];
	      }, c.prototype.readUInt32LE = function (e, t) {
	        return e >>>= 0, t || O(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3];
	      }, c.prototype.readUInt32BE = function (e, t) {
	        return e >>>= 0, t || O(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
	      }, c.prototype.readIntLE = function (e, n, r) {
	        e >>>= 0, n >>>= 0, r || O(e, n, this.length);for (var o = this[e], s = 1, d = 0; ++d < n && (s *= 256);) {
	          o += this[e + d] * s;
	        }return s *= 128, o >= s && (o -= t(2, 8 * n)), o;
	      }, c.prototype.readIntBE = function (e, n, r) {
	        e >>>= 0, n >>>= 0, r || O(e, n, this.length);for (var o = n, s = 1, i = this[e + --o]; 0 < o && (s *= 256);) {
	          i += this[e + --o] * s;
	        }return s *= 128, i >= s && (i -= t(2, 8 * n)), i;
	      }, c.prototype.readInt8 = function (e, t) {
	        return e >>>= 0, t || O(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e];
	      }, c.prototype.readInt16LE = function (e, t) {
	        e >>>= 0, t || O(e, 2, this.length);var n = this[e] | this[e + 1] << 8;return 32768 & n ? 4294901760 | n : n;
	      }, c.prototype.readInt16BE = function (e, t) {
	        e >>>= 0, t || O(e, 2, this.length);var n = this[e + 1] | this[e] << 8;return 32768 & n ? 4294901760 | n : n;
	      }, c.prototype.readInt32LE = function (e, t) {
	        return e >>>= 0, t || O(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
	      }, c.prototype.readInt32BE = function (e, t) {
	        return e >>>= 0, t || O(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
	      }, c.prototype.readFloatLE = function (e, t) {
	        return e >>>= 0, t || O(e, 4, this.length), $.read(this, e, !0, 23, 4);
	      }, c.prototype.readFloatBE = function (e, t) {
	        return e >>>= 0, t || O(e, 4, this.length), $.read(this, e, !1, 23, 4);
	      }, c.prototype.readDoubleLE = function (e, t) {
	        return e >>>= 0, t || O(e, 8, this.length), $.read(this, e, !0, 52, 8);
	      }, c.prototype.readDoubleBE = function (e, t) {
	        return e >>>= 0, t || O(e, 8, this.length), $.read(this, e, !1, 52, 8);
	      }, c.prototype.writeUIntLE = function (e, n, r, o) {
	        if (e = +e, n >>>= 0, r >>>= 0, !o) {
	          var s = t(2, 8 * r) - 1;H(this, e, n, r, s, 0);
	        }var d = 1,
	            a = 0;for (this[n] = 255 & e; ++a < r && (d *= 256);) {
	          this[n + a] = 255 & e / d;
	        }return n + r;
	      }, c.prototype.writeUIntBE = function (e, n, r, o) {
	        if (e = +e, n >>>= 0, r >>>= 0, !o) {
	          var s = t(2, 8 * r) - 1;H(this, e, n, r, s, 0);
	        }var d = r - 1,
	            i = 1;for (this[n + d] = 255 & e; 0 <= --d && (i *= 256);) {
	          this[n + d] = 255 & e / i;
	        }return n + r;
	      }, c.prototype.writeUInt8 = function (e, t, n) {
	        return e = +e, t >>>= 0, n || H(this, e, t, 1, 255, 0), this[t] = 255 & e, t + 1;
	      }, c.prototype.writeUInt16LE = function (e, t, n) {
	        return e = +e, t >>>= 0, n || H(this, e, t, 2, 65535, 0), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2;
	      }, c.prototype.writeUInt16BE = function (e, t, n) {
	        return e = +e, t >>>= 0, n || H(this, e, t, 2, 65535, 0), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2;
	      }, c.prototype.writeUInt32LE = function (e, t, n) {
	        return e = +e, t >>>= 0, n || H(this, e, t, 4, 4294967295, 0), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e, t + 4;
	      }, c.prototype.writeUInt32BE = function (e, t, n) {
	        return e = +e, t >>>= 0, n || H(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4;
	      }, c.prototype.writeIntLE = function (e, n, r, o) {
	        if (e = +e, n >>>= 0, !o) {
	          var s = t(2, 8 * r - 1);H(this, e, n, r, s - 1, -s);
	        }var d = 0,
	            i = 1,
	            a = 0;for (this[n] = 255 & e; ++d < r && (i *= 256);) {
	          0 > e && 0 == a && 0 !== this[n + d - 1] && (a = 1), this[n + d] = 255 & (e / i >> 0) - a;
	        }return n + r;
	      }, c.prototype.writeIntBE = function (e, n, r, o) {
	        if (e = +e, n >>>= 0, !o) {
	          var s = t(2, 8 * r - 1);H(this, e, n, r, s - 1, -s);
	        }var d = r - 1,
	            i = 1,
	            a = 0;for (this[n + d] = 255 & e; 0 <= --d && (i *= 256);) {
	          0 > e && 0 == a && 0 !== this[n + d + 1] && (a = 1), this[n + d] = 255 & (e / i >> 0) - a;
	        }return n + r;
	      }, c.prototype.writeInt8 = function (e, t, n) {
	        return e = +e, t >>>= 0, n || H(this, e, t, 1, 127, -128), 0 > e && (e = 255 + e + 1), this[t] = 255 & e, t + 1;
	      }, c.prototype.writeInt16LE = function (e, t, n) {
	        return e = +e, t >>>= 0, n || H(this, e, t, 2, 32767, -32768), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2;
	      }, c.prototype.writeInt16BE = function (e, t, n) {
	        return e = +e, t >>>= 0, n || H(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2;
	      }, c.prototype.writeInt32LE = function (e, t, n) {
	        return e = +e, t >>>= 0, n || H(this, e, t, 4, 2147483647, -2147483648), this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4;
	      }, c.prototype.writeInt32BE = function (e, t, n) {
	        return e = +e, t >>>= 0, n || H(this, e, t, 4, 2147483647, -2147483648), 0 > e && (e = 4294967295 + e + 1), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4;
	      }, c.prototype.writeFloatLE = function (e, t, n) {
	        return q(this, e, t, !0, n);
	      }, c.prototype.writeFloatBE = function (e, t, n) {
	        return q(this, e, t, !1, n);
	      }, c.prototype.writeDoubleLE = function (e, t, n) {
	        return j(this, e, t, !0, n);
	      }, c.prototype.writeDoubleBE = function (e, t, n) {
	        return j(this, e, t, !1, n);
	      }, c.prototype.copy = function (e, t, n, r) {
	        if (n || (n = 0), r || 0 === r || (r = this.length), t >= e.length && (t = e.length), t || (t = 0), 0 < r && r < n && (r = n), r === n) return 0;if (0 === e.length || 0 === this.length) return 0;if (0 > t) throw new RangeError("targetStart out of bounds");if (0 > n || n >= this.length) throw new RangeError("sourceStart out of bounds");if (0 > r) throw new RangeError("sourceEnd out of bounds");r > this.length && (r = this.length), e.length - t < r - n && (r = e.length - t + n);var o = r - n,
	            s;if (this === e && n < t && t < r) for (s = o - 1; 0 <= s; --s) {
	          e[s + t] = this[s + n];
	        } else if (1e3 > o) for (s = 0; s < o; ++s) {
	          e[s + t] = this[s + n];
	        } else Uint8Array.prototype.set.call(e, this.subarray(n, n + o), t);return o;
	      }, c.prototype.fill = function (e, t, n, r) {
	        if ("string" == typeof e) {
	          if ("string" == typeof t ? (r = t, t = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), 1 === e.length) {
	            var o = e.charCodeAt(0);256 > o && (e = o);
	          }if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");if ("string" == typeof r && !c.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);
	        } else "number" == typeof e && (e &= 255);if (0 > t || this.length < t || this.length < n) throw new RangeError("Out of range index");if (n <= t) return this;t >>>= 0, n = n === void 0 ? this.length : n >>> 0, e || (e = 0);var s;if ("number" == typeof e) for (s = t; s < n; ++s) {
	          this[s] = e;
	        } else {
	          var i = c.isBuffer(e) ? e : new c(e, r),
	              d = i.length;for (s = 0; s < n - t; ++s) {
	            this[s + t] = i[s % d];
	          }
	        }return this;
	      };var Z = /[^+/0-9A-Za-z-_]/g;
	    }, { "base64-js": 8, ieee754: 42 }], 28: [function (e, t) {
	      t.exports = { 100: "Continue", 101: "Switching Protocols", 102: "Processing", 200: "OK", 201: "Created", 202: "Accepted", 203: "Non-Authoritative Information", 204: "No Content", 205: "Reset Content", 206: "Partial Content", 207: "Multi-Status", 208: "Already Reported", 226: "IM Used", 300: "Multiple Choices", 301: "Moved Permanently", 302: "Found", 303: "See Other", 304: "Not Modified", 305: "Use Proxy", 307: "Temporary Redirect", 308: "Permanent Redirect", 400: "Bad Request", 401: "Unauthorized", 402: "Payment Required", 403: "Forbidden", 404: "Not Found", 405: "Method Not Allowed", 406: "Not Acceptable", 407: "Proxy Authentication Required", 408: "Request Timeout", 409: "Conflict", 410: "Gone", 411: "Length Required", 412: "Precondition Failed", 413: "Payload Too Large", 414: "URI Too Long", 415: "Unsupported Media Type", 416: "Range Not Satisfiable", 417: "Expectation Failed", 418: "I'm a teapot", 421: "Misdirected Request", 422: "Unprocessable Entity", 423: "Locked", 424: "Failed Dependency", 425: "Unordered Collection", 426: "Upgrade Required", 428: "Precondition Required", 429: "Too Many Requests", 431: "Request Header Fields Too Large", 451: "Unavailable For Legal Reasons", 500: "Internal Server Error", 501: "Not Implemented", 502: "Bad Gateway", 503: "Service Unavailable", 504: "Gateway Timeout", 505: "HTTP Version Not Supported", 506: "Variant Also Negotiates", 507: "Insufficient Storage", 508: "Loop Detected", 509: "Bandwidth Limit Exceeded", 510: "Not Extended", 511: "Network Authentication Required" };
	    }, {}], 29: [function (e, t) {
	      function n(e, t, o) {
	        var i = this;if (!(i instanceof n)) return new n(e, t, o);if (s.Writable.call(i, o), o || (o = {}), !e || !e.put || !e.get) throw new Error("First argument must be an abstract-chunk-store compliant store");if (t = +t, !t) throw new Error("Second argument must be a chunk length");i._blockstream = new r(t, { zeroPadding: !1 }), i._blockstream.on("data", function (t) {
	          i.destroyed || (e.put(d, t), d += 1);
	        }).on("error", function (e) {
	          i.destroy(e);
	        });var d = 0;i.on("finish", function () {
	          this._blockstream.end();
	        });
	      }t.exports = n;var r = e("block-stream2"),
	          o = e("inherits"),
	          s = e("readable-stream");o(n, s.Writable), n.prototype._write = function (e, t, n) {
	        this._blockstream.write(e, t, n);
	      }, n.prototype.destroy = function (e) {
	        this.destroyed || (this.destroyed = !0, e && this.emit("error", e), this.emit("close"));
	      };
	    }, { "block-stream2": 24, inherits: 44, "readable-stream": 86 }], 30: [function (e, t) {
	      t.exports = function (e, t, n) {
	        for (var r = Infinity, s = 0, d = t.length - 1, a, i, c; s <= d && (a = s + (d - s >> 1), c = t[a] - e, 0 > c ? s = a + 1 : 0 < c ? d = a - 1 : void 0, c = o(c), c < r && (r = c, i = a), t[a] !== e);) {}return n ? i : t[i];
	      };
	    }, {}], 31: [function (e, t, n) {
	      (function (e) {
	        function t(e) {
	          return Object.prototype.toString.call(e);
	        }n.isArray = function (e) {
	          return Array.isArray ? Array.isArray(e) : "[object Array]" === t(e);
	        }, n.isBoolean = function (e) {
	          return "boolean" == typeof e;
	        }, n.isNull = function (e) {
	          return null === e;
	        }, n.isNullOrUndefined = function (e) {
	          return null == e;
	        }, n.isNumber = function (e) {
	          return "number" == typeof e;
	        }, n.isString = function (e) {
	          return "string" == typeof e;
	        }, n.isSymbol = function (e) {
	          return "symbol" == (typeof e === "undefined" ? "undefined" : _typeof(e));
	        }, n.isUndefined = function (e) {
	          return void 0 === e;
	        }, n.isRegExp = function (e) {
	          return "[object RegExp]" === t(e);
	        }, n.isObject = function (e) {
	          return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && null !== e;
	        }, n.isDate = function (e) {
	          return "[object Date]" === t(e);
	        }, n.isError = function (n) {
	          return "[object Error]" === t(n) || n instanceof Error;
	        }, n.isFunction = function (e) {
	          return "function" == typeof e;
	        }, n.isPrimitive = function (e) {
	          return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == (typeof e === "undefined" ? "undefined" : _typeof(e)) || "undefined" == typeof e;
	        }, n.isBuffer = e.isBuffer;
	      }).call(this, { isBuffer: e("../../is-buffer/index.js") });
	    }, { "../../is-buffer/index.js": 46 }], 32: [function (e, t) {
	      (function (n, r, o) {
	        function i(e, t, n) {
	          return "function" == typeof t ? i(e, null, t) : void (t = t ? B(t) : {}, a(e, t, function (e, r, o) {
	            return e ? n(e) : void (t.singleFileTorrent = o, h(r, t, n));
	          }));
	        }function d(e, t, n) {
	          return "function" == typeof t ? d(e, null, t) : void (t = t ? B(t) : {}, a(e, t, n));
	        }function a(e, t, r) {
	          function s() {
	            O(e.map(function (e) {
	              return function (t) {
	                var n = {};if (g(e)) n.getStream = b(e), n.length = e.size;else if (o.isBuffer(e)) n.getStream = w(e), n.length = e.length;else if (y(e)) n.getStream = x(e, n), n.length = 0;else {
	                  if ("string" == typeof e) {
	                    if ("function" != typeof T.stat) throw new Error("filesystem paths do not work in the browser");var r = 1 < i || a;return void c(e, r, t);
	                  }throw new Error("invalid input type");
	                }n.path = e.path, t(null, n);
	              };
	            }), function (e, t) {
	              return e ? r(e) : void (t = L(t), r(null, t, a));
	            });
	          }if (Array.isArray(e) && 0 === e.length) throw new Error("invalid input type");_(e) && (e = Array.prototype.slice.call(e)), Array.isArray(e) || (e = [e]), e = e.map(function (e) {
	            return g(e) && "string" == typeof e.path && "function" == typeof T.stat ? e.path : e;
	          }), 1 !== e.length || "string" == typeof e[0] || e[0].name || (e[0].name = t.name);var d = null;e.forEach(function (t, n) {
	            if ("string" != typeof t) {
	              var r = t.fullPath || t.name;r || (r = "Unknown File " + (n + 1), t.unknownName = !0), t.path = r.split("/"), t.path[0] || t.path.shift(), 2 > t.path.length ? d = null : 0 === n && 1 < e.length ? d = t.path[0] : t.path[0] !== d && (d = null);
	            }
	          }), e = e.filter(function (e) {
	            if ("string" == typeof e) return !0;var t = e.path[e.path.length - 1];return u(t) && U.not(t);
	          }), d && e.forEach(function (e) {
	            var t = (o.isBuffer(e) || y(e)) && !e.path;"string" == typeof e || t || e.path.shift();
	          }), !t.name && d && (t.name = d), t.name || e.some(function (e) {
	            return "string" == typeof e ? (t.name = E.basename(e), !0) : e.unknownName ? void 0 : (t.name = e.path[e.path.length - 1], !0);
	          }), t.name || (t.name = "Unnamed Torrent " + Date.now());var i = e.reduce(function (e, t) {
	            return e + +("string" == typeof t);
	          }, 0),
	              a = 1 === e.length;if (1 === e.length && "string" == typeof e[0]) {
	            if ("function" != typeof T.stat) throw new Error("filesystem paths do not work in the browser");A(e[0], function (e, t) {
	              return e ? r(e) : void (a = t, s());
	            });
	          } else n.nextTick(function () {
	            s();
	          });
	        }function c(e, t, n) {
	          l(e, p, function (r, o) {
	            return r ? n(r) : void (o = Array.isArray(o) ? L(o) : [o], e = E.normalize(e), t && (e = e.slice(0, e.lastIndexOf(E.sep) + 1)), e[e.length - 1] !== E.sep && (e += E.sep), o.forEach(function (t) {
	              t.getStream = k(t.path), t.path = t.path.replace(e, "").split(E.sep);
	            }), n(null, o));
	          });
	        }function p(e, t) {
	          t = P(t), T.stat(e, function (n, r) {
	            if (n) return t(n);var o = { length: r.size, path: e };t(null, o);
	          });
	        }function l(e, t, n) {
	          T.stat(e, function (r, o) {
	            return r ? n(r) : void (o.isDirectory() ? T.readdir(e, function (r, o) {
	              return r ? n(r) : void O(o.filter(u).filter(U.not).map(function (n) {
	                return function (r) {
	                  l(E.join(e, n), t, r);
	                };
	              }), n);
	            }) : o.isFile() && t(e, n));
	          });
	        }function u(e) {
	          return "." !== e[0];
	        }function f(e, t, n) {
	          function r(e) {
	            p += e.length;var t = f;H(e, function (e) {
	              c[t] = e, u -= 1, a();
	            }), u += 1, f += 1;
	          }function s() {
	            h = !0, a();
	          }function i(e) {
	            d(), n(e);
	          }function d() {
	            m.removeListener("error", i), g.removeListener("data", r), g.removeListener("end", s), g.removeListener("error", i);
	          }function a() {
	            h && 0 == u && (d(), n(null, o.from(c.join(""), "hex"), p));
	          }n = P(n);var c = [],
	              p = 0,
	              l = e.map(function (e) {
	            return e.getStream;
	          }),
	              u = 0,
	              f = 0,
	              h = !1,
	              m = new R(l),
	              g = new S(t, { zeroPadding: !1 });m.on("error", i), m.pipe(g).on("data", r).on("end", s).on("error", i);
	        }function h(e, n, o) {
	          var i = n.announceList;i || ("string" == typeof n.announce ? i = [[n.announce]] : Array.isArray(n.announce) && (i = n.announce.map(function (e) {
	            return [e];
	          }))), i || (i = []), r.WEBTORRENT_ANNOUNCE && ("string" == typeof r.WEBTORRENT_ANNOUNCE ? i.push([[r.WEBTORRENT_ANNOUNCE]]) : Array.isArray(r.WEBTORRENT_ANNOUNCE) && (i = i.concat(r.WEBTORRENT_ANNOUNCE.map(function (e) {
	            return [e];
	          })))), n.announce === void 0 && n.announceList === void 0 && (i = i.concat(t.exports.announceList)), "string" == typeof n.urlList && (n.urlList = [n.urlList]);var d = { info: { name: n.name }, "creation date": s((+n.creationDate || Date.now()) / 1e3), encoding: "UTF-8" };0 !== i.length && (d.announce = i[0][0], d["announce-list"] = i), n.comment !== void 0 && (d.comment = n.comment), n.createdBy !== void 0 && (d["created by"] = n.createdBy), n.private !== void 0 && (d.info.private = +n.private), n.sslCert !== void 0 && (d.info["ssl-cert"] = n.sslCert), n.urlList !== void 0 && (d["url-list"] = n.urlList);var a = n.pieceLength || C(e.reduce(m, 0));d.info["piece length"] = a, f(e, a, function (t, r, s) {
	            return t ? o(t) : void (d.info.pieces = r, e.forEach(function (e) {
	              delete e.getStream;
	            }), n.singleFileTorrent ? d.info.length = s : d.info.files = e, o(null, v.encode(d)));
	          });
	        }function m(e, t) {
	          return e + t.length;
	        }function g(e) {
	          return "undefined" != typeof Blob && e instanceof Blob;
	        }function _(e) {
	          return "undefined" != typeof FileList && e instanceof FileList;
	        }function y(e) {
	          return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && null != e && "function" == typeof e.pipe;
	        }function b(e) {
	          return function () {
	            return new I(e);
	          };
	        }function w(e) {
	          return function () {
	            var t = new M.PassThrough();return t.end(e), t;
	          };
	        }function k(e) {
	          return function () {
	            return T.createReadStream(e);
	          };
	        }function x(e, t) {
	          return function () {
	            var n = new M.Transform();return n._transform = function (e, n, r) {
	              t.length += e.length, this.push(e), r();
	            }, e.pipe(n), n;
	          };
	        }t.exports = i, t.exports.parseInput = d, t.exports.announceList = [["udp://tracker.leechers-paradise.org:6969"], ["udp://tracker.coppersurfer.tk:6969"], ["udp://tracker.opentrackr.org:1337"], ["udp://explodie.org:6969"], ["udp://tracker.empire-js.us:1337"], ["wss://tracker.btorrent.xyz"], ["wss://tracker.openwebtorrent.com"], ["wss://tracker.fastcast.nz"]];var v = e("bencode"),
	            S = e("block-stream2"),
	            C = e("piece-length"),
	            E = e("path"),
	            B = e("xtend"),
	            I = e("filestream/read"),
	            L = e("flatten"),
	            T = e("fs"),
	            A = e("is-file"),
	            U = e("junk"),
	            R = e("multistream"),
	            P = e("once"),
	            O = e("run-parallel"),
	            H = e("simple-sha1"),
	            M = e("readable-stream");
	      }).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global, e("buffer").Buffer);
	    }, { _process: 69, bencode: 11, "block-stream2": 24, buffer: 27, "filestream/read": 38, flatten: 39, fs: 26, "is-file": 47, junk: 50, multistream: 61, once: 63, path: 66, "piece-length": 67, "readable-stream": 86, "run-parallel": 92, "simple-sha1": 100, xtend: 133 }], 33: [function (e, t, n) {
	      (function (o) {
	        function r() {
	          var e;try {
	            e = n.storage.debug;
	          } catch (t) {}return !e && "undefined" != typeof o && "env" in o && (e = o.env.DEBUG), e;
	        }n = t.exports = e("./debug"), n.log = function () {
	          return "object" == (typeof console === "undefined" ? "undefined" : _typeof(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
	        }, n.formatArgs = function (e) {
	          var t = this.useColors;if (e[0] = (t ? "%c" : "") + this.namespace + (t ? " %c" : " ") + e[0] + (t ? "%c " : " ") + "+" + n.humanize(this.diff), !!t) {
	            var r = "color: " + this.color;e.splice(1, 0, r, "color: inherit");var o = 0,
	                s = 0;e[0].replace(/%[a-zA-Z%]/g, function (e) {
	              "%%" === e || (o++, "%c" === e && (s = o));
	            }), e.splice(s, 0, r);
	          }
	        }, n.save = function (e) {
	          try {
	            null == e ? n.storage.removeItem("debug") : n.storage.debug = e;
	          } catch (t) {}
	        }, n.load = r, n.useColors = function () {
	          return "undefined" != typeof window && window.process && "renderer" === window.process.type || ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? !1 : "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && 31 <= parseInt(RegExp.$1, 10) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
	        }, n.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : function () {
	          try {
	            return window.localStorage;
	          } catch (t) {}
	        }(), n.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], n.formatters.j = function (e) {
	          try {
	            return JSON.stringify(e);
	          } catch (e) {
	            return "[UnexpectedJSONParseError]: " + e.message;
	          }
	        }, n.enable(r());
	      }).call(this, e("_process"));
	    }, { "./debug": 34, _process: 69 }], 34: [function (e, t, n) {
	      function r(e) {
	        var t = 0,
	            r;for (r in e) {
	          t = (t << 5) - t + e.charCodeAt(r), t |= 0;
	        }return n.colors[o(t) % n.colors.length];
	      }function s(e) {
	        function t() {
	          if (t.enabled) {
	            var e = t,
	                r = +new Date(),
	                s = r - (o || r);e.diff = s, e.prev = o, e.curr = r, o = r;for (var d = Array(arguments.length), a = 0; a < d.length; a++) {
	              d[a] = arguments[a];
	            }d[0] = n.coerce(d[0]), "string" != typeof d[0] && d.unshift("%O");var i = 0;d[0] = d[0].replace(/%([a-zA-Z%])/g, function (t, r) {
	              if ("%%" === t) return t;i++;var o = n.formatters[r];if ("function" == typeof o) {
	                var s = d[i];t = o.call(e, s), d.splice(i, 1), i--;
	              }return t;
	            }), n.formatArgs.call(e, d);var c = t.log || n.log || console.log.bind(console);c.apply(e, d);
	          }
	        }var o;return t.namespace = e, t.enabled = n.enabled(e), t.useColors = n.useColors(), t.color = r(e), t.destroy = i, "function" == typeof n.init && n.init(t), n.instances.push(t), t;
	      }function i() {
	        var e = n.instances.indexOf(this);return -1 !== e && (n.instances.splice(e, 1), !0);
	      }n = t.exports = s.debug = s["default"] = s, n.coerce = function (e) {
	        return e instanceof Error ? e.stack || e.message : e;
	      }, n.disable = function () {
	        n.enable("");
	      }, n.enable = function (e) {
	        n.save(e), n.names = [], n.skips = [];var t = ("string" == typeof e ? e : "").split(/[\s,]+/),
	            r = t.length,
	            o;for (o = 0; o < r; o++) {
	          t[o] && (e = t[o].replace(/\*/g, ".*?"), "-" === e[0] ? n.skips.push(new RegExp("^" + e.substr(1) + "$")) : n.names.push(new RegExp("^" + e + "$")));
	        }for (o = 0; o < n.instances.length; o++) {
	          var s = n.instances[o];s.enabled = n.enabled(s.namespace);
	        }
	      }, n.enabled = function (e) {
	        if ("*" === e[e.length - 1]) return !0;var t, r;for (t = 0, r = n.skips.length; t < r; t++) {
	          if (n.skips[t].test(e)) return !1;
	        }for (t = 0, r = n.names.length; t < r; t++) {
	          if (n.names[t].test(e)) return !0;
	        }return !1;
	      }, n.humanize = e("ms"), n.instances = [], n.names = [], n.skips = [], n.formatters = {};
	    }, { ms: 60 }], 35: [function (e, t) {
	      t.exports = function () {
	        for (var e = 0; e < arguments.length; e++) {
	          if (arguments[e] !== void 0) return arguments[e];
	        }
	      };
	    }, {}], 36: [function (e, t) {
	      var n = e("once"),
	          r = function r() {},
	          o = function o(e) {
	        return e.setHeader && "function" == typeof e.abort;
	      },
	          s = function s(e) {
	        return e.stdio && Array.isArray(e.stdio) && 3 === e.stdio.length;
	      },
	          i = function i(e, t, d) {
	        if ("function" == typeof t) return i(e, null, t);t || (t = {}), d = n(d || r);var a = e._writableState,
	            c = e._readableState,
	            p = t.readable || !1 !== t.readable && e.readable,
	            l = t.writable || !1 !== t.writable && e.writable,
	            u = function u() {
	          e.writable || f();
	        },
	            f = function f() {
	          l = !1, p || d.call(e);
	        },
	            h = function h() {
	          p = !1, l || d.call(e);
	        },
	            m = function m(t) {
	          d.call(e, t ? new Error("exited with error code: " + t) : null);
	        },
	            g = function g() {
	          return p && !(c && c.ended) ? d.call(e, new Error("premature close")) : l && !(a && a.ended) ? d.call(e, new Error("premature close")) : void 0;
	        },
	            _ = function _() {
	          e.req.on("finish", f);
	        };return o(e) ? (e.on("complete", f), e.on("abort", g), e.req ? _() : e.on("request", _)) : l && !a && (e.on("end", u), e.on("close", u)), s(e) && e.on("exit", m), e.on("end", h), e.on("finish", f), !1 !== t.error && e.on("error", d), e.on("close", g), function () {
	          e.removeListener("complete", f), e.removeListener("abort", g), e.removeListener("request", _), e.req && e.req.removeListener("finish", f), e.removeListener("end", u), e.removeListener("close", u), e.removeListener("finish", f), e.removeListener("exit", m), e.removeListener("end", h), e.removeListener("error", d), e.removeListener("close", g);
	        };
	      };t.exports = i;
	    }, { once: 63 }], 37: [function (e, t) {
	      function n() {
	        this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0;
	      }function r(e) {
	        return "function" == typeof e;
	      }function o(e) {
	        return "number" == typeof e;
	      }function s(e) {
	        return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && null !== e;
	      }function d(e) {
	        return void 0 === e;
	      }t.exports = n, n.EventEmitter = n, n.prototype._events = void 0, n.prototype._maxListeners = void 0, n.defaultMaxListeners = 10, n.prototype.setMaxListeners = function (e) {
	        if (!o(e) || 0 > e || isNaN(e)) throw TypeError("n must be a positive number");return this._maxListeners = e, this;
	      }, n.prototype.emit = function (e) {
	        var t, n, o, a, c, i;if (this._events || (this._events = {}), "error" === e && (!this._events.error || s(this._events.error) && !this._events.error.length)) if (t = arguments[1], t instanceof Error) throw t;else {
	          var p = new Error("Uncaught, unspecified \"error\" event. (" + t + ")");throw p.context = t, p;
	        }if (n = this._events[e], d(n)) return !1;if (r(n)) switch (arguments.length) {case 1:
	            n.call(this);break;case 2:
	            n.call(this, arguments[1]);break;case 3:
	            n.call(this, arguments[1], arguments[2]);break;default:
	            a = Array.prototype.slice.call(arguments, 1), n.apply(this, a);} else if (s(n)) for (a = Array.prototype.slice.call(arguments, 1), i = n.slice(), o = i.length, c = 0; c < o; c++) {
	          i[c].apply(this, a);
	        }return !0;
	      }, n.prototype.addListener = function (e, t) {
	        var o;if (!r(t)) throw TypeError("listener must be a function");return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, r(t.listener) ? t.listener : t), this._events[e] ? s(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, s(this._events[e]) && !this._events[e].warned && (o = d(this._maxListeners) ? n.defaultMaxListeners : this._maxListeners, o && 0 < o && this._events[e].length > o && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace())), this;
	      }, n.prototype.on = n.prototype.addListener, n.prototype.once = function (e, t) {
	        function n() {
	          this.removeListener(e, n), o || (o = !0, t.apply(this, arguments));
	        }if (!r(t)) throw TypeError("listener must be a function");var o = !1;return n.listener = t, this.on(e, n), this;
	      }, n.prototype.removeListener = function (e, t) {
	        var n, o, d, a;if (!r(t)) throw TypeError("listener must be a function");if (!this._events || !this._events[e]) return this;if (n = this._events[e], d = n.length, o = -1, n === t || r(n.listener) && n.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);else if (s(n)) {
	          for (a = d; 0 < a--;) {
	            if (n[a] === t || n[a].listener && n[a].listener === t) {
	              o = a;break;
	            }
	          }if (0 > o) return this;1 === n.length ? (n.length = 0, delete this._events[e]) : n.splice(o, 1), this._events.removeListener && this.emit("removeListener", e, t);
	        }return this;
	      }, n.prototype.removeAllListeners = function (e) {
	        var t, n;if (!this._events) return this;if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;if (0 === arguments.length) {
	          for (t in this._events) {
	            "removeListener" !== t && this.removeAllListeners(t);
	          }return this.removeAllListeners("removeListener"), this._events = {}, this;
	        }if (n = this._events[e], r(n)) this.removeListener(e, n);else if (n) for (; n.length;) {
	          this.removeListener(e, n[n.length - 1]);
	        }return delete this._events[e], this;
	      }, n.prototype.listeners = function (e) {
	        var t;return t = this._events && this._events[e] ? r(this._events[e]) ? [this._events[e]] : this._events[e].slice() : [], t;
	      }, n.prototype.listenerCount = function (e) {
	        if (this._events) {
	          var t = this._events[e];if (r(t)) return 1;if (t) return t.length;
	        }return 0;
	      }, n.listenerCount = function (e, t) {
	        return e.listenerCount(t);
	      };
	    }, {}], 38: [function (e, t) {
	      function r(e, t) {
	        var s = this;return this instanceof r ? void (t = t || {}, o.call(this, t), this._offset = 0, this._ready = !1, this._file = e, this._size = e.size, this._chunkSize = t.chunkSize || n(this._size / 1e3, 204800), this.reader = new FileReader(), this._generateHeaderBlocks(e, t, function (e, t) {
	          return e ? s.emit("error", e) : void (Array.isArray(t) && t.forEach(function (e) {
	            s.push(e);
	          }), s._ready = !0, s.emit("_ready"));
	        })) : new r(e, t);
	      }var o = e("readable-stream").Readable,
	          s = e("inherits"),
	          i = /^.*\.(\w+)$/,
	          d = e("typedarray-to-buffer");s(r, o), t.exports = r, r.prototype._generateHeaderBlocks = function (e, t, n) {
	        n(null, []);
	      }, r.prototype._read = function () {
	        if (!this._ready) return void this.once("_ready", this._read.bind(this));var e = this,
	            t = this.reader,
	            n = this._offset,
	            r = this._offset + this._chunkSize;return r > this._size && (r = this._size), n === this._size ? (this.destroy(), void this.push(null)) : void (t.onload = function () {
	          e._offset = r, e.push(d(t.result));
	        }, t.onerror = function () {
	          e.emit("error", t.error);
	        }, t.readAsArrayBuffer(this._file.slice(n, r)));
	      }, r.prototype.destroy = function () {
	        if (this._file = null, this.reader) {
	          this.reader.onload = null, this.reader.onerror = null;try {
	            this.reader.abort();
	          } catch (t) {}
	        }this.reader = null;
	      };
	    }, { inherits: 44, "readable-stream": 86, "typedarray-to-buffer": 120 }], 39: [function (e, t) {
	      t.exports = function (e, t) {
	        function n(e, r) {
	          return e.reduce(function (e, o) {
	            return Array.isArray(o) && r < t ? e.concat(n(o, r + 1)) : e.concat(o);
	          }, []);
	        }return t = "number" == typeof t ? t : Infinity, t ? n(e, 1) : Array.isArray(e) ? e.map(function (e) {
	          return e;
	        }) : e;
	      };
	    }, {}], 40: [function (e, t) {
	      t.exports = function () {
	        if ("undefined" == typeof window) return null;var e = { RTCPeerConnection: window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection, RTCSessionDescription: window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription, RTCIceCandidate: window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate };return e.RTCPeerConnection ? e : null;
	      };
	    }, {}], 41: [function (e, t) {
	      function n(e) {
	        if ("string" == typeof e && (e = o.parse(e)), e.protocol || (e.protocol = "https:"), "https:" !== e.protocol) throw new Error("Protocol \"" + e.protocol + "\" not supported. Expected \"https:\"");return e;
	      }var r = e("http"),
	          o = e("url"),
	          s = t.exports;for (var i in r) {
	        r.hasOwnProperty(i) && (s[i] = r[i]);
	      }s.request = function (e, t) {
	        return e = n(e), r.request.call(this, e, t);
	      }, s.get = function (e, t) {
	        return e = n(e), r.get.call(this, e, t);
	      };
	    }, { http: 105, url: 124 }], 42: [function (e, n, s) {
	      s.read = function (n, r, o, a, c) {
	        var p = 8 * c - a - 1,
	            l = (1 << p) - 1,
	            u = l >> 1,
	            f = -7,
	            h = o ? c - 1 : 0,
	            i = o ? -1 : 1,
	            d = n[r + h],
	            s,
	            e;for (h += i, s = d & (1 << -f) - 1, d >>= -f, f += p; 0 < f; s = 256 * s + n[r + h], h += i, f -= 8) {}for (e = s & (1 << -f) - 1, s >>= -f, f += a; 0 < f; e = 256 * e + n[r + h], h += i, f -= 8) {}if (0 === s) s = 1 - u;else {
	          if (s === l) return e ? NaN : (d ? -1 : 1) * Infinity;e += t(2, a), s -= u;
	        }return (d ? -1 : 1) * e * t(2, s - a);
	      }, s.write = function (n, a, p, l, u, f) {
	        var h = 8 * f - u - 1,
	            g = (1 << h) - 1,
	            _ = g >> 1,
	            y = 23 === u ? 5.960464477539063e-8 - 6.617444900424222e-24 : 0,
	            b = l ? 0 : f - 1,
	            i = l ? 1 : -1,
	            d = 0 > a || 0 === a && 0 > 1 / a ? 1 : 0,
	            s,
	            w,
	            m;for (a = o(a), isNaN(a) || a === Infinity ? (w = isNaN(a) ? 1 : 0, s = g) : (s = r(Math.log(a) / Math.LN2), 1 > a * (m = t(2, -s)) && (s--, m *= 2), a += 1 <= s + _ ? y / m : y * t(2, 1 - _), 2 <= a * m && (s++, m /= 2), s + _ >= g ? (w = 0, s = g) : 1 <= s + _ ? (w = (a * m - 1) * t(2, u), s += _) : (w = a * t(2, _ - 1) * t(2, u), s = 0)); 8 <= u; n[p + b] = 255 & w, b += i, w /= 256, u -= 8) {}for (s = s << u | w, h += u; 0 < h; n[p + b] = 255 & s, b += i, s /= 256, h -= 8) {}n[p + b - i] |= 128 * d;
	      };
	    }, {}], 43: [function (e, t) {
	      (function (e) {
	        function n(e) {
	          if (!(this instanceof n)) return new n(e);if (this.store = e, this.chunkLength = e.chunkLength, !this.store || !this.store.get || !this.store.put) throw new Error("First argument must be abstract-chunk-store compliant");this.mem = [];
	        }function r(t, n, r) {
	          e.nextTick(function () {
	            t && t(n, r);
	          });
	        }t.exports = n, n.prototype.put = function (e, t, n) {
	          var r = this;r.mem[e] = t, r.store.put(e, t, function (t) {
	            r.mem[e] = null, n && n(t);
	          });
	        }, n.prototype.get = function (e, t, n) {
	          if ("function" == typeof t) return this.get(e, null, t);var o = t && t.offset || 0,
	              s = t && t.length && o + t.length,
	              i = this.mem[e];return i ? r(n, null, t ? i.slice(o, s) : i) : void this.store.get(e, t, n);
	        }, n.prototype.close = function (e) {
	          this.store.close(e);
	        }, n.prototype.destroy = function (e) {
	          this.store.destroy(e);
	        };
	      }).call(this, e("_process"));
	    }, { _process: 69 }], 44: [function (e, t) {
	      t.exports = "function" == typeof Object.create ? function (e, t) {
	        e.super_ = t, e.prototype = Object.create(t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } });
	      } : function (e, t) {
	        e.super_ = t;var n = function n() {};n.prototype = t.prototype, e.prototype = new n(), e.prototype.constructor = e;
	      };
	    }, {}], 45: [function (e, t) {
	      t.exports = function (e) {
	        for (var t = 0, n = e.length; t < n; ++t) {
	          if (e.charCodeAt(t) > 127) return !1;
	        }return !0;
	      };
	    }, {}], 46: [function (e, t) {
	      function n(e) {
	        return !!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e);
	      }function r(e) {
	        return "function" == typeof e.readFloatLE && "function" == typeof e.slice && n(e.slice(0, 0));
	      }t.exports = function (e) {
	        return null != e && (n(e) || r(e) || !!e._isBuffer);
	      };
	    }, {}], 47: [function (e, t) {
	      "use strict";
	      function n(e) {
	        return r.existsSync(e) && r.statSync(e).isFile();
	      }var r = e("fs");t.exports = function (e, t) {
	        return t ? void r.stat(e, function (e, n) {
	          return e ? t(e) : t(null, n.isFile());
	        }) : n(e);
	      }, t.exports.sync = n;
	    }, { fs: 26 }], 48: [function (e, t) {
	      function n(e) {
	        return r(e) || o(e);
	      }function r(e) {
	        return e instanceof Int8Array || e instanceof Int16Array || e instanceof Int32Array || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Uint16Array || e instanceof Uint32Array || e instanceof Float32Array || e instanceof Float64Array;
	      }function o(e) {
	        return i[s.call(e)];
	      }t.exports = n, n.strict = r, n.loose = o;var s = Object.prototype.toString,
	          i = { "[object Int8Array]": !0, "[object Int16Array]": !0, "[object Int32Array]": !0, "[object Uint8Array]": !0, "[object Uint8ClampedArray]": !0, "[object Uint16Array]": !0, "[object Uint32Array]": !0, "[object Float32Array]": !0, "[object Float64Array]": !0 };
	    }, {}], 49: [function (e, t) {
	      var n = {}.toString;t.exports = Array.isArray || function (e) {
	        return "[object Array]" == n.call(e);
	      };
	    }, {}], 50: [function (e, t, n) {
	      "use strict";
	      n.regex = n.re = /^npm-debug\.log$|^\..*\.swp$|^\.DS_Store$|^\.AppleDouble$|^\.LSOverride$|^Icon\r$|^\._.*|^\.Spotlight-V100(?:$|\/)|\.Trashes|^__MACOSX$|~$|^Thumbs\.db$|^ehthumbs\.db$|^Desktop\.ini$|^@eaDir$/, n.is = function (e) {
	        return n.re.test(e);
	      }, n.not = function (e) {
	        return !n.is(e);
	      };
	    }, {}], 51: [function (e, t) {
	      function n(e) {
	        var t = {},
	            n = e.split("magnet:?")[1],
	            s = n && 0 <= n.length ? n.split("&") : [];s.forEach(function (e) {
	          var n = e.split("=");if (2 === n.length) {
	            var r = n[0],
	                o = n[1];if ("dn" === r && (o = decodeURIComponent(o).replace(/\+/g, " ")), ("tr" === r || "xs" === r || "as" === r || "ws" === r) && (o = decodeURIComponent(o)), "kt" === r && (o = decodeURIComponent(o).split("+")), "ix" === r && (o = +o), !t[r]) t[r] = o;else if (Array.isArray(t[r])) t[r].push(o);else {
	              var s = t[r];t[r] = [s, o];
	            }
	          }
	        });var d;if (t.xt) {
	          var a = Array.isArray(t.xt) ? t.xt : [t.xt];a.forEach(function (e) {
	            if (d = e.match(/^urn:btih:(.{40})/)) t.infoHash = d[1].toLowerCase();else if (d = e.match(/^urn:btih:(.{32})/)) {
	              var n = r.decode(d[1]);t.infoHash = o.from(n, "binary").toString("hex");
	            }
	          });
	        }return t.infoHash && (t.infoHashBuffer = o.from(t.infoHash, "hex")), t.dn && (t.name = t.dn), t.kt && (t.keywords = t.kt), t.announce = "string" == typeof t.tr ? [t.tr] : Array.isArray(t.tr) ? t.tr : [], t.urlList = [], ("string" == typeof t.as || Array.isArray(t.as)) && (t.urlList = t.urlList.concat(t.as)), ("string" == typeof t.ws || Array.isArray(t.ws)) && (t.urlList = t.urlList.concat(t.ws)), i(t.announce), i(t.urlList), t;
	      }t.exports = n, t.exports.decode = n, t.exports.encode = function (e) {
	        e = s(e), e.infoHashBuffer && (e.xt = "urn:btih:" + e.infoHashBuffer.toString("hex")), e.infoHash && (e.xt = "urn:btih:" + e.infoHash), e.name && (e.dn = e.name), e.keywords && (e.kt = e.keywords), e.announce && (e.tr = e.announce), e.urlList && (e.ws = e.urlList, delete e.as);var t = "magnet:?";return Object.keys(e).filter(function (e) {
	          return 2 === e.length;
	        }).forEach(function (n, r) {
	          var o = Array.isArray(e[n]) ? e[n] : [e[n]];o.forEach(function (e, o) {
	            (0 < r || 0 < o) && ("kt" !== n || 0 === o) && (t += "&"), "dn" === n && (e = encodeURIComponent(e).replace(/%20/g, "+")), ("tr" === n || "xs" === n || "as" === n || "ws" === n) && (e = encodeURIComponent(e)), "kt" === n && (e = encodeURIComponent(e)), t += "kt" === n && 0 < o ? "+" + e : n + "=" + e;
	          });
	        }), t;
	      };var r = e("thirty-two"),
	          o = e("safe-buffer").Buffer,
	          s = e("xtend"),
	          i = e("uniq");
	    }, { "safe-buffer": 94, "thirty-two": 113, uniq: 122, xtend: 133 }], 52: [function (e, t) {
	      function n(e, t) {
	        var r = this;if (!(r instanceof n)) return new n(e, t);if (!d) throw new Error("web browser lacks MediaSource support");t || (t = {}), r._bufferDuration = t.bufferDuration || a, r._elem = e, r._mediaSource = new d(), r._streams = [], r.detailedError = null, r._errorHandler = function () {
	          r._elem.removeEventListener("error", r._errorHandler);var e = r._streams.slice();e.forEach(function (e) {
	            e.destroy(r._elem.error);
	          });
	        }, r._elem.addEventListener("error", r._errorHandler), r._elem.src = window.URL.createObjectURL(r._mediaSource);
	      }function r(e, t) {
	        var n = this;if (s.Writable.call(n), n._wrapper = e, n._elem = e._elem, n._mediaSource = e._mediaSource, n._allStreams = e._streams, n._allStreams.push(n), n._bufferDuration = e._bufferDuration, n._sourceBuffer = null, n._openHandler = function () {
	          n._onSourceOpen();
	        }, n._flowHandler = function () {
	          n._flow();
	        }, "string" == typeof t) n._type = t, "open" === n._mediaSource.readyState ? n._createSourceBuffer() : n._mediaSource.addEventListener("sourceopen", n._openHandler);else if (null === t._sourceBuffer) t.destroy(), n._type = t._type, n._mediaSource.addEventListener("sourceopen", n._openHandler);else if (t._sourceBuffer) t.destroy(), n._type = t._type, n._sourceBuffer = t._sourceBuffer, n._sourceBuffer.addEventListener("updateend", n._flowHandler);else throw new Error("The argument to MediaElementWrapper.createWriteStream must be a string or a previous stream returned from that function");n._elem.addEventListener("timeupdate", n._flowHandler), n.on("error", function (e) {
	          n._wrapper.error(e);
	        }), n.on("finish", function () {
	          if (!n.destroyed && (n._finished = !0, n._allStreams.every(function (e) {
	            return e._finished;
	          }))) try {
	            n._mediaSource.endOfStream();
	          } catch (e) {}
	        });
	      }t.exports = n;var o = e("inherits"),
	          s = e("readable-stream"),
	          i = e("to-arraybuffer"),
	          d = "undefined" != typeof window && window.MediaSource,
	          a = 60;n.prototype.createWriteStream = function (e) {
	        var t = this;return new r(t, e);
	      }, n.prototype.error = function (e) {
	        var t = this;t.detailedError || (t.detailedError = e);try {
	          t._mediaSource.endOfStream("decode");
	        } catch (e) {}
	      }, o(r, s.Writable), r.prototype._onSourceOpen = function () {
	        var e = this;e.destroyed || (e._mediaSource.removeEventListener("sourceopen", e._openHandler), e._createSourceBuffer());
	      }, r.prototype.destroy = function (e) {
	        var t = this;t.destroyed || (t.destroyed = !0, t._allStreams.splice(t._allStreams.indexOf(t), 1), t._mediaSource.removeEventListener("sourceopen", t._openHandler), t._elem.removeEventListener("timeupdate", t._flowHandler), t._sourceBuffer && (t._sourceBuffer.removeEventListener("updateend", t._flowHandler), "open" === t._mediaSource.readyState && t._sourceBuffer.abort()), e && t.emit("error", e), t.emit("close"));
	      }, r.prototype._createSourceBuffer = function () {
	        var e = this;if (!e.destroyed) if (!d.isTypeSupported(e._type)) e.destroy(new Error("The provided type is not supported"));else if (e._sourceBuffer = e._mediaSource.addSourceBuffer(e._type), e._sourceBuffer.addEventListener("updateend", e._flowHandler), e._cb) {
	          var t = e._cb;e._cb = null, t();
	        }
	      }, r.prototype._write = function (e, t, n) {
	        var r = this;if (!r.destroyed) {
	          if (!r._sourceBuffer) return void (r._cb = function (o) {
	            return o ? n(o) : void r._write(e, t, n);
	          });if (r._sourceBuffer.updating) return n(new Error("Cannot append buffer while source buffer updating"));try {
	            r._sourceBuffer.appendBuffer(i(e));
	          } catch (e) {
	            return void r.destroy(e);
	          }r._cb = n;
	        }
	      }, r.prototype._flow = function () {
	        var e = this;if (!(e.destroyed || !e._sourceBuffer || e._sourceBuffer.updating) && !("open" === e._mediaSource.readyState && e._getBufferDuration() > e._bufferDuration) && e._cb) {
	          var t = e._cb;e._cb = null, t();
	        }
	      };r.prototype._getBufferDuration = function () {
	        for (var e = this, t = e._sourceBuffer.buffered, n = e._elem.currentTime, r = -1, o = 0; o < t.length; o++) {
	          var s = t.start(o),
	              i = t.end(o) + 0;if (s > n) break;else (0 <= r || n <= i) && (r = i);
	        }var d = r - n;return 0 > d && (d = 0), d;
	      };
	    }, { inherits: 44, "readable-stream": 86, "to-arraybuffer": 115 }], 53: [function (e, t) {
	      (function (e) {
	        function n(e, t) {
	          if (!(this instanceof n)) return new n(e, t);if (t || (t = {}), this.chunkLength = +e, !this.chunkLength) throw new Error("First argument must be a chunk length");this.chunks = [], this.closed = !1, this.length = +t.length || Infinity, this.length !== Infinity && (this.lastChunkLength = this.length % this.chunkLength || this.chunkLength, this.lastChunkIndex = s(this.length / this.chunkLength) - 1);
	        }function r(t, n, r) {
	          e.nextTick(function () {
	            t && t(n, r);
	          });
	        }t.exports = n, n.prototype.put = function (e, t, n) {
	          if (this.closed) return r(n, new Error("Storage is closed"));var o = e === this.lastChunkIndex;return o && t.length !== this.lastChunkLength ? r(n, new Error("Last chunk length must be " + this.lastChunkLength)) : o || t.length === this.chunkLength ? void (this.chunks[e] = t, r(n, null)) : r(n, new Error("Chunk length must be " + this.chunkLength));
	        }, n.prototype.get = function (e, t, n) {
	          if ("function" == typeof t) return this.get(e, null, t);if (this.closed) return r(n, new Error("Storage is closed"));var o = this.chunks[e];if (!o) return r(n, new Error("Chunk not found"));if (!t) return r(n, null, o);var s = t.offset || 0,
	              i = t.length || o.length - s;r(n, null, o.slice(s, i + s));
	        }, n.prototype.close = n.prototype.destroy = function (e) {
	          return this.closed ? r(e, new Error("Storage is closed")) : void (this.closed = !0, this.chunks = null, r(e, null));
	        };
	      }).call(this, e("_process"));
	    }, { _process: 69 }], 54: [function (e, t, n) {
	      (function (t) {
	        function o(e, t, n) {
	          for (var r = t; r < n; r++) {
	            e[r] = 0;
	          }
	        }function s(e, t, n) {
	          t.writeUInt32BE(r((e.getTime() + y) / 1e3), n);
	        }function a(e, t, n) {
	          t.writeUInt16BE(r(e) % 65536, n), t.writeUInt16BE(r(256 * (256 * e)) % 65536, n + 2);
	        }function i(e, t, n) {
	          t[n] = r(e) % 256, t[n + 1] = r(256 * e) % 256;
	        }function c(e, t, n) {
	          e || (e = [0, 0, 0, 0, 0, 0, 0, 0, 0]);for (var r = 0; r < e.length; r++) {
	            a(e[r], t, n + 4 * r);
	          }
	        }function p(e, n, r) {
	          var o = new t(e, "utf8");o.copy(n, r), n[r + o.length] = 0;
	        }function l(e) {
	          for (var t = Array(e.length / 4), n = 0; n < t.length; n++) {
	            t[n] = f(e, 4 * n);
	          }return t;
	        }function u(e, t) {
	          return new Date(1e3 * e.readUInt32BE(t) - y);
	        }function f(e, t) {
	          return e.readUInt16BE(t) + e.readUInt16BE(t + 2) / 65536;
	        }function h(e, t) {
	          return e[t] + e[t + 1] / 256;
	        }function m(e, t, n) {
	          var r;for (r = 0; r < n && !(0 === e[t + r]); r++) {}return e.toString("utf8", t, t + r);
	        }var g = e("./index"),
	            _ = e("./descriptor"),
	            y = 2.0828448e12;n.fullBoxes = {};["mvhd", "tkhd", "mdhd", "vmhd", "smhd", "stsd", "esds", "stsz", "stco", "stss", "stts", "ctts", "stsc", "dref", "elst", "hdlr", "mehd", "trex", "mfhd", "tfhd", "tfdt", "trun"].forEach(function (e) {
	          n.fullBoxes[e] = !0;
	        }), n.ftyp = {}, n.ftyp.encode = function (e, r, o) {
	          r = r ? r.slice(o) : new t(n.ftyp.encodingLength(e));var s = e.compatibleBrands || [];r.write(e.brand, 0, 4, "ascii"), r.writeUInt32BE(e.brandVersion, 4);for (var d = 0; d < s.length; d++) {
	            r.write(s[d], 8 + 4 * d, 4, "ascii");
	          }return n.ftyp.encode.bytes = 8 + 4 * s.length, r;
	        }, n.ftyp.decode = function (e, t) {
	          e = e.slice(t);for (var n = e.toString("ascii", 0, 4), r = e.readUInt32BE(4), o = [], s = 8; s < e.length; s += 4) {
	            o.push(e.toString("ascii", s, s + 4));
	          }return { brand: n, brandVersion: r, compatibleBrands: o };
	        }, n.ftyp.encodingLength = function (e) {
	          return 8 + 4 * (e.compatibleBrands || []).length;
	        }, n.mvhd = {}, n.mvhd.encode = function (e, r, d) {
	          return r = r ? r.slice(d) : new t(96), s(e.ctime || new Date(), r, 0), s(e.mtime || new Date(), r, 4), r.writeUInt32BE(e.timeScale || 0, 8), r.writeUInt32BE(e.duration || 0, 12), a(e.preferredRate || 0, r, 16), i(e.preferredVolume || 0, r, 20), o(r, 22, 32), c(e.matrix, r, 32), r.writeUInt32BE(e.previewTime || 0, 68), r.writeUInt32BE(e.previewDuration || 0, 72), r.writeUInt32BE(e.posterTime || 0, 76), r.writeUInt32BE(e.selectionTime || 0, 80), r.writeUInt32BE(e.selectionDuration || 0, 84), r.writeUInt32BE(e.currentTime || 0, 88), r.writeUInt32BE(e.nextTrackId || 0, 92), n.mvhd.encode.bytes = 96, r;
	        }, n.mvhd.decode = function (e, t) {
	          return e = e.slice(t), { ctime: u(e, 0), mtime: u(e, 4), timeScale: e.readUInt32BE(8), duration: e.readUInt32BE(12), preferredRate: f(e, 16), preferredVolume: h(e, 20), matrix: l(e.slice(32, 68)), previewTime: e.readUInt32BE(68), previewDuration: e.readUInt32BE(72), posterTime: e.readUInt32BE(76), selectionTime: e.readUInt32BE(80), selectionDuration: e.readUInt32BE(84), currentTime: e.readUInt32BE(88), nextTrackId: e.readUInt32BE(92) };
	        }, n.mvhd.encodingLength = function () {
	          return 96;
	        }, n.tkhd = {}, n.tkhd.encode = function (e, r, i) {
	          return r = r ? r.slice(i) : new t(80), s(e.ctime || new Date(), r, 0), s(e.mtime || new Date(), r, 4), r.writeUInt32BE(e.trackId || 0, 8), o(r, 12, 16), r.writeUInt32BE(e.duration || 0, 16), o(r, 20, 28), r.writeUInt16BE(e.layer || 0, 28), r.writeUInt16BE(e.alternateGroup || 0, 30), r.writeUInt16BE(e.volume || 0, 32), c(e.matrix, r, 36), r.writeUInt32BE(e.trackWidth || 0, 72), r.writeUInt32BE(e.trackHeight || 0, 76), n.tkhd.encode.bytes = 80, r;
	        }, n.tkhd.decode = function (e, t) {
	          return e = e.slice(t), { ctime: u(e, 0), mtime: u(e, 4), trackId: e.readUInt32BE(8), duration: e.readUInt32BE(16), layer: e.readUInt16BE(28), alternateGroup: e.readUInt16BE(30), volume: e.readUInt16BE(32), matrix: l(e.slice(36, 72)), trackWidth: e.readUInt32BE(72), trackHeight: e.readUInt32BE(76) };
	        }, n.tkhd.encodingLength = function () {
	          return 80;
	        }, n.mdhd = {}, n.mdhd.encode = function (e, r, o) {
	          return r = r ? r.slice(o) : new t(20), s(e.ctime || new Date(), r, 0), s(e.mtime || new Date(), r, 4), r.writeUInt32BE(e.timeScale || 0, 8), r.writeUInt32BE(e.duration || 0, 12), r.writeUInt16BE(e.language || 0, 16), r.writeUInt16BE(e.quality || 0, 18), n.mdhd.encode.bytes = 20, r;
	        }, n.mdhd.decode = function (e, t) {
	          return e = e.slice(t), { ctime: u(e, 0), mtime: u(e, 4), timeScale: e.readUInt32BE(8), duration: e.readUInt32BE(12), language: e.readUInt16BE(16), quality: e.readUInt16BE(18) };
	        }, n.mdhd.encodingLength = function () {
	          return 20;
	        }, n.vmhd = {}, n.vmhd.encode = function (e, r, o) {
	          r = r ? r.slice(o) : new t(8), r.writeUInt16BE(e.graphicsMode || 0, 0);var s = e.opcolor || [0, 0, 0];return r.writeUInt16BE(s[0], 2), r.writeUInt16BE(s[1], 4), r.writeUInt16BE(s[2], 6), n.vmhd.encode.bytes = 8, r;
	        }, n.vmhd.decode = function (e, t) {
	          return e = e.slice(t), { graphicsMode: e.readUInt16BE(0), opcolor: [e.readUInt16BE(2), e.readUInt16BE(4), e.readUInt16BE(6)] };
	        }, n.vmhd.encodingLength = function () {
	          return 8;
	        }, n.smhd = {}, n.smhd.encode = function (e, r, s) {
	          return r = r ? r.slice(s) : new t(4), r.writeUInt16BE(e.balance || 0, 0), o(r, 2, 4), n.smhd.encode.bytes = 4, r;
	        }, n.smhd.decode = function (e, t) {
	          return e = e.slice(t), { balance: e.readUInt16BE(0) };
	        }, n.smhd.encodingLength = function () {
	          return 4;
	        }, n.stsd = {}, n.stsd.encode = function (e, r, o) {
	          r = r ? r.slice(o) : new t(n.stsd.encodingLength(e));var s = e.entries || [];r.writeUInt32BE(s.length, 0);for (var d = 4, a = 0, i; a < s.length; a++) {
	            i = s[a], g.encode(i, r, d), d += g.encode.bytes;
	          }return n.stsd.encode.bytes = d, r;
	        }, n.stsd.decode = function (e, t, n) {
	          e = e.slice(t);for (var r = e.readUInt32BE(0), o = Array(r), s = 4, d = 0, i; d < r; d++) {
	            i = g.decode(e, s, n), o[d] = i, s += i.length;
	          }return { entries: o };
	        }, n.stsd.encodingLength = function (e) {
	          var t = 4;if (!e.entries) return t;for (var n = 0; n < e.entries.length; n++) {
	            t += g.encodingLength(e.entries[n]);
	          }return t;
	        }, n.avc1 = n.VisualSampleEntry = {}, n.VisualSampleEntry.encode = function (e, r, s) {
	          r = r ? r.slice(s) : new t(n.VisualSampleEntry.encodingLength(e)), o(r, 0, 6), r.writeUInt16BE(e.dataReferenceIndex || 0, 6), o(r, 8, 24), r.writeUInt16BE(e.width || 0, 24), r.writeUInt16BE(e.height || 0, 26), r.writeUInt32BE(e.hResolution || 4718592, 28), r.writeUInt32BE(e.vResolution || 4718592, 32), o(r, 36, 40), r.writeUInt16BE(e.frameCount || 1, 40);var i = e.compressorName || "",
	              a = d(i.length, 31);r.writeUInt8(a, 42), r.write(i, 43, a, "utf8"), r.writeUInt16BE(e.depth || 24, 74), r.writeInt16BE(-1, 76);var c = 78,
	              p = e.children || [];p.forEach(function (e) {
	            g.encode(e, r, c), c += g.encode.bytes;
	          }), n.VisualSampleEntry.encode.bytes = c;
	        }, n.VisualSampleEntry.decode = function (e, t, n) {
	          e = e.slice(t);for (var r = n - t, o = d(e.readUInt8(42), 31), s = { dataReferenceIndex: e.readUInt16BE(6), width: e.readUInt16BE(24), height: e.readUInt16BE(26), hResolution: e.readUInt32BE(28), vResolution: e.readUInt32BE(32), frameCount: e.readUInt16BE(40), compressorName: e.toString("utf8", 43, 43 + o), depth: e.readUInt16BE(74), children: [] }, i = 78; 8 <= r - i;) {
	            var a = g.decode(e, i, r);s.children.push(a), s[a.type] = a, i += a.length;
	          }return s;
	        }, n.VisualSampleEntry.encodingLength = function (e) {
	          var t = 78,
	              n = e.children || [];return n.forEach(function (e) {
	            t += g.encodingLength(e);
	          }), t;
	        }, n.avcC = {}, n.avcC.encode = function (e, r, o) {
	          r = r ? r.slice(o) : t(e.buffer.length), e.buffer.copy(r), n.avcC.encode.bytes = e.buffer.length;
	        }, n.avcC.decode = function (e, n, r) {
	          return e = e.slice(n, r), { mimeCodec: e.toString("hex", 1, 4), buffer: new t(e) };
	        }, n.avcC.encodingLength = function (e) {
	          return e.buffer.length;
	        }, n.mp4a = n.AudioSampleEntry = {}, n.AudioSampleEntry.encode = function (e, r, s) {
	          r = r ? r.slice(s) : new t(n.AudioSampleEntry.encodingLength(e)), o(r, 0, 6), r.writeUInt16BE(e.dataReferenceIndex || 0, 6), o(r, 8, 16), r.writeUInt16BE(e.channelCount || 2, 16), r.writeUInt16BE(e.sampleSize || 16, 18), o(r, 20, 24), r.writeUInt32BE(e.sampleRate || 0, 24);var i = 28,
	              d = e.children || [];d.forEach(function (e) {
	            g.encode(e, r, i), i += g.encode.bytes;
	          }), n.AudioSampleEntry.encode.bytes = i;
	        }, n.AudioSampleEntry.decode = function (e, t, n) {
	          e = e.slice(t, n);for (var r = n - t, o = { dataReferenceIndex: e.readUInt16BE(6), channelCount: e.readUInt16BE(16), sampleSize: e.readUInt16BE(18), sampleRate: e.readUInt32BE(24), children: [] }, s = 28; 8 <= r - s;) {
	            var i = g.decode(e, s, r);o.children.push(i), o[i.type] = i, s += i.length;
	          }return o;
	        }, n.AudioSampleEntry.encodingLength = function (e) {
	          var t = 28,
	              n = e.children || [];return n.forEach(function (e) {
	            t += g.encodingLength(e);
	          }), t;
	        }, n.esds = {}, n.esds.encode = function (e, r, o) {
	          r = r ? r.slice(o) : t(e.buffer.length), e.buffer.copy(r, 0), n.esds.encode.bytes = e.buffer.length;
	        }, n.esds.decode = function (e, n, r) {
	          e = e.slice(n, r);var o = _.Descriptor.decode(e, 0, e.length),
	              s = "ESDescriptor" === o.tagName ? o : {},
	              i = s.DecoderConfigDescriptor || {},
	              d = i.oti || 0,
	              a = i.DecoderSpecificInfo,
	              c = a ? (248 & a.buffer.readUInt8(0)) >> 3 : 0,
	              p = null;return d && (p = d.toString(16), c && (p += "." + c)), { mimeCodec: p, buffer: new t(e.slice(0)) };
	        }, n.esds.encodingLength = function (e) {
	          return e.buffer.length;
	        }, n.stsz = {}, n.stsz.encode = function (e, r, o) {
	          var s = e.entries || [];r = r ? r.slice(o) : t(n.stsz.encodingLength(e)), r.writeUInt32BE(0, 0), r.writeUInt32BE(s.length, 4);for (var d = 0; d < s.length; d++) {
	            r.writeUInt32BE(s[d], 4 * d + 8);
	          }return n.stsz.encode.bytes = 8 + 4 * s.length, r;
	        }, n.stsz.decode = function (e, t) {
	          e = e.slice(t);for (var n = e.readUInt32BE(0), r = e.readUInt32BE(4), o = Array(r), s = 0; s < r; s++) {
	            o[s] = 0 === n ? e.readUInt32BE(4 * s + 8) : n;
	          }return { entries: o };
	        }, n.stsz.encodingLength = function (e) {
	          return 8 + 4 * e.entries.length;
	        }, n.stss = n.stco = {}, n.stco.encode = function (e, r, o) {
	          var s = e.entries || [];r = r ? r.slice(o) : new t(n.stco.encodingLength(e)), r.writeUInt32BE(s.length, 0);for (var d = 0; d < s.length; d++) {
	            r.writeUInt32BE(s[d], 4 * d + 4);
	          }return n.stco.encode.bytes = 4 + 4 * s.length, r;
	        }, n.stco.decode = function (e, t) {
	          e = e.slice(t);for (var n = e.readUInt32BE(0), r = Array(n), o = 0; o < n; o++) {
	            r[o] = e.readUInt32BE(4 * o + 4);
	          }return { entries: r };
	        }, n.stco.encodingLength = function (e) {
	          return 4 + 4 * e.entries.length;
	        }, n.stts = {}, n.stts.encode = function (e, r, o) {
	          var s = e.entries || [];r = r ? r.slice(o) : new t(n.stts.encodingLength(e)), r.writeUInt32BE(s.length, 0);for (var d = 0, i; d < s.length; d++) {
	            i = 8 * d + 4, r.writeUInt32BE(s[d].count || 0, i), r.writeUInt32BE(s[d].duration || 0, i + 4);
	          }return n.stts.encode.bytes = 4 + 8 * e.entries.length, r;
	        }, n.stts.decode = function (e, t) {
	          e = e.slice(t);for (var n = e.readUInt32BE(0), r = Array(n), o = 0, s; o < n; o++) {
	            s = 8 * o + 4, r[o] = { count: e.readUInt32BE(s), duration: e.readUInt32BE(s + 4) };
	          }return { entries: r };
	        }, n.stts.encodingLength = function (e) {
	          return 4 + 8 * e.entries.length;
	        }, n.ctts = {}, n.ctts.encode = function (e, r, o) {
	          var s = e.entries || [];r = r ? r.slice(o) : new t(n.ctts.encodingLength(e)), r.writeUInt32BE(s.length, 0);for (var d = 0, i; d < s.length; d++) {
	            i = 8 * d + 4, r.writeUInt32BE(s[d].count || 0, i), r.writeUInt32BE(s[d].compositionOffset || 0, i + 4);
	          }return n.ctts.encode.bytes = 4 + 8 * s.length, r;
	        }, n.ctts.decode = function (e, t) {
	          e = e.slice(t);for (var n = e.readUInt32BE(0), r = Array(n), o = 0, s; o < n; o++) {
	            s = 8 * o + 4, r[o] = { count: e.readUInt32BE(s), compositionOffset: e.readInt32BE(s + 4) };
	          }return { entries: r };
	        }, n.ctts.encodingLength = function (e) {
	          return 4 + 8 * e.entries.length;
	        }, n.stsc = {}, n.stsc.encode = function (e, r, o) {
	          var s = e.entries || [];r = r ? r.slice(o) : new t(n.stsc.encodingLength(e)), r.writeUInt32BE(s.length, 0);for (var d = 0, i; d < s.length; d++) {
	            i = 12 * d + 4, r.writeUInt32BE(s[d].firstChunk || 0, i), r.writeUInt32BE(s[d].samplesPerChunk || 0, i + 4), r.writeUInt32BE(s[d].sampleDescriptionId || 0, i + 8);
	          }return n.stsc.encode.bytes = 4 + 12 * s.length, r;
	        }, n.stsc.decode = function (e, t) {
	          e = e.slice(t);for (var n = e.readUInt32BE(0), r = Array(n), o = 0, s; o < n; o++) {
	            s = 12 * o + 4, r[o] = { firstChunk: e.readUInt32BE(s), samplesPerChunk: e.readUInt32BE(s + 4), sampleDescriptionId: e.readUInt32BE(s + 8) };
	          }return { entries: r };
	        }, n.stsc.encodingLength = function (e) {
	          return 4 + 12 * e.entries.length;
	        }, n.dref = {}, n.dref.encode = function (e, r, o) {
	          r = r ? r.slice(o) : new t(n.dref.encodingLength(e));var s = e.entries || [];r.writeUInt32BE(s.length, 0);for (var d = 4, a = 0; a < s.length; a++) {
	            var i = s[a],
	                c = (i.buf ? i.buf.length : 0) + 4 + 4;r.writeUInt32BE(c, d), d += 4, r.write(i.type, d, 4, "ascii"), d += 4, i.buf && (i.buf.copy(r, d), d += i.buf.length);
	          }return n.dref.encode.bytes = d, r;
	        }, n.dref.decode = function (e, t) {
	          e = e.slice(t);for (var n = e.readUInt32BE(0), r = Array(n), o = 4, s = 0; s < n; s++) {
	            var i = e.readUInt32BE(o),
	                d = e.toString("ascii", o + 4, o + 8),
	                a = e.slice(o + 8, o + i);o += i, r[s] = { type: d, buf: a };
	          }return { entries: r };
	        }, n.dref.encodingLength = function (e) {
	          var t = 4;if (!e.entries) return t;for (var n = 0, r; n < e.entries.length; n++) {
	            r = e.entries[n].buf, t += (r ? r.length : 0) + 4 + 4;
	          }return t;
	        }, n.elst = {}, n.elst.encode = function (e, r, o) {
	          var s = e.entries || [];r = r ? r.slice(o) : new t(n.elst.encodingLength(e)), r.writeUInt32BE(s.length, 0);for (var d = 0, i; d < s.length; d++) {
	            i = 12 * d + 4, r.writeUInt32BE(s[d].trackDuration || 0, i), r.writeUInt32BE(s[d].mediaTime || 0, i + 4), a(s[d].mediaRate || 0, r, i + 8);
	          }return n.elst.encode.bytes = 4 + 12 * s.length, r;
	        }, n.elst.decode = function (e, t) {
	          e = e.slice(t);for (var n = e.readUInt32BE(0), r = Array(n), o = 0, s; o < n; o++) {
	            s = 12 * o + 4, r[o] = { trackDuration: e.readUInt32BE(s), mediaTime: e.readInt32BE(s + 4), mediaRate: f(e, s + 8) };
	          }return { entries: r };
	        }, n.elst.encodingLength = function (e) {
	          return 4 + 12 * e.entries.length;
	        }, n.hdlr = {}, n.hdlr.encode = function (e, r, o) {
	          r = r ? r.slice(o) : new t(n.hdlr.encodingLength(e));var s = 21 + (e.name || "").length;return r.fill(0, 0, s), r.write(e.handlerType || "", 4, 4, "ascii"), p(e.name || "", r, 20), n.hdlr.encode.bytes = s, r;
	        }, n.hdlr.decode = function (e, t, n) {
	          return e = e.slice(t), { handlerType: e.toString("ascii", 4, 8), name: m(e, 20, n) };
	        }, n.hdlr.encodingLength = function (e) {
	          return 21 + (e.name || "").length;
	        }, n.mehd = {}, n.mehd.encode = function (e, r, o) {
	          return r = r ? r.slice(o) : new t(4), r.writeUInt32BE(e.fragmentDuration || 0, 0), n.mehd.encode.bytes = 4, r;
	        }, n.mehd.decode = function (e, t) {
	          return e = e.slice(t), { fragmentDuration: e.readUInt32BE(0) };
	        }, n.mehd.encodingLength = function () {
	          return 4;
	        }, n.trex = {}, n.trex.encode = function (e, r, o) {
	          return r = r ? r.slice(o) : new t(20), r.writeUInt32BE(e.trackId || 0, 0), r.writeUInt32BE(e.defaultSampleDescriptionIndex || 0, 4), r.writeUInt32BE(e.defaultSampleDuration || 0, 8), r.writeUInt32BE(e.defaultSampleSize || 0, 12), r.writeUInt32BE(e.defaultSampleFlags || 0, 16), n.trex.encode.bytes = 20, r;
	        }, n.trex.decode = function (e, t) {
	          return e = e.slice(t), { trackId: e.readUInt32BE(0), defaultSampleDescriptionIndex: e.readUInt32BE(4), defaultSampleDuration: e.readUInt32BE(8), defaultSampleSize: e.readUInt32BE(12), defaultSampleFlags: e.readUInt32BE(16) };
	        }, n.trex.encodingLength = function () {
	          return 20;
	        }, n.mfhd = {}, n.mfhd.encode = function (e, r, o) {
	          return r = r ? r.slice(o) : new t(4), r.writeUInt32BE(e.sequenceNumber || 0, 0), n.mfhd.encode.bytes = 4, r;
	        }, n.mfhd.decode = function (e) {
	          return { sequenceNumber: e.readUint32BE(0) };
	        }, n.mfhd.encodingLength = function () {
	          return 4;
	        }, n.tfhd = {}, n.tfhd.encode = function (e, r, o) {
	          return r = r ? r.slice(o) : new t(4), r.writeUInt32BE(e.trackId, 0), n.tfhd.encode.bytes = 4, r;
	        }, n.tfhd.decode = function () {}, n.tfhd.encodingLength = function () {
	          return 4;
	        }, n.tfdt = {}, n.tfdt.encode = function (e, r, o) {
	          return r = r ? r.slice(o) : new t(4), r.writeUInt32BE(e.baseMediaDecodeTime || 0, 0), n.tfdt.encode.bytes = 4, r;
	        }, n.tfdt.decode = function () {}, n.tfdt.encodingLength = function () {
	          return 4;
	        }, n.trun = {}, n.trun.encode = function (e, r, o) {
	          r = r ? r.slice(o) : new t(8 + 16 * e.entries.length), r.writeUInt32BE(e.entries.length, 0), r.writeInt32BE(e.dataOffset, 4);for (var s = 8, d = 0, i; d < e.entries.length; d++) {
	            i = e.entries[d], r.writeUInt32BE(i.sampleDuration, s), s += 4, r.writeUInt32BE(i.sampleSize, s), s += 4, r.writeUInt32BE(i.sampleFlags, s), s += 4, r.writeUInt32BE(i.sampleCompositionTimeOffset, s), s += 4;
	          }n.trun.encode.bytes = s;
	        }, n.trun.decode = function () {}, n.trun.encodingLength = function (e) {
	          return 8 + 16 * e.entries.length;
	        }, n.mdat = {}, n.mdat.encode = function (e, t, r) {
	          e.buffer ? (e.buffer.copy(t, r), n.mdat.encode.bytes = e.buffer.length) : n.mdat.encode.bytes = n.mdat.encodingLength(e);
	        }, n.mdat.decode = function (e, n, r) {
	          return { buffer: new t(e.slice(n, r)) };
	        }, n.mdat.encodingLength = function (e) {
	          return e.buffer ? e.buffer.length : e.contentLength;
	        };
	      }).call(this, e("buffer").Buffer);
	    }, { "./descriptor": 55, "./index": 56, buffer: 27 }], 55: [function (e, t, n) {
	      (function (e) {
	        var t = { 3: "ESDescriptor", 4: "DecoderConfigDescriptor", 5: "DecoderSpecificInfo", 6: "SLConfigDescriptor" };n.Descriptor = {}, n.Descriptor.decode = function (r, o, s) {
	          var i = r.readUInt8(o),
	              d = o + 1,
	              a = 0,
	              c;do {
	            c = r.readUInt8(d++), a = a << 7 | 127 & c;
	          } while (128 & c);var p = t[i],
	              l;return l = n[p] ? n[p].decode(r, d, s) : { buffer: new e(r.slice(d, d + a)) }, l.tag = i, l.tagName = p, l.length = d - o + a, l.contentsLen = a, l;
	        }, n.DescriptorArray = {}, n.DescriptorArray.decode = function (e, r, o) {
	          for (var s = r, i = {}; s + 2 <= o;) {
	            var d = n.Descriptor.decode(e, s, o);s += d.length;var a = t[d.tag] || "Descriptor" + d.tag;i[a] = d;
	          }return i;
	        }, n.ESDescriptor = {}, n.ESDescriptor.decode = function (e, t, r) {
	          var o = e.readUInt8(t + 2),
	              s = t + 3;if (128 & o && (s += 2), 64 & o) {
	            var i = e.readUInt8(s);s += i + 1;
	          }return 32 & o && (s += 2), n.DescriptorArray.decode(e, s, r);
	        }, n.DecoderConfigDescriptor = {}, n.DecoderConfigDescriptor.decode = function (e, t, r) {
	          var o = e.readUInt8(t),
	              s = n.DescriptorArray.decode(e, t + 13, r);return s.oti = o, s;
	        };
	      }).call(this, e("buffer").Buffer);
	    }, { buffer: 27 }], 56: [function (e, t, n) {
	      (function (t) {
	        var r = e("uint64be"),
	            o = e("./boxes"),
	            s = 4294967295,
	            i = n,
	            d = n.containers = { moov: ["mvhd", "meta", "traks", "mvex"], trak: ["tkhd", "tref", "trgr", "edts", "meta", "mdia", "udta"], edts: ["elst"], mdia: ["mdhd", "hdlr", "elng", "minf"], minf: ["vmhd", "smhd", "hmhd", "sthd", "nmhd", "dinf", "stbl"], dinf: ["dref"], stbl: ["stsd", "stts", "ctts", "cslg", "stsc", "stsz", "stz2", "stco", "co64", "stss", "stsh", "padb", "stdp", "sdtp", "sbgps", "sgpds", "subss", "saizs", "saios"], mvex: ["mehd", "trexs", "leva"], moof: ["mfhd", "meta", "trafs"], traf: ["tfhd", "trun", "sbgps", "sgpds", "subss", "saizs", "saios", "tfdt", "meta"] };i.encode = function (e, n, r) {
	          return i.encodingLength(e), r = r || 0, n = n || new t(e.length), i._encode(e, n, r);
	        }, i._encode = function (e, t, n) {
	          var a = e.type,
	              c = e.length;c > s && (c = 1), t.writeUInt32BE(c, n), t.write(e.type, n + 4, 4, "ascii");var p = n + 8;if (1 === c && (r.encode(e.length, t, p), p += 8), o.fullBoxes[a] && (t.writeUInt32BE(e.flags || 0, p), t.writeUInt8(e.version || 0, p), p += 4), d[a]) {
	            var l = d[a];l.forEach(function (n) {
	              if (5 === n.length) {
	                var r = e[n] || [];n = n.substr(0, 4), r.forEach(function (e) {
	                  i._encode(e, t, p), p += i.encode.bytes;
	                });
	              } else e[n] && (i._encode(e[n], t, p), p += i.encode.bytes);
	            }), e.otherBoxes && e.otherBoxes.forEach(function (e) {
	              i._encode(e, t, p), p += i.encode.bytes;
	            });
	          } else if (o[a]) {
	            var u = o[a].encode;u(e, t, p), p += u.bytes;
	          } else if (e.buffer) {
	            var f = e.buffer;f.copy(t, p), p += e.buffer.length;
	          } else throw new Error("Either `type` must be set to a known type (not'" + a + "') or `buffer` must be set");return i.encode.bytes = p - n, t;
	        }, i.readHeaders = function (e, t, n) {
	          if (t = t || 0, n = n || e.length, 8 > n - t) return 8;var s = e.readUInt32BE(t),
	              i = e.toString("ascii", t + 4, t + 8),
	              d = t + 8;if (1 === s) {
	            if (16 > n - t) return 16;s = r.decode(e, d), d += 8;
	          }var a, c;return o.fullBoxes[i] && (a = e.readUInt8(d), c = 16777215 & e.readUInt32BE(d), d += 4), { length: s, headersLen: d - t, contentLen: s - (d - t), type: i, version: a, flags: c };
	        }, i.decode = function (e, t, n) {
	          t = t || 0, n = n || e.length;var r = i.readHeaders(e, t, n);if (!r || r.length > n - t) throw new Error("Data too short");return i.decodeWithoutHeaders(r, e, t + r.headersLen, t + r.length);
	        }, i.decodeWithoutHeaders = function (e, n, r, s) {
	          r = r || 0, s = s || n.length;var a = e.type,
	              c = {};if (d[a]) {
	            c.otherBoxes = [];for (var p = d[a], l = r, u; 8 <= s - l;) {
	              if (u = i.decode(n, l, s), l += u.length, 0 <= p.indexOf(u.type)) c[u.type] = u;else if (0 <= p.indexOf(u.type + "s")) {
	                var f = u.type + "s",
	                    h = c[f] = c[f] || [];h.push(u);
	              } else c.otherBoxes.push(u);
	            }
	          } else if (o[a]) {
	            var m = o[a].decode;c = m(n, r, s);
	          } else c.buffer = new t(n.slice(r, s));return c.length = e.length, c.contentLen = e.contentLen, c.type = e.type, c.version = e.version, c.flags = e.flags, c;
	        }, i.encodingLength = function (e) {
	          var t = e.type,
	              n = 8;if (o.fullBoxes[t] && (n += 4), d[t]) {
	            var r = d[t];r.forEach(function (t) {
	              if (5 === t.length) {
	                var r = e[t] || [];t = t.substr(0, 4), r.forEach(function (e) {
	                  e.type = t, n += i.encodingLength(e);
	                });
	              } else if (e[t]) {
	                var o = e[t];o.type = t, n += i.encodingLength(o);
	              }
	            }), e.otherBoxes && e.otherBoxes.forEach(function (e) {
	              n += i.encodingLength(e);
	            });
	          } else if (o[t]) n += o[t].encodingLength(e);else if (e.buffer) n += e.buffer.length;else throw new Error("Either `type` must be set to a known type (not'" + t + "') or `buffer` must be set");return n > s && (n += 8), e.length = n, n;
	        };
	      }).call(this, e("buffer").Buffer);
	    }, { "./boxes": 54, buffer: 27, uint64be: 121 }], 57: [function (e, t) {
	      (function (n) {
	        function r() {
	          return this instanceof r ? void (s.Writable.call(this), this.destroyed = !1, this._pending = 0, this._missing = 0, this._buf = null, this._str = null, this._cb = null, this._ondrain = null, this._writeBuffer = null, this._writeCb = null, this._ondrain = null, this._kick()) : new r();
	        }function o(e) {
	          this._parent = e, this.destroyed = !1, s.PassThrough.call(this);
	        }var s = e("readable-stream"),
	            i = e("inherits"),
	            d = e("next-event"),
	            a = e("mp4-box-encoding"),
	            c = new n(0);t.exports = r, i(r, s.Writable), r.prototype.destroy = function (e) {
	          this.destroyed || (this.destroyed = !0, e && this.emit("error", e), this.emit("close"));
	        }, r.prototype._write = function (e, t, n) {
	          if (!this.destroyed) {
	            for (var r = !this._str || !this._str._writableState.needDrain; e.length && !this.destroyed;) {
	              if (!this._missing) return this._writeBuffer = e, void (this._writeCb = n);var o = e.length < this._missing ? e.length : this._missing;if (this._buf ? e.copy(this._buf, this._buf.length - this._missing) : this._str && (r = this._str.write(o === e.length ? e : e.slice(0, o))), this._missing -= o, !this._missing) {
	                var s = this._buf,
	                    i = this._cb,
	                    d = this._str;this._buf = this._cb = this._str = this._ondrain = null, r = !0, d && d.end(), i && i(s);
	              }e = o === e.length ? c : e.slice(o);
	            }return this._pending && !this._missing ? (this._writeBuffer = e, void (this._writeCb = n)) : void (r ? n() : this._ondrain(n));
	          }
	        }, r.prototype._buffer = function (e, t) {
	          this._missing = e, this._buf = new n(e), this._cb = t;
	        }, r.prototype._stream = function (e, t) {
	          var n = this;return this._missing = e, this._str = new o(this), this._ondrain = d(this._str, "drain"), this._pending++, this._str.on("end", function () {
	            n._pending--, n._kick();
	          }), this._cb = t, this._str;
	        }, r.prototype._readBox = function () {
	          function e(r, o) {
	            t._buffer(r, function (r) {
	              o = o ? n.concat([o, r]) : r;var s = a.readHeaders(o);"number" == typeof s ? e(s - o.length, o) : (t._pending++, t._headers = s, t.emit("box", s));
	            });
	          }var t = this;e(8);
	        }, r.prototype.stream = function () {
	          var e = this;if (!e._headers) throw new Error("this function can only be called once after 'box' is emitted");var t = e._headers;return e._headers = null, e._stream(t.contentLen, null);
	        }, r.prototype.decode = function (e) {
	          var t = this;if (!t._headers) throw new Error("this function can only be called once after 'box' is emitted");var n = t._headers;t._headers = null, t._buffer(n.contentLen, function (r) {
	            var o = a.decodeWithoutHeaders(n, r);e(o), t._pending--, t._kick();
	          });
	        }, r.prototype.ignore = function () {
	          var e = this;if (!e._headers) throw new Error("this function can only be called once after 'box' is emitted");var t = e._headers;e._headers = null, this._missing = t.contentLen, this._cb = function () {
	            e._pending--, e._kick();
	          };
	        }, r.prototype._kick = function () {
	          if (!this._pending && (this._buf || this._str || this._readBox(), this._writeBuffer)) {
	            var e = this._writeCb,
	                t = this._writeBuffer;this._writeBuffer = null, this._writeCb = null, this._write(t, null, e);
	          }
	        }, i(o, s.PassThrough), o.prototype.destroy = function (e) {
	          this.destroyed || (this.destroyed = !0, this._parent.destroy(e), e && this.emit("error", e), this.emit("close"));
	        };
	      }).call(this, e("buffer").Buffer);
	    }, { buffer: 27, inherits: 44, "mp4-box-encoding": 56, "next-event": 62, "readable-stream": 86 }], 58: [function (e, t) {
	      (function (n, r) {
	        function o() {}function s() {
	          if (!(this instanceof s)) return new s();d.Readable.call(this), this.destroyed = !1, this._reading = !1, this._stream = null, this._drain = null, this._want = !1, this._onreadable = function () {
	            e._want && (e._want = !1, e._read());
	          }, this._onend = function () {
	            e._stream = null;
	          };var e = this;
	        }function i(e) {
	          this._parent = e, this.destroyed = !1, d.PassThrough.call(this);
	        }var d = e("readable-stream"),
	            a = e("inherits"),
	            c = e("mp4-box-encoding");t.exports = s, a(s, d.Readable), s.prototype.mediaData = s.prototype.mdat = function (e, t) {
	          var n = new i(this);return this.box({ type: "mdat", contentLength: e, encodeBufferLen: 8, stream: n }, t), n;
	        }, s.prototype.box = function (e, t) {
	          if (t || (t = o), this.destroyed) return t(new Error("Encoder is destroyed"));var s;if (e.encodeBufferLen && (s = new r(e.encodeBufferLen)), e.stream) e.buffer = null, s = c.encode(e, s), this.push(s), this._stream = e.stream, this._stream.on("readable", this._onreadable), this._stream.on("end", this._onend), this._stream.on("end", t), this._forward();else {
	            s = c.encode(e, s);var i = this.push(s);if (i) return n.nextTick(t);this._drain = t;
	          }
	        }, s.prototype.destroy = function (e) {
	          if (!this.destroyed) {
	            if (this.destroyed = !0, this._stream && this._stream.destroy && this._stream.destroy(), this._stream = null, this._drain) {
	              var t = this._drain;this._drain = null, t(e);
	            }e && this.emit("error", e), this.emit("close");
	          }
	        }, s.prototype.finalize = function () {
	          this.push(null);
	        }, s.prototype._forward = function () {
	          if (this._stream) for (; !this.destroyed;) {
	            var e = this._stream.read();if (!e) return void (this._want = !!this._stream);if (!this.push(e)) return;
	          }
	        }, s.prototype._read = function () {
	          if (!(this._reading || this.destroyed)) {
	            if (this._reading = !0, this._stream && this._forward(), this._drain) {
	              var e = this._drain;this._drain = null, e();
	            }this._reading = !1;
	          }
	        }, a(i, d.PassThrough), i.prototype.destroy = function (e) {
	          this.destroyed || (this.destroyed = !0, this._parent.destroy(e), e && this.emit("error", e), this.emit("close"));
	        };
	      }).call(this, e("_process"), e("buffer").Buffer);
	    }, { _process: 69, buffer: 27, inherits: 44, "mp4-box-encoding": 56, "readable-stream": 86 }], 59: [function (e, t, n) {
	      n.decode = e("./decode"), n.encode = e("./encode");
	    }, { "./decode": 57, "./encode": 58 }], 60: [function (e, t) {
	      function n(e) {
	        if (e += "", !(100 < e.length)) {
	          var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if (t) {
	            var r = parseFloat(t[1]),
	                n = (t[2] || "ms").toLowerCase();return "years" === n || "year" === n || "yrs" === n || "yr" === n || "y" === n ? r * d : "days" === n || "day" === n || "d" === n ? r * u : "hours" === n || "hour" === n || "hrs" === n || "hr" === n || "h" === n ? r * l : "minutes" === n || "minute" === n || "mins" === n || "min" === n || "m" === n ? r * p : "seconds" === n || "second" === n || "secs" === n || "sec" === n || "s" === n ? r * c : "milliseconds" === n || "millisecond" === n || "msecs" === n || "msec" === n || "ms" === n ? r : void 0;
	          }
	        }
	      }function o(e) {
	        var t = Math.round;return e >= u ? t(e / u) + "d" : e >= l ? t(e / l) + "h" : e >= p ? t(e / p) + "m" : e >= c ? t(e / c) + "s" : e + "ms";
	      }function i(e) {
	        return a(e, u, "day") || a(e, l, "hour") || a(e, p, "minute") || a(e, c, "second") || e + " ms";
	      }function a(e, t, n) {
	        return e < t ? void 0 : e < 1.5 * t ? r(e / t) + " " + n : s(e / t) + " " + n + "s";
	      }var c = 1e3,
	          p = 60 * c,
	          l = 60 * p,
	          u = 24 * l,
	          d = 365.25 * u;t.exports = function (e, t) {
	        t = t || {};var r = typeof e === "undefined" ? "undefined" : _typeof(e);if ("string" == r && 0 < e.length) return n(e);if ("number" == r && !1 === isNaN(e)) return t.long ? i(e) : o(e);throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e));
	      };
	    }, {}], 61: [function (e, t) {
	      function n(e, t) {
	        var o = this;return o instanceof n ? void (i.Readable.call(o, t), o.destroyed = !1, o._drained = !1, o._forwarding = !1, o._current = null, "function" == typeof e ? o._queue = e : (o._queue = e.map(r), o._queue.forEach(function (e) {
	          "function" != typeof e && o._attachErrorListener(e);
	        })), o._next()) : new n(e, t);
	      }function r(e) {
	        if (!e || "function" == typeof e || e._readableState) return e;var t = new i.Readable().wrap(e);return e.destroy && (t.destroy = e.destroy.bind(e)), t;
	      }t.exports = n;var o = e("inherits"),
	          i = e("readable-stream");o(n, i.Readable), n.obj = function (e) {
	        return new n(e, { objectMode: !0, highWaterMark: 16 });
	      }, n.prototype._read = function () {
	        this._drained = !0, this._forward();
	      }, n.prototype._forward = function () {
	        if (!this._forwarding && this._drained && this._current) {
	          this._forwarding = !0;for (var e; null !== (e = this._current.read());) {
	            this._drained = this.push(e);
	          }this._forwarding = !1;
	        }
	      }, n.prototype.destroy = function (e) {
	        this.destroyed || (this.destroyed = !0, this._current && this._current.destroy && this._current.destroy(), "function" != typeof this._queue && this._queue.forEach(function (e) {
	          e.destroy && e.destroy();
	        }), e && this.emit("error", e), this.emit("close"));
	      }, n.prototype._next = function () {
	        var e = this;if (e._current = null, "function" == typeof e._queue) e._queue(function (t, n) {
	          return t ? e.destroy(t) : void (n = r(n), e._attachErrorListener(n), e._gotNextStream(n));
	        });else {
	          var t = e._queue.shift();"function" == typeof t && (t = r(t()), e._attachErrorListener(t)), e._gotNextStream(t);
	        }
	      }, n.prototype._gotNextStream = function (e) {
	        function t() {
	          o._forward();
	        }function n() {
	          e._readableState.ended || o.destroy();
	        }function r() {
	          o._current = null, e.removeListener("readable", t), e.removeListener("end", r), e.removeListener("close", n), o._next();
	        }var o = this;return e ? void (o._current = e, o._forward(), e.on("readable", t), e.once("end", r), e.once("close", n)) : (o.push(null), void o.destroy());
	      }, n.prototype._attachErrorListener = function (e) {
	        function t(r) {
	          e.removeListener("error", t), n.destroy(r);
	        }var n = this;e && e.once("error", t);
	      };
	    }, { inherits: 44, "readable-stream": 86 }], 62: [function (e, t) {
	      t.exports = function (e, t) {
	        var n = null;return e.on(t, function (e) {
	          if (n) {
	            var t = n;n = null, t(e);
	          }
	        }), function (e) {
	          n = e;
	        };
	      };
	    }, {}], 63: [function (e, t) {
	      function n(e) {
	        var t = function t() {
	          return t.called ? t.value : (t.called = !0, t.value = e.apply(this, arguments));
	        };return t.called = !1, t;
	      }function r(e) {
	        var t = function t() {
	          if (t.called) throw new Error(t.onceError);return t.called = !0, t.value = e.apply(this, arguments);
	        },
	            n = e.name || "Function wrapped with `once`";return t.onceError = n + " shouldn't be called more than once", t.called = !1, t;
	      }var o = e("wrappy");t.exports = o(n), t.exports.strict = o(r), n.proto = n(function () {
	        Object.defineProperty(Function.prototype, "once", { value: function value() {
	            return n(this);
	          }, configurable: !0 }), Object.defineProperty(Function.prototype, "onceStrict", { value: function value() {
	            return r(this);
	          }, configurable: !0 });
	      });
	    }, { wrappy: 132 }], 64: [function (e, t) {
	      (function (n) {
	        function r(e) {
	          n.isBuffer(e) && (e = d.decode(e)), i(e.info, "info"), i(e.info["name.utf-8"] || e.info.name, "info.name"), i(e.info["piece length"], "info['piece length']"), i(e.info.pieces, "info.pieces"), e.info.files ? e.info.files.forEach(function (e) {
	            i("number" == typeof e.length, "info.files[0].length"), i(e["path.utf-8"] || e.path, "info.files[0].path");
	          }) : i("number" == typeof e.info.length, "info.length");var t = {};t.info = e.info, t.infoBuffer = d.encode(e.info), t.infoHash = c.sync(t.infoBuffer), t.infoHashBuffer = n.from(t.infoHash, "hex"), t.name = (e.info["name.utf-8"] || e.info.name).toString(), void 0 !== e.info.private && (t.private = !!e.info.private), e["creation date"] && (t.created = new Date(1e3 * e["creation date"])), e["created by"] && (t.createdBy = e["created by"].toString()), n.isBuffer(e.comment) && (t.comment = e.comment.toString()), t.announce = [], e["announce-list"] && e["announce-list"].length ? e["announce-list"].forEach(function (e) {
	            e.forEach(function (e) {
	              t.announce.push(e.toString());
	            });
	          }) : e.announce && t.announce.push(e.announce.toString()), n.isBuffer(e["url-list"]) && (e["url-list"] = 0 < e["url-list"].length ? [e["url-list"]] : []), t.urlList = (e["url-list"] || []).map(function (e) {
	            return e.toString();
	          }), p(t.announce), p(t.urlList);var r = e.info.files || [e.info];t.files = r.map(function (e, n) {
	            var s = [].concat(t.name, e["path.utf-8"] || e.path || []).map(function (e) {
	              return e.toString();
	            });return { path: a.join.apply(null, [a.sep].concat(s)).slice(1), name: s[s.length - 1], length: e.length, offset: r.slice(0, n).reduce(o, 0) };
	          }), t.length = r.reduce(o, 0);var l = t.files[t.files.length - 1];return t.pieceLength = e.info["piece length"], t.lastPieceLength = (l.offset + l.length) % t.pieceLength || t.pieceLength, t.pieces = s(e.info.pieces), t;
	        }function o(e, t) {
	          return e + t.length;
	        }function s(e) {
	          for (var t = [], n = 0; n < e.length; n += 20) {
	            t.push(e.slice(n, n + 20).toString("hex"));
	          }return t;
	        }function i(e, t) {
	          if (!e) throw new Error("Torrent is missing required field: " + t);
	        }t.exports = r, t.exports.decode = r, t.exports.encode = function (e) {
	          var t = { info: e.info };return t["announce-list"] = (e.announce || []).map(function (e) {
	            return t.announce || (t.announce = e), e = n.from(e, "utf8"), [e];
	          }), t["url-list"] = e.urlList || [], e.created && (t["creation date"] = 0 | e.created.getTime() / 1e3), e.createdBy && (t["created by"] = e.createdBy), e.comment && (t.comment = e.comment), d.encode(t);
	        };var d = e("bencode"),
	            a = e("path"),
	            c = e("simple-sha1"),
	            p = e("uniq");
	      }).call(this, e("buffer").Buffer);
	    }, { bencode: 11, buffer: 27, path: 66, "simple-sha1": 100, uniq: 122 }], 65: [function (e, t) {
	      (function (n, r) {
	        function o(e) {
	          if ("string" == typeof e && /^(stream-)?magnet:/.test(e)) return c(e);if ("string" == typeof e && (/^[a-f0-9]{40}$/i.test(e) || /^[a-z2-7]{32}$/i.test(e))) return c("magnet:?xt=urn:btih:" + e);if (r.isBuffer(e) && 20 === e.length) return c("magnet:?xt=urn:btih:" + e.toString("hex"));if (r.isBuffer(e)) return p(e);if (e && e.infoHash) return e.announce || (e.announce = []), "string" == typeof e.announce && (e.announce = [e.announce]), e.urlList || (e.urlList = []), e;throw new Error("Invalid torrent identifier");
	        }function s(e) {
	          return "undefined" != typeof Blob && e instanceof Blob;
	        }t.exports = o, t.exports.remote = function (e, t) {
	          function r(e) {
	            try {
	              c = o(e);
	            } catch (e) {
	              return t(e);
	            }c && c.infoHash ? t(null, c) : t(new Error("Invalid torrent identifier"));
	          }var c;if ("function" != typeof t) throw new Error("second argument must be a Function");try {
	            c = o(e);
	          } catch (e) {}c && c.infoHash ? n.nextTick(function () {
	            t(null, c);
	          }) : s(e) ? i(e, function (e, n) {
	            return e ? t(new Error("Error converting Blob: " + e.message)) : void r(n);
	          }) : "function" == typeof a && /^https?:/.test(e) ? a.concat({ url: e, timeout: 30000, headers: { "user-agent": "WebTorrent (http://webtorrent.io)" } }, function (e, n, o) {
	            return e ? t(new Error("Error downloading torrent: " + e.message)) : void r(o);
	          }) : "function" == typeof d.readFile && "string" == typeof e ? d.readFile(e, function (e, n) {
	            return e ? t(new Error("Invalid torrent identifier")) : void r(n);
	          }) : n.nextTick(function () {
	            t(new Error("Invalid torrent identifier"));
	          });
	        };var i = e("blob-to-buffer"),
	            d = e("fs"),
	            a = e("simple-get"),
	            c = e("magnet-uri"),
	            p = e("parse-torrent-file");t.exports.toMagnetURI = c.encode, t.exports.toTorrentFile = p.encode;(function () {
	          r.alloc(0);
	        })();
	      }).call(this, e("_process"), e("buffer").Buffer);
	    }, { _process: 69, "blob-to-buffer": 23, buffer: 27, fs: 26, "magnet-uri": 51, "parse-torrent-file": 64, "simple-get": 96 }], 66: [function (e, t, n) {
	      (function (e) {
	        function t(e, t) {
	          for (var n = 0, r = e.length - 1, o; 0 <= r; r--) {
	            o = e[r], "." === o ? e.splice(r, 1) : ".." === o ? (e.splice(r, 1), n++) : n && (e.splice(r, 1), n--);
	          }if (t) for (; n--; n) {
	            e.unshift("..");
	          }return e;
	        }function r(e, t) {
	          if (e.filter) return e.filter(t);for (var n = [], r = 0; r < e.length; r++) {
	            t(e[r], r, e) && n.push(e[r]);
	          }return n;
	        }var o = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,
	            s = function s(e) {
	          return o.exec(e).slice(1);
	        };n.resolve = function () {
	          for (var n = "", o = !1, s = arguments.length - 1, i; -1 <= s && !o; s--) {
	            if (i = 0 <= s ? arguments[s] : e.cwd(), "string" != typeof i) throw new TypeError("Arguments to path.resolve must be strings");else if (!i) continue;n = i + "/" + n, o = "/" === i.charAt(0);
	          }return n = t(r(n.split("/"), function (e) {
	            return !!e;
	          }), !o).join("/"), (o ? "/" : "") + n || ".";
	        }, n.normalize = function (e) {
	          var o = n.isAbsolute(e),
	              s = "/" === i(e, -1);return e = t(r(e.split("/"), function (e) {
	            return !!e;
	          }), !o).join("/"), e || o || (e = "."), e && s && (e += "/"), (o ? "/" : "") + e;
	        }, n.isAbsolute = function (e) {
	          return "/" === e.charAt(0);
	        }, n.join = function () {
	          var e = Array.prototype.slice.call(arguments, 0);return n.normalize(r(e, function (e) {
	            if ("string" != typeof e) throw new TypeError("Arguments to path.join must be strings");return e;
	          }).join("/"));
	        }, n.relative = function (e, t) {
	          function r(e) {
	            for (var t = 0; t < e.length && "" === e[t]; t++) {}for (var n = e.length - 1; 0 <= n && "" === e[n]; n--) {}return t > n ? [] : e.slice(t, n - t + 1);
	          }e = n.resolve(e).substr(1), t = n.resolve(t).substr(1);for (var o = r(e.split("/")), s = r(t.split("/")), a = d(o.length, s.length), c = a, p = 0; p < a; p++) {
	            if (o[p] !== s[p]) {
	              c = p;break;
	            }
	          }for (var i = [], p = c; p < o.length; p++) {
	            i.push("..");
	          }return i = i.concat(s.slice(c)), i.join("/");
	        }, n.sep = "/", n.delimiter = ":", n.dirname = function (e) {
	          var t = s(e),
	              n = t[0],
	              r = t[1];return n || r ? (r && (r = r.substr(0, r.length - 1)), n + r) : ".";
	        }, n.basename = function (e, t) {
	          var n = s(e)[2];return t && n.substr(-1 * t.length) === t && (n = n.substr(0, n.length - t.length)), n;
	        }, n.extname = function (e) {
	          return s(e)[3];
	        };var i = function i(e, t, n) {
	          return e.substr(t, n);
	        };
	      }).call(this, e("_process"));
	    }, { _process: 69 }], 67: [function (e, n) {
	      for (var r = e("closest-to"), o = 1024, s = 13, i = []; 22 > s++;) {
	        i.push(t(2, s));
	      }n.exports = function (e) {
	        return r(e / o, i);
	      };
	    }, { "closest-to": 30 }], 68: [function (e, t) {
	      (function (e) {
	        "use strict";
	        t.exports = e.version && 0 !== e.version.indexOf("v0.") && (0 !== e.version.indexOf("v1.") || 0 === e.version.indexOf("v1.8.")) ? e.nextTick : function (t, n, r, o) {
	          if ("function" != typeof t) throw new TypeError("\"callback\" argument must be a function");var s = arguments.length,
	              d,
	              a;switch (s) {case 0:case 1:
	              return e.nextTick(t);case 2:
	              return e.nextTick(function () {
	                t.call(null, n);
	              });case 3:
	              return e.nextTick(function () {
	                t.call(null, n, r);
	              });case 4:
	              return e.nextTick(function () {
	                t.call(null, n, r, o);
	              });default:
	              for (d = Array(s - 1), a = 0; a < d.length;) {
	                d[a++] = arguments[a];
	              }return e.nextTick(function () {
	                t.apply(null, d);
	              });}
	        };
	      }).call(this, e("_process"));
	    }, { _process: 69 }], 69: [function (e, t) {
	      function n() {
	        throw new Error("setTimeout has not been defined");
	      }function r() {
	        throw new Error("clearTimeout has not been defined");
	      }function o(e) {
	        if (l === setTimeout) return setTimeout(e, 0);if ((l === n || !l) && setTimeout) return l = setTimeout, setTimeout(e, 0);try {
	          return l(e, 0);
	        } catch (t) {
	          try {
	            return l.call(null, e, 0);
	          } catch (t) {
	            return l.call(this, e, 0);
	          }
	        }
	      }function s(e) {
	        if (u === clearTimeout) return clearTimeout(e);if ((u === r || !u) && clearTimeout) return u = clearTimeout, clearTimeout(e);try {
	          return u(e);
	        } catch (t) {
	          try {
	            return u.call(null, e);
	          } catch (t) {
	            return u.call(this, e);
	          }
	        }
	      }function i() {
	        h && g && (h = !1, g.length ? f = g.concat(f) : m = -1, f.length && d());
	      }function d() {
	        if (!h) {
	          var e = o(i);h = !0;for (var t = f.length; t;) {
	            for (g = f, f = []; ++m < t;) {
	              g && g[m].run();
	            }m = -1, t = f.length;
	          }g = null, h = !1, s(e);
	        }
	      }function a(e, t) {
	        this.fun = e, this.array = t;
	      }function c() {}var p = t.exports = {},
	          l,
	          u;(function () {
	        try {
	          l = "function" == typeof setTimeout ? setTimeout : n;
	        } catch (t) {
	          l = n;
	        }try {
	          u = "function" == typeof clearTimeout ? clearTimeout : r;
	        } catch (t) {
	          u = r;
	        }
	      })();var f = [],
	          h = !1,
	          m = -1,
	          g;p.nextTick = function (e) {
	        var t = Array(arguments.length - 1);if (1 < arguments.length) for (var n = 1; n < arguments.length; n++) {
	          t[n - 1] = arguments[n];
	        }f.push(new a(e, t)), 1 !== f.length || h || o(d);
	      }, a.prototype.run = function () {
	        this.fun.apply(null, this.array);
	      }, p.title = "browser", p.browser = !0, p.env = {}, p.argv = [], p.version = "", p.versions = {}, p.on = c, p.addListener = c, p.once = c, p.off = c, p.removeListener = c, p.removeAllListeners = c, p.emit = c, p.prependListener = c, p.prependOnceListener = c, p.listeners = function () {
	        return [];
	      }, p.binding = function () {
	        throw new Error("process.binding is not supported");
	      }, p.cwd = function () {
	        return "/";
	      }, p.chdir = function () {
	        throw new Error("process.chdir is not supported");
	      }, p.umask = function () {
	        return 0;
	      };
	    }, {}], 70: [function (e, t) {
	      var n = e("once"),
	          r = e("end-of-stream"),
	          o = e("fs"),
	          s = function s() {},
	          i = function i(e) {
	        return "function" == typeof e;
	      },
	          d = function d(e) {
	        return !!o && (e instanceof (o.ReadStream || s) || e instanceof (o.WriteStream || s)) && i(e.close);
	      },
	          a = function a(e) {
	        return e.setHeader && i(e.abort);
	      },
	          c = function c(e, t, o, s) {
	        s = n(s);var c = !1;e.on("close", function () {
	          c = !0;
	        }), r(e, { readable: t, writable: o }, function (e) {
	          return e ? s(e) : void (c = !0, s());
	        });var p = !1;return function (t) {
	          if (!c) return p ? void 0 : (p = !0, d(e) ? e.close() : a(e) ? e.abort() : i(e.destroy) ? e.destroy() : void s(t || new Error("stream was destroyed")));
	        };
	      },
	          p = function p(e) {
	        e();
	      },
	          l = function l(e, t) {
	        return e.pipe(t);
	      };t.exports = function () {
	        var e = Array.prototype.slice.call(arguments),
	            t = i(e[e.length - 1] || s) && e.pop() || s;if (Array.isArray(e[0]) && (e = e[0]), 2 > e.length) throw new Error("pump requires two streams per minimum");var n = e.map(function (o, s) {
	          var i = s < e.length - 1;return c(o, i, 0 < s, function (e) {
	            r || (r = e), e && n.forEach(p), i || (n.forEach(p), t(r));
	          });
	        }),
	            r;return e.reduce(l);
	      };
	    }, { "end-of-stream": 36, fs: 25, once: 63 }], 71: [function (t, n, o) {
	      (function (t) {
	        (function (s) {
	          function d(e) {
	            throw new RangeError(U[e]);
	          }function a(e, t) {
	            for (var n = e.length, r = []; n--;) {
	              r[n] = t(e[n]);
	            }return r;
	          }function c(e, t) {
	            var n = e.split("@"),
	                r = "";1 < n.length && (r = n[0] + "@", e = n[1]), e = e.replace(A, ".");var o = e.split("."),
	                s = a(o, t).join(".");return r + s;
	          }function p(e) {
	            for (var t = [], n = 0, r = e.length, o, s; n < r;) {
	              o = e.charCodeAt(n++), 55296 <= o && 56319 >= o && n < r ? (s = e.charCodeAt(n++), 56320 == (64512 & s) ? t.push(((1023 & o) << 10) + (1023 & s) + 65536) : (t.push(o), n--)) : t.push(o);
	            }return t;
	          }function l(e) {
	            return a(e, function (e) {
	              var t = "";return 65535 < e && (e -= 65536, t += O(55296 | 1023 & e >>> 10), e = 56320 | 1023 & e), t += O(e), t;
	            }).join("");
	          }function u(e) {
	            return 10 > e - 48 ? e - 22 : 26 > e - 65 ? e - 65 : 26 > e - 97 ? e - 97 : v;
	          }function f(e, t) {
	            return e + 22 + 75 * (26 > e) - ((0 != t) << 5);
	          }function h(e, t, n) {
	            var r = 0;for (e = n ? P(e / E) : e >> 1, e += P(e / t); e > R * C >> 1; r += v) {
	              e = P(e / R);
	            }return P(r + (R + 1) * e / (e + w));
	          }function m(e) {
	            var r = [],
	                o = e.length,
	                s = 0,
	                i = I,
	                n = B,
	                a,
	                c,
	                p,
	                f,
	                m,
	                g,
	                _,
	                y,
	                b,
	                t;for (c = e.lastIndexOf(L), 0 > c && (c = 0), p = 0; p < c; ++p) {
	              128 <= e.charCodeAt(p) && d("not-basic"), r.push(e.charCodeAt(p));
	            }for (f = 0 < c ? c + 1 : 0; f < o;) {
	              for (m = s, g = 1, _ = v;; _ += v) {
	                if (f >= o && d("invalid-input"), y = u(e.charCodeAt(f++)), (y >= v || y > P((x - s) / g)) && d("overflow"), s += y * g, b = _ <= n ? S : _ >= n + C ? C : _ - n, y < b) break;t = v - b, g > P(x / t) && d("overflow"), g *= t;
	              }a = r.length + 1, n = h(s - m, a, 0 == m), P(s / a) > x - i && d("overflow"), i += P(s / a), s %= a, r.splice(s++, 0, i);
	            }return l(r);
	          }function g(e) {
	            var r = [],
	                o,
	                n,
	                s,
	                i,
	                a,
	                c,
	                l,
	                u,
	                m,
	                g,
	                t,
	                _,
	                y,
	                b,
	                w;for (e = p(e), _ = e.length, o = I, n = 0, a = B, c = 0; c < _; ++c) {
	              t = e[c], 128 > t && r.push(O(t));
	            }for (s = i = r.length, i && r.push(L); s < _;) {
	              for (l = x, c = 0; c < _; ++c) {
	                t = e[c], t >= o && t < l && (l = t);
	              }for (y = s + 1, l - o > P((x - n) / y) && d("overflow"), n += (l - o) * y, o = l, c = 0; c < _; ++c) {
	                if (t = e[c], t < o && ++n > x && d("overflow"), t == o) {
	                  for (u = n, m = v;; m += v) {
	                    if (g = m <= a ? S : m >= a + C ? C : m - a, u < g) break;w = u - g, b = v - g, r.push(O(f(g + w % b, 0))), u = P(w / b);
	                  }r.push(O(f(u, 0))), a = h(n, y, s == i), n = 0, ++s;
	                }
	              }++n, ++o;
	            }return r.join("");
	          }var _ = "object" == (typeof o === "undefined" ? "undefined" : _typeof(o)) && o && !o.nodeType && o,
	              y = "object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) && n && !n.nodeType && n,
	              b = "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && t;(b.global === b || b.window === b || b.self === b) && (s = b);var x = 2147483647,
	              v = 36,
	              S = 1,
	              C = 26,
	              w = 38,
	              E = 700,
	              B = 72,
	              I = 128,
	              L = "-",
	              k = /^xn--/,
	              T = /[^\x20-\x7E]/,
	              A = /[\x2E\u3002\uFF0E\uFF61]/g,
	              U = { overflow: "Overflow: input needs wider integers to process", "not-basic": "Illegal input >= 0x80 (not a basic code point)", "invalid-input": "Invalid input" },
	              R = v - S,
	              P = r,
	              O = e,
	              H,
	              M;if (H = { version: "1.4.1", ucs2: { decode: p, encode: l }, decode: m, encode: g, toASCII: function toASCII(e) {
	              return c(e, function (e) {
	                return T.test(e) ? "xn--" + g(e) : e;
	              });
	            }, toUnicode: function toUnicode(e) {
	              return c(e, function (e) {
	                return k.test(e) ? m(e.slice(4).toLowerCase()) : e;
	              });
	            } }, "function" == typeof i && "object" == _typeof(i.amd) && i.amd) i("punycode", function () {
	            return H;
	          });else if (!(_ && y)) s.punycode = H;else if (n.exports == _) y.exports = H;else for (M in H) {
	            H.hasOwnProperty(M) && (_[M] = H[M]);
	          }
	        })(this);
	      }).call(this, "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global);
	    }, {}], 72: [function (e, t) {
	      "use strict";
	      function n(e, t) {
	        return Object.prototype.hasOwnProperty.call(e, t);
	      }t.exports = function (e, t, o, s) {
	        t = t || "&", o = o || "=";var d = {};if ("string" != typeof e || 0 === e.length) return d;var a = /\+/g;e = e.split(t);var c = 1e3;s && "number" == typeof s.maxKeys && (c = s.maxKeys);var p = e.length;0 < c && p > c && (p = c);for (var l = 0; l < p; ++l) {
	          var i = e[l].replace(a, "%20"),
	              u = i.indexOf(o),
	              f,
	              h,
	              m,
	              g;0 <= u ? (f = i.substr(0, u), h = i.substr(u + 1)) : (f = i, h = ""), m = decodeURIComponent(f), g = decodeURIComponent(h), n(d, m) ? r(d[m]) ? d[m].push(g) : d[m] = [d[m], g] : d[m] = g;
	        }return d;
	      };var r = Array.isArray || function (e) {
	        return "[object Array]" === Object.prototype.toString.call(e);
	      };
	    }, {}], 73: [function (e, t) {
	      "use strict";
	      function n(e, t) {
	        if (e.map) return e.map(t);for (var n = [], r = 0; r < e.length; r++) {
	          n.push(t(e[r], r));
	        }return n;
	      }var r = function r(e) {
	        switch (typeof e === "undefined" ? "undefined" : _typeof(e)) {case "string":
	            return e;case "boolean":
	            return e ? "true" : "false";case "number":
	            return isFinite(e) ? e : "";default:
	            return "";}
	      };t.exports = function (e, t, i, d) {
	        return t = t || "&", i = i || "=", null === e && (e = void 0), "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? n(s(e), function (s) {
	          var d = encodeURIComponent(r(s)) + i;return o(e[s]) ? n(e[s], function (e) {
	            return d + encodeURIComponent(r(e));
	          }).join(t) : d + encodeURIComponent(r(e[s]));
	        }).join(t) : d ? encodeURIComponent(r(d)) + i + encodeURIComponent(r(e)) : "";
	      };var o = Array.isArray || function (e) {
	        return "[object Array]" === Object.prototype.toString.call(e);
	      },
	          s = Object.keys || function (e) {
	        var t = [];for (var n in e) {
	          Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
	        }return t;
	      };
	    }, {}], 74: [function (e, t, n) {
	      "use strict";
	      n.decode = n.parse = e("./decode"), n.encode = n.stringify = e("./encode");
	    }, { "./decode": 72, "./encode": 73 }], 75: [function (e, t) {
	      t.exports = function (e) {
	        var t = 0;return function () {
	          if (t === e.length) return null;var n = e.length - t,
	              r = 0 | Math.random() * n,
	              o = e[t + r],
	              s = e[t];return e[t] = o, e[t + r] = s, t++, o;
	        };
	      };
	    }, {}], 76: [function (e, t) {
	      (function (n, r) {
	        "use strict";
	        var o = e("safe-buffer").Buffer,
	            s = r.crypto || r.msCrypto;t.exports = s && s.getRandomValues ? function (e, t) {
	          if (65536 < e) throw new Error("requested too many random bytes");var i = new r.Uint8Array(e);0 < e && s.getRandomValues(i);var d = o.from(i.buffer);return "function" == typeof t ? n.nextTick(function () {
	            t(null, d);
	          }) : d;
	        } : function () {
	          throw new Error("secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11");
	        };
	      }).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global);
	    }, { _process: 69, "safe-buffer": 94 }], 77: [function (e, t) {
	      function r(e, t) {
	        var n = this;return n instanceof r ? void (s.Writable.call(n, t), n.destroyed = !1, n._queue = [], n._position = e || 0, n._cb = null, n._buffer = null, n._out = null) : new r(e);
	      }var o = e("inherits"),
	          s = e("readable-stream");t.exports = r, o(r, s.Writable), r.prototype._write = function (e, t, r) {
	        for (var o = this, s = !0;;) {
	          if (o.destroyed) return;if (0 === o._queue.length) return o._buffer = e, void (o._cb = r);o._buffer = null;var i = o._queue[0],
	              d = n(i.start - o._position, 0),
	              a = i.end - o._position;if (d >= e.length) return o._position += e.length, r(null);var c;if (a > e.length) {
	            o._position += e.length, c = 0 === d ? e : e.slice(d), s = i.stream.write(c) && s;break;
	          }o._position += a, c = 0 === d && a === e.length ? e : e.slice(d, a), s = i.stream.write(c) && s, i.last && i.stream.end(), e = e.slice(a), o._queue.shift();
	        }s ? r(null) : i.stream.once("drain", r.bind(null, null));
	      }, r.prototype.slice = function (e) {
	        var t = this;if (t.destroyed) return null;e instanceof Array || (e = [e]);var n = new s.PassThrough();return e.forEach(function (r, o) {
	          t._queue.push({ start: r.start, end: r.end, stream: n, last: o === e.length - 1 });
	        }), t._buffer && t._write(t._buffer, null, t._cb), n;
	      }, r.prototype.destroy = function (e) {
	        var t = this;t.destroyed || (t.destroyed = !0, e && t.emit("error", e));
	      };
	    }, { inherits: 44, "readable-stream": 86 }], 78: [function (e, t) {
	      "use strict";
	      function n(e) {
	        return this instanceof n ? void (a.call(this, e), c.call(this, e), e && !1 === e.readable && (this.readable = !1), e && !1 === e.writable && (this.writable = !1), this.allowHalfOpen = !0, e && !1 === e.allowHalfOpen && (this.allowHalfOpen = !1), this.once("end", r)) : new n(e);
	      }function r() {
	        this.allowHalfOpen || this._writableState.ended || s(o, this);
	      }function o(e) {
	        e.end();
	      }var s = e("process-nextick-args"),
	          i = Object.keys || function (e) {
	        var t = [];for (var n in e) {
	          t.push(n);
	        }return t;
	      };t.exports = n;var d = e("core-util-is");d.inherits = e("inherits");var a = e("./_stream_readable"),
	          c = e("./_stream_writable");d.inherits(n, a);for (var p = i(c.prototype), l = 0, u; l < p.length; l++) {
	        u = p[l], n.prototype[u] || (n.prototype[u] = c.prototype[u]);
	      }Object.defineProperty(n.prototype, "destroyed", { get: function get() {
	          return void 0 === this._readableState || void 0 === this._writableState ? !1 : this._readableState.destroyed && this._writableState.destroyed;
	        }, set: function set(e) {
	          void 0 === this._readableState || void 0 === this._writableState || (this._readableState.destroyed = e, this._writableState.destroyed = e);
	        } }), n.prototype._destroy = function (e, t) {
	        this.push(null), this.end(), s(t, e);
	      };
	    }, { "./_stream_readable": 80, "./_stream_writable": 82, "core-util-is": 31, inherits: 44, "process-nextick-args": 68 }], 79: [function (e, t) {
	      "use strict";
	      function n(e) {
	        return this instanceof n ? void r.call(this, e) : new n(e);
	      }t.exports = n;var r = e("./_stream_transform"),
	          o = e("core-util-is");o.inherits = e("inherits"), o.inherits(n, r), n.prototype._transform = function (e, t, n) {
	        n(null, e);
	      };
	    }, { "./_stream_transform": 81, "core-util-is": 31, inherits: 44 }], 80: [function (e, t) {
	      (function (n, o) {
	        "use strict";
	        function s(e) {
	          return j.from(e);
	        }function i(e) {
	          return j.isBuffer(e) || e instanceof N;
	        }function d(e, t, n) {
	          return "function" == typeof e.prependListener ? e.prependListener(t, n) : void (e._events && e._events[t] ? P(e._events[t]) ? e._events[t].unshift(n) : e._events[t] = [n, e._events[t]] : e.on(t, n));
	        }function a(t, n) {
	          O = O || e("./_stream_duplex"), t = t || {}, this.objectMode = !!t.objectMode, n instanceof O && (this.objectMode = this.objectMode || !!t.readableObjectMode);var o = t.highWaterMark,
	              s = this.objectMode ? 16 : 16384;this.highWaterMark = o || 0 === o ? o : s, this.highWaterMark = r(this.highWaterMark), this.buffer = new z(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = t.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, t.encoding && (!G && (G = e("string_decoder/").StringDecoder), this.decoder = new G(t.encoding), this.encoding = t.encoding);
	        }function c(t) {
	          return O = O || e("./_stream_duplex"), this instanceof c ? void (this._readableState = new a(t, this), this.readable = !0, t && ("function" == typeof t.read && (this._read = t.read), "function" == typeof t.destroy && (this._destroy = t.destroy)), q.call(this)) : new c(t);
	        }function p(e, t, n, r, o) {
	          var i = e._readableState;if (null === t) i.reading = !1, g(e, i);else {
	            var d;o || (d = u(i, t)), d ? e.emit("error", d) : i.objectMode || t && 0 < t.length ? ("string" != typeof t && !i.objectMode && Object.getPrototypeOf(t) !== j.prototype && (t = s(t)), r ? i.endEmitted ? e.emit("error", new Error("stream.unshift() after end event")) : l(e, i, t, !0) : i.ended ? e.emit("error", new Error("stream.push() after EOF")) : (i.reading = !1, i.decoder && !n ? (t = i.decoder.write(t), i.objectMode || 0 !== t.length ? l(e, i, t, !1) : b(e, i)) : l(e, i, t, !1))) : !r && (i.reading = !1);
	          }return f(i);
	        }function l(e, t, n, r) {
	          t.flowing && 0 === t.length && !t.sync ? (e.emit("data", n), e.read(0)) : (t.length += t.objectMode ? 1 : n.length, r ? t.buffer.unshift(n) : t.buffer.push(n), t.needReadable && _(e)), b(e, t);
	        }function u(e, t) {
	          var n;return i(t) || "string" == typeof t || void 0 === t || e.objectMode || (n = new TypeError("Invalid non-string/buffer chunk")), n;
	        }function f(e) {
	          return !e.ended && (e.needReadable || e.length < e.highWaterMark || 0 === e.length);
	        }function h(e) {
	          return e >= X ? e = X : (e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e++), e;
	        }function m(e, t) {
	          return 0 >= e || 0 === t.length && t.ended ? 0 : t.objectMode ? 1 : e === e ? (e > t.highWaterMark && (t.highWaterMark = h(e)), e <= t.length ? e : t.ended ? t.length : (t.needReadable = !0, 0)) : t.flowing && t.length ? t.buffer.head.data.length : t.length;
	        }function g(e, t) {
	          if (!t.ended) {
	            if (t.decoder) {
	              var n = t.decoder.end();n && n.length && (t.buffer.push(n), t.length += t.objectMode ? 1 : n.length);
	            }t.ended = !0, _(e);
	          }
	        }function _(e) {
	          var t = e._readableState;t.needReadable = !1, t.emittedReadable || (W("emitReadable", t.flowing), t.emittedReadable = !0, t.sync ? R(y, e) : y(e));
	        }function y(e) {
	          W("emit readable"), e.emit("readable"), C(e);
	        }function b(e, t) {
	          t.readingMore || (t.readingMore = !0, R(w, e, t));
	        }function w(e, t) {
	          for (var n = t.length; !t.reading && !t.flowing && !t.ended && t.length < t.highWaterMark && (W("maybeReadMore read 0"), e.read(0), n !== t.length);) {
	            n = t.length;
	          }t.readingMore = !1;
	        }function k(e) {
	          return function () {
	            var t = e._readableState;W("pipeOnDrain", t.awaitDrain), t.awaitDrain && t.awaitDrain--, 0 === t.awaitDrain && M(e, "data") && (t.flowing = !0, C(e));
	          };
	        }function x(e) {
	          W("readable nexttick read 0"), e.read(0);
	        }function v(e, t) {
	          t.resumeScheduled || (t.resumeScheduled = !0, R(S, e, t));
	        }function S(e, t) {
	          t.reading || (W("resume read 0"), e.read(0)), t.resumeScheduled = !1, t.awaitDrain = 0, e.emit("resume"), C(e), t.flowing && !t.reading && e.read(0);
	        }function C(e) {
	          var t = e._readableState;for (W("flow", t.flowing); t.flowing && null !== e.read();) {}
	        }function E(e, t) {
	          if (0 === t.length) return null;var r;return t.objectMode ? r = t.buffer.shift() : !e || e >= t.length ? (r = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.head.data : t.buffer.concat(t.length), t.buffer.clear()) : r = B(e, t.buffer, t.decoder), r;
	        }function B(e, t, n) {
	          var r;return e < t.head.data.length ? (r = t.head.data.slice(0, e), t.head.data = t.head.data.slice(e)) : e === t.head.data.length ? r = t.shift() : r = n ? I(e, t) : L(e, t), r;
	        }function I(e, t) {
	          var n = t.head,
	              r = 1,
	              o = n.data;for (e -= o.length; n = n.next;) {
	            var s = n.data,
	                i = e > s.length ? s.length : e;if (o += i === s.length ? s : s.slice(0, e), e -= i, 0 === e) {
	              i === s.length ? (++r, t.head = n.next ? n.next : t.tail = null) : (t.head = n, n.data = s.slice(i));break;
	            }++r;
	          }return t.length -= r, o;
	        }function L(e, t) {
	          var n = j.allocUnsafe(e),
	              r = t.head,
	              o = 1;for (r.data.copy(n), e -= r.data.length; r = r.next;) {
	            var s = r.data,
	                i = e > s.length ? s.length : e;if (s.copy(n, n.length - e, 0, i), e -= i, 0 === e) {
	              i === s.length ? (++o, t.head = r.next ? r.next : t.tail = null) : (t.head = r, r.data = s.slice(i));break;
	            }++o;
	          }return t.length -= o, n;
	        }function T(e) {
	          var t = e._readableState;if (0 < t.length) throw new Error("\"endReadable()\" called on non-empty stream");t.endEmitted || (t.ended = !0, R(A, t, e));
	        }function A(e, t) {
	          e.endEmitted || 0 !== e.length || (e.endEmitted = !0, t.readable = !1, t.emit("end"));
	        }function U(e, t) {
	          for (var n = 0, r = e.length; n < r; n++) {
	            if (e[n] === t) return n;
	          }return -1;
	        }var R = e("process-nextick-args");t.exports = c;var P = e("isarray"),
	            O;c.ReadableState = a;var H = e("events").EventEmitter,
	            M = function M(e, t) {
	          return e.listeners(t).length;
	        },
	            q = e("./internal/streams/stream"),
	            j = e("safe-buffer").Buffer,
	            N = o.Uint8Array || function () {},
	            F = e("core-util-is");F.inherits = e("inherits");var D = e("util"),
	            W;W = D && D.debuglog ? D.debuglog("stream") : function () {};var z = e("./internal/streams/BufferList"),
	            V = e("./internal/streams/destroy"),
	            G;F.inherits(c, q);var K = ["error", "close", "destroy", "pause", "resume"];Object.defineProperty(c.prototype, "destroyed", { get: function get() {
	            return void 0 !== this._readableState && this._readableState.destroyed;
	          }, set: function set(e) {
	            this._readableState && (this._readableState.destroyed = e);
	          } }), c.prototype.destroy = V.destroy, c.prototype._undestroy = V.undestroy, c.prototype._destroy = function (e, t) {
	          this.push(null), t(e);
	        }, c.prototype.push = function (e, t) {
	          var n = this._readableState,
	              r;return n.objectMode ? r = !0 : "string" == typeof e && (t = t || n.defaultEncoding, t !== n.encoding && (e = j.from(e, t), t = ""), r = !0), p(this, e, t, !1, r);
	        }, c.prototype.unshift = function (e) {
	          return p(this, e, null, !0, !1);
	        }, c.prototype.isPaused = function () {
	          return !1 === this._readableState.flowing;
	        }, c.prototype.setEncoding = function (t) {
	          return G || (G = e("string_decoder/").StringDecoder), this._readableState.decoder = new G(t), this._readableState.encoding = t, this;
	        };var X = 8388608;c.prototype.read = function (e) {
	          W("read", e), e = parseInt(e, 10);var t = this._readableState,
	              n = e;if (0 !== e && (t.emittedReadable = !1), 0 === e && t.needReadable && (t.length >= t.highWaterMark || t.ended)) return W("read: emitReadable", t.length, t.ended), 0 === t.length && t.ended ? T(this) : _(this), null;if (e = m(e, t), 0 === e && t.ended) return 0 === t.length && T(this), null;var r = t.needReadable;W("need readable", r), (0 === t.length || t.length - e < t.highWaterMark) && (r = !0, W("length less than watermark", r)), t.ended || t.reading ? (r = !1, W("reading or ended", r)) : r && (W("do read"), t.reading = !0, t.sync = !0, 0 === t.length && (t.needReadable = !0), this._read(t.highWaterMark), t.sync = !1, !t.reading && (e = m(n, t)));var o;return o = 0 < e ? E(e, t) : null, null === o ? (t.needReadable = !0, e = 0) : t.length -= e, 0 === t.length && (!t.ended && (t.needReadable = !0), n !== e && t.ended && T(this)), null !== o && this.emit("data", o), o;
	        }, c.prototype._read = function () {
	          this.emit("error", new Error("_read() is not implemented"));
	        }, c.prototype.pipe = function (e, t) {
	          function r(e, t) {
	            W("onunpipe"), e === u && t && !1 === t.hasUnpiped && (t.hasUnpiped = !0, s());
	          }function o() {
	            W("onend"), e.end();
	          }function s() {
	            W("cleanup"), e.removeListener("close", c), e.removeListener("finish", p), e.removeListener("drain", g), e.removeListener("error", a), e.removeListener("unpipe", r), u.removeListener("end", o), u.removeListener("end", l), u.removeListener("data", i), _ = !0, f.awaitDrain && (!e._writableState || e._writableState.needDrain) && g();
	          }function i(t) {
	            W("ondata"), y = !1;var n = e.write(t);!1 !== n || y || ((1 === f.pipesCount && f.pipes === e || 1 < f.pipesCount && -1 !== U(f.pipes, e)) && !_ && (W("false write response, pause", u._readableState.awaitDrain), u._readableState.awaitDrain++, y = !0), u.pause());
	          }function a(t) {
	            W("onerror", t), l(), e.removeListener("error", a), 0 === M(e, "error") && e.emit("error", t);
	          }function c() {
	            e.removeListener("finish", p), l();
	          }function p() {
	            W("onfinish"), e.removeListener("close", c), l();
	          }function l() {
	            W("unpipe"), u.unpipe(e);
	          }var u = this,
	              f = this._readableState;switch (f.pipesCount) {case 0:
	              f.pipes = e;break;case 1:
	              f.pipes = [f.pipes, e];break;default:
	              f.pipes.push(e);}f.pipesCount += 1, W("pipe count=%d opts=%j", f.pipesCount, t);var h = (!t || !1 !== t.end) && e !== n.stdout && e !== n.stderr,
	              m = h ? o : l;f.endEmitted ? R(m) : u.once("end", m), e.on("unpipe", r);var g = k(u);e.on("drain", g);var _ = !1,
	              y = !1;return u.on("data", i), d(e, "error", a), e.once("close", c), e.once("finish", p), e.emit("pipe", u), f.flowing || (W("pipe resume"), u.resume()), e;
	        }, c.prototype.unpipe = function (e) {
	          var t = this._readableState,
	              n = { hasUnpiped: !1 };if (0 === t.pipesCount) return this;if (1 === t.pipesCount) return e && e !== t.pipes ? this : (e || (e = t.pipes), t.pipes = null, t.pipesCount = 0, t.flowing = !1, e && e.emit("unpipe", this, n), this);if (!e) {
	            var r = t.pipes,
	                o = t.pipesCount;t.pipes = null, t.pipesCount = 0, t.flowing = !1;for (var s = 0; s < o; s++) {
	              r[s].emit("unpipe", this, n);
	            }return this;
	          }var i = U(t.pipes, e);return -1 === i ? this : (t.pipes.splice(i, 1), t.pipesCount -= 1, 1 === t.pipesCount && (t.pipes = t.pipes[0]), e.emit("unpipe", this, n), this);
	        }, c.prototype.on = function (e, t) {
	          var n = q.prototype.on.call(this, e, t);if ("data" === e) !1 !== this._readableState.flowing && this.resume();else if ("readable" === e) {
	            var r = this._readableState;r.endEmitted || r.readableListening || (r.readableListening = r.needReadable = !0, r.emittedReadable = !1, r.reading ? r.length && _(this) : R(x, this));
	          }return n;
	        }, c.prototype.addListener = c.prototype.on, c.prototype.resume = function () {
	          var e = this._readableState;return e.flowing || (W("resume"), e.flowing = !0, v(this, e)), this;
	        }, c.prototype.pause = function () {
	          return W("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (W("pause"), this._readableState.flowing = !1, this.emit("pause")), this;
	        }, c.prototype.wrap = function (e) {
	          var t = this._readableState,
	              r = !1,
	              o = this;for (var s in e.on("end", function () {
	            if (W("wrapped end"), t.decoder && !t.ended) {
	              var e = t.decoder.end();e && e.length && o.push(e);
	            }o.push(null);
	          }), e.on("data", function (n) {
	            if ((W("wrapped data"), t.decoder && (n = t.decoder.write(n)), !(t.objectMode && (null === n || void 0 === n))) && (t.objectMode || n && n.length)) {
	              var s = o.push(n);s || (r = !0, e.pause());
	            }
	          }), e) {
	            void 0 === this[s] && "function" == typeof e[s] && (this[s] = function (t) {
	              return function () {
	                return e[t].apply(e, arguments);
	              };
	            }(s));
	          }for (var i = 0; i < K.length; i++) {
	            e.on(K[i], o.emit.bind(o, K[i]));
	          }return o._read = function (t) {
	            W("wrapped _read", t), r && (r = !1, e.resume());
	          }, o;
	        }, c._fromList = E;
	      }).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global);
	    }, { "./_stream_duplex": 78, "./internal/streams/BufferList": 83, "./internal/streams/destroy": 84, "./internal/streams/stream": 85, _process: 69, "core-util-is": 31, events: 37, inherits: 44, isarray: 49, "process-nextick-args": 68, "safe-buffer": 94, "string_decoder/": 112, util: 25 }], 81: [function (e, t) {
	      "use strict";
	      function n(e) {
	        this.afterTransform = function (t, n) {
	          return r(e, t, n);
	        }, this.needTransform = !1, this.transforming = !1, this.writecb = null, this.writechunk = null, this.writeencoding = null;
	      }function r(e, t, n) {
	        var r = e._transformState;r.transforming = !1;var o = r.writecb;if (!o) return e.emit("error", new Error("write callback called multiple times"));r.writechunk = null, r.writecb = null, null !== n && n !== void 0 && e.push(n), o(t);var s = e._readableState;s.reading = !1, (s.needReadable || s.length < s.highWaterMark) && e._read(s.highWaterMark);
	      }function o(e) {
	        if (!(this instanceof o)) return new o(e);i.call(this, e), this._transformState = new n(this);var t = this;this._readableState.needReadable = !0, this._readableState.sync = !1, e && ("function" == typeof e.transform && (this._transform = e.transform), "function" == typeof e.flush && (this._flush = e.flush)), this.once("prefinish", function () {
	          "function" == typeof this._flush ? this._flush(function (e, n) {
	            s(t, e, n);
	          }) : s(t);
	        });
	      }function s(e, t, n) {
	        if (t) return e.emit("error", t);null !== n && n !== void 0 && e.push(n);var r = e._writableState,
	            o = e._transformState;if (r.length) throw new Error("Calling transform done when ws.length != 0");if (o.transforming) throw new Error("Calling transform done when still transforming");return e.push(null);
	      }t.exports = o;var i = e("./_stream_duplex"),
	          d = e("core-util-is");d.inherits = e("inherits"), d.inherits(o, i), o.prototype.push = function (e, t) {
	        return this._transformState.needTransform = !1, i.prototype.push.call(this, e, t);
	      }, o.prototype._transform = function () {
	        throw new Error("_transform() is not implemented");
	      }, o.prototype._write = function (e, t, n) {
	        var r = this._transformState;if (r.writecb = n, r.writechunk = e, r.writeencoding = t, !r.transforming) {
	          var o = this._readableState;(r.needTransform || o.needReadable || o.length < o.highWaterMark) && this._read(o.highWaterMark);
	        }
	      }, o.prototype._read = function () {
	        var e = this._transformState;null !== e.writechunk && e.writecb && !e.transforming ? (e.transforming = !0, this._transform(e.writechunk, e.writeencoding, e.afterTransform)) : e.needTransform = !0;
	      }, o.prototype._destroy = function (e, t) {
	        var n = this;i.prototype._destroy.call(this, e, function (e) {
	          t(e), n.emit("close");
	        });
	      };
	    }, { "./_stream_duplex": 78, "core-util-is": 31, inherits: 44 }], 82: [function (e, t) {
	      (function (n, o) {
	        "use strict";
	        function s(e) {
	          var t = this;this.next = null, this.entry = null, this.finish = function () {
	            B(t, e);
	          };
	        }function i(e) {
	          return P.from(e);
	        }function d(e) {
	          return P.isBuffer(e) || e instanceof O;
	        }function a() {}function c(t, n) {
	          T = T || e("./_stream_duplex"), t = t || {}, this.objectMode = !!t.objectMode, n instanceof T && (this.objectMode = this.objectMode || !!t.writableObjectMode);var o = t.highWaterMark,
	              i = this.objectMode ? 16 : 16384;this.highWaterMark = o || 0 === o ? o : i, this.highWaterMark = r(this.highWaterMark), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;var d = !1 === t.decodeStrings;this.decodeStrings = !d, this.defaultEncoding = t.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function (e) {
	            y(n, e);
	          }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new s(this);
	        }function p(t) {
	          return T = T || e("./_stream_duplex"), M.call(p, this) || this instanceof T ? void (this._writableState = new c(t, this), this.writable = !0, t && ("function" == typeof t.write && (this._write = t.write), "function" == typeof t.writev && (this._writev = t.writev), "function" == typeof t.destroy && (this._destroy = t.destroy), "function" == typeof t.final && (this._final = t.final)), R.call(this)) : new p(t);
	        }function l(e, t) {
	          var n = new Error("write after end");e.emit("error", n), I(t, n);
	        }function u(e, t, n, r) {
	          var o = !0,
	              s = !1;return null === n ? s = new TypeError("May not write null values to stream") : "string" != typeof n && void 0 !== n && !t.objectMode && (s = new TypeError("Invalid non-string/buffer chunk")), s && (e.emit("error", s), I(r, s), o = !1), o;
	        }function f(e, t, n) {
	          return e.objectMode || !1 === e.decodeStrings || "string" != typeof t || (t = P.from(t, n)), t;
	        }function h(e, t, n, r, o, s) {
	          if (!n) {
	            var i = f(t, r, o);r !== i && (n = !0, o = "buffer", r = i);
	          }var d = t.objectMode ? 1 : r.length;t.length += d;var a = t.length < t.highWaterMark;if (a || (t.needDrain = !0), t.writing || t.corked) {
	            var c = t.lastBufferedRequest;t.lastBufferedRequest = { chunk: r, encoding: o, isBuf: n, callback: s, next: null }, c ? c.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest, t.bufferedRequestCount += 1;
	          } else m(e, t, !1, d, r, o, s);return a;
	        }function m(e, t, n, r, o, s, i) {
	          t.writelen = r, t.writecb = i, t.writing = !0, t.sync = !0, n ? e._writev(o, t.onwrite) : e._write(o, s, t.onwrite), t.sync = !1;
	        }function g(e, t, n, r, o) {
	          --t.pendingcb, n ? (I(o, r), I(C, e, t), e._writableState.errorEmitted = !0, e.emit("error", r)) : (o(r), e._writableState.errorEmitted = !0, e.emit("error", r), C(e, t));
	        }function _(e) {
	          e.writing = !1, e.writecb = null, e.length -= e.writelen, e.writelen = 0;
	        }function y(e, t) {
	          var n = e._writableState,
	              r = n.sync,
	              o = n.writecb;if (_(n), t) g(e, n, r, t, o);else {
	            var s = x(n);s || n.corked || n.bufferProcessing || !n.bufferedRequest || k(e, n), r ? L(b, e, n, s, o) : b(e, n, s, o);
	          }
	        }function b(e, t, n, r) {
	          n || w(e, t), t.pendingcb--, r(), C(e, t);
	        }function w(e, t) {
	          0 === t.length && t.needDrain && (t.needDrain = !1, e.emit("drain"));
	        }function k(e, t) {
	          t.bufferProcessing = !0;var n = t.bufferedRequest;if (e._writev && n && n.next) {
	            var r = t.bufferedRequestCount,
	                o = Array(r),
	                i = t.corkedRequestsFree;i.entry = n;for (var d = 0, a = !0; n;) {
	              o[d] = n, n.isBuf || (a = !1), n = n.next, d += 1;
	            }o.allBuffers = a, m(e, t, !0, t.length, o, "", i.finish), t.pendingcb++, t.lastBufferedRequest = null, i.next ? (t.corkedRequestsFree = i.next, i.next = null) : t.corkedRequestsFree = new s(t);
	          } else {
	            for (; n;) {
	              var c = n.chunk,
	                  p = n.encoding,
	                  l = n.callback,
	                  u = t.objectMode ? 1 : c.length;if (m(e, t, !1, u, c, p, l), n = n.next, t.writing) break;
	            }null === n && (t.lastBufferedRequest = null);
	          }t.bufferedRequestCount = 0, t.bufferedRequest = n, t.bufferProcessing = !1;
	        }function x(e) {
	          return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing;
	        }function v(e, t) {
	          e._final(function (n) {
	            t.pendingcb--, n && e.emit("error", n), t.prefinished = !0, e.emit("prefinish"), C(e, t);
	          });
	        }function S(e, t) {
	          t.prefinished || t.finalCalled || ("function" == typeof e._final ? (t.pendingcb++, t.finalCalled = !0, I(v, e, t)) : (t.prefinished = !0, e.emit("prefinish")));
	        }function C(e, t) {
	          var n = x(t);return n && (S(e, t), 0 === t.pendingcb && (t.finished = !0, e.emit("finish"))), n;
	        }function E(e, t, n) {
	          t.ending = !0, C(e, t), n && (t.finished ? I(n) : e.once("finish", n)), t.ended = !0, e.writable = !1;
	        }function B(e, t, n) {
	          var r = e.entry;for (e.entry = null; r;) {
	            var o = r.callback;t.pendingcb--, o(n), r = r.next;
	          }t.corkedRequestsFree ? t.corkedRequestsFree.next = e : t.corkedRequestsFree = e;
	        }var I = e("process-nextick-args");t.exports = p;var L = !n.browser && -1 < ["v0.10", "v0.9."].indexOf(n.version.slice(0, 5)) ? setImmediate : I,
	            T;p.WritableState = c;var A = e("core-util-is");A.inherits = e("inherits");var U = { deprecate: e("util-deprecate") },
	            R = e("./internal/streams/stream"),
	            P = e("safe-buffer").Buffer,
	            O = o.Uint8Array || function () {},
	            H = e("./internal/streams/destroy");A.inherits(p, R), c.prototype.getBuffer = function () {
	          for (var e = this.bufferedRequest, t = []; e;) {
	            t.push(e), e = e.next;
	          }return t;
	        }, function () {
	          try {
	            Object.defineProperty(c.prototype, "buffer", { get: U.deprecate(function () {
	                return this.getBuffer();
	              }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003") });
	          } catch (e) {}
	        }();var M;"function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (M = Function.prototype[Symbol.hasInstance], Object.defineProperty(p, Symbol.hasInstance, { value: function value(e) {
	            return !!M.call(this, e) || e && e._writableState instanceof c;
	          } })) : M = function M(e) {
	          return e instanceof this;
	        }, p.prototype.pipe = function () {
	          this.emit("error", new Error("Cannot pipe, not readable"));
	        }, p.prototype.write = function (e, t, n) {
	          var r = this._writableState,
	              o = !1,
	              s = d(e) && !r.objectMode;return s && !P.isBuffer(e) && (e = i(e)), "function" == typeof t && (n = t, t = null), s ? t = "buffer" : !t && (t = r.defaultEncoding), "function" != typeof n && (n = a), r.ended ? l(this, n) : (s || u(this, r, e, n)) && (r.pendingcb++, o = h(this, r, s, e, t, n)), o;
	        }, p.prototype.cork = function () {
	          var e = this._writableState;e.corked++;
	        }, p.prototype.uncork = function () {
	          var e = this._writableState;e.corked && (e.corked--, !e.writing && !e.corked && !e.finished && !e.bufferProcessing && e.bufferedRequest && k(this, e));
	        }, p.prototype.setDefaultEncoding = function (e) {
	          if ("string" == typeof e && (e = e.toLowerCase()), !(-1 < ["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()))) throw new TypeError("Unknown encoding: " + e);return this._writableState.defaultEncoding = e, this;
	        }, p.prototype._write = function (e, t, n) {
	          n(new Error("_write() is not implemented"));
	        }, p.prototype._writev = null, p.prototype.end = function (e, t, n) {
	          var r = this._writableState;"function" == typeof e ? (n = e, e = null, t = null) : "function" == typeof t && (n = t, t = null), null !== e && e !== void 0 && this.write(e, t), r.corked && (r.corked = 1, this.uncork()), r.ending || r.finished || E(this, r, n);
	        }, Object.defineProperty(p.prototype, "destroyed", { get: function get() {
	            return void 0 !== this._writableState && this._writableState.destroyed;
	          }, set: function set(e) {
	            this._writableState && (this._writableState.destroyed = e);
	          } }), p.prototype.destroy = H.destroy, p.prototype._undestroy = H.undestroy, p.prototype._destroy = function (e, t) {
	          this.end(), t(e);
	        };
	      }).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global);
	    }, { "./_stream_duplex": 78, "./internal/streams/destroy": 84, "./internal/streams/stream": 85, _process: 69, "core-util-is": 31, inherits: 44, "process-nextick-args": 68, "safe-buffer": 94, "util-deprecate": 129 }], 83: [function (e, t) {
	      "use strict";
	      function n(e, t) {
	        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
	      }function r(e, t, n) {
	        e.copy(t, n);
	      }var o = e("safe-buffer").Buffer;t.exports = function () {
	        function e() {
	          n(this, e), this.head = null, this.tail = null, this.length = 0;
	        }return e.prototype.push = function (e) {
	          var t = { data: e, next: null };0 < this.length ? this.tail.next = t : this.head = t, this.tail = t, ++this.length;
	        }, e.prototype.unshift = function (e) {
	          var t = { data: e, next: this.head };0 === this.length && (this.tail = t), this.head = t, ++this.length;
	        }, e.prototype.shift = function () {
	          if (0 !== this.length) {
	            var e = this.head.data;return this.head = 1 === this.length ? this.tail = null : this.head.next, --this.length, e;
	          }
	        }, e.prototype.clear = function () {
	          this.head = this.tail = null, this.length = 0;
	        }, e.prototype.join = function (e) {
	          if (0 === this.length) return "";for (var t = this.head, n = "" + t.data; t = t.next;) {
	            n += e + t.data;
	          }return n;
	        }, e.prototype.concat = function (e) {
	          if (0 === this.length) return o.alloc(0);if (1 === this.length) return this.head.data;for (var t = o.allocUnsafe(e >>> 0), n = this.head, s = 0; n;) {
	            r(n.data, t, s), s += n.data.length, n = n.next;
	          }return t;
	        }, e;
	      }();
	    }, { "safe-buffer": 94 }], 84: [function (e, t) {
	      "use strict";
	      function n(e, t) {
	        e.emit("error", t);
	      }var r = e("process-nextick-args");t.exports = { destroy: function destroy(e, t) {
	          var o = this,
	              s = this._readableState && this._readableState.destroyed,
	              i = this._writableState && this._writableState.destroyed;return s || i ? void (t ? t(e) : e && (!this._writableState || !this._writableState.errorEmitted) && r(n, this, e)) : void (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(e || null, function (e) {
	            !t && e ? (r(n, o, e), o._writableState && (o._writableState.errorEmitted = !0)) : t && t(e);
	          }));
	        }, undestroy: function undestroy() {
	          this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
	        } };
	    }, { "process-nextick-args": 68 }], 85: [function (e, t) {
	      t.exports = e("events").EventEmitter;
	    }, { events: 37 }], 86: [function (e, t, n) {
	      n = t.exports = e("./lib/_stream_readable.js"), n.Stream = n, n.Readable = n, n.Writable = e("./lib/_stream_writable.js"), n.Duplex = e("./lib/_stream_duplex.js"), n.Transform = e("./lib/_stream_transform.js"), n.PassThrough = e("./lib/_stream_passthrough.js");
	    }, { "./lib/_stream_duplex.js": 78, "./lib/_stream_passthrough.js": 79, "./lib/_stream_readable.js": 80, "./lib/_stream_transform.js": 81, "./lib/_stream_writable.js": 82 }], 87: [function (e, t, n) {
	      function r(e, t, n, r) {
	        function s() {
	          S.removeEventListener("loadstart", s), n.autoplay && S.play();
	        }function d() {
	          S.removeEventListener("canplay", d), r(null, S);
	        }function u() {
	          S = t("iframe"), o(e, function (e, t) {
	            return e ? w(e) : void (S.src = t, ".pdf" !== x && (S.sandbox = "allow-forms allow-scripts"), r(null, S));
	          });
	        }function w(t) {
	          t.message = "Error rendering file \"" + e.name + "\": " + t.message, a(t.message), r(t);
	        }var x = l.extname(e.name).toLowerCase(),
	            v = 0,
	            S;0 <= g.indexOf(x) ? function () {
	          function r() {
	            a("Use MediaSource API for " + e.name), g(), S.addEventListener("error", u), S.addEventListener("loadstart", s), S.addEventListener("canplay", d);var t = new p(S),
	                n = t.createWriteStream(i(e.name));e.createReadStream().pipe(n), v && (S.currentTime = v);
	          }function c() {
	            a("Use Blob URL for " + e.name), g(), S.addEventListener("error", w), S.addEventListener("loadstart", s), S.addEventListener("canplay", d), o(e, function (e, t) {
	              return e ? w(e) : void (S.src = t, v && (S.currentTime = v));
	            });
	          }function l(e) {
	            a("videostream error: fallback to MediaSource API: %o", e.message || e), S.removeEventListener("error", l), S.removeEventListener("canplay", d), r();
	          }function u(t) {
	            return a("MediaSource API error: fallback to Blob URL: %o", t.message || t), "number" == typeof e.length && e.length > n.maxBlobLength ? (a("File length too large for Blob URL approach: %d (max: %d)", e.length, n.maxBlobLength), w(new Error("File length too large for Blob URL approach: " + e.length + " (max: " + n.maxBlobLength + ")"))) : void (S.removeEventListener("error", u), S.removeEventListener("canplay", d), c());
	          }function g() {
	            S || (S = t(_), S.addEventListener("progress", function () {
	              v = S.currentTime;
	            }));
	          }var _ = 0 <= m.indexOf(x) ? "video" : "audio";k ? 0 <= h.indexOf(x) ? function () {
	            a("Use `videostream` package for " + e.name), g(), S.addEventListener("error", l), S.addEventListener("loadstart", s), S.addEventListener("canplay", d), f(e, S);
	          }() : r() : c();
	        }() : 0 <= _.indexOf(x) ? function () {
	          S = t("audio"), o(e, function (e, t) {
	            return e ? w(e) : void (S.addEventListener("error", w), S.addEventListener("loadstart", s), S.addEventListener("canplay", d), S.src = t);
	          });
	        }() : 0 <= y.indexOf(x) ? function () {
	          S = t("img"), o(e, function (t, n) {
	            return t ? w(t) : void (S.src = n, S.alt = e.name, r(null, S));
	          });
	        }() : 0 <= b.indexOf(x) ? u() : function () {
	          a("Unknown file extension \"%s\" - will attempt to render into iframe", x);var t = "";e.createReadStream({ start: 0, end: 1e3 }).setEncoding("utf8").on("data", function (e) {
	            t += e;
	          }).on("end", function () {
	            c(t) ? (a("File extension \"%s\" appears ascii, so will render.", x), u()) : (a("File extension \"%s\" appears non-ascii, will not render.", x), r(new Error("Unsupported file type \"" + x + "\": Cannot append to DOM")));
	          }).on("error", r);
	        }();
	      }function o(e, t) {
	        var r = l.extname(e.name).toLowerCase();u(e.createReadStream(), n.mime[r], t);
	      }function s(e) {
	        if (null == e) throw new Error("file cannot be null or undefined");if ("string" != typeof e.name) throw new Error("missing or invalid file.name property");if ("function" != typeof e.createReadStream) throw new Error("missing or invalid file.createReadStream property");
	      }function i(e) {
	        var t = l.extname(e).toLowerCase();return { ".m4a": "audio/mp4; codecs=\"mp4a.40.5\"", ".m4v": "video/mp4; codecs=\"avc1.640029, mp4a.40.5\"", ".mkv": "video/webm; codecs=\"avc1.640029, mp4a.40.5\"", ".mp3": "audio/mpeg", ".mp4": "video/mp4; codecs=\"avc1.640029, mp4a.40.5\"", ".webm": "video/webm; codecs=\"vorbis, vp8\"" }[t];
	      }function d(e) {
	        null == e.autoplay && (e.autoplay = !0), null == e.controls && (e.controls = !0), null == e.maxBlobLength && (e.maxBlobLength = w);
	      }n.render = function (e, t, n, o) {
	        "function" == typeof n && (o = n, n = {}), n || (n = {}), o || (o = function o() {}), s(e), d(n), "string" == typeof t && (t = document.querySelector(t)), r(e, function (n) {
	          if (t.nodeName !== n.toUpperCase()) {
	            var r = l.extname(e.name).toLowerCase();throw new Error("Cannot render \"" + r + "\" inside a \"" + t.nodeName.toLowerCase() + "\" element, expected \"" + n + "\"");
	          }return t;
	        }, n, o);
	      }, n.append = function (e, t, n, o) {
	        function i(e) {
	          var r = a(e);return n.controls && (r.controls = !0), n.autoplay && (r.autoplay = !0), t.appendChild(r), r;
	        }function a(e) {
	          var n = document.createElement(e);return t.appendChild(n), n;
	        }if ("function" == typeof n && (o = n, n = {}), n || (n = {}), o || (o = function o() {}), s(e), d(n), "string" == typeof t && (t = document.querySelector(t)), t && ("VIDEO" === t.nodeName || "AUDIO" === t.nodeName)) throw new Error("Invalid video/audio node argument. Argument must be root element that video/audio tag will be appended to.");r(e, function (e) {
	          return "video" === e || "audio" === e ? i(e) : a(e);
	        }, n, function (e, t) {
	          e && t && t.remove(), o(e, t);
	        });
	      }, n.mime = e("./lib/mime.json");var a = e("debug")("render-media"),
	          c = e("is-ascii"),
	          p = e("mediasource"),
	          l = e("path"),
	          u = e("stream-to-blob-url"),
	          f = e("videostream"),
	          h = [".m4a", ".m4v", ".mp4"],
	          m = [".m4v", ".mkv", ".mp4", ".webm"],
	          g = [].concat(m, [".m4a", ".mp3"]),
	          _ = [".aac", ".oga", ".ogg", ".wav"],
	          y = [".bmp", ".gif", ".jpeg", ".jpg", ".png", ".svg"],
	          b = [".css", ".html", ".js", ".md", ".pdf", ".txt"],
	          w = 200000000,
	          k = "undefined" != typeof window && window.MediaSource;
	    }, { "./lib/mime.json": 88, debug: 89, "is-ascii": 45, mediasource: 52, path: 66, "stream-to-blob-url": 109, videostream: 131 }], 88: [function (e, t) {
	      t.exports = { ".3gp": "video/3gpp", ".aac": "audio/aac", ".aif": "audio/x-aiff", ".aiff": "audio/x-aiff", ".atom": "application/atom+xml", ".avi": "video/x-msvideo", ".bmp": "image/bmp", ".bz2": "application/x-bzip2", ".conf": "text/plain", ".css": "text/css", ".csv": "text/plain", ".diff": "text/x-diff", ".doc": "application/msword", ".flv": "video/x-flv", ".gif": "image/gif", ".gz": "application/x-gzip", ".htm": "text/html", ".html": "text/html", ".ico": "image/vnd.microsoft.icon", ".ics": "text/calendar", ".iso": "application/octet-stream", ".jar": "application/java-archive", ".jpeg": "image/jpeg", ".jpg": "image/jpeg", ".js": "application/javascript", ".json": "application/json", ".less": "text/css", ".log": "text/plain", ".m3u": "audio/x-mpegurl", ".m4a": "audio/mp4", ".m4v": "video/mp4", ".manifest": "text/cache-manifest", ".markdown": "text/x-markdown", ".mathml": "application/mathml+xml", ".md": "text/x-markdown", ".mid": "audio/midi", ".midi": "audio/midi", ".mov": "video/quicktime", ".mp3": "audio/mpeg", ".mp4": "video/mp4", ".mp4v": "video/mp4", ".mpeg": "video/mpeg", ".mpg": "video/mpeg", ".odp": "application/vnd.oasis.opendocument.presentation", ".ods": "application/vnd.oasis.opendocument.spreadsheet", ".odt": "application/vnd.oasis.opendocument.text", ".oga": "audio/ogg", ".ogg": "application/ogg", ".pdf": "application/pdf", ".png": "image/png", ".pps": "application/vnd.ms-powerpoint", ".ppt": "application/vnd.ms-powerpoint", ".ps": "application/postscript", ".psd": "image/vnd.adobe.photoshop", ".qt": "video/quicktime", ".rar": "application/x-rar-compressed", ".rdf": "application/rdf+xml", ".rss": "application/rss+xml", ".rtf": "application/rtf", ".svg": "image/svg+xml", ".svgz": "image/svg+xml", ".swf": "application/x-shockwave-flash", ".tar": "application/x-tar", ".tbz": "application/x-bzip-compressed-tar", ".text": "text/plain", ".tif": "image/tiff", ".tiff": "image/tiff", ".torrent": "application/x-bittorrent", ".ttf": "application/x-font-ttf", ".txt": "text/plain", ".wav": "audio/wav", ".webm": "video/webm", ".wma": "audio/x-ms-wma", ".wmv": "video/x-ms-wmv", ".xls": "application/vnd.ms-excel", ".xml": "application/xml", ".yaml": "text/yaml", ".yml": "text/yaml", ".zip": "application/zip" };
	    }, {}], 89: [function (e, t, n) {
	      arguments[4][15][0].apply(n, arguments);
	    }, { "./debug": 90, _process: 69, dup: 15 }], 90: [function (e, t, n) {
	      arguments[4][16][0].apply(n, arguments);
	    }, { dup: 16, ms: 60 }], 91: [function (e, t) {
	      (function (e) {
	        t.exports = function (t, n, r) {
	          function o(t) {
	            function n() {
	              r && r(t, d), r = null;
	            }i ? e.nextTick(n) : n();
	          }function s(e, n, r) {
	            if (d[e] = r, n && (l = !0), 0 == --c || n) o(n);else if (!l && u < a) {
	              var i;p ? (i = p[u], u += 1, t[i](function (e, t) {
	                s(i, e, t);
	              })) : (i = u, u += 1, t[i](function (e, t) {
	                s(i, e, t);
	              }));
	            }
	          }if ("number" != typeof n) throw new Error("second argument must be a Number");var i = !0,
	              d,
	              a,
	              c,
	              p,
	              l;Array.isArray(t) ? (d = [], c = a = t.length) : (p = Object.keys(t), d = {}, c = a = p.length);var u = n;c ? p ? p.some(function (e, r) {
	            if (t[e](function (t, n) {
	              s(e, t, n);
	            }), r === n - 1) return !0;
	          }) : t.some(function (e, t) {
	            if (e(function (e, n) {
	              s(t, e, n);
	            }), t === n - 1) return !0;
	          }) : o(null), i = !1;
	        };
	      }).call(this, e("_process"));
	    }, { _process: 69 }], 92: [function (e, t) {
	      (function (e) {
	        t.exports = function (t, n) {
	          function r(t) {
	            function r() {
	              n && n(t, d), n = null;
	            }s ? e.nextTick(r) : r();
	          }function o(e, t, n) {
	            d[e] = n, (0 == --a || t) && r(t);
	          }var s = !0,
	              d,
	              a,
	              i;Array.isArray(t) ? (d = [], a = t.length) : (i = Object.keys(t), d = {}, a = i.length), a ? i ? i.forEach(function (e) {
	            t[e](function (t, n) {
	              o(e, t, n);
	            });
	          }) : t.forEach(function (e, t) {
	            e(function (e, n) {
	              o(t, e, n);
	            });
	          }) : r(null), s = !1;
	        };
	      }).call(this, e("_process"));
	    }, { _process: 69 }], 93: [function (e, t) {
	      (function (e) {
	        (function () {
	          function n(e) {
	            "use strict";
	            for (var t = { fill: 0 }, s = function s(e) {
	              for (e += 9; 0 < e % 64; e += 1) {}return e;
	            }, a = function a(e, t) {
	              var n = new Uint8Array(e.buffer),
	                  r = t % 4,
	                  o = t - r;switch (r) {case 0:
	                  n[o + 3] = 0;case 1:
	                  n[o + 2] = 0;case 2:
	                  n[o + 1] = 0;case 3:
	                  n[o + 0] = 0;}for (var s = (t >> 2) + 1; s < e.length; s++) {
	                e[s] = 0;
	              }
	            }, c = function c(e, t, n) {
	              e[t >> 2] |= 128 << 24 - (t % 4 << 3), e[(-16 & (t >> 2) + 2) + 14] = 0 | n / 536870912, e[(-16 & (t >> 2) + 2) + 15] = n << 3;
	            }, p = function p(e, t, n, r, o) {
	              var s = this,
	                  i = o % 4,
	                  d = (r + i) % 4,
	                  a = r - d,
	                  c;switch (i) {case 0:
	                  e[o] = s.charCodeAt(n + 3);case 1:
	                  e[0 | o + 1 - (i << 1)] = s.charCodeAt(n + 2);case 2:
	                  e[0 | o + 2 - (i << 1)] = s.charCodeAt(n + 1);case 3:
	                  e[0 | o + 3 - (i << 1)] = s.charCodeAt(n);}if (!(r < d + i)) {
	                for (c = 4 - i; c < a; c = 0 | c + 4) {
	                  t[o + c >> 2] = s.charCodeAt(n + c) << 24 | s.charCodeAt(n + c + 1) << 16 | s.charCodeAt(n + c + 2) << 8 | s.charCodeAt(n + c + 3);
	                }switch (d) {case 3:
	                    e[0 | o + a + 1] = s.charCodeAt(n + a + 2);case 2:
	                    e[0 | o + a + 2] = s.charCodeAt(n + a + 1);case 1:
	                    e[0 | o + a + 3] = s.charCodeAt(n + a);}
	              }
	            }, l = function l(e, t, n, r, o) {
	              var s = this,
	                  i = o % 4,
	                  d = (r + i) % 4,
	                  a = r - d,
	                  c;switch (i) {case 0:
	                  e[o] = s[n + 3];case 1:
	                  e[0 | o + 1 - (i << 1)] = s[n + 2];case 2:
	                  e[0 | o + 2 - (i << 1)] = s[n + 1];case 3:
	                  e[0 | o + 3 - (i << 1)] = s[n];}if (!(r < d + i)) {
	                for (c = 4 - i; c < a; c = 0 | c + 4) {
	                  t[0 | o + c >> 2] = s[n + c] << 24 | s[n + c + 1] << 16 | s[n + c + 2] << 8 | s[n + c + 3];
	                }switch (d) {case 3:
	                    e[0 | o + a + 1] = s[n + a + 2];case 2:
	                    e[0 | o + a + 2] = s[n + a + 1];case 1:
	                    e[0 | o + a + 3] = s[n + a];}
	              }
	            }, u = function u(e, t, n, r, s) {
	              var i = this,
	                  d = s % 4,
	                  a = (r + d) % 4,
	                  c = r - a,
	                  p = new Uint8Array(o.readAsArrayBuffer(i.slice(n, n + r))),
	                  l;switch (d) {case 0:
	                  e[s] = p[3];case 1:
	                  e[0 | s + 1 - (d << 1)] = p[2];case 2:
	                  e[0 | s + 2 - (d << 1)] = p[1];case 3:
	                  e[0 | s + 3 - (d << 1)] = p[0];}if (!(r < a + d)) {
	                for (l = 4 - d; l < c; l = 0 | l + 4) {
	                  t[0 | s + l >> 2] = p[l] << 24 | p[l + 1] << 16 | p[l + 2] << 8 | p[l + 3];
	                }switch (a) {case 3:
	                    e[0 | s + c + 1] = p[c + 2];case 2:
	                    e[0 | s + c + 2] = p[c + 1];case 1:
	                    e[0 | s + c + 3] = p[c];}
	              }
	            }, f = function f(e) {
	              switch (r.getDataType(e)) {case "string":
	                  return p.bind(e);case "array":
	                  return l.bind(e);case "buffer":
	                  return l.bind(e);case "arraybuffer":
	                  return l.bind(new Uint8Array(e));case "view":
	                  return l.bind(new Uint8Array(e.buffer, e.byteOffset, e.byteLength));case "blob":
	                  return u.bind(e);}
	            }, h = Array(256), m = 0; 256 > m; m++) {
	              h[m] = (16 > m ? "0" : "") + m.toString(16);
	            }var i = function i(e) {
	              for (var t = new Uint8Array(e), n = Array(e.byteLength), r = 0; r < n.length; r++) {
	                n[r] = h[t[r]];
	              }return n.join("");
	            },
	                g = function g(e) {
	              var t;if (65536 >= e) return 65536;if (16777216 > e) for (t = 1; t < e; t <<= 1) {} else for (t = 16777216; t < e; t += 16777216) {}return t;
	            };(function (e) {
	              if (0 < e % 64) throw new Error("Chunk size must be a multiple of 128 bit");t.offset = 0, t.maxChunkLen = e, t.padMaxChunkLen = s(e), t.heap = new ArrayBuffer(g(t.padMaxChunkLen + 320 + 20)), t.h32 = new Int32Array(t.heap), t.h8 = new Int8Array(t.heap), t.core = new n._core({ Int32Array: Int32Array, DataView: DataView }, {}, t.heap), t.buffer = null;
	            })(e || 65536);var _ = function _(e, n) {
	              t.offset = 0;var r = new Int32Array(e, n + 320, 5);r[0] = 1732584193, r[1] = -271733879, r[2] = -1732584194, r[3] = 271733878, r[4] = -1009589776;
	            },
	                y = function y(e, n) {
	              var r = s(e),
	                  o = new Int32Array(t.heap, 0, r >> 2);return a(o, e), c(o, e, n), r;
	            },
	                b = function b(e, n, r, o) {
	              f(e)(t.h8, t.h32, n, r, o || 0);
	            },
	                w = function w(e, n, r, o, s) {
	              var i = r;b(e, n, r), s && (i = y(r, o)), t.core.hash(i, t.padMaxChunkLen);
	            },
	                k = function k(e, t) {
	              var n = new Int32Array(e, t + 320, 5),
	                  r = new Int32Array(5),
	                  o = new DataView(r.buffer);return o.setInt32(0, n[0], !1), o.setInt32(4, n[1], !1), o.setInt32(8, n[2], !1), o.setInt32(12, n[3], !1), o.setInt32(16, n[4], !1), r;
	            },
	                x = this.rawDigest = function (e) {
	              var n = e.byteLength || e.length || e.size || 0;_(t.heap, t.padMaxChunkLen);var r = 0,
	                  o = t.maxChunkLen;for (r = 0; n > r + o; r += o) {
	                w(e, r, o, n, !1);
	              }return w(e, r, n - r, n, !0), k(t.heap, t.padMaxChunkLen);
	            };this.digest = this.digestFromString = this.digestFromBuffer = this.digestFromArrayBuffer = function (e) {
	              return i(x(e).buffer);
	            }, this.resetState = function () {
	              return _(t.heap, t.padMaxChunkLen), this;
	            }, this.append = function (e) {
	              var n = 0,
	                  r = e.byteLength || e.length || e.size || 0,
	                  o = t.offset % t.maxChunkLen,
	                  s;for (t.offset += r; n < r;) {
	                s = d(r - n, t.maxChunkLen - o), b(e, n, s, o), o += s, n += s, o === t.maxChunkLen && (t.core.hash(t.maxChunkLen, t.padMaxChunkLen), o = 0);
	              }return this;
	            }, this.getState = function () {
	              var e = t.offset % t.maxChunkLen,
	                  n;if (!e) {
	                var r = new Int32Array(t.heap, t.padMaxChunkLen + 320, 5);n = r.buffer.slice(r.byteOffset, r.byteOffset + r.byteLength);
	              } else n = t.heap.slice(0);return { offset: t.offset, heap: n };
	            }, this.setState = function (e) {
	              if (t.offset = e.offset, 20 === e.heap.byteLength) {
	                var n = new Int32Array(t.heap, t.padMaxChunkLen + 320, 5);n.set(new Int32Array(e.heap));
	              } else t.h32.set(new Int32Array(e.heap));return this;
	            };var v = this.rawEnd = function () {
	              var e = t.offset,
	                  n = e % t.maxChunkLen,
	                  r = y(n, e);t.core.hash(r, t.padMaxChunkLen);var o = k(t.heap, t.padMaxChunkLen);return _(t.heap, t.padMaxChunkLen), o;
	            };this.end = function () {
	              return i(v().buffer);
	            };
	          }var r = { getDataType: function getDataType(t) {
	              if ("string" == typeof t) return "string";if (t instanceof Array) return "array";if ("undefined" != typeof e && e.Buffer && e.Buffer.isBuffer(t)) return "buffer";if (t instanceof ArrayBuffer) return "arraybuffer";if (t.buffer instanceof ArrayBuffer) return "view";if (t instanceof Blob) return "blob";throw new Error("Unsupported data type.");
	            } };if (n._core = function (e, t, n) {
	            "use asm";
	            var r = new e.Int32Array(n);return { hash: function hash(e, t) {
	                e |= 0, t |= 0;var n = 0,
	                    o = 0,
	                    s = 0,
	                    i = 0,
	                    d = 0,
	                    a = 0,
	                    c = 0,
	                    p = 0,
	                    l = 0,
	                    u = 0,
	                    f = 0,
	                    h = 0,
	                    m = 0,
	                    g = 0;for (s = 0 | r[t + 320 >> 2], d = 0 | r[t + 324 >> 2], c = 0 | r[t + 328 >> 2], l = 0 | r[t + 332 >> 2], f = 0 | r[t + 336 >> 2], n = 0; (0 | n) < (0 | e); n = 0 | n + 64) {
	                  for (i = s, a = d, p = c, u = l, h = f, o = 0; 64 > (0 | o); o = 0 | o + 4) {
	                    g = 0 | r[n + o >> 2], m = 0 | (0 | (s << 5 | s >>> 27) + (d & c | ~d & l)) + (0 | (0 | g + f) + 1518500249), f = l, l = c, c = d << 30 | d >>> 2, d = s, s = m, r[e + o >> 2] = g;
	                  }for (o = 0 | e + 64; (0 | o) < (0 | e + 80); o = 0 | o + 4) {
	                    g = (r[o - 12 >> 2] ^ r[o - 32 >> 2] ^ r[o - 56 >> 2] ^ r[o - 64 >> 2]) << 1 | (r[o - 12 >> 2] ^ r[o - 32 >> 2] ^ r[o - 56 >> 2] ^ r[o - 64 >> 2]) >>> 31, m = 0 | (0 | (s << 5 | s >>> 27) + (d & c | ~d & l)) + (0 | (0 | g + f) + 1518500249), f = l, l = c, c = d << 30 | d >>> 2, d = s, s = m, r[o >> 2] = g;
	                  }for (o = 0 | e + 80; (0 | o) < (0 | e + 160); o = 0 | o + 4) {
	                    g = (r[o - 12 >> 2] ^ r[o - 32 >> 2] ^ r[o - 56 >> 2] ^ r[o - 64 >> 2]) << 1 | (r[o - 12 >> 2] ^ r[o - 32 >> 2] ^ r[o - 56 >> 2] ^ r[o - 64 >> 2]) >>> 31, m = 0 | (0 | (s << 5 | s >>> 27) + (d ^ c ^ l)) + (0 | (0 | g + f) + 1859775393), f = l, l = c, c = d << 30 | d >>> 2, d = s, s = m, r[o >> 2] = g;
	                  }for (o = 0 | e + 160; (0 | o) < (0 | e + 240); o = 0 | o + 4) {
	                    g = (r[o - 12 >> 2] ^ r[o - 32 >> 2] ^ r[o - 56 >> 2] ^ r[o - 64 >> 2]) << 1 | (r[o - 12 >> 2] ^ r[o - 32 >> 2] ^ r[o - 56 >> 2] ^ r[o - 64 >> 2]) >>> 31, m = 0 | (0 | (s << 5 | s >>> 27) + (d & c | d & l | c & l)) + (0 | (0 | g + f) - 1894007588), f = l, l = c, c = d << 30 | d >>> 2, d = s, s = m, r[o >> 2] = g;
	                  }for (o = 0 | e + 240; (0 | o) < (0 | e + 320); o = 0 | o + 4) {
	                    g = (r[o - 12 >> 2] ^ r[o - 32 >> 2] ^ r[o - 56 >> 2] ^ r[o - 64 >> 2]) << 1 | (r[o - 12 >> 2] ^ r[o - 32 >> 2] ^ r[o - 56 >> 2] ^ r[o - 64 >> 2]) >>> 31, m = 0 | (0 | (s << 5 | s >>> 27) + (d ^ c ^ l)) + (0 | (0 | g + f) - 899497514), f = l, l = c, c = d << 30 | d >>> 2, d = s, s = m, r[o >> 2] = g;
	                  }s = 0 | s + i, d = 0 | d + a, c = 0 | c + p, l = 0 | l + u, f = 0 | f + h;
	                }r[t + 320 >> 2] = s, r[t + 324 >> 2] = d, r[t + 328 >> 2] = c, r[t + 332 >> 2] = l, r[t + 336 >> 2] = f;
	              } };
	          }, "undefined" == typeof t ? "undefined" != typeof window && (window.Rusha = n) : t.exports = n, "undefined" != typeof FileReaderSync) {
	            var o = new FileReaderSync(),
	                s = function s(e, t, n) {
	              try {
	                return n(null, e.digest(t));
	              } catch (t) {
	                return n(t);
	              }
	            },
	                i = function i(e, t, n, r, o) {
	              var s = new self.FileReader();s.onloadend = function () {
	                var d = s.result;t += s.result.byteLength;try {
	                  e.append(d);
	                } catch (t) {
	                  return void o(t);
	                }t < r.size ? i(e, t, n, r, o) : o(null, e.end());
	              }, s.readAsArrayBuffer(r.slice(t, t + n));
	            };self.onmessage = function (e) {
	              var t = e.data.data,
	                  r = e.data.file,
	                  o = e.data.id;if ("undefined" != typeof o && (r || t)) {
	                var d = e.data.blockSize || 4194304,
	                    a = new n(d);a.resetState();var c = function c(e, t) {
	                  e ? self.postMessage({ id: o, error: e.name }) : self.postMessage({ id: o, hash: t });
	                };t && s(a, t, c), r && i(a, 0, d, r, c);
	              }
	            };
	          }
	        })();
	      }).call(this, "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global);
	    }, {}], 94: [function (e, t, n) {
	      function r(e, t) {
	        for (var n in e) {
	          t[n] = e[n];
	        }
	      }function o(e, t, n) {
	        return i(e, t, n);
	      }var s = e("buffer"),
	          i = s.Buffer;i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? t.exports = s : (r(s, n), n.Buffer = o), r(i, o), o.from = function (e, t, n) {
	        if ("number" == typeof e) throw new TypeError("Argument must not be a number");return i(e, t, n);
	      }, o.alloc = function (e, t, n) {
	        if ("number" != typeof e) throw new TypeError("Argument must be a number");var r = i(e);return void 0 === t ? r.fill(0) : "string" == typeof n ? r.fill(t, n) : r.fill(t), r;
	      }, o.allocUnsafe = function (e) {
	        if ("number" != typeof e) throw new TypeError("Argument must be a number");return i(e);
	      }, o.allocUnsafeSlow = function (e) {
	        if ("number" != typeof e) throw new TypeError("Argument must be a number");return s.SlowBuffer(e);
	      };
	    }, { buffer: 27 }], 95: [function (e, t) {
	      (function (e) {
	        t.exports = function (t, n) {
	          var r = [];t.on("data", function (e) {
	            r.push(e);
	          }), t.once("end", function () {
	            n && n(null, e.concat(r)), n = null;
	          }), t.once("error", function (e) {
	            n && n(e), n = null;
	          });
	        };
	      }).call(this, e("buffer").Buffer);
	    }, { buffer: 27 }], 96: [function (e, t) {
	      (function (n) {
	        function r(e, t) {
	          e = "string" == typeof e ? { url: e } : Object.assign({}, e), t = c(t), e.url && o(e), null == e.headers && (e.headers = {}), null == e.maxRedirects && (e.maxRedirects = 10);var i;e.form && (i = "string" == typeof e.form ? e.form : p.stringify(e.form)), e.body && (i = e.json ? JSON.stringify(e.body) : e.body), e.json && (e.headers.accept = "application/json"), e.json && i && (e.headers["content-type"] = "application/json"), e.form && (e.headers["content-type"] = "application/x-www-form-urlencoded"), i && !s(i) && (e.headers["content-length"] = n.byteLength(i)), delete e.body, delete e.form, i && !e.method && (e.method = "POST"), e.method && (e.method = e.method.toUpperCase());var u = Object.keys(e.headers).some(function (e) {
	            return "accept-encoding" === e.toLowerCase();
	          });u || (e.headers["accept-encoding"] = "gzip, deflate");var f = "https:" === e.protocol ? a : d,
	              h = f.request(e, function (n) {
	            if (300 <= n.statusCode && 400 > n.statusCode && "location" in n.headers) return e.url = n.headers.location, n.resume(), void (0 < e.maxRedirects ? (e.maxRedirects -= 1, r(e, t)) : t(new Error("too many redirects")));var o = "function" == typeof l && "HEAD" !== e.method;t(null, o ? l(n) : n);
	          });return h.on("timeout", function () {
	            h.abort(), t(new Error("Request timed out"));
	          }), h.on("error", t), i && s(i) ? i.on("error", t).pipe(h) : h.end(i), h;
	        }function o(e) {
	          var t = u.parse(e.url);t.hostname && (e.hostname = t.hostname), t.port && (e.port = t.port), t.protocol && (e.protocol = t.protocol), t.auth && (e.auth = t.auth), e.path = t.path, delete e.url;
	        }function s(e) {
	          return "function" == typeof e.pipe;
	        }t.exports = r;var i = e("simple-concat"),
	            d = e("http"),
	            a = e("https"),
	            c = e("once"),
	            p = e("querystring"),
	            l = e("unzip-response"),
	            u = e("url");r.concat = function (e, t) {
	          return r(e, function (n, r) {
	            return n ? t(n) : void i(r, function (n, o) {
	              if (n) return t(n);if (e.json) try {
	                o = JSON.parse(o.toString());
	              } catch (e) {
	                return t(e, r, o);
	              }t(null, r, o);
	            });
	          });
	        }, ["get", "post", "put", "patch", "head", "delete"].forEach(function (e) {
	          r[e] = function (t, n) {
	            return "string" == typeof t && (t = { url: t }), t.method = e.toUpperCase(), r(t, n);
	          };
	        });
	      }).call(this, e("buffer").Buffer);
	    }, { buffer: 27, http: 105, https: 41, once: 63, querystring: 74, "simple-concat": 95, "unzip-response": 25, url: 124 }], 97: [function (e, t) {
	      (function (n) {
	        function r(e) {
	          var t = this;if (!(t instanceof r)) return new r(e);if (t._id = a(4).toString("hex").slice(0, 7), t._debug("new peer %o", e), e = Object.assign({ allowHalfOpen: !1 }, e), c.Duplex.call(t, e), t.channelName = e.initiator ? e.channelName || a(20).toString("hex") : null, t._isChromium = "undefined" != typeof window && !!window.webkitRTCPeerConnection, t.initiator = e.initiator || !1, t.channelConfig = e.channelConfig || r.channelConfig, t.config = e.config || r.config, t.constraints = t._transformConstraints(e.constraints || r.constraints), t.offerConstraints = t._transformConstraints(e.offerConstraints || {}), t.answerConstraints = t._transformConstraints(e.answerConstraints || {}), t.reconnectTimer = e.reconnectTimer || !1, t.sdpTransform = e.sdpTransform || function (e) {
	            return e;
	          }, t.stream = e.stream || !1, t.trickle = void 0 === e.trickle || e.trickle, t._earlyMessage = null, t.destroyed = !1, t.connected = !1, t.remoteAddress = void 0, t.remoteFamily = void 0, t.remotePort = void 0, t.localAddress = void 0, t.localPort = void 0, t._wrtc = e.wrtc && "object" == _typeof(e.wrtc) ? e.wrtc : i(), !t._wrtc) if ("undefined" == typeof window) throw new Error("No WebRTC support: Specify `opts.wrtc` option in this environment");else throw new Error("No WebRTC support: Not a supported browser");if (t._pcReady = !1, t._channelReady = !1, t._iceComplete = !1, t._channel = null, t._pendingCandidates = [], t._previousStreams = [], t._chunk = null, t._cb = null, t._interval = null, t._reconnectTimeout = null, t._pc = new t._wrtc.RTCPeerConnection(t.config, t.constraints), t._isWrtc = Array.isArray(t._pc.RTCIceConnectionStates), t._isReactNativeWebrtc = "number" == typeof t._pc._peerConnectionId, t._pc.oniceconnectionstatechange = function () {
	            t._onIceStateChange();
	          }, t._pc.onicegatheringstatechange = function () {
	            t._onIceStateChange();
	          }, t._pc.onsignalingstatechange = function () {
	            t._onSignalingStateChange();
	          }, t._pc.onicecandidate = function (e) {
	            t._onIceCandidate(e);
	          }, t.initiator) {
	            var n = !1;t._pc.onnegotiationneeded = function () {
	              n || t._createOffer(), n = !0;
	            }, t._setupData({ channel: t._pc.createDataChannel(t.channelName, t.channelConfig) });
	          } else t._pc.ondatachannel = function (e) {
	            t._setupData(e);
	          };"addTrack" in t._pc ? (t.stream && t.stream.getTracks().forEach(function (e) {
	            t._pc.addTrack(e, t.stream);
	          }), t._pc.ontrack = function (e) {
	            t._onTrack(e);
	          }) : (t.stream && t._pc.addStream(t.stream), t._pc.onaddstream = function (e) {
	            t._onAddStream(e);
	          }), t.initiator && t._isWrtc && t._pc.onnegotiationneeded(), t._onFinishBound = function () {
	            t._onFinish();
	          }, t.once("finish", t._onFinishBound);
	        }function o() {}t.exports = r;var s = e("debug")("simple-peer"),
	            i = e("get-browser-rtc"),
	            d = e("inherits"),
	            a = e("randombytes"),
	            c = e("readable-stream"),
	            p = 65536;d(r, c.Duplex), r.WEBRTC_SUPPORT = !!i(), r.config = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }, { urls: "stun:global.stun.twilio.com:3478?transport=udp" }] }, r.constraints = {}, r.channelConfig = {}, Object.defineProperty(r.prototype, "bufferSize", { get: function get() {
	            var e = this;return e._channel && e._channel.bufferedAmount || 0;
	          } }), r.prototype.address = function () {
	          var e = this;return { port: e.localPort, family: "IPv4", address: e.localAddress };
	        }, r.prototype.signal = function (e) {
	          var t = this;if (t.destroyed) throw new Error("cannot signal after peer is destroyed");if ("string" == typeof e) try {
	            e = JSON.parse(e);
	          } catch (t) {
	            e = {};
	          }t._debug("signal()"), e.candidate && (t._pc.remoteDescription ? t._addIceCandidate(e.candidate) : t._pendingCandidates.push(e.candidate)), e.sdp && t._pc.setRemoteDescription(new t._wrtc.RTCSessionDescription(e), function () {
	            t.destroyed || (t._pendingCandidates.forEach(function (e) {
	              t._addIceCandidate(e);
	            }), t._pendingCandidates = [], "offer" === t._pc.remoteDescription.type && t._createAnswer());
	          }, function (e) {
	            t._destroy(e);
	          }), e.sdp || e.candidate || t._destroy(new Error("signal() called with invalid signal data"));
	        }, r.prototype._addIceCandidate = function (e) {
	          var t = this;try {
	            t._pc.addIceCandidate(new t._wrtc.RTCIceCandidate(e), o, function (e) {
	              t._destroy(e);
	            });
	          } catch (e) {
	            t._destroy(new Error("error adding candidate: " + e.message));
	          }
	        }, r.prototype.send = function (e) {
	          var t = this;t._isWrtc && n.isBuffer(e) && (e = new Uint8Array(e)), t._channel.send(e);
	        }, r.prototype.destroy = function (e) {
	          var t = this;t._destroy(null, e);
	        }, r.prototype._destroy = function (e, t) {
	          var n = this;if (!n.destroyed) {
	            if (t && n.once("close", t), n._debug("destroy (error: %s)", e && (e.message || e)), n.readable = n.writable = !1, n._readableState.ended || n.push(null), n._writableState.finished || n.end(), n.destroyed = !0, n.connected = !1, n._pcReady = !1, n._channelReady = !1, n._previousStreams = null, n._earlyMessage = null, clearInterval(n._interval), clearTimeout(n._reconnectTimeout), n._interval = null, n._reconnectTimeout = null, n._chunk = null, n._cb = null, n._onFinishBound && n.removeListener("finish", n._onFinishBound), n._onFinishBound = null, n._pc) {
	              try {
	                n._pc.close();
	              } catch (e) {}n._pc.oniceconnectionstatechange = null, n._pc.onicegatheringstatechange = null, n._pc.onsignalingstatechange = null, n._pc.onicecandidate = null, "addTrack" in n._pc ? n._pc.ontrack = null : n._pc.onaddstream = null, n._pc.onnegotiationneeded = null, n._pc.ondatachannel = null;
	            }if (n._channel) {
	              try {
	                n._channel.close();
	              } catch (e) {}n._channel.onmessage = null, n._channel.onopen = null, n._channel.onclose = null, n._channel.onerror = null;
	            }n._pc = null, n._channel = null, e && n.emit("error", e), n.emit("close");
	          }
	        }, r.prototype._setupData = function (e) {
	          var t = this;return e.channel ? void (t._channel = e.channel, t._channel.binaryType = "arraybuffer", "number" == typeof t._channel.bufferedAmountLowThreshold && (t._channel.bufferedAmountLowThreshold = p), t.channelName = t._channel.label, t._channel.onmessage = function (e) {
	            t._channelReady ? t._onChannelMessage(e) : (t._earlyMessage = e, t._onChannelOpen());
	          }, t._channel.onbufferedamountlow = function () {
	            t._onChannelBufferedAmountLow();
	          }, t._channel.onopen = function () {
	            t._channelReady || t._onChannelOpen();
	          }, t._channel.onclose = function () {
	            t._onChannelClose();
	          }, t._channel.onerror = function (e) {
	            t._destroy(e);
	          }) : t._destroy(new Error("Data channel event is missing `channel` property"));
	        }, r.prototype._read = function () {}, r.prototype._write = function (e, t, n) {
	          var r = this;if (r.destroyed) return n(new Error("cannot write after peer is destroyed"));if (r.connected) {
	            try {
	              r.send(e);
	            } catch (e) {
	              return r._destroy(e);
	            }r._channel.bufferedAmount > p ? (r._debug("start backpressure: bufferedAmount %d", r._channel.bufferedAmount), r._cb = n) : n(null);
	          } else r._debug("write before connect"), r._chunk = e, r._cb = n;
	        }, r.prototype._onFinish = function () {
	          function e() {
	            setTimeout(function () {
	              t._destroy();
	            }, 1e3);
	          }var t = this;t.destroyed || (t.connected ? e() : t.once("connect", e));
	        }, r.prototype._createOffer = function () {
	          var e = this;e.destroyed || e._pc.createOffer(function (t) {
	            function n() {
	              var n = e._pc.localDescription || t;e._debug("signal"), e.emit("signal", { type: n.type, sdp: n.sdp });
	            }e.destroyed || (t.sdp = e.sdpTransform(t.sdp), e._pc.setLocalDescription(t, function () {
	              e.destroyed || (e.trickle || e._iceComplete ? n() : e.once("_iceComplete", n));
	            }, function (t) {
	              e._destroy(t);
	            }));
	          }, function (t) {
	            e._destroy(t);
	          }, e.offerConstraints);
	        }, r.prototype._createAnswer = function () {
	          var e = this;e.destroyed || e._pc.createAnswer(function (t) {
	            function n() {
	              var n = e._pc.localDescription || t;e._debug("signal"), e.emit("signal", { type: n.type, sdp: n.sdp });
	            }e.destroyed || (t.sdp = e.sdpTransform(t.sdp), e._pc.setLocalDescription(t, function () {
	              e.destroyed || (e.trickle || e._iceComplete ? n() : e.once("_iceComplete", n));
	            }, function (t) {
	              e._destroy(t);
	            }));
	          }, function (t) {
	            e._destroy(t);
	          }, e.answerConstraints);
	        }, r.prototype._onIceStateChange = function () {
	          var e = this;if (!e.destroyed) {
	            var t = e._pc.iceConnectionState,
	                n = e._pc.iceGatheringState;e._debug("iceStateChange (connection: %s) (gathering: %s)", t, n), e.emit("iceStateChange", t, n), ("connected" === t || "completed" === t) && (clearTimeout(e._reconnectTimeout), e._pcReady = !0, e._maybeReady()), "disconnected" === t && (e.reconnectTimer ? (clearTimeout(e._reconnectTimeout), e._reconnectTimeout = setTimeout(function () {
	              e._destroy();
	            }, e.reconnectTimer)) : e._destroy()), "failed" === t && e._destroy(new Error("Ice connection failed.")), "closed" === t && e._destroy();
	          }
	        }, r.prototype.getStats = function (e) {
	          var t = this;0 === t._pc.getStats.length ? t._pc.getStats().then(function (t) {
	            var n = [];t.forEach(function (e) {
	              n.push(e);
	            }), e(null, n);
	          }, function (t) {
	            e(t);
	          }) : t._isReactNativeWebrtc ? t._pc.getStats(null, function (t) {
	            var n = [];t.forEach(function (e) {
	              n.push(e);
	            }), e(null, n);
	          }, function (t) {
	            e(t);
	          }) : 0 < t._pc.getStats.length ? t._pc.getStats(function (t) {
	            var n = [];t.result().forEach(function (e) {
	              var t = {};e.names().forEach(function (n) {
	                t[n] = e.stat(n);
	              }), t.id = e.id, t.type = e.type, t.timestamp = e.timestamp, n.push(t);
	            }), e(null, n);
	          }, function (t) {
	            e(t);
	          }) : e(null, []);
	        }, r.prototype._maybeReady = function () {
	          var e = this;e._debug("maybeReady pc %s channel %s", e._pcReady, e._channelReady);e.connected || e._connecting || !e._pcReady || !e._channelReady || (e._connecting = !0, e.getStats(function (t, n) {
	            function r(t) {
	              var n = s[t.localCandidateId];n && n.ip ? (e.localAddress = n.ip, e.localPort = +n.port) : n && n.ipAddress ? (e.localAddress = n.ipAddress, e.localPort = +n.portNumber) : "string" == typeof t.googLocalAddress && (n = t.googLocalAddress.split(":"), e.localAddress = n[0], e.localPort = +n[1]);var r = o[t.remoteCandidateId];r && r.ip ? (e.remoteAddress = r.ip, e.remotePort = +r.port) : r && r.ipAddress ? (e.remoteAddress = r.ipAddress, e.remotePort = +r.portNumber) : "string" == typeof t.googRemoteAddress && (r = t.googRemoteAddress.split(":"), e.remoteAddress = r[0], e.remotePort = +r[1]), e.remoteFamily = "IPv4", e._debug("connect local: %s:%s remote: %s:%s", e.localAddress, e.localPort, e.remoteAddress, e.remotePort);
	            }if (!e.destroyed) {
	              t && (n = []), e._connecting = !1, e.connected = !0;var o = {},
	                  s = {},
	                  i = {};if (n.forEach(function (e) {
	                ("remotecandidate" === e.type || "remote-candidate" === e.type) && (o[e.id] = e), ("localcandidate" === e.type || "local-candidate" === e.type) && (s[e.id] = e), ("candidatepair" === e.type || "candidate-pair" === e.type) && (i[e.id] = e);
	              }), n.forEach(function (e) {
	                "transport" === e.type && r(i[e.selectedCandidatePairId]), ("googCandidatePair" === e.type && "true" === e.googActiveConnection || ("candidatepair" === e.type || "candidate-pair" === e.type) && e.selected) && r(e);
	              }), e._chunk) {
	                try {
	                  e.send(e._chunk);
	                } catch (t) {
	                  return e._destroy(t);
	                }e._chunk = null, e._debug("sent chunk from \"write before connect\"");var d = e._cb;e._cb = null, d(null);
	              }"number" != typeof e._channel.bufferedAmountLowThreshold && (e._interval = setInterval(function () {
	                e._onInterval();
	              }, 150), e._interval.unref && e._interval.unref()), e._debug("connect"), e.emit("connect"), e._earlyMessage && (e._onChannelMessage(e._earlyMessage), e._earlyMessage = null);
	            }
	          }));
	        }, r.prototype._onInterval = function () {
	          this._cb && this._channel && !(this._channel.bufferedAmount > p) && this._onChannelBufferedAmountLow();
	        }, r.prototype._onSignalingStateChange = function () {
	          var e = this;e.destroyed || (e._debug("signalingStateChange %s", e._pc.signalingState), e.emit("signalingStateChange", e._pc.signalingState));
	        }, r.prototype._onIceCandidate = function (e) {
	          var t = this;t.destroyed || (e.candidate && t.trickle ? t.emit("signal", { candidate: { candidate: e.candidate.candidate, sdpMLineIndex: e.candidate.sdpMLineIndex, sdpMid: e.candidate.sdpMid } }) : !e.candidate && (t._iceComplete = !0, t.emit("_iceComplete")));
	        }, r.prototype._onChannelMessage = function (e) {
	          var t = this;if (!t.destroyed) {
	            var r = e.data;r instanceof ArrayBuffer && (r = n.from(r)), t.push(r);
	          }
	        }, r.prototype._onChannelBufferedAmountLow = function () {
	          var e = this;if (!e.destroyed && e._cb) {
	            e._debug("ending backpressure: bufferedAmount %d", e._channel.bufferedAmount);var t = e._cb;e._cb = null, t(null);
	          }
	        }, r.prototype._onChannelOpen = function () {
	          var e = this;e.connected || e.destroyed || (e._debug("on channel open"), e._channelReady = !0, e._maybeReady());
	        }, r.prototype._onChannelClose = function () {
	          var e = this;e.destroyed || (e._debug("on channel close"), e._destroy());
	        }, r.prototype._onAddStream = function (e) {
	          var t = this;t.destroyed || (t._debug("on add stream"), t.emit("stream", e.stream));
	        }, r.prototype._onTrack = function (e) {
	          var t = this;if (!t.destroyed) {
	            t._debug("on track");var n = e.streams[0].id;-1 !== t._previousStreams.indexOf(n) || (t._previousStreams.push(n), t.emit("stream", e.streams[0]));
	          }
	        }, r.prototype._debug = function () {
	          var e = this,
	              t = [].slice.call(arguments);t[0] = "[" + e._id + "] " + t[0], s.apply(null, t);
	        }, r.prototype._transformConstraints = function (e) {
	          var t = this;if (0 === Object.keys(e).length) return e;if ((e.mandatory || e.optional) && !t._isChromium) {
	            var n = Object.assign({}, e.optional, e.mandatory);return void 0 !== n.OfferToReceiveVideo && (n.offerToReceiveVideo = n.OfferToReceiveVideo, delete n.OfferToReceiveVideo), void 0 !== n.OfferToReceiveAudio && (n.offerToReceiveAudio = n.OfferToReceiveAudio, delete n.OfferToReceiveAudio), n;
	          }return e.mandatory || e.optional || !t._isChromium ? e : (void 0 !== e.offerToReceiveVideo && (e.OfferToReceiveVideo = e.offerToReceiveVideo, delete e.offerToReceiveVideo), void 0 !== e.offerToReceiveAudio && (e.OfferToReceiveAudio = e.offerToReceiveAudio, delete e.offerToReceiveAudio), { mandatory: e });
	        };
	      }).call(this, e("buffer").Buffer);
	    }, { buffer: 27, debug: 98, "get-browser-rtc": 40, inherits: 44, randombytes: 76, "readable-stream": 86 }], 98: [function (e, t, n) {
	      arguments[4][15][0].apply(n, arguments);
	    }, { "./debug": 99, _process: 69, dup: 15 }], 99: [function (e, t, n) {
	      arguments[4][16][0].apply(n, arguments);
	    }, { dup: 16, ms: 60 }], 100: [function (e, t) {
	      function n(e) {
	        return i.digest(e);
	      }function r(e) {
	        for (var t = e.length, n = new Uint8Array(t), r = 0; r < t; r++) {
	          n[r] = e.charCodeAt(r);
	        }return n;
	      }function o(e) {
	        for (var t = e.length, n = [], r = 0, o; r < t; r++) {
	          o = e[r], n.push((o >>> 4).toString(16)), n.push((15 & o).toString(16));
	        }return n.join("");
	      }var s = e("rusha"),
	          i = new s(),
	          d = "undefined" == typeof window ? self : window,
	          a = d.crypto || d.msCrypto || {},
	          c = a.subtle || a.webkitSubtle;try {
	        c.digest({ name: "sha-1" }, new Uint8Array()).catch(function () {
	          c = !1;
	        });
	      } catch (e) {
	        c = !1;
	      }t.exports = function (e, t) {
	        return c ? void ("string" == typeof e && (e = r(e)), c.digest({ name: "sha-1" }, e).then(function (e) {
	          t(o(new Uint8Array(e)));
	        }, function () {
	          t(n(e));
	        })) : void setTimeout(t, 0, n(e));
	      }, t.exports.sync = n;
	    }, { rusha: 93 }], 101: [function (e, t) {
	      (function (n) {
	        function r(e) {
	          var t = this;if (!(t instanceof r)) return new r(e);if (e || (e = {}), "string" == typeof e && (e = { url: e }), null == e.url && null == e.socket) throw new Error("Missing required `url` or `socket` option");if (null != e.url && null != e.socket) throw new Error("Must specify either `url` or `socket` option, not both");if (t._id = d(4).toString("hex").slice(0, 7), t._debug("new websocket: %o", e), e = Object.assign({ allowHalfOpen: !1 }, e), a.Duplex.call(t, e), t.connected = !1, t.destroyed = !1, t._chunk = null, t._cb = null, t._interval = null, e.socket) t.url = e.socket.url, t._ws = e.socket;else {
	            t.url = e.url;try {
	              t._ws = "function" == typeof c ? new p(e.url, e) : new p(e.url);
	            } catch (e) {
	              return void n.nextTick(function () {
	                t._destroy(e);
	              });
	            }
	          }t._ws.binaryType = "arraybuffer", t._ws.onopen = function () {
	            t._onOpen();
	          }, t._ws.onmessage = function (e) {
	            t._onMessage(e);
	          }, t._ws.onclose = function () {
	            t._onClose();
	          }, t._ws.onerror = function () {
	            t._destroy(new Error("connection error to " + t.url));
	          }, t._onFinishBound = function () {
	            t._onFinish();
	          }, t.once("finish", t._onFinishBound);
	        }t.exports = r;var o = e("safe-buffer").Buffer,
	            s = e("debug")("simple-websocket"),
	            i = e("inherits"),
	            d = e("randombytes"),
	            a = e("readable-stream"),
	            c = e("ws"),
	            p = "function" == typeof c ? c : WebSocket,
	            l = 65536;i(r, a.Duplex), r.WEBSOCKET_SUPPORT = !!p, r.prototype.send = function (e) {
	          this._ws.send(e);
	        }, r.prototype.destroy = function (e) {
	          this._destroy(null, e);
	        }, r.prototype._destroy = function (e, t) {
	          var n = this;if (!n.destroyed) {
	            if (t && n.once("close", t), n._debug("destroy (error: %s)", e && (e.message || e)), n.readable = n.writable = !1, n._readableState.ended || n.push(null), n._writableState.finished || n.end(), n.connected = !1, n.destroyed = !0, clearInterval(n._interval), n._interval = null, n._chunk = null, n._cb = null, n._onFinishBound && n.removeListener("finish", n._onFinishBound), n._onFinishBound = null, n._ws) {
	              var r = n._ws,
	                  o = function o() {
	                r.onclose = null;
	              };if (r.readyState === p.CLOSED) o();else try {
	                r.onclose = o, r.close();
	              } catch (e) {
	                o();
	              }r.onopen = null, r.onmessage = null, r.onerror = null;
	            }n._ws = null, e && n.emit("error", e), n.emit("close");
	          }
	        }, r.prototype._read = function () {}, r.prototype._write = function (e, t, n) {
	          if (this.destroyed) return n(new Error("cannot write after socket is destroyed"));if (this.connected) {
	            try {
	              this.send(e);
	            } catch (e) {
	              return this._destroy(e);
	            }"function" != typeof c && this._ws.bufferedAmount > l ? (this._debug("start backpressure: bufferedAmount %d", this._ws.bufferedAmount), this._cb = n) : n(null);
	          } else this._debug("write before connect"), this._chunk = e, this._cb = n;
	        }, r.prototype._onFinish = function () {
	          function e() {
	            setTimeout(function () {
	              t._destroy();
	            }, 1e3);
	          }var t = this;t.destroyed || (t.connected ? e() : t.once("connect", e));
	        }, r.prototype._onMessage = function (e) {
	          if (!this.destroyed) {
	            var t = e.data;t instanceof ArrayBuffer && (t = o.from(t)), this.push(t);
	          }
	        }, r.prototype._onOpen = function () {
	          var e = this;if (!(e.connected || e.destroyed)) {
	            if (e.connected = !0, e._chunk) {
	              try {
	                e.send(e._chunk);
	              } catch (t) {
	                return e._destroy(t);
	              }e._chunk = null, e._debug("sent chunk from \"write before connect\"");var t = e._cb;e._cb = null, t(null);
	            }"function" != typeof c && (e._interval = setInterval(function () {
	              e._onInterval();
	            }, 150), e._interval.unref && e._interval.unref()), e._debug("connect"), e.emit("connect");
	          }
	        }, r.prototype._onInterval = function () {
	          if (this._cb && this._ws && !(this._ws.bufferedAmount > l)) {
	            this._debug("ending backpressure: bufferedAmount %d", this._ws.bufferedAmount);var e = this._cb;this._cb = null, e(null);
	          }
	        }, r.prototype._onClose = function () {
	          this.destroyed || (this._debug("on close"), this._destroy());
	        }, r.prototype._debug = function () {
	          var e = [].slice.call(arguments);e[0] = "[" + this._id + "] " + e[0], s.apply(null, e);
	        };
	      }).call(this, e("_process"));
	    }, { _process: 69, debug: 102, inherits: 44, randombytes: 76, "readable-stream": 86, "safe-buffer": 94, ws: 25 }], 102: [function (e, t, n) {
	      arguments[4][15][0].apply(n, arguments);
	    }, { "./debug": 103, _process: 69, dup: 15 }], 103: [function (e, t, n) {
	      arguments[4][16][0].apply(n, arguments);
	    }, { dup: 16, ms: 60 }], 104: [function (e, t) {
	      var n = 1,
	          r = 65535,
	          o = 4,
	          s = setInterval(function () {
	        n = n + 1 & r;
	      }, 0 | 1e3 / o);s.unref && s.unref(), t.exports = function (e) {
	        var t = o * (e || 5),
	            s = [0],
	            i = 1,
	            d = n - 1 & r;return function (e) {
	          var a = n - d & r;for (a > t && (a = t), d = n; a--;) {
	            i == t && (i = 0), s[i] = s[0 == i ? t - 1 : i - 1], i++;
	          }e && (s[i - 1] += e);var c = s[i - 1],
	              p = s.length < t ? 0 : s[i == t ? 0 : i];return s.length < o ? c : (c - p) * o / s.length;
	        };
	      };
	    }, {}], 105: [function (e, t, n) {
	      (function (t) {
	        var r = e("./lib/request"),
	            o = e("xtend"),
	            s = e("builtin-status-codes"),
	            i = e("url"),
	            d = n;d.request = function (e, n) {
	          e = "string" == typeof e ? i.parse(e) : o(e);var s = -1 === t.location.protocol.search(/^https?:$/) ? "http:" : "",
	              d = e.protocol || s,
	              a = e.hostname || e.host,
	              c = e.port,
	              p = e.path || "/";a && -1 !== a.indexOf(":") && (a = "[" + a + "]"), e.url = (a ? d + "//" + a : "") + (c ? ":" + c : "") + p, e.method = (e.method || "GET").toUpperCase(), e.headers = e.headers || {};var l = new r(e);return n && l.on("response", n), l;
	        }, d.get = function (e, t) {
	          var n = d.request(e, t);return n.end(), n;
	        }, d.Agent = function () {}, d.Agent.defaultMaxSockets = 4, d.STATUS_CODES = s, d.METHODS = ["CHECKOUT", "CONNECT", "COPY", "DELETE", "GET", "HEAD", "LOCK", "M-SEARCH", "MERGE", "MKACTIVITY", "MKCOL", "MOVE", "NOTIFY", "OPTIONS", "PATCH", "POST", "PROPFIND", "PROPPATCH", "PURGE", "PUT", "REPORT", "SEARCH", "SUBSCRIBE", "TRACE", "UNLOCK", "UNSUBSCRIBE"];
	      }).call(this, "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global);
	    }, { "./lib/request": 107, "builtin-status-codes": 28, url: 124, xtend: 133 }], 106: [function (e, t, n) {
	      (function (e) {
	        function t() {
	          if (d != void 0) return d;if (e.XMLHttpRequest) {
	            d = new e.XMLHttpRequest();try {
	              d.open("GET", e.XDomainRequest ? "/" : "https://example.com");
	            } catch (t) {
	              d = null;
	            }
	          } else d = null;return d;
	        }function r(e) {
	          var n = t();if (!n) return !1;try {
	            return n.responseType = e, n.responseType === e;
	          } catch (t) {}return !1;
	        }function o(e) {
	          return "function" == typeof e;
	        }n.fetch = o(e.fetch) && o(e.ReadableStream), n.blobConstructor = !1;try {
	          new Blob([new ArrayBuffer(1)]), n.blobConstructor = !0;
	        } catch (t) {}var s = "undefined" != typeof e.ArrayBuffer,
	            i = s && o(e.ArrayBuffer.prototype.slice),
	            d;n.arraybuffer = n.fetch || s && r("arraybuffer"), n.msstream = !n.fetch && i && r("ms-stream"), n.mozchunkedarraybuffer = !n.fetch && s && r("moz-chunked-arraybuffer"), n.overrideMimeType = n.fetch || !!t() && o(t().overrideMimeType), n.vbArray = o(e.VBArray), d = null;
	      }).call(this, "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global);
	    }, {}], 107: [function (e, t) {
	      (function (n, r, o) {
	        function s(e, t) {
	          return d.fetch && t ? "fetch" : d.mozchunkedarraybuffer ? "moz-chunked-arraybuffer" : d.msstream ? "ms-stream" : d.arraybuffer && e ? "arraybuffer" : d.vbArray && e ? "text:vbarray" : "text";
	        }function i(e) {
	          try {
	            var t = e.status;return null !== t && 0 !== t;
	          } catch (t) {
	            return !1;
	          }
	        }var d = e("./capability"),
	            a = e("inherits"),
	            c = e("./response"),
	            p = e("readable-stream"),
	            l = e("to-arraybuffer"),
	            u = c.IncomingMessage,
	            f = c.readyStates,
	            h = t.exports = function (e) {
	          var t = this;p.Writable.call(t), t._opts = e, t._body = [], t._headers = {}, e.auth && t.setHeader("Authorization", "Basic " + new o(e.auth).toString("base64")), Object.keys(e.headers).forEach(function (n) {
	            t.setHeader(n, e.headers[n]);
	          });var n = !0,
	              r;if ("disable-fetch" === e.mode || "timeout" in e) n = !1, r = !0;else if ("prefer-streaming" === e.mode) r = !1;else if ("allow-wrong-content-type" === e.mode) r = !d.overrideMimeType;else if (!e.mode || "default" === e.mode || "prefer-fast" === e.mode) r = !0;else throw new Error("Invalid value for opts.mode");t._mode = s(r, n), t.on("finish", function () {
	            t._onFinish();
	          });
	        };a(h, p.Writable), h.prototype.setHeader = function (e, t) {
	          var n = this,
	              r = e.toLowerCase();-1 !== m.indexOf(r) || (n._headers[r] = { name: e, value: t });
	        }, h.prototype.getHeader = function (e) {
	          var t = this._headers[e.toLowerCase()];return t ? t.value : null;
	        }, h.prototype.removeHeader = function (e) {
	          var t = this;delete t._headers[e.toLowerCase()];
	        }, h.prototype._onFinish = function () {
	          var e = this;if (!e._destroyed) {
	            var t = e._opts,
	                s = e._headers,
	                i = null;"GET" !== t.method && "HEAD" !== t.method && (d.blobConstructor ? i = new r.Blob(e._body.map(function (e) {
	              return l(e);
	            }), { type: (s["content-type"] || {}).value || "" }) : i = o.concat(e._body).toString());var a = [];if (Object.keys(s).forEach(function (e) {
	              var t = s[e].name,
	                  n = s[e].value;Array.isArray(n) ? n.forEach(function (e) {
	                a.push([t, e]);
	              }) : a.push([t, n]);
	            }), "fetch" === e._mode) r.fetch(e._opts.url, { method: e._opts.method, headers: a, body: i || void 0, mode: "cors", credentials: t.withCredentials ? "include" : "same-origin" }).then(function (t) {
	              e._fetchResponse = t, e._connect();
	            }, function (t) {
	              e.emit("error", t);
	            });else {
	              var c = e._xhr = new r.XMLHttpRequest();try {
	                c.open(e._opts.method, e._opts.url, !0);
	              } catch (t) {
	                return void n.nextTick(function () {
	                  e.emit("error", t);
	                });
	              }"responseType" in c && (c.responseType = e._mode.split(":")[0]), "withCredentials" in c && (c.withCredentials = !!t.withCredentials), "text" === e._mode && "overrideMimeType" in c && c.overrideMimeType("text/plain; charset=x-user-defined"), "timeout" in t && (c.timeout = t.timeout, c.ontimeout = function () {
	                e.emit("timeout");
	              }), a.forEach(function (e) {
	                c.setRequestHeader(e[0], e[1]);
	              }), e._response = null, c.onreadystatechange = function () {
	                switch (c.readyState) {case f.LOADING:case f.DONE:
	                    e._onXHRProgress();}
	              }, "moz-chunked-arraybuffer" === e._mode && (c.onprogress = function () {
	                e._onXHRProgress();
	              }), c.onerror = function () {
	                e._destroyed || e.emit("error", new Error("XHR error"));
	              };try {
	                c.send(i);
	              } catch (t) {
	                return void n.nextTick(function () {
	                  e.emit("error", t);
	                });
	              }
	            }
	          }
	        }, h.prototype._onXHRProgress = function () {
	          var e = this;!i(e._xhr) || e._destroyed || (!e._response && e._connect(), e._response._onXHRProgress());
	        }, h.prototype._connect = function () {
	          var e = this;e._destroyed || (e._response = new u(e._xhr, e._fetchResponse, e._mode), e._response.on("error", function (t) {
	            e.emit("error", t);
	          }), e.emit("response", e._response));
	        }, h.prototype._write = function (e, t, n) {
	          var r = this;r._body.push(e), n();
	        }, h.prototype.abort = h.prototype.destroy = function () {
	          var e = this;e._destroyed = !0, e._response && (e._response._destroyed = !0), e._xhr && e._xhr.abort();
	        }, h.prototype.end = function (e, t, n) {
	          var r = this;"function" == typeof e && (n = e, e = void 0), p.Writable.prototype.end.call(r, e, t, n);
	        }, h.prototype.flushHeaders = function () {}, h.prototype.setTimeout = function () {}, h.prototype.setNoDelay = function () {}, h.prototype.setSocketKeepAlive = function () {};var m = ["accept-charset", "accept-encoding", "access-control-request-headers", "access-control-request-method", "connection", "content-length", "cookie", "cookie2", "date", "dnt", "expect", "host", "keep-alive", "origin", "referer", "te", "trailer", "transfer-encoding", "upgrade", "user-agent", "via"];
	      }).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global, e("buffer").Buffer);
	    }, { "./capability": 106, "./response": 108, _process: 69, buffer: 27, inherits: 44, "readable-stream": 86, "to-arraybuffer": 115 }], 108: [function (e, t, n) {
	      (function (t, r, o) {
	        var s = e("./capability"),
	            i = e("inherits"),
	            d = e("readable-stream"),
	            a = n.readyStates = { UNSENT: 0, OPENED: 1, HEADERS_RECEIVED: 2, LOADING: 3, DONE: 4 },
	            c = n.IncomingMessage = function (e, n, r) {
	          var i = this;if (d.Readable.call(i), i._mode = r, i.headers = {}, i.rawHeaders = [], i.trailers = {}, i.rawTrailers = [], i.on("end", function () {
	            t.nextTick(function () {
	              i.emit("close");
	            });
	          }), "fetch" === r) {
	            var _e = function _e() {
	              a.read().then(function (t) {
	                return i._destroyed ? void 0 : t.done ? void i.push(null) : void (i.push(new o(t.value)), _e());
	              }).catch(function (e) {
	                i.emit("error", e);
	              });
	            };
	
	            i._fetchResponse = n, i.url = n.url, i.statusCode = n.status, i.statusMessage = n.statusText, n.headers.forEach(function (e, t) {
	              i.headers[t.toLowerCase()] = e, i.rawHeaders.push(t, e);
	            });var a = n.body.getReader();_e();
	          } else {
	            i._xhr = e, i._pos = 0, i.url = e.responseURL, i.statusCode = e.status, i.statusMessage = e.statusText;var c = e.getAllResponseHeaders().split(/\r?\n/);if (c.forEach(function (e) {
	              var t = e.match(/^([^:]+):\s*(.*)/);if (t) {
	                var n = t[1].toLowerCase();"set-cookie" === n ? (void 0 === i.headers[n] && (i.headers[n] = []), i.headers[n].push(t[2])) : void 0 === i.headers[n] ? i.headers[n] = t[2] : i.headers[n] += ", " + t[2], i.rawHeaders.push(t[1], t[2]);
	              }
	            }), i._charset = "x-user-defined", !s.overrideMimeType) {
	              var p = i.rawHeaders["mime-type"];if (p) {
	                var l = p.match(/;\s*charset=([^;])(;|$)/);l && (i._charset = l[1].toLowerCase());
	              }i._charset || (i._charset = "utf-8");
	            }
	          }
	        };i(c, d.Readable), c.prototype._read = function () {}, c.prototype._onXHRProgress = function () {
	          var e = this,
	              t = e._xhr,
	              n = null;switch (e._mode) {case "text:vbarray":
	              if (t.readyState !== a.DONE) break;try {
	                n = new r.VBArray(t.responseBody).toArray();
	              } catch (t) {}if (null !== n) {
	                e.push(new o(n));break;
	              }case "text":
	              try {
	                n = t.responseText;
	              } catch (t) {
	                e._mode = "text:vbarray";break;
	              }if (n.length > e._pos) {
	                var s = n.substr(e._pos);if ("x-user-defined" === e._charset) {
	                  for (var d = new o(s.length), c = 0; c < s.length; c++) {
	                    d[c] = 255 & s.charCodeAt(c);
	                  }e.push(d);
	                } else e.push(s, e._charset);e._pos = n.length;
	              }break;case "arraybuffer":
	              if (t.readyState !== a.DONE || !t.response) break;n = t.response, e.push(new o(new Uint8Array(n)));break;case "moz-chunked-arraybuffer":
	              if (n = t.response, t.readyState !== a.LOADING || !n) break;e.push(new o(new Uint8Array(n)));break;case "ms-stream":
	              if (n = t.response, t.readyState !== a.LOADING) break;var i = new r.MSStreamReader();i.onprogress = function () {
	                i.result.byteLength > e._pos && (e.push(new o(new Uint8Array(i.result.slice(e._pos)))), e._pos = i.result.byteLength);
	              }, i.onload = function () {
	                e.push(null);
	              }, i.readAsArrayBuffer(n);}e._xhr.readyState === a.DONE && "ms-stream" !== e._mode && e.push(null);
	        };
	      }).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global, e("buffer").Buffer);
	    }, { "./capability": 106, _process: 69, buffer: 27, inherits: 44, "readable-stream": 86 }], 109: [function (e, t) {
	      var n = e("stream-to-blob");t.exports = function e(t, r, o) {
	        return "function" == typeof r ? e(t, null, r) : void n(t, r, function (e, t) {
	          if (e) return o(e);var n = URL.createObjectURL(t);o(null, n);
	        });
	      };
	    }, { "stream-to-blob": 110 }], 110: [function (e, t) {
	      var n = e("once");t.exports = function e(t, r, o) {
	        if ("function" == typeof r) return e(t, null, r);o = n(o);var s = [];t.on("data", function (e) {
	          s.push(e);
	        }).on("end", function () {
	          var e = r ? new Blob(s, { type: r }) : new Blob(s);o(null, e);
	        }).on("error", o);
	      };
	    }, { once: 63 }], 111: [function (e, t) {
	      (function (n) {
	        var r = e("once");t.exports = function (e, t, o) {
	          o = r(o);var s = new n(t),
	              i = 0;e.on("data", function (e) {
	            e.copy(s, i), i += e.length;
	          }).on("end", function () {
	            o(null, s);
	          }).on("error", o);
	        };
	      }).call(this, e("buffer").Buffer);
	    }, { buffer: 27, once: 63 }], 112: [function (e, t, n) {
	      "use strict";
	      function r(e) {
	        if (!e) return "utf8";for (var t;;) {
	          switch (e) {case "utf8":case "utf-8":
	              return "utf8";case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":
	              return "utf16le";case "latin1":case "binary":
	              return "latin1";case "base64":case "ascii":case "hex":
	              return e;default:
	              if (t) return;e = ("" + e).toLowerCase(), t = !0;}
	        }
	      }function o(e) {
	        var t = r(e);if ("string" != typeof t && (g.isEncoding === _ || !_(e))) throw new Error("Unknown encoding: " + e);return t || e;
	      }function s(e) {
	        this.encoding = o(e);var t;switch (this.encoding) {case "utf16le":
	            this.text = p, this.end = l, t = 4;break;case "utf8":
	            this.fillLast = c, t = 4;break;case "base64":
	            this.text = u, this.end = f, t = 3;break;default:
	            return this.write = h, void (this.end = m);}this.lastNeed = 0, this.lastTotal = 0, this.lastChar = g.allocUnsafe(t);
	      }function d(e) {
	        if (127 >= e) return 0;return 6 == e >> 5 ? 2 : 14 == e >> 4 ? 3 : 30 == e >> 3 ? 4 : -1;
	      }function a(e, t, n) {
	        var r = t.length - 1;if (r < n) return 0;var o = d(t[r]);return 0 <= o ? (0 < o && (e.lastNeed = o - 1), o) : --r < n ? 0 : (o = d(t[r]), 0 <= o) ? (0 < o && (e.lastNeed = o - 2), o) : --r < n ? 0 : (o = d(t[r]), 0 <= o ? (0 < o && (2 === o ? o = 0 : e.lastNeed = o - 3), o) : 0);
	      }function i(e, t, n) {
	        if (128 != (192 & t[0])) return e.lastNeed = 0, "\uFFFD".repeat(n);if (1 < e.lastNeed && 1 < t.length) {
	          if (128 != (192 & t[1])) return e.lastNeed = 1, "\uFFFD".repeat(n + 1);if (2 < e.lastNeed && 2 < t.length && 128 != (192 & t[2])) return e.lastNeed = 2, "\uFFFD".repeat(n + 2);
	        }
	      }function c(e) {
	        var t = this.lastTotal - this.lastNeed,
	            n = i(this, e, t);return void 0 === n ? this.lastNeed <= e.length ? (e.copy(this.lastChar, t, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : void (e.copy(this.lastChar, t, 0, e.length), this.lastNeed -= e.length) : n;
	      }function p(e, t) {
	        if (0 == (e.length - t) % 2) {
	          var n = e.toString("utf16le", t);if (n) {
	            var r = n.charCodeAt(n.length - 1);if (55296 <= r && 56319 >= r) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1], n.slice(0, -1);
	          }return n;
	        }return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = e[e.length - 1], e.toString("utf16le", t, e.length - 1);
	      }function l(e) {
	        var t = e && e.length ? this.write(e) : "";if (this.lastNeed) {
	          var n = this.lastTotal - this.lastNeed;return t + this.lastChar.toString("utf16le", 0, n);
	        }return t;
	      }function u(e, t) {
	        var r = (e.length - t) % 3;return 0 == r ? e.toString("base64", t) : (this.lastNeed = 3 - r, this.lastTotal = 3, 1 == r ? this.lastChar[0] = e[e.length - 1] : (this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1]), e.toString("base64", t, e.length - r));
	      }function f(e) {
	        var t = e && e.length ? this.write(e) : "";return this.lastNeed ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : t;
	      }function h(e) {
	        return e.toString(this.encoding);
	      }function m(e) {
	        return e && e.length ? this.write(e) : "";
	      }var g = e("safe-buffer").Buffer,
	          _ = g.isEncoding || function (e) {
	        switch (e = "" + e, e && e.toLowerCase()) {case "hex":case "utf8":case "utf-8":case "ascii":case "binary":case "base64":case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":case "raw":
	            return !0;default:
	            return !1;}
	      };n.StringDecoder = s, s.prototype.write = function (e) {
	        if (0 === e.length) return "";var t, n;if (this.lastNeed) {
	          if (t = this.fillLast(e), void 0 === t) return "";n = this.lastNeed, this.lastNeed = 0;
	        } else n = 0;return n < e.length ? t ? t + this.text(e, n) : this.text(e, n) : t || "";
	      }, s.prototype.end = function (e) {
	        var t = e && e.length ? this.write(e) : "";return this.lastNeed ? t + "\uFFFD".repeat(this.lastTotal - this.lastNeed) : t;
	      }, s.prototype.text = function (e, t) {
	        var n = a(this, e, t);if (!this.lastNeed) return e.toString("utf8", t);this.lastTotal = n;var r = e.length - (n - this.lastNeed);return e.copy(this.lastChar, 0, r), e.toString("utf8", t, r);
	      }, s.prototype.fillLast = function (e) {
	        return this.lastNeed <= e.length ? (e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : void (e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length), this.lastNeed -= e.length);
	      };
	    }, { "safe-buffer": 94 }], 113: [function (e, t, n) {
	      var r = e("./thirty-two");n.encode = r.encode, n.decode = r.decode;
	    }, { "./thirty-two": 114 }], 114: [function (e, t, n) {
	      (function (e) {
	        "use strict";
	        function t(e) {
	          var t = r(e.length / 5);return 0 == e.length % 5 ? t : t + 1;
	        }var o = [255, 255, 26, 27, 28, 29, 30, 31, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 255, 255, 255, 255, 255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 255, 255, 255, 255, 255];n.encode = function (n) {
	          e.isBuffer(n) || (n = new e(n));for (var r = 0, o = 0, s = 0, i = 0, d = new e(8 * t(n)); r < n.length;) {
	            var a = n[r];3 < s ? (i = a & 255 >> s, s = (s + 5) % 8, i = i << s | (r + 1 < n.length ? n[r + 1] : 0) >> 8 - s, r++) : (i = 31 & a >> 8 - (s + 5), s = (s + 5) % 8, 0 == s && r++), d[o] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".charCodeAt(i), o++;
	          }for (r = o; r < d.length; r++) {
	            d[r] = 61;
	          }return d;
	        }, n.decode = function (t) {
	          var n = 0,
	              r = 0,
	              d = 0,
	              a;e.isBuffer(t) || (t = new e(t));for (var c = new e(s(5 * t.length / 8)), p = 0; p < t.length && !(61 === t[p]); p++) {
	            var i = t[p] - 48;if (i < o.length) r = o[i], 3 >= n ? (n = (n + 5) % 8, 0 == n ? (a |= r, c[d] = a, d++, a = 0) : a |= 255 & r << 8 - n) : (n = (n + 5) % 8, a |= 255 & r >>> n, c[d] = a, d++, a = 255 & r << 8 - n);else throw new Error("Invalid input - it is not base32 encoded string");
	          }return c.slice(0, d);
	        };
	      }).call(this, e("buffer").Buffer);
	    }, { buffer: 27 }], 115: [function (e, t) {
	      var n = e("buffer").Buffer;t.exports = function (e) {
	        if (e instanceof Uint8Array) {
	          if (0 === e.byteOffset && e.byteLength === e.buffer.byteLength) return e.buffer;if ("function" == typeof e.buffer.slice) return e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
	        }if (n.isBuffer(e)) {
	          for (var t = new Uint8Array(e.length), r = e.length, o = 0; o < r; o++) {
	            t[o] = e[o];
	          }return t.buffer;
	        }throw new Error("Argument must be a Buffer");
	      };
	    }, { buffer: 27 }], 116: [function (e, t) {
	      (function (n) {
	        function o(e) {
	          function t(e, t) {
	            var n = new i(t);return n.on("warning", r._onWarning), n.on("error", r._onError), n.listen(e), r._internalDHT = !0, n;
	          }var r = this;if (!(r instanceof o)) return new o(e);if (d.call(r), !e.peerId) throw new Error("Option `peerId` is required");if (!e.infoHash) throw new Error("Option `infoHash` is required");if (!n.browser && !e.port) throw new Error("Option `port` is required");r.peerId = "string" == typeof e.peerId ? e.peerId : e.peerId.toString("hex"), r.infoHash = "string" == typeof e.infoHash ? e.infoHash : e.infoHash.toString("hex"), r._port = e.port, r._userAgent = e.userAgent, r.destroyed = !1, r._announce = e.announce || [], r._intervalMs = e.intervalMs || 900000, r._trackerOpts = null, r._dhtAnnouncing = !1, r._dhtTimeout = !1, r._internalDHT = !1, r._onWarning = function (e) {
	            r.emit("warning", e);
	          }, r._onError = function (e) {
	            r.emit("error", e);
	          }, r._onDHTPeer = function (e, t) {
	            t.toString("hex") !== r.infoHash || r.emit("peer", e.host + ":" + e.port, "dht");
	          }, r._onTrackerPeer = function (e) {
	            r.emit("peer", e, "tracker");
	          }, r._onTrackerAnnounce = function () {
	            r.emit("trackerAnnounce");
	          }, !1 === e.tracker ? r.tracker = null : e.tracker && "object" == _typeof(e.tracker) ? (r._trackerOpts = a(e.tracker), r.tracker = r._createTracker()) : r.tracker = r._createTracker(), r.dht = !1 === e.dht || "function" != typeof i ? null : e.dht && "function" == typeof e.dht.addNode ? e.dht : e.dht && "object" == _typeof(e.dht) ? t(e.dhtPort, e.dht) : t(e.dhtPort), r.dht && (r.dht.on("peer", r._onDHTPeer), r._dhtAnnounce());
	        }t.exports = o;var s = e("debug")("torrent-discovery"),
	            i = e("bittorrent-dht/client"),
	            d = e("events").EventEmitter,
	            a = e("xtend"),
	            c = e("inherits"),
	            p = e("run-parallel"),
	            l = e("bittorrent-tracker/client");c(o, d), o.prototype.updatePort = function (e) {
	          var t = this;e === t._port || (t._port = e, t.dht && t._dhtAnnounce(), t.tracker && (t.tracker.stop(), t.tracker.destroy(function () {
	            t.tracker = t._createTracker();
	          })));
	        }, o.prototype.complete = function (e) {
	          this.tracker && this.tracker.complete(e);
	        }, o.prototype.destroy = function (e) {
	          var t = this;if (!t.destroyed) {
	            t.destroyed = !0, clearTimeout(t._dhtTimeout);var n = [];t.tracker && (t.tracker.stop(), t.tracker.removeListener("warning", t._onWarning), t.tracker.removeListener("error", t._onError), t.tracker.removeListener("peer", t._onTrackerPeer), t.tracker.removeListener("update", t._onTrackerAnnounce), n.push(function (e) {
	              t.tracker.destroy(e);
	            })), t.dht && t.dht.removeListener("peer", t._onDHTPeer), t._internalDHT && (t.dht.removeListener("warning", t._onWarning), t.dht.removeListener("error", t._onError), n.push(function (e) {
	              t.dht.destroy(e);
	            })), p(n, e), t.dht = null, t.tracker = null, t._announce = null;
	          }
	        }, o.prototype._createTracker = function () {
	          var e = a(this._trackerOpts, { infoHash: this.infoHash, announce: this._announce, peerId: this.peerId, port: this._port, userAgent: this._userAgent }),
	              t = new l(e);return t.on("warning", this._onWarning), t.on("error", this._onError), t.on("peer", this._onTrackerPeer), t.on("update", this._onTrackerAnnounce), t.setInterval(this._intervalMs), t.start(), t;
	        }, o.prototype._dhtAnnounce = function () {
	          function e() {
	            return t._intervalMs + r(Math.random() * t._intervalMs / 5);
	          }var t = this;t._dhtAnnouncing || (s("dht announce"), t._dhtAnnouncing = !0, clearTimeout(t._dhtTimeout), t.dht.announce(t.infoHash, t._port, function (n) {
	            t._dhtAnnouncing = !1, s("dht announce complete"), n && t.emit("warning", n), t.emit("dhtAnnounce"), t.destroyed || (t._dhtTimeout = setTimeout(function () {
	              t._dhtAnnounce();
	            }, e()), t._dhtTimeout.unref && t._dhtTimeout.unref());
	          }));
	        };
	      }).call(this, e("_process"));
	    }, { _process: 69, "bittorrent-dht/client": 25, "bittorrent-tracker/client": 17, debug: 117, events: 37, inherits: 44, "run-parallel": 92, xtend: 133 }], 117: [function (e, t, n) {
	      arguments[4][15][0].apply(n, arguments);
	    }, { "./debug": 118, _process: 69, dup: 15 }], 118: [function (e, t, n) {
	      arguments[4][16][0].apply(n, arguments);
	    }, { dup: 16, ms: 60 }], 119: [function (e, t) {
	      (function (e) {
	        function n(e) {
	          return this instanceof n ? void (this.length = e, this.missing = e, this.sources = null, this._chunks = s(e / r), this._remainder = e % r || r, this._buffered = 0, this._buffer = null, this._cancellations = null, this._reservations = 0, this._flushed = !1) : new n(e);
	        }t.exports = n;var r = 16384;n.BLOCK_LENGTH = r, n.prototype.chunkLength = function (e) {
	          return e === this._chunks - 1 ? this._remainder : r;
	        }, n.prototype.chunkLengthRemaining = function (e) {
	          return this.length - e * r;
	        }, n.prototype.chunkOffset = function (e) {
	          return e * r;
	        }, n.prototype.reserve = function () {
	          return this.init() ? this._cancellations.length ? this._cancellations.pop() : this._reservations < this._chunks ? this._reservations++ : -1 : -1;
	        }, n.prototype.reserveRemaining = function () {
	          if (!this.init()) return -1;if (this._reservations < this._chunks) {
	            var e = this._reservations;return this._reservations = this._chunks, e;
	          }return -1;
	        }, n.prototype.cancel = function (e) {
	          this.init() && this._cancellations.push(e);
	        }, n.prototype.cancelRemaining = function (e) {
	          this.init() && (this._reservations = e);
	        }, n.prototype.get = function (e) {
	          return this.init() ? this._buffer[e] : null;
	        }, n.prototype.set = function (e, t, n) {
	          if (!this.init()) return !1;for (var o = t.length, i = s(o / r), d = 0; d < i; d++) {
	            if (!this._buffer[e + d]) {
	              var a = d * r,
	                  c = t.slice(a, a + r);this._buffered++, this._buffer[e + d] = c, this.missing -= c.length, -1 === this.sources.indexOf(n) && this.sources.push(n);
	            }
	          }return this._buffered === this._chunks;
	        }, n.prototype.flush = function () {
	          if (!this._buffer || this._chunks !== this._buffered) return null;var t = e.concat(this._buffer, this.length);return this._buffer = null, this._cancellations = null, this.sources = null, this._flushed = !0, t;
	        }, n.prototype.init = function () {
	          return !this._flushed && (!!this._buffer || (this._buffer = Array(this._chunks), this._cancellations = [], this.sources = [], !0));
	        };
	      }).call(this, e("buffer").Buffer);
	    }, { buffer: 27 }], 120: [function (e, t) {
	      (function (n) {
	        var r = e("is-typedarray").strict;t.exports = function (e) {
	          if (r(e)) {
	            var t = new n(e.buffer);return e.byteLength !== e.buffer.byteLength && (t = t.slice(e.byteOffset, e.byteOffset + e.byteLength)), t;
	          }return new n(e);
	        };
	      }).call(this, e("buffer").Buffer);
	    }, { buffer: 27, "is-typedarray": 48 }], 121: [function (e, t, n) {
	      (function (e) {
	        var t = 4294967295;n.encodingLength = function () {
	          return 8;
	        }, n.encode = function (n, o, s) {
	          o || (o = new e(8)), s || (s = 0);var i = r(n / t);return o.writeUInt32BE(i, s), o.writeUInt32BE(n - i * t, s + 4), o;
	        }, n.decode = function (n, r) {
	          r || (r = 0), n || (n = new e(4)), r || (r = 0);var o = n.readUInt32BE(r),
	              s = n.readUInt32BE(r + 4);return o * t + s;
	        }, n.encode.bytes = 8, n.decode.bytes = 8;
	      }).call(this, e("buffer").Buffer);
	    }, { buffer: 27 }], 122: [function (e, t) {
	      "use strict";
	      function n(e, t) {
	        for (var n = 1, r = e.length, o = e[0], s = e[0], d = 1; d < r; ++d) {
	          if (s = o, o = e[d], t(o, s)) {
	            if (d === n) {
	              n++;continue;
	            }e[n++] = o;
	          }
	        }return e.length = n, e;
	      }function r(e) {
	        for (var t = 1, n = e.length, r = e[0], o = e[0], s = 1; s < n; ++s, o = r) {
	          if (o = r, r = e[s], r !== o) {
	            if (s === t) {
	              t++;continue;
	            }e[t++] = r;
	          }
	        }return e.length = t, e;
	      }t.exports = function (e, t, o) {
	        return 0 === e.length ? e : t ? (o || e.sort(t), n(e, t)) : (o || e.sort(), r(e));
	      };
	    }, {}], 123: [function (e, t) {
	      t.exports = function (e, t) {
	        if (!(t >= e.length || 0 > t)) {
	          var n = e.pop();if (t < e.length) {
	            var r = e[t];return e[t] = n, r;
	          }return n;
	        }
	      };
	    }, {}], 124: [function (e, t, n) {
	      "use strict";
	      function r() {
	        this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
	      }function o(e, t, n) {
	        if (e && d.isObject(e) && e instanceof r) return e;var o = new r();return o.parse(e, t, n), o;
	      }var s = e("punycode"),
	          d = e("./util");n.parse = o, n.resolve = function (e, t) {
	        return o(e, !1, !0).resolve(t);
	      }, n.resolveObject = function (e, t) {
	        return e ? o(e, !1, !0).resolveObject(t) : t;
	      }, n.format = function (e) {
	        return d.isString(e) && (e = o(e)), e instanceof r ? e.format() : r.prototype.format.call(e);
	      }, n.Url = r;var a = /^([a-z0-9.+-]+:)/i,
	          i = /:[0-9]*$/,
	          c = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
	          p = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", "\"", "`", " ", "\r", "\n", "\t"]),
	          u = ["'"].concat(p),
	          l = ["%", "/", "?", ";", "#"].concat(u),
	          f = ["/", "?", "#"],
	          h = /^[+a-z0-9A-Z_-]{0,63}$/,
	          m = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
	          g = { javascript: !0, "javascript:": !0 },
	          _ = { javascript: !0, "javascript:": !0 },
	          y = { http: !0, https: !0, ftp: !0, gopher: !0, file: !0, "http:": !0, "https:": !0, "ftp:": !0, "gopher:": !0, "file:": !0 },
	          b = e("querystring");r.prototype.parse = function (e, t, n) {
	        if (!d.isString(e)) throw new TypeError("Parameter 'url' must be a string, not " + (typeof e === "undefined" ? "undefined" : _typeof(e)));var r = e.indexOf("?"),
	            o = -1 !== r && r < e.indexOf("#") ? "?" : "#",
	            w = e.split(o),
	            x = /\\/g;w[0] = w[0].replace(x, "/"), e = w.join(o);var v = e;if (v = v.trim(), !n && 1 === e.split("#").length) {
	          var S = c.exec(v);if (S) return this.path = v, this.href = v, this.pathname = S[1], S[2] ? (this.search = S[2], this.query = t ? b.parse(this.search.substr(1)) : this.search.substr(1)) : t && (this.search = "", this.query = {}), this;
	        }var C = a.exec(v);if (C) {
	          C = C[0];var E = C.toLowerCase();this.protocol = E, v = v.substr(C.length);
	        }if (n || C || v.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	          var B = "//" === v.substr(0, 2);B && !(C && _[C]) && (v = v.substr(2), this.slashes = !0);
	        }if (!_[C] && (B || C && !y[C])) {
	          for (var I = -1, L = 0, i; L < f.length; L++) {
	            i = v.indexOf(f[L]), -1 !== i && (-1 == I || i < I) && (I = i);
	          }var T, A;A = -1 === I ? v.lastIndexOf("@") : v.lastIndexOf("@", I), -1 !== A && (T = v.slice(0, A), v = v.slice(A + 1), this.auth = decodeURIComponent(T)), I = -1;for (var L = 0, i; L < l.length; L++) {
	            i = v.indexOf(l[L]), -1 !== i && (-1 === I || i < I) && (I = i);
	          }-1 === I && (I = v.length), this.host = v.slice(0, I), v = v.slice(I), this.parseHost(), this.hostname = this.hostname || "";var U = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];if (!U) for (var R = this.hostname.split(/\./), L = 0, P = R.length, O; L < P; L++) {
	            if (O = R[L], O && !O.match(h)) {
	              for (var H = "", M = 0, q = O.length; M < q; M++) {
	                H += 127 < O.charCodeAt(M) ? "x" : O[M];
	              }if (!H.match(h)) {
	                var k = R.slice(0, L),
	                    j = R.slice(L + 1),
	                    N = O.match(m);N && (k.push(N[1]), j.unshift(N[2])), j.length && (v = "/" + j.join(".") + v), this.hostname = k.join(".");break;
	              }
	            }
	          }this.hostname = this.hostname.length > 255 ? "" : this.hostname.toLowerCase(), U || (this.hostname = s.toASCII(this.hostname));var F = this.port ? ":" + this.port : "",
	              p = this.hostname || "";this.host = p + F, this.href += this.host, U && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== v[0] && (v = "/" + v));
	        }if (!g[E]) for (var L = 0, P = u.length, D; L < P; L++) {
	          if (D = u[L], -1 !== v.indexOf(D)) {
	            var W = encodeURIComponent(D);W === D && (W = escape(D)), v = v.split(D).join(W);
	          }
	        }var z = v.indexOf("#");-1 !== z && (this.hash = v.substr(z), v = v.slice(0, z));var V = v.indexOf("?");if (-1 === V ? t && (this.search = "", this.query = {}) : (this.search = v.substr(V), this.query = v.substr(V + 1), t && (this.query = b.parse(this.query)), v = v.slice(0, V)), v && (this.pathname = v), y[E] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
	          var F = this.pathname || "",
	              G = this.search || "";this.path = F + G;
	        }return this.href = this.format(), this;
	      }, r.prototype.format = function () {
	        var e = this.auth || "";e && (e = encodeURIComponent(e), e = e.replace(/%3A/i, ":"), e += "@");var t = this.protocol || "",
	            n = this.pathname || "",
	            r = this.hash || "",
	            o = !1,
	            s = "";this.host ? o = e + this.host : this.hostname && (o = e + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (o += ":" + this.port)), this.query && d.isObject(this.query) && Object.keys(this.query).length && (s = b.stringify(this.query));var i = this.search || s && "?" + s || "";return t && ":" !== t.substr(-1) && (t += ":"), this.slashes || (!t || y[t]) && !1 !== o ? (o = "//" + (o || ""), n && "/" !== n.charAt(0) && (n = "/" + n)) : !o && (o = ""), r && "#" !== r.charAt(0) && (r = "#" + r), i && "?" !== i.charAt(0) && (i = "?" + i), n = n.replace(/[?#]/g, function (e) {
	          return encodeURIComponent(e);
	        }), i = i.replace("#", "%23"), t + o + n + i + r;
	      }, r.prototype.resolve = function (e) {
	        return this.resolveObject(o(e, !1, !0)).format();
	      }, r.prototype.resolveObject = function (e) {
	        if (d.isString(e)) {
	          var t = new r();t.parse(e, !1, !0), e = t;
	        }for (var n = new r(), o = Object.keys(this), a = 0, c; a < o.length; a++) {
	          c = o[a], n[c] = this[c];
	        }if (n.hash = e.hash, "" === e.href) return n.href = n.format(), n;if (e.slashes && !e.protocol) {
	          for (var l = Object.keys(e), u = 0, f; u < l.length; u++) {
	            f = l[u], "protocol" !== f && (n[f] = e[f]);
	          }return y[n.protocol] && n.hostname && !n.pathname && (n.path = n.pathname = "/"), n.href = n.format(), n;
	        }if (e.protocol && e.protocol !== n.protocol) {
	          if (!y[e.protocol]) {
	            for (var h = Object.keys(e), m = 0, g; m < h.length; m++) {
	              g = h[m], n[g] = e[g];
	            }return n.href = n.format(), n;
	          }if (n.protocol = e.protocol, !e.host && !_[e.protocol]) {
	            for (var b = (e.pathname || "").split("/"); b.length && !(e.host = b.shift());) {}e.host || (e.host = ""), e.hostname || (e.hostname = ""), "" !== b[0] && b.unshift(""), 2 > b.length && b.unshift(""), n.pathname = b.join("/");
	          } else n.pathname = e.pathname;if (n.search = e.search, n.query = e.query, n.host = e.host || "", n.auth = e.auth, n.hostname = e.hostname || e.host, n.port = e.port, n.pathname || n.search) {
	            var w = n.pathname || "",
	                p = n.search || "";n.path = w + p;
	          }return n.slashes = n.slashes || e.slashes, n.href = n.format(), n;
	        }var s = n.pathname && "/" === n.pathname.charAt(0),
	            k = e.host || e.pathname && "/" === e.pathname.charAt(0),
	            x = k || s || n.host && e.pathname,
	            v = x,
	            S = n.pathname && n.pathname.split("/") || [],
	            b = e.pathname && e.pathname.split("/") || [],
	            C = n.protocol && !y[n.protocol];if (C && (n.hostname = "", n.port = null, n.host && ("" === S[0] ? S[0] = n.host : S.unshift(n.host)), n.host = "", e.protocol && (e.hostname = null, e.port = null, e.host && ("" === b[0] ? b[0] = e.host : b.unshift(e.host)), e.host = null), x = x && ("" === b[0] || "" === S[0])), k) n.host = e.host || "" === e.host ? e.host : n.host, n.hostname = e.hostname || "" === e.hostname ? e.hostname : n.hostname, n.search = e.search, n.query = e.query, S = b;else if (b.length) S || (S = []), S.pop(), S = S.concat(b), n.search = e.search, n.query = e.query;else if (!d.isNullOrUndefined(e.search)) {
	          if (C) {
	            n.hostname = n.host = S.shift();var E = n.host && 0 < n.host.indexOf("@") && n.host.split("@");E && (n.auth = E.shift(), n.host = n.hostname = E.shift());
	          }return n.search = e.search, n.query = e.query, d.isNull(n.pathname) && d.isNull(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")), n.href = n.format(), n;
	        }if (!S.length) return n.pathname = null, n.path = n.search ? "/" + n.search : null, n.href = n.format(), n;for (var B = S.slice(-1)[0], I = (n.host || e.host || 1 < S.length) && ("." === B || ".." === B) || "" === B, L = 0, T = S.length; 0 <= T; T--) {
	          B = S[T], "." === B ? S.splice(T, 1) : ".." === B ? (S.splice(T, 1), L++) : L && (S.splice(T, 1), L--);
	        }if (!x && !v) for (; L--; L) {
	          S.unshift("..");
	        }x && "" !== S[0] && (!S[0] || "/" !== S[0].charAt(0)) && S.unshift(""), I && "/" !== S.join("/").substr(-1) && S.push("");var i = "" === S[0] || S[0] && "/" === S[0].charAt(0);if (C) {
	          n.hostname = n.host = i ? "" : S.length ? S.shift() : "";var E = n.host && 0 < n.host.indexOf("@") && n.host.split("@");E && (n.auth = E.shift(), n.host = n.hostname = E.shift());
	        }return x = x || n.host && S.length, x && !i && S.unshift(""), S.length ? n.pathname = S.join("/") : (n.pathname = null, n.path = null), d.isNull(n.pathname) && d.isNull(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")), n.auth = e.auth || n.auth, n.slashes = n.slashes || e.slashes, n.href = n.format(), n;
	      }, r.prototype.parseHost = function () {
	        var e = this.host,
	            t = i.exec(e);t && (t = t[0], ":" !== t && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), e && (this.hostname = e);
	      };
	    }, { "./util": 125, punycode: 71, querystring: 74 }], 125: [function (e, t) {
	      "use strict";
	      t.exports = { isString: function isString(e) {
	          return "string" == typeof e;
	        }, isObject: function isObject(e) {
	          return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && null !== e;
	        }, isNull: function isNull(e) {
	          return null === e;
	        }, isNullOrUndefined: function isNullOrUndefined(e) {
	          return null == e;
	        } };
	    }, {}], 126: [function (e, t) {
	      var n = e("bencode"),
	          r = e("bitfield"),
	          o = e("safe-buffer").Buffer,
	          i = e("debug")("ut_metadata"),
	          d = e("events").EventEmitter,
	          a = e("inherits"),
	          c = e("simple-sha1"),
	          p = 1e3,
	          l = 16384;t.exports = function (e) {
	        function t(t) {
	          d.call(this), this._wire = t, this._metadataComplete = !1, this._metadataSize = null, this._remainingRejects = null, this._fetching = !1, this._bitfield = new r(0, { grow: p }), o.isBuffer(e) && this.setMetadata(e);
	        }return a(t, d), t.prototype.name = "ut_metadata", t.prototype.onHandshake = function (e) {
	          this._infoHash = e;
	        }, t.prototype.onExtendedHandshake = function (e) {
	          return e.m && e.m.ut_metadata ? e.metadata_size ? "number" != typeof e.metadata_size || 1e7 < e.metadata_size || 0 >= e.metadata_size ? this.emit("warning", new Error("Peer gave invalid metadata size")) : void (this._metadataSize = e.metadata_size, this._numPieces = s(this._metadataSize / l), this._remainingRejects = 2 * this._numPieces, this._fetching && this._requestPieces()) : this.emit("warning", new Error("Peer does not have metadata")) : this.emit("warning", new Error("Peer does not support ut_metadata"));
	        }, t.prototype.onMessage = function (e) {
	          var t, r;try {
	            var o = e.toString(),
	                s = o.indexOf("ee") + 2;t = n.decode(o.substring(0, s)), r = e.slice(s);
	          } catch (e) {
	            return;
	          }switch (t.msg_type) {case 0:
	              this._onRequest(t.piece);break;case 1:
	              this._onData(t.piece, r, t.total_size);break;case 2:
	              this._onReject(t.piece);}
	        }, t.prototype.fetch = function () {
	          this._metadataComplete || (this._fetching = !0, this._metadataSize && this._requestPieces());
	        }, t.prototype.cancel = function () {
	          this._fetching = !1;
	        }, t.prototype.setMetadata = function (e) {
	          if (this._metadataComplete) return !0;i("set metadata");try {
	            var t = n.decode(e).info;t && (e = n.encode(t));
	          } catch (e) {}return this._infoHash && this._infoHash !== c.sync(e) ? !1 : (this.cancel(), this.metadata = e, this._metadataComplete = !0, this._metadataSize = this.metadata.length, this._wire.extendedHandshake.metadata_size = this._metadataSize, this.emit("metadata", n.encode({ info: n.decode(this.metadata) })), !0);
	        }, t.prototype._send = function (e, t) {
	          var r = n.encode(e);o.isBuffer(t) && (r = o.concat([r, t])), this._wire.extended("ut_metadata", r);
	        }, t.prototype._request = function (e) {
	          this._send({ msg_type: 0, piece: e });
	        }, t.prototype._data = function (e, t, n) {
	          var r = { msg_type: 1, piece: e };"number" == typeof n && (r.total_size = n), this._send(r, t);
	        }, t.prototype._reject = function (e) {
	          this._send({ msg_type: 2, piece: e });
	        }, t.prototype._onRequest = function (e) {
	          if (!this._metadataComplete) return void this._reject(e);var t = e * l,
	              n = t + l;n > this._metadataSize && (n = this._metadataSize);var r = this.metadata.slice(t, n);this._data(e, r, this._metadataSize);
	        }, t.prototype._onData = function (e, t) {
	          t.length > l || (t.copy(this.metadata, e * l), this._bitfield.set(e), this._checkDone());
	        }, t.prototype._onReject = function (e) {
	          0 < this._remainingRejects && this._fetching ? (this._request(e), this._remainingRejects -= 1) : this.emit("warning", new Error("Peer sent \"reject\" too much"));
	        }, t.prototype._requestPieces = function () {
	          this.metadata = o.alloc(this._metadataSize);for (var e = 0; e < this._numPieces; e++) {
	            this._request(e);
	          }
	        }, t.prototype._checkDone = function () {
	          for (var e = !0, t = 0; t < this._numPieces; t++) {
	            if (!this._bitfield.get(t)) {
	              e = !1;break;
	            }
	          }if (e) {
	            var n = this.setMetadata(this.metadata);n || this._failedMetadata();
	          }
	        }, t.prototype._failedMetadata = function () {
	          this._bitfield = new r(0, { grow: p }), this._remainingRejects -= this._numPieces, 0 < this._remainingRejects ? this._requestPieces() : this.emit("warning", new Error("Peer sent invalid metadata"));
	        }, t;
	      };
	    }, { bencode: 11, bitfield: 13, debug: 127, events: 37, inherits: 44, "safe-buffer": 94, "simple-sha1": 100 }], 127: [function (e, t, n) {
	      arguments[4][15][0].apply(n, arguments);
	    }, { "./debug": 128, _process: 69, dup: 15 }], 128: [function (e, t, n) {
	      arguments[4][16][0].apply(n, arguments);
	    }, { dup: 16, ms: 60 }], 129: [function (e, t) {
	      (function (e) {
	        function n(t) {
	          try {
	            if (!e.localStorage) return !1;
	          } catch (e) {
	            return !1;
	          }var n = e.localStorage[t];return null != n && "true" === (n + "").toLowerCase();
	        }t.exports = function (e, t) {
	          if (n("noDeprecation")) return e;var r = !1;return function () {
	            if (!r) {
	              if (n("throwDeprecation")) throw new Error(t);else n("traceDeprecation") ? console.trace(t) : console.warn(t);r = !0;
	            }return e.apply(this, arguments);
	          };
	        };
	      }).call(this, "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global);
	    }, {}], 130: [function (e, t) {
	      (function (n) {
	        function o(e) {
	          var t = this;a.call(t), t._tracks = [], t._fragmentSequence = 1, t._file = e, t._decoder = null, t._findMoov(0);
	        }function s(e, t) {
	          var n = this;n._entries = e, n._countName = t || "count", n._index = 0, n._offset = 0, n.value = n._entries[0];
	        }function d() {
	          return { version: 0, flags: 0, entries: [] };
	        }var i = e("binary-search"),
	            a = e("events").EventEmitter,
	            c = e("inherits"),
	            p = e("mp4-stream"),
	            l = e("mp4-box-encoding"),
	            u = e("range-slice-stream");t.exports = o, c(o, a), o.prototype._findMoov = function (e) {
	          var t = this;t._decoder && t._decoder.destroy(), t._decoder = p.decode();var n = t._file.createReadStream({ start: e });n.pipe(t._decoder), t._decoder.once("box", function (r) {
	            "moov" === r.type ? t._decoder.decode(function (e) {
	              n.destroy();try {
	                t._processMoov(e);
	              } catch (e) {
	                e.message = "Cannot parse mp4 file: " + e.message, t.emit("error", e);
	              }
	            }) : (n.destroy(), t._findMoov(e + r.length));
	          });
	        }, s.prototype.inc = function () {
	          var e = this;e._offset++, e._offset >= e._entries[e._index][e._countName] && (e._index++, e._offset = 0), e.value = e._entries[e._index];
	        }, o.prototype._processMoov = function (e) {
	          var t = this,
	              r = e.traks;t._tracks = [], t._hasVideo = !1, t._hasAudio = !1;for (var o = 0; o < r.length; o++) {
	            var i = r[o],
	                a = i.mdia.minf.stbl,
	                c = a.stsd.entries[0],
	                p = i.mdia.hdlr.handlerType,
	                u,
	                f;if ("vide" === p && "avc1" === c.type) {
	              if (t._hasVideo) continue;t._hasVideo = !0, u = "avc1", c.avcC && (u += "." + c.avcC.mimeCodec), f = "video/mp4; codecs=\"" + u + "\"";
	            } else if ("soun" === p && "mp4a" === c.type) {
	              if (t._hasAudio) continue;t._hasAudio = !0, u = "mp4a", c.esds && c.esds.mimeCodec && (u += "." + c.esds.mimeCodec), f = "audio/mp4; codecs=\"" + u + "\"";
	            } else continue;var h = [],
	                m = 0,
	                g = 0,
	                _ = 0,
	                y = 0,
	                b = 0,
	                w = 0,
	                k = new s(a.stts.entries),
	                x = null;a.ctts && (x = new s(a.ctts.entries));for (var v = 0;;) {
	              var S = a.stsc.entries[b],
	                  C = a.stsz.entries[m],
	                  E = k.value.duration,
	                  B = x ? x.value.compositionOffset : 0,
	                  I = !0;if (a.stss && (I = a.stss.entries[v] === m + 1), h.push({ size: C, duration: E, dts: w, presentationOffset: B, sync: I, offset: y + a.stco.entries[_] }), m++, m >= a.stsz.entries.length) break;if (g++, y += C, g >= S.samplesPerChunk) {
	                g = 0, y = 0, _++;var L = a.stsc.entries[b + 1];L && _ + 1 >= L.firstChunk && b++;
	              }w += E, k.inc(), x && x.inc(), I && v++;
	            }i.mdia.mdhd.duration = 0, i.tkhd.duration = 0;var T = S.sampleDescriptionId,
	                A = { type: "moov", mvhd: e.mvhd, traks: [{ tkhd: i.tkhd, mdia: { mdhd: i.mdia.mdhd, hdlr: i.mdia.hdlr, elng: i.mdia.elng, minf: { vmhd: i.mdia.minf.vmhd, smhd: i.mdia.minf.smhd, dinf: i.mdia.minf.dinf, stbl: { stsd: a.stsd, stts: d(), ctts: d(), stsc: d(), stsz: d(), stco: d(), stss: d() } } } }], mvex: { mehd: { fragmentDuration: e.mvhd.duration }, trexs: [{ trackId: i.tkhd.trackId, defaultSampleDescriptionIndex: T, defaultSampleDuration: 0, defaultSampleSize: 0, defaultSampleFlags: 0 }] } };t._tracks.push({ trackId: i.tkhd.trackId, timeScale: i.mdia.mdhd.timeScale, samples: h, currSample: null, currTime: null, moov: A, mime: f });
	          }if (0 === t._tracks.length) return void t.emit("error", new Error("no playable tracks"));e.mvhd.duration = 0, t._ftyp = { type: "ftyp", brand: "iso5", brandVersion: 0, compatibleBrands: ["iso5"] };var U = l.encode(t._ftyp),
	              R = t._tracks.map(function (e) {
	            var t = l.encode(e.moov);return { mime: e.mime, init: n.concat([U, t]) };
	          });t.emit("ready", R);
	        }, o.prototype.seek = function (e) {
	          var t = this;if (!t._tracks) throw new Error("Not ready yet; wait for 'ready' event");t._fileStream && (t._fileStream.destroy(), t._fileStream = null);var n = -1;if (t._tracks.map(function (r, o) {
	            function s(e) {
	              i.destroyed || i.box(e.moof, function (n) {
	                if (n) return t.emit("error", n);if (!i.destroyed) {
	                  var d = r.inStream.slice(e.ranges);d.pipe(i.mediaData(e.length, function (e) {
	                    if (e) return t.emit("error", e);if (!i.destroyed) {
	                      var n = t._generateFragment(o);return n ? void s(n) : i.finalize();
	                    }
	                  }));
	                }
	              });
	            }r.outStream && r.outStream.destroy(), r.inStream && (r.inStream.destroy(), r.inStream = null);var i = r.outStream = p.encode(),
	                d = t._generateFragment(o, e);return d ? void ((-1 == n || d.ranges[0].start < n) && (n = d.ranges[0].start), s(d)) : i.finalize();
	          }), 0 <= n) {
	            var r = t._fileStream = t._file.createReadStream({ start: n });t._tracks.forEach(function (e) {
	              e.inStream = new u(n, { highWaterMark: 1e7 }), r.pipe(e.inStream);
	            });
	          }return t._tracks.map(function (e) {
	            return e.outStream;
	          });
	        }, o.prototype._findSampleBefore = function (e, t) {
	          var n = this,
	              o = n._tracks[e],
	              s = r(o.timeScale * t),
	              d = i(o.samples, s, function (e, n) {
	            var t = e.dts + e.presentationOffset;return t - n;
	          });for (-1 === d ? d = 0 : 0 > d && (d = -d - 2); !o.samples[d].sync;) {
	            d--;
	          }return d;
	        };o.prototype._generateFragment = function (e, t) {
	          var n = this,
	              r = n._tracks[e],
	              o;if (o = void 0 === t ? r.currSample : n._findSampleBefore(e, t), o >= r.samples.length) return null;for (var s = r.samples[o].dts, i = 0, d = [], a = o, c; a < r.samples.length && (c = r.samples[a], !(c.sync && c.dts - s >= r.timeScale * 1)); a++) {
	            i += c.size;var p = d.length - 1;0 > p || d[p].end !== c.offset ? d.push({ start: c.offset, end: c.offset + c.size }) : d[p].end += c.size;
	          }return r.currSample = a, { moof: n._generateMoof(e, o, a), ranges: d, length: i };
	        }, o.prototype._generateMoof = function (e, t, n) {
	          for (var r = this, o = r._tracks[e], s = [], i = t, d; i < n; i++) {
	            d = o.samples[i], s.push({ sampleDuration: d.duration, sampleSize: d.size, sampleFlags: d.sync ? 33554432 : 16842752, sampleCompositionTimeOffset: d.presentationOffset });
	          }var a = { type: "moof", mfhd: { sequenceNumber: r._fragmentSequence++ }, trafs: [{ tfhd: { flags: 131072, trackId: o.trackId }, tfdt: { baseMediaDecodeTime: o.samples[t].dts }, trun: { flags: 3841, dataOffset: 8, entries: s } }] };return a.trafs[0].trun.dataOffset += l.encodingLength(a), a;
	        };
	      }).call(this, e("buffer").Buffer);
	    }, { "binary-search": 12, buffer: 27, events: 37, inherits: 44, "mp4-box-encoding": 56, "mp4-stream": 59, "range-slice-stream": 77 }], 131: [function (e, t) {
	      function n(e, t, o) {
	        var s = this;return this instanceof n ? void (o = o || {}, s.detailedError = null, s._elem = t, s._elemWrapper = new r(t), s._waitingFired = !1, s._trackMeta = null, s._file = e, s._tracks = null, "none" !== s._elem.preload && s._createMuxer(), s._onError = function () {
	          s.detailedError = s._elemWrapper.detailedError, s.destroy();
	        }, s._onWaiting = function () {
	          s._waitingFired = !0, s._muxer ? s._tracks && s._pump() : s._createMuxer();
	        }, s._elem.addEventListener("waiting", s._onWaiting), s._elem.addEventListener("error", s._onError)) : new n(e, t, o);
	      }var r = e("mediasource"),
	          o = e("pump"),
	          s = e("./mp4-remuxer");t.exports = n, n.prototype._createMuxer = function () {
	        var e = this;e._muxer = new s(e._file), e._muxer.on("ready", function (t) {
	          e._tracks = t.map(function (t) {
	            var n = e._elemWrapper.createWriteStream(t.mime);n.on("error", function (t) {
	              e._elemWrapper.error(t);
	            });var r = { muxed: null, mediaSource: n, initFlushed: !1, onInitFlushed: null };return n.write(t.init, function (e) {
	              r.initFlushed = !0, r.onInitFlushed && r.onInitFlushed(e);
	            }), r;
	          }), (e._waitingFired || "auto" === e._elem.preload) && e._pump();
	        }), e._muxer.on("error", function (t) {
	          e._elemWrapper.error(t);
	        });
	      }, n.prototype._pump = function () {
	        var e = this,
	            t = e._muxer.seek(e._elem.currentTime, !e._tracks);e._tracks.forEach(function (n, r) {
	          var s = function s() {
	            n.muxed && (n.muxed.destroy(), n.mediaSource = e._elemWrapper.createWriteStream(n.mediaSource), n.mediaSource.on("error", function (t) {
	              e._elemWrapper.error(t);
	            })), n.muxed = t[r], o(n.muxed, n.mediaSource);
	          };n.initFlushed ? s() : n.onInitFlushed = function (t) {
	            return t ? void e._elemWrapper.error(t) : void s();
	          };
	        });
	      }, n.prototype.destroy = function () {
	        var e = this;e.destroyed || (e.destroyed = !0, e._elem.removeEventListener("waiting", e._onWaiting), e._elem.removeEventListener("error", e._onError), e._tracks && e._tracks.forEach(function (e) {
	          e.muxed.destroy();
	        }), e._elem.src = "");
	      };
	    }, { "./mp4-remuxer": 130, mediasource: 52, pump: 70 }], 132: [function (e, t) {
	      function n(e, t) {
	        function r() {
	          for (var t = Array(arguments.length), n = 0; n < t.length; n++) {
	            t[n] = arguments[n];
	          }var r = e.apply(this, t),
	              o = t[t.length - 1];return "function" == typeof r && r !== o && Object.keys(o).forEach(function (e) {
	            r[e] = o[e];
	          }), r;
	        }if (e && t) return n(e)(t);if ("function" != typeof e) throw new TypeError("need wrapper function");return Object.keys(e).forEach(function (t) {
	          r[t] = e[t];
	        }), r;
	      }t.exports = n;
	    }, {}], 133: [function (e, t) {
	      t.exports = function () {
	        for (var e = {}, t = 0, r; t < arguments.length; t++) {
	          for (var o in r = arguments[t], r) {
	            n.call(r, o) && (e[o] = r[o]);
	          }
	        }return e;
	      };var n = Object.prototype.hasOwnProperty;
	    }, {}], 134: [function (e, t) {
	      t.exports = function (e) {
	        for (var t = 1, r; t < arguments.length; t++) {
	          for (var o in r = arguments[t], r) {
	            n.call(r, o) && (e[o] = r[o]);
	          }
	        }return e;
	      };var n = Object.prototype.hasOwnProperty;
	    }, {}], 135: [function (e, t) {
	      t.exports = function e(t, n, r) {
	        return void 0 === n ? function (n, r) {
	          return e(t, n, r);
	        } : (void 0 === r && (r = "0"), t -= n.toString().length, 0 < t ? Array(t + (/\./.test(n) ? 2 : 1)).join(r) + n : n + "");
	      };
	    }, {}], 136: [function (e, t) {
	      t.exports = { version: "0.98.20" };
	    }, {}], 137: [function (e, t) {
	      (function (n, r) {
	        function o(e) {
	          function t() {
	            s.destroyed || (s.ready = !0, s.emit("ready"));
	          }var s = this;return s instanceof o ? void (u.call(s), !e && (e = {}), s.peerId = "string" == typeof e.peerId ? e.peerId : d.isBuffer(e.peerId) ? e.peerId.toString("hex") : d.from(B + w(9).toString("base64")).toString("hex"), s.peerIdBuffer = d.from(s.peerId, "hex"), s.nodeId = "string" == typeof e.nodeId ? e.nodeId : d.isBuffer(e.nodeId) ? e.nodeId.toString("hex") : w(20).toString("hex"), s.nodeIdBuffer = d.from(s.nodeId, "hex"), s._debugId = s.peerId.toString("hex").substring(0, 7), s.destroyed = !1, s.listening = !1, s.torrentPort = e.torrentPort || 0, s.dhtPort = e.dhtPort || 0, s.tracker = e.tracker === void 0 ? {} : e.tracker, s.torrents = [], s.maxConns = +e.maxConns || 55, s._debug("new webtorrent (peerId %s, nodeId %s, port %s)", s.peerId, s.nodeId, s.torrentPort), s.tracker && ("object" != _typeof(s.tracker) && (s.tracker = {}), e.rtcConfig && (console.warn("WebTorrent: opts.rtcConfig is deprecated. Use opts.tracker.rtcConfig instead"), s.tracker.rtcConfig = e.rtcConfig), e.wrtc && (console.warn("WebTorrent: opts.wrtc is deprecated. Use opts.tracker.wrtc instead"), s.tracker.wrtc = e.wrtc), r.WRTC && !s.tracker.wrtc && (s.tracker.wrtc = r.WRTC)), "function" == typeof v ? s._tcpPool = new v(s) : n.nextTick(function () {
	            s._onListening();
	          }), s._downloadSpeed = k(), s._uploadSpeed = k(), !1 !== e.dht && "function" == typeof l ? (s.dht = new l(f({ nodeId: s.nodeId }, e.dht)), s.dht.once("error", function (e) {
	            s._destroy(e);
	          }), s.dht.once("listening", function () {
	            var e = s.dht.address();e && (s.dhtPort = e.port);
	          }), s.dht.setMaxListeners(0), s.dht.listen(s.dhtPort)) : s.dht = !1, s.enableWebSeeds = !1 !== e.webSeeds, "function" == typeof m && null != e.blocklist ? m(e.blocklist, { headers: { "user-agent": "WebTorrent/" + C + " (https://webtorrent.io)" } }, function (e, n) {
	            return e ? s.error("Failed to load blocklist: " + e.message) : void (s.blocked = n, t());
	          }) : n.nextTick(t)) : new o(e);
	        }function s(e) {
	          return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && null != e && "function" == typeof e.pipe;
	        }function i(e) {
	          return "undefined" != typeof FileList && e instanceof FileList;
	        }t.exports = o;var d = e("safe-buffer").Buffer,
	            a = e("simple-concat"),
	            c = e("create-torrent"),
	            p = e("debug")("webtorrent"),
	            l = e("bittorrent-dht/client"),
	            u = e("events").EventEmitter,
	            f = e("xtend"),
	            h = e("inherits"),
	            m = e("load-ip-set"),
	            g = e("run-parallel"),
	            _ = e("parse-torrent"),
	            y = e("path"),
	            b = e("simple-peer"),
	            w = e("randombytes"),
	            k = e("speedometer"),
	            x = e("zero-fill"),
	            v = e("./lib/tcp-pool"),
	            S = e("./lib/torrent"),
	            C = e("./package.json").version,
	            E = C.match(/([0-9]+)/g).slice(0, 2).map(function (e) {
	          return x(2, e);
	        }).join(""),
	            B = "-WW" + E + "-";h(o, u), o.WEBRTC_SUPPORT = b.WEBRTC_SUPPORT, Object.defineProperty(o.prototype, "downloadSpeed", { get: function get() {
	            return this._downloadSpeed();
	          } }), Object.defineProperty(o.prototype, "uploadSpeed", { get: function get() {
	            return this._uploadSpeed();
	          } }), Object.defineProperty(o.prototype, "progress", { get: function get() {
	            var e = this.torrents.filter(function (e) {
	              return 1 !== e.progress;
	            }),
	                t = e.reduce(function (e, t) {
	              return e + t.downloaded;
	            }, 0),
	                n = e.reduce(function (e, t) {
	              return e + (t.length || 0);
	            }, 0) || 1;return t / n;
	          } }), Object.defineProperty(o.prototype, "ratio", { get: function get() {
	            var e = this.torrents.reduce(function (e, t) {
	              return e + t.uploaded;
	            }, 0),
	                t = this.torrents.reduce(function (e, t) {
	              return e + t.received;
	            }, 0) || 1;return e / t;
	          } }), o.prototype.get = function (e) {
	          var t = this,
	              n = t.torrents.length,
	              r,
	              o;if (e instanceof S) {
	            for (r = 0; r < n; r++) {
	              if (o = t.torrents[r], o === e) return o;
	            }
	          } else {
	            var s;try {
	              s = _(e);
	            } catch (e) {}if (!s) return null;if (!s.infoHash) throw new Error("Invalid torrent identifier");for (r = 0; r < n; r++) {
	              if (o = t.torrents[r], o.infoHash === s.infoHash) return o;
	            }
	          }return null;
	        }, o.prototype.download = function (e, t, n) {
	          return console.warn("WebTorrent: client.download() is deprecated. Use client.add() instead"), this.add(e, t, n);
	        }, o.prototype.add = function (e, t, n) {
	          function r() {
	            if (!d.destroyed) for (var e = 0, n = d.torrents.length, r; e < n; e++) {
	              if (r = d.torrents[e], r.infoHash === a.infoHash && r !== a) return void a._destroy(new Error("Cannot add duplicate torrent " + a.infoHash));
	            }
	          }function o() {
	            d.destroyed || ("function" == typeof n && n(a), d.emit("torrent", a));
	          }function s() {
	            a.removeListener("_infoHash", r), a.removeListener("ready", o), a.removeListener("close", s);
	          }var d = this;if (d.destroyed) throw new Error("client is destroyed");if ("function" == typeof t) return d.add(e, null, t);d._debug("add"), t = t ? f(t) : {};var a = new S(e, d, t);return d.torrents.push(a), a.once("_infoHash", r), a.once("ready", o), a.once("close", s), a;
	        }, o.prototype.seed = function (e, t, n) {
	          function r(e) {
	            o._debug("on seed"), "function" == typeof n && n(e), e.emit("seed"), o.emit("seed", e);
	          }var o = this;if (o.destroyed) throw new Error("client is destroyed");if ("function" == typeof t) return o.seed(e, null, t);o._debug("seed"), t = t ? f(t) : {}, "string" == typeof e && (t.path = y.dirname(e)), t.createdBy || (t.createdBy = "WebTorrent/" + E);var d = o.add(null, t, function (e) {
	            var t = [function (t) {
	              e.load(p, t);
	            }];o.dht && t.push(function (t) {
	              e.once("dhtAnnounce", t);
	            }), g(t, function (t) {
	              return o.destroyed ? void 0 : t ? e._destroy(t) : void r(e);
	            });
	          }),
	              p;return i(e) && (e = Array.prototype.slice.call(e)), Array.isArray(e) || (e = [e]), g(e.map(function (e) {
	            return function (t) {
	              s(e) ? a(e, t) : t(null, e);
	            };
	          }), function (e, n) {
	            return o.destroyed ? void 0 : e ? d._destroy(e) : void c.parseInput(n, t, function (e, r) {
	              return o.destroyed ? void 0 : e ? d._destroy(e) : void (p = r.map(function (e) {
	                return e.getStream;
	              }), c(n, t, function (e, t) {
	                if (!o.destroyed) {
	                  if (e) return d._destroy(e);var n = o.get(t);n ? d._destroy(new Error("Cannot add duplicate torrent " + n.infoHash)) : d._onTorrentId(t);
	                }
	              }));
	            });
	          }), d;
	        }, o.prototype.remove = function (e, t) {
	          this._debug("remove");var n = this.get(e);if (!n) throw new Error("No torrent with id " + e);this._remove(e, t);
	        }, o.prototype._remove = function (e, t) {
	          var n = this.get(e);n && (this.torrents.splice(this.torrents.indexOf(n), 1), n.destroy(t));
	        }, o.prototype.address = function () {
	          return this.listening ? this._tcpPool ? this._tcpPool.server.address() : { address: "0.0.0.0", family: "IPv4", port: 0 } : null;
	        }, o.prototype.destroy = function (e) {
	          if (this.destroyed) throw new Error("client already destroyed");this._destroy(null, e);
	        }, o.prototype._destroy = function (e, t) {
	          var n = this;n._debug("client destroy"), n.destroyed = !0;var r = n.torrents.map(function (e) {
	            return function (t) {
	              e.destroy(t);
	            };
	          });n._tcpPool && r.push(function (e) {
	            n._tcpPool.destroy(e);
	          }), n.dht && r.push(function (e) {
	            n.dht.destroy(e);
	          }), g(r, t), e && n.emit("error", e), n.torrents = [], n._tcpPool = null, n.dht = null;
	        }, o.prototype._onListening = function () {
	          if (this._debug("listening"), this.listening = !0, this._tcpPool) {
	            var e = this._tcpPool.server.address();e && (this.torrentPort = e.port);
	          }this.emit("listening");
	        }, o.prototype._debug = function () {
	          var e = [].slice.call(arguments);e[0] = "[" + this._debugId + "] " + e[0], p.apply(null, e);
	        };
	      }).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global);
	    }, { "./lib/tcp-pool": 25, "./lib/torrent": 5, "./package.json": 136, _process: 69, "bittorrent-dht/client": 25, "create-torrent": 32, debug: 33, events: 37, inherits: 44, "load-ip-set": 25, "parse-torrent": 65, path: 66, randombytes: 76, "run-parallel": 92, "safe-buffer": 94, "simple-concat": 95, "simple-peer": 97, speedometer: 104, xtend: 133, "zero-fill": 135 }] }, {}, [137])(137);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(2).setImmediate))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	var apply = Function.prototype.apply;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) {
	  if (timeout) {
	    timeout.close();
	  }
	};
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};
	
	// setimmediate attaches itself to the global object
	__webpack_require__(3);
	exports.setImmediate = setImmediate;
	exports.clearImmediate = clearImmediate;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
	    "use strict";
	
	    if (global.setImmediate) {
	        return;
	    }
	
	    var nextHandle = 1; // Spec says greater than zero
	    var tasksByHandle = {};
	    var currentlyRunningATask = false;
	    var doc = global.document;
	    var registerImmediate;
	
	    function setImmediate(callback) {
	      // Callback can either be a function or a string
	      if (typeof callback !== "function") {
	        callback = new Function("" + callback);
	      }
	      // Copy function arguments
	      var args = new Array(arguments.length - 1);
	      for (var i = 0; i < args.length; i++) {
	          args[i] = arguments[i + 1];
	      }
	      // Store and register the task
	      var task = { callback: callback, args: args };
	      tasksByHandle[nextHandle] = task;
	      registerImmediate(nextHandle);
	      return nextHandle++;
	    }
	
	    function clearImmediate(handle) {
	        delete tasksByHandle[handle];
	    }
	
	    function run(task) {
	        var callback = task.callback;
	        var args = task.args;
	        switch (args.length) {
	        case 0:
	            callback();
	            break;
	        case 1:
	            callback(args[0]);
	            break;
	        case 2:
	            callback(args[0], args[1]);
	            break;
	        case 3:
	            callback(args[0], args[1], args[2]);
	            break;
	        default:
	            callback.apply(undefined, args);
	            break;
	        }
	    }
	
	    function runIfPresent(handle) {
	        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
	        // So if we're currently running a task, we'll need to delay this invocation.
	        if (currentlyRunningATask) {
	            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
	            // "too much recursion" error.
	            setTimeout(runIfPresent, 0, handle);
	        } else {
	            var task = tasksByHandle[handle];
	            if (task) {
	                currentlyRunningATask = true;
	                try {
	                    run(task);
	                } finally {
	                    clearImmediate(handle);
	                    currentlyRunningATask = false;
	                }
	            }
	        }
	    }
	
	    function installNextTickImplementation() {
	        registerImmediate = function(handle) {
	            process.nextTick(function () { runIfPresent(handle); });
	        };
	    }
	
	    function canUsePostMessage() {
	        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
	        // where `global.postMessage` means something completely different and can't be used for this purpose.
	        if (global.postMessage && !global.importScripts) {
	            var postMessageIsAsynchronous = true;
	            var oldOnMessage = global.onmessage;
	            global.onmessage = function() {
	                postMessageIsAsynchronous = false;
	            };
	            global.postMessage("", "*");
	            global.onmessage = oldOnMessage;
	            return postMessageIsAsynchronous;
	        }
	    }
	
	    function installPostMessageImplementation() {
	        // Installs an event handler on `global` for the `message` event: see
	        // * https://developer.mozilla.org/en/DOM/window.postMessage
	        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
	
	        var messagePrefix = "setImmediate$" + Math.random() + "$";
	        var onGlobalMessage = function(event) {
	            if (event.source === global &&
	                typeof event.data === "string" &&
	                event.data.indexOf(messagePrefix) === 0) {
	                runIfPresent(+event.data.slice(messagePrefix.length));
	            }
	        };
	
	        if (global.addEventListener) {
	            global.addEventListener("message", onGlobalMessage, false);
	        } else {
	            global.attachEvent("onmessage", onGlobalMessage);
	        }
	
	        registerImmediate = function(handle) {
	            global.postMessage(messagePrefix + handle, "*");
	        };
	    }
	
	    function installMessageChannelImplementation() {
	        var channel = new MessageChannel();
	        channel.port1.onmessage = function(event) {
	            var handle = event.data;
	            runIfPresent(handle);
	        };
	
	        registerImmediate = function(handle) {
	            channel.port2.postMessage(handle);
	        };
	    }
	
	    function installReadyStateChangeImplementation() {
	        var html = doc.documentElement;
	        registerImmediate = function(handle) {
	            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	            var script = doc.createElement("script");
	            script.onreadystatechange = function () {
	                runIfPresent(handle);
	                script.onreadystatechange = null;
	                html.removeChild(script);
	                script = null;
	            };
	            html.appendChild(script);
	        };
	    }
	
	    function installSetTimeoutImplementation() {
	        registerImmediate = function(handle) {
	            setTimeout(runIfPresent, 0, handle);
	        };
	    }
	
	    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
	    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
	    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;
	
	    // Don't get fooled by e.g. browserify environments.
	    if ({}.toString.call(global.process) === "[object process]") {
	        // For Node.js before 0.9
	        installNextTickImplementation();
	
	    } else if (canUsePostMessage()) {
	        // For non-IE10 modern browsers
	        installPostMessageImplementation();
	
	    } else if (global.MessageChannel) {
	        // For web workers, where supported
	        installMessageChannelImplementation();
	
	    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
	        // For IE 6–8
	        installReadyStateChangeImplementation();
	
	    } else {
	        // For older browsers
	        installSetTimeoutImplementation();
	    }
	
	    attachTo.setImmediate = setImmediate;
	    attachTo.clearImmediate = clearImmediate;
	}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(4)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, process, global, module) {(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.async = global.async || {})));
	}(this, (function (exports) { 'use strict';
	
	function slice(arrayLike, start) {
	    start = start|0;
	    var newLen = Math.max(arrayLike.length - start, 0);
	    var newArr = Array(newLen);
	    for(var idx = 0; idx < newLen; idx++)  {
	        newArr[idx] = arrayLike[start + idx];
	    }
	    return newArr;
	}
	
	/**
	 * Creates a continuation function with some arguments already applied.
	 *
	 * Useful as a shorthand when combined with other control flow functions. Any
	 * arguments passed to the returned function are added to the arguments
	 * originally passed to apply.
	 *
	 * @name apply
	 * @static
	 * @memberOf module:Utils
	 * @method
	 * @category Util
	 * @param {Function} fn - The function you want to eventually apply all
	 * arguments to. Invokes with (arguments...).
	 * @param {...*} arguments... - Any number of arguments to automatically apply
	 * when the continuation is called.
	 * @returns {Function} the partially-applied function
	 * @example
	 *
	 * // using apply
	 * async.parallel([
	 *     async.apply(fs.writeFile, 'testfile1', 'test1'),
	 *     async.apply(fs.writeFile, 'testfile2', 'test2')
	 * ]);
	 *
	 *
	 * // the same process without using apply
	 * async.parallel([
	 *     function(callback) {
	 *         fs.writeFile('testfile1', 'test1', callback);
	 *     },
	 *     function(callback) {
	 *         fs.writeFile('testfile2', 'test2', callback);
	 *     }
	 * ]);
	 *
	 * // It's possible to pass any number of additional arguments when calling the
	 * // continuation:
	 *
	 * node> var fn = async.apply(sys.puts, 'one');
	 * node> fn('two', 'three');
	 * one
	 * two
	 * three
	 */
	var apply = function(fn/*, ...args*/) {
	    var args = slice(arguments, 1);
	    return function(/*callArgs*/) {
	        var callArgs = slice(arguments);
	        return fn.apply(null, args.concat(callArgs));
	    };
	};
	
	var initialParams = function (fn) {
	    return function (/*...args, callback*/) {
	        var args = slice(arguments);
	        var callback = args.pop();
	        fn.call(this, args, callback);
	    };
	};
	
	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}
	
	var hasSetImmediate = typeof setImmediate === 'function' && setImmediate;
	var hasNextTick = typeof process === 'object' && typeof process.nextTick === 'function';
	
	function fallback(fn) {
	    setTimeout(fn, 0);
	}
	
	function wrap(defer) {
	    return function (fn/*, ...args*/) {
	        var args = slice(arguments, 1);
	        defer(function () {
	            fn.apply(null, args);
	        });
	    };
	}
	
	var _defer;
	
	if (hasSetImmediate) {
	    _defer = setImmediate;
	} else if (hasNextTick) {
	    _defer = process.nextTick;
	} else {
	    _defer = fallback;
	}
	
	var setImmediate$1 = wrap(_defer);
	
	/**
	 * Take a sync function and make it async, passing its return value to a
	 * callback. This is useful for plugging sync functions into a waterfall,
	 * series, or other async functions. Any arguments passed to the generated
	 * function will be passed to the wrapped function (except for the final
	 * callback argument). Errors thrown will be passed to the callback.
	 *
	 * If the function passed to `asyncify` returns a Promise, that promises's
	 * resolved/rejected state will be used to call the callback, rather than simply
	 * the synchronous return value.
	 *
	 * This also means you can asyncify ES2017 `async` functions.
	 *
	 * @name asyncify
	 * @static
	 * @memberOf module:Utils
	 * @method
	 * @alias wrapSync
	 * @category Util
	 * @param {Function} func - The synchronous function, or Promise-returning
	 * function to convert to an {@link AsyncFunction}.
	 * @returns {AsyncFunction} An asynchronous wrapper of the `func`. To be
	 * invoked with `(args..., callback)`.
	 * @example
	 *
	 * // passing a regular synchronous function
	 * async.waterfall([
	 *     async.apply(fs.readFile, filename, "utf8"),
	 *     async.asyncify(JSON.parse),
	 *     function (data, next) {
	 *         // data is the result of parsing the text.
	 *         // If there was a parsing error, it would have been caught.
	 *     }
	 * ], callback);
	 *
	 * // passing a function returning a promise
	 * async.waterfall([
	 *     async.apply(fs.readFile, filename, "utf8"),
	 *     async.asyncify(function (contents) {
	 *         return db.model.create(contents);
	 *     }),
	 *     function (model, next) {
	 *         // `model` is the instantiated model object.
	 *         // If there was an error, this function would be skipped.
	 *     }
	 * ], callback);
	 *
	 * // es2017 example, though `asyncify` is not needed if your JS environment
	 * // supports async functions out of the box
	 * var q = async.queue(async.asyncify(async function(file) {
	 *     var intermediateStep = await processFile(file);
	 *     return await somePromise(intermediateStep)
	 * }));
	 *
	 * q.push(files);
	 */
	function asyncify(func) {
	    return initialParams(function (args, callback) {
	        var result;
	        try {
	            result = func.apply(this, args);
	        } catch (e) {
	            return callback(e);
	        }
	        // if result is Promise object
	        if (isObject(result) && typeof result.then === 'function') {
	            result.then(function(value) {
	                invokeCallback(callback, null, value);
	            }, function(err) {
	                invokeCallback(callback, err.message ? err : new Error(err));
	            });
	        } else {
	            callback(null, result);
	        }
	    });
	}
	
	function invokeCallback(callback, error, value) {
	    try {
	        callback(error, value);
	    } catch (e) {
	        setImmediate$1(rethrow, e);
	    }
	}
	
	function rethrow(error) {
	    throw error;
	}
	
	var supportsSymbol = typeof Symbol === 'function';
	
	function isAsync(fn) {
	    return supportsSymbol && fn[Symbol.toStringTag] === 'AsyncFunction';
	}
	
	function wrapAsync(asyncFn) {
	    return isAsync(asyncFn) ? asyncify(asyncFn) : asyncFn;
	}
	
	function applyEach$1(eachfn) {
	    return function(fns/*, ...args*/) {
	        var args = slice(arguments, 1);
	        var go = initialParams(function(args, callback) {
	            var that = this;
	            return eachfn(fns, function (fn, cb) {
	                wrapAsync(fn).apply(that, args.concat(cb));
	            }, callback);
	        });
	        if (args.length) {
	            return go.apply(this, args);
	        }
	        else {
	            return go;
	        }
	    };
	}
	
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
	
	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();
	
	/** Built-in value references. */
	var Symbol$1 = root.Symbol;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;
	
	/** Built-in value references. */
	var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;
	
	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag$1),
	      tag = value[symToStringTag$1];
	
	  try {
	    value[symToStringTag$1] = undefined;
	    var unmasked = true;
	  } catch (e) {}
	
	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag$1] = tag;
	    } else {
	      delete value[symToStringTag$1];
	    }
	  }
	  return result;
	}
	
	/** Used for built-in method references. */
	var objectProto$1 = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString$1 = objectProto$1.toString;
	
	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString$1.call(value);
	}
	
	/** `Object#toString` result references. */
	var nullTag = '[object Null]';
	var undefinedTag = '[object Undefined]';
	
	/** Built-in value references. */
	var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;
	
	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}
	
	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]';
	var funcTag = '[object Function]';
	var genTag = '[object GeneratorFunction]';
	var proxyTag = '[object Proxy]';
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}
	
	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}
	
	// A temporary value used to identify if the loop should be broken.
	// See #1064, #1293
	var breakLoop = {};
	
	/**
	 * This method returns `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.3.0
	 * @category Util
	 * @example
	 *
	 * _.times(2, _.noop);
	 * // => [undefined, undefined]
	 */
	function noop() {
	  // No operation performed.
	}
	
	function once(fn) {
	    return function () {
	        if (fn === null) return;
	        var callFn = fn;
	        fn = null;
	        callFn.apply(this, arguments);
	    };
	}
	
	var iteratorSymbol = typeof Symbol === 'function' && Symbol.iterator;
	
	var getIterator = function (coll) {
	    return iteratorSymbol && coll[iteratorSymbol] && coll[iteratorSymbol]();
	};
	
	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);
	
	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';
	
	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && baseGetTag(value) == argsTag;
	}
	
	/** Used for built-in method references. */
	var objectProto$3 = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto$3.propertyIsEnumerable;
	
	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty$2.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};
	
	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;
	
	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}
	
	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
	
	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
	
	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;
	
	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
	
	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;
	
	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER$1 = 9007199254740991;
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER$1 : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}
	
	/** `Object#toString` result references. */
	var argsTag$1 = '[object Arguments]';
	var arrayTag = '[object Array]';
	var boolTag = '[object Boolean]';
	var dateTag = '[object Date]';
	var errorTag = '[object Error]';
	var funcTag$1 = '[object Function]';
	var mapTag = '[object Map]';
	var numberTag = '[object Number]';
	var objectTag = '[object Object]';
	var regexpTag = '[object RegExp]';
	var setTag = '[object Set]';
	var stringTag = '[object String]';
	var weakMapTag = '[object WeakMap]';
	
	var arrayBufferTag = '[object ArrayBuffer]';
	var dataViewTag = '[object DataView]';
	var float32Tag = '[object Float32Array]';
	var float64Tag = '[object Float64Array]';
	var int8Tag = '[object Int8Array]';
	var int16Tag = '[object Int16Array]';
	var int32Tag = '[object Int32Array]';
	var uint8Tag = '[object Uint8Array]';
	var uint8ClampedTag = '[object Uint8ClampedArray]';
	var uint16Tag = '[object Uint16Array]';
	var uint32Tag = '[object Uint32Array]';
	
	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag$1] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;
	
	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}
	
	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}
	
	/** Detect free variable `exports`. */
	var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;
	
	/** Detect free variable `module`. */
	var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;
	
	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
	
	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports$1 && freeGlobal.process;
	
	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());
	
	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
	
	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
	
	/** Used for built-in method references. */
	var objectProto$2 = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
	
	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray(value),
	      isArg = !isArr && isArguments(value),
	      isBuff = !isArr && !isArg && isBuffer(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;
	
	  for (var key in value) {
	    if ((inherited || hasOwnProperty$1.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	/** Used for built-in method references. */
	var objectProto$5 = Object.prototype;
	
	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$5;
	
	  return value === proto;
	}
	
	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);
	
	/** Used for built-in method references. */
	var objectProto$4 = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
	
	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty$3.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}
	
	function createArrayIterator(coll) {
	    var i = -1;
	    var len = coll.length;
	    return function next() {
	        return ++i < len ? {value: coll[i], key: i} : null;
	    }
	}
	
	function createES2015Iterator(iterator) {
	    var i = -1;
	    return function next() {
	        var item = iterator.next();
	        if (item.done)
	            return null;
	        i++;
	        return {value: item.value, key: i};
	    }
	}
	
	function createObjectIterator(obj) {
	    var okeys = keys(obj);
	    var i = -1;
	    var len = okeys.length;
	    return function next() {
	        var key = okeys[++i];
	        return i < len ? {value: obj[key], key: key} : null;
	    };
	}
	
	function iterator(coll) {
	    if (isArrayLike(coll)) {
	        return createArrayIterator(coll);
	    }
	
	    var iterator = getIterator(coll);
	    return iterator ? createES2015Iterator(iterator) : createObjectIterator(coll);
	}
	
	function onlyOnce(fn) {
	    return function() {
	        if (fn === null) throw new Error("Callback was already called.");
	        var callFn = fn;
	        fn = null;
	        callFn.apply(this, arguments);
	    };
	}
	
	function _eachOfLimit(limit) {
	    return function (obj, iteratee, callback) {
	        callback = once(callback || noop);
	        if (limit <= 0 || !obj) {
	            return callback(null);
	        }
	        var nextElem = iterator(obj);
	        var done = false;
	        var running = 0;
	
	        function iterateeCallback(err, value) {
	            running -= 1;
	            if (err) {
	                done = true;
	                callback(err);
	            }
	            else if (value === breakLoop || (done && running <= 0)) {
	                done = true;
	                return callback(null);
	            }
	            else {
	                replenish();
	            }
	        }
	
	        function replenish () {
	            while (running < limit && !done) {
	                var elem = nextElem();
	                if (elem === null) {
	                    done = true;
	                    if (running <= 0) {
	                        callback(null);
	                    }
	                    return;
	                }
	                running += 1;
	                iteratee(elem.value, elem.key, onlyOnce(iterateeCallback));
	            }
	        }
	
	        replenish();
	    };
	}
	
	/**
	 * The same as [`eachOf`]{@link module:Collections.eachOf} but runs a maximum of `limit` async operations at a
	 * time.
	 *
	 * @name eachOfLimit
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @see [async.eachOf]{@link module:Collections.eachOf}
	 * @alias forEachOfLimit
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {number} limit - The maximum number of async operations at a time.
	 * @param {AsyncFunction} iteratee - An async function to apply to each
	 * item in `coll`. The `key` is the item's key, or index in the case of an
	 * array.
	 * Invoked with (item, key, callback).
	 * @param {Function} [callback] - A callback which is called when all
	 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
	 */
	function eachOfLimit(coll, limit, iteratee, callback) {
	    _eachOfLimit(limit)(coll, wrapAsync(iteratee), callback);
	}
	
	function doLimit(fn, limit) {
	    return function (iterable, iteratee, callback) {
	        return fn(iterable, limit, iteratee, callback);
	    };
	}
	
	// eachOf implementation optimized for array-likes
	function eachOfArrayLike(coll, iteratee, callback) {
	    callback = once(callback || noop);
	    var index = 0,
	        completed = 0,
	        length = coll.length;
	    if (length === 0) {
	        callback(null);
	    }
	
	    function iteratorCallback(err, value) {
	        if (err) {
	            callback(err);
	        } else if ((++completed === length) || value === breakLoop) {
	            callback(null);
	        }
	    }
	
	    for (; index < length; index++) {
	        iteratee(coll[index], index, onlyOnce(iteratorCallback));
	    }
	}
	
	// a generic version of eachOf which can handle array, object, and iterator cases.
	var eachOfGeneric = doLimit(eachOfLimit, Infinity);
	
	/**
	 * Like [`each`]{@link module:Collections.each}, except that it passes the key (or index) as the second argument
	 * to the iteratee.
	 *
	 * @name eachOf
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @alias forEachOf
	 * @category Collection
	 * @see [async.each]{@link module:Collections.each}
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {AsyncFunction} iteratee - A function to apply to each
	 * item in `coll`.
	 * The `key` is the item's key, or index in the case of an array.
	 * Invoked with (item, key, callback).
	 * @param {Function} [callback] - A callback which is called when all
	 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
	 * @example
	 *
	 * var obj = {dev: "/dev.json", test: "/test.json", prod: "/prod.json"};
	 * var configs = {};
	 *
	 * async.forEachOf(obj, function (value, key, callback) {
	 *     fs.readFile(__dirname + value, "utf8", function (err, data) {
	 *         if (err) return callback(err);
	 *         try {
	 *             configs[key] = JSON.parse(data);
	 *         } catch (e) {
	 *             return callback(e);
	 *         }
	 *         callback();
	 *     });
	 * }, function (err) {
	 *     if (err) console.error(err.message);
	 *     // configs is now a map of JSON data
	 *     doSomethingWith(configs);
	 * });
	 */
	var eachOf = function(coll, iteratee, callback) {
	    var eachOfImplementation = isArrayLike(coll) ? eachOfArrayLike : eachOfGeneric;
	    eachOfImplementation(coll, wrapAsync(iteratee), callback);
	};
	
	function doParallel(fn) {
	    return function (obj, iteratee, callback) {
	        return fn(eachOf, obj, wrapAsync(iteratee), callback);
	    };
	}
	
	function _asyncMap(eachfn, arr, iteratee, callback) {
	    callback = callback || noop;
	    arr = arr || [];
	    var results = [];
	    var counter = 0;
	    var _iteratee = wrapAsync(iteratee);
	
	    eachfn(arr, function (value, _, callback) {
	        var index = counter++;
	        _iteratee(value, function (err, v) {
	            results[index] = v;
	            callback(err);
	        });
	    }, function (err) {
	        callback(err, results);
	    });
	}
	
	/**
	 * Produces a new collection of values by mapping each value in `coll` through
	 * the `iteratee` function. The `iteratee` is called with an item from `coll`
	 * and a callback for when it has finished processing. Each of these callback
	 * takes 2 arguments: an `error`, and the transformed item from `coll`. If
	 * `iteratee` passes an error to its callback, the main `callback` (for the
	 * `map` function) is immediately called with the error.
	 *
	 * Note, that since this function applies the `iteratee` to each item in
	 * parallel, there is no guarantee that the `iteratee` functions will complete
	 * in order. However, the results array will be in the same order as the
	 * original `coll`.
	 *
	 * If `map` is passed an Object, the results will be an Array.  The results
	 * will roughly be in the order of the original Objects' keys (but this can
	 * vary across JavaScript engines).
	 *
	 * @name map
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {AsyncFunction} iteratee - An async function to apply to each item in
	 * `coll`.
	 * The iteratee should complete with the transformed item.
	 * Invoked with (item, callback).
	 * @param {Function} [callback] - A callback which is called when all `iteratee`
	 * functions have finished, or an error occurs. Results is an Array of the
	 * transformed items from the `coll`. Invoked with (err, results).
	 * @example
	 *
	 * async.map(['file1','file2','file3'], fs.stat, function(err, results) {
	 *     // results is now an array of stats for each file
	 * });
	 */
	var map = doParallel(_asyncMap);
	
	/**
	 * Applies the provided arguments to each function in the array, calling
	 * `callback` after all functions have completed. If you only provide the first
	 * argument, `fns`, then it will return a function which lets you pass in the
	 * arguments as if it were a single function call. If more arguments are
	 * provided, `callback` is required while `args` is still optional.
	 *
	 * @name applyEach
	 * @static
	 * @memberOf module:ControlFlow
	 * @method
	 * @category Control Flow
	 * @param {Array|Iterable|Object} fns - A collection of {@link AsyncFunction}s
	 * to all call with the same arguments
	 * @param {...*} [args] - any number of separate arguments to pass to the
	 * function.
	 * @param {Function} [callback] - the final argument should be the callback,
	 * called when all functions have completed processing.
	 * @returns {Function} - If only the first argument, `fns`, is provided, it will
	 * return a function which lets you pass in the arguments as if it were a single
	 * function call. The signature is `(..args, callback)`. If invoked with any
	 * arguments, `callback` is required.
	 * @example
	 *
	 * async.applyEach([enableSearch, updateSchema], 'bucket', callback);
	 *
	 * // partial application example:
	 * async.each(
	 *     buckets,
	 *     async.applyEach([enableSearch, updateSchema]),
	 *     callback
	 * );
	 */
	var applyEach = applyEach$1(map);
	
	function doParallelLimit(fn) {
	    return function (obj, limit, iteratee, callback) {
	        return fn(_eachOfLimit(limit), obj, wrapAsync(iteratee), callback);
	    };
	}
	
	/**
	 * The same as [`map`]{@link module:Collections.map} but runs a maximum of `limit` async operations at a time.
	 *
	 * @name mapLimit
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @see [async.map]{@link module:Collections.map}
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {number} limit - The maximum number of async operations at a time.
	 * @param {AsyncFunction} iteratee - An async function to apply to each item in
	 * `coll`.
	 * The iteratee should complete with the transformed item.
	 * Invoked with (item, callback).
	 * @param {Function} [callback] - A callback which is called when all `iteratee`
	 * functions have finished, or an error occurs. Results is an array of the
	 * transformed items from the `coll`. Invoked with (err, results).
	 */
	var mapLimit = doParallelLimit(_asyncMap);
	
	/**
	 * The same as [`map`]{@link module:Collections.map} but runs only a single async operation at a time.
	 *
	 * @name mapSeries
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @see [async.map]{@link module:Collections.map}
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {AsyncFunction} iteratee - An async function to apply to each item in
	 * `coll`.
	 * The iteratee should complete with the transformed item.
	 * Invoked with (item, callback).
	 * @param {Function} [callback] - A callback which is called when all `iteratee`
	 * functions have finished, or an error occurs. Results is an array of the
	 * transformed items from the `coll`. Invoked with (err, results).
	 */
	var mapSeries = doLimit(mapLimit, 1);
	
	/**
	 * The same as [`applyEach`]{@link module:ControlFlow.applyEach} but runs only a single async operation at a time.
	 *
	 * @name applyEachSeries
	 * @static
	 * @memberOf module:ControlFlow
	 * @method
	 * @see [async.applyEach]{@link module:ControlFlow.applyEach}
	 * @category Control Flow
	 * @param {Array|Iterable|Object} fns - A collection of {@link AsyncFunction}s to all
	 * call with the same arguments
	 * @param {...*} [args] - any number of separate arguments to pass to the
	 * function.
	 * @param {Function} [callback] - the final argument should be the callback,
	 * called when all functions have completed processing.
	 * @returns {Function} - If only the first argument is provided, it will return
	 * a function which lets you pass in the arguments as if it were a single
	 * function call.
	 */
	var applyEachSeries = applyEach$1(mapSeries);
	
	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length;
	
	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}
	
	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;
	
	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}
	
	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();
	
	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}
	
	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 1 : -1);
	
	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}
	
	/**
	 * The base implementation of `_.isNaN` without support for number objects.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	 */
	function baseIsNaN(value) {
	  return value !== value;
	}
	
	/**
	 * A specialized version of `_.indexOf` which performs strict equality
	 * comparisons of values, i.e. `===`.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function strictIndexOf(array, value, fromIndex) {
	  var index = fromIndex - 1,
	      length = array.length;
	
	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}
	
	/**
	 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  return value === value
	    ? strictIndexOf(array, value, fromIndex)
	    : baseFindIndex(array, baseIsNaN, fromIndex);
	}
	
	/**
	 * Determines the best order for running the {@link AsyncFunction}s in `tasks`, based on
	 * their requirements. Each function can optionally depend on other functions
	 * being completed first, and each function is run as soon as its requirements
	 * are satisfied.
	 *
	 * If any of the {@link AsyncFunction}s pass an error to their callback, the `auto` sequence
	 * will stop. Further tasks will not execute (so any other functions depending
	 * on it will not run), and the main `callback` is immediately called with the
	 * error.
	 *
	 * {@link AsyncFunction}s also receive an object containing the results of functions which
	 * have completed so far as the first argument, if they have dependencies. If a
	 * task function has no dependencies, it will only be passed a callback.
	 *
	 * @name auto
	 * @static
	 * @memberOf module:ControlFlow
	 * @method
	 * @category Control Flow
	 * @param {Object} tasks - An object. Each of its properties is either a
	 * function or an array of requirements, with the {@link AsyncFunction} itself the last item
	 * in the array. The object's key of a property serves as the name of the task
	 * defined by that property, i.e. can be used when specifying requirements for
	 * other tasks. The function receives one or two arguments:
	 * * a `results` object, containing the results of the previously executed
	 *   functions, only passed if the task has any dependencies,
	 * * a `callback(err, result)` function, which must be called when finished,
	 *   passing an `error` (which can be `null`) and the result of the function's
	 *   execution.
	 * @param {number} [concurrency=Infinity] - An optional `integer` for
	 * determining the maximum number of tasks that can be run in parallel. By
	 * default, as many as possible.
	 * @param {Function} [callback] - An optional callback which is called when all
	 * the tasks have been completed. It receives the `err` argument if any `tasks`
	 * pass an error to their callback. Results are always returned; however, if an
	 * error occurs, no further `tasks` will be performed, and the results object
	 * will only contain partial results. Invoked with (err, results).
	 * @returns undefined
	 * @example
	 *
	 * async.auto({
	 *     // this function will just be passed a callback
	 *     readData: async.apply(fs.readFile, 'data.txt', 'utf-8'),
	 *     showData: ['readData', function(results, cb) {
	 *         // results.readData is the file's contents
	 *         // ...
	 *     }]
	 * }, callback);
	 *
	 * async.auto({
	 *     get_data: function(callback) {
	 *         console.log('in get_data');
	 *         // async code to get some data
	 *         callback(null, 'data', 'converted to array');
	 *     },
	 *     make_folder: function(callback) {
	 *         console.log('in make_folder');
	 *         // async code to create a directory to store a file in
	 *         // this is run at the same time as getting the data
	 *         callback(null, 'folder');
	 *     },
	 *     write_file: ['get_data', 'make_folder', function(results, callback) {
	 *         console.log('in write_file', JSON.stringify(results));
	 *         // once there is some data and the directory exists,
	 *         // write the data to a file in the directory
	 *         callback(null, 'filename');
	 *     }],
	 *     email_link: ['write_file', function(results, callback) {
	 *         console.log('in email_link', JSON.stringify(results));
	 *         // once the file is written let's email a link to it...
	 *         // results.write_file contains the filename returned by write_file.
	 *         callback(null, {'file':results.write_file, 'email':'user@example.com'});
	 *     }]
	 * }, function(err, results) {
	 *     console.log('err = ', err);
	 *     console.log('results = ', results);
	 * });
	 */
	var auto = function (tasks, concurrency, callback) {
	    if (typeof concurrency === 'function') {
	        // concurrency is optional, shift the args.
	        callback = concurrency;
	        concurrency = null;
	    }
	    callback = once(callback || noop);
	    var keys$$1 = keys(tasks);
	    var numTasks = keys$$1.length;
	    if (!numTasks) {
	        return callback(null);
	    }
	    if (!concurrency) {
	        concurrency = numTasks;
	    }
	
	    var results = {};
	    var runningTasks = 0;
	    var hasError = false;
	
	    var listeners = Object.create(null);
	
	    var readyTasks = [];
	
	    // for cycle detection:
	    var readyToCheck = []; // tasks that have been identified as reachable
	    // without the possibility of returning to an ancestor task
	    var uncheckedDependencies = {};
	
	    baseForOwn(tasks, function (task, key) {
	        if (!isArray(task)) {
	            // no dependencies
	            enqueueTask(key, [task]);
	            readyToCheck.push(key);
	            return;
	        }
	
	        var dependencies = task.slice(0, task.length - 1);
	        var remainingDependencies = dependencies.length;
	        if (remainingDependencies === 0) {
	            enqueueTask(key, task);
	            readyToCheck.push(key);
	            return;
	        }
	        uncheckedDependencies[key] = remainingDependencies;
	
	        arrayEach(dependencies, function (dependencyName) {
	            if (!tasks[dependencyName]) {
	                throw new Error('async.auto task `' + key +
	                    '` has a non-existent dependency `' +
	                    dependencyName + '` in ' +
	                    dependencies.join(', '));
	            }
	            addListener(dependencyName, function () {
	                remainingDependencies--;
	                if (remainingDependencies === 0) {
	                    enqueueTask(key, task);
	                }
	            });
	        });
	    });
	
	    checkForDeadlocks();
	    processQueue();
	
	    function enqueueTask(key, task) {
	        readyTasks.push(function () {
	            runTask(key, task);
	        });
	    }
	
	    function processQueue() {
	        if (readyTasks.length === 0 && runningTasks === 0) {
	            return callback(null, results);
	        }
	        while(readyTasks.length && runningTasks < concurrency) {
	            var run = readyTasks.shift();
	            run();
	        }
	
	    }
	
	    function addListener(taskName, fn) {
	        var taskListeners = listeners[taskName];
	        if (!taskListeners) {
	            taskListeners = listeners[taskName] = [];
	        }
	
	        taskListeners.push(fn);
	    }
	
	    function taskComplete(taskName) {
	        var taskListeners = listeners[taskName] || [];
	        arrayEach(taskListeners, function (fn) {
	            fn();
	        });
	        processQueue();
	    }
	
	
	    function runTask(key, task) {
	        if (hasError) return;
	
	        var taskCallback = onlyOnce(function(err, result) {
	            runningTasks--;
	            if (arguments.length > 2) {
	                result = slice(arguments, 1);
	            }
	            if (err) {
	                var safeResults = {};
	                baseForOwn(results, function(val, rkey) {
	                    safeResults[rkey] = val;
	                });
	                safeResults[key] = result;
	                hasError = true;
	                listeners = Object.create(null);
	
	                callback(err, safeResults);
	            } else {
	                results[key] = result;
	                taskComplete(key);
	            }
	        });
	
	        runningTasks++;
	        var taskFn = wrapAsync(task[task.length - 1]);
	        if (task.length > 1) {
	            taskFn(results, taskCallback);
	        } else {
	            taskFn(taskCallback);
	        }
	    }
	
	    function checkForDeadlocks() {
	        // Kahn's algorithm
	        // https://en.wikipedia.org/wiki/Topological_sorting#Kahn.27s_algorithm
	        // http://connalle.blogspot.com/2013/10/topological-sortingkahn-algorithm.html
	        var currentTask;
	        var counter = 0;
	        while (readyToCheck.length) {
	            currentTask = readyToCheck.pop();
	            counter++;
	            arrayEach(getDependents(currentTask), function (dependent) {
	                if (--uncheckedDependencies[dependent] === 0) {
	                    readyToCheck.push(dependent);
	                }
	            });
	        }
	
	        if (counter !== numTasks) {
	            throw new Error(
	                'async.auto cannot execute tasks due to a recursive dependency'
	            );
	        }
	    }
	
	    function getDependents(taskName) {
	        var result = [];
	        baseForOwn(tasks, function (task, key) {
	            if (isArray(task) && baseIndexOf(task, taskName, 0) >= 0) {
	                result.push(key);
	            }
	        });
	        return result;
	    }
	};
	
	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      result = Array(length);
	
	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}
	
	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && baseGetTag(value) == symbolTag);
	}
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined;
	var symbolToString = symbolProto ? symbolProto.toString : undefined;
	
	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isArray(value)) {
	    // Recursively convert values (susceptible to call stack limits).
	    return arrayMap(value, baseToString) + '';
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}
	
	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;
	
	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = end > length ? length : end;
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : ((end - start) >>> 0);
	  start >>>= 0;
	
	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}
	
	/**
	 * Casts `array` to a slice if it's needed.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {number} start The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the cast slice.
	 */
	function castSlice(array, start, end) {
	  var length = array.length;
	  end = end === undefined ? length : end;
	  return (!start && end >= length) ? array : baseSlice(array, start, end);
	}
	
	/**
	 * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
	 * that is not found in the character symbols.
	 *
	 * @private
	 * @param {Array} strSymbols The string symbols to inspect.
	 * @param {Array} chrSymbols The character symbols to find.
	 * @returns {number} Returns the index of the last unmatched string symbol.
	 */
	function charsEndIndex(strSymbols, chrSymbols) {
	  var index = strSymbols.length;
	
	  while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
	  return index;
	}
	
	/**
	 * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
	 * that is not found in the character symbols.
	 *
	 * @private
	 * @param {Array} strSymbols The string symbols to inspect.
	 * @param {Array} chrSymbols The character symbols to find.
	 * @returns {number} Returns the index of the first unmatched string symbol.
	 */
	function charsStartIndex(strSymbols, chrSymbols) {
	  var index = -1,
	      length = strSymbols.length;
	
	  while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
	  return index;
	}
	
	/**
	 * Converts an ASCII `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function asciiToArray(string) {
	  return string.split('');
	}
	
	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff';
	var rsComboMarksRange = '\\u0300-\\u036f';
	var reComboHalfMarksRange = '\\ufe20-\\ufe2f';
	var rsComboSymbolsRange = '\\u20d0-\\u20ff';
	var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
	var rsVarRange = '\\ufe0e\\ufe0f';
	
	/** Used to compose unicode capture groups. */
	var rsZWJ = '\\u200d';
	
	/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
	var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');
	
	/**
	 * Checks if `string` contains Unicode symbols.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
	 */
	function hasUnicode(string) {
	  return reHasUnicode.test(string);
	}
	
	/** Used to compose unicode character classes. */
	var rsAstralRange$1 = '\\ud800-\\udfff';
	var rsComboMarksRange$1 = '\\u0300-\\u036f';
	var reComboHalfMarksRange$1 = '\\ufe20-\\ufe2f';
	var rsComboSymbolsRange$1 = '\\u20d0-\\u20ff';
	var rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1;
	var rsVarRange$1 = '\\ufe0e\\ufe0f';
	
	/** Used to compose unicode capture groups. */
	var rsAstral = '[' + rsAstralRange$1 + ']';
	var rsCombo = '[' + rsComboRange$1 + ']';
	var rsFitz = '\\ud83c[\\udffb-\\udfff]';
	var rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')';
	var rsNonAstral = '[^' + rsAstralRange$1 + ']';
	var rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}';
	var rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]';
	var rsZWJ$1 = '\\u200d';
	
	/** Used to compose unicode regexes. */
	var reOptMod = rsModifier + '?';
	var rsOptVar = '[' + rsVarRange$1 + ']?';
	var rsOptJoin = '(?:' + rsZWJ$1 + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*';
	var rsSeq = rsOptVar + reOptMod + rsOptJoin;
	var rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
	
	/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
	var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');
	
	/**
	 * Converts a Unicode `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function unicodeToArray(string) {
	  return string.match(reUnicode) || [];
	}
	
	/**
	 * Converts `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function stringToArray(string) {
	  return hasUnicode(string)
	    ? unicodeToArray(string)
	    : asciiToArray(string);
	}
	
	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}
	
	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;
	
	/**
	 * Removes leading and trailing whitespace or specified characters from `string`.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to trim.
	 * @param {string} [chars=whitespace] The characters to trim.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {string} Returns the trimmed string.
	 * @example
	 *
	 * _.trim('  abc  ');
	 * // => 'abc'
	 *
	 * _.trim('-_-abc-_-', '_-');
	 * // => 'abc'
	 *
	 * _.map(['  foo  ', '  bar  '], _.trim);
	 * // => ['foo', 'bar']
	 */
	function trim(string, chars, guard) {
	  string = toString(string);
	  if (string && (guard || chars === undefined)) {
	    return string.replace(reTrim, '');
	  }
	  if (!string || !(chars = baseToString(chars))) {
	    return string;
	  }
	  var strSymbols = stringToArray(string),
	      chrSymbols = stringToArray(chars),
	      start = charsStartIndex(strSymbols, chrSymbols),
	      end = charsEndIndex(strSymbols, chrSymbols) + 1;
	
	  return castSlice(strSymbols, start, end).join('');
	}
	
	var FN_ARGS = /^(?:async\s+)?(function)?\s*[^\(]*\(\s*([^\)]*)\)/m;
	var FN_ARG_SPLIT = /,/;
	var FN_ARG = /(=.+)?(\s*)$/;
	var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
	
	function parseParams(func) {
	    func = func.toString().replace(STRIP_COMMENTS, '');
	    func = func.match(FN_ARGS)[2].replace(' ', '');
	    func = func ? func.split(FN_ARG_SPLIT) : [];
	    func = func.map(function (arg){
	        return trim(arg.replace(FN_ARG, ''));
	    });
	    return func;
	}
	
	/**
	 * A dependency-injected version of the [async.auto]{@link module:ControlFlow.auto} function. Dependent
	 * tasks are specified as parameters to the function, after the usual callback
	 * parameter, with the parameter names matching the names of the tasks it
	 * depends on. This can provide even more readable task graphs which can be
	 * easier to maintain.
	 *
	 * If a final callback is specified, the task results are similarly injected,
	 * specified as named parameters after the initial error parameter.
	 *
	 * The autoInject function is purely syntactic sugar and its semantics are
	 * otherwise equivalent to [async.auto]{@link module:ControlFlow.auto}.
	 *
	 * @name autoInject
	 * @static
	 * @memberOf module:ControlFlow
	 * @method
	 * @see [async.auto]{@link module:ControlFlow.auto}
	 * @category Control Flow
	 * @param {Object} tasks - An object, each of whose properties is an {@link AsyncFunction} of
	 * the form 'func([dependencies...], callback). The object's key of a property
	 * serves as the name of the task defined by that property, i.e. can be used
	 * when specifying requirements for other tasks.
	 * * The `callback` parameter is a `callback(err, result)` which must be called
	 *   when finished, passing an `error` (which can be `null`) and the result of
	 *   the function's execution. The remaining parameters name other tasks on
	 *   which the task is dependent, and the results from those tasks are the
	 *   arguments of those parameters.
	 * @param {Function} [callback] - An optional callback which is called when all
	 * the tasks have been completed. It receives the `err` argument if any `tasks`
	 * pass an error to their callback, and a `results` object with any completed
	 * task results, similar to `auto`.
	 * @example
	 *
	 * //  The example from `auto` can be rewritten as follows:
	 * async.autoInject({
	 *     get_data: function(callback) {
	 *         // async code to get some data
	 *         callback(null, 'data', 'converted to array');
	 *     },
	 *     make_folder: function(callback) {
	 *         // async code to create a directory to store a file in
	 *         // this is run at the same time as getting the data
	 *         callback(null, 'folder');
	 *     },
	 *     write_file: function(get_data, make_folder, callback) {
	 *         // once there is some data and the directory exists,
	 *         // write the data to a file in the directory
	 *         callback(null, 'filename');
	 *     },
	 *     email_link: function(write_file, callback) {
	 *         // once the file is written let's email a link to it...
	 *         // write_file contains the filename returned by write_file.
	 *         callback(null, {'file':write_file, 'email':'user@example.com'});
	 *     }
	 * }, function(err, results) {
	 *     console.log('err = ', err);
	 *     console.log('email_link = ', results.email_link);
	 * });
	 *
	 * // If you are using a JS minifier that mangles parameter names, `autoInject`
	 * // will not work with plain functions, since the parameter names will be
	 * // collapsed to a single letter identifier.  To work around this, you can
	 * // explicitly specify the names of the parameters your task function needs
	 * // in an array, similar to Angular.js dependency injection.
	 *
	 * // This still has an advantage over plain `auto`, since the results a task
	 * // depends on are still spread into arguments.
	 * async.autoInject({
	 *     //...
	 *     write_file: ['get_data', 'make_folder', function(get_data, make_folder, callback) {
	 *         callback(null, 'filename');
	 *     }],
	 *     email_link: ['write_file', function(write_file, callback) {
	 *         callback(null, {'file':write_file, 'email':'user@example.com'});
	 *     }]
	 *     //...
	 * }, function(err, results) {
	 *     console.log('err = ', err);
	 *     console.log('email_link = ', results.email_link);
	 * });
	 */
	function autoInject(tasks, callback) {
	    var newTasks = {};
	
	    baseForOwn(tasks, function (taskFn, key) {
	        var params;
	        var fnIsAsync = isAsync(taskFn);
	        var hasNoDeps =
	            (!fnIsAsync && taskFn.length === 1) ||
	            (fnIsAsync && taskFn.length === 0);
	
	        if (isArray(taskFn)) {
	            params = taskFn.slice(0, -1);
	            taskFn = taskFn[taskFn.length - 1];
	
	            newTasks[key] = params.concat(params.length > 0 ? newTask : taskFn);
	        } else if (hasNoDeps) {
	            // no dependencies, use the function as-is
	            newTasks[key] = taskFn;
	        } else {
	            params = parseParams(taskFn);
	            if (taskFn.length === 0 && !fnIsAsync && params.length === 0) {
	                throw new Error("autoInject task functions require explicit parameters.");
	            }
	
	            // remove callback param
	            if (!fnIsAsync) params.pop();
	
	            newTasks[key] = params.concat(newTask);
	        }
	
	        function newTask(results, taskCb) {
	            var newArgs = arrayMap(params, function (name) {
	                return results[name];
	            });
	            newArgs.push(taskCb);
	            wrapAsync(taskFn).apply(null, newArgs);
	        }
	    });
	
	    auto(newTasks, callback);
	}
	
	// Simple doubly linked list (https://en.wikipedia.org/wiki/Doubly_linked_list) implementation
	// used for queues. This implementation assumes that the node provided by the user can be modified
	// to adjust the next and last properties. We implement only the minimal functionality
	// for queue support.
	function DLL() {
	    this.head = this.tail = null;
	    this.length = 0;
	}
	
	function setInitial(dll, node) {
	    dll.length = 1;
	    dll.head = dll.tail = node;
	}
	
	DLL.prototype.removeLink = function(node) {
	    if (node.prev) node.prev.next = node.next;
	    else this.head = node.next;
	    if (node.next) node.next.prev = node.prev;
	    else this.tail = node.prev;
	
	    node.prev = node.next = null;
	    this.length -= 1;
	    return node;
	};
	
	DLL.prototype.empty = function () {
	    while(this.head) this.shift();
	    return this;
	};
	
	DLL.prototype.insertAfter = function(node, newNode) {
	    newNode.prev = node;
	    newNode.next = node.next;
	    if (node.next) node.next.prev = newNode;
	    else this.tail = newNode;
	    node.next = newNode;
	    this.length += 1;
	};
	
	DLL.prototype.insertBefore = function(node, newNode) {
	    newNode.prev = node.prev;
	    newNode.next = node;
	    if (node.prev) node.prev.next = newNode;
	    else this.head = newNode;
	    node.prev = newNode;
	    this.length += 1;
	};
	
	DLL.prototype.unshift = function(node) {
	    if (this.head) this.insertBefore(this.head, node);
	    else setInitial(this, node);
	};
	
	DLL.prototype.push = function(node) {
	    if (this.tail) this.insertAfter(this.tail, node);
	    else setInitial(this, node);
	};
	
	DLL.prototype.shift = function() {
	    return this.head && this.removeLink(this.head);
	};
	
	DLL.prototype.pop = function() {
	    return this.tail && this.removeLink(this.tail);
	};
	
	DLL.prototype.toArray = function () {
	    var arr = Array(this.length);
	    var curr = this.head;
	    for(var idx = 0; idx < this.length; idx++) {
	        arr[idx] = curr.data;
	        curr = curr.next;
	    }
	    return arr;
	};
	
	DLL.prototype.remove = function (testFn) {
	    var curr = this.head;
	    while(!!curr) {
	        var next = curr.next;
	        if (testFn(curr)) {
	            this.removeLink(curr);
	        }
	        curr = next;
	    }
	    return this;
	};
	
	function queue(worker, concurrency, payload) {
	    if (concurrency == null) {
	        concurrency = 1;
	    }
	    else if(concurrency === 0) {
	        throw new Error('Concurrency must not be zero');
	    }
	
	    var _worker = wrapAsync(worker);
	    var numRunning = 0;
	    var workersList = [];
	
	    var processingScheduled = false;
	    function _insert(data, insertAtFront, callback) {
	        if (callback != null && typeof callback !== 'function') {
	            throw new Error('task callback must be a function');
	        }
	        q.started = true;
	        if (!isArray(data)) {
	            data = [data];
	        }
	        if (data.length === 0 && q.idle()) {
	            // call drain immediately if there are no tasks
	            return setImmediate$1(function() {
	                q.drain();
	            });
	        }
	
	        for (var i = 0, l = data.length; i < l; i++) {
	            var item = {
	                data: data[i],
	                callback: callback || noop
	            };
	
	            if (insertAtFront) {
	                q._tasks.unshift(item);
	            } else {
	                q._tasks.push(item);
	            }
	        }
	
	        if (!processingScheduled) {
	            processingScheduled = true;
	            setImmediate$1(function() {
	                processingScheduled = false;
	                q.process();
	            });
	        }
	    }
	
	    function _next(tasks) {
	        return function(err){
	            numRunning -= 1;
	
	            for (var i = 0, l = tasks.length; i < l; i++) {
	                var task = tasks[i];
	
	                var index = baseIndexOf(workersList, task, 0);
	                if (index === 0) {
	                    workersList.shift();
	                } else if (index > 0) {
	                    workersList.splice(index, 1);
	                }
	
	                task.callback.apply(task, arguments);
	
	                if (err != null) {
	                    q.error(err, task.data);
	                }
	            }
	
	            if (numRunning <= (q.concurrency - q.buffer) ) {
	                q.unsaturated();
	            }
	
	            if (q.idle()) {
	                q.drain();
	            }
	            q.process();
	        };
	    }
	
	    var isProcessing = false;
	    var q = {
	        _tasks: new DLL(),
	        concurrency: concurrency,
	        payload: payload,
	        saturated: noop,
	        unsaturated:noop,
	        buffer: concurrency / 4,
	        empty: noop,
	        drain: noop,
	        error: noop,
	        started: false,
	        paused: false,
	        push: function (data, callback) {
	            _insert(data, false, callback);
	        },
	        kill: function () {
	            q.drain = noop;
	            q._tasks.empty();
	        },
	        unshift: function (data, callback) {
	            _insert(data, true, callback);
	        },
	        remove: function (testFn) {
	            q._tasks.remove(testFn);
	        },
	        process: function () {
	            // Avoid trying to start too many processing operations. This can occur
	            // when callbacks resolve synchronously (#1267).
	            if (isProcessing) {
	                return;
	            }
	            isProcessing = true;
	            while(!q.paused && numRunning < q.concurrency && q._tasks.length){
	                var tasks = [], data = [];
	                var l = q._tasks.length;
	                if (q.payload) l = Math.min(l, q.payload);
	                for (var i = 0; i < l; i++) {
	                    var node = q._tasks.shift();
	                    tasks.push(node);
	                    workersList.push(node);
	                    data.push(node.data);
	                }
	
	                numRunning += 1;
	
	                if (q._tasks.length === 0) {
	                    q.empty();
	                }
	
	                if (numRunning === q.concurrency) {
	                    q.saturated();
	                }
	
	                var cb = onlyOnce(_next(tasks));
	                _worker(data, cb);
	            }
	            isProcessing = false;
	        },
	        length: function () {
	            return q._tasks.length;
	        },
	        running: function () {
	            return numRunning;
	        },
	        workersList: function () {
	            return workersList;
	        },
	        idle: function() {
	            return q._tasks.length + numRunning === 0;
	        },
	        pause: function () {
	            q.paused = true;
	        },
	        resume: function () {
	            if (q.paused === false) { return; }
	            q.paused = false;
	            setImmediate$1(q.process);
	        }
	    };
	    return q;
	}
	
	/**
	 * A cargo of tasks for the worker function to complete. Cargo inherits all of
	 * the same methods and event callbacks as [`queue`]{@link module:ControlFlow.queue}.
	 * @typedef {Object} CargoObject
	 * @memberOf module:ControlFlow
	 * @property {Function} length - A function returning the number of items
	 * waiting to be processed. Invoke like `cargo.length()`.
	 * @property {number} payload - An `integer` for determining how many tasks
	 * should be process per round. This property can be changed after a `cargo` is
	 * created to alter the payload on-the-fly.
	 * @property {Function} push - Adds `task` to the `queue`. The callback is
	 * called once the `worker` has finished processing the task. Instead of a
	 * single task, an array of `tasks` can be submitted. The respective callback is
	 * used for every task in the list. Invoke like `cargo.push(task, [callback])`.
	 * @property {Function} saturated - A callback that is called when the
	 * `queue.length()` hits the concurrency and further tasks will be queued.
	 * @property {Function} empty - A callback that is called when the last item
	 * from the `queue` is given to a `worker`.
	 * @property {Function} drain - A callback that is called when the last item
	 * from the `queue` has returned from the `worker`.
	 * @property {Function} idle - a function returning false if there are items
	 * waiting or being processed, or true if not. Invoke like `cargo.idle()`.
	 * @property {Function} pause - a function that pauses the processing of tasks
	 * until `resume()` is called. Invoke like `cargo.pause()`.
	 * @property {Function} resume - a function that resumes the processing of
	 * queued tasks when the queue is paused. Invoke like `cargo.resume()`.
	 * @property {Function} kill - a function that removes the `drain` callback and
	 * empties remaining tasks from the queue forcing it to go idle. Invoke like `cargo.kill()`.
	 */
	
	/**
	 * Creates a `cargo` object with the specified payload. Tasks added to the
	 * cargo will be processed altogether (up to the `payload` limit). If the
	 * `worker` is in progress, the task is queued until it becomes available. Once
	 * the `worker` has completed some tasks, each callback of those tasks is
	 * called. Check out [these](https://camo.githubusercontent.com/6bbd36f4cf5b35a0f11a96dcd2e97711ffc2fb37/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313637363837312f36383130382f62626330636662302d356632392d313165322d393734662d3333393763363464633835382e676966) [animations](https://camo.githubusercontent.com/f4810e00e1c5f5f8addbe3e9f49064fd5d102699/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313637363837312f36383130312f38346339323036362d356632392d313165322d383134662d3964336430323431336266642e676966)
	 * for how `cargo` and `queue` work.
	 *
	 * While [`queue`]{@link module:ControlFlow.queue} passes only one task to one of a group of workers
	 * at a time, cargo passes an array of tasks to a single worker, repeating
	 * when the worker is finished.
	 *
	 * @name cargo
	 * @static
	 * @memberOf module:ControlFlow
	 * @method
	 * @see [async.queue]{@link module:ControlFlow.queue}
	 * @category Control Flow
	 * @param {AsyncFunction} worker - An asynchronous function for processing an array
	 * of queued tasks. Invoked with `(tasks, callback)`.
	 * @param {number} [payload=Infinity] - An optional `integer` for determining
	 * how many tasks should be processed per round; if omitted, the default is
	 * unlimited.
	 * @returns {module:ControlFlow.CargoObject} A cargo object to manage the tasks. Callbacks can
	 * attached as certain properties to listen for specific events during the
	 * lifecycle of the cargo and inner queue.
	 * @example
	 *
	 * // create a cargo object with payload 2
	 * var cargo = async.cargo(function(tasks, callback) {
	 *     for (var i=0; i<tasks.length; i++) {
	 *         console.log('hello ' + tasks[i].name);
	 *     }
	 *     callback();
	 * }, 2);
	 *
	 * // add some items
	 * cargo.push({name: 'foo'}, function(err) {
	 *     console.log('finished processing foo');
	 * });
	 * cargo.push({name: 'bar'}, function(err) {
	 *     console.log('finished processing bar');
	 * });
	 * cargo.push({name: 'baz'}, function(err) {
	 *     console.log('finished processing baz');
	 * });
	 */
	function cargo(worker, payload) {
	    return queue(worker, 1, payload);
	}
	
	/**
	 * The same as [`eachOf`]{@link module:Collections.eachOf} but runs only a single async operation at a time.
	 *
	 * @name eachOfSeries
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @see [async.eachOf]{@link module:Collections.eachOf}
	 * @alias forEachOfSeries
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {AsyncFunction} iteratee - An async function to apply to each item in
	 * `coll`.
	 * Invoked with (item, key, callback).
	 * @param {Function} [callback] - A callback which is called when all `iteratee`
	 * functions have finished, or an error occurs. Invoked with (err).
	 */
	var eachOfSeries = doLimit(eachOfLimit, 1);
	
	/**
	 * Reduces `coll` into a single value using an async `iteratee` to return each
	 * successive step. `memo` is the initial state of the reduction. This function
	 * only operates in series.
	 *
	 * For performance reasons, it may make sense to split a call to this function
	 * into a parallel map, and then use the normal `Array.prototype.reduce` on the
	 * results. This function is for situations where each step in the reduction
	 * needs to be async; if you can get the data before reducing it, then it's
	 * probably a good idea to do so.
	 *
	 * @name reduce
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @alias inject
	 * @alias foldl
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {*} memo - The initial state of the reduction.
	 * @param {AsyncFunction} iteratee - A function applied to each item in the
	 * array to produce the next step in the reduction.
	 * The `iteratee` should complete with the next state of the reduction.
	 * If the iteratee complete with an error, the reduction is stopped and the
	 * main `callback` is immediately called with the error.
	 * Invoked with (memo, item, callback).
	 * @param {Function} [callback] - A callback which is called after all the
	 * `iteratee` functions have finished. Result is the reduced value. Invoked with
	 * (err, result).
	 * @example
	 *
	 * async.reduce([1,2,3], 0, function(memo, item, callback) {
	 *     // pointless async:
	 *     process.nextTick(function() {
	 *         callback(null, memo + item)
	 *     });
	 * }, function(err, result) {
	 *     // result is now equal to the last value of memo, which is 6
	 * });
	 */
	function reduce(coll, memo, iteratee, callback) {
	    callback = once(callback || noop);
	    var _iteratee = wrapAsync(iteratee);
	    eachOfSeries(coll, function(x, i, callback) {
	        _iteratee(memo, x, function(err, v) {
	            memo = v;
	            callback(err);
	        });
	    }, function(err) {
	        callback(err, memo);
	    });
	}
	
	/**
	 * Version of the compose function that is more natural to read. Each function
	 * consumes the return value of the previous function. It is the equivalent of
	 * [compose]{@link module:ControlFlow.compose} with the arguments reversed.
	 *
	 * Each function is executed with the `this` binding of the composed function.
	 *
	 * @name seq
	 * @static
	 * @memberOf module:ControlFlow
	 * @method
	 * @see [async.compose]{@link module:ControlFlow.compose}
	 * @category Control Flow
	 * @param {...AsyncFunction} functions - the asynchronous functions to compose
	 * @returns {Function} a function that composes the `functions` in order
	 * @example
	 *
	 * // Requires lodash (or underscore), express3 and dresende's orm2.
	 * // Part of an app, that fetches cats of the logged user.
	 * // This example uses `seq` function to avoid overnesting and error
	 * // handling clutter.
	 * app.get('/cats', function(request, response) {
	 *     var User = request.models.User;
	 *     async.seq(
	 *         _.bind(User.get, User),  // 'User.get' has signature (id, callback(err, data))
	 *         function(user, fn) {
	 *             user.getCats(fn);      // 'getCats' has signature (callback(err, data))
	 *         }
	 *     )(req.session.user_id, function (err, cats) {
	 *         if (err) {
	 *             console.error(err);
	 *             response.json({ status: 'error', message: err.message });
	 *         } else {
	 *             response.json({ status: 'ok', message: 'Cats found', data: cats });
	 *         }
	 *     });
	 * });
	 */
	function seq(/*...functions*/) {
	    var _functions = arrayMap(arguments, wrapAsync);
	    return function(/*...args*/) {
	        var args = slice(arguments);
	        var that = this;
	
	        var cb = args[args.length - 1];
	        if (typeof cb == 'function') {
	            args.pop();
	        } else {
	            cb = noop;
	        }
	
	        reduce(_functions, args, function(newargs, fn, cb) {
	            fn.apply(that, newargs.concat(function(err/*, ...nextargs*/) {
	                var nextargs = slice(arguments, 1);
	                cb(err, nextargs);
	            }));
	        },
	        function(err, results) {
	            cb.apply(that, [err].concat(results));
	        });
	    };
	}
	
	/**
	 * Creates a function which is a composition of the passed asynchronous
	 * functions. Each function consumes the return value of the function that
	 * follows. Composing functions `f()`, `g()`, and `h()` would produce the result
	 * of `f(g(h()))`, only this version uses callbacks to obtain the return values.
	 *
	 * Each function is executed with the `this` binding of the composed function.
	 *
	 * @name compose
	 * @static
	 * @memberOf module:ControlFlow
	 * @method
	 * @category Control Flow
	 * @param {...AsyncFunction} functions - the asynchronous functions to compose
	 * @returns {Function} an asynchronous function that is the composed
	 * asynchronous `functions`
	 * @example
	 *
	 * function add1(n, callback) {
	 *     setTimeout(function () {
	 *         callback(null, n + 1);
	 *     }, 10);
	 * }
	 *
	 * function mul3(n, callback) {
	 *     setTimeout(function () {
	 *         callback(null, n * 3);
	 *     }, 10);
	 * }
	 *
	 * var add1mul3 = async.compose(mul3, add1);
	 * add1mul3(4, function (err, result) {
	 *     // result now equals 15
	 * });
	 */
	var compose = function(/*...args*/) {
	    return seq.apply(null, slice(arguments).reverse());
	};
	
	var _concat = Array.prototype.concat;
	
	/**
	 * The same as [`concat`]{@link module:Collections.concat} but runs a maximum of `limit` async operations at a time.
	 *
	 * @name concatLimit
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @see [async.concat]{@link module:Collections.concat}
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {number} limit - The maximum number of async operations at a time.
	 * @param {AsyncFunction} iteratee - A function to apply to each item in `coll`,
	 * which should use an array as its result. Invoked with (item, callback).
	 * @param {Function} [callback] - A callback which is called after all the
	 * `iteratee` functions have finished, or an error occurs. Results is an array
	 * containing the concatenated results of the `iteratee` function. Invoked with
	 * (err, results).
	 */
	var concatLimit = function(coll, limit, iteratee, callback) {
	    callback = callback || noop;
	    var _iteratee = wrapAsync(iteratee);
	    mapLimit(coll, limit, function(val, callback) {
	        _iteratee(val, function(err /*, ...args*/) {
	            if (err) return callback(err);
	            return callback(null, slice(arguments, 1));
	        });
	    }, function(err, mapResults) {
	        var result = [];
	        for (var i = 0; i < mapResults.length; i++) {
	            if (mapResults[i]) {
	                result = _concat.apply(result, mapResults[i]);
	            }
	        }
	
	        return callback(err, result);
	    });
	};
	
	/**
	 * Applies `iteratee` to each item in `coll`, concatenating the results. Returns
	 * the concatenated list. The `iteratee`s are called in parallel, and the
	 * results are concatenated as they return. There is no guarantee that the
	 * results array will be returned in the original order of `coll` passed to the
	 * `iteratee` function.
	 *
	 * @name concat
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {AsyncFunction} iteratee - A function to apply to each item in `coll`,
	 * which should use an array as its result. Invoked with (item, callback).
	 * @param {Function} [callback(err)] - A callback which is called after all the
	 * `iteratee` functions have finished, or an error occurs. Results is an array
	 * containing the concatenated results of the `iteratee` function. Invoked with
	 * (err, results).
	 * @example
	 *
	 * async.concat(['dir1','dir2','dir3'], fs.readdir, function(err, files) {
	 *     // files is now a list of filenames that exist in the 3 directories
	 * });
	 */
	var concat = doLimit(concatLimit, Infinity);
	
	/**
	 * The same as [`concat`]{@link module:Collections.concat} but runs only a single async operation at a time.
	 *
	 * @name concatSeries
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @see [async.concat]{@link module:Collections.concat}
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {AsyncFunction} iteratee - A function to apply to each item in `coll`.
	 * The iteratee should complete with an array an array of results.
	 * Invoked with (item, callback).
	 * @param {Function} [callback(err)] - A callback which is called after all the
	 * `iteratee` functions have finished, or an error occurs. Results is an array
	 * containing the concatenated results of the `iteratee` function. Invoked with
	 * (err, results).
	 */
	var concatSeries = doLimit(concatLimit, 1);
	
	/**
	 * Returns a function that when called, calls-back with the values provided.
	 * Useful as the first function in a [`waterfall`]{@link module:ControlFlow.waterfall}, or for plugging values in to
	 * [`auto`]{@link module:ControlFlow.auto}.
	 *
	 * @name constant
	 * @static
	 * @memberOf module:Utils
	 * @method
	 * @category Util
	 * @param {...*} arguments... - Any number of arguments to automatically invoke
	 * callback with.
	 * @returns {AsyncFunction} Returns a function that when invoked, automatically
	 * invokes the callback with the previous given arguments.
	 * @example
	 *
	 * async.waterfall([
	 *     async.constant(42),
	 *     function (value, next) {
	 *         // value === 42
	 *     },
	 *     //...
	 * ], callback);
	 *
	 * async.waterfall([
	 *     async.constant(filename, "utf8"),
	 *     fs.readFile,
	 *     function (fileData, next) {
	 *         //...
	 *     }
	 *     //...
	 * ], callback);
	 *
	 * async.auto({
	 *     hostname: async.constant("https://server.net/"),
	 *     port: findFreePort,
	 *     launchServer: ["hostname", "port", function (options, cb) {
	 *         startServer(options, cb);
	 *     }],
	 *     //...
	 * }, callback);
	 */
	var constant = function(/*...values*/) {
	    var values = slice(arguments);
	    var args = [null].concat(values);
	    return function (/*...ignoredArgs, callback*/) {
	        var callback = arguments[arguments.length - 1];
	        return callback.apply(this, args);
	    };
	};
	
	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	function _createTester(check, getResult) {
	    return function(eachfn, arr, iteratee, cb) {
	        cb = cb || noop;
	        var testPassed = false;
	        var testResult;
	        eachfn(arr, function(value, _, callback) {
	            iteratee(value, function(err, result) {
	                if (err) {
	                    callback(err);
	                } else if (check(result) && !testResult) {
	                    testPassed = true;
	                    testResult = getResult(true, value);
	                    callback(null, breakLoop);
	                } else {
	                    callback();
	                }
	            });
	        }, function(err) {
	            if (err) {
	                cb(err);
	            } else {
	                cb(null, testPassed ? testResult : getResult(false));
	            }
	        });
	    };
	}
	
	function _findGetResult(v, x) {
	    return x;
	}
	
	/**
	 * Returns the first value in `coll` that passes an async truth test. The
	 * `iteratee` is applied in parallel, meaning the first iteratee to return
	 * `true` will fire the detect `callback` with that result. That means the
	 * result might not be the first item in the original `coll` (in terms of order)
	 * that passes the test.
	
	 * If order within the original `coll` is important, then look at
	 * [`detectSeries`]{@link module:Collections.detectSeries}.
	 *
	 * @name detect
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @alias find
	 * @category Collections
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {AsyncFunction} iteratee - A truth test to apply to each item in `coll`.
	 * The iteratee must complete with a boolean value as its result.
	 * Invoked with (item, callback).
	 * @param {Function} [callback] - A callback which is called as soon as any
	 * iteratee returns `true`, or after all the `iteratee` functions have finished.
	 * Result will be the first item in the array that passes the truth test
	 * (iteratee) or the value `undefined` if none passed. Invoked with
	 * (err, result).
	 * @example
	 *
	 * async.detect(['file1','file2','file3'], function(filePath, callback) {
	 *     fs.access(filePath, function(err) {
	 *         callback(null, !err)
	 *     });
	 * }, function(err, result) {
	 *     // result now equals the first file in the list that exists
	 * });
	 */
	var detect = doParallel(_createTester(identity, _findGetResult));
	
	/**
	 * The same as [`detect`]{@link module:Collections.detect} but runs a maximum of `limit` async operations at a
	 * time.
	 *
	 * @name detectLimit
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @see [async.detect]{@link module:Collections.detect}
	 * @alias findLimit
	 * @category Collections
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {number} limit - The maximum number of async operations at a time.
	 * @param {AsyncFunction} iteratee - A truth test to apply to each item in `coll`.
	 * The iteratee must complete with a boolean value as its result.
	 * Invoked with (item, callback).
	 * @param {Function} [callback] - A callback which is called as soon as any
	 * iteratee returns `true`, or after all the `iteratee` functions have finished.
	 * Result will be the first item in the array that passes the truth test
	 * (iteratee) or the value `undefined` if none passed. Invoked with
	 * (err, result).
	 */
	var detectLimit = doParallelLimit(_createTester(identity, _findGetResult));
	
	/**
	 * The same as [`detect`]{@link module:Collections.detect} but runs only a single async operation at a time.
	 *
	 * @name detectSeries
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @see [async.detect]{@link module:Collections.detect}
	 * @alias findSeries
	 * @category Collections
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {AsyncFunction} iteratee - A truth test to apply to each item in `coll`.
	 * The iteratee must complete with a boolean value as its result.
	 * Invoked with (item, callback).
	 * @param {Function} [callback] - A callback which is called as soon as any
	 * iteratee returns `true`, or after all the `iteratee` functions have finished.
	 * Result will be the first item in the array that passes the truth test
	 * (iteratee) or the value `undefined` if none passed. Invoked with
	 * (err, result).
	 */
	var detectSeries = doLimit(detectLimit, 1);
	
	function consoleFunc(name) {
	    return function (fn/*, ...args*/) {
	        var args = slice(arguments, 1);
	        args.push(function (err/*, ...args*/) {
	            var args = slice(arguments, 1);
	            if (typeof console === 'object') {
	                if (err) {
	                    if (console.error) {
	                        console.error(err);
	                    }
	                } else if (console[name]) {
	                    arrayEach(args, function (x) {
	                        console[name](x);
	                    });
	                }
	            }
	        });
	        wrapAsync(fn).apply(null, args);
	    };
	}
	
	/**
	 * Logs the result of an [`async` function]{@link AsyncFunction} to the
	 * `console` using `console.dir` to display the properties of the resulting object.
	 * Only works in Node.js or in browsers that support `console.dir` and
	 * `console.error` (such as FF and Chrome).
	 * If multiple arguments are returned from the async function,
	 * `console.dir` is called on each argument in order.
	 *
	 * @name dir
	 * @static
	 * @memberOf module:Utils
	 * @method
	 * @category Util
	 * @param {AsyncFunction} function - The function you want to eventually apply
	 * all arguments to.
	 * @param {...*} arguments... - Any number of arguments to apply to the function.
	 * @example
	 *
	 * // in a module
	 * var hello = function(name, callback) {
	 *     setTimeout(function() {
	 *         callback(null, {hello: name});
	 *     }, 1000);
	 * };
	 *
	 * // in the node repl
	 * node> async.dir(hello, 'world');
	 * {hello: 'world'}
	 */
	var dir = consoleFunc('dir');
	
	/**
	 * The post-check version of [`during`]{@link module:ControlFlow.during}. To reflect the difference in
	 * the order of operations, the arguments `test` and `fn` are switched.
	 *
	 * Also a version of [`doWhilst`]{@link module:ControlFlow.doWhilst} with asynchronous `test` function.
	 * @name doDuring
	 * @static
	 * @memberOf module:ControlFlow
	 * @method
	 * @see [async.during]{@link module:ControlFlow.during}
	 * @category Control Flow
	 * @param {AsyncFunction} fn - An async function which is called each time
	 * `test` passes. Invoked with (callback).
	 * @param {AsyncFunction} test - asynchronous truth test to perform before each
	 * execution of `fn`. Invoked with (...args, callback), where `...args` are the
	 * non-error args from the previous callback of `fn`.
	 * @param {Function} [callback] - A callback which is called after the test
	 * function has failed and repeated execution of `fn` has stopped. `callback`
	 * will be passed an error if one occurred, otherwise `null`.
	 */
	function doDuring(fn, test, callback) {
	    callback = onlyOnce(callback || noop);
	    var _fn = wrapAsync(fn);
	    var _test = wrapAsync(test);
	
	    function next(err/*, ...args*/) {
	        if (err) return callback(err);
	        var args = slice(arguments, 1);
	        args.push(check);
	        _test.apply(this, args);
	    }
	
	    function check(err, truth) {
	        if (err) return callback(err);
	        if (!truth) return callback(null);
	        _fn(next);
	    }
	
	    check(null, true);
	
	}
	
	/**
	 * The post-check version of [`whilst`]{@link module:ControlFlow.whilst}. To reflect the difference in
	 * the order of operations, the arguments `test` and `iteratee` are switched.
	 *
	 * `doWhilst` is to `whilst` as `do while` is to `while` in plain JavaScript.
	 *
	 * @name doWhilst
	 * @static
	 * @memberOf module:ControlFlow
	 * @method
	 * @see [async.whilst]{@link module:ControlFlow.whilst}
	 * @category Control Flow
	 * @param {AsyncFunction} iteratee - A function which is called each time `test`
	 * passes. Invoked with (callback).
	 * @param {Function} test - synchronous truth test to perform after each
	 * execution of `iteratee`. Invoked with any non-error callback results of
	 * `iteratee`.
	 * @param {Function} [callback] - A callback which is called after the test
	 * function has failed and repeated execution of `iteratee` has stopped.
	 * `callback` will be passed an error and any arguments passed to the final
	 * `iteratee`'s callback. Invoked with (err, [results]);
	 */
	function doWhilst(iteratee, test, callback) {
	    callback = onlyOnce(callback || noop);
	    var _iteratee = wrapAsync(iteratee);
	    var next = function(err/*, ...args*/) {
	        if (err) return callback(err);
	        var args = slice(arguments, 1);
	        if (test.apply(this, args)) return _iteratee(next);
	        callback.apply(null, [null].concat(args));
	    };
	    _iteratee(next);
	}
	
	/**
	 * Like ['doWhilst']{@link module:ControlFlow.doWhilst}, except the `test` is inverted. Note the
	 * argument ordering differs from `until`.
	 *
	 * @name doUntil
	 * @static
	 * @memberOf module:ControlFlow
	 * @method
	 * @see [async.doWhilst]{@link module:ControlFlow.doWhilst}
	 * @category Control Flow
	 * @param {AsyncFunction} iteratee - An async function which is called each time
	 * `test` fails. Invoked with (callback).
	 * @param {Function} test - synchronous truth test to perform after each
	 * execution of `iteratee`. Invoked with any non-error callback results of
	 * `iteratee`.
	 * @param {Function} [callback] - A callback which is called after the test
	 * function has passed and repeated execution of `iteratee` has stopped. `callback`
	 * will be passed an error and any arguments passed to the final `iteratee`'s
	 * callback. Invoked with (err, [results]);
	 */
	function doUntil(iteratee, test, callback) {
	    doWhilst(iteratee, function() {
	        return !test.apply(this, arguments);
	    }, callback);
	}
	
	/**
	 * Like [`whilst`]{@link module:ControlFlow.whilst}, except the `test` is an asynchronous function that
	 * is passed a callback in the form of `function (err, truth)`. If error is
	 * passed to `test` or `fn`, the main callback is immediately called with the
	 * value of the error.
	 *
	 * @name during
	 * @static
	 * @memberOf module:ControlFlow
	 * @method
	 * @see [async.whilst]{@link module:ControlFlow.whilst}
	 * @category Control Flow
	 * @param {AsyncFunction} test - asynchronous truth test to perform before each
	 * execution of `fn`. Invoked with (callback).
	 * @param {AsyncFunction} fn - An async function which is called each time
	 * `test` passes. Invoked with (callback).
	 * @param {Function} [callback] - A callback which is called after the test
	 * function has failed and repeated execution of `fn` has stopped. `callback`
	 * will be passed an error, if one occurred, otherwise `null`.
	 * @example
	 *
	 * var count = 0;
	 *
	 * async.during(
	 *     function (callback) {
	 *         return callback(null, count < 5);
	 *     },
	 *     function (callback) {
	 *         count++;
	 *         setTimeout(callback, 1000);
	 *     },
	 *     function (err) {
	 *         // 5 seconds have passed
	 *     }
	 * );
	 */
	function during(test, fn, callback) {
	    callback = onlyOnce(callback || noop);
	    var _fn = wrapAsync(fn);
	    var _test = wrapAsync(test);
	
	    function next(err) {
	        if (err) return callback(err);
	        _test(check);
	    }
	
	    function check(err, truth) {
	        if (err) return callback(err);
	        if (!truth) return callback(null);
	        _fn(next);
	    }
	
	    _test(check);
	}
	
	function _withoutIndex(iteratee) {
	    return function (value, index, callback) {
	        return iteratee(value, callback);
	    };
	}
	
	/**
	 * Applies the function `iteratee` to each item in `coll`, in parallel.
	 * The `iteratee` is called with an item from the list, and a callback for when
	 * it has finished. If the `iteratee` passes an error to its `callback`, the
	 * main `callback` (for the `each` function) is immediately called with the
	 * error.
	 *
	 * Note, that since this function applies `iteratee` to each item in parallel,
	 * there is no guarantee that the iteratee functions will complete in order.
	 *
	 * @name each
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @alias forEach
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {AsyncFunction} iteratee - An async function to apply to
	 * each item in `coll`. Invoked with (item, callback).
	 * The array index is not passed to the iteratee.
	 * If you need the index, use `eachOf`.
	 * @param {Function} [callback] - A callback which is called when all
	 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
	 * @example
	 *
	 * // assuming openFiles is an array of file names and saveFile is a function
	 * // to save the modified contents of that file:
	 *
	 * async.each(openFiles, saveFile, function(err){
	 *   // if any of the saves produced an error, err would equal that error
	 * });
	 *
	 * // assuming openFiles is an array of file names
	 * async.each(openFiles, function(file, callback) {
	 *
	 *     // Perform operation on file here.
	 *     console.log('Processing file ' + file);
	 *
	 *     if( file.length > 32 ) {
	 *       console.log('This file name is too long');
	 *       callback('File name too long');
	 *     } else {
	 *       // Do work to process file here
	 *       console.log('File processed');
	 *       callback();
	 *     }
	 * }, function(err) {
	 *     // if any of the file processing produced an error, err would equal that error
	 *     if( err ) {
	 *       // One of the iterations produced an error.
	 *       // All processing will now stop.
	 *       console.log('A file failed to process');
	 *     } else {
	 *       console.log('All files have been processed successfully');
	 *     }
	 * });
	 */
	function eachLimit(coll, iteratee, callback) {
	    eachOf(coll, _withoutIndex(wrapAsync(iteratee)), callback);
	}
	
	/**
	 * The same as [`each`]{@link module:Collections.each} but runs a maximum of `limit` async operations at a time.
	 *
	 * @name eachLimit
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @see [async.each]{@link module:Collections.each}
	 * @alias forEachLimit
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {number} limit - The maximum number of async operations at a time.
	 * @param {AsyncFunction} iteratee - An async function to apply to each item in
	 * `coll`.
	 * The array index is not passed to the iteratee.
	 * If you need the index, use `eachOfLimit`.
	 * Invoked with (item, callback).
	 * @param {Function} [callback] - A callback which is called when all
	 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
	 */
	function eachLimit$1(coll, limit, iteratee, callback) {
	    _eachOfLimit(limit)(coll, _withoutIndex(wrapAsync(iteratee)), callback);
	}
	
	/**
	 * The same as [`each`]{@link module:Collections.each} but runs only a single async operation at a time.
	 *
	 * @name eachSeries
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @see [async.each]{@link module:Collections.each}
	 * @alias forEachSeries
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {AsyncFunction} iteratee - An async function to apply to each
	 * item in `coll`.
	 * The array index is not passed to the iteratee.
	 * If you need the index, use `eachOfSeries`.
	 * Invoked with (item, callback).
	 * @param {Function} [callback] - A callback which is called when all
	 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
	 */
	var eachSeries = doLimit(eachLimit$1, 1);
	
	/**
	 * Wrap an async function and ensure it calls its callback on a later tick of
	 * the event loop.  If the function already calls its callback on a next tick,
	 * no extra deferral is added. This is useful for preventing stack overflows
	 * (`RangeError: Maximum call stack size exceeded`) and generally keeping
	 * [Zalgo](http://blog.izs.me/post/59142742143/designing-apis-for-asynchrony)
	 * contained. ES2017 `async` functions are returned as-is -- they are immune
	 * to Zalgo's corrupting influences, as they always resolve on a later tick.
	 *
	 * @name ensureAsync
	 * @static
	 * @memberOf module:Utils
	 * @method
	 * @category Util
	 * @param {AsyncFunction} fn - an async function, one that expects a node-style
	 * callback as its last argument.
	 * @returns {AsyncFunction} Returns a wrapped function with the exact same call
	 * signature as the function passed in.
	 * @example
	 *
	 * function sometimesAsync(arg, callback) {
	 *     if (cache[arg]) {
	 *         return callback(null, cache[arg]); // this would be synchronous!!
	 *     } else {
	 *         doSomeIO(arg, callback); // this IO would be asynchronous
	 *     }
	 * }
	 *
	 * // this has a risk of stack overflows if many results are cached in a row
	 * async.mapSeries(args, sometimesAsync, done);
	 *
	 * // this will defer sometimesAsync's callback if necessary,
	 * // preventing stack overflows
	 * async.mapSeries(args, async.ensureAsync(sometimesAsync), done);
	 */
	function ensureAsync(fn) {
	    if (isAsync(fn)) return fn;
	    return initialParams(function (args, callback) {
	        var sync = true;
	        args.push(function () {
	            var innerArgs = arguments;
	            if (sync) {
	                setImmediate$1(function () {
	                    callback.apply(null, innerArgs);
	                });
	            } else {
	                callback.apply(null, innerArgs);
	            }
	        });
	        fn.apply(this, args);
	        sync = false;
	    });
	}
	
	function notId(v) {
	    return !v;
	}
	
	/**
	 * Returns `true` if every element in `coll` satisfies an async test. If any
	 * iteratee call returns `false`, the main `callback` is immediately called.
	 *
	 * @name every
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @alias all
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
	 * in the collection in parallel.
	 * The iteratee must complete with a boolean result value.
	 * Invoked with (item, callback).
	 * @param {Function} [callback] - A callback which is called after all the
	 * `iteratee` functions have finished. Result will be either `true` or `false`
	 * depending on the values of the async tests. Invoked with (err, result).
	 * @example
	 *
	 * async.every(['file1','file2','file3'], function(filePath, callback) {
	 *     fs.access(filePath, function(err) {
	 *         callback(null, !err)
	 *     });
	 * }, function(err, result) {
	 *     // if result is true then every file exists
	 * });
	 */
	var every = doParallel(_createTester(notId, notId));
	
	/**
	 * The same as [`every`]{@link module:Collections.every} but runs a maximum of `limit` async operations at a time.
	 *
	 * @name everyLimit
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @see [async.every]{@link module:Collections.every}
	 * @alias allLimit
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {number} limit - The maximum number of async operations at a time.
	 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
	 * in the collection in parallel.
	 * The iteratee must complete with a boolean result value.
	 * Invoked with (item, callback).
	 * @param {Function} [callback] - A callback which is called after all the
	 * `iteratee` functions have finished. Result will be either `true` or `false`
	 * depending on the values of the async tests. Invoked with (err, result).
	 */
	var everyLimit = doParallelLimit(_createTester(notId, notId));
	
	/**
	 * The same as [`every`]{@link module:Collections.every} but runs only a single async operation at a time.
	 *
	 * @name everySeries
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @see [async.every]{@link module:Collections.every}
	 * @alias allSeries
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
	 * in the collection in series.
	 * The iteratee must complete with a boolean result value.
	 * Invoked with (item, callback).
	 * @param {Function} [callback] - A callback which is called after all the
	 * `iteratee` functions have finished. Result will be either `true` or `false`
	 * depending on the values of the async tests. Invoked with (err, result).
	 */
	var everySeries = doLimit(everyLimit, 1);
	
	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	function filterArray(eachfn, arr, iteratee, callback) {
	    var truthValues = new Array(arr.length);
	    eachfn(arr, function (x, index, callback) {
	        iteratee(x, function (err, v) {
	            truthValues[index] = !!v;
	            callback(err);
	        });
	    }, function (err) {
	        if (err) return callback(err);
	        var results = [];
	        for (var i = 0; i < arr.length; i++) {
	            if (truthValues[i]) results.push(arr[i]);
	        }
	        callback(null, results);
	    });
	}
	
	function filterGeneric(eachfn, coll, iteratee, callback) {
	    var results = [];
	    eachfn(coll, function (x, index, callback) {
	        iteratee(x, function (err, v) {
	            if (err) {
	                callback(err);
	            } else {
	                if (v) {
	                    results.push({index: index, value: x});
	                }
	                callback();
	            }
	        });
	    }, function (err) {
	        if (err) {
	            callback(err);
	        } else {
	            callback(null, arrayMap(results.sort(function (a, b) {
	                return a.index - b.index;
	            }), baseProperty('value')));
	        }
	    });
	}
	
	function _filter(eachfn, coll, iteratee, callback) {
	    var filter = isArrayLike(coll) ? filterArray : filterGeneric;
	    filter(eachfn, coll, wrapAsync(iteratee), callback || noop);
	}
	
	/**
	 * Returns a new array of all the values in `coll` which pass an async truth
	 * test. This operation is performed in parallel, but the results array will be
	 * in the same order as the original.
	 *
	 * @name filter
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @alias select
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {Function} iteratee - A truth test to apply to each item in `coll`.
	 * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
	 * with a boolean argument once it has completed. Invoked with (item, callback).
	 * @param {Function} [callback] - A callback which is called after all the
	 * `iteratee` functions have finished. Invoked with (err, results).
	 * @example
	 *
	 * async.filter(['file1','file2','file3'], function(filePath, callback) {
	 *     fs.access(filePath, function(err) {
	 *         callback(null, !err)
	 *     });
	 * }, function(err, results) {
	 *     // results now equals an array of the existing files
	 * });
	 */
	var filter = doParallel(_filter);
	
	/**
	 * The same as [`filter`]{@link module:Collections.filter} but runs a maximum of `limit` async operations at a
	 * time.
	 *
	 * @name filterLimit
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @see [async.filter]{@link module:Collections.filter}
	 * @alias selectLimit
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {number} limit - The maximum number of async operations at a time.
	 * @param {Function} iteratee - A truth test to apply to each item in `coll`.
	 * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
	 * with a boolean argument once it has completed. Invoked with (item, callback).
	 * @param {Function} [callback] - A callback which is called after all the
	 * `iteratee` functions have finished. Invoked with (err, results).
	 */
	var filterLimit = doParallelLimit(_filter);
	
	/**
	 * The same as [`filter`]{@link module:Collections.filter} but runs only a single async operation at a time.
	 *
	 * @name filterSeries
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @see [async.filter]{@link module:Collections.filter}
	 * @alias selectSeries
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {Function} iteratee - A truth test to apply to each item in `coll`.
	 * The `iteratee` is passed a `callback(err, truthValue)`, which must be called
	 * with a boolean argument once it has completed. Invoked with (item, callback).
	 * @param {Function} [callback] - A callback which is called after all the
	 * `iteratee` functions have finished. Invoked with (err, results)
	 */
	var filterSeries = doLimit(filterLimit, 1);
	
	/**
	 * Calls the asynchronous function `fn` with a callback parameter that allows it
	 * to call itself again, in series, indefinitely.
	
	 * If an error is passed to the callback then `errback` is called with the
	 * error, and execution stops, otherwise it will never be called.
	 *
	 * @name forever
	 * @static
	 * @memberOf module:ControlFlow
	 * @method
	 * @category Control Flow
	 * @param {AsyncFunction} fn - an async function to call repeatedly.
	 * Invoked with (next).
	 * @param {Function} [errback] - when `fn` passes an error to it's callback,
	 * this function will be called, and execution stops. Invoked with (err).
	 * @example
	 *
	 * async.forever(
	 *     function(next) {
	 *         // next is suitable for passing to things that need a callback(err [, whatever]);
	 *         // it will result in this function being called again.
	 *     },
	 *     function(err) {
	 *         // if next is called with a value in its first parameter, it will appear
	 *         // in here as 'err', and execution will stop.
	 *     }
	 * );
	 */
	function forever(fn, errback) {
	    var done = onlyOnce(errback || noop);
	    var task = wrapAsync(ensureAsync(fn));
	
	    function next(err) {
	        if (err) return done(err);
	        task(next);
	    }
	    next();
	}
	
	/**
	 * The same as [`groupBy`]{@link module:Collections.groupBy} but runs a maximum of `limit` async operations at a time.
	 *
	 * @name groupByLimit
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @see [async.groupBy]{@link module:Collections.groupBy}
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {number} limit - The maximum number of async operations at a time.
	 * @param {AsyncFunction} iteratee - An async function to apply to each item in
	 * `coll`.
	 * The iteratee should complete with a `key` to group the value under.
	 * Invoked with (value, callback).
	 * @param {Function} [callback] - A callback which is called when all `iteratee`
	 * functions have finished, or an error occurs. Result is an `Object` whoses
	 * properties are arrays of values which returned the corresponding key.
	 */
	var groupByLimit = function(coll, limit, iteratee, callback) {
	    callback = callback || noop;
	    var _iteratee = wrapAsync(iteratee);
	    mapLimit(coll, limit, function(val, callback) {
	        _iteratee(val, function(err, key) {
	            if (err) return callback(err);
	            return callback(null, {key: key, val: val});
	        });
	    }, function(err, mapResults) {
	        var result = {};
	        // from MDN, handle object having an `hasOwnProperty` prop
	        var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	        for (var i = 0; i < mapResults.length; i++) {
	            if (mapResults[i]) {
	                var key = mapResults[i].key;
	                var val = mapResults[i].val;
	
	                if (hasOwnProperty.call(result, key)) {
	                    result[key].push(val);
	                } else {
	                    result[key] = [val];
	                }
	            }
	        }
	
	        return callback(err, result);
	    });
	};
	
	/**
	 * Returns a new object, where each value corresponds to an array of items, from
	 * `coll`, that returned the corresponding key. That is, the keys of the object
	 * correspond to the values passed to the `iteratee` callback.
	 *
	 * Note: Since this function applies the `iteratee` to each item in parallel,
	 * there is no guarantee that the `iteratee` functions will complete in order.
	 * However, the values for each key in the `result` will be in the same order as
	 * the original `coll`. For Objects, the values will roughly be in the order of
	 * the original Objects' keys (but this can vary across JavaScript engines).
	 *
	 * @name groupBy
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {AsyncFunction} iteratee - An async function to apply to each item in
	 * `coll`.
	 * The iteratee should complete with a `key` to group the value under.
	 * Invoked with (value, callback).
	 * @param {Function} [callback] - A callback which is called when all `iteratee`
	 * functions have finished, or an error occurs. Result is an `Object` whoses
	 * properties are arrays of values which returned the corresponding key.
	 * @example
	 *
	 * async.groupBy(['userId1', 'userId2', 'userId3'], function(userId, callback) {
	 *     db.findById(userId, function(err, user) {
	 *         if (err) return callback(err);
	 *         return callback(null, user.age);
	 *     });
	 * }, function(err, result) {
	 *     // result is object containing the userIds grouped by age
	 *     // e.g. { 30: ['userId1', 'userId3'], 42: ['userId2']};
	 * });
	 */
	var groupBy = doLimit(groupByLimit, Infinity);
	
	/**
	 * The same as [`groupBy`]{@link module:Collections.groupBy} but runs only a single async operation at a time.
	 *
	 * @name groupBySeries
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @see [async.groupBy]{@link module:Collections.groupBy}
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {number} limit - The maximum number of async operations at a time.
	 * @param {AsyncFunction} iteratee - An async function to apply to each item in
	 * `coll`.
	 * The iteratee should complete with a `key` to group the value under.
	 * Invoked with (value, callback).
	 * @param {Function} [callback] - A callback which is called when all `iteratee`
	 * functions have finished, or an error occurs. Result is an `Object` whoses
	 * properties are arrays of values which returned the corresponding key.
	 */
	var groupBySeries = doLimit(groupByLimit, 1);
	
	/**
	 * Logs the result of an `async` function to the `console`. Only works in
	 * Node.js or in browsers that support `console.log` and `console.error` (such
	 * as FF and Chrome). If multiple arguments are returned from the async
	 * function, `console.log` is called on each argument in order.
	 *
	 * @name log
	 * @static
	 * @memberOf module:Utils
	 * @method
	 * @category Util
	 * @param {AsyncFunction} function - The function you want to eventually apply
	 * all arguments to.
	 * @param {...*} arguments... - Any number of arguments to apply to the function.
	 * @example
	 *
	 * // in a module
	 * var hello = function(name, callback) {
	 *     setTimeout(function() {
	 *         callback(null, 'hello ' + name);
	 *     }, 1000);
	 * };
	 *
	 * // in the node repl
	 * node> async.log(hello, 'world');
	 * 'hello world'
	 */
	var log = consoleFunc('log');
	
	/**
	 * The same as [`mapValues`]{@link module:Collections.mapValues} but runs a maximum of `limit` async operations at a
	 * time.
	 *
	 * @name mapValuesLimit
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @see [async.mapValues]{@link module:Collections.mapValues}
	 * @category Collection
	 * @param {Object} obj - A collection to iterate over.
	 * @param {number} limit - The maximum number of async operations at a time.
	 * @param {AsyncFunction} iteratee - A function to apply to each value and key
	 * in `coll`.
	 * The iteratee should complete with the transformed value as its result.
	 * Invoked with (value, key, callback).
	 * @param {Function} [callback] - A callback which is called when all `iteratee`
	 * functions have finished, or an error occurs. `result` is a new object consisting
	 * of each key from `obj`, with each transformed value on the right-hand side.
	 * Invoked with (err, result).
	 */
	function mapValuesLimit(obj, limit, iteratee, callback) {
	    callback = once(callback || noop);
	    var newObj = {};
	    var _iteratee = wrapAsync(iteratee);
	    eachOfLimit(obj, limit, function(val, key, next) {
	        _iteratee(val, key, function (err, result) {
	            if (err) return next(err);
	            newObj[key] = result;
	            next();
	        });
	    }, function (err) {
	        callback(err, newObj);
	    });
	}
	
	/**
	 * A relative of [`map`]{@link module:Collections.map}, designed for use with objects.
	 *
	 * Produces a new Object by mapping each value of `obj` through the `iteratee`
	 * function. The `iteratee` is called each `value` and `key` from `obj` and a
	 * callback for when it has finished processing. Each of these callbacks takes
	 * two arguments: an `error`, and the transformed item from `obj`. If `iteratee`
	 * passes an error to its callback, the main `callback` (for the `mapValues`
	 * function) is immediately called with the error.
	 *
	 * Note, the order of the keys in the result is not guaranteed.  The keys will
	 * be roughly in the order they complete, (but this is very engine-specific)
	 *
	 * @name mapValues
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @category Collection
	 * @param {Object} obj - A collection to iterate over.
	 * @param {AsyncFunction} iteratee - A function to apply to each value and key
	 * in `coll`.
	 * The iteratee should complete with the transformed value as its result.
	 * Invoked with (value, key, callback).
	 * @param {Function} [callback] - A callback which is called when all `iteratee`
	 * functions have finished, or an error occurs. `result` is a new object consisting
	 * of each key from `obj`, with each transformed value on the right-hand side.
	 * Invoked with (err, result).
	 * @example
	 *
	 * async.mapValues({
	 *     f1: 'file1',
	 *     f2: 'file2',
	 *     f3: 'file3'
	 * }, function (file, key, callback) {
	 *   fs.stat(file, callback);
	 * }, function(err, result) {
	 *     // result is now a map of stats for each file, e.g.
	 *     // {
	 *     //     f1: [stats for file1],
	 *     //     f2: [stats for file2],
	 *     //     f3: [stats for file3]
	 *     // }
	 * });
	 */
	
	var mapValues = doLimit(mapValuesLimit, Infinity);
	
	/**
	 * The same as [`mapValues`]{@link module:Collections.mapValues} but runs only a single async operation at a time.
	 *
	 * @name mapValuesSeries
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @see [async.mapValues]{@link module:Collections.mapValues}
	 * @category Collection
	 * @param {Object} obj - A collection to iterate over.
	 * @param {AsyncFunction} iteratee - A function to apply to each value and key
	 * in `coll`.
	 * The iteratee should complete with the transformed value as its result.
	 * Invoked with (value, key, callback).
	 * @param {Function} [callback] - A callback which is called when all `iteratee`
	 * functions have finished, or an error occurs. `result` is a new object consisting
	 * of each key from `obj`, with each transformed value on the right-hand side.
	 * Invoked with (err, result).
	 */
	var mapValuesSeries = doLimit(mapValuesLimit, 1);
	
	function has(obj, key) {
	    return key in obj;
	}
	
	/**
	 * Caches the results of an async function. When creating a hash to store
	 * function results against, the callback is omitted from the hash and an
	 * optional hash function can be used.
	 *
	 * If no hash function is specified, the first argument is used as a hash key,
	 * which may work reasonably if it is a string or a data type that converts to a
	 * distinct string. Note that objects and arrays will not behave reasonably.
	 * Neither will cases where the other arguments are significant. In such cases,
	 * specify your own hash function.
	 *
	 * The cache of results is exposed as the `memo` property of the function
	 * returned by `memoize`.
	 *
	 * @name memoize
	 * @static
	 * @memberOf module:Utils
	 * @method
	 * @category Util
	 * @param {AsyncFunction} fn - The async function to proxy and cache results from.
	 * @param {Function} hasher - An optional function for generating a custom hash
	 * for storing results. It has all the arguments applied to it apart from the
	 * callback, and must be synchronous.
	 * @returns {AsyncFunction} a memoized version of `fn`
	 * @example
	 *
	 * var slow_fn = function(name, callback) {
	 *     // do something
	 *     callback(null, result);
	 * };
	 * var fn = async.memoize(slow_fn);
	 *
	 * // fn can now be used as if it were slow_fn
	 * fn('some name', function() {
	 *     // callback
	 * });
	 */
	function memoize(fn, hasher) {
	    var memo = Object.create(null);
	    var queues = Object.create(null);
	    hasher = hasher || identity;
	    var _fn = wrapAsync(fn);
	    var memoized = initialParams(function memoized(args, callback) {
	        var key = hasher.apply(null, args);
	        if (has(memo, key)) {
	            setImmediate$1(function() {
	                callback.apply(null, memo[key]);
	            });
	        } else if (has(queues, key)) {
	            queues[key].push(callback);
	        } else {
	            queues[key] = [callback];
	            _fn.apply(null, args.concat(function(/*args*/) {
	                var args = slice(arguments);
	                memo[key] = args;
	                var q = queues[key];
	                delete queues[key];
	                for (var i = 0, l = q.length; i < l; i++) {
	                    q[i].apply(null, args);
	                }
	            }));
	        }
	    });
	    memoized.memo = memo;
	    memoized.unmemoized = fn;
	    return memoized;
	}
	
	/**
	 * Calls `callback` on a later loop around the event loop. In Node.js this just
	 * calls `process.nextTicl`.  In the browser it will use `setImmediate` if
	 * available, otherwise `setTimeout(callback, 0)`, which means other higher
	 * priority events may precede the execution of `callback`.
	 *
	 * This is used internally for browser-compatibility purposes.
	 *
	 * @name nextTick
	 * @static
	 * @memberOf module:Utils
	 * @method
	 * @see [async.setImmediate]{@link module:Utils.setImmediate}
	 * @category Util
	 * @param {Function} callback - The function to call on a later loop around
	 * the event loop. Invoked with (args...).
	 * @param {...*} args... - any number of additional arguments to pass to the
	 * callback on the next tick.
	 * @example
	 *
	 * var call_order = [];
	 * async.nextTick(function() {
	 *     call_order.push('two');
	 *     // call_order now equals ['one','two']
	 * });
	 * call_order.push('one');
	 *
	 * async.setImmediate(function (a, b, c) {
	 *     // a, b, and c equal 1, 2, and 3
	 * }, 1, 2, 3);
	 */
	var _defer$1;
	
	if (hasNextTick) {
	    _defer$1 = process.nextTick;
	} else if (hasSetImmediate) {
	    _defer$1 = setImmediate;
	} else {
	    _defer$1 = fallback;
	}
	
	var nextTick = wrap(_defer$1);
	
	function _parallel(eachfn, tasks, callback) {
	    callback = callback || noop;
	    var results = isArrayLike(tasks) ? [] : {};
	
	    eachfn(tasks, function (task, key, callback) {
	        wrapAsync(task)(function (err, result) {
	            if (arguments.length > 2) {
	                result = slice(arguments, 1);
	            }
	            results[key] = result;
	            callback(err);
	        });
	    }, function (err) {
	        callback(err, results);
	    });
	}
	
	/**
	 * Run the `tasks` collection of functions in parallel, without waiting until
	 * the previous function has completed. If any of the functions pass an error to
	 * its callback, the main `callback` is immediately called with the value of the
	 * error. Once the `tasks` have completed, the results are passed to the final
	 * `callback` as an array.
	 *
	 * **Note:** `parallel` is about kicking-off I/O tasks in parallel, not about
	 * parallel execution of code.  If your tasks do not use any timers or perform
	 * any I/O, they will actually be executed in series.  Any synchronous setup
	 * sections for each task will happen one after the other.  JavaScript remains
	 * single-threaded.
	 *
	 * **Hint:** Use [`reflect`]{@link module:Utils.reflect} to continue the
	 * execution of other tasks when a task fails.
	 *
	 * It is also possible to use an object instead of an array. Each property will
	 * be run as a function and the results will be passed to the final `callback`
	 * as an object instead of an array. This can be a more readable way of handling
	 * results from {@link async.parallel}.
	 *
	 * @name parallel
	 * @static
	 * @memberOf module:ControlFlow
	 * @method
	 * @category Control Flow
	 * @param {Array|Iterable|Object} tasks - A collection of
	 * [async functions]{@link AsyncFunction} to run.
	 * Each async function can complete with any number of optional `result` values.
	 * @param {Function} [callback] - An optional callback to run once all the
	 * functions have completed successfully. This function gets a results array
	 * (or object) containing all the result arguments passed to the task callbacks.
	 * Invoked with (err, results).
	 *
	 * @example
	 * async.parallel([
	 *     function(callback) {
	 *         setTimeout(function() {
	 *             callback(null, 'one');
	 *         }, 200);
	 *     },
	 *     function(callback) {
	 *         setTimeout(function() {
	 *             callback(null, 'two');
	 *         }, 100);
	 *     }
	 * ],
	 * // optional callback
	 * function(err, results) {
	 *     // the results array will equal ['one','two'] even though
	 *     // the second function had a shorter timeout.
	 * });
	 *
	 * // an example using an object instead of an array
	 * async.parallel({
	 *     one: function(callback) {
	 *         setTimeout(function() {
	 *             callback(null, 1);
	 *         }, 200);
	 *     },
	 *     two: function(callback) {
	 *         setTimeout(function() {
	 *             callback(null, 2);
	 *         }, 100);
	 *     }
	 * }, function(err, results) {
	 *     // results is now equals to: {one: 1, two: 2}
	 * });
	 */
	function parallelLimit(tasks, callback) {
	    _parallel(eachOf, tasks, callback);
	}
	
	/**
	 * The same as [`parallel`]{@link module:ControlFlow.parallel} but runs a maximum of `limit` async operations at a
	 * time.
	 *
	 * @name parallelLimit
	 * @static
	 * @memberOf module:ControlFlow
	 * @method
	 * @see [async.parallel]{@link module:ControlFlow.parallel}
	 * @category Control Flow
	 * @param {Array|Iterable|Object} tasks - A collection of
	 * [async functions]{@link AsyncFunction} to run.
	 * Each async function can complete with any number of optional `result` values.
	 * @param {number} limit - The maximum number of async operations at a time.
	 * @param {Function} [callback] - An optional callback to run once all the
	 * functions have completed successfully. This function gets a results array
	 * (or object) containing all the result arguments passed to the task callbacks.
	 * Invoked with (err, results).
	 */
	function parallelLimit$1(tasks, limit, callback) {
	    _parallel(_eachOfLimit(limit), tasks, callback);
	}
	
	/**
	 * A queue of tasks for the worker function to complete.
	 * @typedef {Object} QueueObject
	 * @memberOf module:ControlFlow
	 * @property {Function} length - a function returning the number of items
	 * waiting to be processed. Invoke with `queue.length()`.
	 * @property {boolean} started - a boolean indicating whether or not any
	 * items have been pushed and processed by the queue.
	 * @property {Function} running - a function returning the number of items
	 * currently being processed. Invoke with `queue.running()`.
	 * @property {Function} workersList - a function returning the array of items
	 * currently being processed. Invoke with `queue.workersList()`.
	 * @property {Function} idle - a function returning false if there are items
	 * waiting or being processed, or true if not. Invoke with `queue.idle()`.
	 * @property {number} concurrency - an integer for determining how many `worker`
	 * functions should be run in parallel. This property can be changed after a
	 * `queue` is created to alter the concurrency on-the-fly.
	 * @property {Function} push - add a new task to the `queue`. Calls `callback`
	 * once the `worker` has finished processing the task. Instead of a single task,
	 * a `tasks` array can be submitted. The respective callback is used for every
	 * task in the list. Invoke with `queue.push(task, [callback])`,
	 * @property {Function} unshift - add a new task to the front of the `queue`.
	 * Invoke with `queue.unshift(task, [callback])`.
	 * @property {Function} remove - remove items from the queue that match a test
	 * function.  The test function will be passed an object with a `data` property,
	 * and a `priority` property, if this is a
	 * [priorityQueue]{@link module:ControlFlow.priorityQueue} object.
	 * Invoked with `queue.remove(testFn)`, where `testFn` is of the form
	 * `function ({data, priority}) {}` and returns a Boolean.
	 * @property {Function} saturated - a callback that is called when the number of
	 * running workers hits the `concurrency` limit, and further tasks will be
	 * queued.
	 * @property {Function} unsaturated - a callback that is called when the number
	 * of running workers is less than the `concurrency` & `buffer` limits, and
	 * further tasks will not be queued.
	 * @property {number} buffer - A minimum threshold buffer in order to say that
	 * the `queue` is `unsaturated`.
	 * @property {Function} empty - a callback that is called when the last item
	 * from the `queue` is given to a `worker`.
	 * @property {Function} drain - a callback that is called when the last item
	 * from the `queue` has returned from the `worker`.
	 * @property {Function} error - a callback that is called when a task errors.
	 * Has the signature `function(error, task)`.
	 * @property {boolean} paused - a boolean for determining whether the queue is
	 * in a paused state.
	 * @property {Function} pause - a function that pauses the processing of tasks
	 * until `resume()` is called. Invoke with `queue.pause()`.
	 * @property {Function} resume - a function that resumes the processing of
	 * queued tasks when the queue is paused. Invoke with `queue.resume()`.
	 * @property {Function} kill - a function that removes the `drain` callback and
	 * empties remaining tasks from the queue forcing it to go idle. No more tasks
	 * should be pushed to the queue after calling this function. Invoke with `queue.kill()`.
	 */
	
	/**
	 * Creates a `queue` object with the specified `concurrency`. Tasks added to the
	 * `queue` are processed in parallel (up to the `concurrency` limit). If all
	 * `worker`s are in progress, the task is queued until one becomes available.
	 * Once a `worker` completes a `task`, that `task`'s callback is called.
	 *
	 * @name queue
	 * @static
	 * @memberOf module:ControlFlow
	 * @method
	 * @category Control Flow
	 * @param {AsyncFunction} worker - An async function for processing a queued task.
	 * If you want to handle errors from an individual task, pass a callback to
	 * `q.push()`. Invoked with (task, callback).
	 * @param {number} [concurrency=1] - An `integer` for determining how many
	 * `worker` functions should be run in parallel.  If omitted, the concurrency
	 * defaults to `1`.  If the concurrency is `0`, an error is thrown.
	 * @returns {module:ControlFlow.QueueObject} A queue object to manage the tasks. Callbacks can
	 * attached as certain properties to listen for specific events during the
	 * lifecycle of the queue.
	 * @example
	 *
	 * // create a queue object with concurrency 2
	 * var q = async.queue(function(task, callback) {
	 *     console.log('hello ' + task.name);
	 *     callback();
	 * }, 2);
	 *
	 * // assign a callback
	 * q.drain = function() {
	 *     console.log('all items have been processed');
	 * };
	 *
	 * // add some items to the queue
	 * q.push({name: 'foo'}, function(err) {
	 *     console.log('finished processing foo');
	 * });
	 * q.push({name: 'bar'}, function (err) {
	 *     console.log('finished processing bar');
	 * });
	 *
	 * // add some items to the queue (batch-wise)
	 * q.push([{name: 'baz'},{name: 'bay'},{name: 'bax'}], function(err) {
	 *     console.log('finished processing item');
	 * });
	 *
	 * // add some items to the front of the queue
	 * q.unshift({name: 'bar'}, function (err) {
	 *     console.log('finished processing bar');
	 * });
	 */
	var queue$1 = function (worker, concurrency) {
	    var _worker = wrapAsync(worker);
	    return queue(function (items, cb) {
	        _worker(items[0], cb);
	    }, concurrency, 1);
	};
	
	/**
	 * The same as [async.queue]{@link module:ControlFlow.queue} only tasks are assigned a priority and
	 * completed in ascending priority order.
	 *
	 * @name priorityQueue
	 * @static
	 * @memberOf module:ControlFlow
	 * @method
	 * @see [async.queue]{@link module:ControlFlow.queue}
	 * @category Control Flow
	 * @param {AsyncFunction} worker - An async function for processing a queued task.
	 * If you want to handle errors from an individual task, pass a callback to
	 * `q.push()`.
	 * Invoked with (task, callback).
	 * @param {number} concurrency - An `integer` for determining how many `worker`
	 * functions should be run in parallel.  If omitted, the concurrency defaults to
	 * `1`.  If the concurrency is `0`, an error is thrown.
	 * @returns {module:ControlFlow.QueueObject} A priorityQueue object to manage the tasks. There are two
	 * differences between `queue` and `priorityQueue` objects:
	 * * `push(task, priority, [callback])` - `priority` should be a number. If an
	 *   array of `tasks` is given, all tasks will be assigned the same priority.
	 * * The `unshift` method was removed.
	 */
	var priorityQueue = function(worker, concurrency) {
	    // Start with a normal queue
	    var q = queue$1(worker, concurrency);
	
	    // Override push to accept second parameter representing priority
	    q.push = function(data, priority, callback) {
	        if (callback == null) callback = noop;
	        if (typeof callback !== 'function') {
	            throw new Error('task callback must be a function');
	        }
	        q.started = true;
	        if (!isArray(data)) {
	            data = [data];
	        }
	        if (data.length === 0) {
	            // call drain immediately if there are no tasks
	            return setImmediate$1(function() {
	                q.drain();
	            });
	        }
	
	        priority = priority || 0;
	        var nextNode = q._tasks.head;
	        while (nextNode && priority >= nextNode.priority) {
	            nextNode = nextNode.next;
	        }
	
	        for (var i = 0, l = data.length; i < l; i++) {
	            var item = {
	                data: data[i],
	                priority: priority,
	                callback: callback
	            };
	
	            if (nextNode) {
	                q._tasks.insertBefore(nextNode, item);
	            } else {
	                q._tasks.push(item);
	            }
	        }
	        setImmediate$1(q.process);
	    };
	
	    // Remove unshift function
	    delete q.unshift;
	
	    return q;
	};
	
	/**
	 * Runs the `tasks` array of functions in parallel, without waiting until the
	 * previous function has completed. Once any of the `tasks` complete or pass an
	 * error to its callback, the main `callback` is immediately called. It's
	 * equivalent to `Promise.race()`.
	 *
	 * @name race
	 * @static
	 * @memberOf module:ControlFlow
	 * @method
	 * @category Control Flow
	 * @param {Array} tasks - An array containing [async functions]{@link AsyncFunction}
	 * to run. Each function can complete with an optional `result` value.
	 * @param {Function} callback - A callback to run once any of the functions have
	 * completed. This function gets an error or result from the first function that
	 * completed. Invoked with (err, result).
	 * @returns undefined
	 * @example
	 *
	 * async.race([
	 *     function(callback) {
	 *         setTimeout(function() {
	 *             callback(null, 'one');
	 *         }, 200);
	 *     },
	 *     function(callback) {
	 *         setTimeout(function() {
	 *             callback(null, 'two');
	 *         }, 100);
	 *     }
	 * ],
	 * // main callback
	 * function(err, result) {
	 *     // the result will be equal to 'two' as it finishes earlier
	 * });
	 */
	function race(tasks, callback) {
	    callback = once(callback || noop);
	    if (!isArray(tasks)) return callback(new TypeError('First argument to race must be an array of functions'));
	    if (!tasks.length) return callback();
	    for (var i = 0, l = tasks.length; i < l; i++) {
	        wrapAsync(tasks[i])(callback);
	    }
	}
	
	/**
	 * Same as [`reduce`]{@link module:Collections.reduce}, only operates on `array` in reverse order.
	 *
	 * @name reduceRight
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @see [async.reduce]{@link module:Collections.reduce}
	 * @alias foldr
	 * @category Collection
	 * @param {Array} array - A collection to iterate over.
	 * @param {*} memo - The initial state of the reduction.
	 * @param {AsyncFunction} iteratee - A function applied to each item in the
	 * array to produce the next step in the reduction.
	 * The `iteratee` should complete with the next state of the reduction.
	 * If the iteratee complete with an error, the reduction is stopped and the
	 * main `callback` is immediately called with the error.
	 * Invoked with (memo, item, callback).
	 * @param {Function} [callback] - A callback which is called after all the
	 * `iteratee` functions have finished. Result is the reduced value. Invoked with
	 * (err, result).
	 */
	function reduceRight (array, memo, iteratee, callback) {
	    var reversed = slice(array).reverse();
	    reduce(reversed, memo, iteratee, callback);
	}
	
	/**
	 * Wraps the async function in another function that always completes with a
	 * result object, even when it errors.
	 *
	 * The result object has either the property `error` or `value`.
	 *
	 * @name reflect
	 * @static
	 * @memberOf module:Utils
	 * @method
	 * @category Util
	 * @param {AsyncFunction} fn - The async function you want to wrap
	 * @returns {Function} - A function that always passes null to it's callback as
	 * the error. The second argument to the callback will be an `object` with
	 * either an `error` or a `value` property.
	 * @example
	 *
	 * async.parallel([
	 *     async.reflect(function(callback) {
	 *         // do some stuff ...
	 *         callback(null, 'one');
	 *     }),
	 *     async.reflect(function(callback) {
	 *         // do some more stuff but error ...
	 *         callback('bad stuff happened');
	 *     }),
	 *     async.reflect(function(callback) {
	 *         // do some more stuff ...
	 *         callback(null, 'two');
	 *     })
	 * ],
	 * // optional callback
	 * function(err, results) {
	 *     // values
	 *     // results[0].value = 'one'
	 *     // results[1].error = 'bad stuff happened'
	 *     // results[2].value = 'two'
	 * });
	 */
	function reflect(fn) {
	    var _fn = wrapAsync(fn);
	    return initialParams(function reflectOn(args, reflectCallback) {
	        args.push(function callback(error, cbArg) {
	            if (error) {
	                reflectCallback(null, { error: error });
	            } else {
	                var value;
	                if (arguments.length <= 2) {
	                    value = cbArg;
	                } else {
	                    value = slice(arguments, 1);
	                }
	                reflectCallback(null, { value: value });
	            }
	        });
	
	        return _fn.apply(this, args);
	    });
	}
	
	/**
	 * A helper function that wraps an array or an object of functions with `reflect`.
	 *
	 * @name reflectAll
	 * @static
	 * @memberOf module:Utils
	 * @method
	 * @see [async.reflect]{@link module:Utils.reflect}
	 * @category Util
	 * @param {Array|Object|Iterable} tasks - The collection of
	 * [async functions]{@link AsyncFunction} to wrap in `async.reflect`.
	 * @returns {Array} Returns an array of async functions, each wrapped in
	 * `async.reflect`
	 * @example
	 *
	 * let tasks = [
	 *     function(callback) {
	 *         setTimeout(function() {
	 *             callback(null, 'one');
	 *         }, 200);
	 *     },
	 *     function(callback) {
	 *         // do some more stuff but error ...
	 *         callback(new Error('bad stuff happened'));
	 *     },
	 *     function(callback) {
	 *         setTimeout(function() {
	 *             callback(null, 'two');
	 *         }, 100);
	 *     }
	 * ];
	 *
	 * async.parallel(async.reflectAll(tasks),
	 * // optional callback
	 * function(err, results) {
	 *     // values
	 *     // results[0].value = 'one'
	 *     // results[1].error = Error('bad stuff happened')
	 *     // results[2].value = 'two'
	 * });
	 *
	 * // an example using an object instead of an array
	 * let tasks = {
	 *     one: function(callback) {
	 *         setTimeout(function() {
	 *             callback(null, 'one');
	 *         }, 200);
	 *     },
	 *     two: function(callback) {
	 *         callback('two');
	 *     },
	 *     three: function(callback) {
	 *         setTimeout(function() {
	 *             callback(null, 'three');
	 *         }, 100);
	 *     }
	 * };
	 *
	 * async.parallel(async.reflectAll(tasks),
	 * // optional callback
	 * function(err, results) {
	 *     // values
	 *     // results.one.value = 'one'
	 *     // results.two.error = 'two'
	 *     // results.three.value = 'three'
	 * });
	 */
	function reflectAll(tasks) {
	    var results;
	    if (isArray(tasks)) {
	        results = arrayMap(tasks, reflect);
	    } else {
	        results = {};
	        baseForOwn(tasks, function(task, key) {
	            results[key] = reflect.call(this, task);
	        });
	    }
	    return results;
	}
	
	function reject$1(eachfn, arr, iteratee, callback) {
	    _filter(eachfn, arr, function(value, cb) {
	        iteratee(value, function(err, v) {
	            cb(err, !v);
	        });
	    }, callback);
	}
	
	/**
	 * The opposite of [`filter`]{@link module:Collections.filter}. Removes values that pass an `async` truth test.
	 *
	 * @name reject
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @see [async.filter]{@link module:Collections.filter}
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {Function} iteratee - An async truth test to apply to each item in
	 * `coll`.
	 * The should complete with a boolean value as its `result`.
	 * Invoked with (item, callback).
	 * @param {Function} [callback] - A callback which is called after all the
	 * `iteratee` functions have finished. Invoked with (err, results).
	 * @example
	 *
	 * async.reject(['file1','file2','file3'], function(filePath, callback) {
	 *     fs.access(filePath, function(err) {
	 *         callback(null, !err)
	 *     });
	 * }, function(err, results) {
	 *     // results now equals an array of missing files
	 *     createFiles(results);
	 * });
	 */
	var reject = doParallel(reject$1);
	
	/**
	 * The same as [`reject`]{@link module:Collections.reject} but runs a maximum of `limit` async operations at a
	 * time.
	 *
	 * @name rejectLimit
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @see [async.reject]{@link module:Collections.reject}
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {number} limit - The maximum number of async operations at a time.
	 * @param {Function} iteratee - An async truth test to apply to each item in
	 * `coll`.
	 * The should complete with a boolean value as its `result`.
	 * Invoked with (item, callback).
	 * @param {Function} [callback] - A callback which is called after all the
	 * `iteratee` functions have finished. Invoked with (err, results).
	 */
	var rejectLimit = doParallelLimit(reject$1);
	
	/**
	 * The same as [`reject`]{@link module:Collections.reject} but runs only a single async operation at a time.
	 *
	 * @name rejectSeries
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @see [async.reject]{@link module:Collections.reject}
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {Function} iteratee - An async truth test to apply to each item in
	 * `coll`.
	 * The should complete with a boolean value as its `result`.
	 * Invoked with (item, callback).
	 * @param {Function} [callback] - A callback which is called after all the
	 * `iteratee` functions have finished. Invoked with (err, results).
	 */
	var rejectSeries = doLimit(rejectLimit, 1);
	
	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new constant function.
	 * @example
	 *
	 * var objects = _.times(2, _.constant({ 'a': 1 }));
	 *
	 * console.log(objects);
	 * // => [{ 'a': 1 }, { 'a': 1 }]
	 *
	 * console.log(objects[0] === objects[1]);
	 * // => true
	 */
	function constant$1(value) {
	  return function() {
	    return value;
	  };
	}
	
	/**
	 * Attempts to get a successful response from `task` no more than `times` times
	 * before returning an error. If the task is successful, the `callback` will be
	 * passed the result of the successful task. If all attempts fail, the callback
	 * will be passed the error and result (if any) of the final attempt.
	 *
	 * @name retry
	 * @static
	 * @memberOf module:ControlFlow
	 * @method
	 * @category Control Flow
	 * @see [async.retryable]{@link module:ControlFlow.retryable}
	 * @param {Object|number} [opts = {times: 5, interval: 0}| 5] - Can be either an
	 * object with `times` and `interval` or a number.
	 * * `times` - The number of attempts to make before giving up.  The default
	 *   is `5`.
	 * * `interval` - The time to wait between retries, in milliseconds.  The
	 *   default is `0`. The interval may also be specified as a function of the
	 *   retry count (see example).
	 * * `errorFilter` - An optional synchronous function that is invoked on
	 *   erroneous result. If it returns `true` the retry attempts will continue;
	 *   if the function returns `false` the retry flow is aborted with the current
	 *   attempt's error and result being returned to the final callback.
	 *   Invoked with (err).
	 * * If `opts` is a number, the number specifies the number of times to retry,
	 *   with the default interval of `0`.
	 * @param {AsyncFunction} task - An async function to retry.
	 * Invoked with (callback).
	 * @param {Function} [callback] - An optional callback which is called when the
	 * task has succeeded, or after the final failed attempt. It receives the `err`
	 * and `result` arguments of the last attempt at completing the `task`. Invoked
	 * with (err, results).
	 *
	 * @example
	 *
	 * // The `retry` function can be used as a stand-alone control flow by passing
	 * // a callback, as shown below:
	 *
	 * // try calling apiMethod 3 times
	 * async.retry(3, apiMethod, function(err, result) {
	 *     // do something with the result
	 * });
	 *
	 * // try calling apiMethod 3 times, waiting 200 ms between each retry
	 * async.retry({times: 3, interval: 200}, apiMethod, function(err, result) {
	 *     // do something with the result
	 * });
	 *
	 * // try calling apiMethod 10 times with exponential backoff
	 * // (i.e. intervals of 100, 200, 400, 800, 1600, ... milliseconds)
	 * async.retry({
	 *   times: 10,
	 *   interval: function(retryCount) {
	 *     return 50 * Math.pow(2, retryCount);
	 *   }
	 * }, apiMethod, function(err, result) {
	 *     // do something with the result
	 * });
	 *
	 * // try calling apiMethod the default 5 times no delay between each retry
	 * async.retry(apiMethod, function(err, result) {
	 *     // do something with the result
	 * });
	 *
	 * // try calling apiMethod only when error condition satisfies, all other
	 * // errors will abort the retry control flow and return to final callback
	 * async.retry({
	 *   errorFilter: function(err) {
	 *     return err.message === 'Temporary error'; // only retry on a specific error
	 *   }
	 * }, apiMethod, function(err, result) {
	 *     // do something with the result
	 * });
	 *
	 * // to retry individual methods that are not as reliable within other
	 * // control flow functions, use the `retryable` wrapper:
	 * async.auto({
	 *     users: api.getUsers.bind(api),
	 *     payments: async.retryable(3, api.getPayments.bind(api))
	 * }, function(err, results) {
	 *     // do something with the results
	 * });
	 *
	 */
	function retry(opts, task, callback) {
	    var DEFAULT_TIMES = 5;
	    var DEFAULT_INTERVAL = 0;
	
	    var options = {
	        times: DEFAULT_TIMES,
	        intervalFunc: constant$1(DEFAULT_INTERVAL)
	    };
	
	    function parseTimes(acc, t) {
	        if (typeof t === 'object') {
	            acc.times = +t.times || DEFAULT_TIMES;
	
	            acc.intervalFunc = typeof t.interval === 'function' ?
	                t.interval :
	                constant$1(+t.interval || DEFAULT_INTERVAL);
	
	            acc.errorFilter = t.errorFilter;
	        } else if (typeof t === 'number' || typeof t === 'string') {
	            acc.times = +t || DEFAULT_TIMES;
	        } else {
	            throw new Error("Invalid arguments for async.retry");
	        }
	    }
	
	    if (arguments.length < 3 && typeof opts === 'function') {
	        callback = task || noop;
	        task = opts;
	    } else {
	        parseTimes(options, opts);
	        callback = callback || noop;
	    }
	
	    if (typeof task !== 'function') {
	        throw new Error("Invalid arguments for async.retry");
	    }
	
	    var _task = wrapAsync(task);
	
	    var attempt = 1;
	    function retryAttempt() {
	        _task(function(err) {
	            if (err && attempt++ < options.times &&
	                (typeof options.errorFilter != 'function' ||
	                    options.errorFilter(err))) {
	                setTimeout(retryAttempt, options.intervalFunc(attempt));
	            } else {
	                callback.apply(null, arguments);
	            }
	        });
	    }
	
	    retryAttempt();
	}
	
	/**
	 * A close relative of [`retry`]{@link module:ControlFlow.retry}.  This method
	 * wraps a task and makes it retryable, rather than immediately calling it
	 * with retries.
	 *
	 * @name retryable
	 * @static
	 * @memberOf module:ControlFlow
	 * @method
	 * @see [async.retry]{@link module:ControlFlow.retry}
	 * @category Control Flow
	 * @param {Object|number} [opts = {times: 5, interval: 0}| 5] - optional
	 * options, exactly the same as from `retry`
	 * @param {AsyncFunction} task - the asynchronous function to wrap.
	 * This function will be passed any arguments passed to the returned wrapper.
	 * Invoked with (...args, callback).
	 * @returns {AsyncFunction} The wrapped function, which when invoked, will
	 * retry on an error, based on the parameters specified in `opts`.
	 * This function will accept the same parameters as `task`.
	 * @example
	 *
	 * async.auto({
	 *     dep1: async.retryable(3, getFromFlakyService),
	 *     process: ["dep1", async.retryable(3, function (results, cb) {
	 *         maybeProcessData(results.dep1, cb);
	 *     })]
	 * }, callback);
	 */
	var retryable = function (opts, task) {
	    if (!task) {
	        task = opts;
	        opts = null;
	    }
	    var _task = wrapAsync(task);
	    return initialParams(function (args, callback) {
	        function taskFn(cb) {
	            _task.apply(null, args.concat(cb));
	        }
	
	        if (opts) retry(opts, taskFn, callback);
	        else retry(taskFn, callback);
	
	    });
	};
	
	/**
	 * Run the functions in the `tasks` collection in series, each one running once
	 * the previous function has completed. If any functions in the series pass an
	 * error to its callback, no more functions are run, and `callback` is
	 * immediately called with the value of the error. Otherwise, `callback`
	 * receives an array of results when `tasks` have completed.
	 *
	 * It is also possible to use an object instead of an array. Each property will
	 * be run as a function, and the results will be passed to the final `callback`
	 * as an object instead of an array. This can be a more readable way of handling
	 *  results from {@link async.series}.
	 *
	 * **Note** that while many implementations preserve the order of object
	 * properties, the [ECMAScript Language Specification](http://www.ecma-international.org/ecma-262/5.1/#sec-8.6)
	 * explicitly states that
	 *
	 * > The mechanics and order of enumerating the properties is not specified.
	 *
	 * So if you rely on the order in which your series of functions are executed,
	 * and want this to work on all platforms, consider using an array.
	 *
	 * @name series
	 * @static
	 * @memberOf module:ControlFlow
	 * @method
	 * @category Control Flow
	 * @param {Array|Iterable|Object} tasks - A collection containing
	 * [async functions]{@link AsyncFunction} to run in series.
	 * Each function can complete with any number of optional `result` values.
	 * @param {Function} [callback] - An optional callback to run once all the
	 * functions have completed. This function gets a results array (or object)
	 * containing all the result arguments passed to the `task` callbacks. Invoked
	 * with (err, result).
	 * @example
	 * async.series([
	 *     function(callback) {
	 *         // do some stuff ...
	 *         callback(null, 'one');
	 *     },
	 *     function(callback) {
	 *         // do some more stuff ...
	 *         callback(null, 'two');
	 *     }
	 * ],
	 * // optional callback
	 * function(err, results) {
	 *     // results is now equal to ['one', 'two']
	 * });
	 *
	 * async.series({
	 *     one: function(callback) {
	 *         setTimeout(function() {
	 *             callback(null, 1);
	 *         }, 200);
	 *     },
	 *     two: function(callback){
	 *         setTimeout(function() {
	 *             callback(null, 2);
	 *         }, 100);
	 *     }
	 * }, function(err, results) {
	 *     // results is now equal to: {one: 1, two: 2}
	 * });
	 */
	function series(tasks, callback) {
	    _parallel(eachOfSeries, tasks, callback);
	}
	
	/**
	 * Returns `true` if at least one element in the `coll` satisfies an async test.
	 * If any iteratee call returns `true`, the main `callback` is immediately
	 * called.
	 *
	 * @name some
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @alias any
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
	 * in the collections in parallel.
	 * The iteratee should complete with a boolean `result` value.
	 * Invoked with (item, callback).
	 * @param {Function} [callback] - A callback which is called as soon as any
	 * iteratee returns `true`, or after all the iteratee functions have finished.
	 * Result will be either `true` or `false` depending on the values of the async
	 * tests. Invoked with (err, result).
	 * @example
	 *
	 * async.some(['file1','file2','file3'], function(filePath, callback) {
	 *     fs.access(filePath, function(err) {
	 *         callback(null, !err)
	 *     });
	 * }, function(err, result) {
	 *     // if result is true then at least one of the files exists
	 * });
	 */
	var some = doParallel(_createTester(Boolean, identity));
	
	/**
	 * The same as [`some`]{@link module:Collections.some} but runs a maximum of `limit` async operations at a time.
	 *
	 * @name someLimit
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @see [async.some]{@link module:Collections.some}
	 * @alias anyLimit
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {number} limit - The maximum number of async operations at a time.
	 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
	 * in the collections in parallel.
	 * The iteratee should complete with a boolean `result` value.
	 * Invoked with (item, callback).
	 * @param {Function} [callback] - A callback which is called as soon as any
	 * iteratee returns `true`, or after all the iteratee functions have finished.
	 * Result will be either `true` or `false` depending on the values of the async
	 * tests. Invoked with (err, result).
	 */
	var someLimit = doParallelLimit(_createTester(Boolean, identity));
	
	/**
	 * The same as [`some`]{@link module:Collections.some} but runs only a single async operation at a time.
	 *
	 * @name someSeries
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @see [async.some]{@link module:Collections.some}
	 * @alias anySeries
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
	 * in the collections in series.
	 * The iteratee should complete with a boolean `result` value.
	 * Invoked with (item, callback).
	 * @param {Function} [callback] - A callback which is called as soon as any
	 * iteratee returns `true`, or after all the iteratee functions have finished.
	 * Result will be either `true` or `false` depending on the values of the async
	 * tests. Invoked with (err, result).
	 */
	var someSeries = doLimit(someLimit, 1);
	
	/**
	 * Sorts a list by the results of running each `coll` value through an async
	 * `iteratee`.
	 *
	 * @name sortBy
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {AsyncFunction} iteratee - An async function to apply to each item in
	 * `coll`.
	 * The iteratee should complete with a value to use as the sort criteria as
	 * its `result`.
	 * Invoked with (item, callback).
	 * @param {Function} callback - A callback which is called after all the
	 * `iteratee` functions have finished, or an error occurs. Results is the items
	 * from the original `coll` sorted by the values returned by the `iteratee`
	 * calls. Invoked with (err, results).
	 * @example
	 *
	 * async.sortBy(['file1','file2','file3'], function(file, callback) {
	 *     fs.stat(file, function(err, stats) {
	 *         callback(err, stats.mtime);
	 *     });
	 * }, function(err, results) {
	 *     // results is now the original array of files sorted by
	 *     // modified date
	 * });
	 *
	 * // By modifying the callback parameter the
	 * // sorting order can be influenced:
	 *
	 * // ascending order
	 * async.sortBy([1,9,3,5], function(x, callback) {
	 *     callback(null, x);
	 * }, function(err,result) {
	 *     // result callback
	 * });
	 *
	 * // descending order
	 * async.sortBy([1,9,3,5], function(x, callback) {
	 *     callback(null, x*-1);    //<- x*-1 instead of x, turns the order around
	 * }, function(err,result) {
	 *     // result callback
	 * });
	 */
	function sortBy (coll, iteratee, callback) {
	    var _iteratee = wrapAsync(iteratee);
	    map(coll, function (x, callback) {
	        _iteratee(x, function (err, criteria) {
	            if (err) return callback(err);
	            callback(null, {value: x, criteria: criteria});
	        });
	    }, function (err, results) {
	        if (err) return callback(err);
	        callback(null, arrayMap(results.sort(comparator), baseProperty('value')));
	    });
	
	    function comparator(left, right) {
	        var a = left.criteria, b = right.criteria;
	        return a < b ? -1 : a > b ? 1 : 0;
	    }
	}
	
	/**
	 * Sets a time limit on an asynchronous function. If the function does not call
	 * its callback within the specified milliseconds, it will be called with a
	 * timeout error. The code property for the error object will be `'ETIMEDOUT'`.
	 *
	 * @name timeout
	 * @static
	 * @memberOf module:Utils
	 * @method
	 * @category Util
	 * @param {AsyncFunction} asyncFn - The async function to limit in time.
	 * @param {number} milliseconds - The specified time limit.
	 * @param {*} [info] - Any variable you want attached (`string`, `object`, etc)
	 * to timeout Error for more information..
	 * @returns {AsyncFunction} Returns a wrapped function that can be used with any
	 * of the control flow functions.
	 * Invoke this function with the same parameters as you would `asyncFunc`.
	 * @example
	 *
	 * function myFunction(foo, callback) {
	 *     doAsyncTask(foo, function(err, data) {
	 *         // handle errors
	 *         if (err) return callback(err);
	 *
	 *         // do some stuff ...
	 *
	 *         // return processed data
	 *         return callback(null, data);
	 *     });
	 * }
	 *
	 * var wrapped = async.timeout(myFunction, 1000);
	 *
	 * // call `wrapped` as you would `myFunction`
	 * wrapped({ bar: 'bar' }, function(err, data) {
	 *     // if `myFunction` takes < 1000 ms to execute, `err`
	 *     // and `data` will have their expected values
	 *
	 *     // else `err` will be an Error with the code 'ETIMEDOUT'
	 * });
	 */
	function timeout(asyncFn, milliseconds, info) {
	    var fn = wrapAsync(asyncFn);
	
	    return initialParams(function (args, callback) {
	        var timedOut = false;
	        var timer;
	
	        function timeoutCallback() {
	            var name = asyncFn.name || 'anonymous';
	            var error  = new Error('Callback function "' + name + '" timed out.');
	            error.code = 'ETIMEDOUT';
	            if (info) {
	                error.info = info;
	            }
	            timedOut = true;
	            callback(error);
	        }
	
	        args.push(function () {
	            if (!timedOut) {
	                callback.apply(null, arguments);
	                clearTimeout(timer);
	            }
	        });
	
	        // setup timer and call original function
	        timer = setTimeout(timeoutCallback, milliseconds);
	        fn.apply(null, args);
	    });
	}
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeCeil = Math.ceil;
	var nativeMax = Math.max;
	
	/**
	 * The base implementation of `_.range` and `_.rangeRight` which doesn't
	 * coerce arguments.
	 *
	 * @private
	 * @param {number} start The start of the range.
	 * @param {number} end The end of the range.
	 * @param {number} step The value to increment or decrement by.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Array} Returns the range of numbers.
	 */
	function baseRange(start, end, step, fromRight) {
	  var index = -1,
	      length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
	      result = Array(length);
	
	  while (length--) {
	    result[fromRight ? length : ++index] = start;
	    start += step;
	  }
	  return result;
	}
	
	/**
	 * The same as [times]{@link module:ControlFlow.times} but runs a maximum of `limit` async operations at a
	 * time.
	 *
	 * @name timesLimit
	 * @static
	 * @memberOf module:ControlFlow
	 * @method
	 * @see [async.times]{@link module:ControlFlow.times}
	 * @category Control Flow
	 * @param {number} count - The number of times to run the function.
	 * @param {number} limit - The maximum number of async operations at a time.
	 * @param {AsyncFunction} iteratee - The async function to call `n` times.
	 * Invoked with the iteration index and a callback: (n, next).
	 * @param {Function} callback - see [async.map]{@link module:Collections.map}.
	 */
	function timeLimit(count, limit, iteratee, callback) {
	    var _iteratee = wrapAsync(iteratee);
	    mapLimit(baseRange(0, count, 1), limit, _iteratee, callback);
	}
	
	/**
	 * Calls the `iteratee` function `n` times, and accumulates results in the same
	 * manner you would use with [map]{@link module:Collections.map}.
	 *
	 * @name times
	 * @static
	 * @memberOf module:ControlFlow
	 * @method
	 * @see [async.map]{@link module:Collections.map}
	 * @category Control Flow
	 * @param {number} n - The number of times to run the function.
	 * @param {AsyncFunction} iteratee - The async function to call `n` times.
	 * Invoked with the iteration index and a callback: (n, next).
	 * @param {Function} callback - see {@link module:Collections.map}.
	 * @example
	 *
	 * // Pretend this is some complicated async factory
	 * var createUser = function(id, callback) {
	 *     callback(null, {
	 *         id: 'user' + id
	 *     });
	 * };
	 *
	 * // generate 5 users
	 * async.times(5, function(n, next) {
	 *     createUser(n, function(err, user) {
	 *         next(err, user);
	 *     });
	 * }, function(err, users) {
	 *     // we should now have 5 users
	 * });
	 */
	var times = doLimit(timeLimit, Infinity);
	
	/**
	 * The same as [times]{@link module:ControlFlow.times} but runs only a single async operation at a time.
	 *
	 * @name timesSeries
	 * @static
	 * @memberOf module:ControlFlow
	 * @method
	 * @see [async.times]{@link module:ControlFlow.times}
	 * @category Control Flow
	 * @param {number} n - The number of times to run the function.
	 * @param {AsyncFunction} iteratee - The async function to call `n` times.
	 * Invoked with the iteration index and a callback: (n, next).
	 * @param {Function} callback - see {@link module:Collections.map}.
	 */
	var timesSeries = doLimit(timeLimit, 1);
	
	/**
	 * A relative of `reduce`.  Takes an Object or Array, and iterates over each
	 * element in series, each step potentially mutating an `accumulator` value.
	 * The type of the accumulator defaults to the type of collection passed in.
	 *
	 * @name transform
	 * @static
	 * @memberOf module:Collections
	 * @method
	 * @category Collection
	 * @param {Array|Iterable|Object} coll - A collection to iterate over.
	 * @param {*} [accumulator] - The initial state of the transform.  If omitted,
	 * it will default to an empty Object or Array, depending on the type of `coll`
	 * @param {AsyncFunction} iteratee - A function applied to each item in the
	 * collection that potentially modifies the accumulator.
	 * Invoked with (accumulator, item, key, callback).
	 * @param {Function} [callback] - A callback which is called after all the
	 * `iteratee` functions have finished. Result is the transformed accumulator.
	 * Invoked with (err, result).
	 * @example
	 *
	 * async.transform([1,2,3], function(acc, item, index, callback) {
	 *     // pointless async:
	 *     process.nextTick(function() {
	 *         acc.push(item * 2)
	 *         callback(null)
	 *     });
	 * }, function(err, result) {
	 *     // result is now equal to [2, 4, 6]
	 * });
	 *
	 * @example
	 *
	 * async.transform({a: 1, b: 2, c: 3}, function (obj, val, key, callback) {
	 *     setImmediate(function () {
	 *         obj[key] = val * 2;
	 *         callback();
	 *     })
	 * }, function (err, result) {
	 *     // result is equal to {a: 2, b: 4, c: 6}
	 * })
	 */
	function transform (coll, accumulator, iteratee, callback) {
	    if (arguments.length <= 3) {
	        callback = iteratee;
	        iteratee = accumulator;
	        accumulator = isArray(coll) ? [] : {};
	    }
	    callback = once(callback || noop);
	    var _iteratee = wrapAsync(iteratee);
	
	    eachOf(coll, function(v, k, cb) {
	        _iteratee(accumulator, v, k, cb);
	    }, function(err) {
	        callback(err, accumulator);
	    });
	}
	
	/**
	 * It runs each task in series but stops whenever any of the functions were
	 * successful. If one of the tasks were successful, the `callback` will be
	 * passed the result of the successful task. If all tasks fail, the callback
	 * will be passed the error and result (if any) of the final attempt.
	 *
	 * @name tryEach
	 * @static
	 * @memberOf module:ControlFlow
	 * @method
	 * @category Control Flow
	 * @param {Array|Iterable|Object} tasks - A collection containing functions to
	 * run, each function is passed a `callback(err, result)` it must call on
	 * completion with an error `err` (which can be `null`) and an optional `result`
	 * value.
	 * @param {Function} [callback] - An optional callback which is called when one
	 * of the tasks has succeeded, or all have failed. It receives the `err` and
	 * `result` arguments of the last attempt at completing the `task`. Invoked with
	 * (err, results).
	 * @example
	 * async.tryEach([
	 *     function getDataFromFirstWebsite(callback) {
	 *         // Try getting the data from the first website
	 *         callback(err, data);
	 *     },
	 *     function getDataFromSecondWebsite(callback) {
	 *         // First website failed,
	 *         // Try getting the data from the backup website
	 *         callback(err, data);
	 *     }
	 * ],
	 * // optional callback
	 * function(err, results) {
	 *     Now do something with the data.
	 * });
	 *
	 */
	function tryEach(tasks, callback) {
	    var error = null;
	    var result;
	    callback = callback || noop;
	    eachSeries(tasks, function(task, callback) {
	        wrapAsync(task)(function (err, res/*, ...args*/) {
	            if (arguments.length > 2) {
	                result = slice(arguments, 1);
	            } else {
	                result = res;
	            }
	            error = err;
	            callback(!err);
	        });
	    }, function () {
	        callback(error, result);
	    });
	}
	
	/**
	 * Undoes a [memoize]{@link module:Utils.memoize}d function, reverting it to the original,
	 * unmemoized form. Handy for testing.
	 *
	 * @name unmemoize
	 * @static
	 * @memberOf module:Utils
	 * @method
	 * @see [async.memoize]{@link module:Utils.memoize}
	 * @category Util
	 * @param {AsyncFunction} fn - the memoized function
	 * @returns {AsyncFunction} a function that calls the original unmemoized function
	 */
	function unmemoize(fn) {
	    return function () {
	        return (fn.unmemoized || fn).apply(null, arguments);
	    };
	}
	
	/**
	 * Repeatedly call `iteratee`, while `test` returns `true`. Calls `callback` when
	 * stopped, or an error occurs.
	 *
	 * @name whilst
	 * @static
	 * @memberOf module:ControlFlow
	 * @method
	 * @category Control Flow
	 * @param {Function} test - synchronous truth test to perform before each
	 * execution of `iteratee`. Invoked with ().
	 * @param {AsyncFunction} iteratee - An async function which is called each time
	 * `test` passes. Invoked with (callback).
	 * @param {Function} [callback] - A callback which is called after the test
	 * function has failed and repeated execution of `iteratee` has stopped. `callback`
	 * will be passed an error and any arguments passed to the final `iteratee`'s
	 * callback. Invoked with (err, [results]);
	 * @returns undefined
	 * @example
	 *
	 * var count = 0;
	 * async.whilst(
	 *     function() { return count < 5; },
	 *     function(callback) {
	 *         count++;
	 *         setTimeout(function() {
	 *             callback(null, count);
	 *         }, 1000);
	 *     },
	 *     function (err, n) {
	 *         // 5 seconds have passed, n = 5
	 *     }
	 * );
	 */
	function whilst(test, iteratee, callback) {
	    callback = onlyOnce(callback || noop);
	    var _iteratee = wrapAsync(iteratee);
	    if (!test()) return callback(null);
	    var next = function(err/*, ...args*/) {
	        if (err) return callback(err);
	        if (test()) return _iteratee(next);
	        var args = slice(arguments, 1);
	        callback.apply(null, [null].concat(args));
	    };
	    _iteratee(next);
	}
	
	/**
	 * Repeatedly call `iteratee` until `test` returns `true`. Calls `callback` when
	 * stopped, or an error occurs. `callback` will be passed an error and any
	 * arguments passed to the final `iteratee`'s callback.
	 *
	 * The inverse of [whilst]{@link module:ControlFlow.whilst}.
	 *
	 * @name until
	 * @static
	 * @memberOf module:ControlFlow
	 * @method
	 * @see [async.whilst]{@link module:ControlFlow.whilst}
	 * @category Control Flow
	 * @param {Function} test - synchronous truth test to perform before each
	 * execution of `iteratee`. Invoked with ().
	 * @param {AsyncFunction} iteratee - An async function which is called each time
	 * `test` fails. Invoked with (callback).
	 * @param {Function} [callback] - A callback which is called after the test
	 * function has passed and repeated execution of `iteratee` has stopped. `callback`
	 * will be passed an error and any arguments passed to the final `iteratee`'s
	 * callback. Invoked with (err, [results]);
	 */
	function until(test, iteratee, callback) {
	    whilst(function() {
	        return !test.apply(this, arguments);
	    }, iteratee, callback);
	}
	
	/**
	 * Runs the `tasks` array of functions in series, each passing their results to
	 * the next in the array. However, if any of the `tasks` pass an error to their
	 * own callback, the next function is not executed, and the main `callback` is
	 * immediately called with the error.
	 *
	 * @name waterfall
	 * @static
	 * @memberOf module:ControlFlow
	 * @method
	 * @category Control Flow
	 * @param {Array} tasks - An array of [async functions]{@link AsyncFunction}
	 * to run.
	 * Each function should complete with any number of `result` values.
	 * The `result` values will be passed as arguments, in order, to the next task.
	 * @param {Function} [callback] - An optional callback to run once all the
	 * functions have completed. This will be passed the results of the last task's
	 * callback. Invoked with (err, [results]).
	 * @returns undefined
	 * @example
	 *
	 * async.waterfall([
	 *     function(callback) {
	 *         callback(null, 'one', 'two');
	 *     },
	 *     function(arg1, arg2, callback) {
	 *         // arg1 now equals 'one' and arg2 now equals 'two'
	 *         callback(null, 'three');
	 *     },
	 *     function(arg1, callback) {
	 *         // arg1 now equals 'three'
	 *         callback(null, 'done');
	 *     }
	 * ], function (err, result) {
	 *     // result now equals 'done'
	 * });
	 *
	 * // Or, with named functions:
	 * async.waterfall([
	 *     myFirstFunction,
	 *     mySecondFunction,
	 *     myLastFunction,
	 * ], function (err, result) {
	 *     // result now equals 'done'
	 * });
	 * function myFirstFunction(callback) {
	 *     callback(null, 'one', 'two');
	 * }
	 * function mySecondFunction(arg1, arg2, callback) {
	 *     // arg1 now equals 'one' and arg2 now equals 'two'
	 *     callback(null, 'three');
	 * }
	 * function myLastFunction(arg1, callback) {
	 *     // arg1 now equals 'three'
	 *     callback(null, 'done');
	 * }
	 */
	var waterfall = function(tasks, callback) {
	    callback = once(callback || noop);
	    if (!isArray(tasks)) return callback(new Error('First argument to waterfall must be an array of functions'));
	    if (!tasks.length) return callback();
	    var taskIndex = 0;
	
	    function nextTask(args) {
	        var task = wrapAsync(tasks[taskIndex++]);
	        args.push(onlyOnce(next));
	        task.apply(null, args);
	    }
	
	    function next(err/*, ...args*/) {
	        if (err || taskIndex === tasks.length) {
	            return callback.apply(null, arguments);
	        }
	        nextTask(slice(arguments, 1));
	    }
	
	    nextTask([]);
	};
	
	/**
	 * An "async function" in the context of Async is an asynchronous function with
	 * a variable number of parameters, with the final parameter being a callback.
	 * (`function (arg1, arg2, ..., callback) {}`)
	 * The final callback is of the form `callback(err, results...)`, which must be
	 * called once the function is completed.  The callback should be called with a
	 * Error as its first argument to signal that an error occurred.
	 * Otherwise, if no error occurred, it should be called with `null` as the first
	 * argument, and any additional `result` arguments that may apply, to signal
	 * successful completion.
	 * The callback must be called exactly once, ideally on a later tick of the
	 * JavaScript event loop.
	 *
	 * This type of function is also referred to as a "Node-style async function",
	 * or a "continuation passing-style function" (CPS). Most of the methods of this
	 * library are themselves CPS/Node-style async functions, or functions that
	 * return CPS/Node-style async functions.
	 *
	 * Wherever we accept a Node-style async function, we also directly accept an
	 * [ES2017 `async` function]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function}.
	 * In this case, the `async` function will not be passed a final callback
	 * argument, and any thrown error will be used as the `err` argument of the
	 * implicit callback, and the return value will be used as the `result` value.
	 * (i.e. a `rejected` of the returned Promise becomes the `err` callback
	 * argument, and a `resolved` value becomes the `result`.)
	 *
	 * Note, due to JavaScript limitations, we can only detect native `async`
	 * functions and not transpilied implementations.
	 * Your environment must have `async`/`await` support for this to work.
	 * (e.g. Node > v7.6, or a recent version of a modern browser).
	 * If you are using `async` functions through a transpiler (e.g. Babel), you
	 * must still wrap the function with [asyncify]{@link module:Utils.asyncify},
	 * because the `async function` will be compiled to an ordinary function that
	 * returns a promise.
	 *
	 * @typedef {Function} AsyncFunction
	 * @static
	 */
	
	/**
	 * Async is a utility module which provides straight-forward, powerful functions
	 * for working with asynchronous JavaScript. Although originally designed for
	 * use with [Node.js](http://nodejs.org) and installable via
	 * `npm install --save async`, it can also be used directly in the browser.
	 * @module async
	 * @see AsyncFunction
	 */
	
	
	/**
	 * A collection of `async` functions for manipulating collections, such as
	 * arrays and objects.
	 * @module Collections
	 */
	
	/**
	 * A collection of `async` functions for controlling the flow through a script.
	 * @module ControlFlow
	 */
	
	/**
	 * A collection of `async` utility functions.
	 * @module Utils
	 */
	
	var index = {
	    apply: apply,
	    applyEach: applyEach,
	    applyEachSeries: applyEachSeries,
	    asyncify: asyncify,
	    auto: auto,
	    autoInject: autoInject,
	    cargo: cargo,
	    compose: compose,
	    concat: concat,
	    concatLimit: concatLimit,
	    concatSeries: concatSeries,
	    constant: constant,
	    detect: detect,
	    detectLimit: detectLimit,
	    detectSeries: detectSeries,
	    dir: dir,
	    doDuring: doDuring,
	    doUntil: doUntil,
	    doWhilst: doWhilst,
	    during: during,
	    each: eachLimit,
	    eachLimit: eachLimit$1,
	    eachOf: eachOf,
	    eachOfLimit: eachOfLimit,
	    eachOfSeries: eachOfSeries,
	    eachSeries: eachSeries,
	    ensureAsync: ensureAsync,
	    every: every,
	    everyLimit: everyLimit,
	    everySeries: everySeries,
	    filter: filter,
	    filterLimit: filterLimit,
	    filterSeries: filterSeries,
	    forever: forever,
	    groupBy: groupBy,
	    groupByLimit: groupByLimit,
	    groupBySeries: groupBySeries,
	    log: log,
	    map: map,
	    mapLimit: mapLimit,
	    mapSeries: mapSeries,
	    mapValues: mapValues,
	    mapValuesLimit: mapValuesLimit,
	    mapValuesSeries: mapValuesSeries,
	    memoize: memoize,
	    nextTick: nextTick,
	    parallel: parallelLimit,
	    parallelLimit: parallelLimit$1,
	    priorityQueue: priorityQueue,
	    queue: queue$1,
	    race: race,
	    reduce: reduce,
	    reduceRight: reduceRight,
	    reflect: reflect,
	    reflectAll: reflectAll,
	    reject: reject,
	    rejectLimit: rejectLimit,
	    rejectSeries: rejectSeries,
	    retry: retry,
	    retryable: retryable,
	    seq: seq,
	    series: series,
	    setImmediate: setImmediate$1,
	    some: some,
	    someLimit: someLimit,
	    someSeries: someSeries,
	    sortBy: sortBy,
	    timeout: timeout,
	    times: times,
	    timesLimit: timeLimit,
	    timesSeries: timesSeries,
	    transform: transform,
	    tryEach: tryEach,
	    unmemoize: unmemoize,
	    until: until,
	    waterfall: waterfall,
	    whilst: whilst,
	
	    // aliases
	    all: every,
	    allLimit: everyLimit,
	    allSeries: everySeries,
	    any: some,
	    anyLimit: someLimit,
	    anySeries: someSeries,
	    find: detect,
	    findLimit: detectLimit,
	    findSeries: detectSeries,
	    forEach: eachLimit,
	    forEachSeries: eachSeries,
	    forEachLimit: eachLimit$1,
	    forEachOf: eachOf,
	    forEachOfSeries: eachOfSeries,
	    forEachOfLimit: eachOfLimit,
	    inject: reduce,
	    foldl: reduce,
	    foldr: reduceRight,
	    select: filter,
	    selectLimit: filterLimit,
	    selectSeries: filterSeries,
	    wrapSync: asyncify
	};
	
	exports['default'] = index;
	exports.apply = apply;
	exports.applyEach = applyEach;
	exports.applyEachSeries = applyEachSeries;
	exports.asyncify = asyncify;
	exports.auto = auto;
	exports.autoInject = autoInject;
	exports.cargo = cargo;
	exports.compose = compose;
	exports.concat = concat;
	exports.concatLimit = concatLimit;
	exports.concatSeries = concatSeries;
	exports.constant = constant;
	exports.detect = detect;
	exports.detectLimit = detectLimit;
	exports.detectSeries = detectSeries;
	exports.dir = dir;
	exports.doDuring = doDuring;
	exports.doUntil = doUntil;
	exports.doWhilst = doWhilst;
	exports.during = during;
	exports.each = eachLimit;
	exports.eachLimit = eachLimit$1;
	exports.eachOf = eachOf;
	exports.eachOfLimit = eachOfLimit;
	exports.eachOfSeries = eachOfSeries;
	exports.eachSeries = eachSeries;
	exports.ensureAsync = ensureAsync;
	exports.every = every;
	exports.everyLimit = everyLimit;
	exports.everySeries = everySeries;
	exports.filter = filter;
	exports.filterLimit = filterLimit;
	exports.filterSeries = filterSeries;
	exports.forever = forever;
	exports.groupBy = groupBy;
	exports.groupByLimit = groupByLimit;
	exports.groupBySeries = groupBySeries;
	exports.log = log;
	exports.map = map;
	exports.mapLimit = mapLimit;
	exports.mapSeries = mapSeries;
	exports.mapValues = mapValues;
	exports.mapValuesLimit = mapValuesLimit;
	exports.mapValuesSeries = mapValuesSeries;
	exports.memoize = memoize;
	exports.nextTick = nextTick;
	exports.parallel = parallelLimit;
	exports.parallelLimit = parallelLimit$1;
	exports.priorityQueue = priorityQueue;
	exports.queue = queue$1;
	exports.race = race;
	exports.reduce = reduce;
	exports.reduceRight = reduceRight;
	exports.reflect = reflect;
	exports.reflectAll = reflectAll;
	exports.reject = reject;
	exports.rejectLimit = rejectLimit;
	exports.rejectSeries = rejectSeries;
	exports.retry = retry;
	exports.retryable = retryable;
	exports.seq = seq;
	exports.series = series;
	exports.setImmediate = setImmediate$1;
	exports.some = some;
	exports.someLimit = someLimit;
	exports.someSeries = someSeries;
	exports.sortBy = sortBy;
	exports.timeout = timeout;
	exports.times = times;
	exports.timesLimit = timeLimit;
	exports.timesSeries = timesSeries;
	exports.transform = transform;
	exports.tryEach = tryEach;
	exports.unmemoize = unmemoize;
	exports.until = until;
	exports.waterfall = waterfall;
	exports.whilst = whilst;
	exports.all = every;
	exports.allLimit = everyLimit;
	exports.allSeries = everySeries;
	exports.any = some;
	exports.anyLimit = someLimit;
	exports.anySeries = someSeries;
	exports.find = detect;
	exports.findLimit = detectLimit;
	exports.findSeries = detectSeries;
	exports.forEach = eachLimit;
	exports.forEachSeries = eachSeries;
	exports.forEachLimit = eachLimit$1;
	exports.forEachOf = eachOf;
	exports.forEachOfSeries = eachOfSeries;
	exports.forEachOfLimit = eachOfLimit;
	exports.inject = reduce;
	exports.foldl = reduce;
	exports.foldr = reduceRight;
	exports.select = filter;
	exports.selectLimit = filterLimit;
	exports.selectSeries = filterSeries;
	exports.wrapSync = asyncify;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).setImmediate, __webpack_require__(4), (function() { return this; }()), __webpack_require__(6)(module)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var require;var require;/* WEBPACK VAR INJECTION */(function(global) {/*!
	    localForage -- Offline Storage, Improved
	    Version 1.5.5
	    https://localforage.github.io/localForage
	    (c) 2013-2017 Mozilla, Apache License 2.0
	*/
	(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.localforage = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw (f.code="MODULE_NOT_FOUND", f)}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
	(function (global){
	'use strict';
	var Mutation = global.MutationObserver || global.WebKitMutationObserver;
	
	var scheduleDrain;
	
	{
	  if (Mutation) {
	    var called = 0;
	    var observer = new Mutation(nextTick);
	    var element = global.document.createTextNode('');
	    observer.observe(element, {
	      characterData: true
	    });
	    scheduleDrain = function () {
	      element.data = (called = ++called % 2);
	    };
	  } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
	    var channel = new global.MessageChannel();
	    channel.port1.onmessage = nextTick;
	    scheduleDrain = function () {
	      channel.port2.postMessage(0);
	    };
	  } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
	    scheduleDrain = function () {
	
	      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	      var scriptEl = global.document.createElement('script');
	      scriptEl.onreadystatechange = function () {
	        nextTick();
	
	        scriptEl.onreadystatechange = null;
	        scriptEl.parentNode.removeChild(scriptEl);
	        scriptEl = null;
	      };
	      global.document.documentElement.appendChild(scriptEl);
	    };
	  } else {
	    scheduleDrain = function () {
	      setTimeout(nextTick, 0);
	    };
	  }
	}
	
	var draining;
	var queue = [];
	//named nextTick for less confusing stack traces
	function nextTick() {
	  draining = true;
	  var i, oldQueue;
	  var len = queue.length;
	  while (len) {
	    oldQueue = queue;
	    queue = [];
	    i = -1;
	    while (++i < len) {
	      oldQueue[i]();
	    }
	    len = queue.length;
	  }
	  draining = false;
	}
	
	module.exports = immediate;
	function immediate(task) {
	  if (queue.push(task) === 1 && !draining) {
	    scheduleDrain();
	  }
	}
	
	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{}],2:[function(_dereq_,module,exports){
	'use strict';
	var immediate = _dereq_(1);
	
	/* istanbul ignore next */
	function INTERNAL() {}
	
	var handlers = {};
	
	var REJECTED = ['REJECTED'];
	var FULFILLED = ['FULFILLED'];
	var PENDING = ['PENDING'];
	
	module.exports = exports = Promise;
	
	function Promise(resolver) {
	  if (typeof resolver !== 'function') {
	    throw new TypeError('resolver must be a function');
	  }
	  this.state = PENDING;
	  this.queue = [];
	  this.outcome = void 0;
	  if (resolver !== INTERNAL) {
	    safelyResolveThenable(this, resolver);
	  }
	}
	
	Promise.prototype["catch"] = function (onRejected) {
	  return this.then(null, onRejected);
	};
	Promise.prototype.then = function (onFulfilled, onRejected) {
	  if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
	    typeof onRejected !== 'function' && this.state === REJECTED) {
	    return this;
	  }
	  var promise = new this.constructor(INTERNAL);
	  if (this.state !== PENDING) {
	    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
	    unwrap(promise, resolver, this.outcome);
	  } else {
	    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
	  }
	
	  return promise;
	};
	function QueueItem(promise, onFulfilled, onRejected) {
	  this.promise = promise;
	  if (typeof onFulfilled === 'function') {
	    this.onFulfilled = onFulfilled;
	    this.callFulfilled = this.otherCallFulfilled;
	  }
	  if (typeof onRejected === 'function') {
	    this.onRejected = onRejected;
	    this.callRejected = this.otherCallRejected;
	  }
	}
	QueueItem.prototype.callFulfilled = function (value) {
	  handlers.resolve(this.promise, value);
	};
	QueueItem.prototype.otherCallFulfilled = function (value) {
	  unwrap(this.promise, this.onFulfilled, value);
	};
	QueueItem.prototype.callRejected = function (value) {
	  handlers.reject(this.promise, value);
	};
	QueueItem.prototype.otherCallRejected = function (value) {
	  unwrap(this.promise, this.onRejected, value);
	};
	
	function unwrap(promise, func, value) {
	  immediate(function () {
	    var returnValue;
	    try {
	      returnValue = func(value);
	    } catch (e) {
	      return handlers.reject(promise, e);
	    }
	    if (returnValue === promise) {
	      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
	    } else {
	      handlers.resolve(promise, returnValue);
	    }
	  });
	}
	
	handlers.resolve = function (self, value) {
	  var result = tryCatch(getThen, value);
	  if (result.status === 'error') {
	    return handlers.reject(self, result.value);
	  }
	  var thenable = result.value;
	
	  if (thenable) {
	    safelyResolveThenable(self, thenable);
	  } else {
	    self.state = FULFILLED;
	    self.outcome = value;
	    var i = -1;
	    var len = self.queue.length;
	    while (++i < len) {
	      self.queue[i].callFulfilled(value);
	    }
	  }
	  return self;
	};
	handlers.reject = function (self, error) {
	  self.state = REJECTED;
	  self.outcome = error;
	  var i = -1;
	  var len = self.queue.length;
	  while (++i < len) {
	    self.queue[i].callRejected(error);
	  }
	  return self;
	};
	
	function getThen(obj) {
	  // Make sure we only access the accessor once as required by the spec
	  var then = obj && obj.then;
	  if (obj && typeof obj === 'object' && typeof then === 'function') {
	    return function appyThen() {
	      then.apply(obj, arguments);
	    };
	  }
	}
	
	function safelyResolveThenable(self, thenable) {
	  // Either fulfill, reject or reject with error
	  var called = false;
	  function onError(value) {
	    if (called) {
	      return;
	    }
	    called = true;
	    handlers.reject(self, value);
	  }
	
	  function onSuccess(value) {
	    if (called) {
	      return;
	    }
	    called = true;
	    handlers.resolve(self, value);
	  }
	
	  function tryToUnwrap() {
	    thenable(onSuccess, onError);
	  }
	
	  var result = tryCatch(tryToUnwrap);
	  if (result.status === 'error') {
	    onError(result.value);
	  }
	}
	
	function tryCatch(func, value) {
	  var out = {};
	  try {
	    out.value = func(value);
	    out.status = 'success';
	  } catch (e) {
	    out.status = 'error';
	    out.value = e;
	  }
	  return out;
	}
	
	exports.resolve = resolve;
	function resolve(value) {
	  if (value instanceof this) {
	    return value;
	  }
	  return handlers.resolve(new this(INTERNAL), value);
	}
	
	exports.reject = reject;
	function reject(reason) {
	  var promise = new this(INTERNAL);
	  return handlers.reject(promise, reason);
	}
	
	exports.all = all;
	function all(iterable) {
	  var self = this;
	  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
	    return this.reject(new TypeError('must be an array'));
	  }
	
	  var len = iterable.length;
	  var called = false;
	  if (!len) {
	    return this.resolve([]);
	  }
	
	  var values = new Array(len);
	  var resolved = 0;
	  var i = -1;
	  var promise = new this(INTERNAL);
	
	  while (++i < len) {
	    allResolver(iterable[i], i);
	  }
	  return promise;
	  function allResolver(value, i) {
	    self.resolve(value).then(resolveFromAll, function (error) {
	      if (!called) {
	        called = true;
	        handlers.reject(promise, error);
	      }
	    });
	    function resolveFromAll(outValue) {
	      values[i] = outValue;
	      if (++resolved === len && !called) {
	        called = true;
	        handlers.resolve(promise, values);
	      }
	    }
	  }
	}
	
	exports.race = race;
	function race(iterable) {
	  var self = this;
	  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
	    return this.reject(new TypeError('must be an array'));
	  }
	
	  var len = iterable.length;
	  var called = false;
	  if (!len) {
	    return this.resolve([]);
	  }
	
	  var i = -1;
	  var promise = new this(INTERNAL);
	
	  while (++i < len) {
	    resolver(iterable[i]);
	  }
	  return promise;
	  function resolver(value) {
	    self.resolve(value).then(function (response) {
	      if (!called) {
	        called = true;
	        handlers.resolve(promise, response);
	      }
	    }, function (error) {
	      if (!called) {
	        called = true;
	        handlers.reject(promise, error);
	      }
	    });
	  }
	}
	
	},{"1":1}],3:[function(_dereq_,module,exports){
	(function (global){
	'use strict';
	if (typeof global.Promise !== 'function') {
	  global.Promise = _dereq_(2);
	}
	
	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{"2":2}],4:[function(_dereq_,module,exports){
	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function getIDB() {
	    /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */
	    try {
	        if (typeof indexedDB !== 'undefined') {
	            return indexedDB;
	        }
	        if (typeof webkitIndexedDB !== 'undefined') {
	            return webkitIndexedDB;
	        }
	        if (typeof mozIndexedDB !== 'undefined') {
	            return mozIndexedDB;
	        }
	        if (typeof OIndexedDB !== 'undefined') {
	            return OIndexedDB;
	        }
	        if (typeof msIndexedDB !== 'undefined') {
	            return msIndexedDB;
	        }
	    } catch (e) {
	        return;
	    }
	}
	
	var idb = getIDB();
	
	function isIndexedDBValid() {
	    try {
	        // Initialize IndexedDB; fall back to vendor-prefixed versions
	        // if needed.
	        if (!idb) {
	            return false;
	        }
	        // We mimic PouchDB here;
	        //
	        // We test for openDatabase because IE Mobile identifies itself
	        // as Safari. Oh the lulz...
	        var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);
	
	        var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1;
	
	        // Safari <10.1 does not meet our requirements for IDB support (#5572)
	        // since Safari 10.1 shipped with fetch, we can use that to detect it
	        return (!isSafari || hasFetch) && typeof indexedDB !== 'undefined' &&
	        // some outdated implementations of IDB that appear on Samsung
	        // and HTC Android devices <4.4 are missing IDBKeyRange
	        // See: https://github.com/mozilla/localForage/issues/128
	        // See: https://github.com/mozilla/localForage/issues/272
	        typeof IDBKeyRange !== 'undefined';
	    } catch (e) {
	        return false;
	    }
	}
	
	// Abstracts constructing a Blob object, so it also works in older
	// browsers that don't support the native Blob constructor. (i.e.
	// old QtWebKit versions, at least).
	// Abstracts constructing a Blob object, so it also works in older
	// browsers that don't support the native Blob constructor. (i.e.
	// old QtWebKit versions, at least).
	function createBlob(parts, properties) {
	    /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */
	    parts = parts || [];
	    properties = properties || {};
	    try {
	        return new Blob(parts, properties);
	    } catch (e) {
	        if (e.name !== 'TypeError') {
	            throw e;
	        }
	        var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;
	        var builder = new Builder();
	        for (var i = 0; i < parts.length; i += 1) {
	            builder.append(parts[i]);
	        }
	        return builder.getBlob(properties.type);
	    }
	}
	
	// This is CommonJS because lie is an external dependency, so Rollup
	// can just ignore it.
	if (typeof Promise === 'undefined') {
	    // In the "nopromises" build this will just throw if you don't have
	    // a global promise object, but it would throw anyway later.
	    _dereq_(3);
	}
	var Promise$1 = Promise;
	
	function executeCallback(promise, callback) {
	    if (callback) {
	        promise.then(function (result) {
	            callback(null, result);
	        }, function (error) {
	            callback(error);
	        });
	    }
	}
	
	function executeTwoCallbacks(promise, callback, errorCallback) {
	    if (typeof callback === 'function') {
	        promise.then(callback);
	    }
	
	    if (typeof errorCallback === 'function') {
	        promise["catch"](errorCallback);
	    }
	}
	
	function normalizeKey(key) {
	    // Cast the key to a string, as that's all we can set as a key.
	    if (typeof key !== 'string') {
	        console.warn(key + ' used as a key, but it is not a string.');
	        key = String(key);
	    }
	
	    return key;
	}
	
	// Some code originally from async_storage.js in
	// [Gaia](https://github.com/mozilla-b2g/gaia).
	
	var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
	var supportsBlobs;
	var dbContexts;
	var toString = Object.prototype.toString;
	
	// Transaction Modes
	var READ_ONLY = 'readonly';
	var READ_WRITE = 'readwrite';
	
	// Transform a binary string to an array buffer, because otherwise
	// weird stuff happens when you try to work with the binary string directly.
	// It is known.
	// From http://stackoverflow.com/questions/14967647/ (continues on next line)
	// encode-decode-image-with-base64-breaks-image (2013-04-21)
	function _binStringToArrayBuffer(bin) {
	    var length = bin.length;
	    var buf = new ArrayBuffer(length);
	    var arr = new Uint8Array(buf);
	    for (var i = 0; i < length; i++) {
	        arr[i] = bin.charCodeAt(i);
	    }
	    return buf;
	}
	
	//
	// Blobs are not supported in all versions of IndexedDB, notably
	// Chrome <37 and Android <5. In those versions, storing a blob will throw.
	//
	// Various other blob bugs exist in Chrome v37-42 (inclusive).
	// Detecting them is expensive and confusing to users, and Chrome 37-42
	// is at very low usage worldwide, so we do a hacky userAgent check instead.
	//
	// content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120
	// 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
	// FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
	//
	// Code borrowed from PouchDB. See:
	// https://github.com/pouchdb/pouchdb/blob/master/packages/node_modules/pouchdb-adapter-idb/src/blobSupport.js
	//
	function _checkBlobSupportWithoutCaching(idb) {
	    return new Promise$1(function (resolve) {
	        var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
	        var blob = createBlob(['']);
	        txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');
	
	        txn.onabort = function (e) {
	            // If the transaction aborts now its due to not being able to
	            // write to the database, likely due to the disk being full
	            e.preventDefault();
	            e.stopPropagation();
	            resolve(false);
	        };
	
	        txn.oncomplete = function () {
	            var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
	            var matchedEdge = navigator.userAgent.match(/Edge\//);
	            // MS Edge pretends to be Chrome 42:
	            // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx
	            resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
	        };
	    })["catch"](function () {
	        return false; // error, so assume unsupported
	    });
	}
	
	function _checkBlobSupport(idb) {
	    if (typeof supportsBlobs === 'boolean') {
	        return Promise$1.resolve(supportsBlobs);
	    }
	    return _checkBlobSupportWithoutCaching(idb).then(function (value) {
	        supportsBlobs = value;
	        return supportsBlobs;
	    });
	}
	
	function _deferReadiness(dbInfo) {
	    var dbContext = dbContexts[dbInfo.name];
	
	    // Create a deferred object representing the current database operation.
	    var deferredOperation = {};
	
	    deferredOperation.promise = new Promise$1(function (resolve) {
	        deferredOperation.resolve = resolve;
	    });
	
	    // Enqueue the deferred operation.
	    dbContext.deferredOperations.push(deferredOperation);
	
	    // Chain its promise to the database readiness.
	    if (!dbContext.dbReady) {
	        dbContext.dbReady = deferredOperation.promise;
	    } else {
	        dbContext.dbReady = dbContext.dbReady.then(function () {
	            return deferredOperation.promise;
	        });
	    }
	}
	
	function _advanceReadiness(dbInfo) {
	    var dbContext = dbContexts[dbInfo.name];
	
	    // Dequeue a deferred operation.
	    var deferredOperation = dbContext.deferredOperations.pop();
	
	    // Resolve its promise (which is part of the database readiness
	    // chain of promises).
	    if (deferredOperation) {
	        deferredOperation.resolve();
	    }
	}
	
	function _rejectReadiness(dbInfo, err) {
	    var dbContext = dbContexts[dbInfo.name];
	
	    // Dequeue a deferred operation.
	    var deferredOperation = dbContext.deferredOperations.pop();
	
	    // Reject its promise (which is part of the database readiness
	    // chain of promises).
	    if (deferredOperation) {
	        deferredOperation.reject(err);
	    }
	}
	
	function _getConnection(dbInfo, upgradeNeeded) {
	    return new Promise$1(function (resolve, reject) {
	
	        if (dbInfo.db) {
	            if (upgradeNeeded) {
	                _deferReadiness(dbInfo);
	                dbInfo.db.close();
	            } else {
	                return resolve(dbInfo.db);
	            }
	        }
	
	        var dbArgs = [dbInfo.name];
	
	        if (upgradeNeeded) {
	            dbArgs.push(dbInfo.version);
	        }
	
	        var openreq = idb.open.apply(idb, dbArgs);
	
	        if (upgradeNeeded) {
	            openreq.onupgradeneeded = function (e) {
	                var db = openreq.result;
	                try {
	                    db.createObjectStore(dbInfo.storeName);
	                    if (e.oldVersion <= 1) {
	                        // Added when support for blob shims was added
	                        db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
	                    }
	                } catch (ex) {
	                    if (ex.name === 'ConstraintError') {
	                        console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
	                    } else {
	                        throw ex;
	                    }
	                }
	            };
	        }
	
	        openreq.onerror = function (e) {
	            e.preventDefault();
	            reject(openreq.error);
	        };
	
	        openreq.onsuccess = function () {
	            resolve(openreq.result);
	            _advanceReadiness(dbInfo);
	        };
	    });
	}
	
	function _getOriginalConnection(dbInfo) {
	    return _getConnection(dbInfo, false);
	}
	
	function _getUpgradedConnection(dbInfo) {
	    return _getConnection(dbInfo, true);
	}
	
	function _isUpgradeNeeded(dbInfo, defaultVersion) {
	    if (!dbInfo.db) {
	        return true;
	    }
	
	    var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
	    var isDowngrade = dbInfo.version < dbInfo.db.version;
	    var isUpgrade = dbInfo.version > dbInfo.db.version;
	
	    if (isDowngrade) {
	        // If the version is not the default one
	        // then warn for impossible downgrade.
	        if (dbInfo.version !== defaultVersion) {
	            console.warn('The database "' + dbInfo.name + '"' + ' can\'t be downgraded from version ' + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
	        }
	        // Align the versions to prevent errors.
	        dbInfo.version = dbInfo.db.version;
	    }
	
	    if (isUpgrade || isNewStore) {
	        // If the store is new then increment the version (if needed).
	        // This will trigger an "upgradeneeded" event which is required
	        // for creating a store.
	        if (isNewStore) {
	            var incVersion = dbInfo.db.version + 1;
	            if (incVersion > dbInfo.version) {
	                dbInfo.version = incVersion;
	            }
	        }
	
	        return true;
	    }
	
	    return false;
	}
	
	// encode a blob for indexeddb engines that don't support blobs
	function _encodeBlob(blob) {
	    return new Promise$1(function (resolve, reject) {
	        var reader = new FileReader();
	        reader.onerror = reject;
	        reader.onloadend = function (e) {
	            var base64 = btoa(e.target.result || '');
	            resolve({
	                __local_forage_encoded_blob: true,
	                data: base64,
	                type: blob.type
	            });
	        };
	        reader.readAsBinaryString(blob);
	    });
	}
	
	// decode an encoded blob
	function _decodeBlob(encodedBlob) {
	    var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
	    return createBlob([arrayBuff], { type: encodedBlob.type });
	}
	
	// is this one of our fancy encoded blobs?
	function _isEncodedBlob(value) {
	    return value && value.__local_forage_encoded_blob;
	}
	
	// Specialize the default `ready()` function by making it dependent
	// on the current database operations. Thus, the driver will be actually
	// ready when it's been initialized (default) *and* there are no pending
	// operations on the database (initiated by some other instances).
	function _fullyReady(callback) {
	    var self = this;
	
	    var promise = self._initReady().then(function () {
	        var dbContext = dbContexts[self._dbInfo.name];
	
	        if (dbContext && dbContext.dbReady) {
	            return dbContext.dbReady;
	        }
	    });
	
	    executeTwoCallbacks(promise, callback, callback);
	    return promise;
	}
	
	// Try to establish a new db connection to replace the
	// current one which is broken (i.e. experiencing
	// InvalidStateError while creating a transaction).
	function _tryReconnect(dbInfo) {
	    _deferReadiness(dbInfo);
	
	    var dbContext = dbContexts[dbInfo.name];
	    var forages = dbContext.forages;
	
	    for (var i = 0; i < forages.length; i++) {
	        if (forages[i]._dbInfo.db) {
	            forages[i]._dbInfo.db.close();
	            forages[i]._dbInfo.db = null;
	        }
	    }
	
	    return _getConnection(dbInfo, false).then(function (db) {
	        for (var j = 0; j < forages.length; j++) {
	            forages[j]._dbInfo.db = db;
	        }
	    })["catch"](function (err) {
	        _rejectReadiness(dbInfo, err);
	        throw err;
	    });
	}
	
	// FF doesn't like Promises (micro-tasks) and IDDB store operations,
	// so we have to do it with callbacks
	function createTransaction(dbInfo, mode, callback) {
	    try {
	        var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
	        callback(null, tx);
	    } catch (err) {
	        if (!dbInfo.db || err.name === 'InvalidStateError') {
	            return _tryReconnect(dbInfo).then(function () {
	
	                var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
	                callback(null, tx);
	            });
	        }
	
	        callback(err);
	    }
	}
	
	// Open the IndexedDB database (automatically creates one if one didn't
	// previously exist), using any options set in the config.
	function _initStorage(options) {
	    var self = this;
	    var dbInfo = {
	        db: null
	    };
	
	    if (options) {
	        for (var i in options) {
	            dbInfo[i] = options[i];
	        }
	    }
	
	    // Initialize a singleton container for all running localForages.
	    if (!dbContexts) {
	        dbContexts = {};
	    }
	
	    // Get the current context of the database;
	    var dbContext = dbContexts[dbInfo.name];
	
	    // ...or create a new context.
	    if (!dbContext) {
	        dbContext = {
	            // Running localForages sharing a database.
	            forages: [],
	            // Shared database.
	            db: null,
	            // Database readiness (promise).
	            dbReady: null,
	            // Deferred operations on the database.
	            deferredOperations: []
	        };
	        // Register the new context in the global container.
	        dbContexts[dbInfo.name] = dbContext;
	    }
	
	    // Register itself as a running localForage in the current context.
	    dbContext.forages.push(self);
	
	    // Replace the default `ready()` function with the specialized one.
	    if (!self._initReady) {
	        self._initReady = self.ready;
	        self.ready = _fullyReady;
	    }
	
	    // Create an array of initialization states of the related localForages.
	    var initPromises = [];
	
	    function ignoreErrors() {
	        // Don't handle errors here,
	        // just makes sure related localForages aren't pending.
	        return Promise$1.resolve();
	    }
	
	    for (var j = 0; j < dbContext.forages.length; j++) {
	        var forage = dbContext.forages[j];
	        if (forage !== self) {
	            // Don't wait for itself...
	            initPromises.push(forage._initReady()["catch"](ignoreErrors));
	        }
	    }
	
	    // Take a snapshot of the related localForages.
	    var forages = dbContext.forages.slice(0);
	
	    // Initialize the connection process only when
	    // all the related localForages aren't pending.
	    return Promise$1.all(initPromises).then(function () {
	        dbInfo.db = dbContext.db;
	        // Get the connection or open a new one without upgrade.
	        return _getOriginalConnection(dbInfo);
	    }).then(function (db) {
	        dbInfo.db = db;
	        if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) {
	            // Reopen the database for upgrading.
	            return _getUpgradedConnection(dbInfo);
	        }
	        return db;
	    }).then(function (db) {
	        dbInfo.db = dbContext.db = db;
	        self._dbInfo = dbInfo;
	        // Share the final connection amongst related localForages.
	        for (var k = 0; k < forages.length; k++) {
	            var forage = forages[k];
	            if (forage !== self) {
	                // Self is already up-to-date.
	                forage._dbInfo.db = dbInfo.db;
	                forage._dbInfo.version = dbInfo.version;
	            }
	        }
	    });
	}
	
	function getItem(key, callback) {
	    var self = this;
	
	    key = normalizeKey(key);
	
	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
	                if (err) {
	                    return reject(err);
	                }
	
	                try {
	                    var store = transaction.objectStore(self._dbInfo.storeName);
	                    var req = store.get(key);
	
	                    req.onsuccess = function () {
	                        var value = req.result;
	                        if (value === undefined) {
	                            value = null;
	                        }
	                        if (_isEncodedBlob(value)) {
	                            value = _decodeBlob(value);
	                        }
	                        resolve(value);
	                    };
	
	                    req.onerror = function () {
	                        reject(req.error);
	                    };
	                } catch (e) {
	                    reject(e);
	                }
	            });
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	// Iterate over all items stored in database.
	function iterate(iterator, callback) {
	    var self = this;
	
	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
	                if (err) {
	                    return reject(err);
	                }
	
	                try {
	                    var store = transaction.objectStore(self._dbInfo.storeName);
	                    var req = store.openCursor();
	                    var iterationNumber = 1;
	
	                    req.onsuccess = function () {
	                        var cursor = req.result;
	
	                        if (cursor) {
	                            var value = cursor.value;
	                            if (_isEncodedBlob(value)) {
	                                value = _decodeBlob(value);
	                            }
	                            var result = iterator(value, cursor.key, iterationNumber++);
	
	                            // when the iterator callback retuns any
	                            // (non-`undefined`) value, then we stop
	                            // the iteration immediately
	                            if (result !== void 0) {
	                                resolve(result);
	                            } else {
	                                cursor["continue"]();
	                            }
	                        } else {
	                            resolve();
	                        }
	                    };
	
	                    req.onerror = function () {
	                        reject(req.error);
	                    };
	                } catch (e) {
	                    reject(e);
	                }
	            });
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	
	    return promise;
	}
	
	function setItem(key, value, callback) {
	    var self = this;
	
	    key = normalizeKey(key);
	
	    var promise = new Promise$1(function (resolve, reject) {
	        var dbInfo;
	        self.ready().then(function () {
	            dbInfo = self._dbInfo;
	            if (toString.call(value) === '[object Blob]') {
	                return _checkBlobSupport(dbInfo.db).then(function (blobSupport) {
	                    if (blobSupport) {
	                        return value;
	                    }
	                    return _encodeBlob(value);
	                });
	            }
	            return value;
	        }).then(function (value) {
	            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
	                if (err) {
	                    return reject(err);
	                }
	
	                try {
	                    var store = transaction.objectStore(self._dbInfo.storeName);
	
	                    // The reason we don't _save_ null is because IE 10 does
	                    // not support saving the `null` type in IndexedDB. How
	                    // ironic, given the bug below!
	                    // See: https://github.com/mozilla/localForage/issues/161
	                    if (value === null) {
	                        value = undefined;
	                    }
	
	                    var req = store.put(value, key);
	
	                    transaction.oncomplete = function () {
	                        // Cast to undefined so the value passed to
	                        // callback/promise is the same as what one would get out
	                        // of `getItem()` later. This leads to some weirdness
	                        // (setItem('foo', undefined) will return `null`), but
	                        // it's not my fault localStorage is our baseline and that
	                        // it's weird.
	                        if (value === undefined) {
	                            value = null;
	                        }
	
	                        resolve(value);
	                    };
	                    transaction.onabort = transaction.onerror = function () {
	                        var err = req.error ? req.error : req.transaction.error;
	                        reject(err);
	                    };
	                } catch (e) {
	                    reject(e);
	                }
	            });
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	function removeItem(key, callback) {
	    var self = this;
	
	    key = normalizeKey(key);
	
	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
	                if (err) {
	                    return reject(err);
	                }
	
	                try {
	                    var store = transaction.objectStore(self._dbInfo.storeName);
	                    // We use a Grunt task to make this safe for IE and some
	                    // versions of Android (including those used by Cordova).
	                    // Normally IE won't like `.delete()` and will insist on
	                    // using `['delete']()`, but we have a build step that
	                    // fixes this for us now.
	                    var req = store["delete"](key);
	                    transaction.oncomplete = function () {
	                        resolve();
	                    };
	
	                    transaction.onerror = function () {
	                        reject(req.error);
	                    };
	
	                    // The request will be also be aborted if we've exceeded our storage
	                    // space.
	                    transaction.onabort = function () {
	                        var err = req.error ? req.error : req.transaction.error;
	                        reject(err);
	                    };
	                } catch (e) {
	                    reject(e);
	                }
	            });
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	function clear(callback) {
	    var self = this;
	
	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
	                if (err) {
	                    return reject(err);
	                }
	
	                try {
	                    var store = transaction.objectStore(self._dbInfo.storeName);
	                    var req = store.clear();
	
	                    transaction.oncomplete = function () {
	                        resolve();
	                    };
	
	                    transaction.onabort = transaction.onerror = function () {
	                        var err = req.error ? req.error : req.transaction.error;
	                        reject(err);
	                    };
	                } catch (e) {
	                    reject(e);
	                }
	            });
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	function length(callback) {
	    var self = this;
	
	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
	                if (err) {
	                    return reject(err);
	                }
	
	                try {
	                    var store = transaction.objectStore(self._dbInfo.storeName);
	                    var req = store.count();
	
	                    req.onsuccess = function () {
	                        resolve(req.result);
	                    };
	
	                    req.onerror = function () {
	                        reject(req.error);
	                    };
	                } catch (e) {
	                    reject(e);
	                }
	            });
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	function key(n, callback) {
	    var self = this;
	
	    var promise = new Promise$1(function (resolve, reject) {
	        if (n < 0) {
	            resolve(null);
	
	            return;
	        }
	
	        self.ready().then(function () {
	            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
	                if (err) {
	                    return reject(err);
	                }
	
	                try {
	                    var store = transaction.objectStore(self._dbInfo.storeName);
	                    var advanced = false;
	                    var req = store.openCursor();
	
	                    req.onsuccess = function () {
	                        var cursor = req.result;
	                        if (!cursor) {
	                            // this means there weren't enough keys
	                            resolve(null);
	
	                            return;
	                        }
	
	                        if (n === 0) {
	                            // We have the first key, return it if that's what they
	                            // wanted.
	                            resolve(cursor.key);
	                        } else {
	                            if (!advanced) {
	                                // Otherwise, ask the cursor to skip ahead n
	                                // records.
	                                advanced = true;
	                                cursor.advance(n);
	                            } else {
	                                // When we get here, we've got the nth key.
	                                resolve(cursor.key);
	                            }
	                        }
	                    };
	
	                    req.onerror = function () {
	                        reject(req.error);
	                    };
	                } catch (e) {
	                    reject(e);
	                }
	            });
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	function keys(callback) {
	    var self = this;
	
	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
	                if (err) {
	                    return reject(err);
	                }
	
	                try {
	                    var store = transaction.objectStore(self._dbInfo.storeName);
	                    var req = store.openCursor();
	                    var keys = [];
	
	                    req.onsuccess = function () {
	                        var cursor = req.result;
	
	                        if (!cursor) {
	                            resolve(keys);
	                            return;
	                        }
	
	                        keys.push(cursor.key);
	                        cursor["continue"]();
	                    };
	
	                    req.onerror = function () {
	                        reject(req.error);
	                    };
	                } catch (e) {
	                    reject(e);
	                }
	            });
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	var asyncStorage = {
	    _driver: 'asyncStorage',
	    _initStorage: _initStorage,
	    _support: isIndexedDBValid(),
	    iterate: iterate,
	    getItem: getItem,
	    setItem: setItem,
	    removeItem: removeItem,
	    clear: clear,
	    length: length,
	    key: key,
	    keys: keys
	};
	
	function isWebSQLValid() {
	    return typeof openDatabase === 'function';
	}
	
	// Sadly, the best way to save binary data in WebSQL/localStorage is serializing
	// it to Base64, so this is how we store it to prevent very strange errors with less
	// verbose ways of binary <-> string data storage.
	var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	
	var BLOB_TYPE_PREFIX = '~~local_forage_type~';
	var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;
	
	var SERIALIZED_MARKER = '__lfsc__:';
	var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;
	
	// OMG the serializations!
	var TYPE_ARRAYBUFFER = 'arbf';
	var TYPE_BLOB = 'blob';
	var TYPE_INT8ARRAY = 'si08';
	var TYPE_UINT8ARRAY = 'ui08';
	var TYPE_UINT8CLAMPEDARRAY = 'uic8';
	var TYPE_INT16ARRAY = 'si16';
	var TYPE_INT32ARRAY = 'si32';
	var TYPE_UINT16ARRAY = 'ur16';
	var TYPE_UINT32ARRAY = 'ui32';
	var TYPE_FLOAT32ARRAY = 'fl32';
	var TYPE_FLOAT64ARRAY = 'fl64';
	var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;
	
	var toString$1 = Object.prototype.toString;
	
	function stringToBuffer(serializedString) {
	    // Fill the string into a ArrayBuffer.
	    var bufferLength = serializedString.length * 0.75;
	    var len = serializedString.length;
	    var i;
	    var p = 0;
	    var encoded1, encoded2, encoded3, encoded4;
	
	    if (serializedString[serializedString.length - 1] === '=') {
	        bufferLength--;
	        if (serializedString[serializedString.length - 2] === '=') {
	            bufferLength--;
	        }
	    }
	
	    var buffer = new ArrayBuffer(bufferLength);
	    var bytes = new Uint8Array(buffer);
	
	    for (i = 0; i < len; i += 4) {
	        encoded1 = BASE_CHARS.indexOf(serializedString[i]);
	        encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
	        encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
	        encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);
	
	        /*jslint bitwise: true */
	        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
	        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
	        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
	    }
	    return buffer;
	}
	
	// Converts a buffer to a string to store, serialized, in the backend
	// storage library.
	function bufferToString(buffer) {
	    // base64-arraybuffer
	    var bytes = new Uint8Array(buffer);
	    var base64String = '';
	    var i;
	
	    for (i = 0; i < bytes.length; i += 3) {
	        /*jslint bitwise: true */
	        base64String += BASE_CHARS[bytes[i] >> 2];
	        base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
	        base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
	        base64String += BASE_CHARS[bytes[i + 2] & 63];
	    }
	
	    if (bytes.length % 3 === 2) {
	        base64String = base64String.substring(0, base64String.length - 1) + '=';
	    } else if (bytes.length % 3 === 1) {
	        base64String = base64String.substring(0, base64String.length - 2) + '==';
	    }
	
	    return base64String;
	}
	
	// Serialize a value, afterwards executing a callback (which usually
	// instructs the `setItem()` callback/promise to be executed). This is how
	// we store binary data with localStorage.
	function serialize(value, callback) {
	    var valueType = '';
	    if (value) {
	        valueType = toString$1.call(value);
	    }
	
	    // Cannot use `value instanceof ArrayBuffer` or such here, as these
	    // checks fail when running the tests using casper.js...
	    //
	    // TODO: See why those tests fail and use a better solution.
	    if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {
	        // Convert binary arrays to a string and prefix the string with
	        // a special marker.
	        var buffer;
	        var marker = SERIALIZED_MARKER;
	
	        if (value instanceof ArrayBuffer) {
	            buffer = value;
	            marker += TYPE_ARRAYBUFFER;
	        } else {
	            buffer = value.buffer;
	
	            if (valueType === '[object Int8Array]') {
	                marker += TYPE_INT8ARRAY;
	            } else if (valueType === '[object Uint8Array]') {
	                marker += TYPE_UINT8ARRAY;
	            } else if (valueType === '[object Uint8ClampedArray]') {
	                marker += TYPE_UINT8CLAMPEDARRAY;
	            } else if (valueType === '[object Int16Array]') {
	                marker += TYPE_INT16ARRAY;
	            } else if (valueType === '[object Uint16Array]') {
	                marker += TYPE_UINT16ARRAY;
	            } else if (valueType === '[object Int32Array]') {
	                marker += TYPE_INT32ARRAY;
	            } else if (valueType === '[object Uint32Array]') {
	                marker += TYPE_UINT32ARRAY;
	            } else if (valueType === '[object Float32Array]') {
	                marker += TYPE_FLOAT32ARRAY;
	            } else if (valueType === '[object Float64Array]') {
	                marker += TYPE_FLOAT64ARRAY;
	            } else {
	                callback(new Error('Failed to get type for BinaryArray'));
	            }
	        }
	
	        callback(marker + bufferToString(buffer));
	    } else if (valueType === '[object Blob]') {
	        // Conver the blob to a binaryArray and then to a string.
	        var fileReader = new FileReader();
	
	        fileReader.onload = function () {
	            // Backwards-compatible prefix for the blob type.
	            var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);
	
	            callback(SERIALIZED_MARKER + TYPE_BLOB + str);
	        };
	
	        fileReader.readAsArrayBuffer(value);
	    } else {
	        try {
	            callback(JSON.stringify(value));
	        } catch (e) {
	            console.error("Couldn't convert value into a JSON string: ", value);
	
	            callback(null, e);
	        }
	    }
	}
	
	// Deserialize data we've inserted into a value column/field. We place
	// special markers into our strings to mark them as encoded; this isn't
	// as nice as a meta field, but it's the only sane thing we can do whilst
	// keeping localStorage support intact.
	//
	// Oftentimes this will just deserialize JSON content, but if we have a
	// special marker (SERIALIZED_MARKER, defined above), we will extract
	// some kind of arraybuffer/binary data/typed array out of the string.
	function deserialize(value) {
	    // If we haven't marked this string as being specially serialized (i.e.
	    // something other than serialized JSON), we can just return it and be
	    // done with it.
	    if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
	        return JSON.parse(value);
	    }
	
	    // The following code deals with deserializing some kind of Blob or
	    // TypedArray. First we separate out the type of data we're dealing
	    // with from the data itself.
	    var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
	    var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);
	
	    var blobType;
	    // Backwards-compatible blob type serialization strategy.
	    // DBs created with older versions of localForage will simply not have the blob type.
	    if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
	        var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
	        blobType = matcher[1];
	        serializedString = serializedString.substring(matcher[0].length);
	    }
	    var buffer = stringToBuffer(serializedString);
	
	    // Return the right type based on the code/type set during
	    // serialization.
	    switch (type) {
	        case TYPE_ARRAYBUFFER:
	            return buffer;
	        case TYPE_BLOB:
	            return createBlob([buffer], { type: blobType });
	        case TYPE_INT8ARRAY:
	            return new Int8Array(buffer);
	        case TYPE_UINT8ARRAY:
	            return new Uint8Array(buffer);
	        case TYPE_UINT8CLAMPEDARRAY:
	            return new Uint8ClampedArray(buffer);
	        case TYPE_INT16ARRAY:
	            return new Int16Array(buffer);
	        case TYPE_UINT16ARRAY:
	            return new Uint16Array(buffer);
	        case TYPE_INT32ARRAY:
	            return new Int32Array(buffer);
	        case TYPE_UINT32ARRAY:
	            return new Uint32Array(buffer);
	        case TYPE_FLOAT32ARRAY:
	            return new Float32Array(buffer);
	        case TYPE_FLOAT64ARRAY:
	            return new Float64Array(buffer);
	        default:
	            throw new Error('Unkown type: ' + type);
	    }
	}
	
	var localforageSerializer = {
	    serialize: serialize,
	    deserialize: deserialize,
	    stringToBuffer: stringToBuffer,
	    bufferToString: bufferToString
	};
	
	/*
	 * Includes code from:
	 *
	 * base64-arraybuffer
	 * https://github.com/niklasvh/base64-arraybuffer
	 *
	 * Copyright (c) 2012 Niklas von Hertzen
	 * Licensed under the MIT license.
	 */
	// Open the WebSQL database (automatically creates one if one didn't
	// previously exist), using any options set in the config.
	function _initStorage$1(options) {
	    var self = this;
	    var dbInfo = {
	        db: null
	    };
	
	    if (options) {
	        for (var i in options) {
	            dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
	        }
	    }
	
	    var dbInfoPromise = new Promise$1(function (resolve, reject) {
	        // Open the database; the openDatabase API will automatically
	        // create it for us if it doesn't exist.
	        try {
	            dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
	        } catch (e) {
	            return reject(e);
	        }
	
	        // Create our key/value table if it doesn't exist.
	        dbInfo.db.transaction(function (t) {
	            t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' (id INTEGER PRIMARY KEY, key unique, value)', [], function () {
	                self._dbInfo = dbInfo;
	                resolve();
	            }, function (t, error) {
	                reject(error);
	            });
	        });
	    });
	
	    dbInfo.serializer = localforageSerializer;
	    return dbInfoPromise;
	}
	
	function getItem$1(key, callback) {
	    var self = this;
	
	    key = normalizeKey(key);
	
	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            var dbInfo = self._dbInfo;
	            dbInfo.db.transaction(function (t) {
	                t.executeSql('SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {
	                    var result = results.rows.length ? results.rows.item(0).value : null;
	
	                    // Check to see if this is serialized content we need to
	                    // unpack.
	                    if (result) {
	                        result = dbInfo.serializer.deserialize(result);
	                    }
	
	                    resolve(result);
	                }, function (t, error) {
	
	                    reject(error);
	                });
	            });
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	function iterate$1(iterator, callback) {
	    var self = this;
	
	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            var dbInfo = self._dbInfo;
	
	            dbInfo.db.transaction(function (t) {
	                t.executeSql('SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {
	                    var rows = results.rows;
	                    var length = rows.length;
	
	                    for (var i = 0; i < length; i++) {
	                        var item = rows.item(i);
	                        var result = item.value;
	
	                        // Check to see if this is serialized content
	                        // we need to unpack.
	                        if (result) {
	                            result = dbInfo.serializer.deserialize(result);
	                        }
	
	                        result = iterator(result, item.key, i + 1);
	
	                        // void(0) prevents problems with redefinition
	                        // of `undefined`.
	                        if (result !== void 0) {
	                            resolve(result);
	                            return;
	                        }
	                    }
	
	                    resolve();
	                }, function (t, error) {
	                    reject(error);
	                });
	            });
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	function _setItem(key, value, callback, retriesLeft) {
	    var self = this;
	
	    key = normalizeKey(key);
	
	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            // The localStorage API doesn't return undefined values in an
	            // "expected" way, so undefined is always cast to null in all
	            // drivers. See: https://github.com/mozilla/localForage/pull/42
	            if (value === undefined) {
	                value = null;
	            }
	
	            // Save the original value to pass to the callback.
	            var originalValue = value;
	
	            var dbInfo = self._dbInfo;
	            dbInfo.serializer.serialize(value, function (value, error) {
	                if (error) {
	                    reject(error);
	                } else {
	                    dbInfo.db.transaction(function (t) {
	                        t.executeSql('INSERT OR REPLACE INTO ' + dbInfo.storeName + ' (key, value) VALUES (?, ?)', [key, value], function () {
	                            resolve(originalValue);
	                        }, function (t, error) {
	                            reject(error);
	                        });
	                    }, function (sqlError) {
	                        // The transaction failed; check
	                        // to see if it's a quota error.
	                        if (sqlError.code === sqlError.QUOTA_ERR) {
	                            // We reject the callback outright for now, but
	                            // it's worth trying to re-run the transaction.
	                            // Even if the user accepts the prompt to use
	                            // more storage on Safari, this error will
	                            // be called.
	                            //
	                            // Try to re-run the transaction.
	                            if (retriesLeft > 0) {
	                                resolve(_setItem.apply(self, [key, originalValue, callback, retriesLeft - 1]));
	                                return;
	                            }
	                            reject(sqlError);
	                        }
	                    });
	                }
	            });
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	function setItem$1(key, value, callback) {
	    return _setItem.apply(this, [key, value, callback, 1]);
	}
	
	function removeItem$1(key, callback) {
	    var self = this;
	
	    key = normalizeKey(key);
	
	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            var dbInfo = self._dbInfo;
	            dbInfo.db.transaction(function (t) {
	                t.executeSql('DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {
	                    resolve();
	                }, function (t, error) {
	                    reject(error);
	                });
	            });
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	// Deletes every item in the table.
	// TODO: Find out if this resets the AUTO_INCREMENT number.
	function clear$1(callback) {
	    var self = this;
	
	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            var dbInfo = self._dbInfo;
	            dbInfo.db.transaction(function (t) {
	                t.executeSql('DELETE FROM ' + dbInfo.storeName, [], function () {
	                    resolve();
	                }, function (t, error) {
	                    reject(error);
	                });
	            });
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	// Does a simple `COUNT(key)` to get the number of items stored in
	// localForage.
	function length$1(callback) {
	    var self = this;
	
	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            var dbInfo = self._dbInfo;
	            dbInfo.db.transaction(function (t) {
	                // Ahhh, SQL makes this one soooooo easy.
	                t.executeSql('SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {
	                    var result = results.rows.item(0).c;
	
	                    resolve(result);
	                }, function (t, error) {
	                    reject(error);
	                });
	            });
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	// Return the key located at key index X; essentially gets the key from a
	// `WHERE id = ?`. This is the most efficient way I can think to implement
	// this rarely-used (in my experience) part of the API, but it can seem
	// inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
	// the ID of each key will change every time it's updated. Perhaps a stored
	// procedure for the `setItem()` SQL would solve this problem?
	// TODO: Don't change ID on `setItem()`.
	function key$1(n, callback) {
	    var self = this;
	
	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            var dbInfo = self._dbInfo;
	            dbInfo.db.transaction(function (t) {
	                t.executeSql('SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {
	                    var result = results.rows.length ? results.rows.item(0).key : null;
	                    resolve(result);
	                }, function (t, error) {
	                    reject(error);
	                });
	            });
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	function keys$1(callback) {
	    var self = this;
	
	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            var dbInfo = self._dbInfo;
	            dbInfo.db.transaction(function (t) {
	                t.executeSql('SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {
	                    var keys = [];
	
	                    for (var i = 0; i < results.rows.length; i++) {
	                        keys.push(results.rows.item(i).key);
	                    }
	
	                    resolve(keys);
	                }, function (t, error) {
	                    reject(error);
	                });
	            });
	        })["catch"](reject);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	var webSQLStorage = {
	    _driver: 'webSQLStorage',
	    _initStorage: _initStorage$1,
	    _support: isWebSQLValid(),
	    iterate: iterate$1,
	    getItem: getItem$1,
	    setItem: setItem$1,
	    removeItem: removeItem$1,
	    clear: clear$1,
	    length: length$1,
	    key: key$1,
	    keys: keys$1
	};
	
	function isLocalStorageValid() {
	    try {
	        return typeof localStorage !== 'undefined' && 'setItem' in localStorage && typeof localStorage.setItem === 'function';
	    } catch (e) {
	        return false;
	    }
	}
	
	// Check if localStorage throws when saving an item
	function checkIfLocalStorageThrows() {
	    var localStorageTestKey = '_localforage_support_test';
	
	    try {
	        localStorage.setItem(localStorageTestKey, true);
	        localStorage.removeItem(localStorageTestKey);
	
	        return false;
	    } catch (e) {
	        return true;
	    }
	}
	
	// Check if localStorage is usable and allows to save an item
	// This method checks if localStorage is usable in Safari Private Browsing
	// mode, or in any other case where the available quota for localStorage
	// is 0 and there wasn't any saved items yet.
	function _isLocalStorageUsable() {
	    return !checkIfLocalStorageThrows() || localStorage.length > 0;
	}
	
	// Config the localStorage backend, using options set in the config.
	function _initStorage$2(options) {
	    var self = this;
	    var dbInfo = {};
	    if (options) {
	        for (var i in options) {
	            dbInfo[i] = options[i];
	        }
	    }
	
	    dbInfo.keyPrefix = dbInfo.name + '/';
	
	    if (dbInfo.storeName !== self._defaultConfig.storeName) {
	        dbInfo.keyPrefix += dbInfo.storeName + '/';
	    }
	
	    if (!_isLocalStorageUsable()) {
	        return Promise$1.reject();
	    }
	
	    self._dbInfo = dbInfo;
	    dbInfo.serializer = localforageSerializer;
	
	    return Promise$1.resolve();
	}
	
	// Remove all keys from the datastore, effectively destroying all data in
	// the app's key/value store!
	function clear$2(callback) {
	    var self = this;
	    var promise = self.ready().then(function () {
	        var keyPrefix = self._dbInfo.keyPrefix;
	
	        for (var i = localStorage.length - 1; i >= 0; i--) {
	            var key = localStorage.key(i);
	
	            if (key.indexOf(keyPrefix) === 0) {
	                localStorage.removeItem(key);
	            }
	        }
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	// Retrieve an item from the store. Unlike the original async_storage
	// library in Gaia, we don't modify return values at all. If a key's value
	// is `undefined`, we pass that value to the callback function.
	function getItem$2(key, callback) {
	    var self = this;
	
	    key = normalizeKey(key);
	
	    var promise = self.ready().then(function () {
	        var dbInfo = self._dbInfo;
	        var result = localStorage.getItem(dbInfo.keyPrefix + key);
	
	        // If a result was found, parse it from the serialized
	        // string into a JS object. If result isn't truthy, the key
	        // is likely undefined and we'll pass it straight to the
	        // callback.
	        if (result) {
	            result = dbInfo.serializer.deserialize(result);
	        }
	
	        return result;
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	// Iterate over all items in the store.
	function iterate$2(iterator, callback) {
	    var self = this;
	
	    var promise = self.ready().then(function () {
	        var dbInfo = self._dbInfo;
	        var keyPrefix = dbInfo.keyPrefix;
	        var keyPrefixLength = keyPrefix.length;
	        var length = localStorage.length;
	
	        // We use a dedicated iterator instead of the `i` variable below
	        // so other keys we fetch in localStorage aren't counted in
	        // the `iterationNumber` argument passed to the `iterate()`
	        // callback.
	        //
	        // See: github.com/mozilla/localForage/pull/435#discussion_r38061530
	        var iterationNumber = 1;
	
	        for (var i = 0; i < length; i++) {
	            var key = localStorage.key(i);
	            if (key.indexOf(keyPrefix) !== 0) {
	                continue;
	            }
	            var value = localStorage.getItem(key);
	
	            // If a result was found, parse it from the serialized
	            // string into a JS object. If result isn't truthy, the
	            // key is likely undefined and we'll pass it straight
	            // to the iterator.
	            if (value) {
	                value = dbInfo.serializer.deserialize(value);
	            }
	
	            value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);
	
	            if (value !== void 0) {
	                return value;
	            }
	        }
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	// Same as localStorage's key() method, except takes a callback.
	function key$2(n, callback) {
	    var self = this;
	    var promise = self.ready().then(function () {
	        var dbInfo = self._dbInfo;
	        var result;
	        try {
	            result = localStorage.key(n);
	        } catch (error) {
	            result = null;
	        }
	
	        // Remove the prefix from the key, if a key is found.
	        if (result) {
	            result = result.substring(dbInfo.keyPrefix.length);
	        }
	
	        return result;
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	function keys$2(callback) {
	    var self = this;
	    var promise = self.ready().then(function () {
	        var dbInfo = self._dbInfo;
	        var length = localStorage.length;
	        var keys = [];
	
	        for (var i = 0; i < length; i++) {
	            var itemKey = localStorage.key(i);
	            if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
	                keys.push(itemKey.substring(dbInfo.keyPrefix.length));
	            }
	        }
	
	        return keys;
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	// Supply the number of keys in the datastore to the callback function.
	function length$2(callback) {
	    var self = this;
	    var promise = self.keys().then(function (keys) {
	        return keys.length;
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	// Remove an item from the store, nice and simple.
	function removeItem$2(key, callback) {
	    var self = this;
	
	    key = normalizeKey(key);
	
	    var promise = self.ready().then(function () {
	        var dbInfo = self._dbInfo;
	        localStorage.removeItem(dbInfo.keyPrefix + key);
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	// Set a key's value and run an optional callback once the value is set.
	// Unlike Gaia's implementation, the callback function is passed the value,
	// in case you want to operate on that value only after you're sure it
	// saved, or something like that.
	function setItem$2(key, value, callback) {
	    var self = this;
	
	    key = normalizeKey(key);
	
	    var promise = self.ready().then(function () {
	        // Convert undefined values to null.
	        // https://github.com/mozilla/localForage/pull/42
	        if (value === undefined) {
	            value = null;
	        }
	
	        // Save the original value to pass to the callback.
	        var originalValue = value;
	
	        return new Promise$1(function (resolve, reject) {
	            var dbInfo = self._dbInfo;
	            dbInfo.serializer.serialize(value, function (value, error) {
	                if (error) {
	                    reject(error);
	                } else {
	                    try {
	                        localStorage.setItem(dbInfo.keyPrefix + key, value);
	                        resolve(originalValue);
	                    } catch (e) {
	                        // localStorage capacity exceeded.
	                        // TODO: Make this a specific error/event.
	                        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
	                            reject(e);
	                        }
	                        reject(e);
	                    }
	                }
	            });
	        });
	    });
	
	    executeCallback(promise, callback);
	    return promise;
	}
	
	var localStorageWrapper = {
	    _driver: 'localStorageWrapper',
	    _initStorage: _initStorage$2,
	    _support: isLocalStorageValid(),
	    iterate: iterate$2,
	    getItem: getItem$2,
	    setItem: setItem$2,
	    removeItem: removeItem$2,
	    clear: clear$2,
	    length: length$2,
	    key: key$2,
	    keys: keys$2
	};
	
	var isArray = Array.isArray || function (arg) {
	    return Object.prototype.toString.call(arg) === '[object Array]';
	};
	
	// Drivers are stored here when `defineDriver()` is called.
	// They are shared across all instances of localForage.
	var DefinedDrivers = {};
	
	var DriverSupport = {};
	
	var DefaultDrivers = {
	    INDEXEDDB: asyncStorage,
	    WEBSQL: webSQLStorage,
	    LOCALSTORAGE: localStorageWrapper
	};
	
	var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];
	
	var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'];
	
	var DefaultConfig = {
	    description: '',
	    driver: DefaultDriverOrder.slice(),
	    name: 'localforage',
	    // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
	    // we can use without a prompt.
	    size: 4980736,
	    storeName: 'keyvaluepairs',
	    version: 1.0
	};
	
	function callWhenReady(localForageInstance, libraryMethod) {
	    localForageInstance[libraryMethod] = function () {
	        var _args = arguments;
	        return localForageInstance.ready().then(function () {
	            return localForageInstance[libraryMethod].apply(localForageInstance, _args);
	        });
	    };
	}
	
	function extend() {
	    for (var i = 1; i < arguments.length; i++) {
	        var arg = arguments[i];
	
	        if (arg) {
	            for (var _key in arg) {
	                if (arg.hasOwnProperty(_key)) {
	                    if (isArray(arg[_key])) {
	                        arguments[0][_key] = arg[_key].slice();
	                    } else {
	                        arguments[0][_key] = arg[_key];
	                    }
	                }
	            }
	        }
	    }
	
	    return arguments[0];
	}
	
	var LocalForage = function () {
	    function LocalForage(options) {
	        _classCallCheck(this, LocalForage);
	
	        for (var driverTypeKey in DefaultDrivers) {
	            if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
	                var driver = DefaultDrivers[driverTypeKey];
	                var driverName = driver._driver;
	                this[driverTypeKey] = driverName;
	
	                if (!DefinedDrivers[driverName]) {
	                    // we don't need to wait for the promise,
	                    // since the default drivers can be defined
	                    // in a blocking manner
	                    this.defineDriver(driver);
	                }
	            }
	        }
	
	        this._defaultConfig = extend({}, DefaultConfig);
	        this._config = extend({}, this._defaultConfig, options);
	        this._driverSet = null;
	        this._initDriver = null;
	        this._ready = false;
	        this._dbInfo = null;
	
	        this._wrapLibraryMethodsWithReady();
	        this.setDriver(this._config.driver)["catch"](function () {});
	    }
	
	    // Set any config values for localForage; can be called anytime before
	    // the first API call (e.g. `getItem`, `setItem`).
	    // We loop through options so we don't overwrite existing config
	    // values.
	
	
	    LocalForage.prototype.config = function config(options) {
	        // If the options argument is an object, we use it to set values.
	        // Otherwise, we return either a specified config value or all
	        // config values.
	        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
	            // If localforage is ready and fully initialized, we can't set
	            // any new configuration values. Instead, we return an error.
	            if (this._ready) {
	                return new Error('Can\'t call config() after localforage ' + 'has been used.');
	            }
	
	            for (var i in options) {
	                if (i === 'storeName') {
	                    options[i] = options[i].replace(/\W/g, '_');
	                }
	
	                if (i === 'version' && typeof options[i] !== 'number') {
	                    return new Error('Database version must be a number.');
	                }
	
	                this._config[i] = options[i];
	            }
	
	            // after all config options are set and
	            // the driver option is used, try setting it
	            if ('driver' in options && options.driver) {
	                return this.setDriver(this._config.driver);
	            }
	
	            return true;
	        } else if (typeof options === 'string') {
	            return this._config[options];
	        } else {
	            return this._config;
	        }
	    };
	
	    // Used to define a custom driver, shared across all instances of
	    // localForage.
	
	
	    LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
	        var promise = new Promise$1(function (resolve, reject) {
	            try {
	                var driverName = driverObject._driver;
	                var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver');
	
	                // A driver name should be defined and not overlap with the
	                // library-defined, default drivers.
	                if (!driverObject._driver) {
	                    reject(complianceError);
	                    return;
	                }
	
	                var driverMethods = LibraryMethods.concat('_initStorage');
	                for (var i = 0, len = driverMethods.length; i < len; i++) {
	                    var customDriverMethod = driverMethods[i];
	                    if (!customDriverMethod || !driverObject[customDriverMethod] || typeof driverObject[customDriverMethod] !== 'function') {
	                        reject(complianceError);
	                        return;
	                    }
	                }
	
	                var setDriverSupport = function setDriverSupport(support) {
	                    if (DefinedDrivers[driverName]) {
	                        console.info('Redefining LocalForage driver: ' + driverName);
	                    }
	                    DefinedDrivers[driverName] = driverObject;
	                    DriverSupport[driverName] = support;
	                    // don't use a then, so that we can define
	                    // drivers that have simple _support methods
	                    // in a blocking manner
	                    resolve();
	                };
	
	                if ('_support' in driverObject) {
	                    if (driverObject._support && typeof driverObject._support === 'function') {
	                        driverObject._support().then(setDriverSupport, reject);
	                    } else {
	                        setDriverSupport(!!driverObject._support);
	                    }
	                } else {
	                    setDriverSupport(true);
	                }
	            } catch (e) {
	                reject(e);
	            }
	        });
	
	        executeTwoCallbacks(promise, callback, errorCallback);
	        return promise;
	    };
	
	    LocalForage.prototype.driver = function driver() {
	        return this._driver || null;
	    };
	
	    LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
	        var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error('Driver not found.'));
	
	        executeTwoCallbacks(getDriverPromise, callback, errorCallback);
	        return getDriverPromise;
	    };
	
	    LocalForage.prototype.getSerializer = function getSerializer(callback) {
	        var serializerPromise = Promise$1.resolve(localforageSerializer);
	        executeTwoCallbacks(serializerPromise, callback);
	        return serializerPromise;
	    };
	
	    LocalForage.prototype.ready = function ready(callback) {
	        var self = this;
	
	        var promise = self._driverSet.then(function () {
	            if (self._ready === null) {
	                self._ready = self._initDriver();
	            }
	
	            return self._ready;
	        });
	
	        executeTwoCallbacks(promise, callback, callback);
	        return promise;
	    };
	
	    LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
	        var self = this;
	
	        if (!isArray(drivers)) {
	            drivers = [drivers];
	        }
	
	        var supportedDrivers = this._getSupportedDrivers(drivers);
	
	        function setDriverToConfig() {
	            self._config.driver = self.driver();
	        }
	
	        function extendSelfWithDriver(driver) {
	            self._extend(driver);
	            setDriverToConfig();
	
	            self._ready = self._initStorage(self._config);
	            return self._ready;
	        }
	
	        function initDriver(supportedDrivers) {
	            return function () {
	                var currentDriverIndex = 0;
	
	                function driverPromiseLoop() {
	                    while (currentDriverIndex < supportedDrivers.length) {
	                        var driverName = supportedDrivers[currentDriverIndex];
	                        currentDriverIndex++;
	
	                        self._dbInfo = null;
	                        self._ready = null;
	
	                        return self.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
	                    }
	
	                    setDriverToConfig();
	                    var error = new Error('No available storage method found.');
	                    self._driverSet = Promise$1.reject(error);
	                    return self._driverSet;
	                }
	
	                return driverPromiseLoop();
	            };
	        }
	
	        // There might be a driver initialization in progress
	        // so wait for it to finish in order to avoid a possible
	        // race condition to set _dbInfo
	        var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function () {
	            return Promise$1.resolve();
	        }) : Promise$1.resolve();
	
	        this._driverSet = oldDriverSetDone.then(function () {
	            var driverName = supportedDrivers[0];
	            self._dbInfo = null;
	            self._ready = null;
	
	            return self.getDriver(driverName).then(function (driver) {
	                self._driver = driver._driver;
	                setDriverToConfig();
	                self._wrapLibraryMethodsWithReady();
	                self._initDriver = initDriver(supportedDrivers);
	            });
	        })["catch"](function () {
	            setDriverToConfig();
	            var error = new Error('No available storage method found.');
	            self._driverSet = Promise$1.reject(error);
	            return self._driverSet;
	        });
	
	        executeTwoCallbacks(this._driverSet, callback, errorCallback);
	        return this._driverSet;
	    };
	
	    LocalForage.prototype.supports = function supports(driverName) {
	        return !!DriverSupport[driverName];
	    };
	
	    LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
	        extend(this, libraryMethodsAndProperties);
	    };
	
	    LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
	        var supportedDrivers = [];
	        for (var i = 0, len = drivers.length; i < len; i++) {
	            var driverName = drivers[i];
	            if (this.supports(driverName)) {
	                supportedDrivers.push(driverName);
	            }
	        }
	        return supportedDrivers;
	    };
	
	    LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
	        // Add a stub for each driver API method that delays the call to the
	        // corresponding driver method until localForage is ready. These stubs
	        // will be replaced by the driver methods as soon as the driver is
	        // loaded, so there is no performance impact.
	        for (var i = 0, len = LibraryMethods.length; i < len; i++) {
	            callWhenReady(this, LibraryMethods[i]);
	        }
	    };
	
	    LocalForage.prototype.createInstance = function createInstance(options) {
	        return new LocalForage(options);
	    };
	
	    return LocalForage;
	}();
	
	// The actual localForage object that we expose as a module or via a
	// global. It's extended by pulling in one of our other libraries.
	
	
	var localforage_js = new LocalForage();
	
	module.exports = localforage_js;
	
	},{"3":3}]},{},[4])(4)
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ })
/******/ ])
});
;
//# sourceMappingURL=peerweb.js.map