
#### [사이트 바로가기] 
https://hingnih.github.io/todos/

#### [기술스택]
JavaScript | CSS | SCSS | HTML | React 

![image](https://github.com/user-attachments/assets/d3770d7b-b68f-4236-b959-3c64b8eccde0)

![image](https://github.com/user-attachments/assets/de2efac3-ad84-480a-83c4-59e7962ff555)
#### [컴포넌트 구조]
```
return (
    <div className='Todos'>
        <h2>TO DO LIST</h2>
        <TodoInput onAdd={onAdd} />
        <TodoList 
            todos={todos} 
            onDel={onDel} 
            onEdit={onEdit} 
            onMode={onMode} 
            onSave={onSave} 
        />
    </div>
);
```
- TodoInput
    - 사용자로부터 텍스트를 입력받습니다. 
- TodoList 
  - todos 배열을 받아서 각각의 할 일을 렌더링합니다. 각 할 일에 대해 삭제(onDel), 수정(onEdit/onMode), 수정저장(onSave) 기능을 위한 함수를 전달합니다.
 ---
[주요기능]
### 1. 상태 변수 (useState와 useRef)
```
const [todos, setTodos] = useState([]); // 할 일 목록을 저장하는 상태
const no = useRef(1); // 아이디를 생성하는 참조 변수
const [isMod, setIsMod] = useState(false); // 수정 상태를 추적하는 상태 (테스트용)
```
### 2. 할 일 추가 (onAdd)
```
const onAdd = (text) => {
    setTodos([
        ...todos,
        { id: no.current++, text, isDone: false, isMod: false }
    ]);
};
```
### 3. 할 일 삭제 (onDel)
```
const onDel = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
};
```
### 4. 할 일 수정 상태 변경 (onEdit)
```
const onEdit = (e, id) => {
    const { checked } = e.target; 
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isDone: checked } : todo));
};
```
### 5. 수정 모드 전환 (onMode)
```
const onMode = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isMod: true } : todo));
};
```
### 6. 수정된 데이터 저장 (onSave)
```const onSave = (id, text) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isMod: false, text } : todo));
};```