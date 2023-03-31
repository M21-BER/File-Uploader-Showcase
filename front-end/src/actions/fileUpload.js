import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";

const handleDrag = function (e, setDragActive) {
  e.preventDefault();
  e.stopPropagation();
  if (e.type === "dragenter" || e.type === "dragover") {
    setDragActive(true);
  } else if (e.type === "dragleave") {
    setDragActive(false);
  }
};

const handleDrop = function (e, setDragActive, url, setUpdated) {
  e.preventDefault();
  e.stopPropagation();
  setDragActive(false);
  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    handleFile(e.dataTransfer.files, url, setUpdated);
  }
};

const handleChange = function (e, url, setUpdated) {
  e.preventDefault();
  if (e.target.files && e.target.files[0]) {
    handleFile(e.target.files, url, setUpdated);
  }
};

const handleFile = (files, url, setUpdated) => {
  // console.log(files[0]);
  const MySwal = withReactContent(Swal);
  let msg = null;

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
          MySwal.clickConfirm();
          msg = { data: "Ops, file uploading failed!!!", type: 2 };
          // console.log(err);
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

export { handleDrag, handleDrop, handleChange, handleFile };
