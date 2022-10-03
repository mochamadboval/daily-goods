import { useEffect, useState } from "react";

const useLimit = (total) => {
  const [isAllLoaded, setIsAllLoaded] = useState(false);
  const [limit, setLimit] = useState(18);

  useEffect(() => {
    if (total <= 18) {
      setIsAllLoaded(true);
    } 
  }, [total]);

  const increaseLimitHandler = () => {
    setLimit((prevState) => {
      const count = prevState + 18;
      if (count >= total) {
        setIsAllLoaded(true);
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
