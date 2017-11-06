由于最近需求要做一个字母导航的联系人列表，根据需求在网上找了相关的demo，看到了一篇文章[传送门](http://www.jianshu.com/p/6b9af9373a14)。作者用原生js实现了这个demo。作者写的很好，但是我感觉写的复杂了些，因为该demo没有很高的复用性，没有必要写个观察者模式，当然作者的思想是可取的。而现在大家写前端大都用了比较火的vue、react、angular等，我这里只完成了vue和react，因为不会angular。

字母导航demo，一般用在联系人列表页面，根据右侧的字母可以快速定位到该字母的联系人列表。

该demo分为vue和react两个版本。

查看效果

~~~
git clone https://github.com/keenjaan/alphabetical-index-navigation.git

npm i
~~~

~~~
// 查看vue版本
npm run vue

// 查看react版本
npm run react
~~~

