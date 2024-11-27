import React from 'react';
import './index.scss';

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = (props: PageTitleProps) => {
  return (
    <div id="page-title">
      <div className="container">
        <div className="row">
          <div className="col-12 pb-3 pt-4">
            <h1>{props.title}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PageTitle };
