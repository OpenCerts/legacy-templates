import mockData from './test2.json';
import React from 'react';
import { 
  issueCertificate
} from "@govtechsg/open-certificate";

const Test = () => {
  return (
    <div>
      {JSON.stringify(issueCertificate(mockData))}
    </div>
  );
}

export default Test;