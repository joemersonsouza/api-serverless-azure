export class CarInput {
    id?: string;
    maker: string;
    model_name: string;
    year: number;
    color: string;
    monthlyPrice: number;
    availableDate: Date;

    constructor(maker: string,
        model_name: string,
        year: number,
        color: string,
        monthlyPrice: number,
        availableDate: Date,) {
            this.maker = maker;
            this.model_name = model_name;
            this.year = year;
            this.color = color;
            this.monthlyPrice = monthlyPrice;
            this.availableDate = availableDate;
        }
}