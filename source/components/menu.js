import React, {useState, useEffect} from 'react';
import { Text, useInput } from 'ink';

export default function Menu({ optionsList }) {
    const [ selection, setSelection ] = useState(0);

    useInput((_, key) => {
		if ((key.downArrow || key.rightArrow) && selection < optionsList.length - 1) {
			setSelection(selection + 1)
		} else if ((key.upArrow || key.leftArrow) && selection - 1 >= 0) {
			setSelection(selection - 1)
		}
	})

    return optionsList.map((option, index) => {
        return <Text color={index === selection ? "#5eefff" : "gray"} key={option}>{index === selection ? "> " : "  "}{option}</Text>
    })   
}