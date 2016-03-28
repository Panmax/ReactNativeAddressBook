/**
 * Created by pan on 16/3/28.
 */
var React = require('react-native');
var Util = require('./../util');
var AV = require('avoscloud-sdk');

var {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
    AlertIOS,
    AsyncStorage,
    TextInput
} = React;

var DeleteUser = React.createClass({
    getInitialState: function () {
        return {
            email: ''
        }
    },

    _getEmail: function (val) {
        this.setState({
            email: val
        })
    },

    _deleteUser: function () {
        var that = this;
        this.state.email == '' ?
            AlertIOS.alert('提示', '请输入要删除的用户邮箱') :
            AlertIOS.alert('提示','确定删除该用户?', [
                {
                    text: '删除',
                    onPress: function () {
                        AsyncStorage.getItem('token', function (err, data) {
                            if (!err) {
                                AV.User.become(data).then(function (user) {
                                    var query = new AV.Query(AV.User);
                                    query.equalTo('email', that.state.email);
                                    query.first().then(function (user) {
                                        // User只能本人操作或者服务器端操作,所以在云函数编写deleteUser方法
                                        /*
                                             var email = request.params.email;
                                             var query = new AV.Query(AV.User);
                                             query.equalTo('email', email);
                                             query.first().then(function (user) {
                                             user.destroy().then(function () {
                                             response.success('删除成功')
                                             }, function (error) {
                                             response.error('删除失败')
                                             })
                                             }, function (error) {
                                             response.error('查询失败')
                                             });
                                         */
                                        if (!user) {
                                            AlertIOS.alert('提示', '不存在改联系人');
                                            return
                                        }
                                        AV.Cloud.run('deleteUser', {'email': that.state.email}).then(function (result) {
                                            console.log(result);
                                            AlertIOS.alert('成功', '删除成功', [
                                                {
                                                    text: '确定',
                                                    onPress: function () {
                                                        that.props.navigator.pop()
                                                    }
                                                }
                                            ])
                                        }, function (error) {
                                            console.log(error);
                                            AlertIOS.alert('失败', '删除失败')
                                        });
                                    }, function (error) {
                                        AlertIOS.alert('查询失败', error.message)
                                    });
                                }, function (error) {
                                    AlertIOS.alert('提示', '没有权限');
                                });
                            }
                        })
                    }
                },
                {
                    text: '取消',
                    onPress: () => null
                }
            ])
    },

    render: function () {
        return (
            <ScrollView>
                <View style={{height: 35, marginTop: 30}}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(val) => this._getEmail(val)}
                        placeholder="请输入用户邮箱"
                        autoCapitalize={'none'}
                        autoCorrec={false}
                    />
                </View>

                <View>
                    <TouchableOpacity onPress={this._deleteUser}>
                        <View style={styles.btn}>
                            <Text>删除用户</Text>
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
        borderRadius:4
    }
})

module.exports = DeleteUser;