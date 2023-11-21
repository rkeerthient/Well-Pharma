import * as React from "react";
import {
  DropdownItem,
  FocusedItemData,
  RenderEntityPreviews,
  SearchBar,
  onSearchFunc,
} from "@yext/search-ui-react";
import {
  provideHeadless,
  useSearchActions,
  VerticalResults as VerticalResultsData,
  useSearchState,
} from "@yext/search-headless-react";
import { useEffect } from "react";
import searchConfig from "./searchConfig";
import Product from "../types/products";
import { Image } from "@yext/react-components";
import SpeechToText from "./SpeechToText";
import { setPathAndQueryParams, removeQueryParam } from "./util";
type Link = {
  label: string;
  url: string;
};

const links: Link[] = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "Products",
    url: "/products",
  },
  {
    label: "Services",
    url: "/services",
  },
  {
    label: "FAQs",
    url: "/faqs",
  },
];

const Header = () => {
  const state = useSearchState((state) => state.vertical.verticalKey);
  const searchActions = useSearchActions();
  const [path, setPath] = React.useState("");

  const handleDataFromChild = (data: any, listenStatus: any) => {
    data && searchActions.setQuery(data);
    !listenStatus && !state
      ? (searchActions.setUniversal(), searchActions.executeUniversalQuery())
      : (searchActions.setVertical(state!),
        searchActions.executeVerticalQuery());
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    query &&
      (path === "index.html" || !path) &&
      (searchActions.setUniversal(),
      searchActions.setUniversalLimit({
        faqs: 5,
        products: 12,
        locations: 5,
        blogs: 5,
        blog_details: 4,
      }),
      searchActions.executeUniversalQuery());
  }, []);

  const linkDoms = links.map((link) => (
    <div key={link.label}>
      <a href={link.url} rel="noreferrer">
        {link.label}
      </a>
    </div>
  ));

  useEffect(() => {
    const currentPath = window.location.pathname;
    setPath(currentPath);
    return () => {};
  }, []);

  const handleSearch: onSearchFunc = (searchEventData) => {
    const { query } = searchEventData;
    if (query) {
      setPathAndQueryParams("query", query ?? "");
    } else {
      removeQueryParam("query");
    }
    query && searchActions.setQuery(query);

    state
      ? (searchActions.setVertical(state), searchActions.executeVerticalQuery())
      : (searchActions.setUniversal(),
        searchActions.setUniversalLimit({
          faqs: 5,
          products: 12,
          locations: 5,
          blogs: 5,
          blog_details: 4,
        }));
  };

  const entityPreviewSearcher = provideHeadless({
    ...searchConfig,
    headlessId: "entity-preview-searcher",
  });

  const renderEntityPreviews: RenderEntityPreviews = (
    autocompleteLoading: boolean,
    verticalKeyToResults: Record<string, VerticalResultsData>,
    dropdownItemProps: {
      onClick: (
        value: string,
        _index: number,
        itemData?: FocusedItemData
      ) => void;
      ariaLabel: (value: string) => string;
    }
  ): JSX.Element | null => {
    const productResults = verticalKeyToResults["products"]?.results.map(
      (result) => result.rawData
    ) as unknown as Product[];

    return productResults ? (
      <div className="grid grid-cols-4 px-2 gap-2 text-black">
        {productResults.map((result) => (
          <DropdownItem
            className="border gap-2"
            key={result.id}
            value={result.name}
            onClick={() => history.pushState(null, "", `/product/${result.id}`)}
            ariaLabel={dropdownItemProps.ariaLabel}
          >
            <DropdownItem
              key={result.id}
              value={result.name}
              ariaLabel={dropdownItemProps.ariaLabel}
            >
              <a href={result.slug} className="flex flex-col gap-2 ">
                {result.photoGallery && result.primaryPhoto && (
                  <Image
                    image={result.primaryPhoto}
                    className="h-full w-32 mx-auto"
                  />
                )}
                <div className="flex gap-2 px-1">
                  <div className="text-sm">{result.name}</div>
                  <div className="text-sm">£{result.price?.value}</div>
                </div>
              </a>
            </DropdownItem>
          </DropdownItem>
        ))}
      </div>
    ) : null;
  };
  return (
    <>
      <div className=" px-8">
        <nav className="py-6 flex flex-col items-center justify-between w-full">
          <div className=" !text-[#3f7088] items-center font-semibold flex flex-row justify-between w-full gap-8">
            <div className="flex flex-row justify-start !gap-x-6 text-lg font-semibold  items-center">
              <img
                src="https://cdn11.bigcommerce.com/s-zbz0dr3ysm/stencil/008e4200-69be-013c-de8c-4e33b7865e67/e/2e51a620-0381-013c-1bdc-022b92701f73/icons/logo-well-hale.svg"
                alt=""
                className="w-36"
              />
              {linkDoms}
            </div>

            <div className="flex-1">
              <div className="w-full flex   gap-2 items-center pr-3">
                {!state || state === "products" ? (
                  <SearchBar
                    hideRecentSearches={true}
                    customCssClasses={{
                      searchBarContainer: "!mb-0 flex-1 searchBar",
                      searchButton: "text-black",
                    }}
                    visualAutocompleteConfig={{
                      entityPreviewSearcher: entityPreviewSearcher,
                      includedVerticals: ["products"],
                      renderEntityPreviews: renderEntityPreviews,
                      universalLimit: { products: 4 },
                      entityPreviewsDebouncingTime: 300,
                    }}
                    onSearch={handleSearch}
                  />
                ) : (
                  <SearchBar
                    customCssClasses={{
                      searchBarContainer: "!mb-0 flex-1 searchBar",
                      searchButton: "text-black searchBar",
                    }}
                    hideRecentSearches={true}
                  />
                )}
                <div className="w-fit text-black">
                  <SpeechToText
                    sendDataToParent={handleDataFromChild}
                  ></SpeechToText>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
