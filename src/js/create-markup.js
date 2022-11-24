export function createMarkup(arr) {
    return arr.map(el => {
        return `<div class="photo-card">
  <img src="${el.webformatURL}" alt="${el.tags}" width=${el.webformatWidth} height=${el.webformatHeight} loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ❤${el.likes}
    </p>
    <p class="info-item">
      <b>Views</b> 👀${el.views}
    </p>
    <p class="info-item">
      <b>Comments</b> 📄${el.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ⏬${el.downloads}
    </p>
  </div>
</div>`
    }).join('')
}