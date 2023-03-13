import connectDB from "../../../lib/dbConnect";
import Movie from "../../../models/Movie"

export default async function(req, res) {
    connectDB();
    const movies = await Movie.find();
    res.status(200).json({
        message: "Movies fetched successfully!",
        movies
    });
}