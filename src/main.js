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
  const data = {};
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
      data.quizResults = "";
    } else {
      data.quizResults = quizResults;
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
      data.age = "";
      $('#results').show();
    } else {
      data.age = parseInt(age);
      $('#results').hide();
    }
  });

  $("img").click(function(){
    const planetName = $(this).attr('id');
    $("#results").removeClass('missing-input');
    if(data.quizResults && data.age){
      const results = planetResults(planetName, data.age, data.quizResults, galaxy);
      $('#results').html(`<p>${results}</p>`);
    } else {
      missingInput("Answer the quiz and then enter your age.");
    }
    $("#results").show();
  });

  $(".slidecontainer").on("input", function(){
    updateSliderValues();
  });

});

function planetResults(planetName, age, inputArray, galaxy){
  const planet = galaxy[planetName];
  const planetAge = convertAge(planet, age);
  const expectedLifeSpan = calcExpectedPlanetLife(planet, inputArray);
  const ageDiff = calcAgeDiff(age, planet, inputArray);
  return makePlanetResults(age, planetName, planetAge, expectedLifeSpan, ageDiff)
}

function makePlanetResults(age, planetName, planetAge, expectedLifeSpan, ageDiff){
  let resultsString = "";
  if(planetName !== "earth"){
    resultsString = `You would be <strong>${age}</strong> years old on Earth, but here on <strong>${planetName}</strong> you are <strong>${planetAge}</strong>.`
  } else {
    resultsString = `You are still on <strong>Earth</strong> at the age of <strong>${age}</strong>... You wish you could be out in the galaxy instead of on this dying planet.`
  }

  switch (planetName) {
    case "mercury":
      resultsString += ` Life here isn't exactly what you thought it would be. The light gravity isn't suitable for the body, and the large temperature swings - while not as extreme as some of the other planets - are a detriment to your life span. Luckily the atomosphere contains some oxygen...`;
      if(ageDiff > 0){
        resultsString += ` <br> Amazingly, you have lived past your expected life by <strong>${ageDiff}</strong>. You've seen a lot go on in the galaxy, but are wondering if you are on borrowed days as the government rule is starting to show its age too.`
      } else {
        resultsString += ` Although you fear that in one of these long nights, the technology generating your air will break, ending your life before expected, at the age of <strong>${expectedLifeSpan}</strong>.`;
      }
      break;
    case "venus":
      resultsString += ` While reflecting the sun's light, venus is one of the brightest planets in the galaxy, but at a cost of long nights.`
      if(ageDiff > 0){
        resultsString += ` <br> This year, you celebrated your birthday in the dark, something to be proud of as having what is known as a 'dark birthday' is unlikely. You have lived past your expected life by <strong>${ageDiff}</strong> years. Part of the cause is venus's more adaptable conditions with almost-Earth gravity force and very moderate temperature swings.`
      } else {
        resultsString += ` You're still a young-buck (or doe, as it may be), but your life ends at the estimated age of <strong>${expectedLifeSpan}</strong>. You work in the Center, helping tend to the greenhouses where the planet's food is grown. There are rumors of a rogue clan trying to rise up agains the government; while you tended the garden, you have been asked: are you going to join? So... are you?`;
      }
      break;
    case "earth":
      resultsString += ' Previous generations used up the resources on what used to be called "Blue Planet". Now everyone calls it the Brown Planet, and many don\'t know it as Earth anymore. You are stuck here because your parent\'s parents were not wealthy enough to get on the rockets while they were affordable.';
      if(ageDiff > 0){
        resultsString += ` You are no longer young and spry, about <strong>${ageDiff}</strong> past your expected life. Your body aches and your bones hurt. You are living on borrowed air - literally - (it's sourced from the other planets) and you've heard it may not be imported for much longer...`
      } else {
        resultsString += ` You have worked hard mining what is left of the Earth's core for precious metals, and have made barely enough to purchase tickets for you and your family to go to Venus. You expect to live to <strong>${expectedLifeSpan}</strong>, but that will be paused while in cryo-sleep on the way there.`
      }
  }

  return resultsString;

}

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
