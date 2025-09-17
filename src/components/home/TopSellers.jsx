import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [loading, setLoading] = useState(true);
  const [topSellers, setTopSellers] = useState([]);
  useEffect(() => {
    const fetchTopSellers = async () => {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      setTopSellers(data);
      setLoading(false);
    };
    fetchTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading
                ? new Array(12).fill().map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp ">
                        <Skeleton height={50} maxWidth={50} borderRadius={"50%"} />
                      </div>
                      <div className="author_list_info">
                        <Skeleton height={20} maxWidth={100} />
                        <span>
                          <Skeleton height={15} maxWidth={40} />
                        </span>
                      </div>
                    </li>
                  ))
                : topSellers.map((topSeller, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to={`/author/${topSeller.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={topSeller.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${topSeller.authorId}`}>
                          {topSeller.authorName}
                        </Link>
                        <span>{topSeller.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
