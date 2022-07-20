import { Car } from "../entities/car";

export interface CreateCarRepository {
    save(car: Car): Promise<Car>; 
}