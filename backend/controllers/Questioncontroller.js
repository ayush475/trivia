const Question = require('../Models/Questionmodel');

// Controller function to get all questions
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get questions' });
  }
};

// Controller function to get a single question by ID
exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get question' });
  }
};

// Controller function to add a new question
exports.addQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add question' });
  }
};

// Controller function to update a question
exports.updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update question' });
  }
};

// Controller function to delete a question
exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete question' });
  }
};
// Controller function to get questions by category
exports.getQuestionsByCategory = async (req, res) => {
    const category = req.params.category;
    try {
      const questions = await Question.find({ category });
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get questions by category' });
    }
  };
  
  // Controller function to get a random question
  exports.getRandomQuestion = async (req, res) => {
    try {
      const count = await Question.countDocuments();
      const random = Math.floor(Math.random() * count);
      const question = await Question.findOne().skip(random);
      res.json(question);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get random question' });
    }
  };
  
