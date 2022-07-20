import { Car } from "../entities/car";

export interface SearchCarRepository {
    get(id:string): Promise<Car>;
    getCount(search: string): Promise<number>;
    getAll(search: string,
        limit: number,
        offset: number,
        sort: string): Promise<Car[]>; 
}