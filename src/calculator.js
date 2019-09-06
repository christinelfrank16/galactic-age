export function checkAgeInput(age){
  let isAgeAccepted = true;
  age = Number(age);
  debugger;
  if(isNaN(age) || (age < 0 || !Number.isInteger(age))){
    isAgeAccepted = false;
  }
  return isAgeAccepted;
}
