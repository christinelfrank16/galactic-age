import {checkAgeInput, convertAge} from './../src/calculator.js';
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
    expect(convertAge("mercury", galaxy, age)).toEqual(103);
    expect(Number.isInteger(convertAge("mercury", galaxy, age))).toEqual(true);
  });
  it('should convert input age to Venus solar years', function(){
    const age = 25;
    expect(convertAge("venus", galaxy, age)).toEqual(40);
    expect(Number.isInteger(convertAge("venus", galaxy, age))).toEqual(true);
  });
  it('should pass input age on as Earth years', function(){
    const age = 25;
    expect(convertAge("earth", galaxy, age)).toEqual(25);
    expect(Number.isInteger(convertAge("earth", galaxy, age))).toEqual(true);
  });
  it('should convert input age to Mars solar years', function(){
    const age = 25;
    expect(convertAge("mars", galaxy, age)).toEqual(13);
    expect(Number.isInteger(convertAge("mars", galaxy, age))).toEqual(true);
  });
  it('should convert input age to Jupiter solar years', function(){
    const age = 25;
    expect(convertAge("jupiter", galaxy, age)).toEqual(2);
    expect(Number.isInteger(convertAge("jupiter", galaxy, age))).toEqual(true);
  });
  it('should convert input age to Saturn solar years', function(){
    const age = 25;
    expect(convertAge("saturn", galaxy, age)).toEqual(0);
    expect(Number.isInteger(convertAge("saturn", galaxy, age))).toEqual(true);
  });
  it('should convert input age to Uranus solar years', function(){
    const age = 25;
    expect(convertAge("uranus", galaxy, age)).toEqual(0);
  });
  it('should convert input age to Neptune solar years', function(){
    const age = 25;
    expect(convertAge("neptune", galaxy, age)).toEqual(0);
  });
  it('should convert input age to Pluto solar years', function(){
    const age = 25;
    expect(convertAge("pluto", galaxy, age)).toEqual(0);
  });
});

describe('form input check', function(){
  it('should error on missing returned form input', function(){
    const inputArray = ["1", "2", "", 1, 5, 9];
    expect(checkFormInput(inputArray)).toEqual(false);
  });

  it('should pass on complete returned form input', function(){
    const inputArray = ["1", "2", "6", 1, 5, 9];
    expect(checkFormInput(inputArray)).toEqual(false);
  });

});
