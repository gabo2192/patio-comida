/**@jsx jsx */
import { jsx } from 'theme-ui';
import NavLink from './nav-link';

const NavLinks = () => {
  const pages = [
    {
      href: '/',
      text: 'Home',
    },
    {
      href: '/',
      text: 'Comida',
    },
    {
      href: '/',
      text: 'Restaurantes',
    },
    {
      href: '/',
      text: 'Canasta',
    },
    {
      href: '/',
      text: 'Mi Cuenta',
    },
    {
      href: '/',
      text: 'Comenzar a vender',
    },
  ];
  return (
    <nav>
      {pages.map((page) => (
        <NavLink key={page.text} href={page.href} text={page.text} />
      ))}
    </nav>
  );
};

export default NavLinks;
