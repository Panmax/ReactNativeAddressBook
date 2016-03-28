/**
 * Created by pan on 16/3/28.
 */
var React = require('react-native');
var Util = require('./util');
var AV = require('avoscloud-sdk');
var Item = require('./message/item');
var Detail = require('./message/detail');

var {
    StyleSheet,
    View,
    ScrollView,
    TextInput,
    Image,
    TouchableOpacity,
    Text
    } = React;

var Message = React.createClass({
    render: function () {
        var messages = [];
        var items = [];
        messages = this.props.messages;
        for (var i in messages) {
            items.push(
                <Item
                    key={messages[i].id}
                    nav={this.props.navigator}
                    component={Detail}
                    data={messages[i]}
                    text={messages[i].get('content')}
                    name={messages[i].get('user').get('realname')}
                    date={messages[i].createdAt}
                />
            )
        }

        return (
            <ScrollView style={styles.container}>
                <View style={{height: 50, padding: 7}}>
                    <TextInput
                        style={styles.search}
                        placeholder="搜索"
                    />
                </View>
                <View>
                    {items}
                </View>
            </ScrollView>
        )
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        marginBottom: 64
    },

    search: {
        height: 35,
        borderWidth: Util.pixel,
        borderColor: '#CCC',
        paddingLeft: 10,
        borderRadius: 6,
        backgroundColor: '#fff'
    }
});

module.exports = Message;