import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";

const NewItems = () => {
  const settings = {
    slidesToShow: 4,
    speed: 400,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const [newItems, setnewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchnewItems = async () => {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setnewItems(data);
      setLoading(false);
    };
    fetchnewItems();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="slider-container"></div>
          <div className="slider-container">
            <Slider {...settings}>
              {loading
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
                : newItems.map((newItem, index) => (
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
                        <div className="de_countdown">5h 30m 32s</div>

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
                  ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
