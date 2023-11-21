import { Image } from "@yext/pages/components";
import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import Product from "../../types/products";
import NicotineLevel from "./nicotineLevel";
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";

const ProductCard = (props: CardProps<Product>) => {
  const { result } = props;
  const { name } = result;
  const { slug, primaryPhoto, price, bundle, landingPageUrl } = result.rawData;
  const [subscr, setSubr] = useState(0);
  const [randRating, setRandRating] = useState(0);
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  function randomIntFromInterval(min: number, max: number) {
    // min and max included
    setRandRating(Math.floor(Math.random() * (max - min + 1) + min));
  }

  useEffect(() => {
    randomIntFromInterval(1, 5);
  }, []);
  return (
    <div className="  bg-white p-4 flex flex-col gap-y-8 h-full">
      <div className="flex flex-col justify-between  gap-y-6">
        <div>
          {primaryPhoto && (
            <Image
              image={primaryPhoto}
              className="!h-[283px] !w-[233px] mx-auto"
            ></Image>
          )}
        </div>
        <div className="flex flex-col justify-between gap-4">
          <div className="flex flex-col">
            <div className="font-medium h-8 text-[#014c6b] text-sm">{name}</div>
          </div>
          <div className=" flex gap-2 items-center text-xs">
            <div className="flex">
              {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                  key={rating}
                  className={classNames(
                    randRating > rating
                      ? "bg-[#014c6b] text-white"
                      : "bg-[#dcdce6] text-white",
                    "h-4 w-4 flex-shrink-0 border"
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>
            <div className="text-[#014c6b] text-base">
              {randRating} Review(s)
            </div>
          </div>
          <div className="text-[#014c6b] font-medium text-lg">
            £{price?.value}
          </div>
          <div className="flex flex-col gap-3  font-semibold justify-center items-center">
            <div className="flex justify-between text-[#014c6b] rounded-full w-full border-[#014c6b] border p-1 px-2">
              <div>-</div>
              <div>1</div>
              <div>+</div>
            </div>
            <div className="w-full  items-center p-4 rounded-full text-white bg-[#014c6b] border flex justify-center text-center mx-auto uppercase font-semibold text-xs">
              Add to basket
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
