import React from 'react'
import PropTypes from 'prop-types'
import './PageLayout.scss'

class PageLayout extends React.Component {
  render () {
    return (
      <div>
        {this.props.children ? this.props.children : null}
      </div>
    )
  }
}

PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
