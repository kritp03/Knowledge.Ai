chrome.runtime.onInstalled.addListener((details) => {


  chrome.storage.local.set({
    auth_token: "",
  });

  chrome.storage.local.set({
    user: "",
  });

  chrome.storage.local.set({
    email: "",
  });

  console.log(details);

  chrome.alarms.create("pomodoroTimer", {
    periodInMinutes: 1 / 60,
  });

/* A listener that is listening for the alarm to go off. */
  chrome.alarms.onAlarm.addListener((alarm) => {
    console.log("alarm", alarm);

    chrome.storage.local.get("auth_token", (res) => {
      console.log("auth_token");
      console.log(res);
    });

    chrome.storage.local.get("user", (res) => {
      console.log("user");
      console.log(res);
    });
  });

  chrome.contextMenus.create({
    title: "Generate Mindmap",
    id: "generateMindmap",
    contexts: ["page", "selection"],
  });

  chrome.contextMenus.onClicked.addListener((event) => {
    console.log(event);
  });
});

console.log("background.js is running");
