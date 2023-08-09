import classNames from 'classnames';
import styles from './card.module.scss';
import { useRef } from 'react';

export interface CardProps {
    className?: string;
    id: number;
    desc: string;
    isDone: boolean;
    delTodo?: any;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const Card = ({ id, className, desc, isDone, delTodo }: CardProps) => {
    const isChecked = useRef<HTMLInputElement>(null);

    const editTodo = (id: number) => {
        let existingData = [];
        const existingDataString = localStorage.getItem('todos');
        if (existingDataString) {
            existingData = JSON.parse(existingDataString);
        }

        let targetIndex = existingData.findIndex((el: any) => el.id === id);
        existingData[targetIndex].isDone = isChecked.current?.checked;

        localStorage.setItem('todos', JSON.stringify(existingData));
    };
    
    return (
        <div className={classNames(styles.root, className)}>
            <div className={classNames(styles.card)}>
                <input
                    type="checkbox"
                    className={styles.check}
                    defaultChecked={isDone}
                    onChange={() => editTodo(id)}
                    ref={isChecked}
                />
                <p className={styles.desc}>{desc || 'Deskripsi dari todo'}</p>
                <button className={styles.btn} onClick={undefined}>
                    Edit
                </button>
                <button className={classNames(styles.btn, styles['del-btn'])} onClick={delTodo}>
                    Delete
                </button>
            </div>
        </div>
    );
};
