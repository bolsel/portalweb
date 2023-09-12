import React, { ReactNode } from 'react';
import Jumbotron, { JumbotronProps } from '../jumbotron/jumbotron';

export interface PageHeadContainerProps {
  jumbotron: JumbotronProps;
  children: ReactNode;
}

export default function PageWithJumbotron({
  children,
  jumbotron,
}: PageHeadContainerProps) {
  return (
    <main>
      <Jumbotron {...jumbotron} />
      <section className="w-full">
        <div className="ui-container relative -top-24 z-20">
          <div className="px-3 md:px-4 lg:px-6 py-8 rounded-xl shadow bg-white flex flex-col gap-2 justify-center items-center">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
