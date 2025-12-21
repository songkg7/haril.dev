import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import Galaxy from '../Galaxy';
import './style.scss';

const HomepageGalaxy = () => {
    const { siteConfig } = useDocusaurusContext();

    return (
        <div className="homepage-galaxy">
            <Galaxy
                density={1}
                speed={0.5}
                rotationSpeed={0.05}
                mouseRepulsion={true}
                transparent={false} // Since it's a background for the whole hero
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
