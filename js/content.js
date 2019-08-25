window.onload = function () {
  let clickedImg = null

  // generate a table for each format
  function generateTableRow(size, url) {
    return `
      <tr>
        <td>${size}</td>
        <td class="url">
          <span class="link">${url}</span>
          <span class="tooltip-text">Click to copy</span>
        </td>
      </tr>
    `
  }

  // access image from Pixabay , Pexels, Unsplash 
  function generateSrcsetImages() {
    const images = clickedImg.srcset.split(', ')
    return images.map(image => {
      const url = image.split(' ')[0]
      const size = image.split(' ')[1]
      return generateTableRow(size, url)
    }).join(' ')
  }

  // access image from Picjumbo or others
  function generateSrcImage() {
    const size = clickedImg.width
    const url = clickedImg.src
    return generateTableRow(size, url)
  }

  function generateTbody() {
    // generate table rows based on where the links are stored
    const tbodyInnerHTML = clickedImg.srcset ? generateSrcsetImages() : generateSrcImage()
    return tbodyInnerHTML
  }

  function generateTable(tbodyInnerHTML) {
    // replace the page with a created table containing links
    document.querySelector('body').innerHTML = `
      <section>
        <div class="table-container mt-4 p-0 rounded-lg">
          <table class="table mb-0">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Size</th>
                <th scope="col">Link</th>
              </tr>
            </thead>
            <tbody class="text-secondary">
              ${tbodyInnerHTML}
            </tbody>
          </table>
        </div>
        <!--Reload Button-->
        <div class="button-panel">
          <button id="reload">Back to photo</button>
        </div>
      </section>
    `
  }

  function copyUrl() {
    const link = event.target.closest('.url').firstElementChild
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(link);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
  }

  function showErrorMessage() {
    const errorMessage = `
      <div class="alert-message">
        <span class="closebtn">&times;</span> 
        Something went wrong. Please try again on the image!
      </div>
    `
    // insert alert message to the top of the page
    document.querySelector('body').insertAdjacentHTML('afterbegin', errorMessage)
    // close the message when clicking the close button
    document.querySelector('.closebtn').addEventListener('click', event => event.target.parentElement.remove())
  }

  function generateReport(request, sender, sendResponse) {
    // show error message if getUrl is false or clickImg is null
    if (!request.getUrl || !clickedImg) { return showErrorMessage() }
    // generate tbody
    const tbodyInnerHTML = generateTbody()
    // generate the report with tbody
    generateTable(tbodyInnerHTML)
    // listen to url click to copy url
    document.querySelectorAll('.url').forEach(link => link.addEventListener('click', copyUrl))
    // listen to reload button click to lead user back to image page
    document.getElementById('reload').addEventListener('click', () => window.location.reload())
  }

  // listen to contextmenu being opened and save the target image
  document.addEventListener('contextmenu', event => clickedImg = event.target)

  // listen to message request from the extension: background.js
  chrome.runtime.onMessage.addListener(generateReport)
}