L.Control.Coordinates = L.Control.extend({
        
        options: {
               position: 'bottomleft' 
        },
        
        onAdd: function (map) {
                this._div = L.DomUtil.create('div', 'map_coordinates');
                map.on('mousemove', this.updateCoordinates, this);
                this._div.innerHTML = '00.0000 : 00.0000';
                return this._div;
        },

        updateCoordinates: function (e) {
                this._div.innerHTML = this.formatNum(e.latlng.lat) + ' : ' 
                        + this.formatNum(e.latlng.lng);
        },
        
        formatNum: function (num) {
                return num.toFixed(4);
        }

});

L.control.coordinates = function () {
        return new L.Control.Coordinates();
};