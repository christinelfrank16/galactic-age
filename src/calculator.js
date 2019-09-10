export function checkAgeInput(age){
  let isAgeAccepted = true;
  age = Number(age);
  if(isNaN(age) || (age < 0 || !Number.isInteger(age))){
    isAgeAccepted = false;
  }
  return isAgeAccepted;
}

export function checkFormInput(formInputArray){
  let count = 0
  let isFormComplete = true;
  formInputArray.forEach(function(input){
    if(input){
      count++;
    }
  });
  if(count !== formInputArray.length){
    isFormComplete = false
  }
  return isFormComplete;
}

export function convertAge(planet, earthYears){
  const planetYearDays = planet.orbitalPeriod;
  const earthYearDays = 365.24;
  const convertedAge = (earthYears * earthYearDays)/planetYearDays;
  return truncateToFirstDecimal(convertedAge);
}

export function truncateToFirstDecimal(num){
  let numString = num.toString();
  let truncatedNum = num;
  if(numString.includes(".")){
    const decimalIndex = numString.indexOf(".");
    const truncNumString = numString.substring(0, decimalIndex+3);
    num = Number(truncNumString);
  }
  return num;
}

export function calcExpectedEarthLife(inputArray){
  let expectedAge = 85;
  const exercise = inputArray[0]; // values: 1=none, 2= 1-2/wk, 3=3-4/wk 4=5+/wk
  const mealType = inputArray[1]; // values: 1=fast food, 2= moderate meat/veggie, 3=all/mostly veggie, 4=all/mostly meat, 5=some kind of smoothie-mush
  const influencers = inputArray[2]; // values: 1=smoking, 2=risk taker, 3=sweet tooth, 4= None of these, 5=health conscious 6=drink alcohol, 7 = overweight, 8= happy disposition
  if(exercise === "1" && (mealType === "1" || influencers.includes(7))){
    expectedAge -= 10;
  }
  if(influencers.length >= 3 && (!influencers.includes(8) && !influencers.includes(5))){
    expectedAge-=10;
  }
  if((exercise === "3" || exercise === "4") && (!influencers.includes(2) && !influencers.includes(1))){
    expectedAge += 10;
  }
  if((mealType === "5" || mealType === "3") && (influencers[0] === 4 && influencers.length === 1)){
    expectedAge += 10;
  }

  return expectedAge;
}

export function calcExpectedPlanetLife(planet, inputArray){
  const earthExpAge = calcExpectedEarthLife(inputArray);

  let percentChange = calcSkillsPerChange(inputArray);
  percentChange += calcGovPerChange(planet, inputArray[6]);
  percentChange += calcPlanetPerChange(planet);

  let planetExpAge = convertAge(planet, earthExpAge);
  planetExpAge = planetExpAge * ((100 + percentChange)/100);
  planetExpAge = truncateToFirstDecimal(planetExpAge);
  return planetExpAge;
}

export function calcSkillsPerChange(inputArray){
  let percentChange = 0;
  const techSkill = inputArray[3]; // value: 1-10
  const socialSkill = inputArray[4]; // value: 1-10
  const adaptSkill = inputArray[5]; // value: 1-10
  const govPref = inputArray[6];

  if(techSkill > 4){
    percentChange += 5;
  }
  if(socialSkill > 6){
    percentChange += 10;
  } else if (socialSkill < 4){
    percentChange -= 10;
  }
  if(adaptSkill > 5){
    percentChange += 15;
  } else if(adaptSkill < 4){
    percentChange -= 10;
  }
  return percentChange;
}

export function calcGovPerChange(planet, govPref){
  //values: 1=cyberocracy, 2=AI overlord, 3=galactic democracy, 4= regional governance, 5=paleolithic (hunter-gather), 6=demarchy, 7=plutarchy
  let percentChange = 0;
  switch (govPref) {
    case 1:
      percentChange += 20;
      break;
    case 2:
      percentChange -= 15;
      break;
    case 3:
      // 2 planets away from Mars
      if(planet.location === 4){
        percentChange += 15;
      } else if (Math.abs(planet.location-4) < 3){
        percentChange += 5;
      } else if (Math.abs(planet.location-4) < 4){
        percentChange -= 5;
      }
      else {
        percentChange -= 10;
      }
      break;
    case 4:
      percentChange += planet.regionalGovInfluence;
      break;
    case 5:
        percentChange -= 30;
      break;
    case 6:
        percentChange -= 40;
      break;
    case 7:
        percentChange -= 20;
      break;
  }
  return percentChange;
}

export function calcPlanetPerChange(planet){
  let percentChange = 0;
  if(planet.gravity >= 15){
    percentChange -= 10;
  } else if ((6 < planet.gravity && planet.gravity < 15) && location !== 3){
    percentChange += 5;
  }
  if(planet.singleRotation > 2){
    percentChange -= 15;
  }
  if((planet.atomosphere.includes("carbon monoxide") || (planet.atomosphere.includes("carbon dioxide") || planet.atomosphere.includes("oxygen"))) && location !== 3){
    percentChange += 10;
  }
  if(planet.maxTemp - planet.minTemp > 200){
    percentChange -= 15;
  }
  if(planet.maxTemp > 10000){
    percentChange -= 5;
  }
  return percentChange;
}

export function calcAgeDiff(age, planet, inputArray){
  const convCurrAge = convertAge(planet, age);
  const expPlanetAge = calcExpectedPlanetLife(planet, inputArray);

  return truncateToFirstDecimal(convCurrAge - expPlanetAge);
}
