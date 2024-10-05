import React, { useEffect, useState } from "react";
import { validator } from "../utils/validator";
import TextField from "../components/textField";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, login } from "../store/users";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 30%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  font-size: 20px;
`;

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const authError = useSelector(getAuthErrors());
  const loginError =
    authError === "Пользователь с таким Email уже существует"
      ? null
      : authError;
  console.log("authError:", authError);
  const history = useHistory();
  // console.log("history:", history);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения",
      },
    },
    password: {
      isRequired: {
        message: "Пароль обязателкн для заполнения",
      },
    },
  };
  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const redirect = history?.location.state
      ? history.location.state.from.pathname
      : "/";

    dispatch(login({ payload: data, redirect }));
  };
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleSubmit}>
          <TextField
            label="Электронная почта"
            name="email"
            value={data.email}
            onChange={handleChange}
            error={errors.email}
          />
          <TextField
            label="Пароль"
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            error={errors.password}
          />
          {loginError && <p className="text-danger">{loginError}</p>}

          <Button
            type="submit"
            disabled={!isValid}
            className="btn w-100 mx-auto"
          >
            Submit
          </Button>
        </Form>
        <p>
          Dont have account?{" "}
          <Link to="/register" style={{ color: "darkcyan" }}>
            Sign Up
          </Link>
        </p>
      </Wrapper>
    </Container>
  );
};

export default LoginForm;
