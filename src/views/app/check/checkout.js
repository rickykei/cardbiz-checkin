import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { BrowserMultiFormatReader } from '@zxing/library'

const Checkout = () => {
  const videoRef = useRef(null)
  const [scanning, setScanning] = useState(true)
  const [msg, setMsg] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (!scanning) return

    const reader = new BrowserMultiFormatReader()
    reader.decodeFromVideoDevice(undefined, videoRef.current, (result) => {
      if (result) {
        handleScan(result.text)
        setScanning(false)
      }
    })

    return () => {
      reader.reset()
    }
  }, [scanning])

  const handleScan = async (staffId) => {
    try {
      const scanDate = new Date()
      await axios.post('/api/checkin/out', {
        staffId,
        scanDate
      })
      setMsg('Check Out success')
      setIsError(false)
    } catch (err) {
      setMsg('Check Out failed')
      setIsError(true)
      console.error(err)
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box">
            <h4 className="page-title">Check Out</h4>
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
                  />
                </div>
              )}

              {msg && (
                <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`}>
                  {msg}
                </div>
              )}

              <button
                className="btn btn-danger mt-2"
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

export default Checkout