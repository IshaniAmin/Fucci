'use strict'
import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Text,
  AppRegistry,
} from 'react-native';

import Video from 'react-native-video';

import Camera from 'react-native-camera';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 15,
  },
  cancel: {
    position: 'absolute',
    left: 15,
    top: 30,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 25,
  },
  saveImage: {
    position: 'absolute',
    left: 20,
    bottom: 30,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 25,
  },
  postImage: {
    position: 'absolute',
    left: 80,
    bottom: 30,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 25,
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeButton: {
    padding: 20,
  },
  flashButton: {
    padding: 20,
  },
  buttonsSpace: {
    width: 10,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

});

export default class CameraSnap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    path: null,
    camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.disk,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
        mirrorMode: false,
        captureQuality: Camera.constants.CaptureQuality.high,
      }
    }
  }

  takePicture = () => {
    this.refs.cam.capture()
      .then((data) => {
        console.log('picture', data);
        this.setState({ path: data.path })
      })
      .catch(err => {
        console.error('photo', err)
    });
  }

// ========= POST REQUEST TO FIREBASE FOR IMAGES =========== //
  postImage = () => {

    // this.state.path = data.path
    var imageUrl = this.state.path
    console.log('image', imageUrl)
    // This is what it looks like when we console.log  --- > 'image', '/var/mobile/Containers/Data/Application/A4CD902C-F3AC-4802-B6EB-D7D842CBF835/Documents/8F593AE0-7A9C-4D56-9CA3-7618794314EC.jpg'

    // I'm not sure if we need to add additional keys to the object for the image because I'm thinking we can simply add the imageUrl as such.. but here's an example I found for posting an image to postman so maybe it's similar..
       // ex. Object - > {uri: imageUrl, name: 'image.jpg', type:'image/jpg'}


    // ====== Post request into Firebase ======== //











    // At the end of this function we can route back to the camera or we can direct the user to the route allowing them to view stories .. TBD 



  }

  onPressIn() {
    const recordVideo = setTimeout(this.startRecording.bind(this), 1000);
  }

  startRecording = () => {

      this.refs.cam.capture({
        mode: Camera.constants.CaptureMode.video,
        totalSeconds: 10,
      })
      .then((data) => {
        console.log('recording', data)
      })
      .catch(err => {
        console.log('recording', err)
    });
  }

  stopVideo = () => {
    this.refs.cam.stopCapture()
      .then((data) => {
        console.log('video', data);
    this.setState({ path: data.path })
      })
      .catch(err => {
        console.error('video', err)
    });
  }

  // // ============ handles the front and back camera switch functionality ============= //

  switchType = () => {
    let newType;
    let mirror;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type == back) {
      newType = front;
      mirror = true;
    } else if (this.state.camera.type == front) {
      newType = back;
      mirror = false;
    }

    this.setState({
      camera: {
        type: newType,
        mirrorMode: mirror,
        flashMode: this.state.camera.flashMode,
      },
    });
  }

  // // ================== Handles front/back ============== //
  get typeIcon() {
    let icon;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      icon = require('./../assets/ic_camera_rear_white@3x.png');
    } else if (this.state.camera.type === front) {
      icon = require('./../assets/ic_camera_front_white@3x.png');
    }
    console.log(icon);
    return icon;
  }

  // // =================  Handles Flash (On, off, and auto)  ==================== //
  switchFlash = () => {
    let newFlashMode;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }

    this.setState({
      camera: {
        flashMode: newFlashMode,
        type: this.state.camera.type,
        mirrorMode: this.state.camera.mirrorMode,
      },
    });
  }


// // Function that handles the image source for the flash icon
  get flashIcon() {
    let icon;
    const { auto, on, off } = Camera.constants.FlashMode;
    if (this.state.camera.flashMode === auto) {
      icon = require('./../assets/ic_flash_auto_white@3x.png');
    } else if (this.state.camera.flashMode === on) {
      icon = require('./../assets/ic_flash_on_white@3x.png');
    } else if (this.state.camera.flashMode === off) {
      icon = require('./../assets/ic_flash_off_white@3x.png');
    }
    console.log(icon)
    return icon;
  }

  renderCamera() {
    return (
    <View style={styles.container}>
 
      <Camera
        ref="cam"
        style={styles.preview}
        aspect={this.state.camera.aspect}
        captureTarget={Camera.constants.CaptureTarget.disk}
        type={this.state.camera.type}
        flashMode={this.state.camera.flashMode}
        onFocusChanged={() => {}}
        onZoomChanged={() => {}}
        defaultTouchToFocus
        captureAudio={true}
        keepAwake={true}
      >
      </Camera>

    {/* Header section of the camera*/}
      <View style={[styles.overlay, styles.topOverlay]}>    

       {/* Switch button for front and back camera */}
       <TouchableOpacity
            style={styles.typeButton}
            onPress={this.switchType}>
            <Image
              source={this.typeIcon}
            />
      </TouchableOpacity>

        {/* Flash Button */}
          <TouchableOpacity
            style={styles.flashButton}
            onPress={this.switchFlash}>
            <Image
              source={this.flashIcon}
            />
          </TouchableOpacity>
        </View>

      {/* Footer section of the Camera */}
        <View style={[styles.overlay, styles.bottomOverlay]}>

        {/* Camera Button */}
          <TouchableHighlight
            style={styles.capture}
            onPress={this.takePicture.bind(this)}
                    underlayColor="rgba(255, 255, 255, 0.5)"
          >
            <View/>
          </TouchableHighlight>

        </View>

      </View>
    );
  }

  renderImage() {
    return (
      <View>
        <Image
          source={{ uri: this.state.path }}
          style={styles.preview}
        />

      {/* Header Section */}
        <View style={[styles.overlay, styles.topOverlay]}>
          <Text
            style={styles.cancel}
            onPress={() => this.setState({ path: null })}
          >X
          </Text>
        </View>

      {/* Footer section */}
        <View style={[styles.overlay, styles.bottomOverlay]}>
          <Text
            style={styles.saveImage}
            onPress={() => this.setState({ camera: {
              captureTarget: Camera.constants.CaptureTarget.cameraRoll
            }}
          )}
          >SAVE
          </Text>
          <Text
            style={styles.postImage}
            onPress={this.postImage.bind(this)}
          >STORY
          </Text>
        </View>

      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.path ? this.renderImage() : this.renderCamera()}
      </View>
    );
  }
};


AppRegistry.registerComponent('CameraSnap', () => CameraSnap);