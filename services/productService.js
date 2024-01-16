const Category = require("../Model/categoryModel");
const Product = require("../Model/productModel");

//     Creating Product
const createProduct = async (reqData) => {
  try {
    // let topLevel = await Category.findOne({ name: reqData.topLevel });
    // if (!topLevel) {
    //   topLevel = new Category({
    //     name: reqData.topLevel,
    //     level: 1,
    //   });
    // }

    // let secondLevel = await Category.findOne({
    //   name: reqData.secondLevel,
    //   parentCategory: topLevel._id,
    // });

    // if (!secondLevel) {
    //   secondLevel = new Category({
    //     name: reqData.secondLevel,
    //     parentCategory: topLevel._id,
    //     level: 2,
    //   });
    // }

    // let thirdLevel = await Category.findOne({
    //   name: reqData.thirdLevel,
    //   parentCategory: secondLevel._id,
    // });
    // if (!thirdLevel) {
    //   thirdLevel = new Category({
    //     name: reqData.thirdLevel,
    //     parentCategory: secondLevel._id,
    //     level: 3,
    //   });
    // }

    const product = new Product({
      title: reqData.title,
      description: reqData.description,
      price: reqData.price,
      discountPrice: reqData.discountPrice,
      discountPercent: +reqData.discountPercent,
      sizes: reqData.sizes,
      brand: reqData.brand,
      color: reqData.color,
      imageUrl: reqData.imageUrl,
      category: reqData.category,
    });

    await product.save();
    return "Product Created Successfully";
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

const deleteProduct = async (productId) => {
  // console.log(productId);
  const product = await Product.findByIdAndDelete(productId);
  // console.log(product);
  if (!product) {
    throw new Error("Product not found");
  }
};

const updateProduct = async (productId, reqData) => {
  try {
    const product = await Product.findByIdAndUpdate(productId, reqData, {
      new: true,
    });

    return product;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getProductsAll = async (reqQuery) => {
  try {
    const { colors, sizes, minPrice, maxPrice, sort, stock } = reqQuery;
    // console.log(reqQuery);
    // Limiting how many product show on each page
    let pageSize = reqQuery.pageSize || 10;
    let pageNumber = reqQuery.pageNumber || 1;

    let query = Product.find({
      "category.name": reqQuery.category,
      // " category.level": 3,
    });
    // console.log(query);
    //               FOR CATEGORY
    // if (category) {
    //   const existCategories = await Category.findOne({ name: category });

    //   if (existCategories) {
    //     query = query.where("category").equals(existCategories._id);
    //   } else {
    //     return { content: [], currentPage: 1, totalPages: 0 };
    //   }
    // }

    // Color
    if (colors) {
      // console.log(colors);
      //  making unique array
      const colorSet = new Set(
        colors.split(",").map((colors) => colors.trim().toLowerCase())
      );
      // console.log(colorSet);
      // if any colors matches with product colors then match and return product
      const colorRegex =
        //    RegExp convert into regular expression
        colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;

      //  updating query
      //  applies the regular expression we created earlier to the "color" field,
      query = query.where("color").regex(colorRegex);
    }
    // // Now for size
    if (sizes) {
      const sizeSet = new Set(sizes);
      console.log(sizeSet);
      //    Modify the query to include only items where the 'sizes.name' field matches any of the values in the sizeSet
      query = query.find({ "sizes.name": sizes });
    }

    // //   minprice and maxPrice
    if (minPrice && maxPrice) {
      // console.log(minPrice);
      query = query.find({ price: { $gte: minPrice, $lte: maxPrice } });
      // query = query.where("price").gte(+minPrice).lte(+maxPrice);
    }
    if (minPrice && !maxPrice) {
      query = query.where("price").gte(+minPrice);
    }
    if (maxPrice && !minPrice) {
      query = query.where("price").lte(+maxPrice);
    }

    // //   For Discount
    // // if (minDiscount) {
    // //   query = query.where("discountPrice").gte(minDiscount);
    // // }
    // // if (maxDiscount) {
    // //   query = query.where("discountPrice").gte(maxDiscount);
    // // }

    // //  For Stcok
    if (stock) {
      if (stock === "in_stock") {
        query = query.where("quantity").gt(0);
      } else if (stock === "out_of_stock") {
        query = query.where("quantity").lte(0);
      }
    }

    // //  For Sorting
    if (sort) {
      if (sort === "price_high_to_low") {
        query = query.sort("-price");
      } else if (sort === "price_low_to_high") {
        query = query.sort("price");
      }
    }

    const totalProducts = await Product.countDocuments(query);
    // console.log("Documents" + totalProducts);
    // // skip
    // // on 1 page  0-10
    const skip = +pageNumber * +pageSize;
    // console.log("Skip" + skip);
    // // if (skip < 0) skip = 5;
    query = query.skip(skip).limit(+pageSize);

    // // Now executing query at last
    const products = await query.exec();
    // console.log(products);
    const totalPages = Math.ceil(totalProducts / +pageSize);

    return {
      content: products,
      currentPage: +pageNumber + 1,
      totalPages,
      totalProducts,
    };
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const findProductById = async (productId) => {
  const product = await Product.findById(productId);

  return product;
};

//     For Uploading Multiple Products  at start
const createMultipleProduct = async (products) => {
  for (product of products) {
    // console.log(product);
    await createProduct(product);
  }
};
const productSerice = {
  createProduct,
  deleteProduct,
  updateProduct,
  getProductsAll,
  findProductById,
  createMultipleProduct,
};

module.exports = productSerice;
