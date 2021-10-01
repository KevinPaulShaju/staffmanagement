const router = require("express").Router();

const {
  createBrokerage,
  deleteBrokerage,
  updateBrokerage,
  viewAllBrokerage,
  viewBrokerage,
} = require("../../controllers/administration/brokerage");

router.post("/add/new", createBrokerage);

router.post("/update/:brokerageId", updateBrokerage);

router.get("/view/:brokerageId", viewBrokerage);

router.get("/view/all/brokerage", viewAllBrokerage);

router.get("/delete/:brokerageId", deleteBrokerage);

module.exports = router;
