/**@jsx jsx */
import { jsx } from 'theme-ui';
import { useState } from 'react';
import { navigate } from 'gatsby';
//CATEGORIES

import ProductPreview from '../../market/product-preview';
import FirstPart from './first-part';
import SecondPart from './second-part';
import Message from '../../ui/message';
import ThirdPart from './third-part';

const AddProduct = ({ getTokenSilently }) => {
  const [state, setState] = useState({
    title: '',
    description: '',
    image:
      (localStorage ? localStorage.getItem('dish-image-market') : '') || '',
    featured: false,
    frequency: false,
    schedule: false,
    stock: '',
    price: '',
    categories: [],
    step: 1,
  });

  const handleFoward = () => {
    setState((current) => ({ ...current, step: current.step + 1 }));
  };
  const handleBefore = () => {
    setState((current) => ({ ...current, step: current.step - 1 }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      title,
      description,
      image,
      featured,
      frequency,
      schedule,
      stock,
      price,
      categories,
    } = state;

    if (!title || !description || !image || !stock || !price || !categories) {
      setTimeout(() => {}, 2000);
      return;
    }
    const postBody = {
      title,
      description,
      image,
      featured,
      frequency,
      schedule,
      stock,
      price,
      categories,
    };
    try {
      const token = await getTokenSilently();
      const res = await fetch('/.netlify/functions/createProduct', {
        method: 'POST',
        body: JSON.stringify(postBody),
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        navigate('cuenta/vender/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const name = e.target.name;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'food-market');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dbravos/image/upload',
      {
        method: 'POST',
        body: data,
      },
    );
    const file = await res.json();
    console.log(file);
    if (file) {
      const transformation = 'upload/ar_16:9,c_fill/';
      const newUrl = file.secure_url.split('upload/');
      localStorage.setItem(
        `${name}-market`,
        newUrl[0] + transformation + newUrl[1],
      );
      setState((current) => ({
        ...current,
        image: newUrl[0] + transformation + newUrl[1],
      }));
    }
  };

  const handleCategory = (e, value) => {
    e.preventDefault();
    state.categories.includes(value)
      ? setState((current) => ({
          ...current,
          categories: current.categories.filter(
            (category) => !category.includes(value),
          ),
        }))
      : setState((current) => ({
          ...current,
          categories: [...current.categories, value],
        }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    type === 'checkbox'
      ? setState((current) => ({ ...current, [name]: checked }))
      : setState((current) => ({ ...current, [name]: value }));
  };
  const product = {
    title: state.title || 'Acá va el título',
    description:
      state.description ||
      'Acá puedes poner la mejor descripción e insumos que usas para preparar el platillo. Trata de ser muy específico para conseguir muchos clientes.',
    image: state.image,
    price: state.price,
    stock: state.stock,
  };

  return (
    <div sx={{ variant: 'container.grid' }}>
      <form onSubmit={handleSubmit} sx={{ variant: 'form.primary' }}>
        <div>
          <h1 sx={{ variant: 'text.heading', textAlign: 'center' }}>
            Agregar un plato
          </h1>
          <p>Necesitamos datos básicos de tu plato</p>
        </div>
        {state.step === 1 && (
          <FirstPart
            product={state}
            handleChange={handleChange}
            handleImage={uploadImage}
            handleFoward={handleFoward}
          />
        )}
        {state.step === 2 && (
          <SecondPart
            product={state}
            handleChange={handleChange}
            handleBefore={handleBefore}
            handleFoward={handleFoward}
            handleCategory={handleCategory}
            handleSubmit={handleSubmit}
          />
        )}
      </form>
      <div>
        <ProductPreview product={product} />
      </div>
    </div>
  );
};

export default AddProduct;
