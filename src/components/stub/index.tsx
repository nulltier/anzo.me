import React from 'react';
import styles from './styles.module.css';

interface StubProps {
  children: React.ReactNode;
}

const Stub = ({ children }: StubProps): React.ReactElement => (
  <div className={styles.backgroundStyles}>
    <pre className={styles.textStyles}>
      <code>{children}</code>
    </pre>
  </div>
);

export default Stub;
