/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/prefer-default-export */
import React, { Component } from 'react';
import * as Location from 'expo-location';

// Default location set to Bell.
export const DEFAULT_LATITUDE = 37.343566;
export const DEFAULT_LONGITUDE = -121.918752;

export function withLocation(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        latitude: DEFAULT_LATITUDE,
        longitude: DEFAULT_LONGITUDE,
      };
    }

    componentDidMount() {
      Location.getPermissionsAsync()
        .then((response) => {
          if (!response.granted) {
            this.requestPermission();
          } else {
            this.detectLocation();
          }
        });
    }

    requestPermission = () => {
      Location.requestPermissionsAsync()
        .then((response) => {
          if (response.granted) {
            this.detectLocation();
          }
        });
    }

    detectLocation = () => {
      Location.getCurrentPositionAsync()
        .then((location) => {
          const { latitude, longitude } = location.coords;
          this.setState({ latitude, longitude });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    render() {
      return <WrappedComponent location={this.state} {...this.props} />;
    }
  };
}
