'use client';
import { menus } from '@/contains';
import styles from './Menu.module.css';
import { useScrollTo } from '@/hooks';
import { useState, useEffect } from 'react';

export const Menu = () => {
    const { scrollToEl } = useScrollTo();
    const [activeMenu, setActiveMenu] = useState(null); 
    
    useEffect(() => {
        const observerOptions = {
            root: null, // 뷰포트 기준
            rootMargin: '0px',
            threshold: 0.5, // 50%가 화면에 보일 때 감지
        };
        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveMenu(entry.target.id); // 현재 보이는 섹션의 id를 활성 메뉴로 설정
                    console.log('Active section:', entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

         // 섹션 요소를 관찰
         menus.forEach((menu) => {
            const section = document.getElementById(menu.id); // 섹션 id와 매핑
            if (section) observer.observe(section);
        });

        // 클린업
        return () => observer.disconnect();
    }, []);

    const onGo = (e) => {
        e.preventDefault();
        scrollToEl(e);
    };

    return (
        <nav className={styles.nav}>
            <ul>
                {menus.map((item) => (
                    <li key={item.id}>
                        <a href={item.url} onClick={onGo} className={activeMenu===item.id?styles.active:''}>
                            {item.name}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
