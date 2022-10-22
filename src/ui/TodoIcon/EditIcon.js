import React from 'react';
import { TodoIcon } from './index';

function EditIcon({ onEdit }) {
    return(
        <TodoIcon
            type='edit'
            onClick={onEdit}
        />
    );
}

export { EditIcon };