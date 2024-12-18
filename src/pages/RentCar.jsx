import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import axiosClient from "../API/axiosClient";
import { toast } from "react-toastify";

// API fetch vehicle details
const fetchVehicleDetails = async (vehicleId) => {
  try {
    const response = await axiosClient.get(`system/vehicles/${vehicleId}`);
    return response.vehicle; // Trả về dữ liệu xe từ API
  } catch (error) {
    console.error("Error fetching vehicle details:", error);
    throw error;
  }
};

// API rent car
const rentCarFetch = async (rentalData) => {
  try {
    const response = await axiosClient.post("customer/rental/book", rentalData);
    return response;
  } catch (error) {
    console.error("Error booking rental:", error);
    throw error;
  }
};

const RentCar = () => {
  const { slug } = useParams(); // `slug` là VehicleID
  const navigate = useNavigate();

  // State quản lý dữ liệu chi tiết xe
  const [singleCarItem, setSingleCarItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // State quản lý dữ liệu form
  const [formData, setFormData] = useState({
    VehicleID: slug,
    StartDate: "",
    EndDate: "",
    DepositAmount: "",
    PaymentMethod: "ONLINE",
  });

  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch vehicle details khi component load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehicle = await fetchVehicleDetails(slug);
        setSingleCarItem(vehicle);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  // Xử lý form change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError("");

    try {
      const result = await rentCarFetch(formData);
      const agreementId = result.agreement.AgreementID;
      toast.success("Rental booked successfully!");
      navigate(`/payment/${agreementId}`);
    } catch (err) {
      setFormError("Failed to book rental. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Hiển thị loading hoặc lỗi khi không tìm thấy xe
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!singleCarItem) {
    return <p>Vehicle not found!</p>;
  }

  // Render giao diện
  const {
    details,
    Category,
    LicensePlate,
    Status,
    PricePerDay,
    EngineCapacity,
  } = singleCarItem;

  const imgUrl = details?.CarImage || "default-image.jpg";
  const category = Category === "CAR" ? "Car" : "Motorbike";
  const brand = details?.CarBrand || "Generic";

  return (
    <Helmet title={`Rent ${brand}`}>
      <section>
        <Container>
          <Row>
            {/* Phần hiển thị chi tiết xe */}
            <Col lg="6">
              <img src={imgUrl} alt={brand} className="w-100" />
              <div className="car__info mt-4">
                <h2 className="section__title">{brand}</h2>
                <h5 className="section__subtitle">{category}</h5>
                <h6 className="rent__price fw-bold fs-4">
                  ${PricePerDay}.00 / Day
                </h6>
                <p>License Plate: {LicensePlate}</p>
                <p>Status: {Status}</p>
                <p>Engine Capacity: {EngineCapacity}L</p>
              </div>
            </Col>

            {/* Phần form booking */}
            <Col lg="6">
              <h2 className="text-center mb-4">Rent this Vehicle</h2>
              {formError && (
                <p className="text-danger text-center">{formError}</p>
              )}
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="StartDate">Start Date</Label>
                  <Input
                    type="date"
                    name="StartDate"
                    id="StartDate"
                    value={formData.StartDate}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="EndDate">End Date</Label>
                  <Input
                    type="date"
                    name="EndDate"
                    id="EndDate"
                    value={formData.EndDate}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="DepositAmount">Deposit Amount</Label>
                  <Input
                    type="number"
                    name="DepositAmount"
                    id="DepositAmount"
                    placeholder="Enter deposit amount"
                    value={formData.DepositAmount}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="PaymentMethod">Payment Method</Label>
                  <Input
                    type="select"
                    name="PaymentMethod"
                    id="PaymentMethod"
                    value={formData.PaymentMethod}
                    onChange={handleChange}
                    required
                  >
                    <option value="ONLINE">Online</option>
                    <option value="OFFLINE">Offline</option>
                  </Input>
                </FormGroup>

                <Button
                  type="submit"
                  color="primary"
                  block
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Booking..." : "Rent Now"}
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default RentCar;
