import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/tooltip';
import './styles.css';
import sun from './images/sun';
import mercury from './images/mercury';
import venus from './images/venus';
import earth from './images/earth';
import mars from './images/mars';
import jupiter from './images/jupiter';
import saturn from './images/saturn';
import uranus from './images/uranus';
import neptune from './images/neptune';
import pluto from './images/pluto';
import {Galaxy} from './galaxy.js';
import {checkAgeInput, convertAge, checkFormInput, calcExpectedEarthLife, calcExpectedPlanetLife, calcAgeDiff} from './calculator.js';

$(document).ready(function(){
  assignImgSrcs();
  let galaxy = new Galaxy();
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });
  updateSliderValues();

  $("#info").submit(function(event){
    event.preventDefault();
    const quizResults = getQuizResults();
    $("#results").removeClass('missing-input');
    if(!checkFormInput(quizResults)){
      missingInput("Please select options from all sections of quiz.");
    } else {
      $('#ageInput').show();
      $('#quiz').hide();
    }
    $('#results').show();
  });

  $("#ageForm").submit(function(event){
    event.preventDefault();
    $('#results').hide();
    $("#results").removeClass('missing-input');
    const age = $("#age").val();
    if(age === "" || !checkAgeInput(age)){
      missingInput("Please enter age as a positive whole number.");
      $('#results').show();
    } else {
      $('#results').hide();
    }


    $(".slidecontainer").on("input", function(){
      updateSliderValues();
    });
  });
});

function missingInput(message){
  $("#results").text(message);
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

function assignImgSrcs(){
  let sunImg = $("#sun");
  sunImg.attr("src", sun);
  let mercImg = $("#mercury");
  mercImg.attr("src", mercury);
  let venImg = $("#venus");
  venImg.attr("src", venus);
  let earImg = $("#earth");
  earImg.attr("src", earth);
  let marsImg = $("#mars");
  marsImg.attr("src", mars);
  let jupImg = $("#jupiter");
  jupImg.attr("src", jupiter);
  let satImg = $("#saturn");
  satImg.attr("src", saturn);
  let urImg = $("#uranus");
  urImg.attr("src", uranus);
  let nepImg = $("#neptune");
  nepImg.attr("src", neptune);
  let pluImg = $("#pluto");
  pluImg.attr("src", pluto);
}
