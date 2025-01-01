# Youtube Team Project
#### [소개] 
- 진행기간 : 24.10.31 - 24.11.15
- 깃허브 : https://github.com/React-Project-Team1/YouTube/tree/main/project
-  팀원(5명) 
- 나의 역할 : 채널 및 피드 (기여도 ±20% )
#### [프로젝트 선정 이유] 
  - 인기 있는 플랫폼 중 하나인 유튜브의 기능들을 직접 구현해보고 비디오 업로드, 댓글 시스템, 추천 알고리즘 등 다양한 웹 기술을 배울 수 있기 때문입니다. 
#### [기술스택]  : 
  - React, HTML, CSS, JavaScript, Node.js 

#### [주요기능]
   1. ✅사용자 계정 및 인증 (회원가입 및 로그인, 프로필, 구독, 알림설정)
   2. ✅비디오 기능 (업로드, 재생, 댓글, 좋아요, 즐겨찾기, 저장)
   3. ✅검색 및 탐색 (검색, 카테고리별 탐색, 추천)
   4. ✅채널 및 콘텐츠 관리 (채널, 플레이리스트, 동영상 편집)
   5. ✅비디오 통계 (조회수, 댓글 수, 좋아요 수)

### 🗺️사이트맵
![image](https://github.com/user-attachments/assets/5621a2be-bb92-4b16-b75a-1199fa7cca5f)
#### 채널
![channel](https://github.com/user-attachments/assets/d2a3ed81-3898-440f-8fcf-8b938a67480a)

1.  **주요기능**

    -   채널 정보 표시

        -   useParams로 채널 이름을 가져와 Redux 상태에서 해당 채널의 데이터를 조회할 수 있습니다.
            (채널 배너, 프로필 이미지, 구독자 수, 동영상 개수를 표시)

        ```javascript
        const { Channel_name } = useParams();
        const { Channel } = useSelector((state) => state.channel);
        const thisChannel = Channel[Channel_name];
        //동영상 총 개수
        const videoCount = thisChannel?.Movies.length;
        // 구독자수 n만명
        const formatSubscribers = (count) => {
            return count >= 10000 ? `${Math.floor(count / 10000)}만명` : `${count}명`;
        };
        ```

    -   탭 네비게이션과 검색 기능

        -   activeTab 상태를 통해 홈(Channel_home)과 동영상 탭(Channel_video) 간 전환을 구현합니다.
            선택된 탭에 따라 콘텐츠를 동적으로 렌더링합니다.
        -   검색창(search_input)에서 입력한 검색어(searchTerm)를 기반으로 동영상을 필터링하여 Search_results 를 표시합니다.

        ```javascript
        const [activeTab, setActiveTab] = useState('home'); // 현재 활성화된 탭 상태
        const [searchTerm, setSearchTerm] = useState('');

        <div className='channel_navbar'>
            <ul className='inner'>
                <li
                    className={activeTab === 'home' ? 'nav_active' : ''}
                    onClick={() => setActiveTab('home')}
                >
                    홈
                </li>
                <li
                    className={activeTab === 'video' ? 'nav_active' : ''}
                    onClick={() => setActiveTab('video')}
                >
                    동영상
                </li>
                // 채널 내 영상 검색
                <li className='channel_search'>
                    <button>
                        <img
                            src='https://raw.githubusercontent.com/React-Project-Team1/data-center/752a52cbfb5bf64b383b0941ba3834539b2988ac/Icon/Search.svg'
                            alt='영상검색'
                        />
                    </button>
                    <input
                        className='search_input'
                        type='text'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder='검색'
                    />
                </li>
            </ul>
        </div>;
        ```

        ```javascript
        <div className='channel_content'>
            {searchTerm ? (
                <Search_results searchTerm={searchTerm} /> // 검색어에 맞는 동영상 결과 표시
            ) : activeTab === 'home' ? (
                <Channel_home />
            ) : (
                <Channel_video />
            )}
        </div>
        ```

    -   구독 버튼
        -   SubscribersBtn 컴포넌트를 사용해 구독 및 구독 취소 기능을 추가했습니다.

## 피드

사용자가 시청 기록, 재생 목록, 나중에 볼 동영상, 좋아요 표시한 동영상, 오프라인 저장 동영상과 같은 다양한 비디오 리스트를 카테고리별로 확인하고 관리할 수 있는 기능을 제공합니다. 검색 및 삭제 기능을 포함하여, 사용자가 비디오를 편리하게 관리할 수 있습니다.
![feed](https://github.com/user-attachments/assets/ccc75c2a-7f82-4c4d-b1e0-1d7b0e3e76be)
![feed](https://github.com/user-attachments/assets/a42d2894-52d8-4217-92af-4ae24905facd)
![feed](https://github.com/user-attachments/assets/64736a1a-1ffb-48a1-aa20-f647f5c56d1e)
![feed](https://github.com/user-attachments/assets/7f7e04b2-d7ec-4312-8557-deef7736d332)
![feed](https://github.com/user-attachments/assets/ee598957-8063-450b-af29-8baded6afd16)
![feed](https://github.com/user-attachments/assets/e1ad1209-fce3-4863-8d5e-cce5929acad5)

1.  **주요 기능**

-   카테고리별 동영상 목록 출력

    -   useParams() 훅을 사용하여 URL에서 카테고리 정보를 가져오고
        각 카테고리별로 동영상을 필터링하여 목록에 표시합니다.

    ```javascript
    const { Category } = useParams();

    const getCategory = () => {
        switch (Category || category) {
            case 'Viewing_Record':
                return '시청 기록';
            case 'Playlist':
                return '재생 목록';
            case 'Later_Watch':
                return '나중에 볼 동영상';
            case 'like_Movie_List':
                return '좋아요 표시한 동영상';
            case 'Download_List':
                return '오프라인 저장 동영상';
            default:
                return '피드';
        }
    };
    ```

-   카테고리별 동영상 저장

    -   IsAddList 사용자의 액션에 따라 특정 동영상을 "시청 기록", "재생 목록", "나중에 볼 동영상 ", "좋아요 표시한 동영상", "오프라인 저장 동영상"에 추가합니다.

        ```javascript
        dispatch(
            IsAddList({
                user_id: isLoginUser.user_id,
                type: saveType, // 예: 'like_Movie_List'...etc
                movie: movie, // 추가할 동영상
            })
        );
        ```

        ```javascript
        IsAddList(state, action) {
                const { user_id, type, movie } = action.payload;
                const User = state.LoginUser.find((user) => user.user_id === user_id);
                if (User && User[type]) {
                    const existingIndex = User[type].findIndex(
                        (item) => item.movie_id === movie.movie_id
                    );
                    if (existingIndex !== -1) {
                        User[type].splice(existingIndex, 1);
                    }
                    User[type].push(movie);
                    User[type].sort(
                        (a, b) =>
                            new Date(b.movie_date.year, b.movie_date.month - 1, b.movie_date.day) -
                            new Date(a.movie_date.year, a.movie_date.month - 1, a.movie_date.day)
                    );
                    state.isLoginUser = User;
                }
                localStorage.setItem('YoutubeLoginUser', JSON.stringify(state.LoginUser));
                localStorage.setItem('YoutubeIsLoginUser', JSON.stringify(state.isLoginUser));
            },
        ```

-   동영상 검색
    -   사용자가 검색창에 입력한 텍스트를 기준으로 동영상을 필터링하여 보여줍니다.
        제목(movie_title) 또는 카테고리(movie_category)에 입력된 검색어가 포함된 동영상을 찾습니다.
-   동영상 삭제
    -   AllDelList 액션을 사용하여 전체 동영상을 한 번에 삭제할 수 있는 기능을 제공합니다.
    -   사용자가 지우기 버튼을 클릭하면, 해당 카테고리에서 모든 동영상이 제거되고, x버튼을 누르면 해당하는 동영상만 삭제됩니다.

```javascript
       IsDelList(state, action) {
           const { user_id, type, movie } = action.payload;
           const User = state.LoginUser.find((user) => user.user_id === user_id);
           if (User) {
               User[type] = User[type].filter((user) => user.movie_id !== movie.movie_id);
           }
           state.isLoginUser = User;
           localStorage.setItem('YoutubeLoginUser', JSON.stringify(state.LoginUser));
           localStorage.setItem('YoutubeIsLoginUser', JSON.stringify(state.isLoginUser));
       },
```
---

## 공통부분

### Header

### Side-Menu

### Scroll-Top

![ScrollUp](https://github.com/user-attachments/assets/0b95288e-6560-4b0a-b153-37f812942bd2)

페이지의 최상단으로 스무스하게 스크롤할 수 있는 기능을 제공합니다. 해당 버튼 클릭 시 window.scrollTo 메서드를 사용하여 페이지의 맨 위로 이동합니다.

```javascript
const scrollToUp = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};
```

### Subscription-popup

![SubscriptionPopup](https://github.com/user-attachments/assets/2630ff92-4cd9-4e25-988d-a863ea2e1dd1)

사용자가 특정 채널의 구독을 취소할 때 확인 팝업창을 제공합니다. 이 팝업창은 구독 취소 의사를 재확인하고, 사용자의 구독 상태를 업데이트하는 기능을 수행합니다.

1. **주요 기능**

-   구독 취소 확인 팝업
    -   사용자가 특정 채널의 구독을 취소하려 할 때, 팝업을 띄워 확인을 요청합니다.
-   구독 상태 업데이트
    -   팝업에서 구독 취소 버튼을 클릭하면 Redux 상태가 업데이트되며, 해당 채널의 구독이 취소됩니다.
-   외부 클릭 감지
    -   팝업 외부 영역을 클릭하면 팝업이 자동으로 닫히는 기능이 포함되어 있습니다.

```javascript
if (thisChannel)
    return (
        <PopupWrap id='subscript-popup' className='popup-box'>
            <p className='popup-title'>{thisChannel?.channel_name} 구독을 취소하시겠습니까?</p>
            <div className='popup-btns' ref={wrapRef}>
                <button className='popup-close' onClick={() => dispatch(isSubscribersFalse())}>
                    취소
                </button>
                <button
                    className='popup-subscript-end'
                    onClick={(e) => {
                        e.stopPropagation();
                        dispatch(isSubscribersFalse());
                        dispatch(isSavePopTrue(`${thisChannel.channel_name} 채널 구독 취소`));
                        dispatch(
                            DelSubscription({
                                user_id: isLoginUser.user_id,
                                channel_id: thisChannel?.channel_id,
                            })
                        );
                        dispatch(
                            IsMovieChangeSubscriber({
                                channel_name: thisChannel?.channel_nav,
                                type: 'minus',
                            })
                        );
                    }}
                >
                    구독 취소
                </button>
            </div>
        </PopupWrap>
    );
```

2. **코드 설명**
    - Redux 상태 관리
        - useSelector를 통해 현재 로그인된 사용자 정보(isLoginUser)와 구독 중인 채널 정보(thisChannel)를 가져옵니다.
        - useDispatch를 사용하여 구독 상태와 팝업 상태를 업데이트합니다.
    - 외부 클릭 감지
        - useMouseOutside 커스텀 훅을 사용하여 팝업 외부를 클릭했을 때 팝업이 닫히도록 설정합니다.
    - 구독 취소 로직
        - 사용자가 '구독 취소' 버튼을 클릭하면 다음 작업이 수행됩니다:
            - 팝업 닫기 (isSubscribersFalse)
            - 저장 팝업 활성화 (isSavePopTrue)
            - 구독 정보 삭제 (DelSubscription)
            - 채널 구독자 수 업데이트 (IsMovieChangeSubscriber)

### Notification window

![NotificationWindow](https://github.com/user-attachments/assets/81df28e3-a9f3-4261-995f-a74d36a9390c)

특정 작업(예: 저장, 삭제, 구독 취소 등) 완료 시 사용자에게 알림 메시지를 표시합니다. Redux의 savepopSlice를 활용하여 팝업의 상태와 메시지를 관리하며, 동적인 위치 설정을 지원합니다.

1.  **주요기능**
    -   작업 완료 알림
        -   특정 작업 완료 후 Redux 상태에 저장된 메시지를 팝업으로 표시합니다.
    -   동적 위치 설정
        -   left prop을 통해 팝업의 위치를 동적으로 설정할 수 있습니다.
    -   Redux 상태 관리
        -   savepopSlice를 통해 팝업 상태와 메시지를 관리합니다.
    -   자동 닫힘
        -   일정 시간 후 자동으로 닫히며, Redux 상태를 초기화합니다.

**savepopSlice**

```javascript
const initialState = {
    isSavePop: false,
    popMsg: null,
};
export const savepopSlice = createSlice({
    name: 'savepopSlice',
    initialState,
    reducers: {
        isSavePopTrue(state, action) {
            state.isSavePop = true;
            state.popMsg = action.payload;
        },
        isSavePopFalse(state) {
            state.isSavePop = false;
            state.popMsg = null;
        },
    },
});
```

```javascript
// SavePopup 자동 닫힘
useEffect(() => {
    const timer = setTimeout(() => {
        dispatch(isSavePopFalse());
    }, 1000);
    if (isSavePop) timer;
    return () => clearTimeout(timer);
}, [isSavePop]);
```

## 메인페이지

![Main](https://github.com/user-attachments/assets/d04b4fac-77ec-451e-b3ea-f0e3958dd572)

메인 화면은 사용자가 동영상을 탐색하고 시청할 수 있는 중심 페이지입니다. 무한 스크롤, 카테고리 필터, 동영상 미리보기 등 사용자의 탐색 경험을 향상시키기 위한 다양한 기능이 포함되어 있습니다.

1. **주요 기능**
    - 무한 스크롤 동영상 로드 (YouTube.jsx)
        - IntersectionObserver를 활용하여 사용자가 화면을 스크롤할 때마다 새로운 동영상을 로드.
        - 동영상을 10개씩 청크로 나누어, 스크롤 시 추가적으로 로드.
        - 사용자의 활동 데이터를 기반으로 추천 동영상을 제공.
        - getAllMovies를 통해 모든 동영상을 가져와 로컬 스토리지에 저장.

```javascript
useEffect(() => {
    if (allMovies.length === 0) {
        dispatch(getAllMovies());
    }

    if (allMovies.length > 0) {
        const shuffledMovies = allMovies.slice().sort(() => Math.random() - 0.5);
        const chunks = [];
        for (let i = 0; i < shuffledMovies.length; i += 10) {
            chunks.push(shuffledMovies.slice(i, i + 10));
        }
        setVideoChunks(chunks);
    }
}, [allMovies, dispatch]);
```

```javascript
useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    loadMoreVideos();
                }
            });
        },
        { threshold: 1 }
    );

    if (targetRef.current) {
        observerRef.current.observe(targetRef.current);
    }

    return () => {
        if (observerRef.current && targetRef.current) {
            observerRef.current.unobserve(targetRef.current);
        }
    };
}, [videoCount]);
```

```javascript
// channelSlice
getAllMovies(state) {
state.allMovies = [];
Object.keys(state.Channel).forEach((channel) => {
state.allMovies.push(...state.Channel[channel].Movies);
});
localStorage.setItem('YoutubeAllMovies', JSON.stringify(state.allMovies));
},
```

-   카테고리 필터 (TopMenu.jsx)
    사용자는 상단 카테고리 메뉴를 사용하여 특정 카테고리의 동영상만 탐색.
    -   카테고리 버튼을 통해 동영상을 필터링
    -   thisMenu 상태를 기반으로 현재 선택된 카테고리를 표시.
    -   선택된 카테고리에 따라 메인 동영상 목록이 변경됨.
    -   재로딩 될 때마다 랜덤으로 카테고리 표시.

```javascript
useEffect(() => {
    // 랜덤으로 카테고리 메뉴 섞기
    setRandomMenu(
        menuData
            .filter((menu) => menu.category !== 'all')
            .sort(() => Math.random() - 0.5)
            .slice(0, 7)
    );
}, []);
```

```javascript
<TopMenu
    key={'16545641'}
    name={'전체'}
    category={'all'}
    thisMenu={thisMenu}
    setThisMenu={setThisMenu}
/>;
{
    randomMenu.map((menu) => (
        <TopMenu
            key={menu.id}
            name={menu.name}
            category={menu.category}
            thisMenu={thisMenu}
            setThisMenu={setThisMenu}
        />
    ));
}
```

-   동영상 카드 (Video.jsx)

    -   동영상 썸네일에 마우스를 올리면 미리보기 동영상 재생.
    -   동영상을 클릭하면 해당 동영상의 상세 페이지로 이동.
    -   시청 기록 삭제 및 저장 메뉴를 통해 동영상 관리 기능 제공.
    -   SaveList를 통해 사용자가 동영상을 저장하거나 재생 목록에 추가 가능.

```javascript
const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(IsDelList({ user_id: isLoginUser.user_id, type, movie }));
};

const handleShow = (e) => {
    e.stopPropagation();
    setSaveShow(!saveShow);
};

const wrapRef = useMouseOutside(() => setSaveShow(false));
```

```javascript
<div className='video-wrap' onMouseEnter={() => setPlay(true)} onMouseLeave={() => setPlay(false)}>
    {play ? (
        movie_video_type !== 'video' ? (
            <iframe
                src={movie_video + '&controls=0'}
                title={movie_title}
                allowFullScreen
                autoPlay='1'
            />
        ) : (
            <video autoPlay muted src={movie_video}></video>
        )
    ) : (
        <img src={movie_image} alt={movie_title} />
    )}
</div>
```

-   사용자 활동 기반 추천 동영상 (YouTube.jsx)

    -   사용자의 시청 기록과 검색 기록을 기반으로 추천 동영상 제공.
    -   활동 기반으로 특정 카테고리 및 검색어에 연관된 동영상을 추천.

-   로딩 및 예외 처리
    -   무한스크롤 시 동영상 데이터 로드 중 Spinner 표시.
    -   NoSearchItem
        -   검색 결과가 없거나 로그인되지 않은 경우 사용자에게 안내 메시지 표시.
        -   미 로그인 상태 시 검색 기록 관련 영상 동영상 제공.

```javascript
// 사용자 활동 기반 추천
useEffect(() => {
    if (!isLoginUser) return;

    const movieCategory = Array.from(
        new Set(isLoginUser?.Viewing_Record?.map((record) => record.movie_category))
    );
    const searchList = Array.from(
        new Set(isLoginUser?.user_search_list?.map((item) => item.search))
    );

    setUserActivities({ ...userActivities, movieCategory, searchList });
}, [isLoginUser?.Viewing_Record, isLoginUser?.user_search_list]);

useEffect(() => {
    const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const randomCategory = userActivities?.movieCategory
        ? random(userActivities?.movieCategory)
        : null;
    const randomSearchTerm = userActivities?.searchList ? random(userActivities?.searchList) : null;

    const categoryFilter = randomCategory
        ? allMovies.filter((movie) => movie.movie_category.includes(randomCategory))
        : [];
    const titleFilter = randomSearchTerm
        ? allMovies.filter((movie) => movie.movie_title.includes(randomSearchTerm))
        : [];

    const filteredMovies = categoryFilter.length ? categoryFilter : titleFilter;
    const shuffledMovies = filteredMovies.sort(() => Math.random() - 0.5).slice(0, 10);

    if (shuffledMovies.length < 10) {
        const additionalMovies = allMovies
            .filter((movie) => !shuffledMovies.includes(movie))
            .sort(() => Math.random() - 0.5)
            .slice(0, 10 - shuffledMovies.length);
        setMainVideo([...shuffledMovies, ...additionalMovies]);
    } else {
        setMainVideo(shuffledMovies);
    }
}, [userActivities, allMovies]);
```

## 스튜디오

![studio](https://github.com/user-attachments/assets/8a5d10e2-f446-466d-a802-f01ef89eed16)

1. **기능**
    - 현재 구독자수, 영상, 댓글 수 표기
    - 영상 업로드 및 삭제 관리
    - 채널 배너 및 프로필 이미지 변경


## 로그인 | 회원가입

![Login](https://github.com/user-attachments/assets/decc95e5-5911-4797-adfd-dceb82bf5ae4)

```c
const [pageType, setPageType] = useState('quickLogin'); // 페이지 세분화

 // 로그인 성공 시 메인 페이지로 이동
    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    }, [isAuth]);
```

-   ### QuickLogin

    가입된 user의 계정으로 로그인

    ```js
    // 새로 고침 시마다 user 3 개 랜덤으로 출력
    const randomLoginUser = LoginUser.filter((user) => typeof user.user_id === 'number')
        .slice()
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    ```

-   ### LoginForm

    다른 계정으로 로그인

    ```Js
    // 가입된 계정과 일치하는 user 로그인
         const onSubmit = (e) => {
             e.preventDefault();
             if (
                 LoginUser.find(
                     (login) =>
                         login.user_email === user.user_email &&
                         login.user_password === user.user_password
                 )
             ) {
        // navigate 코드 중략
             } else {
                 setLoginCheck(true);
                 return;
             }
         };
    // user 정보가 일치하지 않을 경우 경고
         const handleIdChk = (e) => {
             e.preventDefault();
             if (!user.user_email) {
                 alert('label 문구 출력');
             } else {
                 setIdChk(!idChk);
             }
         };
    ```

-   ### JoinForm
    새로운 user의 정보로 가입
    ```c
    // 회원 정보 입력 시 계정 정보 입력란 출력
       const handleUserChk = (e) => {
           e.preventDefault();
           if (user.user_name && user.user_age && user.user_tel) setNextForm(true);
       };
    ```

## 검색

![Search](https://github.com/user-attachments/assets/990c17de-2d51-4920-be0f-f7e9195b1159)

-   ### NoSearchItem / not-search

    검색 기록 또는 결과가 없는 초기 화면

    ```c
    // 부모 위치 : Search > index
    // 검색어 유무로 리스트를 조회함
    const { Search } = useParams();

    !Search ? <NoSearchItem /> : <SearchList Search={Search}/>

    // 부모 위치 : SearchList
    // 검색어에 일치하는 결과가 없을 경우
    if (filteredChannel.length === 0 && filteredMovies.length === 0) {
        return (
        // NoSearchItem과는 별개의 페이지
            <SearchListWrap>
                <p className='not-search'>"{Search}" 찾으시는 검색 결과가 없습니다.</p>
            </SearchListWrap>
        );
    }
    ```

-   ### SearchList

    검색 결과 리스트

    ```c
     // 이름이 검색어와 일치하는 채널
    const filteredChannel = allChannel.filter((channel) =>
        channel.channel_name.toLowerCase().includes(Search.toLowerCase())
    );

    // 제목이나 분류가 검색어와 일치하는 영상
    const filteredMovies = allMovies.filter(
        (movie) =>
            movie.movie_title.toLowerCase().includes(Search.toLowerCase()) ||
            movie.movie_category.toLowerCase().includes(Search.toLowerCase())
    );
    ```

-   ### SearchChannel
    검색어와 일치하는 채널 출력
    ```c
    // 채널 구독자 수 단위 설정
    const subscribers_count = (channel_subscribers) => {
        if (channel_subscribers >= 10000) {
            return Math.floor(channel_subscribers / 10000) + '만명';
        } else if (channel_subscribers >= 1000) {
            return Math.floor(channel_subscribers / 1000) + '천명';
        } else if (channel_subscribers <= 1000) {
            return channel_subscribers + '명';
        }
    };
    ```
-   ### SearchMovies
    검색어와 일치하는 영상 출력
    ```c
    // 필터링 결과에 일치하는 영상 출력
    if (filteredMovies)
        return (
            <>
                {filteredMovies.map((movie) => (
                    <Video key={movie.movie_id} movie={movie} />
                ))}
            </>
        );
    ```
-   ### SearchHistory

    header에 속하는 검색어 보관 리스트

    ```c
    // 부모 위치 : common > header

    // 검색창 클릭 시 출력, 바닥 클릭 시 숨김 처리 -> !isShown && 검색창
    const [isShown, setIsShown] = useState(true);

    // params로 받은 검색어(search)와 검색된 단어(keyword) 분리
    const [search, setSearch] = useState();

    // SearchHistory
    // 한 번 검색한 항목을 다시 검색
    const searchKeyword = (keyword) => {
    setSearch(keyword);
    setIsShown(true);
    navigate(`/movies/${keyword}`);
    };

    // 검색 기록 삭제
    const deleteKeyword = (keyword) => {
    dispatch(DelSearchList({ user_id: user.user_id, search: keyword }));
    };
    ```

## 구독

![Subscription](https://github.com/user-attachments/assets/4cbd3c05-f28f-4452-9409-63be67e31d21)

사용자 인증 상태에 따라 다른 콘텐츠를 제공하며, 로그인한 사용자는 자신이 구독한 채널 목록을 정렬하고 관리할 수 있습니다. 주요 컴포넌트는 구독 상태에 따라 동적으로 렌더링되며, 사용자가 보다 편리하게 구독 채널을 탐색하고 관리할 수 있도록 설계되었습니다.

1. **주요 기능**

-   인증 상태에 따른 동적 렌더링 (Subscription.jsx) , (SubscriptItem.jsx)
    -   isAuth 상태에 따라 SubscriptList 또는 NotSubscription 컴포넌트를 렌더링.
    -   로그인된 사용자는 모든 구독 채널을 확인할 수 있으며, 로그인하지 않은 사용자는 로그인 안내 메시지를 확인할 수 있습니다.
    -   로그인하지 않은 사용자를 위해 안내 메시지와 로그인 버튼을 표시.
    -   시각적 강조를 위해 외부 이미지를 활용.

```javascript
const { isAuth } = useSelector((state) => state.auth); // 인증 상태 확인
{
    isAuth ? (
        // 로그인된 경우
        <div className='subscriptInner'>
            <h2 className='subscriptH2'>모든 구독 채널</h2>
            <div className='subscription-content-box'>
                <SubscriptList />
            </div>
        </div>
    ) : (
        // 로그인되지 않은 경우
        <NotSubscription />
    );
}
```

-   구독 목록 정렬 기능 (SubscriptSort.jsx)
    -   구독 채널을 정렬할 수 있는 드롭다운 메뉴를 제공.
    -   정렬 기준(sortData)을 선택하면 해당 기준에 따라 구독 채널이 정렬됨.
    -   외부 클릭 감지 기능을 사용하여 드롭다운 메뉴를 닫음.

```javascript
const [show, setShow] = useState(false); // 드롭다운 메뉴의 표시 상태
const wrapRef = useMouseOutside(() => setShow(false)); // 외부 클릭 감지 훅

 <p className='subscript-select' onClick={() => setShow(!show)}>
                    {thisSortType.name} {/* 현재 선택된 정렬 기준 */}
                    <img
                        src='https://raw.githubusercontent.com/React-Project-Team1/data-center/b26aaeebc663db109b629ff9f3eba7500b8fc6f3/Icon/Down_B.svg'
                        alt=''
                    />
                </p>
                <ul className='subscript-ul' style={{ display: show ? 'block' : 'none' }}>
                    {sortData.map((sort) => (
                        <li
                            key={sort.id}
                            className={sort.type}
                            onClick={() => {
                                setThisSortType(sort); // 정렬 기준 변경
                                setShow(false); // 드롭다운 닫기
                            }}
                        >
                            {sort.name}
                        </li>
                    ))}
                </ul>
```

-   구독된 채널 목록 표시 (SubscriptList.jsx)
    -   사용자가 구독한 채널 목록을 SubscriptItem 컴포넌트로 렌더링.
    -   Redux를 통해 채널 데이터와 로그인 정보를 가져와 정렬 및 필터링을 수행.
    -   정렬 기준에 따라 채널 목록이 동적으로 변경됨.

```javascript
const { isLoginUser } = useSelector((state) => state.auth); // 로그인 사용자 정보 가져오기
const thisSubscriptChannel = allChannel.filter(
    (channel) => isLoginUser?.Subscription_Id?.includes(channel.channel_id) // 로그인 유저의 구독 채널 필터링
);
```

-   개별 채널 항목 렌더링 (SubscriptItem.jsx)
    -   채널 이미지, 이름, 소개, 구독자 수 등 채널 정보를 표시.
    -   채널 클릭 시 해당 채널 페이지로 이동.
    -   SubscribersBtn 컴포넌트를 통해 구독 상태를 관리.

```javascript
const navigate = useNavigate(); // 라우팅을 위한 useNavigate 훅
```

## 동영상재생

사용자가 선택한 동영상과 같은 카테고리의 추천 영상을 띄워주고 구독, 좋아요, 오프라인, 재생목록에 저장되고 댓글 작성 기능을 제공합니다.

![movie](https://github.com/user-attachments/assets/1166ea38-7e42-432f-924f-459d5a2ce053)

-   ### 추천 영상

-   현재 재생 중인 동영상과 동일한 카테고리의 다른 동영상을 추천 목록으로 표시합니다.

    -   useSelector 사용해 전체 동영상 목록을 가져온 후 현재 동영상의 카테고리와 동일한 카테고리를 가진 동영상을 필터링 합니다.
    -   최대 15개의 동영상만 보여주며, 랜덤으로 배열을 섞어서 보여줍니다.

```javascript
const { allMovies } = useSelector((state) => state.channel);

// 현재 재생 중인 영상과 같은 카테고리의 영화만 필터링
const filteredMovies = allMovies
    .filter((movie) => movie.movie_category === currentVideoCategory)
    .filter((movie) => movie.movie_id !== currentVideoId);

{
    filteredMovies
        .slice()
        .sort(() => Math.random() - 0.5)
        .slice(0, 15) // 최대 15개만 표시
        .map((movie) => <Video key={movie.movie_id} movie={movie} />);
}
```

-   ### 시청 기록 저장

-   사용자가 재생한 동영상을 시청기록에 저장하는 기능입니다.

    -   useEffect를 활용하여 동영상이 재생 될 때마다 해당 동영상을 시청 기록에 추가합니다

```javascript
useEffect(() => {
    if (!thisMovie) dispatch(getAllMovies());
    if (isSideMenu) dispatch(SideMenuChange());
    if (thisMovie) {
        document.title = thisMovie.movie_title;
        //시청기록 데이터 추가
        dispatch(
            IsAddList({
                user_id: isLoginUser.user_id,
                type: 'Viewing_Record',
                movie: thisMovie,
            })
        );
    }
}, [Movie_ID, allMovies, thisMovie, dispatch]);
```

-   ### 카테고리별 저장

![category](https://github.com/user-attachments/assets/6a9eb9cd-f887-461d-9824-a1c16d545a98)

-   사용자의 액션에 따라 특정 동영상을 "재생 목록", "좋아요 표시한 동영상", "오프라인 저장 동영상"에 추가하거나 삭제하는 기능을 처리합니다.

    -   사용자가 동영상에 대한 액션을 클릭할 때 해당 상태를 Redux를 통해 업데이트 합니다.

```javascript
const handleClickType = (e, saveType) => {
    e.preventDefault();
    if (isLoginUser && isAuth) {
        if (isLoginUser[saveType].find((user) => user.movie_id === movie_id)) {
            dispatch(
                IsDelList({
                    user_id: isLoginUser.user_id,
                    type: saveType,
                    movie: movie,
                })
            );
            if (saveType === 'like_Movie_List') {
                dispatch(IsMovieChangeLike({ channel_name, movie_id, type: 'minus' }));
                dispatch(getAllMovies());
            }
        } else {
            dispatch(
                IsAddList({
                    user_id: isLoginUser.user_id,
                    type: saveType,
                    movie: movie,
                })
            );
            if (saveType === 'like_Movie_List') {
                dispatch(IsMovieChangeLike({ channel_name, movie_id, type: 'plus' }));
                dispatch(getAllMovies());
            }
        }
    } else {
        alert('로그인이 필요합니다.');
        navigate('/login');
    }
};
```

-   ### 좋아요 수 변경

-   좋아요 버튼 클릭 시 해당 동영상의 좋아요 수를 증가 또는 감소 시킵니다.
    -   사용자가 좋아요 버튼을 클릭할 때마다 IsMovieChangeLike 액션을 통해 좋아요 수를 업데이트하고, 로컬 저장소에 해당 데이터를 저장합니다.

```javascript
   IsMovieChangeLike(state, action) {
            // 좋아요 수 변경 로직
            const { channel_name, type, movie_id } = action.payload;
            const thisChannel = state.Channel[channel_name];
            const thisMovie = thisChannel.Movies.find((movie) => movie.movie_id === movie_id);
            if (type === 'plus') {
                thisMovie.movie_like_count += 1;
            } else {
                thisMovie.movie_like_count -= 1;
            }

            localStorage.setItem('YoutubeChannel', JSON.stringify(state.Channel));
        },
```

-   ### 댓글 기능

-   사용자들이 동영상에 대해 소통할 수 있도록 댓글 기능을 제공합니다.

    -   댓글 작성 시 로그인 상태를 확인하고, 비로그인 상태 시 로그인 화면으로 이동합니다.
    -   댓글 목록은 "오래된 순"과 "최신 순"으로 정렬할 수 있습니다.
    -   현재 로그인 한 사용자와 댓글 작성한 사용자가 같을 때 댓글을 삭제할 수 있습니다.

![comment](https://github.com/user-attachments/assets/e814060b-8fbd-4c61-a811-ae6032f48a3e)

1. **댓글 정렬**

```javascript
  const handleSortComments = (sortType) => {
    const sorted = [...moviesComment].sort((a, b) => {
      if (sortType === "oldest") {
        // 오래된 순으로 정렬 (오름차순)
        return new Date(a.date) - new Date(b.date);
      } else if (sortType === "newest") {
        // 최신순으로 정렬 (내림차순)
        return new Date(b.date) - new Date(a.date);
      }
      return 0;
    });

    setSortedComments(sorted);
    setShowReport(false); // 메뉴 숨기기
  };****

```

2. **댓글 작성**

-   비로그인 시 로그인 alert 표시 후 로그인 화면 이동합니다. 로그인 상태일 때 댓글 작성 시 댓글 목록에 추가 됩니다.

```javascript
// 댓글 입력란 클릭 시 로그인 상태 확인
const handleInputClick = () => {
    if (!isAuth) {
        alert('로그인이 필요합니다.'); // 알림 표시
        navigate('/login'); // 로그인 화면으로 이동
    } else {
        setShowFooter(true); // 입력란 보이기
    }
};

// 댓글 입력 변경
const handleInputChange = (e) => {
    setCommentInput(e.target.value);
};

// 댓글 작성
const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuth) {
        alert('로그인이 필요합니다.'); // 로그인 확인
        navigate('/login');
        return;
    }

    // 댓글 추가
    dispatch(
        AddNewMoviesComment({
            movie_id,
            movie_channel,
            comment_body: commentInput,
            comment_user_id: isLoginUser.user_id,
            comment_user_name: isLoginUser.user_name,
        })
    );

    // 댓글 입력란 초기화
    setCommentInput('');
    dispatch(getAllMovies());
};
```

3. **댓글 삭제**

-   로그인된 유저가 선택한 댓글에만 "삭제"버튼이 출력 됩니다. ( 비로그인 회원 댓글 시 "신고")

```javascript
const [show, setShow] = useState(false);

// 댓글 삭제
const handleDelete = () => {
    const payload = {
        movie_id,
        movie_channel,
        comment_id,
        comment_user_id,
    };

    dispatch(DelMoviesComment(payload));
    dispatch(getAllMovies());
};
```

-   ### 외부 클릭 감지

-   팝업을 열었을 때 사용자가 메뉴 외부를 클릭하면 해당 메뉴가 닫히는 기능입니다.

```javascript
useEffect(() => {
    const handleClickOutside = (e) => {
        // 클릭한 위치가 메뉴나 버튼 외부일 때만 드롭다운을 닫음
        if (moreBtnRef.current && !moreBtnRef.current.contains(e.target)) {
            setShow(false);
        }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
        document.removeEventListener('click', handleClickOutside);
    };
}, []);
```