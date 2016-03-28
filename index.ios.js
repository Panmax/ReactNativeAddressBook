/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');
var AdSupportIOS = require('AdSupportIOS');
var Home = require('./views/home');
var Manager = require('./views/manager');
var Util = require('./views/util');

var AV = require('avoscloud-sdk');

AV.initialize('A9ODOTcolGHlDhsY26sYC5ve-gzGzoHsz', 'lkLXt7UPI1NY1Cm5xAVGUwJs');
AV.Promise.setPromisesAPlusCompliant(true);


var {
    AppRegistry,
    View,
    TabBarIOS,
    StyleSheet,
    StatusBarIOS,
    AsyncStorage,
    ScrollView,
    Text,
    Image,
    TextInput,
    TouchableHighlight,
    StyleSheet,
    NavigatorIOS,
    ActivityIndicatorIOS,
    AlertIOS
    } = React;

StatusBarIOS.setStyle('light-content');

var Address = React.createClass({
    statics: {
        title: '主页',
        description: '选项卡'
    },

    getInitialState: function () {
        return {
            selectedTab: 'home',
            showIndex: {
                height: 0,
                opacity: 0
            },
            showLogin: {
                flex: 1,
                opacity: 1
            },
            isLoadingShow: true
        }
    },

    componentDidMount: function () {
        var that = this;
        AsyncStorage.getItem('token', function (err, token) {
            if(!err && token) {
                AV.User.become(token).then(function (user) {
                    that.setState({
                        showLogin: {
                            height: 0,
                            width:0,
                            flex: 0
                        },
                        showIndex: {
                            flex: 1,
                            opacity: 1
                        },
                        isLoadingShow: false
                    })
                }, function (error) {
                    that.setState({
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
                });

            } else {
                that.setState({
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
            }
        });
    },

    _getEmail: function (val) {
        var email = val;
        this.setState({
            email: email
        })
    },

    _getPassword: function (val) {
        var password = val;
        this.setState({
            password: password
        })
    },
    
    _login: function () {
        var email = this.state.email;
        var password = this.state.password;
        if (email == null || email.length == 0) {
            AlertIOS.alert('提示', '请输入邮箱');
            return
        } else if(password == null || password.length == 0) {
            AlertIOS.alert('提示', '请输入密码');
            return
        }
        var that = this;
        //隐藏登录页 & 加载loading
        that.setState({
            showLogin: {
                height:0,
                width:0,
                flex:0
            },
            isLoadingShow: true
        });
        AV.User.logIn(email, password).then(function () {
            var currentUser = AV.User.current();
            AsyncStorage.multiSet([['token', currentUser._sessionToken]], function (err) {
                if (!err) {
                    that.setState({
                        showLogin: {
                            height: 0,
                            width: 0,
                            flex: 0,
                        },
                        showIndex: {
                            flex: 1,
                            opacity: 1
                        },
                        isLoadingShow: false
                    });
                }
            })
        }, function () {
            AlertIOS.alert('登录', '用户名或密码错误');
            that.setState({
                showLogin: {
                    flex: 1,
                    opacity: 1
                },
                showIndex: {
                    height: 0,
                    width: 0,
                    flex: 0
                },
                isLoadingShow: false
            });
        });
    },

    _selectTab: function (tabName) {
        this.setState({
            selectedTab: tabName
        });
    },

    _addNavigator: function (component, title) {
        var data = null;
        if (title === '公告') {
            data = this.state.data;
        }

        return (
            <NavigatorIOS
                style={{flex:1}}
                barTintColor="#007AFF" // 导航条背景色
                titleTextColor="#fff"  // 导航栏上字体的颜色
                tintColor="#fff"       // 导航栏上按钮的颜色
                translucent={false}    // 是否半透明
                initialRoute={{
                    component: component,
                    title: title,
                    passProps: {
                        data: data,
                        parent: this
                    }
                }}
            />
        )
    },

    render: function () {
        return(
            <View style={{flex: 1}}>
                {this.state.isLoadingShow ?
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicatorIOS size="small" color="#268DFF" />
                    </View> : null}
                {!this.state.isLoadingShow ?
                    <View style={this.state.showIndex}>
                        <TabBarIOS barTintColor="#FFF">
                            <TabBarIOS.Item
                                icon={require('image!phone_s')}
                                title="首页"
                                selected={this.state.selectedTab === 'home'}
                                onPress={() => this._selectTab('home')}
                            >
                                {this._addNavigator(Home, '主页')}
                            </TabBarIOS.Item>
                            <TabBarIOS.Item
                                icon={require('image!gonggao')}
                                title="公告"
                                selected={this.state.selectedTab === 'message'}
                            >
                                <Text>b</Text>
                            </TabBarIOS.Item>
                            <TabBarIOS.Item
                                icon={require('image!manager')}
                                title="管理"
                                selected={this.state.selectedTab === 'manager'}
                                onPress={() => this._selectTab('manager')}
                            >
                                {this._addNavigator(Manager, '管理')}
                            </TabBarIOS.Item>
                            <TabBarIOS.Item
                                icon={require('image!about')}
                                title="关于"
                                selected={this.selectedTab === 'about'}
                            >
                                <Text>d</Text>
                            </TabBarIOS.Item>
                        </TabBarIOS>
                    </View> : null
                }

                {!this.state.isLoadingShow ?
                    <ScrollView style={this.state.showLogin}>
                        <View style={styles.container}>
                            <View>
                                <Image style={styles.logo} source={require('image!logo')}/>
                            </View>
                            <View style={styles.inputRow}>
                                <Text>邮箱</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="请输入邮箱"
                                    onChangeText={this._getEmail}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                />
                            </View>
                            <View style={styles.inputRow}>
                                <Text>密码</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="请输入密码"
                                    onChangeText={this._getPassword}
                                    password={true}
                                />
                            </View>

                            <View>
                                <TouchableHighlight style={styles.btn} underlayColor="#fff" onPress={this._login}>
                                    <Text>登录</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </ScrollView> : null
                }
            </View>
        )
    }
});

var styles = StyleSheet.create({
    container: {
        marginTop: 50,
        alignItems: 'center'
    },

    logo: {
        width: 100,
        height: 100,
        resizeMode: Image.resizeMode.contain
    },

    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },

    input: {
        marginLeft: 10,
        width: Util.size.width-100,
        borderWidth: Util.pixel,
        height: 35,
        paddingLeft: 8,
        borderRadius: 5,
        borderColor: '#ccc'
    },

    btn: {
        marginTop: 10,
        width: 80,
        height: 35,
        backgroundColor: '#3BC1FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    }
});

AppRegistry.registerComponent('address_book', () => Address);
