import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import axiosClient from "../API/axiosClient";

const fetchVehicles = async () => {
  try {
    const response = await axiosClient.get(`/Vehicle/GetAllVehicle?pageNumber=1&pageSize=10`);
    const vehiclesData = response;

    if (vehiclesData && vehiclesData.data) {
      return vehiclesData.data.map((item) => ({
        VehicleID: item.vehicle.vehicleId,
        PricePerDay: item.vehicle.pricePerDay,
        Category: item.vehicle.category,
        details: {
          CarImage: item.car?.carImage,
          MotorImage: item.moto?.motorImage,
          CarBrand: item.car?.carBrand || "Motorbike",
        },
      }));
    } else {
      console.error("Invalid API response:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    throw error;
  }
};

const CarListing = () => {
  const [carData, setCarData] = useState([]);
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const vehicles = await fetchVehicles();
        setCarData(vehicles); // Cập nhật state với dữ liệu từ API
      } catch (err) {
        console.error(err);
      }
    };

    loadVehicles();
  }, []);

  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);

    let sortedData;
    if (selectedOption === "low") {
      sortedData = [...carData].sort((a, b) => a.PricePerDay - b.PricePerDay);
    } else if (selectedOption === "high") {
      sortedData = [...carData].sort((a, b) => b.PricePerDay - a.PricePerDay);
    } else {
      sortedData = carData; // Không sắp xếp
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

            {carData && carData.length > 0 ? (
              carData.map((item) => <CarItem item={item} key={item.VehicleID} />)
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
