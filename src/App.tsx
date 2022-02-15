// import '@/config/i18n'
import Layout from '@/layout'
import Nav from '@v/Nav'
import { hot } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import Footer from './components/Footer'
import './App.scss'
import ContentContainer from './components/ContentContainer'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Nav />
      <ContentContainer>
        <Layout />
      </ContentContainer>
      <Footer />
    </BrowserRouter>
  )
}

export default hot(module)(App)
