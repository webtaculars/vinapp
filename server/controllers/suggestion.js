var request = require('request');

exports.getSuggestion = function(req, res) {

  var possibleMistakes = [
    { letter: 'S', correction: '5' }, { letter: 'S', correction: '2' }, { letter: 'H', correction: '8' },
    { letter: 'G', correction: '6' }, { letter: 'Z', correction: '2' }, { letter: 'B', correction: '8' },
    { letter: 'D', correction: '0' }, { letter: 'U', correction: '4' }, { letter: 'Y', correction: '4' },
    { letter: 'C', correction: 'L' }, { letter: 'M', correction: 'N' }, { letter: 'U', correction: 'V' },
    { letter: 'F', correction: 'S' }, { letter: 'T', correction: 'P' }, { letter: 'P', correction: 'B' },
    { letter: 'E', correction: 'B' }, { letter: 'E', correction: 'F' }, { letter: 'E', correction: '8' },
    { letter: '0', correction: 'O' },

    { letter: '5', correction: 'S' }, { letter: '2', correction: 'S' }, { letter: '8', correction: 'H' },
    { letter: '6', correction: 'G' }, { letter: '2', correction: 'Z' }, { letter: '8', correction: 'B' },
    { letter: '0', correction: 'D' }, { letter: '4', correction: 'U' }, { letter: '4', correction: 'Y' },
    { letter: 'L', correction: 'C' }, { letter: 'N', correction: 'M' }, { letter: 'V', correction: 'U' },
    { letter: 'S', correction: 'F' }, { letter: 'P', correction: 'T' }, { letter: 'B', correction: 'P' },
    { letter: 'B', correction: 'E' }, { letter: 'F', correction: 'E' }, { letter: '8', correction: 'E' },
    { letter: 'O', correction: '0' }
  ];

  var sugessions = [];

  var falseVin = req.body.vin;

  String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
  }
  var valid_vin = function(vin) {
    if (vin.length < 17) {
      return false
    } else {
      var no_ioq = '[a-hj-npr-z0-9]'; // Don't allow characters I,O or Q
      var matcher = new RegExp("^" + no_ioq + "{8}[0-9xX]" + no_ioq + "{8}$", 'i'); // Case insensitive
      if (vin.match(matcher) === null) {
        return false;
      }
      // Reject base on bad check digit
      return check_digit_check(vin);
    }
    // Reject based on bad pattern match
  };

  var check_digit_check = function(vin) {
    cleaned_vin = vin.toUpperCase();

    letter_map = {
      A: 1,
      B: 2,
      C: 3,
      D: 4,
      E: 5,
      F: 6,
      G: 7,
      H: 8,
      J: 1,
      K: 2,
      L: 3,
      M: 4,
      N: 5,
      P: 7,
      R: 9,
      S: 2,
      T: 3,
      U: 4,
      V: 5,
      W: 6,
      X: 7,
      Y: 8,
      Z: 9,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      0: 0
    };
    weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

    products = 0;
    for (var i = 0; i < cleaned_vin.length; i++) {
      // alert('adding ' + letter_map[vin[i]] + ' * ' + weights[i] + ' to ' + products);
      products += letter_map[cleaned_vin[i]] * weights[i];
    }
    check_digit_should_be = products % 11;
    if (check_digit_should_be == 10) check_digit_should_be = 'X';

    return check_digit_should_be == cleaned_vin[8];
  }

  for (var i = 0; i < falseVin.length; i++) {
    for (var j = 0; j < possibleMistakes.length; j++) {
      if (falseVin[i] === possibleMistakes[j].letter) {
        var temp = falseVin[i];
        // falseVin[i] = possibleMistakes[j].correction;
        falseVin = falseVin.replaceAt(i, possibleMistakes[j].correction);
        if (valid_vin(falseVin)) {
          sugessions.push(falseVin);
        } else {
          // falseVin[i] = temp;
          falseVin = falseVin.replaceAt(i, temp);
        }
      }
    }
  }

  console.log(sugessions)
  res.json(sugessions)
}
