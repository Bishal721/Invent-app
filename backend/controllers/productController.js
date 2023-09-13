const asyncHandler = require("express-async-handler");
const { Product } = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;

const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, quantity, price, description } = req.body;

  // Validation
  if (!name || !category || !quantity || !price || !description) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  // handle file upload
  let fileData = {};
  if (req.file) {
    // save in cloudinary
    let uploadImage;
    try {
      uploadImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "Inventory Management",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadImage.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Create products
  const product = await Product.create({
    user: req.user.id,
    name,
    sku,
    category,
    quantity,
    price,
    description,
    image: fileData,
  });

  res.status(201).json(product);
});
// get all products
const getallProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(products);
});

// get single product
const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }
  res.status(200).json(product);
});

// Delete a product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

  await product.deleteOne();
  res.status(200).json({ message: "Product deleted." });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, category, quantity, price, description } = req.body;
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

  // handle file upload
  let fileData = {};
  if (req.file) {
    // save in cloudinary
    let uploadImage;
    try {
      uploadImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "Inventory Management",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadImage.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // update products
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      name,
      category,
      quantity,
      price,
      description,
      image: Object.keys(fileData).length === 0 ? product.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(202).json(updatedProduct);
});

module.exports = {
  createProduct,
  getallProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
