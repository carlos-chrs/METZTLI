import { PersistentUnorderedMap, context, PersistentMap, u128 } from "near-sdk-as";
 @nearBindgen
export class Product{
    // Atributos 
    id: string;
    name: string;
    description: string;
    image: string;
    price: string;
    owner:string;
    public static fromPayload(payload: Product): Product {
        const product = new Product(); //Nuevo producto
        //cargar los valores al producto
        product.id=payload.id;
        product.name=payload.name;
        product.description=payload.description;
        product.image=payload.image;
        product.price=payload.price;
        product.owner = context.sender;
        //devolver el producto
        return product;
    }
}
@nearBindgen
export class Client { //clase Cliente 
    //Attributos 
    id:string;
    user: string;
    address: string;

    // metodo para cargar los valores 
    public  static loadClient(loadClient: Client): Client{
        let client=new Client();
        client.id=loadClient.id;
        client.user=loadClient.user;
        client.address=loadClient.address;
        //Devolver un objeto cliente 
        return client;
    }
}


// export const productsStorage = new PersistentUnorderedMap<string, Product>("LISTED_PRODUCTS");

// export const clientsStorage = new PersistentUnorderedMap<string, Client>("LISTED_CLIENTS");
