import { CreateCarRepository } from "../../repository/create/create_car";
import { Car } from "../../repository/entities/car";
import mongoose = require('mongoose');
import CarSchema, { ICar } from "../model/car";
import { BaseRepository } from "../base";

export class CreateCarRepositoryImpl extends BaseRepository implements CreateCarRepository {

    private map(data: ICar): Car {         
        delete data._id;
        delete data.__v;
        const newData = new Car({ ...data },data.id); 
        return newData ;
    }

    async save(car: Car): Promise<Car> {
        try {
            const carDb = await CarSchema.findByIdAndUpdate(mongoose.Types.ObjectId(car.id), 
            {...car},
            { new: true, upsert: true }).lean() as ICar;

            return this.map(carDb);

        } catch(error) {
            console.log(error)
            throw error
        }
    }
}