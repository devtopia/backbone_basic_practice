/*global Sample, Backbone, JST*/

Sample.Views = Sample.Views || {};

(function () {
  'use strict';

  Sample.Views.Contact = Backbone.View.extend({

    template: JST['app/scripts/templates/contact.ejs'],

    tagName: 'p',

    id: function() {
      return 'contact-' + this.model.get('id');
    },

    className: 'contact',

    attributes: {
      'data-attribute': 'someData',
      'data-other-attribute': 'otherData'
    },

    events: {
      // '.toggle'セレクタで特定できる要素のクリックイベントを監視してtoggleCompleted()メソッドを呼び出す。
      // 内部ではthis.$el.on()が実行されている。
      'click .toggle':'toggleCompleted'
    },

    toggleCompleted: function(e) {
      // jQueryのしくみで動いているので引数eはjQueryのイベントオブジェクトを参照している。
      console.log('チェックボックスがクリックされました。');
      // コールバック関数のthisは現在のビューインスタンスを指す。
      console.log(this instanceof Sample.Views.Contact);
    },

    initialize: function () {
      console.log('Viewが初期化されました。');
      this.listenTo(this.model, 'change', this.render);
    },

    render: function () {
      // テンプレートにモデルのデータを適用する。
      // モデルのtoJSON()メソッドを使って属性をオブジェクトの形式で書き出す。
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });

})();
