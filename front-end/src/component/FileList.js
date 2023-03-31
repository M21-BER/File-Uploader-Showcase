import React, { useEffect, useState, useContext } from "react";
import Table from "./Table";
import axios from "axios";
import handleDelete from "../actions/handleDelete";

import { Context } from "../ContextProvider";
function FileList({ visibility }) {
  let url = "http://localhost:4000";
  const [list, setList] = useState(null);
  const { updated, setUpdated } = useContext(Context);
  useEffect(() => {
    const abortController = new AbortController();
    axios
      .get(url, { signal: abortController.signal })
      .then((response) => {
        // console.log(response);
        setList(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
    return () => abortController.abort();
  }, [updated, url]);

  return (
    <div className={`list ${visibility}`}>
      <h1>My Files</h1>
      <div className="tbl-header">
        <table cellPadding="0" cellSpacing="0" border="0">
          <thead>
            <tr>
              <th>File Name</th>
              <th>File Size</th>
              <th>Upload Date</th>
              <th>Action</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="tbl-content">
        {list === null || list.length === 0 ? (
          <h2 className="noData">File List is Empty...</h2>
        ) : (
          list.map((item) => {
            return (
              <Table
                key={item.id}
                id={item.id}
                name={item.fileName.split(".")[0]}
                size={item.fileSize}
                date={item.updatedAt}
                url={url}
                setUpdated={setUpdated}
                handleDelete={handleDelete}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default FileList;
