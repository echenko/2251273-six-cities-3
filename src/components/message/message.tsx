type MessageType = {
  message: string;
}

function Message({message}: MessageType): JSX.Element {
  return (
    <h1>{message}</h1>
  );
}

export { Message };
