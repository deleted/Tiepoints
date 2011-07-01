/* Tiepoint data structures */
function Tiepoint (lat,lon,x,y) { // constructor
  //alert("Hi from Tiepoint constructor." + lat + lon + x + y)]
  this.is_new = true; //to be unset the first time the tiepoint is deactivated
  this.id = tiepoints.nextId();
  this.lat = lat;
  this.lon = lon;
  this.x = x;
  this.y = y; 

  this.updatePlacemark = function(){
    if (this.lat && this.lon) {
      if(!this.placemark){
        this.placemark = generatePlacemark(this.id, this.lat, this.lon);
      }
      point = this.placemark.getGeometry();
      if(point.getLatitude() != this.lat || point.getLongitude != this.lon) { //Point has changed. Update it.
        point.setLatitude(this.lat);
        point.setLongitude(this.lon);
      }
      this.placemark.setStyleSelector(iconStyles[this.active ? 'active' : 'inactive' ])
    }
  }
  if (this.lat && this.lon){this.updatePlacemark();};
  
  this.update = function(lat, lon, x, y) {
    //if any of the parameters are null, they won't be set
    if (lat) {this.lat = lat};
    if (lon) {this.lon = lon};
    if (x) {this.x = x};
    if (y) {this.y = y};
    if (this.lat && this.lon && this.x && this.y && this.is_new) {this.deactivate()};
    if (this.lat && this.lon) {this.updatePlacemark()};
    refreshTpTable();
  }
  
  //Activation: This is a UI thing.  If the tiepoint is active, it will be editiable.
   this.activate = function(){
     tiepoints.deactivateAll();
     this.active=true;
     this.updatePlacemark();
   }
   this.deactivate = function(){
     this.active = false;
     if (this.is_new) { this.is_new = false};
     this.updatePlacemark();
   }
   this.activate(); //New tiepoints are active by default.
}

var tiepoints = { // manages the collection
  'points': [],
  'current_id': 0,
  'nextId': function(){this.current_id += 1; return this.current_id;},
  'deactivateAll': function(){for(i in this.points){this.points[i].deactivate();} refreshTpTable(); },
  'activate': function(id){
    for (i in this.points){
      if (this.points[i].id == id){this.points[i].activate()}
    }
  },
  'getActive': function(){
    //Return the active tiepoint, or nothing.
    for (i in this.points) {
      if (this.points[i].active) {return this.points[i]}
    }
    return null
  },
  'addTiepoint': function(lat, lon, x, y){
    var tp = new Tiepoint(lat, lon, x, y);
	  tiepoints.points.push(tp);
	  refreshTpTable();
	  return tp;
  },
};
