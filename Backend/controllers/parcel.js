const express = require("express");
const router = express.Router();
const Parcel = require("../models/Parcel"); // Import the Parcel model (adjust path as necessary)

// CREATE A PARCEL
const createParcel = async (req, res) => {
  try {
    const newParcel = new Parcel(req.body); // Corrected the Parcel initialization
    const savedParcel = await newParcel.save(); // Save the parcel
    res.status(201).json(savedParcel);
  } catch (error) {
    res.status(500).json({ message: "Error creating parcel", error });
  }
};

// GET ALL PARCELS
const getAllParcels = async (req, res) => {
  try {
    const parcels = await Parcel.find().sort({ createdAt: -1 });
    res.status(200).json(parcels);
  } catch (error) {
    res.status(500).json({ message: "Error fetching parcels", error });
  }
};

// UPDATE PARCEL
const updateParcel = async (req, res) => {
  try {
    const parcel = await Parcel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } // Returns the updated document
    );
    res.status(200).json(parcel);
  } catch (error) {
    res.status(500).json({ message: "Error updating parcel", error });
  }
};

// GET ONE PARCEL
const getOneParcels = async (req, res) => {
  try {
    const parcel = await Parcel.findById(req.params.id);
    if (!parcel) {
      return res.status(404).json({ message: "Parcel not found" });
    }
    res.status(200).json(parcel);
  } catch (error) {
    res.status(500).json({ message: "Error fetching parcel", error });
  }
};

// GET USER'S PARCELS
const getUserParcel = async (req, res) => {
  try {
    const parcels = await Parcel.find({ senderemail: req.body.email }).sort({
      createdAt: -1,
    });
    res.status(200).json(parcels);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user's parcels", error });
  }
};

// DELETE PARCEL
const deleteParcels = async (req, res) => {
  try {
    const parcel = await Parcel.findByIdAndDelete(req.params.id);
    if (!parcel) {
      return res.status(404).json({ message: "Parcel not found" });
    }
    res.status(200).json({ message: "Parcel has been deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting parcel", error });
  }
};

module.exports = {
  deleteParcels,
  getUserParcel,
  getOneParcels,
  updateParcel,
  getAllParcels,
  createParcel,
};
