export class Galaxy {
  constructor(){
    this.mercury = {
      location: 1,
      orbitalPeriod: 88, // Earth days
      singleRotation: 58.6,  // Earth days
      gravity: 3.7, // m/s^2
      atomosphere: ["sodium", "magnesium", "oxygen"],
      maxTemp: 450, // Celsius
      minTemp: -170 // Celsius
    }
    this.venus = {
      location: 2,
      orbitalPeriod: 225, // Earth days
      singleRotation: 241, // Earth days
      gravity: 8.87, // m/s^2
      atomosphere: ["carbon dioxide", "nitrogen", "sulfur dioxide"],
      maxTemp: 465, // Celsius
      minTemp: 465 // Celsius
    }
    this.earth = {
      location: 3,
      orbitalPeriod: 365.24, // Earth days
      singleRotation: 1, // Earth days
      gravity: 9.8, // m/s^2
      atomosphere: ["nitrogen", "oxygen", "argon"],
      maxTemp: 58, // Celsius
      minTemp: -89 // Celsius
    }
    this.mars = {
      location: 4,
      orbitalPeriod: 687, // Earth days
      singleRotation: 1.02, // Earth days
      gravity: 3.7, // m/s^2
      atomosphere: ["carbon dioxide", "argon", "nitrogen"],
      maxTemp: 20, // Celsius
      minTemp: -125 // Celsius
    }
    this.jupiter = {
      location: 5,
      orbitalPeriod: 4346, // Earth days
      singleRotation: 0.41, // Earth days
      gravity: 24.8, // m/s^2
      atomosphere: ["hydrogen", "helium", "methane"],
      maxTemp: 35700, // Celsius
      minTemp: -145 // Celsius
    }
    this.saturn = {
      location: 6,
      orbitalPeriod: 10775, // Earth days
      singleRotation: 0.44, // Earth days
      gravity: 10.4, // m/s^2
      atomosphere: ["hydrogen", "helium", "methane"],
      maxTemp: 11700, // Celsius
      minTemp: -178 // Celsius
    }
    this.uranus = {
      location: 7,
      orbitalPeriod: 30680, // Earth days
      singleRotation: 0.75, // Earth days
      gravity: 8.7, // m/s^2
      atomosphere: ["hydrogen", "helium", "methane"],
      maxTemp: 4737, // Celsius
      minTemp: -224 // Celsius
    }
    this.neptune = {
      location: 8,
      orbitalPeriod: 60265, // Earth days
      singleRotation: 0.79, // Earth days
      gravity: 11.2, // m/s^2
      atomosphere: ["hydrogen", "helium", "methane"],
      maxTemp: 7000, // Celsius
      minTemp: -218 // Celsius
    }
    this.pluto = {
      location: 9,
      orbitalPeriod: 90580, // Earth days
      singleRotation: 6.4, // Earth days
      gravity: 0.6, // m/s^2
      atomosphere: ["nitrogen", "methane", "carbon monoxide"],
      maxTemp: -223, // Celsius
      minTemp: -233, // Celsius
    }

    this.orderRegionalGovInfl();
  }

  orderRegionalGovInfl(){
    debugger
    const planets = ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"];
    let influences = [5,10,10,25,0,-5,-10,-15,-25];
    for(let i=1; i <= 9; i++){
      let randomIndex = Math.floor(influences.length * Math.random());
      let planet = this[planets[i-1]];
      planet.regionalGovInfluence = influences[randomIndex];
      influences.splice(randomIndex, 1);
    }
  }
}
