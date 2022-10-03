import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useLimit from "../hooks/use-limit";

import ProductList from "../components/products/ProductList";
import LoadMore from "../components/navigation/LoadMore";

const Category = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { products: showProducts, total } = products;

  const { isAllLoaded, limit, increaseLimitHandler } = useLimit(total);
  
  const params = useParams();
  const { category } = params;

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `https://dummyjson.com/products/category/${category}?limit=${limit}`
      );
      const data = await response.json();

      setProducts(data);
      setIsLoading(false);
    };

    fetchProducts();
  }, [category, limit]);

  if (isLoading) {
    return <p className="loading">Loading ...</p>;
  }

  return (
    <Fragment>
      <h2 className="page-title">{category.replace("-", " ")}</h2>
      <ProductList showProducts={showProducts} />
      {!isAllLoaded && <LoadMore onIncrease={increaseLimitHandler} />}
    </Fragment>
  );
};

export default Category;
