const fs = require('fs');
const createError = require('http-errors');

module.exports = class ProductsServices {
  constructor(ProductModel) {
    this.Product = ProductModel;
    this.getCategory = this.getCategory.bind(this);
  }

  async getCategory(page, productsPerReq, category, {type, color, brand, gender}) {

    let skip = page === 1 ? 0 : (page - 1) * productsPerReq;
    let products;

    let sortBy = category === 'topsellers' ? {purchaseCount: -1}
      : category === 'newdesigns' ? {uploadDate: -1}
      : {};

    let  getQuery = () => {
        return category === 'tshirts'?  {type: 'tshirt'} 
        : category === 'sweaters' ? {type: 'sweater'}
        : category === 'shirts' ? {type: 'shirt'}
        : category === 'children' ? {category: 'kids'}
        : category === 'holidays' ? {category: 'holiday'}
        : category === 'animals' ? {category: 'animals'}
        : {};
      }

    let query = getQuery();
      
    if(brand) {
      query.brand = brand;
    } 
    if(type) {
      query.type = type;
    } 
    if(color) {
      query['$or'] = [{'variants.male.color': color}, {'variants.female.color': color}];
    }
    if(gender) {
      query[`variants.${gender}.0`] = { '$exists': true };
    }

    try{
      products = await this.Product.find(query, null, {sort: sortBy, skip, limit: productsPerReq}).exec();
      let count = await this.Product.find(query).countDocuments();
      // adds ../ to each photo path
      const mproducts = this._fixPath(products);
      return {
        products: mproducts,
        count,
      };
    } catch(err) {
      if(err.driver) {
        return createError(500, 'Database is down')
      } else {
        return createError(404, err.message);
      }
    }
  }


  async addItemToCart(id) {}

  async findItem(id) {
    const item = await this.Product.findOne({ id });

    if(item === null) return createError(404, 'not a valid id');
    return item;
  }

  async getSimilarItems(categories, currentProductId, skip, brand) {
    
    let limit = 5
    let skipNumber = skip * limit;
    
    categories = categories.filter((current)=> { 
      return (current !== 'funny' && current!== 'novelty');
    })
    let products = await this.Product.find({$and: [{category: {$in: categories}}, {id: {$not: {$eq: currentProductId}}}]}, null, {sort: {purchaseCount: -1}, limit, skip: skipNumber});
    
    if(!products.length) {
      products = await this.Product.find({$and: [{ brand: brand }, {id: {$not: {$eq: currentProductId}}}]}, null, {sort: {purchaseCount: -1}, limit, skip: skipNumber});
    }
    return products
  }

  _fixPath(products) { // eslint-disable-line
    const mproducts = products.map((element) => {
      /* element is of Model type and can't be copied/cloned. toObject() will solve the problem */
      const elementObject = element.toObject();
      elementObject.photo = `./${element.photo}`;
      return elementObject;
    });
    return mproducts;
  }
};
