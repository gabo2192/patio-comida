/**@jsx jsx */

import { jsx } from 'theme-ui';
import { Fragment } from 'react';

import { FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { AiFillShop } from 'react-icons/ai';

import { BsImage } from 'react-icons/bs';
import Input from '../input';

const FirstPart = ({ handleFoward, handleChange, uploadImage, store }) => {
  return (
    <Fragment>
      <div>
        <Input
          name="name"
          type="text"
          placeholder="Escribe el nombre de tu restaurante..."
          value={store.name}
          handleChange={handleChange}
        >
          <AiFillShop />
        </Input>
        <Input
          name="logo"
          type="file"
          placeholder={
            store.logo
              ? 'Editar el logo de tu tienda'
              : 'Sube el logo de tu restaurante...'
          }
          handleChange={uploadImage}
          exists={store.logo}
        >
          <BsImage />
        </Input>
        <Input
          name="image"
          type="file"
          placeholder={
            store.image
              ? 'Editar la imagen principal'
              : 'Necesitamos una imagen principal...'
          }
          handleChange={uploadImage}
          exists={store.image}
        >
          <BsImage />
        </Input>
        <Input
          name="email"
          type="text"
          placeholder="Escribe el nombre de tu restaurante..."
          value={store.email}
          handleChange={handleChange}
        >
          <MdEmail />
        </Input>
        <Input
          name="phone"
          type="text"
          placeholder="Escribe el nombre de tu restaurante..."
          value={store.phone}
          handleChange={handleChange}
        >
          <FaPhoneAlt />
        </Input>
      </div>
      <p sx={{ textAlign: 'center' }}>
        <input
          aria-label="next"
          type="button"
          onClick={handleFoward}
          value="Siguiente"
          disabled={
            !store.name ||
            !store.logo ||
            !store.image ||
            !store.categories ||
            !store.services
          }
          sx={
            !store.name ||
            !store.logo ||
            !store.image ||
            !store.categories ||
            !store.services
              ? {
                  opacity: '0.5',
                  variant: 'button.secondary',
                }
              : { variant: 'button.secondary' }
          }
        />
      </p>
    </Fragment>
  );
};

export default FirstPart;
