import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Checkrecords = () => {
  const [records, setRecords] = useState({
    checkins: [],
    checkouts: []
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await axios.get('/api/checkin/records')
        setRecords(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchRecords()
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

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Check In</h5>
              </div>
              <div
                className="card-body"
                style={{ maxHeight: '60vh', overflowY: 'auto' }}
              >
                {records.checkins.length === 0 ? (
                  <p className="text-muted">No records</p>
                ) : (
                  records.checkins.map((item) => (
                    <div 
                      key={`checkin-${item.staffId}-${item.scanDate}`} 
                      className="mb-2 pb-2 border-bottom"
                    >
                      <strong>{item.staffId}</strong>
                      <br />
                      <small className="text-muted">
                        {new Date(item.scanDate).toLocaleString()}
                      </small>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Check Out</h5>
              </div>
              <div
                className="card-body"
                style={{ maxHeight: '60vh', overflowY: 'auto' }}
              >
                {records.checkouts.length === 0 ? (
                  <p className="text-muted">No records</p>
                ) : (
                  records.checkouts.map((item) => (
                    <div 
                      key={`checkout-${item.staffId}-${item.scanDate}`} 
                      className="mb-2 pb-2 border-bottom"
                    >
                      <strong>{item.staffId}</strong>
                      <br />
                      <small className="text-muted">
                        {new Date(item.scanDate).toLocaleString()}
                      </small>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Checkrecords