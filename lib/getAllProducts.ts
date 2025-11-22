export default async function getAllProducts() {
    const result = await fetch("https://fakestoreapi.com/products")
    return result.json();
}
