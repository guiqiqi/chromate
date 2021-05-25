const ejs = require("ejs")

hexo.extend.tag.register('authors', function (_args) {
    let page = this;
    if (!(page.podcast && page.podcast.authors))
        return;
    return ejs.render(`
    <ul>
        <% (page.podcast.authors).forEach(function(author) { %>
            <li><%= author %></li>
        <% }); %>
    </ul>
    `, {page: page})
});

hexo.extend.tag.register('references', function (_args) {
    let page = this;
    if (!(page.podcast && page.podcast.references))
        return;
    return ejs.render(`
    <ul>
        <% (page.podcast.references).forEach(function(item) { %>
            <li><a href="<%= item[1] %>" rel="noopener"><%= item[0] %></a></li>
        <% }); %>
    </ul>
    `
    , {page: page});
});

hexo.extend.tag.register('timeline', function (_args) {
    let page = this;
    if (!(page.podcast && page.podcast.chapters))
        return;
    const urler = hexo.extend.helper.get("full_url_for").bind(hexo);
    return ejs.render(`
    <ul>
        <% (page.podcast.chapters).forEach(function(item) { %>
            <%
                const title = item[0];
                const timestamp = item[1];
                const hour = Math.floor(timestamp / 3600);
                const minute = Math.floor((timestamp / 60) % 60);
                const second = Math.floor(timestamp % 60);
                const viewstr = String(hour).padStart(2, '0') + ':' + String(minute).padStart(2, '0') + ':' + String(second).padStart(2, '0');
            %>
            <li class="is-family-monospace">
                <a href="#t=<%= viewstr %>" onclick="eval('player.seek(<%= timestamp %>)')">
                    <%= viewstr %>
                </a><%= title %>
            </li>
        <% }); %>
    </ul>
    `
    , {page: page, urler: urler});
});

hexo.extend.tag.register('feed', function(_args) {
    let page = this;
    if (!(page.feed))
        return;
    return ejs.render(`
    <ul class="has-text-weight-light feeding">
        <% (page.feed).forEach(function(setting) { %>
            <%
                const link = setting[0];
                const favicon = setting[1];
                const title = setting[2];
                let outter = link.startsWith("https://") ? true : false;
            %>
            <li>
                <% if (outter) { %>
                    <a href="<%= link %>" target="_blank" rel="noopener noreferrer">
                <% } else { %>
                    <a href="<%= link %>">
                <% } %>
                    <span class="icon-text">
                        <span class="icon has-text-danger">
                            <i class="<%= favicon %>"></i>
                        </span>
                        <span class="has-text-black-bis"><%= title %></span>
                    </span>
                </a>
            </li>
        <% }); %>
    </ul>
    `, {page: page});
});
