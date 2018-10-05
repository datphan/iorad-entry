
# Entry dir for iorad dev


1. Set up the first entry
    ```
    $ git clone https://github.com/teracyhq/dev.git iorad-dev-new
    $ cd iorad-dev-new
    $ git checkout develop
    ```


    Set up the `workspace/teracy-dev-entry` if it is not exist
    ```
    $ TERACY_DEV_ENTRY_LOCATION_GIT=https://github.com/datphan/iorad-entry.git TERACY_DEV_ENTRY_LOCATION_BRANCH=develop TERACY_DEV_ENTRY_LOCATION_SYNC=true vagrant status
    ```

    NOTE: make sure `workspace/teracy-dev-entry` is up to date if exist

2. Setting up you app
    
    Edit directly at `teracy-dev-entry/config_default.yaml` or better create `config_override.yaml` and put in:

    ```
    variables:
      gs_access_key_id: # fill yours
      gs_secret_access_key: # fill yours
      gs_project_id: teracy-iorad
      github_name: # fill yours
      gitlab_username: ${GITLAB_USERNAME:-username} # fill yours
      gitlab_password: ${GITLAB_PASSWORD:-password} # fill yours

    vagrant-vm:
      docker:
        entries:
          - _id: "0"
            host: registry.gitlab.com
            force: false
            username: "%{gitlab_username}"
            password: "%{gitlab_password}"
    ```

    Init iorad app

    ```
    $ cd workspace/
    $ git clone <iorad-repo>
    ```

3. Start your VM

    ```
    $ GITLAB_USERNAME=username GITLAB_PASSWORD=password vagrant up
    $ # or vagrant up # if you has input your credentials in the config already
    ```

    Make sure the content of yours `/etc/hosts` are clean, open `/etc/hosts` and check if it has some thing like this:
    ```
    ## vagrant-hostmanager-start id: 7ad31f5b-223b-4673-9f93-54d6f940a1ea
    192.168.1.88  dev.iorad.local
    ...
    ...
    ## vagrant-hostmanager-end
    ```

    Lets delete all of it, then

    ```
    $ vagrant hostamanger
    ```

4. Start the app **inside the VM**
    ```
    $ vagrant ssh
    $ cd /vagrant/workspace/iorad
    ```

    Restore data first
    ```
    $ ./data.sh restore upstream develop

    ```

    Then run dev mode
    ```
    $ docker-compose up -d dev
    $ docker-compose logs -f webpack dev
    ```

  It will take a long time for `webpack` to complete install node packages

  When it done, open http://dev.iorad.local/

# Debug

When you encounter errors or the app stop working

1. View the log

  ```
  $ docker-compose ps
  $ docker-compose logs -f dev
  $ # or docker-compose logs -f webpack
  ```

2. Try this step if the `app` service is not working
  
  - You should copy the content at [files/package.json](files/package.json) to `iorad/packages.json`

  - If there are `symlink` errors, open `iorad/run-app.sh` and replace `npm install --only-dev` to:
    ```
    # npm install --no-bin-links --only=dev
    ```

  - The `app` needs to keep running, if its not, add this line to the end of `iorad/run-app.sh`
    ```
    tail -f /dev/null && wait
    ```

3. If the `dev` service stop working, start it again

  ```
  $ docker-compose stop dev
  $ docker-compose up -d dev
  $ # or docker-compose exec dev yarn run dev
  ```
