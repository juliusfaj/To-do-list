import React, { useState, useEffect } from "react";
import SingleItem from "./data";
import Alert from "./alert";

const getItem = () => {
  const item = JSON.parse(localStorage.getItem("list"));
  return item;
};

function App() {
  const [value, setValue] = useState("");
  const [list, setList] = useState(getItem());
  const [redBorder, setRedBorder] = useState(false);
  const [alert, setAlert] = useState({
    statue: false,
    message: "enter a value",
    style: "success",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [edit, setEdit] = useState("submit");

  const handleAlert = (statue, message, style) => {
    setAlert({ statue, message, style });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      handleAlert(true, "enter a value", "danger");
      setRedBorder(true);
    } else if (value && isEditing) {
      handleAlert(true, "item edited", "success");
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, name: value };
          }
          return item;
        })
      );
      setValue("");
      setEditID(null);
      setIsEditing(false);
      setEdit("submit");
      setRedBorder(false);
    } else {
      setRedBorder(false);
      setList([...list, { id: new Date().getTime().toString(), name: value }]);

      setValue("");
      handleAlert(true, "item added", "success");
    }
  };

  const clearItem = () => {
    setList([]);
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const exactItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setValue(exactItem.name);
    setEdit("edit");
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <header className="header">to do list</header>

      {alert.statue && (
        <Alert {...alert} handleAlert={handleAlert} list={list} />
      )}
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter your list"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className={`${redBorder && "border-red"}`}
        />
        <button className="btn" type="submit">
          {edit}
        </button>
      </form>

      {list.length > 0 && (
        <div className="container">
          {list.map((item) => {
            return (
              <SingleItem
                key={item.id}
                {...item}
                removeItem={removeItem}
                handleAlert={handleAlert}
                editItem={editItem}
              />
            );
          })}
          <button
            className="clear-btn"
            onClick={() => {
              clearItem();
              handleAlert(
                true,
                `${list.length === 1 ? "item" : "items"} cleared`,
                "danger"
              );
            }}
          >
            clear all
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
