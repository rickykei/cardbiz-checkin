import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { BrowserMultiFormatReader } from '@zxing/library'

const Checkin = () => {
  const videoRef = useRef(null)
  const [scanning, setScanning] = useState(true)
  const [msg, setMsg] = useState(null)
  const [isError, setIsError] = useState(false)

  const handleScan = async (staffId) => {
    try {
      const scanDate = new Date()
      await axios.post('/api/checkin/in', {
        staffId,
        scanDate
      })
      setMsg('Check In success')
      setIsError(false)
    } catch (err) {
      setMsg('Check In failed')
      setIsError(true)
      console.error(err)
    }
  }

  useEffect(() => {
    let reader = null

    if (scanning) {
      reader = new BrowserMultiFormatReader()
      reader.decodeFromVideoDevice(undefined, videoRef.current, (result) => {
        if (result) {
          handleScan(result.text)
          setScanning(false)
        }
      })
    }

    return () => {
      if (reader) {
        reader.reset()
      }
    }
  }, [scanning])

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box">
            <h4 className="page-title">Check In</h4>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              {scanning && (
                <div className="bg-dark p-1 border rounded mb-3">
                  <video
                    ref={videoRef}
                    className="w-100"
                    playsInline
                    autoPlay
                    muted
                  />
                </div>
              )}

              {msg && (
                <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`}>
                  {msg}
                </div>
              )}

              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={() => {
                  setMsg(null)
                  setScanning(true)
                }}
              >
                Scan Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkin