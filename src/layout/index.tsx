import ROUTES from '@/config/routes'
import useScrollToTop from '@/hooks/useScrollToTop'
import Loading from '@c/Loading'
import { lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const Home = lazy(() => import('@v/Home'))
const Blocks = lazy(() => import('@v/Block/Detail'))
const Block = lazy(() => import('@v/Block/List'))
const Transactions = lazy(() => import('@v/Transaction/Detail'))
const Transaction = lazy(() => import('@v/Transaction/List'))
const Address = lazy(() => import('@v/Address'))
const SearchEmpty = lazy(() => import('@v/Empty'))
const Validator = lazy(() => import('@v/Validator'))
const TokenTransfers = lazy(() => import('@v/Token/List'))
const TokenTransfer = lazy(() => import('@v/Token/Detail'))
const Bridge = lazy(() => import('@v/Bridge'))
const ContactUs = lazy(() => import('@v/Contact'))

const Layout: React.FC = () => {
  useScrollToTop()

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path={ROUTES.HOME} component={Home} />
        <Route exact path={ROUTES.BLOCKS} component={Blocks} />
        <Route exact path={ROUTES.BLOCK} component={Block} />
        <Route exact path={ROUTES.TRANSACTIONS} component={Transactions} />
        <Route exact path={ROUTES.TRANSACTION} component={Transaction} />
        <Route exact path={ROUTES.TRANSACTIONS_BLOCK} component={Transaction} />
        <Route exact path={ROUTES.ADDRESS} component={Address} />
        <Route exact path={ROUTES.EMPTY} component={SearchEmpty} />
        <Route exact path={ROUTES.VALIDATOR} component={Validator} />
        <Route exact path={ROUTES.TOKENTRANSFERS} component={TokenTransfers} />
        <Route exact path={ROUTES.TOKENTRANSFER} component={TokenTransfer} />
        <Route exact path={ROUTES.BRIDGE} component={Bridge} />
        <Route exact path={ROUTES.CONTACTUS} component={ContactUs} />
        <Redirect from="*" to={ROUTES.HOME} />
      </Switch>
    </Suspense>
  )
}

export default Layout
