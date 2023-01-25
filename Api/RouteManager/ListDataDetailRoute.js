<<<<<<< HEAD
const express = require("express");
const ListDataController = require('../Controller/ListDataDetail_Controller')
const router = express.Router();

router.get("/fetchalllistdatamaster",ListDataController.getlistDataDetail);

router.get("/listdatamaster/:masterid",ListDataController.getListDataDetailByCode);

// router.post("/postdatamaster", postListData);

router.post("/updateDataMaster",ListDataController.updateListDataDetail);

router.delete("/deleteRecord/:masterId",ListDataController.deletelistDataDetail);

=======
const express = require("express");
const ListDataController = require('../Controller/ListDataDetail_Controller')
const router = express.Router();

router.get("/fetchalllistdatamaster",ListDataController.getlistDataDetail);

router.get("/listdatamaster/:masterid",ListDataController.getListDataDetailByCode);

// router.post("/postdatamaster", postListData);

router.post("/updateDataMaster",ListDataController.updateListDataDetail);

router.delete("/deleteRecord/:masterId",ListDataController.deletelistDataDetail);

>>>>>>> 4245e5ca8949567eebfb153fca4dd0a367009d09
module.exports = router;