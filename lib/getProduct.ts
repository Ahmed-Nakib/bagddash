
export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export default async function getProduct(id: string): Promise<Product> {
    const result = await fetch(`https://fakestoreapi.com/products/${id}`, {
        next: { revalidate: 60 }, 
    });

    if (!result.ok) {
        throw new Error('Failed to fetch product details');
    }

    return result.json();
}