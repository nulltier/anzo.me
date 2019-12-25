import React from 'react';
import Layout from '../components/layout/layout';
import Stub from '../components/stub';

const code = `
  while (vacations) {
    workingHardToStartThisSite()
  }

  if (vacationsIsOver) {
    workEvenHarder()
  }
`;

const Page = (): React.ReactElement => {
  return (
    <Layout>
      <Stub>{code}</Stub>
    </Layout>
  );
};

export default Page;
