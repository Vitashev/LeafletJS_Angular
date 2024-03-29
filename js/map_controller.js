(function () {

	angular.module('restApp').controller("MapCtrl", ["$scope", function ($scope) {

		$scope.center = {
			lat: 49.842,
			lng: 24.032,
			zoom: 17
		};
		$scope.geojson = {"type": "FeatureCollection", "features": [{"type":"Feature","geometry":null,"properties":{"cartodb_id":1,"description":null,"name":null}},{"type":"Feature","geometry":{"type":"MultiPolygon","coordinates":[[[[24.032716,49.841954],[24.033027,49.84203],[24.033092,49.841899],[24.032775,49.841826],[24.032716,49.841954]]]]},"properties":{"cartodb_id":2,"description":"House with number 9","name":"House 9"}},{"type":"Feature","geometry":{"type":"MultiPolygon","coordinates":[[[[24.032668,49.842044],[24.032705,49.841965],[24.033027,49.84203],[24.033,49.842065],[24.033204,49.84211],[24.033183,49.842155],[24.032668,49.842044]]]]},"properties":{"cartodb_id":3,"description":"House with number 8","name":"House 8"}},{"type":"Feature","geometry":{"type":"MultiPolygon","coordinates":[[[[24.032775,49.841826],[24.033102,49.841899],[24.03314,49.84183],[24.033408,49.841888],[24.033387,49.841961],[24.033628,49.842006],[24.033703,49.841857],[24.032861,49.841667],[24.032775,49.841826]]]]},"properties":{"cartodb_id":4,"description":"House with number 10","name":"House 10"}},{"type":"Feature","geometry":{"type":"MultiPolygon","coordinates":[[[[24.032673,49.842048],[24.033124,49.842144],[24.033065,49.842224],[24.03263,49.842127],[24.032673,49.842048]]]]},"properties":{"cartodb_id":5,"description":"House with number 7","name":"House 7"}},{"type":"Feature","geometry":{"type":"MultiPolygon","coordinates":[[[[24.032561,49.842269],[24.03314,49.842393],[24.033167,49.842349],[24.033,49.8423],[24.032995,49.842317],[24.032941,49.842307],[24.032974,49.842241],[24.033129,49.842272],[24.033145,49.842245],[24.032636,49.842131],[24.032561,49.842269]]]]},"properties":{"cartodb_id":6,"description":"House with number 6","name":"House 6"}}]}
		
	}]);

})();
