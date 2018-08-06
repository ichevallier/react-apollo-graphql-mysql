import React from 'react'
import PropTypes from 'prop-types'
// When using withRouter, you can have only 1 HoC per file
// http://stackoverflow.com/questions/42123261/programmatically-navigate-using-react-router-v4
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

// for gallery
import ImageBox from './ImageBox';


const PersonQuery = gql`
  query PersonQuery($id: Int!) {
    author(id: $id) {
      id
      image
      firstName
      lastName
      pictures{
        title
        url
      }
    }
  }
`

const Title = styled.div`
  color: #7F7F7F;
  font-size: 32px;
  font-weight: 300;
  max-width: 400px;
  margin-top: 50px;
`
class PersonPage extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.boolean,
      error: PropTypes.object,
      author: PropTypes.object
    }).isRequired,
    //router: PropTypes.object.isRequired,
    //params: PropTypes.object.isRequired,
  }
/* 
  constructor () {
    super()
    this.goBack = this.goBack.bind(this)
  }
*/

  render () {
   
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    if (this.props.data.error) {
      //console.log('test'+this.props.data.people.firstName);
      console.log(this.props.data.error)
      return (<div>An unexpected error occurred</div>)
    }
    
    const headerStyle = {backgroundImage: `url(${this.props.data.author.image})`};
    return (
      <div className="athlete">
        <header style={headerStyle} />
        <div className="picture-container">
          <img src={ this.props.data.author.image } alt={ this.props.data.author.id } />
          <h1 className="name">{ this.props.data.author.firstName } { this.props.data.author.lastName }</h1>
        </div>
       
        <section className="gallery">
            <ImageBox src={this.props.data.author.pictures} resource={this.props.data.author.image} />
        </section>
        <div className='flex justify-between'>
          <Link to={'/change/' +  this.props.data.author.id }
            className="link dim grow mw4 bg-white ma2 pa3 shadow-2"
            style={{ minWidth: 100 }}> 
            Modifier  
          </Link>
        </div>
      </div>
    )
  }

  goBack () {
    this.props.history.replace('/')
  }
}

const PersonPageWithQuery = graphql(PersonQuery, {
  options: (ownProps) => ({
    variables: {
      id: ownProps.match.params.personId
    }
  })
})(withRouter(PersonPage))


export default PersonPageWithQuery
