export class WidgetValueValidator {
    private static validationResults: boolean[] = [];

    public static validate(value: any | any[]) {
        if (value === undefined || value === '' || value === []) {
            this.validationResults.push(false)
        } else this.validationResults.push(true)
    };

    public static getValidationResult() {
        const result = this.validationResults.find((el) => el === false)
        this.validationResults = [];
        return result != undefined ? false : true;
    }

}