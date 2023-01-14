// TODO: background script
chrome.runtime.onInstalled.addListener((details) => {
  chrome.storage.local.set({
    credentials: "12444321",
  });

  console.log(details);

  chrome.alarms.create("pomodoroTimer", {
    periodInMinutes: 1 / 60,
  });

  // chrome.alarms.onAlarm.addListener((alarm) => {
  //   console.log("alarm", alarm);
  //   chrome.storage.local.get("credentials", (res) => {
  //     console.log(res);
  //   });
  // });

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
