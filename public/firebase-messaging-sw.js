self.addEventListener('install', function(){
    console.log('fcm sw install...');
    self.skipWaiting();
});

self.addEventListener('push', function(e){
    console.log(e.data.json().data, 'push event.....');
    const data = e.data.json().data;
    const option = {
        body:data.body,
        icon:data.icon,
        image: data.image,
        badge:'', //icon 집어넣을 수 있는 곳
        vibrate:[200,100,300],  //2초동안 울리고 1초동안 멈추고 3초동안 유지
        data:{
            click_action:data.click_action
        },
        tag:'tag tag'
    }

    e.waitUntil(
        self.registration.showNotification(data.title, option)
    );
});

//알람 팝업창 떴을때 클릭시 네이버 url 연결해놓은걸로 넘어가게 하는 법
self.addEventListener('notificationclick', function(e){
    const url = e.notification.data.click_action;

    e.waitUntil(
        clients
          .matchAll({
            type: "window",
          })
          .then(function (clientList) {
            for (var i = 0; i < clientList.length; i++) {
              var client = clientList[i];
              if (client.url == "/" && "focus" in client) return client.focus();
            }
            if (clients.openWindow) return clients.openWindow(url);
          }),
      );
});


