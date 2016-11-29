function Visitor() {

    this.arrayVisit = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            this.visit(arr[i]);
        }
    };

    this.objectVisit = function (obj) {
        var tryNumber;

        for (var prop in obj) {
            if (!obj.hasOwnProperty(prop)) continue;

            tryNumber = parseFloat(prop);

            if (!isNaN(tryNumber) && isFinite(tryNumber)) {
                delete obj[prop];
            } else {
                this.visit(obj[prop]);
            }

            tryNumber = null;                        
        }
    }

    this.visit = function (data) {
        if (Array.isArray(data)) {
            this.arrayVisit(data);
        } else if (typeof data === "object") {
            this.objectVisit(data);
        }
    };
};

module.exports = function (source) {
    this.cacheable && this.cacheable();
    var data = typeof source === "string" ? JSON.parse(source) : source;
    var visitor = new Visitor();
    visitor.visit(data);
    console.log(JSON.stringify(data));
    return "module.exports = " + JSON.stringify(data) + ";";
};