/**@jsx jsx */
import { jsx } from 'theme-ui';

import Layout from '../../../components/layout';
import { ProtectedRoute } from '../../../components/protected-route';
import { useAuth0 } from '../../../../utils/auth';
import AddMarket from '../../../components/form/add-market/add-market';

export default () => {
  const { user, getTokenSilently } = useAuth0();
  return (
    <ProtectedRoute>
      <Layout>
        <div sx={{ variant: 'container.primary' }}>
          <AddMarket
            title="Comienza a vender"
            sub="Necesitamos algunos datos de tu negocio"
            getTokenSilently={getTokenSilently}
          />
        </div>
      </Layout>
    </ProtectedRoute>
  );
};
