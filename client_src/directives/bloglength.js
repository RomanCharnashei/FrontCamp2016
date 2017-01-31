module.exports = /*@ngInject*/ function($parse){
    return {

        require: 'ngModel',

        link: function(scope, elm, attrs, ctrl){
            ctrl.$validators.bloglength = function(modelValue, viewValue) {
                var length = $parse(attrs.blogLength)(scope);
                length = parseInt(length);

                if (isNaN(length) || (modelValue.length <= length)) {
                    return true
                } else {
                    return false;
                }

            }
        }
    }
}