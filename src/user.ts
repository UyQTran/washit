import uuid from 'uuid-random';

export default class User {
    private _name: string;
    private _id: string;

    constructor(name: string) {
        this._name = name;
        this._id = uuid();
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }
}