/*global Sample, $*/


window.Sample = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function () {
    'use strict';
    console.log('Hello from Backbone!');

    // モデルの初期化
    var contact = new Sample.Models.Contact({
      firstname: '太郎',
      lastname: '山田',
      email: 'yamada@example.com'
    });
    return contact;
  },
  ex01: function(contact) {
    console.log(JSON.stringify(contact, null, 2));
  },
  ex02: function(contact) {
    'use strict';
    // 属性値の設定
    // firstname属性に'一郎'を設定する。
    contact.set('firstname', '一郎');
    console.log(JSON.stringify(contact, null, 2));

    // オブジェクトで複数の属性を設定する。
    contact.set({
      firstname: '二郎',
      lastname: '高橋'
    });
    console.log(JSON.stringify(contact, null, 2));
  },
  ex03: function(contact) {
    'use strict';
    // 属性値の取得
    // firstnameを取得
    console.log(contact.get('firstname'));
    // lastnameを取得
    console.log(contact.get('lastname'));
  },
  ex04: function(contact) {
    'use strict';
    // 属性値の有無の確認
    console.log(contact.has('firstname'));
    // => true
    console.log(contact.has('address'));
    // => false
  },
  ex05: function(contact) {
    'use strict';
    // changeイベントですべての属性の変化を監視する。
    contact.on('change', function(contact) {
      console.log('属性が変更されました。');
    });

    // change:属性名と記述することで
    // 特定の属性値の変化に絞って監視できる。
    contact.on('change:email', function(contact) {
      console.log('email属性が変更されました。');
    });

    // firstnameを変更する。
    // changeイベントが発生して、changeのコールバック関数が実行される。
    contact.set('firstname', '二郎');
    console.log(JSON.stringify(contact, null, 2));

    // emailを変更する。
    // changeイベントが発生して、change:emailとchangeのコールバック関数が実行される。
    contact.set('email', 'takahashi@example.com');
    // emailが変更されたけど、イベントは発生しない。
    contact.attributes.email = 'jirou@example.com';
    console.log(JSON.stringify(contact, null, 2));

    // 引数なし＝すべてのイベント
    contact.off();

    // イベント名を指定
    // contact.off('change');

    // イベント名と属性名を指定
    // contact.off('change:email');

    contact.set('email', 'yamada@example.com');
    console.log(JSON.stringify(contact, null, 2));

    contact.off();
  },
  ex06: function(contact) {
    'use strict';
    // コールバック関数を特定して解除
    var onChange = function() {
      console.log('属性が変更されました。');
    }
    var onChangeEmail = function() {
      console.log('email属性が変更されました。');
    }

    contact.on('change', onChange);
    contact.on('change:email', onChangeEmail);

    // changeイベントに対してonChange()メソッドを紐付けた監視だけを解除する。
    contact.off('change', onChange);
    // この属性値の変更に反映するのはonChangeEmail()メソッドのみとなる。
    contact.set('email', 'yamadaIchiro@example.com');
    console.log(JSON.stringify(contact, null, 2));

    contact.off();
  },
  ex07: function(contact) {
    'use strict';
    // 独自のイベントの発生
    // Contactインスタンスを発生してselect()メソッドを呼び出す
    contact.select();
    console.log('contact.selected:', contact.selected);

    contact.off();
  },
  ex08: function(contact) {
    'use strict';
    console.log('contact.fullname:', contact.fullname());
  },
  ex09: function(contact) {
    'use strict';
    // validate()メソッドによる検証を通過しない変更を{validate: true}オプションを付けてわざと行う
    contact.set({
      lastname: ''
    },{
      validate: true
    });

    // モデルの属性が変化していないことを確認する
    console.log(JSON.stringify(contact, null, 2));
  },
  collection_ex01: function(contact) {
    'use strict';
    var contactCollection = new Sample.Collections.Contact();
    contactCollection.add(contact);

    var ichiro = new Sample.Models.Contact({
      firstname: '一郎',
      lastname: '鈴木',
      email: 'suzuki@example.com'
    });
    contactCollection.add(ichiro);
    console.log(JSON.stringify(contactCollection, null, 2));
    console.log(contactCollection.length);
  },
  collection_ex02: function(contact) {
    'use strict';
    var contactCollection = new Sample.Collections.Contact();
    contactCollection.add(contact);
    contactCollection.add(contact);
    console.log(JSON.stringify(contactCollection, null, 2));
  },
  collection_ex03: function(contact) {
    'use strict';
    var contactCollection = new Sample.Collections.Contact();
    contactCollection.add(contact);
    contactCollection.add({
      firstname: '一郎',
      lastname: '鈴木',
      email: 'suzuki@example.com'
    });
    console.log(JSON.stringify(contactCollection, null, 2));
  },
  collection_ex04: function(contact) {
    'use strict';
    var contactCollection = new Sample.Collections.Contact();
    contactCollection.add([
      {
        firstname: '太郎',
        lastname: '山田',
        email: 'yamada@example.com'
      }, {
        firstname: '一郎',
        lastname: '鈴木',
        email: 'suzuki@example.com'
      }
    ]);
    console.log(JSON.stringify(contactCollection, null, 2));
  },
  collection_ex05: function(contact) {
    'use strict';
    var ichiro = new Sample.Models.Contact({
      firstname: '一郎',
      lastname: '鈴木',
      email: 'suzuki@example.com'
    });
    var contactCollection = new Sample.Collections.Contact([contact, ichiro]);
    console.log(JSON.stringify(contactCollection, null, 2));

    return contactCollection;
  },
  collection_ex06: function(contact, contactCollection) {
    'use strict';
    contactCollection.remove(contact);
    console.log(JSON.stringify(contactCollection, null, 2));
  },
  collection_ex07: function(contact, contactCollection) {
    'use strict';
    var tanaka = new Sample.Models.Contact({
      firstname: '田中',
      lastname: '将大',
      email: 'tanaka@example.com'
    });
    contactCollection.reset([tanaka]);
    console.log(JSON.stringify(contactCollection, null, 2));
  },
  collection_ex08: function(contact, contactCollection) {
    'use strict';
    contactCollection.on('add', function(contact) {
      console.log('モデルが追加されました。', contact.get('firstname'));
    });
    var tanaka = new Sample.Models.Contact({
      firstname: '田中',
      lastname: '将大',
      email: 'tanaka@example.com'
    });
    contactCollection.add(tanaka);
    console.log(JSON.stringify(contactCollection, null, 2));
  },
  collection_ex09: function() {
    'use strict';
    var ichiro = new Sample.Models.Contact({
      firstname: '一郎',
      lastname: '鈴木',
      age: 42,
      email: 'suzuki@example.com'
    });
    var tanaka = new Sample.Models.Contact({
      firstname: '田中',
      lastname: '将大',
      age: 27,
      email: 'tanaka@example.com'
    });
    var aoki = new Sample.Models.Contact({
      firstname: '青木',
      lastname: '宣親',
      age: 34,
      email: 'aoki@example.com'
    });
    var contactCollection = new Sample.Collections.Contact([ichiro, tanaka, aoki]);
    var filtered = contactCollection.filter(function(contact) {
      // Contactモデルがage（年齢）属性を持っていたとして、それ年齢が30以上のモデルだけを抽出した配列を返す。
      return contact.get('age') >= 30;
    });
    console.log(JSON.stringify(filtered, null, 2));
  },
  collection_ex10: function() {
    'use strict';
    var ichiro = new Sample.Models.Contact({
      firstname: '一郎',
      lastname: '鈴木',
      age: 42,
      email: 'suzuki@example.com'
    });
    var tanaka = new Sample.Models.Contact({
      firstname: '田中',
      lastname: '将大',
      age: 27,
      email: 'tanaka@example.com'
    });
    var aoki = new Sample.Models.Contact({
      firstname: '青木',
      lastname: '宣親',
      age: 34,
      email: 'aoki@example.com'
    });
    var contactCollection = new Sample.Collections.Contact();
    contactCollection.create(ichiro);
    contactCollection.create(tanaka);
    contactCollection.create(aoki);
  },
  collection_ex11: function() {
    var contactCollection = new Sample.Collections.Contact();
    contactCollection.localStorage = new Backbone.LocalStorage("Sample.Collections.Contact");
    contactCollection.fetch();
    // console.log(contactCollection.pluck('lastname'));
    contactCollection.each(function(contact) {
      console.log(JSON.stringify(contact, null, 2));
    });
  },
  view_ex01: function(contact) {
    var contactView = new Sample.Views.Contact({
      model: contact
    });
    console.log(contactView.el);

    return contactView;
  },
  routes_ex01: function() {
    // ルートの初期化
    var router = new Sample.Routers.Contact();

    // Backbone.historyの初期化
    Backbone.history.start();
  }
};

$(document).ready(function () {
  'use strict';
  var c = Sample.init();
  // Sample.ex01(c);
  // Sample.ex02(c);
  // Sample.ex03(c);
  // Sample.ex04(c);
  // Sample.ex05(c);
  // Sample.ex06(c);
  // Sample.ex07(c);
  // Sample.ex08(c);
  // Sample.ex09(c);
  // Sample.collection_ex01(c);
  // Sample.collection_ex02(c);
  // Sample.collection_ex03(c);
  // Sample.collection_ex04(c);
  // var cc =  Sample.collection_ex05(c);
  // Sample.collection_ex06(c, cc);
  // Sample.collection_ex07(c, cc);
  // Sample.collection_ex08(c, cc);
  // Sample.collection_ex09();
  // Sample.collection_ex10();
  // Sample.collection_ex11();
  var v = Sample.view_ex01(c);
  v.render().$el.appendTo($(document.body));
  // Sample.routes_ex01();
});
