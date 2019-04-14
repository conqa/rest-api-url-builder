import UrlParse from "url-parse";

const getPath = (path: string, baseURL?: string) => {
    if (baseURL) {
        const urlParse = new UrlParse(baseURL);
        const { pathname } = urlParse;

        if (pathname !== '') {
            const { length } = pathname;

            if (pathname[length - 1] === '/') {
                return pathname.substring(0, length - 1) + path;
            }

            return pathname + path;
        }
    }

    return path;
};

export default getPath;