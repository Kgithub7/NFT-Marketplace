import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";

const HotCollections = () => {
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
  const [hotCollections, setHotCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchHotCollections = async () => {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setHotCollections(data);
      setLoading(false);
    };
    fetchHotCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="slider-container">
            <Slider {...settings}>
              {loading
                ? new Array(4).fill().map((_, index) => (
                    <div
                      className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                      key={index}
                    >
                      <div className="nft_coll">
                        <div className="nft_wrap skeleton-box skeleton-box-hotCollectionImg"></div>
                        <div className="nft_coll_pp skeleton-box skeleton-box-hotCollectionProfilePic"></div>
                        <div className="nft_coll_info">
                          <div className="skeleton-box skeleton-box-hotCollectionTitle"></div>
                          <div className="skeleton-box skeleton-box-hotCollectionCode"></div>
                        </div>
                      </div>
                    </div>
                  ))
                : hotCollections.map((hotCollection, index) => (
                    <div
                      className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                      key={index}
                    >
                      <div className="nft_coll">
                        <div className="nft_wrap ">
                          <Link to="/item-details">
                            <img
                              src={hotCollection.nftImage}
                              className="lazy img-fluid"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={`/author/${hotCollection.authorId}`}>
                            <img
                              className="lazy pp-coll"
                              src={hotCollection.authorImage}
                              alt=""
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{hotCollection.title}</h4>
                          </Link>
                          <span>ERC-{hotCollection.code}</span>
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

export default HotCollections;
