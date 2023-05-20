import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { RawIntlProvider } from 'react-intl'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { YMInitializer } from 'react-yandex-metrika'
import { generateIntl } from './helpers/intl'
import messages from './translations/ru'
import { useRoutes } from './routes'
import { Navbar } from './components/navbar'
import 'materialize-css'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import { ApplicationStore, createApplicationStore } from './store/application.store'
import PageProvider from 'components/common/PageProvider'
import { AuthProvider } from 'components/common/AuthProvider'

function App(): JSX.Element {
  const routes = useRoutes()

  const store: Store<ApplicationStore> = createApplicationStore()

  const intlValue = generateIntl({ locale: 'ru-RU', messages })

  return (
    <>
      <YMInitializer
        accounts={[93600323]}
        options={{ defer: true, trackLinks: true, accurateTrackBounce: true }}
      />
      <RawIntlProvider value={intlValue}>
        <Provider store={store}>
          <AuthProvider>
            <ToastContainer />
            <Router>
              <PageProvider>
                <Navbar />
                {routes}
              </PageProvider>
            </Router>
          </AuthProvider>
        </Provider>
      </RawIntlProvider>
    </>
  )
}

export default App
