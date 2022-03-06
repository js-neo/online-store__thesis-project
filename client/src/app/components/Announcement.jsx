import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 50px;
  background-color: #f57e7e;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 500;
  ${mobile({ fontSize: "16px" })}
`;

const Announcement = () => {
  return <Container>Super deal! Free shipping on order over $50</Container>;
};

export default Announcement;
