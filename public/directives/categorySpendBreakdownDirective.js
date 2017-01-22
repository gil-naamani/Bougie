app = angular.module('Bougie')

app.directive('categorySpendBreakdown', function(){

	TEMPLATE = `
	<div class="widget-container col-md-10 col-md-offset-1">
		<button class="btn btn-default graph-control" ng-click="spendBreakdownController.openModal()">
	        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
	        Log Expense
	    </button>
		<nvd3 options="spendBreakdownController.options" data="spendBreakdownController.data" api="api"></nvd3>
	</div>`

	return {
		restrict 		 : 'E',
		template 		 : TEMPLATE,
		controller 		 : 'spendBreakdownController',
		controllerAs 	 : 'spendBreakdownController',
		bindToController : true,
		scope 			 : {
            categories : '=',
            expenses   : '='
		},
		link : function(scope, element, attrs) {
		    scope.$watch('$root.user.expenses', function(newVal){
                scope.spendBreakdownController.expenses = newVal;
		    	scope.spendBreakdownController.setData();
		    }, true);
            scope.$watch('$root.user.categories', function(newVal){
                scope.spendBreakdownController.categories = newVal;
                scope.spendBreakdownController.setData();
            }, true);
		}
	}
});


app.controller('spendBreakdownController', ['$scope', 'modalService', function($scope, modalService){

	this.options = {
        chart: {
            type: 'multiBarChart',
            height: 450,
            x: function(d){return d.title;},
            y: function(d){return d.amt;},
            showControls: false,
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
            },
            multibar: {
                dispatch: {
                    elementClick: function(e){ modalService.openExpenseModal(0); }
                }
            },
            stacked: true
        },
        title : {
        	enable : true,
        	text : 'Budget Breakdown',
        	className : 'h4'
        }
    };

    var elipsis = function(str){
        if (str.length > 10){
            return str.substring(0,7) + "...";
        }

        return str;
    }

    this.setData = function(){
        // build map for data
        this.data = []
        var dataMap = _.groupBy(this.expenses, function(expense){ return expense.category.title});
        for (var category in dataMap) {
            dataMap[category] = _.reduce(dataMap[category], function(memo, expense){ return memo + expense.amt}, 0);
        }
        // build data in proper format
        var spentSeries = {
            "key" : "Spent",
            "values" : [],
            "color": "#ff3333"
        };
        var remainingSeries = {
            "key" : "Remaining",
            "values" : [],
            "color": "#99ff99"
        };
        for (var i = 0; i < this.categories.length; i++){
            var category = this.categories[i];
            var value = dataMap[category.title] || 0;
            var spent = {
                "title" : category.title,
                "amt"   : value
            };
            var remaining = {
                "title" : category.title,
                "amt"   : category.amt - value
            }

            spentSeries.values.push(spent);
            remainingSeries.values.push(remaining);
        }
        this.data.push(spentSeries);
        this.data.push(remainingSeries);
    }

    this.openModal = function() {
      modalService.openExpenseModal(0);
    }

    this.setData();
}]);
