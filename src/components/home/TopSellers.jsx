import { Link, useParams } from "react-router-dom";
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
                        <Skeleton height={50} width={50} borderRadius={50} />
                      </div>
                      <div className="author_list_info">
                        <Skeleton height={20} width={100} />
                        <span>
                          <Skeleton height={15} width={40} />
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

              {/* {loading
                ? new Array(4).fill().map((_, index) => (
                    <div
                      className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                      key={index}
                    >
                      <div className="nft__item">
                        <div className="author_list_pp skeleton-box skeleton-box-newItemProfilePic"></div>
                        <div className="de_countdown skeleton-box skeleton-box-newItemCountdown"></div>
                        <div className="nft__item_wrap skeleton-box skeleton-box-newItemWrap"></div>
                        <div className="nft__item_info">
                          <div className="skeleton-box skeleton-box-newItemTitle"></div>
                          <div className=" skeleton-box skeleton-box-newItemPrice"></div>
                        </div>
                        <div className="nft__item_like skeleton-box skeleton-box-newItemLike"></div>
                      </div>
                    </div>
                  ))
                : topSellers.map((newItem, index) => (
                    <div
                      className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                      key={index}
                    >
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${newItem.authorId}`}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                          >
                            <img
                              className="lazy"
                              src={newItem.authorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <Timer expiryDate={newItem.expiryDate} />
                        <div className="nft__item_wrap">
                          <div className="nft__item_extra">
                            <div className="nft__item_buttons">
                              <button>Buy Now</button>
                              <div className="nft__item_share">
                                <h4>Share</h4>
                                <a href="" target="_blank" rel="noreferrer">
                                  <i className="fa fa-facebook fa-lg"></i>
                                </a>
                                <a href="" target="_blank" rel="noreferrer">
                                  <i className="fa fa-twitter fa-lg"></i>
                                </a>
                                <a href="">
                                  <i className="fa fa-envelope fa-lg"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                          <Link to={`/item-details/${newItem.nftId}`}>
                            <img
                              src={newItem.nftImage}
                              className="lazy nft__item_preview"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to="/item-details">
                            <h4>{newItem.title}</h4>
                          </Link>
                          <div className="nft__item_price">
                            {newItem.price} ETH
                          </div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{newItem.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))} */}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
