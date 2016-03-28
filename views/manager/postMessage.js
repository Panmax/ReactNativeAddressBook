/**
 * Created by pan on 16/3/28.
 */
var React = require('react-native');
var Util = require('./../util');
var AV = require('avoscloud-sdk');

var Message = AV.Object.extend('Message');

var {
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    Text,
    TextInput,
    AlertIOS
    } = React;

var PostMessage = React.createClass({
    getInitialState: function () {
        return {
            message: ''
        }
    },

    _onChange: function (val) {
        if (val) {
            this.setState({
                message: val
            })
        }
    },

    _postMessage: function () {
        var that = this;
        var currentUser = AV.User.current();
        var message = new Message();
        message.set('content', this.state.message);
        message.set('user', currentUser);
        message.save().then(function (message) {
            AlertIOS.alert('成功', '添加成功',[
                {
                    text: '确定',
                    onPress: function () {
                        that.props.navigator.pop()
                    }
                }
            ])
        }, function (err) {
            alert('添加失败')
        })
    },

    render: function () {
        return (
            <ScrollView>
                <View>
                    <TextInput
                        style={styles.textinput}
                        placeholder="请输入公告内容"
                        multiline={true}
                        onChangeText={(val) => this._onChange(val)}
                    />
                </View>
                <View style={{marginTop: 20}}>
                    <TouchableOpacity onPress={this._postMessage}>
                        <View style={styles.btn}>
                            <Text>发布公告</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
});

var styles = StyleSheet.create({
    textinput: {
        flex: 1,
        height: 100,
        borderWidth: 1,
        borderColor: '#ddd',
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 8,
        fontSize: 13,
        borderRadius: 4
    },

    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1db8ff',
        height: 38,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 4
    }
});

module.exports = PostMessage;