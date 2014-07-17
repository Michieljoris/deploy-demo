var maxGrouping = 4;

// deploy demo
var sys = arbor.ParticleSystem(900, 900, .2);
sys.parameters({gravity:true});
sys.renderer = Renderer("#viewport") ;

var hosts = [];

var buttons = new Ractive({
    el: "#buttons",
    template: "#buttonsTemplate",
    data: { hosts: hosts,
            addHost: "New host",
            addHub: "New hub"
          }
});


function addHost(hub) {
    var index = 0;
    if (hosts.some(function(h) {
        return h.index !== index++;
    })) index--;
    var host = {
        index: index,
        label: "h" + index, 
        hub: hub,
        to: "0",
        node:  sys.addNode("h" + index, {'color': hub ? 'purple': 'green',
                                         'shape': 'round', //hub ? 'triangle': 'square',
                                                     'label': "h" + index })
    };
    hosts.splice(index, 0, host);
}


buttons.on({
    addHost: function ( event ) {
            addHost(); 
            setEdges();
        },
    addHub: function ( event ) {
            addHost(true); 
            setEdges();
        },
    activate: function ( event ) {
        if (hosts.length > 2) {
            var host = hosts[event.index.i];
            hosts.splice(event.index.i, 1);
            sys.pruneNode(host.node);   
        }
        setEdges();
    }
});

var k = 1, p = 1;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function decideEdges(host, hosts) {
    if (hosts === 2) return [];
    var to = [];
    var index = host.index;
    var i = 0;
    var result = hosts.some(function(h) {
        i++;
        return h.index === index;
    });
    index = i-1;
    if (!result) throw Error("Host is not in list of hosts!!!");
    for (var j = 1; j<=k; j++) {
        to.push(hosts[(index + j)%hosts.length]); 
    }
    
    if (Math.random() < p) {
        var r = getRandomInt(hosts.length);
        // if (r!==index && Math.abs(r-index) > k)  {
        if (r!==index)  {
            to.push(hosts[r]);
        }
    }
    console.log(i-1);
    
    return to;
}

function setEdges() {
    hosts.forEach(function(host) {
        //Now decide for every host exactly the edge based on the current host
        //list. This is a deterministic algorithm.  Every host knows its own
        //index (tag in serf), and has a (sorted by index) list supplied by serf
        //of every host and their indices.  Every host by default sets up at
        //least one path, possibly more, depending on the parameters for the
        //watts-newman small world we want to set up.
        
        var toHosts = decideEdges(host, hosts);
        var edges = sys.getEdgesFrom(host.node);
        edges.forEach(function(edge) {
            sys.pruneEdge(edge);
        });
        host.to = [];
        toHosts.forEach(function(toHost) {
            // if (host.to.indexOf(host.index) === -1) {
            host.to.push(toHost.index);
            host.edge = sys.addEdge(host.node, toHost.node );
            // }
            
        });
    });
    
}

addHost(true);
addHost();
setEdges();
