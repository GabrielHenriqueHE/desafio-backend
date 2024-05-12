import { v4 } from "uuid";
import { ITransaction } from "../interfaces/ITransaction";

export default class Transaction implements ITransaction {

    public id: string = v4();

    constructor (
        public value: number,
        public payerId: string,
        public receiverId: string,
        id?: string
    ) {
        if (id) this.id = id
    }
}