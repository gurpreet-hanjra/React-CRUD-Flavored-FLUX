/**
 * Created by gurpreet2217 on 11/22/2015.
 */

// default user data //
let defaultUser = {
    username: 'Malin',
    id: 'em9tYXRvLXVzZXJzLTE='
};

// common utilities //
let Utils = {

    // compute average rating //
    getAverageRating: function (stars) {
        let sum = 0,
            average;
        for(let i of stars) {
            sum+=Number(i.stars);
        }
        if (sum) {
            average = (sum/stars.length).toFixed(1);
        } else {
            average = 'NA'
        }

        return average;
    },

    // capitalize cuisine //
    capitalize: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    // return default user info //
    getDefaultUser:function () {
        return defaultUser;
    }

};

module.exports = Utils;