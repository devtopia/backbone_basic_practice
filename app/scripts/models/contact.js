/*global Sample, Backbone*/

Sample.Models = Sample.Models || {};

(function () {
  'use strict';

  Sample.Models.Contact = Backbone.Model.extend({

    url: '',

    initialize: function() {
      // console.log('Contactが初期化されました。');

      // this.on('change', function() {
      //   console.log('属性が変更されました。');
      // });
      // this.on('change:email', function() {
      //   console.log('email属性が変更されました。');
      // });
      
      // ex07 - start
      // selectイベントの発生を監視する
      this.on('select', function(selected) {
        console.log('selectイベントが発生しました。');
      });
      // ex07 - end

      // ex09 - start
      // 検証中に発生したエラーを監視する
      this.on('invalid', function(model, err) {
        // invalidイベントに紐付くコールバック関数はvalidate()メソッドが返すエラーメッセージを受け取ることができる
        // あるいはモデルのvalidationErrorプロパティを参照してもよい
        console.log(err);
      });
      // ex09 - end
    },

    select: function() {
      // 選択中フラグを立てる。連絡先データではないので属性ではなく単なるプロパティとして扱う
      this.selected = true;

      // 独自イベントのselectを発生させる
      // trigger()メソッドの第２引数以降の指定はコールバック関数が受け取れるパラメータとなる
      this.trigger('select', this.selected);
    },

    defaults: {
      firstname: '',
      lastname: '',
      email: '',
    },

    // ex08 - start
    // 独自処理の実装
    fullname: function() {
      return this.get('firstname') + ' ' + this.get('lastname');
    },
    // ex08 - end

    // ex09 - start
    validate: function(attrs, options) {
      if(!attrs.firstname || !attrs.lastname) {
        return 'firstname属性とlastname属性の両方が必須です。';
      }
    },
    // ex09 - end

    parse: function(response, options)  {
      return response;
    }
  });

})();
