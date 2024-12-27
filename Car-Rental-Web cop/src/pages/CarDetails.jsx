import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";

const CarDetails = () => {
  const { slug } = useParams();
  const [singleCarItem, setSingleCarItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the car details based on the slug (carName)
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        const adaptedData = response.data.map((post) => ({
          id: post.id,
          brand: "Example Brand", // Static example brand name (you can customize this)
          carName: post.title.split(' ').slice(0, 3).join(' '), // Shorten to 3 words
          imgUrl: "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2019/7/5/742726/604135.jpg", // Static image URL
          price: Math.floor(Math.random() * 100) + 20, // Random price between $20 and $100
          rating: Math.random() * 5, // Random rating between 1 and 5
          model: `Model-${post.id}`, // Using post id to simulate a car model
          speed: `${Math.floor(Math.random() * 100) + 10}kmpl`, // Random speed between 10kmpl and 100kmpl
          gps: "GPS Navigation", // Static GPS navigation feature
          seatType: "Heated seats", // Static seat type feature
          automatic: post.id % 2 === 0 ? "Automatic" : "Manual", // Randomize automatic/manual
          description: post.body, // Using post body as description
        }));
        
        // Find the car that matches the slug
        const car = adaptedData.find((item) => item.carName === slug);
        setSingleCarItem(car);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching car details:", error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!singleCarItem) {
    return <p>Car not found!</p>;
  }

  return (
    <Helmet title={singleCarItem.carName}>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img src={singleCarItem.imgUrl} alt="" className="w-100" />
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">{singleCarItem.carName}</h2>

                <div className="d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    ${singleCarItem.price}.00 / Day
                  </h6>

                  <span className="d-flex align-items-center gap-2">
                    <span style={{ color: "#f9a826" }}>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    ({singleCarItem.rating.toFixed(1)} ratings)
                  </span>
                </div>

                <p className="section__description">
                  {singleCarItem.description}
                </p>

                <div className="d-flex align-items-center mt-3" style={{ columnGap: "4rem" }}>
                  <span className="d-flex align-items-center gap-1 section__description">
                    <i className="ri-roadster-line" style={{ color: "#f9a826" }}></i>{" "}
                    {singleCarItem.model}
                  </span>

                  <span className="d-flex align-items-center gap-1 section__description">
                    <i className="ri-settings-2-line" style={{ color: "#f9a826" }}></i>{" "}
                    {singleCarItem.automatic}
                  </span>

                  <span className="d-flex align-items-center gap-1 section__description">
                    <i className="ri-timer-flash-line" style={{ color: "#f9a826" }}></i>{" "}
                    {singleCarItem.speed}
                  </span>
                </div>

                <div className="d-flex align-items-center mt-3" style={{ columnGap: "2.8rem" }}>
                  <span className="d-flex align-items-center gap-1 section__description">
                    <i className="ri-map-pin-line" style={{ color: "#f9a826" }}></i>{" "}
                    {singleCarItem.gps}
                  </span>

                  <span className="d-flex align-items-center gap-1 section__description">
                    <i className="ri-wheelchair-line" style={{ color: "#f9a826" }}></i>{" "}
                    {singleCarItem.seatType}
                  </span>

                  <span className="d-flex align-items-center gap-1 section__description">
                    <i className="ri-building-2-line" style={{ color: "#f9a826" }}></i>{" "}
                    {singleCarItem.brand}
                  </span>
                </div>
              </div>
            </Col>

            <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold">Booking Information</h5>
                <BookingForm />
              </div>
            </Col>

            <Col lg="5" className="mt-5">
              <div className="payment__info mt-5">
                <h5 className="mb-4 fw-bold">Payment Information</h5>
                <PaymentMethod />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;
