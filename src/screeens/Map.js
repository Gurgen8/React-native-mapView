import React, {useState} from 'react';
import {View, Text, Modal, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
export const Map = () => {
  const [visible, setVisible] = useState(false);
  const [mark, setMark] = useState(null);
  const onSetEvent = e => {
    setMark(e.nativeEvent.coordinate);
    setVisible(true);
  };
  return (
    <View style={{flex: 1, borderWidth: 1}}>
      <MapView
        onLongPress={onSetEvent}
        zoomEnabled={true}
        showsUserLocation={true}
        showsMyLocationButton={true}
        provider={PROVIDER_GOOGLE}
        style={{borderWidth: 1, width: '100%', height: '100%'}}
        initialRegion={{
          latitude: 50.447109,
          longitude: 30.5343793,
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
      <View style={styles.centeredView}>
        <Modal transparent={true} animationType='fade' visible={visible}>
          <View style={styles.modalView}></View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    height: '50%',
  },
  modalView: {
    margin: 20,
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
});
