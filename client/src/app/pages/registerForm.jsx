import React, { useEffect, useState } from "react";
import { validator } from "../utils/validator";
import TextField from "../components/textField";
import { useSelector, useDispatch } from "react-redux";
import { getAuthErrors, signUp } from "../store/users";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 50%;
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
  flex-wrap: wrap;
`;

const Note = styled.span`
  font-size: 20px;
  margin: 20px 0;
`;

const Button = styled.button`
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  font-size: 20px;
`;

const Link = styled.a`
  margin: 5px 0;
  font-size: 14px;
  color: darkcyan;
  text-decoration: underline;
  cursor: pointer;
`;

const RegisterForm = () => {
  const registerError = useSelector(getAuthErrors());
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const validatorConfog = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения",
      },
      isEmail: {
        message: "Email введен некорректно",
      },
    },
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения",
      },
      min: {
        message: "Имя должено состаять миниму из 3 символов",
        value: 3,
      },
    },
    password: {
      isRequired: {
        message: "Пароль обязательна для заполнения",
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву",
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одно число",
      },
      min: {
        message: "Пароль должен состаять миниму из 8 символов",
        value: 8,
      },
    },
  };
  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfog);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = {
      ...data,
    };
    dispatch(signUp(newData));
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
          <TextField
            label="Электронная почта"
            name="email"
            value={data.email}
            onChange={handleChange}
            error={errors.email}
          />
          <TextField
            label="Имя"
            name="name"
            value={data.name}
            onChange={handleChange}
            error={errors.name}
          />
          <TextField
            label="Пароль"
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            error={errors.password}
          />
          {registerError && <p className="text-danger">{registerError}</p>}
          <Button
            type="submit"
            disabled={!isValid}
            className="btn w-100 mx-auto"
          >
            Submit
          </Button>
        </Form>
        <Note>
          Already have account? <Link>Sign In</Link>
        </Note>
      </Wrapper>
    </Container>
  );
};

export default RegisterForm;
