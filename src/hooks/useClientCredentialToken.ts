import { useQuery } from "@tanstack/react-query";
import { getClientCredentialToken } from "../apis/authApi";

export const useClientCredentialToken = (): string | undefined => {
  const { data } = useQuery({
    queryKey: ["client-credential-token"],
    queryFn: getClientCredentialToken,
    staleTime: 1000 * 60 * 30,
  });
  const clientCredentialToken = data?.access_token;
  return clientCredentialToken;
};

export default useClientCredentialToken;
