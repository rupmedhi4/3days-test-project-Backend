import jwt from 'jsonwebtoken'


const createAdminTokenAndSaveCookie = (user, res) => {
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_TOKEN,
        {
            expiresIn: '14d'
        })

      res.cookie("adminJwt", token, {
        httpOnly: false,
        secure: true,
        sameSite: "None",
        maxAge: 14 * 24 * 60 * 60 * 1000
    });

    return token
}

export { createAdminTokenAndSaveCookie }
