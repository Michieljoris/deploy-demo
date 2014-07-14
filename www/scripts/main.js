
// deploy demo
var sys = arbor.ParticleSystem(500, 200, 0.1);
sys.parameters({gravity:true});
sys.renderer = Renderer("#viewport") ;

var animals = sys.addNode('Animals',{'color':'red','shape':'dot','label':'Animals'});
var dog = sys.addNode('dog',{'color':'green','shape':'dot','label':'dog'});
var cat = sys.addNode('cat',{'color':'blue','shape':'dot','label':'cat'});
// sys.addEdge(animals, dog);
// sys.addEdge(animals, cat);

// var data = {
//     nodes:{
//         animals:{'color':'red','shape':'dot','label':'Animals'},
//         dog:{'color':'green','shape':'dot','label':'dog'},
//         cat:{'color':'blue','shape':'dot','label':'cat'}
//     },
//     edges:{
//         animals:{ dog:{}, cat:{} }}
// };

// sys.graft(data);

setTimeout(function(){
    // var postLoadData = {
    //     nodes:{
    //         joe:{'color':'orange','shape':'dot','label':'joe'},
    //         fido:{'color':'green','shape':'dot','label':'fido'},
    //         fluffy:{'color':'blue','shape':'dot','label':'fluffy'}
    //     },
    //     edges:{
    //         dog:{ fido:{} },
    //         cat:{ fluffy:{} },
    //         joe:{ fluffy:{},fido:{} }
    //     }
    // };
    // sys.graft(postLoadData);
    
    sys.addEdge(animals, dog);
},3000);

var demo = new Vue({
    el: '#demo',
    data: {
        message: 'Hello Vue.js!'
    }
});

// console.log(demo);

window.ractive = new Ractive({
    // The `el` option can be a node, an ID, or a CSS selector.
    el: 'container',

    // We could pass in a string, but for the sake of convenience
    // we're passing the ID of the <script> tag above.
    template: '#template',

    // Here, we're passing in some initial data
    data: { name: 'world' }
});

