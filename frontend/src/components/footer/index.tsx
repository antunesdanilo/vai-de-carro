import React from 'react';
import './index.scss';

const Footer: React.FC = () => {
  return (
    <div id="footer">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="brand">
              <img src="/logo.png"></img>
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-end align-items-center copyright">
            <div>
              Todos os direitos reservados <br /> VaiDeCarro © 2024
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Footer };
