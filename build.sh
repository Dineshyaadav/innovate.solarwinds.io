#!/usr/bin/env bash
[[ -z "${CIRCLE_TAG}" ]] && tag="$(echo $CIRCLE_SHA1 | cut -c -7)" || tag="${CIRCLE_TAG}"
echo "Computed tag: $tag"
echo "Building container image"
docker build --no-cache -t quay.io/solarwinds/solarwinds-io-innovate -f Dockerfile_ci . && \
docker tag quay.io/solarwinds/solarwinds-io-innovate quay.io/solarwinds/solarwinds-io-innovate:$tag && \
echo "Login to quay" && \
docker login -u $DOCKER_USER -p $DOCKER_PASS quay.io && \
echo "Login succeeded. Pushing images" && \
docker push quay.io/solarwinds/solarwinds-io-innovate && \
docker push quay.io/solarwinds/solarwinds-io-innovate:$tag && \
deploy="false" && \
echo "Branch name: $CIRCLE_BRANCH" && \
case $CIRCLE_BRANCH in
    "master")
    echo $MASTER_CONFIG | base64 -d > kubeconfig && \
    deploy="true"
    ;;
    "staging")
    echo $STAGING_CONFIG | base64 -d > kubeconfig && \
    deploy="true"
    ;;
esac
if [[ $deploy = "true" ]]; then
    echo "Proceeding with deployment" && \
    curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl && \
    chmod +x kubectl && \
    export KUBECONFIG=kubeconfig && \
    ./kubectl -n solarwindsio set image deployment innovate-site internal=quay.io/solarwinds/solarwinds-io-innovate:$tag && \
    sleep 5 && \
    response=`./kubectl -n solarwindsio rollout status deployments/innovate-site --watch=true` && \
    if [[ $response = *"error"* ]]; then
        echo "Deployment not successful with msg: '$response'. Rolling back. . . "
        ./kubectl rollout undo deployments innovate-site
        echo "Rolling back done . . . "
        exit 1
    fi
fi
echo "All Done."