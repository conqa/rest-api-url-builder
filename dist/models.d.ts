export interface RouteConfig {
    path: string;
    baseURL?: string;
}
export interface RawRouteMap {
    [name: string]: string | RouteConfig;
}
export interface UrlBuilderOptions {
    baseURL?: string;
    [n: string]: any;
}
