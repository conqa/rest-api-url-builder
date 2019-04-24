import UrlBuilder from "../src/url-builder";
import { RawRouteMap } from "../src/models";

let routes: RawRouteMap;

describe('correct instance variable setting', () => {

    routes = {
        'route1': 'https://www.example.com/',
        'route2': {
            'path': '/'
        },
        'route3': {
            'path': '/',
            'baseURL': 'https://www.example.com/'
        }
    };

    test('correctly sets routes on instance', () => {
        const urlBuilder = new UrlBuilder(routes);
        expect(urlBuilder.routes).toEqual(routes);
    });

    test('correctly sets global baseURL on instance', () => {
        const baseURL = 'https://www.example.com';
        const urlBuilder = new UrlBuilder(routes, { baseURL });
        expect(urlBuilder.options.baseURL).toEqual(baseURL);
    });
});



describe('correct route building without parameters', () => {

    test('from string', () => {
        routes = {
            'route1': 'https://www.example.com/homepage',
            'route1trailing': 'https://www.example.com/homepage/'
        };
        const urlBuilder = new UrlBuilder(routes);
        expect(urlBuilder.build('route1').get()).toEqual('https://www.example.com/homepage');
        expect(urlBuilder.build('route1trailing').get()).toEqual('https://www.example.com/homepage/');
    });

    test('from string with global baseURL', () => {

        routes = {
            'route1': '/homepage',
            'route1trailing': '/homepage/'
        };

        const urlBuilder = new UrlBuilder(routes, {
            baseURL: 'https://www.example.com'
        });
        expect(urlBuilder.build('route1').get()).toEqual('https://www.example.com/homepage');
        expect(urlBuilder.build('route1trailing').get()).toEqual('https://www.example.com/homepage/');
    });

    test('from routeConfig', () => {
        routes = {
            'route1': {
                path: 'https://www.example.com/homepage'
            },
            'route1trailing': {
                path: 'https://www.example.com/homepage/'
            }
        };
        const urlBuilder = new UrlBuilder(routes);
        expect(urlBuilder.build('route1').get()).toEqual('https://www.example.com/homepage');
        expect(urlBuilder.build('route1trailing').get()).toEqual('https://www.example.com/homepage/');
    });

    test('from routeConfig with local baseURL', () => {
        routes = {
            'route1': {
                path: '/homepage',
                baseURL: 'https://www.example.com'
            },
            'route1trailing': {
                path: '/homepage/',
                baseURL: 'https://www.other.com'
            },
        };
        const urlBuilder = new UrlBuilder(routes);
        expect(urlBuilder.build('route1').get()).toEqual('https://www.example.com/homepage');
        expect(urlBuilder.build('route1trailing').get()).toEqual('https://www.other.com/homepage/');
    });

    test('from routeConfig with global baseURL', () => {
        routes = {
            'route1': {
                path: '/homepage'
            },
            'route1trailing': {
                path: '/homepage/'
            }
        };
        const urlBuilder = new UrlBuilder(routes, {
            baseURL: 'https://www.example.com'
        });
        expect(urlBuilder.build('route1').get()).toEqual('https://www.example.com/homepage');
        expect(urlBuilder.build('route1trailing').get()).toEqual('https://www.example.com/homepage/');
    });

    test('from routeConfig with global baseURL that includes path', () => {
        routes = {
            'route1': {
                path: '/homepage'
            },
            'route1trailing': {
                path: '/homepage/'
            }
        };
        const urlBuilder = new UrlBuilder(routes, {
            baseURL: 'https://www.example.com/path'
        });
        expect(urlBuilder.build('route1').get()).toEqual('https://www.example.com/path/homepage');
        expect(urlBuilder.build('route1trailing').get()).toEqual('https://www.example.com/path/homepage/');
    });

    test('from routeConfig with global baseURL that includes path and port', () => {
        routes = {
            'route1': {
                path: '/homepage'
            },
            'route1trailing': {
                path: '/homepage/'
            }
        };
        const urlBuilder = new UrlBuilder(routes, {
            baseURL: 'https://www.example.com:8080/path'
        });
        expect(urlBuilder.build('route1').get()).toEqual('https://www.example.com:8080/path/homepage');
        expect(urlBuilder.build('route1trailing').get()).toEqual('https://www.example.com:8080/path/homepage/');
    });

    test('from routeConfig with global baseURL that includes path with trailing /', () => {
        routes = {
            'route1': {
                path: '/homepage'
            },
            'route1trailing': {
                path: '/homepage/'
            }
        };
        const urlBuilder = new UrlBuilder(routes, {
            baseURL: 'https://www.example.com/path/'
        });
        expect(urlBuilder.build('route1').get()).toEqual('https://www.example.com/path/homepage');
        expect(urlBuilder.build('route1trailing').get()).toEqual('https://www.example.com/path/homepage/');
    });
});



describe('correct parameters binding', () => {

    test('using single named parameter', () => {
        routes = { 'route1': 'https://www.example.com/homepage/:id' };
        const urlBuilder = new UrlBuilder(routes);
        const url = urlBuilder.build('route1')
            .setNamedParameter('id', 1)
            .get();
        expect(url).toEqual('https://www.example.com/homepage/1')
    });

    test('using multiple named parameters', () => {
        routes = { 'route1': 'https://www.example.com/:name/:id' };
        const urlBuilder = new UrlBuilder(routes);
        const url = urlBuilder.build('route1')
            .setNamedParameter('name', 'example')
            .setNamedParameter('id', 1)
            .get();
        expect(url).toEqual('https://www.example.com/example/1')
    });

    test('using single query parameter', () => {
        routes = { 'route1': 'https://www.example.com/homepage' };
        const urlBuilder = new UrlBuilder(routes);
        const url = urlBuilder.build('route1')
            .setQueryParameter('param', 'example')
            .get();
        expect(url).toEqual('https://www.example.com/homepage?param=example')
    });

    test('using multiple query parameters', () => {
        routes = { 'route1': 'https://www.example.com/homepage' };
        const urlBuilder = new UrlBuilder(routes);
        const url = urlBuilder.build('route1')
            .setQueryParameter('param', 'example')
            .setQueryParameter('param2', 1)
            .get();
        expect(url).toEqual('https://www.example.com/homepage?param=example&param2=1')
    });

    test('using array query parameter', () => {
        routes = { 'route1': 'https://www.example.com/homepage' };
        const urlBuilder = new UrlBuilder(routes);
        const url = urlBuilder.build('route1')
            .setQueryParameter('param', [1, 2])
            .get();
        expect(url).toEqual('https://www.example.com/homepage?param[]=1&param[]=2')
    });

    test('using array query parameter (rewriting)', () => {
        routes = { 'route1': 'https://www.example.com/homepage' };
        const urlBuilder = new UrlBuilder(routes);
        const url = urlBuilder.build('route1')
            .setQueryParameter('param', [1, 2])
            .setQueryParameter('param', [2, 3])
            .get();
        expect(url).toEqual('https://www.example.com/homepage?param[]=2&param[]=3')
    });
});

describe('config', () => {
    test('multiple instances do not share config', () => {
        routes = { 'route1': '/homepage' };
        const urlBuilder1 = new UrlBuilder(routes, { baseURL: 'https://www.example.com' });
        const urlBuilder2 = new UrlBuilder(routes );

        const url1 = urlBuilder1.build('route1');
        const url2 = urlBuilder2.build('route1');

        expect(url1.get()).not.toEqual(url2.get());
        expect(url2.get()).toEqual('http://localhost/homepage');
    });
});
