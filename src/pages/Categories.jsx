import { Link } from "react-router-dom";

import useFetch from "../hooks/use-fetch";

import Card from "../components/UI/Card";
import SEO from "../components/SEO";

import classes from "./Categories.module.css";

const Categories = () => {
  const { data: categories, isLoading } = useFetch(
    "https://dummyjson.com/products/categories"
  );

  if (isLoading) {
    return <p className="loading">Loading ...</p>;
  }

  return (
    <div className={classes.categories}>
      <SEO
        title="Categories"
        description="Categories page of Daily Goods."
        page="categories"
      />
      {categories.sort().map((category) => (
        <Card key={category}>
          <p>
            <Link to={`/categories/${category}`}>
              {category.replace("-", " ")}
            </Link>
          </p>
        </Card>
      ))}
    </div>
  );
};

export default Categories;
