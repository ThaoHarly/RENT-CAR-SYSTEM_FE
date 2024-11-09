import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import axios from "axios";

const CarListing = () => {
  const [carData, setCarData] = useState([]);
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    // Fetch car data from JSONPlaceholder (using posts as an example)
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        // Adapting the data structure from posts to your carData structure
        const adaptedData = response.data.map((post) => ({
          id: post.id,
          brand: "Example Brand", // Static example brand name (you can customize this)
          carName: post.title.split(' ').slice(0, 3).join(' '), // Shorten to 3 words
          imgUrl: "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2019/7/5/742726/604135.jpg", // Using provided image URL
          price: Math.floor(Math.random() * 100) + 20, // Random price between $20 and $100
          rating: Math.random() * 5, // Random rating between 1 and 5
          model: `Model-${post.id}`, // Using post id to simulate a car model
          speed: `${Math.floor(Math.random() * 100) + 10}kmpl`, // Random speed between 10kmpl and 100kmpl
          gps: "GPS Navigation", // Static GPS navigation feature
          seatType: "Heated seats", // Static seat type feature
          automatic: post.id % 2 === 0 ? "Automatic" : "Manual", // Randomize automatic/manual
          description: post.body, // Using post body as description
        }));
        setCarData(adaptedData);
      })
      .catch((error) => {
        console.error("Error fetching data from JSONPlaceholder!", error);
      });
  }, []);

  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);

    let sortedData;
    if (selectedOption === "low") {
      sortedData = [...carData].sort((a, b) => a.price - b.price);
    } else if (selectedOption === "high") {
      sortedData = [...carData].sort((a, b) => b.price - a.price);
    } else {
      sortedData = carData; // Default sorting (no sorting applied)
    }
    setCarData(sortedData);
  };

  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="d-flex align-items-center gap-3 mb-5">
                <span className="d-flex align-items-center gap-2">
                  <i className="ri-sort-asc"></i> Sort By
                </span>

                <select onChange={handleSortChange}>
                  <option value="default">Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
              </div>
            </Col>

            {carData.length > 0 ? (
              carData.map((item) => <CarItem item={item} key={item.id} />)
            ) : (
              <p>Loading cars...</p>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
