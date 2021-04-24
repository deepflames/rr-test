#!/bin/bash

docker stop rr_test
docker rm rr_test
docker rmi rr:test

set -e

docker build -f Dockerfile --rm -t rr:test --label "rr=true" .

docker run -it -p 3000:3000 -d --name rr_test rr:test
