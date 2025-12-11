/* eslint-disable @typescript-eslint/no-explicit-any */
import getAllProducts from "@/lib/getAllProducts";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await getAllProducts(); // Server Component fetching data

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6">📦 Product Management</h1>
      
      {/* Display products in a table or grid */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Product List</h2>
        <ul>
          {products.map((product: any) => (
            <li key={product.id} className="border-b py-2 flex justify-between">
              <span>{product.name}</span>
              <span className="font-medium">Stock: {product.stock}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Other components like Add Product button, search, filters */}
    </div>
  );
}