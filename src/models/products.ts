import { dbQuery, dbQueryFirst } from "../services/db"

export type Product = {
    id: number;
    name: string;
    price: number;
}

const insertProduct = async (product: Product) => {
     await dbQuery('Insert INTO product (name, price) VALUES(?, ?) ', [product.name, product.price])
     let retorno = await dbQuery(`SELECT seq AS id from sqlite_sequence WHERE name = 'product'`)
     return getProduct(retorno[0].id);

}

const updateProduct = async (product: Product) => {
    await dbQuery(`UPDATE product SET name = ?, price = ? WHERE id = ? `, [product.name, product.price, product.id])
    return getProduct(product.id);
}

const listProducts = async () => {
    const retorno = await dbQuery(`SELECT * FROM product`)
    return retorno as Product[];
}

const getProduct = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM product WHERE id = ?`, [id])
    return retorno as Product;
}

const deleteProduct = async (id: number) => {
    const retorno = await dbQueryFirst(`DELETE FROM product WHERE id = ?`, [id])
    return retorno as Product | undefined;
}


export const productModel = {
    insertProduct,
    listProducts,
    getProduct,
    deleteProduct,
    updateProduct
}