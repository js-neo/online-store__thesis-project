import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import productService from "../services/product.service";
import { useSelector } from "react-redux";
import { getSizes, getSizesLoadingStatus } from "../store/sizes";
import { getColors, getColorsLoadingStatus } from "../store/colors";
import { getProducts } from "../store/products";

const { fetchAll, getProductsCategory } = productService;

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  console.log("CAT_PRODUCTS:", cat);
  const isLoadingSizes = useSelector(getSizesLoadingStatus());
  const sizesList = useSelector(getSizes());
  const isLoadingColors = useSelector(getColorsLoadingStatus());
  // const product = useSelector(getProducts());

  const colorList = useSelector(getColors());

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { content } = cat
          ? await getProductsCategory(cat)
          : await fetchAll();
        setProducts(content);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  function isEmpty(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  // const transformData = (filter, dataList) => {
  //   if (!isEmpty(filter)) {
  //     const itemById = dataList.filter((item) =>
  //       Object.entries(filter).every(([key, value]) => {
  //         console.log("key, value", key, value);
  //         return item.name.includes(value);
  //       })
  //     );
  //     return itemById.map((item) => item._id);
  //   }
  // };

  const transformData = (filters, dataList) => {
    if (!isEmpty(filters)) {
      const filterArray = Object.entries(filters);
      return filterArray.reduce((obj, next) => {
        const filterItem = dataList.find((item) => item.name === next[1]);
        obj[next[0]] = filterItem._id;
        return obj;
      }, {});
    }
  };

  const filterId = transformData(filters, [...sizesList, ...colorList]);

  const productFilter = () => {
    if (filterId) {
      return products.filter((item) =>
        Object.entries(filterId).every(([key, value]) =>
          item[key].includes(value)
        )
      );
    }
    return products;
  };

  useEffect(() => {
    (cat || !isEmpty(filters)) && setFilteredProducts(productFilter());
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  if (isLoadingSizes || isLoadingColors) {
    return "LOADING...";
  }

  return (
    <Container>
      {filteredProducts[0]
        ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
        : products
            .slice(0, 16)
            .map((item) => <Product item={item} key={item._id} />)}
    </Container>
  );
};

export default Products;
