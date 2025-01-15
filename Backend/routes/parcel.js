const express = require("express");
const router = express.Router();
const {
  createParcel,
  getAllParcels,
  updateParcel,
  getOneParcels,
  getUserParcel,
  deleteParcels,
} = require("../controllers/parcel");

// Add a new parcel
router.post("/", createParcel);

// Get all parcels
router.get("/", getAllParcels);

// Update a parcel
router.put("/:id", updateParcel);

// Get one parcel by ID
router.get("/find/:id", getOneParcels);

// Get user's parcels
router.post("/me", getUserParcel);

// Delete a parcel
router.delete("/:id", deleteParcels);

module.exports = router;
