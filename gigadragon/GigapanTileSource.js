GigapanTileSource.prototype = new Seadragon.TileSource();
GigapanTileSource.prototype.constructor = GigapanTileSource;

function GigapanTileSource(gigapanId, width, height)
   {
   Seadragon.TileSource.call(this, width, height, 256, 0, 8);
   this.gigapanId = gigapanId;
   //alert('gigapanid:'+gigapanId);
   this.getTileUrl = function(level, x, y)
      {
      if (level >= 8)
         {
         level = level - 8;
         }
      var url = 'http://share.gigapan.org/gigapans0/' + this.gigapanId + '/tiles';
      var GC_TILE = ["0", "1", "2", "3"];
      var name = "r";
      var bit = 1 << level >> 1;
      while (bit)
         {
         name = name + GC_TILE[(x & bit ? (1) : (0)) + (y & bit ? (2) : (0))];
         bit = bit >> 1;
         }
      var i = 0;
      while (i < name.length - 3)
         {
         url = url + ("/" + name.substr(i, 3));
         i = i + 3;
         }
        if (gigapan[name] == null & gigapan[name] !== null) {
         //alert('no translation');
         return (url + "/" + name + '.jpg');
        }else{
         //alert("gigapan['id']"+gigapan['id']+" gigapan["+name+"]:"+gigapan[name]);
	     return ("http://farm4.static.flickr.com/" + gigapan[name] + ".jpg");
         
        }
      };

   this.getTileBounds = function(level, x, y)
      {
      var self = this;
      var dimensionsScaled = self.dimensions.times(self.getLevelScale(level));
      var px = (x === 0) ? 0 : self.tileSize * x - self.tileOverlap;
      var py = (y === 0) ? 0 : self.tileSize * y - self.tileOverlap;
      var sx = self.tileSize + (x === 0 ? 1 : 2) * self.tileOverlap;
      var sy = self.tileSize + (y === 0 ? 1 : 2) * self.tileOverlap;
      var scale = 1.0 / dimensionsScaled.x;
      return new Seadragon.Rect(px * scale, py * scale, sx * scale, sy * scale);
      };
   }