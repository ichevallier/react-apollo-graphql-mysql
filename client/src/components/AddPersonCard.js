import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import styled from 'styled-components'

const Button = styled.div`
  background-color: ${props => props.save ? '#2BC3A1' : ''};
  color: ${props => props.save ? 'white' : '#A3A3A3'};
  height: 48px;
  line-height: 1;
  font-size: 18px;
  padding: 15px 30px;
  cursor: pointer;
  font-weight: 300;
  border-radius: 4px
`

const ImageContainer = styled.div`
  width: 100%;
  background-color: #F7F7F7;
  min-height: 250px;
  margin-bottom: 20px;
`

const Card = styled.div`
  background-color: white;
  box-shadow: 0 1px 11px 0 rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  padding: 20px;
`

const AddPersonMutation = gql`
  mutation AddAuthor($firstName: String!, $lastName: String!, $image: String) {
    addAuthor(firstName: $firstName, lastName: $lastName, image: $image) {
      id
    }
  }
`

class AddPersonCard extends React.Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired
  }

  constructor () {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      image: ''
    }
    this.handleSave = this.handleSave.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  render () {
    return (
      <div className="w-100 pa4 flex justify-center">
        <Card style={{ maxWidth: 400 }}>
          <input
            className="w-100 padding-1 mv2"
            value={ this.state.firstName }
            placeholder="First name"
            onChange={ (e) => this.setState({ firstName: e.target.value }) }
          />
          <input
            className="w-100 padding-1 mv2"
            value={ this.state.lastName }
            placeholder="Last name"
            onChange={ (e) => this.setState({ lastName: e.target.value }) }
          />
          <input
            className="w-100 padding-1 mv2"
            value={ this.state.image }
            placeholder="Image Url"
            onChange={ (e) => this.setState({ image: e.target.value }) }
          />
          <ImageContainer>
            { this.state.image &&
              <img src={ this.state.image } alt={ this.state.firstName } className="w-100 mv3" />
            }
          </ImageContainer>
          <div className="flex justify-between">
            <Button onClick={ this.handleCancel }>Cancel</Button>
            { this.canSave
              ? <Button save onClick={ this.handleSave }>Save</Button>
              : <Button disabled>Save</Button>
            }
          </div>
        </Card>
      </div>
    )
  }

  get canSave () {
    return this.state.firstName && this.state.lastName
  }

  handleSave () {
    console.log('match :: '+this.props.match.params.firstName);
    const { mutate } = this.props
    const { firstName, lastName, image } = this.state
    mutate({
      variables: {
        firstName,
        lastName,
        image
      }
    })
    .then(() => {
      this.props.history.replace('/')
    })
    .catch((err) => {
      console.log(err)
    })
  }

  handleCancel () {
    this.props.history.replace('/')
  }
}

const AddPersonCardWithMutation = graphql(AddPersonMutation)(AddPersonCard)

export default AddPersonCardWithMutation
