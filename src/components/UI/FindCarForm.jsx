import React, { useState } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import "../../styles/find-car-form.css";

const FindCarForm = ({ onSearch }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchKeyword.trim()); // Pass the search keyword (empty or non-empty) to the parent
  };

  const handleInputChange = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);

    // If the input is cleared, fetch all data
    if (keyword.trim() === "") {
      onSearch(""); // Fetch all data
    }
  };

  return (
    <Form className="form" onSubmit={handleSearch}>
      <div className="d-flex align-items-center">
        <FormGroup className="form__group me-2">
          <Input
            type="text"
            placeholder="Enter Car Name"
            value={searchKeyword}
            onChange={handleInputChange} // Trigger input change handler
          />
        </FormGroup>
        <Button type="submit" className="find__car-btn">
          Search
        </Button>
      </div>
    </Form>
  );
};

export default FindCarForm;
