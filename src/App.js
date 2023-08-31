import { useEffect, useState } from "react";
import "./App.css";
import {
  getAllJokes,
  handleBtnClick,
  editJoke,
  deleteJoke,
} from "./services/jokeService";

export const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [allJokes, setAllJokes] = useState([]);
  const [untoldJokes, setUntoldJokes] = useState([]);
  const [toldJokes, setToldJokes] = useState([]);

  useEffect(() => {
    getAllJokes().then((jokesArray) => {
      setAllJokes(jokesArray);
      const toldJokes = jokesArray.filter((joke) => joke.told);
      const untoldJokes = jokesArray.filter((joke) => !joke.told);
      setToldJokes(toldJokes);
      setUntoldJokes(untoldJokes);
      console.log("jokes set!");
    });
  }, []);

  return (
    <>
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
            onClick={async () => {
              if (!inputValue) return;
              const newJoke = { id: 0, text: inputValue, told: false };
              setUntoldJokes([...untoldJokes, newJoke]);
              setInputValue("");
              await handleBtnClick(inputValue);
              const updatedJokes = await getAllJokes();
              setAllJokes(updatedJokes);
              const newToldJokes = updatedJokes.filter((joke) => joke.told);
              const newUntoldJokes = updatedJokes.filter((joke) => !joke.told);
              setToldJokes(newToldJokes);
              setUntoldJokes(newUntoldJokes);
            }}
          >
            Add
          </button>
        </section>
        <div className="joke-lists-container">
          <div className="joke-list-container">
            <h2>
              Untold Jokes{" "}
              <span className="told-count">{untoldJokes.length}</span>
            </h2>
            <ul>
              {untoldJokes.map((joke) => {
                return (
                  <li className="joke-list-item" key={joke.id}>
                    <p className="joke-list-item-text">{joke.text}</p>
                    <div className="joke-list-action-delete">
                      <button
                        onClick={async () => {
                          await deleteJoke(joke.id);
                          const updatedJokes = await getAllJokes();
                          setAllJokes(updatedJokes);

                          const newToldJokes = updatedJokes.filter(
                            (j) => j.told
                          );
                          const newUntoldJokes = updatedJokes.filter(
                            (j) => !j.told
                          );

                          setToldJokes(newToldJokes);
                          setUntoldJokes(newUntoldJokes);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                    <div className="joke-list-action-toggle">
                      <button
                        onClick={async () => {
                          const editedJoke = {
                            id: joke.id,
                            text: joke.text,
                            told: !joke.told,
                          };
                          editJoke(editedJoke);
                          const updatedJokes = await getAllJokes();
                          setAllJokes(updatedJokes);
                          const newToldJokes = updatedJokes.filter(
                            (joke) => joke.told
                          );
                          const newUntoldJokes = updatedJokes.filter(
                            (joke) => !joke.told
                          );
                          setToldJokes(newToldJokes);
                          setUntoldJokes(newUntoldJokes);
                        }}
                      >
                        {joke.told ? "Untold" : "Told"}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="joke-list-container">
            <h2>
              Told Jokes{" "}
              <span className="untold-count">{toldJokes.length}</span>
            </h2>
            <ul>
              {toldJokes.map((joke) => {
                return (
                  <li className="joke-list-item" key={joke.id}>
                    <p className="joke-list-item-text">{joke.text}</p>
                    <div className="joke-list-action-delete">
                      <button
                        onClick={async () => {
                          await deleteJoke(joke.id);
                          const updatedJokes = await getAllJokes();
                          setAllJokes(updatedJokes);

                          const newToldJokes = updatedJokes.filter(
                            (j) => j.told
                          );
                          const newUntoldJokes = updatedJokes.filter(
                            (j) => !j.told
                          );

                          setToldJokes(newToldJokes);
                          setUntoldJokes(newUntoldJokes);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                    <div className="joke-list-action-toggle">
                      <button
                        onClick={async () => {
                          const editedJoke = {
                            id: joke.id,
                            text: joke.text,
                            told: !joke.told,
                          };
                          editJoke(editedJoke);
                          const updatedJokes = await getAllJokes();
                          setAllJokes(updatedJokes);
                          const newToldJokes = updatedJokes.filter(
                            (joke) => joke.told
                          );
                          const newUntoldJokes = updatedJokes.filter(
                            (joke) => !joke.told
                          );
                          setToldJokes(newToldJokes);
                          setUntoldJokes(newUntoldJokes);
                        }}
                      >
                        {joke.told ? "Untold" : "Told"}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
