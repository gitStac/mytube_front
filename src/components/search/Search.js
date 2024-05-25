import React from "react";
import Sidebar from "../home/sidebar/Sidebar";
import VideoSearchBar from "./VideoSearchBar";

function Search() {
  window.scrollTo({ top: 0 });
  return (
    <div>
      <Sidebar />
      <VideoSearchBar />
    </div>
  );
}

export default Search;
