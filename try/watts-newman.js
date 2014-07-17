// http://networkx.lanl.gov/reference/generated/networkx.generators.random_graphs.newman_watts_strogatz_graph.html#networkx.generators.random_graphs.newman_watts_strogatz_graph
// newman_watts_strogatz_graph(n, k, p, seed=None)[source]    
// Return a Newman-Watts-Strogatz small world graph.

// Parameters :	
// n : int
// The number of nodes
// k : int
// Each node is connected to k nearest neighbors in ring topology
// p : float
// The probability of adding a new edge for each edge
// seed : int, optional
// seed for random number generator (default=None)
// See also
// watts_strogatz_graph

// Notes

 
// First create a ring over n nodes. Then each node in the ring is connected with its k nearest neighbors (k-1 neighbors if k is odd). Then shortcuts are created by adding new edges as follows: for each edge u-v in the underlying “n-ring with k nearest neighbors” with probability p add a new edge u-w with randomly-chosen existing node w. In contrast with watts_strogatz_graph(), no edges are removed.

//Following implementation of above algorithm works ok, but is not optimized very well. You could memoize a lot more paths for instance.

var g10 = [ [ 1, 1, 1, 0, 0, 0, 0, 0, 1, 1 ],
  [ 1, 1, 1, 1, 0, 0, 0, 0, 0, 1 ],
  [ 1, 1, 1, 1, 1, 0, 0, 0, 0, 0 ],
  [ 0, 1, 1, 1, 1, 1, 0, 0, 0, 0 ],
  [ 0, 0, 1, 1, 1, 1, 1, 0, 0, 0 ],
  [ 0, 0, 0, 1, 1, 1, 1, 1, 0, 0 ],
  [ 0, 0, 0, 0, 1, 1, 1, 1, 1, 0 ],
  [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 1 ],
  [ 1, 0, 0, 0, 0, 0, 1, 1, 1, 1 ],
  [ 1, 1, 0, 0, 0, 0, 0, 1, 1, 1 ] ];
var g20 = [ [ 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1 ],
  [ 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
  [ 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0 ],
  [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0 ],
  [ 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1 ],
  [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1 ],
  [ 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1 ] ];
var g30 = [ [ 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1 ],
  [ 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
  [ 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0 ],
  [ 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 ],
  [ 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1 ],
  [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1 ],
  [ 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1 ] ];

var start = (new Date()).getTime();
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

var extraEdges = 0;
function wnGraph(n, k, p) {
    p = p/100;
    
    function index(i, offset) {
        i = i + offset;
        if (i<0) return n + i;
        if (i>n-1) return i-n;
        return i;
    }
  
    var edges = [];
    for ( var i=0; i<n; i++) {
        edges[i] = [];
        for (var j=0; j<n; j++) {
            edges[i][j] = i === j ? 1 : 0;
        }
    } 
    for ( i=0; i<n; i++) {
        for (j=1; j<=k; j++) {
            edges[i][index(i,j)] = 1;
            edges[i][index(i,-j)] = 1;
        }
        if (Math.random() < p) {
            var r = getRandomInt(n);
            if (r!==i && edges[i][r] !== 1 )  {
                // console.log(i,r);
                edges[i][r] = 1;
                edges[r][i] = 1;
                extraEdges ++;
            }
        }
    }
    return edges;
    
}

function copy(a) {
    return a.map(function(e) {
        return e;
    });
}

function leastHops(g, n1, n2) {
    if (sPaths[n1][n2]) return sPaths[n1][n2];
    var n = g.length;
    var maxHops = 1000;
    function min(a,b) {
        return a<b ? a : b;
    }
    
    var shortestPath = [];
    function hops(n1, n2, h) {
        if (Math.random() < .000001) {
            process.stdout.write('+');   
        }
        if (g[n1[n1.length-1]][n2]) {
            if (h<maxHops) {
                maxHops = h;
                shortestPath = copy(n1);
                shortestPath.push(n2);
            }
        }
        else if (h < maxHops) {
            for (var i=0; i<n; i++) {
                if (g[n1[n1.length-1]][i]) {
                    n1.push(i);
                    //pursue path
                    hops(n1, n2, h + 1);
                    n1.pop(i);
                }
            }
        }
    };
    
    
    hops([n1], n2, 1);
    memoize(shortestPath);
    return shortestPath;
}

function memoize(path) {
    // console.log(path.length);
    for (var i = 0; i<path.length; i++) {
        for (var j = i+1; j<path.length; j++){
            // console.log(path.slice(i,j+1));
            sPaths[path[i]][path[j]] = path.slice(i,j+1);
            sPaths[path[j]][path[i]] = path.slice(i,j+1).reverse();
        }
    }
        
    // sPaths[n1][n2] = shortestPath;
    // sPaths[n2][n1] = shortestPath.reverse();
}

var sPaths;
// initShortestPaths(10);
// memoize([1,2,3,4,5]);
// for (var i = 0; i<sPaths.length; i++) {
//     for (var j = 0; j<sPaths.length; j++){
//         if (sPaths[i][j]) {
//             console.log(i + '-> ' + j, sPaths[i][j]);
//         }
//     }
// }
// console.log(sPaths);


function initShortestPaths(n) {
    sPaths = [];
    for (var i=0; i< n; i++) {
        sPaths[i] = [];
        // for (var j=0; i< n; i++) {
        //     p[i][j] = 
        // }
    }
    
}


function analyseWnGraph(d) {
    var g = wnGraph(d.n, d.k, d.p); 
    // var g = g10;
    // console.log(g);
    
    console.log("Total-nodes: ", d.n);
    console.log("Total-edges: ", d.n * d.k + extraEdges);
    console.log("Extra-edges: ", extraEdges);

    var res = [];
    var total = 0;
    initShortestPaths(d.n);
    console.log("From-node:");
    
    for (var i = 0; i < g.length-1; i++) {
        process.stdout.write('' + i + '->');
        for (var j = i+1; j < g.length; j++) {
            process.stdout.write(' ' + j + ' ');
            // if (i === j) continue;
            var shortestPath= leastHops(g, i, j);
            // console.log(shortestPath);
            var h = shortestPath.length-1;
            res.push(h);
            total += h;
        }
        console.log();
    }

    res.sort();
    
    console.log("Total-connections: ", res.length);
    // console.log(res);
    console.log('Range: ' + res[0] + '-' + res[res.length-1]);
    console.log("Average: " + total/res.length);
    console.log("Median: " + res[Math.floor((res.length+1)/2)] );
    var dist = {};
    res.forEach(function(h) {
        dist[h] = dist[h] || 0;
        dist[h]++;
    });
    var max = 0, mode;
    Object.keys(dist).forEach(function(d) {
        if (dist[d] > max) {
            mode = d;
            max = dist[d];
        }
    });
    console.log("Distribution: ", dist);
    Object.keys(dist).forEach(function(k) {
        dist[k] =  Math.round((dist[k]/res.length)*100) + "%";
    });
    console.log("Distribution: ", dist);
    console.log("Mode: ", mode);

}

// analyseWnGraph({ n:10, k:2, p:20 });
// analyseWnGraph({ n:20, k:2, p:50 });
// analyseWnGraph({ n:30, k:2, p:50 });
analyseWnGraph({ n:50, k:2, p:50 });

var end = (new Date()).getTime();
console.log((end-start)/1000 + ' seconds') ;

//g10
// Total-connections:  45
// Range: 1-3
// Average: 1.6666666666666667
// Median: 2
// Distribution:  { '1': 20, '2': 20, '3': 5 }
// Distribution:  { '1': '44%', '2': '44%', '3': '11%' }
// Mode:  1
// 0.374 seconds

//g20
// Total-connections:  190
// Range: 1-4
// Average: 2.210526315789474
// Median: 2
// Distribution:  { '1': 45, '2': 72, '3': 61, '4': 12 }
// Distribution:  { '1': '24%', '2': '38%', '3': '32%', '4': '6%' }
// Mode:  2
// 2.336 seconds

//g30
// Total-connections:  435
// Range: 1-5
// Average: 2.5586206896551724
// Median: 3
// Distribution:  { '1': 71, '2': 131, '3': 161, '4': 63, '5': 9 }
// Distribution:  { '1': '16%', '2': '30%', '3': '37%', '4': '14%', '5': '2%' }
// Mode:  3
// 6.028 seconds

//g50
// Total-connections:  1225
// Range: 1-5
// Average: 2.8
// Median: 3
// Distribution:  { '1': 126, '2': 295, '3': 516, '4': 274, '5': 14 }
// Distribution:  { '1': '10%', '2': '24%', '3': '42%', '4': '22%', '5': '1%' }
// Mode:  3
// 40.591 seconds
