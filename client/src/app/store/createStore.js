import productsReducer from "./products";
import usersReducer from "./users";
import cartReducer from "./cart";
import categoriesReducer from "./categories";
import sizesReducer from "./sizes";
import colorsReducer from "./colors";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
  products: productsReducer,
  users: usersReducer,
  cart: cartReducer,
  categories: categoriesReducer,
  sizes: sizesReducer,
  colors: colorsReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
