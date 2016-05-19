import React, {Component, PropTypes} from "react"
import {map} from "ramda"

const renderAccount = (member) => {
  return (
    <li className="accounts">
      {/* NOTE: We can look at values by calling functions */}
      {member.name()} (posts: {member.postsCount()}
    </li>
  )
}

// NOTE: All output from abstraction is native javascript types: Array, Map, or Object
const renderAccounts = map(renderAccount)

export default class FullAccountList extends Component {
  static propTypes = {
    collection: PropTypes.arrayOf(
      PropTypes.objOf({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        postsCount: PropTypes.integer.isRequired,
        _type: PropTypes.oneOf(["accounts"]).isRequired
      })
    ).isRequired
  }

  render () {
    return (
      <ol className={this.displayName}>
        {renderAccounts(this.props.collection)}
      </ol>
    )
  }
}
