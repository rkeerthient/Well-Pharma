import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import {
  DirectAnswer,
  ResultsCount,
  UniversalResults,
} from "@yext/search-ui-react";
import * as React from "react";
import FAQCard from "../components/Cards/FAQCard";
import ProductCard from "../components/Cards/ProductCard";
import Loader from "../components/Loader";
import BlogCard from "../components/Cards/ServiceCard";
import { useEffect } from "react";

const HomePage = () => {
  const searchActions = useSearchActions();
  const loading = useSearchState((state) => state.searchStatus.isLoading);
  const results = useSearchState((state) => state.universal.verticals) || [];
  console.log(results);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setUniversal();
    searchActions.executeUniversalQuery();
  }, []);
  const GridSection = ({ results, CardComponent, header }: any) => {
    if (!CardComponent) {
      return <div>Missing Card Component</div>;
    }
    return (
      <div>
        <div>{header}</div>
        <div className="grid grid-cols-2 gap-1 md:grid-cols-4 md:gap-8 ">
          {results.map((r: any, index: number) => (
            <CardComponent key={index} result={r} />
          ))}
        </div>
      </div>
    );
  };

  const FlexSection = ({ results, CardComponent, header }: any) => {
    if (!CardComponent) {
      return <div>Missing Card Component</div>;
    }
    return (
      <div className="hidden">
        <div>{header}</div>
        <div className="flex flex-col gap-4">
          {results.map((r: any, index: number) => (
            <CardComponent key={index} result={r} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          {results.length ? (
            <div className="centered-container">
              <DirectAnswer />
              <ResultsCount />
              <UniversalResults
                showAppliedFilters={true}
                customCssClasses={{
                  universalResultsContainer: "w-full mx-auto my-6 ",
                }}
                verticalConfigMap={{
                  faqs: {
                    CardComponent: FAQCard,
                    viewAllButton: true,
                    label: "FAQs",
                  },
                  products: {
                    CardComponent: ProductCard,
                    SectionComponent: GridSection,
                    label: "Products",
                    viewAllButton: true,
                  },

                  services: {
                    CardComponent: BlogCard,
                    SectionComponent: FlexSection,
                    label: "Blogs",
                    viewAllButton: true,
                  },
                }}
              />
            </div>
          ) : (
            <div className="space-y-4 ">
              <img src="https://i.imgur.com/44kOM22.png" alt="" />
              <img src="https://i.imgur.com/MYPO5yV.png" alt="" />
              <img src="https://i.imgur.com/T64xkN0.png" alt="" />
              <img src="https://i.imgur.com/MYPO5yV.png" alt="" />
              <img src="https://i.imgur.com/y6IYOHZ.png" alt="" />
              <img src="https://i.imgur.com/MYPO5yV.png" alt="" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
