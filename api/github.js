export const base = 'https://api.github.com'

export const getContent = (filePath, githubData) => {
  return fetch(`${base}/repos/${githubData.owner}/${githubData.name}/contents/${filePath}`, {
    headers: {
      'content-type': 'application/json',
      'Authorization': `token ${githubData.githubToken}`
    }
  })
  .then(response => response.json())
  .then(res => (
    res.sha ?
    {sha: res.sha, contents: JSON.parse(window.atob(res.content))} :
    {}
  ))
}

export const getCommit = (githubData) => {
  return fetch(`${base}/repos/${githubData.owner}/${githubData.name}/commits/refs/heads/master`, {
    headers: {
      'content-type': 'application/json',
      'Authorization': `token ${githubData.githubToken}`
    }
  })
  .then(response => response.json())
}

export const createBranch = (sha, githubData) => {
  const branchName = `figma-update-${(new Date()).getTime()}`
  const body = { ref: `refs/heads/${branchName}`, sha }
  return fetch(`${base}/repos/${githubData.owner}/${githubData.name}/git/refs`, {
    headers: {
      'content-type': 'application/json',
      'Authorization': `token ${githubData.githubToken}`
    },
    body: JSON.stringify(body),
    method: 'POST'
  })
    .then(response => response.json())
}

export const updatePackage = (message, sha, contents, branch, githubData) => {
  const content = window.btoa(JSON.stringify(contents, null, 2))
  const body = JSON.stringify({ branch, sha, content, message })
  return fetch(`${base}/repos/${githubData.owner}/${githubData.name}/contents/package.json`, {
    headers: {
      'content-type': 'application/json',
      'Authorization': `token ${githubData.githubToken}`
    },
    body,
    method: 'PUT'
  })
  .then(response => response.json())
}

export const createPullRequest = (title, content, branchName, githubData) => {
  const body = {
    title,
    body: content,
    head: `${githubData.owner}:${branchName}`,
    base: "master"
  }
  return fetch(`${base}/repos/${githubData.owner}/${githubData.name}/pulls`, {
    headers: {
      'content-type': 'application/json',
      'Authorization': `token ${githubData.githubToken}`
    },
    body: JSON.stringify(body),
    method: 'POST'
  })
    .then(response => response.json())
}
