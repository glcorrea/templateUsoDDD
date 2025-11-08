import Order from "./order"
import OrderItem from "./orderItem";


    describe("Order unit tests", () => {
        it("should throw error when id is empty", () => {
            expect(() => {
                let order = new Order("", "123", []);
            }).toThrowError("ID é obrigatório");
        });

        it("should throw error when customerId is empty", () => {
            expect(() => {
                let order = new Order("123", "", []);
            }).toThrowError("ID do Cliente é obrigatório");
        });

        it("should throw error when item less then 0", () => {
            expect(() => {
                let order = new Order("123", "123", []);
            }).toThrowError("A quantidade de items tem que ser maior que 0");
        });

         it("should calculate total", () => {
            
            const item1 = new OrderItem("I1", "p1", "ITEM 1", 100, 2);
            const item2 = new OrderItem("I2", "p1", "ITEM 2", 200, 2);
            const order = new Order("o1", "123", [item1]);
                
            let total = order.total()
            expect(total).toBe(200);
                
            const order2 = new Order("o2", "123", [item1,item2]);
            total = order2.total();
            expect(total).toBe(600);
           
        });


    })