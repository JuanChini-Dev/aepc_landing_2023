const d = document

d.addEventListener('DOMContentLoaded', () => {
  const includeHTML = async (el, url) => {
    try {
      let res = await fetch(url)
      if (res.ok) {
        let html = await res.text()
        el.outerHTML = html
      } else {
        console.log('Error: ' + res.status)
        el.outerHTML = '<p>Error: ' + res.status + '</p>'
      }
    } catch (error) {
      console.log(error)
      el.outerHTML = '<p>Error: ' + error + '</p>'
    }
  }

  d.querySelectorAll('[data-include]').forEach((el) => {
    includeHTML(el, el.getAttribute('data-include'))
  })
})
