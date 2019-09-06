export function checkAgeInput(age){
  let isAgeAccepted = true;
  age = parseInt(age);
  if(isNaN(age) || age < 0){
    isAgeAccepted = false;
  }
  return isAgeAccepted;
}
