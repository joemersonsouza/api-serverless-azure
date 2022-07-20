import  mongoose = require('mongoose');


export class Car {
    
    public readonly id?: string;
    public maker: string;
    public model_name: string;
    public year: number;
    public color: string;
    public monthlyPrice: number;
    public availableDate: Date;

    constructor(props: Omit<Car,'id'>, id?: string)
    {
        Object.assign(this,props);

        if (!id) {
            this.id = new mongoose.Types.ObjectId().toHexString();
        }
    }
}