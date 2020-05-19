import React from 'react';

import Container from '../../Shared/Container/Container';

import './Serial.css';

const Serial = (props) => {
  const { serial } = props;
  return (
    <Container title="Serial transfer">
      <div className="data">
        {serial
          .getSentBytes()
          .map((b) => String.fromCharCode(b))
          .join('')}
      </div>
    </Container>
  );
};

export default Serial;
