hexo.extend.generator.register("feed", (locals) => {

    // Load config
    const config = hexo.config;
    const theme = hexo.theme.config;
    const urler = hexo.extend.helper.get("url_for").bind(hexo);
    const fullurl = hexo.extend.helper.get("full_url_for").bind(hexo);
    const hstrip = hexo.extend.helper.get("strip_html").bind(hexo);
    if (!theme.rss || !theme.rss.enable) return;

    let podcast = require("podcast");
    function is_constructor(obj) {
        return !!obj.prototype && !!obj.prototype.constructor.name;
    }
    if (!is_constructor(podcast))
        podcast = podcast.Podcast;

    // Generate Podcast Categories content
    let categories = [];
    Object.keys(theme.rss.config.category).forEach((key) => {
        const category = {
            text: key,
            subcats: []
        };
        const subcats = theme.rss.config.category[key];
        subcats.forEach((subcat) => {
            category.subcats.push({
                text: subcat
            });
        });
        categories.push(category);
    });

    // Render for site config
    const feed = new podcast({
        title: config.title,
        description: config.description,
        copyright: config.title + ' ' + theme.copyright,
        language: config.language.slice(0, 2),
        siteUrl: config.url,
        imageUrl: theme.logo.rss,
        itunesSubtitle: config.subtitle,
        itunesSummary: config.description,
        itunesAuthor: config.author,
        itunesExplicit: theme.rss.config.explicit,
        itunesCategory: categories,
        itunesOwner: {
            name: config.author,
            email: theme.rss.config.email
        }
    });

    // Rendering for podcasts
    locals.posts.sort('date', -1).each(function (post) {
        if (!post.podcast) return;
        let description = post.content.replace(/onclick=".*?"/gi, '')
            .replace(/class=".*?"/gi, '').replace(/href="#.*?"/gi, '')
            .replace(/id=".*?"/gi, '').replace(/rel=".*?"/gi, '')
            .replace(/title=".*?"/gi, '').replace(/\n/g, "")
            .replace(/\s+/g, ' ').trim();

        // Check local media url
        let url = post.podcast.media.url;
        if (!(url.startsWith("http://") || url.startsWith("https://")))
            url = fullurl(post.path, {relative: false}).replace("index.html", '') + url;

        feed.addItem({
            title: post.title,
            description: description,
            url: config.url + urler(post.path),
            guid: config.url + urler(post.path),
            author: post.podcast.authors.join(', '),
            date: post.date,
            enclosure: {
                url: url,
                type: post.podcast.media.type,
                size: post.podcast.media.size
            },
            itunesAuthor: post.podcast.authors.join(', '),
            itunesExplicit: theme.rss.config.explicit,
            itunesSummary: hstrip(post.excerpt),
            itunesSubtitle: post.podcast.subtitle,
            itunesDuration: post.podcast.duration
        });
    });

    return {
        path: theme.rss.path,
        data: feed.buildXml()
    };
});
