function enterChat() {
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("chat").classList.remove("hidden");
}

async function send() {
  const input = document.getElementById("userInput");
  const msg = input.value;
  if (!msg) return;

  addMsg(msg, "user");
  input.value = "";

  const res = await fetch("https://ai-girlfriend-backend-1.onrender.com/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg })
  });

  const data = await res.json();
  addMsg(data.reply, "bot");
}

function addMsg(text, type) {
  const div = document.createElement("div");
  div.className = `msg ${type}`;
  div.innerText = text;
  document.getElementById("messages").appendChild(div);
}
