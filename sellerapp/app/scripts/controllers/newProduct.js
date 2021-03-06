'use strict';

/**
 * @ngdoc function
 * @name hackApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the hackApp
 */
angular.module('hackApp')
  .controller('NewProductCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {

    var APIBASE = "http://146.148.25.35/api";

    $scope.productName = 'Bread Buns';
    $scope.productAmount = 3;
    
    var now = new Date();
    now.setHours(((now.getHours() + 11) % 12 + 1) + 2);
    $scope.endTime =  (now.getMonth() + 1) + '/' + 
                      now.getDate() + '/' + 
                      now.getFullYear() + ' ' +
                      now.getHours() + ':' +
                      now.getMinutes();
    $scope.productStartPrice = 50;
    $scope.productFinalPrice = 0;

  	$scope.pictureTaken = false;
  	$scope.picture = null;
  	$scope.pictureURL = '';
    $scope.previewImage = function(event) {

    	// Get a reference to the taken picture or chosen file
    	console.log("Previewing image", event.files);
        var files = event.files,
            file;
        if (files && files.length > 0) {
            file = files[0];
            $scope.fileToUpload = file;

            try {
                // Get window.URL object
                var URL = window.URL || window.webkitURL;

                // Create ObjectURL
                var imgURL = URL.createObjectURL(file);
                console.log(imgURL);
                $scope.pictureTaken = true;
                // Set img src to ObjectURL
                $scope.pictureURL = imgURL;
                $scope.$digest();
                // Revoke ObjectURL after imagehas loaded
                angular.element('#productPicturePreview').bind('onload', function(e) {
                	console.log("loading completed");
                    URL.revokeObjectURL(imgURL);
                });
            } catch (e) {
                try {
                    // Fallback if createObjectURL is not supported
                    var fileReader = new FileReader();
                    fileReader.onload = function (event) {
                        $scope.pictureURL = event.result;
                    };
                    fileReader.readAsDataURL(file);
                } catch (e) {
                    // Display error message
                    var error = document.querySelector("#error");
                    if (error) {
                        error.innerHTML = "Neither createObjectURL or FileReader are supported";
                    }
                }
            }
        }
    };

    $scope.submit = function () {
        console.log("Form was just submited");
        console.log($scope.fileToUpload);

        if ($scope.fileToUpload) {
            var fd = new FormData();
            fd.append("image", $scope.fileToUpload);

            var req = {
             method: 'POST',
             url: APIBASE +'/images/',
             headers: {
               'Content-Type': 'multipart/form-data'
             },
             data: fd
            }

            $http.post(APIBASE + '/images', fd, {
                        headers: {'Content-Type': undefined }
                    }).
                  then(function(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log("SUCCESS");
                    // then save the form man
                    $http.post(APIBASE + '/items', {
                        "title" : $scope.productName,
                        "endTime" : $scope.endTime,
                        "price" : $scope.productStartPrice,
                        "amount" : $scope.productAmount,
                        "sellerId" : "55f442927ddd3ada0a000001",
                        "imageId" : response.data.fileId
                    }).then(function (response) {
                        console.log('Success!!!');
                        console.log(response);
                        $location.path('products');
                    }, function (response) {
                        console.log("Failure man");
                    });
                    console.log(response);
                  }, function(response) {
                    console.log("File uploading failed");
                    console.log(response);
                  });
        }
    };
  }]);
