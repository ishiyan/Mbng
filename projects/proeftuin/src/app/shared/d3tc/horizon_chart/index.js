'use strict';

module.exports = function (d3) {
    function d3_horizon() {
        var bands = 1; // between 1 and 5, typically
        var mode = 'mirror'; // offset or mirror
        var interpolate = d3.curveLinear; // or basis, monotone, step-before, etc.
        var defined; // function(d, i) { return d[1]; };
        var x = d3_horizonX;
        var y = d3_horizonY;
        var w = 960;
        var h = 40;
        var duration = 0;
        var color = d3.scaleLinear().domain([-1, 0, 0, 1]).range(['#08519c', '#bdd7e7', '#bae4b3', '#006d2c']);

        // For each small multiple…
        function horizon(g) {
            g.each(function (d, i) {
                var g = d3.select(this),
                    n = 2 * bands + 1,
                    xMin = Infinity,
                    xMax = -Infinity,
                    yMax = -Infinity,
                    x0, // old x-scale
                    y0, // old y-scale
                    id; // unique id for paths

                // Compute x- and y-values along with extents.
                var data = d.map(function (d, i) {
                    var xv = x.call(this, d, i),
                        yv = y.call(this, d, i);
                    if (xv < xMin) xMin = xv;
                    if (xv > xMax) xMax = xv;
                    if (-yv > yMax) yMax = -yv;
                    if (yv > yMax) yMax = yv;
                    return [xv, yv];
                });

                // Compute the new x- and y-scales, and transform.
                var x1 = d3.scaleLinear().domain([xMin, xMax]).range([0, w]);
                var y1 = d3.scaleLinear().domain([0, yMax]).range([0, h * bands]);
                var t1 = d3_horizonTransform(bands, h, mode);
                var t0;

                // Retrieve the old scales, if this is an update.
                if (this.__chart__) {
                    x0 = this.__chart__.x;
                    y0 = this.__chart__.y;
                    t0 = this.__chart__.t;
                    id = this.__chart__.id;
                } else {
                    x0 = x1.copy();
                    y0 = y1.copy();
                    t0 = t1;
                    id = ++d3_horizonId;
                }

                // We'll use a defs to store the area path and the clip path.
                var defs = g.selectAll('defs').data([null]);

                // The clip path is a simple rect.
                defs.enter().append('defs').append('clipPath').attr('id', 'd3tc_horizon_clip_' + id)
                    .append('rect').attr('width', w).attr('height', h);

                defs.select('rect').transition().duration(duration).attr('width', w).attr('height', h);

                // We'll use a container to clip all horizon layers at once.
                g.selectAll('g').data([null]).enter().append('g').attr('clip-path', 'url(#d3tc_horizon_clip_' + id + ')');

                // Instantiate each copy of the path with different transforms.
                var path = g.select('g').selectAll('path')
                    .data(d3.range(-1, -bands - 1, -1).concat(d3.range(1, bands + 1)), Number);

                if (defined) {
                    d3_horizonArea.defined(function (d, i) { return defined(d, i); });
                }

                var d0 = d3_horizonArea.curve(interpolate).x(function (d) { return x0(d[0]); })
                    .y0(h * bands).y1(function (d) { return h * bands - y0(d[1]); })(data);

                var d1 = d3_horizonArea.x(function (d) { return x1(d[0]); })
                    .y1(function (d) { return h * bands - y1(d[1]); })(data);

                path.enter().append('path').style('fill', color).attr('transform', t0).attr('d', d0);

                path.transition().duration(duration).style('fill', color).attr('transform', t1).attr('d', d1);

                path.exit().transition().duration(duration).attr('transform', t1).attr('d', d1).remove();

                // Stash the new scales.
                this.__chart__ = { x: x1, y: y1, t: t1, id: id };
            });
            d3.timerFlush();
        }

        horizon.duration = function (z) {
            if (!arguments.length) return duration;
            duration = +z;
            return horizon;
        };

        horizon.bands = function (z) {
            if (!arguments.length) return bands;
            bands = +z;
            color.domain([-bands, 0, 0, bands]);
            return horizon;
        };

        horizon.mode = function (z) {
            if (!arguments.length) return mode;
            mode = z + '';
            return horizon;
        };

        horizon.colors = function (z) {
            if (!arguments.length) return color.range();
            color.range(z);
            return horizon;
        };

        horizon.interpolate = function (z) {
            if (!arguments.length) return interpolate;
            interpolate = z;
            return horizon;
        };

        horizon.x = function (z) {
            if (!arguments.length) return x;
            x = z;
            return horizon;
        };

        horizon.y = function (z) {
            if (!arguments.length) return y;
            y = z;
            return horizon;
        };

        horizon.width = function (z) {
            if (!arguments.length) return w;
            w = +z;
            return horizon;
        };

        horizon.height = function (z) {
            if (!arguments.length) return h;
            h = +z;
            return horizon;
        };

        horizon.defined = function (z) {
            if (!arguments.length) return defined;
            defined = z;
            return horizon;
        };

        return horizon;
    }

    var d3_horizonArea = d3.area();
    var d3_horizonId = 0;

    function d3_horizonX(d) { return d[0]; }
    function d3_horizonY(d) { return d[1]; }

    function d3_horizonTransform(bands, h, mode) {
        return mode == 'offset'
            ? function (d) { return 'translate(0,' + (d + (d < 0 ? 1:0) - bands) * h + ')'; }
            : function (d) {
                return (d < 0 ? 'scale(1,-1)' : '') + 'translate(0,' + (d - bands) * h + ')'; };
    }

    return d3_horizon;
};

