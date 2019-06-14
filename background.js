const contextMenuItems = {
  "id": "showImageUrl",
  "title": "ShowImageURL",
  "contexts": ["image"],

}

chrome.contextMenus.create(contextMenuItems)
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "showImageUrl") {
    chrome.tabs.sendMessage(tab.id, "getUrl")
    chrome.tabs.insertCSS({
      file: 'content.css'
    })
  }
})