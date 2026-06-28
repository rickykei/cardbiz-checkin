import React, { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios'
import { BrowserMultiFormatReader } from '@zxing/library'
import * as CryptoJS from 'crypto-js';

// 專用解密：直接解你呢組
// U2FsdGVkX18TI5NhBcqK3wH/JdD65NHAZm59F1ju67NUoJr9/w3TL1Ep/mqixlTC
// → 6a15a72fe5b50d06026cc54d
function decrypt(text, secretKey) {
  const decrypted = CryptoJS.AES.decrypt(text,secretKey ,{
   mode: CryptoJS.mode.CBC,
   padding: CryptoJS.pad.Pkcs7
 }).toString();
 return decrypted;
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

          const query = text.split('?')[1] ?? ''
          const params = new URLSearchParams(query)
          const key = params.get('key') ?? ''
          setEncryptKey(key)

          if (key) {
            const decryptedId =encodeURIComponent(decrypt(key,'12345678123456781234567812345678'))
            console.log('解密結果：', decryptedId)
            setStaffId(decryptedId)
            if (decryptedId) {
              handleScan(decryptedId)
            }
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
                    員工編號：{staffId}
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