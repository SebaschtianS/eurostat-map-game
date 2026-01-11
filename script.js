const maps = [
  { file: "Maps/populationdensity.png", answer: "Population Density" },
  { file: "Maps/gdppercapitappp.png", answer: "GDP per capita PPP" },
  { file: "Maps/heatingpowerdays.png", answer: "Heating Days" },
  { file: "Maps/railway.png", answer: "Railway kilometres" },
  { file: "Maps/employmenthightech.png", answer: "Share of employment in high-tech industries" },
  { file: "Maps/fertility.png", answer: "Fertility rate" },
  { file: "Maps/internetusage.png", answer: "Share of individuals using the Internet" },
  { file: "Maps/lifeexpectancy.png", answer: "Average life expectancy" },
  { file: "Maps/naturalpopulationchange.png", answer: "Natural population change" },
  { file: "Maps/netmigration.png", answer: "Net migration" },
  { file: "Maps/populationchange.png", answer: "Total population change" },
  { file: "Maps/povertyrisk.png", answer: "Poverty risk" },
  { file: "Maps/researchexpenditure.png", answer: "Share of public expenditure on research and development" },
  { file: "Maps/tertiaryeducation.png", answer: "Share of population with tertiary education" },
  { file: "Maps/tourismstays.png", answer: "Tourism stays per year" }
];

let score = 0;
let currentIndex = 0;
const totalMaps = maps.length;

const topics = [
  "Population Density",
  "GDP per capita PPP",
  "Renewable Energy Use",
  "Unemployment Rate",
  "Railway kilometres",
  "Heating Days",
  "Share of employment in high-tech industries",
  "Fertility rate",
  "Share of individuals using the Internet",
  "Average life expectancy",
  "Natural population change",
  "Net migration",
  "Total population change",
  "Poverty risk",
  "Share of public expenditure on research and development",
  "Share of population with tertiary education",
  "Tourism stays per year"
];

function loadMap() {
  if (currentIndex >= totalMaps) {
    endGame();
    return;
  }

  const mapData = maps[currentIndex];
  document.getElementById("map").src = mapData.file;

  const shuffledTopics = topics.sort(() => Math.random() - 0.5);
  const options = shuffledTopics.slice(0, 3);

  if (!options.includes(mapData.answer)) {
    options[Math.floor(Math.random() * 3)] = mapData.answer;
  }

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";
  options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;   

    btn.classList.remove("correct", "wrong", "muted");
    btn.disabled = false;

    btn.onclick = () => checkAnswer(option);
    choicesDiv.appendChild(btn);

  });

  updateProgress();
  document.getElementById("feedback").textContent = "";
}

function checkAnswer(selectedOption) {
  const buttons = document.querySelectorAll("#choices button");
  const correctAnswer = maps[currentIndex].answer;

  buttons.forEach(btn => {
    btn.disabled = true;

    const buttonText = btn.textContent;

    if (buttonText === correctAnswer) {
      // Always highlight the correct answer
      btn.classList.add("correct");
    } 
    else if (buttonText === selectedOption) {
      // This is the clicked button AND it is wrong
      btn.classList.add("wrong");
    } 
    else {
      // Wrong answers that were NOT clicked
      btn.classList.add("muted");
    }
  });

  if (selectedOption === correctAnswer) {
    score++;
    document.getElementById("feedback").textContent = "✔ Correct!";
  } else {
    document.getElementById("feedback").textContent =
      `❌ Wrong! Correct answer: ${correctAnswer}`;
  }

  updateScoreboard();
}


function updateProgress() {
  document.getElementById("progress").textContent =
    `Map ${currentIndex + 1} of ${totalMaps}`;
}

function updateScoreboard() {
  document.getElementById("score").textContent = "Score: " + score;
}

function endGame() {
  alert(`Game Over! Your score: ${score}/${totalMaps}`);
  score = 0;
  currentIndex = 0;
  updateScoreboard();
  loadMap();
}

maps.sort(() => Math.random() - 0.5);

document.getElementById("next").onclick = () => {
  currentIndex++;
  loadMap();
};

loadMap();