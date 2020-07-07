/**@jsx jsx */
import { jsx, Styled } from 'theme-ui';
import { Link } from 'gatsby';

const NavLink = ({ href, text }) => {
  const isExternal = href.match(/^http/);
  const Component = isExternal ? 'a' : Link;
  const props = { [isExternal ? 'href' : 'to']: href };
  return (
    <Styled.a as={Component} {...props} sx={{ textAlign: 'center' }}>
      {text}
    </Styled.a>
  );
};

export default NavLink;
