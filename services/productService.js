const { faker } = require("@faker-js/faker");

class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl()
      })
    }
  }


  create(product = {}) {
    const newProduct = {
      id: faker.string.uuid(),
      name: product.name,
      price: parseInt(product.price),
      image: product.image
    }

    this.products.push(newProduct);

    return newProduct;
  }


  find(filter = {}) {
    return this.products.slice(
      filter.offset | 0,
      filter.limit ? parseInt(filter.limit) + parseInt((filter.offset | 0))
    : undefined)
  }


  findOne(id) {
    return this.products.find(item => item.id === id);
  }


  update(id, changes = {}) {
    const product = this.products.find((obj) => obj.id === id);
    const index = this.products.findIndex((obj) => obj.id === id);

    if (product) {
      this.products[index] = {
        id: product.id,
        name: changes.name || product.name,
        price: changes.price || product.price,
        image: changes.image || product.image
      };

      return product;
    }

  }


  delete(id) {
    const product = {
      ...this.products.find((prod) => prod)
    };

    if (product) {
      this.products = this.products.filter((p) => p.id !== id);
      return product;
    }

  }

}

module.exports =  ProductsService;
