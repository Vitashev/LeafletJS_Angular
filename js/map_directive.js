(function () {

	var link = function (scope, element, attrs) {

		var defaults = {
			height: '500px',
			width: '500px',
			position: [49.842, 24.032],
			zoom: 17
		};
		
		// Values init
		
		var zoom = defaults.zoom;
		$('#map').css({ 'height': attrs.height || defaults.height });
		$('#map').css({ 'width': attrs.width || defaults.width });
				
		// Map init

		scope.map = L.map('map').setView(defaults.position, zoom);

		L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
			minZoom: 5,
			maxZoom: 19
		}).addTo(scope.map);
		
		scope.$watch("center", function(center) {
        	if (center !== undefined)
				scope.map.setView(center, scope.zoom);
		});
		
		scope.$watch("geojson", function(geojson) {
        	if (geojson !== undefined)
				geojson.addTo(scope.map);
		});

	}

    angular.module('restApp').directive("map", function () {
		return {
			restrict: 'E',
			template: '<div id="map"></div><p id="latlng">00.0, 00.0</p>',
			controller: 'MapCtrl',
			link: link
		};

    });

})();