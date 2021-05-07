// Darkmode Listener
enum SystemDarkmodePrefrence {
    dark = 0,
    light = 1
};

class DarkmodeListener {
    private _mode: SystemDarkmodePrefrence;
    private _handlers: ((mode: SystemDarkmodePrefrence)=>void)[];

    public constructor() {
        let darking = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this._mode = darking ? SystemDarkmodePrefrence.dark : SystemDarkmodePrefrence.light;
        this._handlers = [];
        this._listen();
    }

    private _listen(): void {
        let media = window.matchMedia('(prefers-color-scheme: dark)');
        let callback = (event: MediaQueryListEvent) => {
            let mode = event.matches ? SystemDarkmodePrefrence.dark : SystemDarkmodePrefrence.light;
            this._handlers.forEach(handler => {
                handler(mode);
            });
            this._mode = mode;
        };
        media.addEventListener("change", callback);
    }

    public add(callback: (mode: SystemDarkmodePrefrence)=>void): void {
        this._handlers.push(callback);
    }

    public mode(): SystemDarkmodePrefrence {
        return this._mode;
    }
};
