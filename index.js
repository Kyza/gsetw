module.exports = function(object, nodePath, before = false) {
    return new Promise((resolve, reject) => {
        if (typeof object !== "object") reject("Non-object in tree.");
        if (typeof nodePath !== "string") reject("Node path is not a string.");
        nodePath = nodePath.split(".").filter((node) => node.trim() !== "");

        while (
            nodePath.length > 0 &&
            object[nodePath[0]] !== null &&
            object[nodePath[0]] !== undefined
        ) {
            if (typeof object !== "object") reject("Non-object in tree.");
            object = object[nodePath[0]];
            nodePath.shift();
        }

        if (typeof object !== "object") reject("Non-object in tree.");

        if (nodePath.length === 0) {
            return resolve(object);
        }

        Object.defineProperty(object, nodePath[0], {
            get: () => {
                return undefined;
            },
            set: (newObject) => {
                function dispatch() {
                    nodePath.shift();
                    if (nodePath.length > 0) {
                        return resolve(gsetw(newObject, nodePath.join(".")));
                    }
                    resolve(newObject);
                }
                if (before) dispatch();
                Object.defineProperty(object, nodePath[0], { value: newObject });
                if (!before) dispatch();
            },
            configurable: true,
            enumerable: true
        });
    });
}
