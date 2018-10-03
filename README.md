
# Entry dir for iorad dev


1. Set up the first entry
	```
	$ git clone https://github.com/teracyhq/dev.git iorad-dev-new
	$ cd iorad-dev-new
	$ TERACY_DEV_ENTRY_LOCATION_GIT=https://github.com/datphan/iorad-entry.git TERACY_DEV_ENTRY_LOCATION_BRANCH=develop TERACY_DEV_ENTRY_LOCATION_SYNC=true vagrant status
	```

2. Edit your gitlab username, password at `vagrant-vm.docker.entries`
	
	Edit directly at `teracy-dev-entry/config_default.yaml` or create `config_override.yaml` and put in:

	```
	vagrant-vm:
	  docker:
	    enabled: true
	    entries:
	      - _id: "0"
	        host: registry.gitlab.com
	        force: false
	        username: <your username>
	        password: <your password>
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
	$ docker-compose up -d dev
	$ docker-compose logs -f webpack dev
	```

It will take a long time for `webpack` to complete running: yarn install, ...

When it done, open http://dev.iorad.local/
