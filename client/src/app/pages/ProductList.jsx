import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { getCategories } from "../store/categories";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 5px;
  margin-right: 20px;
  font-size: 20px;
  ${mobile({ margin: "10px 0px", fontSize: "14" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  console.log("CAT_productList:", cat);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const categoriesList = useSelector(getCategories());
  console.log("categoriesList:", categoriesList);

  const categoryById = categoriesList.find((catItem) => catItem._id === cat);
  console.log("categoryById:", categoryById);

  const handleFilters = ({ target }) => {
    const value = target.value;
    setFilters((prevState) => ({
      ...prevState,
      [target.name]: value,
    }));
  };
  console.log("filter_ProductList:", filters);

  const handleSort = ({ target }) => setSort(target.value);
  console.log("sort_ProductList:", sort);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{categoryById.name.toUpperCase()}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="colors" onChange={handleFilters}>
            <Option disabled>Color</Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
          </Select>
          <Select name="sizes" onChange={handleFilters}>
            <Option disabled>Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={handleSort}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
