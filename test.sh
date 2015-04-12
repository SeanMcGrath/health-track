#!/bin/bash

for i in `seq 1 1000`;
do
    curl -G -d 'macid=a-b-c-d-e&lat='$RANDOM'&long='$RANDOM'&temp='$RANDOM localhost:9000/api/trackers/update
    sleep .5
done
