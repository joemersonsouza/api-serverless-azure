import httpTrigger from "../change/index";
import { Context } from "@azure/functions";
import { IChangeCarUseCase } from "../../usecase/change/change_car_usecase";
import { CarNotFoundException } from "../../shared/car_exception";

describe("Change Car Test Cases", () => {
    let context: Context;
    let Mock = jest.fn<IChangeCarUseCase, any>(() => ({
      execute: jest.fn(),
    }));

    beforeEach(() => {
      context = ({ log: jest.fn() } as unknown) as Context;
    });
  
    it("should return 200", async () => {
        
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
          params: {id: "testID"},
          body: carRequest,
        };

        const useCase = new Mock();
    
        // Action
        await httpTrigger(context, request, useCase);
    
        // Assertion
        expect(context.res).not.toBeNull();
        expect(context.res.status).toEqual(200);
        expect(useCase.execute).toHaveBeenCalled();
    });

    it("should return 400", async () => {
        
      // Arrange
      const carRequest = {
        availableDate: null,
        color: "Blue",
        maker: "Audi",
        model_name: "A3",
        monthlyPrice: 1.99,
        year: 2020
      }

      const request = {
        query: {},
        params: {id: "testID"},
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
  
    it("should return 404", async () => {
        
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
          params: {id: "testID"},
          body: carRequest,
        };
        
        Mock = jest.fn<IChangeCarUseCase, any>(() => ({
            execute: jest.fn(() => {throw new CarNotFoundException("Car Not Found")}),
          }));

        const useCase = new Mock();
    
        // Action
        await httpTrigger(context, request, useCase);
    
        // Assertion
        expect(context.res).not.toBeNull();
        expect(context.res.status).toEqual(404);
        expect(context.res.body).toContain('Car Not Found');
        expect(useCase.execute).toHaveBeenCalled();
      });

});