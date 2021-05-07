"use strict";
// Darkmode Listener
var SystemDarkmodePrefrence;
(function (SystemDarkmodePrefrence) {
    SystemDarkmodePrefrence[SystemDarkmodePrefrence["dark"] = 0] = "dark";
    SystemDarkmodePrefrence[SystemDarkmodePrefrence["light"] = 1] = "light";
})(SystemDarkmodePrefrence || (SystemDarkmodePrefrence = {}));
;
var DarkmodeListener = /** @class */ (function () {
    function DarkmodeListener() {
        var darking = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this._mode = darking ? SystemDarkmodePrefrence.dark : SystemDarkmodePrefrence.light;
        this._handlers = [];
        this._listen();
    }
    DarkmodeListener.prototype._listen = function () {
        var _this = this;
        var media = window.matchMedia('(prefers-color-scheme: dark)');
        var callback = function (event) {
            var mode = event.matches ? SystemDarkmodePrefrence.dark : SystemDarkmodePrefrence.light;
            _this._handlers.forEach(function (handler) {
                handler(mode);
            });
            _this._mode = mode;
        };
        media.addEventListener("change", callback);
    };
    DarkmodeListener.prototype.add = function (callback) {
        this._handlers.push(callback);
    };
    DarkmodeListener.prototype.mode = function () {
        return this._mode;
    };
    return DarkmodeListener;
}());
;
