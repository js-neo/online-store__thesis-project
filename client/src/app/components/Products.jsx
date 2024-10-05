import React, { useEffect, useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import Product from "./Product";
import productService from "../services/product.service";
import { getSizes, getSizesLoadingStatus } from "../store/sizes";
import { getColors, getColorsLoadingStatus } from "../store/colors";
import { useSelector } from "react-redux";

const { fetchAll, getProductsCategory } = productService;

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters = {}, sort }) => {
  const isLoadingSizes = useSelector(getSizesLoadingStatus());
  const sizesList = useSelector(getSizes());
  const isLoadingColors = useSelector(getColorsLoadingStatus());
  const colorList = useSelector(getColors());

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { content } = cat
          ? await getProductsCategory(cat)
          : await fetchAll();
        setProducts(content);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    getProducts();
  }, [cat]);

  const isEmpty = (obj) => !obj || Object.keys(obj).length === 0;

  const transformData = (filters, dataList) => {
    if (isEmpty(filters)) return {};
    return Object.entries(filters).reduce((obj, [key, value]) => {
      const filterItem = dataList.find((item) => item.name === value);
      if (filterItem) obj[key] = filterItem._id;
      return obj;
    }, {});
  };

  const filterId = transformData(filters, [...sizesList, ...colorList]);

  const filteredProducts = useMemo(() => {
    if (isEmpty(filterId)) return products;

    return products.filter((item) =>
      Object.entries(filterId).every(([key, value]) =>
        item[key]?.includes(value)
      )
    );
  }, [products, filterId]);

  const sortedProducts = useMemo(() => {
    const sortedArray = [...filteredProducts];
    if (sort === "newest") {
      return sortedArray.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sort === "asc") {
      return sortedArray.sort((a, b) => a.price - b.price);
    } else {
      return sortedArray.sort((a, b) => b.price - a.price);
    }
  }, [filteredProducts, sort]);

  if (isLoadingSizes || isLoadingColors) {
    return <div>LOADING...</div>;
  }

  return (
    <Container>
      {filteredProducts.length > 0 ? (
        sortedProducts.map((item) => <Product item={item} key={item._id} />)
      ) : (
        <div>There are no products matching your requests</div>
      )}
    </Container>
  );
};

export default Products;
