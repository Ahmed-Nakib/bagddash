
export default async function getAllProducts() {
    const response = await fetch('https://fakestoreapi.com/products', {
        headers: {
            // এটি যোগ করলে অনেক সার্ভার রিকোয়েস্টকে বৈধ মনে করে
            'User-Agent': 'Mozilla/5.0 (compatible; Next.js-SSR/1.0)', 
            // যদি API Key প্রয়োজন হয়:
            // 'Authorization': `Bearer ${process.env.YOUR_API_KEY}`,
        },
        // অপশনাল: সার্ভারে ক্যাশ না করতে চাইলে (Not Recommended for build)
        // cache: 'no-store'
    }); 

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch products: Status ${response.status}. Response: ${errorText.substring(0, 100)}...`);
    }

    return response.json();
}