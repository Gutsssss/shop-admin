import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { setupStore } from './store/store.ts'
import { BrowserRouter } from 'react-router-dom'


const store = setupStore()

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter basename="/">
    <App />
    </BrowserRouter>
  </Provider>,
)
