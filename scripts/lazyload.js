'use strict';

hexo.extend.filter.register('after_post_render', (data) => {
    if (hexo.theme.config.lazyload !== true) return;
    const loading = "data:image/gif;base64,R0lGODlhAQABAAAAACw=";
    data.content = data.content.replace(/<img(.*?)src="(.*?)"(.*?)>/gi, (str, _, src) => {
        if (/data-srcset/gi.test(str) || /src="data:image(.*?)/gi.test(str))
            return str;
        return str.replace(src, `${src}" class="lazy" data-srcset="${src}" srcset="${loading}`);
    });
});