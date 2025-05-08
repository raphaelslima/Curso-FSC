// const { createProduct, Product } = require("./product.js");

import productPrice, { createProduct, Product } from "./product.js";

const product1 = createProduct(1, "Product 1", 10.99);
const product2 = new Product(2, "p2", 20.0);

console.log(product1.getInfoProduct());
console.log(product2.getInfoProduct());
console.log(productPrice);
