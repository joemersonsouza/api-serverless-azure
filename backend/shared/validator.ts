export class Validator {
    static isNullOrEmpty(str: string) {
        return (!str || str.trim().length === 0 );
    }

    static isNullOrLessThanZero(value: number) {
        return (!value || value < 0 );
    }

    static isInvalidDate(date) {
        return (!date || !isNaN(date));
    }
}