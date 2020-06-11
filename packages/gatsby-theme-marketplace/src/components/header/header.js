/**@jsx jsx */
import { jsx } from 'theme-ui';

import MainBar from './main-bar';
import TopBar from './top-bar';

const Header = () => {
  return (
    <header>
      <TopBar />
      <MainBar />
    </header>
  );
};

export default Header;
