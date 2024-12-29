import React, { useEffect, useState } from "react";
import HeroSlider from "../components/UI/HeroSlider";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import FindCarForm from "../components/UI/FindCarForm";
import AboutSection from "../components/UI/AboutSection";
import ServicesList from "../components/UI/ServicesList";
// import carData from "../assets/data/carData";
import axiosClient from "../API/axiosClient";

const fetchVehicles = async () => {
  try {
    const response = await axiosClient.get(
      `/Vehicle/GetAllVehicle?pageNumber=1&pageSize=10`
    );
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

const Home = () => {
  const [carData, setCarData] = useState([]);

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
  return (
    <Helmet title="Home">
      {/* ============= hero section =========== */}
      <section className="p-0 hero__slider-section">
        <HeroSlider />
      </section>
      {/* =========== about section ================ */}
      <AboutSection />
      {/* ========== services section ============ */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">See our</h6>
              <h2 className="section__title">Popular Services</h2>
            </Col>

            <ServicesList />
          </Row>
        </Container>
      </section>
      {/* =========== car offer section ============= */}

      {/* =========== become a driver section ============ */}

      {/* =========== testimonial section =========== */}
    </Helmet>
  );
};

export default Home;
