import React from 'react'
import { Link } from 'react-router-dom'

class AddPersonPreview extends React.Component {
  
  render () {

    return (
      <Link to={'/create/' }
            className="link dim mw4 ma2 ba b--dashed bw3 b--silver flex justify-center items-center"
            style={{ minWidth: 200 }}>
        <div className='silver tc v-mid fw4 f1'>+</div>
      </Link>
    )
  }
}

export default AddPersonPreview