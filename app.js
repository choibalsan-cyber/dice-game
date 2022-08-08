// Глобаль хувьсагчид
// Төлвийн хувьсагч
let isNewGame;
// Идэвхтэй тоглогчийг хадгалах хувьсагч
let activePlayer;

// Тоглогчдын оноог хадгалах хувьсагч
let scores;

// Яг одоо тоглож байгаа тоглогчийн оноог хадгалах хувьсагч
let roundScore;

// Шооны DOM
const diceDom = document.querySelector(".dice");

initGame();

// Тоглогчдыг тоглоход бэлтгэх
function initGame() {
  isNewGame = true;
  // 1-р тоглогчийг 0, 2-р тоглогчийг 1-ээр тэмдэглэе
  activePlayer = 0;

  // 2тоглогчийн оноог хадгалах
  scores = [0, 0];

  roundScore = 0;

  // Оноонуудыг 0 болгох
  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;

  //   Шоог эхлэхэд зургийг алга болгох
  diceDom.style.display = "none";

  //   Идэвхтэй тоглогчийн 1-р тоглогч болгох
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");

  //   Тоглогчдын нэрийг бэлтгэх
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  //   Улаан өнгийг арилгах
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
}

// Шоо шидэх үеийн эвент листенер
document.querySelector(".btn-roll").addEventListener("click", () => {
  if (isNewGame) {
    //   Шооны нүхний тоо нь 1-6хооронд санамсаргүйгээр бууна.
    let diceNumber = Math.floor(Math.random() * 6) + 1;

    //   Шоог дэлгэцэнд харуулах
    diceDom.style.display = "block";

    //   Шооны нүхний тоог дэлгэцэнд харуулах
    diceDom.src = `dice-${diceNumber}.png`;

    //   Шооны нүх 1-ээс ялгаатай байвал ээлжийн оноон дээр нэмнэ
    if (diceNumber !== 1) {
      // Ээлжийн оноог нэмж бодно
      roundScore += diceNumber;

      // Дэлгэцэнд харуулна
      document.getElementById(`current-${activePlayer}`).textContent =
        roundScore;
    } else switchToNextPlayer();
  }
});

// Ээлжийг солих
function switchToNextPlayer() {
  // Одоо тоглож байгаа тоглогч 1 буулгасан тул ээлжийн оноог 0 болгоно
  roundScore = 0;

  // Дэлгэцэн дээр 0 болгоно
  document.getElementById(`current-${activePlayer}`).textContent = 0;

  //   1буусан тоглогчийн шоог харагдахгүй болгоно
  diceDom.style.display = "none";
  // Хэрвээ 1-р тоглогч тоглож байвал 2-р тоглогч болгох ба эсвэл 2-р тоглогч тоглож байвал 1-р тоглогч болгоно
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  //   Улаан цэг болон арын саарал дэвсгэртийг шоо шидэх ээлж нь ирж байгаа тоглогч руу шилжүүлнэ
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

// Hold товчны эвент листенер
document.querySelector(".btn-hold").addEventListener("click", () => {
  if (isNewGame) {
    // ээлжийн оноог авч өөрийнхөө оноон дээр нэмнэ
    scores[activePlayer] += roundScore;

    // Өөрийнхөө оноог дэлгэцэн дээр харуулна
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];

    // Цуглуулсан оноо нь 100хүрээгүй бол ээлжийг шилжүүлнэ
    if (scores[activePlayer] >= 10) {
      isNewGame = false;
      // Дэлгэцэн дээр Winner гэж гаргана
      document.getElementById("name-" + activePlayer).textContent = "WINNER!!!";

      // Улаан өнгөтэй болгоно
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.add("winner");

      // Ээлжийг илэрхийлсэн улаан бөөрөнхийг авч хаяна
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.remove("active");
    } else switchToNextPlayer();
  }
});

// New Game товчны эвент листенер
document.querySelector(".btn-new").addEventListener("click", initGame);
