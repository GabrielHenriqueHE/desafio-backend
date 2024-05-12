import 'dotenv/config'
import express, { urlencoded } from "express"
import cookieParser from 'cookie-parser'
import router from './routes'

const app = express()

app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser())
app.use(router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})

app.get("/", (req, res) => {
    return res.status(200).json({
        ok: true
    })
})
