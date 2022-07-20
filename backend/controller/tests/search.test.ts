import httpTrigger from "../search/index";
import { Context } from "@azure/functions";
import { Car } from "../../repository/entities/car";
import { ISearchCarUseCase } from "../../usecase/search/search_car_usecase";
import { CarMultiResult } from "../../usecase/model/car_multi";

describe("Search Car Test Cases", () => {
    let context: Context;
    let Mock: jest.Mock<ISearchCarUseCase, Car[]>;

    beforeEach(() => {
      context = ({ log: jest.fn() } as unknown) as Context;
      Mock = jest.fn<ISearchCarUseCase, any>(() => ({
        execute: jest.fn(() => Promise.resolve({cars: [], totalPage: 0})),
      }));
    });
  
    it("should return 200", async () => {
        
        // Arrange
        const carDb = {
            id: "60b63491d30419a7546e8c9b",
            availableDate: new Date(),
            color: "",
            maker: "Audi",
            model_name: "A3",
            monthlyPrice: 1.99,
            year: 2020
          }
        Mock = jest.fn<ISearchCarUseCase, any>(() => ({
            execute: jest.fn(() => Promise.resolve(
              {cars: [
                new Car({ ...carDb }, carDb.id)
              ], 
              totalPage: 0})),
        }));
        const query = {
            search: "Blue"
        }
        
        const request = {
          query: query,
        };

        const useCase = new Mock();
    
        // Action
        await httpTrigger(context, request, useCase);
    
        // Assertion
        expect(context.res).not.toBeNull();
        expect(context.res.status).toEqual(200);
        const response: CarMultiResult = context.res.body;
        expect(response.cars[0]).toEqual(carDb);
        expect(useCase.execute).toHaveBeenCalled();
    });

    it("should return 200 (Empty body)", async () => {
        
      // Arrange
      const request = {
        query: {}
      };

      const useCase = new Mock();
  
      // Action
      await httpTrigger(context, request, useCase);
  
      // Assertion
      expect(context.res).not.toBeNull();
      expect(context.res.status).toEqual(200);
      expect(context.res.body).toEqual([]);
      expect(useCase.execute).toHaveBeenCalled();
  });
  
});