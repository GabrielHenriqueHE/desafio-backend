import { Request, Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client";

import Transaction from "../entities/classes/Transaction";

const client = new PrismaClient()

export async function createTransactionController (req: Request, res: Response) {
    const { value, payerId, receiverId } = req.body

    if (payerId === receiverId) {
        return res.status(400).json({
            message: "you could not make a transaction for yourself"
        })
    }
    
    const payer = await client.user.findUnique({ where: { id: payerId } })
    if (payer && payer.role === "OWNER") {
        return res.status(400).json({
            message: "you are not able to make transactions"
        })
    }

    const receiver = await client.user.findUnique({ where: { id: receiverId } })

    if (!receiver) {
        return res.status(400).json({
            message: "invalid receiver"
        })
    }
    
    const payerWallet = await client.wallet.findUnique({ where: { userId: payerId } })
    
    if (payerWallet && payerWallet.balance >= value) {
        const transaction = new Transaction(value, payerId, receiverId)
        
        try {
            await client.$transaction([
                client.transaction.create({ data: transaction }),
                client.wallet.update({
                    where: { userId: payerId },
                    data: { balance: { decrement: value } }  
                }),
                client.wallet.update({
                    where: { userId: receiverId },
                    data: { balance: { increment: value } }  
                })
            ])

            return res.status(200).json({
                message: "transaction concluded"
            })
    
        } catch (error) {
            return res.status(500).json({
                error: error
            })
        }
    } else {
        return res.status(400).json({
            message: "insufficient funds"
        })
    }   
}
