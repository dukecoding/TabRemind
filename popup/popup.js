const CONFIG_CHARACTERS = ['#', 'later', 'rmd']

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
  savedForLater.map((bookmark) => {
    const tr = document.createElement('tr')
    const tdName = document.createElement('td')
    const tdDate = document.createElement('td')
    const name = document.createTextNode(bookmark.title)
    const date = document.createTextNode(
      new Date(bookmark.dateAdded).toLocaleString()
    )
    tdName.appendChild(name)
    tdDate.appendChild(date)
    tr.appendChild(tdName)
    tr.appendChild(tdDate)
    document.querySelector('table').appendChild(tr)
  })
})
