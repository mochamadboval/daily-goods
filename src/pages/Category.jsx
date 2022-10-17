import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useFetch from "../hooks/use-fetch";
import useLimit from "../hooks/use-limit";

import LoadMore from "../components/navigation/LoadMore";
import ProductList from "../components/products/ProductList";
import SEO from "../components/SEO";

const Category = () => {
  const params = useParams();
  const { category } = params;
  const transformName = category.split("-");
  for (const index in transformName) {
    transformName[index] =
      transformName[index].charAt(0).toUpperCase() +
      transformName[index].slice(1);
  }
  const categoryName = transformName.join(" ");

  const [initialTotal, setInitialTotal] = useState(0);
  const { isAllLoaded, limit, increaseLimitHandler } = useLimit(initialTotal);
  const { data, isLoading } = useFetch(
    `https://dummyjson.com/products/category/${category}?limit=${limit}`
  );
  const { products: showProducts, total } = data;

  useEffect(() => {
    setInitialTotal(total);
  }, [total]);

  if (isLoading) {
    return <p className="loading">Loading ...</p>;
  }

  return (
    <Fragment>
      <SEO
        title={categoryName}
        description={`${categoryName} page of Daily Goods.`}
        page="home"
      />
      <h2 className="page-title">{categoryName}</h2>
      <ProductList showProducts={showProducts} />
      {!isAllLoaded && <LoadMore onIncrease={increaseLimitHandler} />}
    </Fragment>
  );
};

export default Category;
