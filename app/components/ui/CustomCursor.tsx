'use client'

import { useEffect, useState } from 'react'

export function CustomCursor() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768
      setIsMobile(mobile)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return // Don't initialize cursor on mobile

    const cursorDot = document.querySelector('.cursor-dot') as HTMLElement
    const cursorOutline = document.querySelector('.cursor-outline') as HTMLElement

    if (!cursorDot || !cursorOutline) return

    let requestRef: number
    let previousTime: number
    let cursorX = 0
    let cursorY = 0
    let outlineX = 0
    let outlineY = 0

    const animate = (time: number) => {
      if (previousTime !== undefined) {
        // Linear interpolation for smooth trailing effect on the outline
        outlineX += (cursorX - outlineX) * 0.15
        outlineY += (cursorY - outlineY) * 0.15
        
        cursorDot.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`
        cursorOutline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`
      }
      
      previousTime = time
      requestRef = requestAnimationFrame(animate)
    }
  
    const handleMouseMove = (e: MouseEvent) => {
      cursorX = e.clientX
      cursorY = e.clientY
    }
    
    // Start animation loop
    requestRef = requestAnimationFrame(animate)

    const handleMouseEnter = () => {
      document.body.classList.add('hovering')
    }

    const handleMouseLeave = () => {
      document.body.classList.remove('hovering')
    }

    document.addEventListener('mousemove', handleMouseMove)

    const interactiveElements = document.querySelectorAll(
      'a, button, [data-magnetic]'
    )
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(requestRef)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [isMobile])

  // Don't render cursor elements on mobile
  if (isMobile) return null

  return (
    <>
      <div className="cursor-dot"></div>
      <div className="cursor-outline"></div>
    </>
  )
}
