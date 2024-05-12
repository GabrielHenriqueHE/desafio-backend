import { Request, Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client"

import User from "../entities/classes/User"
import { hashSync } from "bcrypt"

const client = new PrismaClient()

export async function createUserController (req: Request, res: Response) {
    const { name, document, email, password } = req.body
    let { role } = req.body

    if (role == "user" || role == "owner") {
        role = String(role).toUpperCase()
    } else {
        return res.status(400).json({
            message: "invalid role"
        })
    }

    const userAlreadyExists = await client.user.findFirst({
        where: { 
            OR: [
                { doc: { equals: document } },
                { email: { equals: email } }
            ]
        }
    })

    if (userAlreadyExists) {
        return res.status(400).json({
            error: "user already exists"
        })
    }
    
    const user = new User(name, email, document, hashSync(password, 10), role)
    console.log(user)
    try {
        const createdUser = await client.user.create({ data: user })
        res.cookie("userId", createdUser.id, {
            expires: new Date(Date.now() + 30 * 1000), // 30 dias
            httpOnly: true,
        });
        return res.status(307).redirect(307, "/wallets/new")
    } catch (error) {
        return res.status(500).json({
            error: "internal server error"
        })
    }
    
}
