export default class Product {

    private _id: string;
    private _name: string;
    private _price: number;
    
    constructor(id: string, name: string, price: number){
        this._id = id;
        this._name = name;
        this.validate();
    }


    get name(): string{
        return this._name;
    }

    get price(): number{
        return this._price;
    }

    changeName(name: string): void{
        this._name = name;
        this.validate();
    }

    changePrice(price: number): void{
        this._price = price;
        this.validate();
    }
    
    validate(){
        if (this._id.length === 0){
            throw new Error("ID é obrigatório");
        }
        if (this._name.length === 0) {
            throw new Error("Nome do produto é obrigatório");
        }
        if (this._price < 0){
            throw new Error("O valor do produto que ser maior que 0");
        }
        return true
    }

}