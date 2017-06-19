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
    right: 20,
    top: 20,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
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
      }
  }
}

  takePicture = () => {
    this.camera.capture()
      .then((data) => {
        console.log('picture', data);
        this.setState({ path: data.path })
      })
      .catch(err => console.error(err));
  }

  // // ============ Function that handles the front and back camera switch functionality ============= //

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
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        aspect={this.state.camera.aspect}
        captureTarget={Camera.constants.CaptureTarget.disk}
        type={this.state.camera.type}
        flashMode={this.state.camera.flashMode}
        onFocusChanged={() => {}}
        onZoomChanged={() => {}}
        defaultTouchToFocus
        mirrorImage={this.state.mirrorMode}
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
        <Text
          style={styles.cancel}
          onPress={() => this.setState({ path: null })}
        >Cancel
        </Text>
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