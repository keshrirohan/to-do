import todoModel from "../models/todo.model.js";

export const getdata = async (req, res) => {
  console.log("get all data ");
  const data = await todoModel.find();
  res.status(200).json(data);
  console.log("data:", data);
};

export const postdata = async (req, res) => {
  const { title } = req.body;

  const task = await todoModel.create({ title, completed: false });
  console.log("task:", task);
  if (task) {
    res.status(201).json({ message: "Task created successfully", task });
  }
};

export const deleteData = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await todoModel.findByIdAndDelete(id);
    if (deletedTask) {
      res
        .status(200)
        .json({ message: "Task deleted successfully", deletedTask });
    }
  } catch (error) {
    console.log("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateData = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const updatedTask = await todoModel.findByIdAndUpdate(
    id,
    { completed },
    { new: true },
  );
  if (updatedTask) {
    res.status(200).json({ message: "Task updated successfully", updatedTask });
  }
};
