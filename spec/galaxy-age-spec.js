import {checkAgeInput, convertAge, checkFormInput, calcExpectedEarthLife, truncateToFirstDecimal, calcExpectedPlanetLife, calcGovPerChange, calcSkillsPerChange, calcPlanetPerChange, calcAgeDiff} from './../src/calculator.js';
import {Galaxy} from './../src/galaxy.js';

describe('user-input', function(){
  it('should error on non-numeric input', function(){
    const input = "my age is undefined";
    expect(checkAgeInput(input)).toEqual(false);
  });

  it('should error on negative numeric input', function(){
    const input = "-23";
    expect(checkAgeInput(input)).toEqual(false);
  });

  it('should error on positive, non-integer input', function(){
    const input = "23.75";
    expect(checkAgeInput(input)).toEqual(false);
  });

  it('should pass on positive, integer input', function(){
    const input = "23";
    expect(checkAgeInput(input)).toEqual(true);
  });
});

describe('convert-age', function(){

  let galaxy;
  beforeEach(function(){
    galaxy = new Galaxy();
  });

  it('should convert input age to Mercury solar years', function(){
    const age = 25;
    expect(convertAge(galaxy["mercury"], age)).toEqual(103.76);
  });
  it('should convert input age to Venus solar years', function(){
    const age = 25;
    expect(convertAge(galaxy["venus"], age)).toEqual(40.58);
  });
  it('should pass input age on as Earth years', function(){
    const age = 25;
    expect(convertAge(galaxy["earth"], age)).toEqual(25);
  });
  it('should convert input age to Mars solar years', function(){
    const age = 25;
    expect(convertAge(galaxy["mars"], age)).toEqual(13.29);
  });
  it('should convert input age to Jupiter solar years', function(){
    const age = 25;
    expect(convertAge(galaxy["jupiter"], age)).toEqual(2.1);
  });
  it('should convert input age to Saturn solar years', function(){
    const age = 25;
    expect(convertAge(galaxy["saturn"], age)).toEqual(0.84);
  });
  it('should convert input age to Uranus solar years', function(){
    const age = 25;
    expect(convertAge(galaxy["uranus"], age)).toEqual(0.29);
  });
  it('should convert input age to Neptune solar years', function(){
    const age = 25;
    expect(convertAge(galaxy["neptune"], age)).toEqual(0.15);
  });
  it('should convert input age to Pluto solar years', function(){
    const age = 25;
    expect(convertAge(galaxy["pluto"], age)).toEqual(0.1);
  });
});

describe('form input check', function(){
  it('should error on missing returned form input', function(){
    const inputArray = ["1", "2", "", 1, 5, 9, 5];
    expect(checkFormInput(inputArray)).toEqual(false);
  });

  it('should pass on complete returned form input', function(){
    const inputArray = ["1", "2", [2], 1, 5, 9, 7];
    expect(checkFormInput(inputArray)).toEqual(true);
  });
});

describe('calc-earth-life-expectancy', function(){
  it('should calculate expected Earth life using form input variations - low expectancy values', function(){
    const age = 25;
    const inputArray = ["1", "1", [1, 2, 3], 1, 1, 1, 2];
    expect(calcExpectedEarthLife(inputArray)).toEqual(65);
  });

  it('should calculate expected Earth life using form input variations - normal expectancy values', function(){
    const age = 25;
    const inputArray = ["2", "2", [3, 6, 8], 3, 6, 5, 3];
    expect(calcExpectedEarthLife(inputArray)).toEqual(85);
  });

  it('should calculate expected Earth life using form input variations - high expectancy values', function(){
    const age = 25;
    const inputArray = ["4", "5", [4], 9, 8, 10, 4];
    expect(calcExpectedEarthLife(inputArray)).toEqual(105);
  });
});

describe('calc-other-planet-expectancy', function(){

  let galaxy;
  beforeEach(function(){
    galaxy = new Galaxy();
  });

  it('should truncate expected planet life to first 2 digits, no rounding', function(){
    const age = 23.8773;
    expect(truncateToFirstDecimal(age)).toEqual(23.87);
  });

  it('should calculate percent change of expected life using for planet conditions influence - low skills', function(){
    const inputArray = ["1", "1", [1, 2, 3], 1, 1, 1, 2];
    expect(calcSkillsPerChange(inputArray)).toEqual(-20);
  });

  it('should calculate percent change of expected life using for planet conditions influence - normal skills', function(){
    const inputArray = ["2", "2", [3, 6, 8], 3, 6, 5, 3];
    expect(calcSkillsPerChange(inputArray)).toEqual(0);
  });

  it('should calculate percent change of expected life using for planet conditions influence - high skills', function(){
    const inputArray = ["4", "5", [4], 9, 8, 10, 4];
    expect(calcSkillsPerChange(inputArray)).toEqual(30);
  });

  it('should calculate percent change of expected life using for selected government influence - cyberocracy', function(){
    const govPref = 1;
    expect(calcGovPerChange(galaxy["mars"], govPref)).toEqual(20);
  });

  it('should calculate percent change of expected life using for selected government influence - galactic democracy', function(){
    const govPref = 3;
    expect(calcGovPerChange(galaxy["mars"], govPref)).toEqual(15);
    expect(calcGovPerChange(galaxy["earth"], govPref)).toEqual(5);
    expect(calcGovPerChange(galaxy["uranus"], govPref)).toEqual(-5);
    expect(calcGovPerChange(galaxy["pluto"], govPref)).toEqual(-10);
  });

  it('should calculate percent change of expected life using for selected government influence - regional governance', function(){
    const govPref = 4;
    expect(calcGovPerChange(galaxy["mars"], govPref)).toEqual(galaxy["mars"].regionalGovInfluence);
    expect(calcGovPerChange(galaxy["mercury"], govPref)).toEqual(galaxy["mercury"].regionalGovInfluence);
    expect(calcGovPerChange(galaxy["jupiter"], govPref)).toEqual(galaxy["jupiter"].regionalGovInfluence);
  });

  it('should calculate percent change of expected life using planet conditions', function(){
    expect(calcPlanetPerChange(galaxy["mercury"])).toEqual(-20);
    expect(calcPlanetPerChange(galaxy["mars"])).toEqual(10);
    expect(calcPlanetPerChange(galaxy["saturn"])).toEqual(-15);
    expect(calcPlanetPerChange(galaxy["pluto"])).toEqual(-5);
  });

  it('should calculate expected planet life using form inputs and planet conditions', function(){
    const inputArray = ["2", "2", [3, 6, 8], 3, 6, 5, 3];
    const planetName = "jupiter";
    const planet = galaxy[planetName];
    const convertedEarthExpAge = convertAge(planet, calcExpectedEarthLife(inputArray)); // Earth age = 85

    expect(convertedEarthExpAge).toEqual(7.14);
    expect(calcPlanetPerChange(planet)).toEqual(-30);
    expect(calcGovPerChange(planet, inputArray[6])).toEqual(5);
    expect(calcSkillsPerChange(inputArray)).toEqual(0);

    expect(calcExpectedPlanetLife(planet, inputArray)).toEqual(truncateToFirstDecimal(convertedEarthExpAge * 0.75));
  });
});

describe('exceed-expected-life', function(){

    let galaxy;
    beforeEach(function(){
      galaxy = new Galaxy();
    });

  it('should provide the difference in expected life and age when the age has exceeded the expected life', function(){
    const age = 95;
    const planetName = "jupiter";
    const planet = galaxy[planetName];
    const inputArray = ["2", "2", [3, 6, 8], 3, 6, 5, 3];
    const convertedEarthExpAge = convertAge(planet, calcExpectedEarthLife(inputArray)); // Earth age = 85
    expect(calcExpectedEarthLife(inputArray)).toEqual(85);
    expect(calcExpectedPlanetLife(planet, inputArray)).toEqual(truncateToFirstDecimal(convertedEarthExpAge * 0.75));
    expect(convertAge(planet, age)).toEqual(7.98);
    expect(calcAgeDiff(age, planet, inputArray)).toEqual(7.98-truncateToFirstDecimal(convertedEarthExpAge * 0.75));
  });

  it('should provide the difference in expected life and age when the age has exceeded the expected life', function(){
    const age = 75;
    const planetName = "jupiter";
    const planet = galaxy[planetName];
    const inputArray = ["2", "2", [3, 6, 8], 3, 6, 5, 3];
    const convertedEarthExpAge = convertAge(planet, calcExpectedEarthLife(inputArray)); // Earth age = 85
    expect(calcExpectedEarthLife(inputArray)).toEqual(85);
    expect(calcExpectedPlanetLife(planet, inputArray)).toEqual(truncateToFirstDecimal(convertedEarthExpAge * 0.75));
    expect(convertAge(planet, age)).toEqual(6.3);
    expect(calcAgeDiff(age, planet, inputArray)).toEqual(6.3 - truncateToFirstDecimal(convertedEarthExpAge * 0.75));
  });
});
