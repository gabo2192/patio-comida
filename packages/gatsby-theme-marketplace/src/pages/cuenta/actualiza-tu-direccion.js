/**@jsx jsx */
import { jsx } from 'theme-ui';

import Layout from '../../components/layout';
import UserForm from '../../components/form/user-form';
import { ProtectedRoute } from '../../components/protected-route';
import { useAuth0 } from '../../../utils/auth';

const Continue = () => {
  const { user, getTokenSilently } = useAuth0();
  return (
    <ProtectedRoute>
      <Layout>
        <div sx={{ variant: 'container.primary' }}>
          <UserForm
            title="Actualiza tu Dirección"
            setNewAddress
            user={user}
            getTokenSilently={getTokenSilently}
          />
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default Continue;
