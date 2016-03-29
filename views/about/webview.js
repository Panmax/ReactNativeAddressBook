/**
 * Created by pan on 16/3/29.
 */
var React = require('react-native');

var {
    WebView,
    ScrollView,
    Text,
    View
    } = React;

var webview = React.createClass({
    render: function () {
        return (
            <View style={{flex:1, marginBottom: 64}}>
                <WebView source={{uri:this.props.url}} />
            </View>
        )
    }
});

module.exports = webview;