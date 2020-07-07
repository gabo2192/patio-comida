/**@jsx jsx */
import { jsx } from 'theme-ui';

import Layout from '../../components/layout';
import { ProtectedRoute } from '../../components/protected-route';
import { useAuth0 } from '../../../utils/auth';
import AddProduct from '../../components/form/add-product/add-product';

export default () => {
  const { getTokenSilently } = useAuth0();
  return (
    <ProtectedRoute>
      <Layout>
        <div sx={{ variant: 'container.primary' }}>
          <AddProduct getTokenSilently={getTokenSilently} />
        </div>
      </Layout>
    </ProtectedRoute>
  );
};
