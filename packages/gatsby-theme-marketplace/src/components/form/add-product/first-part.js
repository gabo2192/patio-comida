/**@jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';

//ICONS
import { FaHamburger, FaPen, FaBarcode } from 'react-icons/fa';
import { GiPriceTag } from 'react-icons/gi';
import { BsImage } from 'react-icons/bs';

import Input from '../input';

const FirstPart = ({ product, handleChange, handleImage, handleFoward }) => {
  const { title, image, description, price, stock } = product;
  return (
    <Fragment>
      <div>
        <Input
          name="title"
          placeholder="Ponle un nombre..."
          type="text"
          value={title}
          handleChange={handleChange}
        >
          <FaHamburger />
        </Input>
        <Input
          name="description"
          placeholder="Descríbelo..."
          type="text"
          value={description}
          handleChange={handleChange}
        >
          <FaPen />
        </Input>
        <Input
          name="price"
          type="number"
          placeholder="Ponle un precio..."
          value={price}
          handleChange={handleChange}
        >
          <GiPriceTag />
        </Input>
        <Input
          name="dish-image"
          type="file"
          placeholder={image ? 'Edita la imagen' : 'Ponle una imagen...'}
          handleChange={handleImage}
          exists={image}
        >
          <BsImage />
        </Input>
        <h3 sx={{ variant: 'text.heading' }}>
          ¿Cuántos platos preparas diariamente?
        </h3>
        <Input
          name="stock"
          type="number"
          placeholder="Pon la cantidad de platos que preparas..."
          value={stock}
          handleChange={handleChange}
        >
          <FaBarcode />
        </Input>
      </div>
      <p
        sx={{
          textAlign: 'center',
        }}
      >
        <input
          aria-label="next"
          type="button"
          onClick={handleFoward}
          value="Siguiente"
          /*           disabled={!title || !description || !image || !price || !stock}
           */ sx={
            /*  !title || !description || !image || !price || !stock
              ? {
                  opacity: '0.5',
                  variant: 'button.secondary',
                }
              : */ {
              variant: 'button.secondary',
            }
          }
        />
      </p>
    </Fragment>
  );
};

export default FirstPart;
