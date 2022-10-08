import firebase from "../firebase";
import { useEffect, useState } from "react";

const useWishlist = (userId, productId, product) => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const fetchWishlisted = () => {
    const wishlistRef = firebase.database().ref(`/wishlist-${userId}`);
    wishlistRef.once("value", (snapshot) => {
      const wishlisted = snapshot.val();
      if (wishlisted === null) {
        wishlistRef.push({ id: false });
        return;
      }
      for (let key in wishlisted) {
        if (initialLoad) {
          setInitialLoad(false);

          if (wishlisted[key].id === +productId) {
            setIsWishlisted(true);
            return;
          }
        } else {
          if (wishlisted[key].id === +productId) {
            setIsWishlisted(false);

            wishlistRef.child(key).remove();
            return;
          }
        }
      }
      if (!initialLoad) {
        wishlistRef.push(product);
        setIsWishlisted(true);
      }
    });
  };

  useEffect(() => {
    fetchWishlisted();
  }, []);

  const wishlistHandler = () => {
    fetchWishlisted();
  };

  return { isWishlisted, wishlistHandler };
};

export default useWishlist;
