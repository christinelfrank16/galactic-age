export function checkAgeInput(age){
  let isAgeAccepted = true;
  age = Number(age);
  debugger;
  if(isNaN(age) || (age < 0 || !Number.isInteger(age))){
    isAgeAccepted = false;
  }
  return isAgeAccepted;
}

export function convertAge(planetName, galaxy, earthYears){
  const planetYearDays = galaxy[planetName.toLowerCase()].orbitalPeriod;
  const earthYearDays = galaxy.earth.orbitalPeriod;
  const convertedAge = (earthYears * earthYearDays)/planetYearDays;
  return Math.floor(convertedAge);
}
