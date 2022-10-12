import React, { useState } from "react";

const ProductsContext = React.createContext({
  limit: 0,
  increaseLimit: (limit) => {},
});

export const ProductsContextProvider = (props) => {
  const [limit, setLimit] = useState(18);

  const increaseLimit = (limit) => {
    setLimit(limit);
  };

  const contextValue = {
    limit,
    increaseLimit,
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
