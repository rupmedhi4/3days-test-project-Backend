import { createTokenAndSaveCookie } from '../jwt/generateToken.js'
import User from '../model/user.model.js'
import bcrypt from 'bcryptjs'


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const isEmail = await User.findOne({ email })

        if (isEmail) {
            return res.status(400).json({ message: 'Email is already in use' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })
        await newUser.save()

        createTokenAndSaveCookie(newUser._id, res)

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


export {signup}