import { v4 } from "uuid";
import { IUser, Role } from "../interfaces/IUser";

export default class User implements IUser {
    public id: string = v4()

    constructor (
        public name: string,
        public email: string,
        public doc: string,
        public password: string,
        public role: Role,
        id?: string
    ) {
        if (id) this.id = id
    }
}