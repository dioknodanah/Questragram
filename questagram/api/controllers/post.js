import {db} from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";


export const getPosts =(req, res) => {
    
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo)=>{
        if (err) return res.status(403).json("Token is not valid!");
    

        const q = `SELECT p.*, u.id AS userId, username FROM post AS p JOIN users AS u ON (u.id = p.userId)`;

        db.query(q, [userInfo.id], (err,data)=>{
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
