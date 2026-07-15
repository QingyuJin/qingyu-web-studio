import { useEffect } from "react"

const INTERACTIVE_SELECTOR =
  "button, a[href], input, select, textarea, [role='button'], [tabindex='0']"

function InteractionFeedback() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    function handlePointerDown(event) {
      const target = event.target.closest(INTERACTIVE_SELECTOR)
      if (!target || target.disabled || target.getAttribute("aria-disabled") === "true") return

      target.dataset.pressed = "true"
      window.setTimeout(() => {
        delete target.dataset.pressed
      }, 180)

      if (reducedMotion.matches) return

      const burst = document.createElement("span")
      burst.className = `warm-burst ${event.pointerType === "touch" ? "touch" : ""}`
      burst.style.left = `${event.clientX}px`
      burst.style.top = `${event.clientY}px`
      burst.innerHTML = `
        <span class="warm-ring"></span>
        <span class="warm-ring warm-ring-soft"></span>
        <span class="warm-dot"></span>
      `
      document.body.appendChild(burst)
      window.setTimeout(() => burst.remove(), 760)
    }

    document.addEventListener("pointerdown", handlePointerDown, { passive: true })

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
    }
  }, [])

  return null
}

export default InteractionFeedback
