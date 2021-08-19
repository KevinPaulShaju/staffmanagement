const jwt = require("jsonwebtoken");
const Admin = require("../Models/administration/Admin");
const HResources = require("../Models/administration/HResources");

module.exports = {
  ensureAdmin: async (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];

      const token = authHeader && authHeader.split(" ")[1];

      if (token === null)
        return res.status(401).json({ message: "Unauthorized entry" });

      const decode = jwt.verify(token, process.env.JWT_SECRET);

      const user = await Admin.findOne({ _id: decode });

      if (!user) {
        return res.status(401).json({ message: "Unauthorized entry" });
      }

      req.token = token;
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  },
  ensureHr: async (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];

      const token = authHeader && authHeader.split(" ")[1];

      if (token === null)
        return res.status(401).json({ message: "Unauthorized entry" });

      const decode = jwt.verify(token, process.env.JWT_SECRET);

      const user = await HResources.findOne({ _id: decode });

      if (!user) {
        return res.status(401).json({ message: "Unauthorized entry" });
      }

      req.token = token;
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  },
};
