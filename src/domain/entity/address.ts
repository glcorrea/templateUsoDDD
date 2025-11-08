export default class Address {
    _street: string;
    _number: number;
    _complement: string;
    _city: string; 
    _state: string; 
    _zipCode: string;

    constructor(street: string, number: number, complement: string, city: string, state: string, zipCode: string){
        this._street = street;
        this._number = number;
        this._complement = complement;
        this._city = city;
        this._state = state;
        this._zipCode = zipCode;

        this.validate();
    }


    get street(): string {
        return this._street;
    }

    get number(): number {
        return this._number;
    }

    get complement(): string {
        return this._complement;
    }
   

    get city(): string {
        return this._city;
    }

    get state(): string {
        return this._state;
    }

     get zipCode(): string {
        return this._zipCode;
    }

    validate(){
        if (this._street.length === 0) {
            throw new Error("Cidade é obrigatório");
        }

        if (this._number === 0) {
            throw new Error("Número é obrigatório");
        }

        if (this._city.length === 0) {
            throw new Error("Cidade é obrigatório");
        }

        if (this._state.length === 0) {
            throw new Error("UF é obrigatório");
        }

        if (this._zipCode.length === 0) {
            throw new Error("Cep é obrigatório");
        }
    }

    toString(){
        return `${this._street}, ${this._number}, ${this._complement}, ${this._city} , ${this._state} , ${this._zipCode}`
    }
}