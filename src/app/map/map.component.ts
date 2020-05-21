import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import {MatSliderChange} from "@angular/material/slider";
import {AcoService} from "../services/aco.service";
import AcoInput from "../models/aco-input";
import City from "../models/city";
import AcoOptions from "../models/aco-options";
import AntResult from "../models/ant-result";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  alpha: number = 2;
  beta: number = 3;
  rho: number = 0.5 ;
  q: number = 4;
  res: boolean = false;
  iterNum: number = 1000;
  antsNum: number = 100;

  result: CalculateLocation[] = [];
  markers: Marker[] = [];
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  locations: CalculateLocation[] = [];
  id: number = 0;

  @ViewChild('search')
  public searchElementRef: ElementRef;


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private acoService: AcoService
  ) { }


  ngOnInit() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      // @ts-ignore
      this.geoCoder = new google.maps.Geocoder;

      // @ts-ignore
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }


  formatLabel(value: number) {
    return value;
  }

  rhoFormatLabel(value: number) {
    return value/10;
  }

  changeValue($event: MatSliderChange) {
    this.rho = $event.value / 10;
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }


  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  saveLocation() {

    let val = -1;
    this.locations.forEach(item=>{
      if(item.latitude == this.latitude && item.longitude == this.longitude){
        val = 0;
      }
    })

    if(val == -1){
      this.locations.push(CalculateLocation.of(this.id,this.latitude,this.longitude,this.address));
      this.id++;
    } else {

    }
  }

  calculate() {
    this.acoService.calculate(AcoInput.of(this.getCityType(),
      AcoOptions.of(this.alpha,this.beta,this.iterNum,this.antsNum,this.rho,this.q))).subscribe((res:AntResult)=>{
        console.log("res" + res);
        res.optimalRoutes.forEach(value => {
          this.locations.forEach(item=>{
            if(value == item.id.toString()){
              this.result.push(item);
            }
          })
        })
    });
  }

  getCityType(): City[]{
    const city : City[] = [] ;
    this.locations.forEach(item=>{
      city.push({
        id: item.id,
        x: item.latitude,
        y: item.longitude
      })
    })
    return city;
  }

  clearList() {
    this.locations = [];
    this.result = [];
  }
}

export class CalculateLocation{
  id: number;
  latitude: number;
  longitude: number;
  address: string;

  static of(id,latitude,longitude,address){
    const cl = new CalculateLocation();
    cl.id = id;
    cl.address = address;
    cl.latitude = latitude;
    cl.longitude = longitude;
    return cl;
  }
}

export class Marker {
  latitude: number;
  longitude: number;

  static of(latitude,longitude){
    const m = new Marker();
    m.latitude = latitude;
    m.longitude = longitude;
    return m;
  }
}
