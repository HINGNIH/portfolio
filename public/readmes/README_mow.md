## 국립세계문자박물관 퍼블리싱 팀프로젝트 
#### [사이트 바로가기] 
 ⭐ https://hingnih.github.io/mow/index.html
#### [진행기간] 
 - 24.08.19 - 24.08.31
#### [기술스택] 
   HTML, CSS, JavaScript
#### [팀원]
 4명
#### [나의 역할]
- 오시는 길, 관람안내, 조직 및 전화번호 
### 사이트맵
![sitemap](https://github.com/user-attachments/assets/dac8202b-ce05-4c02-a3e9-07c4e21b1ea2)
### 📜 관람안내 
![guide](https://github.com/user-attachments/assets/8d6f1526-74b1-480d-922c-8abc10f8761e)

#### [주요기능]
스크린에 컨텐츠가 있을 경우에 나타내고, 없을 경우 다시 숨김처리 합니다. 
```
let observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          //스크린에 해당 컨텐츠가 없을 경우
          entry.target.classList.remove("show");
        } else {
          // 스크린에 해당 컨텐츠가 있을 경우
          entry.target.classList.add("show");
        }
      });
    },
    {
      root: null,
      rootMargin: "500px",
      threshold: 0.8,
    }
  );

  observer.observe(left_tg);
  observer.observe(right_tg);
```

### 📜 오시는 길
![map](https://github.com/user-attachments/assets/d3f454eb-758d-42cd-adce-99f16f362831)

#### [주요 기능]
- DOMContentLoaded 이벤트
     - 페이지의 DOM이 완전히 로드된 후에 코드가 실행됩니다.
  
- IntersectionObserver
  - left_tg와 right_tg 두 요소가 화면에 나타나거나 사라지는 시점을 감지합니다.

- observe 메서드
  - left_tg와 right_tg 요소에 대해 IntersectionObserver를 설정하고, 요소가 화면에 들어오거나 나갈 때마다 반응합니다.
  
- 스크롤 감지 및 클래스 추가/제거
    - 요소가 화면에 들어올 때 show 클래스를 추가하여, 요소가 화면에 나타날 때 애니메이션 효과와 스타일을 적용했습니다.
  ---
  
### 📜 조직 및 전화번호 
![org_tel](https://github.com/user-attachments/assets/83b32e4f-a707-4a0f-9acc-5f827b64a8bf)
#### [주요 기능]
버튼(검은상자:기획운영부 등)을 눌렀을 때 해당하는 부서로 on 클래스를 붙입니다.
```
dept.forEach((dp, i) =>{
    dp.addEventListener('click', (e)=>{
        item.forEach((item, i)=>{
            item.classList.remove('on')
        })
        item[i].classList.add('on')

    })
})
```