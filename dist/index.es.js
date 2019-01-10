import * as UrlParse from 'url-parse';

var RouteBuilder = /** @class */ (function () {
    function RouteBuilder(name, path, baseURL) {
        this.arrayParameterNames = [];
        this.name = name;
        this.url = new UrlParse(path, baseURL, function () { return ({}); });
    }
    RouteBuilder.prototype.setQueryParameter = function (name, value) {
        var _this = this;
        if (Array.isArray(value)) {
            this.removeArrayParameter(name);
            this.arrayParameterNames.push(name);
            value.map(function (v, i) { return _this.url.query[name + "[" + i + "]"] = v.toString(); });
        }
        else {
            this.url.query[name] = value.toString();
        }
        return this;
    };
    RouteBuilder.prototype.setNamedParameter = function (name, value) {
        var pathname = this.url.pathname.replace(":" + name, value.toString());
        this.url.set('pathname', pathname);
        return this;
    };
    RouteBuilder.prototype.get = function () {
        return decodeURIComponent(this.url.toString()).replace(/(\[\d+])/g, '[]');
    };
    RouteBuilder.prototype.removeArrayParameter = function (name) {
        var index = this.arrayParameterNames.indexOf(name);
        if (index === -1) {
            return;
        }
        delete this.arrayParameterNames[index];
        var query = {};
        for (var key in this.url.query) {
            if (!(/(\[\d+])/g.test(key))) {
                query[key] = this.url.query[key];
            }
        }
        this.url.set('query', query);
    };
    return RouteBuilder;
}());

var defaultOptions = {
    baseURL: ''
};
function mergeConfig(options1, options2) {
    for (var optionName in options2) {
        options1[optionName] = options2[optionName];
    }
    return options1;
}
var UrlBuilder = /** @class */ (function () {
    function UrlBuilder(routes, options) {
        if (options === void 0) { options = {}; }
        this.routes = routes;
        this.options = mergeConfig(defaultOptions, options);
    }
    UrlBuilder.prototype.build = function (routeName) {
        if (!this.routes.hasOwnProperty(routeName)) {
            throw new Error("Route " + routeName + " not found");
        }
        var route = this.routes[routeName];
        if (typeof route === 'string') {
            route = { path: route };
        }
        var baseURL = route.baseURL ? route.baseURL : this.options.baseURL;
        return new RouteBuilder(name, route.path, baseURL);
    };
    return UrlBuilder;
}());

export default UrlBuilder;
