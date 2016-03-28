/**
 * Created by pan on 16/3/25.
 */

var React = require('react-native');
var Util = require('./util');
var ModifyPassword = require('./manager/modifyPassword');
var AddUser  = require('./manager/addUser');
var DeleteUser = require('./manager/deleteUser');
var PostMessage = require('./manager/postMessage');

var {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    AsyncStorage,
    AlertIOS
    } = React;

var Manager = React.createClass({
    _clear: function () {
        var that = this;
        AlertIOS.alert('确定', '确定退出登录?', [
            {
                text: '确定',
                onPress: function () {
                    that.props.navigator.pop();
                    AsyncStorage.clear();
                    that.props.parent.setState({
                        showIndex: {
                            height: 0,
                            opacity: 0
                        },
                        showLogin: {
                            flex: 1,
                            opacity: 1
                        },
                        isLoadingShow: false
                    });
                    AlertIOS.alert('成功','已退出登录');
                }
            },
            {
                text: '取消',
                onPress: () => null
            }
        ]);

    },

    _loadPage: function (component, title) {
        this.props.navigator.push({
            title: title,
            component: component
        })
    },

    render: function () {
        var colors = ['#F4000B', '#17B4FF', '#FFD900', '#F00000'];
        var tags = ['U', 'A', 'D', 'M'];
        var items = ['修改密码', '增加联系人', '删除联系人',  '发布公告'];
        var components = [ModifyPassword, AddUser, DeleteUser, PostMessage];
        var JSXDOM = [];
        for(var i in items) {
            JSXDOM.push(
                <TouchableOpacity key={items[i]} onPress={this._loadPage.bind(this, components[i], items[i])}>
                    <View style={[styles.item, {flexDirection: 'row'}]}>
                        <Text style={[styles.tag, {color: colors[i]}]}>{tags[i]}</Text>
                        <Text style={[styles.font, {flex: 1}]}>{items[i]}</Text>
                    </View>
                </TouchableOpacity>
            );
        }
        return (
            <ScrollView style={styles.container}>
                <View>
                    {JSXDOM}
                </View>
                <View style={{marginTop: 30}}>
                    <TouchableOpacity onPress={() => this._clear()}>
                        <View style={[styles.item, {flexDirection: 'row'}]}>
                            <Text style={[styles.tag, {color: colors[i]}]}>Q</Text>
                            <Text style={[{flex: 1}, styles.font]}>退出登录</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },
    item: {
        height: 40,
        justifyContent: 'center',
        borderTopWidth: Util.pixel,
        borderTopColor: '#ddd',
        backgroundColor:'#fff',
        alignItems: 'center'
    },
    tag: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold'
    },
    font: {
        fontSize: 15,
        marginLeft: 5,
        marginRight: 10
    },
    wrapper: {
        marginTop: 10
    }
});

module.exports = Manager;