/**
 * Created by pan on 16/3/29.
 */
var React = require('react-native');
var webview = require('./about/webview');

var {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity
    } = React;

var About = React.createClass({
    _openWebView: function (url) {
        this.props.navigator.push({
            component: webview,
            passProps: {
                url: url
            }
        })
    },

    render: function () {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.wrapper}>
                    <Image style={styles.avatar} source={require('image!me')} />
                    <Text style={{fontSize: 14, marginTop: 10, color: '#ABABAB'}}>Author: Panmax</Text>
                    <Text style={{fontSize: 14, marginTop: 20, color: '#ABABAB'}}>Version: v0.0.1</Text>

                    <View>
                        <TouchableOpacity onPress={() => this._openWebView('https://github.com/Panmax/ReactNativeAddressBook')}>
                            <Image style={styles.img} source={require('image!github')} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this._openWebView('http://weibo.com/q967168')}>
                            <Image style={[styles.img, {width: 25, height:25}]} source={require('image!weibo')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1
    },

    wrapper: {
        alignItems: 'center',
        marginTop: 50
    },

    img: {
        width: 20,
        height: 20,
        marginRight: 5
    },

    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45
    }
});


module.exports = About;