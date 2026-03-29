const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  createItem,
  getItems,
  getItemById,
  deleteItem
} = require('../../controllers/items/itemController');
const { protect } = require('../../middleware/auth');

const { storage } = require('../../config/cloudinary');

const upload = multer({ storage: storage });

// Routes
router.route('/')
  .post(protect, upload.single('image'), createItem)
  .get(getItems);

router.route('/:id')
  .get(getItemById)
  .delete(deleteItem);

module.exports = router;
