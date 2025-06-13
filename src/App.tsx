import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import PulseLoader from "react-spinners/PulseLoader";
import useExchangeToken from "./hooks/useExchangeToken";

// lazy loading 설정 - 필요한 순간 코드를 불러와서 번들 사이즈를 줄일 수 있음. 초기로딩이 빨라짐. -> Suspense처리!
const AppLayout = React.lazy(() => import("./layout/AppLayout"));
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage/SearchPage"));
const SearchWithKeywordPage = React.lazy(
  () => import("./pages/SearchWithKeywordPage/SearchWithKeywordPage")
);
const PlaylistDetailPage = React.lazy(
  () => import("./pages/PlaylistDetailPage/PlaylistDetailPage")
);
const LibraryPage = React.lazy(() => import("./pages/LibraryPage/LibraryPage"));

// 라우터 설정

//1.홈페이지                        /
//2.검색페이지                      /search
//3.검색 결과페이지                  /search/:keyword
//4.플레이리스트 디테일 페이지          /playlist:id
//5. (모바일) 플레이리스트 페이지       /playlist

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get("code");
  const codeVerifier = localStorage.getItem("code_verifier");

  const { mutate: exchangeToken } = useExchangeToken();
  useEffect(() => {
    if (code && codeVerifier) {
      exchangeToken({ code, codeVerifier });
    }
  }, [code, codeVerifier, exchangeToken]);

  return (
    <Suspense
      fallback={
        <div>
          <PulseLoader color="#1DB954" />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="search/:keyword" element={<SearchWithKeywordPage />} />
          <Route path="playlist/:id" element={<PlaylistDetailPage />} />
          <Route path="/playlist" element={<LibraryPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
