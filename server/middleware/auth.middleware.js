const tokenService = require("../services/token.service");

const auth = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }
    try {
        // Bearer <token_body>
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const data = tokenService.validateAccess(token);
        console.log("Decoded:", data);

        req.user = data;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Unauthorized"
        });
    }
};

const verifyAuthById = (req, res, next) => {
    auth(req, res, () => {
        const { userId } = req.params;
        console.log("req.user:", req.user);

        if (userId === req.user._id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({
                message: "You don't have access"
            });
        }
    });
};

const verifyIsAdmin = (req, res, next) => {
    auth(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({
                message: "You don't have access"
            });
        }
    });
};

module.exports = {
    auth,
    verifyAuthById,
    verifyIsAdmin
};
