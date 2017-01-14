app = angular.module('Bougie')

app.directive('bougieStackedBarChart', function(){

	TEMPLATE = `
	<div class="widget-container col-md-8 col-md-offset-2">
		<button class="btn btn-default graph-control" ng-click="stackedBarController.openModal()">
	        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
	        New Tag
	    </button>
		<nvd3 options="stackedBarController.options" data="stackedBarController.data" api="api"></nvd3>
	</div>`

	return {
		restrict 		 : 'E',
		template 		 : TEMPLATE,
		controller 		 : 'bougieStackedBarController',
		controllerAs 	 : 'stackedBarController',
		bindToController : true,
		scope 			 : {
			tags     : '=',
            expenses : '=',
			click    : '&'
		},
		link : function(scope, element, attrs) {
		    scope.$watch('$root.user.tags', function(newVal){
		    	// scope.stackedBarController.setData(newVal)
		    }, true);
		}
	}
});


app.controller('bougieStackedBarController', ['$scope', 'modalService', function($scope, modalService){

	this.options = {
        chart: {
            type: 'multiBarHorizontalChart',
            height: 450,
            x: function(d){return d.label;},
            y: function(d){return d.value;},
            showControls: true,
            showValues: true,
            duration: 500,
            xAxis: {
                showMaxMin: false
            },
            yAxis: {
                axisLabel: 'Values',
                tickFormat: function(d){
                    return d3.format(',.2f')(d);
                }
            }
        },
        title : {
        	enable : true,
        	text : 'Category Breakdown',
        	className : 'h4'
        }
    };

    // this.data = this.tags
    

    this.setData = function(vals){
        
    }

    this.openModal = function() {
      modalService.openTagModal(0);
    }
}]);
