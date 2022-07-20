import { Car } from "../../repository/entities/car";
import { SearchCarInput } from "../model/search_car_input";
import { SearchCarUseCase } from "../search/search_car_usecase";

describe("Search Car Test Cases", () => {
    const car = new Car( {
        availableDate: new Date(),
        color: "Black",
        maker: "Audi",
        model_name: "A3",
        monthlyPrice: 1.99,
        year: 2020
      });
      
    let useCase: SearchCarUseCase;
    let MockSearch: jest.Mock;

    beforeEach(() => {
        MockSearch = jest.fn(() => ({
          save: jest.fn(() => [])
        }));
    });
  
    it("should return all cars", async () => {
        
        // Arrange
        MockSearch = jest.fn(() => ({
            getAll: jest.fn(() => [new Car({...car})]),
            getCount: jest.fn(() => [1])
        }));

        const input = new SearchCarInput("Black", 10, 0, "maker")

        const searchRepository = new MockSearch();
        useCase = new SearchCarUseCase(searchRepository);
        
        // Action
        const result = await useCase.execute(input);
    
        // Assertion
        expect(result).not.toBeNull();
        expect(searchRepository.getAll).toHaveBeenCalled();
        expect(searchRepository.getCount).toHaveBeenCalled();
    });

    it("should return error", async () => {
        try
        {
            new SearchCarInput("Black", 10, 0, "nothing")
        } catch(err) {
            expect(err.message).toEqual("Invalid sort field")
        }
        
    });

});