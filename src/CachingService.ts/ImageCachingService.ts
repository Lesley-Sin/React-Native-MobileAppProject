export class ImageCachingService {
    private static imageCache: Dictionary<JSX.Element> = {};

    public static inCache(key: string): boolean {
        const element = this.imageCache[key];
        return element ? true : false;
    };

    public static getImage(key: string): JSX.Element | JSX.Element[] {
        return this.imageCache[key];
    };

    public static addToCache({ key, value }: { key: string; value: JSX.Element; }) {
        this.imageCache[key] = value;
    };

    private static resetCache() {
        this.imageCache = {};
    };
    
};