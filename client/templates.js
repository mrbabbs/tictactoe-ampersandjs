(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        if (typeof root === 'undefined' || root !== Object(root)) {
            throw new Error('templatizer: window does not exist or is not an object');
        }
        root.templatizer = factory();
    }
}(this, function () {
    var jade=function(){function n(n){return null!=n&&""!==n}function t(e){return(Array.isArray(e)?e.map(t):e&&"object"==typeof e?Object.keys(e).filter(function(n){return e[n]}):[e]).filter(n).join(" ")}function e(n){return i[n]||n}function r(n){var t=String(n).replace(o,e);return t===""+n?n:t}var a={};a.merge=function s(t,e){if(1===arguments.length){for(var r=t[0],a=1;a<t.length;a++)r=s(r,t[a]);return r}var i=t["class"],o=e["class"];(i||o)&&(i=i||[],o=o||[],Array.isArray(i)||(i=[i]),Array.isArray(o)||(o=[o]),t["class"]=i.concat(o).filter(n));for(var f in e)"class"!=f&&(t[f]=e[f]);return t},a.joinClasses=t,a.cls=function(n,e){for(var r=[],i=0;i<n.length;i++)e&&e[i]?r.push(a.escape(t([n[i]]))):r.push(t(n[i]));var o=t(r);return o.length?' class="'+o+'"':""},a.style=function(n){return n&&"object"==typeof n?Object.keys(n).map(function(t){return t+":"+n[t]}).join(";"):n},a.attr=function(n,t,e,r){return"style"===n&&(t=a.style(t)),"boolean"==typeof t||null==t?t?" "+(r?n:n+'="'+n+'"'):"":0==n.indexOf("data")&&"string"!=typeof t?(-1!==JSON.stringify(t).indexOf("&")&&console.warn("Since Jade 2.0.0, ampersands (`&`) in data attributes will be escaped to `&amp;`"),t&&"function"==typeof t.toISOString&&console.warn("Jade will eliminate the double quotes around dates in ISO form after 2.0.0")," "+n+"='"+JSON.stringify(t).replace(/'/g,"&apos;")+"'"):e?(t&&"function"==typeof t.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+n+'="'+a.escape(t)+'"'):(t&&"function"==typeof t.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+n+'="'+t+'"')},a.attrs=function(n,e){var r=[],i=Object.keys(n);if(i.length)for(var o=0;o<i.length;++o){var s=i[o],f=n[s];"class"==s?(f=t(f))&&r.push(" "+s+'="'+f+'"'):r.push(a.attr(s,f,!1,e))}return r.join("")};var i={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"},o=/[&<>"]/g;return a.escape=r,a.rethrow=function f(n,t,e,r){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&t||r))throw n.message+=" on line "+e,n;try{r=r||require("fs").readFileSync(t,"utf8")}catch(a){f(n,null,e)}var i=3,o=r.split("\n"),s=Math.max(e-i,0),l=Math.min(o.length,e+i),i=o.slice(s,l).map(function(n,t){var r=t+s+1;return(r==e?"  > ":"    ")+r+"| "+n}).join("\n");throw n.path=t,n.message=(t||"Jade")+":"+e+"\n"+i+"\n\n"+n.message,n},a.DebugItem=function(n,t){this.lineno=n,this.filename=t},a}(); 

    var templatizer = {};
    templatizer["forms"] = {};
    templatizer["pages"] = {};

    // body.jade compiled template
    templatizer["body"] = function tmpl_body() {
        return '<body class="text-center"><div class="container"><div class="row"><div class="col-xs-12"><h1 class="text-center logo"> <a href="/">TicTacToe</a></h1></div></div><div class="row"><div class="col-xs-12 container"><main data-hook="page-container"></main></div></div></div><!--  .container\n  main(data-hook="page-container")\n  footer.footer-main\n    nav.nav-footer.cf\n      //- Three columns of links\n      div\n        a.nav-item.external(href="http://ampersandjs.com/learn") Learn\n        a.nav-item.external(href="http://ampersandjs.com/docs") Docs\n        a.nav-item.external(href="http://tools.ampersandjs.com") Modules\n      div\n        a.nav-item.external(href="https://gitter.im/AmpersandJS/AmpersandJS") Chatroom\n        a.nav-item.external(href="https://trello.com/b/UxylNzHr/ampersand-js-roadmap") Roadmap\n        a.nav-item.external(href="http://ampersandjs.com/contribute") Contribute\n      div\n        a.nav-item.external(href="http://ampersandjs.com/security") Security\n        a.nav-item.external(href="https://github.com/ampersandjs") Github\n        a.nav-item.external(href="https://twitter.com/ampersandjs") Twitter\n    p Sponsored by \n      a(href="https://andyet.com") &amp;yet \n      br\n      | with the help of our \n      a(href="http://ampersandjs.com/contribute") contributors\n    a.logo.logo-ampersand-pink(href="http://ampersandjs.com") &amp;--></body>';
    };

    // forms/input-view.jade compiled template
    templatizer["forms"]["input-view"] = function tmpl_forms_input_view() {
        return '<div class="form-group"><label data-hook="label" class="control-label"></label><input class="form-control"/><div data-hook="message-container"><span data-hook="message-text" class="control-label"></span></div></div>';
    };

    // head.jade compiled template
    templatizer["head"] = function tmpl_head() {
        return '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"/><meta name="apple-mobile-web-app-capable" content="yes"/>';
    };

    // pages/game.jade compiled template
    templatizer["pages"]["game"] = function tmpl_pages_game(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(undefined) {
            buf.push('<section id="gamePage" class="page"><section id="game"><div class="row"><div class="col-xs-12"><h3>Game</h3></div></div><div class="row players"><div class="col-xs-5 username"><h4 data-hook="player0">Player 1</h4></div><div class="col-xs-2"><h4>vs</h4></div><div class="col-xs-5 username"><h4 data-hook="player1">Player 2</h4></div></div><div class="board">');
            (function() {
                var $obj = [ 0, 1, 2 ];
                if ("number" == typeof $obj.length) {
                    for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                        var row = $obj[$index];
                        buf.push('<div class="row">');
                        (function() {
                            var $obj = [ 0, 1, 2 ];
                            if ("number" == typeof $obj.length) {
                                for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                                    var col = $obj[$index];
                                    var classes = "col-xs-4 tile-" + row + "-" + col + " tile";
                                    buf.push("<div" + jade.attr("data-row-index", row, true, false) + jade.attr("data-col-index", col, true, false) + ' data-marked-by=""' + jade.cls([ classes ], [ true ]) + ">&nbsp;</div>");
                                }
                            } else {
                                var $l = 0;
                                for (var $index in $obj) {
                                    $l++;
                                    var col = $obj[$index];
                                    var classes = "col-xs-4 tile-" + row + "-" + col + " tile";
                                    buf.push("<div" + jade.attr("data-row-index", row, true, false) + jade.attr("data-col-index", col, true, false) + ' data-marked-by=""' + jade.cls([ classes ], [ true ]) + ">&nbsp;</div>");
                                }
                            }
                        }).call(this);
                        buf.push("</div>");
                    }
                } else {
                    var $l = 0;
                    for (var $index in $obj) {
                        $l++;
                        var row = $obj[$index];
                        buf.push('<div class="row">');
                        (function() {
                            var $obj = [ 0, 1, 2 ];
                            if ("number" == typeof $obj.length) {
                                for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                                    var col = $obj[$index];
                                    var classes = "col-xs-4 tile-" + row + "-" + col + " tile";
                                    buf.push("<div" + jade.attr("data-row-index", row, true, false) + jade.attr("data-col-index", col, true, false) + ' data-marked-by=""' + jade.cls([ classes ], [ true ]) + ">&nbsp;</div>");
                                }
                            } else {
                                var $l = 0;
                                for (var $index in $obj) {
                                    $l++;
                                    var col = $obj[$index];
                                    var classes = "col-xs-4 tile-" + row + "-" + col + " tile";
                                    buf.push("<div" + jade.attr("data-row-index", row, true, false) + jade.attr("data-col-index", col, true, false) + ' data-marked-by=""' + jade.cls([ classes ], [ true ]) + ">&nbsp;</div>");
                                }
                            }
                        }).call(this);
                        buf.push("</div>");
                    }
                }
            }).call(this);
            buf.push('</div></section><section id="leaderboard"><div class="row"><div class="col-xs-12"><h3 id="draw">Draw</h3><h3 id="winner">Winner:<span></span></h3></div></div><div id="header" class="row"><div class="col-xs-3">Player</div><div class="col-xs-3">Wins</div><div class="col-xs-3">Draws</div><div class="col-xs-3">Losses</div></div><div id="player0" class="row"><div class="col-xs-3 username"></div><div class="col-xs-3 wins"></div><div class="col-xs-3 draws"></div><div class="col-xs-3 losses"></div></div><div id="player1" class="row"><div class="col-xs-3 username"></div><div class="col-xs-3 wins"></div><div class="col-xs-3 draws"></div><div class="col-xs-3 losses"></div></div><div class="row"><div class="col-xs-12"><button id="newGame" class="btn btn-primary">New Game</button></div></div></section></section>');
        }).call(this, "undefined" in locals_for_with ? locals_for_with.undefined : typeof undefined !== "undefined" ? undefined : undefined);
        return buf.join("");
    };

    // pages/new-game.jade compiled template
    templatizer["pages"]["new-game"] = function tmpl_pages_new_game() {
        return '<section id="newGame" class="page"><div class="row"><div class="col-xs-12"><h3>New Game</h3></div></div><form data-hook="players-form"><div class="row"><div class="col-xs-12"><fieldset data-hook="field-container"></fieldset></div></div><div class="row"><div class="col-xs-12"><div role="alert" class="alert alert-danger">The usernames cannot be the same</div></div></div><div class="row"><div class="col-xs-12"><div class="buttons-group"><button type="submit" class="btn btn-primary">Start</button><button type="reset" class="btn btn-primary">Cancel</button></div></div></div></form></section>';
    };

    return templatizer;
}));
