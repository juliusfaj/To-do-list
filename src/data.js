import react from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function SingleItem({ id, name, removeItem, handleAlert, editItem }) {
  return (
    <div className="item">
      <p>{name}</p>
      <div className="btn-container">
        <button
          className="edit-btn"
          type="button"
          onClick={() => {
            editItem(id);
          }}
        >
          <FaEdit />
        </button>
        <button
          className="delete-btn"
          type="button"
          onClick={() => {
            removeItem(id);
            handleAlert(true, "item deleted", "danger");
          }}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default SingleItem;
