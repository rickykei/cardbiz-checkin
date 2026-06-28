import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { servicePath2 } from 'constants/defaultValues';
import IntlMessages from 'helpers/IntlMessages';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

const CheckRecord = ({ currentUser, intl }) => {
  const { messages } = intl;
  const [checkins, setCheckins] = useState([]);
  const [checkouts, setCheckouts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 抓取数据（用 useCallback 保证依赖稳定）
  const fetchRecords = useCallback(async () => {
    if (!currentUser?.companyId) return;

    try {
      const res = await axios.post(`${servicePath2}/checkin/records`, {
        companyId: currentUser.companyId
      });

      // 只取最近 10 条
      setCheckins((res.data.checkins || []).slice(0, 10));
      setCheckouts((res.data.checkouts || []).slice(0, 10));
    } catch (err) {
      console.error('載入記錄失敗', err);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.companyId]);

  // 初始加载 + 定时每 10 秒刷新一次
  useEffect(() => {
    fetchRecords();
    const interval = setInterval(() => {
      fetchRecords();
    }, 10000); // 10 秒更新一次

    return () => clearInterval(interval);
  }, [fetchRecords]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box">
            <h4 className="page-title">
              <IntlMessages id="pages.checkrecord" /> 打卡記錄（最近10筆）
            </h4>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center">載入中...</div>
      ) : (
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">{messages['forms.checkin-records']} - Check IN</h5>
              </div>
              <div className="card-body p-0">
                <div className="list-group">
                  {checkins.length === 0 ? (
                    <div className="list-group-item">無記錄</div>
                  ) : (
                    checkins.map((item) => (
                      <div key={item.id} className="list-group-item">
                        <div className="d-flex justify-content-between">
                          <div>
                            <strong>
                              {item.staff_id?.fname} {item.staff_id?.lname}
                            </strong>
                            <br />
                            <small className="text-muted">ID: {item.staff_id?.id}</small>
                          </div>
                          <small className="text-muted">
                            {new Date(item.createdAt).toLocaleString()}
                          </small>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-warning text-dark">
                <h5 className="mb-0">{messages['forms.checkout-records']} - Check OUT</h5>
              </div>
              <div className="card-body p-0">
                <div className="list-group">
                  {checkouts.length === 0 ? (
                    <div className="list-group-item">無記錄</div>
                  ) : (
                    checkouts.map((item) => (
                      <div key={item.id} className="list-group-item">
                        <div className="d-flex justify-content-between">
                          <div>
                            <strong>
                              {item.staff_id?.fname} {item.staff_id?.lname}
                            </strong>
                            <br />
                            <small className="text-muted">ID: {item.staff_id?.id}</small>
                          </div>
                          <small className="text-muted">
                            {new Date(item.createdAt).toLocaleString()}
                          </small>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ authUser }) => ({
  currentUser: authUser.currentUser
});

export default injectIntl(connect(mapStateToProps)(CheckRecord));