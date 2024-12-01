import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";
import axiosClient from "../API/axiosClient";

const fetchVehicleDetails = async (vehicleId) => {
  try {
    const response = await axiosClient.get(`system/vehicles/${vehicleId}`);
    return response.vehicle; // Trả về đối tượng vehicle từ API
  } catch (error) {
    console.error("Error fetching vehicle details:", error);
    throw error;
  }
};

const CarDetails = () => {
  const { slug } = useParams(); // `slug` là VehicleID
  const [singleCarItem, setSingleCarItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehicle = await fetchVehicleDetails(slug); // Gọi API với slug
        setSingleCarItem(vehicle);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching car details:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!singleCarItem) {
    return <p>Vehicle not found!</p>;
  }

  const {
    details,
    Category,
    LicensePlate,
    Status,
    PricePerDay,
    EngineCapacity,
    reviews,
  } = singleCarItem;

  const imgUrl = details?.CarImage || "default-image.jpg";
  const category = Category === "CAR" ? "Car" : "Motorbike";
  const brand = details?.CarBrand || "Generic";

  return (
    <Helmet title={`${brand} - ${category}`}>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt={brand} className="w-100" />
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">{brand}</h2>
                <h5 className="section__subtitle">{category}</h5>

                <div className="d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    ${PricePerDay}.00 / Day
                  </h6>
                  <span className="d-flex align-items-center gap-2">
                    License Plate: {LicensePlate}
                  </span>
                </div>

                <div
                  className="d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}
                >
                  <span className="d-flex align-items-center gap-1 section__description">
                    <i className="ri-settings-2-line" style={{ color: "#f9a826" }}></i>{" "}
                    {Status}
                  </span>

                  <span className="d-flex align-items-center gap-1 section__description">
                    <i className="ri-fuel-line" style={{ color: "#f9a826" }}></i>{" "}
                    Fuel: {details?.Fuel_type || "N/A"}
                  </span>

                  <span className="d-flex align-items-center gap-1 section__description">
                    <i className="ri-roadster-line" style={{ color: "#f9a826" }}></i>{" "}
                    Engine: {EngineCapacity}L
                  </span>
                </div>
              </div>
            </Col>

            {/* Reviews Section */}
            <Col lg="12" className="mt-5">
              <div className="reviews">
                <h5 className="mb-4 fw-bold">Customer Reviews</h5>
                {reviews?.length > 0 ? (
                  reviews.map((review) => (
                    <div
                      key={review.ReviewID}
                      className="bg-light p-3 mb-3 rounded shadow-sm"
                    >
                      <h6 className="fw-bold mb-2">Rating: {review.Rating}/5</h6>
                      <p className="text-muted mb-1">"{review.Comment}"</p>
                      <p className="text-secondary">
                        <small>Reviewed on: {new Date(review.ReviewDate).toLocaleDateString()}</small>
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No reviews available for this vehicle.</p>
                )}
              </div>
            </Col>

            {/* Booking and Payment Section */}
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
