
# Entry dir for iorad dev


```

$ TERACY_DEV_ENTRY_LOCATION_GIT=https://github.com/datphan/iorad-entry.git TERACY_DEV_ENTRY_LOCATION_BRANCH=develop TERACY_DEV_ENTRY_LOCATION_SYNC=true vagrant status

```

Then

```
$ vagrant plugin install vagrant-hostmanager # if not installed
$ vagrant up
$ vagrant hostmanager

```

Shortly after that
```
$ vagrant ssh
$ cd /vagrant/workspace/iorad
$ docker-compose up -d dev
$ docker-compose logs -f webpack dev

```

It will take a long time for `webpack` to complete running: yarn install, ...

When it done, open http://dev.iorad.local/
