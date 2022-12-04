assert = chai.assert;

describe('Testing function images() of Project', function () {
  var result = images();

  it('Test 1: images() returns something', function () {
    assert.exists(result, 'the return value is not null or undefined');
  });
})

describe('Testing function generateImage() of serverProject', function () {
    var result = generateImage();

    it('Test 1: the returned values are in [1,2] range', function () {
      for (var i = 1; i < 3000; i++) {
        result = generateImage();
        assert(result >= 1 && result <= 2);
      }
    });
  })

describe('Testing function evaluate() of serverProject', function () {
    var result = evaluate();

    it('Test 1: evaluate() returns something', function () {

      assert.exists(result, 'the return value is not null or undefined');
    });
  })
