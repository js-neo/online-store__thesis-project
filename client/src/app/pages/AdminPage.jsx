import React, { useEffect, useState } from "react";
import { validator } from "../utils/validator";
import TextField from "../components/textField";
import MultiSelectField from "../components/multiSelectField";
import { useSelector, useDispatch } from "react-redux";
import { getCategories, getCategoriesLoadingStatus } from "../store/categories";
import TextAreaField from "../components/textAreaField";
import { getColors } from "../store/colors";
import { getSizes } from "../store/sizes";
import { createProduct } from "../store/products";

const AdminPage = () => {
  console.log("ADMIN");
  // const registerError = useSelector(getAuthErrors());
  const dispatch = useDispatch();
  const [data, setData] = useState({
    brand: "",
    title: "",
    description: "",
    image: "",
    categories: [],
    price: "",
    sizes: [],
    colors: [],
  });

  const isLoadingCategories = useSelector(getCategoriesLoadingStatus());
  console.log("getCategoriesLoadingStatus:", isLoadingCategories);
  const categories = useSelector(getCategories());
  console.log("categories_Admin:", categories);
  const categoriesList = categories.map((cat) => ({
    label: cat.name,
    value: cat._id,
  }));

  const sizes = useSelector(getSizes());
  console.log("sizes_Admin:", sizes);
  const sizesList = sizes.map((s) => ({
    label: s.name,
    value: s._id,
  }));

  const colors = useSelector(getColors());
  console.log("colors_Admin:", colors);
  const colorsList = colors.map((c) => ({
    label: c.name,
    value: c._id,
  }));
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const validatorConfog = {
    brand: {
      isRequired: {
        message: "Brand is Required",
      },
    },
    title: {
      isRequired: {
        message: "Title is Required",
      },
    },
    description: {
      isRequired: {
        message: "Brand is Required",
      },
    },
    price: {
      isRequired: {
        message: "Brand is Required",
      },
    },
  };
  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    console.log("data_Admin:", data);
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
      categories: data.categories.map((cat) => cat.value),
      sizes: data.sizes.map((s) => s.value),
      colors: data.colors.map((c) => c.value),
    };
    dispatch(createProduct(newData));
  };
  console.log("error_Admin:", errors);

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Brand"
        name="brand"
        value={data.brand}
        onChange={handleChange}
        error={errors.brand}
      />
      <TextField
        label="Title"
        name="title"
        value={data.title}
        onChange={handleChange}
        error={errors.title}
      />
      <TextAreaField
        value={data.description || ""}
        onChange={handleChange}
        name="description"
        label="Description"
        error={errors.description}
      />
      <TextField
        label="Image"
        name="image"
        value={data.image}
        onChange={handleChange}
        error={errors.image}
      />
      <MultiSelectField
        options={categoriesList}
        onChange={handleChange}
        name="categories"
        label="Choose categories"
      />
      <TextField
        label="Price"
        name="price"
        value={data.price}
        onChange={handleChange}
        error={errors.price}
      />
      <MultiSelectField
        options={sizesList}
        onChange={handleChange}
        name="sizes"
        label="Choose sizes"
      />
      <MultiSelectField
        options={colorsList}
        onChange={handleChange}
        name="colors"
        label="Choose colors"
      />
      {/*{registerError && <p className="text-danger">{registerError}</p>}*/}
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Submit
      </button>
    </form>
  );
};

export default AdminPage;
