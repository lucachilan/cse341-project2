const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "You must be logged in to perform this action." });
    }
    next();
};

module.exports = {
    isAuthenticated
};