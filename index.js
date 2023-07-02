let index = 0;
let attempts = 0;
const answer = "RAMEN";

let timer;
const appStart = () => {
  const gameOver = () => {
    window.removeEventListener("keydown", handleKeyDown);
    alert("게임이종료되었습니다.");
    clearInterval(timer);
  };
  const nextLine = () => {
    if (attempts === 6) return gameOver();

    attempts += 1;
    index = 0;
  };
  const handleBackspaceKey = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-id='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };
  const handleEnterKey = () => {
    let score = 0;
    for (let i = 0; i < answer.length; i++) {
      const block = document.querySelector(
        `.board-column[data-id='${attempts}${i}']`
      );
      const letter = block.innerText;
      const answerLetter = answer[i];

      if (letter === answerLetter) {
        score += 1;
        block.style.background = "#6AAA64";
      } else if (answer.includes(letter)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";

      block.style.color = "#fff";
    }
    if (score === 5) gameOver();
    nextLine();
  };
  const handleKeyDown = (e) => {
    const key = e.key.toUpperCase();
    const keyId = e.keyCode;
    const currentBlock = document.querySelector(
      `.board-column[data-id='${attempts}${index}']`
    );
    if (e.key === "Backspace") {
      handleBackspaceKey();
    }
    if (index === 5) {
      if (e.key === "Enter") {
        handleEnterKey();
      } else return;
    } else if (65 <= keyId && keyId <= 90) {
      currentBlock.innerText = key;
      index += 1;
    }
  };

  const startTimer = () => {
    console.log("ss");
    const setTime = new Date();
    const setTimer = () => {
      const currentTime = new Date();
      const passedTime = new Date(currentTime - setTime);
      const min = passedTime.getMinutes().toString().padStart(2, "0");
      const sec = passedTime.getSeconds().toString().padStart(2, "0");
      const time = document.querySelector("#timer");
      time.innerText = `${min}:${sec}`;
    };
    timer = setInterval(setTimer, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeyDown);
};
appStart();
