assert = chai.assert;

// describe() is a function by which you can define a collection of tests. 
// It takes two parameters, the 1st one is a description of what is being tested, and 
// the 2nd one is a function which contains one or multiple tests each defined by one it().
describe('Testing function images() of Project', function () {
  var result = images();

  // it() is a function by which you should define one single test.
  // It takes two parameters, the 1st one is a description of what is being tested, and 
  // the 2nd one is a function which normally contains one assert. 
  it('Test 1: images() returns something', function () {

    // assert is the core component of automated testing, by which we can verify wether
    // some condition is true or false. true represents the test has passed, and false 
    // represents a failure. See https://www.chaijs.com/api/assert/
    assert.exists(result, 'the return value is not null or undefined');
  });
})

describe('Testing function generateImage() of serverProject', function () {
    var result = generateImage();
  
    // it() is a function by which you should define one single test.
    // It takes two parameters, the 1st one is a description of what is being tested, and 
    // the 2nd one is a function which normally contains one assert. 
    it('Test 1: the returned values are in [1,2] range', function () {
      for (var i = 1; i < 3000; i++) {
        result = generateImage();
        assert(result >= 1 && result <= 2);
      }
    });
  })

describe('Testing function evaluate() of serverProject', function () {
    var result = evaluate();
  
    // it() is a function by which you should define one single test.
    // It takes two parameters, the 1st one is a description of what is being tested, and 
    // the 2nd one is a function which normally contains one assert. 
    it('Test 1: evaluate() returns something', function () {
  
      // assert is the core component of automated testing, by which we can verify wether
      // some condition is true or false. true represents the test has passed, and false 
      // represents a failure. See https://www.chaijs.com/api/assert/
      assert.exists(result, 'the return value is not null or undefined');
    });
  })