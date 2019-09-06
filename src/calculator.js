export function checkAgeInput(age){
  let isAgeAccepted = true;
  age = parseInt(age);
  if(isNaN(age)){
    isAgeAccepted = false;
  }
  return isAgeAccepted;
}
