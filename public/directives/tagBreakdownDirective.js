app = angular.module('Bougie')

app.directive('tagBreakdown', function(){

	TEMPLATE = `
	<div class="widget-container col-md-8 col-md-offset-2">
		<button class="btn btn-default graph-control" ng-click="tagBreakdownController.openModal()">
	        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
	        New Tag
	    </button>
		<nvd3 options="tagBreakdownController.options" data="tagBreakdownController.data" api="api"></nvd3>
	</div>`

	return {
		restrict 		 : 'E',
		template 		 : TEMPLATE,
		controller 		 : 'tagBreakdownController',
		controllerAs 	 : 'tagBreakdownController',
		bindToController : true,
		scope 			 : {
			tags       : '=',
            categories : '=',
            expenses   : '=',
			click      : '&'
		},
		link : function(scope, element, attrs) {
		    scope.$watch('$root.user', function(newVal){
                scope.tagBreakdownController.categories = newVal.categories;
                scope.tagBreakdownController.tags = newVal.tags;
                scope.tagBreakdownController.expenses = newVal.expenses;
		    	scope.tagBreakdownController.setData();
		    }, true);
		}
	}
});


app.controller('tagBreakdownController', ['$scope', 'modalService', function($scope, modalService){

	this.options = {
        chart: {
            type: 'multiBarHorizontalChart',
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
                    elementClick: function(e){ modalService.openTagModal(e.data); }
                }
            },
            stacked: true
        },
        title : {
        	enable : true,
        	text : 'Category Breakdown',
        	className : 'h4'
        }
    };

    this.data = [];

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
        for (var category in dataMap){
            dataMap[category] = _.groupBy(dataMap[category], function(expense){ return expense.tag.title});

            for (var tag in dataMap[category]){
                dataMap[category][tag] = _.reduce(dataMap[category][tag], function(memo, expense){ return memo + expense.amt}, 0);
            }
        }
        // build data in proper format
        for (var i = 0; i < this.categories.length; i++){
            var category = this.categories[i].title;
            var series = {
                "key" : category,
                "values" : []
            }
            for (var j = 0; j < this.tags.length; j++){
                var tag = this.tags[j].title;
                var tagMap = dataMap[category] || {}
                var value = tagMap[tag] || 0
                if (value > 0) { 
                    var label = {
                        "title" : elipsis(tag),
                        "amt"   : value,
                        "_id"   : this.tags[j]._id
                    }

                    series.values.push(label);
                }
            }
            if (series.values.length > 0) {
                this.data.push(series)
            }
        }
        console.log(this.data)
    }

    this.openModal = function() {
      modalService.openTagModal(0);
    }
}]);
