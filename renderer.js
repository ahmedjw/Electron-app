const information = document.getElementById("info");
const recivedMessage = document.getElementById("message");
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;
const form = document.getElementById("messageForm");
const input = document.getElementById("messageInput");

form.addEventListener("submit", handleSend);

async function handleSend(event) {
  event.preventDefault();

  const message = input.value.trim();
  const result = await actions.sendMessage(message).then((response) => {
    return response;
  });

  recivedMessage.innerText = result;

  if (message === "") {
    return;
  }

  input.value = "";
}
