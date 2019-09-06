import {checkAgeInput} from './../src/calculator.js';

describe('user-input', function(){
  it('should error on non-numeric input', function(){
    var input = "my age is undefined";
    expect(checkAgeInput(input)).toEqual(false);
  });
  it('should error on negative numeric input', function(){
    var input = "-23";
    expect(checkAgeInput(input)).toEqual(false);
  });
  it('should error on positive, non-integer input', function(){
    var input = "23.75";
    expect(checkAgeInput(input)).toEqual(false);
  });
  it('should pass on positive, integer input', function(){
    var input = "23";
    expect(checkAgeInput(input)).toEqual(true);
  });

});
