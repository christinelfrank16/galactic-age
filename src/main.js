import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/tooltip';
import './styles.css';
import solarSystemImg from './images/solarsystem';
import planetImg from './images/planet';
import {Galaxy} from './galaxy.js';
import {checkAgeInput, convertAge, checkFormInput, calcExpectedEarthLife, calcExpectedPlanetLife, calcAgeDiff} from './calculator.js';

$(document).ready(function(){
  let ssImg = $("#solarSystem");
  ssImg.attr("src", solarSystemImg);
  let galaxy = new Galaxy();
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });
  updateSliderValues();

  $("#info").submit(function(event){
    event.preventDefault();
    const quizResults = getQuizResults();
    if(!checkFormInput(quizResults)){
      missingInput();
    } else {
      makeAgeForm();
    }
    $('#results').show();
  });

  $(".slidecontainer").on("input", function(){
    updateSliderValues();
  });
});

function makeAgeForm(){
  const ageForm = `
    <form id="age">
      <label for="age">Enter your age:</label>
      <input id="age" type="text">
      <button type="submit" name="button"> Submit Age</button>
    </form>
  `
  $('#results').html(ageForm);
}

function missingInput(){
  $("#results").text("Please select options from all sections of quiz.");
  $("#results").addClass('missing-input');
}

function getQuizResults(){
  const exercise = $("input:radio[name=exercise]:checked").val();
  const meal = $("input:radio[name=meal]:checked").val();
  const other = $("input:checkbox[name=influence]:checked").toArray();
  const technical = $("#technical").val();
  const social = $("#social").val();
  const adapt = $("#adapt").val();
  const gov = $("input:radio[name=government]:checked");
  const inputArray = [exercise, meal, other, technical, social, adapt, gov];
  return inputArray;
}

function updateSliderValues(){
  const technical = $("#technical").val();
  $("#technical-value").text(technical);

  const social = $("#social").val();
  $("#social-value").text(social);

  const adapt = $("#adapt").val();
  $("#adapt-value").text(adapt);
}
