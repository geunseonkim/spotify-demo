import { useQuery } from "@tanstack/react-query";
import { getBrowseCategory } from "../apis/playlistApi";
import useClientCredentialToken from "./useClientCredentialToken";

const useGetBrowseCategories = () => {
  const token = useClientCredentialToken();

  return useQuery({
    queryKey: ["browse-category", 40],
    queryFn: () => getBrowseCategory(token, { limit: 40 }),
  });
};

export default useGetBrowseCategories;
