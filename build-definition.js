const { writeFileSync } = require("fs");
const { join } = require("path");
const { lstatSync, readdirSync, readFileSync } = require("fs");

const package = require("./package.json");
let buildVersion = package.version;

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source =>
  readdirSync(source)
    .map(name => join(source, name))
    .filter(isDirectory);
const repos = [];
let count = 0;

getDirectories(__dirname).forEach(dir => {
  if (dir.includes(".git")) {
    return;
  }
  const packageJson = JSON.parse(readFileSync(dir + "/package.json", "utf8"));

  if (packageJson.repository) {
    count++;
    repos.push({
      id: count,
      repo: packageJson.name.split('/')[1],
      label: packageJson.name,
      url: packageJson.repository.url,
      namespace: 'rxdi',
    });
  }
});

repositories = [
  { label: '@rxdi/graphql', namespace: 'rxdi', repo: 'graphql', id: 1 },
  { label: '@rxdi/neo4j', namespace: 'rxdi', repo: 'neo4j', id: 2 },
  { label: '@rxdi/core', namespace: 'rxdi', repo: 'core', id: 3 },
  { label: '@gapi/core', namespace: 'Stradivario', repo: 'gapi-core', id: 4 },
];

writeFileSync(
  "definitions.json",
  JSON.stringify(repos, null, 2),
  "utf8"
);