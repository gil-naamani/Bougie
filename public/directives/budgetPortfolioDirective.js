app = angular.module('Bougie')

app.directive('budgetPorfolio', function(){

	TEMPLATE = `
	<div class="widget-container col-md-4 col-md-offset-1">
		<button class="btn btn-default graph-control" ng-click="portfolioController.openModal()">
	        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
	        New Category
	    </button>
		<nvd3 options="portfolioController.options" data="portfolioController.data" api="api"></nvd3>
	</div>`

	return {
		restrict 		 : 'E',
		template 		 : TEMPLATE,
		controller 		 : 'budgetPorfolioController',
		controllerAs 	 : 'portfolioController',
		bindToController : true,
		scope 			 : {
			categories : '='
		},
		link : function(scope, element, attrs) {
		    scope.$watch('$root.user.categories', function(newVal){
		    	scope.portfolioController.setData(newVal)
		    }, true);
		}
	}
});


app.controller('budgetPorfolioController', ['$scope', 'modalService', function($scope, modalService){

	this.options = {
        chart: {
            type: 'pieChart',
            height: 500,
            x: function(d){return d.title;},
            y: function(d){return d.amt;},
            showLabels: false,
            duration: 500,
            pie: {
		        dispatch: {
		            elementClick: function(e){ modalService.openCategoryModal(e.data); }
		        }
		    },
            legend: {
                margin: {
                    top: 5,
                    right: 0,
                    bottom: 5,
                    left: 15
                },
                rightAlign : false
            }
        },
        title : {
        	enable : true,
        	text : 'Budget Portfolio',
        	className : 'h4'
        }
    };
    this.data = this.categories;

    this.setData = function(vals){
    	this.data = vals;
    }

    this.openModal = function() {
      modalService.openCategoryModal(0);
    }
}]);
