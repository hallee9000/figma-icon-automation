figma.showUI(__html__, { width: 320, height: 320 })

// get github settings
function getGithubSettings () {
  return figma.clientStorage.getAsync('githubData')
}

// set github settings
function setGithubSettings (data) {
  figma.clientStorage.setAsync('githubData', data)
}

// send github data to UI
function init () {
  getGithubSettings()
    .then(githubData => {
      figma.ui.postMessage({ type: 'githubDataGot', githubData })
    })
}

figma.ui.onmessage = msg => {
  switch (msg.type) {
    case 'setGithubData':
      setGithubSettings(msg.githubData)
      break
    case 'cancel':
      figma.closePlugin()
      break
  }
}

init()
