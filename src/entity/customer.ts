import Address from "./address";

export default class Customer{
    _id: string;
    _name: string;
    _address: Address;
    _active: boolean;

    constructor(id: string, name: string){
        this._id = id;
        this._name = name;
        //this._active = active;
        this.validade();
    }

    validade(){
        if (this._name.length === 0) {
            throw new Error("Nome é obrigatório");
        }
        if (this._id.length === 0){
            throw new Error("ID é obrigatório");
        }
    }

    
    set Address(address: Address){
        this._address = address;
    }


    changeName(name: string){
        this._name = name;
        this.validade();
    }

    activate(){
        if (this._address === undefined){
            throw new Error("Endereço é mandatório para ativar o cliente")
        }
        this._active = true;
    }

    deactive(){
        this._active = false;
    }

}