var dataset = 'https://raw.githubusercontent.com/cambridgegis/cambridgegis_data/master/Landmark/Public_Art/LANDMARK_PublicArt.geojson';

var myRectangles = [];
var layer ;
var tagged;
var parsedData;
var myFeatureGroup;
// Initialize Leaflet Draw

var drawControl = new L.Control.Draw({
  draw: {
    polyline: false,
    polygon: false,
    circle: true,
    marker: false,
    rectangle: true,
  }
});

var blue_marker = L.icon({
    iconUrl: 'blue_marker.png',
    shadowUrl: 'marker-shadow.png',

    iconSize:     [23, 32], // size of the icon
    shadowSize:   [32, 32], // size of the shadow
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    shadowAnchor: [-6, -2],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var red_marker = L.icon({
    iconUrl: 'red_marker.png',
    shadowUrl: 'marker-shadow.png',

    iconSize:     [23, 32], // size of the icon
    shadowSize:   [32, 32], // size of the shadow
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    shadowAnchor: [-6, -2],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


var template = function (id, type){return '<div class="shape" id="shape-'+id+'" data-id="'+id+'"><h1>'+id+'</h1><h2>Type:'+type+'</h2></div>' ;};

var getSideBarItems = function(){
  shape = layer.toGeoJSON(myRectangles);
  shapeToFeatColl = {"type": "FeatureCollection","features": [shape]};
  within = turf.within(parsedData, shapeToFeatColl);
  _.each(within.features,function (e){$('#shapes').append(template(e.id, e.properties.Title));});
};


var changeIcon = function(feature,latlng){
  if(feature.id == clickId){
  return L.marker(latlng, {icon: red_marker});
} else { return L.marker(latlng, {icon: blue_marker});
}
};


var highLightMarker = function(){

  clickId = $(this).attr("data-id");
  map.removeLayer(myFeatureGroup);
  myFeatureGroup = L.geoJson(parsedData, {
  pointToLayer: changeIcon,
}).addTo(map);
};


map.on('draw:created', function (e) {
    //if(layer){map.removeLayer(layer);}
    $('.shape').remove();
    map.removeLayer(myRectangles);
    var type = e.layerType; // The type of shape
    layer = e.layer; // The Leaflet layer for the shape
    var id = L.stamp(layer); // The unique Leaflet ID for the layer
    myRectangles = layer;
    getSideBarItems();
    map.addLayer(layer);
    $('.shape').on('click', highLightMarker);
});

$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    parsedData = JSON.parse(data);
    myFeatureGroup = L.geoJson(parsedData, {pointToLayer: function (feature, latlng) {return L.marker(latlng, {icon: blue_marker });}}).addTo(map);
  });
  map.addControl(drawControl);
});
