import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import MessageToast from '../components/MessageToast/MessageToast';
import { useRouter } from "next/router";
import Login from '../components/Login/Login';
import Landing from './landing';

// Define the type for router query
interface RouterQuery {
  showRegister?: string;
}

// Creates landing or index route
const IndexHome: NextPage = () => {
  const router = useRouter();
  const redirect = router.query as RouterQuery;  

  // Returns the Login component in index route
  return (
    <div className={styles.cover}>
      <Head>
        <title>Expense Tracker</title>
        <meta name="description" content="Manage and visualize your expenses" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      {
        redirect.showRegister ? 
        <MessageToast displayMessage="User registration successful" /> : 
        <div />
      }
      <main className={styles.main}>
        <div className='maincontainer'>
          {/* <Login /> */}
          <Landing/>
        </div>      
      </main>
    </div>
  );
};

export default IndexHome;