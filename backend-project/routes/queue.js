const express = require('express');
const router = express.Router();
const { addQueue, listQueue, serveQueue } = require('../controller/queueController')

// router post method add queue function
router.post('/addOrder', (request, response) => {
    addQueue(request.body).then(
        resultFromController => response.send(resultFromController),
    );
})

router.get('/list', (request, response) => {
    listQueue().then(
        resultFromController => response.send(resultFromController),
    );
})

router.put(`/serve/:serveId`, (request, response) => {
    serveQueue(request.params.serveId, request.body).then(
        resultFromController => response.send(resultFromController),
    );
})



module.exports = router;