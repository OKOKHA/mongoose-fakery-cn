/*======================================================
 =            MONGOOSE FAKERY DATA PROVIDERS            =
 ======================================================*/

var data = require('./data')
    , providers = {};

/**
 * Helpers
 * -------
 */

var allChars = data.alpha.alphanum + data.alpha.others
    , allNames = data.names.male.concat(data.names.female)
    , allNames_cn = data.names_cn.male.concat(data.names_cn.female);

var rndint = function (min, max) {
    return Math.floor(min + Math.random() * (max - min));
};

var rndstr = function (pool, size) {
    var i = size
        , poolSize = pool.length
        , str = '';
    while (i > 0) {
        str += pool[rndint(0, poolSize - 1)];
        i--;
    }
    return str;
};

var genRandomString = function (alphabet, min, max) {
    var size;
    if (min == null && max == null) {
        size = rndint(0, 100);
    } else if (min != null && max == null) {
        size = min;
    } else if (min != null && max != null) {
        size = rndint(min, max);
    }
    return size == null ? '' : rndstr(alphabet, size);
};

/**
 * Predifined provider definitions
 * -------------------------------
 */

providers.str = function (min, max) {
    return genRandomString(allChars, min, max);
};

providers.hex = function (min, max) {
    return genRandomString(data.alpha.hex, min, max);
};

providers.alphanum = function (min, max) {
    return genRandomString(data.alpha.alphanum, min, max);
};

providers.pick = function (choices) {
    if (choices != null && choices.length > 0) {
        return choices[rndint(0, choices.length - 1)];
    }
};

providers.name = function (gender) {
    var names;
    if (gender == 'f') {
        names = data.names.female;
    } else if (gender == 'm') {
        names = data.names.male;
    } else {
        names = allNames;
    }
    return names[rndint(0, names.length - 1)];
};

providers.surname = function () {
    return data.surnames[rndint(0, data.surnames.length - 1)];
};

providers.fullname = function (gender) {
    return providers.name(gender) + ' ' + providers.surname();
};

providers.gender = function (size) {
    if (size == 'short' || size == null) return Math.random() > 0.5 ? 'm' : 'f';
    if (size == 'long') return Math.random() > 0.5 ? 'male' : 'female';
};

providers.rnd = function () {
    return Math.random();
};

providers.rndint = function (min, max) {
    if (min != null && max != null) return rndint(min, max);
    return rndint(0, 100);
};

providers.rndbool = function () {
    return Math.random() > 0.5;
};

providers.lorem = function (size) {
    var len = data.lorem.length
        , lorems = []
        , i;
    if (size == null) size = 1;
    for (i = 0; i < size; i++) {
        lorems.push(data.lorem[i % len]);
    }
    return lorems;
};
/*************************
 * 新增的中文方法
 ************************/

/**
 * 随机生成中文名
 * @param gender
 * @returns {*}
 */
providers.name_cn = function (gender) {
    var names;
    if (gender == 'f') {
        names = data.names_cn.female;
    } else if (gender == 'm') {
        names = data.names_cn.male;
    } else {
        names = allNames_cn;
    }
    return data.surnames_cn[rndint(0, data.surnames_cn.length - 1)] + names[rndint(0, names.length - 1)];
};


/**
 *生成随机的中文地址
 * @param city 传入城市名，则随机生成该城市下地名
 * @returns {*}
 */
providers.address_cn = function (city) {
    if (city) {
        return city + data.address_cn[rndint(0, data.address_cn.length - 1)]
    } else {
        return "北京市" + data.address_cn[rndint(0, data.address_cn.length - 1)]
    }

}

providers.identityNum = function () {
    var num = '';
    for (var i = 0; i < 17; i++) {
        var c = this.rndint(0, 9).toString()
        num = c + num;
        //console.log(c)
    }
    return num
}
module.exports = providers;
