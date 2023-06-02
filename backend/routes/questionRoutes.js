const express = require('express');
const Questioncontroller =require('../controllers/Questioncontroller')

const router = express.Router();

// Question routes
router.get('/questions', Questioncontroller.getQuestions);
router.get('/questions/random', Questioncontroller.getRandomQuestion);
router.get('/questions/onlyten', Questioncontroller.getTenRandomQuestions);
router.get('/questions/category/:category', Questioncontroller.getQuestionsByCategory);
router.get('/questions/:id', Questioncontroller.getQuestionById);
router.post('/questions', Questioncontroller.addQuestion);
router.put('/questions/:id', Questioncontroller.updateQuestion);
router.delete('/questions/:id', Questioncontroller.deleteQuestion);



module.exports = router;
