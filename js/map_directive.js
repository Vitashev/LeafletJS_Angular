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

		// Map init

		scope.map = L.map('map'); // drawControl is for Leaflet Draw plugin

		scope.baseLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
			minZoom: 5,
			maxZoom: 19
		});
		scope.baseLayer.addTo(scope.map);

		checkAttrs();

		updateMapView();

		scope.$watch("center.lat", function (center) {
			updateMapView();
		});

		scope.$watch("center.lng", function (center) {
			updateMapView();
		});

		scope.$watch("center.zoom", function (center) {
			updateMapView();
		});
		
		// Listen to map center change by user
		
		scope.map.on("dragend", function () {
			scope.$apply(function (scope) {
				scope.center.lat = scope.map.getCenter().lat;
                scope.center.lng = scope.map.getCenter().lng;
            });
		});

		scope.map.on("zoomend", function () {
			if (scope.center.zoom !== scope.map.getZoom()) {
				scope.$apply(function (scope) {
					scope.center.zoom = scope.map.getZoom();
					scope.center.lat = scope.map.getCenter().lat;
					scope.center.lng = scope.map.getCenter().lng;
                });
            }
		});

		function updateMapView() {
			scope.map.setView(scope.center, scope.center.zoom);

		}

		function checkAttrs() {
			$('#map').css({ 'height': attrs.height || defaults.height });
			$('#map').css({ 'width': attrs.width || defaults.width });

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

				$('#map').css({ 'cursor': 'default' });
				$(".leaflet-control-zoom").css("visibility", "hidden");

			}
			
			if (attrs.add === 'true') {
				var drawnItems = new L.FeatureGroup();
				scope.map.addLayer(drawnItems);

				var drawControl = new L.Control.Draw({
					draw: {
						polyline: false,
						marker: false,
						circle: false,
						polygon: {
							shapeOptions: {
								color: '#A52A2A'
							}
						}
					},
					edit: {
						featureGroup: drawnItems,
						edit: false,
						remove: false
					}
				});
				scope.map.addControl(drawControl);

				scope.map.on('draw:created', function (e) {
					var type = e.layerType;
					var layer = e.layer;
					
					var name = prompt('Object name:', ''),
						description = prompt('Object description', '');

					if (type === 'polygon' || 'rectangle') {
						geojson = {
							"type": "Feature",
							"geometry": {
								"type": "Polygon",
								"coordinates": e.layer._latlngs
							},
							"properties": {
								"name": name,
								"description": description
							}
						}
					}

					console.log(e.layerType);
					//L.geoJson(geojson).addTo(scope.map);
					scope.map.addLayer(layer);
				});
			}
			
			if (scope.center === undefined) {
				scope.center = defaults.position;
			}

			if (scope.geojson !== undefined) {
				scope.geojson.addTo(scope.map);
			}
		}

	}

    angular.module('restApp').directive("leafletMap", function () {
		return {
			restrict: 'E',
			template: '<div id="map"></div>',
			controller: 'MapCtrl',
			scope: {
				center: '=center',
				geojson: '=geojson',
			},
			link: link
		};

    });

})();