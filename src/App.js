import { useState } from "react";
import "./App.css";
import { handleBtnClick } from "./services/jokeService";

export const App = () => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="app-container">
      <header className="app-heading">
        <h1 className="app-heading-text">Chuckle Checklist</h1>
      </header>
      <h2>Add Joke</h2>

      <section className="joke-add-form">
        <input
          className="joke-input"
          type="text"
          value={inputValue}
          placeholder="New One Liner"
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
        <button
          className="joke-input-submit"
          onClick={() => {
            handleBtnClick(inputValue);
            setInputValue("");
          }}
        >
          Add
        </button>
      </section>
    </div>
  );
};
