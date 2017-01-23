/**
 * react-native-list-picker
 * @author liukefu
 */

import React, {Component} from 'react';
import {View, Image, TouchableOpacity, Modal, Text, ListView, Platform} from 'react-native';
import _ from 'lodash';

import {getHeightPercent} from './ratio';
import CloseButton from './CloseButton';
import styles from './Picker.style';
import Emoji from 'react-native-emoji';
//var Emoji = require('react-native-emoji').default;
export default class ListPicker extends Component {
    static propTypes = {
        onChange: React.PropTypes.func.isRequired,
        closeable: React.PropTypes.bool,
        isEmojiable: React.PropTypes.bool,
        dataList: React.PropTypes.array.isRequired
    }
    static defaultProps = {
        closeable: true,
        isEmojiable:false,
        dataList:[]
    }

    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            modalVisible: false,
            dataSource: dataSource,
        };

        this.openModal = this.openModal.bind(this);
        this.letters = _
            .range('A'.charCodeAt(0), 'Z'.charCodeAt(0) + 1)
            .map(n => String.fromCharCode(n).substr(0));

        // dimensions of data list and window
        this.itemHeight = getHeightPercent(7);
        this.listHeight = this.props.dataList.length * this.itemHeight;
    }

    onSelect(row) {
        this.setState({
            modalVisible: false,
        });

        this.props.onChange(row);
    }

    setVisibleListHeight(offset) {
        this.visibleListHeight = getHeightPercent(100) - offset;
    }

    openModal() {
        this.setState({modalVisible: true});
    }

    scrollTo(letter) {
        // find position of first data that starts with letter
        let str = this.props.dataList.map((row) => {
            //console.log(row)
            if(row.letter){
                return row.letter.charAt(0);
            }
           return 'A'
        });
        let  index = str.indexOf(letter);
        if (index === -1) {
            return;
        }
        let position = index * this.itemHeight;

        // do not scroll past the end of the list
        if (position + this.visibleListHeight > this.listHeight) {
            position = this.listHeight - this.visibleListHeight;
        }

        // scroll
        this._listView.scrollTo({
            y: position,
        });
    }

    renderRow(row, index) {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => this.onSelect(row)}
                activeOpacity={0.99}
            >
                {this.renderDetail(row)}
            </TouchableOpacity>
        );
    }

    renderLetters(letter, index) {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => this.scrollTo(letter)}
                activeOpacity={0.6}
            >
                <View style={styles.letter}>
                    <Text style={styles.letterText}>{letter}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    renderDetail(row) {
        return (
            <View style={styles.item}>
                {this.renderFlag(row)}
                <View style={styles.itemName}>
                    <Text style={styles.name}>
                        {row.name}
                    </Text>
                </View>
            </View>
        );
    }

     static renderEmoji(row) {
        return (
            <Text style={[styles.emoji]}>
                <Emoji name={row.icon}/>
            </Text>
        );
    }

    static renderImage(row) {
        return (
            <Image
                style={[styles.imgStyle]}
                source={{uri: row.icon}}
            />
        );
    }

    renderFlag(row) {
        return (
            <View style={[styles.itemFlag]}>
                {this.props.isEmojiable ? ListPicker.renderEmoji(row) : ListPicker.renderImage(row)}
            </View>
        );
    }

    render() {
        return (
            <View>
                <Modal
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setState({modalVisible: false})}
                >
                    <View style={styles.modalContainer}>
                        {
                            this.props.closeable &&
                            <CloseButton onPress={() => this.setState({modalVisible: false})}/>
                        }
                        <ListView
                            contentContainerStyle={styles.contentContainer}
                            ref={listView => this._listView = listView}
                            dataSource={this.state.dataSource.cloneWithRows(this.props.dataList)}
                            renderRow={row => this.renderRow(row)}
                            initialListSize={30}
                            pageSize={this.props.dataList.length - 30}
                            onLayout={
                                ({nativeEvent: {layout: {y: offset}}}) => this.setVisibleListHeight(offset)
                            }
                        />
                        <View style={styles.letters}>
                            {this.letters.map((letter, index) => this.renderLetters(letter, index))}
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
