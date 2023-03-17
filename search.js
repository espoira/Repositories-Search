async function searchRepos() {

  let repos = [];
  let subName = document.getElementById('repo-name').value;
  
  let repo = fetch(`https://api.github.com/search/repositories?q=${subName}`).then(
    successResponse => {
      if (successResponse.status != 200) {
        return null;
      } else {
        return successResponse.json();
      }
    },
    failResponse => {
      return null;
    }
  );
  repos.push(repo);
  
  let results = await Promise.all(repos);

  return results;
}

document.onkeydown = function(e) {
  if (e.key == 'Enter') {
    searchRepos();
  }
}
