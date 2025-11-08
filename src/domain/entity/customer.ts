import Address from "./address";

export default class Customer{
    private _id: string;
    private _name: string;
    private _address: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string){
        this._id = id;
        this._name = name;
        this.validate();
    }

    validate(){
        
        if (this._id.length === 0){
            throw new Error("ID é obrigatório");
        }
        if (this._name.length === 0) {
            throw new Error("Nome é obrigatório");
        }
        
    }

    set Address(address: Address){
        this._address = address;
    }

    get id(): string {
        return this._id;
    }
    
    get name(): string{
        return this._name;
    }

    get address(): Address{
        return this._address;
    }
    get rewardPoints(): number{
        return this._rewardPoints;
    }

    changeName(name: string){
        this._name = name;
        this.validate();
    }

    changeAddress(address: Address){
        this._address = address;
    }

    isActive(): boolean {
        return this._active;
    }

    activate(){
        if (this._address === undefined){
            throw new Error("Endereço é mandatório para ativar o cliente")
        }
        this._active = true;
    }

    deactivate(){
        this._active = false;
    }

    addRewardPoints(points: number){
        this._rewardPoints += points;
    }
}