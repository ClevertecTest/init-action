const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
    try {
        /**
         * We need to fetch all the inputs that were provided to our action
         * and store them in variables for us to use.
         **/
        const owner = core.getInput('owner', { required: true });
        const repo = core.getInput('repo', { required: true });
        const pull_number = core.getInput('pull_number', { required: true });
        const token = core.getInput('token', { required: true });

        /**
         * Now we need to create an instance of Octokit which will use to call
         * GitHub's REST API endpoints.
         * We will pass the token as an argument to the constructor. This token
         * will be used to authenticate our requests.
         * You can find all the information about how to use Octokit here:
         * https://octokit.github.io/rest.js/v18
         **/
        const octokit = new github.getOctokit(token);

        await octokit.rest.pulls.requestReviewers({
            owner,
            repo,
            pull_number,
            reviewers: [
                'Gaurrus'
            ]
        });

        await octokit.rest.repos.updateBranchProtection({
            owner: 'ClevertecTest',
            repo: 'sprint-1-Rastamanby',
            branch: 'main',
            required_status_checks: null,
            // required_status_checks.strict,
            // required_status_checks.contexts,
            // required_status_checks.checks[].context,
            enforce_admins: true,
            required_pull_request_reviews: {
                required_approving_review_count: 2
            },
            restrictions: null,
            // restrictions.users,
            // restrictions.teams
        })

    } catch (error) {
        core.setFailed(error.message);
    }
}

// Call the main function to run the action
main();