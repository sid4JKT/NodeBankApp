const express = require("express");
const ListDataController = require('../Controller/ListDataDetail_Controller')
const router = express.Router();

router.get("/fetchalllistdatamaster",ListDataController.getlistDataDetail);

router.get("/listdatamaster/:masterid",ListDataController.getListDataDetailByCode);

// router.post("/postdatamaster", postListData);

router.post("/updateDataMaster",ListDataController.updateListDataDetail);

router.delete("/deleteRecord/:masterId",ListDataController.deletelistDataDetail);

module.exports = router;