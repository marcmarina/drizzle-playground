#!/usr/bin/env zx
import "zx/globals";

const registry = "harbor.marcmarina.com";
const project = "library";
const app = "drizzle-playground";
const tag = argv.tag || argv._[0] || "latest";

const namespace = "default";

// Build
export async function build() {
  console.log(chalk.blue(`Building ${app}:${tag}...`));

  const image = `${registry}/${project}/${app}:${tag}`;

  await $`docker build -t ${image} .`;
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
