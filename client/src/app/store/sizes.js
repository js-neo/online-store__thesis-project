import { createSlice } from "@reduxjs/toolkit";
import sizeService from "../services/size.service";

const sizesSlice = createSlice({
  name: "sizes",
  initialState: {
    entities: [],
    isLoading: true,
    error: null,
  },
  reducers: {
    sizesRequested: (state) => {
      state.isLoading = true;
    },
    sizesReceived: (state, action) => {
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
const { sizesRequested, sizesReceived, sizesRequestFiled } = actions;

export const loadSizesList = () => async (dispatch) => {
  console.log("Loading sizes");
  dispatch(sizesRequested());
  try {
    console.log("Fetching sizes");
    const { content } = await sizeService.fetchAll();
    dispatch(sizesReceived(content));
  } catch (error) {
    dispatch(sizesRequestFiled(error.message));
  }
};

export const getSizes = () => (state) => state.sizes.entities;
export const getSizesLoadingStatus = () => (state) => state.sizes.isLoading;
export const getSizesByIds = (sizesIds) => (state) => {
  return state.sizes.entities
    .filter((size) => sizesIds.includes(size._id))
    .map((size) => size.name);
};

export default sizesReducer;
