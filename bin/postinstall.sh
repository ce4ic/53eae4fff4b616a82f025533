cd $(dirname $(readlink -f $0))

rm ../test/spd/*.json
rm ../test/linear/*.json

ROW=800
COL=800
for scale in {1..5}
do
  node gen-json.js -o ../test/spd -p "$scale" -n 1 -r "$ROW" -c "$COL"
  ROW=$((ROW*2))
  COL=$((COL/2))
done

ROW=100
COL=100
for scale in {1..5}
do
  node gen-json.js -o ../test/linear -p "$scale" -n 1 -r "$ROW" -c "$COL"
  ROW=$((ROW*2))
  COL=$((COL*2))
done