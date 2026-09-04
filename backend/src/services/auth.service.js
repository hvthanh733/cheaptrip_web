const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../utils/jwt");

class AuthService {
    async register({ username, email, password }) {
        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (existingUser) {
            throw new Error("Email or Username already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        const token = generateToken({
            id: newUser._id,
            username: newUser.username,
        });

        return {
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
            token,
        };
    }

    async login({ email, password }) {
        const user = await User.findOne({ email });
        
        if (!user) {
            throw new Error("Email not exists");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Email or Password not valid");
        }

        const token = generateToken({ id: user._id, username: user.username });

        return {
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            token,
        };
    }

    async getProfile(userId) {
        const user = await User.findOne(userId).select("-password");
        if (!user) {
            throw new Error("User not exists");
        }
        return user;
    }
}

module.exports = new AuthService();
