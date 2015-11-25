/// <reference path="../references.ts"/>


describe('Group', () => {

    // load all necessary modules and templates
    beforeEach(module('jsonforms.form'));
    beforeEach(module('jsonforms.renderers.layouts.group'));
    beforeEach(module('jsonforms.renderers.controls.string'));

    beforeEach(module('components/form/form.html'));
    beforeEach(module('components/renderers/layouts/layout.html'));
    beforeEach(module('components/renderers/controls/control.html'));

    var $q, $timeout;

    class MyDataProvider implements JSONForms.IDataProvider {
        data = [
            {
                name: "foo"
            },
            {
                name: "bar"
            },
            {
                name: "baz"
            }
        ];

        constructor(private $q: ng.IQService) {}

        fetchData():angular.IPromise<any> {
            var p = this.$q.defer();
            p.resolve(this.data);
            return p.promise;
        }

        getData():any {
            return this.data;
        }

        getId():JSONForms.ServiceId {
            return JSONForms.ServiceId.DataProvider;
        }

        filter(names: string[]) {
            var p = this.$q.defer();
            var filtered = this.data.filter((obj) => names.indexOf(obj.name) != -1);
            p.resolve(filtered);
            return p.promise;
        }
    }

    beforeEach(inject(function(_$q_, _$timeout_) {
        $q = _$q_;
        $timeout = _$timeout_;
    }));

    it("should resolve properties path on the UI schema", (done) => {
        var provider = new MyDataProvider($q);
        var promise = provider.filter(['baz']);
        promise.then((filtered) => {
            expect(filtered.length).toBe(1);
        }).finally(done);
        $timeout.flush();
    });
});