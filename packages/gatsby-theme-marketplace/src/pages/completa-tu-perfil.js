/**@jsx jsx */
import { jsx } from 'theme-ui';

import Layout from '../components/layout';
import UserForm from '../components/form/user-form';
import { ProtectedRoute } from '../components/protected-route';
import { useAuth0 } from '../../utils/auth';

const Continue = () => {
  const { user, getTokenSilently, logout, loginWithRedirect } = useAuth0();
  return (
    <ProtectedRoute>
      <Layout>
        <div sx={{ variant: 'container.primary' }}>
          {user && (
            <UserForm
              title="Completa tu perfil"
              user={user}
              getTokenSilently={getTokenSilently}
              logout={logout}
              loginWithRedirect={loginWithRedirect}
            />
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default Continue;
