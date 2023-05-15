import React, { useEffect, useState } from 'react';
import "./style.css";

//get local storage data back

const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  }
  else {
    return [];
  }
};
const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // Add the items fxn
  const addItem = () => {
    if (!inputData) {
      alert("Please fill the data");
    } else if (inputData && toggleButton) {
      setItems
        (
          items.map((currentElement) => {
            if (currentElement.id === isEditItem) {
              return { ...currentElement, name: inputData };
            }
            return currentElement;
          })
        );
      setInputData([]);
      setIsEditItem(null);
      setToggleButton(false);

    }
    else {
      const myNewInputData =
      {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]);
      setInputData("");

    }
  };

  //edit the items
  const editItem = (index) => {
    const item_todo_edited = items.find((currentElement) => {
      return currentElement.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);

  };

  //How to delete items section
  const deleteItem = (index) => {
    const updatedItem = items.filter((currentElement) => {
      return currentElement.id !== index;
    });
    setItems(updatedItem);
  };

  //Remove all items
  const removeAll = () => {
    setItems([]);

  }

  //Adding local Storage

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);
  return (

    <>
      <div className='main-div'>
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todo logo" />
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍️ Add Item"
              className='form-control'
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ?
              (
                <i className="far fa-edit add-btn" onClick={addItem}></i>
              ) :
              (
                <i className="fa fa-plus add-btn" onClick={addItem}></i>
              )}

          </div>

          {/* show items */}
          <div className="showItems">

            {items.map((currentElement) => {
              return (
                <div className="eachItem" key={currentElement.id}>
                  <h3>{currentElement.name}</h3>
                  <div className="todo-btn">
                    <i className="far fa-edit add-btn" onClick={() => editItem(currentElement.id)}></i>
                    <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(currentElement.id)}></i>
                  </div>
                </div>
              );
            })}

          </div>

          {/* remove all button */}
          <div className="showItems">
            <button className='btn effect04' onClick={removeAll} data-sm-link-text="Remove All">
              <span> CHECK LIST  </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo;
