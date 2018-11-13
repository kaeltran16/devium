import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = userId => {
    const secret = process.env.JWT_SECRET;
    return jwt.sign({ userId }, secret, { expiresIn: '7 days' });
};

const getUserId = (request, requireAuth = true) => {
    const header = request.request
        ? request.request.headers.authorization
        : request.connection.context.Authorization;

    if (header) {
        const token = header.replace('Bearer ', '');
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded.userId;
        } catch (e) {
            throw new Error('Cannot verify token');
        }
    }

    if (requireAuth) {
        throw new Error('Authentication required');
    }

    return null;
};


const hashPassword = password => {
    if (password.length < 8) {
        throw new Error('Password must be 8 characters or longer.');
    }

    return bcrypt.hash(password, 10);
};

const comparePassword = async (password, target) =>
    await bcrypt.compare(password, target);

const isNotEmpty = data => {
    let isNotEmpty = true;
    Object.values(data).forEach(value => {
        if (value.length === 0) {
            isNotEmpty = false;
        }
    });
    return isNotEmpty;
};


export { generateToken, getUserId, hashPassword, comparePassword, isNotEmpty };


