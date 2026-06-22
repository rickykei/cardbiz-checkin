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

  const handleScan = useCallback(async (staffId) => {
    if (isProcessing.current) return
    isProcessing.current = true

    try {
      const scanDate = new Date()
      await axios.post('/api/checkin/in', {
        staffId,
        scanDate
      })
      setMsg(`Check In success，員工編號：${staffId}`)
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
    if (!scanning) return

    const reader = new BrowserMultiFormatReader()
    readerRef.current = reader

    reader.decodeFromVideoDevice(undefined, videoRef.current, (result) => {
      if (result) {
        const resultText = result.text
        // 實時更新QR內容（URL/文字）
        setQrContent(resultText)
        handleScan(resultText)
      }
    })

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

              {/* 顯示QR Code內的URL/文字內容 */}
              {qrContent && (
                <div className="alert alert-info mb-3">
                  <strong>QR Code 內容：</strong>
                  <p className="mb-0 mt-1 break-all">{qrContent}</p>
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