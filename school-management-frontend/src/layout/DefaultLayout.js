import React from 'react'
import { AppContent,  AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  return (
    <div>
    
      <div className="wrapper d-flex flex-column min-vh-100">
     
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
