export class Galaxy {
  constructor(){
    this.mercury = {
      orbitalPeriod: 88, // Earth days
      singleRotation: 58.6,  // Earth days
      gravity: 3.7, // m/s^2
      atomosphere: ["sodium", "magnesium", "oxygen"],
      maxTemp: 450, // Celsius
      minTemp: -170 // Celsius
    }
    this.venus = {
      orbitalPeriod: 225, // Earth days
      singleRotation: 241, // Earth days
      gravity: 8.87, // m/s^2
      atomosphere: ["carbon dioxide", "nitrogen", "sulfur dioxide"],
      maxTemp: 465, // Celsius
      minTemp: 465 // Celsius
    }
    this.earth = {
      orbitalPeriod: 365.24, // Earth days
      singleRotation: 1, // Earth days
      gravity: 9.8, // m/s^2
      atomosphere: ["nitrogen", "oxygen", "argon"],
      maxTemp: 58, // Celsius
      minTemp: -89 // Celsius
    }
    this.mars = {
      orbitalPeriod: 687, // Earth days
      singleRotation: 1.02, // Earth days
      gravity: 3.7, // m/s^2
      atomosphere: ["carbon dioxide", "argon", "nitrogen"],
      maxTemp: 20, // Celsius
      minTemp: -125 // Celsius
    }
    this.jupiter = {
      orbitalPeriod: 4346, // Earth days
      singleRotation: 0.41, // Earth days
      gravity: 24.8, // m/s^2
      atomosphere: ["hydrogen", "helium", "methane"],
      maxTemp: 35700, // Celsius
      minTemp: -145 // Celsius
    }
    this.saturn = {
      orbitalPeriod: 10775, // Earth days
      singleRotation: 0.44, // Earth days
      gravity: 10.4, // m/s^2
      atomosphere: ["hydrogen", "helium", "methane"],
      maxTemp: 11700, // Celsius
      minTemp: -178 // Celsius
    }
    this.uranus = {
      orbitalPeriod: 30680, // Earth days
      singleRotation: 0.75, // Earth days
      gravity: 8.7, // m/s^2
      atomosphere: ["hydrogen", "helium", "methane"],
      maxTemp: 4737, // Celsius
      minTemp: -224 // Celsius
    }
    this.neptune = {
      orbitalPeriod: 60265, // Earth days
      singleRotation: 0.79, // Earth days
      gravity: 11.2, // m/s^2
      atomosphere: ["hydrogen", "helium", "methane"],
      maxTemp: 7000, // Celsius
      minTemp: -218 // Celsius
    }
    this.pluto = {
      orbitalPeriod: 90580, // Earth days
      singleRotation: 6.4, // Earth days
      gravity: 0.6, // m/s^2
      atomosphere: ["nitrogen", "methane", "carbon monoxide"],
      maxTemp: -223, // Celsius
      minTemp: -233 // Celsius
    }
  }
}
