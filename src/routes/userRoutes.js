import express from 'express';
import userController  from '../controllers/userController.js';
import authMiddleware from '../../middleware/auth.js';

const router = express.Router();

const validateUserInput = (req, res, next) => {
    const { name, email, password, role_type } = req.body;
    if (!name || !email || !password || !role_type) {
        return res.status(400).json({ status: 400, message: "All fields are required" });
    }
    if (role_type !== 'u' && role_type !== 'a') {
        return res.status(400).json({ status: 400, message: "Invalid role_type. Must be 'u' or 'a'" });
    }
    next();
};

router.post('/login', userController.login);
router.post('/users/create', validateUserInput, userController.registerUser);
// router.get('/api/users/list', authMiddleware, listUser);
// router.post('/api/users/:id', authMiddleware, updateUser);
// router.delete('/api/users/delete/:id', authMiddleware, deleteUser);

export default router;