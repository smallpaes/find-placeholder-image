(function () {
  let clickedImg = null

  document.addEventListener('contextmenu', event => {
    clickedImg = event.target
  })

  function copyUrl() {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(event.target);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
  }

  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    const images = !clickedImg.srcset ? clickedImg.src.split() : clickedImg.srcset.split(',')
    let tbodyInnerHTML = ''

    images.forEach(image => {
      const url = image.split(' ')[0] ? image.split(' ')[0] : image.split(' ')[1]
      const size = image.split(' ').length === 1 ? 'Single Size'
        : image.split(' ')[0] ? image.split(' ')[1]
          : image.split(' ')[2]

      tbodyInnerHTML += `
        <tr>
          <td>${size}</td>
          <td class='url'>
            ${url}
          </td>
        </tr>
      `
    })

    document.querySelector('body').innerHTML = `
      <table>
        <thead>
          <tr> 
            <th><h3>Size</h3></th>
            <th><h3>Link</h3></th>
          </tr>
        <thead>
        <tbody>
          ${tbodyInnerHTML}
        </tbody>
      </table>
    `


    document.querySelectorAll('.url').forEach(link => {
      link.addEventListener('click', copyUrl)
    })
  })
})()

