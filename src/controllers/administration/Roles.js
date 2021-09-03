const Roles = require("../../models/administration/Roles");
const Admin = require("../../models/administration/admin");
const Staff = require("../../models/administration/staff");
const Carer = require("../../models/administration/carer");

const { rolesValidation } = require("../../services/rolesValidation");

exports.changeRoles = async (req, res) => {
  const staffId = req.params.staffId;
  //   const roleId = req.query.roleId;
  const { adminModule, hrModule, financeModule, ndisModule, nagModule } =
    req.body;

  const { error } = rolesValidation(req.body);
  if (error) {
    return res.status(406).json({ error: error.details[0].message });
  }

  try {
    let staffRole;
    let staffScheam;
    const admin = await Admin.findOne({ _id: staffId });
    const staff = await Staff.findOne({ _id: staffId });
    const carer = await Carer.findOne({ _id: staffId });
    if (admin) {
      staffRole = admin;
      staffScheam = Admin;
    }
    if (staff) {
      staffRole = staff;
      staffScheam = Staff;
    }
    if (carer) {
      staffRole = carer;
      staffScheam = Carer;
    }

    if (!staffRole) {
      return res.status(404).json({ error: "This staff does not exist" });
    }
    const existingRolesData = await Roles.findOne({ staffId: staffId });
    if (!existingRolesData) {
      return res.status(404).json({ error: "This staff roles does not exist" });
    }

    //   query
    let query = {
      $set: {
        adminModule,
        hrModule,
        financeModule,
        ndisModule,
        nagModule,
      },
    };

    await Roles.updateOne({ staffId: staffId }, query);
    await staffScheam.updateOne({ _id: staffId }, { $set: { role: "custom" } });

    const updatedRoles = await Roles.findOne({ staffId: staffId });
    res
      .status(200)
      .json({ roles: updatedRoles, message: "Roles updated Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
