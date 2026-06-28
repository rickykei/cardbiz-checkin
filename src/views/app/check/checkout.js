import React, { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios'
import { BrowserMultiFormatReader } from '@zxing/library'
import CryptoJS from 'crypto-js'
import { servicePath2 } from 'constants/defaultValues'
import IntlMessages from 'helpers/IntlMessages';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

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

const Checkout = ({ intl, match, currentUser }) => {
  const videoRef = useRef(null)
  const readerRef = useRef(null)
  const { messages } = intl;
  const [scanning, setScanning] = useState(true)
  const [msg, setMsg] = useState(null)
  const [isError, setIsError] = useState(false)
  const [fullQrUrl, setFullQrUrl] = useState('')
  const [encryptKey, setEncryptKey] = useState('')
  const [staffId, setStaffId] = useState('')

  const isProcessing = useRef(false)
  const lastStaffId = useRef(null)
  const apiUrl = `${servicePath2}/checkin/out`

  const handleScan = useCallback(async (id) => {
    if (!id) return

    if (id === lastStaffId.current) {
      isProcessing.current = false
      return
    }
    lastStaffId.current = id

    try {
      const token = localStorage.getItem('token')
      const res = await axios.post(apiUrl, {
        staffId: id,
        companyId: currentUser.companyId,
        scanDate: new Date()
      }, {
        headers: { token }
      })

      const { fname, lname } = res.data;
      const fullName = `${fname} ${lname}`.trim();
      setMsg(`Check Out 成功：${fullName} (${id})`);
      setIsError(false)
    } catch (err) {
      console.error('簽退失敗', err.response?.data)
      setMsg(err.response?.data?.message || '簽退失敗')
      setIsError(true)
    } finally {
      isProcessing.current = false
    }
  }, [apiUrl, currentUser.companyId])

  useEffect(() => {
    if (!scanning) return undefined
    const reader = new BrowserMultiFormatReader()
    readerRef.current = reader

    reader.decodeFromVideoDevice(undefined, videoRef.current, (result) => {
      if (isProcessing.current || !result) return
      const { text } = result

      try {
        const url = new URL(text)
        const key = url.searchParams.get('key')
        if (!key) return

        isProcessing.current = true
        setFullQrUrl(text)
        setEncryptKey(key)
        const decryptedId = AES_DECRYPT(key)
        setStaffId(decryptedId)

        if (decryptedId) {
          handleScan(decryptedId)
        } else {
          setMsg('無效員工編號')
          setIsError(true)
          isProcessing.current = false
        }
      } catch (e) {
        console.warn('無效 QR Code', text)
        isProcessing.current = false
      }
    })

    return () => reader.reset()
  }, [scanning, handleScan])

  const resetScan = () => {
    setMsg(null)
    setIsError(false)
    setFullQrUrl('')
    setEncryptKey('')
    setStaffId('')
    lastStaffId.current = null
    isProcessing.current = false
    setScanning(true)
  }

  return (
    <div className="container-fluid" match={match}>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box">
            <h4 className="page-title"><IntlMessages id="pages.checkout" />Check OUT</h4>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <video ref={videoRef} className="w-100" playsInline autoPlay muted />

              {fullQrUrl && (
                <div className="alert alert-info mb-3">
                  <div>{messages['forms.checkout-URL：']} URL：{fullQrUrl}</div>
                  <div>加密 Key：{encryptKey}</div>
                  <div className="fw-bold text-success">員工編號：{staffId || '解密失敗'}</div>
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

const mapStateToProps = ({ authUser }) => ({ currentUser: authUser.currentUser })
export default injectIntl(connect(mapStateToProps)(Checkout))