export const getShortTitle = (title: string, defaultLength: number = 20) => {
    if (title.length > defaultLength) {
        return `${title.slice(0, defaultLength)} ...`;
    }
    return title;
};
