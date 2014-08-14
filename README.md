##Benchmark To [Link](http://cnodejs.org/topic/53eae4fff4b616a82f025533)

###如何开始

####复制本测试项目
```sh
$ git clone https://github.com/idy/53eae4fff4b616a82f025533
```

####安装依赖并生成测试数据
```sh
$ cd 53eae4fff4b616a82f025533
$ npm i

Gen 1 json files, 800 rows and 800 cols each.
Gen 1 json files, 1600 rows and 400 cols each.
Gen 1 json files, 3200 rows and 200 cols each.
Gen 1 json files, 6400 rows and 100 cols each.
Gen 1 json files, 12800 rows and 50 cols each.
Gen 1 json files, 100 rows and 100 cols each.
Gen 1 json files, 200 rows and 200 cols each.
Gen 1 json files, 400 rows and 400 cols each.
Gen 1 json files, 800 rows and 800 cols each.
Gen 1 json files, 1600 rows and 1600 cols each.
```

####执行测试
```sh
$ npm test
```

###创建自己的测试样例
```sh
$ node ./bin/gen-json.js -n 文件数 -r 行数 -c 列数 -p 前缀 -o 输出路径
```

###测试结果
```sh
Speed test
    Scale at: 800 x 800
      ✓ col2row (392ms)
      ✓ col2row2 (454ms)
      ✓ col2row should equal to col2row2 (1ms)
    Scale at: 400 x 1600
      ✓ col2row (315ms)
      ✓ col2row2 (337ms)
      ✓ col2row should equal to col2row2
    Scale at: 200 x 3200
      ✓ col2row (412ms)
      ✓ col2row2 (936ms)
      ✓ col2row should equal to col2row2
    Scale at: 100 x 6400
      ✓ col2row (387ms)
      ✓ col2row2 (264ms)
      ✓ col2row should equal to col2row2
    Scale at: 50 x 12800
      ✓ col2row (331ms)
      ✓ col2row2 (97ms)
      ✓ col2row should equal to col2row2

  Complexity test
    Scale at: 100 x 100
      ✓ linear
      ✓ col2row2 (3ms)
      ✓ col2row (5ms)
    Scale at: 200 x 200
      ✓ linear
      ✓ col2row2 (30ms)
      ✓ col2row (26ms)
    Scale at: 400 x 400
      ✓ linear (1ms)
      ✓ col2row2 (96ms)
      ✓ col2row (87ms)
    Scale at: 800 x 800
      ✓ linear
      ✓ col2row2 (552ms)
      ✓ col2row (722ms)
    Scale at: 1600 x 1600
      ✓ linear
      ✓ col2row2 (2672ms)
      ✓ col2row (1854ms)


  30 passing (10s)
```

col2row2 并不是 O(n+m) 这是毫无悬念的。任何复杂度都是从最根本的实现得来的，一个数组有 n*m 个元素，
最后需要的结果几乎对每个元素都进行了一次移动，所以至少每个元素都要访问一次，不管采用了怎样的隐式手法。
所以复杂度一定是 O(n*m) 的。但是出乎意料的是，当列远小于行数时，用 col2row2 这个方法明显的快了很多。
当列数小的时候，字符串拼接的时间损耗比较低，eval的执行又是带缓存的，所以比直接循环快很多。

我们将 [rowcol.js](https://github.com/bsspirit/ape-algorithm/blob/master/rowcol.js) 
文件的第72行改成如是模样：`eval(str + ';' + Math.random());`，再执行 `npm test`:
```sh
$ npm test

  Speed test
    Scale at: 800 x 800
      ✓ col2row (367ms)
      ✓ col2row2 (4241ms)
      ✓ col2row should equal to col2row2
    Scale at: 400 x 1600
      ✓ col2row (305ms)
      ✓ col2row2 (3379ms)
      ✓ col2row should equal to col2row2
    Scale at: 200 x 3200
      ✓ col2row (854ms)
      ✓ col2row2 (3218ms)
      ✓ col2row should equal to col2row2
    Scale at: 100 x 6400
      ✓ col2row (417ms)
      ✓ col2row2 (4137ms)
      ✓ col2row should equal to col2row2
    Scale at: 50 x 12800
      ✓ col2row (340ms)
      ✓ col2row2 (3284ms)
      ✓ col2row should equal to col2row2

  Complexity test
    Scale at: 100 x 100
      ✓ linear
      ✓ col2row2 (50ms)
      ✓ col2row (6ms)
    Scale at: 200 x 200
      ✓ linear (1ms)
      ✓ col2row2 (193ms)
      ✓ col2row (27ms)
    Scale at: 400 x 400
      ✓ linear
      ✓ col2row2 (760ms)
      ✓ col2row (89ms)
    Scale at: 800 x 800
      ✓ linear
      ✓ col2row2 (7489ms)
      ✓ col2row (2764ms)
    Scale at: 1600 x 1600
      ✓ linear
      ✓ col2row2 (22842ms)
      ✓ col2row (2758ms)


  30 passing (58s)
```
与上次相比，col2row2都慢了很多。这是因为每次eval的字符串都发生了变化。
[关于eval](http://moduscreate.com/javascript-performance-tips-tricks/)。
