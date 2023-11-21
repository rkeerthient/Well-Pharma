import { Image } from "@yext/pages/components";
import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import Product from "../../types/products";
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
    setRandRating(Math.floor(Math.random() * (max - min + 1) + min));
  }

  useEffect(() => {
    randomIntFromInterval(1, 5);
  }, []);
  return (
    <div className="  bg-white p-4 flex flex-col gap-y-8 h-full">
      <div className="flex flex-col justify-between  gap-y-6">
        <div>
          {primaryPhoto ? (
            <Image
              image={primaryPhoto}
              className="!h-[283px] !w-[233px] mx-auto"
            ></Image>
          ) : (
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Femfprotectionaustralia.com.au%2Fwp-content%2Fuploads%2F2015%2F07%2Fplaceholder-product.jpg&f=1&nofb=1&ipt=a9e4d6696ca75f1a86e4956ffe79955d42cd8e7777f0d0d7953c31031fc266b2&ipo=images"
              className="!h-[283px] !w-[233px] mx-auto"
              alt=""
            />
          )}
        </div>
        <div className="flex flex-col justify-between gap-4">
          <div className="flex flex-col">
            <div className="font-medium h-12 text-[#014c6b] text-sm">
              {name}
            </div>
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
          <div className="flex flex-col font-semibold justify-center items-center gap-4">
            <div className="flex justify-between w-full gap-4">
              <div className="w-full items-center flex justify-between text-[#014c6b] rounded-full   border-[#014c6b] border p-3 px-2">
                <div className="hover:cursor-pointer">-</div>
                <div>1</div>
                <div className="hover:cursor-pointer">+</div>
              </div>
            </div>
            <div className="w-full  items-center p-4 rounded-full text-white bg-[#014c6b] border flex justify-center text-center mx-auto uppercase font-semibold text-xs">
              Add to cart
            </div>
            <a
              href={landingPageUrl}
              className="w-full  items-center p-4 rounded-full text-white bg-[#014c6b] border flex justify-center text-center mx-auto uppercase font-semibold text-xs"
            >
              View Product
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
