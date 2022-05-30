 import { Product, productsStorage } from './model';
 import { Client, clientsStorage } from './model';
 import { context, ContractPromiseBatch } from "near-sdk-as";



// @Param productID: Is the ID of product that you want to buy
export function buyProduct(productId: string): void {
    const product = getProduct(productId); //Get the product
    if (product == null) { //Verifica si el producto existe
        throw new Error("Producto No Encontrado"); //Message Error
    }
    if (product.price.toString() != context.attachedDeposit.toString()) { //Verify if the Pay is correct //Verifica que el pago sea correcto.
        throw new Error("Error al procesar el pago, intenta más tarde");
    }
    //En caso de que no se presenten los errores anterioes, entonces: 
    ContractPromiseBatch.create(product.owner).transfer(context.attachedDeposit); //Transfer the Coins-Nears
    productsStorage.set(product.id, product); 
}

//Method to add a product 
//Método para añadir un producto
// @Param producto: Is a reference of the product to add
export function addProduct(product: Product): void {
    let storedProduct = productsStorage.get(product.id); //Serch the product in the Map //Buscar el producto en el mapa.
    if (storedProduct !== null) { //If is different to NULL the product is ready  //Si es diferente a NULL, el producto está listo.
        throw new Error(`El ID: ${product.id} ya existe en nuestro inventario`); //Mensaje de confirmación
    } 
    productsStorage.set(product.id, Product.fromPayload(product)); //Will add the Producto to the Map of products  //Se añadirá el producto al mapa de productos
}

// Method to get all Products
export function getAllProducts(): Array<Product> {
    return productsStorage.values(); //Return his values- in the front we will inject the values
}

// @Param ID: Is the ID of product to find
export function getProduct(id: string): Product | null {
    return productsStorage.get(id);
}


// METHOD CLIENTS
// @Param ID: Is the ID of Client to find
export function getClient(id: string): Product | null {
    return clientsStorage.get(id);
}

//Métthod to add a Client
export function addClient(client: Client): void {
    let storedClient = clientsStorage.get(client.id); //Serch the client in the Map 
    if (storedClient !== null) { //If is different to NULL the Clent is ready
        throw new Error(`El ID: ${client.id} ya existe en nuestro inventario`); //Message
    } 
    productsStorage.set(client.id,Client.loadClient(client)); //Will add the Producto to the Map of products
}
