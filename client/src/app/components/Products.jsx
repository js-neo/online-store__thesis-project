import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import productService from "../services/product.service";

const { fetchAll, getProductsCategory } = productService;

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  console.log(
    "___________Category, filters, sort________:",
    cat,
    filters,
    sort
  );

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { content } = cat
          ? await getProductsCategory(cat)
          : await fetchAll();

        console.log("___CONTENT___:", content);
        setProducts(content);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  function isEmpty(obj) {
    for (let key in obj) {
      console.log("obj.hasOwnProperty(key):", obj.hasOwnProperty(key));
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  const productFilter = () => {
    return products.filter((item) =>
      Object.entries(filters).every(([key, value]) => item[key].includes(value))
    );
  };

  console.log("products:", products);
  useEffect(() => {
    console.log("isEmpty(filters):", isEmpty(filters));
    console.log("filters:", filters);
    (cat || !isEmpty(filters)) && setFilteredProducts(productFilter());
  }, [products, cat, filters]);

  console.log("filteredProducts:", filteredProducts);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      console.log("ASK_FILTER");
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      console.log("DESK_FILTER");
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {filteredProducts[0]
        ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
        : products
            .slice(0, 15)
            .map((item) => <Product item={item} key={item._id} />)}
    </Container>
  );
};

export default Products;
