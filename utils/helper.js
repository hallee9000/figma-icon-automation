import gh from 'parse-github-url'

export const Uint8ArrayToString = fileData => {
  var dataString = "";
  for (var i = 0; i < fileData.length; i++) {
    dataString += String.fromCharCode(fileData[i]);
  }
  return dataString
}

export const formattedSelections = selections => {
  const iconsPromise = selections
    .map(async c => {
      let svgCode = await c.exportAsync({format: 'SVG'})
      svgCode = Uint8ArrayToString(svgCode)
      return {id: c.id, name: c.name, code: svgCode}
    })
  return Promise.all(iconsPromise)
}

export const validateGithubURL = url => {
  return gh(url)
}

export const versionValue = (versions) => {
  return versions
    .split('.')
    .map(n => n - 0)
    .reduce((accumulator, currentValue, index) => {
      return accumulator + currentValue*Math.pow(100, 2 - index)
    }, 0)
}
