import { CreateCarRepository } from "../../repository/create/create_car";
import { Car } from "../../repository/entities/car";
import { SearchCarRepository } from "../../repository/search/search_car";
import { CarNotFoundException } from "../../shared/car_exception";
import { CarInput } from "../model/car_input";

export interface IChangeCarUseCase {
    execute(input: CarInput, cardId: string): Promise<Car>;
}

export class ChangeCarUseCase implements IChangeCarUseCase {

    constructor(private createCarRepository: CreateCarRepository, private searchCarRepository: SearchCarRepository) {}

    async execute(input: CarInput, cardId: string): Promise<Car> {
        var carDb = await this.searchCarRepository.get(cardId);
        if(carDb) {
            input.id = carDb.id;
            return await this.createCarRepository.save(input);
        }

        throw new CarNotFoundException("Car Not Found")
    }
}