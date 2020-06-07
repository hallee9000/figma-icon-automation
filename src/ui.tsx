import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Settings from './components/Settings'
import Updator from './components/Updator'
import '../assets/ds.css'
import './style.css'

declare function require(path: string): any

class App extends React.Component {
  state = {
    updatorVisible: false,
    githubData: null,
    webhookData: null,
    settingSwitch: false,
    isDone: false
  }
  onSucceed = () => {
    this.setState({ isDone: true })
  }
  toggleView = (githubData?) => {
    const { updatorVisible } = this.state
    this.setState({updatorVisible: !updatorVisible})
    if (githubData===true) {
      const { settingSwitch } = this.state
      this.setState({settingSwitch: !settingSwitch})
    } else if (githubData) {
      this.setState({
        githubData: githubData
      })
    }
  }
  componentDidMount () {
    // receive messages here
    window.onmessage = async (event) => {
      const msg = event.data.pluginMessage
      switch (msg.type) {
        case 'githubDataGot':
          if (msg.githubData) {
            this.setState({
              updatorVisible: true,
              githubData: msg.githubData
            })
          }
          break
        case 'webhookDataGot':
          if (msg.webhookData) {
            this.setState({
              webhookData: msg.webhookData
            })
          }
          break
      }
    }
  }
  render() {
    const { updatorVisible, githubData, webhookData, settingSwitch, isDone } = this.state
    const tabVisible = githubData&&!isDone
    return (
      <div className={'container '+ (!tabVisible ? '' : 'container-with-tab')}>
        <div className={'bar-adjust '+ (tabVisible ? '' : 'hide')}>
          <div
            className={'adjust-item type type--pos-medium-bold '+(updatorVisible ? '' : 'active')}
            onClick={e => this.toggleView()}
          >
            Setting
          </div>
          <div
            className={'adjust-item type type--pos-medium-bold '+(updatorVisible ? 'active' : '')}
            onClick={e => this.toggleView(true)}
          >
            Publish
          </div>
        </div>
        <Settings
          visible={!updatorVisible}
          githubData={githubData}
          onGithubSet={this.toggleView}
          settingSwitch={settingSwitch}
        />
        <Updator
          onSucceed={this.onSucceed}
          visible={updatorVisible}
          githubData={githubData}
          webhookData={webhookData}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('react-page'))
