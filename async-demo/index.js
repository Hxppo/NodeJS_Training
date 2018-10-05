console.log('Before');

// Promise 
// getUser(1)
//     .then(user => getRepositories(user.gitHubUsername))
//     .then(repos => getCommits(repos[0]))
//     .then(commits => console.log(commits))
//     .catch(err => console.log('Error: ', err.message));

// Async & Wait
async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
    } catch(err) {
        console.log(err.message);
    }

    console.log(commits);
}

displayCommits();

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Connect to Database...');
            resolve({ id: id, gitHubUsername: 'Xin' });
        }, 2000);
    });
}

function getRepositories(userName, callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
}

function getCommits(repos, callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Calling GitHub API...");
            resolve(['commit1', 'commit2', 'commit3']);
        }, 2000);
    });
}
