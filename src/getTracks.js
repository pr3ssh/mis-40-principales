var fs = require('fs')
const fetch = require('isomorphic-unfetch')
const { getData, getPreview, getTracks, getDetails } = require('spotify-url-info')(fetch)

let tracks = []

getDetails('https://open.spotify.com/playlist/5fVeETc29lXJOcYNuPlxAd?si=8e1086cef08c4a5c').then(data => {

  tracks = data['tracks']
  tracks.forEach(t => {
    uri = t['uri'].split(':')
    getPreview('https://open.spotify.com/track/' + uri[2]).then(data => {
      t['audio'] = data['audio']
      t['image'] = data['image']
    })
    t['recommendedBy'] = ''
    t['reason'] = ''
  })

  require('fs').writeFile(
    './src/tracks.json',
    JSON.stringify(tracks),
    function (err) {
      if (err) {
          console.error('Crap happens')
      }
    }
  )

}
)

