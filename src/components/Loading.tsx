import React, { Suspense } from "react";

import Handwriting from "./Handwriting";

interface ILoading {
  text?: string;
  children: React.ReactChildren;
}

const Loading = ({ text = "Loading", children }: ILoading) => (
  <Suspense fallback={<Handwriting text={text} />}>{children}</Suspense>
);

export default Loading;
