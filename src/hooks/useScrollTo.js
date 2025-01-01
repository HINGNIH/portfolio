export const useScrollTo = () => {
    const scrollToEl = (e) => {
        e.preventDefault();
        const hash = e.currentTarget.hash;
        const offsetTop = document?.querySelector(hash)?.offsetTop;

        scroll({
            top: offsetTop,
            behavior: 'smooth',
        });
    };

    return { scrollToEl };
};
