/* Add elements listener */
window.addEventListener("load", () => {

    // Menubar burgers click listenr
    const burgers: Element[] = Array.prototype.slice.call(
        document.querySelectorAll(".navbar-burger"), 0);
    if (burgers.length > 0) {
        burgers.forEach((element) => {
            element.addEventListener("click", () => {
                const idstr = element.getAttribute("data-target");
                element.classList.toggle("is-active");
                if (!idstr) return;
                const target = document.getElementById(idstr);
                target?.classList.toggle("is-active");
            }, false);
        });
    }

    // Add header hover page class changer
    const colorman = (mode: SystemDarkmodePreference) => {
        let clsname: string = ".auto-dark";
        const elements: Element[] = Array.prototype.slice.call(
            document.querySelectorAll(clsname), 0);
        elements.forEach((element) => {
            if (mode === SystemDarkmodePreference.dark) {
                element?.classList.add("is-dark");
                element?.classList.remove("is-light");
            } else {
                // If mode == null , fallback to light mode
                element?.classList.add("is-light");
                element?.classList.remove("is-dark");
            }
        })
        console.debug(`${clsname} class changed to ${enumModeToStringMode(mode)}`);
    }
    darklistener.add(colorman);

    // Add logo color selector
    const logoman = (mode: SystemDarkmodePreference) => {
        const logo = document.getElementById("logo");
        const darksrc = logo?.getAttribute("data-src-darkmode");
        const lightsrc = logo?.getAttribute("data-src-lightmode");
        if (!logo || !darksrc || !lightsrc)
            return;
        let src = (mode === SystemDarkmodePreference.dark) ? darksrc : lightsrc;
        logo.setAttribute("src", src);
        console.debug(`logo src changed to ${enumModeToStringMode(mode)}src`);
    }
    darklistener.add(logoman);

    // Add player theme handler
    const playerman = (mode: SystemDarkmodePreference) => {
        const shikwasa = document.body.querySelector('div[data-name="shikwasa"]');
        shikwasa?.setAttribute("data-theme", enumModeToStringMode(mode) ? enumModeToStringMode(mode)! : "light");
        console.debug(`shikwasa theme: ${shikwasa?.getAttribute("data-theme")}`);
    };
    darklistener.add(playerman);

    // Listen after all the setups (to get the handler work :p).
    darklistener.listen();
});

/* Darkmode listener */
enum SystemDarkmodePreference {
    dark = 0,
    light = 1
};

const modeMap = {
    dark: SystemDarkmodePreference.dark,
    light: SystemDarkmodePreference.light
};

const invertDarkModeObj: Object = {
    'dark': 'light',
    'light': 'dark'
};

const enumModeToStringMode = (i: SystemDarkmodePreference) => {
    let keysArray = Object.keys(modeMap);
    let result = keysArray.filter(key => isValidKey(key, modeMap) && modeMap[key] === i);
    return result ? result[0] : undefined;
};

class DarkmodeListener {
    private _mode: SystemDarkmodePreference;
    private _handlers: ((mode: SystemDarkmodePreference) => void)[];

    public constructor() {
        let darking = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this._mode = darking ? SystemDarkmodePreference.dark : SystemDarkmodePreference.light;
        this._handlers = [];
    }

    public listen(): void {
        const rootElement = document.documentElement;
        const darkModeStorageKey = 'user-color-scheme';
        const rootElementDarkModeAttributeName = 'data-user-color-scheme';
        const darkModeTogglebuttonElement = document.getElementById('btn-toggle-dark');

        const resetRootDarkModeAttributeAndLS = () => {
            rootElement.removeAttribute(rootElementDarkModeAttributeName);
            removeLS(darkModeStorageKey);
        }

        // Partially taken from https://blog.skk.moe/post/hello-darkmode-my-old-friend, CC BY-NC-SA 4.0
        const applyCustomDarkModeSettings = (mode: any) => {
            // 接受从「开关」处传来的模式，或者从 localStorage 读取
            let LSSetting = getLS(darkModeStorageKey) == 'dark' ? SystemDarkmodePreference.dark : 'light' ? SystemDarkmodePreference.light : null;
            let currentSetting: SystemDarkmodePreference = mode || LSSetting;
            console.debug(`applyCustomDarkModeSettings: ${currentSetting}`);
            if (currentSetting === this._mode) {
                // 当用户自定义的显示模式和 prefers-color-scheme 相同时重置、恢复到自动模式
                resetRootDarkModeAttributeAndLS();
                console.debug('Resetting to auto mode...');
            } else if (currentSetting == SystemDarkmodePreference.dark || currentSetting == SystemDarkmodePreference.light) {
                // 否则设置为用户自定义的显示模式
                rootElement.setAttribute(rootElementDarkModeAttributeName, enumModeToStringMode(currentSetting)!);
                console.debug('Setting prop: "data-user-color-scheme" in HTML...');
            } else {
                // 首次访问或从未使用过开关、localStorage 中没有存储的值，currentSetting 是 null
                // 或者 localStorage 被篡改，currentSetting 不是合法值
                // 默认显示浅色主题
                resetRootDarkModeAttributeAndLS();
                console.debug('Initial setup, setting theme to light as default...')
                currentSetting = SystemDarkmodePreference.light;
            }
            let lightCSS = document.getElementById("bulma-light")!
            let darkCSS = document.getElementById("bulma-dark")!
            if (currentSetting == SystemDarkmodePreference.dark) {
                rootElement.setAttribute(rootElementDarkModeAttributeName, 'dark');
                lightCSS.setAttribute("media", "none");
                darkCSS.setAttribute("media", "all");
                this._handlers.forEach(handler => {
                    handler(SystemDarkmodePreference.dark);
                    console.debug('Invoking dark theme handler...');
                });
                console.debug('Dark theme applied.');
            } else if (currentSetting == SystemDarkmodePreference.light) {
                rootElement.setAttribute(rootElementDarkModeAttributeName, 'light');
                lightCSS.setAttribute("media", "all");
                darkCSS.setAttribute("media", "none");
                this._handlers.forEach(handler => {
                    handler(SystemDarkmodePreference.light);
                    console.debug('Invoking light theme handler...');
                });
                console.debug('Light theme applied.');
            }

        }

        const toggleCustomDarkMode = () => {
            let currentSetting = getLS(darkModeStorageKey);
            if (currentSetting === null) {
                let curMode = enumModeToStringMode(this._mode)!;
                currentSetting = isValidKey(curMode, invertDarkModeObj) ? invertDarkModeObj[curMode] : currentSetting;
            } else if (currentSetting == 'dark' || 'light') {
                // 从 localStorage 中读取模式，并取相反的模式
                currentSetting = isValidKey(currentSetting, invertDarkModeObj) ? invertDarkModeObj[currentSetting] : currentSetting;
            } else {
                // 不知道出了什么幺蛾子，比如 localStorage 被篡改成非法值
                return; // 直接 return;
            }
            // 将相反的模式写入 localStorage
            setLS(darkModeStorageKey, currentSetting);
            return isValidKey(currentSetting!, invertDarkModeObj) ? modeMap[currentSetting!] : null;
        }

        applyCustomDarkModeSettings(null);

        darkModeTogglebuttonElement?.addEventListener('click', () => {
            // 当用户点击「开关」时，获得新的显示模式、写入 localStorage、并在页面上生效
            console.debug('User clicked button. Doing black magic now...');
            applyCustomDarkModeSettings(toggleCustomDarkMode());
        });
    }

    public add(callback: (mode: SystemDarkmodePreference) => void): void {
        callback(this._mode);
        this._handlers.push(callback);
    }

    public mode(): SystemDarkmodePreference {
        return this._mode;
    }
};

var darklistener = new DarkmodeListener();

function setLS(k: string, v: any) {
    try {
        localStorage.setItem(k, v);
    } catch (e) { }
}

function removeLS(k: string) {
    try {
        localStorage.removeItem(k);
    } catch (e) { }
}

function getLS(k: string) {
    try {
        return localStorage.getItem(k);
    } catch (e) {
        return null; // 与 localStorage 中没有找到对应 key 的行为一致
    }
}

// 使用isValidKey判断key是否存在对象类型中
function isValidKey(key: string, obj: object): key is keyof typeof obj {
    return key in obj;
}