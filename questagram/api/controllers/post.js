import {db} from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";


export const getPosts =(req, res) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo)=>{
        if (err) return res.status(403).json("Token is not valid!");

        // const q = 
        // userId !== "undefined"
        // ? `SELECT p.*, u.id AS userId, username FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.upload_date DESC`
        // : `SELECT p.*, u.id AS userId, username FROM post AS p JOIN users AS u ON (u.id = p.userId)`;

        const q = "SELECT post.*, users.profilepic FROM post JOIN users ON post.userid = users.id ORDER BY post.id DESC;"

    //     const values =
    //   userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

        db.query(q, (err,data)=>{
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });

    });
    
};

export const addPost =(req, res) => {
    
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo)=>{
        if (err) return res.status(403).json("Token is not valid!");
        
        const img = req.body.img || "";

        // const key = Object.keys(img);
        // console.log("keys of img", key)

        const q = "INSERT INTO post (`upload_date`, `img`, `caption`, `userId` ) VALUES (?)";

        const values = [
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            img, 
            req.body.caption,
            userInfo.id
        ];

        console.log('Inserting values:', values);

        db.query(q, [values], (err,data)=>{
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been created!");
        });

    });
};
