import { Image } from "@yext/pages/components";
import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import Product from "../../types/products";
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";

const ProductCard = (props: CardProps<Product>) => {
  const { result } = props;
  const { name } = result;
  const {
    slug,
    primaryPhoto,
    price,
    bundle,
    landingPageUrl,
    c_discount,
    c_newPrice,
    c_type,
  } = result.rawData;
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
    <div className=" border  bg-white p-4 flex flex-col  h-full">
      <div className="flex flex-col gap-y-2 ">
        <div
          className={`flex gap-3 ${
            c_type || c_discount ? `visible` : `invisible`
          }`}
        >
          {!(c_type || c_discount) && (
            <div>
              <img
                src="https://well.co.uk/content/stencil_theme_images/productlabel/notice_pmed.svg"
                className="w-1/2 h-auto"
                alt=""
              />
            </div>
          )}
          {c_type && (
            <img
              src="https://well.co.uk/content/stencil_theme_images/productlabel/notice_pmed.svg"
              className="w-1/2 h-auto"
              alt=""
            />
          )}
          {c_discount && (
            <p className="flex items-center border text-sm w-fit bg-yellow-400 px-3 py-1 font-medium rounded-full">
              Sale - {c_discount}%
            </p>
          )}
        </div>

        <div className="h-[250px] w-[250px]">
          {primaryPhoto ? (
            <Image
              image={primaryPhoto}
              className="!h-full max-w-full mx-auto p-4"
            ></Image>
          ) : (
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Femfprotectionaustralia.com.au%2Fwp-content%2Fuploads%2F2015%2F07%2Fplaceholder-product.jpg&f=1&nofb=1&ipt=a9e4d6696ca75f1a86e4956ffe79955d42cd8e7777f0d0d7953c31031fc266b2&ipo=images"
              className="!h-full max-w-full mx-auto p-4"
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
            <span
              className={`${c_discount && `text-[#d1dfe4] line-through mr-4`}`}
            >
              £{price?.value}
            </span>
            {c_discount && `£${c_newPrice?.value}`}
          </div>
          <div className="flex flex-col font-semibold justify-center items-center gap-4">
            <div className="flex justify-between w-full gap-4">
              <div className=" w-1/2 items-center flex justify-between text-[#014c6b] rounded-full   border-[#014c6b] border p-3 px-2">
                <div className="hover:cursor-pointer">-</div>
                <div>1</div>
                <div className="hover:cursor-pointer">+</div>
              </div>
              <div className="  w-1/2 items-center p-4 rounded-full text-white bg-[#014c6b] border flex justify-center text-center mx-auto uppercase font-semibold text-xs">
                Add to cart
              </div>
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
