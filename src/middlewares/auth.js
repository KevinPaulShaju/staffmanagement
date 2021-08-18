const jwt = require("jsonwebtoken");
const Admin = require("../Models/administration/Admin");
module.exports = {
  ensureAuthenticated: async () => {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token === null) {
        return res.status(401).json({ message: "Unauthorized entry" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await Admin.findOne({ _id: decoded });
      if (!user) {
        return res.status(401).json({ message: "Unauthorized entry" });
      }
      req.token = token;
      req.user = user;
      next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
