/** inject your script global */
await import('./GlobalTest/index')

const base = '/Shiina-Astro-Blog'

/** 
 * inject player on index
 * 
 * Here we inject a music player on index and the core is from cdn
 */
if (window.location.pathname == base + '/') {
  const h = document.querySelector('html'), p = document.createElement('script')
  /**
   * inject by `<script></script>` element because this progress couldn't finish in module mode
   * 
   * it's a sync progress
   */
  p.setAttribute('src', base + '/js/petite-vue/pv.min.js')
  h.appendChild(p)
  await import('./MiniPlayer/index.js')
  await import('./MiniPlayer/index.css')
  const core = window._PlayerCore
  const l = [{
    id: 0,
    name: 'I Got Love',
    img: 'MiniPlayer/test.jpg',
    src: 'MiniPlayer/test.mp3',
  }]
  for (const i of l) {
    core.AppendSong(i)
  }
}