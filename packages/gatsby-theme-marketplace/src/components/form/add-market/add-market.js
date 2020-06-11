/**@jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import { useQuery } from '@apollo/client';

import MarketPreview from '../../market/market-preview';

import { GET_ADDRESS_QUERY } from '../user-form';
import FirstPart from './first-part';
import SecondPart from './second-part';
import ThirdPart from './third-part';

const AddMarket = ({ title, sub, getTokenSilently }) => {
  const { data } = useQuery(GET_ADDRESS_QUERY);
  //MULTI STEP FORM
  const [step, setStep] = useState(1);
  //STORE STATE RELATED
  const [state, setState] = useState({
    name: '',
    logo: '',
    image: localStorage ? localStorage.getItem('image-market') : '',
    phone: '',
    email: '',
    categories: [],
    services: [],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((current) => ({ ...current, [name]: value }));
  };
  //STEP UP
  const handleBack = (e) => {
    e.preventDefault();
    setStep((current) => current - 1);
  };
  const handleFoward = (e) => {
    e.preventDefault();
    setStep((current) => current + 1);
  };
  //SERVICES && CATEGORY

  const handleService = (e, value) => {
    e.preventDefault();
    state.services.includes(value)
      ? setState((current) => ({
          ...current,
          services: current.services.filter(
            (service) => !service.includes(value),
          ),
        }))
      : setState((current) => ({
          ...current,
          services: [...current.services, value],
        }));
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

  // IMAGES UPLOAD TO CLOUDINARY
  const uploadImage = async (e) => {
    const name = e.target.name;
    const files = e.target.files;
    const data = new FormData();
    const transformation =
      name === 'logo'
        ? 'upload/c_fill,h_120,w_120,r_max,g_face/'
        : 'upload/ar_16:9,c_fill/';

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
    const newUrl = file.secure_url.split('upload/');
    localStorage.setItem(
      `${name}-market`,
      newUrl[0] + transformation + newUrl[1],
    );
    setState((current) => ({
      ...current,
      [name]: newUrl[0] + transformation + newUrl[1],
    }));
  };

  //MAP RELATED
  const [address, setAddress] = useState('');
  const [mapIssues, setMapIssues] = useState(false);
  const [markerProp, setMarkerProp] = useState(true);
  const [center, setCenter] = useState('');
  //MARKET SET-UP
  const market = {
    name: state.name && state.name,
    path: state.name && state.name.replace(/\s+/g, '-').toLowerCase(),
    background: state.image && state.image,
    logo: state.logo && state.logo,
    services: state.services,
    categories: state.categories,
    email: state.email,
    phone: state.phone,
  };

  useEffect(() => {
    //SET MARKER PROP TO FALSE IF THERE'S NO PROBLEM WITH MAP, ADDRESS, CENTER, LAT, LNG EXISTS
    !mapIssues &&
      address &&
      center &&
      center.lat &&
      center.lng &&
      setMarkerProp(false);
    //SETTING ADDRESS FROM THE MAP
    data && data.address && data.address.length && setAddress(data.address);
  }, [address, center, data, mapIssues]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, logo, image, email, categories, services } = state;
    if (
      !name ||
      !phone ||
      !logo ||
      !image ||
      !email ||
      !address ||
      !categories ||
      !services
    ) {
      setTimeout(() => {}, 2000);
      return;
    }
    const postBody = {
      name,
      phone,
      address,
      email,
      logo,
      image,
      services,
      categories,
    };
    try {
      const token = await getTokenSilently();

      const res = await fetch('/.netlify/functions/createStore', {
        method: 'POST',
        body: JSON.stringify(postBody),
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        navigate('/vender');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div sx={{ variant: 'container.grid' }}>
      <form onSubmit={handleSubmit} sx={{ variant: 'form.primary' }}>
        <div>
          <h1 sx={{ variant: 'text.heading', textAlign: 'center' }}>{title}</h1>
          <p>{sub}</p>
        </div>
        {step === 1 && (
          <FirstPart
            handleFoward={handleFoward}
            handleChange={handleChange}
            uploadImage={uploadImage}
            handleService={handleService}
            handleCategory={handleCategory}
            store={state}
          />
        )}
        {step === 2 && (
          <SecondPart
            handleFoward={handleFoward}
            handleBack={handleBack}
            address={address}
            handleChange={(e) => setAddress(e.target.value)}
            center={center}
            markerProp={markerProp}
            markerDefault={center}
            handleClick={(e) => {
              e.preventDefault();
              setMapIssues((current) => !current);
            }}
          />
        )}
        {step === 3 && (
          <ThirdPart
            handleService={handleService}
            handleCategory={handleCategory}
            store={state}
            handleBack={handleBack}
            handleSubmit={handleSubmit}
          />
        )}
      </form>
      <div>
        <MarketPreview market={market} />
      </div>
    </div>
  );
};

export default AddMarket;
