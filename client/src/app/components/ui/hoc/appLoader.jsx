import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCategoriesList } from "../../../store/categories";
import { loadSizesList } from "../../../store/sizes";
import { loadColorsList } from "../../../store/colors";
import {
  getProductsLoadingStatus,
  loadProductsList,
} from "../../../store/products";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const productsStatusLoading = useSelector(getProductsLoadingStatus());
  useEffect(() => {
    dispatch(loadCategoriesList());
    dispatch(loadSizesList());
    dispatch(loadColorsList());
    dispatch(loadProductsList());
  }, []);

  if (productsStatusLoading) return "loading";
  return children;
};

export default AppLoader;
