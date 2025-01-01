'use client';
import Image from 'next/image';
import styles from './Profile.module.css';
export const Profile = () => {
    return (
        <section className={styles.profile} id='profile'>
            <div className='inner'>
                <h2>Profile</h2>
                <div className={styles.profile_wrap}>
                    <article className={styles.desc_left}>
                    {/* <article className={styles.pic}>
                    </article> */}
                        <h3> 
                            서희원<span>SEO HUI WON</span>
                        </h3>
                        <ul>
                            <li>
                                <Image src="/profile/cake.svg" alt="생년월일icon" width={30} height={30}/>
                                <strong>2000.09.02 (만 24세)
                                </strong>
                            </li>
                            <li>
                                <Image src="/profile/address.svg" alt="주소icon" width={30} height={30}/>
                                <strong>인천시 계양구
                                </strong>
                            </li>
                            <li>
                                <Image src="/profile/mail.svg" alt="메일icon" width={30} height={30}/>
                                <strong>dkstks1409@gmail.com</strong>
                            </li>
                        </ul>
                        {/* 깃허브 바로가기 버튼 */}
                        <div>
                        <a
                            href="https://github.com/HINGNIH" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.github_btn}
                            style={{ textDecoration: 'none' }} 
                        >
                            <svg 
                            className={styles.github_icon}
                            width="30" height="30" 
                            viewBox="0 0 32 32" 
                            fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.5882 27.6522C4 29.9957 4 23.4675 1 22.6305M22.1765 31V25.1414C22.1765 23.4675 22.3529 22.7979 21.2941 21.7936C26.2353 21.2914 31 19.4502 31 11.7503C30.9979 9.74989 30.1751 7.82884 28.7059 6.3938C29.3949 4.65625 29.3315 2.73071 28.5294 1.03735C28.5294 1.03735 26.5882 0.535184 22.3529 3.21341C18.7657 2.32723 14.999 2.32723 11.4118 3.21341C7.17647 0.535184 5.23529 1.03735 5.23529 1.03735C4.4332 2.73071 4.36976 4.65625 5.05882 6.3938C3.58962 7.82884 2.76685 9.74989 2.76471 11.7503C2.76471 19.4502 7.52941 21.2914 12.4706 21.7936C11.4118 22.7979 11.4118 23.8023 11.5882 25.1414V31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            GitHub
                        </a>
                        </div>
                        
                    </article>
                    <article className={styles.desc_right}>
                        <ul>
                            <li>
                                <div className={styles.subtitle}>
                                <Image src="/profile/school.svg" alt="학력icon" width={30} height={30} />
                                <b>학력</b>
                                </div>
                                <div className={styles.subtitle_text}>
                                <strong>2024.02 강원대학교 학사 졸업 (소프트웨어·미디어융합전공)</strong>
                                <strong>2019.02 작전여자고등학교 졸업</strong>
                                </div>
                            </li>
                            <li>
                                <div className={styles.subtitle}>
                                <Image src="/profile/award.svg" alt="자격증icon" width={30} height={30} />
                                <b>자격증</b>
                                </div>
                                <div className={styles.subtitle_text}>
                                <strong>2024.12 정보처리기사 (한국산업인력공단)</strong>
                                <strong>2024.09 SQL개발자 (한국데이터산업진흥원)</strong>
                                </div>
                               
                            </li>
                            <li>
                                <div className={styles.subtitle}>
                                <Image src="/profile/trophy.svg" alt="수상icon" width={30} height={30} />
                                <b>수상</b>
                                </div>
                                <div className={styles.subtitle_text}>
                                <strong>2023.09 캡스톤디자인 페스티벌 대상 (LINC 3.0 사업단, 공학교육혁신센터)</strong>
                                </div>
                                
                            </li>
                            <li>
                                <div className={styles.subtitle}>
                                <Image src="/profile/book.svg" alt="교육icon" width={30} height={30} />
                                <b>교육</b>
                                </div>
                                <div className={styles.subtitle_text}>
                                <strong>2024.11 풀스택 웹 개발자(자바스크립트, 리액트, 노드) | 총 900시간 </strong>
                                <strong>2023.08 피그마(Figma) UI/UX 웹 디자인 | 총 39시간</strong>
                                </div>
                            </li>
                            <li>
                                <div className={styles.subtitle}>
                                <Image src="/profile/world.svg" alt="어학icon" width={30} height={30} />
                                <b>어학</b>
                                </div>
                                <div className={styles.subtitle_text}>
                                <strong>2019.08 新JPLT N2 </strong>
                                </div>
                            </li>
                        </ul>
                    </article>
                </div>
            </div>
        </section>
    );
};
