import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { SearchCarRepositoryImpl } from "../../infrastructure/search/search_car";
import { SearchCarInput } from "../../usecase/model/search_car_input";
import { ISearchCarUseCase, SearchCarUseCase } from "../../usecase/search/search_car_usecase";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest, useCase: ISearchCarUseCase = null): Promise<void> {
    
    if(!useCase)
    {
        const repository = new SearchCarRepositoryImpl();
        useCase = new SearchCarUseCase(repository);
    }
    
    try {
        const input = new SearchCarInput(req.query.search as string, 
            +(req.query.limit as string), 
            +(req.query.offset as string),
            req.query.sort as string)
        const cars = await useCase.execute(input);
        
        context.res = {
            status: 200,
            body: cars
        };
    } catch (err) {
        context.res = {
            status: 400,
            body: err.message || 'Something goes wrong.'
        };
    }

};

export default httpTrigger;