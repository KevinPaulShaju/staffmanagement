const router = require("express").Router();
const {
  createRole,
  getAllRoles,
  getRole,
  updateRole,
  deleteRole,
} = require("../../controllers/administration/roles");

const {
  createDocType,
  deleteDocType,
  updateDocType,
  viewAllDocTypes,
  viewDocType,
} = require("../../controllers/administration/docType");

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

/**
 * @description delete a role
 * @method GET
 * @route /delete/:permissionId
 **/
router.get("/delete/:roleId", deleteRole);

//********************************* document type routes **************/

/**
 * @description add a new doctype
 * @method POST
 * @route /doctype/add
 **/
router.post("/doctype/add", createDocType);

/**
 * @description update a doctype
 * @method POST
 * @route /doctype/update/:docTypeId
 **/
router.post("/doctype/update/:docTypeId", updateDocType);

/**
 * @description view all doctypes
 * @method GET
 * @route doctype/get/all
 **/
router.get("/doctype/get/all", viewAllDocTypes);

/**
 * @description view a doctype
 * @method GET
 * @route /doctype/view/:docTypeId
 **/
router.get("/doctype/view/:docTypeId", viewDocType);

/**
 * @description delete a doctype
 * @method GET
 * @route /doctype/delete/:docTypeId
 **/
router.get("/doctype/delete/:docTypeId", deleteDocType);

module.exports = router;
