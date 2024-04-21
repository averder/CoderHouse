const fs = require("fs");

class ProductManager {
  path = "";

  constructor(path) {
    this.path = path;
  }

  isProductDuplicate(products, product) {
    return products.some((p) => JSON.stringify(p) === JSON.stringify(product));
  }

  async addProduct(product) {
    try {
      const products = await this.getProducts();
      if (!this.isProductDuplicate(products, product)) {
        const prodWithId = { id: (await this.getMaxId()) + 1, ...product };
        products.push(prodWithId);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
      } else {
        console.log(
          "Error: The product is duplicate, please insert another product"
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    try {
      if (!fs.existsSync(this.path)) {
        return [];
      }
      const products = await fs.promises.readFile(this.path, "utf8"); // en la lectura lo tengo en formato json
      return JSON.parse(products); // lo pasa a javascript
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const product = products.find((p) => p.id.toString() === id.toString());

      if (!product) {
        console.log(`ERROR: the product with the id ${id} not exists`);
      } else {
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(prodId, prodPromise) {
    try {
      const product = await prodPromise;
      let productUpdate = await this.getProductById(prodId);
      console.log(productUpdate);
      let products = await this.getProducts();

      if (!productUpdate || !products) {
        console.log("The product has not been updated");
        return;
      }

      productUpdate.title = product.title;
      productUpdate.description = product.description;
      productUpdate.price = product.price;
      productUpdate.thumbnail = product.thumbnail;
      productUpdate.code = product.code;
      productUpdate.stock = product.stock;

      products = products.map((p) => {
        if (p.id.toString() != prodId.toString()) {
          return p;
        }
        return productUpdate;
      });

      await fs.promises.writeFile(this.path, JSON.stringify(products));
      console.log(`the product ${prodId} has been updated`);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(prodId) {
    try {
      let products = await this.getProducts();
      let prodQty = products.length;
      products = products.filter((p) => p.id.toString() != prodId.toString());

      if (products.length === prodQty) {
        console.log(`ERROR: the product with the id ${id} not exists`);
      }

      await fs.promises.writeFile(this.path, JSON.stringify(products));
    } catch (error) {
      console.log(error);
    }
  }

  async deleteFile() {
    try {
      await fs.promises.unlink(this.path);
      console.log("File was deleted");
    } catch (error) {
      console.log(error);
    }
  }

  async getMaxId() {
    const products = await this.getProducts();
    return products.length != 0 ? products[products.length - 1].id : 0;
  }
}

const prodManager = new ProductManager("./products.json");

const product1 = {
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
};

const product2 = {
  title: "Dulce de leche conaprole",
  description: "Rico y dulce",
  price: 200,
  thumbnail: "/imagen/23",
  code: "abc333",
  stock: 15,
};

const product3Update = {
  title: "Alfajor sabroso",
  description: "Sabroso",
  price: 100,
  thumbnail: "/imagen/13",
  code: "abc021",
  stock: 40,
};

const test = async () => {
  await prodManager.addProduct(product1).then((p) => console.log(p));
  await prodManager.addProduct(product1).then((p) => console.log(p));
  await prodManager.addProduct(product1).then((p) => console.log(p));
  await prodManager.addProduct(product1).then((p) => console.log(p));

  await prodManager.updateProduct(3, product3Update);
  await prodManager.deleteProduct(2);
};

/*
1,2,3,4

1,2, (updated 3), 4

1, (updated 3), 4
*/
test();
