const jwt = require("jsonwebtoken");
const Admin = require("../Models/administration/Admin");
const HResources = require("../Models/administration/HResources");
const Manager = require("../Models/administration/Manager");

module.exports = {
  managementAuth: async (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];

      const token = authHeader && authHeader.split(" ")[1];

      if (token === null)
        return res.status(401).json({ error: "Unauthorized entry" });

      const decode = jwt.verify(token, process.env.JWT_SECRET);
      let user;
      const admin = await Admin.findOne({ _id: decode });
      const hr = await HResources.findOne({ _id: decode });
      const manager = await Manager.findOne({ _id: decode });
      if (admin) {
        user = admin;
      }
      if (hr) {
        user = hr;
      }
      if (manager) {
        user = manager;
      }

      if (!user) {
        return res.status(401).json({ error: "Unauthorized entry" });
      }

      req.token = token;
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  },
};
