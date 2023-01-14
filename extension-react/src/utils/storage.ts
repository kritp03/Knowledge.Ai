export interface localStorage {
    test_item? : string
}

export function setStorage(key:string, value:string): Promise<void> {

    return new Promise((resolve)=> {
        console.log('setStorage', key, value)
        chrome.storage.local.set(({key, value}), ()=> {
            resolve()
        })
    })
    
}

export function getStorage(key:string): Promise<string> {
    return new Promise((resolve)=> {
        chrome.storage.local.get(key, (data)=> {
            resolve(data[key])
        })
    })
}