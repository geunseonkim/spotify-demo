import { useMutation } from "@tanstack/react-query";
import { exchangeToken } from "../apis/authApi";
import { exchangeTokenResponse } from "../models/auth";

const useExchangeToken = () => {
  //   useMutation<응답값 타입, 에러 타입, 뮤테이션 함수 파라미터 값>({ // useMutation-> 제네릭으로 미리 타입 지정.
  return useMutation<
    exchangeTokenResponse,
    Error,
    { code: string; codeVerifier: string }
  >({
    mutationFn: ({ code, codeVerifier }) => exchangeToken(code, codeVerifier),
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
    },
  });
};

export default useExchangeToken;
