assert = chai.assert;

describe('Testing functions in project.js and serverProject.js', function () {
  var result = images();
  it('Test 1: images() in project.js returns something', function () {
    assert.exists(result, 'the return value is not null or undefined');
  });

  it('Test 2: the returned value from image() in project.js is from type string', function () {
    assert.typeOf(result, 'string');
  });

  it('Test 3:  from type number', function () {
    var num = generateImage();
    assert.typeOf(num, 'number');
  });

  it('Test 4: generateImage() in serverProject.js always returns 1 or 2', function () {
    for (var i = 1; i < 3000; i++) {
      var num = generateImage();
      assert(num == 1 || num == 2);
    }
  });
  
})