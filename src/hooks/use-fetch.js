import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();

    setData(data);

    if (isLoading === true) {
      setIsLoading(false);
    }
    console.log("Fetch");
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, isLoading };
};

export default useFetch;
