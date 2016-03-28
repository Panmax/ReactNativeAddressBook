/**
 * Created by pan on 16/3/24.
 */
var React = require('react-native');
var Util = require('../util');
var ActionSheetIOS = require('ActionSheetIOS');

var {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    TouchableHighlight,
    Linking,
    AlertIOS
} = React;

var Address = React.createClass({
    showActionSheet: function (tel, email, name) {
        var options = [];
        options.push('拨打电话给：' + name);
        options.push('发送短信给：' + name);
        options.push('发送邮件给：' + name);
        options.push('取消');

        var events = [];
        events.push(function () {
            Linking.openURL('tel://' + tel)
        });

        events.push(function () {
            Linking.openURL('sms://' + tel);
        });

        events.push(function () {
            Linking.openURL('mailto://' + email)
        });

        ActionSheetIOS.showActionSheetWithOptions({
            options: options,
            cancelButtonIndex: options.length - 1
        }, function (index) {
            events[index] && events[index]();
        })
    },

    render: function () {
        var view = [];
        var items = this.props.data;
        var colors = ['#E20079', '#FFD602', '#25BFFE', '#F90000', '#04E246', '#04E246', '#00AFC9'];
        var color = {
            backgroundColor: colors[parseInt(Math.random()*7)]
        };

        for (var i in items){
            view.push(
                <View key={"addressItem"+i} style={styles.row}>
                    <View style={[styles.text, color]}>
                        <Text style={{fontSize: 25, color: '#fff', fontWeight: 'bold'}}>
                            {items[i].get('realname').substr(0, 1) || '未'}
                        </Text>
                    </View>
                    <View style={styles.part}>
                        <Text>
                            {items[i].get('realname')}
                        </Text>
                        <Text style={styles.unColor}>
                            {(items[i].get('partment') || '') + '部-' + (items[i].get('tag') || '') + '人员'}
                        </Text>
                    </View>
                    <View style={{flex: 1}}>
                        <TouchableHighlight
                            underlayColor="#fff"
                            onPress={() => this.showActionSheet(items[i].get('tel'), items[i].get('email'), items[i].get('realname'))}
                        >
                            <Text style={styles.link}>
                                {items[i].get('tel')}
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor="#fff"
                            onPress={() => this.showActionSheet(items[i].get('tel'), items[i].get('email'), items[i].get('realname'))}
                        >
                            <Text style={styles.link}>
                                {items[i].get('email')}
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            );
        }
        return (
            <ScrollView style={{marginBottom: 64}}>
                {view}
            </ScrollView>
        )
    }
});

var styles = StyleSheet.create({
    row: {
        height: 80,
        borderBottomWidth: Util.pixel,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        width: 50,
        height: 50,
        borderRadius: 4,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E30082'
    },
    part: {
        marginLeft: 5,
        flex: 1
    },
    unColor: {
        color: '#575656',
        marginTop: 8,
        fontSize: 12
    },
    link: {
        color: '#1BB7FF',
        marginTop: 2
    }
});

module.exports = Address;