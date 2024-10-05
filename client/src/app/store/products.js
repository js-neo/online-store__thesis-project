import { createAction, createSlice } from "@reduxjs/toolkit";
import productService from "../services/product.service";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    entities: [],
    isLoading: true,
    error: null,
  },
  reducers: {
    productsRequested: (state) => {
      state.isLoading = true;
    },
    productsReceived: (state, action) => {
      console.log("Dispatched PRODUCTS_RECEIVED with payload: ", action.payload);
      state.entities = action.payload;
      state.isLoading = false;
    },
    productsRequestFailed: (state, action) => {
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
  productsReceived,
  productsRequestFailed,
  productCreated,
  productRemoved,
} = actions;

const addProductRequested = createAction("products/addProductRequested");
const removeProductRequested = createAction("products/removeProductRequested");

export const loadProductsList = () => async (dispatch) => {
  dispatch(productsRequested());
  try {
    const { content } = await productService.fetchAll();
    console.log("Loading products list: ", content);
    dispatch(productsReceived(content));
  } catch (error) {
    dispatch(productsRequestFailed(error.message));
  }
};

export const createProduct = (payload) => async (dispatch) => {
  dispatch(addProductRequested());
  try {
    const { content } = await productService.createProduct(payload);
    dispatch(productCreated(content));
  } catch (error) {
    dispatch(productsRequestFailed(error.message));
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
    dispatch(productsRequestFailed(error.message));
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
