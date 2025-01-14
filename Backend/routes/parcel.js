const express = require("express");
const router = express.Router();
const {createParcel, getAllParcels, updateParcel, getOneParcels, getUserParcel, deleteParcels} = require("../controllers/parcel")

//add parcel
router.post("/", createParcel)

//get all parcels
router.get("/", getAllParcels)

//update parcel
router.put("/:id", updateParcel)

//get one parcel
router.get("/find:id", getOneParcels)

//get users parcels
router.post("/me", getUserParcel)

//delete parcel
route.delete("/:id", deleteParcels)



module.exports=router;