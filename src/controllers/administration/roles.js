const Roles = require("../../models/administration/Roles");
const { newPermissionsValidation } = require("../../services/rolesValidation");
const Staff = require("../../models/administration/staff");
exports.createRole = async (req, res) => {
  const { role } = req.body;
  const { error } = newPermissionsValidation(req.body);

  if (error) {
    return res.status(406).json({ error: error.details[0].message });
  }
  try {
    const roleExists = await Roles.findOne({ role: role });
    if (roleExists) {
      return res.status(406).json({ error: "This role already exists" });
    }
    const newRole = new Roles(req.body);
    console.log(req.body);
    const savedRole = await newRole.save();
    res.status(200).json({ message: "New role has been added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRole = async (req, res) => {
  const permissionId = req.params.permissionId;
  const { role } = req.body;
  const { error } = newPermissionsValidation(req.body);
  if (error) {
    return res.status(406).json({ error: error.details[0].message });
  }
  try {
    const roleExists = await Roles.findOne({ _id: permissionId });
    if (!roleExists) {
      return res.status(406).json({ error: "This role does not exist" });
    }
    const query = { $set: req.body };
    const savedRole = await Roles.findOneAndUpdate(
      { _id: permissionId },
      query,
      { new: true }
    );
    res.status(200).json({
      message: "Role has been updated successfully",
      savedRole: savedRole,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRole = async (req, res) => {
  const permissionId = req.params.permissionId;

  try {
    const role = await Roles.find({ _id: permissionId });
    if (!role) {
      return res
        .status(404)
        .json({ error: "No roles found.May be create one?" });
    }
    res.status(200).json({ role: role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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

exports.deleteRole = async (req, res) => {
  try {
    const roleId = req.params.roleId;

    const roleExists = await Roles.findOne({ _id: roleId });
    if (!roleExists) {
      return res.status(404).json({ error: "No roles found with this id" });
    }
    const staffsWithThisRole = await Staff.find({ roleId: roleId });
    if (staffsWithThisRole.length > 0) {
      return res.status(200).json({
        message: "You have staffs with this role. Role can not be deleted",
        staffNumber: staffsWithThisRole.length,
      });
    }
    await staffsWithThisRole.remove();
    res
      .status(200)
      .json({ message: "This role has been successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
