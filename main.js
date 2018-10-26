$( document ).ready(function uncheck(){
      $('input[name = "foodtype"]').attr('checked',false);
      $('input[name = "vegantype"]').attr('checked',false);
      $('input[name = "dairytype"]').attr('checked',false);
      $('input[name = "carbstype"]').attr('checked',false);
      $('input[name = "glutentype"]').attr('checked',false);
  }
);

function showQuestions() {
  var something = "";
  if (document.querySelector('input[id = "veganfood"]:checked')) {
  something += "Vegan  "; $("#veganoption").show(); $("#dairyoption, #glutenoption, #carbsoption").hide()};

  if (document.querySelector('input[id = "dairyfree"]:checked')) {
  something += "Dairy  "; $("#dairyoption").show(); $("#veganoption, #glutenoption, #carbsoption").hide()};

  if (document.querySelector('input[id = "gluten"]:checked')) {
  something += "Gluten  "; $("#glutenoption").show(); $("#veganoption, #dairyoption, #carbsoption").hide()};

  if (document.querySelector('input[id = "carbsfree"]:checked')) {
  something += "Carbs  "; $("#carbsoption").show(); $("#veganoption, #dairyoption, #glutenoption").hide()};
}

function showRestaurant() {
  if (document.querySelector('input[id = "veganfood"]:checked') && document.querySelector('input[id = "vegan_fastfood"]:checked')) {
  window.startpredicate = " rest:vend"; window.startobject = " rest:HamburgerMenu";}
  if (document.querySelector('input[id = "veganfood"]:checked') && document.querySelector('input[id = "vegan_pasta"]:checked')) {
  window.startpredicate = " rest:vend"; window.startobject = " rest:PizzaAndPasta";}
  if (document.querySelector('input[id = "veganfood"]:checked') && document.querySelector('input[id = "vegan_indianfood"]:checked')) {
  window.startpredicate = " rest:vend"; window.startobject = " rest:CurryMenu";}
  if (document.querySelector('input[id = "veganfood"]:checked') && document.querySelector('input[id = "vegan_salad"]:checked')) {
  window.startpredicate = " rest:vend"; window.startobject = " rest:SaladMenu";}

  if (document.querySelector('input[id = "dairyfree"]:checked') && document.querySelector('input[id = "dairy_fish"]:checked')) {
  window.startpredicate = " rest:has"; window.startobject = " rest:Codfish";}
  if (document.querySelector('input[id = "dairyfree"]:checked') && document.querySelector('input[id = "dairy_chicken"]:checked')) {
  window.startpredicate = " rest:has"; window.startobject = " rest:HalfAChicken";}
  if (document.querySelector('input[id = "dairyfree"]:checked') && document.querySelector('input[id = "dairy_salad"]:checked')) {
  window.startpredicate = " rest:has"; window.startobject = " rest:SaladMenu";}
  if (document.querySelector('input[id = "dairyfree"]:checked') && document.querySelector('input[id = "dairy_pizza"]:checked')) {
  window.startpredicate = " rest:has"; window.startobject = " rest:PizzaAndPasta";}

  if (document.querySelector('input[id = "gluten"]:checked') && document.querySelector('input[id = "gluten_mediterranean"]:checked')) {
  window.startpredicate = " rest:serves"; window.startobject = " rest:TapasMenu";}
  if (document.querySelector('input[id = "gluten"]:checked') && document.querySelector('input[id = "gluten_fish"]:checked')) {
  window.startpredicate = " rest:serves"; window.startobject = " rest:Codfish";}
  if (document.querySelector('input[id = "gluten"]:checked') && document.querySelector('input[id = "gluten_pancake"]:checked')) {
  window.startpredicate = " rest:serves"; window.startobject = " rest:PancakeWithApple";}
  if (document.querySelector('input[id = "gluten"]:checked') && document.querySelector('input[id = "gluten_pizza"]:checked')) {
  window.startpredicate = " rest:serves"; window.startobject = " rest:PizzaAndPasta";}

  if (document.querySelector('input[id = "carbsfree"]:checked') && document.querySelector('input[id = "carbs_french"]:checked')) {
  window.startpredicate = " rest:sells"; window.startobject = " rest:DuckBreast";}
  if (document.querySelector('input[id = "carbsfree"]:checked') && document.querySelector('input[id = "carbs_sugarfree"]:checked')) {
  window.startpredicate = " rest:sells"; window.startobject = " rest:Soup";}
  if (document.querySelector('input[id = "carbsfree"]:checked') && document.querySelector('input[id = "carbs_salad"]:checked')) {
  window.startpredicate = " rest:sells"; window.startobject = " rest:SaladMenu";}
  if (document.querySelector('input[id = "carbsfree"]:checked') && document.querySelector('input[id = "carbs_snackbar"]:checked')) {
  window.startpredicate = " rest:sells"; window.startobject = " rest:HealtyShawarma";}
  //$scope.predicate = "rest:sells" //local
};


angular.module('KRRclass', [ 'chart.js']).controller('MainCtrl', ['$scope','$http', mainCtrl]);
function mainCtrl($scope, $http, ChartJsProvider){

  $scope.mysparqlendpoint = "http://localhost:5820/FindFoodProject/query?query=";
  $scope.result = "Here is my input: " +$scope.myInput+"!";

    $scope.doMyAction = function(){
        $scope.predicate = startpredicate;
        $scope.object = startobject;
        $scope.myInput = "SELECT ?rest ?place WHERE {?res" + $scope.predicate + $scope.object +
        " OPTIONAL {?res a ?city. ?city rdfs:subClassOf rest:Location . } BIND(replace(str(?res), 'http://www.semanticweb.org/chiara/RestaurantsInAmsterdam/', '' ) as ?rest ) BIND(replace(str(?city), 'http://www.semanticweb.org/chiara/RestaurantsInAmsterdam/', '' ) as ?place ) }"

                $scope.result = "Here is my input: " +$scope.myInput+"!";
                console.log($scope.mysparqlendpoint+encodeURI($scope.myInput).replace(/#/g, '%23'));
                $http( {
          method: "GET",
          headers : {'Accept':'application/sparql-results+json', 'Content-Type':'application/sparql-results+json'},
          url : $scope.mysparqlendpoint+encodeURI($scope.myInput).replace(/#/g, '%23'),
        } )

            .success(function(data, status) {
                    console.log(data);
                    $scope.resultQ2=data;

        angular.forEach(data.results.bindings, function(val) {
          $scope.finalRestaurant = val.rest.value;
          $scope.finalPlace = val.place.value;
                    });
        } )
    };
}
