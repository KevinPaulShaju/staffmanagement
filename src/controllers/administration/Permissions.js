const Roles = require("../../models/administration/Permissions");
const Staff = require("../../models/administration/staff");

const { rolesValidation } = require("../../services/rolesValidation");

exports.changeRoles = async (req, res) => {
  const staffId = req.params.staffId;
  //   const roleId = req.query.roleId;
  const {
    adminModule,
    staffModule,
    careTakerModule,
    patientModule,
    scheduleModule,
    financeModule,
    ndisModule,
    nagModule,
  } = req.body;

  const { error } = rolesValidation(req.body);
  if (error) {
    return res.status(406).json({ error: error.details[0].message });
  }

  try {
    const existingRolesData = await Roles.findOne({ staffId: staffId });
    if (!existingRolesData) {
      return res.status(404).json({
        error: "This staff does not exist. Please check and try again",
      });
    }

    //   query
    let query = {
      $set: req.body,
    };

    const changedRoles = await Roles.findOneAndUpdate(
      { staffId: staffId },
      query,
      { new: true }
    );
    const updatedStaff = await Staff.findOneAndUpdate(
      { _id: staffId },
      { $set: { role: "custom" } },
      { new: true }
    );

    res.status(200).json({
      updatedRoles: changedRoles,
      updatedStaff: updatedStaff,
      message: "Roles updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
