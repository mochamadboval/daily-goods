import { useContext, useEffect, useState } from "react";
import ProductsContext from "../store/products-context";

const useLimit = (total) => {
  const productsCtx = useContext(ProductsContext);
  const [isAllLoaded, setIsAllLoaded] = useState(false);
  const [limit, setLimit] = useState(productsCtx.limit);

  useEffect(() => {
    if (total <= limit) {
      setIsAllLoaded(true);
    } else {
      setIsAllLoaded(false);
    }

    productsCtx.increaseLimit(limit);
  }, [total, limit]);

  const increaseLimitHandler = () => {
    setLimit((prevState) => {
      const count = prevState + 18;
      if (count >= total) {
        setIsAllLoaded(true);
        return total;
      }

      return count;
    });
  };

  return {
    isAllLoaded,
    limit,
    increaseLimitHandler,
  };
};

export default useLimit;
