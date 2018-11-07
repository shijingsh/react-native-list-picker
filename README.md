# react-native-list-picker

The data Picker for React Native.

| page 1 | page 2 |
| --------|---------|
|![](https://github.com/liukefu2050/react-native-list-picker/blob/master/images/picker1.jpg)|![](https://github.com/liukefu2050/react-native-list-picker/blob/master/images/picker2.jpg)|
## Installation
```bash
$ npm i react-native-list-picker --save
```

## Example

```javascript
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

let dataList =  require('./data/dataList');
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
          isEmojiable = {false}
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

```

## Props

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| onChange | function | \*required | The handler when a country is selected |
| closeable | bool | false | If true, the ListPicker will have a close button |
| isEmojiable | bool | false | If true, use emoji to render icon |
| dataList | array | \*required|  {"letter":"","icon":"","name"：""} |

## dataList 
```javascript
[ {
    "letter": "AFN",
    "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAeCAIAAADRv8uKAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAASAAAAEgARslrPgAABJ1JREFUSMfll19oU1ccx3+/c29yc2PaJG2TGFvTuljRdnViWx9sxSmlutmhFl+GCBvCQPBhyAR92VDwcb74IJTucQo+zVFQJs6/9M/AlqrB2cZqbbLYJrRNanL/5J7z20McbA/rbevci+fhcC/nz+d8fz/u73wvgl2TADjAdwBdAFkA6V+mcQZeAX1b4czXIOWBM5tt7cbfWXv/wPJKFiH+45XofwEjlkgIQKW+dA4EgGWcYHlgBCDGoLwcXC5DVaVsFnWdEUGhUCK/AzAiAnCHg2prcds2i3M5FOIjI8Q5hsNyIgFPn8Bcbum67cFUohJZTqfR1OSKRPjYmJzNOhTF8ngQQLjdptdr7d/v+flXtBKASEtg24MREYisSASiUUmWpVhMGhsDr7fg88HsrDI3Jw8NUUODjgTr15tqDqwcINrqlm2pnEiW5bpjx6RoVL13T9y4oUSjxsxMoLNTFAra1auOmhqIxSo/65LqPwznR0D7nqT/QjEAfHrgwMaqqvzEhDQ6KgBcXV08nY5euKBPT8cNQ6mo0Ht65Hh8QVEb123arnzcP3cbmU3AFysgiEhEq9xuYZovBwbcr14V794FAF8k4nW7zQcP+MOHXr+/LBwGALOvr7wokg9uqMIlk2SbZmmRMcYYEe3etautra19z575vj5aWGCqKlpaPLt3o89HLhdFIrnxcXN0lDwe8vqDRw9rEhQNc6o4xZAtgrdRDAB1dXWesjJ/fb2aTEZ7e9Xm5nw2+/vFi4+am2M7dz6/di2fSnn37l179qw78dK7oaGy6Kv3bADxZvlKwEQEAE6nkwsxfOmS/9AhT03N64mJ4szMms2b15486SwWnY8fc84LyWSwo0Pt7Hx6/ToyWZZkQHirHAOAqqodHR2NO3Zwzqd6e9n4eNqysLnZf+6c9/z5hYWF+bKy4uBg6qerksezoWlre8OOomyCAFy0lkmLg4lIEFWvXp1LJNZUV6dOn0aA6u5uPj2dHRhw1tdLDkcVY8bQUGFk2P/F0ZeTo0kwLicvpymNgCvMcSnU8Xj8ta6n+vsTuZxRVaU0NdUcObK6rc1tmvKLF8HW1tDBg3IwaFQF4pOTqftDf1iZZ1rcNtQ2lZ0xJoTo6u4+1d7u0HVfa6s+OGgND4OiQCCAhoHz80Qkbdni2r597tYtHgp9U3llYPYOk5gAscjONgWkJPq3+/fVEyc2hkLPbt7MFIv67dssHAafD2WZJ5OkaeVtbcqL5x99+VX/1OBwbBAksP2O7e8yCZETfVtb+8nhwxkhVgWDDNGIxRzT00KSnOvWOVta8pmM+TrnT2vXYj1nPs8wEwW+Xa1+I5oxnJyEK1cqjx+v2LdvLJWiTZv8FRUzmYzpcpUFAmGAuV+uix8u4AcZcDAwhK2iJdxOACAEMOaIx3OnTulPngQaG+c1LW9ZKgCWl69SVfPOHe3yjz6LyIFAYimWYMlGQAhCFLqe7ulBRFVRSNclRFCUWcMgImRAACCW6n6W4zKJANHBmExEmgaMEQBpmkzkYAyI3qHnAiLiHAAAEf56IADgfLlGeUX2Fv5maVfkbeF9/JP4E60nG6TGip3CAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDEzLTEwLTA3VDEzOjE0OjQwKzAyOjAwHXwFzwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMy0xMC0wN1QxMzoxNDo0MCswMjowMGwhvXMAAAAASUVORK5CYII=",
    "name": "阿富汗"
  }]
```
## Dependencies
- lodash
- react-native-emoji
- world-countries

## Contribution

* [@xcapentier](mailto:contact@xaviercarpentier.com) The main author. [@liukefu](mailto:liukefu2020@sina.com)
* thanks to [react-native-country-picker](https://github.com/xcarpentier/react-native-country-picker)
## Questions

Feel free to [contact me](mailto:liukefu2020@sina.com) or [create an issue](https://github.com/liukefu2050/react-native-list-picker/issues/new)

> made with ♥
