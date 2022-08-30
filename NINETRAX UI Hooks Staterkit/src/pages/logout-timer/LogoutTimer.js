import React, { useState, useEffect } from "react"
import { useIdleTimer } from "react-idle-timer"
import appSettings from "../../app-settings.json"
import { useHistory } from "react-router-dom"
import { clearToken } from "../../services/auth-service"

export default function ReactTimer() {
  const timeout = appSettings.IDLE_OUT_TIME //3000

  const [remaining, setRemaining] = useState(timeout)

  let history = useHistory()
  const logout = () => {
    console.log("logout On Idle Time!")
    clearToken().then(() => {
      history.push("/login")
    })
  }

  const { getRemainingTime } = useIdleTimer({
    timeout,
    onIdle: logout,
  })

  useEffect(() => {
    setRemaining(getRemainingTime())
    setInterval(() => {
      setRemaining(getRemainingTime())
    }, 1000)
  }, [])

  return (
    <div>
      {/* <div>
        <ul>
          <li>Timeout: {timeout}ms</li>
          <li>Time Remaining: {remaining}</li>
        </ul>
      </div> */}
    </div>
  )
}
