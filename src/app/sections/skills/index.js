'use client';
import { SkillList } from './SkillList';
import './style.scss';

export const Skills = () => {
    return (
        <section id='skills'>
            <div className='inner'>
                {/* <h3>Skills</h3> */}
                <div className='skill-wrap'>
                    <SkillList />
                </div>
            </div>
        </section>
    );
};
