import Product from "./product";

 describe("Produc unit tests", () => {
        
        it("should throw error when id is empty", () => {
            expect(() => {
                const product = new Product("", "Product 1", 100);
            }).toThrowError("ID é obrigatório");
        });
        
        it("should throw error when name is empty", () => {
            expect(() => {
                const product = new Product("123", "",100);
            }).toThrowError("Nome do produto é obrigatório");
        });

       // it("should throw error when price is less than 0", () => {
        //    expect(() => {
        //        const product = new Product("123", "Product 1", 0);
        //    }).toThrowError("O valor do produto que ser maior que 0");
       // });

        it("should change name", () => {
            expect(() => {
                const product = new Product("123", "Product 1",100);
                product.changeName("Product 2");
                expect(product.name).toBe("Product 2");
            })
        });


        it("should change price", () => {
            expect(() => {
                const product = new Product("123", "Product 1",100);
                product.changePrice(150);
                expect(product.price).toBe(150);
            })
        });


})
