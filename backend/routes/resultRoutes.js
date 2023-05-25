const express = require('express');
const Resultcontroller = require('../controllers/Resultcontroller');

const router = express.Router();


// Result routes
router.get('/results', Resultcontroller.getResults);
router.post('/results', Resultcontroller.storeResult);
router.get('/results/top', Resultcontroller.getTopParticipants);
router.get('/results/:id', Resultcontroller.getResultById);
router.put('/results/:id', Resultcontroller.updateResult);
router.delete('/results/:id', Resultcontroller.deleteResult);

module.exports = router;
