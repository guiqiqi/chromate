[中文版本](https://github.com/guiqiqi/chromate/blob/main/readme-zh.md)

# Theme Chromate

![](https://github.com/guiqiqi/chromate/blob/main/figures/header.png?raw=true)

The Chromate theme is a new Hexo theme with **support for Podcasts**.

It has the following feature:
- **Simple and Lightweight**: There are no redundant setting items, no references to a large number of third-party libraries, which ensures that it can be loaded and displayed as soon as possible.
- **Responsive**: The theme is built on the *Bulma* CSS framework, which ensures that it can be displayed normally and beautifully on most devices.
- **Full Support for Podcasts**: Without too much configuration, you can easily publish a Podcast (details below 👇).
- **Dark mode support**: Dark mode browsing on most of browsers/operating systems.

---

## Usage

![Podcast Preview](https://github.com/guiqiqi/chromate/blob/main/figures/card.png?raw=true)

Take a look at the comments in the sample configuration file `_config.yaml` and fill in them for using Chromate.

### For general Bloggers

Nothing special, just write the article as usual:

```bash
hexo new post you-post-name-here
```

For adding a thumbnail to your post, add this to your post file header:

```yaml
thumbnail: 'Thumbnail-Image-Link'
```

Additionally, just **DO NOT** use `podcast` in post configuration fields!

### For Podcasters

Add these fields in your post configuration area to define a Podcast type post:

```yaml
podcast:
  subtitle: A test Podcast EP  # Subtitle of your EP
  authors: ['Doge-Gui', 'Cool Guy']  # Authors
  cover: https://cdn.pixabay.com/photo/2018/03/28/19/21/easter-3270234_1280.jpg  # Cover image will shown in web-audio-player
  duration: 64  # Continuous time
  media:
    url: https://audionautix.com/Music/BackToTheWood.mp3  # Media link
    size: 1020453  # Media size in byte
    type: audio/mpeg  # Media type
  chapters:  # Chapters info for auto generating timeline. [Optional]
    - ['First Chapter', 13]  
    - ['Second Chapter', 30]
    - ['Third Chapter', 45]
    - ['Forth Chapter', 60]
  references:  # References info for auto generating references. [Optional]
    - ['Post Thumbnail', 'https://pixabay.com/zh/illustrations/sunrise-ocean-ship-sun-sunset-5863751/']
    - ['Podcast Cover', 'https://pixabay.com/zh/illustrations/easter-easter-bunny-rabbit-ears-3270234/']
    - ['Back To The Woods', 'https://audionautix.com/free-music/country']
```

Please **DO NOT** modify these fields name.

Then you can get:

1. **Different homepage guide buttons**

    For common types of post, you can see the *Continue Reading* guide button on the homepage; for a Podcast, *Listen Now* will be displayed.

2. **Automatically generated audio player**

    For Podcast post, you only need to fill in the Meta meta information according to the format, and a player will be automatically generated in the article (*Special thanks to Shikwasa!*).

    If you completed `chapters` field, the audio player will also shown with **Chapters List** :)

3. **Rendering of meta-information inner article**

    After you fill in the Meta information, you can use the following tags to call the automatically rendered author information, citation information, and timeline:

    - Timeline

        ```
        {% timeline %}
        ```

    - References

        ```
        {% references %}
        ```

    - Authors

        ```
        {% authors %}
        ```

4. **Automatically generated RSS subscription**

    We know that RSS is important for podcasts, but configuring them manually is a boring thing, so in Chromate, you only need to fill in the configuration file, and the RSS subscription will be automatically generated.

    **Important: If you want to open support for auto generating rss with podcasts, please install a plugin manually under your Hexo project folder:**

    ```bash
    npm install podcast --save
    ```

---

## Thanks

The theme uses the following third-party resources:

- [Bulma CSS Framework](https://bulma.io)
- [Highlight.js](https://highlightjs.org)
- [Bulma Prefers Dark](https://github.com/jloh/bulma-prefers-dark)
- [Shikwasa Audio Player](https://shikwasa.js.org)
- [Podcast generator for Node.js](https://github.com/maxnowack/node-podcast)

During the production of the theme, the source code of the following themes was referenced:

- [Seje](https://github.com/eatradish/Seje)
- [Hexo Theme Cards](https://github.com/ChrAlpha/hexo-theme-cards)

