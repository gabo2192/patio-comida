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
            title="Edita tu perfil"
            edit
            user={user}
            getTokenSilently={getTokenSilently}
          />
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default Continue;
