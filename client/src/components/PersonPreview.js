import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class PersonPreview extends React.Component {
  
  static propTypes = {
    athlete: PropTypes.shape({
      id: PropTypes.string,
      firstName: PropTypes.string,
      lastName:PropTypes.string,
      image: PropTypes.string
    }).isRequired
  }

  render () {
    const { athlete } = this.props
    return (
      <Link to={'/view/' + athlete.id }
            className="link dim grow mw4 bg-white ma2 pa3 shadow-1"
            style={{ minWidth: 200 }}>
         <img src={ athlete.image } alt={ athlete.firstName } />
        <div className='gray tc'>{ athlete.firstName } { athlete.lastName }</div>
      </Link>
    )
  }
}

export default PersonPreview
