const authService = require("../services/auth.service");

class AuthController {
    /**
     * POST /api/auth/register
     */
    async register(req, res) {
        try {
            const { username, email, password } = req.body;

            if (!username || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Please fill the form",
                });
            }

            const result = await authService.register({
                username,
                email,
                password,
            });

            return res.status(201).json({
                success: true,
                message: "Sign Up successfully",
                data: result,
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    /**
     * POST /api/auth/login
     */
    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "PLease fill your email or password",
                });
            }

            const result = await authService.login({ email, password });

            return res.status(200).json({
                success: true,
                message: "Login successfully",
                data: result,
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message,
            });
        }
    }

    /**
     * POST /api/auth/logout
     */
    async logout(req, res) {
        return res.status(200).json({
            success: true,
            message: "Logout successfully",
        });
    }

    /**
     * GET /api/auth/me
     */
    async getMe(req, res) {
        try {
            const userId = req.user.id;
            const user = await authService.getProfile(userId);

            return res.status(200).json({
                success: true,
                data: user,
            });
        } catch (error) {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }
    }
}

module.exports = new AuthController();
