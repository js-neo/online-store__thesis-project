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

module.exports = {
    auth
};
