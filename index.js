const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
    try {
        const owner = core.getInput('owner', { required: true });
        const repo = core.getInput('repo', { required: true });
        const pull_number = core.getInput('pull_number', { required: true });
        const token = core.getInput('token', { required: true });
        const url = 'https://training.cleverland.by/pull-request/opened';

        const octokit = new github.getOctokit(token);

        const { html_url } = await octokit.rest.pulls.requestReviewers({
            owner,
            repo,
            pull_number,
            reviewers: [
                'Gaurrus'
            ]
        });

        await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ link: html_url, github: owner })
        });
    } catch (error) {
        core.setFailed(error.message);
    }
}

// Call the main function to run the action
main();