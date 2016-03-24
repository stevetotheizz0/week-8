/* =====================
Lab 1: Turf.js

"Our maps have only interpreted data in various ways; the point is to change it."


In the coming weeks, we'll be looking at ways to explore, analyze, and create data.
This will require us to build upon concepts that we've already mastered. Turf.js is a
javascript library which provides some excellent utilities for fast, in-browser
spatial analysis.

Recall that GeoJSON is a format for representing spatial objects in JSON. It encodes
not only the geometric entities themselves (Points, Lines, Polygons) but also associated
properties (these are the properties of Features) and collections thereof (FeatureGroups).

This is useful for sending spatial data over the wire (we can present these objects in text
since they are JSON). But the predictable structure of a geojson object (there are
infinitely many possible geojson objects, though they all meet the criteria specified
here: http://geojson.org/) also benefits us by offering a structure which our code can
expect.

Consider the functions you've written before: their input has depended on the type
of data they receive. If you write a function which expects an object that has an 'x' and
a 'y' property, you can access those within your function body:

function exampleFunction(someObject) {
  return someObject.x + someObject.y;
}
exampleFunction({x: 1, y: 22}) === 23

Turf leans on the predictable structure of geojson to provide its analytic functions.
Here, Turf lays out the types you can expect to find throughout its documentation:
http://turfjs.org/static/docs/global.html

Let's look to a turf function's docs: http://turfjs.org/static/docs/module-turf_average.html
==================================================================================================
name              - Type                        - Description
==================================================================================================
polygons          - FeatureCollection.<Polygon> - polygons with values on which to average
points            - FeatureCollection.<Point>   - points from which to calculate they average
field             - String                      - the field in the points features from which to
                                                  pull values to average
outputField       - String                      - the field in polygons to put results of the averages
==================================================================================================
Returns           - FeatureCollection.<Polygon> - polygons with the value of outField set to
                                                  the calculated averages
==================================================================================================

What this tells us is that turf.average takes four arguments. The first
argument is a FeatureCollection of Polygons, the second, is a FeatureCollection
of Points, the third and fourth is a bit of text.

With those inputs, a FeatureCollection of polygons is produced which has the average value
of "field" from the points (captured within a spatial join) stored on its properties' field
"outputField".

All of the functionality within turf can be similarly understood by looking to its documentation.
Turf documentation: http://turfjs.org/static/docs/
Turf examples: http://turfjs.org/examples.html


Each exercise in this lab involves the creation of GeoJSON (feel free to use geojson.io) and
the use of that GeoJSON in some turf functions.

NOTE: you can use geojson.io's table view to attach properties to your geometries!

Exercise 1: Finding the nearest point
Take a look at http://turfjs.org/static/docs/module-turf_nearest.html
Produce a Feature and a FeatureCollection (look to the in-documentation examples if this is
unclear) such that the single Point Feature is in Philadelphia and the nearest point in the
FeatureCollection (there should be at least two other points in this collection) happens
to be in New York City. Plot the NYC point and no others with the use of turf.nearest.
*/

/*
var point = {"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-75.1626205444336,39.956596107293855]}};

var severalPoints = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"pop":500},"geometry":{"type":"Point","coordinates":[-73.96820068359375,40.79301881008675]}},{"type":"Feature","properties":{"pop":400},"geometry":{"type":"Point","coordinates":[-73.91532897949219,40.75974059207392]}},{"type":"Feature","properties":{"pop":100},"geometry":{"type":"Point","coordinates":[-74.17831420898436,40.694175391548754]}}]};

var nearest = turf.nearest(point, severalPoints);

L.geoJson(nearest).addTo(map);
*/

/*

Exercise 2: Finding the average point value (a form of spatial join)
Docs here: http://turfjs.org/static/docs/module-turf_average.html
Produce one FeatureCollection of points (at least 5) and one of polygons (at least 2)
such that, by applying turf.average, you generate a new set of polygons in which one of
the polygons has the property "averageValue" with a value of 100.
*/
/*
var severalPoints = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"pop":500},"geometry":{"type":"Point","coordinates":[-73.96820068359375,40.79301881008675]}},{"type":"Feature","properties":{"pop":400},"geometry":{"type":"Point","coordinates":[-73.91532897949219,40.75974059207392]}},{"type":"Feature","properties":{"pop":100},"geometry":{"type":"Point","coordinates":[-74.17831420898436,40.694175391548754]}},{"type":"Feature","properties":{"pop":300},"geometry":{"type":"Point","coordinates":[-73.6798095703125,40.74101426921151]}},{"type":"Feature","properties":{"pop":50},"geometry":{"type":"Point","coordinates":[-74.58892822265625,40.88029480552824]}}]};

var polygons = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-74.0863037109375,40.5930995321649],[-74.0863037109375,41.11453808726831],[-73.52325439453124,41.11453808726831],[-73.52325439453124,40.5930995321649],[-74.0863037109375,40.5930995321649]]]}},{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-74.90478515625,40.57849862511043],[-74.90478515625,41.29844430929419],[-74.1357421875,41.29844430929419],[-74.1357421875,40.57849862511043],[-74.90478515625,40.57849862511043]]]}}]};

var averaged = turf.average(polygons, severalPoints, 'pop', 'pop_avg');

var resultFeatures = severalPoints.features.concat(
  averaged.features);
var result = {
  "type": "FeatureCollection",
  "features": resultFeatures
};


L.geoJson(result, {
  onEachFeature: function(feature, layer) {
    layer.bindPopup('The average population in this polygon is '+feature.properties.pop_avg+ '.');
  }
}).addTo(map);
*/


/*
Exercise 3: Tagging points according to their locations
http://turfjs.org/static/docs/module-turf_tag.html
It can be quite useful to 'tag' points in terms of their being within this or that
polygon. You might, for instance, want to color markers which represent dumpsters
according to the day that trash is picked up in that area. Create three polygons
and use properties on those polygons to color 5 points.
*/
var severalPoints = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-75.13618469238281,39.97738318652558]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-75.16571044921875,39.926325138375205]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-75.16742706298828,39.94238358098156]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-75.17601013183592,39.982381667715686]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-75.12725830078125,39.9852753581228]}}]};

var polygons = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-75.15541076660156,39.99605985169435],[-75.18424987792967,39.982381667715686],[-75.1845932006836,39.973699861154266],[-75.17292022705078,39.961332959837826],[-75.1633071899414,39.96106980997141],[-75.15541076660156,39.99605985169435]]]}},{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-75.18287658691406,39.91737289576941],[-75.18287658691406,39.94396289639476],[-75.1530075073242,39.94396289639476],[-75.1530075073242,39.91737289576941],[-75.18287658691406,39.91737289576941]]]}},{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-75.14305114746094,39.961332959837826],[-75.13824462890625,39.969226984896416],[-75.12142181396483,39.974489161874146],[-75.12313842773438,39.99053629940934],[-75.1468276977539,39.99027326196773],[-75.15094757080078,39.9600172003783],[-75.14305114746094,39.961332959837826]]]}}]} ;

/*
testArguments = polygons.eachLayerfunction(f) {
  f.properties.fillColor = '#' +
    (~~(Math.random() * 16)).toString(16) +
    (~~(Math.random() * 16)).toString(16) +
    (~~(Math.random() * 16)).toString(16);
  f.properties.weight = 1;
  f.properties['fill-opacity'] = 1;
};*/

polygons.features.forEach(function(f) {f.properties.id =
  (~~(Math.random() * 16)).toString(16) +
  (~~(Math.random() * 16)).toString(16);
});

L.geoJson(polygons/*, {style:testArguments}*/).addTo(map);

var tagged = turf.tag(severalPoints, polygons,
                      'id', 'poly_id');


L.geoJson(tagged,  {
  onEachFeature: function(feature, layer) {
    layer.bindPopup('This point lies in the polygon with an ID of '+feature.properties.poly_id+ '.');
  }}
).addTo(map);

/*
*STRETCH GOAL*
Exercise 4: Calculating a destination
A species of bird we're studying is said to travel in a straight line for 500km
during a migration before needing to rest. One bird in a flock we want to track
has a GPS tag which seems to be on the fritz. We know for a fact that it started
flying from [-87.4072265625, 38.376115424036016] and that its last known coordinate
was [-87.5830078125, 38.23818011979866]. Given this information, see if you can
determine where we can expect this flock of birds to rest.
===================== */
