import React, { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios'
import { BrowserMultiFormatReader } from '@zxing/library'
import CryptoJS from 'crypto-js'

// 對應你前端加密函數的「標準解密」
function AES_DECRYPT(encryptedText) {
  try {
    const bytes = CryptoJS.AES.decrypt(
      encryptedText,
      '12345678123456781234567812345678',
      {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    )
    return bytes.toString(CryptoJS.enc.Utf8)
  } catch (e) {
    console.error('解密失敗', e)
    return ''
  }
}

const Checkin = () => {
  const videoRef = useRef(null)
  const readerRef = useRef(null)

  const [scanning, setScanning] = useState(true)
  const [msg, setMsg] = useState(null)
  const [isError, setIsError] = useState(false)
  const [fullQrUrl, setFullQrUrl] = useState('')
  const [encryptKey, setEncryptKey] = useState('')
  const [staffId, setStaffId] = useState('')

  const isProcessing = useRef(false)

  const handleScan = useCallback(async (id) => {
    if (isProcessing.current || !id) return
    isProcessing.current = true

    try {
      await axios.post('/api/checkin/in', {
        staffId: id,
        scanDate: new Date()
      })
      setMsg(`Check In 成功：${id}`)
      setIsError(false)
    } catch (err) {
      setMsg('打卡失敗')
      setIsError(true)
    }

    setTimeout(() => {
      isProcessing.current = false
    }, 2000)
  }, [])

  useEffect(() => {
    let reader = null

    if (navigator.mediaDevices && scanning) {
      reader = new BrowserMultiFormatReader()
      readerRef.current = reader

      reader.decodeFromVideoDevice(undefined, videoRef.current, (result) => {
        if (result) {
          const { text } = result
          setFullQrUrl(text)

          const url = new URL(text)
          const key = url.searchParams.get('key') ?? ''
          setEncryptKey(key)

          if (key) {
            const decryptedId = AES_DECRYPT(key)
            setStaffId(decryptedId)
            if (decryptedId) handleScan(decryptedId)
          }
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
    setFullQrUrl('')
    setEncryptKey('')
    setStaffId('')
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

              {fullQrUrl && (
                <div className="alert alert-info mb-3">
                  <div>URL：{fullQrUrl}</div>
                  <div>加密 Key：{encryptKey}</div>
                  <div className="fw-bold text-success">
                    員工編號：{staffId || '解密失敗'}
                  </div>
                </div>
              )}

              {msg && (
                <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`}>
                  {msg}
                </div>
              )}

              <button type="button" className="btn btn-primary" onClick={resetScan}>
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