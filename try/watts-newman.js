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

//My version of shortest path is just a dumb depth breadth search, and slow for big numbers, but with memoization, so after that progress is fast.

//Dijkstra is faster by 30x when n=200
//See here for algorithms:http://en.wikipedia.org/wiki/Shortest_path_problem

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

var gd10 = [ [ 1, 1, 1, Infinity, Infinity, Infinity, Infinity, Infinity, 1, 1 ],
  [ 1, 1, 1, 1, Infinity, Infinity, Infinity, Infinity, Infinity, 1 ],
  [ 1, 1, 1, 1, 1, Infinity, Infinity, Infinity, Infinity, Infinity ],
  [ Infinity, 1, 1, 1, 1, 1, Infinity, Infinity, Infinity, Infinity ],
  [ Infinity, Infinity, 1, 1, 1, 1, 1, Infinity, Infinity, Infinity ],
  [ Infinity, Infinity, Infinity, 1, 1, 1, 1, 1, Infinity, Infinity ],
  [ Infinity, Infinity, Infinity, Infinity, 1, 1, 1, 1, 1, Infinity ],
  [ Infinity, Infinity, Infinity, Infinity, Infinity, 1, 1, 1, 1, 1 ],
  [ 1, Infinity, Infinity, Infinity, Infinity, Infinity, 1, 1, 1, 1 ],
  [ 1, 1, Infinity, Infinity, Infinity, Infinity, Infinity, 1, 1, 1 ] ];
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

var gd30 = [ [ 1, 1, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, 1 ],
  [ 1, 1, 1, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1 ],
  [ 1, 1, 1, 1, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity ],
  [ Infinity, 1, 1, 1, 1, 1, Infinity, Infinity, Infinity, Infinity, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity ],
  [ Infinity, Infinity, 1, 1, 1, 1, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity ],
  [ Infinity, Infinity, Infinity, 1, 1, 1, 1, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity ],
  [ Infinity, Infinity, Infinity, Infinity, 1, 1, 1, 1, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity ],
  [ Infinity, Infinity, Infinity, Infinity, Infinity, 1, 1, 1, 1, 1, Infinity, Infinity, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity ],
  [ Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, 1, 1, 1, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity ],
  [ Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, 1, 1, 1, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, Infinity, 1, Infinity, Infinity, Infinity ],
  [ Infinity, Infinity, Infinity, 1, Infinity, Infinity, Infinity, Infinity, 1, 1, 1, 1, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity ],
  [ Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, 1, 1, 1, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity ],
  [ Infinity, Infinity, 1, Infinity, Infinity, Infinity, Infinity, 1, Infinity, Infinity, 1, 1, 1, 1, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity ],
  [ 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, 1, 1, 1, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity ],
  [ Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, 1, 1, 1, 1, Infinity, Infinity, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity ],
  [ Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, 1, 1, 1, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, Infinity, Infinity, Infinity, Infinity ],
  [ Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, 1, 1, 1, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, Infinity, Infinity, Infinity ],
  [ Infinity, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, 1, 1, 1, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity ],
  [ Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, 1, 1, 1, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity ],
  [ Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, Infinity, Infinity, 1, 1, 1, 1, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity ],
  [ Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, 1, 1, 1, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity ],
  [ Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, 1, 1, 1, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity ],
  [ Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, 1, 1, 1, 1, Infinity, Infinity, Infinity, 1, Infinity ],
  [ Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, 1, 1, 1, 1, Infinity, Infinity, Infinity, Infinity ],
  [ Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, 1, 1, 1, 1, Infinity, Infinity, Infinity ],
  [ Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, 1, 1, 1, 1, Infinity, Infinity ],
  [ Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, 1, 1, 1, 1, Infinity ],
  [ Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, 1, 1, 1, 1 ],
  [ 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, Infinity, Infinity, Infinity, 1, 1, 1, 1 ],
  [ 1, 1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 1, 1, 1 ] ];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

var extraEdges = 0;
function wnGraph(n, k, p, block) {
    extraEdges = 0;
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
            edges[i][j] = i === j ? 1 : block;
        }
    } 
    for ( i=0; i<n; i++) {
        for (j=1; j<=k; j++) {
            edges[i][index(i,j)] = 1;
            edges[i][index(i,-j)] = 1;
        }
        if (Math.random() < p) {
            // if (i%2 === 0) {
            // if (true) {
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

function leastHops(edges, start, dest) {
    // console.log('--------------Finding least hops from ' + start + ' to ' +  dest);
    var shortestPath; 
    if (sPaths[start][dest]) return sPaths[start][dest];
    var n = edges.length;
    var maxNodes = 1000;
    
    function updateShortestPath(path) {
        // console.log('>>>>>Found path:', path);
        if (path.length < maxNodes) {
            shortestPath = path.slice();
            maxNodes = path.length;
            // console.log('maxNodes is now ', maxNodes);
        }
    }
    
    function pursue(path) {
        var from = path[path.length-1];
        // console.log('pursuing ', path, '(maxNodes = ', maxNodes , ')');
        loop:
        for (var to=0; to<n; to++) {
            
            if (path.length + 1 >= maxNodes) {
                // console.log('not bothering, never going to beat ', maxNodes);
                break loop;   
            }
            // console.log('path + to=', path, to);
            //if there is an edge, and we haven't been there yet:
            if (edges[from][to] && path.indexOf(to) === -1) {
                // console.log('trying: ', path.concat([to]));
                if (to === dest) {
                    updateShortestPath(path.concat([to]));
                    break loop;
                } else {
                    var sPath = sPaths[to][dest];
                    if (sPath) {
                        // console.log('found earlier sPath');
                        updateShortestPath(path.concat(sPath));
                    } else {
                        
                        path.push(to);
                        // console.log("trying path ", path);
                        pursue(path, dest);
                        path.pop(to);
                    }
                    
                }
            }
        }
        // if (Math.random() < .000001) {
        //     process.stdout.write('+');   
        // }
    };
    
    function collect(from, unvisited) {
        var explore = [];
        unvisited.forEach(function(node) {
            if (edges[from][node]) {
                backtrack[node] = from;
                explore.push(node);   
                delete unvisited[node];
            }
        });
        return explore;
    }
    
    var unvisited = [];
    for (var i = 0; i< n; i++) unvisited[i] = i;
    
    var explore = [start];
    delete unvisited[start];
    var nextHop;
    
    var backtrack = [];
    var isDone;
    while (!isDone) {
        nextHop = [];
        isDone = explore.some(function(node) {
            // console.log('node', node);
            if (edges[node][dest]) {
                // console.log(node, dest);
                backtrack[dest] = node;
                return true; //we're there  
            }
            nextHop = nextHop.concat(collect(node, unvisited));
            return false;
        });
        explore = nextHop;
    }
    // console.log("Found shortest path", backtrack);
    // pursue([start], dest);
    shortestPath = (function() {
        var node = dest;
        if (typeof backtrack[node] === undefined) throw Error('Oh oh');
        var result = [];
        do {
            result.unshift(node);
            // console.log(result);
            node = backtrack[node];
        } while (node !== start) ;
        result.unshift(node);
        return result;
    })();
    // console.log(shortestPath);
    if (!shortestPath) throw Error('Oops, there\'s no path from ' + start + ' to ' + dest);
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
    // graph = g10; d.n =10;
    // var g = g30; d.n =30;
    // console.log(g);
    
    console.log("Total-nodes: ", d.n);
    console.log("Total-edges: ", d.n * d.k + extraEdges);
    console.log("Extra-edges: ", extraEdges);

    var res = [];
    var total = 0;
    initShortestPaths(d.n);
    console.log("From-node:");
    
    // var shortestPath= leastHops(g, 0, 5);
    // console.log(shortestPath);
    // return;
    for (var i = 0; i < graph.length; i++) {
        // for (var i = 1; i < 2; i++) {
        process.stdout.write('' + i + '->');
        for (var j = i+1; j < graph.length; j++) {
            // process.stdout.write(' ' + j + ' ');
            // if (i === j) continue;
                var shortestPath= leastHops(graph, i, j);
            // console.log('in analyse', shortestPath);
            var h = shortestPath.length;
            res.push(h);
            total += h;
        }
        // console.log();
    }

    console.log();
    // console.log(sPaths);
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
// analyseWnGraph({ n:50, k:2, p:50 });
// analyseWnGraph({ n:100, k:2, p:50 });
/*
  
  
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

//g100
// Total-connections:  4950
// Range: 1-7
// Average: 3.737171717171717
// Median: 4
// Distribution:  { '1': 241,
//   '2': 523,
//   '3': 1150,
//   '4': 1661,
//   '5': 1140,
//   '6': 227,
//   '7': 8 }
// Distribution:  { '1': '5%',
//   '2': '11%',
//   '3': '23%',
//   '4': '34%',
//   '5': '23%',
//   '6': '5%',
//   '7': '0%' }
// Mode:  4
// 892.886 seconds

//==============================================================================  
/*  
 * dijkstra.js
 *
 * Dijkstra's single source shortest path algorithm in JavaScript.
 *
 * Cameron McCormack <cam (at) mcc.id.au>
 *
 * Permission is hereby granted to use, copy, modify and distribute this
 * code for any purpose, without fee.
 *
 * Initial version: October 21, 2004
 */

function shortestPathDijkstra(edges, numVertices, startVertex) {
  var done = new Array(numVertices);
  done[startVertex] = true;
  var pathLengths = new Array(numVertices);
  var predecessors = new Array(numVertices);
  for (var i = 0; i < numVertices; i++) {
    pathLengths[i] = edges[startVertex][i];
    if (edges[startVertex][i] != Infinity) {
      predecessors[i] = startVertex;
    }
  }
  pathLengths[startVertex] = 0;
  for (var i = 0; i < numVertices - 1; i++) {
    var closest = -1;
    var closestDistance = Infinity;
    for (var j = 0; j < numVertices; j++) {
      if (!done[j] && pathLengths[j] < closestDistance) {
        closestDistance = pathLengths[j];
        closest = j;
      }
    }
    done[closest] = true;
    for (var j = 0; j < numVertices; j++) {
      if (!done[j]) {
        var possiblyCloserDistance = pathLengths[closest] + edges[closest][j];
        if (possiblyCloserDistance < pathLengths[j]) {
          pathLengths[j] = possiblyCloserDistance;
          predecessors[j] = closest;
        }
      }
    }
  }
  return { "startVertex": startVertex,
           "pathLengths": pathLengths,
           "predecessors": predecessors };
}

function constructPath(shortestPathInfo, endVertex) {
  var path = [];
  while (endVertex != shortestPathInfo.startVertex) {
    path.unshift(endVertex);
    endVertex = shortestPathInfo.predecessors[endVertex];
  }
  return path;
}

function analyseWnGraphDijkstra(d) {
    var dGraph = wnGraph(d.n, d.k, d.p, Infinity); 
    // var g = gd10; d.n = 10;
    // var g = gd30; d.n = 30;
    // console.log(g);
    // g = gd30;
    console.log("Total-nodes: ", d.n);
    var edges = d.n * d.k + extraEdges;
    console.log("Total-edges: ", edges);
    console.log("Extra-edges: ", extraEdges);

    var res = [];
    var total = 0;
    // console.log("From-node:");
    
    for (var i = 0; i < dGraph.length; i++) {
        var dijkstra = shortestPathDijkstra(dGraph, d.n, i);
        // console.log(dijkstra);
            
        process.stdout.write('' + i + '->');
        for (var j = i+1; j < dGraph.length; j++) {
            if (i === j) continue;
            // process.stdout.write(' ' + j  + ' ');
            var sp = constructPath(dijkstra, j);
            sp = [i].concat(sp);
            // console.log(sp);
            var h = sp.length;
            res.push(h);
            total += h;
        }
        // console.log();
    }

    res.sort();
    var range,average,median; 
    console.log("Total-connections: ", res.length);
    // console.log(res);
    range =  res[0] + '-' + res[res.length-1];
    console.log('Range: ' + range);
    average = total/res.length;
    console.log("Average: " + average );
    median = res[Math.floor((res.length+1)/2)];
    console.log("Median: " + median);
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
   return {
       edges: edges,
       range:range,
       average:average,
       median:median,
       mode:mode
   };
}

var d = { n: 20, k: 1, p: 20 };
var graph = wnGraph(d.n, d.k, d.p, 0); 
var dGraph = (function() {
    var result = [];
    graph.forEach(function(r) {
        var row = [];
        r.forEach(function(e) {
            row.push(e ? 1 : Infinity);
        });
        result.push(row);
    });
    return result;
})();
// var dGraph = wnGraph(d.n, d.k, d.p, Infinity); 
// console.log(graph);
// console.log(dGraph);

// analyseWnGraphDijkstra({ n:10, k:2, p:20 });
// analyseWnGraphDijkstra({ n:20, k:2, p:50 });
// analyseWnGraphDijkstra({ n:30, k:2, p:50 });
// analyseWnGraphDijkstra({ n:30, k:2, p:50 });


// console.log("MI+ NE");
// var start = (new Date()).getTime();

// analyseWnGraph(d);
// var end = (new Date()).getTime();
// console.log((end-start)/1000 + ' seconds') ;

console.log("DIJKSTRA");
var start = (new Date()).getTime();
analyseWnGraphDijkstra(d);
var end = (new Date()).getTime();
console.log((end-start)/1000 + ' seconds') ;
// var collate = [];
// for (var k=1; k<5;k++) {
//     for (var p=00; p<=100; p+=10) {
//         var result = analyseWnGraphDijkstra({ n:50, k:k, p:p });
//         result.k = k;
//         result.p = p;
//         collate.push(result);
    
//     }
// }
// // console.log(collate);
//  var lowest = 100; 
// collate = collate.filter(function(r) {
//     lowest = r.average < lowest ? r.average : lowest;
//     return r.average <= lowest  && r.edges < 300;
// });

// console.log("==============================================");
// console.log(collate);

// Example //////////////////////////////////////////////////////////////////

// // The adjacency matrix defining the graph.
// var _ = Infinity;
// var e = [
//   [ _, _, _, _, _, _, _, _, 4, 2, 3 ],
//   [ _, _, 5, 2, 2, _, _, _, _, _, _ ],
//   [ _, 5, _, _, _, 1, 4, _, _, _, _ ],
//   [ _, 2, _, _, 3, 6, _, 3, _, _, _ ],
//   [ _, 2, _, 3, _, _, _, 4, 3, _, _ ],
//   [ _, _, 1, 6, _, _, 2, 5, _, _, _ ],
//   [ _, _, 4, _, _, 2, _, 5, _, _, 3 ],
//   [ _, _, _, 3, 4, 5, 5, _, 3, 2, 4 ],
//   [ 4, _, _, _, 3, _, _, 3, _, 3, _ ],
//   [ 2, _, _, _, _, _, _, 2, 3, _, 3 ],
//   [ 3, _, _, _, _, _, 3, 4, _, 3, _ ]
// ];


// var e = wnGraph(11,2,50, Infinity); 
// var e = gd10;
// console.log(e);
// // Compute the shortest paths from vertex number 0 to each other vertex
// // in the graph.
// var shortestPathInfo = shortestPathDijkstra(e, 10, 0);

// // Get the shortest path from vertex 1 to vertex 6.
// var path1to6 = constructPath(shortestPathInfo, 1);

// console.log(shortestPathInfo);
// console.log(path1to6);



// analyseWnGraphDijkstra({ n:1000, k:2, p:50 });
// Range: 1-9
// Average: 5.743203203203203
// Median: 6
// Distribution:  { '1': 5028,
//   '2': 12898,
//   '3': 37924,
//   '4': 98178,
//   '5': 222058,
//   '6': 332462,
//   '7': 232772,
//   '8': 53538,
//   '9': 4038,
//   '10': 104 }
// Distribution:  { '1': '1%',
//   '2': '1%',
//   '3': '4%',
//   '4': '10%',
//   '5': '22%',
//   '6': '33%',
//   '7': '23%',
//   '8': '5%',
//   '9': '0%',
//   '10': '0%' }
// Mode:  6
// { startVertex: 1,
//   pathLengths: [ 1, 0, 1, 1, 2, 2, 3, 3, 2, 2, 1 ],
//   predecessors: [ 1, 1, 1, 1, 2, 0, 4, 5, 10, 0, 1 ] }
// [ 10 ]
// 79.849 seconds

