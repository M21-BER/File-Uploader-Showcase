import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";

export default function handleClick(id, url, setUpdated) {
  const MySwal = withReactContent(Swal);
  let msg = null;

  MySwal.fire({
    title: (
      <>
        <p className="msg">Deleting File...</p>
      </>
    ),
    allowOutsideClick: false,
    didOpen: () => {
      MySwal.showLoading();
      axios
        .delete(`${url}/${id}`)
        .then((response) => {
          MySwal.clickConfirm();
          setUpdated((pre) => pre + 1);
          msg = { data: "File removed  successfully!!!", type: 1 };
        })
        .catch((err) => {
          MySwal.clickConfirm();
          msg = { data: "Ops, removing file failed!!!", type: 2 };
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
}
