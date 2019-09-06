import {checkAgeInput} from './../src/calculator.js';

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
  it('should convert input age to Mercury solar years', function(){
    const age = 25;
    expect(convertAge("mercury", age)).toEqual(103);
  });
  it('should convert input age to Venus solar years', function(){
    const age = 25;
    expect(convertAge("venus", age)).toEqual(40);
  });
  it('should pass input age on as Earth years', function(){
    const age = 25;
    expect(convertAge("earth", age)).toEqual(25);
  });
  it('should convert input age to Mars solar years', function(){
    const age = 25;
    expect(convertAge("mars", age)).toEqual(13);
  });
  it('should convert input age to Jupiter solar years', function(){
    const age = 25;
    expect(convertAge("jupiter", age)).toEqual(0);
  });
  it('should convert input age to Saturn solar years', function(){
    const age = 25;
    expect(convertAge("saturn", age)).toEqual(0);
  });
  it('should convert input age to Uranus solar years', function(){
    const age = 25;
    expect(convertAge("uranus", age)).toEqual(0);
  });
  it('should convert input age to Neptune solar years', function(){
    const age = 25;
    expect(convertAge("neptune", age)).toEqual(0);
  });
  it('should convert input age to Pluto solar years', function(){
    const age = 25;
    expect(convertAge("pluto", age)).toEqual(0);
  });
});
