/*********************************************************************
*  #### Twitter Post Fetcher v16.0.2 ####
*  Coded by Jason Mayes 2015. A present to all the developers out there.
*  www.jasonmayes.com
*  Please keep this disclaimer with my code if you use it. Thanks. :-)
*  Got feedback or questions, ask here:
*  http://www.jasonmayes.com/projects/twitterApi/
*  Github: https://github.com/jasonmayes/Twitter-Post-Fetcher
*  Updates will be posted to this site.
*********************************************************************/
(function(E, q) {
    "function" === typeof define && define.amd ? define([], q) : "object" === typeof exports ? module.exports = q() : q()
})(this, function() {
    function E(a) {
        if (null === t) {
            for (var f = a.length, b = 0, k = document.getElementById(F), g = "<ul>"; b < f;) g += "<li>" + a[b] + "</li>", b++;
            k.innerHTML = g + "</ul>"
        } else t(a)
    }

    function q(a) {
        return a.replace(/<b[^>]*>(.*?)<\/b>/gi, function(a, b) {
            return b
        }).replace(/class="(?!(tco-hidden|tco-display|tco-ellipsis))+.*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi, "")
    }

    function G(a) {
        a = a.getElementsByTagName("a");
        for (var f = a.length - 1; 0 <= f; f--) a[f].setAttribute("target", "_blank")
    }

    function l(a, f) {
        for (var b = [], k = new RegExp("(^| )" + f + "( |$)"), g = a.getElementsByTagName("*"), h = 0, d = g.length; h < d; h++) k.test(g[h].className) && b.push(g[h]);
        return b
    }

    function y(a) {
        if (void 0 !== a && 0 <= a.innerHTML.indexOf("data-srcset")) return a = a.innerHTML.match(/data-srcset="([A-z0-9%_\.-]+)/i)[0], decodeURIComponent(a).split('"')[1]
    }
    var F = "",
        f = 20,
        H = !0,
        x = [],
        z = !1,
        A = !0,
        n = !0,
        B = null,
        C = !0,
        D = !0,
        t = null,
        I = !0,
        u = !1,
        v = !0,
        J = !0,
        K = !1,
        m = null,
        L = {
            fetch: function(a) {
                void 0 ===
                    a.maxTweets && (a.maxTweets = 20);
                void 0 === a.enableLinks && (a.enableLinks = !0);
                void 0 === a.showUser && (a.showUser = !0);
                void 0 === a.showTime && (a.showTime = !0);
                void 0 === a.dateFunction && (a.dateFunction = "default");
                void 0 === a.showRetweet && (a.showRetweet = !0);
                void 0 === a.customCallback && (a.customCallback = null);
                void 0 === a.showInteraction && (a.showInteraction = !0);
                void 0 === a.showImages && (a.showImages = !1);
                void 0 === a.linksInNewWindow && (a.linksInNewWindow = !0);
                void 0 === a.showPermalinks && (a.showPermalinks = !0);
                void 0 === a.dataOnly &&
                    (a.dataOnly = !1);
                if (z) x.push(a);
                else {
                    z = !0;
                    F = a.domId;
                    f = a.maxTweets;
                    H = a.enableLinks;
                    n = a.showUser;
                    A = a.showTime;
                    D = a.showRetweet;
                    B = a.dateFunction;
                    t = a.customCallback;
                    I = a.showInteraction;
                    u = a.showImages;
                    v = a.linksInNewWindow;
                    J = a.showPermalinks;
                    K = a.dataOnly;
                    var l = document.getElementsByTagName("head")[0];
                    null !== m && l.removeChild(m);
                    m = document.createElement("script");
                    m.type = "text/javascript";
                    m.src = void 0 !== a.list ? "https://syndication.twitter.com/timeline/list?callback=twitterFetcher.callback&dnt=false&list_slug=" +
                        a.list.listSlug + "&screen_name=" + a.list.screenName + "&suppress_response_codes=true&lang=" + (a.lang || "en") + "&rnd=" + Math.random() : void 0 !== a.profile ? "https://syndication.twitter.com/timeline/profile?callback=twitterFetcher.callback&dnt=false&screen_name=" + a.profile.screenName + "&suppress_response_codes=true&lang=" + (a.lang || "en") + "&rnd=" + Math.random() : void 0 !== a.likes ? "https://syndication.twitter.com/timeline/likes?callback=twitterFetcher.callback&dnt=false&screen_name=" + a.likes.screenName + "&suppress_response_codes=true&lang=" +
                        (a.lang || "en") + "&rnd=" + Math.random() : "https://cdn.syndication.twimg.com/widgets/timelines/" + a.id + "?&lang=" + (a.lang || "en") + "&callback=twitterFetcher.callback&suppress_response_codes=true&rnd=" + Math.random();
                    l.appendChild(m)
                }
            },
            callback: function(a) {
                function m(a) {
                    var b = a.getElementsByTagName("img")[0];
                    b.src = b.getAttribute("data-src-2x");
                    return a
                }
                a.body = a.body.replace(/(<img[^c]*class="Emoji[^>]*>)|(<img[^c]*class="u-block[^>]*>)/g, "");
                u || (a.body = a.body.replace(/(<img[^c]*class="NaturalImage-image[^>]*>|(<img[^c]*class="CroppedImage-image[^>]*>))/g,
                    ""));
                n || (a.body = a.body.replace(/(<img[^c]*class="Avatar"[^>]*>)/g, ""));
                var b = document.createElement("div");
                b.innerHTML = a.body;
                "undefined" === typeof b.getElementsByClassName && (C = !1);
                a = [];
                var k = [],
                    g = [],
                    h = [],
                    d = [],
                    r = [],
                    p = [],
                    e = 0;
                if (C)
                    for (b = b.getElementsByClassName("timeline-Tweet"); e < b.length;) {
                        0 < b[e].getElementsByClassName("timeline-Tweet-retweetCredit").length ? d.push(!0) : d.push(!1);
                        if (!d[e] || d[e] && D) a.push(b[e].getElementsByClassName("timeline-Tweet-text")[0]), r.push(b[e].getAttribute("data-tweet-id")),
                            n && k.push(m(b[e].getElementsByClassName("timeline-Tweet-author")[0])), g.push(b[e].getElementsByClassName("dt-updated")[0]), p.push(b[e].getElementsByClassName("timeline-Tweet-timestamp")[0]), void 0 !== b[e].getElementsByClassName("timeline-Tweet-media")[0] ? h.push(b[e].getElementsByClassName("timeline-Tweet-media")[0]) : h.push(void 0);
                        e++
                    } else
                        for (b = l(b, "timeline-Tweet"); e < b.length;) {
                            0 < l(b[e], "timeline-Tweet-retweetCredit").length ? d.push(!0) : d.push(!1);
                            if (!d[e] || d[e] && D) a.push(l(b[e], "timeline-Tweet-text")[0]),
                                r.push(b[e].getAttribute("data-tweet-id")), n && k.push(m(l(b[e], "timeline-Tweet-author")[0])), g.push(l(b[e], "dt-updated")[0]), p.push(l(b[e], "timeline-Tweet-timestamp")[0]), void 0 !== l(b[e], "timeline-Tweet-media")[0] ? h.push(l(b[e], "timeline-Tweet-media")[0]) : h.push(void 0);
                            e++
                        }
                a.length > f && (a.splice(f, a.length - f), k.splice(f, k.length - f), g.splice(f, g.length - f), d.splice(f, d.length - f), h.splice(f, h.length - f), p.splice(f, p.length - f));
                var b = [],
                    e = a.length,
                    c = 0;
                if (K)
                    for (; c < e;) b.push({
                        tweet: a[c].innerHTML,
                        author: k[c].innerHTML,
                        time: g[c].textContent,
                        image: y(h[c]),
                        rt: d[c],
                        tid: r[c],
                        permalinkURL: void 0 === p[c] ? "" : p[c].href
                    }), c++;
                else
                    for (; c < e;) {
                        if ("string" !== typeof B) {
                            var d = g[c].getAttribute("datetime"),
                                w = new Date(g[c].getAttribute("datetime").replace(/-/g, "/").replace("T", " ").split("+")[0]),
                                d = B(w, d);
                            g[c].setAttribute("aria-label", d);
                            if (a[c].textContent)
                                if (C) g[c].textContent = d;
                                else {
                                    var w = document.createElement("p"),
                                        t = document.createTextNode(d);
                                    w.appendChild(t);
                                    w.setAttribute("aria-label", d);
                                    g[c] = w
                                } else g[c].textContent = d
                        }
                        d =
                            "";
                        H ? (v && (G(a[c]), n && G(k[c])), n && (d += '<div class="user">' + q(k[c].innerHTML) + "</div>"), d += '<span class="tweet">' + q(a[c].innerHTML) + "</span>", A && (d = J ? d + ('</br><span class="timePosted" style="margin-bottom: 10px;"> - <a href="' + p[c] + '">' + g[c].getAttribute("aria-label") + "</a></span>") : d + ('</br><span class="timePosted" style="margin-bottom: 10px;"> -' + g[c].getAttribute("aria-label") + "</span>"))) : (n && (d += '<span class="user">' + k[c].textContent + "</span>"), d += '<span class="tweet">' + a[c].textContent + "</span>", A && (d += '</br><span class="timePosted" style="margin-bottom: 10px;"> -' + g[c].textContent + "</span>"));
                        u ? b.push(d) : !u && a[c].textContent.length &&
                            b.push(d);
                        c++
                    }
                E(b);
                z = !1;
                0 < x.length && (L.fetch(x[0]), x.splice(0, 1))
            }
        };
    return window.twitterFetcher = L
});



/**
 * ### HOW TO CREATE A VALID ID TO USE: ###
 * Go to www.twitter.com and sign in as normal, go to your settings page.
 * Go to "Widgets" on the left hand side.
 * Create a new widget for what you need eg "user time line" or "search" etc.
 * Feel free to check "exclude replies" if you don't want replies in results.
 * Now go back to settings page, and then go back to widgets page and
 * you should see the widget you just created. Click edit.
 * Look at the URL in your web browser, you will see a long number like this:
 * 345735908357048478
 * Use this as your ID below instead!
 */

/**
 * How to use TwitterFetcher's fetch function:
 * 
 * @function fetch(object) Fetches the Twitter content according to
 *     the parameters specified in object.
 * 
 * @param object {Object} An object containing case sensitive key-value pairs
 *     of properties below.
 * 
 * You may specify at minimum the following two required properties:
 * 
 * @param object.id {string} The ID of the Twitter widget you wish
 *     to grab data from (see above for how to generate this number).
 * @param object.domId {string} The ID of the DOM element you want
 *     to write results to.
 *
 * You may also specify one or more of the following optional properties
 *     if you desire:
 *
 * @param object.maxTweets [int] The maximum number of tweets you want
 *     to return. Must be a number between 1 and 20. Default value is 20.
 * @param object.enableLinks [boolean] Set false if you don't want
 *     urls and hashtags to be hyperlinked.
 * @param object.showUser [boolean] Set false if you don't want user
 *     photo / name for tweet to show.
 * @param object.showTime [boolean] Set false if you don't want time of tweet
 *     to show.
 * @param object.dateFunction [function] A function you can specify
 *     to format date/time of tweet however you like. This function takes
 *     a JavaScript date as a parameter and returns a String representation
 *     of that date.
 * @param object.showRetweet [boolean] Set false if you don't want retweets
 *     to show.
 * @param object.customCallback [function] A function you can specify
 *     to call when data are ready. It also passes data to this function
 *     to manipulate them yourself before outputting. If you specify
 *     this parameter you must output data yourself!
 * @param object.showInteraction [boolean] Set false if you don't want links
 *     for reply, retweet and favourite to show.
 * @param object.showImages [boolean] Set true if you want images from tweet
 *     to show.
 * @param object.lang [string] The abbreviation of the language you want to use
 *     for Twitter phrases like "posted on" or "time ago". Default value
 *     is "en" (English).
 */

jQuery(function($) {
    $('.app').terminal({

        twitter: function() {
            
            var random = Math.random().toString(36).substring(7);            

            this.echo(`
            <div class="tweets block" style="margin-bottom: 10px;">
                <span class="oneliner grey" style="margin-top: 10px;">// Latest Tweet --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</span>
                </ul>
            <div id="tweets-`+ random +`"></div>
            </div>
            `)

            var configProfile = {
              "profile": {"screenName": 'samuelgoddard'},
              "domId": 'tweets-'+ random +'',
              "maxTweets": 1,
              "enableLinks": true, 
              "showUser": false,
              "showTime": true,
              "showImages": false,
              "lang": 'en'
            };
            twitterFetcher.fetch(configProfile);
        },

        test: function() { 
            var logoVar="";
            logoVar += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;___&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;___</br>";
            logoVar += "&nbsp;&nbsp;&nbsp;&nbsp;/&#92;__&#92;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&#92;__&#92;</br>";
            logoVar += "&nbsp;&nbsp;&nbsp;/:/&nbsp;_/_&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/:/&nbsp;_/_</br>";
            logoVar += "&nbsp;&nbsp;/:/&nbsp;/&#92;&nbsp;&nbsp;&#92;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/:/&nbsp;/&#92;&nbsp;&nbsp;&#92;</br>";
            logoVar += "&nbsp;/:/ /::&#92;&nbsp;&nbsp;&#92;&nbsp;&nbsp;&nbsp;/:/&nbsp;/::&#92;&nbsp;&nbsp;&#92;</br>";
            logoVar += "/:/_/:/&#92;:&#92;__&#92;&nbsp;/:/__&#92;/&#92;:&#92;__&#92;</br>";
            logoVar += "&#92;:&#92;/:/&nbsp;/:/&nbsp;&nbsp;/&nbsp;&#92;:&#92;&nbsp;&nbsp;&#92;&nbsp;/:/&nbsp;&nbsp;/</br>";
            logoVar += "&nbsp;&#92;::/&nbsp;/:/&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&#92;:&#92;&nbsp;&nbsp;/:/&nbsp;&nbsp;/</br>";
            logoVar += "&nbsp;&nbsp;&#92;/_/:/&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#92;:&#92;/:/&nbsp;&nbsp;/</br>";
            logoVar += "&nbsp;&nbsp;&nbsp;/:/&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#92;::/&nbsp;&nbsp;/</br>";
            logoVar += "&nbsp;&nbsp;&nbsp;&#92;/__/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#92;/__/</br>";

            this.echo(logoVar); 
        },

        meta: function() {
            this.echo(`
            <div class="meta block" style="margin-bottom: 10px;">
                <span class="oneliner grey" style="margin-top: 10px;">// Meta -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</span>
                <a class="u-c--sam-blue" href="#">[ twitter ]</a>
                <a class="u-c--sam-blue" href="#">[ github ]</a>
                <a class="u-c--sam-blue" href="#">[ reddit ]</a>
            </div>
            `)
        },

        projects: function() {
            this.echo(`
                <div class="projects block" style="margin-bottom: 10px;">
            <span class="oneliner grey" style="margin-top: 10px;">// Current Projects --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</span>
            <ul class="projects">
                <div class="grid">
                    <li><a class="u-c--sam-red" href="https://www.centralnottingham.ac.uk/"><em class="u-c--sam-yellow">contributor</em> 01: Central College Nottingham</a></li>
                    <li><a class="u-c--sam-red" href="http://www.eti.co.uk/"><em class="u-c--sam-yellow">contributor</em> 02: The ETI</a></li>
                    <li><a class="u-c--sam-red" href="https://www.henley.ac.uk/"><em class="u-c--sam-yellow">contributor</em> 03: Henley Business School</a></li>
                    <li><a class="u-c--sam-red" href="http://madebykind.com/"><em class="u-c--sam-yellow">contributor</em> 04: MadeByKind</a></li>
                    <li><a class="u-c--sam-red" href="http://www.samgoddard.co.uk"><em class="u-c--sam-yellow">active</em> 05: samgoddard.co.uk</a></li>
                    <li><a class="u-c--sam-red" href="http://plumen.com/"><em class="u-c--sam-yellow">legacy</em> 06: Plumen</a></li>
                </div>
                <div class="grid">
                    <li><a class="u-c--sam-red" href="https://github.com/samuelgoddard/samgoddard-git-api" target="_blank"><em class="u-c--sam-yellow">active</em> <i class="fa fa-github" aria-hidden="true"></i> samgoddard-git-api</a></li>
                    <li><a class="u-c--sam-red" href="https://github.com/samuelgoddard/vue-shopping-list" target="_blank"><em class="u-c--sam-yellow">learning</em> <i class="fa fa-github" aria-hidden="true"></i> vmin-typo</a></li>
                    <li><a class="u-c--sam-red" href="https://github.com/samuelgoddard/vue-shopping-list" target="_blank"><em class="u-c--sam-yellow">learning</em> <i class="fa fa-github" aria-hidden="true"></i> vue-shopping-list</a></li>
                    <li><a class="u-c--sam-red" href="https://github.com/samuelgoddard/mise-en-place" target="_blank"><em class="u-c--sam-yellow">active</em> <i class="fa fa-github" aria-hidden="true"></i> generator-mise-en-place</a></li>
                    <li><a class="u-c--sam-red" href="https://github.com/samuelgoddard/generator-craftinstall" target="_blank"><em class="u-c--sam-yellow">fork</em> <i class="fa fa-github" aria-hidden="true"></i> generator-craftinstall</a></li>
                    <li><a class="u-c--sam-red" href="https://github.com/samuelgoddard/stripped" target="_blank"><em class="u-c--sam-yellow">live</em> <i class="fa fa-github" aria-hidden="true"></i> stripped</a></li>
                    <li><a class="u-c--sam-red" href="https://github.com/samuelgoddard/leaguespin" target="_blank"><em class="u-c--sam-yellow">live</em> <i class="fa fa-github" aria-hidden="true"></i> leaguespin</a></li>
                </div>
            </ul>
        </div>
                `);
        },

        hello: function() {
            this.echo("hey! welcome to my site!" )
        },

        clear: function() {
            this.clear();
        },

        '': function() {
            this.echo()
        }
        }, {  

        greetings: `
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;___&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;___</br>
            &nbsp;&nbsp;&nbsp;&nbsp;/&#92;__&#92;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&#92;__&#92;</br>
            &nbsp;&nbsp;&nbsp;/:/&nbsp;_/_&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/:/&nbsp;_/_</br>
            &nbsp;&nbsp;/:/&nbsp;/&#92;&nbsp;&nbsp;&#92;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/:/&nbsp;/&#92;&nbsp;&nbsp;&#92;</br>
            &nbsp;/:/ /::&#92;&nbsp;&nbsp;&#92;&nbsp;&nbsp;&nbsp;/:/&nbsp;/::&#92;&nbsp;&nbsp;&#92;</br>
            /:/_/:/&#92;:&#92;__&#92;&nbsp;/:/__&#92;/&#92;:&#92;__&#92;</br>
            &#92;:&#92;/:/&nbsp;/:/&nbsp;&nbsp;/&nbsp;&#92;:&#92;&nbsp;&nbsp;&#92;&nbsp;/:/&nbsp;&nbsp;/</br>
            &nbsp;&#92;::/&nbsp;/:/&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&#92;:&#92;&nbsp;&nbsp;/:/&nbsp;&nbsp;/</br>
            &nbsp;&nbsp;&#92;/_/:/&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#92;:&#92;/:/&nbsp;&nbsp;/</br>
            &nbsp;&nbsp;&nbsp;/:/&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#92;::/&nbsp;&nbsp;/</br>
            &nbsp;&nbsp;&nbsp;&#92;/__/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#92;/__/</br></br>

            // website <a class="u-c--sam-red" href="#">v.2.1.0</a></br>
            http://www.github.com/samgoddard</br></br>
            
            Updating samgoddard.co.uk...</br>
            Unpacking objects: 100% (19/19), done.</br>
            From <a class="u-c--sam-red" href="#">github.com/samgoddard/samgoddard</a></br>
            * branch master -> FETCH_HEAD</br>
            * 9f8b2b4..d2725d4 master -> origin/master</br>
            scripts/min/jterm.js | 18 ++++++++++--------</br>
            </br>
            1 file changed, 12 insertions(+), 6 deletions(-)</br>
            Fast-forwarded master to <a class="u-c--sam-red" href="#">d2725d44fce59ea7060b4d712</a></br>
            </br>

            <span class="u-c--sam-blue">Success! Hey Im Sam, Im a nottingham based developer at <a class="u-c--sam-blue" href="#">[ madebykind.com ]</a> - big fan of labradors, parrots &amp; video games. You can find me on <a class="u-c--sam-blue" href="#">[ twitter ]</a> - <a class="u-c--sam-blue" href="#">[ github ]</a> or find out more below.</span></br></br>
            <span class="u-c--sam-yellow">double tap [ tab ] or type [ help ] for available commands</span>`,
        convertLinks: false,
        name: 'samgoddard',
        history: true,
        completion: true,
        prompt: 'samgoddard.co.uk/public_html:~ $ ',
        clear: false,
        raw: true
    });
});
