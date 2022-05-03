export function isEmptyObject(obj:Object):boolean {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            return false;
        }
    }
    return true;
  }