/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { adminRoot, currentUser } from 'constants/defaultValues';
import { setCurrentUser } from 'helpers/Utils';
import authService from 'services/auth.service';
import { auth } from 'helpers/Firebase'; 
 
import {
  LOGIN_USER,
  VERIFY_TOKEN,
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from '../contants';

import {
  loginUserSuccess,
  loginUserError,
  verifyTokenSuccess,
  verifyTokenError,
  registerUserSuccess,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
} from './actions';

 


export function* watchLoginUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginWithEmailPasswordAsync = async (email, password) =>
  // eslint-disable-next-line no-return-await
  await authService.login(email, password)
    .then((user) => user)
    .catch((error) => error);

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const loginUser = yield call(loginWithEmailPasswordAsync, email, password);
    if (!loginUser.message) {
      const item = { uid: loginUser.id, role: loginUser.role, companyId: loginUser.company_id,username: loginUser.username, logo: loginUser.logo,...currentUser };
      const pcitem = { uid: loginUser.id, role: loginUser.role, companyId: loginUser.company_id, email,  password,logo: loginUser.logo,...currentUser };
     
      console.log(loginUser.two_factor);
      if (loginUser.two_factor === true){
        yield put(loginUserSuccess(pcitem));
        setCurrentUser();
        history.push("/user/verify-token"); 
      }else{
        
        yield put(loginUserSuccess(item));
        setCurrentUser(item);
         history.push(adminRoot);
      }
    } else {
      yield put(loginUserError(loginUser.message));
    }
  } catch (error) {
    yield put(loginUserError(error));
  }
}


export function* watchVerifyToken() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(VERIFY_TOKEN, loginWithToken);
}

const loginWithTokenAsync = async (userid,token) =>
  // eslint-disable-next-line no-return-await
  await authService.loginWithToken(userid,token)
    .then((user) => user) 
    .catch((error) => error);

function* loginWithToken({ payload }) {
  const { userid, token } = payload.user;
  const { history } = payload;
  try {
    const loginUser = yield call(loginWithTokenAsync, userid, token);
    if (!loginUser.message) {
      const item = { uid: loginUser.id, role: loginUser.role, companyId: loginUser.company_id,username: loginUser.username, logo: loginUser.logo,...currentUser };
      setCurrentUser(item);
      yield put(verifyTokenSuccess(item));
      history.push("/app");
    } else { 
      yield put(verifyTokenError(loginUser.message));
    }
  } catch (error) {
    yield put(verifyTokenError(error));
  }
}


export function* watchRegisterUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

const registerWithEmailPasswordAsync = async (email, password) =>
  // eslint-disable-next-line no-return-await
  await auth
    .createUserWithEmailAndPassword(email, password)
    .then((user) => user)
    .catch((error) => error);

function* registerWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const registerUser = yield call(
      registerWithEmailPasswordAsync,
      email,
      password
    );
    if (!registerUser.message) {
      const item = { uid: registerUser.user.uid, ...currentUser };
      setCurrentUser(item);
      yield put(registerUserSuccess(item));
      history.push(adminRoot);
    } else {
      yield put(registerUserError(registerUser.message));
    }
  } catch (error) {
    yield put(registerUserError(error));
  }
}

export function* watchLogoutUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async (history) => {
  await auth
    .signOut()
    .then((user) => user)
    .catch((error) => error);
  history.push(adminRoot);
};

function* logout({ payload }) {
  const { history } = payload;
  setCurrentUser();
  yield call(logoutAsync, history);
}

export function* watchForgotPassword() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async (email) => {
  // eslint-disable-next-line no-return-await
  return await auth
    .sendPasswordResetEmail(email)
    .then((user) => user)
    .catch((error) => error);
};

function* forgotPassword({ payload }) {
  const { email } = payload.forgotUserMail;
  try {
    const forgotPasswordStatus = yield call(forgotPasswordAsync, email);
    if (!forgotPasswordStatus) {
      yield put(forgotPasswordSuccess('success'));
    } else {
      yield put(forgotPasswordError(forgotPasswordStatus.message));
    }
  } catch (error) {
    yield put(forgotPasswordError(error));
  }
}

export function* watchResetPassword() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (resetPasswordCode, newPassword) => {
  // eslint-disable-next-line no-return-await
  return await auth
    .confirmPasswordReset(resetPasswordCode, newPassword)
    .then((user) => user)
    .catch((error) => error);
};

function* resetPassword({ payload }) {
  const { newPassword, resetPasswordCode } = payload;
  try {
    const resetPasswordStatus = yield call(
      resetPasswordAsync,
      resetPasswordCode,
      newPassword
    );
    if (!resetPasswordStatus) {
      yield put(resetPasswordSuccess('success'));
    } else {
      yield put(resetPasswordError(resetPasswordStatus.message));
    }
  } catch (error) {
    yield put(resetPasswordError(error));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchVerifyToken),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
  ]);
}
