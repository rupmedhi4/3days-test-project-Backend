import jwt from "jsonwebtoken"


const isAuthMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.jwt || req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: "No token, authorization denied" });
        }

        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        if (!decoded) {
            return res.status(401).json({ error: "Invalid Token" });
        }

        req.user = decoded;
        

        next();

    } catch (error) {
        console.error("Error in isAuthMiddleware:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}



const isLogin = (req, res, next) => {
    try {
        const token = req.cookies.jwt || req.headers['authorization']?.split(' ')[1];

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_TOKEN);
            if (decoded) {
                return res.status(400).json({ error: "User already logged in" });
            }
        }

        next()
    } catch (error) {
        next()
    }
};




export { isAuthMiddleware,isLogin }