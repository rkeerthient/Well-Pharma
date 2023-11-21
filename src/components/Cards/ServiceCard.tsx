import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import Ce_service from "../../types/service";
import RTF from "../RTF";

const ServiceCard = (props: CardProps<Ce_service>): JSX.Element => {
  const { result } = props;
  const { name } = result;
  const { landingPageUrl, richTextDescription, c_primaryCTA, c_secondaryCTA } =
    result.rawData;

  return (
    <div className="w-full my-4 border p-4 bg-white">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-2  w-3/5">
          <div className="text-xl text-[#014c6b] font-medium">{name}</div>
          {richTextDescription && (
            <div>
              <RTF>{richTextDescription}</RTF>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center my-auto gap-4">
          {c_primaryCTA && (
            <a
              href={c_primaryCTA.link}
              className="w-full items-center p-4 rounded-full text-white bg-[#014c6b] border flex justify-center text-center mx-auto uppercase font-semibold text-xs"
            >
              {c_primaryCTA.label}
            </a>
          )}
          {c_secondaryCTA && (
            <a
              href={c_secondaryCTA.link}
              className="w-full  items-center p-4 rounded-full text-white bg-[#014c6b] border flex justify-center text-center mx-auto uppercase font-semibold text-xs"
            >
              {c_secondaryCTA.label}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
