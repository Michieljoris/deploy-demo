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
            edges[i][j] = 0;
        }
        for (j=1; j<=k; j++) {
            edges[i][index(i,j)] = 1;
            edges[i][index(i,-j)] = 1;
        }
        if (Math.random() < p) {
            var r = getRandomInt(n);
            if (Math.abs(r - i) > k)  {
                edges[i][index(i,r)] = 1;
                extraEdges ++;
            }
        }
    }
    return edges;
    
}

function leastHops(g, n1, n2) {
    var n = g.length;
    var maxHops = 1000;
    function min(a,b) {
        return a<b ? a : b;
    }
    
    function hops(n1, n2, h) {
        if (Math.random() < .000001) {
            process.stdout.write('+');   
        }
        if (g[n1][n2]) {
            maxHops = min(h, maxHops);
        }
        else if (h < maxHops) {
            for (var i=0; i<n; i++) {
                if (g[n1][i]) {
                    //pursue path
                    hops(i, n2, h + 1);
                    
                }
            }
        }
    };
    hops(n1, n2, 1);
    return maxHops;
}

function analyseWnGraph(d) {
    var g = wnGraph(d.n, d.k, d.p); 
    
    console.log("Total-edges: ", d.n * d.k + extraEdges);
    console.log("Extra-edges: ", extraEdges);

    var res = [];
    var total = 0;
    for (var i = 0; i < g.length; i++) {
        process.stdout.write(' ' + i + ' ');
        for (var j = 0; j < g.length; j++) {
                var h = leastHops(g, i, j);
            res.push(h);
            total += h;
        }
        // console.log();
    }

    res.sort();
    console.log();
    console.log('Range: ' + res[0] + '-' + res[res.length-1]);
    console.log("Average: " + total/res.length);
    console.log("Median: " + res[Math.floor((res.length+1)/2)] );
        var dist = {};
    res.forEach(function(h) {
        dist[h] = dist[h] || 0;
        dist[h]++;
    });
    console.log("Distribution: ", dist);
    var max = 0, mode;
    Object.keys(dist).forEach(function(d) {
        if (dist[d] > max) {
            mode = d;
            max = dist[d];
        }
    });

    console.log("Mode: ", mode);

}

// analyseWnGraph({ n:20, k:2, p:50 });
// analyseWnGraph({ n:30, k:2, p:50 });
analyseWnGraph({ n:70, k:2, p:100 });



