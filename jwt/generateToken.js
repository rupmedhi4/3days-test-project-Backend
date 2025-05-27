import jwt from 'jsonwebtoken'


const createTokenAndSaveCookie = (user, res) => {
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_TOKEN,
        {
            expiresIn: '14d'
        })

    res.cookie("jwt", token, {
        httpOnly: false,
        secure: false,
        sameSite: "Lax",
        maxAge: 14 * 24 * 60 * 60 * 1000
    })
}

export { createTokenAndSaveCookie }
