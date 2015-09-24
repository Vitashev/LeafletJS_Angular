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

		scope.updateMapView = function (position) {
            if (position) {
                scope.map.setView(position, position.zoom);
            } else {
                scope.map.setView(scope.center, scope.center.zoom);
            }
        }

		scope.createMap = function () {
			scope.map = L.map('map'); // drawControl is for Leaflet Draw plugin

			scope.baseLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
				minZoom: 5,
				maxZoom: 19
			});
			scope.baseLayer.addTo(scope.map);

			checkAttrs();

			scope.updateMapView();
		}

		scope.removeMap = function () {
			scope.map.remove();
		}

		scope.createMap();

		function checkAttrs() {
			
			checkCssAttrs();
			checkInfoAttr();
			checkCoordinatesAttr();
			checkInteractivityAttr();
			checkAddAttr();
			checkCenter();
			checkGeojson();

			function checkCssAttrs () {
				$('#map').css({ 'height': attrs.height || defaults.height });
				$('#map').css({ 'width': attrs.width || defaults.width });
			}

			function checkInfoAttr () {
				if (attrs.info === 'true') {
					scope.info = L.control.info();
					scope.info.addTo(scope.map);
				}
			}

			function checkCoordinatesAttr () {
				if (attrs.coordinates === 'true') {
					scope.coordinates = L.control.coordinates()
					scope.coordinates.addTo(scope.map);
				}
			}

			function checkInteractivityAttr () {
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
			}

			function checkAddAttr () {
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

						}

						scope.map.addLayer(layer);
					});
				}
			}

			function checkCenter () {
				if (scope.center === undefined) {
					scope.center = defaults.position;
				}
			}

			function checkGeojson () {
				if (scope.geojson !== undefined) {
					scope.objects = L.geoJson(scope.geojson, {
	            		style: style,
	            		onEachFeature: infoOnEachFeature
	        		});
					setGeoJson();
				}
			}
		}

		// GeoJson objects styling functions
        
        function style(feature) {
            return {
                fillColor: '#FD8D3C',
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            };
        }

        function infoHighlightFeature(e) {
            var layer = e.target;

            layer.setStyle({
                weight: 5,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.7
            });
            scope.info.update(layer.feature.properties);
        };

        function infoResetHighlight(e) {
            scope.objects.resetStyle(e.target);
            scope.info.update();
        }

        function infoZoomToFeature(e) {
            scope.map.fitBounds(e.target.getBounds());
        }

        function infoOnEachFeature(feature, layer) {
            layer.on({
                mouseover: infoHighlightFeature,
                mouseout: infoResetHighlight,
                click: infoZoomToFeature
            });
        }

        // GeoJson adding and removal functions

        function setGeoJson () {
        	scope.objects.addTo(scope.map);
        }

        function clearGeoJson () {
  			scope.map.removeLayer(scope.objects);
		}

		// Map adding and removal functions

		function createMap () {
			scope.map = L.map('map'); // drawControl is for Leaflet Draw plugin

			scope.baseLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
				minZoom: 5,
				maxZoom: 19
			});
			scope.baseLayer.addTo(scope.map);

			checkAttrs();

			scope.updateMapView();
		}

	}

    angular.module('restApp').directive("leafletMap", function () {
		return {
			restrict: 'E',
			template: '<div id="map"></div>',
			controller: 'MapCtrl',
			link: link
		};

    });

})();