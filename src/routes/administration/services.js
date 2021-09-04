const express = require("express");
const router = express.Router();
const {
  insertToServices,
  viewAllServices,
  viewServiceDetails,
  deleteaService,
} = require("../../controllers/administration/services");

/**
 * @description to enter a service
 * @method POST
 * @route /insert/service/
**/

router.post("/insert/service/", insertToServices);

/**
 * @description to see all the services
 * @method GET
 * @route /view/all/services
**/

router.get("/view/all/services", viewAllServices);

/**
 * @description to view a service details
 * @method GET
 * @route /view/service/:serviceId
**/

router.get("/view/service/:serviceId", viewServiceDetails);

/**
 * @description to delete a service
 * @method GET
 * @route /delete/service/:serviceId
**/

router.get("/delete/service/:serviceId", deleteaService);

module.exports = router;
