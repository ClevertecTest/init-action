const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
  try {
    const owner = core.getInput('owner', { required: true });
    const repo = core.getInput('repo', { required: true });
    const pull_number = core.getInput('pull_number', { required: true });
    const token = core.getInput('token', { required: true });

    const octokit = new github.getOctokit(token);

    await octokit.rest.pulls.requestReviewers({
      owner,
      repo,
      pull_number,
      reviewers: [
        'Rastamanby',
        'Gaurrus',
        'ValadzkoAliaksei',
        // 'dariavorom',
        'Ivan6813',
        'graffad',
        // 'vvikota',
        // 'vsachenko',
        // 'Snoop593',
        // 'Java-zhara',
      ],
    });
  } catch (error) {
    core.setFailed(error.message);
  }
};

// Call the main function to run the action
main();
