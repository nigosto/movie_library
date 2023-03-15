import Movie from "../../../models/Movie";
import connectDB from "@/lib/dbConnect";

export default async function handler(req, res) {
    if(req.method === 'GET') {   
        connectDB();
        const {id} = req.query;

        let errors = [];

        const movie = await Movie.findById(id)
        
        if(movie === null){
            errors.push("Laptop with this id does not exist")
        }

        if(errors.length) {
            res.status(400).json({errors});
            return;
        }

        res.status(200).json({
            message: "Movie found!",
            movie
        });
    }
    else {
        res.status(404).json({message: "Page not found!"});
    }
}