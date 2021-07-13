# DevContainer Starter (with Next.js and Serverless)

This starter assumes the use of VS Code and [Remote Containers](https://code.visualstudio.com/docs/remote/containers) extension. Check out this [tutorial](https://code.visualstudio.com/docs/remote/containers-tutorial) as well.

## Features

- Integrated Node.js environment with ZSH, Oh-my-ZSH and Powerlevel10k out of the box.
- Linuxbrew (run `brew update` to use it)
- Next.js
- Pulumi
- ZSH Autosuggestions and ZSH Syntax Highlighting

## Instructions

1. Install [Docker](https://www.docker.com/products/docker-desktop).
2. Install [Meslo Nerd Fonts](https://github.com/romkatv/powerlevel10k#manual-font-installation) in your host machine.
3. Use the option "Reopen in Container" and open a new zsh terminal. (This might take a while. Grab a coffee, or something).
4. Configure Powerlevel10k to your own unique taste.

Enjoy!

---

TODO:
[x] Configure Azure Functions Locally
[x] Configure Yarn Workspaces for both Next.js and Functions
[x] Use package.json scripts to launch both Next.js and Azure Functions
[x] Implemented React Query and successfully proxied/fetched from the Azure Function
[ ] Implement Pulumi for automated IaC
[ ] Try out a deployment in an Azure Test Account
[x] Implement Typescript in both Functions and Next.js app
[x] Configure Eslint and Prettier
