const Staff = require("../models/administration/staff");
const Admin = require("../models/administration/admin");
const jwt = require("jsonwebtoken");

const authentication = {
  authenticateUser: async (req, res, next) => {
    const role = req.query.role;
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (token === null)
      return res.status(401).json({ error: "Unauthorized entry" });

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    try {
      if (role === "hr" || role === "manager") {
        let user;
        const admin = await Admin.findOne({ _id: decode });

        if (admin) {
          user = admin;
        }
        if (!user) {
          return res.status(401).json({ error: "Unauthorized entry" });
        }
        req.token = token;
        req.user = user;
        next();
      } else if (role !== "admin" || role !== "hr" || role !== "manager") {
        let user;
        const admin = await Admin.findOne({ _id: decode });
        const hr = await Staff.findOne({ _id: decode, role: "hr" });
        const manager = await Staff.findOne({ _id: decode, role: "manager" });
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
      } else {
        return res.status(401).json({ error: "Unauthorized entry" });
      }
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  },

  authenticateAdmin: async (req, res, next) => {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (token === null)
      return res.status(401).json({ error: "Unauthorized entry" });

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    try {
      const admin = await Admin.findOne({ _id: decode });
      if (!admin) {
        return res.status(401).json({ error: "Unauthorized entry" });
      }
      req.token = token;
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  },
  //   ensureMnagement: async (req, res, next) => {
  //     const role = req.query.role;
  //     if (role !== "admin" || role !== "hr" || role !== "manager") {
  //       try {
  //         const authHeader = req.headers["authorization"];

  //         const token = authHeader && authHeader.split(" ")[1];

  //         if (token === null)
  //           return res.status(401).json({ error: "Unauthorized entry" });

  //         const decode = jwt.verify(token, process.env.JWT_SECRET);
  //         let user;
  //         const admin = await Admin.findOne({ _id: decode });
  //         const hr = await Staff.findOne({ _id: decode, role: "hr" });
  //         const manager = await Staff.findOne({ _id: decode, role: "manager" });

  //         if (admin) {
  //           user = admin;
  //         }
  //         if (hr) {
  //           user = hr;
  //         }
  //         if (manager) {
  //           user = manager;
  //         }
  //         if (!user) {
  //           return res.status(401).json({ error: "Unauthorized entry" });
  //         }
  //         req.token = token;
  //         req.user = user;
  //         next();
  //       } catch (error) {
  //         return res.status(401).json({ error: error.message });
  //       }
  //     }
  //   },
};

module.exports = authentication;
