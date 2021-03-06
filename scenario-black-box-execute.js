#!/usr/bin/env node

import sync from './src/execute-black-box.js'
import utils from './src/utils.js'

import {Command} from 'commander'

const program = new Command()

program
    .requiredOption('-s, --scenario <scenario>', 'Scenario file in json')

program.on('-h, --help', () => {
    console.log('')
    console.log('Example calls:')
    console.log('  $ scenario-black-box-execute --scenario scenario.json')
    console.log('  $ scenario-black-box-execute -s scenario.json')
})

program.parse(process.argv)

const scenarios = utils.openFile(program.opts().scenario)
const scenarioJson = utils.flattenInputArray(scenarios)

sync.executeBlackBox(scenarioJson, 0)
    .then(data => {
        console.log(JSON.stringify(data, null, 2))
        return data
    })
    .catch(e => {
        console.log(e)
        expect(e).toBeUndefined()
        return e
    })
