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
    const tdCheckbox = document.createElement('td')
    const name = document.createTextNode(bookmark.title)
    const date = document.createTextNode(
      new Date(bookmark.dateAdded).toLocaleString()
    )
    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.value = bookmark.id
    tdName.appendChild(name)
    tdDate.appendChild(date)
    tdCheckbox.appendChild(checkbox)
    tr.appendChild(tdName)
    tr.appendChild(tdDate)
    tr.appendChild(tdCheckbox)
    document.querySelector('table').appendChild(tr)
  })
  document.querySelector('#delAllButton').addEventListener('click', () => {
    savedForLater.map((item) => {
      chrome.bookmarks.remove(item.id, () => {})
    })
    location.reload()
  })
  document.querySelector('#delCheckedButton').addEventListener('click', () => {
    document.querySelectorAll('input[type="checkbox"]').forEach((item) => {
      if (item.checked) {
        chrome.bookmarks.remove(item.value, () => {})
      }
    })
    location.reload()
  })
})
