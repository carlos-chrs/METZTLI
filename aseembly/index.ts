import {u128, logging, PersistentUnorderedMap} from "near-sdk-as";
import {saveProduct, Product, saveUser, User, saveClient, Client} from "./model"


//METHOD TO SAVE PRODUCTS
export function setProduct(name : String, description : String, price : number):
 Product {
    //Creating a instance of product
    const prod = new Product(name, description, price);
    //Saving the product
    saveProduct.push(prod);
    //Message
    logging.log("PRODUCTO GUARDADO EXITOSAMENTE!");
    return prod;
}


//METHOD TO SHOW THE PRODUCTS
export function getAllProducts(): Product[] {
    const bd = new Array<Product>(saveProduct.length);
    for(let i = 0; i <saveProduct.length; i++) {
        bd[i] = saveProduct[i];
         
        logging.log(`Product: ${i}`);
    }
    return bd;
}


//Method to delete a Product
export function deleteProduct(productPosition : i32): bool{
    if(saveProduct.length < productPosition) {
        logging.log('El Producto no existe');
        return false;
    }
    //Deleting a product by position
    saveProduct.swap_remove(productPosition);
    logging.log('Producto eliminado con exito!');
    return true;
}


//METHOD TO GET THE TOTAL OF PRODUCTS
export function getProductsSize(): number {
    return saveProduct.length;
}