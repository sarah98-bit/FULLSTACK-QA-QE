import express from "express"
import dotenv from "dotenv"
import { readFileSync } from "fs"
import path from 'path'
import cors from 'cors'
//configure the dotenv
dotenv.config()
//instanceof express
const app = express()

//load the variables
const port = process.env.PORT
console.log(port)

//enable cors with options
app.use(cors({
    origin : "http://localhost:5173",
    methods: "GET, PUT, DELETE",
    credentials: true
}))


//get directory
const _dirname = path.resolve()

const eventData = readFileSync(
    path.join(_dirname, "src", "db", "eventsData.json"), "utf-8"
)
// console.log(eventData)

//simple get request saying hello world
app.get('/', (req, res) => {
    res.send(`hello world, be humble to us`)
})

app.get('/api/events', (req, res) => {

    res.send(eventData)
})

//create server
app.listen(port, ()=> {
    console.log(`server is running on port: ${port}`)
})


//SOC- separation of concer