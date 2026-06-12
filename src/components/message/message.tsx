import { useAppSelector } from '../../hooks/hooks';
import { getErrorType } from '../../store/selectors/error-slice';
import { CustomLoader } from '../custom-loader/custom-loader';
import { TYPE_OF_ERROR, SYSTEM_MESSAGE } from '../../const';
import './message.css';

function Message(): JSX.Element {
  const errorType = useAppSelector(getErrorType);
  function getMessageError() {
    if (errorType === TYPE_OF_ERROR.ERROR_LOADING_OFFERS) {
      return SYSTEM_MESSAGE.ERROR_LOADING_OFFERS;
    } else if (errorType === TYPE_OF_ERROR.ERROR_LOADING_OFFER) {
      return SYSTEM_MESSAGE.ERROR_LOADING_OFFER;
    } else if (errorType === TYPE_OF_ERROR.ERROR_LOADING_COMMENTS) {
      return SYSTEM_MESSAGE.ERROR_LOADING_COMMENTS;
    } else if (errorType === TYPE_OF_ERROR.ERROR_LOADING_NEAR_OFFERS) {
      return SYSTEM_MESSAGE.ERROR_LOADING_NEAR_OFFERS;
    } else if (errorType === TYPE_OF_ERROR.ERROR_LOGIN) {
      return SYSTEM_MESSAGE.ERROR_LOGIN;
    } else if (errorType === TYPE_OF_ERROR.ERROR_LOGIN_EMAIL) {
      return SYSTEM_MESSAGE.ERROR_LOGIN_EMAIL;
    } else if (errorType === TYPE_OF_ERROR.ERROR_LOGIN_PASSWORD) {
      return SYSTEM_MESSAGE.ERROR_LOGIN_PASSWORD;
    }
  }


  return (
    <div className="message-container">
      <h2 className="message message--error">{getMessageError()}</h2>
      {!errorType && <CustomLoader />}
    </div>
  );
}

export { Message };
