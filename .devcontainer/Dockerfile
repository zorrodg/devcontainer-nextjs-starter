# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.183.0/containers/javascript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version: 16, 14, 12 (overriden in .devcontainer)
ARG VARIANT="16-buster"
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

# Configure apt
ENV DEBIAN_FRONTEND=noninteractive

# Installing additional OS Packages
RUN apt-get update \
    && apt-get -y install --no-install-recommends \
    curl \
    git-core \
    gnupg \
    linuxbrew-wrapper \
    locales \
    zsh \
    wget \
    tree \
    jq \
    fonts-powerline \
    ca-certificates \
    apt-transport-https \
    lsb-release \
    # set up locale
    && locale-gen en_US.UTF-8 && fc-cache -vf

# Azure CLI
RUN curl -sL https://aka.ms/InstallAzureCLIDeb | bash

ENV DEBIAN_FRONTEND=dialog
ENV SHELL=/bin/zsh

ARG USER="node"
ARG GROUP="node"

USER ${USER}

# Make variables available in Shell Env
ENV USER=${USER}
ENV GROUP=${GROUP}
WORKDIR /home/${USER}

# Install Oh-my-ZSH
RUN wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh || true

# Install powerlevel10k
RUN git clone https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/themes/powerlevel10k

# Install ZSH Autosuggestions
RUN git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# Install ZSH Syntax Highlighting
RUN git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# Install Pulumi
RUN curl -fsSL https://get.pulumi.com | bash

# Install global tools
RUN yarn global add \ 
    azure-functions-core-tools@3 --unsafe-perm true