import { useEffect, useRef, useState } from 'react';
import styles from './App.module.scss';
import { Card } from './components/card/card';

interface CardProps {
    id: number,
    desc: string;
    isDone: boolean;
}

function generateUniqueId() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    return parseInt(`${timestamp}${random}`);
}

function App() {
    const [todos, setTodos] = useState<CardProps[]>([]);
    const inputDesc = useRef<HTMLInputElement>(null);

    const addTodo = (newDesc: string) => {
        let existingData = [];
        const existingDataString = localStorage.getItem('todos');
        if (existingDataString) {
            existingData = JSON.parse(existingDataString);
        }
        
        existingData.push({
            id: generateUniqueId(),
            desc: newDesc,
            isDone: false,
        });
        localStorage.setItem('todos', JSON.stringify(existingData));

        setTodos(existingData)
    };
    const getTodos = () => {
        const existingData = localStorage.getItem('todos');
        if (existingData) {
            setTodos(JSON.parse(localStorage.getItem('todos')!));
        }
    };

    const delTodo = (id: number) => {
        const existingDataString = localStorage.getItem('todos');
        const existingData = JSON.parse(existingDataString!);

        existingData.splice(id, 1);
        localStorage.setItem('todos', JSON.stringify(existingData));

        setTodos(existingData)
    }


    useEffect(() => {
        getTodos();
    }, []);

    return (
        <div className={styles.App}>
            <h1 className={styles.title}>TODOS</h1>

            <div className={styles['add-section']}>
                <input className={styles.input} ref={inputDesc} />
                <button className={styles.btn} onClick={() => addTodo(inputDesc.current?.value!)}>
                    Button
                </button>
            </div>

            {todos.length > 0 &&
                todos.map((el, index) => (
                    <Card
                        key={index}
                        id = {el.id}
                        desc={el.desc}
                        isDone={el.isDone}
                        delTodo={() => delTodo(index)} />)
                )
            }    
        </div>
    );
}

export default App;
