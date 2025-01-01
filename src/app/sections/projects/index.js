'use client';
import './style.scss';
import { projects } from './data/projects';  // 프로젝트 데이터 임포트
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw"; 
import "highlight.js/styles/github.css"; // 코드 하이라이트 스타일
import "highlight.js/styles/monokai.css"; // 다크 테마 스타일
import { IoIosCloseCircleOutline } from "react-icons/io";


export const Projects = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [readmeContent, setReadmeContent] = useState(''); // 리드미 파일 내용을 저장

  const filteredProjects= projects.filter((project)=>{
    if(activeTab==='all') return true;
    if(activeTab==='team') return project.tag.includes('팀');
    if(activeTab==='single') return project.tag.includes('개인');
  })

    const handleProjectClick = async (project) => {
    setSelectedProject(project);

    // 리드미 파일 내용을 fetch로 가져오기
    try {
      const response = await fetch(project.readmePath); // readmePath는 프로젝트 데이터에 저장된 경로
      if (!response.ok) {
        throw new Error('Failed to fetch README file');
      }
      const text = await response.text(); // 파일 내용을 텍스트로 변환
      setReadmeContent(text); // 상태에 저장
    } catch (error) {
      console.error('Error loading README file:', error);
      setReadmeContent('README 파일을 불러오는 데 실패했습니다.'); // 오류 처리
    }
  };

  const closeModal = () => {
    setSelectedProject(null); // 팝업 닫기
    setReadmeContent(''); // 리드미 내용 초기화
  };
  
  return (
    <section id="projects">
      <div className="inner">
        {/* <h2>Projects</h2> */}
        <div className='tabs'>
        <button className={`tab ${activeTab ==='all'?'active':''}`}
        onClick={()=>setActiveTab('all')}>All</button>
        <button className={`tab ${activeTab ==='team'?'active':''}`}
        onClick={()=>setActiveTab('team')}>Team</button>
        <button className={`tab ${activeTab ==='single'?'active':''}`}
        onClick={()=>setActiveTab('single')}>Single</button>
        </div>
        
        <div className="projectlist">
          <ul>
            {filteredProjects.map((project) => (
              <li className="project_item" key={project.id} onClick={()=>handleProjectClick(project)}>
                <div
                  className="pg_img"
                  style={{ backgroundImage: `url(${project.imgurl})` }} 
                ></div>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <div className="tags">
                  {project.tag.map((tag, index) => (
                    <span key={index}>{tag}</span>
                  ))}
                </div>
                <div className='overlay'>
                  <span>자세히 보기 click!</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* 리드미 파일 팝업 */}
        {selectedProject && (
          <div className="modal">
            <div className="modal_content">
            <button className="close_btn" onClick={closeModal}><IoIosCloseCircleOutline /></button>
              <h3>{selectedProject.title} - README</h3>
              <ReactMarkdown 
              className="markdown-body" 
              rehypePlugins={[rehypeHighlight, rehypeRaw]}>
                {readmeContent}
              </ReactMarkdown>
            </div>
           
          </div>
        )}
      </div>

      
      
    </section>
  );
};
