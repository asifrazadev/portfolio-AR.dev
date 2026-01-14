'use client'

import { useEffect, useRef } from 'react'
import { useIsMobile } from '@/app/hooks/useIsMobile'

export function CustomCursor() {
  const isMobile = useIsMobile()
  const dotRef = useRef<HTMLDivElement>(null)
  const outlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isMobile) return

    const cursorDot = dotRef.current
    const cursorOutline = outlineRef.current

    if (!cursorDot || !cursorOutline) return

    let requestRef: number
    let previousTime: number
    let cursorX = 0
    let cursorY = 0
    let outlineX = 0
    let outlineY = 0

    const animate = (time: number) => {
      if (previousTime !== undefined) {
        outlineX += (cursorX - outlineX) * 0.15
        outlineY += (cursorY - outlineY) * 0.15
        
        cursorDot.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`
        cursorOutline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`
      }
      
      previousTime = time
      requestRef = requestAnimationFrame(animate)
    }
  
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorDot.style.opacity === '' || cursorDot.style.opacity === '0') {
          cursorDot.style.opacity = '1'
          cursorOutline.style.opacity = '1'
      }
      cursorX = e.clientX
      cursorY = e.clientY
    }
    
    requestRef = requestAnimationFrame(animate)

    // Event Delegation: Handle all interactive elements (even dynamic ones)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [data-magnetic], input, textarea, select, [role="button"]')
      
      if (interactive) {
          document.body.classList.add('hovering')
      } else {
          document.body.classList.remove('hovering')
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
        // Only remove if we are actually leaving an interactive element, 
        // not just moving between children of the same interactive element
        const related = e.relatedTarget as HTMLElement
        const target = e.target as HTMLElement
        
        const isInteractive = target.closest('a, button, [data-magnetic], input, textarea, select, [role="button"]')
        
        // If we moved to something that is NOT interactive (or outside), remove class
        if (isInteractive && (!related || !related.closest('a, button, [data-magnetic], input, textarea, select, [role="button"]'))) {
             document.body.classList.remove('hovering')
        }
    }

    // Attach listeners to window for delegation
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
      
      cancelAnimationFrame(requestRef)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot"></div>
      <div ref={outlineRef} className="cursor-outline"></div>
    </>
  )
}
