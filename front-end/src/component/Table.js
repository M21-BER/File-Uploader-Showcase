import React from "react";
import { FaTrash } from "react-icons/fa";
function Table({ id, name, size, date, handleDelete, url, setUpdated }) {
  const sizeCalculator = (size) => {
    if (size < 1000) {
      return size + " bytes";
    } else if (size >= 1000) {
      return size + " kb";
    } else if (size >= 1000000) {
      return size + " mb";
    }
  };
  const monthCalculator = (date) => {
    const int = parseInt(date.split("-")[1]);
    switch (int) {
      case 1:
        return "Jan";
      case 2:
        return "Feb";
      case 3:
        return "Mar";
      case 4:
        return "Apr";
      case 5:
        return "May";
      case 6:
        return "Jun";
      case 7:
        return "Jul";
      case 8:
        return "Aug";
      case 9:
        return "Sep";
      case 10:
        return "Oct";
      case 11:
        return "Nov";
      case 12:
        return "Dec";
      default:
        return date.split("-")[1];
    }
  };
  return (
    <table cellPadding="0" cellSpacing="0" border="0">
      <tbody>
        <tr>
          <td>{name}</td>
          <td>{sizeCalculator(size)}</td>
          <td>
            {monthCalculator(date) +
              " " +
              date.split("-")[2].split("T")[0] +
              ", " +
              date.split("-")[0]}
          </td>
          <td>
            <button
              className="remove-btn"
              onClick={() => {
                handleDelete(id, url, setUpdated);
              }}
            >
              <FaTrash color="#ff0000" /> Remove
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
