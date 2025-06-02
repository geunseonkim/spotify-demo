import { Route, Routes } from "react-router";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";

// 라우터 설정

//1.홈페이지                        /
//2.검색페이지                      /search
//3.검색 결과페이지                  /search/:keyword
//4.플레이리스트 디테일 페이지          /playlist:id
//5. (모바일) 플레이리스트 페이지       /playlist

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        {/* <Route path="search/keyword" element={<SearchWithKeywordPage />} />
      <Route path="playlist/:id" element={<PlaylistDetailPage />} /> */}
        {/* <Route path="/playlist" element={<LibraryPage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
