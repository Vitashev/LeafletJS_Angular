(function () {

    angular.module('restApp').controller("MapCtrl", ["$scope", function ($scope) {
        $scope.center = {
            lat: 49.842,
            lng: 24.032
        }
        $scope.zoom = 17;

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

        function highlightFeature(e) {
            var layer = e.target;

            layer.setStyle({
                weight: 5,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.7
            });
            info.update(layer.feature.properties);
        };

        function resetHighlight(e) {
            geojson.resetStyle(e.target);
            info.update();
        }

        function zoomToFeature(e) {
            map.fitBounds(e.target.getBounds());
        }

        function onEachFeature(feature, layer) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomToFeature
            });
        }
        
        // Get GeoJson
        
        $scope.geojson = L.geoJson(housesData, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo($scope.map);
    }]);

})();
