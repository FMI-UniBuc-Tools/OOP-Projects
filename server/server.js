import dotenv from 'dotenv'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import cors from 'cors'
import { admin, dbUser, student } from './sequelizeModels.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({
    path: resolve(__dirname + '/../.env')
})

const app = express()
const port = process.env.BACKEND_PORT

app.use(cors("*"))
app.use(express.json())

app.post('/email-login', async (req, res) => {
    let userObj = (await dbUser.findOne({
        where: {
            email: req.body.email,
            password: req.body.pass
        }
    }))

    if(userObj) {
        let studentObj = (await student.findOne({
            where: {
                id: userObj.dataValues.id
            }
        }))

        let adminObj = (await admin.findOne({
            where: {
                id: userObj.dataValues.id
            }
        }))

        if(studentObj) {
            res.json(Object.assign(studentObj.dataValues, userObj.dataValues))
        }
        else if(adminObj) {
            res.json(Object.assign(adminObj.dataValues, userObj.dataValues))
        }
        else {
            res.json({error: "User not found"})
        }
    } 
    else {
        res.json({error: "User not found"})
    }
})

app.listen(port, "localhost", err => {
    if (err)
        console.error("Failed to setup server:", err)
    console.log("Server started on port " + port + "...")
})