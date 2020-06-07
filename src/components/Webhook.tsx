import * as React from 'react'

export interface Props {
  hidden: boolean;
  webhookData: {webhookUrl: string, data: string};
  onFilled: (webhookUrl, data) => void;
}

export default ({hidden, onFilled, webhookData}) => {
  const [visible, setVisible] = React.useState(false)
  const [webhookUrl, setWebhookUrl] = React.useState('')
  const [data, setData] = React.useState('')

  const toggle = e => {
    setVisible(e.target.checked)
  }

  const handleChange = e => {
    const { value, name } = e.target
    name==='webhookUrl' ? setWebhookUrl(value) : setData(value)
  }

  React.useEffect(() => {
    if (!visible) {
      onFilled()
      parent.postMessage({ pluginMessage: { type: 'setWebhookData', webhookData: '' } }, '*')
    }
    if (visible && webhookUrl && data) {
      onFilled(webhookUrl, data)
      parent.postMessage({ pluginMessage: { type: 'setWebhookData', webhookData: {webhookUrl, data} } }, '*')
    }
  }, [visible, webhookUrl, data])

  React.useEffect(() => {
    const { webhookUrl: url, data: message } = webhookData || { webhookUrl: '', data: '' }
    if (url && message) {
      setVisible(true)
      setWebhookUrl(url)
      setData(message)
    }
  }, [webhookData])

  return (
    !hidden &&
    <React.Fragment>
      <div className="checkbox">
        <input id="visible" type="checkbox" className="checkbox__box" onChange={toggle} checked={visible}/>
        <label htmlFor="visible" className="checkbox__label">Send a message to Slack/Lark</label>
      </div>
      <div className={visible ? '' : 'hide'}>
        <div className="form-item">
          <input
            name="webhookUrl"
            className="input"
            placeholder="Webhook link"
            value={webhookUrl}
            onChange={handleChange}
          />
        </div>
        <div className="form-item">
          <textarea
            rows={2}
            name="data"
            className="textarea"
            placeholder="Message data (json)"
            value={data}
            onChange={handleChange}
          />
          <div className="type type--pos-medium-normal">You can use variables $prUrl, $version, $message in the content.</div>
        </div>
      </div>
    </React.Fragment>
  )
}
