export const ErrorMessage = (props) => {
  const { error } = props;

  return <span>Error {error.code}: {error.message}</span>;
};
