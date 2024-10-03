import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <div className='footer-body'>
        <div className = 'footer-container'>
            <div className = 'footer-language-container'>
                <span>English(US)</span>
                <span>Spanish</span>
                <span>French</span>
                <span>Chinese</span>
                <span>Arabic</span>
                <span>Portguese</span>
                <span>Italian</span>
                <span>Korean</span>
                <span>Dutch</span>
                <span>Japanese</span>
            </div>
            <div className = 'footer-copyright'>
                <small>Feta @ 2024</small> 
            </div>
        </div>
    </div>
  )
}

export default Footer