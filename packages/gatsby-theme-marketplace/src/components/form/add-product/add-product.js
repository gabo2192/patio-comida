/**@jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useEffect } from 'react';

//CATEGORIES

import ProductPreview from '../../market/product-preview';
import FirstPart from './first-part';
import SecondPart from './second-part';
import Message from '../../ui/message';
import ThirdPart from './third-part';

const AddProduct = () => {
  const [state, setState] = useState({
    title: '',
    description: '',
    image:
      (localStorage ? localStorage.getItem('dish-image-market') : '') || '',
    featured: false,
    frequency: false,
    schedule: false,
    days: [],
    start: '09:00',
    finish: '22:00',
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
  const handleSubmit = (e) => {
    e.preventDefault();
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

  const handleDays = (e, value) => {
    e.preventDefault();
    console.log(state.days.length);

    state.days.includes(value)
      ? setState((current) => ({
          ...current,
          days: current.days.filter((day) => !day.includes(value)),
        }))
      : state.days.length >= 6
      ? setState((current) => ({
          ...current,
          frequency: true,
          days: [...current.days, value],
        }))
      : setState((current) => ({
          ...current,
          days: [...current.days, value],
        }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(name, value, type, checked);
    if (name === 'frequency') {
      setState((current) => ({ ...current, days: [], [name]: checked }));
    }
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

  console.log(state);

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
            handleDays={handleDays}
          />
        )}
        {state.step === 3 && (
          <ThirdPart
            product={state}
            handleCategory={handleCategory}
            handleBefore={handleBefore}
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
