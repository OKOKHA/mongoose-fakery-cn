/**
 * Created by waitfish on 15/6/29.
 */
var expect = require('chai').expect
    , providers = require('../lib/data_providers')
    , fakeryData = require('../lib/data');

describe('#data_provider_cn Test', function () {
    it('不传入性别，生成随机中文名', function () {
        var name = providers.name_cn()
        console.log(name)
    })
    it('name_cn()', function () {
        expect(typeof(providers.name_cn())).equal('string')
        expect(typeof(providers.name_cn('f'))).equal('string')
        expect(typeof(providers.name_cn('m'))).equal('string')

    });

    it('address_cn()', function () {
        expect(typeof(providers.address_cn('杭州'))).equal('string')
        expect(typeof(providers.address_cn())).equal('string')
    })
})