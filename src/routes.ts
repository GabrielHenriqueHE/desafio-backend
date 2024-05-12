import { Router } from "express";
import { createUserController } from "./controllers/UserController";
import { createWalletController } from "./controllers/WalletController";
import { createTransactionController } from "./controllers/TransactionController";

const router = Router()

router.post("/users/new", createUserController)
router.post("/wallets/new", createWalletController)
router.post("/transfer",  createTransactionController)

export default router;