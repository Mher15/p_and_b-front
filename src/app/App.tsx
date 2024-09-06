import { Footer } from './components/footer'
import { Header } from './components/header'
import { PageLayout } from './components/layouts'
import { useAppDispatch } from './hooks'
import { AppRoutes } from './routes'
import { jwtDecode } from 'jwt-decode'
import { setUser } from '../features/profile/profile-slice'
import { IUser } from './types'
import { AppConfigProvider } from './AppConfigProvider'
import { register } from 'swiper/element/bundle'
import './scss/style.scss'
import { LogoutTimer } from './components/logout-timer'

export const App = () => {
  register()
  const dispatch = useAppDispatch()
  const token = localStorage.getItem('token')
  if (token) {
    const user: IUser = jwtDecode(token)
    dispatch(setUser(user))
  }

  return (
    <PageLayout>
      {/* <LogoutTimer /> */}
      <Header />
      <AppConfigProvider>
        <AppRoutes />
      </AppConfigProvider>
      <Footer />
    </PageLayout>
  )
}
