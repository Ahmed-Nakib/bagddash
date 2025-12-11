
export default async function getAllProducts() {
    const response = await fetch('https://fakestoreapi.com/products?_limit=6', {
        headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; Next.js-SSR/1.0)', 
        },
    }); 

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch products: Status ${response.status}. Response: ${errorText.substring(0, 100)}...`);
    }

    return response.json();
}