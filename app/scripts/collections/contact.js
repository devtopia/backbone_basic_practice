/*global Sample, Backbone*/

Sample.Collections = Sample.Collections || {};

(function () {
  'use strict';

  Sample.Collections.Contact = Backbone.Collection.extend({

    // modelプロパティにどのモデルを管理するかを宣言する。
    // この宣言によって、コレクションが保持するモデルはContactのインスタンスとなる。
    model: Sample.Models.Contact,

    // localStorage
    localStorage: new Backbone.LocalStorage("Sample.Collections.Contact"),

    // initialize()メソッドを定義できる点はBackbone.Modelと同様
    initialize: function() {
      console.log('ContactCollectionが初期化されました。');
    },

  });

})();
