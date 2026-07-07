import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Categories from './components/Categories.jsx'
import Concept from './components/Concept.jsx'
import Programs from './components/Programs.jsx'
import ExperienceToObject from './components/ExperienceToObject.jsx'
import Shop from './components/Shop.jsx'
import PrivateSessions from './components/PrivateSessions.jsx'
import ReservationForm from './components/ReservationForm.jsx'
import Visit from './components/Visit.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import Footer from './components/Footer.jsx'
import AdminPage from './admin/AdminPage.jsx'
import './App.css'

// The site is a single page; `#admin` swaps in the admin page without
// a router. The hash is also used for in-page section anchors, so only
// the exact `#admin` value switches views.
function useIsAdminRoute() {
  const [isAdmin, setIsAdmin] = useState(() => window.location.hash === '#admin')

  useEffect(() => {
    const onHashChange = () => setIsAdmin(window.location.hash === '#admin')
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return isAdmin
}

function App() {
  const isAdmin = useIsAdminRoute()

  if (isAdmin) {
    return <AdminPage />
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Categories />
        <Concept />
        <Programs />
        <ExperienceToObject />
        <Shop />
        <PrivateSessions />
        <ReservationForm />
        <Visit />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}

export default App
