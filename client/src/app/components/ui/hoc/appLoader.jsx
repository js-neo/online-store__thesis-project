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
    const loadData = async () => {
      console.log("Loading data...");
      try {
        await dispatch(loadProductsList());
        await dispatch(loadCategoriesList());
        await dispatch(loadSizesList());
        await dispatch(loadColorsList());
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, [dispatch]);

  if (productsStatusLoading) return "Loading dispatch...";

  return children;
};

export default AppLoader;
