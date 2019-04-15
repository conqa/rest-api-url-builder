import RouteBuilder from './route-builder';
import { RawRouteMap, UrlBuilderOptions } from './models';
declare class UrlBuilder {
    routes: RawRouteMap;
    options: UrlBuilderOptions;
    constructor(routes: RawRouteMap, options?: UrlBuilderOptions);
    build(routeName: string): RouteBuilder;
}
export default UrlBuilder;
