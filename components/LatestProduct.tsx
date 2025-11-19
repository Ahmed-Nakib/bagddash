import { Button } from "@/components/ui/button";
import Image from "next/image";

function LatestProduct() {
  return (
    <div className="bg-black/50 p-4 sm:p-6 lg:p-8">

      {/* Image must include width & height or use fill */}
      <div className="relative w-full h-64">
        <Image
          src="/t-shirt.png"
          alt="Product Photo"
          fill
          className="object-contain"
        />
      </div>

      <div>
        <p className="text-sm font-medium tracking-widest text-pink-500 uppercase">
          Developer
        </p>

        <p className="text-xl font-bold text-white sm:text-2xl">
          Tony Wayne
        </p>
      </div>
      <div className="grid  gap-y-2.5 mt-2.5">
        <Button >Add Cart</Button>
        <Button >Buy Now</Button>
      </div>

    </div>
  );
}

export default LatestProduct;
