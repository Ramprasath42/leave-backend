import Leave from "../models/Leave.js";

 const cache={}

export const createLeave = async (req, res) => {
  try {
    const leave = new Leave(req.body);
await leave.save();
    Object.keys(cache).forEach(key=>delete cache[key]);
    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
 

export const getLeaves = async (req, res) => {
  try {
    const key=JSON.stringify(req.query);

    if (cache[key]){
      console.log("cache hit");
      return res.json(cache[key]);
    }
      const page=parseInt(req.query.page)||1;
      const limit=5;
      const skip=(page-1)*limit;
      const search=req.query.search||"";
      const status=req.query.status;

      const query={
        name:{$regex: search,$options:"i"}
      };
      
      if(status){
        query.status=status;
      }

      const leaves = await Leave.find(query).skip(skip).limit(limit).sort({createdAt: -1}).lean();

      const total= await Leave.countDocuments(query);

      

    

    cache[key]={total,
      page,
      totalpages:Math.ceil(total/limit),
      data: leaves,
    totalCount: total,};

      console.log("cache miss");
      
      res.json({total,
      page,
      totalpages:Math.ceil(total/limit),
      data: leaves,
    totalCount: total,});
  } 
  catch (error) {
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
    Object.keys(cache).forEach(key=>delete cache[key]);;
    res.json(leave);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
 

export const deleteLeave = async (req, res) => {
  try {
await Leave.findByIdAndDelete(req.params.id);
Object.keys(cache).forEach(key=>delete cache[key]);;
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

