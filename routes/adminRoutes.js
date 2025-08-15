const AdminController = require('../controllers/adminController');
const upload = require('../utils/multer');
const express = require('express');
const router = express.Router();


router.post('/laptops', upload.array('images', 5), AdminController.addLaptop);


// router.put('/laptops/:id', AdminController.updateLaptop);


// router.delete('/laptops/:id', AdminController.deleteLaptop);


// router.get('/orders', AdminController.getOrders);

module.exports = router;