import Image from 'next/image';

let fe_data = [
    { id: 1, imgurl: '/skills/html5.png', name:'HTML5' }, 
    { id: 2, imgurl: '/skills/css3.png', name:'CSS3' },
    { id: 3, imgurl: '/skills/javascript.png', name:'JavaScript' },
    { id: 4, imgurl: '/skills/react.png', name:'React' },
    { id: 5, imgurl: '/skills/redux.png', name:'Redux' },
    { id: 6, imgurl: '/skills/next.png', name:'Next.js' },
    { id: 7, imgurl: '/skills/ajax.png', name:'AJAX' },
];
let be_data = [
    { id: 1, imgurl: '/skills/node.png', name:'Node.js'},
    { id: 2, imgurl: '/skills/mysql.png', name:'MySQL' },
]
let tools = [
    { id: 1, imgurl: '/skills/git.png', name:'Git'},
    { id: 2, imgurl: '/skills/github.png', name:'GitHub'},
    { id: 3, imgurl: '/skills/figma.png', name:'Figma'},
    { id: 4, imgurl: '/skills/slack.png', name:'Slack'},
    { id: 5, imgurl: '/skills/notion.png', name:'Notion'},
    { id: 6, imgurl: '/skills/photoshop.png', name:'Photoshop'},
]
export const SkillList = () => {
    return (
        <article className='skill_list'>
            <h3>Front-end</h3>
            <ul>
                {fe_data.map((item) => (
                    <li key={item.id}>
                        <Image src={item.imgurl} width={100} height={100} alt='Front-end skills' />
                        <p>{item.name}</p>
                    </li>
                ))}
            </ul>
            <h3>Back-end</h3>
            <ul>
                {be_data.map((item)=>(
                    <li key={item.id}>
                        <Image src = {item.imgurl} width={100} height={100} alt='Back-end skills'/>
                        <p>{item.name}</p>
                    </li>
                ))
                }
            </ul>
            <h3>Tools</h3>
            <ul>
                {tools.map((item)=>(
                    <li key={item.id}>
                        <Image src = {item.imgurl} width={100} height={100} alt='Tools'/>
                        <p>{item.name}</p>
                    </li>
                ))
                }
            </ul>
        </article>
    );
};
