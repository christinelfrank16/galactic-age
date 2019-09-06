import {checkAgeInput, convertAge, checkFormInput, calcExpectedEarthLife, truncateToFirstDecimal} from './../src/calculator.js';
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
    expect(convertAge("mercury", galaxy, age)).toEqual(103.76);
  });
  it('should convert input age to Venus solar years', function(){
    const age = 25;
    expect(convertAge("venus", galaxy, age)).toEqual(40.58);
  });
  it('should pass input age on as Earth years', function(){
    const age = 25;
    expect(convertAge("earth", galaxy, age)).toEqual(25);
  });
  it('should convert input age to Mars solar years', function(){
    const age = 25;
    expect(convertAge("mars", galaxy, age)).toEqual(13.29);
  });
  it('should convert input age to Jupiter solar years', function(){
    const age = 25;
    expect(convertAge("jupiter", galaxy, age)).toEqual(2.1);
  });
  it('should convert input age to Saturn solar years', function(){
    const age = 25;
    expect(convertAge("saturn", galaxy, age)).toEqual(0.84);
  });
  it('should convert input age to Uranus solar years', function(){
    const age = 25;
    expect(convertAge("uranus", galaxy, age)).toEqual(0.29);
  });
  it('should convert input age to Neptune solar years', function(){
    const age = 25;
    expect(convertAge("neptune", galaxy, age)).toEqual(0.15);
  });
  it('should convert input age to Pluto solar years', function(){
    const age = 25;
    expect(convertAge("pluto", galaxy, age)).toEqual(0.1);
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

  it('should calculate expected planet life using form inputs and planet conditions', function(){
    const inputArray = ["2", "2", [3, 6, 8], 3, 6, 5, 3];
    const planet = "jupiter";
    const convertedEarthExpAge = convertAge("jupiter", galaxy, calcExpectedEarthLife(inputArray)); // Earth age = 85
    expect(convertedEarthExpAge).toEqual(7.14);
    expect(calcExpectedPlanetLife(planet, inputArray, galaxy)).toEqual(6.6)
  });
});
