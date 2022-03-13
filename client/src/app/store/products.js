import { createAction, createSlice } from "@reduxjs/toolkit";
import productService from "../services/product.service";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    productsRequested: (state) => {
      state.isLoading = true;
    },
    productsReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    productsRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    productCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    productRemoved: (state, action) => {
      state.entities = state.entities.filter((p) => p._id !== action.payload);
    },
  },
});

const { reducer: productsReducer, actions } = productsSlice;
const {
  productsRequested,
  productsReceved,
  productsRequestFiled,
  productCreated,
  productRemoved,
} = actions;

const addProductRequested = createAction("products/addProductRequested");
const removeProductRequested = createAction("products/removeProductRequested");

export const loadProductsList = () => async (dispatch, getState) => {
  dispatch(productsRequested());
  try {
    const { content } = await productService.fetchAll();
    dispatch(productsReceved(content));
  } catch (error) {
    dispatch(productsRequestFiled(error.message));
  }
};

export const createProduct = (payload) => async (dispatch) => {
  dispatch(addProductRequested());
  try {
    const { content } = await productService.createProduct(payload);
    dispatch(productCreated(content));
  } catch (error) {
    dispatch(productsRequestFiled(error.message));
  }
};

export const removeProduct = (productId) => async (dispatch) => {
  dispatch(removeProductRequested());
  try {
    const { content } = await productService.removeProduct(productId);
    if (!content) {
      dispatch(productRemoved(productId));
    }
  } catch (error) {
    dispatch(productsRequestFiled(error.message));
  }
};

export const getProducts = () => (state) => state.products.entities;
export const getProductsLoadingStatus = () => (state) =>
  state.products.isLoading;
export const getProductById = (productId) => (state) => {
  if (state.products.entities) {
    return state.products.entities.find((p) => p._id === productId);
  }
};

export default productsReducer;
