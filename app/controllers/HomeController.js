VinApp.controller('HomeController', ['$scope', '$http', '$state',
  function($scope, $http, $state) {

    setTimeout(function() {
      jQuery(document).ready(function() {
        $('[data-toggle="tooltip"]').tooltip();
      });
      $("#scroll-down").click(function() {
        $('html,body').animate({
            scrollTop: $("#scroll-top").offset().top
          },
          'slow');
      });
      $("#scroll-to-top").click(function() {
        $("html, body").animate({
          scrollTop: 0
        }, "slow");
      });

    }, 0);

    $scope.sugessions = ['something', 'something else'];


    $scope.checkout = function() {
      $state.go('checkout', { "vin": $scope.vin });
    };


    $scope.isValid = true;
    $scope.validate = function() {
      $scope.typeInProcess = false;

      if (!$scope.vin) return;
      $scope.isTouched = true;
      $scope.isValid = valid_vin($scope.vin);
      console.log($scope.isValid);
    };

    $scope.changeValue =function () {
      var select = document.getElementById('myDropdown').value
      console.log(select)
    }

    valid_vin = function(vin) {
      if (vin.length < 17) {
        return false
      } else {
        var no_ioq = '[a-hj-npr-z0-9]'; // Don't allow characters I,O or Q
        var matcher = new RegExp("^" + no_ioq + "{8}[0-9xX]" + no_ioq + "{8}$", 'i'); // Case insensitive
        if (vin.match(matcher) === null) {
          return false;
        }
        // Reject base on bad check digit
        var check = check_digit_check(vin);
        if (check === true) {
          return true;
        } else {
          $http({
            method: "POST",
            url: "/suggestion",
            data: { "vin": $scope.vin }
          }).then(function mySucces(response) {
            $scope.myWelcome = response.data;
            $scope.states = $scope.myWelcome;

            $scope.typeInProcess = function() {
              $scope.typeInProcess = true;
              console.log($scope.asd)
            };
      
            console.log($scope.myWelcome)
          }, function myError(response) {
            $scope.myWelcome = response.statusText;
            console.log($scope.myWelcome)
          });
          return false;

        }
      }
      // Reject based on bad pattern match
    };

    check_digit_check = function(vin) {
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
  }
]);
