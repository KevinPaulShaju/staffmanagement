const express = require("express");
const router = express.Router();
const {
  insertToServices,
  viewAllServices,
  viewServiceDetails,
  deleteaService,
  updateServices,
} = require("../../controllers/administration/services");

/**
 * @description to enter a service
 * @method POST
 * @route /insert/service/
 **/

router.post("/insert", insertToServices);

/**
 * @description to see all the services
 * @method GET
 * @route /view/all/services
 **/

router.get("/view/all", viewAllServices);

/**
 * @description to view a service details
 * @method GET
 * @route /view/service/:serviceId
 **/

router.get("/view/:serviceId", viewServiceDetails);

/**
 * @description to update a service
 * @method POST
 * @route /update/service/:serviceId
 **/

router.post("/update/:serviceId", updateServices);

/**
 * @description to delete a service
 * @method GET
 * @route /delete/service/:serviceId
 **/

router.get("/delete/:serviceId", deleteaService);

module.exports = router;
