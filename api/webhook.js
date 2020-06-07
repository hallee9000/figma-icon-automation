export const sendNotification = ({webhookUrl, data}, prUrl, version, message) => {
  return fetch(`https://figma-handoff-cors.herokuapp.com/${webhookUrl}`, {
    headers: {
      'content-type': 'application/json'
    },
    body: data
      .replace(/\$prUrl/g, prUrl)
      .replace(/\$version/g, version)
      .replace(/\$message/g, message),
    method: 'POST'
  })
    .then(response => response.json())
}
