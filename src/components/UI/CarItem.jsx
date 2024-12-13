import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";

const CarItem = (props) => {
  const { details, PricePerDay, VehicleID, Category } = props.item;

  // Ưu tiên CarImage, sau đó MotorImage, và cuối cùng là ảnh mặc định
  const imgUrl =
    details?.CarImage ||
    details?.MotorImage ||
    "https://press.porsche.com/prod/presse_pag/PressResources.nsf/jumppage/modelle-911-911_carrera_gts/$file/2024_992ll_carrera_gts.jpg";

  // Ưu tiên CarBrand hoặc "Motorbike" nếu không có dữ liệu
  const name = details?.CarBrand || "Motorbike";

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img src={imgUrl} alt={name} className="w-100" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{name}</h4>
          <h6 className="rent__price text-center mt-2">
            ${PricePerDay}.00 <span>/ Day</span>
          </h6>

          <button className="w-50 car__item-btn car__btn-rent">
            <Link to={`/rent/${VehicleID}`}>Rent</Link>
          </button>

          <button className="w-50 car__item-btn car__btn-details">
            <Link to={`/cars/${VehicleID}`}>Details</Link>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
