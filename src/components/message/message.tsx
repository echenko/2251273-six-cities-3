import { useAppSelector } from '../../hooks/hooks';
import { getErrorType } from '../../store/selectors/error-slice';
import { CustomLoader } from '../custom-loader/custom-loader';
import './message.css';

type MessageType = {
  message: string;
}

function Message({ message }: MessageType): JSX.Element {
  const errorType = useAppSelector(getErrorType);
  return (
    <div className="message-container">
      <h2 className="message">{message}</h2>
      {errorType && <p className="message">please try again later</p>}
      {!errorType && <CustomLoader />}
    </div>
  );
}

export { Message };
