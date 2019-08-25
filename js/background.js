const contextMenuItems = {
  "id": "showImageUrl",
  "title": "ShowImageURL",
  "contexts": ["image"],

}

// initialize the extension on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create(contextMenuItems)
})

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId !== "showImageUrl") { return }
  // send a message from the extension to content script of current tab
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { getUrl: true })
    chrome.tabs.insertCSS({
      file: 'css/content.css'
    })
  })
})