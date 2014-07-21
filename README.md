Deploy-demo
--------

Playground and experiments for [adea](http://github.com/michieljoris/adea).

Containing:

* Simulation of decentralized server deployment

Basically every server is supposed to self configure. So that means every server
has to decide for themselves what other servers to connect to. The only info
available (through [serf](http://www.serfdom.io/)) is a list of other servers. A
server can also create network wide events and query/response other servers, but
is not able to set state in the network. Any state is stored locally in
CouchDB. These CouchDB instances will need to be linked up reliably with
redundancy and robustness built-in. But the problem is that there is not going
to be governing, central configuration server/agent/service. How to decide which
other servers to link up with using CouchDB replications? The system will also
have to self adjust to failing servers, failing replications etc.

Requirements are as few connections as possible per server and as few hops as
possible from any server to any other server, but with guaranteed connectivity
so it's similar to the degree-diameter problem in graph theory, which is not
solved. But a good working solution is any small world network.

* Watts-newman small network implementation

In the `src` directory is a nodejs script `watts-newman.js` that implements the
algorithm by the same name. I wrote a basic depth first shortest path
implementation for shortest path, but only roughly optimized it. It works, but
is slow for V>30. I added a Dijkstra shortest path implementation found on the
net. Much faster..

Using this script I can experiment and find the optimal values to use in the
watts-newman small world network construction. See `src/watts-newman.js` for
more details.

Run

	bin/serve
	
and go to localhost:9001 for a simulation of a watts-newman small network. 

It seems you can get a decent result with p=.8 and k=1. With p=0 you'll get
the typical watts-newman ring. 

Parameters need to be set in `www/scripts/main.js` for now.

All servers will need to run their own Adea agent. It is responsible for
starting up docker services (haproxy, adea-ui, couchdb, logging, search and any
other services, such as datatbases and apps), but also for setting up and
maintaining couchdb replications, since this is where the adea agent will get
its network state data from. The idea is that adea (any agent) can organise,
configure, deploy, tear down  docker containers, but also servers through the
api's offered by the likes of Linode, Do, AWS etc.

If you took every adea server offline in the network but one, it should be able
to rebuild itself autonomously. If there was no live version left, all you'd
have to do is start up a adea agent on your own computer or on a VPS host, point
it to a CouchDB instance, give it credentials and it would rebuild the network
again, sharing load and responsibilities as soon as it had peers to work
with. 

For redundancy sake you'd have CouchDB instances hooked up to the network, such
as offered by Cloudant, Iriscouch and Couchbase or any self-hosted CouchDB. To
go even further, you could have the network data stored (encrypted) at free hosting
services , preferably without using accounts, so adea can organise this
itself. Then you could have database-less agents lurking at various servers and
services perhaps that could restart the network. This is starting to sound like
a virus, or bot network...

Install:

	git clone git@github.com/michieljoris/deploy-demo
	




More ideas:
http://xmpp.org/
irc?
peer to peer, ala torrents
vpn
