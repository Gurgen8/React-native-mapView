import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
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
  closeBtn: {
    position: 'absolute',
    right: 10,
    top: 8,
    width: 20,
    height: 20,
  },
  flex: {
    flex: 1,
  },
  myLocationIcon: {
    height: 45,
    width: 45,
  },
  listItemPress: {
    borderWidth: 0,
    backgroundColor: 'white',
  },
  listItemChangePress: {
    borderWidth: 1,
    backgroundColor: 'rgba(189, 188, 185,.5)',
  },
});
