import getPath from "../src/get-path";

describe('getPath with no baseURL', () => {

    test('it returns the path when baseURL not specified', () => {
        const expected = '/path';
        const actual = getPath(expected);

        expect(actual).toEqual(expected);
    });

    test('it returns the path when baseURL is `null`', () => {
        const expected = '/path';
        const actual = getPath(expected, null);

        expect(actual).toEqual(expected);
    });

});

describe('getPath with baseURL', () => {

    test('it returns the path when baseURL is protocol, host, port', () => {
        const expected = '/path';
        const actual = getPath(expected, 'https://example.com:443');

        expect(actual).toEqual(expected);
    });

    test('it returns the path when baseURL is protocol relative', () => {
        const expected = '/path';
        const actual = getPath(expected, '//example.com');

        expect(actual).toEqual(expected);
    });

    test('it returns the path when baseURL includes a path', () => {
        const path = '/path';
        const expected = '/foo/path';
        const actual = getPath(path, 'https://example.com/foo');

        expect(actual).toEqual(expected);
    });

    test('it returns the path when baseURL includes a path with a trailing /', () => {
        const path = '/path';
        const expected = '/foo/path';
        const actual = getPath(path, 'https://example.com/foo/');

        expect(actual).toEqual(expected);
    });

});
