export default class OrderItem {

    private _id: string;
    private _orderId: string;
    private _name: string;
    private _price: number;
    private _quantity: number
    
    
    constructor(id: string, orderId:string, name: string, price: number, quantity: number) {
        this._id = id;
        this._orderId = orderId;
        this._name = name;
        this._price = price;
        this._quantity = quantity;
    }


    get quantity(): number {
        return this._quantity;
    }

    get price(): number {
        return this._price;
    }

    orderItemTotal(): number {
        return this.price * this._quantity;
    }
    

}