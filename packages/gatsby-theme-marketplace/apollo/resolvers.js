import { LOCAL_STATE_QUERY } from './queries';
import { localStateVar } from './cache';

export const resolvers = {
  Mutation: {
    closeModal: () => {
      localStateVar({ ...localStateVar(), modalOpen: false });
    },
    openModal: (_root) => {
      localStateVar({ ...localStateVar(), modalOpen: true });
    },
    toggleCart: (_root) => {
      localStateVar({
        ...localStateVar(),
        cartOpen: !localStateVar().cartOpen,
      });
    },
    toggleMenu: (_root) => {
      localStateVar({
        ...localStateVar(),
        menuOpen: !localStateVar().menuOpen,
      });
    },
    setAddress: (_root, { address }) => {
      localStateVar({
        ...localStateVar(),
        address: {
          ...localStateVar().address,
          address,
        },
      });
    },
    setAddressName: (_root, { name }) => {
      localStateVar({
        ...localStateVar(),
        address: {
          ...localStateVar().address,
          name,
        },
      });
    },
    setAddressLatLng: (_root, { lat, lng }) => {
      localStateVar({
        ...localStateVar(),
        address: {
          ...localStateVar().address,
          lat,
          lng,
        },
      });
    },
  },
};
