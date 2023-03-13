import Movie from "../../../models/Movie"
import connectDB from "@/lib/dbConnect";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    if(req.method === 'POST') {
        const session = await getSession({req})
        if(!session) {
            res.status(401).json({
                message: "Unauthorized"
            });
            return
        }
        
        connectDB();
        const { name, description, genre, producer, image } = req.body;

        let errors = [];

        const movies = await Movie.find({name});

        if(movies.length) {
            errors.push('A movie with this name already exists!');
        }

        // TODO: more validation

        if(errors.length) {
            res.status(400).json({errors});
            return;
        }

        const movie = await Movie.create({name, description, genre, producer, image});

        res.status(200).json({
            message: "Movie created successfully!",
            movie
        });
    }
    else {
        res.status(404).json({message: "Page not found!"});
    }
}