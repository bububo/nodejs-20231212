const Category = require('../models/Category');
const mapCategory = require('../mappers/category');
module.exports.categoryList = async function categoryList(ctx, next) {
  let foundList = [];
  await Category.find({}, (err, docs) => {
    if (err) {
      console.log(err);
      ctx.status = 500;
      ctx.body = {
        message: 'internal error',
      };
      return;
    } else {
      foundList = docs;
    }
  }).clone().catch((err) =>{
    console.log(err);
  });
  ctx.body = {categories: foundList.map(mapCategory)};
};
