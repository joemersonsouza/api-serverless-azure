import { Car } from "../../repository/entities/car";
import mongoose = require('mongoose');
import CarSchema, { ICar } from "../model/car";
import { SearchCarRepository } from "../../repository/search/search_car";
import { BaseRepository } from "../base";

export class SearchCarRepositoryImpl extends BaseRepository implements SearchCarRepository {

    private map(data: ICar): Car {         
        delete data._id;
        delete data.__v;
        return new Car({ ...data },data.id);
    }
    
    async get(id: string): Promise<Car> {
        var car = await CarSchema.findById(mongoose.Types.ObjectId(id)).lean() as ICar;
        return car ? this.map(car) : car; 
    }

    _mountQueryToGetAll(search: string) {
        var limitDate = new Date();
        limitDate.setMonth(limitDate.getMonth()+3);

        return {   $or: [
            { color: { $regex: `${search}`,$options: '-i'  } },
            { maker: { $regex: `${search}`, $options: '-i' } }
            ],
            $and : [ { availableDate : { $lt: limitDate  }}] 
        }
    }

    async getAll(search: string,
        limit: number,
        offset: number,
        sort: string): Promise<Car[]> {
                    
            var limitDate = new Date();
            limitDate.setMonth(limitDate.getMonth()+3);

            const cars = await CarSchema
            .find(this._mountQueryToGetAll(search)).lean()
            .skip(offset * limit)
            .limit(limit)
            .sort([[sort, 'asc']]).lean() as ICar[];

            return cars.map(car => this.map(car)); 
    }

    async getCount(search: string): Promise<number> {
        return CarSchema.countDocuments(this._mountQueryToGetAll(search))
           .then((count:number) => {
                return count; 
        });
    }
}