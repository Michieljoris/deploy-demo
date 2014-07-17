var maxGrouping = 4;

// deploy demo
var sys = arbor.ParticleSystem(500, 200, 1);
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

function decideEdge(host, hosts) {
    var hubs = []; 
    var nonhubs = hosts.filter(function(h) {
        if (host.hub) {
            hubs.push(h);    
            return false;
        }
        return true;
    }); 
    while (hubs.length) {
        if (hubs[0] === host && (nonhubs.length || hubs.length))
            return null;
        var maxGrouping = hubs[0].maxGrouping || maxGrouping;
        var i = 0;
        while (nonhubs.length && i < maxGrouping) {
            if (nonhubs[0] === host) return hubs[0];
            nonhubs.shift();
            i++;
        }
        if (i < maxGrouping) {
            //run out of nonhubs, however the last hub is not filled up yet!!
            
        }
        hubs.shift();
    }
    if (!hubs.length) {
        //used up all the hubs:
        
    }
    else {
         
        
    }
    return null;
}

function setEdges() {
    hosts.forEach(function(host) {
        //Now decide for every host exactly the edge based on the current host
        //list. This is a deterministic algorithm.  Every host knows its own
        //index (tag in serf), and has a (sorted by index) list supplied by serf
        //of every host and their indices. If a host is a hub (can have more
        //than one edge) they are tagged as such, and also they then would be
        //publishing their capacity through a tag.  Every host by default sets
        //up exactly one edge (except for maybe one), and a path should be
        //garantueed to exist from any host to any other host.
        
        var toHost = decideEdge(host, hosts);
        if (toHost && toHost.index !== host.to) {
            host.to = toHost.index;
            var edges = sys.getEdgesFrom(host.node);
            edges.forEach(function(edge) {
                sys.pruneEdge(edge);
            });
            host.edge = sys.addEdge(host.node, toHost.node );
        }
    });
    
}

addHost(true);
addHost();
setEdges();
