const CONFIG_CHARACTERS = ['#', 'later', 'rmd']

function notifyUser(savedForLater) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: './images/500.png',
    title: 'TabReminder',
    message: `Saved for later bookmarks: ${savedForLater.length}\nClick the extension icon to manage`,
  })
}

chrome.bookmarks.onCreated.addListener((id, changeInfo) => {
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
    if (savedForLater.length > 0) notifyUser(savedForLater)
  })
})
