import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Videobar from "../videobar/Videobar";

function Home() {
  window.scrollTo({ top: 0 });
  return (
    <div className="home">
      <Sidebar />
      <Videobar />
    </div>
  );
}

export default Home;
