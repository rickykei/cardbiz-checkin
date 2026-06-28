import React, { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios'
import { BrowserMultiFormatReader } from '@zxing/library'
import CryptoJS from 'crypto-js'

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

  // 確保 handleScan 內部所有路徑都沒有任何 return 回傳值
  const handleScan = useCallback(async (id) => {
    if (id) {
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
        isProcessing.current = false // 打卡失敗時解鎖，允許重新嘗試
      }
    }
  }, [])

  useEffect(() => {
    if (!scanning) {
      return undefined // 明確回傳 undefined，與底下的清除函式 return 保持一致的 return 結構
    }

    const reader = new BrowserMultiFormatReader()
    readerRef.current = reader

    reader.decodeFromVideoDevice(undefined, videoRef.current, (result) => {
      // Callback 內部完全不用 return 做流程控制，改用 if 巢狀判斷
      if (!isProcessing.current && result) {
        const { text } = result
        
        try {
          const url = new URL(text)
          const key = url.searchParams.get('key') || ''
          
          if (key) {
            isProcessing.current = true // 鎖定狀態，避免重複觸發
            setFullQrUrl(text)
            setEncryptKey(key)

            const decryptedId = AES_DECRYPT(key)
            setStaffId(decryptedId)

            if (decryptedId) {
              handleScan(decryptedId)
            } else {
              setMsg('無效的員工代碼（解密失敗）')
              setIsError(true)
              isProcessing.current = false // 解密失敗就解鎖
            }
          }
        } catch (urlError) {
          console.warn('掃描到的內容不是合法的 URL:', text)
        }
      }
    })

    // useEffect 最終回傳清除函式
    return () => {
      reader.reset()
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
              <video
                ref={videoRef}
                className="w-100"
                playsInline
                autoPlay
                muted
              />

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
                重新掃描
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkin