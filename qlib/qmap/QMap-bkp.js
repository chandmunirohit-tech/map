const MAP_THEMES = {
  eclipse: [
    { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "color": "#ffffff" }] },
    { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 13 }] },
    { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }] },
    { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#144b53" }, { "lightness": 14 }, { "weight": 1.4 }] },
    { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#08304b" }] },
    { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#0c4152" }, { "lightness": 5 }] },
    { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }] },
    { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#0b434f" }, { "lightness": 25 }] },
    { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }] },
    { "featureType": "road.arterial", "elementType": "geometry.stroke", "stylers": [{ "color": "#0b3d51" }, { "lightness": 16 }] },
    { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#000000" }] },
    { "featureType": "transit", "elementType": "all", "stylers": [{ "color": "#146474" }] },
    { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#021019" }] }
  ],

  alabaster: [
    { "featureType": "all", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }] },
    { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
    { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "color": "#f5f5f5" }] },
    { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#eeeeee" }] },
    { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }] },
    { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#dadada" }] },
    { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#c9c9c9" }] }
  ],

  candy: [
    { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "color": "#4a4a4a" }] },
    { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "weight": 2.5 }] },
    { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#eef3ec" }] },
    { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#b3e59f" }] },
    { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#fffc00" }] },
    { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }] },
    { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#44c1e6" }] }
  ],

  nautical: [
    { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#0055a5" }] },
    { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }] },
    { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] },
    { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#d1d1d1" }] }
  ],

  parchment: [
    { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#cddced" }] },
    { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f0f3f4" }] },
    { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] },
    { "featureType": "road.local", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] }
  ]
};


// // GLOBAL
// let map;
// let directionsService;
// let directionsRenderer;
// let polyline;


// // MARKER CONTROL
// let markers = [];
// let markerColor = "red"; // default


// // LOCATIONS
// let locations = [
//   { lat:22.5744, lng:88.3629 },
//   { lat:22.56912655228612, lng:88.43618801112807 }
// ];

// function initMap(){
//   map = new google.maps.Map(document.getElementById("map"),{
//     zoom:12,
//     center:locations[0],
//     styles:MAP_THEMES.candy
//   });

//   directionsService = new google.maps.DirectionsService();
//   //Default google map icon
//   // directionsRenderer = new google.maps.DirectionsRenderer();
//   // directionsRenderer.setMap(map);

//   //custom setting google map icon
//   directionsRenderer = new google.maps.DirectionsRenderer({
//   suppressMarkers: true   
// });


// directionsRenderer.setMap(map);
//   // markers (UPDATED)
//   locations.forEach((pos,i)=>{

//   const marker = new google.maps.Marker({
//   position: pos,
//   map: map,
//   icon: {
//     url: "https://imgcdn.kuick.com/cms-designer/location_icon/vector-3.svg",
//     fillColor: "green",     
//     fillOpacity: 1,
//     scale: 2,
//     fillOpacity: 0.5,
//   }
// });

//   markers.push(marker);
// });



// // red:    https://maps.google.com/mapfiles/kml/paddle/red-circle.png
// // blue:   https://maps.google.com/mapfiles/kml/paddle/blu-circle.png
// // green:  https://maps.google.com/mapfiles/kml/paddle/grn-circle.png
// // yellow: https://maps.google.com/mapfiles/kml/paddle/ylw-circle.png
// // purple: https://maps.google.com/mapfiles/kml/paddle/purple-circle.png


//   // draw default
//   drawRoute("#00ff00", 10); // route line
//   // drawStraightLine("#000000", 6); // straight line

//   // theme
//   const themeSelect = document.getElementById("themeSelect");
//   if(themeSelect){
//     themeSelect.addEventListener("change",function(){
//       map.setOptions({styles:MAP_THEMES[this.value]});
//     });
//   }
// }

// // ROUTE
// function drawRoute(color = "#ff0", width = 5){

//   if(locations.length < 2) return;

//   const waypoints = locations.slice(1,-1).map(loc => ({
//     location:loc,
//     stopover:true
//   }));

//   directionsService.route({
//     origin:locations[0],
//     destination:locations[locations.length-1],
//     waypoints:waypoints,
//     travelMode:google.maps.TravelMode.DRIVING
//   },(result,status)=>{

//     if(status === "OK"){

//       directionsRenderer.setOptions({
//         polylineOptions:{
//           strokeColor: color,
//           strokeWeight: width
//         }
//       });

//       directionsRenderer.setDirections(result);
//     }
//   });
// }


// // LINE
// function drawStraightLine(color = "#000", width = 10){

//   if(polyline){
//     polyline.setMap(null);
//   }

//   polyline = new google.maps.Polyline({
//     path:locations,
//     geodesic:true,
//     strokeColor:color,
//     strokeOpacity:0.8,
//     strokeWeight:width
//   });

//   polyline.setMap(map);
// }


// // ROUTE CONTROL
// function setRouteStyle(color, width){
//   drawRoute(color, width);
// }


// // LINE CONTROL
// function setLineStyle(color, width){
//   drawStraightLine(color, width);
// }


// // MARKER COLOR CONTROL
// function setMarkerColor(green){

//   markerColor = color;

//   markers.forEach(marker=>{
//     markers[0].setIcon({
//       url:"http://maps.google.com/mapfiles/ms/icons/green-dot.png"
//     });
//   });
// }


// GLOBAL
let map;
let directionsService;
let directionsRenderer;
let polyline = null;
let circles = [];

let currentMode = "route";   // "route" | "line"
let currentPathType = "Straightline"; // prop value: "Route" | "Straightline"

// MARKERS
let markers = [];        // google.maps.Marker — one per location
let markerColor = "green";

// LOCATIONS  (default fallback; overridden via initMap config)
let locations = [
  { lat: 22.5744, lng: 88.3629 },
  { lat: 22.5800, lng: 88.4000 },
  { lat: 22.56912655228612, lng: 88.43618801112807 }
];

/**
 * initMap(config)
 *
 * config = {
 *   elementId  : string   — id of the map container  (default: "map")
 *   locations  : Array<{lat, lng}>  — list of locations; each gets its own marker
 *   pathType   : "Route" | "Straightline"  — how to connect the locations
 *   theme      : keyof MAP_THEMES          — map colour theme  (default: "candy")
 *   zoom       : number                   — initial zoom      (default: 12)
 *   markerUrl  : string                   — custom marker SVG/PNG URL (optional)
 *   lineColor  : string                   — stroke colour for the path
 *   lineWidth  : number                   — stroke weight
 * }
 */
function initMap(config = {}) {

  // ── APPLY CONFIG ────────────────────────────────────────────────
  const elementId = config.elementId || "map";
  const theme = config.theme || "candy";
  const zoom = config.zoom || 12;
  lineColor = config.lineColor || "#00cc66";
  lineWidth = config.lineWidth || 6;

  // Override global locations if provided
  if (Array.isArray(config.locations) && config.locations.length > 0) {
    locations = config.locations;
  }

  // Store pathType globally so switchDirection() can re-use it
  currentPathType = config.pathType || "Route";

  // ── MAP ─────────────────────────────────────────────────────────
  map = new google.maps.Map(document.getElementById(elementId), {
    zoom: zoom,
    center: locations[0],
    styles: MAP_THEMES[theme] || MAP_THEMES.candy
  });

  // ── DIRECTIONS SERVICE ──────────────────────────────────────────
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({
    suppressMarkers: true   // we place our own markers below
  });
  directionsRenderer.setMap(map);

  // ── MARKERS  (one separate marker per location) ─────────────────
  markers = [];   // clear any stale markers from a previous call

  locations.forEach((pos, index) => {

    const marker = new google.maps.Marker({
      position: pos,
      map: map,
      icon: config.markerUrl
        ? { url: config.markerUrl, scaledSize: new google.maps.Size(40, 40) }
        : getMarkerIcon(markerColor),
      title: `Location ${index + 1}  (${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)})`
    });

    // Optional click info-window
    const infoWindow = new google.maps.InfoWindow({
      content: `<div style="font-family:sans-serif;padding:6px 2px">
                  <strong>Location ${index + 1}</strong><br/>
                  <span style="color:#555;font-size:12px">
                    ${pos.lat.toFixed(6)}, ${pos.lng.toFixed(6)}
                  </span>
                </div>`
    });
    marker.addListener("click", () => infoWindow.open(map, marker));

    markers.push(marker);
  });

  // ── DRAW PATH based on pathType prop ────────────────────────────
  if (currentPathType === "Route") {
    drawRoute(lineColor, lineWidth);
  } else {
    drawStraightLine(lineColor, lineWidth);
  }

  // ── THEME SELECTOR (if present in HTML) ─────────────────────────
  const themeSelect = document.getElementById("themeSelect");
  if (themeSelect) {
    themeSelect.addEventListener("change", function () {
      map.setOptions({ styles: MAP_THEMES[this.value] });
    });
  }
}

// module-level variables used inside initMap (declared here to keep scope clean)
let lineColor = "#00cc66";
let lineWidth = 6;

//////////////////////////////////////////////////////
// MULTIPLE RADIUS  (optional utility)
//////////////////////////////////////////////////////
function drawAllRadius(radius = 2000) {

  // clear previous circles
  circles.forEach(c => c.setMap(null));
  circles = [];

  locations.forEach(loc => {

    const circle = new google.maps.Circle({
      strokeColor: "#00cc66",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#00cc66",
      fillOpacity: 0.15,
      map: map,
      center: loc,
      radius: radius
    });

    circles.push(circle);
  });
}

//////////////////////////////////////////////////////
// ROUTE (SHOW)
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
// ROUTE PATH  —  uses DirectionsService (road-snapped)
//////////////////////////////////////////////////////
function drawRoute(color = "#00cc66", width = 6) {

  currentMode = "route";

  // clear any existing straight-line polyline
  if (polyline) {
    polyline.setMap(null);
    polyline = null;
  }

  if (locations.length < 2) return;

  // attach renderer
  directionsRenderer.setMap(map);

  const waypoints = locations.slice(1, -1).map(loc => ({
    location: loc,
    stopover: true
  }));

  directionsService.route({
    origin: locations[0],
    destination: locations[locations.length - 1],
    waypoints: waypoints,
    travelMode: google.maps.TravelMode.DRIVING
  }, (result, status) => {

    if (status === "OK") {
      directionsRenderer.setOptions({
        polylineOptions: {
          strokeColor: color,
          strokeWeight: width
        }
      });
      directionsRenderer.setDirections(result);
    } else {
      console.warn("DirectionsService failed:", status);
    }
  });
}

//////////////////////////////////////////////////////
// STRAIGHT LINE  —  draws a direct geodesic polyline
//////////////////////////////////////////////////////
function drawStraightLine(color = "#0055ff", width = 4) {

  currentMode = "line";

  // hide the route renderer
  directionsRenderer.setMap(null);

  // clear any previous polyline
  if (polyline) {
    polyline.setMap(null);
  }

  if (locations.length < 2) return;

  polyline = new google.maps.Polyline({
    path: locations,
    geodesic: true,
    strokeColor: color,
    strokeOpacity: 0.85,
    strokeWeight: width
  });

  polyline.setMap(map);
}

//////////////////////////////////////////////////////
// SWITCH DIRECTION  (accepts "Route" or "Straightline")
//
// Usage:
//   switchDirection("Route")
//   switchDirection("Straightline")
//
// Also accepts legacy lowercase: "route" | "line"
//////////////////////////////////////////////////////
function switchDirection(type) {

  // normalise so both "Route" and "route" work, etc.
  const normalised = (type || "").toLowerCase().trim();

  // ── ROUTE ────────────────────────────────────────
  if (normalised === "route") {
    drawRoute(lineColor, lineWidth);
    return;
  }

  // ── STRAIGHT LINE ────────────────────────────────
  if (normalised === "straightline" || normalised === "line") {
    drawStraightLine(lineColor, lineWidth);
    return;
  }

  console.warn(`switchDirection: unknown type "${type}". Use "Route" or "Straightline"`);
}

//////////////////////////////////////////////////////
// MARKER ICON
//////////////////////////////////////////////////////
function getMarkerIcon(color) {
  return {
    url: `https://imgcdn.kuick.com/cms-designer/location_icon/vector-3.svg                                                    `,
    scaledSize: new google.maps.Size(40, 40)
  };
}

//////////////////////////////////////////////////////
// MARKER COLOR CHANGE
//////////////////////////////////////////////////////
function setMarkerColor(color) {
  markerColor = color;

  markers.forEach(marker => {
    marker.setIcon(getMarkerIcon(color));
  });
}

