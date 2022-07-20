import { CreateCarRepository } from "../../repository/create/create_car";
import { Car } from "../../repository/entities/car";
import { CarInput } from "../model/car_input";

export interface ICreateCarUseCase {
    execute(input: CarInput): Promise<Car>;
}

export class CreateCarUseCase implements ICreateCarUseCase {

    constructor(private createCarRepository: CreateCarRepository) {}

    async execute(input: CarInput): Promise<Car> {
        const newCar = new Car(input);
        return await this.createCarRepository.save(newCar);
    }
}