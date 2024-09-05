import Address from "./address";

export default class Customer {
    _id: string;
    _name: string = "";
    _address!: Address;
    _active: boolean = false;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    get id(): string {
        return this._id
    }

    get name(): string {
        return this._name
    }

    set address(address: Address) {
        this._address = address
    }

    validate() {
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }

        if (this.id.length === 0) {
            throw new Error("Id is required");
        }
    }

    changeName(name: string) {  //Motivo de nagócio para alterar uma propriedade
        this._name = name;
        this.validate();
    }

    activate() {
        if (this._address === undefined){
            throw new Error("Address is mandatory to activate a costumer")
        }
        this._active = true
    }

    deactivate() {
        this._active = false
    }
}