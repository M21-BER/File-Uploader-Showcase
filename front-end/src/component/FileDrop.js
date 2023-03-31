import React, { useState, useRef, useContext } from "react";
import Lottie from "lottie-react";
import anim from "../assets/59643-upload-file.json";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { Context } from "../ContextProvider";
function FileDrop({ visibility }) {
  const MySwal = withReactContent(Swal);
  const [dragActive, setDragActive] = useState(false);
  let msg = null;
  const inputRef = useRef(null);
  const { setUpdated } = useContext(Context);
  let url = "http://localhost:4000";
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files);
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files);
    }
  };

  const handleFile = (files) => {
    // console.log(files[0]);

    MySwal.fire({
      title: (
        <>
          <p className="msg">File Uploading</p>
        </>
      ),
      allowOutsideClick: false,
      didOpen: () => {
        MySwal.showLoading();
        const formData = new FormData();
        formData.append("file", files[0]);
        axios
          .post(url, formData)
          .then((response) => {
            MySwal.clickConfirm();
            setUpdated((pre) => pre + 1);
            msg = { data: "File uploaded successfully!!!", type: 1 };
            // console.log(response);
          })
          .catch((err) => {
            if (err.response && err.response.status === 400) {
              MySwal.clickConfirm();
              msg = { data: `${err.response.data.errorMessage}.`, type: 2 };
            } else if (err.request && err.request.status === 0) {
              MySwal.clickConfirm();
              msg = { data: "Ops, something wrong with your file!!!", type: 2 };
            } else {
              MySwal.clickConfirm();
              msg = { data: "Ops, file uploading failed!!!", type: 2 };
            }
          });
      },
    }).then(() => {
      // console.log("msg: "+msg);
      return MySwal.fire(
        <p className="msg">
          {msg.type === 1 ? (
            <FaCheckCircle color="rgba(0,255,0,0.7)" />
          ) : (
            <FaExclamationCircle color="rgba(255,0,0,0.7)" />
          )}{" "}
          {msg.data}
        </p>
      );
    });
  };
  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div className={`${visibility}`}>
      <h1 className="filedroptext">File Uploader Showcase</h1>
      <div className="drop-container">
        <form
          id="form-file-upload"
          encType="multipart/form-data"
          method="POST"
          onDragEnter={handleDrag}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={inputRef}
            type="file"
            id="input-file-upload"
            multiple={true}
            onChange={handleChange}
          />
          <label
            id="label-file-upload"
            htmlFor="input-file-upload"
            className={dragActive ? "drag-active" : ""}
          >
            <div>
              <p className="uploadWarn">
                “ Uploaded File shouldn’t be greater than 10MB ”
              </p>
              <Lottie animationData={anim} loop={true} />
              <button className="upload-button" onClick={onButtonClick}>
                Drag & Drop your file here or click to upload from files
              </button>
            </div>
          </label>
          {dragActive && (
            <div
              id="drag-file-element"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            ></div>
          )}
        </form>
      </div>
    </div>
  );
}

export default FileDrop;
