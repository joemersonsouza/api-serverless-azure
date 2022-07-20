import { Car } from "../../repository/entities/car";

export interface CarMultiResult {
    cars: Car[]
    totalPage: number
}