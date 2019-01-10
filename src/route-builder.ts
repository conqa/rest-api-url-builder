import * as UrlParse from "url-parse";

class RouteBuilder {

    name: string;
    url: UrlParse;
    arrayParameterNames: string[] = [];

    constructor (name: string, path: string, baseURL?: string) {
        this.name = name;
        this.url = new UrlParse(path, baseURL, () => ({}));
    }

    setQueryParameter (name: string, value: any) {
        if (Array.isArray(value)) {
            this.removeArrayParameter(name);
            this.arrayParameterNames.push(name);
            value.map((v, i) => this.url.query[`${name}[${i}]`] = v.toString());
        } else {
            this.url.query[name] = value.toString();
        }
        return this;
    }

    setNamedParameter (name: string, value: string|number) {
        const pathname = this.url.pathname.replace(`:${name}`, value.toString());
        this.url.set('pathname', pathname);
        return this;
    }

    get () {
        return decodeURIComponent(this.url.toString()).replace(/(\[\d+])/g, '[]');
    }

    private removeArrayParameter (name: string) {
        const index = this.arrayParameterNames.indexOf(name);
        if (index === -1) {
            return;
        }
        delete this.arrayParameterNames[index];
        const query: { [key: string]: string | undefined } = {};
        for (const key in this.url.query) {
            if (!(/(\[\d+])/g.test(key))) {
                query[key] = this.url.query[key];
            }
        }
        this.url.set('query', query);
    }
}

export default RouteBuilder;
