
# Entry dir for iorad dev


1. Set up the first entry
    ```
    $ git clone https://github.com/teracyhq/dev.git iorad-dev-new
    $ cd iorad-dev-new
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
      gitlab_username: # fill yours
      gitlab_password: # fill yours

    vagrant-vm:
      docker:
        entries:
          - _id: "0"
            host: registry.gitlab.com
            force: false
            username: %{gitlab_username}
            password: %{gitlab_password}
    ```

    Init iorad app

    ```
    $ cd workspace/
    $ git clone <iorad-repo>
    ```

3. Start your VM

    ```
    $ vagrant up
    $ vagrant hostmanager
    ```

4. Start the app inside the VM
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
  Copy the content at [files/package.json](files/package.json) to `iorad/packages.json`

  Open `iorad/run-app.sh`, replace `npm install --only-dev` to:
  ```
  # npm install --no-bin-links --only=dev
  ```

3. If the `dev` service stop working, start it again

  ```
  $ docker-compose stop dev
  $ docker-compose up -d dev
  $ # or docker-compose exec dev yarn run dev
  ```
