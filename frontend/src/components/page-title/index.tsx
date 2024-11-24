import React from 'react';

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = (props: PageTitleProps) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 pb-3 pt-4">
          <h1>{props.title}</h1>
        </div>
      </div>
    </div>
  );
};

export { PageTitle };
