/**
 * an urlParser library
 *
 * build by rwson@2016-10-28
 * mail: rw_Song@sina.com
 */

"use strict";

(function(factory) {

    if (typeof define !== "undefined" && typeof define.amd) {
        define([], factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        window.UrlParser = factory();
    }

})(function() {

    //	/:id
    var _urlParamRegx = /(\/\:\w+)/g;

    /**
     * @constructor
     * @param opt configs
     *        @attribute  cfg  string
     *        @attribute  url  string
     */
    function UrlParser(opt) {
        return new UrlParser.fn.init(opt);
    }

    UrlParser.prototype = UrlParser.fn = {

        constructor: UrlParser,

        init: function(opt) {
            var self = this;

            this.cfg = opt.cfg || "";
            this.url = opt.url || "";

            return this;
        },

        parse: function() {
            var res = {
                    pathParam: {},
                    quertString: {}
                },
                pref = "",
                split, splitCfg, arr, _tmp;

            if (_urlParamRegx.test(this.cfg)) {
                pref = this.cfg.split("/:")[0];
            }

            //	path params
            if (pref !== "") {
                splitCfg = this.cfg.replace(pref, "").split("/:");
                split = this.url.replace(pref, "").split("?")[0].split("/");
                if (split.length) {
                    for (var i = 0, len = splitCfg.length; i < len; i++) {
                        if (splitCfg[i].length) {
                            res.pathParam[splitCfg[i]] = split[i] ? decode(split[i]) : "";
                        }
                    }
                }
            }

            //	url query string
            if (this.url.indexOf("?") > -1) {
                arr = this.url.split("?")[1].split("&");
                for(var i = 0, len = arr.length; i < len;i ++) {
                	_tmp = arr[i].split("=");
                	res.quertString[_tmp[0]] = decode(_tmp[1]);
                }
            }

            return res;
        }

    };

    /**
     * decodeURIComponent simply write
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    function decode(str) {
        return decodeURIComponent(str);
    }

    UrlParser.fn.init.prototype = UrlParser.fn;

    return UrlParser;

});
