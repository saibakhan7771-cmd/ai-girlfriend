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
  const wrapper = document.createElement("div");
  wrapper.className = `msg ${type}`;

  // Bot (Aanya) profile image
  if (type === "bot") {
    const img = document.createElement("img");
    img.src = "profile1.jpg";
    wrapper.appendChild(img);
  }

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.innerText = text;

  wrapper.appendChild(bubble);
  document.getElementById("messages").appendChild(wrapper);
  wrapper.scrollIntoView({ behavior: "smooth" });

  // ✅ SEEN indicator (sirf user ke message pe)
  if (type === "user") {
    const seen = document.createElement("div");
    seen.className = "seen";
    seen.innerText = "Seen ✓✓";
    document.getElementById("messages").appendChild(seen);
  }
      }
