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
            if (mode === SystemDarkmodePreference.dark) {
                element === null || element === void 0 ? void 0 : element.classList.add("is-dark");
                element === null || element === void 0 ? void 0 : element.classList.remove("is-light");
            }
            else {
                // If mode == null , fallback to light mode
                element === null || element === void 0 ? void 0 : element.classList.add("is-light");
                element === null || element === void 0 ? void 0 : element.classList.remove("is-dark");
            }
        });
        console.debug("".concat(clsname, " class changed to ").concat(enumModeToStringMode(mode) ? enumModeToStringMode(mode) : "light since mode == null"));
    };
    darklistener.add(colorman);
    // Add logo color selector
    var logoman = function (mode) {
        var logo = document.getElementById("logo");
        var darksrc = logo === null || logo === void 0 ? void 0 : logo.getAttribute("data-src-darkmode");
        var lightsrc = logo === null || logo === void 0 ? void 0 : logo.getAttribute("data-src-lightmode");
        if (!logo || !darksrc || !lightsrc)
            return;
        var src = (mode === SystemDarkmodePreference.dark) ? darksrc : lightsrc;
        logo.setAttribute("src", src);
        console.debug("logo src changed to ".concat(enumModeToStringMode(mode) ? enumModeToStringMode(mode) : "light since mode == null"));
    };
    darklistener.add(logoman);
    // Add player theme handler
    var playerman = function (mode) {
        var shikwasa = document.body.querySelector('div[data-name="shikwasa"]');
        shikwasa === null || shikwasa === void 0 ? void 0 : shikwasa.setAttribute("data-theme", enumModeToStringMode(mode) ? enumModeToStringMode(mode) : "light");
        console.debug("shikwasa theme: ".concat(shikwasa === null || shikwasa === void 0 ? void 0 : shikwasa.getAttribute("data-theme")));
    };
    darklistener.add(playerman);
    // Listen after all the setups (to get the handler work :p).
    darklistener.listen();
});
/* Darkmode listener */
var SystemDarkmodePreference;
(function (SystemDarkmodePreference) {
    SystemDarkmodePreference[SystemDarkmodePreference["dark"] = 0] = "dark";
    SystemDarkmodePreference[SystemDarkmodePreference["light"] = 1] = "light";
})(SystemDarkmodePreference || (SystemDarkmodePreference = {}));
;
var modeMap = {
    dark: SystemDarkmodePreference.dark,
    light: SystemDarkmodePreference.light
};
var invertDarkModeObj = {
    'dark': 'light',
    'light': 'dark'
};
var enumModeToStringMode = function (i) {
    var keysArray = Object.keys(modeMap);
    var result = keysArray.filter(function (key) { return isValidKey(key, modeMap) && modeMap[key] === i; });
    return result ? result[0] : undefined;
};
var DarkmodeListener = /** @class */ (function () {
    function DarkmodeListener() {
        var darking = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this._mode = darking ? SystemDarkmodePreference.dark : null;
        this._handlers = [];
    }
    DarkmodeListener.prototype.listen = function () {
        var _this = this;
        var media = window.matchMedia('(prefers-color-scheme: dark)');
        var callback = function (event) {
            var mode = event.matches ? SystemDarkmodePreference.dark : null;
            applyCustomDarkModeSettings(mode);
            setLS(darkModeStorageKey, enumModeToStringMode(mode));
            _this._mode = mode;
        };
        media.addEventListener("change", callback);
        var rootElement = document.documentElement;
        var darkModeStorageKey = 'user-color-scheme';
        var rootElementDarkModeAttributeName = 'data-user-color-scheme';
        var darkModeTogglebuttonElement = document.getElementById('btn-toggle-dark');
        var resetRootDarkModeAttributeAndLS = function () {
            rootElement.removeAttribute(rootElementDarkModeAttributeName);
            removeLS(darkModeStorageKey);
        };
        // Partially taken from https://blog.skk.moe/post/hello-darkmode-my-old-friend, CC BY-NC-SA 4.0
        var applyCustomDarkModeSettings = function (mode) {
            // 接受从「开关」处传来的模式，或者从 localStorage 读取
            var LSSetting = getLS(darkModeStorageKey) == 'dark' ? SystemDarkmodePreference.dark : getLS(darkModeStorageKey) == 'light' ? SystemDarkmodePreference.light : null;
            console.debug("Got LSSetting: ".concat(LSSetting, "; mode: ").concat(mode));
            // 如果传入 mode != null (浏览器设置了prefers-color-scheme: dark)且 LocalStorage为空，则使用传入模式
            var currentSetting;
            if (mode != null && LSSetting == null) {
                currentSetting = mode;
            }
            else {
                // 否则，使用 localStorage 中的设置（可能为 null！）
                currentSetting = LSSetting;
            }
            console.debug("applyCustomDarkModeSettings: ".concat(currentSetting));
            var prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? SystemDarkmodePreference.dark : null;
            if (currentSetting == prefersColorScheme && currentSetting != null) {
                // 当用户自定义的显示模式和 prefers-color-scheme 相同时重置、恢复到自动模式
                resetRootDarkModeAttributeAndLS();
                console.debug('Resetting to auto mode...');
            }
            else if (currentSetting == SystemDarkmodePreference.dark || currentSetting == SystemDarkmodePreference.light) {
                // 否则设置为用户自定义的显示模式或传入的模式
                rootElement.setAttribute(rootElementDarkModeAttributeName, enumModeToStringMode(currentSetting));
                console.debug('Setting prop: "data-user-color-scheme" in HTML...');
            }
            else {
                // 首次访问或从未使用过开关、localStorage 中没有存储的值，currentSetting 是 null
                // 或者 localStorage 被篡改，currentSetting 不是合法值
                // 默认显示浅色主题
                resetRootDarkModeAttributeAndLS();
                console.debug('Initial setup, setting theme to light as default...');
                currentSetting = SystemDarkmodePreference.light;
            }
            var lightCSS = document.getElementById("bulma-light");
            var darkCSS = document.getElementById("bulma-dark");
            if (currentSetting == SystemDarkmodePreference.dark) {
                rootElement.setAttribute(rootElementDarkModeAttributeName, 'dark');
                lightCSS.setAttribute("media", "none");
                darkCSS.setAttribute("media", "all");
                _this._handlers.forEach(function (handler) {
                    handler(SystemDarkmodePreference.dark);
                    console.debug('Invoking dark theme handler...');
                });
                console.debug('Dark theme applied.');
            }
            else if (currentSetting == SystemDarkmodePreference.light) {
                rootElement.setAttribute(rootElementDarkModeAttributeName, 'light');
                lightCSS.setAttribute("media", "all");
                darkCSS.setAttribute("media", "none");
                _this._handlers.forEach(function (handler) {
                    handler(SystemDarkmodePreference.light);
                    console.debug('Invoking light theme handler...');
                });
                console.debug('Light theme applied.');
            }
            // 更新 this._mode
            _this._mode = currentSetting;
        };
        var toggleCustomDarkMode = function () {
            var currentSetting = getLS(darkModeStorageKey);
            if (currentSetting === null) {
                // localStorage 啥都没有，从this._mode获取
                var curMode = enumModeToStringMode(_this._mode);
                currentSetting = isValidKey(curMode, invertDarkModeObj) ? invertDarkModeObj[curMode] : currentSetting;
            }
            else if (currentSetting == 'dark' || 'light') {
                // 从 localStorage 中读取模式，并取相反的模式
                currentSetting = isValidKey(currentSetting, invertDarkModeObj) ? invertDarkModeObj[currentSetting] : currentSetting;
            }
            else {
                // 不知道出了什么幺蛾子，比如 localStorage 被篡改成非法值
                return; // 直接 return;
            }
            // 将相反的模式写入 localStorage
            setLS(darkModeStorageKey, currentSetting);
            // 更新 DarkmodeListener._mode
            _this._mode = isValidKey(currentSetting, modeMap) ? modeMap[currentSetting] : _this._mode;
        };
        applyCustomDarkModeSettings(this._mode);
        darkModeTogglebuttonElement === null || darkModeTogglebuttonElement === void 0 ? void 0 : darkModeTogglebuttonElement.addEventListener('click', function () {
            // 当用户点击「开关」时，获得新的显示模式、写入 localStorage、并在页面上生效
            console.debug('User clicked button. Doing black magic now...');
            toggleCustomDarkMode();
            applyCustomDarkModeSettings(_this._mode);
        });
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
function setLS(k, v) {
    try {
        localStorage.setItem(k, v);
    }
    catch (e) { }
}
function removeLS(k) {
    try {
        localStorage.removeItem(k);
    }
    catch (e) { }
}
function getLS(k) {
    try {
        return localStorage.getItem(k);
    }
    catch (e) {
        return null; // 与 localStorage 中没有找到对应 key 的行为一致
    }
}
// 使用isValidKey判断key是否存在对象类型中
function isValidKey(key, obj) {
    return key in obj;
}
