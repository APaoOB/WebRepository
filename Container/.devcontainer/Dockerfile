#The base image for the container 
FROM mcr.microsoft.com/devcontainers/javascript-node:20

ARG USERNAME=com111-user
ARG USER_UID=1001
ARG USER_GID=$USER_UID

# Create the user
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get install -y --no-install-recommends sudo git curl wget gnupg ca-certificates \
    && groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME \
    && rm -rf /var/lib/apt/lists/* 

# ********************************************************
# * Anything else you want to do like clean up goes here *
# ********************************************************
# This snippet will save the bash history if we are not running with root user
RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
    && mkdir /commandhistory \
    && touch /commandhistory/.bash_history \
    && chown -R $USERNAME /commandhistory \
    && echo "$SNIPPET" >> "/home/$USERNAME/.bashrc"

# Install MongoDB Shell (mongosh) directly
RUN wget -qO mongosh.deb https://downloads.mongodb.com/compass/mongodb-mongosh_2.3.0_amd64.deb \
    && dpkg -i mongosh.deb \
    && rm mongosh.deb

# Install MongoDB Database Tools (mongoimport, mongodump, etc.)
RUN wget -qO mongo-tools.deb https://fastdl.mongodb.org/tools/db/mongodb-database-tools-debian12-x86_64-100.9.4.deb \
    && dpkg -i mongo-tools.deb \
    && rm mongo-tools.deb

# Install global utility packages for the course
# Includes nodemon (for the backend Express API) and vercel/render helpers
RUN npm install -g nodemon vercel

ENV PATH="/home/${USERNAME}/.local/bin:${PATH}"

# [Optional] Set the default user. Omit if you want to keep the default as root.
USER $USERNAME
 
