const jwt = require('jsonwebtoken');
const router = require('../Routes/authRouter');

const ensureAuthenticated = (req,res,next) => {
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(403)
                .json({message: "Unauthorized, Json webtoken is required" });
    }

    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403)
                .json({message: "Unauthorized, Json webtoken is wrong or expired" });
    }
}

module.exports = ensureAuthenticated;