$(function(){
  var viewModel = function() {    
      this.optionValues = ["c___","_c__","__c_","___c","cc__","_cc_","__cc","c__c"];
      this.triColor = ko.observable("yellow");
      this.radioOption = ko.observable("c___");
      this.triangleColor = ko.computed(function() {
        return this.radioOption().replace(/c/gi, ' ' + this.triColor()).replace(/_/g, ' transparent' )
      }, this);

      this.triHeight = ko.observable(100);
      this.triWidth = ko.observable(100);
      this.triangleWidth = ko.computed(function() {
        if(this.radioOption() == "___c" || this.radioOption() == "_c__") {
          return  this.triHeight() / 2  + "px "   +   this.triWidth() + "px";
        } else if(this.radioOption() == "c___" || this.radioOption() == "__c_") {
          return  this.triHeight()     + "px "    +   this.triWidth() / 2 + "px";
        } else {
          return  this.triHeight() / 2  + "px "   +   this.triWidth() / 2 + "px";
        }
      }, this);  
    
      this.triangleBoole  =   ko.observable(true); 
      this.shadowBoole    =   ko.observable(true);
      this.borderBoole    =   ko.observable(true);
      this.rotationBoole  =   ko.observable(true);

      this.shadowX = ko.observable(4);
      this.shadowY = ko.observable(4);
      this.shadowB = ko.observable(4);
      this.shadowC = ko.observable("#AAAAAA");
      this.triangleShadowCode = ko.computed(function() {
        if ( this.shadowBoole() && this.borderBoole() == false ) {
          return 'drop-shadow(' + this.shadowX() + 'px ' + this.shadowY() + 'px ' + this.shadowB() + 'px ' + this.shadowC() + ')'
        } 
      }, this);
    
      this.borderShadowCode = ko.computed(function() {
        if ( this.shadowBoole() && this.borderBoole() ) {
          return 'drop-shadow(' + this.shadowX() + 'px ' + this.shadowY() + 'px ' + this.shadowB() + 'px ' + this.shadowC() + ')'
        } 
      }, this);
    
      this.borderY = ko.observable(-2);
      this.borderX = ko.observable(-4);
      this.marginOfBorder = ko.computed(function() {
        return this.borderY() + 'px 0 0 ' + this.borderX() + 'px'
      }, this);
    
      this.borderC = ko.observable("green");
      this.colorOfBorder = ko.computed(function() {
        if (this.borderBoole() == true) {
          return this.radioOption().replace(/c/gi, " " + this.borderC() ).replace(/_/g, ' transparent' )
        }
      }, this);
    
      this.borderW = ko.observable(8);
      this.widthOfBorder = ko.computed(function() {
        if        (this.radioOption() == "___c"   ||  this.radioOption() == "_c__") {
          return  (this.triHeight() / 2 +   this.borderW() / 2 )  + "px " +   (+this.triWidth()     +  +this.borderW() ) + "px";
        } else if (this.radioOption() == "c___"   ||  this.radioOption() == "__c_") {
          return  (+this.triHeight()    +  +this.borderW() )      + "px " +   (this.triWidth() / 2  +   this.borderW() / 2 ) + "px";
        } else {
          return  (this.triHeight() / 2 +   this.borderW() / 2 )  + "px " +   (this.triWidth() / 2  +   this.borderW() / 2 ) + "px";
        }
      }, this);
      
      this.degree = ko.observable(9);
      this.degreeOfRotate = ko.computed(function() {
        if ( this.rotationBoole() ) {
          return 'rotate(' + this.degree() + 'deg)'
        } else {
          return 'rotate(0deg)'
        }
      }, this);
  };
  ko.applyBindings(new viewModel());
  
  $('#tri_maker li.box:first-child').addClass('active');
  $('#tri_maker li.box').click(function(){
    $('#tri_maker li.box').removeClass('active');
    $(this).addClass('active');
  });
  

  $('input[type=checkbox]').click(function(){
    if( $('input.shadow_check').attr('checked') && $('input.border_check').attr('checked') ) {
      // border with shadow
      $('.code.html .triangle .shadow').slideUp()
      $('.code.html .border .shadow').slideDown()
    } else if( $('input.border_check').attr('checked') ) {
      // just border
      $('.code.html .triangle .shadow, .code.html .border .shadow').slideUp()
    } else if( $('input.shadow_check').attr('checked') ) {
      // triangle with shadow
      $('.code.html .triangle .shadow').slideDown()
      $('.code.html .border .shadow').slideUp()
    } else {
      // just triangle
      $('.code.html .triangle .shadow, .code.html .border .shadow').slideUp()
    }
  });
  
  $('input[type=checkbox]').click(function(){
    var link = $(this).data('link');
    if ( $(this).attr('checked') ) {
      $('.' + link).slideDown();
    } else {
      $('.' + link).slideUp();      
    }
  });

  
});