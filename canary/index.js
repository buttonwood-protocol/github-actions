const core = require('@actions/core');
const wait = require('./wait');
const github = require('@actions/github');


// most @actions toolkit packages have async methods
async function run() {
  try {
    const ms = core.getInput('milliseconds');
    console.log(`Waiting ${ms} milliseconds ...`)

    core.debug((new Date()).toTimeString())
    wait(parseInt(ms));
    core.debug((new Date()).toTimeString())

    core.setOutput('time', new Date().toTimeString());

      // Get client and context
      const client = new github.GitHub(
        core.getInput('repo-token', {required: true})
      );
      const context = github.context;
      const {owner, repo, number} = context.issue;
      core.debug(`owner: ${owner}`);
      core.debug(`number: ${number}`);
      core.debug(`repo: ${repo}`)
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()