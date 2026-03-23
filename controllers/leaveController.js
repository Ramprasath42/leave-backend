import Leave from "../models/Leave.js";
 

export const createLeave = async (req, res) => {
  try {
    const leave = new Leave(req.body);
await leave.save();
    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
 

export const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getLeaveById = async (req, res) => {
  try {
const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ message: "Not found" });
    res.json(leave);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
 

export const updateLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(
req.params.id,
      req.body,
      { returnDocument: "after" }
    );
    res.json(leave);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
 

export const deleteLeave = async (req, res) => {
  try {
await Leave.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

