import React, { Suspense } from "react";

import Handwriting from "./Handwriting";

interface LoadingProps {
  text?: string;
  children: React.ReactChildren;
}

const Loading = ({
  text = "Loading",
  children
}: LoadingProps): React.ReactChild => (
  // @ts-ignore
  <Suspense fallback={<Handwriting text={text} />}>{children}</Suspense>
);

export default Loading;
