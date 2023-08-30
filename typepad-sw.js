const preFix = 'typepad'
const version = '2.66b2';

self.addEventListener('install', event => {
   self.skipWaiting();
   event.waitUntil(
      caches.open(preFix + version).then(cache => {
         return cache.addAll([
            '/',
            '/index.html?v=2.66b2',
            '/scss/typepad.css?v=2.66b2',

            // 英文单词
            '/js/class/english-vocabulary/CET4mini.js?v=2.66b2',

            // 汉语单词
            '/js/class/phrase/Phrase.js?v=2.66b2',
            '/js/class/Database.js?v=2.66b2',
            '/js/class/Utility.js?v=2.66b2',
            '/js/class/KeyCount.js?v=2.66b2',
            '/js/class/Config.js?v=2.66b2',
            '/js/class/Editor.js?v=2.66b2',
            '/js/class/Article.js?v=2.66b2',
            '/js/class/ArticleType.js?v=2.66b2',
            '/js/class/Reg.js?v=2.66b2',
            '/js/class/Engine.js?v=2.66b2',
            '/js/class/Record.js?v=2.66b2',
            '/js/class/CETWord.js?v=2.66b2',
            '/js/require_v2.3.6.js',
            '/js/typepad.js?v=2.66b2',
            '/js/class/Wubi.js',
            '/img/logo.png',
            '/scss/font/DSDigital.ttf',
            '/scss/font/Galvji.ttf',
            '/scss/font/ImpactPureNumber.ttf',
            '/scss/font/JetBrainsMonoOnlyCharacter.ttf',
            '/scss/font/RobotoMono.ttf',
         ])
      })
   )
})

// 清除之前版本的数据
self.addEventListener('activate', event => {
   console.log('sw: activate')
   event.waitUntil(
      caches.keys().then( keyList => {
         return Promise.all(keyList.map(item => {
            if (/typepad/i.test(item)){ // 如果包含 typepad 字符串
               if (item !== preFix + version){
                  return caches.delete(item);
               }
            }
         }));
      })
   )
})

// 处理页面请求
self.addEventListener('fetch', event => {
   event.respondWith(
      caches.match(event.request).then(res => {
         return res || fetch(event.request);
      })
   )
})
