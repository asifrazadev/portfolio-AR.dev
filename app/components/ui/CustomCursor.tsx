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

    const handleMouseMove = (e: MouseEvent) => {
      const posX = e.clientX
      const posY = e.clientY

      cursorDot.style.left = `${posX}px`
      cursorDot.style.top = `${posY}px`

      cursorOutline.style.left = `${posX}px`
      cursorOutline.style.top = `${posY}px`
    }

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
