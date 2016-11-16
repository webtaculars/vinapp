angular.module('Vin', []).controller('MainCtrl',
  function MyCtrl($scope) {

    $scope.test = function() {


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

      $scope.sugessions = [];

      var falseVin = $scope.vin;

      String.prototype.replaceAt = function(index, character) {
        return this.substr(0, index) + character + this.substr(index + character.length);
      }

      for (var i = 0; i < falseVin.length; i++) {
        for (var j = 0; j < possibleMistakes.length; j++) {
          if (falseVin[i] === possibleMistakes[j].letter) {
            var temp = falseVin[i];
            // falseVin[i] = possibleMistakes[j].correction;
            falseVin = falseVin.replaceAt(i, possibleMistakes[j].correction);
            if (valid_vin(falseVin)) {
              $scope.sugessions.push(falseVin);
            } else {
              // falseVin[i] = temp;
              falseVin = falseVin.replaceAt(i, temp);
            }
          }
        }
      }

      console.log($scope.sugessions);
    }
  });
