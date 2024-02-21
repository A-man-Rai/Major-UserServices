import User from "../Schema/userSchema.js";

const getAllUsersData = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users); 
    } catch (error) {
        console.error('Error retrieving users data:', error);
        res.status(500).send('Error retrieving users data');
    }
}

export default getAllUsersData;
