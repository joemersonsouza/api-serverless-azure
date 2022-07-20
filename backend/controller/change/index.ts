import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CreateCarRepositoryImpl } from "../../infrastructure/create/create_car";
import { SearchCarRepositoryImpl } from "../../infrastructure/search/search_car";
import { ChangeCarUseCase, IChangeCarUseCase } from "../../usecase/change/change_car_usecase";
import { CarRequest, toInput } from "../model/car_request";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest, useCase: IChangeCarUseCase = null): Promise<void> {

    if(!useCase) {
        useCase = new ChangeCarUseCase(new CreateCarRepositoryImpl(), new SearchCarRepositoryImpl());
    }

    const createRequest: CarRequest = req.body;
    const carId = req.params["id"].toString();
    
    try {
        const input = toInput(createRequest);
        const car = await useCase.execute(input, carId);
        context.res = {
            status: 200,
            body: car
        };
    } catch (err) {
        var status = err.status || 400;

        context.res = {
            status: status,
            body: err.message || 'Something goes wrong.'
        };
    }
};

export default httpTrigger;