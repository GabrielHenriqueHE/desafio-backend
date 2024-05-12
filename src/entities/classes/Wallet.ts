import { v4 } from "uuid";
import { IWallet } from "../interfaces/IWallet";

export default class Wallet implements IWallet {
    public readonly id: string = v4()
    public balance: number = 0
    
    constructor (
        public userId: string,
        balance?: number,
        id?: string
    ) {
        if (id) this.id = id
        if (balance) this.balance = balance
    }
}