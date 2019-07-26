const generateImageForm = document.getElementById('generate-image')
const searchImageForm = document.getElementById('search-image')
const searchString = document.getElementById('search-string')
const urlDisplay = document.getElementById('url-display')

function generateUrl() {
  const width = document.getElementById('width').value
  const height = document.getElementById('height').value || width
  const format = document.getElementById('format').value
  const bgColor = document.getElementById('bg-color').value.slice(1)
  let displayText = document.getElementById('display-text').value.replace(/ /g, '+')
  displayText = !displayText ? '' : `?text=${displayText}`
  return `https://via.placeholder.com/${width}x${height}${format}/${bgColor}${displayText}`
}

function openUrl(url) {
  const btn = document.getElementById('open-url')
  btn.href = url
}

function copyUrl() {
  urlDisplay.select()
  document.execCommand("copy");
}

function showUrlPanel(url) {
  const panel = document.getElementById('url-panel')
  const copyBtn = document.getElementById('copy-url')
  // Enable open URL button
  openUrl(url)
  // Enable copy URL button
  copyBtn.addEventListener('click', copyUrl)
  // Show URL
  urlDisplay.value = url
  // Show URL Panel
  panel.classList.remove('d-none')
  panel.classList.add('d-flex')
}

function updateUrl(keyWord) {
  document.getElementById('pixabay').href = `https://pixabay.com/images/search/${keyWord}`
  document.getElementById('pexels').href = `https://www.pexels.com/search/${keyWord}`
  document.getElementById('unsplash').href = `https://unsplash.com/search/photos/${keyWord}`
  document.getElementById('picjumbo').href = `https://picjumbo.com/?s=${keyWord}`
}

function createTab(websiteUrl) {
  // open a new tab and navigate it to the specified url
  chrome.tabs.create({ url: websiteUrl })
}

generateImageForm.addEventListener('submit', function (event) {
  event.preventDefault()
  const url = generateUrl()
  showUrlPanel(url)
})

searchImageForm.addEventListener('submit', event => {
  event.preventDefault()
  document.querySelectorAll('.website').forEach(website => {
    createTab(website.href)
  })

})

searchString.addEventListener('input', function (event) {
  updateUrl(searchString.value)
})

