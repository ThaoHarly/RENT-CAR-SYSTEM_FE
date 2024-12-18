import React from 'react';
import { Container, Row, Col, Image, ListGroup, Badge } from 'react-bootstrap';

function HomepageVHS() {
  return (
    <Container>
      <Row>
        <Col md={3}> {/* Sidebar */}
          <ListGroup>
            <ListGroup.Item action active>Tài khoản của tôi</ListGroup.Item>
            <ListGroup.Item action>Xe yêu thích</ListGroup.Item>
            <ListGroup.Item action>Xe của tôi</ListGroup.Item>
            <ListGroup.Item action>Chuyến của tôi</ListGroup.Item>
            <ListGroup.Item action>Đơn hàng Thuê xe dài hạn</ListGroup.Item>
            <ListGroup.Item action>Quà tặng</ListGroup.Item>
            <ListGroup.Item action>Địa chỉ của tôi</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={9}> {/* Main Content */}
          <h2>Xin chào bạn!</h2>
          <Row>
            <Col md={8}>
              <h3>Thông tin tài khoản <a href="#edit"><i className="bi bi-pencil-square"></i></a></h3> {/* Icon chỉnh sửa */}
              <Row className="align-items-center"> {/* Căn giữa theo chiều dọc */}
                <Col md={4}>
                  <Image src="your-image.jpg" roundedCircle fluid /> {/* Thay your-image.jpg bằng đường dẫn ảnh */}
                </Col>
                <Col md={8}>
                  <h4>Thảo Nguyễn</h4>
                  <p>Tham gia: 15/10/2024</p>
                  <p>
                    Số điện thoại: Đã xác thực <a href="#add-phone">Thêm số điện thoại</a><br/>
                    Email: Đã xác thực <a href="mailto:nttt120203@gmail.com">nttt120203@gmail.com</a><br/>
                    Facebook: <a href="#add-facebook">Thêm liên kết</a><br/>
                    Google: Thảo Nguyễn <a href="#google-link"><i className="bi bi-box-arrow-up-right"></i></a>
                  </p>
                </Col>
              </Row>
            </Col>
            <Col md={4} className="text-end"> {/* Căn phải */}
              <Badge bg="success" pill>0 chuyến</Badge>
              <br/>
              <Badge bg="warning" text="dark" pill>0 điểm</Badge>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default HomepageVHS;