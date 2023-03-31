import React, { useState } from "react";
import FileDrop from "./FileDrop";
import FileList from "./FileList";

function Home() {
  const [nth1, setNth1] = useState("tab-items tab-items-active");
  const [nth2, setNth2] = useState("tab-items");
  const [visibleDrop, setVisibleDrop] = useState("drop-tab active");
  const [visibleList, setVisibleList] = useState("list-tab");
  function btnClick(nth) {
    if (nth === 1) {
      setNth1("tab-items tab-items-active");
      setNth2("tab-items");
      setVisibleDrop("drop-tab active");
      setVisibleList("list-tab");
    }
    if (nth === 2) {
      setNth1("tab-items");
      setNth2("tab-items tab-items-active");
      setVisibleDrop("drop-tab");
      setVisibleList("list-tab active");
    }
  }
  return (
    <section className="Home">
      <div className="tab">
        <div className="tabs">
          <button
            className={`${nth1}`}
            onClick={() => {
              btnClick(1);
            }}
          >
            Drop File
          </button>
          <button
            className={`${nth2}`}
            onClick={() => {
              btnClick(2);
            }}
          >
            File List
          </button>
        </div>
        <FileDrop visibility={visibleDrop} />
        <FileList visibility={visibleList} />
      </div>
      <h1 className="programmer-custom1 ">MUSSE BERHANE</h1>
      <h2 className="programmer-custom2 "> Mar 31, 2023</h2>
    </section>
  );
}

export default Home;
