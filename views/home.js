/**
 * Created by pan on 16/3/22.
 */
var React = require('react-native');
var Util = require('./util');
var ItemBlock = require('./home/itemblock');

var {
    View,
    Text,
    ScrollView,
    StyleSheet
} = React;

var Home = React.createClass({
    getInitialState: function () {
        var width = Math.floor(((Util.size.width - 20) - 50) / 4);
        var items = [
            {
                id:1,
                title: '研发',
                partment: '框架研发',
                color: '#126AFF'
            },
            {
                id:2,
                title: '研发',
                partment: 'BU研发',
                color: '#FFD600',
            },
            {
                id:3,
                title: '产品',
                partment: '公共产品',
                color: '#F80728',
            },
            {
                id:4,
                title: '产品',
                partment: 'BU产品',
                color: '#05C147',
            },
            {
                id:5,
                title: '产品',
                partment: '启明星',
                color: '#FF4EB9',
            },
            {
                id:6,
                title: '项目',
                partment: '项目管理',
                color: '#EE810D',
            }
        ];

        return {
            items: items,
            width: width
        }
    },

    render: function () {
        var Item1 = [];
        var Item2 = [];
        var items = this.state.items;

        for(var i = 0; i < 4; i++) {
            Item1.push(
                <ItemBlock
                    key={items[i].id}
                    title={items[i].title}
                    partment={items[i].partment}
                    width={this.state.width}
                    color={items[i].color}
                    nav={this.props.navigator}
                />
            )
        }

        for(var i = 4; i < items.length; i++) {
            Item2.push(
                <ItemBlock
                    key={items[i].id}
                    title={items[i].title}
                    partment={items[i].partment}
                    width={this.state.width}
                    color={items[i].color}
                    nav={this.props.navigator}
                />
            )
        }

        return (
            <ScrollView style={styles.container}>
                <View style={styles.itemRow}>
                    {Item1}
                </View>
                <View style={styles.itemRow}>
                    {Item2}
                </View>
            </ScrollView>
        )
    }
});

var styles = StyleSheet.create({
    container: {
        flex:1,
        padding:10
    },
    itemRow: {
        flexDirection: 'row',
        marginBottom: 20
    }
})

module.exports = Home;