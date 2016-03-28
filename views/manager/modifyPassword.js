/**
 * Created by pan on 16/3/28.
 */
var React = require('react-native');
var Util = require('./../util');
var AV = require('avoscloud-sdk');

var {
    StyleSheet,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Text,
    AlertIOS,
    AsyncStorage
    } = React;

var ModifyUser = React.createClass({
    _getOldPassword: function (val) {
        this.setState({
            oldPassword: val
        })
    },

    _getNewPassword: function (val) {
        this.setState({
            password: val
        })
    },

    _resetPassword: function () {
        var that = this;
        var user = AV.User.current();
        user.updatePassword(this.state.oldPassword, this.state.password).then(function () {
            AlertIOS.alert('成功', '密码修改成功', [
                {
                    text: '确定',
                    onPress: function () {
                        that.props.navigator.pop()
                    }
                }
            ]);

            // 修改密码后重新获取token
            AV.User.logIn(user.getUsername(), that.state.password).then(function () {
                var currentUser = AV.User.current();
                AsyncStorage.setItem('token', currentUser._sessionToken);
            }, function () {
                alert('修改密码后重新登录失败');
            });
        }, function (error) {
            console.log(error);
            AlertIOS.alert('失败', error.message)
        })
    },

    render: function () {
        return (
            <ScrollView>
                <View style={{height: 35, marginTop:30}}>
                    <TextInput
                        style={styles.input}
                        password={true}
                        placeholder="原始密码"
                        onChangeText={(val) => this._getOldPassword(val)}
                    />
                </View>
                <View style={{height: 35, marginTop:5}}>
                    <TextInput
                        style={styles.input}
                        password={true}
                        placeholder="新密码"
                        onChangeText={(val) => this._getNewPassword(val)}
                    />
                </View>
                <View>
                    <TouchableOpacity onPress={this._resetPassword}>
                        <View style={styles.btn}>
                            <Text style={{color: '#FFF'}}>修改密码</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
});

var styles = StyleSheet.create({
    input: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        height: 35,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        paddingLeft: 5,
        fontSize: 13
    },

    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#1DB8FF',
        height: 38,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 4
    }
})

module.exports = ModifyUser;