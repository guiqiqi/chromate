[English Version](https://github.com/guiqiqi/chromate/blob/main/readme.md)

# Chromate 主题

![](https://github.com/guiqiqi/chromate/blob/main/figures/header.png?raw=true)

Chromate 是一款专为 **Podcaster** 打造的 Hexo 主题。

它具有以下特性:

- **简单轻量**: 没有过多的配置项与第三方库引用，让你的站点能够轻松的配置并在主流设备上加载。
- **响应式**: 响应式布局使得 Chromate 在移动端也可以正确美观的显示。
- **对播客的完整支持**: 不需要繁杂的配置项与插件安装，就可以轻松的发布一集播客（下面有详细说明）。
- **黑暗模式支持**: 不管白天黑夜，你的站点都能够随着操作系统的主题色变化。

---

## 使用

![播客效果展示](https://github.com/guiqiqi/chromate/blob/main/figures/card.png?raw=true)

在开始使用之前，请查看示例配置文件 `_config.yaml` 中的注释，并按说明填写。

### 对博客主们：

没什么特殊的，像往常一样生成文章并码字即可：

```bash
hexo new post you-post-name-here
```

如果你想给文章添加头图，在文章配置区添加：

```yaml
thumbnail: 'Thumbnail-Image-Link'
```

只是有一点，在文章配置区 **不要** 使用 `podcast` 字段！

### 对播客主们：

按照说明在文章配置区添加如下字段即可：

```yaml
podcast:
  subtitle: A test Podcast EP  # 你本期 EP 的子标题
  authors: ['Doge-Gui', 'Cool Guy']  # 本期作者
  cover: https://cdn.pixabay.com/photo/2018/03/28/19/21/easter-3270234_1280.jpg  # 网页端播放器上的图片
  duration: 64  # 时间长度
  media:
    url: https://audionautix.com/Music/BackToTheWood.mp3  # 音频文件
    size: 1020453  # 音频文件大小（按照 Byte 计算）
    type: audio/mpeg  # 音频文件类型
  chapters:  # 本期节目章节 - 如果你想自动生成时间线 [可选的]
    - ['First Chapter', 13]  
    - ['Second Chapter', 30]
    - ['Third Chapter', 45]
    - ['Forth Chapter', 60]
  references:  # 本期节目引用信息 - 如果你想自动生成引用信息模块 [可选的]
    - ['Post Thumbnail', 'https://pixabay.com/zh/illustrations/sunrise-ocean-ship-sun-sunset-5863751/']
    - ['Podcast Cover', 'https://pixabay.com/zh/illustrations/easter-easter-bunny-rabbit-ears-3270234/']
    - ['Back To The Woods', 'https://audionautix.com/free-music/country']
```

同样的，**不要** 修改这些字段的名称。

填写完成之后，就可以获得以下功能：

1. **主页的不同引导按钮**

    对于普通的博客文章，在主页会显示 *继续阅读* 按钮，而播客则会显示 *现在收听*。

2. **自动生成网页端播放器**

    对于播客，当你填写完上述必须的配置字段之后，会在网页端自动生成一个播放器（感谢 Shikwasa 项目！）

    如果你填写了 `chapters` 字段的信息，那么播放器就会自带一份随时间高亮的 Timeline :)

3. **文章内自动渲染元信息区块**

    如果你填写了上述的配置信息（包括可选字段），那么你就可以在你的播客文章中添加这些自动渲染的区块：

    - 时间线

        ```
        {% timeline %}
        ```

    - 引用

        ```
        {% references %}
        ```

    - 本期作者信息

        ```
        {% authors %}
        ```

4. **自动生成 RSS 订阅文件**

    RSS 对于一个播客来说是非常重要的，但是手动编写是一件很反人类的事情，于是在 Chromate 主题中内置了生成 RSS 订阅的模块，你只需要在配置文件中打开该功能，并按说明填写配置字段即可。

    **重要：如果你想使用该功能，请在你的 Hexo 项目目录运行这条命令以安装一个依赖：**

    ```bash
    npm install podcast --save
    ```

---

## 鸣谢

主题使用到了如下的第三方库：

- [Bulma CSS Framework](https://bulma.io)
- [Highlight.js](https://highlightjs.org)
- [Bulma Prefers Dark](https://github.com/jloh/bulma-prefers-dark)
- [Shikwasa Audio Player](https://shikwasa.js.org)
- [Podcast generator for Node.js](https://github.com/maxnowack/node-podcast)

在主题的编写过程中，参考了这些主题的代码，特别感谢他们：

- [Seje](https://github.com/eatradish/Seje)
- [Hexo Theme Cards](https://github.com/ChrAlpha/hexo-theme-cards)

