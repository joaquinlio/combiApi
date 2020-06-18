function getDistance(p1, p2) {
  var rad = function (x) {
    return (x * Math.PI) / 180;
  };
  /* var p1 = { lat: -34.797861406091485, lng: -58.39519691731324 };
    var p2 = { lat: -34.800302290906146, lng: -58.40224031457789 }; */
  var getDistance = function (p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.latitude - p1.latitude);
    var dLong = rad(p2.longitude - p1.longitude);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(p1.latitude)) *
        Math.cos(rad(p2.latitude)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
  };
  return getDistance(p1, p2);
}
module.exports = getDistance;
