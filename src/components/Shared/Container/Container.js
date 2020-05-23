import React, { useState } from 'react';

import './Container.css';

const Container = (props) => {
  const [collapsed, setCollapsed] = useState(!props.visible);

  return (
    <div className="container" style={{ width: props.width || 'auto' }}>
      <div className="section" onClick={() => setCollapsed(!collapsed)}>
        {props.title}
      </div>
      {collapsed ? null : props.children}
    </div>
  );
};

export default Container;
