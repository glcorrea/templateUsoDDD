import OrderItem from "./orderItem";

export default class Order{
    private _id: string;
    private _customerId: string;
    private _items: OrderItem[];
    private _total: number;
    

    constructor(id: string, customerId: string, items: OrderItem[]){
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.total();
        this.validate();
    }

   
    validate(): boolean{
        
        if (this._id.length === 0){
            throw new Error("ID é obrigatório");
    
        }
        if (this._customerId.length === 0){
            throw new Error("ID do Cliente é obrigatório");
    
        }
        if (this._items.length === 0){
            throw new Error("A quantidade de items tem que ser maior que 0");
    
        }
        if (this._items.some(item => item.quantity <=0)){
            throw new Error("A quantidade de items tem que ser maior que 0");
        }
        return true;
    }

    total(): number{
        return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
    }

}