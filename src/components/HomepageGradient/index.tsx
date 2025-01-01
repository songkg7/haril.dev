import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import './style.scss';

const HomepageGradient = () => {
    const { siteConfig } = useDocusaurusContext();
    return (
        <div className="gradient-background">
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
