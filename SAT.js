define(function(){

	var v = function(x, y) {
		return {
			x: x,
			y:y
		}; // shorthand for declaration
	}

	var SAT = function() {
	};

	var POLYGON = function(nvertices, vertices) {
		//this.n=0;
		this.edges = [];
/*
		var args = nvertices;

		this.vertices = [];

		var i;
		for (i = 0; i < nvertices; i++){
			vertices[i] = args[i];//(args, vec);
		}
		*/

		return this.new_polygon(nvertices, vertices);
	};

	POLYGON.prototype = {
		new_polygon: function(nvertices, vertices)
		{
			var edges = [];
			var i;
			for (i = 0; i < nvertices-1; i++){
				var dir = {
					x: vertices[i+1].x-vertices[i].x,
					y: vertices[i+1].y-vertices[i].y
				};

				var cur = {
					x: vertices[i],
					y: vertices[i+1],
					dir: dir
				}; // We can also use the segment method here, but this is more explicit

				edges[i] = cur;
			}

			var dir = {
				x: vertices[0].x-vertices[nvertices-1].x,
				y: vertices[0].y-vertices[nvertices-1].y
			};

			var cur = {
				x: vertices[nvertices-1],
				y: vertices[0],
				dir: dir
			};

			edges[nvertices-1] = cur; // The last edge is between the first vertex and the last vertex

			var shape = {
				nvertices: nvertices,
				vertices: vertices,
				edges: edges
			};

			return shape;
		}

		/*
		polygon: function(vertices) {
			var args = nvertices;

			var vertices = [];

			var i;
			for (i = 0; i < nvertices; i++){
				vertices[i] = args;//(args, vec);
			}
			return new_polygon(nvertices, vertices);
		}
		*/
	};

	SAT.prototype = {

		dot: function(v1, v2)
		{
			return v1.x*v2.x + v1.y*v2.y;
		},

		normalize: function(v){
			var mag = Math.sqrt(v.x*v.x + v.y*v.y);

			return {
				x: v.x/mag,
				y: v.y/mag
			}; // vector b is only of distance 1 from the origin
		},

	    perp: function(v){
			return {
				x: v.y,
				y: -v.x
			};
		},

		project: function(a, axis){
			axis = this.normalize(axis);

			var i;
			var min = this.dot(a.vertices[0],axis);
			var max = min; // min and max are the start and finish points

			for (i=0;i<a.nvertices;i++){

				var proj = this.dot(a.vertices[i],axis); // find the projection of every point on the polygon onto the line.

				if (proj < min)
				{
					min = proj;
				}

				if (proj > max)
				{
					max = proj;
				}
			}

			var arr =[];
			arr[0] = min;
			arr[1] = max;

			return arr;
		},

		contains: function(n, range){
			var a = range[0],
				b = range[1];

			if (b<a)
			{
				a = b;
				b = range[0];
			}

			return (n >= a && n <= b);
		},

		overlap: function(a_, b_){
			if (this.contains(a_[0],b_))
			{
				return 1;
			}

			if (this.contains(a_[1],b_))
			{
				return 1;
			}

			if (this.contains(b_[0],a_))
			{
				return 1;
			}

			if (this.contains(b_[1],a_)) return 1;
			{
				return 0;
			}
		},

		checkCollision: function(a, b){

			var i;
			for (i=0;i<a.nvertices;i++){

				var axis = a.edges[i].dir; // Get the direction vector
				axis = this.perp(axis); // Get the normal of the vector (90 degrees)

				var a_ = this.project(a,axis),
					b_ = this.project(b,axis); // Find the projection of a and b onto axis

				if (this.overlap(a_, b_)) {
				} else {
					return 0;
				} // If they do not overlap, then no collision
			}

			for (i=0;i<b.nvertices;i++) { // repeat for b

				var axis = b.edges[i].dir;
				axis = this.perp(axis);

				var a_ = this.project(a,axis),
					b_ = this.project(b,axis);

				if (!this.overlap(a_,b_))
				{
					return 0;
				}
			}
			return 1;
		}
	};

	return {
		SAT: SAT,
		POLYGON: POLYGON,
		v: v
	}
});