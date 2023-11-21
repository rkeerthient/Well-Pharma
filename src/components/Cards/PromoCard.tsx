import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import { Image } from "@yext/pages/components";
import Ce_promotion from "../../types/promotion";
import { LexicalRichText } from "@yext/react-components";

const PromoCard = (props: CardProps<Ce_promotion>): JSX.Element => {
  const { result } = props;
  const { name } = result;
  const { primaryPhoto, richTextDescriptionV2, c_primaryCTA } = result.rawData;

  return (
    <div className="w-full my-4 border bg-[#ceebf6] p-6">
      <div className=" space-y-4  flex flex-row justify-between  items-center text-3xl">
        <div className="px-2 w-1/2 flex justify-center text-[#004c6b]">
          <div className="w-3/4 space-y-8">
            <div className="text-5xl">{name}</div>
            <div>
              <LexicalRichText
                serializedAST={JSON.stringify(richTextDescriptionV2.json)}
              />
            </div>
            {c_primaryCTA && (
              <div className="border-2 bg-[#004c6b] text-lg text-white px-4 py-2 rounded-full w-fit uppercase">
                <a href={c_primaryCTA.link}>{c_primaryCTA.label} </a>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/2 ">
          {primaryPhoto && (
            <Image image={primaryPhoto} className="h-auto w-28"></Image>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromoCard;
