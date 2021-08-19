const jwt = require("jsonwebtoken");
const Admin = require("../Models/administration/Admin");
const HResources = require("../Models/administration/HResources");
const Manager = require("../Models/administration/Manager");
const Finance = require("../Models/administration/Finance");
const Support = require("../Models/administration/Support");

module.exports = {
  ensureAdmin: async (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];

      const token = authHeader && authHeader.split(" ")[1];

      if (token === null)
        return res.status(401).json({ error: "Unauthorized entry" });

      const decode = jwt.verify(token, process.env.JWT_SECRET);

      const user = await Admin.findOne({ _id: decode });

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
  ensureHr: async (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];

      const token = authHeader && authHeader.split(" ")[1];

      if (token === null)
        return res.status(401).json({ error: "Unauthorized entry" });

      const decode = jwt.verify(token, process.env.JWT_SECRET);

      const user = await HResources.findOne({ _id: decode });

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
  ensureManager: async (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];

      const token = authHeader && authHeader.split(" ")[1];

      if (token === null)
        return res.status(401).json({ error: "Unauthorized entry" });

      const decode = jwt.verify(token, process.env.JWT_SECRET);

      const user = await Manager.findOne({ _id: decode });

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
  ensureFinance: async (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];

      const token = authHeader && authHeader.split(" ")[1];

      if (token === null)
        return res.status(401).json({ error: "Unauthorized entry" });

      const decode = jwt.verify(token, process.env.JWT_SECRET);

      const user = await Finance.findOne({ _id: decode });

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
  ensureSupport: async (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];

      const token = authHeader && authHeader.split(" ")[1];

      if (token === null)
        return res.status(401).json({ error: "Unauthorized entry" });

      const decode = jwt.verify(token, process.env.JWT_SECRET);

      const user = await Support.findOne({ _id: decode });

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
