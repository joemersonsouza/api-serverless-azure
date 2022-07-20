import { Car } from "../../repository/entities/car";
import { SearchCarRepository } from "../../repository/search/search_car";
import { CarMultiResult } from "../model/car_multi";
import { SearchCarInput } from "../model/search_car_input";

export interface ISearchCarUseCase {
    execute(input: SearchCarInput ): Promise<CarMultiResult>;
}

export class SearchCarUseCase implements ISearchCarUseCase {

    constructor(private searchCarRepository: SearchCarRepository) {}

    async execute(input: SearchCarInput ): Promise<CarMultiResult> {
        const cars = await this.searchCarRepository.getAll(input.search, input.limit, input.offset, input.sort);
        const limit = await this.searchCarRepository.getCount(input.search);
        return {
            cars: cars,
            totalPage: limit
        }
    }
}