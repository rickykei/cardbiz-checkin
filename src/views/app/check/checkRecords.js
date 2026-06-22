import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Checkrecords = () => {
  const [records, setRecords] = useState({
    checkins: [],
    checkouts: []
  })

  useEffect(() => {
    const getRecords = async () => {
      try {
        const res = await request.get('/api/checkin/records')
        setRecords(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getRecords()
  }, [])

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box">
            <h4 className="page-title">Check Records</h4>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Check In</h5>
            </div>
            <div className="card-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {records.checkins.map((item, idx) => (
                <div key={idx} className="mb-2 pb-2 border-bottom">
                  <strong>{item.staffId}</strong>
                  <br />
                  {new Date(item.scanDate).toLocaleString()}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Check Out</h5>
            </div>
            <div className="card-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {records.checkouts.map((item, idx) => (
                <div key={idx} className="mb-2 pb-2 border-bottom">
                  <strong>{item.staffId}</strong>
                  <br />
                  {new Date(item.scanDate).toLocaleString()}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkrecords