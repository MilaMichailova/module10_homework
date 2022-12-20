const positionGuid = "56f78139-1b32-45dd-bd94-f8da36dbf3c8";

let btn = document.querySelector(".j-btn");
let inputMessage = document.querySelector(".j-input");
let chatBody = document.querySelector(".chat-body-wrapper");
let btnGeo = document.querySelector(".j-btn-geo");

let websocket = new WebSocket("wss://echo-ws-service.herokuapp.com");

websocket.onopen = function (event) {
  console.log("Соединение установлено");
};

websocket.onmessage = function (event) {
  if (event.data.startsWith(positionGuid)) {
    return;
  }

  addMessageToChat(event.data, false);
};

btnGeo.addEventListener("click", () => {
  if (!navigator.geolocation) {
    console.log("Geolocation не поддерживается вашим браузером");
  } else {
    console.log("Определение местоположения…");
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  }
});

btn.addEventListener("click", () => {
  let message = inputMessage.value;

  websocket.send(message);
  addMessageToChat(message, true);

  inputMessage.value = "";
});

function addMessageToChat(message, isFromUser) {
  if (isFromUser === true) {
    chatBody.innerHTML += `
    <div class="message message-user">${message}</div>
    `;
  } else {
    chatBody.innerHTML += `
    <div class="message message-server">${message}</div>
    `;
  }
}

function geoSuccess(position) {
  websocket.send(positionGuid + JSON.stringify(position));

  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  addMessageToChat(
    `<a target="_blank" href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}">Геолокация</a>`,
    true
  );
}

function geoError() {
  console.log("Ошибка определения геолокации");
}
