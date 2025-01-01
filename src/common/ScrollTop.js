'use client';
import { useScrollTo } from '@/hooks';
import { HiArrowNarrowUp } from 'react-icons/hi';

export const ScrollTop = () => {
    const { scrollToEl } = useScrollTo();
    const onGo = (e) => {
        scrollToEl(e);
    };
    return (
        <p className='scroll-top'>
            <a href='#visual' onClick={onGo}>
                <i>
                    <HiArrowNarrowUp />
                </i>
            </a>
        </p>
    );
};
