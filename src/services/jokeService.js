export const getAllJokes = () => {
  return fetch("http://localhost:8088/jokes").then((res) => res.json());
};

export const handleBtnClick = async (text) => {
  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, told: false }),
  };

  const response = await fetch("http://localhost:8088/jokes", postOptions);
};

export const editJoke = async (editedJokeObject) => {
  const putOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedJokeObject),
  };

  const response = await fetch(
    `http://localhost:8088/jokes/${editedJokeObject.id}`,
    putOptions
  );
};

export const deleteJoke = async (jokeId) => {
  const deleteOptions = {
    method: "DELETE",
  };

  const response = await fetch(
    `http://localhost:8088/jokes/${jokeId}`,
    deleteOptions
  );
  const updatedJokes = await response.json();
  return updatedJokes;
};
