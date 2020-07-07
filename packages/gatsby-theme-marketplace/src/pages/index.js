/**@jsx jsx */
import { jsx } from 'theme-ui';
import { Link } from 'gatsby';
import { useQuery } from '@apollo/client';

import { GET_LOCAL_STATE } from '../operations/queries/get-localstate';

import Layout from '../components/layout';

const Index = () => {
  const { loading, error, data } = useQuery(GET_LOCAL_STATE);
  if (loading) return <div>Loading...</div>;
  console.log(error);
  console.log(data);
  return (
    <Layout>
      <Link to="/completa-tu-perfil">Completa tu perfil</Link>
    </Layout>
  );
};

export default Index;
