import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import RegUser from '../components/RegUser/RegUser';

// Creates the register route and returns the RegUser component
const Register: NextPage = () => {
    return (
        <div className={styles.regcover}>
            <Head>
                <title>Expense Tracker</title>
                <meta name="description" content="Manage and visualize your expenses" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <main className={styles.main}>
                <div className={styles.regdiv}>
                    <RegUser />
                </div>
            </main>
        </div>
    );
};

export default Register;