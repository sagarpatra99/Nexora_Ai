import productModel from "../models/product.model.js";

export const postProductController = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const createdBy = req.user.id;

    const {
      title,
      description,
      price,
      category,
      brand,
      stock,
      images,
      tags,
      // isFeatured,
      // isActive,
    } = req.validatedData;

    const product = await productModel.create({
      title,
      description,
      price,
      category,
      brand,
      stock,
      images,
      tags,
      createdBy, // ✅ important
      isFeatured: req.validatedData.isFeatured ?? false,
      isActive: req.validatedData.isActive ?? true,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Post Product error:", error);

    res.status(500).json({
      success: false,
      message: "Post Product failed",
      error: error.message,
    });
  }
};

export const getProductsController = async (req, res) => {
  try {
    // 🔹 Query params
    const {
      page = 1,
      limit = 10,
      search,
      category,
      minPrice,
      maxPrice,
      sort,
    } = req.query;

    const query = {};

    // 🔍 Search (text index)
    if (search) {
      query.$text = { $search: search };
    }

    // 🏷️ Category filter
    if (category) {
      query.category = category;
    }

    // 💰 Price filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // 🔢 Pagination
    const skip = (Number(page) - 1) * Number(limit);

    // 🔽 Sorting
    let sortOption = {};
    if (sort === "price_asc") sortOption.price = 1;
    if (sort === "price_desc") sortOption.price = -1;
    if (sort === "newest") sortOption.createdAt = -1;

    // 📦 Fetch products
    const products = await productModel
      .find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await productModel.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    console.error("Get Products error:", error);

    res.status(500).json({
      success: false,
      message: "Get Products failed",
      error: error.message,
    });
  }
};
