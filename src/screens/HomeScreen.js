import React, { Component } from 'react'
import {View, Text, Button,StyleSheet} from 'react-native'
import * as Permissions from 'expo-permissions';
import * as Location from  'expo-location'
import MapView from 'react-native-maps'




class HomeScreen extends Component {

  constructor(props){
    super(props)
    this.mapRef = React.createRef();
  }

  state = {
    coords:{
      lat:37.78825,
      long:-122.4324
    },
    errorMessage:null
  };

   getCurrentLocationAsync = async ()=>{
     
      const req = await Location.requestPermissionsAsync();
      if (!req.granted) {
        this.setState({errorMessage:'Access Denied'});
      }
      let location = await Location.getCurrentPositionAsync({});

      const lat = parseInt(location.coords.latitude)
      const long = parseInt(location.coords.longitude) 
      this.setState(
        {
          coords:{
            lat,
            long
      }})
      this.mapRef.current.animateToRegion({
        latitude:lat,
        longitude:long,
        latitudeDelta: 1,
        longitudeDelta: 1
      })
  }

  componentDidMount(){
    this.getCurrentLocationAsync()
  }

  render() {
    const {lat,long} = this.state.coords
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
           ref={this.mapRef}
          initialRegion={{
              latitude: lat,
              longitude: long,
              latitudeDelta: 1,
              longitudeDelta: 1
          }}
        >
          <MapView.Marker
              coordinate={{latitude: lat,
              longitude: long}}
              title={"title"}
              description={"description"}
          />
        </MapView>
      </View>    

    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }
});

export default HomeScreen
