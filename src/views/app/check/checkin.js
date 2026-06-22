import React, { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios'
import { BrowserMultiFormatReader } from '@zxing/library'

const Checkin = () => {
  const videoRef = useRef(null)
  const readerRef = useRef(null)
  const [scanning, setScanning] = useState(true)
  const [msg, setMsg] = useState(null)
  const [isError, setIsError] = useState(false)
  const [qrContent, setQrContent] = useState('')
  const isProcessing = useRef(false)

  const handleScan = useCallback(async (resultText) => {
    if (isProcessing.current) return
    isProcessing.current = true

    try {
      const scanDate = new Date()
      await axios.post('/api/checkin/in', {
        staffId: resultText,
        scanDate
      })
      setMsg(`Check In success：${resultText}`)
      setIsError(false)
    } catch (err) {
      setMsg('Check In failed')
      setIsError(true)
      console.error(err)
    }

    setTimeout(() => {
      isProcessing.current = false
    }, 2000)
  }, [])

  useEffect(() => {
    let reader = null

    if (scanning) {
      reader = new BrowserMultiFormatReader()
      readerRef.current = reader

      reader.decodeFromVideoDevice(undefined, videoRef.current, (result) => {
        if (result) {
          const { text } = result
          setQrContent(text)
          handleScan(text)
        }
      })
    }

    return () => {
      if (readerRef.current) {
        readerRef.current.reset()
      }
    }
  }, [scanning, handleScan])

  const resetScan = () => {
    setMsg(null)
    setIsError(false)
    setQrContent('')
    isProcessing.current = false
    setScanning(true)
  }

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

              {qrContent && (
                <div className="alert alert-info mb-3">
                  <strong>QR Code 內容：</strong>
                  <p className="mb-0 mt-1 text-break">{qrContent}</p>
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
                onClick={resetScan}
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