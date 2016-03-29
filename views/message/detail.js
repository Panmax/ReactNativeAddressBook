/**
 * Created by pan on 16/3/28.
 */

var React = require('react-native');
var moment = require('moment');

var {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity
    } = React;

var Detail = React.createClass({
    render: function () {
        var message = this.props.message;
        return (
            <ScrollView>
                <View style={styles.content}>
                    <Text style={{lineHeight:20,}}>{message.get('content')}</Text>
                </View>

                <View style={[styles.luokuan, {marginTop:25}]}>
                    <View style={{flex:1}} />
                    <Text style={styles.text}>{message.get('user').get('realname')}</Text>
                </View>

                <View style={[styles.luokuan]}>
                    <View style={{flex:1}} />
                    <Text style={styles.text}>{moment(message.createdAt).format('YYYY-MM-DD')}</Text>
                </View>
            </ScrollView>
        )
    }
});

var styles = StyleSheet.create({
    content: {
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15,
        opacity: 0.85
    },

    luokuan:{
        flex:1,
        flexDirection:'row',
        marginRight:20,
    },

    text:{
        lineHeight:20,
        width:90,
        color:'#007AFF'
    }
});

module.exports = Detail;