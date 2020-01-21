import React from 'react';
import PageLayout from '../components/page-layout/page-layout';

const title = 'Handle the types distinguished in a runtime';
const codeOne = `interface Response {
  price?: string;
  errorText?: string;
}
`;

const codeTwo = `interface TileInfo {
  price: string;
}

interface TileError {
  errorText: string;
}

type TileData = TileInfo | TileError;
`;

const codeThree = `//this won't work
{
  (TileInfo as data) && data.price;
}

// you have to cast type each time to make it valid
{
  (TileInfo as data) && (TileInfo as data).price;
}

// type guarding looks better this time
{
  'price' in data && data.price;
}
`;

const content = () => (
  <React.Fragment>
    <p>
      Often, you have while using typescript you have to handle situations when you don’t know the
      type beforehand, during the compile type, for sure. For example, you may easily get an error
      instead of expected data as a result of a call to a REST API.
    </p>
    <p>
      The <code>naive</code> solution is to make all the properties optional. But it won’t prevent
      you from calling expected data from the error object.
    </p>
    <pre>{codeOne}</pre>
    <p>
      It works because there are no further attempts to reach data which may be not available. Next
      example will show it better.
    </p>
    <pre>{codeTwo}</pre>
    <pre>{codeThree}</pre>
    <p>Both variants are ok when used appropriately to a situation.</p>

    <h2 id="links">Links</h2>
    <ul>
      <li>
        Discriminated unions{' '}
        <a href="http://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions">
          http://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
        </a>
      </li>
      <li>
        Type guarding with the <code>in</code> operator{' '}
        <a href="http://www.typescriptlang.org/docs/handbook/advanced-types.html#using-the-in-operator">
          http://www.typescriptlang.org/docs/handbook/advanced-types.html#using-the-in-operator
        </a>
      </li>
      <li>
        Type guards and type assertions{' '}
        <a href="http://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-type-assertions">
          http://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-type-assertions
        </a>
      </li>
    </ul>
    <p>
      The combination of these two approaches may help to work safely with the inputs that may
      provide different types.
    </p>
  </React.Fragment>
);

const Page = (): React.ReactElement => {
  return <PageLayout title={title} content={content()} />;
};

export default Page;
