import { Car } from "../../repository/entities/car";
import { ChangeCarUseCase } from "../change/change_car_usecase";
import { CarInput } from "../model/car_input";

describe("Change Car Test Cases", () => {
    const car = new Car( {
        availableDate: new Date(),
        color: "Black",
        maker: "Audi",
        model_name: "A3",
        monthlyPrice: 1.99,
        year: 2020
      });
      
    let useCase: ChangeCarUseCase;
    let MockCreate: jest.Mock;
    let MockSearch: jest.Mock;

    beforeEach(() => {
      MockCreate = jest.fn(() => ({
          save: jest.fn(() => new Car({...car}))
        }));
    });
  
    it("should return changed car", async () => {
        
        // Arrange
        var dbCar = car;
        dbCar.color = "Blue";
        MockSearch = jest.fn(() => ({
            get: jest.fn(() => new Car({...dbCar}))
        }));

        const input: CarInput = {
          availableDate: new Date(),
          color: "Black",
          maker: "Audi",
          model_name: "A3",
          monthlyPrice: 1.99,
          year: 2020
        }

        const createRepository = new MockCreate();
        const searchRepository = new MockSearch();
        useCase = new ChangeCarUseCase(createRepository, searchRepository);
        
        // Action
        const result = await useCase.execute(input, "1239hibfu2873y182dwiu");
    
        // Assertion
        expect(result).not.toBeNull();
        expect(searchRepository.get).toHaveBeenCalled();
        expect(createRepository.save).toHaveBeenCalled();
    });

    it("should return exception", async () => {
        
        // Arrange
        MockSearch = jest.fn(() => ({
            get: jest.fn()
        }));

        const input: CarInput = {
          availableDate: new Date(),
          color: "Black",
          maker: "Audi",
          model_name: "A3",
          monthlyPrice: 1.99,
          year: 2020
        }

        const createRepository = new MockCreate();
        const searchRepository = new MockSearch();
        useCase = new ChangeCarUseCase(createRepository, searchRepository);
        
        // Action
        try {
            await useCase.execute(input, "AnyInvalidId");
        } catch(err) {
            // Assertion
            expect(err.message).toEqual("Car Not Found");
        }

        expect(searchRepository.get).toHaveBeenCalled();
        expect(createRepository.save).not.toHaveBeenCalled();
    });
  
});