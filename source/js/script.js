"use strict";
/* Add elements listener */
window.addEventListener("load", function () {
    // Menubar burgers click listenr
    var burgers = Array.prototype.slice.call(document.querySelectorAll(".navbar-burger"), 0);
    if (burgers.length > 0) {
        burgers.forEach(function (element) {
            element.addEventListener("click", function () {
                var idstr = element.getAttribute("data-target");
                element.classList.toggle("is-active");
                if (!idstr)
                    return;
                var target = document.getElementById(idstr);
                target === null || target === void 0 ? void 0 : target.classList.toggle("is-active");
            }, false);
        });
    }
    // Add header hover page class changer
    var colorman = function (mode) {
        var clsname = ".auto-dark";
        var elements = Array.prototype.slice.call(document.querySelectorAll(clsname), 0);
        elements.forEach(function (element) {
            if (mode === SystemDarkmodePrefrence.dark) {
                element === null || element === void 0 ? void 0 : element.classList.add("is-dark");
                element === null || element === void 0 ? void 0 : element.classList.remove("is-light");
            }
            else {
                element === null || element === void 0 ? void 0 : element.classList.add("is-light");
                element === null || element === void 0 ? void 0 : element.classList.remove("is-dark");
            }
        });
    };
    darklistener.add(colorman);
    // Add logo color selector
    var logoman = function (mode) {
        var logo = document.getElementById("logo");
        var darksrc = logo === null || logo === void 0 ? void 0 : logo.getAttribute("data-src-darkmode");
        var lightsrc = logo === null || logo === void 0 ? void 0 : logo.getAttribute("data-src-lightmode");
        if (!logo || !darksrc || !lightsrc)
            return;
        var src = (mode === SystemDarkmodePrefrence.dark) ? darksrc : lightsrc;
        logo.setAttribute("src", src);
    };
    darklistener.add(logoman);
});
/* Darkmode listener */
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
        callback(this._mode);
        this._handlers.push(callback);
    };
    DarkmodeListener.prototype.mode = function () {
        return this._mode;
    };
    return DarkmodeListener;
}());
;
var darklistener = new DarkmodeListener();
