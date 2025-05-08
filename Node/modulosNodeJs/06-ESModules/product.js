export class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
  getName() {
    return this.name;
  }
  getPrice() {
    return this.price;
  }

  getInfoProduct() {
    return `ID: ${this.id}, Name: ${this.name}, Preço: ${this.price}`;
  }
}

export function createProduct(id, name, price) {
  return new Product(id, name, price);
}

const productPrice = 200;

export default productPrice;

// module.exports = {
//   createProduct,
//   Product,
// };
