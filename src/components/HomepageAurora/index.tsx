import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useColorMode } from '@docusaurus/theme-common';
import Heading from '@theme/Heading';
import Aurora from '../Aurora';
import './style.scss';

const AURORA_THEMES = {
    light: {
        colorStops: ['#B0A89E', '#F0EEE9', '#8A8279'] as [string, string, string],
    },
    dark: {
        colorStops: ['#4A4A4A', '#F0EEE9', '#2A2A2A'] as [string, string, string],
    },
};

const HomepageAurora = () => {
    const { siteConfig } = useDocusaurusContext();
    const { colorMode } = useColorMode();
    const theme = AURORA_THEMES[colorMode];

    return (
        <div className={`homepage-aurora homepage-aurora--${colorMode}`}>
            <Aurora
                colorStops={theme.colorStops}
                amplitude={1.0}
                blend={0.5}
                speed={0.5}
            />
            <div className="homepage-aurora__content">
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

export default HomepageAurora;
