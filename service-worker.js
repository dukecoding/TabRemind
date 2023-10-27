const CONFIG_CHARACTERS = ['#', 'later', 'rmd']

function notifyUser(savedForLater) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: './images/icon.png',
    title: 'TabReminder',
    message: `SFL bookmarks: ${savedForLater.length}\nClick the extension icon to manage`,
  })
}

chrome.bookmarks.onChanged.addListener((id, changeInfo) => {
  chrome.bookmarks.getTree((res) => {
    const allBookmarks = res[0].children[0].children
    const savedForLater = []
    allBookmarks.map((bookmark) => {
      const { title } = bookmark
      const result = CONFIG_CHARACTERS.some((i) => title.includes(i))
      if (result) {
        savedForLater.push(bookmark)
      }
    })
    notifyUser(savedForLater)
  })
})
