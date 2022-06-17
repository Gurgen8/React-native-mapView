import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
// import Geocoder from 'react-native-geocoding';
// import {getDistance} from 'geolib';

// const DomParser = require('react-native-html-parser').DOMParser;

const platfrom = Platform.select({
  ios: {
    os: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  },
  android: {
    os: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  },
});

// const validAddress = [
//   'street_number',
//   'sublocality_level_1',
//   'administrative_area_level_1',
// ];

export const getMyLocation = async setCoordinate => {
  try {
    if (Platform.OS === 'ios') {
      Geolocation.getCurrentPosition(position => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        return (setCoordinate = newLocation);
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
          return (setCoordinate = newLocation);
        });
      }
    }
  } catch (e) {
    console.log('error', e);
  }
};

// Geolocation.setRNConfiguration({skipPermissionRequests: true});
// export default class LocationPermission {
//   constructor() {}
//   check = () => {
//     const promise = new Promise((resolve, reject) => {
//       check(platfrom.os)
//         .then(async result => {
//           if (result === RESULTS.GRANTED) {
//             try {
//               const position = await this.getCurrentLocation();
//               return resolve({status: result, position});
//             } catch (error) {
//               return reject(error);
//             }
//           }
//           if (result !== RESULTS.GRANTED) {
//             if (result === RESULTS.BLOCKED) {
//               return reject(result);
//             }
//             this.requestLocationPermission(resolve, reject);
//           }
//         })
//         .catch(() => {
//           // …
//         });
//     });
//     return promise;
//   };
//   requestLocationPermission = async (resolve, reject) => {
//     try {
//       const result = await request(platfrom.os);
//       if (result === RESULTS.GRANTED) {
//         try {
//           const position = await this.getCurrentLocation();
//           return resolve({status: result, position});
//         } catch (error) {
//           return reject(error);
//         }
//       } else {
//         return reject(result);
//       }
//     } catch (error) {
//       return reject(error);
//     }
//   };

//   getCurrentLocation = () => {
//     const positionPromise = new Promise((resolve, reject) => {
//       Geolocation.getCurrentPosition(
//         position => {
//           return resolve(position);
//         },

//         error => {
//           return (
//             console.error(4156, error),
//             reject(error),
//             {enableHighAccuracy: false, timeout: 20000, maximumAge: 360000}
//           );
//         },
//       );
//     });
//     return positionPromise;
//   };

//   parser = details => {
//     let doc = new DomParser().parseFromString(details.adr_address, 'text/html');
//     const city = doc.getElementsByClassName('locality', false)[0]
//       ? doc.getElementsByClassName('locality', false)[0].firstChild.data
//       : null;
//     const country = doc.getElementsByClassName('country-name', false)[0]
//       ? doc.getElementsByClassName('country-name', false)[0].firstChild.data
//       : null;
//     const state = doc.getElementsByClassName('region', false)[0]
//       ? doc.getElementsByClassName('region', false)[0].firstChild.data
//       : null;
//     const {location} = details.geometry;
//     return {
//       country: country,
//       city: city,
//       state: state,
//       description: details.formatted_address,
//       geometry: {
//         location: {
//           lat: location.lat,
//           lng: location.lng,
//         },
//       },
//     };
//   };

//   makeAddresName = () => {
//     let result = '';
//     let prevType = '';
//     return (e, type) => {
//       if (e === 'Unnamed Road') {
//         return result;
//       }
//       if (
//         type === 'street_number' ||
//         type === 'route' ||
//         type === 'locality' ||
//         type === 'country'
//       ) {
//         if (!result) {
//           result = e;
//         } else {
//           result = `${result}${prevType === 'street_number' ? '' : ','} ${e}`;
//         }

//         prevType = type;
//       }
//       return result;
//     };
//   };

//   validateAddress = address_components => {
//     let valid = 0;
//     address_components.forEach(address => {
//       if (validAddress.includes(address.types[0])) {
//         valid += 1;
//       }
//     });
//     return valid === 3;
//   };

//   getAddressFromAutoComplite = address_components => {
//     var address = '';
//     const name = this.makeAddresName();
//     address_components.map(item => {
//       address = name(item.long_name || '', item.types[0]);
//     });
//     return address;
//   };

//   getAddressByCoord = async geolocation => {
//     return Geocoder.from(geolocation.latitude, geolocation.longitude).then(
//       json => {
//         var location = '';
//         const name = this.makeAddresName();
//         json.results[0].address_components.map(item => {
//           location = name(item.long_name || '', item.types[0]);
//         });
//         return location;
//       },
//     );
//   };

//   getDistance = (start, end, accuracy = 1) => {
//     const result = getDistance(start, end, accuracy) / 1000;
//     return Math.round((result + Number.EPSILON) * 10) / 10;
//   };
// }
