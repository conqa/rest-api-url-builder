# rest-api-url-builder

This plugin is used for building URLs for REST APIs (server-side compatible).
Easy to use. Supports named and query parameters as well as the base url binding.

Size: 6.55 KiB minified, 3.05 KiB gzipped

## Installation

Using [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/en/docs/install):

```bash
npm install rest-api-url-builder
# or
yarn add rest-api-url-builder
```

## Syntax

```typescript
const urlBuilder = new UrlBuilder(routes: { [routeName: string]: string|RouteConfig }, options: UrlBuilderOptions);
```

### Parameters

#### Routes
The `routes` object may contain a `routeName: url` (string: string) or `routeName: RouteConfig` (string: object) pairs.
RouteConfig is an object with following structure:
```typescript
interface RouteConfig {
    path: string;
    baseURL?: string;
}
```


#### Routes
The `options` object may contain one or more [available options](#available-options)

## Usage

#### Routes with absolute URLs
```javascript
import UrlBuilder from 'rest-api-url-builder';

const routes = {
    'homepage': 'https://www.example.com/homepage',
    'about-us': {
        'path': 'https://www.example.com/about-us'
    }
};

const urlBuilder = new UrlBuilder(routes);
const route = urlBuilder.build('homepage').get(); // https://www.example.com/homepage
```

#### Routes with relative URLs & base URL
```javascript
import UrlBuilder from 'rest-api-url-builder';

const options = {
    'baseURL': 'https://www.example.com'
};

const routes = {
    'homepage': '/homepage',
    'about-us': {
        'path': '/about-us'
    }
};

const urlBuilder = new UrlBuilder(routes, options);
const route = urlBuilder.build('homepage').get(); // https://www.example.com/homepage
```

#### Rewriting baseURL for specific URLs
```javascript
import UrlBuilder from 'rest-api-url-builder';

const options = {
    'baseURL': 'https://www.example.com'
};

const routes = {
    'homepage': '/homepage',
    'contact:': '/contact',
    'about-us': {
        'path': '/about-us',
        'baseURL': 'https://www.other.com'
    }
};

const urlBuilder = new UrlBuilder(routes, options);
const homepageURL = urlBuilder.build('homepage').get(); // https://www.example.com/homepage
const contactURL  = urlBuilder.build('contact').get();  // https://www.example.com/contact
const aboutUsURL  = urlBuilder.build('about-us').get(); // https://www.other.com/about-us
```

#### Binding named parameters
```javascript
import UrlBuilder from 'rest-api-url-builder';

const routes = {
    'product': 'https://www.example.com/product/:id'
};

const urlBuilder = new UrlBuilder(routes);
const productURL = urlBuilder.build('product')
    .setNamedParameter('id', 1010)
    .get();
console.log(productURL); // https://www.example.com/product/1010
```

#### Binding query parameters
```javascript
import UrlBuilder from 'rest-api-url-builder';

const routes = {
    'search': 'https://www.example.com/search'
};

const urlBuilder = new UrlBuilder(routes);
const searchURL = urlBuilder.build('search')
    .setQueryParameter('sort', 'price')
    .get();
console.log(searchURL); // https://www.example.com/search?sort=price
```

#### Binding array query parameters
```javascript
import UrlBuilder from 'rest-api-url-builder';

const routes = {
    'search': 'https://www.example.com/search'
};

const urlBuilder = new UrlBuilder(routes);
const searchURL = urlBuilder.build('search')
    .setQueryParameter('filters', ['value1', 'value2'])
    .get();
console.log(searchURL); // https://www.example.com/search?filters[]=value1&filters[]=value2
```

#### Chaining parameters binding
```javascript
import UrlBuilder from 'rest-api-url-builder';

const routes = {
    'search': 'https://www.example.com/search/:category'
};

const urlBuilder = new UrlBuilder(routes);
const searchURL = urlBuilder.build('search')
    .setQueryParameter('filters', ['value1', 'value2'])
    .setQueryParameter('sort', 'price')
    .setNamedParameter('category', 'cars')
    .get();
console.log(searchURL); // https://www.example.com/search/cars?filters[]=value1&filters[]=value2&sort=price
```

## Available UrlBuilder options

```javascript
{
    /**
     * Base url that is going to be prepended to each url
     * parts: protocol (required) + host (required) + port (optional)
     * default: ''
     */
    baseURL: 'https://www.example.com'
}
```




