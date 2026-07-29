import { useEffect, useRef, type ReactNode } from "react"

type RevealProps = {
  children: ReactNode
  className?: string
}

export function Reveal({ children, className = "" }: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible")
          observer.unobserve(element)
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={elementRef} className={`reveal ${className}`}>
      {children}
    </div>
  )
}
