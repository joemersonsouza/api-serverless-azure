import { Validator } from "../../shared/validator";
import { CarInput } from "../../usecase/model/car_input";

export class CarRequest {
    maker: string;
    model_name: string;
    year: number;
    color: string;
    monthlyPrice: number;
    availableDate: Date;
}

export function toInput(request: CarRequest) : CarInput {
    validateRequest(request);
    return new CarInput(request.maker, request.model_name, request.year, request.color, request.monthlyPrice, request.availableDate);
}

function validateRequest(request: CarRequest) {
    let message = "Invalid value to the field";
    
    if(Validator.isNullOrEmpty(request.maker)) {
        throw Error(`${message} Marker `)
    }
    if(Validator.isNullOrEmpty(request.model_name)) {
        throw Error(`${message} Model Name `)
    }
    if(Validator.isNullOrLessThanZero(request.year)) {
        throw Error(`${message} Year `)
    }
    if(Validator.isNullOrEmpty(request.color)) {
        throw Error(`${message} Color `)
    }
    if(Validator.isNullOrLessThanZero(request.monthlyPrice)) {
        throw Error(`${message} Monthly Price `)
    }
    if(Validator.isInvalidDate(request.availableDate)) {
        throw Error(`${message} Available Date `)
    }
}