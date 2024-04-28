import React, {useState, useEffect} from 'react';
import {Text, Box, Spacer, useInput, Newline} from 'ink';
import BigText from 'ink-big-text';

import Menu from '../../components/menu.js';

import useBackgroundMusic from '../../hooks/useBackgroundMusic.js';
import useDifficulty from '../../hooks/useDifficulty.js';

import { danLevelForMmr } from "../../utils/ranks.js"

// import logAction from "./tracker.js"
import Gradient from 'ink-gradient';

const Osoup = () => {
	const backgroundMusic = useBackgroundMusic()
	const { robeatsCsMmr } = useDifficulty();

	let optionsList = [ "User stats", "Session list" ]

	if (!backgroundMusic)
		return

	return (
		<Box marginLeft="auto" marginRight="auto" justifyContent="center" flexDirection="column">
			<Box justifyContent="center">
				<Gradient colors={["rgb(244, 145, 255)", "white"]}>
					<BigText text="osoup"></BigText>
				</Gradient>
			</Box>
			<Box justifyContent="center" marginTop={-1}>
				<Text italic color="gray">The osu! companion you needed.</Text>
			</Box>
			<Box justifyContent="center" marginTop={1}>
				<Gradient name="atlas">
					<Text>📻 </Text>
					<Text color="gray">{backgroundMusic.metadata.title} - </Text>
					<Text color="gray">{backgroundMusic.metadata.artist} </Text>
					<Text color="magenta">({backgroundMusic.metadata.difficulty}) </Text>
				</Gradient>
				<Text inverse color="yellow">{robeatsCsMmr?.toFixed(0)} ({danLevelForMmr(robeatsCsMmr || 0)})</Text>
			</Box>
			<Box marginLeft="auto" marginRight="auto" justifyContent="center" marginTop={2} flexDirection="column">
				<Menu optionsList={optionsList} />
			</Box>
		</Box>
	)
};

export default Osoup