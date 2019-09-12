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
        resultsString += ` You are no longer young and spry, about <strong>${ageDiff}</strong> past your expected life. Your body aches and your bones hurt. You are living on borrowed air - literally - (it's sourced from the other planets) and you've heard it may not be imported for much longer...`;
      } else {
        resultsString += ` You have worked hard mining what is left of the Earth's core for precious metals, and have made barely enough to purchase tickets for you and your family to go to Venus. You expect to live to <strong>${expectedLifeSpan}</strong>, but that will be paused while in cryo-sleep on the way there.`;
      }
      break;
    case "mars":
      resultsString += ` This is where the past people of Earth first tried to habitat after realizing they were pulling their own home apart. It is come to be known as the 'center of the universe', mostly because the government Center is here.`;
      if(ageDiff > 0){
        resultsString += ` Your family was one of the first to populate the planet, so you have had a generous upbringing. That explains why you have lived <strong>${ageDiff}</strong> past your expected life, and still going. With your cushy life, you're not complaining.`;
      } else {
        resultsString += ` Being the highest planet density has its drawbacks, and you see them every day: you are a service worker tending to the poor and downtrodden. Although you are not too far above them yourself. You expect to live to <strong>${expectedLifeSpan}</strong>, and that you'll have to work almost all of that time. The people you see and help everyday are a reminder that it could be worse, and also reminders for you to keep working...`;
      }
      break;
    case "jupiter":
      resultsString += ` This planet was more 'experimental' when first attempting to populate it. The gasseous atomosphere and widely variable temperature swings made it difficult to live here. The scientists did come up with a liveable solution: floating pods. The pods maintain the correct bouyancy to stay in the region of atomosphere that is liveable, and have been somehow tethered to the planet's core.`;
      if(ageDiff > 0){
        resultsString += ` You can't argue the scientists made life here liveable; you've lived <strong>${ageDiff}</strong> past your expected life span. Not to say expecting to live to <strong>${expectedLifeSpan}</strong> is a special thing, you probably would have expected to live longer on a different planet.`;
      } else {
        resultsString += ` There are days you fear you won't live to <strong>${expectedLifeSpan}</strong>. The Storms that whirl around Jupiter can be deadly in the bouyant pods if you are not expecting them. There are stories of pods loosing their anchors and the people inside dying from heat exposure, or freezing, depending on which region of atomosphere where the pod was tossed. They didn't get to their escape ship in time. Ever since hearing that story and the pod jostles, you map your escape route ...`;
      }
      break;
    case "saturn":
      resultsString += ` Many folk have come here for the beauty of the Rings. Depending on the angle of light from the sun, they can be spectacular and inspiring.`;
      if(ageDiff > 0){
        resultsString += ` This is why you used up all of your money to come here from Mars, and it was well worth it. Most days, you get at least one clear glimpse of them and they put you in awe every time. Maybe that is why you have lived <strong>${ageDiff}</strong> past your expected life span: those few moments of beauty.`;
      } else {
        resultsString += ` But they don't hold those or similar emotions for you. Your ex decided that being able to see them almost daily would be a life-changer. Turns out it was true: your ex took all your money and moved back to Mercury because the pods bobbled too much. ... Didn't say a word to you either. You expect to live to <strong>${expectedLifeSpan}</strong>, but it won't be happily and will probably be alone.`;
      }
      break;
    case "uranus":
      resultsString += ` Whispers of unrest are common here. They blend with the whirring of machinery that processes the natural atomosphere. It is common to see weaponry out in the open as deterrents`;
      if(ageDiff > 0){
        resultsString += ` - a method you know works well. You openly carry a laser gun, and have so far lived <strong>${ageDiff}</strong> past your expected life span. It's a rough world, so in your mind, you have to take a rough stance against it; the universe isn't going to be soft and cuddly and nice to you, may as well be prepared.`;
      } else {
        resultsString += `. You just try to keep your head down around those folks. You've only lived so long, and expect to live to <strong>${expectedLifeSpan}</strong>. Just because rebels talk of uprising against the government, and how unfair it is, doesn't mean you have to act on it. Even if you agree maybe more than a little...`;
      }
      break;
    case "neptune":
    resultsString += ` You came here to explore and discover new things. You have made impressive and ground-breaking discoveries on other planets: finding evidence of past life on Mars, possible bacteria on meteors, and what could only be ancient remains of some other being on Jupiter. That said, you have debunked many and more stories of monsters and aliens that are still alive and that's why you came this time.`;
    if(ageDiff > 0){
      resultsString += ` The locals tell a story of an alien that bumps into the pods in curiosity (or hunger) of what is inside. Scientists have come in the past and found nothing, and those who went to the core never came back. You've lived <strong>${ageDiff}</strong> past your expected age, and know well the dangers of going to a gasseous planet's core. The heat alone is almost guaranteed to kill you unless you are well equiped; you are as such, and so will be exploring the core tomorrow and need your rest; conveniently the pod rocks you gently to sleep...`;
    } else {
        resultsString += ` You think on this as you stare into the maw of a giant alien-creature. You have never expected to be in this position of impossible doom and looked forward to living a full life of <strong>${expectedLifeSpan}</strong>. What other creatures have evaded you in the past if this one is here breathing down your neck as you try to scuttle away in your tank-ship. You calculate the probability of making it back to the region of atmosphere with a higher concentration of methane in hopes that the creature won't be able to handle the poisonous gas in high doses: it's low. You try anyway...`;
    }
      break;

    case "pluto":
      resultsString += ` Anything goes here; this planet is known to slowly drive people mad because of the low gravity. The advanced gravity technology has never made it out to the far ends of the galaxy, and so the health of the population suffers for it.`;
      if(ageDiff > 0){
        resultsString += ` You have already reached a state of insanity. Nothing is as what it seems. You've lived <strong>${ageDiff}</strong> past your expected life, and you don't know how much longer you can go on. It's hard on your psychy to see darting shadows at the corner of your eye whenever you glance out of a window to the planet floor. Or hear whispers of nothings when no one else is around. Maybe there are other <em>things</em> out in the universe that humans can't experience stright on.. You will never know for sure.`;
      } else {
        resultsString += ` You are getting off of this rock if you have anything to say for it. The long-time residents on this planet are crazy and there have been times you've feared for your life. You agree that this planet is strangely silent for being populated, and that it is easy to get on edge if some things are though on too long, but you fear you are going insane too. You have gathered your things together and are booked on the next ship to Uranus. Hopefully there, you can live out to your expected life of <strong>${expectedLifeSpan}</strong> <em>without</em> going crazy.`;
      }
      break;
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
