import Address from "./address";
import Customer from "./customer";


    describe("Customer unit tests", () => {
        it("should throw error when id is empty", () => {
            expect(() => {
             let customer = new Customer("", "John");
            }).toThrowError("ID é obrigatório");
        });

        it("should throw error when name is empty", () => {
            expect(() => {
             let customer = new Customer("123", "");
            }).toThrowError("Nome é obrigatório");
        });

        it("should change name", () => {
            // Arrange
            let customer = new Customer("123", "John");

            // Act
            customer.changeName("Jane");
           
            // Assert
            expect(customer.name).toBe("Jane");
        });


        it("Should activate customer", () => {
            // Arrange
            const customer = new Customer("1", "John");
            const address = new Address("Rua 123", 1, "", "São Paulo", "SP", "1234-345")

            // Act
            customer.Address = address
            customer.activate();
           
            // Assert
            expect(customer.isActive()).toBe(true);
        });


        it("Should throw error when address is undefined when you activate a customer", () => {

            expect(() => {
                const customer = new Customer("1", "John");
                customer.activate();
            }).toThrowError("Endereço é mandatório para ativar o cliente");
           
        });


        it("Should deactivate customer", () => {
            // Arrange
            const customer = new Customer("1", "John");
            

            // Act
            customer.deactivate();
           
            // Assert
            expect(customer.isActive()).toBe(false);
        });

        it ("should add reward points", () => {
            const customer = new Customer("1", "Customer 1");
            expect(customer.rewardPoints).toBe(0); 

            customer.addRewardPoints(10);
            expect(customer.rewardPoints).toBe(10);  
            
            customer.addRewardPoints(10);
            expect(customer.rewardPoints).toBe(20);
        })




         it("should get 1 ", () => {
            const result = 1;
            expect(result).toBe(1);
        });
})