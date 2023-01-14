chrome.runtime.onInstalled.addListener((details)=> {

    chrome.storage.local.set({
        credentials: ''
    })

    console.log(details)

    chrome.contextMenus.create({
        title: 'Generate Mindmap',
        id: 'generateMindmap',
        contexts: ['page', 'selection']
    })


    chrome.contextMenus.onClicked.addListener((event)=> {
        console.log(event)
    })

})

console.log('background.js is running')