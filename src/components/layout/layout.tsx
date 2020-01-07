import React from 'react';
import './reset.css';
import './layout.css';

interface LayoutProps {
  children: React.ReactElement;
}

const Layout = ({ children }: LayoutProps): React.ReactElement => (
  <React.Fragment>{children}</React.Fragment>
);

export default Layout;
