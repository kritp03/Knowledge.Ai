chrome.runtime.onInstalled.addListener((details) => {
  const BACKEND_URL = "http://3.0.100.46:8000/";

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
  // chrome.alarms.onAlarm.addListener((alarm) => {
  //   console.log("alarm", alarm);

  //   chrome.storage.local.get("auth_token", (res) => {
  //     console.log("auth_token");
  //     console.log(res);
  //   });

  //   chrome.storage.local.get("user", (res) => {
  //     console.log("user");
  //     console.log(res);
  //   });
  // });

  chrome.contextMenus.create({
    title: "Generate Mindmap",
    id: "generateMindmap",
    contexts: ["page", "selection"],
  });

  chrome.contextMenus.onClicked.addListener((event) => {


    chrome.storage.local.get("auth_token",(res) => {
      if (res.auth_token !== '') {
        console.log(event);
        console.log(event.selectionText)
        
        let selectionText = event.selectionText

        fetch(BACKEND_URL + "kge/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: 1,
            data: selectionText,
          })
        }).then((response) => {
          if (response.status == 200) {
            console.log('Success:', response);
          }
          console.log(response.status)
        }) 




      }
      else {
        console.log("Please login to generate mindmap")
      }
    })

  });
});

console.log("background.js is running");
