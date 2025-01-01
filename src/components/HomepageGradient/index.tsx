import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import './style.scss';
import { useColorMode } from '@docusaurus/theme-common';

const HomepageGradient = () => {
    const { siteConfig } = useDocusaurusContext();
    const {colorMode, setColorMode} = useColorMode();
    const themeClass = colorMode === 'dark' ? 'gradient-background theme-sunset' : 'gradient-background';
    return (
        <div className={themeClass}>
            <div className="gradient-background__gradient" />
            <div className="gradient-background__content">
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

export default HomepageGradient;
