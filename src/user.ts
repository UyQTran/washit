import uuid from 'uuid-random';

export default class User {
    private _email: string;
    private _id: string;

    constructor(email: string) {
        this._email = email;
        this._id = uuid();
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }
}