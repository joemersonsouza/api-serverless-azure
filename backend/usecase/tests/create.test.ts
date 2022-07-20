import { Car } from "../../repository/entities/car";
import { CreateCarUseCase } from "../create/create_car_usecase";
import { CarInput } from "../model/car_input";

describe("Create Car Test Cases", () => {
    const car = new Car( {
        availableDate: new Date(),
        color: "Blue",
        maker: "Audi",
        model_name: "A3",
        monthlyPrice: 1.99,
        year: 2020
      });
      
    let useCase: CreateCarUseCase;
    let Mock: jest.Mock;

    beforeEach(() => {
      Mock = jest.fn(() => ({
          save: jest.fn(() => new Car({...car}))
        }));
    });
  
    it("should return new car", async () => {
        
        // Arrange
        const input: CarInput = {
          availableDate: new Date(),
          color: "Blue",
          maker: "Audi",
          model_name: "A3",
          monthlyPrice: 1.99,
          year: 2020
        }

        const repository = new Mock();
        useCase = new CreateCarUseCase(repository);
        
        // Action
        const result = await useCase.execute(input);
    
        // Assertion
        expect(result).not.toBeNull();
        expect(repository.save).toHaveBeenCalled();
    });
  
});