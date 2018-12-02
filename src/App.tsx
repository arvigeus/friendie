import React from "react";

import GlobalStyle from "./style/GlobalStyle";

const App = (): JSX.Element => (
  <>
    <GlobalStyle />
    <main>
      <h1 id="friendie">Friendie</h1>
      <p>A social framework for building friendships</p>
    </main>
  </>
);

export default App;
