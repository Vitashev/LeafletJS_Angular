(function () {

	var link = function (scope, element, attrs) {

		var defaults = {
			height: '500px',
			width: '500px',
			position: { 
				lat: 49.842,
				lng: 24.032,
				zoom: 17
			},
		};
		
		// Values init
		
		var zoom = defaults.zoom;
		$('#map').css({ 'height': attrs.height || defaults.height });
		$('#map').css({ 'width': attrs.width || defaults.width });
				
		// Map init

		scope.map = L.map('map').setView([defaults.position.lat,
			 defaults.position.lng], defaults.position.zoom);

		L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
			minZoom: 5,
			maxZoom: 19
		}).addTo(scope.map);

		if (attrs.info === 'true') {
			scope.info = L.control.info();
			scope.info.addTo(scope.map);
		}
		
		if (attrs.coordinates === 'true') {
			scope.coordinates = L.control.coordinates()
			scope.coordinates.addTo(scope.map);
		}
		
		scope.$watch("center", function(center) {
			console.log('variable observed');
        	if (center !== undefined)
				scope.map.setView(center, center.zoom);
		});
		
		scope.$watch("geojson", function(geojson) {
        	if (geojson !== undefined)
				geojson.addTo(scope.map);
		});

	}

    angular.module('restApp').directive("map", function () {
		return {
			restrict: 'E',
			template: '<div id="map"></div>',
			controller: 'MapCtrl',
			link: link
		};

    });

})();