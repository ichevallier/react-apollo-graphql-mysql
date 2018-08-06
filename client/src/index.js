import React from 'react'
import ReactDOM from 'react-dom'
import Trombinoscope from './components/Trombinoscope'
import PersonPage from './components/PersonPage'
import AddPersonCard from './components/AddPersonCard'
import ChangePersonPage from './components/ChangePersonPage'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo'
import 'tachyons'
import './index.css'

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:4000/graphql'
})
const dataIdFromObject = (obj) => obj.id

const client = new ApolloClient({ networkInterface, dataIdFromObject })
ReactDOM.render((
  <ApolloProvider client={ client }>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Trombinoscope } />
        <Route path="/view/:personId" component={ PersonPage } />
        <Route path="/create/" component={ AddPersonCard } />
        <Route path="/change/:personId" component={ ChangePersonPage } />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
  ),
  document.getElementById('root')
)