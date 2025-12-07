import * as React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"

const slider = [
  {
    id: 1,
    image : "/slide-1.png"
  },
  {
    id: 2,
    image : "/slide-2.png"
  },
  {
    id: 3,
    image : "/slide-3.png"
  },
]

export function CarouselHero() {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {slider.map((e) => (
          <CarouselItem key={e.id}>
            <div className="max-h-2/4">
              <Card>
                <CardContent>
              <div className="relative w-full h-[180px] sm:h-[250px] md:h-[350px] lg:h-[450px] rounded-xl overflow-hidden">
                    <Image 
                  src={e.image}
                  alt={e.image}
                  fill
                  priority
                  className="object-cover"
                  />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious  className="hidden"/>
      <CarouselNext className="hidden" /> */}
    </Carousel>
  )
}
