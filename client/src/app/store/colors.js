import { createSlice } from "@reduxjs/toolkit";
import colorService from "../services/color.service";

const colorsSlice = createSlice({
  name: "colors",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    colorsRequested: (state) => {
      state.isLoading = true;
    },
    colorsReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    colorsRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: colorsReducer, actions } = colorsSlice;
const { colorsRequested, colorsReceved, colorsRequestFiled } = actions;

export const loadColorsList = () => async (dispatch, getState) => {
  dispatch(colorsRequested());
  try {
    const { content } = await colorService.fetchAll();
    dispatch(colorsReceved(content));
  } catch (error) {
    dispatch(colorsRequestFiled(error.message));
  }
};

export const getColors = () => (state) => state.colors.entities;
export const getColorsLoadingStatus = () => (state) => state.colors.isLoading;
export const getColorsByIds = (colorsIds) => (state) => {
  if (state.colors?.entities) {
    const colorsArray = [];
    for (const catId of colorsIds) {
      for (const color of state.colors.entities) {
        if (color._id === catId) {
          colorsArray.push(color.name);
          break;
        }
      }
    }
    return colorsArray;
  }
  return [];
};

export default colorsReducer;
