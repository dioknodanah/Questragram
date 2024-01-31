import express from "express";
const app = express()
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import postImageRoutes from "./routes/post_image.js"
import likesRoutes from "./routes/likes.js"
import authRoutes from "./routes/auth.js"
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";

//middlewares
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000",
}))
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/upload' )
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})

const upload = multer({ storage: storage})

app.post("/api/upload", upload.single("file"), (req,res)=>{
    const file = req.file;
    console.log(req.file.filename)
    res.status(200).json(file.filename)
})

app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/postImage", postImageRoutes)
app.use("/api/likes", likesRoutes)
app.use("/api/auth", authRoutes)


app.listen(8800, ()=>{
    console.log("API working!")
})