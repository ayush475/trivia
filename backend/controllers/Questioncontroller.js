const Question = require('../Models/Questionmodel');

// Controller function to get all questions
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get "getquestions" questions' });
  }
};
//  this is to generate only 10 questions
// Controller function to get ten random questions without repetition
// Helper function to generate an array of unique random indices
// Controller function to get ten random questions without repetition
// exports.getTenRandomQuestions = async (req, res) => {
//   try {
//     const count = await Question.estimatedDocumentCount();
//     console.log(count);
//     const randomIndices = getRandomIndices(count, 10);
//     const questions = await Question.find().skip(randomIndices[0] - 1).limit(10);

//     res.json(questions);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to get ten random questions' });
//   }
// };

// // Helper function to generate an array of unique random indices
// const getRandomIndices = (maxRange, count) => {
//   const indices = new Set();
//   while (indices.size < count) {
//     const randomIndex = Math.floor(Math.random() * maxRange);
//     indices.add(randomIndex);
//   }
//   return Array.from(indices);
// };
exports.getTenRandomQuestions = async (req, res) => {
  try {
    const questionsCount = await Question.countDocuments();
    const allQuestions = await Question.find();
    const randomIndices = getRandomIndices(questionsCount, 10);
    const questions = randomIndices.map(index => allQuestions[index]);

    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get ten random questions' });
  }
};

const getRandomIndices = (maxRange, count) => {
  const indices = new Set();
  while (indices.size < count) {
    const randomIndex = Math.floor(Math.random() * maxRange);
    indices.add(randomIndex);
  }
  return Array.from(indices);
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
    res.status(500).json({ error: 'Failed to get " by id" question' });
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
  
