import React, { useState } from "react";
import useStore from "../store/box-store";

const Section1 = () => {
  const [txt, setTxt] = useState("");
  const { arr2, addArr2, delArr2 } = useStore((state) => ({
    arr2: state.arr2,
    addArr2: state.addArr2,
    delArr2: state.delArr2,
  }));

  const handleOnChange = (e) => {
    setTxt(e.target.value);
  };

  const handleClickAdd = () => {
    if (txt.trim()) {
      addArr2(txt);
      alert("Item added successfully!");
      setTxt(""); // Clear input after adding
    } else {
      alert("Please enter a valid item.");
    }
  };

  const handleDelete = (id) => {
    delArr2(id);
    alert("Item deleted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">My App</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#home" className="hover:text-gray-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-gray-300">
                  About
                </a>
              </li>
              <li>
                <a href="#login" className="hover:text-gray-300">
                  Login
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Todo List</h2>
          <div className="flex space-x-2 mb-4">
            <input
              className="border border-gray-300 rounded-lg px-4 py-2 flex-1"
              type="text"
              value={txt}
              onChange={handleOnChange}
            />
            <button
              className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
              onClick={handleClickAdd}
            >
              Add
            </button>
          </div>
          <ul>
            {arr2.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between bg-gray-200 p-2 mb-2 rounded-lg"
              >
                <span>{item.title}</span>
                <button
                  className="bg-blue-600 text-white rounded-lg px-2 py-1 hover:bg-red-600"
                  onClick={() => handleDelete(item.id)}
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Section1;
