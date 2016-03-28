/**
 * Created by pan on 16/3/22.
 */
var React = require('react-native');
var Util = require('../util');
var Address = require('./address');
var AV = require('avoscloud-sdk');


var {
    StyleSheet,
    View,
    Text,
    TouchableHighlight
    } = React;

var ItemBlock = React.createClass({
    _loadPage: function (e) {
        var that = this;
        var nav = this.props.nav;
        var partment = this.props.partment;

        var query = new AV.Query('_User');
        query.equalTo('partment', partment);
        query.find().then(function (results) {
            console.log(results)
            nav.push({
                title: that.props.title,
                component: Address,
                passProps: {
                    data: results
                }
            });
        }, function (error) {
            alert(error.message)
        })
    },

    render: function () {
        var size = {
            height: parseInt(this.props.width),
            width: parseInt(this.props.width),
            backgroundColor: this.props.color
        };

        return (
            <TouchableHighlight underlayColor="#fff" onPress={this._loadPage}>
                <View style={[styles.itemBlock, size]}>
                    <View>
                        <Text style={styles.font18}>{this.props.title}</Text>
                    </View>
                    <View>
                        <Text style={styles.font10}>{this.props.partment}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
});

var styles = StyleSheet.create({
    itemBlock: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginLeft: 10
    },
    font18: {
        color: "#fff",
        fontSize: 18,
        fontWeight: '500'
    },
    font10: {
        color: "#fff",
        fontSize: 10
    }
});

module.exports = ItemBlock;