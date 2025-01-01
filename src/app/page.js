import { Profile, Visual, Skills, Projects} from './sections';

const Home = () => {
    return (
        <main className='main'>
            <Visual />
            <Profile />
            <Skills />
            <Projects />
        </main>
    );
};

export default Home;
