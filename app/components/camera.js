'use strict'
import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  AppRegistry,
  Text,
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
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
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

    this.camera = null;

    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fit,
        captureTarget: Camera.constants.CaptureTarget.disk,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
        mirrorMode: false,
      },
      // isRecording: false
    };
  }

  // takePicture = () => {
  //   if (this.camera) {
  //     this.camera.capture()
  //       .then((data) => console.log("Picture", data))
  //       .catch(err => console.error("Error", err));
  //   }
  // }

  takePicture = () => {
        this.refs.cam.capture({
        mode: Camera.constants.CaptureMode.still,
        path: 'disk',
      })
      .then((data) => {
        console.log('picture', data)
      })
      .catch(err => console.error('error', err));

    }

  onPressIn() {
    const recordVideo = setTimeout(this.startRecording.bind(this), 100);
  }

  startRecording = () => {

      this.refs.cam.capture({
        mode: Camera.constants.CaptureMode.video,
        totalSeconds: 10,
        path: 'disk'
      })
      .then((data) => {
        console.log('video', data.path)

      })
      .catch(err => console.error('error', err));
      // this.setState({
      //   isRecording: true
      // });

  }

  // stopRecording = () => {
  //   if (this.camera) {
  //     this.camera.stopCapture();
  //     this.setState({
  //       isRecording: false
  //     });
  //   }
  // }

  stopVideo = () => {

      this.refs.cam.stopCapture();
      // this.setState({
      //   isRecording: false
      // });
  }

// ============ Function that handles the front and back camera switch functionality ============= //

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

// ================== Handles front/back ============== //
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

// =================  Handles Flash (On, off, and auto)  ==================== //
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


// Function that handles the image source for the flash icon
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



// ================ POST REQUEST TO FIREBASE =================== //

    // storePicture(){

    //       if (PicturePath) {
    //         // Create the form data object
    //         var data = new FormData();
    //         data.append('picture', {uri: PicturePath, name: 'selfie.jpg', type: 'image/jpg'});

    //         // Create the config object for the POST
    //         // You typically have an OAuth2 token that you use for authentication
    //         const config = {
    //          method: 'POST',
    //          headers: {
    //            'Accept': 'application/json',
    //            'Content-Type': 'multipart/form-data;',
    //            'Authorization': 'Bearer ' + 'SECRET_OAUTH2_TOKEN_IF_AUTH',
    //          },
    //          body: data,
    //         }

    //         fetch("https://postman-echo.com/post", config)
    //          .then((responseData) => {
    //              // Log the response form the server
    //              // Here we get what we sent to Postman back
    //              console.log(responseData);
    //          })
    //          .catch(err => {
    //            console.log(err);
    //          })
    //     }
    //   }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          animated
          hidden
        />
        <Camera
          ref="cam"
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          defaultTouchToFocus
          mirrorImage={this.state.mirrorMode}
          captureAudio={true}
          keepAwake={true}
        />

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


        <View style={[styles.overlay, styles.bottomOverlay]}>
          {
            !this.state.isRecording
            &&
            <TouchableOpacity
                style={styles.captureButton}
                onPress={this.takePicture}>
              <Image
                  source={require('./../assets/ic_photo_camera_36pt.png')}
              />
            </TouchableOpacity>
            ||
            null
          }
          <View style={styles.buttonsSpace} />
          {
             
              <TouchableOpacity
                  style={styles.captureButton}
                  onPressIn={this.onPressIn.bind(this)}
                  onPressOut={this.stopVideo.bind(this)}
              >
                <Image
                    source={require('./../assets/ic_videocam_36pt.png')}
                />
              </TouchableOpacity>
              ||
              {/*
              <TouchableOpacity
                  style={styles.captureButton}
                  onPress={this.stopRecording}
              >
                <Image
                    source={require('./../assets/ic_stop_36pt.png')}
                />
              </TouchableOpacity>
           */}
          }
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('CameraSnap', () => CameraSnap);