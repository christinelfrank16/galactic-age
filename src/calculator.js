export function checkAgeInput(age){
  let isAgeAccepted = true;
  if(isNaN(age)){
    isAgeAccepted = false;
  }
  return isAgeAccepted;
}
