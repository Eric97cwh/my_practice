import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 
    
    if (!token) {
        return res.status(401).json({ status: 401, message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, 'jwt_secret');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ status: 401, message: "Invalid token" });
    }
};

export default authMiddleware;