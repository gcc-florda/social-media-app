import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {

        let token = req.header("Authorization"); // grave the token from the frontend

        if (!token) return res.status(403).send("Access Denied");

        if (token.startsWith("Bearer ")) token = token.slice(7, token.length).trimLeft();

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next(); // next step of the function (se ejecuta verifyToken y despues se va a ejecutar la proxima funcion)

    } catch {
        res.status(500).json({ error: err.message });
    }
}