import connectDB from "@/lib/dbConnect";
import User from "../../../models/User";

export default async function handler (req, res) {
    const data = req.body;
    const {username, password} = data;
    connectDB();
    // const user = 
}
