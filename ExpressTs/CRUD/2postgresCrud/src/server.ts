import express, {Request,Response} from "express";
import dotenv from "dotenv"
import cors from "cors"
import { readFileSync } from "fs";
import path from "path";
import pool from "./db/db.config";

// Configure dotenv
dotenv.config()

//instance of express
const app =express()

const port = process.env.PORT

console.log(`We are using port ${port}`);

app.use(express.json())

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET","POST","PUT","PATCH","DELETE"],
    allowedHeaders: ["Content-Type"]
  })
);

// Read book data from JSON file
// let booksData:any[]=[]
// try {
//   const filePath = path.join(__dirname, "db", "books.json");
//   console.log("Reading books from:", filePath);
//   const jsonContent = JSON.parse(readFileSync(filePath, "utf-8"));
//   booksData = jsonContent.books; // Access the books array
// } catch (error) {
//   console.error("Error reading books.json:", error);
//   booksData = []; // Fallback to empty array
// }


app.post('/api/v1/users',async (req:Request,res:Response)=>{
  try {
    const{name,email,password}=req.body

    //check if email exists
    const emailCheck = await pool.query("SELECT user_id from users WHERE email =$1", [email])
    if(emailCheck.rows.length>0){
      res.status(400).json({meassage:'User already exist'})
      return
    }

    //insert user
    const userResult = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",[name,email, password]
    )
    res.status(201).json({
      message:'User successfully created',
      user: userResult.rows[0]

    })
  } catch (error) {
    console.error("Error in creatin user",error)
    res.status(500).json({message:'Internal server error'})
  }
})
//post books
app.post('/api/v1/books',async (req:Request,res:Response)=>{
  try {
    const {title, author, genre, year, pages, publisher, description, image, price,created_by,book_id}=req.body

    // //check if a user is available before posting a book
    // const bookCheck = await pool.query("SELECT id from books WHERE id =$1", [id])
    // if(bookCheck.rows.length ===0){
    //   res.status(400).json({message:"book not found"})
    //   return
    // }

    //insert a book
    const bookResult = await pool.query(
      "INSERT INTO books (title, author, genre, year, pages, publisher, description, image, price,created_by, book_id) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",[title, author, genre, year, pages, publisher, description, image, price, created_by, book_id]
    )
    res.status(200).json({message:'Book added successfully',book:bookResult.rows[0]})
  } catch (error) {
    console.error("Error in creating book:",error)
    res.status(500).json({message:'Internal server error'})
  }
})

app.get('/api/v1/books/:book_id?',async (req:Request,res:Response)=>{
  try {
    const {id} = req.params;

    if (id) {
      // Get a specific book by ID
      const book = await pool.query("SELECT * FROM books WHERE book_id = $1", [id]);
      
      if (book.rows.length > 0) {
        res.status(200).json({message: "Book found", book: book.rows[0]});
      } else {
        res.status(404).json({message: "Book not found"});
      }
    } else {
      // Get all books
      const books = await pool.query("SELECT * FROM books");
      res.status(200).json(books.rows);
    }
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({message: 'Internal server error'});
  }
})

//Get users
app.get('/api/v1/users',async(req:Request,res:Response)=>{
  try {
    const result = await pool.query("SELECT * FROM public.users ORDER BY user_id DESC")
    res.status(200).json(result.rows)
  } catch (error) {
    console.error("Users not found", error)
    res.status(400).json({message:'Internal server error'})
  }
})
app.get('/api/v1/users/:id',async(req:Request,res:Response)=>{
  try {
    const{id} = req.params
    const result = await pool.query("SELECT * FROM public.users WHERE user_id = $1 ",[id])
    if(result.rows.length ===0){
      res.status(400).json({message:'User not found'})
      return
    }
    res.status(200).json(result.rows)
  } catch (error) {
    console.error("Users not found", error)
    res.status(400).json({message:'Internal server error'})
  }
})
//get borrowers
app.get('/api/v1/borrowers',async(req:Request,res:Response)=>{
  try {
    const result = await pool.query("SELECT * FROM public.borrowers ORDER BY borrower_id ASC")
    res.status(200).json(result.rows)
  } catch (error) {
    console.error("borrowers not found", error)
    res.status(400).json({message:'Internal server error'})
  }
})
app.get('/api/v1/borrowers/:id',async(req:Request,res:Response)=>{
  try {
    const{id} = req.params
    const result = await pool.query("SELECT * FROM public.borrowers WHERE borrower_id = $1 ",[id])
    if(result.rows.length ===0){
      res.status(400).json({message:'borrower not found'})
      return
    }
    res.status(200).json(result.rows)
  } catch (error) {
    console.error("borrowers not found", error)
    res.status(400).json({message:'Internal server error'})
  }
})
//get user_roles
app.get('/api/v1/user_roles',async(req:Request,res:Response)=>{
  try {
    const result = await pool.query("SELECT * FROM public.user_roles ORDER BY role_id ASC")
    res.status(200).json(result.rows)
  } catch (error) {
    console.error("role not found", error)
    res.status(400).json({message:'Internal server error'})
  }
})
app.get('/api/v1/user_roles/:id',async(req:Request,res:Response)=>{
  try {
    const{id} = req.params
    const result = await pool.query("SELECT * FROM public.user_roles WHERE role_id = $1 ",[id])
    if(result.rows.length ===0){
      res.status(400).json({message:'role not found'})
      return
    }
    res.status(200).json(result.rows)
  } catch (error) {
    console.error("role not found", error)
    res.status(400).json({message:'Internal server error'})
  }
})



app.put('/api/v1/users/:id',async(req:Request,res:Response)=>{
  try {
    const{id} = req.params
    const{name,email,password}=req.body
    const checkUser = await pool.query("SELECT * FROM public.users WHERE user_id = $1 ",[id])
    if(checkUser.rows.length ===0){
      res.status(400).json({message:'User not found'})
      return
    }
    const result = await pool.query(
      "UPDATE users SET name=$1, email=$2, password=$3, updated_at=NOW() WHERE user_id=$4 RETURNING *",
      [name, email, password, id]
  );
  res.json({ message: "User updated", user: result.rows[0] });
    res.status(200).json(checkUser.rows)
  } catch (error) {
    console.error("Users not found", error)
    res.status(400).json({message:'Internal server error'})
  }
})
app.put('/api/v1/books/:id',async(req:Request,res:Response)=>{
    try {
      const{id} = req.params
      const {title, author, genre, year, pages, publisher, description, image, price,}=req.body
      const checkBook = await pool.query("SELECT * FROM public.books WHERE book_id = $1 ",[id])
      if(checkBook.rows.length ===0){
        res.status(400).json({message:'Book not found'})
        return
      }
      const result = await pool.query(
        "UPDATE books SET title=$1, author=$2, genre=$3, year=$4, pages=$5, publisher=$6, description=$7, image=$8, price=$9 , updated_at=NOW() WHERE book_id=$10 RETURNING *",
        [title, author, genre, year, pages, publisher, description, image, price, id]
    );
    res.json({ message: "Book updated", book: result.rows[0] });
      res.status(200).json(checkBook.rows)
    } catch (error) {
      console.error("Book not found", error)
      res.status(400).json({message:'Internal server error'})
    }
  })
  

// //delete user  
app.delete('/api/v1/users/:id', async(req:Request, res:Response) => {
  try {
      const {id} =req.params

      const checkUser = await pool.query("SELECT * FROM public.users WHERE user_id = $1", [id])
      if (checkUser.rows.length === 0) {
          res.status(400).json({ message: "User not found" });
          return
     } 
      await pool.query("DELETE FROM public.users WHERE user_id = $1",[id]);
      res.json({ message: "User deleted successful" });
  
  } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Internal server error" });
  }
})

// DELETE endpoint to remove a book
app.delete('/api/v1/books/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if book exists
    const bookCheck = await pool.query("SELECT * FROM books WHERE book_id = $1", [id]);
    if (bookCheck.rows.length === 0) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    // Delete the book
    await pool.query("DELETE FROM books WHERE book_id = $1", [id]);
    
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});