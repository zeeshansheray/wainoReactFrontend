import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const OutsetaLoginWidget = () => {
  useEffect(() => {
    var o_options = {
      domain: 'waino.outseta.com',
      load: 'nocode'
    };

    const script = document.createElement('script');
    script.src = 'https://cdn.outseta.com/outseta.min.js';
    script.dataset.options = JSON.stringify(o_options);
    script.async = true;

    document.getElementById('login-embed').appendChild(script);

    return () => {
      document.getElementById('login-embed').removeChild(script);
    };
  }, []);

  return (
    <>
      <Helmet>
        {/* Add any additional meta tags or head elements here */}
      </Helmet>
      <div id="login-embed"></div>
    </>
  );
};

export default OutsetaLoginWidget;
