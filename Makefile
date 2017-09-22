export IMAGE=innovatesw
export APP=isw
export PORT=4000

build: clean
	docker build -t $(IMAGE) .

run:
	docker run -d -p=$(PORT):$(PORT) --name="$(APP)" $(IMAGE)

up: build run

stop:
	docker stop $(APP); docker rm $(APP)

clean:
	(docker rm -f $(APP)) || true
	(docker volume rm `docker volume ls -qf "dangling=true"`) || true
	(docker rmi `docker images -qf "dangling=true"`) || true
	(docker rmi $(IMAGE)) || true

