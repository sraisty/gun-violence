import * as React from 'react';

export type FrontendProps = {};

const Frontend: React.FC<FrontendProps> = ({ children }) => {
  return <div>Frontend{children}</div>;
};

Frontend.displayName = 'Frontend';
export default Frontend;
