export default async function getAllProducts() {
    const response = await fetch('https://fakestoreapi.com/products'); 

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch products: Status ${response.status}. Response: ${errorText.substring(0, 100)}...`);
    }

    return response.json();
}