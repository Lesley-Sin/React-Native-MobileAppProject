export function prepareWidgetId(id: string): string {
    const idArr = id.split('/');
    const index = idArr.length - 1
    return idArr[index];
};