for i in `seq 1 1000`;
do
    curl -G -d 'macid='$i'&lat='$RANDOM'&long='$RANDOM'&temp='$RANDOM localhost:9000/api/trackers/update
done
