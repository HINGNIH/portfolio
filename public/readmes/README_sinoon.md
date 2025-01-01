# 쇼핑몰 웹사이트 개인 프로젝트 
## 📜 프로젝트 소개 
SINOON 웹사이트는 실제 여성복 브랜드의 사진을 활용하여 React로 구현한 쇼핑몰 개인 프로젝트입니다. 쇼핑몰의 주요 기능을 React와 Redux를 사용해 구현했습니다. 이 프로젝트는 쇼핑몰 기능을 연습하기 위한 목적으로 제작되었으며, 실제 상용화된 시스템은 아닙니다.
참고한 공식 링크 📎 https://sinoon.co.kr
- 장바구니 기능: 상품을 장바구니에 추가, 삭제
- 로그인/회원가입 
- 게시판 기능
- 페이지네이션 기능(공지사항, 고객문의 등)
---
## ⚙️ 사용 기술
- HTML5, CSS3, JavaScript, React, React Tostify, Node.js
- 상태관리 : Redux Toolkit

##  🛠️ 주요 기능 구현 
- 1. 장바구니 기능
- 2. 로그인 및 회원가입
- 3. 게시판 및 문의 기능

## [상품리스트]
![productlist](https://github.com/user-attachments/assets/180425a2-3772-499e-ab09-f829a85eb622)
- 상품 검색 기능
- 정렬 (제품명, 가격 낮은 순, 카테고리)
  ```
    //상품정렬 : product page
        sortCart:(state, action)=>{
            if (action.payload !== '') {
                state.products = [...state.products].sort((a, b) =>
                    a[action.payload] > b[action.payload] ? 1 : -1
                    );
                }
        },
    //상품정렬초기화
        resetCart : (state) =>{ state.products = productData;
        },
    //상품 검색
        searchCart : (state, action) =>{
        state.products = productData.filter((item) =>
        item.title.toLowerCase().includes(action.payload.toLowerCase()) ||  // 상품명 필드 추가
        item.category.toLowerCase().includes(action.payload.toLowerCase()) // 기존 카테고리 검색 유지
         )},
  ```
## [장바구니]

![cart](https://github.com/user-attachments/assets/130759ff-23ca-45df-ac3e-c21d3e4ac9af)
- 상품수량 추가
- 선택삭제/전체삭제(장바구니비우기)
  ```
    export const cartSlice = createSlice({
        name: 'cart',
        initialState,
        reducers: {
            addCart:(state, action) =>{
                // state.carts.push(action.payload)
                const existingItem = state.carts.find(item => item.id === action.payload.id);
                if (existingItem) {
                    // 이미 장바구니에 있으면 수량만 증가
                    existingItem.quantity += 1;
                } else {
                    // 새로 장바구니에 추가, quantity를 1로 설정
                    state.carts.push({ ...action.payload, quantity: 1 });
                }
            
            },
            removeCart:(state, action)=>{
                state.carts = state.carts.filter((item)=>item.id !==action.payload)
                
            },
            // 장바구니 수량 증가
            increaseQuantity: (state, action) => {
                const item = state.carts.find(item => item.id === action.payload);
                if (item) {
                    item.quantity += 1;
                }
            },

            // 장바구니 수량 감소
            decreaseQuantity: (state, action) => {
                const item = state.carts.find(item => item.id === action.payload);
                if (item && item.quantity > 1) {
                    item.quantity -= 1;
                }
            },
            totalCart:(state, action)=>{
                // state.cartTotal=state.carts.reduce((acc,curr)=>acc+ curr.price, 0)
                state.cartTotal = state.carts.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
            },
            emptyCart:(state, action)=>{
                state.carts=[];
            },
            
            //상품선택하기 
            toggleSelectItem: (state, action) => {
                const item = state.carts.find(cart => cart.id === action.payload);
                if (item) item.selected = !item.selected;
            },
            //전체선택
            selectAllItems: (state, action) => {
                state.carts.forEach(item => {
                item.selected = action.payload;
                });
            },
            //선택된 상품만 한번에 삭제하기 
            removeSelectedItems: (state) => {
                state.carts = state.carts.filter(item => !item.selected);
            },
        },
    });
  ```

## [로그인/회원가입] : authSlice
- 로그인 (Login)
- ![image](https://github.com/user-attachments/assets/347b1e01-a214-44d0-a28a-174c224fa9d6)
  - reducer : 
    ```
        login(state, action) {
                    const {email,password}=action.payload
                    const newItem = state.dataList.find(item=>item.email===email);
                    if(newItem&&newItem.password===password){
                        state.authed = true;
                        state.user = newItem;
                    }else {
                        state.authed=false;
                        state.user=null;
                    }
                }
     ```

    - 사용자의 이메일과 비밀번호를 확인하여 로그인 처리.
     - 성공 시 authed를 true로 설정하고, 로그인된 사용자 정보를 user에 저장.
실패 시 authed를 false로 설정하고 user를 null로 초기화.

- 로그아웃 (Logout)
- ![image](https://github.com/user-attachments/assets/f2e565d6-ba59-40bd-b694-ec996fac4ee3)

    - reducer : 
        ```
        logout(state){
                    state.authed = false;
                    state.user=null;
                },
        ```
    - 로그인 상태를 초기화.
    - authed를 false로 설정하고, user를 null로 초기화.
 

- 회원가입 (Signup)
- ![image](https://github.com/user-attachments/assets/7b1613e1-9473-40f6-a820-c2972413f930)
    - reducer : 
        ```
        signup(state, action){
                    state.dataList.push({id:no++, ...action.payload})
                }
        ```
    - 새로운 사용자 정보를 추가.
    - 입력받은 사용자 정보에 고유 ID(id)를 부여하여 dataList에 저장.

## [게시판(공지/문의)]
  ![notice](https://github.com/user-attachments/assets/7bed50dd-52ca-4e18-a7dc-6840e943a191)

  ![customer](https://github.com/user-attachments/assets/21cfb3f9-ddf7-4da3-b743-4eccf2486db6)
  - pagenationSlice
    - 초기 상태 (initialState)
        - pageData: 게시물 데이터 배열
        - currPage: 현재 페이지 (기본값: 1)
        - totalPage: 전체 페이지 수
        - postsPerPage: 페이지당 게시물 수 (기본값: 10)
    - addData
        - 전달받은 데이터를 id 값을 기준으로 내림차순 정렬하여 저장합니다.

    - totalData
        - 현재 페이지를 1로 초기화하고, pageData 배열을 기반으로 전체 페이지 수를 계산합니다.

    - nextPage
        - 현재 페이지가 전체 페이지 수보다 작을 경우, 다음 페이지로 이동합니다.

    - prevPage
        - 현재 페이지가 1보다 클 경우, 이전 페이지로 이동합니다.

    - currentPage
        - 특정 페이지 번호로 이동합니다.

    - firstPage
        - 첫 번째 페이지로 이동합니다.

    - lastPage
        - 마지막 페이지로 이동합니다.

    - ```
        reducers: {
            addData(state, action){
                state.pageData=[...action.payload].sort((a, b)=>b.id-a.id);
            },
            totalData(state, action) {
                state.currPage=1;
                state.totalPage=Math.ceil(state.pageData.length/state.postsPerPage)
            },
            nextPage(state, action){
                if(state.currPage<state.totalPage){
                    state.currPage++;
                }
            },
            prevPage(state, action){
                if(state.currPage===1){
                    state.currPage=1;
                } else {
                    state.currPage--;
                }
            },
            currentPage(state, action) {
                state.currPage=action.payload
            },
            firstPage(state, action) {
                state.currPage=1;
            },
            lastPage(state, action){
                state.currPage=state.totalPage
            }
      ```