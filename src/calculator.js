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

export function convertAge(planetName, galaxy, earthYears){
  const planetYearDays = galaxy[planetName.toLowerCase()].orbitalPeriod;
  const earthYearDays = galaxy.earth.orbitalPeriod;
  const convertedAge = (earthYears * earthYearDays)/planetYearDays;
  return Math.floor(convertedAge);
}

export function calcExpectedEarthLife(inputArray){
  debugger;
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

// const techSkill = inputArray[3];
// const socialSkill = inputArray[4];
// const adaptSkill = inputArray[5];
// const govPref = inputArray[6];
