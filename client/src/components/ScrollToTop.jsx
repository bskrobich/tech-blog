import { useEffect } from 'react';
import { useLocation } from 'react-router';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const appElement = document.querySelector('.app');
        if (appElement) {
            appElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }, [pathname]);

    return null;
};

export default ScrollToTop;