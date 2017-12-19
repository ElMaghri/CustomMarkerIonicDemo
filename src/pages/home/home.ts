import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  GroundOverlay,
  ILatLng
} from "@ionic-native/google-maps";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  map: GoogleMap;

  constructor(private googleMaps: GoogleMaps, private platform: Platform) {}

  ionViewDidLoad() {
    this.platform.ready().then(readySource => {
      console.log("platform");
      this.loadMap();
    });
  }

  loadMap() {
    let bounds: ILatLng[] = [
      { lat: 40.712206, lng: -74.22645 },
      { lat: 40.712217, lng: -74.22656 }
    ];

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: bounds,
        tilt: 30
      }
    };
    this.map = this.googleMaps.create("map", mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      return this.map
        .addGroundOverlay({
          url: "assets/imgs/marker.jpg",
          bounds: bounds,
          clickable: true
        })
        .then((grnoudoverlay: GroundOverlay) => {
          grnoudoverlay
            .on(GoogleMapsEvent.GROUND_OVERLAY_CLICK)
            .subscribe(() => {
              console.log("clicked");
              grnoudoverlay.setImage("assets/icon/favicon.ico");
            });
        });
      // this.map
      //   .addMarker({
      //     icon: {
      //       url: "assets/imgs/logo.png",
      //       size: { width: 30, height: 30 }
      //     },
      //     title: "titre de popver",
      //     animation: "DROP",
      //     snippet: "snippet cest le text qui s'affiche apre le titre ",
      //     position: {
      //       lat: 43.0741904,
      //       lng: -89.3809802
      //     }
      //   })
      //   .then(marker => {
      //     marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      //       // alert("clicked");
      //     });
      //   });
    });
  }
  // end load maps
}
