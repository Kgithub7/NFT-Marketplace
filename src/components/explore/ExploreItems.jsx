import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import Item from "../UI/Item";

const ExploreItems = () => {
  const [url, setUrl] = useState(
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
  );
  const [numOfItems, setNumOfItems] = useState(8);
  const [loading, setLoading] = useState(true);
  const [exploreItems, setExploreItems] = useState([]);
  useEffect(() => {
    const fetchExploreItems = async () => {
      const { data } = await axios.get(url);
      setExploreItems(data);
      setLoading(false);
    };
    fetchExploreItems();
  }, [url]);

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => {
            if (event.target.value == "price_low_to_high") {
              setUrl(
                "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_low_to_high"
              );
            } else if (event.target.value == "price_high_to_low") {
              setUrl(
                "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_high_to_low"
              );
            } else if (event.target.value == "likes_high_to_low") {
              setUrl(
                "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low"
              );
            } else
              setUrl(
                "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
              );
          }}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <Skeleton width={"100%"} height={400} borderRadius={15} />
            </div>
          ))
        : exploreItems.slice(0, numOfItems).map((exploreItem, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <Item item={exploreItem} />
            </div>
          ))}
      {!loading && (
        <div className="col-md-12 text-center">
          <button
            id="loadmore"
            className="btn-main lead"
            onClick={() => {
              if (numOfItems == 8) setNumOfItems(12);
              else if (numOfItems == 12) setNumOfItems(16);
              else setNumOfItems(8);
            }}
          >
            {numOfItems == 16 ? "Load Less" : "Load More"}
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
