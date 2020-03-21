const {spawnSync} = require('child_process');
const fs = require('fs-extra');
const chalk = require('chalk');
const rimraf = require('rimraf');
const path = require('path');
var inquirer = require('inquirer');

const tempPath = `.temp`;
const tempGitRepoFolder = `${tempPath}/israeli-bank-scrapers`;
const nodeModulesFolder = `node_modules/israeli-bank-scrapers`;
const gitRepoUrl = `https://github.com/eshaham/israeli-bank-scrapers.git`;
const gitRepoBranch = 'adapters';

function runSpawn(command, args, extra = {}) {
  const stdio = typeof extra.stdio === 'string' ? [extra.stdio,extra.stdio, 'pipe'] :
    Array.isArray(extra.stdio) && extra.stdio.length === 3 ? [extra.stdio[0], extra.stdio[1], 'pipe'] : 'inherit' // 'pipe'
  const result = spawnSync(command, args, { ...extra, stdio});

  if (result.status === null || result.status !== 0) {
    throw new Error(result.stderr || 'general error');
  }

  return result;
}


function gitClone(name, branch) {
  console.log(chalk.blue(`git clone ${name}#${branch}`));
  return runSpawn(
    'git',
    [
      'clone',
      '--depth',
      '1',
      '--single-branch',
      '--branch',
      branch,
      name,
    ],
    {cwd: tempPath, stdio: 'inherit'}
  );
}

async function cloneRepository() {

  fs.emptyDirSync(tempPath);
  gitClone(gitRepoUrl, gitRepoBranch);
}

function buildRepo() {
  console.log(chalk.blue(`build repo`));
  return runSpawn(
    'npm',
    [
      'run',
      'build'
    ],
    {cwd: tempGitRepoFolder, stdio: 'inherit'}
  );
}

function installDependencies() {

  console.log(chalk.blue('install dependencies'));
  runSpawn(
    'npm',
    [
      'install'
    ],
    {cwd: `${tempPath}/israeli-bank-scrapers`}
  );
}

function symlinkRepo() {
  const destination = path.resolve(nodeModulesFolder);

  console.log(chalk.blue('symlink to adapters repo'));
  runSpawn(
    'npm',
    [
      'link',
      tempGitRepoFolder
    ]
  );
}

(async function() {
  try {
    rimraf.sync(workspacePath);
    await cloneRepository();
    installDependencies();
    await buildRepo();
    symlinkRepo();

  } catch (err) {
    console.error(err);
  }
})();
