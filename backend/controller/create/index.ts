import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CreateCarRepositoryImpl } from "../../infrastructure/create/create_car";
import { CreateCarUseCase, ICreateCarUseCase } from "../../usecase/create/create_car_usecase";
import { CarRequest, toInput } from "../model/car_request";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest, useCase: ICreateCarUseCase = null): Promise<void> {
    
    if(!useCase) {
        const createRepository = new CreateCarRepositoryImpl();
        useCase = new CreateCarUseCase(createRepository);
    }
    
    const createRequest: CarRequest = req.body;
    
    try {
        const input = toInput(createRequest);
        const car = await useCase.execute(input);
        context.res = {
            status: 201,
            body: car
        };
    } catch (err) {
        context.res = {
            status: 400,
            body: err.message || 'Something goes wrong.'
        };
    }
};

export default httpTrigger;