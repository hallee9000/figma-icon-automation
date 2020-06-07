figma.showUI(__html__, { width: 320, height: 436 })

// get github settings
function getLocalData (key) {
  return figma.clientStorage.getAsync(key)
}

// set github settings
function setLocalData (key, data) {
  figma.clientStorage.setAsync(key, data)
}

// send github data to UI
function init () {
  getLocalData('githubData')
    .then(githubData => {
      figma.ui.postMessage({ type: 'githubDataGot', githubData })
    })
  getLocalData('webhookData')
    .then(webhookData => {
      figma.ui.postMessage({ type: 'webhookDataGot', webhookData })
    })
}

figma.ui.onmessage = msg => {
  switch (msg.type) {
    case 'setGithubData':
      setLocalData('githubData', msg.githubData)
      break
    case 'setWebhookData':
      setLocalData('webhookData', msg.webhookData)
      break
    case 'cancel':
      figma.closePlugin()
      break
  }
}

init()
