
(function () {
    "use strict";

    var Cesium = require('cesium/Cesium');
    //require('cesium/Widgets/widgets.css');
    require('sourcepath/css/main.css');

    // TODO: Add your ion access token from cesium.com/ion/
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNDhhNGY5MS1iZjMzLTRmZmUtYjE0Ny1kY2NjN2NlNmU0NTEiLCJpZCI6MTA3LCJpYXQiOjE0ODkxNTg0ODB9.b1pvDdm-eKF1QaCOhp_I8v8KCD51dTDcWryUkmp_yfg';

    //////////////////////////////////////////////////////////////////////////
    // Creating the Viewer
    //////////////////////////////////////////////////////////////////////////

     var viewer = new Cesium.Viewer('cesiumContainer', {
         scene3DOnly: false,
         selectionIndicator: true,
         baseLayerPicker: false
     });

    //////////////////////////////////////////////////////////////////////////
    // Loading Imagery
    //////////////////////////////////////////////////////////////////////////

    // Remove default base layer
    // viewer.imageryLayers.remove(viewer.imageryLayers.get(0));

    // Add Sentinel-2 imagery
    // viewer.imageryLayers.addImageryProvider(new Cesium.IonImageryProvider({ assetId: 3954 }));

    //////////////////////////////////////////////////////////////////////////
    // Loading Terrain
    //////////////////////////////////////////////////////////////////////////

    // Load Cesium World Terrain
    //viewer.terrainProvider = Cesium.createWorldTerrain({
    //    requestWaterMask : true, // required for water effects
    //    requestVertexNormals : true // required for terrain lighting
    //});
    // Enable depth testing so things behind the terrain disappear.
    //viewer.scene.globe.depthTestAgainstTerrain = true;
    var ellipsoidProvider = new Cesium.EllipsoidTerrainProvider();
    viewer.terrainProvider =  ellipsoidProvider;

    viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
    var startTime = viewer.clock.startTime;
    var midTime = Cesium.JulianDate.addSeconds(startTime, 43200, new Cesium.JulianDate());
    var stopTime = Cesium.JulianDate.addSeconds(startTime, 86400, new Cesium.JulianDate());


    //////////////////////////////////////////////////////////////////////////
    // Loading and Styling Entity Data
    //////////////////////////////////////////////////////////////////////////

    var geojsonOptions = {
        clampToGround : false
    };

    var entities = viewer.entities;

    //Create Entity "folders" to allow us to turn on/off entities as a group.
    var points = entities.add(new Cesium.Entity());
    var polylines = entities.add(new Cesium.Entity());
    var polygons = new Object();

    //var pointsPromise = Cesium.GeoJsonDataSource.load('./Source/data/hidden.json', geojsonOptions);
    var pointsPromise = Cesium.GeoJsonDataSource.load('https://www.hidden-history.ch/download/geojson', geojsonOptions);
    // Add geocache billboard entities to scene and style them
    pointsPromise.then(function(dataSource) {
         // Add the new data as entities to the viewer
         //viewer.dataSources.add(dataSource);

         // Get the array of entities
         var geomEntities = dataSource.entities.values;

         for (var i = 0; i < geomEntities.length; i++) {
             var entity = geomEntities[i];
             if (Cesium.defined(entity.billboard)) {
                 entity.parent = points;
                 // Adjust the vertical origin so pins sit on terrain
                 entity.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
                 // Disable the labels to reduce clutter
                 entity.label = undefined;
                 viewer.entities.add(entity);
             };
             if (Cesium.defined(entity.polyline)) {
                 var positions = entity.polyline.positions.getValue(Cesium.JulianDate.now());
                 var startPosition = positions[0];
                 var stopPosition = positions[1];

                 var ellipsoidGeodesic = new Cesium.EllipsoidGeodesic(Cesium.Cartographic.fromCartesian(startPosition), Cesium.Cartographic.fromCartesian(stopPosition));
                 var distance = ellipsoidGeodesic.surfaceDistance;

                 //var latitude = Cesium.Math.toDegrees(cartographicPositions[0].latitude);
                 //var longitude = Cesium.Math.toDegrees(cartographicPositions[0].longitude);
                 // Create a straight-line path.
                 var property = new Cesium.SampledPositionProperty();
                 property.addSample(startTime, startPosition);
                 property.addSample(stopTime, stopPosition);

                 // Find the midpoint of the straight path, and raise its altitude.
                 var midPoint = Cesium.Cartographic.fromCartesian(property.getValue(midTime));
                 midPoint.height = distance * 0.1;
                 var midPosition = viewer.scene.globe.ellipsoid.cartographicToCartesian(midPoint, new Cesium.Cartesian3());

                 // Redo the path to be the new arc.
                 property = new Cesium.SampledPositionProperty();
                 property.addSample(startTime, startPosition);
                 property.addSample(midTime, midPosition);
                 property.addSample(stopTime, stopPosition);

                 var color = Cesium.Color.fromRandom({
                   alpha : 1.0
                 });
                 // Create an Entity to show the arc.
                 var arcEntity = viewer.entities.add({
                   parent: polylines,
                   position : property,
                   path : {
                     resolution : 1200,
                     material : new Cesium.PolylineGlowMaterialProperty({
                       glowPower : 0.16,
                       color : color
                     }),
                     width : 5,
                     leadTime: 1e10,
                     trailTime: 1e10
                   }
                 });

                 arcEntity.position.setInterpolationOptions({
                   interpolationDegree : 5,
                   interpolationAlgorithm : Cesium.LagrangePolynomialApproximation
                 });
             }
             if (Cesium.defined(entity.polygon)) {

                 var label = entity.properties.getValue().label;
                 var center = entity.properties.getValue(Cesium.JulianDate.now()).center;
		 console.log(center);

                 polygons[label] = entities.add(new Cesium.Entity());
                 polygons[label].show = false;
                 entity.parent = polygons[label];

                 entity.polygon.material = Cesium.Color.fromRandom({
                   alpha : 0.6
                 });

		 var polyPositions = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
                 var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center;
		 console.log(polyCenter);
                 //polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);
                 center = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(center);
		 console.log(center);
                 entity.position = center;

                 // Generate labels
                 entity.label = {
                   text : entity.properties.label,
                   showBackground : true,
                   scale : 0.6,
                   horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
                   verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
                   //distanceDisplayCondition : new Cesium.DistanceDisplayCondition(10.0, 8000.0),
                   //disableDepthTestDistance : 100.0
                 };
                 viewer.entities.add(entity);
             }
         }

         var pointCheckbox = document.getElementById('points');
         var polylinesCheckbox = document.getElementById('polylines');

         Object.keys(polygons).forEach(function(key) {
              console.log(key);
              var checkbox = document.getElementById(key);
              checkbox.addEventListener('change', function (e) {
                   polygons[key].show = e.target.checked;
             });
         });

         pointCheckbox.addEventListener('change', function (e) {
              points.show = e.target.checked;
         });

         polylinesCheckbox.addEventListener('change', function (e) {
              polylines.show = e.target.checked;
         });

    });

}());
