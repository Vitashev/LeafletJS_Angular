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
		
		$('#map').css({ 'height': attrs.height || defaults.height });
		$('#map').css({ 'width': attrs.width || defaults.width });
				
		// Map init

		scope.map = L.map('map');

		L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
			minZoom: 5,
			maxZoom: 19
		}).addTo(scope.map);
		
		// Attributes check

		if (attrs.info === 'true') {
			scope.info = L.control.info();
			scope.info.addTo(scope.map);
		}
		
		if (attrs.coordinates === 'true') {
			scope.coordinates = L.control.coordinates()
			scope.coordinates.addTo(scope.map);
		}
		
		if (attrs.interactivity === 'false') {
			scope.map.dragging.disable();
			scope.map.touchZoom.disable();
			scope.map.doubleClickZoom.disable();
			scope.map.scrollWheelZoom.disable();
			scope.map.boxZoom.disable();
			scope.map.keyboard.disable();
			if (scope.map.tap)
				scope.map.tap.disable();
			$('#map').css({ 'cursor' : 'default' });
			$(".leaflet-control-zoom").css("visibility", "hidden");
		}
		
        if (scope.center === undefined) {
			scope.center = defaults.position;
		}
		
		updateMapView();
		
		scope.$watch("geojson", function(geojson) {
        	if (geojson !== undefined)
				geojson.addTo(scope.map);
		});
		
		scope.$watch("center.lat", function(center) {
			updateMapView();
		});
		
		scope.$watch("center.lng", function(center) {
			updateMapView();
		});
		
		scope.$watch("center.zoom", function(center) {
			updateMapView();
		});
		
		function updateMapView () {
			scope.map.setView(scope.center, scope.center.zoom);
		}

	}

    angular.module('restApp').directive("leafletMap", function () {
		return {
			restrict: 'E',
			template: '<div id="map"></div>',
			controller: 'MapCtrl',
			scope: {
				center: '=center'
			},
			link: link
		};

    });

})();