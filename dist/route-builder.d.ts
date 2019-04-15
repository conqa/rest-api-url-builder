import UrlParse from "url-parse";
declare class RouteBuilder {
    name: string;
    url: UrlParse;
    arrayParameterNames: string[];
    constructor(name: string, path: string, baseURL?: string);
    setQueryParameter(name: string, value: any): this;
    setNamedParameter(name: string, value: string | number): this;
    get(): string;
    private removeArrayParameter;
}
export default RouteBuilder;
