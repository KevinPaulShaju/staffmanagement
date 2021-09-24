const router = require("express").Router();
const {
  createRole,
  getAllRoles,
  getRole,
  updateRole,
} = require("../../controllers/administration/roles");

/**
 * @description add a new role
 * @method POST
 * @route /add
 **/
router.post("/add", createRole);

/**
 * @description update a role
 * @method POST
 * @route /update/:permissionId
 **/
router.post("/update/:permissionId", updateRole);

/**
 * @description view all roles
 * @method GET
 * @route /get/all
 **/
router.get("/get/all", getAllRoles);

/**
 * @description view a role
 * @method GET
 * @route /view/:permissionId
 **/
router.get("/view/:permissionId", getRole);

module.exports = router;
