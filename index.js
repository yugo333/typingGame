"use strict";
{
  let wordList = ["apple", "sweet", "sky", "blue", "spine"];
  let word = wordList[Math.floor(Math.random() * wordList.length)];
  let number = 0;
  let score = 0;
  let miss = 0;
  let startTime;
  const maxLimit = 5000;
  let isPlaying = false;

  const target = document.getElementById("target");
  const scoreHtml = document.getElementById("score");
  const missHtml = document.getElementById("miss");
  const limitHtml = document.getElementById("limit");

  // target.innerHTML = word;

  function limitTime() {
    const limitT = startTime + maxLimit - Date.now();
    limitHtml.innerHTML = (limitT / 1000).toFixed(3);
    // console.log(limitTime.toFixed(3));

    const timeID = setTimeout(() => {
      limitTime();
    }, 10);

    if (limitT <= 0) {
      clearTimeout(timeID);
      limitHtml.innerHTML = "0.00";
      isPlaying = false;
      setTimeout(() => {
        // alert("game over");
        total();
      }, 100);
    }
  }
  function total() {
    const totalScore = score + miss === 0 ? 0 : (score / (score + miss)) * 100;
    alert(`scorer:${score},miss:${miss},average${totalScore.toFixed(2)}%`);
    score = 0;
    miss = 0;
    number = 0;
    missHtml.innerHTML = 0;
    scoreHtml.innerHTML = 0;
    target.innerHTML = "click to start";
  }

  function updateTarget() {
    let update = "";
    for (let i = 0; i < number; i++) {
      update += "_";
    }
    target.innerHTML = update + word.substring(number);
  }

  window.addEventListener("click", () => {
    if (isPlaying === true) {
      return;
    }
    isPlaying = true;
    target.innerHTML = word;
    startTime = Date.now();
    limitTime();
  });

  window.addEventListener("keydown", (k) => {
    // console.log(k.key);
    if (isPlaying === false) {
      return;
    }
    if (k.key === word[number]) {
      number++;
      if (number === word.length) {
        //updateTargetの上に書く
        word = wordList[Math.floor(Math.random() * wordList.length)];
        number = 0;
      }
      updateTarget();

      score++;
      scoreHtml.innerHTML = score;
    } else {
      console.log("missF");
      miss++;
      missHtml.innerHTML = miss;
    }
  });
}
