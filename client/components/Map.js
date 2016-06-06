import React from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';
import { default as MarkerClusterer } from 'react-google-maps/lib/addons/MarkerClusterer';

export default function SimpleMap (props) {
  return (
    <section style={{height: '100%'}}>
      <GoogleMapLoader
        containerElement={
          <div
            {...props.containerElementProps}
            style={{
              height: '100%',
              width: '100%',
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            ref={(map) => console.log(map)}
            defaultZoom={3}
            defaultCenter={{ lat: 46.891461, lng: 8.099526 }} // Rotbach
            onClick={props.onMapClick}
            defaultOptions={{
              disableDefaultUI: true,
              backgroundColor: '#CCC',
              styles: [
              {
                featureType: 'all',
                stylers: [
                { saturation: -70 }
                ]
              }
              ]
            }}

          >
            <MarkerClusterer
              averageCenter
              enableRetinaIcons
              gridSize={ 60 }
            >
              {props.markers.map((marker, index) => {
                return (
                  <Marker
                    {...marker}
                    onRightclick={() => props.onMarkerRightclick(index)} />
                );
              })}
            </MarkerClusterer>
          </GoogleMap>
        }
      />
    </section>
  );
}
