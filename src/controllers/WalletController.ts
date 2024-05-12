import { Request, Response, NextFunction } from "express"

import Wallet from "../entities/classes/Wallet";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient()

export async function createWalletController (req: Request, res: Response) {
    const userId = req.cookies.userId
    
    const userAlreadyHaveWallet = await client.wallet.findFirst({ where: { userId: userId } })

    if (userAlreadyHaveWallet) {
        return res.status(400)
    }

    const wallet = new Wallet(userId)

    try {
        await client.wallet.create({ data: wallet })
        return res.status(201).redirect("/")
    } catch (error) {
        
    }
}