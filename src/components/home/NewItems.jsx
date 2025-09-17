import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import Timer from "../UI/Timer";
import Item from "../UI/Item";

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
                    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                      <Item item={newItem} />
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
