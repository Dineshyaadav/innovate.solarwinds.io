export IMAGE=innovatesw
export APP=isw
export PORT=4000
jekyll=bundle exec jekyll

build: clean
	docker build -t $(IMAGE) .

localrun:
	docker run -d -p=$(PORT):$(PORT) -v `pwd`:/app/ --name="$(APP)" -w /app/ jekyll/jekyll bash -c "jekyll build; jekyll serve"

run:
	docker run -d -p=$(PORT):$(PORT) -v `pwd`:/app/ --name="$(APP)" $(IMAGE)

up: build run

stop:
	docker stop $(APP); docker rm $(APP)

clean:
	(docker rm -f $(APP)) || true
	(docker volume rm `docker volume ls -qf "dangling=true"`) || true
	(docker rmi `docker images -qf "dangling=true"`) || true
	(docker rmi $(IMAGE)) || true

# For local testing
site:
	$(jekyll) serve

build-site:
	$(jekyll) build

setup:
	bundle install
