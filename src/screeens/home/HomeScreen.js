import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {styles} from './styles';
import {demageTypes} from './DemageTypes';

const platfrom = Platform.select({
  ios: {
    os: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  },
  android: {
    os: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  },
});
Geolocation.setRNConfiguration({skipPermissionRequests: true});
const locationIcon = require('../../assets/images/location.png');

const HomeScreen = () => {
  const [selectedItem, setSelecetedItem] = useState(null);
  const [visible, setVisible] = useState(false);
  const [coordinate, setCoordinate] = useState({
    latitude: 50.447109,
    longitude: 30.5343793,
  });

  const [mark, setMark] = useState({
    latitude: 44.447109,
    longitude: 40.5343793,
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
          style={[
            styles.selectType,
            item?.id === selectedItem?.id
              ? styles.listItemChangePress
              : styles.listItemPress,
          ]}>
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
          console.log(coordinate);
        });
      } else {
        const granted = await request(platfrom.os);
        console.log(granted);
        if (granted === RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(position => {
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

  return (
    <View style={styles.flex}>
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
        style={styles.flex}
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
          <Image source={locationIcon} style={styles.myLocationIcon} />
        </TouchableOpacity>
      </View>
      <Modal transparent={true} animationType="fade" visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setVisible(!visible)}>
              <AntDesign name="close" color={'red'} size={25} />
            </TouchableOpacity>
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
export default HomeScreen;
