const { verifyToken } = require("../utils/jwt");

const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Cant find token or wrong format",
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = verifyToken(token);

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Token not valid or expired",
        });
    }
};

module.exports = { authenticate };
