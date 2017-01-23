import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  PixelRatio,
  TouchableOpacity,
  Platform
} from 'react-native';
import ListPicker from 'react-native-list-picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    marginBottom: 25,
  },
  instructions: {
    fontSize: 20,
    textAlign: 'center',
    color: '#888',
    marginBottom: 7
  },
  link: {
    fontSize: 14,
    textAlign: 'center',
    color: '#888',
    textDecorationLine: 'underline'
  },
  data: {
    padding: 15,
    marginTop: 10,
    backgroundColor: '#ddd',
    borderColor: '#888',
    borderWidth: 1 / PixelRatio.get(),
    color: '#777'
  }
});

//let dataList =  require('./data/dataList');
let dataList =  require('./data/dataList_emoji');
export default class Example extends Component {
  constructor(props){
    StatusBar.setHidden(true);
    super(props);
      this.state = {
        pickData:null
      }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Picker!
        </Text>
        <ListPicker
          ref={(picker) => { this.picker = picker; }}
          onChange={(value)=> this.setState({pickData: value})}
          closeable = {true}
          isEmojiable = {true}
          dataList={dataList}
        />
        <TouchableOpacity onPress={()=> this.picker.openModal()}>
          <Text style={styles.link}>
             click here
          </Text>
        </TouchableOpacity>
        {this.state.pickData &&
          <Text style={styles.data}>
            {JSON.stringify(this.state.pickData, null, 2)}
          </Text>
        }
      </View>
    );
  }
}
