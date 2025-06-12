import { createAdminTokenAndSaveCookie } from '../../jwt/adminGenerateToken.js'
import { createTokenAndSaveCookie } from '../../jwt/generateToken.js'
import User from '../../model/adminModel/user.model.js'
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
            password: hashedPassword,
            role:"admin"
        })
        await newUser.save()

        createAdminTokenAndSaveCookie(newUser, res)

        const { password: pwd, ...userWithoutPassword } = newUser.toObject();

        res.status(200).json({
            message: "User created successfully",
            user: userWithoutPassword,
        });

    } catch (error) {
        console.error("Signup error:", error.message);
        res.status(500).json({ message: "Something went wrong during signup",error:error });
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Email is not registered" })
        }

        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return res.status(400).json({ message: "Password is incorrect" })
        }

        createAdminTokenAndSaveCookie(user, res)
        const { password: pwd, ...userWithoutPassword } = user.toObject()

        res.status(200).json({
            message: "User logged in successfully",
            user: userWithoutPassword,
        });
    } catch (error) {
        res.status(500).send(`Error in login: something went wrong`);
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("adminJwt", {
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


export { signup, login, logout }