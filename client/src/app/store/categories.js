import { createSlice } from "@reduxjs/toolkit";
import categoryService from "../services/category.service";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    categoriesRequested: (state) => {
      state.isLoading = true;
    },
    categoriesReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    categoriesRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: categoriesReducer, actions } = categoriesSlice;
const { categoriesRequested, categoriesReceved, categoriesRequestFiled } =
  actions;

export const loadCategoriesList = () => async (dispatch) => {
  dispatch(categoriesRequested());
  try {
    const { content } = await categoryService.fetchAll();
    dispatch(categoriesReceved(content));
  } catch (error) {
    dispatch(categoriesRequestFiled(error.message));
  }
};

export const getCategories = () => (state) => {
  return state.categories.entities;
};
export const getCategoriesLoadingStatus = () => (state) =>
  state.categories.isLoading;
export const getCategoriesByIds = (categoriesIds) => (state) => {
  if (state.categories.entities) {
    const categoriesArray = [];
    for (const catId of categoriesIds) {
      for (const category of state.categories.entities) {
        if (category._id === catId) {
          categoriesArray.push(category);
          break;
        }
      }
    }
    return categoriesArray;
  }
  return [];
};

export default categoriesReducer;
