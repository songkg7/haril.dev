import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.scss';
import HomepageGalaxy from '../components/HomepageGalaxy';

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <Heading as="h1" className="hero__title">
                    {siteConfig.title}
                </Heading>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
            </div>
        </header>
    );
}

export default function Home(): React.JSX.Element {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            // title={`${siteConfig.title}`}
            description={`${siteConfig.tagline}`}
            wrapperClassName="homepage-layout"
            noFooter>
            <main style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <HomepageGalaxy />
            </main>
        </Layout>
    );
}
