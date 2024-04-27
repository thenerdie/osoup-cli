#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';

import calculate from './utils/minacalc.js';

const cli = meow(
	`
		Usage
		  $ osoup-cli

		Options
			--name  Your name

		Examples
		  $ osoup-cli --name=Jane
		  Hello, Jane
	`,
	{
		importMeta: import.meta,
	},
);

render(<App name={cli.flags.name} />);
