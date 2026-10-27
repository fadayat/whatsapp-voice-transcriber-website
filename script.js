"use strict";

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const input = document.createElement("textarea");
  input.value = value;
  input.setAttribute("readonly", "");
  input.className = "clipboard-proxy";
  document.body.appendChild(input);
  input.select();
  const copied = document.execCommand("copy");
  input.remove();
  if (!copied) throw new Error("Copy is unavailable in this browser.");
}

function temporaryLabel(button, label, duration = 1600) {
  const original = button.textContent;
  button.textContent = label;
  window.setTimeout(() => {
    button.textContent = original;
  }, duration);
}

const transcribeButton = document.querySelector("#transcribe-button");
const demoResult = document.querySelector("#demo-result");

transcribeButton?.addEventListener("click", () => {
  const label = transcribeButton.querySelector("span");
  transcribeButton.disabled = true;
  if (label) label.textContent = "Preparing demo…";

  window.setTimeout(() => {
    demoResult.hidden = false;
    transcribeButton.hidden = true;
    demoResult.focus?.();
  }, 520);
});

document.querySelector("#copy-transcript")?.addEventListener("click", async (event) => {
  const button = event.currentTarget;
  const transcript = document.querySelector("#demo-transcript")?.textContent?.trim() || "";

  try {
    await copyText(transcript);
    temporaryLabel(button, "Copied");
  } catch {
    temporaryLabel(button, "Copy failed");
  }
});

document.querySelector(".copy-command")?.addEventListener("click", async (event) => {
  const button = event.currentTarget;
  const status = document.querySelector("#copy-status");
  const command = button.dataset.copy || "";

  try {
    await copyText(command);
    temporaryLabel(button, "Copied");
    if (status) status.textContent = "Commands copied to the clipboard.";
  } catch {
    if (status) status.textContent = "Copy failed. Select the commands manually.";
  }
});
