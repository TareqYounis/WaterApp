import React,{Component} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Navigation } from 'react-native-navigation';
import MapView, { Marker, location } from 'react-native-maps';
import { fonts } from './../../assets/Theme';
import * as data from './../../assets/lang.json';

let id= 0;

class locationPicker extends Component{
    constructor(props){
        super(props);
        this.state={
            focusedRegion: {},
            markers:[],
            location: 0,
            locationAddress: ""
        }
    }
    
    componentDidMount(){
        // get user location to view it on map
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    focusedRegion:{
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.05,
                    }
                })
                url='https://maps.googleapis.com/maps/api/geocode/json?address='+ position.coords.latitude + ',' +position.coords.longitude + '&key=' +  'AIzaSyDK-HblVgw1s1LjtrL2MDI6K1nIdsLLqKo'
                fetch(url)
                .then((response) => response.json())
                .then((responseJson) => {
                    if(responseJson.results[0]['formatted_address']){
                        this.setState({
                            locationAddress: responseJson.results[0]['formatted_address']
                        })
                    }else{
                        this.setState({
                            locationAddress: "Jordan"
                        })
                    }
                });
                this.rednerMap();
            },
            // in case couldn't load user location, view another location on map
            (error) => {
                this.setState({
                    focusedRegion: {
                        latitude: 30.5852,
                        longitude: 36.2384,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.05,
                    }
                })
                this.rednerMap();
            }
        );
    }
   
    onMapPress = (e) => {
        this.setState({
          markers: [
            ...this.state.markers,
            {
              coordinate: e.nativeEvent.coordinate,
              key: id++,
              color: 'red',
            },
          ],
          location: e.nativeEvent.coordinate.longitude + '&&' + e.nativeEvent.coordinate.latitude
        });
    }
    
    rednerMap = () => {
        return (
            <MapView
                style={styles.map}
                initialRegion={this.state.focusedRegion}
                onPress={(e) => this.onMapPress(e)}
                >
                {this.state.markers.map(marker => (
                    <Marker
                    draggable
                    key={marker.key}
                    coordinate={marker.coordinate}
                    pinColor={marker.color}
                />
                ))}
            </MapView>
        )
    }

    sendLocation = () => {
        // if user didnt manually pick a marker on map, send his location, otherwise send his map marker
        if(this.state.location === 0){
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.setState({
                        location: position.coords.latitude+ '&&' + position.coords.longitude 
                    })
                    const location=this.state;
                    this.props.results(function(){
                        return location
                    })
                    Navigation.pop(this.props.componentId);
                },
                (error) => console.log(JSON.stringify(error)),
            );
        }else{
            const location = this.state;
            this.props.results(function(){
                return location;
            }) 
            Navigation.pop(this.props.componentId);
        }
         
    }

    render(){
        return (
            <View style={{flex: 1}}>
                { this.state.focusedRegion.latitude && (
                    this.rednerMap()
                )}
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.sendBox}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.text}>{data[this.props.lang]['shareLocation']}</Text>
                        <Image source={require('./../../assets/images/add_location.png')} />
                    </View>
                    <TouchableOpacity onPress={()=> this.sendLocation()}>
                        <Image source={require('./../../assets/images/green_button.png')} />
                        <Text style={[styles.buttonText]}>{data[this.props.lang]['send']}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    map:{
        width: "100%",
        height: 250
    },
    sendBox:{
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 240,
        height: 120,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black',
    },
    buttonText:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', 
        fontSize: 20,
        fontFamily: fonts.TunisiaLt,
        alignSelf: 'center',
        color: 'white'
    },
    text:{
        paddingRight: 10,
        fontSize: 20,
        fontFamily:fonts.bold
    }
})

export default locationPicker;