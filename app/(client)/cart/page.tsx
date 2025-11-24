"use client";
import Image from "next/image";

interface CartItem {
  _id: string;
  title: string;
  subtitle: string;
  price: number;
  quantity: number;
  image: string;
}

const demoCartItems: CartItem[] = [
  {
    _id: "1",
    title: "Classic Red Shirt",
    subtitle: "Comfortable cotton t-shirt",
    price: 29.99,
    quantity: 2,
    image: "/images/shirt-red.png", // replace with your demo image
  },
  {
    _id: "2",
    title: "Blue Jeans",
    subtitle: "Slim fit denim",
    price: 49.99,
    quantity: 1,
    image: "/images/jeans-blue.png",
  },
  {
    _id: "3",
    title: "Sneakers",
    subtitle: "Stylish running shoes",
    price: 79.99,
    quantity: 1,
    image: "/images/sneakers.png",
  },
];

function CartListStatic() {
  const totalPrice = demoCartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-white">
        {demoCartItems.map((item) => (
          <div
            key={item._id}
            className="bg-[#F5F5F5] p-4 rounded-xl shadow-lg flex flex-col"
          >
            {/* Image */}
            <div className="relative w-full aspect-square h-auto max-h-64 mb-4">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-contain rounded-lg"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-1 mb-4">
              <p className="text-base font-semibold text-[#111111] line-clamp-2 min-h-[2.5rem]">
                {item.title}
              </p>
              <p className="text-base text-[#666666] line-clamp-2 min-h-[2.5rem]">
                {item.subtitle}
              </p>
              <p className="text-xl font-bold text-[#CC071E]">
                ${item.price.toFixed(2)}
              </p>
              <p className="text-sm text-[#666666]">Quantity: {item.quantity}</p>
            </div>

            {/* Buttons */}
            <div className="grid gap-2 mt-auto">
              <button className="w-full bg-[#CC071E] text-white px-4 py-2 rounded-md hover:bg-[#990514] transition">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-6 text-right">
        <p className="text-xl font-semibold text-[#111111]">
          Total: <span className="text-[#CC071E]">${totalPrice.toFixed(2)}</span>
        </p>
        <button className="mt-4 w-full sm:w-auto bg-[#CC071E] text-white px-6 py-3 rounded-md hover:bg-[#990514] transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartListStatic;
