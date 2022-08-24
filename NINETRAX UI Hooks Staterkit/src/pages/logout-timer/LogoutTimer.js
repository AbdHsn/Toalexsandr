import React, { useState, useEffect } from "react"
import { useIdleTimer } from "react-idle-timer"
import appSettings from "../../app-settings.json"

export default function ReactTimer() {
  const timeout = appSettings.IDLE_OUT_TIME;//3000
  
  const [remaining, setRemaining] = useState(timeout)

  const handleOnIdle = () => {
    // SHOW YOUR MODAL HERE AND LoGOUT
    console.log("The user has been logged out...")
   // toast.info("You have been logged out.", { autoClose: 2000 })
    // window.location = '/';
  }

  const { getRemainingTime } = useIdleTimer({
    timeout,
    onIdle: handleOnIdle,
  })

  useEffect(() => {
    setRemaining(getRemainingTime())

    console.log("logout timmer is called.");

    setInterval(() => {
      setRemaining(getRemainingTime())
    }, 1000)
  }, [])

  return (
    <div>
      <div>
        <ul>
          <li>Timeout: {timeout}ms</li>
          <li>Time Remaining: {remaining}</li>
        </ul>
      </div>
    </div>
  )
}
