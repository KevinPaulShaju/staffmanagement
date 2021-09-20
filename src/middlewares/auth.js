const Staff = require("../models/administration/staff");
const Permissions = require("../models/administration/Permissions");
const jwt = require("jsonwebtoken");

// const User = require("../models/user/user");

const authentication = {
  ensureAdmin: async (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token === null)
        return res.status(401).json({ message: "Unauthorized entry" });

      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const staff = await Staff.findOne({ _id: decode });
      if (!staff) {
        return res.status(401).json({ message: "Unauthorized entry" });
      }

      const permission = await Permissions.findOne({ staffId: staff._id });
      if (!permission) {
        return res.status(401).json({ message: "Unauthorized entry" });
      }
      if (permission.adminModule === false) {
        return res.status(401).json({
          message:
            "Ooops....! You don't have the permissions to perform this action",
        });
      }
      console.log(permission);

      req.token = token;
      req.user = staff;
      next();
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  },
};

module.exports = authentication;
