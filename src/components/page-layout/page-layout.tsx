import React from 'react';
import './styles/reset.css';
import './styles/common.css';
import styles from './page-layout.module.css';

interface LayoutProps {
  title: string;
  content: React.ReactElement;
}

const PageLayout = (props: LayoutProps): React.ReactElement => (
  <React.Fragment>
    <div className={styles.page}>
      <h1 className={styles.title}>{props.title}</h1>
      <div className={styles.content}>{props.content}</div>
    </div>
  </React.Fragment>
);

export default PageLayout;
