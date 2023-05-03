const USELESS_LABELS_WHEN_ISSUE_IS_CLOSED = [
    "codeReview",
    "maturation",
    "review",
    "waitingForDev"
];

module.exports = async ({ github, context }) => {
    for (const uselessLabel of USELESS_LABELS_WHEN_ISSUE_IS_CLOSED) {
        if(! context.payload.issue.labels.some(({ name }) => name === uselessLabel)) { continue; }

        github.rest.issues.removeLabel({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: context.payload.issue.number,
            name: uselessLabel
        })
    }
}