const fs = require("fs");
fs.writeFileSync("./productos.json", "[]") //El producto se reinicia al ejecutar

class ProductManager{
    constructor(){
        this.path = "./productos.json"
        if(!fs.readFileSync(this.path, "utf-8")){
            fs.writeFileSync(this.path, "[]")
        }
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"))
    };

    addProduct(newProd){
        let check = this.products.some((product) => product.code === newProd.code);
        if(!newProd.title || !newProd.description || !newProd.price || !newProd.thumbnail || !newProd.code || !newProd.stock ){
            console.log("Por favor completar los detalles del producto");
        }
        else if(check){
            console.log("Este producto ya se encuentra en la lista");
        }
        else{
            let listLength = this.products.length;
            if(listLength === 0){
                newProd.id = 1
            }
            else{
                newProd.id = this.products[listLength - 1].id + 1;
            }
            this.products.push(newProd);
            fs.writeFileSync(this.path, JSON.stringify(this.products))
        };
    }
        



    async getProducts(){
        try {
            return this.products;
        } catch (error) {
            throw new Error("No fue posible conseguir el producto")
        }
    };

    async getProductById(id){
        try {
            let product = this.products.find((p) => p.id === id);
            if(!product){
                throw new Error("El producto no existe")
            }
            else{
                return product;
            };
        } catch (error) {
            throw new Error("No fue posible conseguir el producto")
        }
    };

    updateProduct(prodId, updatedProd){
        let oldProd = this.products.map(p => p.id).indexOf(prodId)
        this.products[oldProd] = {...this.products[oldProd], ...updatedProd};

        fs.writeFileSync(this.path, JSON.stringify(this.products));
    };

    deleteProduct(prodId){
        let prod = this.products.map(p => p.id).indexOf(prodId);
        this.products.splice(prod, 1)
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }
};

const prodManager = new ProductManager();
console.log("Lista vacía:")
console.log(prodManager.getProducts())

const product1 = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail:"Sin imagen",
    code: "abc123",
    stock: 25,
};

prodManager.addProduct(product1);

const product2 = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail:"Sin imagen",
    code: "abc124",
    stock: 25,
};

prodManager.addProduct(product2);


console.log("Primera lista:")
console.log(prodManager.getProducts())



const updateProd = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail:"Sin imagen",
    code: "abc126",
    stock: 25,
};

console.log("Producto separado por ID:")
console.log(prodManager.getProductById(2));



console.log("Lista con item actualizado:")
prodManager.updateProduct(2, updateProd);
console.log(prodManager.getProducts())


console.log("Lista con item eliminado:")
prodManager.deleteProduct(1)
console.log(prodManager.products)


