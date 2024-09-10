const { connection } = require("../config/connection");

const {TodoModel} = require('../models/model')

exports.getTodo = async (req, res) => {
  try {
    const data = await TodoModel.find({})
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

exports.addTodo = async (req, res) => {
  try {
    const newTodo = new TodoModel(req.body)
 // Save the new todo item to the database
 const savedTodo = await newTodo.save();
    res.status(200).json(savedTodo);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const id = req.body._id; // Get the ID from the request body

    // Use the model's static method to find and delete the document by ID
    const data = await TodoModel.findByIdAndDelete(id);

    // Check if the document was found and deleted
    if (!data) {
      return res.status(404).json({ message: 'Not found' });
    }

    // Respond with the deleted document
    res.json({ message: 'Todo deleted successfully', data });
  } catch (error) {
    console.log(error);
  }
};


exports.editTodo = async (req, res) => {
  try {
    const id = req.body._id; // Get the ID from the request body

    // Create the update object directly from the request body
    const update = {
      work: req.body.work, // Ensure these fields exist in your request
      date: req.body.date,
    };

    // Perform the update operation using Mongoose's findByIdAndUpdate
    const result = await TodoModel.findByIdAndUpdate(
      id,
      update,
      { new: true } // Return the updated document
    );

    // Check if a document was updated
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    // Respond with the updated document
    res.json({ message: "Todo updated successfully", data: result });
  } catch (error) {
    console.error('Error updating todo:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

