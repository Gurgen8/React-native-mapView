import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const platfrom = Platform.select({
  ios: {
    os: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  },
  android: {
    os: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  },
});
Geolocation.setRNConfiguration({skipPermissionRequests: true});

const tank = require('./src/assets/images/Tank.png');
const artillery = require('./src/assets/images/Artillery.png');
const soldier = require('./src/assets/images/Soldier.png');
const plane = require('./src/assets/images/Plane.png');
const locationIcon = require('./src/assets/images/location.png');
const App = () => {
  const [selectedItem, setSelecetedItem] = useState(null);

  const demageTypes = [
    {
      id: 1,
      image: tank,
    },
    {
      id: 2,
      image: artillery,
    },
    {
      id: 3,
      image: soldier,
    },
    {
      id: 4,
      image: plane,
    },
  ];
  const [visible, setVisible] = useState(false);
  const [coordinate, setCoordinate] = useState({
    latitude: 50.447109,
    longitude: 30.5343793,
  });
  const [mark, setMark] = useState({
    latitude: 50.447109,
    longitude: 30.5343793,
  });
  const onSetEvent = e => {
    setMark(e.nativeEvent.coordinate);
    setTimeout(() => {
      setVisible(true);
    }, 3000);
  };
  const renderItem = ({item}) => {
    const onSelectType = () => {
      setSelecetedItem(item);
    };
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={onSelectType}
          style={{
            ...styles.selectType,
            borderWidth: item?.id === selectedItem?.id ? 1 : 0,
            backgroundColor:
              item?.id === selectedItem?.id
                ? 'rgba(189, 188, 185,.5)'
                : 'white',
          }}>
          <Image style={styles.image} source={item.image} />
          <Text>{item?.id}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const getMyLocation = async () => {
    try {
      if (Platform.OS === 'ios') {
        Geolocation.getCurrentPosition(position => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setCoordinate(newLocation);
        });
      } else {
        const granted = await request(platfrom.os);
        console.log(granted);
        if (granted === RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(position => {
            console.log('asdas');
            const newLocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setCoordinate(newLocation);
            console.log(newLocation);
          });
        }
      }
    } catch (e) {
      console.log('error', e);
    }
  };
  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        alert('You can use the location');
      } else {
        console.log('location permission denied');
        alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  return (
    <View style={{flex: 1}}>
      <MapView
        onRegionChangeComplete={region => {
          const newLocation = {
            latitude: region.latitude,
            longitude: region.longitude,
          };
          setCoordinate(newLocation);
        }}
        onLongPress={onSetEvent}
        zoomEnabled={true}
        showsUserLocation={true}
        showsMyLocationButton={false}
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        region={{
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: mark?.latitude,
            longitude: mark?.longitude,
          }}
        />
      </MapView>
      <View style={styles.currentLocation}>
        <TouchableOpacity onPress={getMyLocation}>
          <Image source={locationIcon} style={{height: 45, width: 45}} />
        </TouchableOpacity>
      </View>
      <Modal transparent={true} animationType="fade" visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FlatList
              data={demageTypes}
              keyExtarctor={item => item.id}
              renderItem={renderItem}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  image: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectType: {
    height: 70,
    width: 60,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  currentLocation: {
    position: 'absolute',
    bottom: 60,
    right: 25,
    zIndex: 999,
    backgroundColor: 'white',
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 28,
  },
});
