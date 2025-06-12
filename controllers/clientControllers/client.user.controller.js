import { createTokenAndSaveCookie } from "../../jwt/generateToken.js"
import ClientUser from "../../model/clientModel/client.user.model.js"
import bcrypt from "bcryptjs"


const signup = async (req, res) => {

    try {
        const { name, email, password } = req.body

        const isEmail = await ClientUser.findOne({ email })

        if (isEmail) {
            return res.status(400).json({ message: 'Email is already in use' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new ClientUser({
            name,
            email,
            password: hashedPassword,
            role: "client",
            address: {}
        })
        await newUser.save()

        createTokenAndSaveCookie(newUser, res)

        const { password: pwd, ...userWithoutPassword } = newUser.toObject();

        res.status(200).json({
            message: "User created successfully",
            user: userWithoutPassword,
        });

    } catch (error) {
        console.error("Signup error:", error.message);
        res.status(500).json({ message: "Something went wrong during signup" });
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await ClientUser.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Email is not registered" })
        }

        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return res.status(400).json({ message: "Password is incorrect" })
        }

        createTokenAndSaveCookie(user, res)
        console.log(user);

        const { password: pwd, ...userWithoutPassword } = user.toObject()

        res.status(200).json({
            message: "User logged in successfully",
            user: userWithoutPassword,
        });
    } catch (error) {
        res.status(500).send(`Error in login: something went wrong`);
    }
}

const getUser = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await ClientUser.findById(id).populate("placedOrderItems");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "user data fetch successfully", user });
    } catch (error) {
        console.error("Error getting user data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "Lax",
            secure: false,
        });
        res.status(200).json({ success: true });
    } catch (error) {
        console.log(error)
        res.status(401).json({ success: false });
    }
}


export { signup, login,getUser,logout }