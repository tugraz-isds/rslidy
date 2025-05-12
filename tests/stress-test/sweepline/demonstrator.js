// Portions of this code includes or is based on the implementation by
// Raymond Hill. The original source code can be found under 
// https://github.com/gorhill/Javascript-Voronoi
//sweepline voronoi diagram.
//import { Point } from "./point";
const canvas = document.querySelector('#Canvas');
const button = document.querySelector('#button');
const restartButton = document.querySelector('#restartButton');
const basicButton = document.querySelector('#basic');
const smallButton = document.querySelector('#small');
const largeButton = document.querySelector('#large');
const degenerateButton = document.querySelector('#degenerate');
//Event Listeners for interaction
canvas.addEventListener("click", (e) => newPoint(e.clientX, e.clientY));
button.addEventListener("click", sweepLine);
restartButton.addEventListener("click", restart);
restartButton.disabled = true;
basicButton.addEventListener("click", function () { loadDataset(0); });
smallButton.addEventListener("click", function () { loadDataset(1); });
largeButton.addEventListener("click", function () { loadDataset(2); });
degenerateButton.addEventListener("click", function () { loadDataset(3); });
//Animation variables
let clicked = false;
let line_position = 0;
let pause = false;
//Fortune algorithm variables
var siteEvents = [];
var circleEvents = [];
var beachlineRoot = null;
var edges = Array();
//var halfedges = [];
var regions = Array();
//var vertices = Array<Point>();
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'rgb(153, 153, 153)';
ctx.strokeRect(0, 0, canvas.width, canvas.height);
let textCheck = true;
ctx.textAlign = "center";
ctx.font = "35px Arial";
ctx.fillText("Click to place sites.", canvas.width / 2, canvas.height / 2);
var pointList = [];
var displayedCircleEvents = [];
//DEBUG FUNCTION
// function printList()
// {
//     printChildren(beachlineRoot, 0)
// }
// function printChildren(node: TreeNode, layer: number)
// {
//     console.log("Children of", node.site, "at layer ", layer, ":")
//     if(node.left)
//         console.log("LEFT: ", node.left.site)
//     if(node.right)
//         console.log("RIGHT: ", node.right.site)
//     console.log("====================================")
//     if(node.left)
//     {
//         printChildren(node.left, layer+1)
//     }
//     if(node.right)
//     {
//         printChildren(node.right, layer+1)
//     }
// }
//ADDING A NEW POINT
function newPoint(x, y) {
    if (clicked) {
        return;
    }
    if (textCheck) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        textCheck = false;
    }
    x = x - canvas.offsetLeft;
    y = y - canvas.offsetTop;
    let actual_x = (x / canvas.getBoundingClientRect().width) * canvas.width;
    let actual_y = (y / canvas.getBoundingClientRect().height) * canvas.height;
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.beginPath();
    ctx.arc(actual_x, actual_y, 3.5, 0, 360, false);
    ctx.fill();
    pointList.push(new Point(actual_x, actual_y));
}
function handleSite(site) {
    let index = findRegion(site);
    if (index == -1) {
        regions.push(new Region(site));
    }
    addToBeachline(site);
}
function addToBeachline(site) {
    let directrix = site.Y;
    let site_x = site.X;
    var currentNode = beachlineRoot;
    var lArc, rArc, dxl, dxr;
    //finding left and right sections of new arc.
    while (currentNode) {
        dxl = leftBreakPoint(currentNode, directrix) - site_x;
        // site_x  lessThanWithEpsilon xl => falls somewhere before the left edge of the beachsection
        if (dxl > 1e-9) {
            // this case should never happen
            console.log("tsh");
            currentNode = currentNode.left;
        }
        else {
            dxr = site_x - rightBreakPoint(currentNode, directrix);
            // site_x  greaterThanWithEpsilon xr => falls somewhere after the right edge of the beachsection
            if (dxr > 1e-9) {
                if (!currentNode.right) {
                    lArc = currentNode;
                    break;
                }
                currentNode = currentNode.right;
            }
            else {
                // site_x  equalWithEpsilon xl => falls exactly on the left edge of the beachsection
                if (dxl > -1e-9) {
                    lArc = currentNode.previous;
                    rArc = currentNode;
                }
                // site_x  equalWithEpsilon xr => falls exactly on the right edge of the beachsection
                else if (dxr > -1e-9) {
                    lArc = currentNode;
                    rArc = currentNode.next;
                }
                // falls exactly somewhere in the middle of the beachsection
                else {
                    lArc = rArc = currentNode;
                }
                break;
            }
        }
    }
    //With the left arc found now, insert the new arc into the tree.
    var newNode = new TreeNode(site);
    insertSuccessor(lArc, newNode);
    //first section
    if (!lArc && !rArc) {
        return;
    }
    //splitting a previous arc
    if (lArc === rArc) {
        // invalidate circle event of split beach section
        detachCircleEvent(lArc);
        // split the beach section into two separate beach sections
        rArc = new TreeNode(lArc.site);
        insertSuccessor(newNode, rArc);
        // since we have a new transition between two beach sections,
        // a new edge is born
        newNode.edge = rArc.edge = createEdge(lArc.site, newNode.site, null, null);
        // check whether the left and right beach sections are collapsing
        // and if so create circle events, to be notified when the point of
        // collapse is reached.
        attachCircleEvent(lArc);
        attachCircleEvent(rArc);
        return;
    }
    if (lArc && !rArc) {
        newNode.edge = createEdge(lArc.site, newNode.site, null, null);
        return;
    }
    if (lArc !== rArc) {
        // invalidate circle events of left and right sites
        detachCircleEvent(lArc);
        detachCircleEvent(rArc);
        // an existing transition disappears, meaning a vertex is defined at
        // the disappearance point.
        // since the disappearance is caused by the new beachsection, the
        // vertex is at the center of the circumscribed circle of the left,
        // new and right beachsections.
        var lSite = lArc.site, ax = lSite.X, ay = lSite.Y, bx = site.X - ax, by = site.Y - ay, rSite = rArc.site, cx = rSite.X - ax, cy = rSite.Y - ay, d = 2 * (bx * cy - by * cx), hb = bx * bx + by * by, hc = cx * cx + cy * cy, vertex = new Point((cy * hb - by * hc) / d + ax, (bx * hc - cx * hb) / d + ay);
        // one transition disappear
        setEdgeStartpoint(rArc.edge, lSite, rSite, vertex);
        // two new transitions appear at the new vertex location
        newNode.edge = createEdge(lSite, site, null, vertex);
        rArc.edge = createEdge(site, rSite, null, vertex);
        // check whether the left and right beach sections are collapsing
        // and if so create circle events, to handle the point of collapse.
        attachCircleEvent(lArc);
        attachCircleEvent(rArc);
        return;
    }
}
// adapted from https://github.com/gorhill/Javascript-Voronoi
function leftBreakPoint(node, directrix) {
    var site = node.site, rfocx = site.X, rfocy = site.Y, pby2 = rfocy - directrix;
    // parabola in degenerate case where focus is on directrix
    if (!pby2) {
        return rfocx;
    }
    var lArc = node.previous;
    if (!lArc) {
        return -Infinity;
    }
    site = lArc.site;
    var lfocx = site.X, lfocy = site.Y, plby2 = lfocy - directrix;
    // parabola in degenerate case where focus is on directrix
    if (!plby2) {
        return lfocx;
    }
    var hl = lfocx - rfocx, aby2 = 1 / pby2 - 1 / plby2, b = hl / plby2;
    if (aby2) {
        return (-b + Math.sqrt(b * b - 2 * aby2 * (hl * hl / (-2 * plby2) - lfocy + plby2 / 2 + rfocy - pby2 / 2))) / aby2 + rfocx;
    }
    // both parabolas have same distance to directrix, thus break point is midway
    return (rfocx + lfocx) / 2;
}
;
// adapted from https://github.com/gorhill/Javascript-Voronoi
function rightBreakPoint(node, directrix) {
    var rArc = node.next;
    if (rArc) {
        return leftBreakPoint(rArc, directrix);
    }
    var site = node.site;
    return site.Y === directrix ? site.X : Infinity;
}
;
//TREE LOGIC
//ADAPTED FROM https://github.com/gorhill/Javascript-Voronoi
function removeNode(node) {
    // >>> rhill 2011-05-27: Performance: cache previous/next nodes
    if (node.next) {
        node.next.previous = node.previous;
    }
    if (node.previous) {
        node.previous.next = node.next;
    }
    node.next = node.previous = null;
    // <<<
    var parent = node.parent, left = node.left, right = node.right, next;
    if (!left) {
        next = right;
    }
    else if (!right) {
        next = left;
    }
    else {
        next = getFirst(right);
    }
    if (parent) {
        if (parent.left === node) {
            parent.left = next;
        }
        else {
            parent.right = next;
        }
    }
    else {
        beachlineRoot = next;
    }
    // enforce red-black rules
    var isRed;
    if (left && right) {
        isRed = next.indicator;
        next.indicator = node.indicator;
        next.left = left;
        left.parent = next;
        if (next !== right) {
            parent = next.parent;
            next.parent = node.parent;
            node = next.right;
            parent.left = node;
            next.right = right;
            right.parent = next;
        }
        else {
            next.parent = parent;
            parent = next;
            node = next.right;
        }
    }
    else {
        isRed = node.indicator;
        node = next;
    }
    // 'node' is now the sole successor's child and 'parent' its
    // new parent (since the successor can have been moved)
    if (node) {
        node.parent = parent;
    }
    // the 'easy' cases
    if (isRed) {
        return;
    }
    if (node && node.indicator) {
        node.indicator = false;
        return;
    }
    // the other cases
    var sibling;
    do {
        if (node === beachlineRoot) {
            break;
        }
        if (node === parent.left) {
            sibling = parent.right;
            if (sibling.indicator) {
                sibling.indicator = false;
                parent.indicator = true;
                rotateLeft(parent);
                sibling = parent.right;
            }
            if ((sibling.left && sibling.left.indicator) || (sibling.right && sibling.right.indicator)) {
                if (!sibling.right || !sibling.right.indicator) {
                    sibling.left.indicator = false;
                    sibling.indicator = true;
                    rotateRight(sibling);
                    sibling = parent.right;
                }
                sibling.indicator = parent.indicator;
                parent.indicator = sibling.right.indicator = false;
                rotateLeft(parent);
                node = beachlineRoot;
                break;
            }
        }
        else {
            sibling = parent.left;
            if (sibling.indicator) {
                sibling.indicator = false;
                parent.indicator = true;
                rotateRight(parent);
                sibling = parent.left;
            }
            if ((sibling.left && sibling.left.indicator) || (sibling.right && sibling.right.indicator)) {
                if (!sibling.left || !sibling.left.indicator) {
                    sibling.right.indicator = false;
                    sibling.indicator = true;
                    rotateLeft(sibling);
                    sibling = parent.left;
                }
                sibling.indicator = parent.indicator;
                parent.indicator = sibling.left.indicator = false;
                rotateRight(parent);
                node = beachlineRoot;
                break;
            }
        }
        sibling.indicator = true;
        node = parent;
        parent = parent.parent;
    } while (!node.indicator);
    if (node) {
        node.indicator = false;
    }
}
function insertSuccessor(predecessor, successor) {
    var parent;
    if (predecessor) {
        // >>> rhill 2011-05-27: Performance: cache previous/next nodes
        successor.previous = predecessor;
        successor.next = predecessor.next;
        if (predecessor.next) {
            predecessor.next.previous = successor;
        }
        predecessor.next = successor;
        // <<<
        if (predecessor.right) {
            // in-place expansion of predecessor.right.getFirst();
            predecessor = predecessor.right;
            while (predecessor.left) {
                predecessor = predecessor.left;
            }
            predecessor.left = successor;
        }
        else {
            predecessor.right = successor;
        }
        parent = predecessor;
    }
    // rhill 2011-06-07: if predecessor is null, successor must be inserted
    // to the left-most part of the tree
    else if (beachlineRoot) {
        predecessor = getFirst(beachlineRoot);
        // >>> Performance: cache previous/next nodes
        successor.previous = null;
        successor.next = predecessor;
        predecessor.previous = successor;
        // <<<
        predecessor.left = successor;
        parent = predecessor;
    }
    else {
        // >>> Performance: cache previous/next nodes
        successor.previous = successor.next = null;
        // <<<
        beachlineRoot = successor;
        parent = null;
    }
    successor.left = successor.right = null;
    successor.parent = parent;
    successor.indicator = true;
    // Fixup the modified tree by recoloring nodes and performing
    // rotations (2 at most) hence the red-black tree properties are
    // preserved.
    var grandpa, uncle;
    predecessor = successor;
    while (parent && parent.indicator) {
        grandpa = parent.parent;
        if (parent === grandpa.left) {
            uncle = grandpa.right;
            if (uncle && uncle.indicator) {
                parent.indicator = uncle.indicator = false;
                grandpa.indicator = true;
                predecessor = grandpa;
            }
            else {
                if (predecessor === parent.right) {
                    rotateLeft(parent);
                    predecessor = parent;
                    parent = predecessor.parent;
                }
                parent.indicator = false;
                grandpa.indicator = true;
                rotateRight(grandpa);
            }
        }
        else {
            uncle = grandpa.left;
            if (uncle && uncle.indicator) {
                parent.indicator = uncle.indicator = false;
                grandpa.indicator = true;
                predecessor = grandpa;
            }
            else {
                if (predecessor === parent.left) {
                    rotateRight(parent);
                    predecessor = parent;
                    parent = predecessor.parent;
                }
                parent.indicator = false;
                grandpa.indicator = true;
                rotateLeft(grandpa);
            }
        }
        parent = predecessor.parent;
    }
    beachlineRoot.indicator = false;
}
function rotateLeft(node) {
    var p = node, q = node.right, // can't be null
    parent = p.parent;
    if (parent) {
        if (parent.left === p) {
            parent.left = q;
        }
        else {
            parent.right = q;
        }
    }
    else {
        beachlineRoot = q;
    }
    q.parent = parent;
    p.parent = q;
    p.right = q.left;
    if (p.right) {
        p.right.parent = p;
    }
    q.left = p;
}
function rotateRight(node) {
    var p = node, q = node.left, // can't be null
    parent = p.parent;
    if (parent) {
        if (parent.left === p) {
            parent.left = q;
        }
        else {
            parent.right = q;
        }
    }
    else {
        beachlineRoot = q;
    }
    q.parent = parent;
    p.parent = q;
    p.left = q.right;
    if (p.left) {
        p.left.parent = p;
    }
    q.right = p;
}
function getFirst(node) {
    while (node.left) {
        node = node.left;
    }
    return node;
}
function getLast(node) {
    while (node.right) {
        node = node.right;
    }
    return node;
}
function detachCircleEvent(node) {
    var cEvent = node.circleEventObject;
    if (cEvent) {
        let index = circleEvents.indexOf(cEvent, 0);
        if (index > -1) {
            circleEvents.splice(index, 1);
        }
        index = displayedCircleEvents.indexOf(cEvent.location, 0);
        if (index > -1) {
            displayedCircleEvents.splice(index, 1);
        }
        node.circleEventObject = null;
    }
}
function attachCircleEvent(node) {
    var lArc = node.previous;
    var rArc = node.next;
    if (!lArc || !rArc) {
        console.log("We're missing an arc");
        return;
    }
    var lSite = lArc.site;
    var cSite = node.site;
    var rSite = rArc.site;
    if (lSite === rSite) {
        console.log("Left arc is Right arc.");
        return;
    }
    var bx = cSite.X;
    var by = cSite.Y;
    var ax = lSite.X - bx;
    var ay = lSite.Y - by;
    var cx = rSite.X - bx;
    var cy = rSite.Y - by;
    // http://en.wikipedia.org/wiki/Curve_orientation#Orientation_of_a_simple_polygon
    // rhill 2011-05-21: Nasty finite precision error which caused circumcircle() to
    // return infinites: 1e-12 seems to fix the problem.
    var d = 2 * (ax * cy - ay * cx);
    if (d >= -2e-12) {
        //console.log("d is off.")
        return;
    }
    var ha = ax * ax + ay * ay;
    var hc = cx * cx + cy * cy;
    var x = (cy * ha - ay * hc) / d;
    var y = (ax * hc - cx * ha) / d;
    var ycenter = y + by;
    var newCircleEvent = new CircleEvent(node, cSite, Math.floor(x + bx), Math.floor(ycenter + Math.sqrt(x * x + y * y)), ycenter);
    node.circleEventObject = newCircleEvent;
    //add event to queue
    if (circleEvents.length == 0) {
        circleEvents.push(newCircleEvent);
        displayedCircleEvents.push(newCircleEvent.location);
    }
    else {
        let length = circleEvents.length;
        for (var i = 0; i < length; i++) {
            if (circleEvents[i].location.Y <= newCircleEvent.location.Y) {
                circleEvents.splice(i, 0, newCircleEvent);
                displayedCircleEvents.splice(i, 0, newCircleEvent.location);
                break;
            }
        }
        if (circleEvents.length == length) {
            circleEvents.push(newCircleEvent);
            displayedCircleEvents.push(newCircleEvent.location);
        }
    }
}
function removeFromBeachline(event) {
    var x = event.location.X;
    var y = event.yCenter;
    var vertex = new Point(x, event.yCenter);
    var previous = event.node.previous;
    var next = event.node.next;
    var disappearingTransitions = [event.node];
    detachBeachsection(event.node);
    //left check
    var lArc = previous;
    while (lArc.circleEventObject && Math.abs(x - lArc.circleEventObject.location.X) < 1e-9 && Math.abs(y - lArc.circleEventObject.yCenter) < 1e-9) {
        previous = lArc.previous;
        disappearingTransitions.unshift(lArc);
        detachBeachsection(lArc);
        lArc = previous;
    }
    // even though it is not disappearing, I will also add the beach section
    // immediately to the left of the left-most collapsed beach section, for
    // convenience, since we need to refer to it later as this beach section
    // is the 'left' site of an edge for which a start point is set.
    disappearingTransitions.unshift(lArc);
    detachCircleEvent(lArc);
    // right check
    var rArc = next;
    while (rArc.circleEventObject && Math.abs(x - rArc.circleEventObject.location.X) < 1e-9 && Math.abs(y - rArc.circleEventObject.yCenter) < 1e-9) {
        next = rArc.next;
        disappearingTransitions.push(rArc);
        detachBeachsection(rArc); // mark for reuse
        rArc = next;
    }
    disappearingTransitions.push(rArc);
    detachCircleEvent(rArc);
    // walk through all the disappearing transitions between beach sections and
    // set the start point of their (implied) edge.
    var nArcs = disappearingTransitions.length;
    var iArc;
    for (iArc = 1; iArc < nArcs; iArc++) {
        rArc = disappearingTransitions[iArc];
        lArc = disappearingTransitions[iArc - 1];
        setEdgeStartpoint(rArc.edge, lArc.site, rArc.site, vertex);
    }
    lArc = disappearingTransitions[0];
    rArc = disappearingTransitions[nArcs - 1];
    rArc.edge = createEdge(lArc.site, rArc.site, null, vertex);
    // create circle events if any for beach sections left in the beachline
    // adjacent to collapsed sections
    attachCircleEvent(lArc);
    attachCircleEvent(rArc);
}
function detachBeachsection(node) {
    detachCircleEvent(node);
    removeNode(node);
}
function clipEdges() {
    // connect all dangling edges to bounding box
    // or get rid of them if it can't be done
    var iEdge = edges.length;
    var edge;
    // iterate backward so we can splice safely
    while (iEdge--) {
        edge = edges[iEdge];
        // edge is removed if:
        //   it is wholly outside the bounding box
        //   it is looking more like a point than a line
        if (!connectEdge(edge) ||
            !clipEdge(edge) ||
            (Math.abs(edge.start.X - edge.end.X) < 1e-9 && Math.abs(edge.start.Y - edge.end.Y) < 1e-9)) {
            edge.start = edge.end = null;
            edges.splice(iEdge, 1);
        }
    }
}
function clipEdge(edge) {
    var ax = edge.start.X, ay = edge.start.Y, bx = edge.end.X, by = edge.end.Y, t0 = 0, t1 = 1, dx = bx - ax, dy = by - ay;
    // left
    var q = ax - 0;
    if (dx === 0 && q < 0) {
        return false;
    }
    var r = -q / dx;
    if (dx < 0) {
        if (r < t0) {
            return false;
        }
        if (r < t1) {
            t1 = r;
        }
    }
    else if (dx > 0) {
        if (r > t1) {
            return false;
        }
        if (r > t0) {
            t0 = r;
        }
    }
    // right
    q = canvas.width - ax;
    if (dx === 0 && q < 0) {
        return false;
    }
    r = q / dx;
    if (dx < 0) {
        if (r > t1) {
            return false;
        }
        if (r > t0) {
            t0 = r;
        }
    }
    else if (dx > 0) {
        if (r < t0) {
            return false;
        }
        if (r < t1) {
            t1 = r;
        }
    }
    // top
    q = ay - 0;
    if (dy === 0 && q < 0) {
        return false;
    }
    r = -q / dy;
    if (dy < 0) {
        if (r < t0) {
            return false;
        }
        if (r < t1) {
            t1 = r;
        }
    }
    else if (dy > 0) {
        if (r > t1) {
            return false;
        }
        if (r > t0) {
            t0 = r;
        }
    }
    // bottom        
    q = canvas.height - ay;
    if (dy === 0 && q < 0) {
        return false;
    }
    r = q / dy;
    if (dy < 0) {
        if (r > t1) {
            return false;
        }
        if (r > t0) {
            t0 = r;
        }
    }
    else if (dy > 0) {
        if (r < t0) {
            return false;
        }
        if (r < t1) {
            t1 = r;
        }
    }
    // if we reach this point, Voronoi edge is within bbox
    // if t0 > 0, va needs to change
    // rhill 2011-06-03: we need to create a new vertex rather
    // than modifying the existing one, since the existing
    // one is likely shared with at least another edge
    if (t0 > 0) {
        edge.start = createVertex(ax + t0 * dx, ay + t0 * dy);
    }
    // if t1 < 1, vb needs to change
    // rhill 2011-06-03: we need to create a new vertex rather
    // than modifying the existing one, since the existing
    // one is likely shared with at least another edge
    if (t1 < 1) {
        edge.end = createVertex(ax + t1 * dx, ay + t1 * dy);
    }
    // va and/or vb were clipped, thus we will need to close
    // cells which use this edge.
    if (t0 > 0 || t1 < 1) {
        var index = findRegion(edge.left_site);
        regions[index].closeMe = true;
        index = findRegion(edge.right_site);
        regions[index].closeMe = true;
    }
    return true;
}
;
function connectEdge(edge) {
    var vb = edge.end;
    if (!!vb) {
        return true;
    }
    // make local copy for performance purpose
    var va = edge.start, xl = 0, xr = canvas.width, yt = 0, yb = canvas.height, lSite = edge.left_site, rSite = edge.right_site, lx = lSite.X, ly = lSite.Y, rx = rSite.X, ry = rSite.Y, fx = (lx + rx) / 2, fy = (ly + ry) / 2, fm, fb;
    // if we reach here, this means regions which use this edge will need
    // to be closed, whether because the edge was removed, or because it
    // was connected to the bounding box.
    let index = findRegion(lSite);
    regions[index].closeMe = true;
    index = findRegion(rSite);
    regions[index].closeMe = true;
    // get the line equation of the bisector if line is not vertical
    if (ry !== ly) {
        fm = (lx - rx) / (ry - ly);
        fb = fy - fm * fx;
    }
    // remember, direction of line (relative to left site):
    // upward: left.X < right.X
    // downward: left.X > right.X
    // horizontal: left.X == right.X
    // upward: left.X < right.X
    // rightward: left.Y < right.Y
    // leftward: left.Y > right.Y
    // vertical: left.Y == right.Y
    // depending on the direction, find the best side of the
    // bounding box to use to determine a reasonable va point
    // rhill 2013-12-02:
    // While at it, since we have the values which define the line,
    // clip the end of va if it is outside the bbox.
    // https://github.com/gorhill/Javascript-Voronoi/issues/15
    // TODO: Do all the clipping here rather than rely on Liang-Barsky
    // which does not do well sometimes due to loss of arithmetic
    // precision. The code here doesn't degrade if one of the vertex is
    // at a huge distance.
    // special case: vertical line
    if (fm === undefined) {
        // doesn't intersect with viewport
        if (fx < xl || fx >= xr) {
            return false;
        }
        // downward
        if (lx > rx) {
            if (!va || va.Y < yt) {
                va = createVertex(fx, yt);
            }
            else if (va.Y >= yb) {
                return false;
            }
            vb = createVertex(fx, yb);
        }
        // upward
        else {
            if (!va || va.Y > yb) {
                va = createVertex(fx, yb);
            }
            else if (va.Y < yt) {
                return false;
            }
            vb = createVertex(fx, yt);
        }
    }
    // closer to vertical than horizontal, connect va point to the
    // top or bottom side of the bounding box
    else if (fm < -1 || fm > 1) {
        // downward
        if (lx > rx) {
            if (!va || va.Y < yt) {
                va = createVertex((yt - fb) / fm, yt);
            }
            else if (va.Y >= yb) {
                return false;
            }
            vb = createVertex((yb - fb) / fm, yb);
        }
        // upward
        else {
            if (!va || va.Y > yb) {
                va = createVertex((yb - fb) / fm, yb);
            }
            else if (va.Y < yt) {
                return false;
            }
            vb = createVertex((yt - fb) / fm, yt);
        }
    }
    // closer to horizontal than vertical, connect va point to the
    // left or right side of the bounding box
    else {
        // rightward
        if (ly < ry) {
            if (!va || va.X < xl) {
                va = createVertex(xl, fm * xl + fb);
            }
            else if (va.X >= xr) {
                return false;
            }
            vb = createVertex(xr, fm * xr + fb);
        }
        // leftward
        else {
            if (!va || va.X > xr) {
                va = createVertex(xr, fm * xr + fb);
            }
            else if (va.X < xl) {
                return false;
            }
            vb = createVertex(xl, fm * xl + fb);
        }
    }
    edge.start = va;
    edge.end = vb;
    return true;
}
function closeCells() {
    var xl = 0.0, xr = canvas.width, yt = 0.0, yb = canvas.height, iRegion = regions.length, region, iLeft, nHalfedges, edge, va, vb, vz, lastBorderSegment;
    while (iRegion--) {
        region = regions[iRegion];
        // prune, order halfedges counterclockwise, then add missing ones
        // required to close regions
        if (!prepareHalfedges(region)) {
            continue;
        }
        if (!region.closeMe) {
            continue;
        }
        // find first 'unclosed' point.
        // an 'unclosed' point will be the end point of a halfedge which
        // does not match the start point of the following halfedge
        nHalfedges = region.halfedges.length;
        // special case: only one site, in which case, the viewport is the region
        // ...
        // all other cases
        iLeft = 0;
        while (iLeft < nHalfedges) {
            va = getEndpoint(region.halfedges[iLeft]);
            vz = getStartpoint(region.halfedges[(iLeft + 1) % nHalfedges]);
            // if end point is not equal to start point, we need to add the missing
            // halfedge(s) up to vz
            if (Math.abs(va.X - vz.X) >= 1e-9 || Math.abs(va.Y - vz.Y) >= 1e-9) {
                // rhill 2013-12-02:
                // "Holes" in the region.halfedges are not necessarily always adjacent.
                // https://github.com/gorhill/Javascript-Voronoi/issues/16
                // find entry point:
                switch (true) {
                    // walk downward along left side
                    case equalWithEpsilon(va.X, xl) && lessThanWithEpsilon(va.Y, yb):
                        lastBorderSegment = equalWithEpsilon(vz.X, xl);
                        vb = createVertex(xl, lastBorderSegment ? vz.Y : yb);
                        edge = createBorderEdge(region.site, va, vb);
                        iLeft++;
                        region.halfedges.splice(iLeft, 0, createHalfEdge(edge, region.site, null));
                        nHalfedges++;
                        if (lastBorderSegment) {
                            break;
                        }
                        va = vb;
                    // fall through
                    // walk rightward along bottom side
                    case equalWithEpsilon(va.Y, yb) && lessThanWithEpsilon(va.X, xr):
                        lastBorderSegment = equalWithEpsilon(vz.Y, yb);
                        vb = createVertex(lastBorderSegment ? vz.X : xr, yb);
                        edge = createBorderEdge(region.site, va, vb);
                        iLeft++;
                        region.halfedges.splice(iLeft, 0, createHalfEdge(edge, region.site, null));
                        nHalfedges++;
                        if (lastBorderSegment) {
                            break;
                        }
                        va = vb;
                    // fall through
                    // walk upward along right side
                    case equalWithEpsilon(va.X, xr) && greaterThanWithEpsilon(va.Y, yt):
                        lastBorderSegment = equalWithEpsilon(vz.X, xr);
                        vb = createVertex(xr, lastBorderSegment ? vz.Y : yt);
                        edge = createBorderEdge(region.site, va, vb);
                        iLeft++;
                        region.halfedges.splice(iLeft, 0, createHalfEdge(edge, region.site, null));
                        nHalfedges++;
                        if (lastBorderSegment) {
                            break;
                        }
                        va = vb;
                    // fall through
                    // walk leftward along top side
                    case equalWithEpsilon(va.Y, yt) && greaterThanWithEpsilon(va.X, xl):
                        lastBorderSegment = equalWithEpsilon(vz.Y, yt);
                        vb = createVertex(lastBorderSegment ? vz.X : xl, yt);
                        edge = createBorderEdge(region.site, va, vb);
                        iLeft++;
                        region.halfedges.splice(iLeft, 0, createHalfEdge(edge, region.site, null));
                        nHalfedges++;
                        if (lastBorderSegment) {
                            break;
                        }
                        va = vb;
                        // fall through
                        // walk downward along left side
                        lastBorderSegment = equalWithEpsilon(vz.X, xl);
                        vb = createVertex(xl, lastBorderSegment ? vz.Y : yb);
                        edge = createBorderEdge(region.site, va, vb);
                        iLeft++;
                        region.halfedges.splice(iLeft, 0, createHalfEdge(edge, region.site, null));
                        nHalfedges++;
                        if (lastBorderSegment) {
                            break;
                        }
                        va = vb;
                        // fall through
                        // walk rightward along bottom side
                        lastBorderSegment = equalWithEpsilon(vz.Y, yb);
                        vb = createVertex(lastBorderSegment ? vz.X : xr, yb);
                        edge = createBorderEdge(region.site, va, vb);
                        iLeft++;
                        region.halfedges.splice(iLeft, 0, createHalfEdge(edge, region.site, null));
                        nHalfedges++;
                        if (lastBorderSegment) {
                            break;
                        }
                        va = vb;
                        // fall through
                        // walk upward along right side
                        lastBorderSegment = equalWithEpsilon(vz.X, xr);
                        vb = createVertex(xr, lastBorderSegment ? vz.Y : yt);
                        edge = createBorderEdge(region.site, va, vb);
                        iLeft++;
                        region.halfedges.splice(iLeft, 0, createHalfEdge(edge, region.site, null));
                        nHalfedges++;
                        if (lastBorderSegment) {
                            break;
                        }
                    // fall through
                    default:
                        throw "Voronoi.closeCells() > this makes no sense!";
                }
            }
            iLeft++;
        }
        region.closeMe = false;
    }
}
function equalWithEpsilon(a, b) { return Math.abs(a - b) < 1e-9; }
;
function greaterThanWithEpsilon(a, b) { return a - b > 1e-9; }
;
function lessThanWithEpsilon(a, b) { return b - a > 1e-9; }
;
function loop() {
    if (pause)
        return;
    setTimeout(function () {
        if (line_position <= canvas.height
            || siteEvents.length > 0
            || circleEvents.length > 0) {
            checkEvents();
            renderCanvas(true);
            loop();
        }
        else {
            console.log("WE'RE DONE.");
            clipEdges();
            closeCells();
            renderCanvas(false);
            button.innerHTML = "Start Algorithm";
            button.removeEventListener("click", toggleActive);
            button.addEventListener("click", sweepLine);
            button.disabled = true;
        }
    }, 10);
}
function checkEvents() {
    //SITE EVENT
    if (siteEvents.length > 0
        && line_position >= siteEvents[siteEvents.length - 1].Y) {
        let site_to_handle = siteEvents.pop();
        handleSite(site_to_handle);
        //Check if theres another at this position.
        if (siteEvents.length > 0
            && line_position >= siteEvents[siteEvents.length - 1].Y) {
            checkEvents();
        }
    }
    //CIRCLE EVENT
    if (circleEvents.length > 0
        && line_position >= circleEvents[circleEvents.length - 1].location.Y) {
        //console.log("cE:", circleEvents)
        let cE = circleEvents.pop();
        removeFromBeachline(cE);
        //Check if theres another at this position.
        if (circleEvents.length > 0
            && line_position >= circleEvents[circleEvents.length - 1].location.Y) {
            checkEvents();
        }
    }
    if (line_position >= canvas.height && circleEvents.length > 0) {
        let cE = circleEvents.pop();
        removeFromBeachline(cE);
        //Check if theres another at this position.
        if (circleEvents.length > 0) {
            checkEvents();
        }
    }
}
//RENDERING
function renderCanvas(helpers) {
    //CLEAR
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //REDRAW BOX
    ctx.strokeStyle = 'rgb(153, 153, 153)';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    //DRAW POINTS
    drawPoints();
    if (helpers) {
        //DRAW LINE
        ctx.strokeStyle = 'rgb(0, 0, 0)';
        ctx.moveTo(0, line_position);
        ctx.lineTo(canvas.width, line_position);
        ctx.stroke();
        //DRAW PARABOLAS
        drawParabolas(line_position);
    }
    //DRAW EDGES
    drawEdges();
    line_position += 1;
}
//Mainly from:
//https://jtauber.com/blog/2008/11/29/voronoi_canvas_tutorial_part_iii/
function drawParabola(f, d_Y) {
    let alpha = Math.sqrt((d_Y * d_Y) - (f.Y * f.Y));
    let p0x = f.X - alpha;
    let p0y = 0;
    let cp_x = f.X;
    let cp_y = f.Y + d_Y;
    let p1x = f.X + alpha;
    let p1y = 0;
    ctx.strokeStyle = "rgb(100, 100, 100)";
    //ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.beginPath();
    ctx.moveTo(p0x, p0y);
    ctx.quadraticCurveTo(cp_x, cp_y, p1x, p1y);
    ctx.stroke();
    //ctx.fill();
}
function drawEdges() {
    edges.forEach(edge => {
        if (edge.start && edge.end) {
            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.moveTo(edge.start.X, edge.start.Y);
            ctx.lineTo(edge.end.X, edge.end.Y);
            ctx.stroke();
        }
    });
}
function drawParabolas(lineY) {
    if (beachlineRoot == null) {
        return;
    }
    let currentParabola = getFirst(beachlineRoot);
    drawParabola(currentParabola.site, lineY);
    while (currentParabola.next != null) {
        drawParabola(currentParabola.next.site, lineY);
        currentParabola = currentParabola.next;
    }
}
function drawPoints() {
    pointList.forEach(point => {
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.beginPath();
        ctx.arc(point.X, point.Y, 3.5, 0, 360, false);
        ctx.fill();
    });
    displayedCircleEvents.forEach(point => {
        ctx.fillStyle = 'rgb(255, 0, 0)';
        ctx.beginPath();
        ctx.arc(point.X, point.Y, 3.5, 0, 360, false);
        ctx.fill();
    });
}
//DATASTRUCTURE HANDLERS
function createEdge(lSite, rSite, start, end) {
    var edge = new Edge(lSite, rSite, null, null);
    edges.push(edge);
    if (start) {
        setEdgeStartpoint(edge, lSite, rSite, start);
    }
    if (end) {
        setEdgeEndpoint(edge, lSite, rSite, end);
    }
    let index = findRegion(lSite);
    if (index == -1) {
        regions.push(new Region(lSite));
        regions[regions.length - 1].halfedges.push(createHalfEdge(edge, lSite, rSite));
    }
    else {
        regions[index].halfedges.push(createHalfEdge(edge, lSite, rSite));
    }
    index = findRegion(rSite);
    if (index == -1) {
        regions.push(new Region(rSite));
        regions[regions.length - 1].halfedges.push(createHalfEdge(edge, rSite, lSite));
    }
    else {
        regions[index].halfedges.push(createHalfEdge(edge, rSite, lSite));
    }
    return edge;
}
function setEdgeStartpoint(edge, lSite, rSite, vertex) {
    if (!edge.start && !edge.end) {
        edge.start = vertex;
        edge.left_site = lSite;
        edge.right_site = rSite;
    }
    else if (edge.left_site === rSite) {
        edge.end = vertex;
    }
    else {
        edge.start = vertex;
    }
}
function setEdgeEndpoint(edge, lSite, rSite, vertex) {
    setEdgeStartpoint(edge, rSite, lSite, vertex);
}
function findRegion(site) {
    let return_value = -1;
    regions.forEach((region, index) => {
        if (region.site.X == site.X &&
            region.site.Y == site.Y) {
            return_value = index;
            return;
        }
    });
    return return_value;
}
function createHalfEdge(edge, lSite, rSite) {
    var newHalfEdge = new HalfEdge(lSite, rSite, edge);
    if (rSite) {
        newHalfEdge.angle = Math.atan2(rSite.Y - lSite.Y, rSite.X - lSite.X);
    }
    else {
        var va = edge.start, vb = edge.end;
        // rhill 2011-05-31: used to call getStartpoint()/getEndpoint(),
        // but for performance purpose, these are expanded in place here.
        newHalfEdge.angle = edge.left_site === lSite ?
            Math.atan2(vb.X - va.X, va.Y - vb.Y) :
            Math.atan2(va.X - vb.X, vb.Y - va.Y);
    }
    return newHalfEdge;
}
function createBorderEdge(lsite, start, end) {
    var edge = new Edge(lsite, null, start, end);
    edges.push(edge);
    return edge;
}
function createVertex(x, y) {
    var new_vertex = new Point(x, y);
    //vertices.push(new_vertex)
    return new_vertex;
}
function prepareHalfedges(region) {
    var iHalfedge = region.halfedges.length, edge;
    // get rid of unused halfedges
    // rhill 2011-05-27: Keep it simple, no point here in trying
    // to be fancy: dangling edges are a typically a minority.
    while (iHalfedge--) {
        edge = region.halfedges[iHalfedge].edge;
        if (!edge.end || !edge.start) {
            region.halfedges.splice(iHalfedge, 1);
        }
    }
    // rhill 2011-05-26: I tried to use a binary search at insertion
    // time to keep the array sorted on-the-fly (in Cell.addHalfedge()).
    // There was no real benefits in doing so, performance on
    // Firefox 3.6 was improved marginally, while performance on
    // Opera 11 was penalized marginally.
    region.halfedges.sort(function (a, b) { return b.angle - a.angle; });
    return region.halfedges.length;
}
function getStartpoint(hf) {
    return hf.edge.left_site === hf.site ? hf.edge.start : hf.edge.end;
}
;
function getEndpoint(hf) {
    return hf.edge.left_site === hf.site ? hf.edge.end : hf.edge.start;
}
;
//DATASTRUCTURES
class Point {
    constructor(x, y) {
        this.X = x;
        this.Y = y;
    }
}
class Edge {
    constructor(ls, rs, s, e) {
        this.left_site = ls;
        this.right_site = rs;
        this.start = s;
        this.end = e;
    }
}
class HalfEdge {
    constructor(ls, rs, e) {
        this.site = ls;
        this.right_site = rs;
        this.edge = e;
    }
}
class Region {
    constructor(s) {
        this.closeMe = false;
        this.site = s;
        this.halfedges = Array();
    }
}
class CircleEvent {
    constructor(arc, site, x, y, yC) {
        this.node = arc;
        this.centerSite = site;
        this.location = new Point(x, y);
        this.yCenter = yC;
    }
}
//Used to build Red/Black Tree
class TreeNode {
    constructor(s) {
        this.site = s;
    }
}
//Controller stuff
function loadDataset(id) {
    pause = true;
    //reset variables
    pointList = [];
    displayedCircleEvents = [];
    clicked = false;
    line_position = 0;
    siteEvents = [];
    circleEvents = [];
    beachlineRoot = null;
    edges = Array();
    regions = Array();
    //reset view
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    setTimeout(function () {
        switch (id) {
            case 0:
                pointList = [new Point(150, 150), new Point(400, 450), new Point(650, 150)];
                sweepLine();
                break;
            case 1:
                pointList = [new Point(600, 500), new Point(250, 450), new Point(650, 150), new Point(300, 250), new Point(150, 50), new Point(50, 350)];
                sweepLine();
                break;
            case 2:
                pointList = [new Point(50, 150), new Point(100, 450), new Point(200, 250), new Point(300, 425), new Point(400, 100), new Point(500, 200), new Point(600, 350), new Point(700, 560), new Point(750, 50), new Point(450, 400), new Point(360, 450), new Point(550, 250),
                    new Point(150, 50), new Point(450, 100), new Point(250, 200), new Point(425, 300), new Point(100, 400), new Point(200, 500), new Point(350, 70), new Point(560, 125), new Point(50, 50), new Point(400, 450), new Point(450, 360), new Point(250, 550)];
                sweepLine();
                break;
            case 3:
                pointList = [new Point(750, 75), new Point(760, 20), new Point(720, 55), new Point(700, 23), new Point(750, 60), new Point(50, 500),
                    new Point(700, 100), new Point(740, 70), new Point(730, 65)];
                sweepLine();
                break;
        }
    }, 100);
}
function toggleActive() {
    if (button.innerHTML == "Pause") {
        button.innerHTML = "Resume";
        pause = true;
    }
    else {
        button.innerHTML = "Pause";
        pause = false;
        loop();
    }
}
function restart() {
    pause = true;
    setTimeout(function () {
        //reset variables
        pointList = [];
        displayedCircleEvents = [];
        clicked = false;
        line_position = 0;
        siteEvents = [];
        circleEvents = [];
        beachlineRoot = null;
        edges = Array();
        regions = Array();
        //reset view
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        //reset button
        button.innerHTML = "Start Algorithm";
        button.removeEventListener("click", toggleActive);
        button.addEventListener("click", sweepLine);
        button.disabled = false;
    }, 50);
}
//MAIN ENTRY POINT FOR ALGORITHM
function sweepLine() {
    //Don't start before we have points.
    if (pointList.length == 0) {
        clicked = false;
        button.disabled = false;
        return;
    }
    //CHECKS
    if (!clicked) {
        //Button handling
        button.removeEventListener("click", sweepLine);
        button.innerHTML = "Pause";
        button.addEventListener("click", toggleActive);
        restartButton.disabled = false;
        clicked = true;
        //ALGORITHM INIT
        siteEvents = pointList.slice(0);
        siteEvents.sort(function (a, b) {
            var diff = b.Y - a.Y;
            if (diff) {
                return diff;
            }
            return b.X - a.X;
        });
    }
    //ALGORITHM
    pause = false;
    loop();
}
