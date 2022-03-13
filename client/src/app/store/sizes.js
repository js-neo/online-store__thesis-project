import { createSlice } from "@reduxjs/toolkit";
import isOutdated from "../utils/isOutdated";
import sizeService from "../services/size.service";

const sizesSlice = createSlice({
  name: "sizes",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    sizesRequested: (state) => {
      state.isLoading = true;
    },
    sizesReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    sizesRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: sizesReducer, actions } = sizesSlice;
const { sizesRequested, sizesReceved, sizesRequestFiled } = actions;

export const loadSizesList = () => async (dispatch, getState) => {
  dispatch(sizesRequested());
  try {
    const { content } = await sizeService.fetchAll();
    dispatch(sizesReceved(content));
  } catch (error) {
    dispatch(sizesRequestFiled(error.message));
  }
};

export const getSizes = () => (state) => state.sizes.entities;
export const getSizesLoadingStatus = () => (state) => state.sizes.isLoading;
export const getSizesByIds = (sizesIds) => (state) => {
  if (state.sizes.entities) {
    const sizesArray = [];
    for (const catId of sizesIds) {
      for (const size of state.sizes.entities) {
        if (size._id === catId) {
          sizesArray.push(size.name);
          break;
        }
      }
    }
    return sizesArray;
  }
  return [];
};

export default sizesReducer;
