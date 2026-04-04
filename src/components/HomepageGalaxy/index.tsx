import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import Aurora from '../Aurora';
import './style.scss';

const HomepageGalaxy = () => {
    const { siteConfig } = useDocusaurusContext();

    return (
        <div className="homepage-galaxy">
            <Aurora
                colorStops={['#a47864', '#c1a396', '#745344']}
                amplitude={1.0}
                blend={0.5}
                speed={0.5}
            />
            <div className="homepage-galaxy__content">
                <Heading as="h1" className="hero__title">
                    {siteConfig.title}
                </Heading>
                <p className='hero__subtitle'>
                    {siteConfig.tagline}
                </p>
            </div>
        </div>
    );
};

export default HomepageGalaxy;
