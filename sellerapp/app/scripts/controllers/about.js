'use strict';

/**
 * @ngdoc function
 * @name hackApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the hackApp
 */
angular.module('hackApp')
  .controller('AboutCtrl', ['$scope', function ($scope) {
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
  }]);
