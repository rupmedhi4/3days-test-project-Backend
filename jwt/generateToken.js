import jwt from 'jsonwebtoken'


const createTokenAndSaveCookie = (id, res) => {
    const token = jwt.sign({ id }, process.env.JWT_TOKEN, {
          expiresIn: '14d',
    })

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 14 * 24 * 60 * 60 * 1000
    })
}

export {createTokenAndSaveCookie}
