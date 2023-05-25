const Result = require('../Models/Resultmodel');
// controller function to get all results
exports.getResults = async (req, res) => {
  try {
    const results = await Result.find();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get results' });
  }
}

// Controller function to store the participant's result
// I need to change this later to store the participant's result
exports.storeResult = async (req, res) => {
  try {
    const result = await Result.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to store result' });
  }
};

// Controller function to get the top 5 participants
exports.getTopParticipants = async (req, res) => {
  try {
    const topParticipants = await Result.find()
      .sort({ score: -1, totalTime: 1 })
      .limit(5);
    res.json(topParticipants);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get top participants' });
  }
};

// Controller function to get result by ID
exports.getResultById = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Result not found' });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get result' });
  }
};

// Controller function to update a result
exports.updateResult = async (req, res) => {
    try {
      const result = await Result.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!result) {
        return res.status(404).json({ error: 'Result not found' });
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update result' });
    }
  };
  
  // Controller function to delete a result
  exports.deleteResult = async (req, res) => {
    try {
      const result = await Result.findByIdAndDelete(req.params.id);
      if (!result) {
        return res.status(404).json({ error: 'Result not found' });
      }
      res.json({ message: 'Result deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete result' });
    }
  };
  
