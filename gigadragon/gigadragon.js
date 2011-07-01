// REQUIRES:
// jquery.js
// seadragon.js or seadragon-min.js
// SeadragonUtils.js
// GigapanTileSource.js


var GigaDragon = { // BEGIN Gigadragon namespace

  hanlderesize: function () {
    console.log("Resize handler fired.");
  }, 

  initGigapan: function (targetDiv, gigapanId) {
    // initialize the viewr
    viewer = new Seadragon.Viewer(targetDiv);
    Seadragon.Config.imageLoaderLimit = 6;
    
    loadgigapan(viewer, gigapanId);
    setTimeout("handleresize();",1000);
    return viewer;
  },

  GigadragonViewer: function (target, gigapan_meta, success, failure) {
    viewer = new Seadragon.Viewer(target);
    Seadragon.Config.imageLoaderLimit = 6;
  },

  loadGigapan: function (viewer, gigapanId){
         // clear the viewer
         viewer.close();

         // load the gigapan

         var optionsForGetMeta = {
            url: 'http://api.gigapan.org/beta/gigapans/' + gigapanId + '.json',

            success: function(gigapanJSON) {

               if (gigapanJSON && gigapanJSON['id'] )
                  {
                      gigapan=gigapanJSON;
                      // create the tile source
                      var gigapanSource = new GigapanTileSource(gigapan['id'], gigapan['width'], gigapan['height']);

                      // tell the viewer to open the tile source
                      viewer.openTileSource(gigapanSource);
                      var viewport_size = Seadragon.Utils.getWindowSize();

                      // load the snapshots (if any)
                      if (gigapan['snapshot_set'] && gigapan['snapshot_set']['count'] && gigapan['snapshot_set']['items'])
                       {
                         alert("This gigapan has snapshots. TODO: Display them.");
                       }

                   } else
                      {
                        alert("Failed to load gigapan " + gigapanId);          
                      }
            }
           }
           $.ajax(optionsForGetMeta);
         },

    buildLabeledIcon: function (imageurl, label) {
        container = $("<div>");
        $('img').attr('src', imageurl).appendTo(container);
        $('<div>'+label+'</div>').appendTo(container);
        return container[0];
    },

} // END GigaDragon namespace
