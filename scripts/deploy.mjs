#!/usr/bin/env zx
import "zx/globals";

const registry = "harbor.marcmarina.com";
const project = "library";
const app = "drizzle-playground";
const tag = await $`git rev-parse --short HEAD`;

const image = `${registry}/${project}/${app}:${tag}`;

const namespace = "default";

// Build
export async function build() {
  console.log(chalk.blue(`Building ${app}:${tag}...`));

  await $`docker build -t ${image} . --platform=linux/amd64`;
  await $`docker push ${image}`;

  console.log(chalk.green(`✓ Built ${app}:${tag}`));
}

// Deploy
export async function deploy() {
  console.log(chalk.blue(`Deploying ${app}:${tag}...`));

  await $`helm upgrade --install ${app} ./helm \
    --set image.tag=${tag} \
    --namespace ${namespace}`;

  console.log(chalk.green(`✓ Deployed ${app}:${tag}`));
}

await build();
await deploy();
