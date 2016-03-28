/**
 * Created by pan on 16/3/28.
 */
var React = require('react-native');
var Util = require('../util');

var moment = require('moment');

var {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
    } = React;

var Item = React.createClass({
    render: function () {
        return (
            <TouchableOpacity>
                <View style={styles.item}>
                    <View style={styles.width50}>
                        <Text>{this.props.name.substr(0, 1)}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={styles.text} numberOfLines={1}>
                            {this.props.text}
                        </Text>
                        <Text style={styles.date}>
                            {moment(this.props.date).format('YYYY-MM-DD')}
                        </Text>
                    </View>
                    <View style={styles.m10}>
                        <Text style={styles.name}>{this.props.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
});

var styles = StyleSheet.create({
    item: {
        height: 80,
        padding: 5,
        borderBottomWidth: Util.pixel,
        borderBottomColor: '#DDD',
        flexDirection: 'row',
        alignItems: 'center'
    },

    width50: {
        width: 50,
        height: 50,
        borderRadius: 4,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#05C147',
        marginRight: 10
    },

    text: {
        flex: 1,
        marginBottom: 5,
        opacity: 0.7
    },

    date: {
        color: '#ccc',
        fontSize: 11
    },

    m10: {
        marginLeft: 10
    },

    name: {
        color: '#929292',
        fontSize: 13
    }
});

module.exports = Item;