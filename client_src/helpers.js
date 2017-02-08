function findIn(element, selector) {
    return angular.element(element[0].querySelector(selector));
}

function findInAll(element, selector) {
    return angular.element(element[0].querySelectorAll(selector));
}