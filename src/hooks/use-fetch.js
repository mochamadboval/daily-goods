import { useContext, useEffect, useState } from "react";
import ProductsContext from "../store/products-context";

const useFetch = (url) => {
  const productsCtx = useContext(ProductsContext);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();

    setData(data);

    if (isLoading === true) {
      setIsLoading(false);
    }
    console.log("Fetch");
  };

  useEffect(() => {
    fetchData();
  }, [url, productsCtx.cart]);

  return { data, isLoading };
};

export default useFetch;
