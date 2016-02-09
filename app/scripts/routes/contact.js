/*global Sample, Backbone*/

Sample.Routers = Sample.Routers || {};

(function () {
  'use strict';

  Sample.Routers.Contact = Backbone.Router.extend({

    initialize: function() {
      console.log('Routerを初期化されました。');
    },

    // http://example.com/#state1
    // http://example.com/#state2
    routes: {
      'state1': 'state1',
      'state2': 'state2',
      'contacts/:id': 'showContact'
    },

    showContact: function(id) {
      // contacts/123にアクセスすると
      // 123というログが残る
      console.log(id);
    },

    // http://example.com/#state1
    // アクセスした場合に呼び出される
    state1: function() {
      console.log('state1');
    },

    // http://example.com/#state2
    // アクセスした場合に呼び出される
    state2: function() {
      console.log('state2');
    }

  });

})();
