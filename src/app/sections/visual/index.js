'use client';
import { useState, useEffect } from 'react';
import styles from './Visual.module.css';
import Image from 'next/image';

export const Visual = () => {

    const [currentLine, setCurrentLine] = useState(0); // 현재 줄 번호
    const [displayText, setDisplayText] = useState(['', '', '']); // 각 줄별 출력 텍스트
    const lines = [
        '안녕하세요.',
        '프론트엔드 개발자,',
        '서희원을 소개합니다!',
    ]; 
    
    useEffect(() => {
        if (currentLine >= lines.length) return; // 모든 줄 출력 완료 시 종료

        let index = 0;
        const typingInterval = setInterval(() => {
            setDisplayText((prev) => {
                const updated = [...prev];
                updated[currentLine] = lines[currentLine].slice(0, index + 1); // 현재 줄에 한 글자씩 추가
                return updated;
            });
            index++;
            if (index === lines[currentLine].length) {
                clearInterval(typingInterval);
                setTimeout(() => setCurrentLine((prev) => prev + 1), 500); // 다음 줄로 넘어감 (0.5초 딜레이)
            }
        }, 100); // 타이핑 속도

        return () => clearInterval(typingInterval); // 클린업
    }, [currentLine]); // currentLine이 변경될 때마다 타이핑 효과 실행

    return (
        <section className={styles.visual} id='visual'>
            <div className={styles.visual_inner}>
                <div className={styles.visual_content}>
                    <Image src='/visual/mimo2.png' alt='서희원의 미모티콘' width={300} height={300}/>
                    <div className={styles.visual_textbox}>
                        <h2>
                        {displayText.map((line, index) => (
                            <span key={index}>{line}</span>
                        ))}
                        </h2>
                    </div>
                </div>
            </div>
        </section>
    );
};