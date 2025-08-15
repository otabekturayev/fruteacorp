import { useQuery } from "react-query";
import axios from "../../axios";

async function fetchData(url) {
  const response = await axios.get(url);
  return response?.data?.data;
}

function useFetch(url) {
  const { data, error, isLoading } = useQuery(
    [url], 
    () => fetchData(url), 
    {
      enabled: !!url, 
    }
  );

  return { data, error, loading: isLoading };
}

export { useFetch };