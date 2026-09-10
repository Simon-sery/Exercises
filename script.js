// -----------------------------------
// IMPORTER LÆRERENS LOADJSON
// -----------------------------------

import { loadJSON } from "./utils_lib.js";

// -----------------------------------
// VEJRKODER + IKONER
// -----------------------------------

const wwCodes = {
  0: "clearsky_day.png",
  1: "fair_day.png",
  2: "partlycloudy_day.png",
  3: "cloudy.png",

  45: "fog.png",
  48: "fog.png",

  51: "lightrain.png",
  53: "lightrain.png",
  55: "lightrain.png",

  56: "lightsleet.png",
  57: "lightsleet.png",

  61: "lightrain.png",
  63: "rain.png",
  65: "heavyrain.png",

  66: "lightsleet.png",
  67: "lightsleet.png",

  71: "lightsnow.png",
  73: "snow.png",
  75: "heavysnow.png",
  77: "lightsnow.png",

  80: "lightrainshowers_day.png",
  81: "rainshowers_day.png",
  82: "heavyrainshowers_day.png",

  85: "lightsnowshowers_day.png",
  86: "heavysnowshowers_day.png",

  95: "rainandthunder.png",
};

// -----------------------------------
// ARRAY MED ALLE TASKS
// -----------------------------------

let tasks = [];

// -----------------------------------
// FIND HTML-ELEMENTER
// -----------------------------------

const taskInput = document.querySelector("#taskInput");

const dateInput = document.querySelector("#dateInput");

const outdoorInput = document.querySelector("#outdoorInput");

const addButton = document.querySelector("#addButton");

const todoList = document.querySelector("#todoList");

const doneList = document.querySelector("#doneList");

// -----------------------------------
// KLIK PÅ TILFØJ-KNAPPEN
// -----------------------------------

addButton.addEventListener("click", addTask);

// -----------------------------------
// OPRET NY TASK
// -----------------------------------

function addTask() {
  // Hent det brugeren har skrevet
  const text = taskInput.value;

  // Hent datoen
  const date = dateInput.value;

  // Tjek om checkboxen er markeret
  const outdoor = outdoorInput.checked;

  // Hvis tekst eller dato mangler, stopper funktionen
  if (text === "" || date === "") {
    return;
  }

  // Lav et nyt task-object
  const task = {
    // Unikt ID
    id: Date.now(),

    // Teksten brugeren skrev
    text: text,

    // Tasken starter som ikke færdig
    done: false,

    // Dato
    date: date,

    // Outdoor true eller false
    outdoor: outdoor,

    // Vi har ikke fået vejret endnu
    weatherCode: null,
  };

  // Tilføj tasken til vores array
  tasks.push(task);

  // Hvis tasken er outdoor,
  // så hent vejret
  if (task.outdoor === true) {
    getWeather(task);
  }

  // Ryd inputfelterne
  taskInput.value = "";

  dateInput.value = "";

  outdoorInput.checked = false;

  // Vis tasks på siden
  showTasks();
}

// -----------------------------------
// VIS ALLE TASKS
// -----------------------------------

function showTasks() {
  // Tøm listerne før vi bygger dem op igen
  todoList.replaceChildren();

  doneList.replaceChildren();

  // Gå igennem alle tasks
  tasks.forEach(function (task) {
    // -----------------------------------
    // LAV LI-ELEMENT
    // -----------------------------------

    const li = document.createElement("li");

    // Vis taskens tekst
    li.textContent = task.text;

    // -----------------------------------
    // VIS DATO
    // -----------------------------------

    const dateText = document.createElement("p");

    dateText.textContent = task.date;

    li.appendChild(dateText);

    // -----------------------------------
    // VIS OUTDOOR
    // -----------------------------------

    if (task.outdoor === true) {
      const outdoorText = document.createElement("p");

      outdoorText.textContent = "Outdoor";

      li.appendChild(outdoorText);
    }

    // -----------------------------------
    // VIS VEJR
    // -----------------------------------

    // Vi viser kun vejret hvis:
    // 1. tasken er outdoor
    // 2. vi har fået en weatherCode
    if (task.outdoor === true && task.weatherCode !== null) {
      // Vis vejrkode
      const weatherText = document.createElement("p");

      //weatherText.textContent = "Vejrkode: " + task.weatherCode;

      li.appendChild(weatherText);

      // Find vejrkode
      const weatherCode = task.weatherCode;

      // Find det rigtige billede
      const icon = wwCodes[weatherCode];

      // Hvis der findes et ikon
      if (icon) {
        const weatherImg = document.createElement("img");

        // Billederne ligger i mappen "billed"
        weatherImg.src = "./billed/" + icon;

        li.appendChild(weatherImg);
      }

      // -----------------------------------
      // REGN-ADVARSEL
      // -----------------------------------

      if (
        icon === "rain.png" ||
        icon === "heavyrain.png" ||
        icon === "lightrain.png" ||
        icon === "rainshowers_day.png" ||
        icon === "heavyrainshowers_day.png" ||
        icon === "lightrainshowers_day.png" ||
        icon === "rainandthunder.png"
      ) {
        const rainText = document.createElement("p");

        rainText.textContent = "Det ser ud til at regne – husk regntøj!";

        li.appendChild(rainText);
      }
    }

    // -----------------------------------
    // FÆRDIG / FORTRYD
    // -----------------------------------

    if (task.done === false) {
      // Lav færdig-knap
      const doneButton = document.createElement("button");

      doneButton.textContent = "Færdig";

      // Når man klikker på knappen
      doneButton.addEventListener("click", function () {
        completeTask(task.id);
      });

      li.appendChild(doneButton);
    } else {
      // Lav fortryd-knap
      const undoButton = document.createElement("button");

      undoButton.textContent = "Fortryd";

      // Når man klikker på fortryd
      undoButton.addEventListener("click", function () {
        undoTask(task.id);
      });

      li.appendChild(undoButton);
    }

    // -----------------------------------
    // SLET-KNAP
    // -----------------------------------

    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Slet";

    // Når man klikker på slet
    deleteButton.addEventListener("click", function () {
      deleteTask(task.id);
    });

    li.appendChild(deleteButton);

    // -----------------------------------
    // PLACER TASK I RIGTIG LISTE
    // -----------------------------------

    if (task.done === false) {
      // Ikke færdig
      todoList.appendChild(li);
    } else {
      // Færdig
      doneList.appendChild(li);
    }
  });
}

// -----------------------------------
// MARKER TASK SOM FÆRDIG
// -----------------------------------

function completeTask(id) {
  // Find tasken med det rigtige ID
  const task = tasks.find(function (task) {
    return task.id === id;
  });

  // Markér som færdig
  task.done = true;

  // Opdater listen
  showTasks();
}

// -----------------------------------
// FORTRYD FÆRDIG
// -----------------------------------

function undoTask(id) {
  // Find tasken
  const task = tasks.find(function (task) {
    return task.id === id;
  });

  // Gør den ikke-færdig igen
  task.done = false;

  // Opdater siden
  showTasks();
}

// -----------------------------------
// SLET TASK
// -----------------------------------

function deleteTask(id) {
  // Behold alle tasks
  // undtagen den med det valgte ID
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });

  // Opdater listen
  showTasks();
}

// -----------------------------------
// HENT VEJR FRA OPEN-METEO
// -----------------------------------

function getWeather(task) {
  // Vi bruger samme placering hver gang
  // 55.68 / 12.57

  // Taskens dato bruges både som start og slut
  const url = `https://api.open-meteo.com/v1/forecast?latitude=55.68&longitude=12.57&daily=weathercode&start_date=${task.date}&end_date=${task.date}`;

  // Hent JSON-data
  loadJSON(url, function (data) {
    // Når data er klar,
    // send data + task videre
    dataLoaded(data, task);
  });
}

// -----------------------------------
// NÅR VEJRET ER HENTET
// -----------------------------------

function dataLoaded(data, task) {
  // Gem vejrkoden på tasken
  task.weatherCode = data.daily.weathercode[0];

  // Vis siden igen
  // nu med vejret
  showTasks();
}
