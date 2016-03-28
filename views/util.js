/**
 * Created by pan on 16/3/21.
 */
var React = require('react-native');
var Dimensions = require('Dimensions');

var {
    PixelRatio
    } = React;

var Util = {
    pixel: 1 / PixelRatio.get(),

    size: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },

    post: function (url, data, callback) {
        var fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch(url, fetchOptions)
        .then((response) => response.text())
        .then((responseText) => {
            callback(JSON.parse(responseText));
        });

    },

    key: 'aaaaaa'
};

module.exports = Util;

