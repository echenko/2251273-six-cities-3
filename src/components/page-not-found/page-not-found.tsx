import { Link } from 'react-router-dom';

//
type PageNotFoundProps = {
  message: string;
}

// Create PageNotFound
function PageNotFound({message}: PageNotFoundProps): JSX.Element {
  return (
    <>
      <h1>{message}</h1>
      <Link to="/">Go to main page</Link>
    </>
  );
}

// Export PageNotFound
export { PageNotFound };
