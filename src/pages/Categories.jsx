import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import classes from "./Categories.module.css";

const Categories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("https://dummyjson.com/products/categories");
      const data = await response.json();
      const sort = data.sort();

      setCategories(sort);
      setIsLoading(false);
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return <p className="loading">Loading ...</p>;
  }

  return (
    <div className={classes.categories}>
      {categories.map((category) => (
        <article key={category}>
          <p>
            <Link to={`/categories/${category}`}>
              {category.replace("-", " ")}
            </Link>
          </p>
        </article>
      ))}
    </div>
  );
};

export default Categories;
