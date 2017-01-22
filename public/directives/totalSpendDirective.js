app = angular.module('Bougie')

app.directive('totalSpend', function(){

	TEMPLATE = `
	<div class="widget-container col-md-4 col-md-offset-2">
		<nvd3 options="chartController.options" data="chartController.data" api="api"></nvd3>
	</div>`

	return {
		restrict 		 : 'E',
		template 		 : TEMPLATE,
		controller 		 : 'totalSpendController',
		controllerAs 	 : 'chartController',
		bindToController : true,
		scope 			 : {
			categories : '=',
            expenses   : '='
		},
		link : function(scope, element, attrs) {
		    scope.$watch('$root.user.categories', function(newVal){
                scope.chartController.categories = newVal;
		    	scope.chartController.setData();
		    }, true);
            scope.$watch('$root.user.expenses', function(newVal){
                scope.chartController.expenses = newVal;
                scope.chartController.setData();
            }, true);
		}
	}
});


app.controller('totalSpendController', ['$scope', 'modalService', function($scope, modalService){

	this.options = {
        chart: {
            type: 'pieChart',
            height: 500,
            x: function(d){return d.key;},
            y: function(d){return d.value;},
            showLabels: false,
            duration: 500,
            pie: {
		        dispatch: {
		            elementClick: function(e){ modalService.openExpenseModal(0); }
		        }
		    },
            legend: {
                margin: {
                    top: 5,
                    right: 0,
                    bottom: 5,
                    left: 15
                },
                rightAlign : true
            }
        },
        title : {
        	enable : true,
        	text : 'Total Spend',
        	className : 'h4'
        }
    };

    this.setData = function(){
    	this.data = []
        var spendSum = 0;
        var totalSum = _.reduce(this.categories, function(memo, category){ return memo + category.amt}, 0);
        var dataMap = _.groupBy(this.expenses, function(expense){ return expense.category.title});

        for (var category in dataMap) {
            dataMap[category] = _.reduce(dataMap[category], function(memo, expense){ return memo + expense.amt}, 0);
            spendSum += dataMap[category];
        }        
        
        var spentSeries = {
            key: "Total Spent",
            value: spendSum,
            color: "#ff3333"
        };
        var remainingSeries = {
            key: "Remaining Budget",
            value: totalSum,
            color: "#99ff99"
        };
        this.data.push(spentSeries, remainingSeries);
    }


    this.setData();

    this.openModal = function() {
      modalService.openCategoryModal(0);
    }
}]);
