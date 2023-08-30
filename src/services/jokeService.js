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
