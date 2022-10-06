import { useEffect, useState } from "react";

const useWishlist = (userId, productId, product) => {
  const [wishlisted, setWishlisted] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    let savedWishlist = JSON.parse(localStorage.getItem(`dgWishlist${userId}`));

    if (savedWishlist === null) {
      savedWishlist = [];
    }

    setWishlisted(savedWishlist);

    let filtered = savedWishlist.filter((item) => item.id === +productId);

    if (filtered.length !== 0) {
      setIsWishlisted(true);
    }
  }, []);

  const wishlistHandler = () => {
    setWishlisted((prevState) => {
      let filtered = prevState.filter((item) => item.id === product.id);
      if (filtered.length === 0) {
        prevState.push(product);

        setIsWishlisted(true);
      } else {
        const filter = filtered.filter((item) => item.id !== product.id);
        prevState = filter;

        setIsWishlisted(false);
      }

      localStorage.setItem(`dgWishlist${userId}`, JSON.stringify(prevState));

      return prevState;
    });
  };

  return { isWishlisted, wishlistHandler };
};

export default useWishlist;
