import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch(url);
    const data = await response.json();

    setProducts(data);

    if (isLoading === true) {
      setIsLoading(false);
    }
    console.log("Fetch");
  };

  useEffect(() => {
    fetchProducts();
  }, [url]);

  return { products, isLoading };
};

export default useFetch;
