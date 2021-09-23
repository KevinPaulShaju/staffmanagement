const Roles = require("../../models/administration/Roles");

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Roles.find();
    if (!roles || roles.length === 0) {
      return res
        .status(404)
        .json({ error: "No roles found.May be create one?" });
    }
    res.status(200).json({ roles: roles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
