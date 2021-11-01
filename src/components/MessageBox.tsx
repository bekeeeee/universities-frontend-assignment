const MessageBox = (props:any) => {
  return (
    <div className={`alert alert-${props.variant || "info"}`}>
      {props.children}
    </div>
  );
};

export default MessageBox;
