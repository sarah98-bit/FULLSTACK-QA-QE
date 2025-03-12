import express, {Request, Response, NextFunction} from "express"
import dotenv from 'dotenv'
import { readFileSync } from "fs"
import * as fs from 'fs'
import path from 'path'
import cors from "cors"
import { generateKey } from "crypto"

interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    year: number;
    pages: number;
    image: string;
}

//configure the dotenv 
//top most level
dotenv.config()

//instance of express
//the second most top level
const app = express()

//load the variables
const port = process.env.PORT 
const secret = process.env.SECRET
console.log(port) //3000
console.log(secret) //a_very_strong_secret_for_you


//eneable CORS for all origins  
//app.use(cors())

//enable cors with optiosn (RECOMMENDED)
//To allow only http://localhost:5173:
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET, PUT,DELETE",
    credentials: true //allows cookies and auth headers
}))

//get the current  directory 
const _dirname = path.resolve()

//synchronously read the file
// const eventData = readFileSync(
//     path.join(__dirname, "src", "db", "eventsData.json"), "utf-8"
// )

//console.log(eventData)


const getBooksData = (): any[] => {
    try {
        const filePath = path.join(__dirname,"db", "eventsData.json"); // Ensure this matches your folder structure
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading eventsData.json:", error);
        return [];
    }
};
const eventsData = getBooksData()
// export  getBooksData;

//a simple get request saying hello world  
app.get('/', (req, res) => {
    res.send(`Hello World, Be humble to us`)
})

app.get('/api/eventsData', (req, res) => {
    res.send(eventsData)
})

const sortEvents = (events: any[], sortKey?: string, order?: string): any[] => {
    // Validate the sortKey. Only "year" and "pages" are allowed.
    if (!sortKey || (sortKey !== "year" && sortKey !== "pages")) {
      return events;
    }
  
    const sortOrder = order && order.toLowerCase() === "desc" ? -1 : 1;
  
    return events.sort((a, b) => {
      // Since both year and pages are numbers, subtract to compare
      return (a[sortKey] - b[sortKey]) * sortOrder;
    });
  };

app.get('/api/eventsFilter', (req: Request, res: Response) => {
    try {
        const { title, genre, year, author, pages, sort, order } = req.query;

        let filteredEvents: Book[] = getBooksData()

        if (title) {
            filteredEvents = filteredEvents.filter((event: Book) =>
                event.title.toLowerCase().includes((title as string).toLowerCase())
            );
        }
        if (genre) {
            filteredEvents = filteredEvents.filter((event: Book) =>
                event.genre.toLowerCase().includes((genre as string).toLowerCase())
            );
        }
        if (author) {
            filteredEvents = filteredEvents.filter((event: Book) =>
                event.author.toLowerCase().includes((author as string).toLowerCase())
            );
        }
        if (year) {
            const YearNum = parseInt(year as string, 10);
            filteredEvents = filteredEvents.filter((event: Book) => event.year === YearNum);
        }
        if (pages) {
            const pageNum = parseInt(pages as string, 10);
            filteredEvents = filteredEvents.filter((event: Book) => event.pages === pageNum);
        }

        filteredEvents = sortEvents(filteredEvents, sort as string, order as string);

        res.json(filteredEvents);
      } catch (error) {
        console.error("Error filtering and sorting events:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
// create server 
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

//SOC - separtion of concersn 