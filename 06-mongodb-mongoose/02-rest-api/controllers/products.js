const Product = require('../models/Product');
const mapProduct = require('../mappers/product');


module.exports.products = async function products(ctx, next) {
  const {subcategory} = ctx.query;

  const findQuery = {
    ...(subcategory ? {subcategory} : {}),
  };

  let foundProducts = [];
  await Product.find(findQuery, (err, docs) => {
    if (err) {
      console.log(err);
      ctx.status = 400;
      ctx.body = {
        message: 'invalid subcategory',
      };
      return;
    } else {
      foundProducts = docs;
    }
  }).clone().catch((err) =>{
    console.log(err);
  });
  ctx.body = {products: foundProducts.map(mapProduct)};
};


module.exports.productById = async function productById(ctx, next) {
  const {id} = ctx.params;


  if (!id) {
    ctx.status = 400;
    ctx.body = {
      message: 'no product id',
    };
    return;
  }

  let foundProduct;
  try {
    foundProduct = await Product.findById(id);
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      message: 'invalid id',
    };
    return;
  }
  if (!foundProduct) {
    ctx.status = 404;
    ctx.body = {
      message: 'not found',
    };
    return;
  }


  ctx.body = {product: mapProduct(foundProduct)};
};

