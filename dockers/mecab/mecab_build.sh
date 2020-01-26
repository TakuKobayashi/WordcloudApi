#!/bin/sh

docker build -t mecab_image ./
docker create -ti --name mecab mecab_image bash
docker cp mecab:/usr/local/lib/mecab/dic/ ./
docker cp mecab:/usr/local/bin/mecab ./
docker rm mecab