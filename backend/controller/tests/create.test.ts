import httpTrigger from "../create/index";
import { Context } from "@azure/functions";
import { ICreateCarUseCase } from "../../usecase/create/create_car_usecase";

describe("Create Car Test Cases", () => {
    let context: Context;
    const Mock = jest.fn<ICreateCarUseCase, any>(() => ({
      execute: jest.fn(),
    }));

    beforeEach(() => {
      context = ({ log: jest.fn() } as unknown) as Context;
    });
  
    it("should return 201", async () => {
        
        // Arrange
        const carRequest = {
          availableDate: "01/01/2021",
          color: "Blue",
          maker: "Audi",
          model_name: "A3",
          monthlyPrice: 1.99,
          year: 2020
        }

        const request = {
          query: {},
          body: carRequest,
        };

        const useCase = new Mock();
    
        // Action
        await httpTrigger(context, request, useCase);
    
        // Assertion
        expect(context.res).not.toBeNull();
        expect(context.res.status).toEqual(201);
        expect(useCase.execute).toHaveBeenCalled();
    });

    it("should return 400", async () => {
        
      // Arrange
      const carRequest = {
        availableDate: "01/01/2021",
        color: "",
        maker: "Audi",
        model_name: "A3",
        monthlyPrice: 1.99,
        year: 2020
      }

      const request = {
        query: {},
        body: carRequest,
      };

      const useCase = new Mock();
  
      // Action
      await httpTrigger(context, request, useCase);
  
      // Assertion
      expect(context.res).not.toBeNull();
      expect(context.res.status).toEqual(400);
      expect(context.res.body).toContain('Invalid value to the field');
      expect(useCase.execute).not.toHaveBeenCalled();
  });
  
});